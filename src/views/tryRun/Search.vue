<template>
  <div class="Search">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        right-text="导出"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onTryRunExport"
      />
      <!-- 搜索 -->
      <form action="/" @submit.prevent="() => false">
        <van-search
          v-model.trim="keyWord"
          show-action
          type="search"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @clear="onCancel"
          @input="onInput"
        >
          <template #action>
            <div @click="onSearch">
              搜索
            </div>
          </template>
        </van-search>
      </form>
    </div>
    <!-- 搜索结果 -->
    <div class="bottom">
      <template v-if="lists.length > 0">
        <div class="list-bg">
          <ListItem v-for="(item, index) in lists" :key="index" :item="item" />
        </div>
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
              class="history-item flex align-center justify-center"
              @click="handleItemClick(item)"
            >
              {{ item }}
            </van-tag>
          </div>
        </div>
        <van-empty image="search" description="抱歉，未找到相关数据！" />
      </template>
    </div>
    <van-dialog
      v-if="isShowExport"
      v-model="isShowExport"
      class="export-dialog"
      show-cancel-button
      confirm-button-text="导出"
      @confirm="tryRunExportSure"
    >
      <p>
        您已经选择<span class="blue">{{ allTotal }}</span>条数据
      </p>
      <p>
        提示:请在三足金乌web端
        <a
          :href="passURL"
          target="_blank"
          class="blue"
        >szjw-bss-web.yunniao.cn</a>
        右上角下载工具中下载！
      </p>
    </van-dialog>
  </div>
</template>

<script>
import ListItem from './components/ListItem';
// import { GetRunTestInfoList } from '@/api/tryrun';
import { GetRunTestInfoList, tryRunExport } from '@/api/tryrun';

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
      options: [], // 关键字查出来的关键字
      isShowExport: false,
      allTotal: 0
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    passURL() {
      if (process.env.NODE_ENV === 'development') {
        return 'https://szjw-bss-web.m1.yunniao.cn/'
      }
      return window.location.origin.replace('h5', 'web')
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
        }).catch(() => { });
    },
    // 搜索
    onSearch() {
      if (!this.keyWord) {
        return false;
      }
      this.handleSearch(this.keyWord);
    },
    // 取消
    onCancel() {
      this.keyWord = '';
      this.lists = [];
    },
    // onInput
    onInput() {
      if (!this.keyWord) {
        this.lists = []
      }
    },
    handleItemClick(value) {
      this.keyWord = value;
      this.onSearch();
    },
    // 搜索
    async handleSearch(keyword = '') {
      try {
        this.$loading(true);
        let params = {};
        keyword && (params.key = keyword);
        let { data: res } = await GetRunTestInfoList(params);
        if (res.success) {
          if (this.keyWord) {
            this.setHistory(this.keyWord);
          }

          this.lists = res.data;
          this.allTotal = res.page.total
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`get search data fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    // 存localStorage
    setHistory(keyword) {
      let index = this.historyItems.findIndex((item) => item === keyword);
      if (index > -1) {
        this.historyItems.splice(index, 1);
      }

      if (this.historyItems.length >= 10) {
        this.historyItems.pop();
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
    // 点击导出
    onTryRunExport() {
      if (this.allTotal === 0) {
        this.$toast({
          message: '没有可以导出的数据',
          position: 'bottom'
        })
        return
      }
      this.isShowExport = !this.isShowExport
    },
    // 试跑导出
    async tryRunExportSure() {
      try {
        this.$loading(true)
        const { data } = await tryRunExport({ key: this.keyWord })
        if (data.success) {
          this.$toast.success('导出成功')
        } else {
          this.$toast.fail('导出失败')
        }
      } catch (error) {
        return error
      } finally {
        this.$loading(false)
      }
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
    // background-color: @body-bg;
  }
  .history-item {
    min-width: 60px;
    height: 28px;
    line-height: normal;
    padding: 0 14px;
    font-size: @font-size-sm-1;
    color: @text-color-sm;
    background: @gray-11;
    text-align: center;
    box-sizing: border-box;
    margin-bottom: 8px;
    margin-right: 5px;
  }
  .list-bg {
    background-color: @body-bg;
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
.blue {
  color: #6e9ee8;
}
.export-dialog {
    font-size: 16px;
    padding: 25px 30px 0 30px;
    width: 70%;
  }
</style>
<style lang="less" scoped>
/deep/.van-dialog__footer {
  padding-left: 20px !important;
  padding-right: 20px !important;
}

// /deep/ .van-nav-bar__right:active {
//   opacity: 1;
// }
</style>
