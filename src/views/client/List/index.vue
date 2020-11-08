<template>
  <div class="customerListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="客户管理" left-text="返回" left-arrow @click-left="onClickLeft" />
      <!-- 搜索 -->
      <van-search v-permission="['/v2/line/customer/queryLineCustomerList']" show-action placeholder="客户名称/客户编号/客户联系人手机号搜索" readonly @click="handleSearchClick">
        <template #action>
          <div class="searchSelect" @click="show=true">
            筛选
            <van-icon name="play" color="#3C4353" />
          </div>
        </template>
      </van-search>
      <!-- tabs -->
      <van-tabs v-model="form.customerState" swipeable @change="handleTabChange">
        <van-tab v-for="item in tabArrs" :key="item.text" :name="item.name">
          <template #title>
            {{ item.text }}
            <div v-if="item.num" class="van-info">
              {{ item.num }}
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </van-sticky>

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
        <div v-for="sub in lists" :key="sub.id">
          <CardItem :obj="sub" />
          <div class="lineHeight"></div>
        </div>
      </van-list>
    </van-pull-refresh>

    <!-- 右侧筛选抽屉 -->
    <SelfPopup
      ref="lineLineForm"
      :show.sync="show"
      form-ref="form"
      @submit="onQuery"
      @reset="onReset"
    >
      <van-field
        :value="pickerNames['city']"
        readonly
        clickable
        label="所属城市"
        placeholder="请选择"
        @click="handleShowModal('city')"
      />
      <van-field
        :value="pickerNames['customerType']"
        readonly
        clickable
        label="客户类型"
        placeholder="请选择"
        @click="showPickerFn('customerType')"
      />
      <van-field
        :value="pickerNames['classification']"
        readonly
        clickable
        label="客户分类"
        placeholder="请选择"
        @click="showPickerFn('classification')"
      />

      <van-field
        :value="pickerNames['date']"
        readonly
        clickable
        label="创建时间"
        placeholder="开始日期"
        :min-date="minDate"
        @click="showPickerFn('date')"
      />
    </SelfPopup>
    <!-- 选择日期 -->
    <van-calendar
      v-model="showCalendar"
      :allow-same-day="true"
      type="range"
      :min-date="minDate1"
      @confirm="onConfirm"
    />
    <!-- 底部弹出框 -->
    <van-popup v-model="showPicker" position="bottom">
      <!-- picker选择器 -->
      <van-picker
        value-key="label"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <!-- 模糊搜索组件 -->
    <Suggest
      v-model="showModal"
      :options="options"
      :type="modalKey"
      @keyWordValue="handleSearchChange"
      @finish="handleValueClick"
      @closed="showModal=false"
    />
  </div>
</template>

<script>
import CardItem from './components/CardItem'
import SelfPopup from '@/components/SelfPopup';
import Suggest from '@/components/SuggestSearch.vue'
import { getClientList } from '@/api/client'
import { getOpenCitys, getDictData } from '@/api/common'
import { HandlePages } from '@/utils/index'
export default {
  components: {
    CardItem,
    SelfPopup,
    Suggest
  },
  data() {
    return {
      scrollTop: 0,
      show: false, // 打开查询抽屉
      refreshing: false, // 下拉刷新
      loading: false, // 上拉加载
      finished: false, // 是否加载完成
      error: false, // 出错
      tabArrs: [ // tabs数组
        {
          text: '全部',
          num: 0,
          name: ''
        },
        {
          text: '已启用',
          num: 0,
          name: 2
        },
        {
          text: '已禁用',
          num: 0,
          name: 1
        }
      ],
      lists: [],
      form: { // 查询表单
        customerState: '', // 当前激活的tab,
        city: '', // 城市
        customerType: '', // 客户类型
        classification: '', // 客户属性
        date: []
      },
      options: [], // 开通城市列表
      customerTypeArr: [],
      classificationArr: [],
      showModal: false,
      showCalendar: false,
      modalKey: '',
      pickerNames: { // picker选中显示的名字
        city: '',
        customerType: '',
        classification: '',
        date: ''
      },
      pickerKey: '', // 显示picker的key
      columns: [], // picker的列表
      showPicker: false, // 是否打开picker
      dateLists: ['date'], // 显示日历控件的字段集合
      page: {
        current: 0,
        size: 10
      },
      minDate1: new Date(2000, 0, 1)
    }
  },
  computed: {
    minDate() {
      if (this.form.date.length > 0) {
        return new Date(this.form.date[0])
      }
      return new Date()
    },
    isDateRange() {
      return this.dateLists.includes(this.pickerKey)
    }
  },
  // 回来后还原
  // beforeRouteEnter(to, from, next) {
  //   if (from.path === '/clientDetail') {
  //     to.meta.keepAlive = true
  //     next(vm => {
  //       document.querySelector('.customerListContainer').scrollTop = vm.scrollTop
  //     })
  //   } else {
  //     to.meta.keepAlive = false
  //     next()
  //   }
  // },
  // // 离开前保存高度
  // beforeRouteLeave(to, from, next) {
  //   this.scrollTop = document.querySelector('.customerListContainer').scrollTop
  //   next()
  // },
  mounted() {
    this.init()
  },
  activated() {
    document.querySelector('.van-pull-refresh').scrollTop = 200
  },
  methods: {
    // 状态切换
    handleTabChange() {
      this.loading = true
      this.onLoad(true)
    },
    async init() {
      // 客户类型
      let customerTypeArr = await this.getDictData('line_cloud_customerType')
      this.customerTypeArr = customerTypeArr || []
      // 客户属性
      let classificationArr = await this.getDictData('line_cloud_classification')
      this.classificationArr = classificationArr || []
    },
    // 返回
    onClickLeft() {
      this.$router.replace({
        path: '/'
      })
    },
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

      if (isInit === true) { // 下拉刷新
        this.lists = result.lists
        this.refreshing = false
        this.finished = false
        this.loading = false
      } else { // 上拉加载更多
        this.lists.push(...result.lists)
        this.loading = false;
        // let hasMore = result.total > this.lists.length
        if (!result.hasMore) {
          this.finished = true
        }
      }
    },
    // 搜索
    handleSearchClick() {
      this.$router.push({
        path: '/clientSearch'
      })
    },
    // 查询
    async onQuery() {
      this.loading = true
      this.show = false
      this.onLoad(true)
    },
    // 重置
    onReset(form) {
      this.pickerNames = {
        city: '',
        customerType: '',
        classification: '',
        date: ''
      }
      this.form = {
        city: '',
        customerType: '',
        classification: '',
        date: []
      }
    },
    // 模糊搜索
    handleSearchChange(value) {
      let params = {
        keyword: value
      }
      this.getOpenCityList(params)
    },
    /**
     *点击模糊查询框某一项
     */
    handleValueClick(obj) {
      this.form[obj.type] = obj.value
      this.pickerNames[obj.type] = obj.label
    },
    // 打开模糊查询框
    handleShowModal(key) {
      this.modalKey = key
      if (key === 'city') {
        this.getOpenCityList()
      }
      this.showModal = true
    },
    // 显示picker
    showPickerFn(key) {
      this.columns = []
      this.pickerKey = key;
      if (key === 'date') {
        this.showCalendar = true
        return false
      } else if (key === 'customerType') {
        this.columns.push(...this.customerTypeArr);
      } else if (key === 'classification') {
        this.columns.push(...this.classificationArr);
      }
      this.showPicker = true;
    },
    // picker选择器
    onConfirm(obj) {
      // 如果是日期选择器
      if (this.isDateRange && obj.length === 2) {
        let startName = `${obj[0].getMonth() + 1}/${obj[0].getDate()}`;
        let endName = `${obj[1].getMonth() + 1}/${obj[1].getDate()}`;
        this.pickerNames[this.pickerKey] = `${startName}-${endName}`
        this.form[this.pickerKey] = obj
        this.showCalendar = false
        return false
      } else {
        this.pickerNames[this.pickerKey] = obj.label
        this.form[this.pickerKey] = obj.value
      }

      this.showPicker = false;
    },
    // 获取开通的城市列表
    async getOpenCityList(params = {}) {
      try {
        let { data: res } = await getOpenCitys(params)
        if (res.success) {
          this.options = res.data.map(item => ({
            label: item.name,
            value: item.code
          }))
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get open city list fail:${err}`)
      }
    },
    // 获取列表
    async getLists(isInit) {
      try {
        this.error = false
        let params = {
          page: this.page.current,
          limit: this.page.size
        }
        this.form.city && (params.city = this.form.city)
        this.form.customerType && (params.customerType = this.form.customerType)
        this.form.classification && (params.classification = this.form.classification)
        this.form.customerState && (params.customerState = this.form.customerState)
        if (this.form.date && this.form.date.length > 1) {
          this.form.date[0].setHours(0, 0, 0)
          params.startDate = new Date(this.form.date[0]).getTime()
          this.form.date[1].setHours(23, 59, 59)
          params.endDate = new Date(this.form.date[1]).getTime()
        }
        let { data: res } = await getClientList(params)
        if (res.success) {
          HandlePages(res.page)
          !res.data && (res.data = [])
          let newLists = res.data
          let result = {
            lists: newLists,
            // total: res.page.total
            hasMore: res.data.length === this.page.size
          }
          this.tabArrs.forEach(item => {
            if (item.name === this.form.customerState) {
              item.num = res.page.total
            } else {
              item.num = 0
            }
          })
          return result
        } else {
          this.loading = false;
          this.error = true;
          this.finished = true
          this.refreshing = false
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
        this.finished = true
        this.refreshing = false
        console.log(`get list fail:${err}`)
      }
    },
    // 从数据字典获取数据
    async getDictData(dictType) {
      try {
        let params = {
          dictType
        }
        let { data: res } = await getDictData(params)

        if (res.success) {
          return res.data.map(item => ({
            label: item.dictLabel,
            value: +item.dictValue
          }))
        } else {
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get dict data fail:${err}`)
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.customerListContainer {
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
}

</style>

<style scoped>
  .customerListContainer >>> .van-tab__text {
    font-size: 12px;
    color: #3C4353;
  }
</style>
