<template>
  <div :class="checked ? 'DriverList padd' : 'DriverList'">
    <DriverTitle @screen="startScreen" @changeManager="changeManager" />
    <van-sticky :offset-top="90" :style="{height: checked ? '72px' : '56px'}">
      <van-tabs v-model="active" sticky animated line-width="30" line-height="2">
        <van-tab v-for="(item,index) in tabType" :key="index">
          <template #title>
            {{ item.type }}<div class="van-info">
              99+
            </div>
          </template>
        </van-tab>
      </van-tabs>
      <div class="checkAll">
        <van-checkbox v-if="checked" v-model="checkall" class="checked" shape="square">
          全选({{ checkedList.length }})
        </van-checkbox>
      </div>
    </van-sticky>

    <div class="list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ListItem
            v-for="(item, index) in list"
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
      <van-field
        v-model="formText.GmGroup"
        readonly
        name="GmGroup"
        label="加盟小组"
        placeholder="请选择"
        @click="showPickerFn('GmGroup')"
      />
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
        v-model="formText.status"
        readonly
        name="status"
        label="订单状态"
        placeholder="请选择"
        @click="showPickerFn('status')"
      />
      <van-field
        v-model="formText.startDate"
        readonly
        name="startDate"
        label="创建时间"
        placeholder="开始日期"
        @click="dateShow = true"
      />
      <van-field
        v-model="formText.endDate"
        readonly
        name="endDate"
        label=" "
        placeholder="结束日期"
        @click="dateShowEnd = true"
      />
    </SelfPopup>

    <!-- 开始时间 -->
    <van-popup
      v-model="dateShow"
      round
      position="bottom"
    >
      <van-datetime-picker
        v-model="startDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmStart"
        @cancel="dateShow = false"
      />
    </van-popup>

    <!-- 结束时间 -->
    <van-popup
      v-model="dateShowEnd"
      round
      position="bottom"
    >
      <van-datetime-picker
        v-model="endDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmEnd"
        @cancel="dateShowEnd = false"
      />
    </van-popup>

    <!-- picker -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        value-key="label"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirmPicker"
      />
    </van-popup>

    <div v-if="checked" class="bottomBtn">
      <van-button color="#2F448A" plain style="width:38%" @click="cancelManager">
        取消
      </van-button>
      <van-button type="primary" style="width:61%" @click="confirmManager">
        选择加盟经理
      </van-button>
    </div>
  </div>
</template>
<script>
import ListItem from './components/ListItem'
import DriverTitle from './components/DriverTitle'
import SelfPopup from '@/components/SelfPopup';
import { Toast, Cell, Form, Tab, Notify } from 'vant';
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
    ListItem
  },
  data() {
    return {
      checkedList: [],
      list: [],
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      columns: [],
      pickerKey: '',
      columns_businessType: [
        { label: '全部', value: '' },
        { label: '专车', value: 0 },
        { label: '共享', value: 1 }
      ],
      columns_workCity: [
        { label: '北京', value: '' },
        { label: '河南', value: 0 },
        { label: '澳大利亚', value: 1 }
      ],
      columns_GmGroup: [
        { label: '共享一组', value: '' },
        { label: '共享二组', value: 0 },
        { label: '共享三组', value: 1 }
      ],
      columns_GmManager: [
        { label: '李威山', value: '' },
        { label: '闫义杰', value: 0 },
        { label: '高艳涛', value: 1 }
      ],
      columns_status: [
        { label: '状态1', value: '' },
        { label: '状态2', value: 0 },
        { label: '状态3', value: 1 }
      ],
      columns_carType: [{
        label: '金杯',
        value: '123'
      },
      {
        label: '金2杯',
        value: '1223'
      }],
      showPicker: false,
      showScreen: false,
      dateShow: false,
      dateShowEnd: false,
      startDate: '',
      endDate: '',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      active: 0,
      formText: {
        workCity: '',
        businessType: '',
        GmGroup: '',
        GmManager: '',
        carType: '',
        status: '',
        startDate: '',
        endDate: ''
      },
      ruleForm: {
        workCity: '',
        businessType: '',
        GmGroup: '',
        GmManager: '',
        carType: '',
        status: '',
        startDate: '',
        endDate: ''
      },
      tabType: [
        { type: '全部', code: '' },
        { type: '已面试', code: 1 },
        { type: '待成交', code: 2 },
        { type: '已成交', code: 3 },
        { type: '已上岗', code: 4 },
        { type: '已退出', code: 5 }
      ],
      checked: false
    };
  },
  computed: {
    checkall: {
      get: function() {
        return (this.list.length === this.checkedList.length)
      },
      set: function(val) {
        console.log(val)
        if (val) {
          this.checkedList = []
          this.list.map(ele => {
            this.checkedList.push(ele)
          })
        } else {
          this.checkedList = []
        }
      }
    }
  },
  mounted() {},
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({ item: this.list.length + 1 });
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 20) {
          this.finished = true;
        }
      }, 1000);
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
    onSubmit(value) {
      console.log(this.ruleForm);
      this.onRefresh();
    },
    /**
     * 重置form
     */
    onReset(form) {
      this.ruleForm = this.$options.data().ruleForm;
      this.formText = this.$options.data().formText;
      form.resetValidation()
    },
    /**
     * 新建面试表单入口
    */
    startScreen(val) {
      this.showScreen = val.show
    },
    /**
     * 更换加盟经理
     */
    changeManager(val) {
      this.checked = val.show
    },
    /**
     * picker 选择
     */
    onConfirmPicker(value) {
      this.formText[this.pickerKey] = value.label;
      this.ruleForm[this.pickerKey] = value.value;
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
        case 'GmGroup':
          this.columns = this.columns_GmGroup;
          break;
        case 'GmManager':
          this.columns = this.columns_GmManager;
          break;
        case 'carType':
          this.columns = this.columns_carType;
          break;
        case 'status':
          this.columns = this.columns_status;
          break;
      }
      this.showPicker = true;
    },
    confirmStart(value) {
      this.formText.startDate = this.formatDateTime(value)
      this.ruleForm.startDate = value.getTime()
      this.dateShow = false
    },
    confirmEnd(value) {
      this.formText.endDate = this.formatDateTime(value)
      this.ruleForm.endDate = value.getTime()
      this.dateShowEnd = false
    },
    formatDateTime(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    /**
     * 取消选择加盟经理
     */
    cancelManager() {
      this.checked = false;
      this.checkedList = []
    },
    /**
     * 选则加盟经理
     */
    confirmManager() {
      if (this.checkedList.length === 0) {
        return Notify({ type: 'warning', message: '请选择新的加盟经理', duration: 2000 });
      }
    },
    /**
     * item选中
     */
    changeCheck(val) {
      console.log('tag', val)
      if (val.change) {
        this.checkedList.push(val.item)
      } else {
        let arr = this.checkedList.filter(ele => {
          return ele !== val.item
        })
        this.checkedList = arr
      }
    }
  }
}
</script>
<style scoped lang="less">
.DriverList{
  background-color:@body-bg;
  position: relative;
  .bottomBtn{
    padding: 15px 0;
    box-sizing: border-box;
    margin: 0 15px;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc( 100vw - 30px );
    background-color:@body-bg;
  }
  .checkAll{
    padding: 5px 15px 7px 15px;
    box-sizing: border-box;
    font-size: 13px;
    color: #7F8FBD;
    letter-spacing: 0;
    text-align: center;
    z-index: 2;
    background-color:@body-bg;
  }
  .list{
    margin-top: 5px;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .items{
    margin-bottom: 10px;
  }
}
.padd{
  padding-bottom: 40px;
  box-sizing: border-box;
}
</style>
