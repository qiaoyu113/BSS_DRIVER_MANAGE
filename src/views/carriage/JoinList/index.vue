<template>
  <div class="OutSideList">
    <!-- navbar -->
    <div class="top">
      <van-nav-bar title="加盟运费" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <div v-if="form.wayBillGMSaleStatus !== 1" class="headerRight" @click="batch">
            批量上报
          </div>
        </template>
      </van-nav-bar>
      <!-- 搜索 -->
      <van-search show-action placeholder="请输入司机名称/手机号" readonly @click="handleSearchClick">
        <template #action>
          <div class="searchSelect" @click="filter_left">
            筛选
            <van-icon name="play" color="#3C4353" />
          </div>
        </template>
      </van-search>
      <!-- tabs -->
      <van-tabs v-model="form.wayBillGMSaleStatus" swipeable @change="handleTabChange">
        <van-tab v-for="item in tabArrs" :key="item.text" :name="item.name">
          <template #title>
            {{ item.title }}
            <div v-if="item.name === form.wayBillGMSaleStatus" class="van-info">
              {{ item.total }}
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="list">
      <!-- 下拉刷新  上拉加载 -->
      <van-pull-refresh v-model="refreshing" @refresh="onLoad(true)">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <P v-if="optionsType" class="all">
            <van-checkbox v-model="checkAll" class="checked" shape="square" @click="checkAlls">
              <span class="text">全选</span>
              <span class="text">已选择{{ checkedNum }} 个出车单</span>
            </van-checkbox>
          </P>
          <van-checkbox-group ref="checkboxGroup" v-model="checkResult" max="20">
            <div v-for="sub in lists" :key="sub.id" class="listBox">
              <p v-if="optionsType" class="checked-box">
                <!----sub.gmStatusCode !== 0 判断未确认是否使用的逻辑--->
                <!-- <van-checkbox v-if="sub.gmStatusCode === 0" :disabled="disabledCheck(sub.departureDate, sub.gmStatusCode !== 0)" :name="sub.wayBillId" shape="square" /> -->
                <van-checkbox v-if="sub.gmStatusCode === 0" :disabled="disabledCheck(sub.departureDate)" :name="sub.wayBillId" shape="square" />
              </p>
              <CardItem :obj="sub" />
            </div>
          </van-checkbox-group>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 右侧筛选抽屉 -->
    <SelfPopup
      :show.sync="showPopup"
      form-ref="form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <van-field
        readonly
        clickable
        colon
        label-width="6em"
        is-link
        label="司机城市"
        name="driverCity"
        :value="pickerNames.driverCity"
        placeholder="请选择"
        @click="showPickerCity = true"
      />
      <van-field
        v-model="form.driver"
        colon
        name="driver"
        label-width="6em"
        label="司机"
        placeholder="请输入"
      />
      <van-field
        v-model="form.line"
        colon
        label-width="6em"
        name="line"
        label="线路"
        placeholder="请输入"
      />
      <van-field
        label-width="6em"
        :value="pickerNames['gmId']"
        readonly
        colon
        clickable
        is-link
        label="加盟经理"
        placeholder="请选择"
        @click="handleShowModal()"
      />
      <van-field
        readonly
        colon
        clickable
        label="出车时间"
        label-width="6em"
        is-link
        name="date"
        :value="pickerNames.date"
        placeholder="请选择"
        @click="showCalendar = true"
      />
    </SelfPopup>
    <!-- 日历 -->
    <van-calendar
      v-model="showCalendar"
      type="range"
      :min-date="minDate"
      :max-data="maxDate"
      :allow-same-day="true"
      @confirm="onConfirm"
    />
    <!-- picker -->
    <van-popup v-model="showPickerCity" round position="bottom">
      <van-picker
        show-toolbar
        :value-key="'name'"
        :columns="cityList"
        @cancel="showPickerCity = false"
        @confirm="onConfirmPickerCity"
      />
    </van-popup>
    <!-- 模糊搜索组件 -->
    <Suggest
      v-model="showModal"
      :options="options"
      :type="'gmId'"
      @keyWordValue="handleSearchChange"
      @finish="handleValueClick"
      @closed="showModal=false"
    />
    <div v-if="optionsType" class="Bulk">
      <button @click="cancel()">
        取消批量上报
      </button>
      <button @click="Add_to()">
        批量上报运费
      </button>
    </div>
  </div>
</template>

<script>
import { getOpenCitys, GetSpecifiedRoleList } from '@/api/common'
import CardItem from '../components/Cardltem'
import SelfPopup from '@/components/SelfPopup';
import Suggest from '@/components/SuggestSearch.vue'
import { parseTime } from '@/utils'
import { getGmInfoList, wayBillAmountDetail } from '@/api/freight'
import dayjs from 'dayjs'
export default {
  components: {
    CardItem,
    SelfPopup,
    Suggest
  },
  data() {
    return {
      showSuggest: true,
      error: false,
      showPopup: false, // 打开查询抽屉
      showCalendar: false, // 打开日历
      refreshing: false, // 下拉刷新
      loading: false, // 上拉加载
      finished: false, // 是否加载完成
      active: '', // 当前激活的tab,
      // picker
      minDate: new Date(+new Date() - 86400000 * 365),
      maxDate: new Date(+new Date() + 86400000 * 365),
      optionsType: false,
      checkResult: [],
      checkAll: false,
      tabArrs: [
        {
          title: '全部',
          total: 0,
          name: ''
        },
        {
          title: '待上报',
          total: 0,
          name: 0
        },
        {
          title: '已上报',
          total: 0,
          name: 1
        }
      ],
      lists: [],
      showPicker: false,
      // search
      form: {
        driverCity: '', // 司机城市
        driver: '', // 司机
        line: '', // 线路
        gmId: '', // 上岗经理
        startDate: '', // 线路上岗开始时间
        endDate: '', // 线路上岗结束时间
        wayBillGMSaleStatus: '' // 加盟侧和线路侧运单状态 全部null,待上报0,已上报1
      },
      page: {
        current: 0,
        limit: 20,
        total: 0
      },
      pickerNames: {
        driverCity: '',
        date: ''
      },

      showPickerCity: false,

      showModal: false,
      options: [],
      type: '',
      cityList: [],
      checkedNum: 0
    }
  },
  computed: {
  },
  watch: {
    checkResult(val, newval) {
      if (val.length !== this.lists.length) {
        this.checkAll = false;
      } else {
        if (this.lists.length !== 0) {
          this.checkAll = true;
        } else {
          this.checkAll = false;
        }
      }
      this.checkedNum = val.length
      if (val.length > 20) {
        this.$toast('选择不可大于20')
      }
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // 获取外线销售和上岗经理
    async getSpecifiedRoleList(params) {
      try {
        let { data: res } = await GetSpecifiedRoleList(params)
        if (res.success) {
          this.options = res.data.map(item => ({
            label: item.name,
            value: item.id
          }))
        } else {
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get list fail:${err}`)
      }
    },
    // 模糊搜索
    handleSearchChange(value) {
      let params = {
        keyword: value,
        roleTypes: [1],
        uri: '/v2/waybill/queryH5GM'
      }
      this.getSpecifiedRoleList(params)
    },
    // 打开模糊查询框
    async handleShowModal() {
      this.getSpecifiedRoleList({
        roleTypes: [1],
        keyword: '',
        uri: '/v2/waybill/queryH5GM'
      })
      this.showModal = true
    },
    handleValueClick(obj) {
      this.form[obj.type] = obj.value
      this.pickerNames[obj.type] = obj.label
    },
    /**
     * 请求字典接口
     */
    fetchData() {
      getOpenCitys({})
        .then(({ data }) => {
          if (data.success) {
            this.cityList = data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkAlls() {
      if (!this.checkResult.length) {
        if (this.lists.length > 20) {
          this.$toast('选择不可大于20')
          this.checkAll = false;
        } else {
          this.$refs.checkboxGroup.toggleAll(true);
          this.checkAll = true;
        }
      } else {
        if (this.checkResult.length < this.lists.length) {
          if (this.lists.length > 20) {
            this.$toast('选择不可大于20')
            this.checkResult = []
            this.checkAll = !this.checkAll;
          } else {
            this.$refs.checkboxGroup.toggleAll(true);
            this.checkAll = true;
          }
        } else {
          this.$refs.checkboxGroup.toggleAll();
          this.checkAll = false;
        }
      }
    },
    async Add_to() {
      if (this.checkResult.length) {
        let { data: res } = await wayBillAmountDetail(this.checkResult)
        if (res.success) {
          if (res.data.length) {
            this.$router.push({
              path: '/joinreport',
              query: {
                obj: JSON.stringify(this.checkResult)
              }
            })
          }
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } else {
        this.$toast.fail('请选择')
      }
    },
    cancel() {
      this.optionsType = false;
      this.checkResult = [];
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    batch() {
      if (this.form.wayBillGMSaleStatus !== 1) {
        this.optionsType = !this.optionsType;
      }
    },
    filter_left() {
      this.showPopup = true
    },
    async getConf() { // 首页加盟运费筛选
      try {
        let parmas = {
          customerCity: this.form.name,
          customer: this.form.name1,
          project: this.form.name2,
          dutyManagerId: this.form.name3,
          startDate: Date.parse(this.form.startDate)
        }
        this.$loading(true)
        let { data: res } = await getGmInfoList(parmas)
        if (res.success) {
          this.lists = res.data
          this.form = ''
        } else {
          this.loading = false;
          this.error = true;
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
      } finally {
        this.$loading(false)
      }
    },
    async handleTabChange(tab) {
      this.lists = [];
      this.checkResult = [];
      if (tab === 1) {
        this.optionsType = false;
      }
      this.page.current = 1
      let result = await this.getLists(true)
      this.lists = result.lists
      this.isModeData()
    },
    /**
     * picker city 选择
     */
    onConfirmPickerCity(value) {
      this.pickerNames.driverCity = value.name;
      this.form.driverCity = value.code;
      this.showPickerCity = false;
    },
    /**
     * 处理参数
     */
    delForm(form) {
      let obj = {};
      Object.keys(form).forEach((key) => {
        if (form[key] !== '') {
          obj[key] = form[key];
        }
      });
      return obj;
    },
    // 获取列表
    async getLists(isInit) {
      try {
        const params = this.delForm(this.form);
        params.page = this.page.current;
        params.limit = this.page.limit;
        let { data: res } = await getGmInfoList(params);
        if (res.success) {
          let newLists = res.data;
          if (!isInit) {
            newLists = this.lists.concat(newLists);
          }
          let result = {
            lists: newLists,
            hasMore: res.page.total > newLists.length
          }
          this.tabArrs.forEach((item) => {
            if (item.name === this.form.wayBillGMSaleStatus) {
              item.total = res.page.total;
            } else {
              item.total = 0;
            }
          });
          return result;
        } else {
          this.page.current--;
          this.loading = false;
          this.error = true;
          this.refreshing = false;
          this.finished = true;
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        this.page.current--;
        this.loading = false;
        this.error = true;
        this.refreshing = false;
        this.finished = true;
        console.log(`get list fail:${err}`);
      }
    },
    /**
     * 日期选择
     */
    onConfirm(date) {
      const [start, end] = date;
      this.showCalendar = false;
      let startDate = parseTime(start, '{y}-{m}-{d}');
      let endDate = parseTime(end, '{y}-{m}-{d}');
      this.pickerNames.date = `${startDate} - ${endDate}`;
      this.form.startDate = +dayjs(startDate);
      this.form.endDate = +dayjs(endDate);
    },
    /**
     * 日期选择
     */
    onConfirmDate(date) {
      const [start, end] = date;
      this.showCalendar = false;
      let startDate = parseTime(start, '{y}-{m}-{d}');
      let endDate = parseTime(end, '{y}-{m}-{d}');
      this.pickerNames.date = `${startDate} - ${endDate}`;
      this.form.startDate = startDate;
      this.form.endDate = endDate;
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
    // 搜索
    handleSearchClick() {
      this.$router.push({
        path: '/joinsearch',
        query: {
          type: 1
        }
      })
    },
    /**
     * 提交查询
     */
    async onSubmit(value) {
      this.showPopup = false
      this.page.current = 1
      let result = await this.getLists(true)
      this.lists = result.lists
      this.isModeData()
    },
    // 是否更多数据
    isModeData() {
      if (this.lists.length === 0) {
        this.finished = true
      } else {
        this.finished = false
      }
    },
    /**
     * 重置form
     */
    onReset(form) {
      this.form = this.$options.data().form;
      this.pickerNames = this.$options.data().pickerNames;
      form.resetValidation();
    },
    /**
     * 显示picker
     */
    showPickerFn(key) {
      this.pickerKey = key;
      if (key === 'city') {
        this.columns = this.cityList;
      } else {
        this.columns = this.whyList;
      }
      this.showPicker = true;
    },
    disabledCheck(time) {
      let now = new Date().setHours(0, 0, 0, 0);
      let ThreeDayAgo = now - 86400000 * 3 + 1;// 一天86400秒
      return time - 1 < ThreeDayAgo
    }
  }
}
</script>

<style lang='scss' scoped>
.OutSideList {
    background:#f9f9f9;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  .van-info{
    transform: translate(-10%, 0);
  }
  .top {
    margin-bottom: 5px;
    background-color: #f9f9f9;
  }
  .list {
    flex: 1;
    overflow: auto;
  }
  .listBox{
    width: 100%;
    display: flex;
    border-bottom: 1px soli #F9F9F9;
    margin-bottom: 10px;
    .checked-box{
      flex-grow: 1;
      flex: 40px;
      text-align: center;
      line-height: 100vh;
      position: relative;
      top:0;
      bottom:0;
      left: 5px;
      margin:auto;
    }
  }
  .headerRight {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #FFFFFF;
    i {
      margin-left:5px;
    }
  }
  .searchSelect {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #3C4353;
    i {
      transform: rotate(90deg);
    }
  }
  .lineHeight {
    background: #F9F9F9;
    height:10px;
    width:100%;
  }
  .all{
    padding: 0 5px;
    box-sizing: border-box;
    .text{
      font-size: 13px;
      color: #7F8FBD;
    }
  }
  .Bulk{
    width: 100%;
    height: 38px;
    display: flex;
    z-index: 999;
    justify-content: space-between;
    position: relative;
    bottom: 0;
    padding: 11px 0 15px;
    background: #fff;
  }
  .Bulk>button{
    width:46%;
    border: none;
    border-radius: 5px;
    margin:0 auto;
  }
  .Bulk>button:nth-child(1){
    border: 1px solid #2F448A;
    border-radius: 3px;
    font-size: 15px;
    color: #2F448A;
    background: #ffffff;
  }
  .Bulk>button:nth-child(2){
    border: 1px solid #2F448A;
    border-radius: 3px;
    font-size: 15px;
    color: #fff;;
    background: #2F448A;
  }
}
</style>
<style scoped>
.ListContainer >>> .van-tab__text {
font-size: 12px;
color: #3C4353;
}
.OutSideList >>> .SelfPopup[data-v-7aa3f8c0] .van-popup {
width: 80%;
height: 100vh;
box-sizing: border-box;
}

</style>
