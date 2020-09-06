<template>
  <div class="selfPickerContainer">
    <van-field
      :value="label"
      readonly
      colon
      clickable
      v-bind="$attrs"
      @click="showPickerFn"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        ref="picker"
        :value-key="value"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
      required: true
    },
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
    value: {
      type: String,
      default: 'text'
    },
    isComputed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPicker: false,
      index: 0,
      isFirst: false,
      label: ''
    }
  },
  watch: {
    // isComputed(val) {
    //   if (val) {
    //     this.getLabel()
    //   }
    // },
    value(val) {
      this.value = val
    },
    isComputed: {
      handler(val, oldName) {
        if (val) {
          this.getLabel()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 回显第一次获取label和索引index
    getLabel() {
      let index = this.columns.findIndex(item => (item.value || item.code || item.dictValue) === this.form[this.pickerKey])
      if (index === -1) {
        index = 0
      } else {
        this.index = index
        this.isFirst = true
        this.label = (this.columns[index].label || this.columns[index].name || this.columns[index].dictLabel)
      }
    },
    // 打开picker
    showPickerFn() {
      this.showPicker = true
      if (this.isFirst) { // 第一次回显
        setTimeout(() => {
          this.$refs.picker.setIndexes([this.index])
          this.isFirst = false
        }, 20)
      }
    },
    // 点击确定
    onConfirm(obj, index) {
      this.label = (obj.label || obj.name || obj.dictLabel)
      this.form[this.pickerKey] = (obj.value || obj.code || obj.dictValue)
      this.index = index
      this.showPicker = false
    }
  }
}

</script>

