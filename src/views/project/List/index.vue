<template>
  <div class="projectListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="项目管理" left-text="返回" left-arrow @click-left="onClickLeft" />
      <!-- 搜索 -->
      <van-search v-permission="['/v2/line/project/queryProjectQueryList']" show-action placeholder="项目名称/项目编号/项目联系人手机号搜索" readonly @click="handleSearchClick">
        <template #action>
          <div class="searchSelect" @click="show=true">
            筛选
            <van-icon name="play" color="#3C4353" />
          </div>
        </template>
      </van-search>
      <!-- tabs -->
      <van-tabs v-model="form.projectState" swipeable @change="handleTabChange">
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
        label-width="100"
        :value="pickerNames['receivingPoint']"
        readonly
        clickable
        label="收货点类型"
        placeholder="请选择"
        @click="showPickerFn('receivingPoint')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['isDelivery']"
        readonly
        clickable
        label="配送经验"
        placeholder="请选择"
        @click="showPickerFn('isDelivery')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['returnBill']"
        readonly
        clickable
        label="是否需要回单"
        placeholder="请选择"
        @click="showPickerFn('returnBill')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['dutyManagerId']"
        readonly
        clickable
        label="上岗经理"
        placeholder="请选择"
        @click="handleShowModal('dutyManagerId')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['lineSaleId']"
        readonly
        clickable
        label="外线销售"
        placeholder="请选择"
        @click="handleShowModal('lineSaleId')"
      />
      <van-field
        label-width="100"
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
import Suggest from '@/components/SuggestSearch'
import { getProjectList } from '@/api/project'
import { GetSpecifiedRoleList, getDictDataByKeyword } from '@/api/common'
import { HandlePages } from '@/utils/index'
export default {
  name: 'Project',
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
        receivingPoint: '',
        isDelivery: '',
        returnBill: '',
        dutyManagerId: '',
        lineSaleId: '',
        projectState: '', // 当前激活的tab,
        date: []
      },
      receivingPointArr: [], // 收货点类型数组

      isDeliveryArr: [ // 配送经验数组
        {
          label: '有需求',
          value: 1
        },
        {
          label: '无需求',
          value: 2
        }
      ],
      returnBillArr: [ // 是否需要回单
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 2
        }
      ],
      showModal: false,
      showCalendar: false,
      options: [],
      modalKey: '',
      pickerNames: { // picker选中显示的名字
        receivingPoint: '',
        isDelivery: '',
        returnBill: '',
        dutyManagerId: '',
        lineSaleId: '',
        date: ''
      },
      pickerKey: '', // 显示picker的key
      columns: [], // picker的列表
      showPicker: false, // 是否打开picker
      dateLists: ['date'], // 显示日历区间控件
      page: {
        current: 0,
        size: 10
      },
      minDate1: new Date(2000, 0, 1)
    }
  },
  // 回来后还原
  beforeRouteEnter(to, from, next) {
    next(vm => {
      document.querySelector('.projectListContainer').scrollTop = vm.scrollTop
    })
  },
  // 离开前保存高度
  beforeRouteLeave(to, from, next) {
    this.scrollTop = document.querySelector('.projectListContainer').scrollTop
    next()
  },
  computed: {
    minDate() {
      if (this.form.r) {
        return new Date(this.form.r)
      }
      return new Date()
    },
    isDateRange() {
      return this.dateLists.includes(this.pickerKey)
    }
  },
  mounted() {
    this.getConsigneeTypeList()
  },
  methods: {
    // 获取收货点类型
    async getConsigneeTypeList() {
      try {
        let params = {
          type: 'consignee_type'
        }
        let { data: res } = await getDictDataByKeyword(params)
        if (res.success) {
          this.receivingPointArr = res.data.map(item => ({
            value: item.dictValue,
            label: item.dictLabel
          }))
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get consignee_type fail:${err}`)
      }
    },
    // 状态切换
    handleTabChange() {
      this.loading = true
      this.onLoad(true)
    },
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
        this.loading = false;
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
        path: '/projectSearch'
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
        receivingPoint: '',
        isDelivery: '',
        returnBill: '',
        dutyManagerId: '',
        lineSaleId: '',
        date: ''
      }
      this.form = {
        receivingPoint: '',
        isDelivery: '',
        returnBill: '',
        dutyManagerId: '',
        lineSaleId: '',
        date: []
      }
    },
    // 模糊搜索
    handleSearchChange(value) {
      if (this.modalKey === 'dutyManagerId') {
        let params = {
          keyword: value,
          roleTypes: [3],
          uri: '/v2/line/project/dutyManagerList'
        }
        this.getSpecifiedRoleList(params)
      } else if (this.modalKey === 'lineSaleId') {
        let params = {
          keyword: value,
          roleTypes: [2],
          uri: '/v2/line/project/lineSaleList'
        }
        this.getSpecifiedRoleList(params)
      }
    },
    /**
     *点击某一项
     */
    handleValueClick(obj) {
      this.form[obj.type] = obj.value
      this.pickerNames[obj.type] = obj.label
    },
    // 打开模糊查询框
    handleShowModal(key) {
      this.modalKey = key
      if (key === 'lineSaleId') {
        this.getSpecifiedRoleList({ roleTypes: [2], uri: '/v2/line/project/lineSaleList' })
      } else if (key === 'dutyManagerId') {
        this.getSpecifiedRoleList({ roleTypes: [3], uri: '/v2/line/project/dutyManagerList' })
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
      } else if (key === 'receivingPoint') {
        this.columns.push(...this.receivingPointArr);
      } else if (key === 'isDelivery') {
        this.columns.push(...this.isDeliveryArr);
      } else if (key === 'returnBill') {
        this.columns.push(...this.returnBillArr);
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
    // 获取列表
    async getLists(isInit) {
      try {
        this.error = false
        let params = {
          page: this.page.current,
          limit: this.page.size
        }
        this.form.receivingPoint && (params.receivingPoint = this.form.receivingPoint)
        this.form.isDelivery && (params.isDelivery = this.form.isDelivery)
        this.form.returnBill && (params.returnBill = this.form.returnBill)
        this.form.dutyManagerId && (params.dutyManagerId = this.form.dutyManagerId)
        this.form.lineSaleId && (params.lineSaleId = this.form.lineSaleId)
        this.form.projectState && (params.projectState = this.form.projectState)
        if (this.form.date && this.form.date.length > 1) {
          this.form.date[0].setHours(0, 0, 0)
          params.startDate = new Date(this.form.date[0]).getTime()
          this.form.date[1].setHours(23, 59, 59)
          params.endDate = new Date(this.form.date[1]).getTime()
        }
        let { data: res } = await getProjectList(params)
        if (res.success) {
          HandlePages(res.page)
          !res.data && (res.data = [])
          let newLists = res.data
          let result = {
            lists: newLists,
            // total: res.page.total,
            hasMore: res.data.length === this.page.size
          }
          this.tabArrs.forEach(item => {
            if (item.name === this.form.projectState) {
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
    }
  }
}

</script>

<style lang='scss' scoped>
.projectListContainer {
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
  .projectListContainer >>> .van-tab__text {
    font-size: 12px;
    color: #3C4353;
  }
</style>
