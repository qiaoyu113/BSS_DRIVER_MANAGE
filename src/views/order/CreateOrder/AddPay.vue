<template>
  <div class="AddPay">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </van-sticky>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="less" scoped></style>
