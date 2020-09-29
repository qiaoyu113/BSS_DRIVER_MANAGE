<template>
  <div class="ContractInfoItem">
    <div class="itemBox">
      <van-cell>
        <template #title>
          <div class="title">
            <span>合同编号：{{ obj.contractId }}</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="itemStatus">
            {{ obj.statusName }}
          </div>
        </template>
      </van-cell>
      <div class="itemInfo">
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="订单编号："
          :value="obj.orderId"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="生成时间："
          :value="timeFormat(obj.createDate,'YYYY-MM-DD')"
        />
        <!-- 1=未签署，2=已签约，3=已失效，4=已作废 -->
        <van-cell
          v-if="obj.status === 2"
          title-class="cell-title"
          value-class="cell-value"
          title="完成时间："
          :value="timeFormat(obj.signTime,'YYYY-MM-DD')"
        />
        <van-cell
          v-if="obj.status === 3"
          title-class="cell-title"
          value-class="cell-value"
          title="过期时间："
          :value="timeFormat(obj.signTime,'YYYY-MM-DD')"
        >
          <template #right-icon>
            <span class="active" @click="active(obj.contractId)">激活</span>
          </template>
        </van-cell>
        <van-cell
          v-if="obj.status === 4"
          title-class="cell-title"
          value-class="cell-value"
          title="作废时间："
          :value="timeFormat(obj.signTime,'YYYY-MM-DD')"
        >
        </van-cell>
      </div>
    </div>
  </div>
</template>
<script>
import { activeContract } from '@/api/order.js';
import dayjs from 'dayjs'
import {
  Notify
} from 'vant';
export default {
  name: 'ContractInfoItem',
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
    goRouter() {
      this.$router.push({ path: '/lineDetail', query: { lineId: this.obj.lineId }})
    },
    timeFormat(date, format) {
      return dayjs(date).format(format)
    },
    async active(id) {
      this.$loading(true);
      let { data } = await activeContract({ contractId: id })
      if (data.success) {
        this.$loading(false);
        if (data.data.flag) {
          Notify({ type: 'success', message: '激活成功' });
          this.$emit('activeContract')
        }
      } else {
        this.$loading(false);
        Notify({ type: 'warning', message: data.errorMsg });
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../DriverList/components/DriverItem.less';
.itemBox{
  margin-bottom: 0;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.active{
  color: #2F448A;
}
</style>
