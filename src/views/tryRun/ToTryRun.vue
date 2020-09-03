<template>
  <div clsss="ToTryRun">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="bottom">
      <StepTwo />
    </div>
  </div>
</template>

<script>
import StepTwo from './components/StepTwo';
export default {
  name: 'ToTryRun',
  components: {
    StepTwo
  },
  data() {
    return {}
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  methods: {
    /**
     * 返回按钮
     */
    onClickLeft() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="less" scoped>
.ToTryRun {
  display: flex;
  flex-direction: column;
  background: @body-bg;
  .top{
    margin-bottom: 5px;
    background-color: @body-bg;
  }
  .bottom{
    flex: 1;
    overflow: auto;
  }
}
</style>
