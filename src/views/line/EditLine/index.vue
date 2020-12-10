<template>
  <div class="EditLineContainer">
    <van-sticky :offset-top="0">
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <StepOne v-show="step === 1" type="edit" :form="stepOneForm" @stepTwo="step =2" />
    <StepTwo v-show="step === 2" type="edit" :form="stepTwoForm" :max-date="stepOneForm.waitDirveValidity ? new Date(stepOneForm.waitDirveValidity) : new Date(2125, 12, 31)" @stepThree="step=3" @step-one="step=1" />
    <StepThree v-show="step === 3" type="edit" :form="stepThreeForm" @step-two="step=2" @submit="handleSubmit" />
  </div>
</template>

<script>
import StepOne from '../components/StepOne'
import StepTwo from '../components/StepTwo'
import StepThree from '../components/StepThree'
import { editTemporaryLine, editStableLine, getLineDetail } from '@/api/line'
import { delay } from '@/utils'
import dayjs from 'dayjs'
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
        districtArea: '',
        lineId: '',
        carTypeName: ''
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
        everyUnitPrice: '', // 每趟提成单价
        provinceAreaName: '',
        cityAreaName: '',
        countyAreaName: '',
        lineId: ''
      },
      stepThreeForm: {
        cargoType: '', // 货物类型
        cargoNum: '', // 货物件数
        volume: '', // 货物体积
        goodsWeight: '', // 货物重量
        carry: '', // 是否需要搬运
        dutyRemark: '', // 其他上岗要求
        lineId: '',
        labelType: '', // 线路肥瘦标签
        sellPoint: '' // 亮点
      },
      lineInfo: {
        warehouseCity: '',
        city: '',
        lineSaleId: '',
        dutyManagerId: '',
        lineLogo: '',
        createId: '',
        createDate: '',
        projectId: ''
      }
    }
  },
  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.lineId = this.$route.query.lineId
      this.getTitle()
      this.getLineDetail()
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    // 获取title
    getTitle() {
      let title = ''
      if (this.isStable) {
        title = '编辑稳定线路'
      } else {
        title = '编辑临时线路'
      }
      this.title = title
      document.title = title
    },
    // 编辑线路
    handleSubmit() {
      let params = {
        ...this.lineInfo,
        ...this.stepOneForm,
        ...this.stepTwoForm,
        ...this.stepThreeForm,
        lineDeliveryInfoFORMS: []
      }
      params.provinceArea = this.stepOneForm.area[0]
      params.cityArea = this.stepOneForm.area[1]
      params.countyArea = this.stepOneForm.area[2]
      params.waitDirveValidity = new Date(params.waitDirveValidity).getTime()
      params.driverWorkTime = new Date(params.driverWorkTime).getTime()
      if (this.isStable) {
        params.deliveryWeekCycle = this.stepTwoForm.deliveryWeekCycle.join(',')
      } else {
        params.deliveryStartDate = new Date(this.stepTwoForm.deliveryWeekCycle[0]).getTime()
        params.deliveryEndDate = new Date(this.stepTwoForm.deliveryWeekCycle[1]).getTime()
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

      delete params.area
      delete params.workingTime
      params.shipperOffer = +params.shipperOffer
      if (this.isStable) {
        this.editStableLine(params)
      } else {
        this.editTemporaryLine(params)
      }
    },
    // 编辑稳定线路
    async editStableLine(params) {
      try {
        this.$loading(true)
        params.lineCategory = 1
        let { data: res } = await editStableLine(params)
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
    // 编辑临时线路
    async editTemporaryLine(params) {
      try {
        this.$loading(true)
        params.lineCategory = 2
        let { data: res } = await editTemporaryLine(params)
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
    // 获取线路详情
    async getLineDetail() {
      try {
        this.$loading(true)
        let params = {
          lineId: this.lineId
        }
        let { data: res } = await getLineDetail(params)
        if (res.success) {
          let result = res.data
          this.isStable = +res.data.lineCategory === 1
          this.getTitle()
          this.lineInfo = {
            ...this.lineInfo,
            ...{
              warehouseCity: result.warehouseCity,
              lineLogo: result.lineLogo,
              city: result.city,
              lineSaleId: result.lineSaleId,
              dutyManagerId: result.dutyManagerId,
              createId: result.createId,
              createDate: result.createDate,
              projectId: result.projectId
            }
          }
          this.stepOneForm = {
            ...this.stepOneForm,
            ...{
              lineName: result.lineName,
              lineNum: result.lineNum,
              lineBalance: result.lineBalance,
              waitDirveValidity: dayjs(result.waitDirveValidity).format('YYYY/MM/DD'),
              stabilityRate: result.stabilityRate,
              runSpeed: result.runSpeed,
              returnBill: result.returnBill,
              carType: result.carType,
              deliveryNum: result.deliveryNum,
              distance: result.distance,
              limitRemark: result.limitRemark,
              area: [
                result.provinceArea,
                result.cityArea,
                result.countyArea
              ],
              districtArea: result.districtArea,
              provinceAreaName: result.provinceAreaName,
              cityAreaName: result.cityAreaName,
              countyAreaName: result.countyAreaName,
              lineId: result.lineId,
              carTypeName: result.carTypeName
            }
          }
          this.stepTwoForm = {
            ...this.stepTwoForm,
            ... {
              driverWorkTime: dayjs(result.driverWorkTime).format('YYYY/MM/DD'),
              monthNum: result.monthNum,
              dayNum: result.dayNum,
              incomeSettlementMethod: result.incomeSettlementMethod,
              settlementCycle: result.settlementCycle,
              settlementDays: result.settlementDays,
              shipperOffer: result.shipperOffer,
              everyTripGuaranteed: result.everyTripGuaranteed,
              everyUnitPrice: result.everyUnitPrice,
              lineId: result.lineId,
              deliveryWeekCycle: result.deliveryWeekCycle
            }
          }
          if (this.isStable) {
            this.stepTwoForm.deliveryWeekCycle = this.stepTwoForm.deliveryWeekCycle.split(',').map(item => +item)
          } else {
            this.stepTwoForm.deliveryWeekCycle = []
            let startDate = dayjs(result.deliveryStartDate).format('YYYY/MM/DD')
            let endDate = dayjs(result.deliveryEndDate).format('YYYY/MM/DD')
            this.stepTwoForm.deliveryWeekCycle.push(
              new Date(startDate),
              new Date(endDate)
            )
          }

          this.stepThreeForm = {
            ...this.step.stepThreeForm,
            ...{
              cargoType: result.cargoType,
              cargoNum: result.cargoNum,
              volume: result.volume,
              goodsWeight: result.goodsWeight,
              carry: result.carry,
              dutyRemark: result.dutyRemark,
              lineId: result.lineId,
              labelType: result.labelType,
              sellPoint: result.sellPoint
            }
          }

          result.lineDeliveryInfoFORMS.forEach(item => {
            let time = `${item.workingTimeStart}-${item.workingTimeEnd}`
            this.stepTwoForm.workingTime.push(time)
          })
        } else {
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get client detail fail:${err}`)
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
    }
  }
}

</script>

