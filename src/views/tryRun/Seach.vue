<template>
  <div class="Seach">
    搜索页面
  </div>
</template>

<script>
export default {
  name: 'Seach',
  computed: {
    title() {
      return this.$route.meta.title;
    }
  }
}
</script>

<style lang="less" scoped>
.Seach{

}
</style>
