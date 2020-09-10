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
          :rules="[{ required: true, message: '请选择项目' }]"
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
import { getProjectSearch, getProjectDetail } from '@/api/project'
import { Dialog } from 'vant';
import { delay } from '@/utils'
export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
    Suggest,
    [Dialog.Component.name]: Dialog.Component
  },

  data() {
    return {
      projectId: '',
      projectName: '',
      title: '',
      step: 0,
      isStable: true,
      stepOneForm: {
        lineName: '', // 线路名称
        lineNum: '', // 线路数量
        lineBalance: '', // 是否有线路余额
        waitDirveValidity: '', // 上架截止日期
        stabilityRate: '', // 线路稳定性
        runSpeed: '', // 是否走高速
        returnBill: '', // 是否需要回单
        carType: '', // 配送车型
        deliveryNum: '', // 配送点数量
        distance: '', // 配送总里程数
        limitRemark: '', // 限行区域说明
        area: [], // 主要配送区域
        districtArea: ''
      },
      stepTwoForm: {
        driverWorkTime: '', // 司机上岗时间
        deliveryWeekCycle: [], // 配送时间
        workingTime: [], // 预计工作时间
        monthNum: '', // 预计月出车天数
        dayNum: '', // 每日配送趟数
        incomeSettlementMethod: '', // 结算方式
        settlementCycle: '', // 结算周期
        settlementDays: '', // 结算天数
        shipperOffer: '', // 预计月报价
        everyTripGuaranteed: '', // 单趟报价/每趟保底
        everyUnitPrice: ''// 每趟提成单价
      },
      stepThreeForm: {
        cargoType: '', // 货物类型
        cargoNum: '', // 货物件数
        volume: '', // 货物体积
        goodsWeight: '', // 货物重量
        carry: '', // 是否需要搬运
        dutyRemark: '' // 其他上岗要求
      },
      showModal: false,
      isProject: false, // 是否从项目过来的
      projectOptions: [], // 项目列表
      warehouseCity: '',
      city: '',
      lineSaleId: '',
      dutyManagerId: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let title = ''
      this.isStable = +this.$route.query.isStable === 1
      this.isProject = +this.$route.query.isProject === 1
      if (this.isStable) {
        title = '创建稳定线路'
      } else {
        title = '创建临时线路'
      }
      if (this.isProject) {
        this.projectId = this.$route.query.projectId
        this.step = 1
        this.getProjectDetail()
      }
      this.title = title
      document.title = title
      this.handleSearch()
    },
    onClickLeft() {
      if (this.isProject) {
        Dialog.confirm({
          title: '提示',
          message: '确定要返回上一页面吗？'
        })
          .then(() => {
            this.$router.go(-1)
          })
      } else {
        this.$router.go(-1)
      }
    },
    // 选择完项目
    onSubmit(value) {
      this.step = 1
    },
    // 搜索项目
    handleSearchChange(val) {
      this.handleSearch(val)
    },
    /**
     *选择过项目
     */
    handlepProjectClick(obj) {
      this.projectId = obj.value
      this.projectName = obj.label
      this.warehouseCity = obj.warehouseCity
      this.city = obj.city
      this.lineSaleId = obj.lineSaleId
      this.dutyManagerId = obj.dutyManagerId
      this.stepOneForm.runSpeed = obj.runSpeed
      this.stepOneForm.returnBill = obj.returnBill
      this.stepOneForm.carType = obj.carType
      this.stepOneForm.deliveryNum = obj.deliveryNum
      this.stepOneForm.distance = obj.distance
      this.stepOneForm.limitRemark = obj.limitRemark
      this.stepThreeForm.cargoType = obj.cargoType
      this.stepThreeForm.cargoNum = obj.cargoNum
      this.stepThreeForm.carry = obj.carry
      this.stepThreeForm.dutyRemark = obj.dutyRemark
    },
    // 发布线路
    handleSubmit() {
      let params = {
        projectId: this.projectId,
        ...this.stepOneForm,
        ...this.stepTwoForm,
        ...this.stepThreeForm,
        lineDeliveryInfoFORMS: []
      }
      params.provinceArea = this.stepOneForm.area[0]
      params.cityArea = this.stepOneForm.area[1]
      params.countyArea = this.stepOneForm.area[2]
      if (this.isStable) {
        params.deliveryWeekCycle = this.stepTwoForm.deliveryWeekCycle.join(',')
      } else {
        params.deliveryStartDate = this.stepTwoForm.deliveryWeekCycle[0]
        params.deliveryEndDate = this.stepTwoForm.deliveryWeekCycle[1]
        delete params.deliveryWeekCycle
      }
      // 预计工作时间
      this.stepTwoForm.workingTime.forEach(item => {
        let times = item.split('-')
        params.lineDeliveryInfoFORMS.push(
          {
            workingTimeStart: times[0],
            workingTimeEnd: times[1]
          }
        )
      })
      params.lineLogo = params.lineName
      params.warehouseCity = this.warehouseCity
      params.city = this.city
      params.lineSaleId = this.lineSaleId
      params.dutyManagerId = this.dutyManagerId
      delete params.area
      delete params.workingTime
      delete params.lineName
      if (this.isStable) {
        this.createStableLine(params)
      } else {
        this.createTemporaryLine(params)
      }
    },
    // 发布稳定线路
    async createStableLine(params) {
      try {
        this.$loading(true)
        params.lineCategory = 1
        let { data: res } = await createStableLine(params)
        if (res.success) {
          this.createSuc()
        } else {
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`create stable line fail:${err}`)
      } finally {
        this.$loading(false)
      }
    },
    // 发布临时线路
    async createTemporaryLine(params) {
      try {
        this.$loading(true)
        params.lineCategory = 2
        let { data: res } = await createTemporaryLine(params)
        if (res.success) {
          this.createSuc()
        } else {
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`create stable line fail:${err}`)
      } finally {
        this.$loading(false)
      }
    },
    // 发布成功
    createSuc() {
      this.$toast.success('操作成功')
      setTimeout(() => {
        this.$router.push({
          path: '/line'
        })
      }, delay)
    },
    // 项目搜索
    async handleSearch(keyword = '') {
      try {
        let params = {
          select: true
        }
        keyword && (params.key = keyword)
        let { data: res } = await getProjectSearch(params)
        if (res.success) {
          this.projectOptions = res.data.map(item => ({
            label: item.projectName,
            value: item.projectId,
            warehouseCity: item.warehouseCity,
            city: item.city,
            lineSaleId: item.lineSaleId,
            dutyManagerId: item.dutyManagerId,
            runSpeed: item.runSpeed,
            returnBill: item.returnBill,
            carType: item.carType,
            deliveryNum: item.deliveryNum,
            distance: item.distance,
            limitRemark: item.limitRemark,
            cargoType: item.cargoType,
            cargoNum: item.cargoNum,
            carry: item.carry,
            dutyRemark: item.dutyRemark
          }))
        } else {
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get search data fail:${err}`)
      }
    },
    // 获取项目详情
    async getProjectDetail() {
      try {
        this.$loading(true)
        let params = {
          projectId: this.projectId
        }
        let { data: res } = await getProjectDetail(params)
        if (res.success) {
          let obj = res.data
          this.projectId = obj.value
          this.projectName = obj.label
          this.warehouseCity = obj.warehouseCity
          this.city = obj.city
          this.lineSaleId = obj.lineSaleId
          this.dutyManagerId = obj.dutyManagerId
          this.stepOneForm.runSpeed = obj.runSpeed
          this.stepOneForm.returnBill = obj.returnBill
          this.stepOneForm.carType = obj.carType
          this.stepOneForm.deliveryNum = obj.deliveryNum
          this.stepOneForm.distance = obj.distance
          this.stepOneForm.limitRemark = obj.limitRemark
          this.stepThreeForm.cargoType = obj.cargoType
          this.stepThreeForm.cargoNum = obj.cargoNum
          this.stepThreeForm.carry = obj.carry
          this.stepThreeForm.dutyRemark = obj.dutyRemark
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get client detail fail:${err}`)
      } finally {
        this.$loading(false)
      }
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
