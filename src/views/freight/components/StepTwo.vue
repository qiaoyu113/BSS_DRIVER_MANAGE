<template>
  <div class="StepTwoContainer">
    <van-form ref="stepTwo" :show-error="false" @submit="onSubmit">
      <h4 class="title van-hairline--bottom">
        配送时间信息
      </h4>
      <van-field
        readonly
        clickable
        required
        :rules="[
          { required: true, message: '请选择' },
        ]"
        name="calendar"
        :value="text1"
        label="司机上岗时间"
        placeholder="点击选择日期"
        @click="showPicker1 = true"
      />
      <van-calendar v-model="showPicker1" @confirm="onConfirm1" />
      <van-field
        :value="text2"
        readonly
        clickable
        required
        label-width="100"
        label="配送时间"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPicker2 = true"
      />
      <van-popup v-model="showPicker2" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns2"
          @confirm="onConfirm2"
          @cancel="showPicker2 = false"
        />
      </van-popup>
      <van-field
        v-model="form.c"
        required
        label="预计月出车天数"
        placeholder="请输入"
        label-width="100"
        name="daysUseCarValidator"
        type="digit"
        :rules="[
          { required: true, message: '请输入' },
          { validator: daysUseCarValidator, message: '请输入1~99' }
        ]"
      />
      <van-field
        v-model.number="form.d"
        required
        label="每日配送趟数"
        placeholder="请输入"
        name="countByDayValidator"
        type="digit"
        :rules="[
          { required: true, message: '请输入' },
          { validator: countByDayValidator, message: '请输入1~3' }
        ]"
      />
      <template v-for="item in form.d">
        <div :key="'time'+item">
          <customSelect :index="item" :columns2="columns2" @date="handleDateChange" />
        </div>
      </template>
      <h4 class="title van-hairline--bottom">
        结算信息
      </h4>
      <van-field
        :value="text3"
        readonly
        clickable
        required
        label-width="100"
        label="结算方式"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPicker3 = true"
      />
      <van-popup v-model="showPicker3" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns3"
          @confirm="onConfirm3"
          @cancel="showPicker3 = false"
        />
      </van-popup>
      <van-field
        :value="text4"
        readonly
        clickable
        required
        label-width="100"
        label="结算周期"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPicker4 = true"
      />
      <van-popup v-model="showPicker4" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns4"
          @confirm="onConfirm4"
          @cancel="showPicker4 = false"
        />
      </van-popup>
      <van-field
        :value="text5"
        readonly
        clickable
        required
        label-width="100"
        label="结算天数"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPicker5 = true"
      />
      <van-popup v-model="showPicker5" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns5"
          @confirm="onConfirm5"
          @cancel="showPicker5 = false"
        />
      </van-popup>
      <!-- 「整车」推送「单趟报价」「预计月报价」输入框 -->
      <template v-if="form.f ===1">
        <!-- 输入数字限制精确到小数点后两位，小数点前6位 -->
        <van-field
          v-model="form.i"
          v-only-number="{min: 1, max: 999999.99, precision: 2}"
          required
          label="单趟报价(元)"
          placeholder="请输入"
          type="number"
          :rules="[{ required: true, message: '请输入' }]"
        />
      </template>
      <!-- 当结算方式选择「多点配」推送「每趟保底」「每趟提成单价」「预计月报价」输入框 -->
      <template v-if="form.f ===2">
        <!-- 输入数字限制精确到小数点后两位，小数点前6位 -->
        <van-field
          v-model="form.m"
          v-only-number="{min: 1, max: 999999.99, precision: 2}"
          required
          label="每趟保底(元)"
          placeholder="请输入"
          type="number"
          :rules="[{ required: true, message: '请输入' }]"
        />
        <!-- 输入数字限制精确到小数点后两位，小数点前6位 -->
        <van-field
          v-model="form.n"
          v-only-number="{min: 1, max: 999999.99, precision: 2}"
          required
          label="每趟提成单价(元)"
          placeholder="请输入"
          type="number"
          :rules="[{ required: true, message: '请输入' }]"
        />
      </template>
      <!-- 输入数字限制精确到小数点后两位，小数点前8位 -->
      <van-field
        v-model="form.j"
        v-only-number="{min: 1, max: 99999999.99, precision: 2}"
        required
        label="预计月报价(元)"
        placeholder="请输入"
        label-width="100"
        :rules="[{ required: true, message: '请输入线路名称' }]"
      />
      <div class="btn">
        <van-button type="default" block class="lastStep" native-type="button" @click="$emit('step-one')">
          返回上一步
        </van-button>
        <van-button type="primary" block>
          下一步
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import CustomSelect from './Select'
export default {
  components: {
    CustomSelect
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,
      showPicker5: false,
      columns2: [
        {
          label: '00:00-08:00',
          value: 1
        },
        {
          label: '08:00-16:00',
          value: 2
        },
        {
          label: '16:00-24:00',
          value: 3
        }
      ],
      columns3: [
        {
          label: '整车',
          value: 1
        },
        {
          label: '多点配',
          value: 2
        }
      ],
      columns4: [
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
      columns5: [
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
      ]
    }
  },
  computed: {
    minDate() {
      return new Date()
    }
  },
  watch: {
    'form.d'(newVal, oldValue) {
      if (newVal < 0 || newVal > 3) {
        this.form.d = 1
      }
    }
  },
  methods: {
    // 提交
    onSubmit(values) {
      console.log('submit', values);
      this.$emit('stepThree')
    },
    // 司机上岗时间
    onConfirm1(date) {
      this.text1 = `${date.getMonth() + 1}/${date.getDate()}`;
      this.form.a = date
      this.showPicker1 = false;
    },
    // 是否有线路余额 ----底部pop选中关闭
    onConfirm2(obj) {
      this.form.b = obj.value
      this.text2 = obj.label
      this.showPicker2 = false
    },
    // 预计月出车天数
    daysUseCarValidator(val) {
      if (val >= 1 && val <= 99) {
        return true
      }
      return false
    },
    // 每日配送趟数
    countByDayValidator(val) {
      if (val >= 1 && val <= 3) {
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
      if (this.form.e[index]) {
        this.form.e.splice(index, 1, date)
      } else {
        this.form.e.splice(index, 0, date)
      }
    },
    // 结算方式
    onConfirm3(obj) {
      this.form.f = obj.value
      this.text3 = obj.label
      this.showPicker3 = false
    },
    // 结算周期
    onConfirm4(obj) {
      this.text4 = obj.label
      this.form.g = obj.value
      this.showPicker4 = false;
    },
    // 结算天数
    onConfirm5(obj) {
      this.form.h = obj.value
      this.text5 = obj.label
      this.showPicker5 = false
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
