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

    <StepOne v-show="step === 1" :is-stable="isStable" type="create" :form="stepOneForm" @stepTwo="step =2" />
    <StepTwo v-show="step === 2" :is-stable="isStable" type="create" :form="stepTwoForm" @stepThree="step=3" @step-one="step=1" />
    <StepThree v-show="step === 3" :is-stable="isStable" type="create" :form="stepThreeForm" @step-two="step=2" @submit="handleSubmit" />
  </div>
</template>

<script>
import StepOne from '../components/StepOne'
import StepTwo from '../components/StepTwo'
import StepThree from '../components/StepThree'
import Suggest from '@/components/SuggestSearch'
import { createStableLine, createTemporaryLine } from '@/api/line'
import { Notify } from 'vant';
import { delay } from '@/utils'
export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
    Suggest,
    [Notify.Component.name]: Notify.Component
  },

  data() {
    return {
      projectId: '',
      projectName: '',
      title: '',
      step: 1,
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
    },
    // 发布线路
    handleSubmit() {
      if (this.isStable) {
        this.createStableLine()
      } else {
        this.createTemporaryLine()
      }
    },
    // 发布稳定线路
    async createStableLine() {
      try {
        let params = {
          ...this.stepOneForm,
          ...this.stepTwoForm,
          ...this.stepThreeForm
        }
        let { data: res } = await createStableLine(params)
        if (res.success) {
          this.createSuc()
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`create stable line fail:${err}`)
      }
    },
    // 发布临时线路
    async createTemporaryLine() {
      try {
        let params = {
          ...this.stepOneForm,
          ...this.stepTwoForm,
          ...this.stepThreeForm
        }
        let { data: res } = await createTemporaryLine(params)
        if (res.success) {
          this.createSuc()
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`create stable line fail:${err}`)
      }
    },

    // 发布成功
    createSuc() {
      Notify({
        type: 'success', message: '发布成功'
      })
      setTimeout(() => {
        this.$router.push({
          path: '/line'
        })
      }, delay)
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
