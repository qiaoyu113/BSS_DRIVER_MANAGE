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
      <van-tabs v-model="tabActive">
        <van-tab
          v-for="(item, index) in tabsList"
          :key="index"
          :name="item.name"
        >
          <template #title>
            {{ item.title }}
            <div v-if="item.name === tabActive" class="van-info">
              {{ item.total }}
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
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
      :show.sync="showPopup"
      form-ref="form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <van-field
        v-model="listQuery.name1"
        colon
        name="name1"
        label-width="7em"
        label="客户"
        placeholder="请输入"
      />
      <van-field
        v-model="listQuery.name2"
        colon
        label-width="7em"
        name="name2"
        label="项目"
        placeholder="请输入"
      />
      <van-field
        v-model="listQuery.name3"
        colon
        name="name3"
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
        name="name4"
        :value="pickerNames.name4"
        placeholder="请选择"
        @click="showPickerFn('name4')"
      />
      <van-field
        v-model="listQuery.name5"
        name="name5"
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
        name="name6"
        :value="pickerNames.name6"
        placeholder="请选择"
        @click="showPickerFn('name6')"
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
        value-key="name"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirmPicker"
      />
    </van-popup>
  </div>
</template>

<script>
import SelfPopup from '@/components/SelfPopup';
import ListItem from './components/ListItem';
import { parseTime } from '@/utils'
export default {
  name: 'TryRun',
  components: {
    SelfPopup,
    ListItem
  },
  data() {
    return {
      showSuggest: true,
      tabActive: '',
      tabsList: [
        {
          title: '全部',
          total: 9999,
          name: ''
        },
        {
          title: '待试跑',
          total: 0,
          name: '1'
        },
        {
          title: '已跟车',
          total: 0,
          name: '2'
        },
        {
          title: '已试跑',
          total: 0,
          name: '3'
        },
        {
          title: '稳定上岗',
          total: 0,
          name: '4'
        },
        {
          title: '跟车掉线',
          total: 0,
          name: '5'
        },
        {
          title: '试跑掉线',
          total: 0,
          name: '6'
        },
        {
          title: '稳定掉线',
          total: 0,
          name: '7'
        }
      ],
      // lists
      list: [],
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      // search
      listQuery: {
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        name6: '',
        name7: ''
      },
      pickerNames: {
        name4: '',
        name7: '',
        date: ''
      },
      // picker
      minDate: new Date(+new Date() - 86400000 * 365),
      maxDate: new Date(+new Date() + 86400000 * 365),
      showPopup: false,
      showPicker: false,
      showCalendar: false,
      pickerKey: '',
      columns: [],
      carList: [{
        name: '金杯',
        code: '123'
      },
      {
        name: '金2杯',
        code: '1223'
      }], // 配送车型
      whyList: [{
        name: '测试测试',
        code: '123'
      },
      {
        name: '测试',
        code: '1223'
      }] // 掉线原因
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  methods: {
    /**
     * 初始化数据
     */
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push({ item: this.list.length + 1 });
        }
        this.loading = false;

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
    /**
     * 日期选择
     */
    onConfirm(date) {
      const [start, end] = date;
      this.showCalendar = false;
      let startDate = parseTime(start, '{y}-{m}-{d}');
      let endDate = parseTime(end, '{y}-{m}-{d}');
      this.pickerNames.date = `${startDate} - ${endDate}`;
      this.listQuery.startDate = startDate;
      this.listQuery.endDate = endDate;
    },
    /**
     * 提交查询
     */
    onSubmit(value) {
      this.showPopup = false;
      this.refreshing = true;
      this.onRefresh();
      console.log('submit', value);
    },
    /**
     * 重置form
     */
    onReset(form) {
      this.listQuery = this.$options.data().listQuery;
      this.pickerNames = this.$options.data().pickerNames;
      form.resetValidation();
    },
    /**
     * picker 选择
     */
    onConfirmPicker(value) {
      this.pickerNames[this.pickerKey] = value.name;
      this.listQuery[this.pickerKey] = value.code;
      this.showPicker = false;
    },
    /**
     * 显示picker
     */
    showPickerFn(key) {
      this.pickerKey = key;
      if (key === 'name4') {
        this.columns = this.carList;
      } else {
        this.columns = this.whyList;
      }
      this.showPicker = true;
    },
    /**
     * 跳转查询页面
     */
    onSearch() {
      this.$router.push('/try-run/search');
    },
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.go(-1)
    },
    /**
     * 创建试跑
     */
    onCreateRun() {
      this.$router.push('/try-run/createrun');
    }
  }
};
</script>
<style lang="less" scoped>
.TryRun {
  display: flex;
  flex-direction: column;
  background: @body-bg;
  .top{
    margin-bottom: 5px;
    background-color: @body-bg;
  }
  .list{
    flex: 1;
    overflow: auto;
  }
  .navBarTit{
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
}
</style>
