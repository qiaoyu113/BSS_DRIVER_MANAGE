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
          :value="timeFormat(obj.createDate, 'YYYY-MM-DD HH:mm:ss')"
        />
        <!-- 1=未签署，2=已签约，3=已失效，4=已作废 -->
        <van-cell
          v-if="obj.status === 2"
          title-class="cell-title"
          value-class="cell-value"
          title="完成时间："
          :value="timeFormat(obj.signTime, 'YYYY-MM-DD HH:mm:ss')"
        >
          <template #right-icon>
            <span
              v-permission="['/v2/contract/downloadContract']"
              class="active"
              @click="driverDownload"
            >下载合同</span>
          </template>
        </van-cell>
        <van-cell
          v-if="obj.status === 3"
          title-class="cell-title"
          value-class="cell-value"
          title="过期时间："
          :value="timeFormat(obj.signTime, 'YYYY-MM-DD HH:mm:ss')"
        >
          <template #right-icon>
            <span
              v-permission="['/v2/contract/activeContract']"
              class="active"
              @click="active(obj.contractId)"
            >激活</span>
          </template>
        </van-cell>
        <van-cell
          v-if="obj.status === 4"
          title-class="cell-title"
          value-class="cell-value"
          title="作废时间："
          :value="timeFormat(obj.signTime, 'YYYY-MM-DD HH:mm:ss')"
        >
        </van-cell>
      </div>
    </div>
  </div>
</template>
<script>
import { activeContract } from '@/api/order.js';
import { driverContract } from '@/api/driver'
import dayjs from 'dayjs'
import {
  Notify
} from 'vant';
export default {
  name: 'ContractInfoItem',
  props: {
    obj: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      isShowExport: true
    }
  },
  methods: {
    goRouter() {
      this.$router.push({ path: '/lineDetail', query: { lineId: this.obj.lineId }})
    },
    timeFormat(date, format) {
      return dayjs(date).format(format)
    },
    dowContract() {

    },
    passURL() {
      if (process.env.NODE_ENV === 'development') {
        return 'https://szjw-bss-web.m1.yunniao.cn/'
      }
      return window.location.origin.replace('h5', 'web')
    },
    driverDownload() {
      this.$dialog.confirm({
        messageAlign: 'left',
        message: `<p>提示:请在三足金乌web端 <a href=${this.passURL()} target='_blank' class='_blue'>szjw-bss-web.yunniao.cn</a> 右上角下载工具中下载</p>`,
        allowHtml: true,
        className: '_export-dialog'
      })
        .then(() => {
          // on confirm
          this.driverContractSure()
          console.log('cg')
        })
        .catch(() => {
          return ''
        });
    },
    async driverContractSure() {
      try {
        this.$loading(true)
        const { data } = await driverContract({ contractId: this.obj.contractId })
        if (!data.success) return this.$toast.fail(data.errorMsg)
        this.$toast.fail('合同已生成，请去web端下载')
      } catch (error) {
        return error
      } finally {
        this.$loading(false)
      }
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
.itemBox {
  margin-bottom: 0;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.active {
  color: #2f448a;
}
</style>

<style>
._export-dialog {
  font-size: 16px;
  padding: 42px 30px 0 30px;
  width: 70%;
}
._export-dialog p,._export-dialog a{
  font-size: 16px;
  margin: 0;
}
._blue {
  color: #6e9ee8;
}
</style>
