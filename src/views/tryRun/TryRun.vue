<template>
  <div class="TryRun">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #right>
          <div class="navBarTit" @click="onCreateRun">
            创建试跑
          </div>
        </template>
      </van-nav-bar>
      <van-search
        readonly
        show-action
        placeholder="请输入线路名称/编号"
        @click="onSearch"
      >
        <template #action>
          <div class="search" @click="showPopup = true">
            筛选
          </div>
        </template>
      </van-search>
      <van-tabs v-model="form.status" @click="handleTabChange">
        <van-tab
          v-for="(item, index) in tabArrs"
          :key="index"
          :name="item.name"
        >
          <template #title>
            {{ item.title }}
            <div v-if="item.name === form.status" class="van-info">
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
          <ListItem
            v-for="(item, index) in lists"
            :key="index"
            :item="item"
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
        label-width="7em"
        is-link
        label="客户城市"
        name="city"
        :value="pickerNames.city"
        placeholder="请选择"
        @click="showPickerFn('city')"
      />
      <van-field
        v-model="form.customer"
        colon
        name="customer"
        label-width="7em"
        label="客户"
        placeholder="请输入"
      />
      <van-field
        v-model="form.project"
        colon
        label-width="7em"
        name="project"
        label="项目"
        placeholder="请输入"
      />
      <van-field
        v-model="form.line"
        colon
        name="line"
        label-width="7em"
        label="线路"
        placeholder="请输入"
      />
      <van-field
        readonly
        clickable
        colon
        label-width="7em"
        is-link
        label="配送车型"
        name="carType"
        :value="pickerNames.carType"
        placeholder="请选择"
        @click="showPickerFn('carType')"
      />
      <van-field
        v-model="form.driver"
        name="driver"
        colon
        label-width="7em"
        label="司机"
        placeholder="请输入"
      />
      <van-field
        readonly
        clickable
        colon
        label="掉线原因"
        label-width="7em"
        is-link
        name="droppedReason"
        :value="pickerNames.droppedReason"
        placeholder="请选择"
        @click="showPickerFn('droppedReason')"
      />
      <van-field
        readonly
        colon
        clickable
        label="线路上岗时间"
        label-width="7em"
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
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :value-key="pickerKey === 'city' ? 'name' : 'dictLabel'"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirmPicker"
      />
    </van-popup>
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
  </div>
</template>

<script>
import { GetDictionaryList, getOpenCitys } from '@/api/common';
import { GetRunTestInfoList } from '@/api/tryrun';
import SelfPopup from '@/components/SelfPopup';
import ListItem from './components/ListItem';
import { parseTime } from '@/utils';
import dayjs from 'dayjs'
export default {
  name: 'TryRun',
  components: {
    SelfPopup,
    ListItem
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
          title: '待试跑',
          total: 0,
          name: 100
        },
        {
          title: '已跟车',
          total: 0,
          name: 300
        },
        {
          title: '已试跑',
          total: 0,
          name: 200
        },
        {
          title: '稳定上岗',
          total: 0,
          name: 500
        },
        {
          title: '跟车掉线',
          total: 0,
          name: 400
        },
        {
          title: '试跑掉线',
          total: 0,
          name: 600
        },
        {
          title: '稳定掉线',
          total: 0,
          name: 700
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
        city: '', // 客户城市
        customer: '', // 客户
        project: '', // 项目
        line: '', // 线路
        carType: '', // 配送车型
        driver: '', // 司机
        droppedReason: '', // 掉线原因
        startDate: '', // 线路上岗开始时间
        endDate: '', // 线路上岗结束时间
        status: '' // 状态
      },
      page: {
        current: 0,
        limit: 20,
        total: 0
      },
      pickerNames: {
        city: '',
        carType: '',
        droppedReason: '',
        date: ''
      },
      // picker
      minDate: new Date(+new Date() - 86400000 * 365),
      maxDate: new Date(+new Date() + 86400000 * 365),
      showPopup: false,
      showPicker: false,
      showPickerCity: false,
      showCalendar: false,
      pickerKey: '',
      columns: [],
      carList: [], // 配送车型
      whyList: [], // 掉线原因
      cityList: [] // 掉线原因
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
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
      GetDictionaryList(['Intentional_compartment', 'dropped_reason'])
        .then(({ data }) => {
          if (data.success) {
            this.carList = data.data.Intentional_compartment;
            this.whyList = data.data.dropped_reason;
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
     * 初始化数据
     */
    async onLoad(isInit = false) {
      if (isInit === true) {
        // 下拉刷新
        this.page.current = 1;
        this.lists = [];
      } else {
        // 上拉加载更多
        this.page.current++;
      }
      let result = await this.getLists(isInit);
      if (result) {
        this.lists = result.lists;
      }
      if (isInit === true) {
        // 下拉刷新
        this.refreshing = false;
        this.finished = false;
      } else {
        // 上拉加载更多
        this.loading = false;
        if (result) {
          if (!result.hasMore) {
            this.finished = true;
          }
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
     * 下拉刷新
     */
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true;
      this.onLoad(true);
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
     * picker 选择
     */
    onConfirmPicker(value) {
      this.pickerNames[this.pickerKey] = value.dictLabel;
      this.form[this.pickerKey] = value.dictValue;
      this.showPicker = false;
    },
    /**
     * picker city 选择
     */
    onConfirmPickerCity(value) {
      this.pickerNames[this.pickerKey] = value.name;
      this.form[this.pickerKey] = value.code;
      this.showPickerCity = false;
    },
    /**
     * 显示picker
     */
    showPickerFn(key) {
      this.pickerKey = key;
      switch (key) {
        case 'carType':
          this.columns = this.carList;
          break;
        case 'droppedReason':
          this.columns = this.whyList;
          break;
        case 'city':
          this.showPickerCity = true;
          break;
        default:
          break;
      }
      if (key === 'city') return;
      this.showPicker = true;
    },
    /**
     * 跳转查询页面
     */
    onSearch() {
      this.$router.push('/try-search');
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
      this.lists = [];
      this.page.current = 1
      let result = await this.getLists(true)
      this.lists = result.lists
      this.isModeData()
    },
    // 获取列表
    async getLists(isInit) {
      try {
        const params = this.delForm(this.form);
        params.page = this.page.current;
        params.limit = this.page.limit;
        let { data: res } = await GetRunTestInfoList(params);
        if (res.success) {
          let newLists = res.data;
          if (!isInit) {
            newLists = this.lists.concat(newLists);
          }
          let result = {
            lists: newLists,
            hasMore: res.page.total > newLists.length
          };
          this.tabArrs.forEach((item) => {
            if (item.name === this.form.status) {
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
.TryRun {
  display: flex;
  flex-direction: column;
  background: @body-bg;
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
