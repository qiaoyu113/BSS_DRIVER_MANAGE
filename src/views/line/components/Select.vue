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
      isFirst: false,
      idx: 0,
      label: ''
    }
  },
  watch: {
    isComputed: {
      handler(val) {
        if (val) {
          this.getLabel()
        }
      },
      immediate: true
    }
  },
  methods: {
    // 回显第一次获取label和索引index
    getLabel() {
      let index = this.columns.findIndex(item => item.value === this.value)
      if (index === -1) {
        index = 0
      } else {
        this.idx = index
        this.isFirst = true
        this.label = this.columns[index].label
      }
    },
    // 司机上岗时间
    onConfirm(obj) {
      this.$emit('date', obj.value, this.index)
      this.label = obj.label
      this.showPicker = false
    },
    showPickerFn() {
      this.showPicker = true
      if (this.isFirst) { // 第一次回显
        setTimeout(() => {
          this.$refs.timePicker.setIndexes([this.idx])
          this.isFirst = false
        }, 20)
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.SelectContainer {

}

</style>
