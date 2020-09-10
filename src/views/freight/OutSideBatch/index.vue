<template>
  <div class="lineListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="外线运费上报" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <div v-if="shipperr" class="headerRight" @click="Shipper() ">
            批量上报
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 搜索 -->
    <van-search v-model="value" show-action placeholder="搜索司机姓名/手机号" readonly @click="handleSearchClick">
      <template #action>
        <div v-if="checkShow" class="searchSelect" @click="showPopup">
          筛选
          <van-icon name="play" color="#3C4353" />
        </div>
        <div v-if="shipperr" class="searchSelect" @click="dateTime">
          日期
          <van-icon name="play" color="#3C4353" />
        </div>
      </template>
    </van-search>
    <ul v-if="dateTimes" class="day">
      <li
        v-for="(item,index) in day"
        :key="index"
        @click="timenum(item.time)"
      >
        {{ item.time|formatDate }}
      </li>
    </ul>

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
        <!-- tabs -->
        <van-tabs v-model="active" swipeable @change="handleTabChange">
          <van-tab v-for="item in tabArrs" :key="item.text">
            <template #title>
              {{ item.text }}
              <div v-if="item.num" class="van-info">
                {{ item.num }}
              </div>
            </template>
            <P v-if="checkShow" class="all">
              <van-checkbox v-model="checkall" class="checked">
                <span>全选</span>
                <span>已选择{{ checkedNum }} 个出车单位</span>
              </van-checkbox>
            </P>
            <div>
              <div v-for="sub in lists" :key="sub.id">
                <CardItem
                  class="items"
                  :obj="sub"
                  :checkalls="checkShow"
                  :checkedarr="checkedarr"
                />
              </div>
            </div>
          </van-tab>
        </van-tabs>
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
        :value="text1"
        readonly
        clickable
        label="司机城市"
        placeholder="请选择"
        @click="showPicker1 = true"
      />
      <van-field
        v-model="text2"
        name="username"
        label="司机"
        placeholder="请输入"
      />
      <van-field
        v-model="text3"
        name="username"
        label="线路"
        placeholder="请输入"
      />
      <van-field
        :value="text4"
        readonly
        clickable
        label="加盟经理"
        placeholder="请选择"
        @click="handleShowModal('manager')"
      />

      <van-field
        :value="text10"
        readonly
        clickable
        label="创建时间"
        placeholder="开始日期"
        :min-date="minDate"
        @click="showPicker10 = true"
      />
      <van-field
        :value="text11"
        readonly
        clickable
        input-align="center"
        placeholder="结束日期"
        @click="showPicker11 = true"
      />
    </SelfPopup>
    <van-popup v-model="showPicker1" position="bottom">
      <van-picker
        value-key="label"
        show-toolbar
        :columns="columns1"
        @confirm="onConfirm1"
        @cancel="showPicker1 = false"
      />
    </van-popup>

    <van-popup v-model="showPicker3" position="bottom">
      <van-picker
        value-key="label"
        show-toolbar
        :columns="columns3"
        @confirm="onConfirm3"
        @cancel="showPicker3 = false"
      />
    </van-popup>
    <van-popup v-model="showPicker4" position="bottom">
      <van-picker
        value-key="label"
        show-toolbar
        :columns="columns4"
        @confirm="onConfirm4"
        @cancel="showPicker4 = false"
      />
    </van-popup>
    <Suggest
      v-model="showModal"
      :options="options"
      :type="type"
      @keyWordValue="handleSearchChange"
      @finish="handleValueClick"
      @closed="showModal=false"
    />
    <van-popup v-model="showPicker8" position="bottom">
      <van-calendar v-model="showPicker8" @confirm="onConfirm8" />
    </van-popup>
    <van-popup v-model="showPicker9" position="bottom">
      <van-calendar v-model="showPicker9" @confirm="onConfirm9" />
    </van-popup>
    <van-popup v-model="showPicker10" position="bottom">
      <van-calendar v-model="showPicker10" @confirm="onConfirm10" />
    </van-popup>
    <van-popup v-model="showPicker11" position="bottom">
      <van-calendar v-model="showPicker11" @confirm="onConfirm11" />
    </van-popup>
  </div>
</template>

<script>
import SelfPopup from '@/components/SelfPopup'
import Suggest from '@/components/SuggestSearch.vue'
import CardItem from './components/List'
import { getProjectWayBillList } from '@/api/freight' // 外线接口
// import { Toast } from 'vant
export default {
  components: {
    CardItem,
    SelfPopup,
    Suggest

  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + MM + '-' + d;
    }
  },
  data() {
    return {
      error: '',
      dateTimes: false,
      shipperr: true,
      checkShow: false,
      value: '', // 搜索框
      active: '', // 当前激活的tab,
      refreshing: false, // 下拉刷新
      loading: false, // 上拉加载
      finished: false, // 是否加载完成
      show: false,
      day: [],
      ruleForm: {
        username: '',
        password: ''
      },
      count: 0, // 下拉刷新次数
      isLoading: false, // 下拉刷新状态
      tabArrs: [ // tabs数组
        {
          text: '全部',
          num: 100
        },
        {
          text: '待上报',
          num: 0
        },
        {
          text: '已上报',
          num: 0
        }

      ],
      form: { // 查询表单

      },
      page: {
        current: 0,
        total: 0,
        size: 10
      },
      // 筛选
      text1: '', // 城市选择
      text2: '', // 用户名
      text3: '', // 线路
      text4: '', // 加盟经理
      text10: '', // 开始时间
      text11: '', // 结束时间
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,
      showPicker8: false,
      showPicker9: false,
      showPicker10: false,
      showPicker11: false,

      columns1: [
        {
          label: '专车',
          value: 1
        },
        {
          label: '共享',
          value: 0
        }
      ],
      columns2: [
        {
          label: '有线路余额',
          value: 1
        },
        {
          label: '无线路余额',
          value: 0
        }
      ],
      columns3: [
        {
          label: '稳定线路',
          value: 1
        },
        {
          label: '临时线路',
          value: 0
        }
      ],
      columns4: [
        {
          label: '城配线',
          value: 1
        },
        {
          label: '支线',
          value: 0
        }
      ],
      showModal: false,
      options: [],
      type: '',
      lists: [],
      checkedList: []

    }
  },
  computed: {
    minDate() {
      if (this.form.r) {
        return new Date(this.form.r)
      }
      return new Date()
    },
    checkedNum() {
      return this.lists.filter(item => item.checked).length
    },
    checkedarr() {
      return this.lists.filter(item => item.checked)
    },
    checkall: {
      get: function() {
        return (this.lists.length === this.checkedNum)
      },
      set: function(val) {
        if (val) {
          this.lists.forEach(item => {
            item.checked = true
          })
        } else {
          this.lists.forEach(item => {
            item.checked = false
          })
        }
      }
    }
  },

  mounted() {

  },
  methods: {
    Shipper() {
      this.shipperr = false
      this.checkShow = true
    },
    dateTime() {
      let endDate = this.$route.query.endDate
      let startDate = this.$route.query.startDate
      let nTime = startDate - endDate;
      console.log(startDate, endDate)
      let time = nTime / 86400000;
      let arr = []
      for (let i = 0; i < time; i++) {
        arr.push(i * 86400000)
      }
      let arr1 = [];
      for (let i = 0; i < arr.length; i++) {
        arr1.push({ time: Number(arr[i]) + Number(endDate) })
      }
      this.day = arr1
      this.dateTimes = true
    },
    timenum(e) {
      console.log(e, this.$route.query.projectId, 'xxxxxxxxxxx')
      this.dateTimes = false
      this.getConf1(e)
    },
    async getConf1(e) {
      try {
        this.$loading(true)
        let params = {
          endDate: this.$route.query.startDate,
          startDate: e,
          projectId: this.$route.query.projectId,
          reportState: null
        }
        let { data: res } = await getProjectWayBillList(params)
        if (res.success) {
          this.lists = res.data
        } else {
          this.loading = false;
          this.error = true;
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
        console.log(`get list fail:${err}`)
      } finally {
        this.$loading(false)
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    showPopup() {
      this.show = true
    },
    // 搜索
    handleSearchClick() {
      this.$router.push({
        path: '/outlineSearch',
        parmas: {
          type: 1
        }
      })
    },
    // 状态切换
    handleTabChange(tab) {
      if (tab === 0) {
        this.getConfirmInfoList(true, null)
      } else if (tab === 1) {
        this.getConfirmInfoList(true, 0)
      } else if (tab === 2) {
        this.getConfirmInfoList(true, 1)
      }
    },
    async getConfirmInfoList(isInit, tab) {
      try {
        this.$loading(true)
        let params = {
          endDate: this.$route.query.startDate,
          startDate: this.$route.query.endDate,
          projectId: this.$route.query.projectId,
          reportState: tab
        }
        let { data: res } = await getProjectWayBillList(params)
        if (res.success) {
          this.lists = res.data
          if (tab === null) {
            this.tabArrs.forEach(item => {
              if (item.name === this.form.customerState) {
                item.num = res.title.all
              } else {
                item.num = null
              }
            })
          } else if (tab === 1) {
            this.tabArrs.forEach(item => {
              if (item.name === this.form.customerState) {
                item.num = res.title.reported
              } else {
                item.num = 0
              }
            })
          } else {
            this.tabArrs.forEach(item => {
              if (item.name === this.form.customerState) {
                item.num = res.title.notReport
              } else {
                item.num = 1
              }
            })
          }
        } else {
          this.loading = false;
          this.error = true;
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
        console.log(`get list fail:${err}`)
      } finally {
        this.$loading(false)
      }
    },
    async onLoad(isInit = false) {
      if (isInit === true) { // 下拉刷新
        this.page.current = 1
        this.lists = []
      } else { // 上拉加载更多
        this.page.current++
      }
      let result = await this.getConfirmInfoList(isInit)
      if (!result) {
        return
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

    onQuery() {
      this.getConf()
      console.log('submit', this.form)
    },
    // 重置
    onReset(form) {
      this.text1 = ''
      this.text2 = ''
      this.text3 = ''
      this.text4 = ''
      this.text10 = ''
      this.text11 = ''
      this.form = {}
      console.log('reset');
    },
    async getConf() {
      try {
        let parmas = {
          customerCity: this.text1,
          customer: this.text2,
          project: this.text3,
          dutyManagerId: this.text4,
          startDate: this.text10
        }
        this.$loading(true)
        let { data: res } = await getProjectWayBillList(parmas)
        console.log(res)
        if (res.success) {
          this.lists = res.data
          this.listQuery = ''
        } else {
          this.loading = false;
          this.error = true;
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
        console.log(`get list fail:${err}`)
      } finally {
        this.$loading(false)
      }
    },
    // 线路类型 ----右侧pop选中关闭
    onConfirm1(obj) {
      this.form.a = obj.value
      this.text1 = obj.label
      this.showPicker1 = false
    },
    // 是否有线路余额 ----右侧pop选中关闭
    onConfirm2(obj) {
      this.form.b = obj.value
      this.text2 = obj.label
      this.showPicker2 = false
    },
    // 线路分类 ----右侧pop选中关闭
    onConfirm3(obj) {
      this.form.c = obj.value
      this.text3 = obj.label
      this.showPicker3 = false
    },
    // 是否为城配线 ----右侧pop选中关闭
    onConfirm4(obj) {
      this.form.d = obj.value
      this.text4 = obj.label
      this.showPicker4 = false
    },
    // 模糊搜索
    handleSearchChange(value) {
      console.log('这里面接口请求模糊查询:', value)
    },
    /**
     *点击某一项
     */
    handleValueClick(obj) {
      console.log('xxx:', obj)
    },
    handleShowModal(text) {
      if (text === 'manager') {
        this.options = []
      } else if (text === 'sell') {
        this.options = []
      } else if (text === 'carType') {
        this.options = []
      }
      this.type = text
      this.showModal = true
    },
    // 上架截止日期 ----右侧pop选中关闭
    onConfirm8(date) {
      this.text8 = `${date.getMonth() + 1}/${date.getDate()}`;
      this.form.o = date
      this.showPicker8 = false;
    },
    // 上架截止日期 ----右侧pop选中关闭
    onConfirm9(date) {
      this.text9 = `${date.getMonth() + 1}/${date.getDate()}`;
      this.form.p = date
      this.showPicker9 = false;
    },
    // 创建时间开始日期 ----右侧pop选中关闭
    onConfirm10(date) {
      this.text10 = `${date.getMonth() + 1}/${date.getDate()}`;
      this.form.r = date
      this.showPicker10 = false;
    },
    // 创建时间结束日期 ----右侧pop选中关闭
    onConfirm11(date) {
      this.text11 = `${date.getMonth() + 1}/${date.getDate()}`;
      this.form.s = date
      this.showPicker11 = false;
    }

  }
}
</script>
<style lang='scss' scoped>
.lineListContainer {
  font-family: PingFangSC-Medium;
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
.CardItemcontainer {
  margin-top: 10px;
  padding: 0px 15px;
  font-family: PingFangSC-Semibold;
  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .title {
    margin: 10px 0px;
    font-size: 14px;
    color: #3C4353;
  }
  .title>span{
    float: right;
  }
  .text {
    margin-top:0px;
    margin-bottom:8px;
    font-size: 13px;
    color: #3C4353;
  }
  .text_xiang{
    float: right;
    color: blue ;
  }
  .footer {
    margin-bottom:12.5px;
    display: flex;
    flex-direction: column;
    .time {
      margin: 0px;
      font-size: 11px;
      color: #838A9D;
      line-height: 20px;
    }
    .right {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .tag {
        margin-right:5px;
        padding: 3px 10px;
      }
    }
  }
  .detail {
    padding: 7px 0px;
    text-align: center;
    border-top-color:#D8D8D8;
  }
}
.all{
  margin-left: 20px;
}

</style>

<style scoped>
  .ListContainer >>> .van-tab__text {
    font-size: 12px;
    color: #3C4353;
  }
</style>
<style scoped>
  .lineListContainer >>>.SelfPopup[data-v-7aa3f8c0] .van-popup {
    width: 80%;
    height: 94vh;
    box-sizing: border-box;
}
.lineListContainer >>>.van-popup--right {
    top: 54%;
    right: 0;
    /* -webkit-transform: translate3d(0, -50%, 0); */
    transform: translate3d(0, -50%, 0);
}
.lineListContainer >>>.van-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.19);
}
.lineListContainer>>>.van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 90%;
    padding: 0.26667rem 0.42667rem;
    overflow: hidden;
    color: #3C4353;
    font-size: 0.34667rem;
    line-height: 0.64rem;
    background-color: #fff;
}
.day{
  z-index: 999;
  position: absolute;
  right: 0;
  top: 100px;
  width: 80px;
  text-align: center;
  overflow: hidden;
  padding: 0 5px 0 5px;
  box-sizing: border-box;
  background: #666;
  overflow: hidden;
}
.day>li{
  width: 100%;
  color: #fff;
  line-height: 20px;
}
</style>

