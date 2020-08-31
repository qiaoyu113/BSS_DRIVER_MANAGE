<template>
  <div class="EditLineContainer">
    <van-sticky :offset-top="0">
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <StepOne v-show="step === 1" :form="stepOneForm" @stepTwo="step =2" />
    <StepTwo v-show="step === 2" :form="stepTwoForm" @stepThree="step=3" @step-one="step=1" />
    <StepThree v-show="step === 3" :form="stepThreeForm" @step-two="step=2" />
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
      title: '',
      step: 1,
      isStable: true,
      stepOneForm: {
        c: 2,
        i: [
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
      title = '编辑稳定线路'
    } else {
      title = '编辑临时线路'
    }
    this.title = title
    document.title = title
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}

</script>

<style lang='scss' module>
.EditLineContainer {

}

</style>
