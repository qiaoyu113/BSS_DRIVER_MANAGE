<template>
  <div class="lineListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="线路管理" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <div v-permission="['/v2/line/lineInfo/createStableLine','/v2/line/lineInfo/createTemporaryLine']" class="headerRight" @click="showPickerFn('selectLine')">
            新建
            <van-icon name="add-o" />
          </div>
        </template>
      </van-nav-bar>
      <!-- 搜索 -->
      <van-search show-action placeholder="请输入线路名称/线路编号" readonly @click="handleSearchClick">
        <template #action>
          <div class="searchSelect" @click="show=true">
            筛选
            <van-icon name="play" color="#3C4353" />
          </div>
        </template>
      </van-search>
      <!-- tabs -->
      <van-tabs v-model="form.lineState" swipeable :ellipsis="false" @change="handleTabChange">
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
        :value="pickerNames['busiType']"
        readonly
        clickable
        label="线路类型"
        placeholder="请选择"
        @click="showPickerFn('busiType')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['lineBalance']"
        readonly
        clickable
        label="是否有线路余额"
        placeholder="请选择"
        @click="showPickerFn('lineBalance')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['lineCategory']"
        readonly
        clickable
        label="线路分类"
        placeholder="请选择"
        @click="showPickerFn('lineCategory')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['lineType']"
        readonly
        clickable
        label="是否为城配线"
        placeholder="请选择"
        @click="showPickerFn('lineType')"
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
        :value="pickerNames['carType']"
        readonly
        clickable
        label="配送车型"
        placeholder="请选择"
        @click="handleShowModal('carType')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['waitDirveValidity']"
        readonly
        clickable
        label="上架截止日期"
        placeholder="请选择"
        @click="showPickerFn('waitDirveValidity')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['driverWorkTime']"
        readonly
        clickable
        label="司机上岗时间"
        placeholder="请选择"
        @click="showPickerFn('driverWorkTime')"
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
    <!-- 底部弹出框 -->
    <van-popup v-model="showPicker" position="bottom">
      <template v-if="isDate">
        <van-datetime-picker
          v-model="form[pickerKey]"
          type="date"
          title="选择年月日"
          :min-date="minTime"
          :max-date="maxTime"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </template>
      <template v-else>
        <!-- picker选择器 -->
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </template>
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
import Suggest from '@/components/SuggestSearch'
import { getLineList } from '@/api/line'
import { GetSpecifiedRoleList, getDictDataByKeyword } from '@/api/common'
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
          text: '已上架',
          num: 0,
          name: 1
        },
        {
          text: '已开跑',
          num: 2,
          name: 2
        },
        {
          text: '已开跑下架',
          num: 3,
          name: 3
        },
        {
          text: '未开跑下架',
          num: 4,
          name: 4
        }
      ],
      lists: [],
      lineColumns: [
        {
          label: '稳定线路',
          value: 1
        },
        {
          label: '临时线路',
          value: 0
        }
      ],
      form: { // 查询表单
        lineState: '', // 当前激活的tab,
        busiType: '',
        lineBalance: '',
        lineCategory: '',
        lineType: '',
        waitDirveValidity: '',
        driverWorkTime: '',
        date: []
      },
      busiTypeArr: [
        {
          label: '专车',
          value: 0
        },
        {
          label: '共享',
          value: 1
        }
      ],
      lineBalanceArr: [
        {
          label: '有线路余额',
          value: 1
        },
        {
          label: '无线路余额',
          value: 2
        }
      ],
      lineCategoryArr: [
        {
          label: '稳定线路',
          value: 1
        },
        {
          label: '临时线路',
          value: 2
        }
      ],
      lineTypeArr: [
        {
          label: '城配线',
          value: 1
        },
        {
          label: '支线',
          value: 2
        }
      ],
      showModal: false,
      showCalendar: false,
      options: [],
      modalKey: '',
      pickerNames: { // picker选中显示的名字
        busiType: '',
        lineBalance: '',
        lineCategory: '',
        lineType: '',
        waitDirveValidity: '',
        driverWorkTime: '',
        date: ''
      },
      pickerKey: '', // 显示picker的key
      columns: [], // picker的列表
      showPicker: false, // 是否打开picker
      dateLists: ['date'], // 显示日历控件的字段集合
      timeLists: ['waitDirveValidity', 'driverWorkTime'],
      minTime: new Date(2010, 0, 1),
      maxTime: new Date(2125, 12, 31),
      page: {
        current: 0,
        size: 10
      },
      minDate1: new Date(2000, 0, 1)
    }
  },
  // 回来后还原
  // beforeRouteEnter(to, from, next) {
  //   if (from.path === '/lineDetail') {
  //     to.meta.keepAlive = true
  //     next(vm => {
  //       document.querySelector('.lineListContainer').scrollTop = vm.scrollTop
  //     })
  //   } else {
  //     to.meta.keepAlive = false
  //     next()
  //   }
  // },
  // // 离开前保存高度
  // beforeRouteLeave(to, from, next) {
  //   this.scrollTop = document.querySelector('.lineListContainer').scrollTop
  //   next()
  // },
  computed: {
    minDate() {
      if (this.form.r) {
        return new Date(this.form.r)
      }
      return new Date()
    },
    isDateRange() {
      return this.dateLists.includes(this.pickerKey)
    },
    isDate() {
      return this.timeLists.includes(this.pickerKey)
    }
  },
  methods: {
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
        this.loading = false
        this.finished = false
      } else { // 上拉加载更多
        this.lists.push(...result.lists)
        this.loading = false;
        let hasMore = result.total > this.lists.length
        if (!hasMore) {
          this.finished = true
        }
      }
    },
    // 搜索
    handleSearchClick() {
      this.$router.push({
        path: '/lineSearch'
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
        busiType: '',
        lineBalance: '',
        lineCategory: '',
        lineType: '',
        waitDirveValidity: '',
        driverWorkTime: '',
        date: ''
      }
      this.form = {
        lineState: '', // 当前激活的tab,
        busiType: '',
        lineBalance: '',
        lineCategory: '',
        lineType: '',
        waitDirveValidity: '',
        driverWorkTime: '',
        date: []
      }
    },
    // 模糊搜索
    async handleSearchChange(value) {
      if (this.modalKey === 'dutyManagerId') {
        let params = {
          keyword: value,
          roleTypes: [3],
          uri: '/v2/line/lineInfo/dutyManagerList'
        }
        this.getSpecifiedRoleList(params)
      } else if (this.modalKey === 'lineSaleId') {
        let params = {
          keyword: value,
          roleTypes: [2],
          uri: '/v2/line/lineInfo/lineSaleList'
        }
        this.getSpecifiedRoleList(params)
      } else if (this.modalKey === 'carType') {
        let result = await this.getDictDataByKeyword('Intentional_compartment', value)
        this.options = result
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
    async handleShowModal(key) {
      this.modalKey = key
      if (key === 'dutyManagerId') {
        let params = {
          roleTypes: [3],
          uri: '/v2/line/lineInfo/dutyManagerList'
        }
        this.getSpecifiedRoleList(params)
      } else if (key === 'lineSaleId') {
        let params = {
          roleTypes: [2],
          uri: '/v2/line/lineInfo/lineSaleList'
        }
        this.getSpecifiedRoleList(params)
      } else if (key === 'carType') {
        let result = await this.getDictDataByKeyword('Intentional_compartment')
        this.options = result
      }
      this.showModal = true
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

    // 显示picker
    showPickerFn(key) {
      this.columns = []
      this.pickerKey = key;
      if (key === 'date') {
        this.showCalendar = true
        return false
      } else if (key === 'selectLine') {
        this.columns.push(...this.lineColumns);
      } else if (key === 'busiType') {
        this.columns.push(...this.busiTypeArr);
      } else if (key === 'lineBalance') {
        this.columns.push(...this.lineBalanceArr);
      } else if (key === 'lineCategory') {
        this.columns.push(...this.lineCategoryArr);
      } else if (key === 'lineType') {
        this.columns.push(...this.lineTypeArr);
      }
      this.showPicker = true;
    },
    // picker选择器
    onConfirm(obj) {
      if (this.pickerKey === 'selectLine') {
        this.showPicker = false;
        return this.$router.push({
          path: '/createLine',
          query: {
            isStable: obj.value
          }
        })
      } else if (this.isDateRange) {
        if (obj.length === 2) {
          let startName = `${obj[0].getMonth() + 1}/${obj[0].getDate()}`;
          let endName = `${obj[1].getMonth() + 1}/${obj[1].getDate()}`;
          this.pickerNames[this.pickerKey] = `${startName}-${endName}`
          this.form[this.pickerKey] = obj
        }
        this.showCalendar = false
        return false
      } else if (this.isDate) {
        this.pickerNames[this.pickerKey] = `${obj.getMonth() + 1}/${obj.getDate()}`;
        this.form[this.pickerKey] = obj
      } else {
        this.pickerNames[this.pickerKey] = obj.label
        this.form[this.pickerKey] = obj.value
      }

      this.showPicker = false;
    },
    // 获取列表
    async getLists(isInit) {
      try {
        let params = {
          page: this.page.current,
          limit: this.page.size
        }
        this.form.lineState && (params.lineState = this.form.lineState)
        this.form.busiType !== '' && (params.busiType = this.form.busiType)
        this.form.lineBalance && (params.lineBalance = this.form.lineBalance)
        this.form.lineCategory && (params.lineCategory = this.form.lineCategory)
        this.form.lineType && (params.lineType = this.form.lineType)
        this.form.waitDirveValidity && (params.waitDirveValidity = new Date(this.form.waitDirveValidity).getTime())
        this.form.carType && (params.carType = this.form.carType)
        this.form.dutyManagerId && (params.dutyManagerId = this.form.dutyManagerId)
        this.form.lineSaleId && (params.lineSaleId = this.form.lineSaleId)
        this.form.driverWorkTime && (params.driverWorkTime = new Date(this.form.driverWorkTime).getTime())
        if (this.form.date && this.form.date.length > 1) {
          params.startDate = new Date(this.form.date[0]).getTime()
          this.form.date[1].setHours(23, 59, 59)
          params.endDate = new Date(this.form.date[1]).getTime()
        }
        let { data: res } = await getLineList(params)
        if (res.success) {
          let newLists = res.data
          let result = {
            lists: newLists,
            total: res.page.total
          }
          this.tabArrs.forEach(item => {
            if (item.name === this.form.lineState) {
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
          this.$fail(res.errorMsg)
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
    async getDictDataByKeyword(type, keyword = '') {
      try {
        let params = {
          type
        }
        keyword && (params.keyword = keyword)
        let { data: res } = await getDictDataByKeyword(params)
        if (res.success) {
          return res.data.map(item => ({
            label: item.dictLabel,
            value: item.dictValue
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
.lineListContainer {

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
  .ListContainer >>> .van-tab__text {
    font-size: 12px;
    color: #3C4353;
  }
</style>
