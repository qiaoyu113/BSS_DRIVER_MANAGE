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
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import ListItem from './components/ListItem';
export default {
  name: 'TryRunList',
  components: {
    ListItem
  },
  data() {
    return {
      value: '',
      list: [{ 1: 1 }, { 1: 1 }, { 1: 1 }, { 1: 1 }, { 1: 1 }, { 1: 1 }, { 1: 1 }, { 1: 1 }, { 1: 1 }]
    }
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
        path: '/try-run/search',
        query: {
          q: this.value
        }
      })
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
