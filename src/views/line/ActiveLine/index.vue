<template>
  <div class="ActiveLineContainer">
    <van-sticky :offset-top="0">
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <StepOne v-show="step === 1" type="active" :form="stepOneForm" @stepTwo="step =2" />
    <StepTwo v-show="step === 2" :form="stepTwoForm" @stepThree="step=3" @step-one="step=1" />
    <StepThree v-show="step === 3" :form="stepThreeForm" @step-two="step=2" @submit="handleSubmit" />
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
      isStable: true,
      title: '',
      step: 1,
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
    this.isStable = +this.$route.query.isStable === 1
    let title = ''
    if (this.isStable) {
      title = '激活稳定线路'
    } else {
      title = '激活临时线路'
    }
    this.title = title
    document.title = title
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 激活线路
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
.ActiveLineContainer {

}

</style>
