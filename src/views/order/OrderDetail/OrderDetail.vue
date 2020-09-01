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
    <div class="detailInfo">
      <van-cell-group>
        <van-cell
          value="司机信息"
          is-link
        />
        <van-field
          label="司机姓名："
          value="李威山（SJ19980822651）"
          required
          readonly
        />
        <van-field
          label="司机电话："
          value="18848885135"
          required
          readonly
        />
        <van-field
          label="工作城市："
          value="北京市"
          readonly
          required
        />
        <van-field
          label="身份证号："
          value="41300119980822651X"
          readonly
          required
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          value="商品信息"
          is-link
        />
        <van-field
          label="商品信息："
          value="梧桐专车"
          required
          readonly
        />
        <van-field
          label="合作模式："
          value="带车"
          required
          readonly
        />
        <van-field
          label="合作期限："
          value="36个月"
          readonly
          required
        />
        <!-- 专车才有该字段 -->
        <van-field
          label="收入保障："
          value="42000元"
          readonly
          required
        />
        <van-field
          label="抽佣比例："
          value="7.5%"
          readonly
        />
        <van-field
          label="商品金额："
          value="4000.00元"
          readonly
          required
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          value="商品附加信息"
          is-link
        />
        <van-field
          label="年检有效期："
          value="2020-09-09"
          required
          readonly
        />
        <van-field
          label="保险有效期："
          value="2020-08-08"
          required
          readonly
        />
        <van-field
          label="租聘公司："
          value="沙皇公司"
          readonly
          required
        />
        <van-field
          label="合作车型："
          value="AE86panda"
          readonly
        />
        <van-field
          label="车辆型号："
          value="GTR R32"
          readonly
          required
        />
        <van-field
          label="车辆信息："
          value="？？？？"
          readonly
          required
        />
        <van-field
          label="无税车价："
          value="4000.00元"
          readonly
          required
        />
        <van-field
          label="车牌号："
          value="群马0301"
          readonly
          required
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          title="支付记录"
          value="总支付金额：4600.00元"
        />
        <van-field
          label="支付金额："
          value="2300.00元"
          readonly
        />
        <van-field
          label="支付时间："
          value="2020-08-08"
          readonly
        />
        <van-field
          label="支付方式："
          value="微信小程序"
          readonly
        />
        <van-field
          name="uploader"
          label="支付图片："
          readonly
          @click="lookPic"
        >
          <template #input>
            <van-image
              width="100"
              height="100"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </template>
        </van-field>
        <van-field
          label="交易编号："
          value="123456789987465"
          readonly
        />
        <van-field
          label="备注："
          value="？？？？"
          readonly
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          value="操作记录"
          is-link
        />
        <van-field
          label="订单状态："
          value="2020-09-09（方圆）"
          readonly
          label-align="right"
          label-width="120px"
        />
        <van-field
          label="订单生成时间："
          value="2020-08-08（方圆）"
          label-align="right"
          readonly
          label-width="120px"
        />
        <van-field
          label="订单确定时间："
          value="2020-08-08（方圆）"
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
        @click="cancelform"
      >
        驳回
      </van-button>
      <van-button
        type="primary"
        native-type="button"
        @click="detailConfim()"
      >
        审核通过
      </van-button>
    </div>
  </div>
</template>
<script>
import { Notify } from 'vant';
import { ImagePreview } from 'vant'
export default {
  data() {
    return {
      activeNames: [],
      form: {
        lineName: '祥云物流项目'
      },
      routeName: ''
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    this.routeName = this.$route.path
  },
  methods: {
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.go(-1);
    },
    lookPic() {
      ImagePreview([
        'https://img.yzcdn.cn/vant/cat.jpeg'
      ]);
    },
    cancelform() {
      Notify({ type: 'warning', message: '已驳回' });
      this.$router.go(-1)
    },
    detailConfim() {
      // 成功通知
      Notify({ type: 'success', message: '审核通过' });
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="less" scoped>
.pm-72{
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
