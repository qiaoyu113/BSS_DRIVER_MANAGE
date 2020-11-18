<template>
  <div class="selfCalendarContainer" :class="border ? 'van-hairline--bottom':''">
    <van-field
      :value="label"
      readonly
      colon
      clickable
      v-bind="$attrs"
      @click="showPickerFn"
    />
    <van-calendar v-model="showPicker" :min-date="minDate" :max-date="maxDate" :default-date="form[pickerKey]" type="range" :allow-same-day="true" @confirm="onConfirm" />
  </div>
</template>

<script>
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
    border: {
      type: Boolean,
      default: true
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
      showPicker: false,
      label: ''
    }
  },
  methods: {
    // 打开picker
    showPickerFn() {
      this.showPicker = true
    },
    // 点击确定
    onConfirm(obj) {
      let startName = `${obj[0].getFullYear()}/${obj[0].getMonth() + 1}/${obj[0].getDate()}`;
      obj[0] = new Date(obj[0].setHours(0, 0, 0))
      obj[1] = new Date(obj[1].setHours(23, 59, 59))
      let endName = `${obj[1].getFullYear()}/${obj[1].getMonth() + 1}/${obj[1].getDate()}`;
      this.label = `${startName}-${endName}`
      this.form[this.pickerKey] = obj
      this.showPicker = false
    }
  }
}

</script>

