<template>
  <div class="DriverList">
    <DriverTitle @screen="startScreen" />
    <van-tabs v-model="active" sticky animated>
      <van-tab v-for="(item,index) in tabType" :key="index">
        <template #title>
          {{ item.type }}<div class="van-info">
            99+
          </div>
        </template>
        内容 {{ index }}
      </van-tab>
    </van-tabs>

    <SelfPopup
      ref="container"
      :show.sync="showScreen"
      form-ref="form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <van-field
        v-model="ruleForm.username"
        readonly
        name="username"
        label="工作城市"
        placeholder="请选择"
        @click="suggestShow = true"
      />
      <van-field
        v-model="ruleForm.username"
        readonly
        name="workCity"
        label="业务线"
        placeholder="请选择"
        @click="suggestShow = true"
      />
      <van-field
        v-model="ruleForm.username"
        readonly
        name="username"
        label="加盟小组"
        placeholder="请选择"
        @click="suggestShow = true"
      />
      <van-field
        v-model="ruleForm.username"
        readonly
        name="username"
        label="加盟经理"
        placeholder="请选择"
        @click="suggestShow = true"
      />
      <van-field
        v-model="ruleForm.username"
        readonly
        name="username"
        label="车型"
        placeholder="请选择"
        @click="suggestShow = true"
      />
      <van-field
        v-model="ruleForm.username"
        readonly
        name="username"
        label="订单状态"
        placeholder="请选择"
        @click="suggestShow = true"
      />
      <van-field
        v-model="startDate"
        readonly
        name="startDate"
        label="创建时间"
        placeholder="请选择"
        @click="dateShow = true"
      />
    </SelfPopup>

    <van-popup
      v-model="suggestShow"
      round
      position="bottom"
      :style="{ height: '90%',width: '100%' }"
    >
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @input="onSearch"
      ></van-search>
      <div>
        <van-cell v-for="item in num" :key="item.code" @click="chooseItem(item)">
          {{ `测试哦` + item.name }}
        </van-cell>
      </div>
    </van-popup>

    <van-popup
      v-model="dateShow"
      round
      position="bottom"
    >
      <van-datetime-picker
        v-model="ruleForm.startDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmStart"
        @cancel="dateShow = false"
      />
    </van-popup>
  </div>
</template>
<script>
// import parseTime from '../../../utils/index.js'
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
    SelfPopup
  },
  data() {
    return {
      showScreen: false,
      searchValue: '',
      suggestShow: false,
      dateShow: false,
      startDate: '',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      active: 0,
      ruleForm: {
        username: '',
        startDate: new Date()
      },
      tabType: [
        { type: '全部', code: '' },
        { type: '已面试', code: 1 },
        { type: '待成交', code: 2 },
        { type: '已成交', code: 3 },
        { type: '已上岗', code: 4 },
        { type: '已退出', code: 5 }
      ],
      num: [
        { name: 'li', code: '00' },
        { name: 'li1', code: '01' },
        { name: 'li2', code: '02' }
      ]
    };
  },
  mounted() {},
  methods: {
    onSubmit(value) {
      console.log('submit', value, this.ruleForm);
    },
    onReset(form) {
      console.log(form);
      console.log('reset');
    },
    startScreen(val) {
      this.showScreen = val.show
    },
    onSearch() {
      if (this.searchValue) {
        console.log(this.searchValue);
      }
    },
    onCancel() {
      this.suggestShow = false;
    },
    chooseItem(item) {
      this.ruleForm.username = item.name;
      this.onCancel()
    },
    confirmStart(value) {
      this.startDate = this.formatDateTime(value)
      this.dateShow = false
    },
    formatDateTime(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    }
  }
}
</script>
<style scoped>

</style>
