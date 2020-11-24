<template>
  <div class="AddPay">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </van-sticky>
    <van-cell :value="form.useWithdrawable === 0 ? '非可提现金额支付' : '可提现金额支付'" />
    <!-- form表单 -->
    <van-form
      ref="recordLine"
      :show-error="false"
      @submit="onSubmit"
    >
      <van-field
        v-model.number="form.money"
        label-width="120px"
        colon
        clickable
        label="支付金额（元）"
        required
        placeholder="请填写"
        type="number"
        :rules="[{ required: true, message: '请填写' },
                 {validator:moneyCheck2, message: '请填写1-100000的数字'},
                 { validator: asyncValidatorMoney, message: '该司机可提现金额不足' }]"
      />
      <van-field
        label-width="120px"
        colon
        clickable
        label="支付时间"
        required
        readonly
        :value="showForm.payDate"
        placeholder="请填写"
        type="number"
        :rules="[{ required: true, message: '请填写' }]"
        @click="showTime = true"
      />
      <van-field
        v-if="form.useWithdrawable === 0"
        v-model="form.transactionId"
        label-width="120px"
        colon
        clickable
        label="流水编号"
        required
        placeholder="请填写"
        maxlength="50"
        show-word-limit
        :rules="[{ required: true, message: '请填写' }]"
      />
      <van-field
        v-if="form.useWithdrawable === 0"
        label-width="120px"
        colon
        clickable
        label="支付方式"
        required
        readonly
        :value="showForm.payType"
        placeholder="请选择"
        :rules="[{ required: true, message: '请选择' }]"
        @click="showPicker = true"
      />
      <van-field
        v-if="form.useWithdrawable === 0"
        label="支付截图"
        colon
        label-width="100"
        required
        :rules="[{ required: true, message: '请选择' }]"
      >
        <van-uploader
          slot="input"
          v-model="showForm.payImageUrl"
          name="payImageUrl"
          :after-read="afterRead"
          :max-count="1"
          :before-delete="handleDeleteFile"
          :max-size="5000 * 1024"
          @oversize="onOversize"
        />
      </van-field>
      <p
        v-if="form.useWithdrawable === 0"
        class="tips van-hairline--bottom"
      >
        提示:上传图片限制5M
      </p>

      <van-field
        v-model="form.remarks"
        label-width="100"
        colon
        rows="2"
        autosize
        label="备注"
        placeholder="请输入..."
        type="textarea"
        maxlength="150"
        show-word-limit
        class="textarea"
      />
      <div class="btnGroup">
        <van-button
          native-type="button"
          color="#2F448A"
          plain
          @click="cancelform"
        >
          取消
        </van-button>
        <van-button
          v-preventreclick
          type="primary"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>

    <van-popup
      v-model="showTime"
      position="bottom"
    >
      <van-datetime-picker
        v-model="form.payDate"
        type="date"
        title="选择年月日"
        @confirm="onConfirm"
        @cancel="showTime = false"
      />
    </van-popup>

    <van-popup
      v-model="showPicker"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        value-key="name"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirmPicker"
      />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant';
import dayjs from 'dayjs';
import { upload, GetDictionaryList } from '@/api/common';
import { checkWithdrawable } from '@/api/order.js';
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  components: {
    [Toast.name]: Toast
  },
  data() {
    return {
      showTime: false,
      showPicker: false,
      columns: [],
      driverId: '',
      showForm: {
        payDate: '',
        payType: '',
        payImageUrl: [] // 库房装货图片
      },
      form: {
        useWithdrawable: 0,
        orderId: '',
        transactionId: '',
        payDate: new Date(),
        payType: '',
        payTypeName: '',
        money: '',
        payImageUrl: [],
        remarks: ''
      }
    }
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    ...mapState({
      payList: state => state.orderPayList.payList
    })
  },
  beforeRouteLeave(to, from, next) {
    // ...
    if (to.path !== '/createOrder' && to.path !== '/resetOrder') {
      this.deleteAll()
    }
    next();
  },
  mounted() {
    this.fetchData();
    this.form.orderId = this.$route.query.orderId;
    this.driverId = this.$route.query.id;
    this.form.useWithdrawable = Number(this.$route.query.type);
  },
  methods: {
    ...mapActions({
      asyncSetPay: 'orderPayList/ASYNCSETPAY'
    }),
    ...mapMutations({
      delete: 'orderPayList/DELETEITEM',
      setStatus: 'orderPayList/SETSTATUS',
      deleteAll: 'orderPayList/DELETEALL'
    }),
    /**
     *返回按钮
     */
    onClickLeft() {
      this.setStatus(true)
      this.$router.go(-1);
    },
    async fetchData() {
      const { data } = await GetDictionaryList(['pay_type']);
      if (data.success) {
        this.columns = data.data.pay_type.map((ele) => {
          return { name: ele.dictLabel, code: ele.dictValue };
        });
      } else {
        this.$toast.fail(data);
      }
    },
    cancelform() {
      this.setStatus(true)
      this.$router.go(-1);
    },
    onOversize(file) {
      console.log(file);
      Toast('图片大小不能超过 5M');
    },
    onConfirm(time) {
      let timeText = dayjs(time).format('YYYY/MM/DD');
      // let timeCode = new Date(time).getTime();
      // console.log('timeCode', timeCode, time)
      this.showForm.payDate = timeText;
      // this.form.payDate = timeCode;
      this.showTime = false;
    },
    onConfirmPicker(value) {
      this.showForm.payType = value.name;
      this.form.payType = value.code;
      this.showPicker = false;
      this.form.payTypeName = value.name;
    },
    moneyCheck2(val) {
      if (Number(val) < 0) {
        return false;
      }
      if (/^[0-9]+$/.test(val)) {
        if (val >= 1000000 && val > 0) {
          return false;
        } else {
          return true;
        }
      } else {
        if (
          !/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(
            val
          ) &&
          val !== ''
        ) {
          let arr = String(val).split('.');
          let arr2 = String(arr[1]).substr(0, 2);
          this.form.money = arr[0] + '.' + arr2;
          return true;
        } else {
          return true;
        }
      }
    },
    asyncValidatorMoney(val) {
      if (this.form.useWithdrawable !== 1) {
        return
      }
      return new Promise((resolve) => {
        Toast.loading('验证中...');
        let params = {
          payMoney: val,
          driverId: this.driverId
        }
        checkWithdrawable(params).then(
          ({ data }) => {
            if (data.success) {
              Toast.clear();
              resolve(true);
            } else {
              Toast.clear();
              // this.$toast.fail(data.errorMsg);
              resolve(false);
            }
          }
        )
      });
    },
    /**
     *提交
     */
    onSubmit(values) {
      try {
        let params = { ...this.form };
        if (params.useWithdrawable !== 0) {
          delete params.transactionId;
          delete params.payTypeName;
          delete params.payImageUrl;
          params.payType = 9;
        }
        params.payDate = new Date(this.form.payDate).getTime();
        let arr = [];
        arr.push(params);
        this.asyncSetPay(arr.concat(this.payList))
        this.setStatus(true)
        this.$router.go(-1);
      } catch (err) {
        console.log(`submit fail:${err}`);
      }
    },
    afterRead(file, { name }) {
      this.uploadFile(file, name);
    },

    /**
     * 上传前校验
     */
    beforeRead(file) {
      if (file.type !== 'image/*') {
        Toast('请上传图片');
        return false;
      }
      return true;
    },
    // 上传文件
    async uploadFile(file, key) {
      this.$loading(true);
      try {
        let formData = new FormData(); // 创建form对象
        formData.append('file', file.file);
        let params = {
          expire: 0,
          folder: 'img',
          isEncode: true
        };
        let { data: res } = await upload(params, formData);
        if (res.success) {
          this.$loading(false);
          this.form.payImageUrl = res.data.url;
        } else {
          this.$loading(false);
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`upload file fail:${err}`);
      }
    },
    /**
     * 删除文件
     */
    handleDeleteFile(file, { index, name }) {
      this.showForm[name].splice(index, 1);
    }
  }
};
</script>

<style lang='scss' scoped>
.AddPay {
  .tagText{
    padding: 0.26667rem 0.42667rem;
  }
  font-family: PingFangSC-Medium;
  .title {
    margin: 10px 0px 0px 0px;
    padding-left: 15px;
    padding-bottom: 12.5px;
    font-size: 15px;
    color: #3c4353;
  }
  .btnGroup {
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
  .tips {
    padding-left: 15px;
    padding-bottom: 15px;
    margin-top: 10px;
    font-size: 11px;
    color: #ffa000;
  }
  .video {
    &.van-cell::after {
      border-bottom: none;
    }
  }
}
</style>

<style scoped>
.AddPay >>> .van-image__img {
  border-radius: 8px;
}
.AddPay >>> .van-cell__title {
  width: 100%;
}
.AddPay >>> .van-cell {
  display: flex;
  flex-direction: column;
}
.AddPay >>> .van-field__label {
  margin-bottom: 10px;
}
.textarea >>> .van-field__value {
  padding: 3px;
  background: #fafbfc;
  border: 1px solid #dde2ee;
  border-radius: 6px;
}
</style>

