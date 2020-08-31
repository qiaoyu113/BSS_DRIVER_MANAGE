<template>
  <div class="StepTwoContainer">
    <van-form ref="stepTwo" :show-error="false" @submit="onSubmit">
      <h4 class="title van-hairline--bottom">
        配送时间信息
      </h4>
      <van-field
        label-width="100"
        colon
        readonly
        clickable
        required
        :rules="[
          { required: true, message: '请选择' },
        ]"
        name="calendar"
        :value="pickerNames['a']"
        label="司机上岗时间"
        placeholder="点击选择日期"
        @click="showPickerFn('a')"
      />
      <van-field
        label-width="100"
        colon
        :value="pickerNames['b']"
        readonly
        clickable
        required
        label="配送时间"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('b')"
      />
      <van-field
        v-model="form.c"
        colon
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
        label-width="100"
        colon
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
          <customSelect :index="item" :columns2="columns1" @date="handleDateChange" />
        </div>
      </template>
      <h4 class="title van-hairline--bottom">
        结算信息
      </h4>
      <van-field
        colon
        :value="pickerNames['e']"
        readonly
        clickable
        required
        label-width="100"
        label="结算方式"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('e')"
      />

      <van-field
        colon
        :value="pickerNames['f']"
        readonly
        clickable
        required
        label-width="100"
        label="结算周期"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('f')"
      />

      <van-field
        colon
        :value="pickerNames['g']"
        readonly
        clickable
        required
        label-width="100"
        label="结算天数"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('g')"
      />

      <!-- 「整车」推送「单趟报价」「预计月报价」输入框 -->
      <template v-if="form.f ===1">
        <!-- 输入数字限制精确到小数点后两位，小数点前6位 -->
        <van-field
          v-model="form.i"
          v-only-number="{min: 1, max: 999999.99, precision: 2}"
          label-width="100"
          colon
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
          label-width="100"
          colon
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
          label-width="100"
          colon
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
        label-width="100"
        colon
        required
        label="预计月报价(元)"
        placeholder="请输入"
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
    <!-- 底部弹出框 -->
    <van-popup v-model="showPicker" position="bottom">
      <template v-if="isDate">
        <van-datetime-picker
          v-model="form[pickerKey]"
          type="date"
          title="选择年月日"
          :min-date="minTime"
          :max-date="maxTime"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </template>
      <template v-else>
        <!-- picker选择器 -->
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </template>
    </van-popup>
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
      columns1: [
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
      columns2: [
        {
          label: '整车',
          value: 1
        },
        {
          label: '多点配',
          value: 2
        }
      ],
      columns3: [
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
      columns4: [
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
      pickerNames: { // picker选中显示的名字
        city: '',
        b: '',
        c: '',
        startDate: '',
        endDate: ''
      },
      pickerKey: '', // 显示picker的key
      columns: [], // picker的列表
      showPicker: false, // 是否打开picker
      areaLists: ['h'], // 显示日历控件的字段集合
      timeLists: ['a'],
      minTime: new Date(),
      maxTime: new Date(2125, 12, 31)
    }
  },
  computed: {
    isDate() {
      return this.timeLists.includes(this.pickerKey)
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
    // 显示picker
    showPickerFn(key) {
      this.columns = []
      this.pickerKey = key;
      if (key === 'b') {
        this.columns.push(...this.columns1);
      } else if (key === 'e') {
        this.columns.push(...this.columns2);
      } else if (key === 'f') {
        this.columns.push(...this.columns3);
      } else if (key === 'g') {
        this.columns.push(...this.columns4);
      }

      this.showPicker = true;
    },
    // picker选择器
    onConfirm(obj) {
      if (this.isDate) {
        this.pickerNames[this.pickerKey] = `${obj.getMonth() + 1}/${obj.getDate()}`;
      } else {
        this.pickerNames[this.pickerKey] = obj.label
      }
      this.form[this.pickerKey] = obj
      this.showPicker = false;
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
