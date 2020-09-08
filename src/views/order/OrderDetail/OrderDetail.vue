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
      <van-cell-group>
        <van-cell
          value="司机信息"
          is-link
        />
        <van-field
          label="司机姓名"
          :value="`${formData.driverName}（${formData.driverId}）`"
          colon
          required
          readonly
        />
        <van-field
          label="司机电话"
          :value="formData.driverInfoVO.phone"
          required
          colon
          readonly
        />
        <van-field
          label="工作城市"
          :value="formData.driverInfoVO.workCityName"
          readonly
          required
          colon
        />
        <van-field
          label="身份证号"
          :value="formData.driverInfoVO.idNo"
          readonly
          required
          colon
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          value="商品信息"
          is-link
        />
        <van-field
          label="商品分类"
          :value="formData.busiTypeName"
          required
          readonly
          colon
        />
        <van-field
          label="合作模式"
          :value="formData.cooperationModelName"
          required
          readonly
          colon
        />
        <van-field
          label-width="100px"
          label="合作期限（月）"
          :value="formData.cooperationTime"
          readonly
          required
          colon
        />
        <!-- 专车才有该字段 -->
        <van-field
          v-if="formData.busiType === 0"
          label-width="100px"
          label="收入保障（元）"
          :value="formData.incomeGuarantee"
          readonly
          required
          colon
        />
        <van-field
          label-width="100px"
          label="抽佣比例（%）"
          :value="formData.rake"
          readonly
          colon
        />
        <van-field
          label-width="100px"
          label="商品金额（元）"
          :value="formData.goodsAmount"
          readonly
          colon
          required
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          value="商品附加信息"
          is-link
        />
        <van-field
          v-if="Number(formData.busiType) === 0 && Number(formData.cooperationModel) === 3"
          label="年检有效期"
          :value="formData.inspectionTime"
          required
          colon
          readonly
        />
        <van-field
          v-if="Number(formData.busiType) === 0 && Number(formData.cooperationModel) === 3"
          label="保险有效期"
          :value="formData.insuranceTime"
          required
          colon
          readonly
        />
        <van-field
          v-if="formData.cooperationModel === 2"
          label="租聘公司"
          :value="formData.supplier"
          readonly
          colon
          required
        />
        <van-field
          v-if="formData.cooperationModel === 1"
          label="购车公司"
          :value="formData.supplier"
          readonly
          colon
          required
        />
        <van-field
          label="合作车型"
          :value="formData.cooperationCarName"
          readonly
          colon
        />
        <van-field
          label="车辆型号"
          :value="formData.carModel"
          readonly
          colon
          required
        />
        <van-field
          v-if="formData.cooperationModel !== 3"
          label="车辆信息"
          :value="formData.carMessage"
          readonly
          required
          colon
        />
        <van-field
          v-if="formData.cooperationModel === 1"
          label="无税车价"
          :value="formData.carPrice"
          readonly
          required
          colon
        />
        <van-field
          v-if="formData.cooperationModel !== 1"
          label="车牌号"
          :value="formData.plateNo"
          colon
          readonly
          required
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          title="支付记录"
          :value="`总支付金额：${formData.havePayAmount}元`"
        />
        <template v-for="(payInfo,index) in formData.orderPayRecordInfoVOList">
          <div :key="index">
            <van-field
              label-width="100px"
              label="支付金额（元）"
              colon
              :value="payInfo.money"
              readonly
            />
            <van-field
              label="支付时间"
              colon
              :value="payInfo.payDate"
              readonly
            />
            <van-field
              label="支付方式"
              :value="payInfo.payTypeName"
              readonly
              colon
            />
            <van-field
              name="uploader"
              label="支付图片"
              colon
              readonly
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
              label="交易编号"
              colon
              :value="payInfo.transactionId"
              readonly
            />
            <van-field
              label="备注"
              :value="payInfo.remarks"
              readonly
              colon
            />
          </div>
        </template>
      </van-cell-group>
      <van-cell-group>
        <van-cell
          value="操作记录"
          is-link
        />
        <van-field
          label="订单状态"
          :value="formData.statusName"
          readonly
          colon
          label-align="right"
          label-width="120px"
        />
        <van-field
          label="订单生成时间"
          colon
          :value="formData.createDate"
          label-align="right"
          readonly
          label-width="120px"
        />
        <van-field
          v-if="formData.confirmName"
          label="订单确定时间"
          colon
          :value="formData.confirmTime"
          readonly
          label-align="right"
          label-width="120px"
        />
        <van-field
          v-if="formData.passName"
          label="订单审核通过时间"
          label-width="130px"
          colon
          :value="formData.passTime"
          readonly
          label-align="right"
        />
        <van-field
          v-if="formData.notPassName"
          label="订单审核不通过时间"
          colon
          :value="formData.notPassTime"
          readonly
          label-align="right"
          label-width="140px"
        />
        <van-field
          v-if="formData.status === 10"
          label="订单取消时间"
          colon
          :value="formData.updateDate"
          readonly
          label-align="right"
          label-width="120px"
        />
      </van-cell-group>
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
import { ImagePreview } from 'vant';
import { orderDetail, auditOrderNoPass } from '@/api/order.js';
export default {
  data() {
    return {
      activeNames: [],
      formData: {},
      routeName: '',
      driverId: ''
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    const id = this.$route.query.id;
    this.routeName = this.$route.path;
    this.driverId = id;
    this.getOrderDetail(id);
  },
  methods: {
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.go(-1);
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
          status: this.formData.status
        };
        let { data: res } = await auditOrderNoPass(params);
        if (res.success) {
          // 成功通知
          if (type === 'auditNotPass') {
            Notify({ type: 'warning', message: '已驳回' });
            this.$router.go(-1);
          } else {
            Notify({ type: 'success', message: '审核通过' });
            this.$router.go(-1);
          }
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    async getOrderDetail(id) {
      try {
        this.$loading(true);
        let { data: res } = await orderDetail({ driverId: id });
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
