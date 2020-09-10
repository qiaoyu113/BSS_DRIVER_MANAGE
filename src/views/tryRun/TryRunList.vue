<template>
  <div class="TryRunList">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-search
        v-model="value"
        readonly
        show-action
        placeholder="请输入线路名称/编号"
        @click="onSearch"
      >
        <template #action>
          <div @click="onSearch">
            搜索
          </div>
        </template>
      </van-search>
    </div>
    <div class="list">
      <ListItem
        v-for="(item, index) in lists"
        :key="index"
        :item="item"
      />
      <van-empty
        v-if="lists.length === 0"
        image="search"
        description="抱歉，未找到相关数据！"
      />
    </div>
  </div>
</template>

<script>
import ListItem from './components/ListItem';
import { GetRunTestInfoList } from '@/api/tryrun';
export default {
  name: 'TryRunList',
  components: {
    ListItem
  },
  data() {
    return {
      value: '',
      lists: []
    }
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    this.value = this.$route.query.q;
    this.handleSearch(this.value);
  },
  methods: {
    /**
     * 返回按钮
     */
    onClickLeft() {
      this.$router.go(-1);
    },
    /**
     * 跳转查询页面
     */
    onSearch() {
      this.$router.replace({
        path: '/try-search',
        query: {
          q: this.value
        }
      })
    },
    // 搜索
    async handleSearch(keyword = '') {
      try {
        let params = {};
        keyword && (params.key = keyword);
        let { data: res } = await GetRunTestInfoList(params);
        if (res.success) {
          this.lists = res.data;
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`get search data fail:${err}`);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.TryRunList {
  display: flex;
  flex-direction: column;
  background: @body-bg;
  .top{
    margin-bottom: 5px;
    background-color: @body-bg;
  }
  .list{
    flex: 1;
    overflow: auto;
  }
}
</style>
