<template>
  <div class="CreateOrder">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </van-sticky>
    <div class="orderForm">
      <van-form
        :show-error="false"
        label-width="120px"
        @submit="onSubmit1"
      >
        <div v-if="formStatus === 1">
          <van-cell-group>
            <van-cell
              value="司机信息"
              is-link
            />
            <van-field
              label="司机姓名"
              :value="`${formData.driverInfoFORM.name}（${formData.driverInfoFORM.driverId}）`"
              required
              readonly
              colon
            />
            <van-field
              label="司机电话"
              :value="formData.driverInfoFORM.phone"
              required
              readonly
              colon
            />
            <van-field
              label="工作城市："
              :value="workCityName"
              required
              readonly
            />
            <van-field
              v-model="formData.driverInfoFORM.idNo"
              label="身份证号"
              required
              clearable
              colon
              placeholder="请输入"
              :rules="[{ required: true, message: '请填写身份证号' },{pattern:IdPattern, message: '请输入正确的身份证号'}]"
            />
            <van-cell
              value="商品信息"
              is-link
            />
            <van-field
              readonly
              clickable
              colon
              required
              :value="formText.busiType"
              label="商品分类"
              placeholder="请选择"
              :rules="[{ required: true, message: '请选择' }]"
              @click="showPickerFn('busiType')"
            />
            <van-field
              readonly
              clickable
              colon
              required
              :value="formText.cooperationModel"
              label="合作模式"
              placeholder="请选择"
              :rules="[{ required: true, message: '请选择' }]"
              @click="showPickerFn('cooperationModel')"
            />
            <van-field
              v-model="formData.cooperationTime"
              colon
              clickable
              label="合作期限（月）"
              required
              placeholder="请填写0-999的数字'"
              type="number"
              maxlength="3"
              :rules="[{ required: true, message: '请填写合作期限' },
                       {validator:validatorNum(0,999), message: '请填写正确的数字'}]"
            />
            <van-field
              v-model="formData.incomeGuarantee"
              colon
              clickable
              label="收入保障（元）"
              required
              placeholder="请填写0-999999.99的数字'"
              type="number"
              :rules="[{ required: true, message: '请填写收入保障' },
                       {validator:moneyCheck1, message: '请填写正确的数字'}]"
            />
            <van-field
              v-model="formData.rake"
              colon
              clickable
              label="抽佣比例（%）"
              required
              placeholder="请填写0-100的数字'"
              type="number"
              maxlength="5"
              :rules="[{ required: true, message: '请填写抽佣比例' },
                       {validator:checkPercent, message: '请填写正确的数字'}]"
            />
            <van-field
              v-model="formData.goodsAmount"
              colon
              clickable
              label="商品金额（元）"
              required
              placeholder="请填写0-999999.99的数字'"
              type="number"
              :rules="[{ required: true, message: '请填写商品金额' },
                       {validator:moneyCheck2, message: '请填写正确的数字'}]"
            />
          </van-cell-group>
        </div>

        <div v-if="formStatus === 2">
          <van-cell-group>
            <van-cell
              value="商品有效期"
              is-link
            />
            <van-field
              v-if="formData.busiType !== '1' && formData.cooperationModel === '3'"
              readonly
              clickable
              :value="formText.inspectionTime"
              label="年检有效期"
              colon
              required
              placeholder="请选择年检有效期"
              @click="changeDate('inspectionTime')"
            />
            <van-field
              v-if="formData.busiType !== '1' && formData.cooperationModel === '3'"
              readonly
              clickable
              colon
              required
              :value="formText.insuranceTime"
              label="保险有效期"
              placeholder="请选择保险有效期"
              @click="changeDate('insuranceTime')"
            />
            <van-field
              v-if="formData.cooperationModel === '2'"
              readonly
              clickable
              colon
              required
              :value="formText.supplier"
              label="租赁公司"
              placeholder="请选择"
              :rules="[{ required: true, message: '请选择' }]"
              @click="showPickerFn('supplier')"
            />
            <van-field
              v-if="formData.cooperationModel === '1'"
              readonly
              clickable
              colon
              required
              :value="formText.supplier"
              label="购车公司"
              placeholder="请选择"
              :rules="[{ required: true, message: '请选择' }]"
              @click="showPickerFn('supplier')"
            />
            <!-- 购车与租车 -->
            <van-field
              v-if="formData.supplier && formData.cooperationCar && formData.cooperationModel === '1'"
              readonly
              clickable
              colon
              required
              :value="formText.cooperationCar"
              label="合作车型"
              placeholder="请选择"
              :rules="[{ required: true, message: '请选择' }]"
              @click="showPickerFn('cooperationCar1')"
            />
            <van-field
              v-if="formData.cooperationModel === '3'"
              readonly
              clickable
              colon
              required
              :value="formText.cooperationCar"
              label="合作车型"
              placeholder="请选择"
              :rules="[{ required: true, message: '请选择' }]"
              @click="showPickerFn('cooperationCar2')"
            />
            <van-field
              v-if="formData.supplier && formData.cooperationCar && formData.cooperationModel === '1'"
              readonly
              clickable
              colon
              required
              :value="formText.carModel"
              label="车辆型号"
              placeholder="请选择"
              :rules="[{ required: true, message: '请选择' }]"
              @click="showPickerFn('carModel')"
            />
            <van-field
              label="车辆信息"
              :value="formData.carMessage"
              required
              colon
            />
            <van-field
              label="无税车价"
              :value="formData.carPrice"
              required
              colon
            />
            <van-field
              v-model="formData.plateNo"
              clickable
              label="车牌号"
              required
              colon
              placeholder="请填写车牌号"
              :rules="[
                { required: true, message: '请填写车牌号' },{pattern:carNoRegExp, message: '请填写正确的车牌号'}
              ]"
            />
          </van-cell-group>
        </div>

        <div v-if="formStatus === 3">
          <van-cell-group>
            <van-cell
              center
              title="支付记录"
              :label="`总支付金额：${formData.havePayAmount}元`"
            >
              <template #right-icon>
                <span
                  class="addPay"
                  @click="goRouter"
                >添加</span>
              </template>
            </van-cell>
            <div
              v-for="(item,index) in formData.orderPayRecordInfoVOList"
              :key="index"
            >
              <PayItem :obj="item" />
            </div>
          </van-cell-group>
        </div>

        <div class="btnGroup">
          <van-button
            v-if="formStatus === 2 || (formStatus === 3 && routeName !== '/resetOrder')"
            type="primary"
            block
            native-type="button"
            @click="() => {
              formStatus--
            }"
          >
            上一步
          </van-button>

          <van-button
            v-if="formStatus !== 3"
            type="primary"
            :style="{width: formStatus === 1 ? '100%' : '48%' }"
            native-type="submit"
            block
          >
            下一步
          </van-button>

          <van-button
            v-if="formStatus === 3"
            :style="{width: ( formStatus === 3 && routeName === '/resetOrder' ) ? '100%' : '48%' }"
            type="primary"
            native-type="button"
            @click="realSubmit"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <van-popup
      v-model="showPickerDate"
      position="bottom"
    >
      <van-datetime-picker
        v-model="formData.inspectionTime"
        type="date"
        title="选择年月日"
        @confirm="onConfirm1"
        @cancel="showPickerDate = false"
      />
    </van-popup>
    <!-- picker -->
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
    <div
      class="formStatus"
      v-text="formStatus"
    ></div>
  </div>
</template>
<script>
import { parseTime } from '@/utils';
import { Notify } from 'vant';
import { IdPattern, carNoRegExp } from '@/utils/index';
import { validatorNum } from '@/utils/validate';
import PayItem from './components/PayItem';
import { createOrUpdateOrder, orderDetail } from '@/api/order.js';
export default {
  components: {
    PayItem
  },
  data() {
    return {
      showPickerDate: false,
      showPicker: false,
      pickerKey: '',
      formData: {
        cooperationModel: '',
        cooperationTime: '',
        incomeGuarantee: '',
        rake: '',
        goodsAmount: '',
        inspectionTime: '',
        insuranceTime: '',
        plateNo: '',
        cooperationCar: '',
        busiType: '',
        supplier: '',
        carModel: '',
        driverInfoFORM: {
          driverId: '',
          idNo: '',
          name: '',
          phone: '',
          workCity: ''
        }
      },
      formText: {
        busiType: '',
        inspectionTime: '',
        insuranceTime: '',
        cooperationModel: '',
        carModel: ''
      },
      columns: [],
      columns_zuli: [
        { name: '李威山的车库', code: '1' },
        { name: '布鲁斯韦恩的车库', code: '2' }
      ],
      columns_buy: [
        { name: '李威山的4S店', code: '1' },
        { name: '布鲁斯韦恩企业制造', code: '2' }
      ],
      columns_typeCar: [
        { name: '五菱荣光', code: '1' },
        { name: 'GTR R34', code: '2' }
      ],
      columns_busitype: [
        { name: '梧桐共享', code: '1' },
        { name: '梧桐专车', code: '0' }
      ],
      columns_cooperationModel: [
        { name: '购车', code: '1' },
        { name: '租车', code: '2' },
        { name: '带车', code: '3' }
      ],
      columns_cooperationCar1: [
        { name: '合作1', code: '1' },
        { name: '合作2', code: '2' },
        { name: '合作3', code: '3' }
      ],
      columns_cooperationCar2: [
        { name: '合4', code: '1' },
        { name: '合作5', code: '2' },
        { name: '合作6', code: '3' }
      ],
      formStatus: 1,
      workCityName: '',
      routeName: ''
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    operateFlag() {
      if (this.formStatus === 1) {
        return 'step1'
      } else if (this.formStatus === 2) {
        return 'step2'
      } else {
        return 'submit'
      }
    }
  },
  created() {
    this.IdPattern = IdPattern;
    this.carNoRegExp = carNoRegExp;
    this.validatorNum = validatorNum;
  },
  mounted() {
    this.updataFrom()
  },
  methods: {
    updataFrom() {
      this.routeName = this.$route.path
      const id = this.$route.query.id;
      this.formData.driverInfoFORM.driverId = id;
      this.formData.driverInfoFORM.name = this.$route.query.driverName;
      this.formData.driverInfoFORM.phone = this.$route.query.driverPhone;
      this.formData.driverInfoFORM.workCity = this.$route.query.workCity;
      this.workCityName = this.$route.query.workCityName;
      this.getOrderDetail(id);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    goRouter() {
      this.$router.push({
        path: '/addPay',
        query: { id: this.formData.driverInfoFORM.driverId }
      });
    },
    async getOrderDetail(id) {
      try {
        this.$loading(true);
        let { data: res } = await orderDetail({ driverId: id });
        if (res.success) {
          this.formText.inspectionTime = res.data.inspectionTime;
          this.formText.insuranceTime = res.data.insuranceTime;
          this.formText.supplier = res.data.supplier;
          this.formText.carModel = res.data.carModel;
          this.formText.cooperationCar = res.data.cooperationCar;
          this.formData.driverInfoFORM.idNo = res.data.driverInfoVO.idNo
          this.formData = { ...this.formData, ...res.data };
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    async realSubmit() {
      try {
        this.$loading(true);
        let params = { ...this.formData };
        params.operateFlag = this.operateFlag
        let { data: res } = await createOrUpdateOrder(params);
        if (res.success) {
          Notify({ type: 'success', message: '订单录入成功' });
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    async onSubmit1(values) {
      try {
        this.$loading(true);
        let params = { ...this.formData };
        params.operateFlag = this.operateFlag
        let { data: res } = await createOrUpdateOrder(params);
        if (res.success) {
          this.formStatus++;
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    onConfirm1(time) {
      let timeText = parseTime(time, '{y}-{m}-{d}');
      let timeCode = time.getTime();
      this.formText[this.pickerKey] = timeText;
      this.formData[this.pickerKey] = timeCode;
      this.showPickerDate = false;
    },
    changeDate(key) {
      this.pickerKey = key;
      this.showPickerDate = true;
    },
    /**
     * picker 选择
     */
    onConfirmPicker(value) {
      if (this.pickerKey === 'cooperationCar1' || this.pickerKey === 'cooperationCar2') {
        this.formText['cooperationCar'] = value.name;
        this.formData['cooperationCar'] = value.code;
      } else {
        this.formText[this.pickerKey] = value.name;
        this.formData[this.pickerKey] = value.code;
      }
      this.showPicker = false;
    },
    /**
     * 显示picker
     */
    showPickerFn(key) {
      this.pickerKey = key;
      switch (key) {
        case 'supplier':
          this.columns = this.columns_zuli;
          break;
        case 'busiType':
          this.columns = this.columns_busitype;
          break;
        case 'cooperationModel':
          this.columns = this.columns_cooperationModel;
          break;
        case 'cooperationCar1':
          this.columns = this.columns_cooperationCar1;
          break;
        case 'cooperationCar2':
          this.columns = this.columns_cooperationCar2;
          break;
      }
      this.showPicker = true;
    },
    /**
     * 验证收入保障
     */
    moneyCheck1(val) {
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
          this.formData.incomeGuarantee = arr[0] + '.' + arr2;
          return true;
        } else {
          return true;
        }
      }
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
          this.formData.goodsAmount = arr[0] + '.' + arr2;
          return true;
        } else {
          return true;
        }
      }
    },
    /**
     * 验证抽佣比例
     */
    checkPercent(val) {
      if (Number(val) < 0) {
        return false;
      }
      if (/^[0-9]+$/.test(val)) {
        if (Number(val) > 100 && Number(val) > 0) {
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
          let arr2 = String(arr[1]);
          this.formData.rake = arr[0] + '.' + arr2[0];
          return true;
        } else {
          return true;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.CreateOrder {
  position: relative;
  .formStatus {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 1px solid black;
    position: fixed;
    right: 50px;
    bottom: 100px;
    text-align: center;
    line-height: 50px;
  }
  .addPay {
    color: blue;
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
  resetBtn{
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-button {
      width: 100%!important;
    }
  }
}

</style>
