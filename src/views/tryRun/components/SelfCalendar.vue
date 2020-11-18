<template>
  <div class="selfCalendarContainer">
    <van-field
      :value="form[pickerKey]"
      readonly
      colon
      clickable
      v-bind="$attrs"
      @click="showPickerFn"
    >
    </van-field>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
export default {
  props: {
    form: {
      type: Object,
      default: () => {},
      required: true
    },
    pickerKey: {
      type: String,
      default: '',
      required: true
    },
    minDate: {
      type: Date,
      default: () => new Date()
    },
    maxDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      showPicker: false
    }
  },
  methods: {
    // 打开picker
    showPickerFn() {
      this.showPicker = true
    },
    onConfirm(obj) {
      this.form[this.pickerKey] = `${parseTime(obj, '{y}/{m}/{d}')}`
      this.showPicker = false
    }
  }
}

</script>
<style scoped>
  .selfCalendarContainer >>> .van-hairline--bottom::after {
    border-bottom:none;
  }
  .selfCalendarContainer >>> .van-field {
    padding: 0px;
  }
  .selfCalendarContainer >>> .van-cell::after {
    border-bottom:none;
  }

</style>

