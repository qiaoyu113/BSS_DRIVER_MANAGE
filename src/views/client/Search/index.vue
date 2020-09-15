<template>
  <div class="customerSearchContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="搜索客户" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 搜索 -->
    <van-search
      v-model="keyWord"
      show-action
      placeholder="请输入搜索关键词"
      maxlength="30"
      @input="onSearch"
      @search="onSearch"
      @clear="onCancel"
    >
      <template #action>
        <div @click="getLists(keyWord,true)">
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
        <div class="subTitle">
          <h4>
            历史记录
          </h4>
          <van-icon v-if="historyItems.length > 0" name="delete" size="20" color="#7F8FBD" @click="deleteHistory" />
        </div>
        <div class="historyContainer">
          <div v-for="item in historyItems" :key="item" class="item van-ellipsis" @click="handleItemClick(item)">
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
import { getClientSearch } from '@/api/client'
export default {
  components: {
    CardItem
  },
  data() {
    return {
      keyWord: '', // 关键字
      lists: [], // 查询出来的数据
      historyItems: [], // 历史搜索
      options: []// 关键字查出来的关键字
    }
  },
  mounted() {
    this.getHistoryFromDisk()
  },
  methods: {
    getHistoryFromDisk() {
      let historyData = this.getHistory()
      if (historyData) {
        this.historyItems = JSON.parse(historyData)
      } else {
        this.historyItems = []
      }
    },
    // 返回上一页
    onClickLeft() {
      this.$router.go(-1)
    },
    // 搜索
    onSearch: debounce(function() {
      if (!this.keyWord) {
        return false
      }
      this.getLists(this.keyWord)
    }, 1000),
    // 取消
    onCancel() {
      this.keyWord = ''
      this.lists = []
    },
    // 搜索历史关键字
    handleItemClick(value) {
      this.keyWord = value
      this.getLists(this.keyWord)
    },
    // 搜索
    async getLists(keyword = '', isAddHistory = false) {
      try {
        let params = {
          page: 1,
          pageNumber: 9999
        }
        keyword && (params.key = keyword)
        this.$loading(true)
        let { data: res } = await getClientSearch(params)
        if (res.success) {
          this.lists = res.data
          if (keyword && isAddHistory) {
            this.setHistory(keyword)
          }
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get search data fail:${err}`)
      } finally {
        this.$loading(false)
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
      localStorage.setItem('clent', JSON.stringify(this.historyItems))
    },
    // 获取从localStorage
    getHistory() {
      let history = localStorage.getItem('clent')
      if (history) {
        return history
      }
    },
    // 删除历史
    deleteHistory() {
      localStorage.removeItem('clent')
      this.getHistoryFromDisk()
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
    .subTitle {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
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

