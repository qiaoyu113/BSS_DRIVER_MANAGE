<template>
  <div class="JoinSearch">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <!-- 搜索 -->
    <van-search
      v-model="keyWord"
      show-action
      placeholder="请输入司机名称/手机号"
      @input="onSearcha"
      @search="onSearch"
      @clear="onCancel"
    >
      <template #action>
        <div @click="onSearcha">
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
        <h4 class="flex align-center justify-between">
          <div>历史记录</div>
          <van-icon
            v-if="historyItems.length > 0"
            name="delete"
            @click="onDelete"
          />
        </h4>
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
import CardItem from '../OutSideFreightList/components/Cardltem'
import { debounce } from '@/utils/index'
import { getProjectWayBillList } from '@/api/freight'
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
      type: '',
      localKey: 'OutSideLine',
      projectId: ''
    }
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    let historyData = this.getHistory()
    if (historyData) {
      this.historyItems = JSON.parse(historyData)
    }
    this.type = this.$route.query.type
    this.projectId = this.$route.query.id
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      this.$router.go(-1)
    },
    // 搜索
    onSearch: debounce(function() {
      if (!this.keyWord) {
        this.lists = []
        return false
      }
      this.getGmInfoListByKeyWorld(this.keyWord)
    }, 200),
    onSearcha() {
      if (this.keyWord) {
        this.setHistory(this.keyWord)
      }
      this.getGmInfoListByKeyWorld(this.keyWord)
    },
    /**
     * 删除历史记录
     */
    onDelete() {
      this.$dialog
        .alert({
          title: '提示',
          message: '确定删除全部历史记录？',
          showCancelButton: true
        })
        .then(() => {
          localStorage.removeItem(this.localKey);
          this.historyItems = [];
        });
    },
    // 取消
    onCancel() {
      this.keyWord = ''
      this.lists = []
    },
    handleItemClick(value) {
      this.keyWord = value
      this.getGmInfoListByKeyWorld(value)
    },
    // 搜索
    async getGmInfoListByKeyWorld(keyword = '') {
      this.$loading(true)
      try {
        let params = {
          page: 1,
          pageNumber: 20,
          projectId: this.projectId
        }
        keyword && (params.key = keyword)
        let { data: res } = await getProjectWayBillList(params)
        this.$loading(false)
        if (res.success) {
          this.lists = res.data
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.$loading(false)
        console.log(`get search data fail:${err}`)
      }
    },
    // 存localStorage
    setHistory(keyword) {
      let index = this.historyItems.findIndex(item => item === keyword)
      if (index > -1) {
        this.historyItems.splice(index, 1)
      }

      if (this.historyItems.length >= 10) {
        this.historyItems.pop()
      }
      this.historyItems.unshift(keyword)
      localStorage.setItem(this.localKey, JSON.stringify(this.historyItems))
    },
    // 获取从localStorage
    getHistory() {
      let history = localStorage.getItem(this.localKey)
      if (history) {
        return history
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.JoinSearch {
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
        word-break:break-all;
      }
    }
  }
}

</style>

<style scoped>
  .JoinSearch >>> .van-hairline--top::after {
    border-color: #649CEE;
  }
  .JoinSearch >>> .van-search__content {
    display: flex;
    flex-direction: column-reverse;
  }
  .JoinSearch >>> .van-search {
    display: flex;
    align-items: flex-start;
  }
</style>

