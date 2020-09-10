<template>
  <div class="OutSideList">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="加盟运费" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="headerRight" @click="batch">
            批量上报
          </div>
        </template>
      </van-nav-bar>
      <!-- 搜索 -->
      <van-search show-action placeholder="请输入项目名称/编号" readonly @click="handleSearchClick">
        <template #action>
          <div class="searchSelect" @click="filter_left">
            筛选
            <van-icon name="play" color="#3C4353" />
          </div>
        </template>
      </van-search>
    </van-sticky>

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
          <van-tab v-for="item in tabArrs" :key="item.text" :name="item.name">
            <template #title>
              {{ item.text }}
              <div v-if="item.num" class="van-info">
                {{ item.num }}
              </div>
            </template>
          </van-tab>
        </van-tabs>

        <P v-if="optionsType" class="all">
          <van-checkbox v-model="checkAll" class="checked" shape="square" @click="checkAlls">
            <span class="text">全选</span>
            <span class="text">已选择{{ checkedNum }} 个出车单位</span>
          </van-checkbox>
        </P>
        <van-checkbox-group ref="checkboxGroup" v-model="checkResult">
          <div v-for="sub in lists" :key="sub.id" class="listBox">
            <p v-if="optionsType" class="checked-box">
              <van-checkbox :name="sub.wayBillId" shape="square" />
            </p>
            <CardItem :obj="sub" />
          </div>
        </van-checkbox-group>
      </van-list>
    </van-pull-refresh>

    <!-- 选择临时线路or稳定线路 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        value-key="label"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>

    <!-- 右侧筛选抽屉 -->
    <SelfPopup
      :show.sync="showPopup"
      form-ref="form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <!-- <van-field
        readonly
        clickable
        label-width="7em"
        name="city"
        :value="listQuery.city"
        label="城市"
        is-link
        placeholder="请选择城市"
        @click="showPickerFn('city')"
      /> -->
      <van-field
        v-model="listQuery.name"
        colon
        name="name"
        label-width="7em"
        label="司机城市"
        placeholder="请输入城市"
      />
      <van-field
        v-model="listQuery.name1"
        colon
        name="name1"
        label-width="7em"
        label="客户"
        placeholder="请输入客户"
      />
      <van-field
        v-model="listQuery.name2"
        name="name2"
        colon
        label-width="7em"
        label="项目"
        placeholder="请输入项目"
      />
      <van-field
        v-model="listQuery.name3"
        name="name3"
        colon
        label-width="7em"
        label="上岗经理"
        placeholder="请输入上岗经理"
      />
      <van-field
        readonly
        colon
        clickable
        label="出车时间"
        label-width="7em"
        is-link
        name="date"
        :value="pickerNames.date"
        placeholder="请选择出车时间"
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
      @confirm="onConfirmDate"
    />
    <!-- picker -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        value-key="name"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm4"
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

    <div v-if="optionsType" class="Bulk">
      <button @click="cancel()">
        取消批量上传
      </button>
      <button @click="Add_to()">
        批量上报运费
      </button>
    </div>
  </div>
</template>

<script>
import CardItem from './components/Cardltem'
import SelfPopup from '@/components/SelfPopup';
import Suggest from '@/components/SuggestSearch.vue'
import { parseTime } from '@/utils'
import { getGmInfoList, wayBillAmountDetail } from '@/api/freight'
export default {
  components: {
    CardItem,
    SelfPopup,
    Suggest
  },
  data() {
    return {
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
      tabArrs: [ // tabs数组
        {
          text: '全部',
          num: 0
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
      lists: [],
      showPicker: false,
      columns: [
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

      },
      // search
      listQuery: {
        name: '',
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

      showModal: false,
      options: [],
      type: '',
      cityList: [
        {
          name: '北京市',
          code: 1
        },
        {
          name: '上海市',
          code: 0
        }
      ],
      page: {
        current: 0,
        total: 0,
        size: 10
      },
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
        this.checkAll = true;
      }
      this.checkedNum = val.length
    }
  },
  mounted() {
  },
  methods: {
    checkAlls() {
      if (!this.checkResult.length) {
        this.$refs.checkboxGroup.toggleAll(true);
        this.checkAll = true;
      } else {
        if (this.checkResult.length < this.lists.length) {
          this.$refs.checkboxGroup.toggleAll(true);
          this.checkAll = true;
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
              obj: JSON.stringify(res.data)
            }
          })
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } else {
        this.$toast.fail('请选择上报的')
      }
    },
    cancel() {
      this.optionsType = false;
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    batch() {
      this.optionsType = !this.optionsType;
    },
    filter_left() {
      this.showPopup = true
    },
    async getConf() { // 首页加盟运费筛选
      try {
        let parmas = {
          customerCity: this.listQuery.name,
          customer: this.listQuery.name1,
          project: this.listQuery.name2,
          dutyManagerId: this.listQuery.name3,
          startDate: Date.parse(this.listQuery.startDate)
        }
        this.$loading(true)
        let { data: res } = await getGmInfoList(parmas)
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
    handleTabChange(tab) {
      this.onLoad(true);
      // if (tab === 0) {
      //   this.getConfirmInfoList(true, null)
      // } else if (tab === 1) {
      //   this.getConfirmInfoList(true, 0)
      // } else if (tab === 2) {
      //   this.getConfirmInfoList(true, 1)
      // }
    },
    async getConfirmInfoList(isInit) { // 首页加盟运费列表
      try {
        this.$loading(true)
        let params = {
          page: this.page.current,
          limit: this.page.size,
          pageNumber: 20,
          wayBillGMSaleStatus: this.active

        }
        let { data: res } = await getGmInfoList(params)
        if (res.success) {
          this.lists = this.lists.concat(res.data)
          if (this.active === null) {
            this.tabArrs.forEach(item => {
              if (item.name === this.form.customerState) {
                item.num = res.title.all
              } else {
                item.num = null
              }
            })
          } else if (this.active === 1) {
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
          return res;
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
    /**
     * 日期选择
     */
    onConfirmDate(date) {
      const [start, end] = date;
      this.showCalendar = false;
      let startDate = parseTime(start, '{y}-{m}-{d}');
      let endDate = parseTime(end, '{y}-{m}-{d}');
      this.pickerNames.date = `${startDate} - ${endDate}`;
      this.listQuery.startDate = startDate;
      this.listQuery.endDate = endDate;
    },
    async onLoad(isInit = false) {
      if (isInit === true) {
        // 下拉刷新
        this.page.current = 1;
        this.lists = [];
      } else {
        // 上拉加载更多
        this.page.current++;
      }
      let statusType = ''
      if (this.active === 0) {
        statusType = null
      } else if (this.active === 1) {
        statusType = 0
      } else if (this.active === 2) {
        statusType = 1
      }
      let result = await this.getConfirmInfoList(isInit, statusType)
      if (!result) {
        return false
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
    // 搜索
    handleSearchClick() {
      this.$router.push({
        path: '/outlineSearch',
        query: {
          type: 1
        }
      })
    },
    /**
     * 提交查询
     */
    onSubmit(value) {
      this.getConf()
      this.showPopup = false;
      this.refreshing = true;
      // console.log('submit', value);
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
.OutSideList {
  font-family: PingFangSC-Medium;
  background:#f9f9f9;
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
    height: 50px;
    display: flex;
    z-index: 999;
    justify-content: space-between;
    position: fixed;
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
    height: 94vh;
    margin-top: 26px;
    box-sizing: border-box;
}
.OutSideList >>>.van-button--primary:nth-child(2){
    color: #fff;
    background-color: #1c4be7bd;
    border: 1px solid #2f448a;
}
</style>
