<template>
  <div class="Search">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        autofocus
      >
        <template #action>
          <div @click="onSearch">
            搜索
          </div>
        </template>
      </van-search>
    </div>
    <div class="history">
      <div class="history-top flex align-center justify-between">
        <div>历史搜索记录</div>
        <van-icon
          name="delete"
          @click="onDelete"
        />
      </div>
      <div class="flex flex-wrap">
        <van-tag
          v-for="(item, index) in historyLists"
          :key="index"
          type="primary"
          class="history-item"
          @click="onSearch(item)"
        >
          {{ item }}
        </van-tag>
      </div>
    </div>
    <div class="noData">
      <img src="@/assets/search.png">
      <div class="text">
        抱歉,未找到相关数据!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      value: '',
      historyLists: [
        '京东',
        '顺丰',
        '中国邮政配送中心',
        '启恒配送',
        '京东',
        '顺丰',
        '中国邮政配送中心',
        '启恒配送',
        '菜鸟驿站'
      ]
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    this.value = this.$route.query.q;
  },
  methods: {
    /**
     * 搜索
     */
    onSearch(val) {
      if (typeof val === 'string') {
        this.value = val;
      }
      if (!this.value) {
        this.$toast('请输入搜索内容');
        return
      }
      this.$router.replace({
        path: '/try-list',
        query: {
          q: this.value
        }
      })
    },
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
      this.$dialog.alert({
        title: '提示',
        message: '确定删除全部历史记录？',
        showCancelButton: true
      }).then(() => {
        // on close
      });
    }
  }
};
</script>

<style lang="less" scoped>
.Search {
  background-color: @white;
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
    margin-top:41.5px;
    text-align: center;
    .text {
      margin-top: 15px;
      font-size: 15px;
      color: #656565;
      text-align: center;
    }
    img {
      width: 83px;
      height:74px;
    }
  }
}
</style>
