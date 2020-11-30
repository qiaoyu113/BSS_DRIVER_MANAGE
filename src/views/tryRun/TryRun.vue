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
          <div
            v-permission="['/v2/runtest/export']"
            class="checkStyle navBarTit"
            style="margin-right: 10px"
            @click="onTryRunExport"
          >
            导出
          </div>
          <div :class="{open: showOp, 'right-btn': true}" class="rWith navBarTit" @click="showOp=true">
            操作
          </div>
        </template>
      </van-nav-bar>
      <van-search
        v-permission="['/v2/runtest/getRunTestInfoList']"
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
            <div v-if="item.total" class="van-info">
              {{ item.total }}
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="list trylist">
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
        v-model.trim="form.customer"
        colon
        name="customer"
        label-width="7em"
        label="客户"
        placeholder="请输入客户名称/编号"
        :rules="[
          { validator: validatorValue, message: '请输入6位及以上数字或2位及以上非纯数字' }
        ]"
      />
      <van-field
        v-model="form.project"
        colon
        label-width="7em"
        name="project"
        label="项目"
        placeholder="请输入项目名称/编号"
      />
      <van-field
        v-model="form.line"
        colon
        name="line"
        label-width="7em"
        label="线路"
        placeholder="请输入线路名称/编号"
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
        v-model.trim="form.driver"
        name="driver"
        colon
        label-width="7em"
        label="司机"
        placeholder="请输入司机姓名/手机号"
        :rules="[
          { validator: validatorValue, message: '请输入6位及以上数字或2位及以上非纯数字' }
        ]"
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

    <van-action-sheet
      v-model="showOp"
      :actions="actionsOp | isPermission"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    />
    <van-dialog
      v-if="isShowExport"
      v-model="isShowExport"
      class="export-dialog"
      show-cancel-button
      confirm-button-text="导出"
      @confirm="tryRunExportSure"
    >
      <p>
        您已经选择<span class="blue">{{ allTotal }}</span>条数据
      </p>
      <p>
        提示:请在三足金乌web端
        <a :href="passURL" target="_blank" class="blue">szjw-bss-web.yunniao.cn</a>
        右上角下载工具中下载！
      </p>
    </van-dialog>
  </div>
</template>

<script>
import { GetDictionaryList, getOpenCitys } from '@/api/common';
import { GetRunTestInfoList, tryRunExport } from '@/api/tryrun';
import SelfPopup from '@/components/SelfPopup';
import ListItem from './components/ListItem';
import { parseTime, HandlePages } from '@/utils';
import { validatorValue } from '@/utils/validate';
export default {
  name: 'TryRun',
  components: {
    SelfPopup,
    ListItem
  },
  data() {
    return {
      showOp: false,
      scrollTop: 0,
      showSuggest: true,
      tabArrs: [
        {
          title: '全部',
          total: 0,
          name: ''
        },
        {
          title: '试跑意向',
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
      actionsOp: [
        {
          name: '创建历史试跑',
          value: 1,
          pUrl: ['/v2/runtest/makeUpHistoryData']
        },
        {
          name: '创建试跑意向',
          value: 2,
          pUrl: ['/v2/runtest/creatIntentionRun']
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
      cityList: [], // 掉线原因
      isShowExport: false,
      allTotal: 0

    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    passURL() {
      if (process.env.NODE_ENV === 'development') {
        return 'https://szjw-bss-web.m1.yunniao.cn/'
      }
      return window.location.origin.replace('h5', 'web')
    }
  },
  activated() {
    this.$bus.$on('update', (msg) => {
      if (msg) {
        this.lists = [];
        this.scrollTop = 0;
        this.onLoad(true)
      }
    });
  },
  mounted() {
    // 请求字典
    this.fetchData();
  },
  // 回来后还原
  beforeRouteEnter(to, from, next) {
    next(vm => {
      document.querySelector('.trylist').scrollTop = vm.scrollTop
    })
  },
  // 离开前保存高度
  beforeRouteLeave(to, from, next) {
    this.scrollTop = document.querySelector('.trylist').scrollTop
    next()
  },
  methods: {
    // 正则验证
    validatorValue,
    /**
     * 请求字典接口
     */
    fetchData() {
      GetDictionaryList(['Intentional_compartment', 'dropped_reason'])
        .then(({ data }) => {
          if (data.success) {
            data.data.dropped_reason.push({
              dictLabel: '数据迁移掉线',
              dictValue: '6'
            })
            data.data.dropped_reason.push({
              dictLabel: '创建历史试跑',
              dictValue: '7'
            })
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
      this.form.startDate = +new Date(start.setHours(0, 0, 0, 0))
      this.form.endDate = +new Date(end.setHours(23, 59, 59, 999))
    },
    /**
     * 提交查询
     */
    async onSubmit(value) {
      // if (!validatorValue(value.driver)) {
      //   this.$notify('错误文案');
      //   return
      // }
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
    onSelect(item) {
      let activeIndex = item.value;
      this.showOp = false
      //  创建历史试跑
      setTimeout(() => {
        if (activeIndex === 1) {
          this.$router.push('/create-history-run');
        } else if (activeIndex === 2) { // 创建试跑
          this.$router.push('/create-run');
        }
      }, 350)
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
        this.error = false
        const params = this.delForm(this.form);
        params.page = this.page.current;
        params.limit = this.page.limit;
        let { data: res } = await GetRunTestInfoList(params);
        if (res.success) {
          HandlePages(res.page)
          !res.data && (res.data = [])
          let newLists = res.data;
          if (!isInit) {
            newLists = this.lists.concat(newLists);
          }
          let result = {
            lists: newLists,
            // hasMore: res.page.total > newLists.length
            hasMore: res.data.length === this.page.limit
          };
          this.tabArrs.forEach((item) => {
            if (item.name === this.form.status) {
              item.total = res.page.total;
            } else {
              item.total = 0;
            }
          });
          this.allTotal = res.page.total
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
    // 点击导出
    onTryRunExport() {
      if (this.allTotal === 0) {
        this.$toast({
          message: '没有可以导出的数据',
          position: 'bottom'
        })
        return
      }
      this.isShowExport = !this.isShowExport
    },
    // 试跑导出
    async tryRunExportSure() {
      try {
        this.$loading(true)
        const { data } = await tryRunExport(this.form)
        if (data.success) {
          this.$toast.success('导出成功')
        } else {
          this.$toast.fail('导出失败')
        }
      } catch (error) {
        return error
      } finally {
        this.$loading(false)
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
  .rWith {
    width: auto;
    white-space: nowrap;
  }
  .right-btn {
      position: relative;
      padding-right: 5px;
      &.open {
        &::after {
          margin-top: -1px;
          transform: rotate(135deg);
        }
      }
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -4px;
        margin-top: -5px;
        border: 3px solid;
        border-color: transparent transparent @white @white;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
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
  .mR5 {
    margin-right: 5px;
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
  .export-dialog {
    font-size: 16px;
    padding: 25px 30px 0 30px;
    width: 70%;
  }
}
.blue {
  color: #6e9ee8;
}
.checkStyle:active {
  opacity: 0.7 !important;
}
</style>
<style lang="less" scoped>
/deep/.van-dialog__footer {
  padding-left: 20px !important;
  padding-right: 20px !important;
}

/deep/ .van-nav-bar__right:active {
  opacity: 1;
}
</style>

