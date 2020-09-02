<template>
  <div class="CopyLineContainer">
    <van-sticky :offset-top="0">
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <StepOne v-show="step === 1" :is-stable="isStable" type="copy" :form="stepOneForm" @stepTwo="step =2" />
    <StepTwo v-show="step === 2" :is-stable="isStable" type="copy" :form="stepTwoForm" @stepThree="step=3" @step-one="step=1" />
    <StepThree v-show="step === 3" :is-stable="isStable" type="copy" :form="stepThreeForm" @step-two="step=2" @submit="handleSubmit" />
  </div>
</template>

<script>
import StepOne from '../components/StepOne'
import StepTwo from '../components/StepTwo'
import StepThree from '../components/StepThree'
export default {
  components: {
    StepOne,
    StepTwo,
    StepThree
  },
  data() {
    return {
      step: 1,
      title: '',
      isStable: true,
      stepOneForm: {
        h: [
          '110000',
          '110100',
          '110101'
        ]
      },
      stepTwoForm: {
        e: [],
        d: ''
      },
      stepThreeForm: {

      }
    }
  },
  mounted() {
    let title = ''
    if (this.isStable) {
      title = '复制稳定线路'
    } else {
      title = '复制临时线路'
    }
    this.title = title
    document.title = title
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 复制线路
    handleSubmit() {
      if (this.isStable) {
        // this.createStableLine()
      } else {
        // this.createTemporaryLine()
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.CopyLineContainer {

}

</style>
