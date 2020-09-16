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
        ref="orderForm"
        :show-error="false"
        label-width="120px"
        @submit="onSubmit1"
      >
        <div v-show="formStatus === 1">
          <van-cell-group>
            <van-cell
              value="司机信息"
              is-link
            />
            <van-field
              label="司机姓名"
              :value="`${formData.driverInfoFORM.name}（${formData.driverInfoFORM.driverId || formData.driverId }）`"
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
              :value="formData.driverInfoFORM.workCityName"
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
            <van-field label="商品分类" :value="formData.busiType === 0 ? '梧桐专车' : '梧桐共享' " placeholder="业务线" colon readonly />
            <selftPicker
              :props="keyValue"
              picker-key="cooperationModel"
              :form="formData"
              :columns="columns_cooperationModel"
              value="name"
              :is-computed="formData['cooperationModel']!=='' && columns_busiType.length > 0"
              required
              label="合作模式"
              placeholder="请选择"
              :rules="[
                { required: true, message: '请选择' },
              ]"
            />
            <van-field
              v-model="formData.cooperationTime"
              v-only-number="{min: 0, max: 900, precision: 0}"
              colon
              clickable
              label="合作期限（月）"
              required
              placeholder="请填写0-999的数字"
              type="number"
              maxlength="3"
              :rules="[{ required: true, message: '请填写合作期限' },
                       {validator:validatorNum(0,999), message: '请填写正确的数字'}]"
            />
            <van-field
              v-if="formData.busiType === 0"
              v-model="formData.incomeGuarantee"
              v-only-number="{min: 0, max:1000000, precision: 2}"
              colon
              clickable
              label="收入保障（元）"
              required
              placeholder="请填写0-999999.99的数字"
              type="number"
              :rules="[{ required: true, message: '请填写收入保障' },
                       {validator:moneyCheck1, message: '请填写正确的数字'}]"
            />
            <van-field
              v-model="formData.rake"
              v-only-number="{min: 0, max: 100, precision: 0}"
              colon
              clickable
              label="抽佣比例（%）"
              required
              placeholder="请填写0-100的数字"
              type="number"
              maxlength="5"
              :rules="[{ required: true, message: '请填写抽佣比例' },
                       {validator:checkPercent, message: '请填写正确的数字'}]"
            />
            <van-field
              v-model="formData.goodsAmount"
              v-only-number="{min: 0, max: 999999.99, precision: 0}"
              colon
              clickable
              label="商品金额（元）"
              required
              placeholder="请填写0-999999.99的数字"
              type="number"
              :rules="[{ required: true, message: '请填写商品金额' },
                       {validator:moneyCheck2, message: '请填写正确的数字'}]"
            />
          </van-cell-group>
        </div>

        <div v-show="formStatus === 2">
          <van-cell-group>
            <van-cell
              value="商品附加信息"
              is-link
            />

            <van-field
              v-show="formData.busiType !== 1 && formData.cooperationModel === 3"
              readonly
              clickable
              :value="formText.inspectionTime"
              label="年检有效期"
              colon
              required
              placeholder="请选择年检有效期"
              :rules="[
                { required: formData.busiType !== 1 && formData.cooperationModel === 3 && formStatus === 2, message: '请选择' },
              ]"
              @click="changeDate('inspectionTime')"
            />
            <van-field
              v-show="formData.busiType !== 1 && formData.cooperationModel === 3"
              readonly
              clickable
              colon
              required
              :value="formText.insuranceTime"
              label="保险有效期"
              placeholder="请选择保险有效期"
              :rules="[
                { required: formData.busiType !== 1 && formData.cooperationModel === 3 && formStatus === 2, message: '请选择' },
              ]"
              @click="changeDate('insuranceTime')"
            />

            <selftPicker
              v-show="formData.cooperationModel === 2"
              :props="keyValue"
              picker-key="supplier"
              :form="formData"
              :columns="columns_supplier"
              value="name"
              :is-computed="formData['supplier']!=='' && columns_supplier.length > 0"
              required
              label="租赁公司"
              placeholder="请选择"
              :rules="[
                { required: formData.cooperationModel === 2 && formStatus === 2, message: '请选择' },
              ]"
            />

            <selftPicker
              v-show="formData.cooperationModel === 1"
              :props="keyValue"
              picker-key="supplier"
              :form="formData"
              :columns="columns_supplier"
              value="name"
              :is-computed="formData['supplier']!=='' && columns_supplier.length > 0"
              required
              label="购车公司"
              placeholder="请选择"
              :rules="[
                { required: formData.cooperationModel === 1 && formStatus === 2, message: '请选择' },
              ]"
            />
            <!-- 购车与租车 -->
            <selftPicker
              v-show="formData.cooperationModel !== 3"
              :props="keyValue"
              picker-key="cooperationCar"
              :form="formData"
              :columns="columns_cooperationCar1"
              value="name"
              :is-computed="formData['cooperationCar']!=='' && columns_cooperationCar1.length > 0"
              required
              label="合作车型"
              placeholder="请选择"
              :rules="[
                { required: formData.supplier && formData.cooperationModel !== 3 && formStatus === 2, message: '请选择' },
              ]"
            />

            <selftPicker
              v-show="formData.cooperationModel ===3"
              :props="keyValue"
              picker-key="cooperationCar"
              :form="formData"
              :columns="columns_cooperationCar2"
              value="name"
              :is-computed="formData['cooperationCar']!=='' && columns_cooperationCar2.length > 0"
              required
              label="合作车型"
              placeholder="请选择"
              :rules="[
                { required: formData.cooperationModel ===3 && formStatus === 2, message: '请选择' },
              ]"
            />

            <selftPicker
              v-show="formData.supplier && formData.cooperationCar && formData.cooperationModel === 1"
              :props="keyValue"
              picker-key="carModel"
              :form="formData"
              :columns="columns_carModel"
              value="name"
              :is-computed="formData['carModel']!=='' && columns_carModel.length > 0"
              required
              label="车辆型号"
              placeholder="请选择"
              :rules="[
                { required: formData.supplier && formData.cooperationCar && formData.cooperationModel === 1 && formStatus === 2, message: '请选择' },
              ]"
            />
            <template>
              <div v-show="formData.cooperationModel !== 3 ">
                <van-field
                  label="车辆信息"
                  :value="formText.describe"
                  required
                  readonly
                  placeholder="车辆信息"
                  colon
                  :rules="[{ required: formData.cooperationModel !== 3 && formStatus === 2, message: '请选择' }]"
                />

                <van-field
                  v-show="formData.supplier && formData.cooperationModel === 1"
                  label="无税车价"
                  placeholder="无税车价"
                  :value="formText.carPrice"
                  required
                  readonly
                  colon
                  :rules="[{ required: formData.supplier && formData.cooperationModel === 1 && formStatus === 2, message: '请选择' }]"
                />
              </div>
            </template>

            <van-field
              v-show="formData.cooperationModel !== 1"
              v-model="formData.plateNo"
              clickable
              label="车牌号"
              required
              :readonly="formStatus !== 2"
              colon
              name="plateNo"
              placeholder="请填写车牌号"
              :rules="[
                { required: formData.cooperationModel !== 1 && formStatus === 2, message: '请填写车牌号' },{pattern:formData.cooperationModel !== 1 && formStatus === 2 ? carNoRegExp : '', message: '请填写正确的车牌号'}
              ]"
            />
          </van-cell-group>
        </div>

        <div v-if="formStatus === 3">
          <van-cell-group>
            <van-cell
              center
              title="支付记录"
              :label="`总支付金额：${ payMoneyed }元`"
            >
              <template #right-icon>
                <span
                  class="addPay"
                  @click="goRouter"
                >添加</span>
              </template>
            </van-cell>
            <div
              v-for="(item,index) in formData.orderPayRecordInfoFORMList"
              :key="index"
            >
              <PayItem
                :obj="item"
                :index="index"
                @delete="deleteItem(index)"
              />
            </div>
          </van-cell-group>
        </div>

        <div
          :key="formStatus"
          class="bottomGroup"
        >
          <div
            class="formStatus"
            v-text="`${formStatus}/3`"
          ></div>
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
        </div>
      </van-form>
    </div>
    <van-popup
      v-model="showPickerDate"
      position="bottom"
    >
      <van-datetime-picker
        v-model="formData[pickerKey]"
        type="date"
        title="选择年月日"
        @confirm="onConfirm1"
        @cancel="showPickerDate = false"
      />
    </van-popup>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { parseTime } from '@/utils';
import { Notify } from 'vant';
import { IdPattern, carNoRegExp } from '@/utils/index';
import { validatorNum } from '@/utils/validate';
import PayItem from './components/PayItem';
import SelftPicker from '@/components/SelfPicker';
import { GetDictionaryList } from '@/api/common.js';
import {
  createOrUpdateOrder,
  orderDetail,
  GetSupplierByTypeAndCity,
  GetRentalCarSupplierByTypeAndCity,
  GetCarTypeByTypeAndCityAndSupplier,
  GetModelByTypeAndCityAndSupplierAndCarType,
  GetRentalCarTypeByParams,
  GetPriceAndByTypeAndCityAndSupplierAndCarType,
  GetPriceAndDescribeByTypeAndCityAndSupplierAndCarTypeAndModel
} from '@/api/order.js';
export default {
  components: {
    PayItem,
    SelftPicker
  },
  data() {
    return {
      keyValue: {
        label: 'name',
        value: 'code'
      },
      showPickerDate: false,
      showPicker: false,
      pickerKey: '',
      formData: {
        cooperationModel: '',
        cooperationTime: '',
        incomeGuarantee: '',
        rake: '7',
        goodsAmount: '',
        inspectionTime: '',
        insuranceTime: '',
        plateNo: '',
        cooperationCar: '',
        busiType: '',
        supplier: '',
        carModel: '',
        productId: '',
        driverInfoFORM: {
          driverId: '',
          idNo: '',
          name: '',
          phone: '',
          workCity: ''
        },
        orderPayRecordInfoFORMList: [],
        driverId: ''
      },
      formText: {
        busiType: '',
        inspectionTime: '',
        insuranceTime: '',
        cooperationModel: '',
        carModel: '',
        cooperationCar: '',
        carPrice: '',
        describe: ''
      },
      columns: [],
      columns_supplier: [],
      columns_carModel: [],
      columns_busiType: [
        { name: '梧桐共享', code: 1 },
        { name: '梧桐专车', code: 0 }
      ],
      columns_cooperationModel: [
        { name: '购车', code: 1 },
        { name: '租车', code: 2 },
        { name: '带车', code: 3 }
      ],
      columns_cooperationCar1: [],
      columns_cooperationCar2: [],
      formStatus: 1,
      workCityName: '',
      routeName: '',
      editors: false,
      id: '',
      editorsCar: false,
      editorsSupplier: false,
      driverId: '',
      orderId: ''
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    operateFlag() {
      if (this.formStatus === 1) {
        if (this.routeName === '/createOrder') {
          return 'step1';
        } else {
          return 'resubmit'
        }
      } else if (this.formStatus === 2) {
        if (this.routeName === '/createOrder') {
          return 'step2';
        } else {
          return 'resubmit'
        }
      } else {
        return 'submit';
      }
    },
    payMoneyed() {
      let money = 0;
      if (this.formData.orderPayRecordInfoFORMList.length > 0) {
        this.formData.orderPayRecordInfoFORMList.map((ele) => {
          money = Number(ele.money) + Number(money);
        });
        return money;
      } else {
        return money;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path !== '/addPay') {
      window.localStorage.removeItem('payItemInfo');
    }
    next();
  },
  watch: {
    'formData.cooperationModel'(value) {
      if (value === 1) {
        this.getCompany('1');
      } else if (value === 2) {
        this.getCompany('2');
      } else {
        if (!this.id) {
          this.formText.cooperationCar = '';
          // this.formData.cooperationCar = '';
          this.formData.carModel = '';
        } else {
          if (this.editors) {
            this.formText.cooperationCar = '';
            // this.formData.cooperationCar = '';
            this.formData.carModel = '';
          }
          this.editors = true;
        }
      }
    },
    'formData.supplier'(value) {
      if (value) {
        this.getCar();
      }
    },
    'formData.cooperationCar'(value) {
      if (
        this.formData.cooperationModel === 1 ||
        this.formData.cooperationModel === 2
      ) {
        if (value) {
          if (this.formData.cooperationModel === 1 && value) {
            this.GetModelByTypeAndCityAndSupplierAndCarType();
          } else if (this.formData.cooperationModel === 2) {
            this.getPrice();
          }
        }
      }
    },
    'formData.carModel'(val) {
      if (val) {
        this.getBuyCarPrice(); // 购车
      }
    }
  },
  created() {
    this.IdPattern = IdPattern;
    this.carNoRegExp = carNoRegExp;
    this.validatorNum = validatorNum;
  },
  mounted() {
    this.updataFrom();
  },
  methods: {
    timeFormat(date, format) {
      return dayjs(date).format(format)
    },
    async getBuyCarPrice() {
      let {
        data
      } = await GetPriceAndDescribeByTypeAndCityAndSupplierAndCarTypeAndModel({
        busType: this.formData.cooperationModel,
        city: this.formData.driverInfoFORM.workCity,
        supplier: this.formData.supplier,
        carType: this.formData.cooperationCar,
        model: this.formData.carModel
      });
      if (data.success) {
        if (data.data) {
          this.formText.carPrice = data.data.price;
          this.formText.describe = data.data.describe;
          this.formData.productId = data.data.productCode;
        }
      } else {
        this.$toast.fail(data);
      }
    },
    async getCompany(str) {
      let res = '';
      if (str === '1') {
        let { data } = await GetSupplierByTypeAndCity({
          busType: this.formData.cooperationModel,
          city: this.formData.driverInfoFORM.workCity
        });
        res = data;
      } else if (str === '2') {
        let { data } = await GetRentalCarSupplierByTypeAndCity({
          busType: this.formData.cooperationModel,
          city: this.formData.driverInfoFORM.workCity
        });
        res = data;
      }

      if (res.success) {
        this.columns_supplier = res.data.map((ele) => {
          return { name: ele, code: ele };
        });
      } else {
        this.$toast.fail(res.errorMsg);
      }
    },
    async getCar() {
      let res = '';
      if (this.formData.cooperationModel === 1) {
        // 购车
        let { data } = await GetCarTypeByTypeAndCityAndSupplier({
          busType: this.formData.cooperationModel,
          city: this.formData.driverInfoFORM.workCity,
          supplier: this.formData.supplier
        });
        res = data;
      } else if (this.formData.cooperationModel === 2) {
        // 租车
        let { data } = await GetRentalCarTypeByParams({
          busType: this.formData.cooperationModel,
          city: this.formData.driverInfoFORM.workCity,
          supplier: this.formData.supplier
        });
        res = data;
      }

      if (res.success) {
        this.columns_cooperationCar1 = res.data.map((ele) => {
          return { name: ele.carTypeName, code: ele.carType };
        });
      } else {
        this.$toast.fail(res.errorMsg);
      }
    },
    async GetModelByTypeAndCityAndSupplierAndCarType() {
      let { data } = await GetModelByTypeAndCityAndSupplierAndCarType({
        busType: this.formData.cooperationModel,
        city: this.formData.driverInfoFORM.workCity,
        supplier: this.formData.supplier,
        carType: this.formData.cooperationCar
      });
      if (data.success) {
        this.columns_carModel = data.data.map((ele) => {
          return { name: ele, code: ele };
        });
      } else {
        this.$toast.fail(data);
      }
    },
    async getPrice() {
      let { data } = await GetPriceAndByTypeAndCityAndSupplierAndCarType({
        busType: this.formData.cooperationModel,
        city: this.formData.driverInfoFORM.workCity,
        supplier: this.formData.supplier,
        carType: this.formData.cooperationCar
      });
      if (data.success) {
        if (data.data) {
          this.formText.carPrice = data.data.price;
          this.formText.describe = data.data.describe;
          this.formData.productId = data.data.productCode;
        }
      } else {
        this.$toast.fail(data);
      }
    },
    updataFrom() {
      this.routeName = this.$route.path;
      const id = this.$route.query.id;
      this.driverId = id
      this.formData.driverId = id
      this.formData.driverInfoFORM.driverId = id;
      this.formData.driverInfoFORM.name = this.$route.query.driverName;
      this.formData.driverInfoFORM.phone = this.$route.query.driverPhone;
      this.formData.driverInfoFORM.workCity = this.$route.query.workCity;
      this.formData.driverInfoFORM.workCityName = this.$route.query.workCityName;
      this.formData.busiType = this.$route.query.busiType
      let orderId = this.$route.query.orderId;
      if (orderId) {
        this.orderId = orderId;
      }
      this.fetchData();
    },
    async fetchData() {
      const { data } = await GetDictionaryList([
        'Intentional_compartment'
      ]);
      if (data.success) {
        this.columns_cooperationCar2 = data.data.Intentional_compartment.map(
          (ele) => {
            return { name: ele.dictLabel, code: Number(ele.dictValue) };
          }
        );
        let payItemInfo = JSON.parse(
          window.localStorage.getItem('payItemInfo')
        );
        if (payItemInfo) {
          this.formData.orderPayRecordInfoFORMList = payItemInfo;
          this.formStatus = 3;
        }
        // this.optionsPay = data.data.pay_type
        // this.columns_busitype = data.data.busi_type.splice(0, 2)
      } else {
        this.$toast.fail(data);
      }
      // if (this.routeName !== '/createOrder') {
      this.getOrderDetail(this.$route.query.id);
      // }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    goRouter() {
      this.$router.push({
        path: '/addPay',
        query: { id: this.formData.driverInfoFORM.driverId, orderId: this.id }
      });
    },
    async getOrderDetail(id) {
      try {
        this.$loading(true);
        let params = {
          driverId: id
        }
        if (this.routeName === '/resetOrder') {
          params.operateFlag = 'detial'
        }
        let { data: res } = await orderDetail(params);
        if (res.success) {
          if (res.data !== null) {
            this.formData = { ...this.formData, ...res.data };
            this.formData.driverInfoFORM.idNo = res.data.driverInfoVO.idNo;
            this.formData.driverInfoFORM = this.formData.driverInfoVO;
            this.formData.driverId = this.driverId
            this.orderId = res.data.orderId
            if (this.formData.orderPayRecordInfoFORMList.length === 0) {
              if (res.data.orderPayRecordInfoVOList !== null) {
                this.formData.orderPayRecordInfoFORMList = [...res.data.orderPayRecordInfoVOList]
              }
            }
            this.formData.inspectionTime = new Date(res.data.inspectionTime).getTime()
            this.formData.insuranceTime = new Date(res.data.insuranceTime).getTime()
            this.formText.inspectionTime = res.data.inspectionTime
            this.formText.insuranceTime = res.data.insuranceTime
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
    async realSubmit() {
      try {
        if (Number(this.payMoneyed) !== Number(this.formData.goodsAmount)) {
          Notify({
            type: 'warning',
            message: '添加的支付金额，不等于商品金额'
          });
          return;
        }
        this.$loading(true);
        let params = {
          cooperationModel: this.formData.cooperationModel,
          cooperationTime: this.formData.cooperationTimenew,
          incomeGuarantee: this.formData.incomeGuarantee,
          rake: this.formData.rake,
          goodsAmount: this.formData.goodsAmount,
          inspectionTime: new Date(this.formData.inspectionTime).getTime(),
          insuranceTime: new Date(this.formData.insuranceTime).getTime(),
          plateNo: this.formData.plateNo,
          cooperationCar: this.formData.cooperationCar,
          busiType: this.formData.busiType,
          supplier: this.formData.supplier,
          carModel: this.formData.carModel,
          productId: this.formData.productId,
          driverInfoFORM: this.formData.driverInfoFORM,
          orderPayRecordInfoFORMList: this.formData.orderPayRecordInfoFORMList,
          orderId: this.orderId,
          driverId: this.driverId,
          havePayAmount: this.payMoneyed
        }
        params.driverInfoFORM.driverId = this.driverId
        params.operateFlag = this.operateFlag;
        let { data: res } = await createOrUpdateOrder(params);
        if (res.success) {
          Notify({ type: 'success', message: '订单录入成功' });
          this.$router.push({ path: '/driverdetail', query: { id: this.driverId }})
          this.$loading(false);
        } else {
          this.$loading(false);
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        this.$loading(false);
        console.log(`fail:${err}`);
      }
    },
    async onSubmit1(values) {
      try {
        console.log(123, 456)
        this.$loading(true);
        let params = {
          cooperationModel: this.formData.cooperationModel,
          cooperationTime: this.formData.cooperationTime,
          incomeGuarantee: this.formData.incomeGuarantee,
          rake: this.formData.rake,
          goodsAmount: this.formData.goodsAmount,
          inspectionTime: new Date(this.formData.inspectionTime).getTime(),
          insuranceTime: new Date(this.formData.insuranceTime).getTime(),
          plateNo: this.formData.plateNo,
          cooperationCar: this.formData.cooperationCar,
          busiType: this.formData.busiType,
          supplier: this.formData.supplier,
          carModel: this.formData.carModel,
          productId: this.formData.productId,
          driverInfoFORM: this.formData.driverInfoFORM,
          orderPayRecordInfoFORMList: this.formData.orderPayRecordInfoFORMList,
          orderId: this.orderId,
          driverId: this.driverId
        }
        params.operateFlag = this.operateFlag;
        let { data: res } = await createOrUpdateOrder(params);
        if (res.success) {
          this.formStatus++;
          console.log(res.data)
          this.orderId = res.data
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
      let timeText = parseTime(time, '{y}/{m}/{d}');
      console.log('timeText', timeText)
      let timeCode = time.getTime();
      this.formText[this.pickerKey] = timeText;
      console.log(this.formData[this.pickerKey], this.pickerKey, timeCode, time)
      this.showPickerDate = false;
    },
    changeDate(key) {
      this.pickerKey = key;
      this.showPickerDate = true;
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
    },
    deleteItem(index) {
      console.log('this.formDatathis.orderPayRecordInfoFORMList', this.formData.orderPayRecordInfoFORMList, index)
      this.formData.orderPayRecordInfoFORMList.splice(index, 1);
      window.localStorage.setItem('payItemInfo', JSON.stringify(this.formData.orderPayRecordInfoFORMList))
    }
  }
};
</script>
<style lang="less" scoped>
.CreateOrder {
  position: relative;
  .formStatus {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid #2f448a;
    color: #2f448a;
    z-index: 99;
    font-size: 13px;
    text-align: center;
    line-height: 40px;
    margin-right: 15px;
    margin-top: 15px;
  }
  .addPay {
    color: #7f8fbd;
  }
  .bottomGroup {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
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
  resetBtn {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-button {
      width: 100% !important;
    }
  }
}
</style>
