<template>
  <div :class="checked ? 'DriverList padd' : 'DriverList'">
    <DriverTitle
      @screen="startScreen"
      @changeManager="changeManager"
    />
    <van-sticky
      :offset-top="90"
      :style="{height: checked ? '72px' : '56px'}"
    >
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
    </van-sticky>

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
        v-model="formText.businessType"
        readonly
        name="businessType"
        label="业务线"
        placeholder="请选择"
        @click="showPickerFn('businessType')"
      />
      <!-- <van-field
        v-model="formText.GmGroup"
        readonly
        name="GmGroup"
        label="加盟小组"
        placeholder="请选择"
        @click="showPickerFn('GmGroup')"
      /> -->
      <van-field
        v-model="formText.GmManager"
        readonly
        name="GmManager"
        label="加盟经理"
        placeholder="请选择"
        @click="showPickerFn('GmManager')"
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
        v-model="formText.orderStatus"
        readonly
        name="orderStatus"
        label="订单状态"
        placeholder="请选择"
        @click="showPickerFn('orderStatus')"
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
      :min-date="minDate"
      :max-data="maxDate"
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

    <!-- 选择加盟经理弹窗 -->
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
        选择加盟经理
      </van-button>
    </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils';
import ListItem from './components/ListItem';
import DriverTitle from './components/DriverTitle';
import SelfPopup from '@/components/SelfPopup';
import changeManager from './components/ChangeManager'
import { Toast, Cell, Form, Tab, Notify } from 'vant';
import { getDriverList } from '@/api/driver.js'
import { GetDictionaryList, getCurrentLowerOfficeCityData } from '@/api/common'
export default {
  name: 'DriverList',
  components: {
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Tab.name]: Tab,
    [Notify.name]: Notify,
    DriverTitle,
    SelfPopup,
    ListItem,
    changeManager
  },
  data() {
    return {
      checkedList: [],
      lists: [],
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      columns: [],
      pickerKey: '',
      columns_businessType: [
        { name: '全部', code: '' },
        { name: '专车', code: 0 },
        { name: '共享', code: 1 }
      ],
      columns_workCity: [],
      columns_GmGroup: [
        { name: '共享一组', code: '' },
        { name: '共享二组', code: 0 },
        { name: '共享三组', code: 1 }
      ],
      columns_GmManager: [
        { name: '李威山', code: '' },
        { name: '闫义杰', code: 0 },
        { name: '高艳涛', code: 1 }
      ],
      columns_orderStatus: [
        { name: '全部', code: '' },
        { name: '已成交', code: '30' },
        { name: '审核不通过', code: '25' },
        { name: '待审核', code: '20' },
        { name: '待确认', code: '15' }
        // { label: '已退出', value: '5' }
      ],
      columns_carType: [],
      showPicker: false,
      showScreen: false,
      minDate: new Date(+new Date() - 86400000 * 365),
      maxDate: new Date(+new Date() + 86400000 * 365),
      dateShow: false,
      active: 0,
      formText: {
        workCity: '',
        businessType: '',
        GmGroup: '',
        GmManager: '',
        carType: '',
        orderStatus: '',
        dateArr: ''
      },
      ruleForm: {
        workCity: '',
        businessType: '',
        // GmGroup: '',
        GmManager: '',
        carType: '',
        status: 'all',
        startDate: '',
        endDate: '',
        orderStatus: ''
      },
      tabType: [
        { type: '全部', code: 'all', num: '' },
        { type: '已面试', code: '1', num: '' },
        { type: '待成交', code: '2', num: '' },
        { type: '已成交', code: '3', num: '' },
        { type: '已上岗', code: '4', num: '' },
        { type: '已退出', code: '5', num: '' }
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
            this.checkedList.push(ele.driverId);
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
    }
  },
  mounted() {
    // 请求字典
    this.fetchData();
  },
  methods: {
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
      this.lists = result.lists
      if (isInit === true) { // 下拉刷新
        this.refreshing = false
        this.finished = false
      } else { // 上拉加载更多
        this.loading = false;
        if (!result.hasMore) {
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
        this.ruleForm.status = 'all'
      } else {
        this.ruleForm.status = String(tab)
      }
      this.page.current = 1
      let result = await this.getLists(true)
      this.lists = result.lists
    },
    // 获取列表
    async getLists(isInit) {
      try {
        this.$loading(true)
        let params = {
          page: this.page.current,
          limit: this.page.size
        }
        this.ruleForm.workCity && (params.workCity = this.ruleForm.workCity)
        this.ruleForm.businessType && (params.businessType = this.ruleForm.businessType)
        this.ruleForm.GmManager && (params.GmManager = this.ruleForm.GmManager)
        this.ruleForm.carType && (params.carType = this.ruleForm.carType)
        this.ruleForm.status && (params.status = this.ruleForm.status)
        this.ruleForm.orderStatus && (params.orderStatus = this.ruleForm.orderStatus)
        if (this.ruleForm.startDate && this.ruleForm.endDate) {
          this.ruleForm.startDate && (params.startDate = new Date(this.ruleForm.startDate).getTime())
          this.ruleForm.endDate && (params.endDate = new Date(this.ruleForm.endDate).getTime())
        }
        let { data: res } = await getDriverList(params)
        if (res.success) {
          let newLists = res.data
          if (!isInit) {
            newLists = this.lists.concat(newLists)
          }
          let result = {
            lists: newLists,
            hasMore: res.page.total > newLists.length
          }
          this.tabType.forEach(item => {
            if (item.code === this.ruleForm.status) {
              item.num = res.title[item.code]
            } else {
              item.num = ''
            }
          })
          return result
        } else {
          this.loading = false;
          this.error = true;
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
        console.log(`get list fail:${err}`)
      } finally {
        this.$loading(false)
      }
    },
    async onSubmit(value) {
      // let result = await this.getLists(true)
      // this.lists = result.lists
      // this.onRefresh();
      this.getLists()
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
    },
    /**
     * 更换加盟经理
     */
    changeManager(val) {
      this.checked = val.show;
    },
    /**
     * picker 选择
     */
    onConfirmPicker(value) {
      this.formText[this.pickerKey] = value.name;
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
        case 'businessType':
          this.columns = this.columns_businessType;
          break;
        // case 'GmGroup':
        //   this.columns = this.columns_GmGroup;
        //   break;
        case 'GmManager':
          this.columns = this.columns_GmManager;
          break;
        case 'carType':
          this.columns = this.columns_carType;
          break;
        case 'orderStatus':
          this.columns = this.columns_orderStatus;
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
    /**
     * 取消选择加盟经理
     */
    cancelManager() {
      this.checked = false;
      this.checkedList = [];
    },
    changeOver() {
      this.checked = false;
    },
    /**
     * 选则加盟经理
     */
    confirmManager() {
      if (this.checkedList.length === 0) {
        return Notify({
          type: 'warning',
          message: '请选择新的加盟经理',
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
          return ele !== val;
        });
        this.checkedList = arr;
      }
    }
  }
};
</script>
<style scoped lang="less">
.DriverList {
  background-color: @body-bg;
  position: relative;
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
    z-index: 2;
    background-color: @body-bg;
  }
  .list {
    margin-top: 5px;
    padding: 0 15px;
    box-sizing: border-box;
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
