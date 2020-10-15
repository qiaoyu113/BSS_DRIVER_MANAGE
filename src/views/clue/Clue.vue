<template>
  <div :class="checked ? 'ClueList padd' : 'ClueList'">
    <div class="top">
      <ClueTitle
        @screen="startScreen"
        @changeManager="changeManager"
      />
      <van-tabs
        v-model="active"
        sticky
        animated
        line-width="30"
        line-height="2"
        @change="handleTabChange"
      >
        <van-tab
          v-for="(item,index) in tabType"
          :key="index"
        >
          <template #title>
            {{ item.type }}<div class="van-info">
              {{ item.num }}
            </div>
          </template>
        </van-tab>
      </van-tabs>
      <div
        v-if="checked"
        class="checkAll"
      >
        <van-checkbox
          v-model="checkall"
          class="checked"
          checked-color="#7F8FBD"
          shape="square"
        >
          全选({{ checkedList.length }})
        </van-checkbox>
      </div>
    </div>
    <div class="list">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onLoad(true)"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ListItem
            v-for="(item, index) in lists"
            :key="index"
            class="items"
            :item="item"
            :checked="checked"
            :checkall="checkedList"
            @changeCheck="changeCheck"
          />
        </van-list>
      </van-pull-refresh>
    </div>

    <SelfPopup
      :show.sync="showScreen"
      form-ref="form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <van-field
        v-model="formText.workCity"
        readonly
        name="workCity"
        label="工作城市"
        placeholder="请选择"
        @click="showPickerFn('workCity')"
      />
      <van-field
        v-model="formText.busiType"
        readonly
        name="busiType"
        label="业务线"
        placeholder="请选择"
        @click="showPickerFn('busiType')"
      />
      <van-field
        v-model="formText.carType"
        readonly
        name="carType"
        label="车型"
        placeholder="请选择"
        @click="showPickerFn('carType')"
      />
      <van-field
        v-model="formText.gmGroupId"
        readonly
        name="gmGroupId"
        label="加盟小组"
        placeholder="请选择"
        @click="showPickerFn('gmGroupId')"
      />
      <van-field
        v-model="formText.gmId"
        readonly
        name="gmId"
        label="加盟经理"
        placeholder="请选择"
        @click="showPickerFn('gmId')"
      />
      <van-field
        v-model="formText.scGmId"
        readonly
        name="scGmId"
        label="渠道经理"
        placeholder="请选择"
        @click="showPickerFn('scGmId')"
      />
      <van-field
        v-model="formText.dealStatus"
        readonly
        name="dealStatus"
        label="是否成交"
        placeholder="请选择"
        @click="showPickerFn('dealStatus')"
      />
      <van-field
        v-model="formText.sourceChannel"
        readonly
        name="sourceChannel"
        label="渠道"
        placeholder="请选择"
        @click="showPickerFn('sourceChannel')"
      />
      <van-field
        v-model="formText.mode"
        readonly
        name="mode"
        label="来源"
        placeholder="请选择"
        @click="showPickerFn('mode')"
      />
      <van-field
        v-show="ruleForm.mode !== 3"
        v-model="formText.joinType"
        readonly
        name="joinType"
        label="方式"
        placeholder="请选择"
        @click="showPickerFn('joinType')"
      />
      <van-field
        v-model="formText.dateArr"
        readonly
        label="创建时间"
        placeholder="请选择"
        @click="dateShow = true"
      />
    </SelfPopup>

    <!-- :show-confirm="false" -->
    <van-calendar
      v-model="dateShow"
      type="range"
      :min-date="minTime"
      :max-date="maxTime"
      :allow-same-day="true"
      @confirm="onConfirm"
    />

    <!-- picker -->
    <van-popup
      v-model="showPicker"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        value-key="name"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirmPicker"
      />
    </van-popup>

    <!-- 选择归属人弹窗 -->
    <changeManager :status="changeManagerStatus" @closePop="closeManagerPop" @changeOver="changeOver" />

    <div
      v-if="checked"
      class="bottomBtn"
    >
      <van-button
        color="#2F448A"
        plain
        native-type="button"
        style="width:38%"
        @click="cancelManager"
      >
        取消
      </van-button>
      <van-button
        native-type="button"
        type="primary"
        style="width:61%"
        @click="confirmManager"
      >
        更换归属人
      </van-button>
    </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils';
import ListItem from './components/ListItem';
import ClueTitle from './components/ClueTitle';
import SelfPopup from '@/components/SelfPopup';
import changeManager from './components/ChangeManager'
import { Toast, Cell, Form, Tab, Notify } from 'vant';
import { getClueList } from '@/api/clue.js'
import { GetDictionaryList, getCurrentLowerOfficeCityData, GetUserList, GetGmGroup } from '@/api/common'
export default {
  name: 'ClueList',
  components: {
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Tab.name]: Tab,
    [Notify.name]: Notify,
    ClueTitle,
    SelfPopup,
    ListItem,
    changeManager
  },
  data() {
    return {
      minTime: new Date(2000, 12, 31),
      maxTime: new Date(2125, 12, 31),
      checkedList: [],
      lists: [],
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      columns: [],
      pickerKey: '',
      columns_busiType: [ // 业务线
        { name: '专车', code: 0 },
        { name: '共享', code: 1 }
      ],
      columns_workCity: [], // 工作城市
      columns_GmManager: [], // 加盟经理
      columns_carType: [], // 车型
      columns_dealStatus: [ // 是否成交
        { name: '全部', code: '' },
        { name: '是', code: 1 },
        { name: '否', code: 0 }
      ],
      columns_sourceChannel: [ // 渠道
        { name: '全部', code: '' },
        { name: '梧桐喜鹊小程序', code: 0 },
        { name: '梧桐云雀小程序', code: 1 }
      ],
      columns_mode: [ // 来源
        { name: '全部', code: '' },
        { name: '扫描推广码', code: 1 },
        { name: '转发', code: 2 },
        { name: '填写推荐信息', code: 3 },
        { name: '其他', code: 4 }
      ],
      columns_joinType: [ // 方式
        { name: '全部', code: '' },
        { name: '微信授权', code: 1 },
        { name: '入驻', code: 2 }
      ],
      columns_gmGroupId: [
        { name: '共享一组', code: '' },
        { name: '共享二组', code: 0 },
        { name: '共享三组', code: 1 }
      ], // 加盟小组
      columns_scGmId: [], // 渠道经理
      showPicker: false,
      showScreen: false,
      minDate: new Date(+new Date() - 86400000 * 365),
      maxDate: new Date(+new Date() + 86400000 * 365),
      dateShow: false,
      active: 0,
      formText: {
        workCity: '', // 工作城市
        busiType: '', // 业务线
        carType: '', // 车类型
        gmGroupId: '', // 加盟小组
        gmId: '', // 加盟经理Id
        scGmId: '', // 渠道经理
        dealStatus: '', // 是否成交 0 未成交 1 成交
        sourceChannel: '', // 渠道
        mode: '', // 来源 1 扫描推广码 2 转发  3 填写推荐信息 4 其他
        joinType: '', // 方式 1 微信授权 2 入驻 3 推荐
        status: '', // 线索状态 0 喜鹊 1云雀
        dateArr: ''
      },
      ruleForm: {
        workCity: '', // 工作城市
        busiType: '', // 业务线
        carType: '', // 车类型
        gmGroupId: '', // 加盟小组
        gmId: '', // 加盟经理Id
        scGmId: '', // 渠道经理
        dealStatus: '', // 是否成交 0 未成交 1 成交
        sourceChannel: '', // 渠道
        mode: '', // 来源 1 扫描推广码 2 转发  3 填写推荐信息 4 其他
        joinType: '', // 方式 1 微信授权 2 入驻 3 推荐
        status: '', // 线索状态 0 喜鹊 1云雀
        startDate: '',
        endDate: ''
      },
      tabType: [
        { type: '全部', code: '', num: '' },
        { type: '待跟进', code: '0', num: '' },
        { type: '已转化', code: '1', num: '' }
      ],
      checked: false,
      changeManagerStatus: false,
      page: {
        current: 0,
        size: 10
      }
    };
  },
  computed: {
    checkall: {
      get: function() {
        return this.lists.length === this.checkedList.length;
      },
      set: function(val) {
        if (val) {
          this.checkedList = [];
          this.lists.map((ele) => {
            this.checkedList.push(ele.clueId);
          });
        } else {
          this.checkedList = [];
        }
      }
    }
  },
  watch: {
    active(val) {
      this.checkedList = [];
    },
    'ruleForm.workCity'(val) {
      if (val !== '') {
        this.getGmId()
        this.getScGmId()
        this.getGmGroupId()
        this.ruleForm.gmId = ''
        this.formText.gmId = ''
        this.ruleForm.scGmId = ''
        this.formText.scGmId = ''
        this.ruleForm.gmGroupId = ''
        this.formText.gmGroupId = ''
      }
    },
    'ruleForm.busiType'(val) {
      this.getGmId()
      this.getScGmId()
      this.getGmGroupId()
      this.ruleForm.gmId = ''
      this.formText.gmId = ''
      this.ruleForm.scGmId = ''
      this.formText.scGmId = ''
      this.ruleForm.gmGroupId = ''
      this.formText.gmGroupId = ''
    },
    'ruleForm.gmGroupId'(val) {
      this.getGmId()
      this.getScGmId()
      this.ruleForm.gmId = ''
      this.formText.gmId = ''
      this.ruleForm.scGmId = ''
      this.formText.scGmId = ''
    },
    'ruleForm.mode'(val) {
      if (val === 3) {
        this.ruleForm.joinType = ''
        this.formText.joinType = ''
      }
    }
  },
  mounted() {
  },
  methods: {
    // 联动请求加盟小组
    getGmGroupId() {
      let params = {
        'cityCode': this.ruleForm.workCity, // 工作城市
        'busiLine': this.ruleForm.busiType // 业务线
      }
      if (this.ruleForm.busiType !== '') {
        params.busiLine = params.busiLine + 2
      }
      params = this.removeEmpty(params)
      GetGmGroup(params)
        .then(({ data }) => {
          if (data.success) {
            this.columns_gmGroupId = data.data.map(ele => {
              return { name: ele.name, code: ele.id, nameInput: ele.name }
            })
          } else {
            this.$toast(data.errorMsg)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    // 联动请求渠道经理
    getScGmId() {
      let params = {
        'cityCode': this.ruleForm.workCity, // 工作城市
        'productLine': this.ruleForm.busiType, // 业务线
        'gmGroup': this.ruleForm.gmGroupId, // 加盟小组
        'roleType': 4
      }
      if (this.ruleForm.busiType !== '') {
        params.productLine = params.productLine + 2
      }
      params = this.removeEmpty(params)
      GetUserList(params)
        .then(({ data }) => {
          if (data.success) {
            this.columns_scGmId = data.data.map(ele => {
              return { name: ele.name + ' ' + ele.mobile + '（渠道经理）', code: ele.id, nameInput: ele.name }
            })
          } else {
            this.$toast(data.errorMsg)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    // 联动请求加盟经理
    getGmId() {
      let params = {
        'cityCode': this.ruleForm.workCity, // 工作城市
        'productLine': this.ruleForm.busiType, // 业务线
        'gmGroup': this.ruleForm.gmGroupId, // 加盟小组
        'roleType': 1
      }
      if (this.ruleForm.busiType !== '') {
        params.productLine = params.productLine + 2
      }
      params = this.removeEmpty(params)
      GetUserList(params)
        .then(({ data }) => {
          if (data.success) {
            this.columns_GmManager = data.data.map(ele => {
              return { name: ele.name + ' ' + ele.mobile + '（加盟经理）', code: ele.id, nameInput: ele.name }
            })
          } else {
            this.$toast(data.errorMsg)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    /**
     * 请求字典接口
     */
    fetchData() {
      GetDictionaryList(['Intentional_compartment'])
        .then(({ data }) => {
          if (data.success) {
            this.columns_carType = data.data.Intentional_compartment.map(ele => {
              return { name: ele.dictLabel, code: ele.dictValue }
            })
          }
        }).catch((err) => {
          console.log(err)
        });
      getCurrentLowerOfficeCityData({})
        .then(({ data }) => {
          if (data.success) {
            this.columns_workCity = data.data;
            this.getGmId()
            this.getGmGroupId()
            this.getScGmId()
          }
        }).catch((err) => {
          console.log(err)
        });
    },
    async onLoad(isInit = false) {
      if (isInit === true) { // 下拉刷新
        this.page.current = 1
        this.lists = []
      } else { // 上拉加载更多
        this.page.current++
      }
      let result = await this.getLists(isInit)
      if (!result) {
        return false
      }

      if (isInit === true) { // 下拉刷新
        this.lists = result.lists
        this.refreshing = false
        this.loading = false
        this.finished = false
      } else { // 上拉加载更多
        this.lists.push(...result.lists)
        this.loading = false;
        let hasMore = result.total > this.lists.length
        if (!hasMore) {
          this.finished = true
        }
      }
    },
    /**
     * 下拉刷新
     */
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    // 状态切换
    async handleTabChange(tab) {
      if (tab === 0) {
        this.ruleForm.status = ''
      } else {
        this.ruleForm.status = String(tab)
      }
      this.loading = true
      this.onLoad(true)
    },
    // 获取列表
    async getLists(isInit) {
      try {
        let params = {
          page: this.page.current,
          limit: this.page.size
        }
        this.ruleForm.workCity && (params.workCity = Number(this.ruleForm.workCity))
        this.ruleForm.busiType !== '' && (params.busiType = this.ruleForm.busiType)
        this.ruleForm.carType && (params.carType = Number(this.ruleForm.carType))
        this.ruleForm.gmGroupId && (params.gmGroupId = this.ruleForm.gmGroupId)
        this.ruleForm.gmId && (params.gmId = this.ruleForm.gmId)
        this.ruleForm.scGmId && (params.scGmId = this.ruleForm.scGmId)
        this.ruleForm.dealStatus && (params.dealStatus = this.ruleForm.dealStatus)
        this.ruleForm.sourceChannel && (params.sourceChannel = this.ruleForm.sourceChannel)
        this.ruleForm.mode && (params.mode = this.ruleForm.mode)
        this.ruleForm.joinType && (params.joinType = this.ruleForm.joinType)
        this.ruleForm.status && (params.status = Number(this.ruleForm.status))
        if (this.ruleForm.startDate && this.ruleForm.endDate) {
          this.ruleForm.startDate && (params.startDate = new Date(this.ruleForm.startDate).getTime())
          this.ruleForm.endDate && (params.endDate = new Date(this.ruleForm.endDate).getTime() + 86400000)
        }
        let { data: res } = await getClueList(params)
        if (res.success) {
          let newLists = res.data
          let result = {
            lists: newLists,
            total: res.page.total
          }
          this.tabType.forEach(item => {
            if (item.code === this.ruleForm.status) {
              item.num = res.page.total
            } else {
              item.num = ''
            }
          })
          return result
        } else {
          this.loading = false;
          this.error = true;
          this.finished = true
          this.refreshing = false
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
        this.finished = true
        this.refreshing = false
        console.log(`get list fail:${err}`)
      }
    },
    async onSubmit(value) {
      this.loading = true
      this.onLoad(true)
      this.showScreen = false
    },
    /**
     * 重置form
     */
    onReset(form) {
      this.ruleForm = this.$options.data().ruleForm;
      this.formText = this.$options.data().formText;
      form.resetValidation();
    },
    /**
     * 新建面试表单入口
     */
    startScreen(val) {
      this.showScreen = val.show;
      this.fetchData()
    },
    /**
     * 更换归属人
     */
    changeManager(val) {
      this.checked = val.show;
    },
    /**
     * picker 选择
     */
    onConfirmPicker(value) {
      if (!value) return;
      this.formText[this.pickerKey] = value.nameInput ? value.nameInput : value.name;
      this.ruleForm[this.pickerKey] = value.code;
      this.showPicker = false;
    },
    /**
     * 显示picker
     */
    showPickerFn(key) {
      this.pickerKey = key;
      switch (key) {
        case 'workCity':
          this.columns = this.columns_workCity;
          break;
        case 'busiType':
          this.columns = this.columns_busiType;
          break;
        case 'scGmId':
          this.columns = this.columns_scGmId;
          break;
        case 'gmGroupId':
          this.columns = this.columns_gmGroupId;
          break;
        case 'gmId':
          this.columns = this.columns_GmManager;
          break;
        case 'carType':
          this.columns = this.columns_carType;
          break;
        case 'dealStatus':
          this.columns = this.columns_dealStatus;
          break;
        case 'sourceChannel':
          this.columns = this.columns_sourceChannel;
          break;
        case 'mode':
          this.columns = this.columns_mode;
          break;
        case 'joinType':
          this.columns = this.columns_joinType;
          break;
      }
      this.showPicker = true;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.dateShow = false;
      let startDate = parseTime(start, '{y}-{m}-{d}');
      let endDate = parseTime(end, '{y}-{m}-{d}');
      this.formText.dateArr = `${startDate} - ${endDate}`;
      this.ruleForm.startDate = start;
      this.ruleForm.endDate = end;
    },
    closeManagerPop(val) {
      this.changeManagerStatus = val.status
    },
    // 删除对象空属性
    removeEmpty(obj) {
      Object.keys(obj).forEach((key) => (obj[key] === '') && delete obj[key]);
      return obj
    },
    /**
     * 取消选择归属人
     */
    cancelManager() {
      this.checked = false;
      this.checkedList = [];
    },
    changeOver() {
      this.checked = false;
      this.changeManagerStatus = false;
      this.loading = true
      this.onLoad(true)
    },
    /**
     * 选则加盟经理
     */
    confirmManager() {
      if (this.checkedList.length === 0) {
        return Notify({
          type: 'warning',
          message: '请选择线索',
          duration: 2000
        });
      } else {
        this.changeManagerStatus = true
      }
    },
    /**
     * item选中
     */
    changeCheck(val) {
      if (val.change) {
        this.checkedList.push(val.item);
      } else {
        let arr = this.checkedList.filter((ele) => {
          return ele !== val.item;
        });
        this.checkedList = arr;
      }
    }
  }
};
</script>
<style scoped lang="less">
.ClueList {
  display: flex;
  flex-direction: column;
  background: @body-bg;
  background-color: @body-bg;
  position: relative;
  .top {
    margin-bottom: 5px;
    background-color: @body-bg;
  }
  .bottomBtn {
    padding: 15px 0;
    box-sizing: border-box;
    margin: 0 15px;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100vw - 30px);
    background-color: @body-bg;
  }
  .checkAll {
    padding: 5px 15px 7px 15px;
    box-sizing: border-box;
    font-size: 13px;
    color: #7f8fbd;
    letter-spacing: 0;
    text-align: center;
    z-index: 99;
    background-color: @body-bg;
  }
  .list {
    margin-top: 5px;
    padding: 0 15px;
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
  }
  .items {
    margin-bottom: 10px;
  }
}
.padd {
  padding-bottom: 60px;
  box-sizing: border-box;
}
</style>
