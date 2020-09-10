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
    <!-- form表单 -->
    <van-form
      ref="recordLine"
      @submit="onSubmit"
    >
      <van-field
        v-model="form.money"
        label-width="120px"
        colon
        clickable
        label="支付金额（元）"
        required
        placeholder="请填写"
        type="number"
        :rules="[{ required: true, message: '请填写' },
                 {validator:moneyCheck2, message: '请填写正确的数字'}]"
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
        v-model="form.transactionId"
        label-width="120px"
        colon
        clickable
        label="流水编号"
        required
        placeholder="请填写"
        type="number"
        :rules="[{ required: true, message: '请填写' }]"
      />
      <van-field
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
      <p class="tips van-hairline--bottom">
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
        maxlength="300"
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
import { parseTime } from '@/utils';
import { Toast } from 'vant';
import { upload, GetDictionaryList } from '@/api/common';
export default {
  components: {
    [Toast.name]: Toast
  },
  data() {
    return {
      showTime: false,
      showPicker: false,
      columns: [],
      showForm: {
        payDate: '',
        payType: '',
        payImageUrl: [] // 库房装货图片
      },
      form: {
        status: '3',
        orderId: '',
        transactionId: '',
        payDate: '',
        payType: '',
        payTypeName: '',
        money: '',
        payImageUrl: [], // 库房装货图片
        remarks: '' // 现场信息说明
      }
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(to.path)
    // ...
    if (to.path !== '/createOrder' && to.path !== '/resetOrder') {
      window.localStorage.removeItem('payItemInfo')
    }
    next();
  },
  mounted() {
    this.fetchData();
    this.form.orderId = this.$route.query.orderId
  },
  methods: {
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.go(-1);
    },
    async fetchData() {
      const { data } = await GetDictionaryList([
        'pay_type'
      ]);
      if (data.success) {
        this.columns = data.data.pay_type.map(
          (ele) => {
            return { name: ele.dictLabel, code: ele.dictValue };
          }
        );
      } else {
        this.$toast.fail(data);
      }
    },
    cancelform() {
      this.$router.go(-1)
    },
    onOversize(file) {
      console.log(file);
      Toast('图片大小不能超过 5M');
    },
    onConfirm(time) {
      let timeText = parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}');
      let timeCode = new Date(time).getTime();
      this.showForm.payDate = timeText;
      this.form.payDate = timeCode;
      console.log(time, this.form.payDate, new Date(time).getTime())
      this.showTime = false;
    },
    onConfirmPicker(value) {
      this.showForm.payType = value.name;
      this.form.payType = value.code;
      this.showPicker = false;
      this.form.payTypeName = value.name
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
    /**
     *提交
     */
    onSubmit(values) {
      try {
        let params = { ...this.form };
        params.payDate = new Date(this.form.payDate).getTime()
        let arr = []
        arr.push(params)
        console.log(arr)
        if (window.localStorage.getItem('payItemInfo')) {
          let itemArr = JSON.parse(window.localStorage.getItem('payItemInfo'))
          let allArr = arr.concat(itemArr)
          window.localStorage.setItem('payItemInfo', JSON.stringify(allArr))
        } else {
          window.localStorage.setItem('payItemInfo', JSON.stringify(arr))
        }
        this.$router.go(-1)
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
          this.form.payImageUrl = res.data.url;
        } else {
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
      this.form[name].splice(index, 1);
      this.showForm[name].splice(index, 1);
    }
  }
};
</script>

<style lang='scss' scoped>
.AddPay {
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

