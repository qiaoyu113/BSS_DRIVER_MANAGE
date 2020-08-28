<template>
  <div class="CreateRun">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="bottom">
      <div class="step">
        <van-steps :active="step">
          <van-step>创建试跑意向</van-step>
          <van-step>创建试跑</van-step>
        </van-steps>
      </div>
      <StepOne
        v-show="step === 0"
      />
      <StepTwo
        v-show="step === 1"
      />
    </div>
  </div>
</template>

<script>
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
export default {
  name: 'CreateRun',
  components: {
    StepOne,
    StepTwo
  },
  data() {
    return {
      step: 0
    }
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    this.step = this.$route.query.step || 1;
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
.CreateRun{

}
</style>
