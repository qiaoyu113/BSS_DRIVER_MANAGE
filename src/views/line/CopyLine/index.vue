<template>
  <div class="CopyLineContainer">
    <StepOne v-show="step === 1" :form="stepOneForm" />
    <StepTwo v-show="step === 2" :form="stepTwoForm"/>
    <StepThree v-show="step === 3" :form="stepThreeForm"/>
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
      step: 3,
      isStable: true,
      stepOneForm: {
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
    if (this.isStable) {
      document.title = '激活稳定线路'
    } else {
      document.title = '激活临时线路'
    }
  }
}

</script>

<style lang='scss' scoped>
.CopyLineContainer {

}

</style>
