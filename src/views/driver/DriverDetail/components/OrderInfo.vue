<template>
  <div v-if="obj.orderId" class="OrderInfo">
    <van-cell :title="obj.orderId">
      <template #right-icon>
        <span
          class="doBtn"
          @click="goRouter()"
        >详情</span>
      </template>
    </van-cell>
    <van-cell-group>
      <van-field
        v-if="obj.busiTypeName"
        label="商品分类"
        :value="obj.busiTypeName"
        readonly
        colon
      />
      <van-field
        v-if="obj.cooperationModelName"
        label="合作模式"
        :value="obj.cooperationModelName"
        readonly
        colon
      />
      <van-field
        v-if="obj.cooperationCarName"
        label="合作车型"
        :value="obj.cooperationCarName"
        colon
        readonly
      />
      <van-field
        v-if="obj.cooperationTime"
        label="合作期限"
        colon
        :value="`${obj.cooperationTime}（月）`"
        readonly
      />
      <van-field
        label="订单金额"
        colon
        :value="`￥${obj.havePayAmount}`"
        readonly
      />
      <van-field
        label="支付时间"
        colon
        :value="obj.updateDate | parseTime('{y}-{m}-{d}')"
        readonly
      />
    </van-cell-group>
  </div>
</template>
<script>
export default {
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    goRouter() {
      this.$router.push({ path: '/orderDetail', query: { id: this.obj.driverId }});
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
