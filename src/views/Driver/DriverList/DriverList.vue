<template>
  <div class="DriverList">
    <DriverTitle @screen="startScreen" @changeManager="changeManager" />
    <van-tabs v-model="active" sticky animated>
      <van-tab v-for="(item,index) in tabType" :key="index">
        <template #title>
          {{ item.type }}<div class="van-info">
            99+
          </div>
        </template>
      </van-tab>
    </van-tabs>
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
            :item="item"
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
        @click="suggestShow = true"
      />
      <van-field
        v-model="formText.businessType"
        readonly
        name="businessType"
        label="业务线"
        placeholder="请选择"
        @click="showPicker_businessType = true"
      />
      <van-field
        v-model="formText.GmGroup"
        readonly
        name="GmGroup"
        label="加盟小组"
        placeholder="请选择"
        @click="suggestShow = true"
      />
      <van-field
        v-model="formText.GmManager"
        readonly
        name="GmManager"
        label="加盟经理"
        placeholder="请选择"
        @click="suggestShow = true"
      />
      <van-field
        v-model="formText.carType"
        readonly
        name="carType"
        label="车型"
        placeholder="请选择"
        @click="suggestShow = true"
      />
      <van-field
        v-model="formText.status"
        readonly
        name="status"
        label="订单状态"
        placeholder="请选择"
        @click="suggestShow = true"
      />
      <van-field
        v-model="formText.startDate"
        readonly
        name="startDate"
        label="创建时间"
        placeholder="请选择"
        @click="dateShow = true"
      />
    </SelfPopup>

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

    <Suggest
      v-model="suggestShow"
      :options="options"
      type="selectName"
      @keyWordValue="handleSearchChangeworkCity"
      @finish="handleValueClickworkCity"
      @closed="suggestShow=false"
    />

    <van-popup v-model="showPicker_businessType" round position="bottom">
      <van-picker
        value-key="label"
        title="业务线"
        show-toolbar
        :columns="columns_businessType"
        @confirm="onConfirm_businessType"
        @cancel="showPicker_businessType = false"
      />
    </van-popup>
  </div>
</template>
<script>
import ListItem from './components/ListItem'
import Suggest from '@/components/SuggestSearch.vue'
import DriverTitle from './components/DriverTitle'
import SelfPopup from '@/components/SelfPopup';
import { Toast, Cell, Form, Tab } from 'vant';
export default {
  name: 'DriverList',
  components: {
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Tab.name]: Tab,
    DriverTitle,
    SelfPopup,
    Suggest,
    ListItem
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      columns_businessType: [
        { label: '专车', value: 0 },
        { label: '共享', value: 1 }
      ],
      showPicker_businessType: false,
      showScreen: false,
      searchValue: '',
      suggestShow: false,
      dateShow: false,
      startDate: '',
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
        startDate: ''
      },
      ruleForm: {
        workCity: '',
        businessType: '',
        GmGroup: '',
        GmManager: '',
        carType: '',
        status: '',
        startDate: ''
      },
      tabType: [
        { type: '全部', code: '' },
        { type: '已面试', code: 1 },
        { type: '待成交', code: 2 },
        { type: '已成交', code: 3 },
        { type: '已上岗', code: 4 },
        { type: '已退出', code: 5 }
      ],
      options: [
        {
          label: 'tom',
          value: 1
        },
        {
          label: 'jack',
          value: 2
        },
        {
          label: 'lily',
          value: 3
        }
      ]
    };
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
        if (this.list.length >= 40) {
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
    changeManager() {
    },
    onSearch() {
      if (this.searchValue) {
        console.log(this.searchValue);
      }
    },
    onCancel() {
      this.suggestShow = false;
    },
    onConfirm_businessType(value, index) {
      this.ruleForm.businessType = value.value
      this.formText.businessType = value.label
      this.showPicker_businessType = false
    },
    confirmStart(value) {
      this.formText.startDate = this.formatDateTime(value)
      this.ruleForm.startDate = value.getTime()
      this.dateShow = false
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
     * 模糊查询
     */
    handleSearchChangeworkCity(value) {
      console.log('这里面接口请求模糊查询:', value)
    },
    /**
     *点击某一项
     */
    handleValueClickworkCity(obj) {
      this.formText.workCity = obj.label
      this.ruleForm.workCity = obj.value
    }
  }
}
</script>
<style scoped>

</style>
