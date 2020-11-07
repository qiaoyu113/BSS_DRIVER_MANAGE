<template>
  <div class="OutSideList">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
      <van-search
        v-permission="['/v2/waybill/getLineInfoListByKeyWord', '/v2/waybill/getLineInfoList']"
        readonly
        show-action
        placeholder="搜索项目名称/编号"
        @click="onSearch"
      >
        <template #action>
          <div class="search" @click="showPopup = true">
            筛选
          </div>
        </template>
      </van-search>
      <van-tabs v-model="form.wayBillGMSaleStatus" @click="handleTabChange">
        <van-tab
          v-for="(item, index) in tabArrs"
          :key="index"
          :name="item.name"
        >
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
          :error.sync="error"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <CardItem
            v-for="(item, index) in lists"
            :key="index"
            :obj="item"
            class="margin-bottom-xs"
          />
        </van-list>
      </van-pull-refresh>
    </div>
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
        label="客户城市"
        name="customerCity"
        :value="pickerNames.customerCity"
        placeholder="请选择"
        @click="showPickerCity = true"
      />
      <van-field
        v-model.trim="form.customer"
        colon
        name="customer"
        label-width="6em"
        label="客户"
        placeholder="请输入客户名称/编号"
        :rules="[
          { validator: validatorValue, message: '请输入2-6位客户名称或编号' }
        ]"
      />
      <van-field
        v-model="form.project"
        colon
        label-width="6em"
        name="project"
        label="项目"
        placeholder="请输入项目名称/编号"
      />
      <van-field
        label-width="6em"
        :value="pickerNames['dutyManagerId']"
        readonly
        colon
        clickable
        is-link
        label="上岗经理"
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
      :placeholder="'请输入加盟经理姓名/手机号'"
      :options="options"
      :type="'dutyManagerId'"
      @keyWordValue="handleSearchChange"
      @finish="handleValueClick"
      @closed="showModal=false"
    />
  </div>
</template>

<script>
import { getOpenCitys, GetSpecifiedRoleList } from '@/api/common'
import { getLineInfoList } from '@/api/freight';
import SelfPopup from '@/components/SelfPopup';
import CardItem from './components/CardItem'
import { parseTime } from '@/utils';
import Suggest from '@/components/SuggestSearch'
import dayjs from 'dayjs'
import { validatorValue } from '@/utils/validate';
export default {
  name: 'OutSideList',
  components: {
    SelfPopup,
    CardItem,
    Suggest
  },
  data() {
    return {
      showSuggest: true,
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
      // lists
      lists: [],
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      // search
      form: {
        customerCity: '', // 客户城市
        customer: '', // 客户
        project: '', // 项目
        dutyManagerId: '', // 上岗经理
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
        customerCity: '',
        date: ''
      },
      // picker
      minDate: new Date(+new Date() - 86400000 * 365),
      maxDate: new Date(+new Date() + 86400000 * 365),
      showModal: false,
      showPopup: false,
      showPickerCity: false,
      showCalendar: false,
      pickerKey: '',
      cityList: [], // 掉线原因
      options: []
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // 正则验证
    validatorValue,
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
        roleTypes: [3],
        uri: '/v2/waybill/queryH5LineSale'
      }
      this.getSpecifiedRoleList(params)
    },
    // 打开模糊查询框
    async handleShowModal() {
      this.getSpecifiedRoleList({ roleTypes: [3], keyword: '', uri: '/v2/waybill/queryH5LineSale' })
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
    /**
     *
     * 初始化数据
     */
    // 加载列表
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
     * 提交查询
     */
    async onSubmit(value) {
      this.page.current = 1
      let result = await this.getLists(true)
      this.lists = result.lists
      this.isModeData()
      this.showPopup = false
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
     * picker city 选择
     */
    onConfirmPickerCity(value) {
      this.pickerNames.customerCity = value.name;
      this.form.customerCity = value.code;
      this.showPickerCity = false;
    },
    /**
     * 跳转查询页面
     */
    onSearch() {
      this.$router.push('/outsidesearch');
    },
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.go(-1);
    },
    /**
     * 创建试跑
     */
    onCreateRun() {
      this.$router.push('/create-run');
    },
    // 状态切换
    async handleTabChange(tab) {
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
    // 获取列表
    async getLists(isInit) {
      try {
        const params = this.delForm(this.form);
        params.page = this.page.current;
        params.limit = this.page.limit;
        let { data: res } = await getLineInfoList(params);
        if (res.success) {
          !res.data && (res.data = [])
          let newLists = res.data;
          if (!isInit) {
            newLists = this.lists.concat(newLists);
          }
          let result = {
            lists: newLists,
            // hasMore: res.page.total > newLists.length
            hasMore: res.data.length === this.page.limit
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
    }
  }
};
</script>
<style lang="less" scoped>
.OutSideList {
  display: flex;
  flex-direction: column;
  background: @body-bg;
  .van-info{
    transform: translate(-10%, 0);
  }
  .top {
    margin-bottom: 5px;
    background-color: @body-bg;
  }
  .list {
    flex: 1;
    overflow: auto;
  }
  .navBarTit {
    color: @white;
  }
  .search {
    position: relative;
    padding-right: 20px;
    &::after {
      position: absolute;
      top: 50%;
      right: 5px;
      margin-top: -5px;
      border: 3px solid;
      border-color: transparent transparent @text-color @text-color;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      opacity: 1;
      content: '';
    }
  }
  .noData {
    margin-top: 41.5px;
    text-align: center;
    .text {
      margin-top: 15px;
      font-size: 15px;
      color: #656565;
      text-align: center;
    }
    img {
      width: 83px;
      height: 74px;
    }
  }
}
</style>
