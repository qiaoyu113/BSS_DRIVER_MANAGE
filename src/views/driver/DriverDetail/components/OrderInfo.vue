<template>
  <div
    v-if="Object.keys(obj).length > 0"
    class="OrderInfo"
  >
    <van-cell-group>
      <van-field
        :label="`订单编号`"
        colon
        :value="obj.orderId"
        readonly
      >
        <template #button>
          <div>
            <span>{{ obj.statusName }}</span>
          </div>
        </template>
      </van-field>
      <van-field
        label="商品分类"
        :value="obj.busiTypeName"
        readonly
        colon
      />
      <van-field
        label="合作模式"
        :value="obj.cooperationModelName"
        readonly
        colon
      />
      <van-field
        label="合作车型"
        :value="obj.cooperationCarName"
        colon
        readonly
      />
      <van-field
        label="合作期限"
        colon
        :value="`${obj.cooperationTime}（月）`"
        readonly
      >
        <template #button>
          <div
            class="detailBox"
            @click="goRouter"
          >
            <span>详情</span>
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>
      <van-field
        label="订单金额"
        colon
        :value="`￥${obj.goodsAmount}`"
        readonly
      >
        <template #button>
          <div
            class="detailBox"
            @click="goDothing(obj.orderId,obj.driverId)"
          >
            <span>{{ orderText.name }}</span>
          </div>
        </template>
      </van-field>
      <van-field
        label="支付时间"
        colon
        :value="timeFormat(obj.updateDate,'YYYY-MM-DD')"
        readonly
      />
    </van-cell-group>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import { orderAbort } from '@/api/order.js';
import { Notify } from 'vant';
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
  computed: {
    orderText() {
      if (this.obj.status === 20) {
        return { name: '审核', url: '', code: 1 };
      } else if (this.obj.status === 30) {
        return { name: '终止', code: 2 };
      } else if (this.obj.status === 25) {
        return { name: '重新提交', url: '', code: 3 };
      } else if (this.obj.status === 45) {
        return { name: '录入订单', url: '', code: 4 };
      } else {
        return { name: '' };
      }
    }
  },
  methods: {
    goRouter() {
      this.$router.push({
        path: '/orderDetail',
        query: { id: this.obj.driverId, orderId: this.obj.orderId }
      });
    },
    goDothing(orderId, driverId) {
      if (this.orderText.code) {
        switch (this.orderText.code) {
          case 1:
            this.$router.push({
              path: '/orderAudit',
              query: { id: this.obj.driverId, orderId: this.obj.orderId }
            });
            break;
          case 2:
            this.stopOrder();
            break;
          case 3:
            this.$router.push({
              path: '/resetOrder',
              query: {
                id: this.obj.driverId,
                driverName: this.obj.driverInfoVO.name,
                driverPhone: this.obj.driverInfoVO.phone,
                workCityName: this.obj.driverInfoVO.workCityName,
                workCity: this.obj.driverInfoVO.workCity,
                orderId: this.obj.orderId
              }
            });
            break;
          case 4:
            this.$router.push({
              path: '/createOrder',
              query: {
                id: this.obj.driverId,
                driverName: this.obj.driverInfoVO.name,
                driverPhone: this.obj.driverInfoVO.phone,
                workCityName: this.obj.driverInfoVO.workCityName,
                workCity: this.obj.driverInfoVO.workCity,
                busiType: this.obj.driverInfoVO.busiType,
                orderId: this.obj.orderId
              }
            });
            break;
          default:
            return;
        }
      }
    },
    async stopOrder() {
      let params = {
        driverId: this.obj.driverId,
        orderId: this.obj.orderId,
        operateFlag: 'abort',
        goodsAmount: this.obj.goodsAmount,
        status: this.obj.status
      }
      let { data: res } = await orderAbort(params);
      if (res.success) {
        Notify({ type: 'success', message: '订单终止成功' });
        this.$emit('orderStop')
      } else {
        Notify({ type: 'warning', message: res.errorMsg });
      }
    },
    timeFormat(date, format) {
      return dayjs(date).format(format);
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
  .detailBox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #2f448a;
    span {
      margin-right: 3px;
    }
  }
}
</style>
<style scoped>
.orderTitle >>> .van-cell__title {
  flex: 0.6;
}
.orderTitle >>> .van-cell__value {
  flex: 0.4;
}
.OrderInfo >>> .van-field__label {
  width: 5em;
}
</style>
