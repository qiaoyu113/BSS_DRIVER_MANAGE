<template>
  <div class="PayItem">
    <van-field
      label="支付金额："
      value="2300.00元"
      readonly
      :border="false"
    />
    <van-field
      label="支付时间："
      value="2020-08-08"
      readonly
      :border="false"
    />
    <van-field
      label="支付方式："
      value="微信小程序"
      :border="false"
      readonly
    />
    <van-field name="uploader" label="支付图片：" readonly :border="false" @click="lookPic">
      <template #input>
        <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </template>
    </van-field>
    <van-field
      :border="false"
      label="交易编号："
      value="123456789987465"
      readonly
    />
    <van-field
      style="border-bottom: 1px solid #c8c9cc;"
      label="备注："
      value="？？？？"
      readonly
    />
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
export default {
  data() {
    return {}
  },
  methods: {
    lookPic() {
      ImagePreview([
        'https://img.yzcdn.cn/vant/cat.jpeg'
      ]);
    }
  }
}
</script>
<style lang="less" scoped></style>
