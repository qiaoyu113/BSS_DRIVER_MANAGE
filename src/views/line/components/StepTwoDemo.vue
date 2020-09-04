<template>
  <div class="StepTwoContainer">
    <van-form ref="stepTwo" :show-error="false" @submit="onSubmit">
      <h4 class="title van-hairline--bottom">
        配送时间信息
      </h4>
      <selftPicker
        picker-key="incomeSettlementMethod"
        :form="form"
        :columns="incomeSettlementMethodArr"
        value="label"
        :is-computed="form['incomeSettlementMethod']!==''"
        required
        label-width="100"
        label="结算方式"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
      />
      <selftPicker
        picker-key="settlementCycle"
        :form="form"
        :columns="settlementCycleArr"
        value="label"
        :is-computed="form['settlementCycle']!==''"
        required
        label-width="100"
        label="结算周期"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
      />
    </van-form>
    <!-- 底部弹出框 -->
    <van-popup v-model="showPicker" position="bottom">
    </van-popup>
  </div>
</template>

<script>

import { parseTime } from '@/utils/index'
import SelftPicker from '@/components/SelfPicker'
export default {
  components: {
    SelftPicker
  },
  props: {
    form: {
      type: Object,
      default: () => {},
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {

      // 结算方式
      incomeSettlementMethodArr: [
        {
          label: '整车',
          value: 1
        },
        {
          label: '多点配',
          value: 2
        }
      ],
      // 结算周期
      settlementCycleArr: [
        {
          label: '现结',
          value: 1
        },
        {
          label: '周结',
          value: 2
        },
        {
          label: '半月结',
          value: 3
        },
        {
          label: '月结',
          value: 4
        },
        {
          label: '季度结',
          value: 5
        }
      ],
      pickerNames: { // picker选中显示的名字
        deliveryWeekCycle: '',
        incomeSettlementMethod: '',
        settlementCycle: '',
        settlementDays: '',
        driverWorkTime: ''
      },
      pickerKey: '', // 显示picker的key
      columns: [], // picker的列表
      showPicker: false, // 是否打开picker
      dateLists: ['deliveryWeekCycle'], // 显示日历控件的字段集合
      timeLists: ['driverWorkTime'],
      minTime: new Date(),
      maxTime: new Date(2125, 12, 31),
      isStable: false,
      timeBucket: [] // 时间段
    }
  },
  computed: {
    isDateRange() {
      return this.dateLists.includes(this.pickerKey)
    },
    isDate() {
      return this.timeLists.includes(this.pickerKey)
    },
    isAll: {
      get() {
        return this.deliveryWeekCycleArr.length === this.form['deliveryWeekCycle'].length
      },
      set(newVal) {
        if (newVal) {
          let arrs = this.deliveryWeekCycleArr.map(item => item.value)
          this.form['deliveryWeekCycle'].push(...arrs)
        } else {
          this.form['deliveryWeekCycle'] = []
        }
        return newVal
      }
    }
  },
  watch: {
    'form.lineId'(val) {
      // if (this.type === 'edit' && val !== '') {
      //   this.showPickerLable()
      //   this.pickerNames.driverWorkTime = this.form.driverWorkTime
      // }
    }
  },
  mounted() {
    this.init()
    this.generaTimelist()
  },
  methods: {
    init() {
      this.isStable = +this.$route.query.isStable === 1
      if (this.isStable) {
      // 配送时间-稳定线路
        this.deliveryWeekCycleArr = [
          {
            label: '周一',
            value: 1
          },
          {
            label: '周二',
            value: 2
          },
          {
            label: '周三',
            value: 3
          },
          {
            label: '周四',
            value: 4
          },
          {
            label: '周五',
            value: 5
          },
          {
            label: '周六',
            value: 6
          },
          {
            label: '周日',
            value: 7
          }
        ]
      }
    },
    // 生成时间段
    generaTimelist() {
      let arrs = []
      for (let i = 0; i < 23; i++) {
        let hour = ''
        let hourNext = ''
        if (i < 10) {
          hour = `0${i}`
        } else {
          hour = i
        }
        if (i + 1 < 10) {
          hourNext = `0${i + 1}`
        } else {
          hourNext = i + 1
        }
        let brr = [
          `${hour}:00:00-${hour}:15:00`,
          `${hour}:15:00-${hour}:30:00`,
          `${hour}:30:00-${hour}:45:00`,
          `${hour}:45:00-${hourNext}:00:00`
        ]
        arrs.push(...brr)
      }
      arrs.forEach(item => {
        this.timeBucket.push({
          label: item,
          value: item
        })
      })
    },
    // 编辑生成label
    showPickerLable() {
      for (let key in this.pickerNames) {
        let listKey = `${key}Arr`
        if (![...this.dateLists, ...this.timeLists].includes(key)) {
          console.log('xxx:', this.form[key], key);
          let index = this[listKey].findIndex(item => item.value === this.form[key])
          if (index > -1) {
            this.pickerNames[key] = this[`${key}Arr`][index].label
          }
        } else if ([...this.dateLists].includes(key)) {
          this.pickerNames[key] = `${parseTime(this.form[key][0], '{m}-{d}')}/${parseTime(this.form[key][1], '{m}-{d}')}`
        } else {
          this.pickerNames[key] = this.form[key]
        }
      }
    },
    // 校验配送时间
    deliveryWeekCycleValidator() {
      if (this.form.deliveryWeekCycle.length > 0) {
        return true
      }
      return false
    },
    // 提交
    onSubmit(values) {
      this.$emit('stepThree')
    },
    // 预计月出车天数
    daysUseCarValidator(val) {
      if (val >= 1 && val <= 31) {
        return true
      }
      return false
    },
    // 每日配送趟数
    countByDayValidator(val) {
      if (val >= 1 && val <= 9) {
        return true
      }
      return false
    },
    // 重置表单
    reset() {
      this.$refs.stepTwo.resetValidation()
    },
    // 预计工作时间
    handleDateChange(date, index) {
      if (this.form.workingTime[index]) {
        this.form.workingTime.splice(index, 1, date)
      } else {
        this.form.workingTime.splice(index, 0, date)
      }
    },
    // 显示picker
    showPickerFn(key) {
      this.columns = []
      this.pickerKey = key;
      if (key === 'incomeSettlementMethod') {
        this.columns.push(...this.incomeSettlementMethodArr);
      } else if (key === 'settlementCycle') {
        this.columns.push(...this.settlementCycleArr);
      } else if (key === 'settlementDays') {
        this.columns.push(...this.settsettlementDaysArr);
      }

      this.showPicker = true;
      if (['edit'].includes(this.type) && ![...this.dateLists, ...this.timeLists].includes(key)) {
        let index = this.columns.findIndex(item => item.value === this.form[this.pickerKey])
        if (index === -1) {
          index = 0
        }
        setTimeout(() => {
          this.$refs.fromTwoPicker.setIndexes([index])
        }, 20)
      }
    },
    // picker选择器
    onConfirm(obj) {
      if (this.isDate) {
        this.pickerNames[this.pickerKey] = `${obj.getMonth() + 1}/${obj.getDate()}`;
        this.form[this.pickerKey] = obj
      } else if (this.isDateRange) {
        if (obj.length === 2) {
          let startName = `${obj[0].getMonth() + 1}/${obj[0].getDate()}`;
          let endName = `${obj[1].getMonth() + 1}/${obj[1].getDate()}`;
          this.pickerNames[this.pickerKey] = `${startName}-${endName}`
          this.form[this.pickerKey] = obj
        }
      } else {
        this.pickerNames[this.pickerKey] = obj.label
        this.form[this.pickerKey] = obj.value
      }
      this.showPicker = false;
    },
    handleInput(val) {
      if (val < 0 || val > 9) {
        this.form.dayNum = 1
        this.form.workingTime = []
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.StepTwoContainer {
  font-family: PingFangSC-Medium;
  .title {
    margin: 0px;
    padding: 10px 0px 12.5px 15px;
    font-size: 15px;
    color: #3C4353;
  }
  .btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin:100px 15px 0px;
    width: 345px;
    .lastStep {
      margin-right:5px;
    }
  }
}

</style>

<style scoped>
  .StepTwoContainer >>> .van-checkbox {
    margin:5px;
  }
</style>
