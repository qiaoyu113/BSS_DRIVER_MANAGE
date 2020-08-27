<template>
  <div class="Search">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-search v-model="value" show-action placeholder="请输入搜索关键词">
        <template #action>
          <div>
            搜索
          </div>
        </template>
      </van-search>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  methods: {
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.Search{

}
</style>
