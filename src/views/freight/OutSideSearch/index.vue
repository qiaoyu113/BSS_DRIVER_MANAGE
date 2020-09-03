<template>
  <div class="lineSearchContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="运费搜索" left-text="返回" left-arrow @click-left="onClickLeft" />
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
import CardItem from '../List/components/Cardltem'
import { debounce } from '@/utils/index'
import { getGmInfoListByKeyWorld } from '@/api/freight'
export default {
  components: {
    CardItem
  },
  data() {
    return {
      keyWord: '', // 关键字
      lists: [], // 查询出来的数据
      historyItems: [], // 历史搜索
      options: [], // 关键字查出来的关键字
      type: ''
    }
  },
  mounted() {
    let historyData = this.getHistory()
    if (historyData) {
      this.historyItems = JSON.parse(historyData)
    }
    this.type = this.$route.query.type
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
      console.log(this.type)
      if (this.type === '1') {
        this.getGmInfoListByKeyWorld(this.keyWord)
      }
    }, 200),
    // 取消
    onCancel() {
      this.keyWord = ''
      this.lists = []
    },
    handleItemClick(value) {
      this.keyWord = value
    },
    // 搜索
    async getGmInfoListByKeyWorld(keyword = '') {
      try {
        let params = {
          page: 1,
          pageNumber: 9999
        }
        keyword && (params.key = keyword)
        let { data: res } = await getGmInfoListByKeyWorld(params)
        if (res.success) {
          this.lists = res.data
          if (keyword) {
            this.setHistory(keyword)
          }
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get search data fail:${err}`)
      }
    },
    // 存localStorage
    setHistory(keyword) {
      let index = this.historyItems.findIndex(item => item === keyword)
      if (index > -1) {
        this.historyItems.splice(index, 1)
      }

      if (this.historyItems.length >= 5) {
        this.historyItems.shift()
      }
      this.historyItems.push(keyword)
      localStorage.setItem('line', JSON.stringify(this.historyItems))
    },
    // 获取从localStorage
    getHistory() {
      let history = localStorage.getItem('line')
      if (history) {
        return history
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.lineSearchContainer {
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
  .lineSearchContainer >>> .van-hairline--top::after {
    border-color: #649CEE;
  }
  .lineSearchContainer >>> .van-search__content {
    display: flex;
    flex-direction: column-reverse;
  }
  .lineSearchContainer >>> .van-search {
    display: flex;
    align-items: flex-start;
  }
</style>

