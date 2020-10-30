<template>
  <div class="SelectContainer">
    <van-field
      :value="label"
      readonly
      clickable
      required
      label-width="100"
      label="预计工作时间"
      placeholder="请选择"
      :rules="[
        { required: true, message: '请选择预计工作时间！' },
      ]"
      @click="showPickerFn"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        ref="timePicker"
        value-key="label"
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
    index: {
      type: Number,
      default: 1
    },
    columns: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    },
    isComputed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPicker: false,
      label: ''
    }
  },
  watch: {
    isComputed: {
      handler(val) {
        if (val && this.value) {
          this.getLabel()
        }
      },
      immediate: true
    }
  },
  methods: {
    // 回显第一次获取label和索引index
    getLabel() {
      let step1 = this.value.split('-')[0]
      let step2 = this.value.split('-')[1]
      let index1 = this.columns[0].values.findIndex(item => item.value === step1)
      let index2 = this.columns[1].values.findIndex(item => item.value === step2)
      this.columns[0].defaultIndex = index1
      this.columns[1].defaultIndex = index2
      this.label = `${this.columns[0].values[index1].label}-${this.columns[1].values[index2].label}`
    },
    // 司机上岗时间
    onConfirm(obj) {
      let label = `${obj[0].label}-${obj[1].label}`
      let value = `${obj[0].value}-${obj[1].value}`
      this.$emit('date', value, this.index)
      this.label = label
      this.showPicker = false
    },
    showPickerFn() {
      this.showPicker = true
    }
  }
}

</script>

<style lang='scss' scoped>
.SelectContainer {

}

</style>
