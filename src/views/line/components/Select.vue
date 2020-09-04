<template>
  <div class="SelectContainer">
    <van-field
      :value="value"
      readonly
      clickable
      required
      label-width="100"
      label="预计工作时间"
      placeholder="请选择"
      :rules="[
        { required: true, message: '请选择' },
      ]"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        value-key="label"
        show-toolbar
        :columns="columns2"
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
    columns2: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showPicker: false
    }
  },
  methods: {
    // 司机上岗时间
    onConfirm(obj) {
      this.$emit('date', obj.value, this.index)
      this.showPicker = false
    }
  }
}

</script>

<style lang='scss' scoped>
.SelectContainer {

}

</style>
