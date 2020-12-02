<template>
  <div class="StepTwoContainer">
    <van-form ref="stepTwo" :show-error="false" @submit="onSubmit">
      <h4 class="title van-hairline--bottom">
        配送时间信息
      </h4>
      <SelfDatetimePicker
        label-width="130"
        picker-key="driverWorkTime"
        :min-date="minDate"
        :max-date="maxDate"
        :is-computed="form['driverWorkTime']!==''"
        :form="form"
        name="driverWorkTimeValidator"
        required
        :rules="[
          { required: true, message: '请选择司机上岗时间！' }
        ]"
        label="司机上岗时间"
        placeholder="点击选择日期"
      />
      <template v-if="isStable">
        <van-field
          label-width="130"
          colon
          name="deliveryWeekCycleValidator"
          readonly
          clickable
          required
          label="配送时间"
          placeholder="请选择"
          :rules="[
            { validator: deliveryWeekCycleValidator, message: '请选择配送时间！' }
          ]"
        >
          <div slot="input">
            <van-checkbox
              v-model="isAll"
            >
              全选
            </van-checkbox>
            <van-checkbox-group v-model="form['deliveryWeekCycle']" direction="horizontal">
              <van-checkbox v-for="item in deliveryWeekCycleArr" :key="item.value" :name="item.value">
                {{ item.label }}
              </van-checkbox>
            </van-checkbox-group>
          </div>
        </van-field>
      </template>
      <template v-else>
        <self-calendar
          label-width="130"
          picker-key="deliveryWeekCycle"
          :is-computed="form['deliveryWeekCycle'].length> 0"
          :form="form"
          :min-date="minDate"
          readonly
          clickable
          required
          label="配送时间"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择配送时间！' },
          ]"
        />
      </template>
      <van-field
        v-model.number="form.monthNum"
        colon
        required
        label="预计月出车天数(天)"
        placeholder="请输入"
        label-width="130"
        name="daysUseCarValidator"
        type="digit"
        :rules="[
          { required: true, message: '请输入预计月出车天数！' },
          { validator: daysUseCarValidator, message: '请输入1~31' }
        ]"
      />
      <van-field
        v-model.number="form.dayNum"
        label-width="130"
        colon
        required
        label="每日配送趟数"
        placeholder="请输入"
        name="countByDayValidator"
        type="digit"
        :rules="[
          { required: true, message: '请输入每日配送趟数！' },
          { validator: countByDayValidator, message: '请输入1~9' }
        ]"
        @input="handleInput"
      />
      <template v-for="item in form.dayNum">
        <div :key="'time'+item">
          <customSelect :index="item-1" :value="form.workingTime[item-1]" :columns="timeBucket" :is-computed="form.workingTime[item-1]!==''" @date="handleDateChange" />
        </div>
      </template>
      <h4 class="title van-hairline--bottom">
        结算信息
      </h4>
      <selftPicker
        picker-key="incomeSettlementMethod"
        :form="form"
        :columns="incomeSettlementMethodArr"
        value="label"
        :is-computed="form['incomeSettlementMethod']!==''"
        required
        label-width="130"
        label="结算方式"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择结算方式！' },
        ]"
      />
      <selftPicker
        picker-key="settlementCycle"
        :form="form"
        :columns="settlementCycleArr"
        value="label"
        :is-computed="form['settlementCycle']!==''"
        required
        label-width="130"
        label="结算周期"
        placeholder="请选择"
        :rules="[
          { required: true, message: '结算周期不能为空！' },
        ]"
      />
      <selftPicker
        picker-key="settlementDays"
        :form="form"
        :columns="settlementDaysArr"
        value="label"
        :is-computed="form['settlementDays']!==''"
        required
        label-width="130"
        label="结算天数"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择结算天数！' },
        ]"
      />

      <!-- 当结算方式选择「多点配」推送「每趟保底」「每趟提成单价」「预计月报价」输入框 -->
      <template v-if="form.incomeSettlementMethod ===2">
        <!-- 输入数字限制精确到小数点后两位，小数点前6位 -->
        <van-field
          v-model.number="form.everyUnitPrice"
          v-only-number="{min: 1, max: 999999.99, precision: 2}"
          label-width="130"
          colon
          required
          label="每趟提成单价(元)"
          placeholder="请输入"
          type="number"
          :rules="[{ required: true, message: '请输入单趟报价！' }]"
        />
      </template>
      <!-- 输入数字限制精确到小数点后两位，小数点前6位 -->
      <van-field
        v-model.number="form.everyTripGuaranteed"
        v-only-number="{min: 1, max: 999999.99, precision: 2}"
        label-width="130"
        colon
        required
        :label="form.incomeSettlementMethod ===1 ? '单趟报价(元)':'每趟保底(元)'"
        placeholder="请输入"
        type="number"
        :rules="[{ required: true, message: '请输入单趟报价！' }]"
      />
      <!-- 输入数字限制精确到小数点后两位，小数点前8位 -->
      <template v-if="form.incomeSettlementMethod===1">
        <van-field
          v-model="monthMoney"
          label-width="130"
          colon
          required
          disabled
          label="预计月报价(元)"
        />
      </template>
      <template v-else>
        <van-field
          v-model.number="form.shipperOffer"
          v-only-number="{min: 1, max: 99999999.99, precision: 2}"
          label-width="130"
          colon
          required
          :disabled="form.incomeSettlementMethod ===1"
          label="预计月报价(元)"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入月报价！' }]"
        />
      </template>
      <div class="btn">
        <van-button type="default" block class="lastStep" native-type="button" @click="$emit('step-one')">
          返回上一步
        </van-button>
        <van-button type="primary" block>
          下一步
        </van-button>
      </div>
    </van-form>
    <div class="cycle">
      2/3
    </div>
  </div>
</template>

<script>
import CustomSelect from './Select'
import SelftPicker from '@/components/SelfPicker'
import SelfCalendar from '@/components/SelfCalendar'
import SelfDatetimePicker from '@/components/SelfDatetimePicker'
export default {
  components: {
    CustomSelect,
    SelftPicker,
    SelfCalendar,
    SelfDatetimePicker
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
    },
    minDate: {
      type: [Date],
      default: () => new Date()
    },
    maxDate: {
      type: [Date],
      default: () => new Date(2125, 12, 31)
    }
  },
  data() {
    return {
      isFirst: true,
      // 配送时间
      deliveryWeekCycleArr: [],
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
      // 结算天数
      settlementDaysArr: [
        {
          label: '7天',
          value: 1
        },
        {
          label: '10天',
          value: 2
        },
        {
          label: '15天',
          value: 3
        },
        {
          label: '30天',
          value: 4
        },
        {
          label: '45天',
          value: 5
        },
        {
          label: '60天',
          value: 6
        },
        {
          label: '90天',
          value: 7
        }
      ],
      isStable: false,
      timeBucket: [], // 时间段
      assignment: true // 是否赋值
    }
  },
  computed: {
    isAll: {
      get() {
        return this.deliveryWeekCycleArr.length === this.form['deliveryWeekCycle'].length
      },
      set(newVal) {
        this.form['deliveryWeekCycle'] = []
        if (newVal) {
          let arrs = this.deliveryWeekCycleArr.map(item => item.value)
          this.form['deliveryWeekCycle'].push(...arrs)
        }
        return newVal
      }
    },
    monthMoney() {
      if (this.form.incomeSettlementMethod === 1) {
        let num = (Number(this.form.monthNum) * Number(this.form.dayNum) * Number(this.form.everyTripGuaranteed)).toFixed(2)
        this.generatorMoney(num)
        return num
      }
      return 0
    }
  },
  watch: {
    'form.incomeSettlementMethod'(val) {
      if (val === 1) {
        this.form.everyUnitPrice = ''
      } else {
        if (['edit', 'copy', 'active'].includes(this.type)) {
          this.isFirst = false
        } else {
          this.form.shipperOffer = ''
        }
      }
    }
  },

  mounted() {
    this.init()
    this.generaTimelist()
  },
  methods: {
    // 校验上架截止日期
    driverWorkTimeValidator(val) {
      if (['active', 'copy'].includes(this.type)) {
        let waitDirveValidityDate = new Date(this.minDate)
        waitDirveValidityDate.setHours(0, 0, 0)
        if (new Date(this.form.driverWorkTime).getTime() < waitDirveValidityDate) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
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
    // 预计月报价(元)
    generatorMoney(num) {
      if (Number(num) > 99999999.99) {
        return this.$fail('预计月报价应小于等于99999999.99')
      }
      this.form.shipperOffer = num
    },
    // 生成时间段
    generaTimelist() {
      this.timeBucket = []
      let arrs = []
      for (let i = 0; i < 24; i++) {
        let hour = ''
        if (i < 10) {
          hour = `0${i}`
        } else {
          hour = i
        }

        let brr = [
          `${hour}:00`,
          `${hour}:15`,
          `${hour}:30`,
          `${hour}:45`
        ]
        arrs.push(...brr)
      }

      let crrs = arrs.map(item => ({
        label: item,
        value: item
      }))
      this.timeBucket.push({
        values: crrs,
        defaultIndex: 1
      })
      this.timeBucket.push({
        values: crrs,
        defaultIndex: 1
      })
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
    handleInput(val) {
      if (val < 0 || val > 9) {
        this.form.dayNum = 1
        this.form.workingTime = []
      } else if (['edit', 'copy', 'active'].includes(this.type)) {
        if (this.assignment) {
          this.assignment = false
        } else {
          this.form.workingTime = []
        }
      } else {
        this.form.workingTime = []
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.StepTwoContainer {
  position: relative;

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
    margin:26.66vw 4vw 13.333vw;/*no*/
    width: 92vw;/*no*/
    .lastStep {
      margin-right:1.333vw;/*no*/
    }
  }
  .cycle {
    position: absolute;
    right:30px;
    bottom:80px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid #2f448a;
    color: #2f448a;
    z-index: 99;
    font-size: 13px;
    text-align: center;
    line-height: 40px;
    margin-right: 15px;
    margin-top: 15px;
  }
}

</style>

<style scoped>
  .StepTwoContainer >>> .van-checkbox {
    margin:5px;
  }
</style>
