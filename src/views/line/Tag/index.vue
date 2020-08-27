<template>
  <div class="TagContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="打标签" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>
    <h4 class="title van-hairline--bottom">
      标签信息
    </h4>
    <van-form ref="tagForm" :show-error="false" @submit="onSubmit">
      <van-field
        readonly
        clickable
        required
        name="picker"
        :value="form.lineTag"
        label="线路标签"
        placeholder="请选择"
        :rules="[{ required: true, message: '请选择' }]"
        @click="showPicker = true"
      />
      <van-field
        readonly
        clickable
        required
        name="picker"
        :value="form.b"
        label="线路紧急程度"
        placeholder="请选择"
        :rules="[{ required: true, message: '请选择' }]"
        @click="showPicker = true"
      />
      <van-field
        readonly
        clickable
        required
        name="picker"
        :value="form.c"
        label="适配性"
        placeholder="请选择"
        :rules="[{ required: true, message: '请选择' }]"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-button type="primary" block class="btn">
        提交
      </van-button>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        lineTag: '',
        b: '',
        c: ''
      },
      showPicker: false,
      columns: []
    }
  },

  methods: {
    /**
     *返回按钮
     */
    onClickLeft() {
      this.reset()
      this.$router.go(-1)
    },
    /**
     *提交
     */
    onSubmit(values) {
      console.log('submit', values);
    },
    /**
     * 确认
     */
    onConfirm() {

    },
    /**
     * 重置表单
     */
    reset() {
      this.$refs.tagForm.resetValidation()
    }
  }
}

</script>

<style lang='scss' scoped>
.TagContainer {
  font-family: PingFangSC-Medium;
  .title {
    margin:10px 0px 0px 0px;
    padding-left: 15px;
    padding-bottom: 12.5px;
    font-size: 15px;
    color: #3C4353;
  }
  .btn {
    margin:100px 15px 0px;
    width: 345px;
  }
}

</style>
