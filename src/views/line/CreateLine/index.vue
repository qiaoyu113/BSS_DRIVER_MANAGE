<template>
  <div class="CreateLineContainer">
    <van-sticky :offset-top="0">
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>

    <template v-if="step === 0">
      <van-form @submit="onSubmit">
        <van-field
          :value="projectName"
          label="选择项目"
          required
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showModal=true"
        />
        <van-button type="primary" block class="btn">
          下一步
        </van-button>
      </van-form>
      <Suggest
        v-model="showModal"
        :options="projectOptions"
        @keyWordValue="handleSearchChange"
        @finish="handlepProjectClick"
        @closed="showModal=false"
      />
    </template>

    <StepOne v-show="step === 1" :form="stepOneForm" @stepTwo="step =2" />
    <StepTwo v-show="step === 2" :form="stepTwoForm" @stepThree="step=3" @step-one="step=1" />
    <StepThree v-show="step === 3" :form="stepThreeForm" @step-two="step=2" />
  </div>
</template>

<script>
import StepOne from '../components/StepOne'
import StepTwo from '../components/StepTwo'
import StepThree from '../components/StepThree'
import Suggest from '@/components/SuggestSearch.vue'
export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
    Suggest
  },
  data() {
    return {
      projectId: '',
      projectName: '',
      title: '',
      step: 0,
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

      },
      showModal: false,
      projectOptions: [
        {
          label: '京东',
          value: 'jingdong'
        },
        {
          label: '苏宁',
          value: 'suning'
        }
      ]
    }
  },
  mounted() {
    let title = ''
    this.isStable = this.$route.query.isStable === 1
    if (this.isStable) {
      title = '发布稳定线路'
    } else {
      title = '发布临时线路'
    }
    this.title = title
    document.title = title
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 选择完项目
    onSubmit(value) {
      this.step = 1
    },
    // 搜索项目
    handleSearchChange(val) {
      console.log(val)
    },
    /**
     *选择过项目
     */
    handlepProjectClick(obj) {
      this.projectId = obj.value
      this.projectName = obj.label
    }

  }
}

</script>

<style lang='scss' scoped>
.CreateLineContainer {
  .btn {
    margin:100px 15px 0px;
    width: 345px;
  }
}

</style>
