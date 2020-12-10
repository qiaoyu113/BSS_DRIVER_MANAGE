<template>
  <div :class="title === '订单审核' ? 'pm-72 OrderDetail' : 'OrderDetail'">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </van-sticky>
    <div
      v-if="formData.driverInfoVO"
      class="detailInfo"
    >
      <van-form label-width="100px">
        <van-cell-group>
          <van-cell
            value="司机信息"
            is-link
            arrow-direction="down"
          />
          <van-field
            label="司机姓名"
            :value="`${formData.driverName}（${formData.driverId}）` | DataIsNull"
            colon
            required
            readonly
            :border="false"
          />
          <van-field
            label="司机电话"
            :value="formData.driverInfoVO.phone | DataIsNull"
            required
            colon
            readonly
            :border="false"
          />
          <van-field
            label="工作城市"
            :value="formData.driverInfoVO.workCityName | DataIsNull"
            readonly
            required
            colon
            :border="false"
          />
          <van-field
            label="身份证号"
            :value="formData.driverInfoVO.idNo | DataIsNull"
            readonly
            required
            colon
            :border="false"
          />
        </van-cell-group>
        <van-cell-group>
          <van-cell
            value="商品信息"
            is-link
            arrow-direction="down"
          />
          <van-field
            label="商品分类"
            :value="formData.busiTypeName | DataIsNull"
            required
            readonly
            colon
            :border="false"
          />
          <van-field
            label="合作模式"
            :value="formData.cooperationModelName | DataIsNull"
            required
            readonly
            colon
            :border="false"
          />
          <van-field
            label="合作期限（月）"
            :value="formData.cooperationTime | DataIsNull"
            readonly
            required
            colon
            :border="false"
          />
          <!-- 专车才有该字段 -->
          <van-field
            v-if="formData.busiType === 0"
            label="收入保障（元）"
            :value="formData.incomeGuarantee | DataIsNull"
            readonly
            required
            colon
            :border="false"
          />
          <van-field
            label="抽佣比例（%）"
            :value="formData.rake | DataIsNull"
            readonly
            colon
            :border="false"
          />
          <van-field
            label="商品金额（元）"
            :value="formData.goodsAmount | DataIsNull"
            readonly
            colon
            required
            :border="false"
          />
        </van-cell-group>
        <van-cell-group>
          <van-cell
            value="商品附加信息"
            is-link
            arrow-direction="down"
          />
          <van-field
            v-if="Number(formData.busiType) === 0 && Number(formData.cooperationModel) === 3"
            label="年检有效期"
            :value="formData.inspectionTime | DataIsNull"
            required
            colon
            readonly
            :border="false"
          />
          <van-field
            v-if="Number(formData.busiType) === 0 && Number(formData.cooperationModel) === 3"
            label="保险有效期"
            :value="formData.insuranceTime | DataIsNull"
            required
            colon
            readonly
            :border="false"
          />
          <van-field
            v-if="formData.cooperationModel === 2"
            label="租聘公司"
            :value="formData.supplier | DataIsNull"
            readonly
            colon
            required
            :border="false"
          />
          <van-field
            v-if="formData.cooperationModel === 1"
            label="购车公司"
            :value="formData.supplier | DataIsNull"
            readonly
            colon
            required
            :border="false"
          />
          <van-field
            label="合作车型"
            :value="formData.cooperationCarName | DataIsNull"
            readonly
            colon
            :border="false"
          />
          <van-field
            v-if="formData.cooperationModel === 1"
            label="车辆型号"
            :value="formData.carModel | DataIsNull"
            readonly
            colon
            required
            :border="false"
          />
          <van-field
            v-if="formData.cooperationModel !== 3"
            label="车辆信息"
            :value="formData.carMessage | DataIsNull"
            readonly
            required
            colon
            :border="false"
          />
          <van-field
            v-if="formData.cooperationModel === 1"
            label="无税车价"
            :value="formData.carPrice | DataIsNull"
            readonly
            required
            colon
            :border="false"
          />
          <van-field
            v-if="formData.cooperationModel !== 1"
            label="车牌号"
            :value="formData.plateNo | DataIsNull"
            colon
            readonly
            required
            :border="false"
          />
        </van-cell-group>
        <van-cell-group>
          <van-cell
            title="支付记录"
            :value="`总支付金额：${formData.havePayAmount}元`"
          />
          <template v-for="(payInfo,index) in formData.orderPayRecordInfoVOList">
            <div :key="index" class="van-hairline--bottom">
              <van-field
                label="支付金额（元）"
                colon
                :value="moneyDeal(payInfo)"
                readonly
                :border="false"
              />
              <van-field
                label="支付时间"
                colon
                :value="payInfo.payDate | DataIsNull"
                readonly
                :border="false"
              />
              <van-field
                v-if="payInfo.useWithdrawable === 0"
                label="支付方式"
                :value="payInfo.payTypeName | DataIsNull"
                readonly
                colon
                :border="false"
              />
              <van-field
                v-if="payInfo.useWithdrawable === 0"
                name="uploader"
                label="支付图片"
                colon
                readonly
                :border="false"
                @click="lookPic(payInfo.payImageUrl)"
              >
                <template #input>
                  <van-image
                    width="100"
                    height="100"
                    :src="payInfo.payImageUrl"
                  />
                </template>
              </van-field>
              <van-field
                v-if="payInfo.useWithdrawable === 0"
                label="交易编号"
                colon
                :value="payInfo.transactionId | DataIsNull"
                type="textarea"
                rows="1"
                autosize
                readonly
                :border="false"
              />
              <van-field
                label="备注"
                :value="payInfo.remarks | DataIsNull "
                readonly
                type="textarea"
                rows="1"
                autosize
                colon
                :border="false"
              />
            </div>
          </template>
        </van-cell-group>
        <van-cell-group>
          <van-cell
            value="操作记录"
            is-link
            arrow-direction="down"
          />
          <van-field
            label="订单状态"
            :value="formData.statusName"
            readonly
            colon
            label-align="left"
            label-width="130px"
            :border="false"
          />
          <van-field
            label="订单生成时间"
            colon
            :value="timeFormat(formData.createDate,'YYYY-MM-DD HH:mm:ss')+ `\n(${formData.createName})`"
            label-align="left"
            readonly
            type="textarea"
            label-width="130px"
            :border="false"
          />
          <van-field
            v-if="formData.passName"
            label="订单审核通过时间"
            label-width="130px"
            colon
            type="textarea"
            :value="timeFormat(formData.passTime,'YYYY-MM-DD HH:mm:ss')+ `\n(${formData.passName})`"
            readonly
            label-align="left"
            :border="false"
          />
          <van-field
            v-if="formData.notPassTime"
            label="订单审核不通过时间"
            colon
            type="textarea"
            :value="timeFormat(formData.notPassTime,'YYYY-MM-DD HH:mm:ss')+ `\n(${formData.notPassName})`"
            readonly
            label-align="left"
            label-width="130px"
            :border="false"
          />
          <!-- <van-field
            v-if="formData.status === 10"
            label="订单取消时间"
            colon
            :value="timeFormat(formData.updateDate,'YYYY-MM-DD HH:mm:ss')+ `  (${formData.createName})` "
            readonly
            label-align="left"
            label-width="130px"
            :border="false"
          /> -->
        </van-cell-group>
      </van-form>
    </div>
    <div
      v-if="routeName === '/orderAudit'"
      class="btnGroup"
    >
      <van-button
        color="#2F448A"
        plain
        @click="detailConfim('auditNotPass')"
      >
        驳回
      </van-button>
      <van-button
        type="primary"
        native-type="button"
        @click="detailConfim('auditPass')"
      >
        审核通过
      </van-button>
    </div>
  </div>
</template>
<script>
import { Notify } from 'vant';
import dayjs from 'dayjs'
import { ImagePreview } from 'vant';
import { orderDetail, auditOrderNoPass } from '@/api/order.js';
export default {
  data() {
    return {
      activeNames: [],
      formData: {},
      routeName: '',
      driverId: '',
      orderId: ''
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    const id = this.$route.query.id;
    this.orderId = this.$route.query.orderId;
    this.routeName = this.$route.path;
    this.driverId = id;
    this.getOrderDetail(id);
  },
  methods: {
    // YYYY-MM-DD dddd HH:mm:ss
    timeFormat(date, format) {
      return dayjs(date).format(format)
    },
    moneyDeal(val) {
      if (val.useWithdrawable === 0) {
        return val.money + '元'
      } else {
        return val.money + '元（可提现金额支付）'
      }
    },
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.go(-1)
    },
    lookPic(pic) {
      ImagePreview([pic]);
    },
    async detailConfim(type) {
      try {
        this.$loading(true);
        let params = {
          cooperationModel: this.formData.cooperationModel,
          createSource: this.formData.createSource,
          driverId: this.formData.driverId,
          operateFlag: type,
          orderId: this.formData.orderId,
          status: this.formData.status,
          goodsAmount: this.formData.goodsAmount
        };
        let { data: res } = await auditOrderNoPass(params);
        if (res.success) {
          // 成功通知
          if (type === 'auditNotPass') {
            Notify({ type: 'warning', message: '已驳回' });
          } else {
            Notify({ type: 'success', message: '审核通过' });
          }
          setTimeout(() => {
            this.onClickLeft()
          }, 1000);
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
        this.$toast.fail(err);
      } finally {
        this.$loading(false);
      }
    },
    async getOrderDetail(id) {
      try {
        this.$loading(true);
        let params = {
          operateFlag: 'detial',
          driverId: id
        }
        if (this.orderId) {
          params.orderId = this.orderId
        }
        let { data: res } = await orderDetail(params);
        if (res.success) {
          this.formData = res.data;
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.payItemBox{
  border-bottom: 2px solid #c8c9cc;
}
.pm-72 {
  padding-bottom: 72px;
  box-sizing: border-box;
}
.btnGroup {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .van-button {
    width: 48%;
  }
}
</style>
<style scoped>
.OrderDetail >>> .van-collapse-item__content {
  padding: 0;
}
</style>
