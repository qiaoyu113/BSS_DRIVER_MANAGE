<template>
  <div class="PayItem">
    <van-field
      label="支付金额"
      :value="`${obj.money}元`"
      colon
      readonly
      :border="false"
    />
    <van-field
      label="支付时间"
      :value="obj.payDate"
      colon
      readonly
      :border="false"
    />
    <van-field
      label="支付方式"
      :value="obj.payTypeName"
      :border="false"
      colon
      readonly
    />
    <van-field name="uploader" label="支付图片：" readonly :border="false" @click="lookPic(obj.payImageUrl)">
      <template #input>
        <van-image width="100" height="100" :src="obj.payImageUrl" />
      </template>
    </van-field>
    <van-field
      :border="false"
      label="交易编号"
      :value="obj.transactionId"
      colon
      readonly
    />
    <van-field
      style="border-bottom: 1px solid #c8c9cc;"
      label="备注"
      :value="obj.remarks"
      colon
      readonly
    />
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
export default {
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {
    lookPic(url) {
      ImagePreview([
        url
      ]);
    }
  }
}
</script>
<style lang="less" scoped></style>
