<template>
  <div class="Search">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
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
          <div @click="onRunList">
            搜索
          </div>
        </template>
      </van-search>
    </div>
    <!-- 搜索结果 -->
    <div class="bottom">
      <template v-if="lists.length > 0">
        <ListItem
          v-for="(item, index) in lists"
          :key="index"
          :item="item"
        />
      </template>
      <template v-else>
        <div v-show="options.length === 0" class="history">
          <div class="history-top flex align-center justify-between">
            <div>历史搜索记录</div>
            <van-icon
              v-if="historyItems.length > 0"
              name="delete"
              @click="onDelete"
            />
          </div>
          <div class="flex flex-wrap">
            <van-tag
              v-for="item in historyItems"
              :key="item"
              type="primary"
              class="history-item"
              @click="handleItemClick(item)"
            >
              {{ item }}
            </van-tag>
          </div>
        </div>
        <van-empty image="search" description="抱歉，未找到相关数据！" />
      </template>
    </div>
  </div>
</template>

<script>
import ListItem from './components/ListItem';
import { debounce } from '@/utils/index';
import { GetRunTestInfoList } from '@/api/tryrun';
export default {
  name: 'Search',
  components: {
    ListItem
  },
  data() {
    return {
      keyWord: '', // 关键字
      lists: [], // 查询出来的数据
      historyItems: [], // 历史搜索
      options: [] // 关键字查出来的关键字
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    let historyData = this.getHistory();
    if (historyData) {
      this.historyItems = JSON.parse(historyData);
    }
  },
  methods: {
    /**
     * 返回按钮
     */
    onClickLeft() {
      this.$router.go(-1);
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
          localStorage.removeItem('tryrun');
          this.historyItems = [];
        });
    },
    // 搜索
    onSearch: debounce(function() {
      if (!this.keyWord) {
        return false;
      }
      this.handleSearch(this.keyWord);
    }, 200),
    // 取消
    onCancel() {
      this.keyWord = '';
      this.lists = [];
    },
    handleItemClick(value) {
      this.keyWord = value;
      this.onRunList();
    },
    // 搜索
    async handleSearch(keyword = '') {
      try {
        let params = {};
        keyword && (params.key = keyword);
        let { data: res } = await GetRunTestInfoList(params);
        if (res.success) {
          this.lists = res.data;
          if (keyword) {
            this.setHistory(keyword);
          }
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`get search data fail:${err}`);
      }
    },
    // 存localStorage
    setHistory(keyword) {
      let index = this.historyItems.findIndex((item) => item === keyword);
      if (index > -1) {
        this.historyItems.splice(index, 1);
      }

      if (this.historyItems.length >= 5) {
        this.historyItems.shift();
      }
      this.historyItems.unshift(keyword);
      localStorage.setItem('tryrun', JSON.stringify(this.historyItems));
    },
    // 获取从localStorage
    getHistory() {
      let history = localStorage.getItem('tryrun');
      if (history) {
        return history;
      }
    },
    // 跳转页面
    onRunList() {
      this.$router.replace({
        path: '/try-list',
        query: {
          q: this.keyWord
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.Search {
  display: flex;
  flex-direction: column;
  background-color: @white;
  .top {
    background-color: @body-bg;
  }
  .bottom {
    flex: 1;
    overflow: auto;
  }
  .history-item {
    display: block;
    min-width: 60px;
    height: 28px;
    line-height: 28px;
    padding: 0 14px;
    font-size: @font-size-sm-1;
    color: @text-color-sm;
    background: @gray-11;
    text-align: center;
    box-sizing: border-box;
    margin-bottom: 8px;
    margin-right: 5px;
  }
  .history {
    padding: 10px 15px;
    .history-top {
      margin-bottom: 10px;
      line-height: 21px;
      font-size: @font-size-md-1;
      color: @text-color-sm;
    }
  }
  .noData {
    margin-top: 41.5px;
    text-align: center;
    .text {
      margin-top: 15px;
      font-size: 15px;
      color: #656565;
      text-align: center;
    }
    img {
      width: 83px;
      height: 74px;
    }
  }
}
</style>
