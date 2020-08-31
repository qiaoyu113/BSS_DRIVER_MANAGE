<template>
  <div class="lineListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="加盟运费上报" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="headerRight" @click="batch">
            批量上报
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 搜索 -->
    <van-search v-model="value" show-action placeholder="搜索司机姓名/手机号" readonly>
      <template #action>
        <div class="searchSelect" @click="showPopup">
          筛选
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
          <div v-for="sub in lists" :key="sub.id">
            <CardItem :obj="sub" />
            <div class="lineHeight"></div>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import CardItem from './components/cardltem'
import { Toast } from 'vant';
export default {
  components: {
    CardItem

  },
  data() {
    return {
      value: '', // 搜索框
      active: '', // 当前激活的tab,
      show: false,

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
      lists: [
        {
          id: 1,
          title: '2020/09/08  李斯 / 1666666',
          statust: '待上报',
          update: '12233344',
          carType: '李斯',
          status: '郑州线路'

        },
        {
          id: 2,
          title: '2020/09/08  张三 / 18888888888',
          statust: '未出车',
          update: '12233344',
          carType: '张三',
          status: '北京线路'

        },
        {
          id: 3,
          title: '2020/09/08  张三 / 18888888888',
          statust: '3000.00',
          update: '12233344',
          carType: '张三',
          status: '北京线路'

        },
        {
          id: 4,
          title: '2020/09/08  张三 / 18888888888',
          yicahng: '异常',
          statust: '未出车',
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

  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    showPopup() {
      console.log(this.show)
      this.show = true
    },
    batch() {
      this.$router.push({ path: 'batch' })
    },
    onRefresh() { // 下拉刷新
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    // 查询
    onQuery() {
      console.log('submit', this.form);
    }
    // 重置

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
</style>

