<template>
  <div class="OutSideList">
    <!-- navbar -->
    <div class="top">
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <div v-if="listQuery.reportState !== 1" v-permission="['/v2/waybill/reportMoneyBatchBySale', '/v2/waybill/noCarBatchBySale']" class="headerRight" @click="batch">
            批量上报
          </div>
        </template>
      </van-nav-bar>
      <!-- 搜索 -->
      <van-search
        v-permission="['/v2/waybill/getLineInfoListByKeyWord', '/v2/waybill/getLineInfoList']"
        show-action
        placeholder="请输入司机名称/手机号"
        readonly
        @click="handleSearchClick"
      >
        <template #action>
          <div class="searchSelect" @click="filter_left">
            日期
            <van-icon name="play" color="#3C4353" />
          </div>
        </template>
      </van-search>
      <!-- tabs -->
      <van-tabs v-model="listQuery.reportState" swipeable @change="handleTabChange">
        <van-tab v-for="item in tabArrs" :key="item.text" :name="item.name">
          <template #title>
            {{ item.text }}
            <div v-if="item.name === listQuery.reportState" class="van-info">
              {{ item.total }}
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 下拉刷新  上拉加载 -->
    <div class="list Outsidefreightlist">
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
                <van-checkbox v-if="sub.lineStatusCode === 0" :name="sub.wayBillId" :disabled="sub.lineStatusCode !== 0" shape="square" />
              </p>
              <CardItem :obj="sub" />
            </div>
          </van-checkbox-group>
        </van-list>
      </van-pull-refresh>
    </div>
    <div v-if="optionsType" class="Bulk">
      <button v-preventreclick @click="cancel()">
        取消批量上报
      </button>
      <button v-preventreclick @click="Add_to()">
        批量上报运费
      </button>
    </div>
    <!-- 日历 -->
    <!-- picker -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-datetime-picker
        v-model="formStr.date"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="showPicker = false"
        @confirm="onSubmit"
      />
    </van-popup>
  </div>
</template>

<script>
import CardItem from './components/Cardltem'
import { wayBillAmountDetail, getProjectWayBillList } from '@/api/freight'
import { HandlePages } from '@/utils/index'
export default {
  name: 'Outsidefreightlist',
  components: {
    CardItem
  },
  data() {
    return {
      scrollTop: 0,
      error: false,
      showPopup: false, // 打开查询抽屉
      showCalendar: false, // 打开日历
      refreshing: false, // 下拉刷新
      loading: false, // 上拉加载
      finished: false, // 是否加载完成
      // picker
      minDate: new Date(+new Date() - 86400000 * 365),
      maxDate: new Date(+new Date() + 86400000 * 365),
      optionsType: false,
      checkResult: [],
      checkAll: false,
      tabArrs: [ // tabs数组
        {
          text: '全部',
          total: 0,
          name: ''
        },
        {
          text: '待上报',
          total: 0,
          name: 0
        },
        {
          text: '已上报',
          total: 0,
          name: 1
        }
      ],
      lists: [],
      showPicker: false,
      // search
      listQuery: {
        projectId: '',
        key: '',
        pageNumber: '',
        reportState: '',
        startDate: '',
        endDate: ''
      },
      formStr: {
        date: new Date()
      },
      options: [],
      type: '',
      page: {
        current: 0,
        total: 0,
        limit: 20
      },
      checkedNum: 0,
      title: ''
    }
  },
  computed: {
  },
  // // 回来后还原
  beforeRouteEnter(to, from, next) {
    next(vm => {
      document.querySelector('.Outsidefreightlist').scrollTop = vm.scrollTop
    })
  },
  // 离开前保存高度
  beforeRouteLeave(to, from, next) {
    this.scrollTop = document.querySelector('.Outsidefreightlist').scrollTop
    next()
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
    }
  },
  mounted() {
    this.listQuery.projectId = this.$route.query.id;
    const { start, end, title } = this.$route.query;
    this.listQuery.startDate = start;
    this.listQuery.endDate = end;
    this.title = title.trim().split(' ')[0];
    this.formStr.date = new Date(Number(start));
    this.minDate = new Date(Number(start));
    this.maxDate = new Date(Number(end));
  },
  methods: {
    // 选项格式化函数
    formatter(type, val) {
      // year、month、day、hour、minute
      const format = {
        year: '年',
        month: '月',
        day: '日',
        hour: '时',
        minute: '分'
      }
      return val + format[type]
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
          this.$router.push({
            path: '/outsidereport',
            query: {
              obj: JSON.stringify(this.checkResult)
            }
          })
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
      if (this.listQuery.reportState !== 1) {
        this.optionsType = !this.optionsType;
      }
    },
    filter_left() {
      this.showPicker = true
    },
    async getConf() { // 首页加盟运费筛选
      try {
        this.$loading(true)
        let { data: res } = await getProjectWayBillList(this.listQuery)
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
    // 状态切换
    async handleTabChange(tab) {
      this.lists = [];
      this.checkResult = [];
      this.page.current = 1
      if (tab === 1) {
        this.optionsType = false;
      }
      let result = await this.getLists(true)
      this.lists = result.lists
      this.isModeData()
    },
    async onSubmit(value) {
      this.showPicker = false;
      this.listQuery.departureDate = +new Date(value)
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
        this.error = false
        const params = this.delForm(this.listQuery);
        params.page = this.page.current;
        params.limit = this.page.limit;
        let { data: res } = await getProjectWayBillList(params);
        if (res.success) {
          !res.data && (res.data = [])
          HandlePages(res.page)
          let newLists = res.data;
          if (!isInit) {
            newLists = this.lists.concat(newLists);
          }
          let result = {
            lists: newLists,
            hasMore: res.data.length === this.page.limit
          }
          this.tabArrs.forEach((item) => {
            if (item.name === this.listQuery.reportState) {
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
        console.log('xxxx:', err)
        this.page.current--;
        this.loading = false;
        this.error = true;
        this.refreshing = false;
        this.finished = true;
        console.log(`get list fail:${err}`);
      }
    },
    // 选择线路
    onConfirm(obj) {
      this.showPicker = false;
      this.$router.push({
        path: '/createLine',
        query: {
          isStable: obj.value
        }
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
        path: '/outsidelinesearch',
        query: {
          id: this.listQuery.projectId
        }
      })
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
    }
  }
}
</script>

<style lang='scss' scoped>
.OutSideList {
  display: flex;
  flex-direction: column;
  background:#f9f9f9;
  .van-info{
    transform: translate(-10%, 0);
  }
  .top {
    margin-bottom: 5px;
    background:#f9f9f9;
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
