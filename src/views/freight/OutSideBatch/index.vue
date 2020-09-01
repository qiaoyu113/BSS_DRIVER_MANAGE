<template>
  <div class="lineListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <div v-show="!batchShow" class="headerRight" @click="batch">
            批量上报
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 搜索 -->
    <van-search v-model="value" show-action placeholder="搜索司机姓名/编号">
      <template #action>
        <div class="searchSelect" @click="datePicker = true">
          日期
          <van-icon name="play" color="#3C4353" />
        </div>
      </template>
    </van-search>
    <!-- tabs -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in tabArrs" :key="item.text">
        <template #title>
          {{ item.text }}
          <div v-if="item.num" class="van-info">
            {{ item.num }}
          </div>
        </template>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- <p>刷新次数: {{ count }}</p> -->

          <CardItem :obj="lists" :batchshow="batchShow" @batch="batch" />
          <!-- <div class="lineHeight"></div> -->
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-popup v-model="datePicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        title="选择日期"
        type="date"
        :max-date="maxDate"
        @confirm="dateConfirm"
        @cancel="datePicker = false"
      />
    </van-popup>
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
// import Suggest from '@/components/SuggestSearch.vue'
import CardItem from './components/List'
import { Toast } from 'vant'
export default {
  components: {
    CardItem
  },
  data() {
    return {
      value: '', // 搜索框
      active: '', // 当前激活的tab,
      show: false,
      batchShow: false,
      currentDate: new Date(),
      datePicker: false,
      maxDate: this.getMaxDate(),
      title: '项目运费',
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
      lists: [
        {
          id: 1,
          title: '2020/09/08  李斯 / 1666666',
          statust: '待上报',
          update: '12233344',
          carType: '李斯',
          status: '郑州线路',
          all: false

        },
        {
          id: 2,
          title: '2020/09/08  张三 / 18888888888',
          statust: '待上报',
          yicahng: '有差异',
          update: '12233344',
          carType: '张三',
          status: '北京线路',
          all: false

        },
        {
          id: 3,
          title: '2020/09/08  张三 / 18888888888',
          yicahng: '有差异',
          statust: '3000.00',
          update: '12233344',
          carType: '张三',
          status: '北京线路'
        },
        {
          id: 4,
          title: '2020/09/08  张三 / 18888888888',
          yicahng: '',
          statust: '300.00',
          update: '12233344',
          carType: '张三',
          status: '北京线路'
        }
      ]
    }
  },
  computed: {
    minDate() {
      if (this.form.r) {
        return new Date(this.form.r)
      }
      return new Date()
    }
  },
  mounted() {
    console.log(typeof this.lists[3].all)
    this.title = this.$route.query.name
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    batch(res) {
      this.batchShow = !this.batchShow;
    },
    getMaxDate() {
      let y = new Date().getFullYear()
      let m = new Date().getMonth()
      let d = new Date().getDate()
      return new Date(y, m, d)
    },
    dateConfirm() {
      console.log(this.currentDate)
    },
    onRefresh() { // 下拉刷新
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    onQuery() {
      console.log('submit', this.form);
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
</style>

