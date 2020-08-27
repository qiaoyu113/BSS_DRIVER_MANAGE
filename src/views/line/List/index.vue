<template>
  <div class="lineListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="线路管理" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="headerRight">
            新建
            <van-icon name="add-o" />
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 搜索 -->
    <van-search v-model="value" show-action placeholder="请输入线路名称/线路编号" readonly>
      <template #action>
        <div class="searchSelect">
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
        <div v-for="sub in lists" :key="sub.id">
          <CardItem :obj="sub" />
          <div class="lineHeight"></div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import CardItem from './components/CardItem'
export default {
  components: {
    CardItem
  },
  data() {
    return {
      value: '', // 搜索框
      active: '', // 当前激活的tab,
      tabArrs: [ // tabs数组
        {
          text: '全部',
          num: 100
        },
        {
          text: '已上架',
          num: 0
        },
        {
          text: '已售罄',
          num: 0
        },
        {
          text: '未开跑已下架',
          num: 0
        },
        {
          text: '已开跑下架',
          num: 0
        }
      ],
      lists: [
        {
          id: 1,
          title: '京东城配线(xs200808)',
          update: '2020-080-09',
          line: '稳定线路/无线路余额/支线',
          carType: '小面',
          status: '已试跑',
          rearchDate: '2020-08-09',
          worktime: '10小时',
          tags: ['已上架', '共享', '已采线']
        },
        {
          id: 2,
          title: '京东城配线(xs200808)',
          update: '2020-080-09',
          line: '稳定线路/无线路余额/支线',
          carType: '小面',
          status: '已试跑',
          rearchDate: '2020-08-09',
          worktime: '10小时',
          tags: ['已上架', '共享', '已采线']
        }
      ]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
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

</style>

<style scoped>
  .ListContainer >>> .van-tab__text {
    font-size: 12px;
    color: #3C4353;
  }
</style>
