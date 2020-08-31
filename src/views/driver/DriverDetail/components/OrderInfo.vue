<template>
  <div class="OrderInfo">
    <van-cell title="订单编号：DD202005060001">
      <template #right-icon>
        <span
          class="doBtn"
          @click="goRouter()"
        >详情</span>
      </template>
    </van-cell>
    <van-cell-group>
      <van-field
        label="商品分类："
        value="梧桐共享"
        readonly
      />
      <van-field
        label="合作模式："
        value="带车"
        readonly
      />
      <van-field
        label="合作车型："
        value="4.2米厢货"
        readonly
      />
      <van-field
        label="合作期限："
        value="3个月"
        readonly
      />
      <van-field
        label="订单金额："
        value="￥4000.00"
        readonly
      />
      <van-field
        label="支付时间："
        value="2020/08/15 13:59:23"
        readonly
      />
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goRouter() {
      this.$router.push({ path: '/orderdetail', id: '' });
    }
  }
};
</script>
<style lang="less" scoped>
.OrderInfo {
  .van-cell-group {
    padding: 15px 0;
    box-sizing: border-box;
  }
  .van-cell {
    padding: 3px 15px;
    box-sizing: border-box;
  }
  .van-cell__title {
    font-size: 15px;
    color: #3c4353;
  }
  .doBtn {
    font-size: 12px;
    color: #7f8fbd;
  }
}
</style>
