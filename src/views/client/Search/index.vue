<template>
  <div class="customerSearchContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="客户项目" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 搜索 -->
    <van-search
      v-model="keyWord"
      show-action
      placeholder="请输入搜索关键词"
      @input="onSearch"
      @search="onSearch"
      @clear="onCancel"
    >
      <template #action>
        <div @click="onSearch">
          搜索
        </div>
      </template>
      <template #label>
        <div v-if="options.length > 0" class="van-hairline--top">
          <van-cell v-for="item in options" :key="item" :value="item" @click="handleItemClick(item)" />
        </div>
      </template>
    </van-search>

    <!-- 搜索结果 -->
    <template v-if="lists.length > 0">
      <div v-for="sub in lists" :key="sub.id">
        <CardItem :obj="sub" />
        <div class="lineHeight"></div>
      </div>
    </template>
    <template v-else>
      <div v-show="options.length === 0" class="history">
        <h4>历史记录</h4>
        <div class="historyContainer">
          <div v-for="item in historyItems" :key="item" class="item" @click="handleItemClick(item)">
            {{ item }}
          </div>
        </div>
      </div>
      <van-empty image="search" description="抱歉，未找到相关数据！" />
    </template>
  </div>
</template>

<script>
import CardItem from '../List/components/CardItem'
import { debounce } from '@/utils/index'
export default {
  components: {
    CardItem
  },
  data() {
    return {
      keyWord: '',
      lists: [],
      historyItems: [
        '京东',
        '顺丰',
        '中国邮政配送中心',
        '启恒物流',
        '德邦物流'
      ],
      options: []
    }
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      this.$router.go(-1)
    },
    // 搜索
    onSearch: debounce(function() {
      if (!this.keyWord) {
        return false
      }

      console.log(this.keyWord)
      if (this.keyWord === 'd') {
        this.options = [
          '京东',
          '京东12121',
          '京东121212ddasddasd'
        ]
      } else {
        this.lists = [
          {
            id: 1,
            title: '京东城配线(xs200808)',
            contacts: '小小悠',
            phone: '15021578693',
            clientProperty: '外线客户',
            createDate: Date.now(),
            tag: '已启用'
          }
        ]
      }
    }, 200),
    // 取消
    onCancel() {
      this.keyWord = ''
      this.lists = []
    },
    handleItemClick(value) {
      this.keyWord = value
    }
  }
}

</script>

<style lang='scss' scoped>
.customerSearchContainer {
  font-family: PingFangSC-Regular;
  .lineHeight {
    background: #F9F9F9;
    height:10px;
    width:100%;
  }
  .history {
    padding: 10px 12px;
    h4 {
      margin: 0px;
      font-size: 15px;
      color: #838A9D;
    }
    .historyContainer {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .item {
        margin-right: 5px;
        margin-top: 7.5px;
        padding: 4px 17px;
        background: #F6F7F9;
        border-radius: 3px;
        font-size: 13px;
        color: #838A9D;
      }
    }
  }
}

</style>

<style scoped>
  .customerSearchContainer >>> .van-hairline--top::after {
    border-color: #649CEE;
  }
  .customerSearchContainer >>> .van-search__content {
    display: flex;
    flex-direction: column-reverse;
  }
  .customerSearchContainer >>> .van-search {
    display: flex;
    align-items: flex-start;
  }
</style>

