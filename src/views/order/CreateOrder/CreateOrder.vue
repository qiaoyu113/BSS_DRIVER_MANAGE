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
              value="李威山（SJ19980822651）"
              required
              colon
            />
            <van-field
              label="司机电话"
              value="18848885135"
              required
              colon
            />
            <van-field
              label="工作城市："
              value="北京市"
              required
            />
            <van-field
              v-model="formData.personId"
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
              name="bussitype"
              required
              colon
              label="商品分类"
            >
              <template #input>
                <van-radio-group
                  v-model="formData.bussitype"
                  direction="horizontal"
                >
                  <van-radio name="1">
                    梧桐专车
                  </van-radio>
                  <van-radio name="2">
                    梧桐共享
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              name="bussitype"
              required
              colon
              label="合作模式"
            >
              <template #input>
                <van-radio-group
                  v-model="formData.bussitype"
                  direction="horizontal"
                >
                  <van-radio name="1">
                    带车
                  </van-radio>
                  <van-radio name="2">
                    租车
                  </van-radio>
                  <van-radio name="3">
                    购车
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              v-model="formData.hezuo"
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
              v-model="formData.money"
              colon
              clickable
              label="收入保障（元）"
              required
              placeholder="请填写0-999999.99的数字'"
              type="number"
              :rules="[{ required: true, message: '请填写合作期限' },
                       {validator:moneyCheck, message: '请填写正确的数字'}]"
            />
            <van-field
              v-model="formData.bili"
              colon
              clickable
              label="抽佣比例（%）"
              required
              placeholder="请填写0-100的数字'"
              type="number"
              maxlength="5"
              :rules="[{ required: true, message: '请填写合作期限' },
                       {validator:checkPercent, message: '请填写正确的数字'}]"
            />
            <van-field
              v-model="formData.shopmoney"
              colon
              clickable
              label="商品金额（元）"
              required
              placeholder="请填写0-999999.99的数字'"
              type="number"
              :rules="[{ required: true, message: '请填写商品金额' },
                       {validator:moneyCheck, message: '请填写正确的数字'}]"
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
              readonly
              clickable
              :value="formText.nianjian"
              label="年检有效期"
              colon
              placeholder="请选择年检有效期"
              @click="changeDate('nianjian')"
            />
            <van-field
              readonly
              clickable
              colon
              :value="formText.baoxian"
              label="保险有效期"
              placeholder="请选择保险有效期"
              @click="changeDate('baoxian')"
            />
            <van-field
              readonly
              clickable
              colon
              required
              :value="formText.zuli"
              label="租赁公司"
              placeholder="请选择"
              :rules="[{ required: true, message: '请选择' }]"
              @click="showPickerFn('zuli')"
            />
            <van-field
              readonly
              clickable
              colon
              required
              :value="formText.buy"
              label="购车公司"
              placeholder="请选择"
              :rules="[{ required: true, message: '请选择' }]"
              @click="showPickerFn('buy')"
            />
            <van-field
              readonly
              clickable
              colon
              required
              :value="formText.typeCar"
              label="车辆型号"
              placeholder="请选择"
              :rules="[{ required: true, message: '请选择' }]"
              @click="showPickerFn('typeCar')"
            />
            <van-field
              label="车辆信息"
              value="李威山（SJ19980822651）联动处理"
              required
              colon
            />
            <van-field
              label="无税车价"
              value="4355.00元"
              required
              colon
            />
            <van-field
              v-model="formData.carNo"
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
            <van-cell center title="支付记录" label="总支付金额：46000.00元">
              <template #right-icon>
                <span class="addPay" @click="goRouter">添加</span>
              </template>
            </van-cell>
            <div v-for="(item,index) in payList" :key="index">
              <PayItem />
            </div>
          </van-cell-group>
        </div>

        <div class="btnGroup">
          <van-button
            v-if="formStatus !== 1"
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

          <van-button v-if="formStatus === 3" type="primary" native-type="button">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <van-popup v-model="showPickerDate" position="bottom">
      <van-datetime-picker
        v-model="formData.nianjian"
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
    <div class="formStatus" v-text="formStatus"></div>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
import { IdPattern, carNoRegExp } from '@/utils/index';
import { validatorNum } from '@/utils/validate';
import PayItem from './components/PayItem'
export default {
  components: {
    PayItem
  },
  data() {
    return {
      showPickerDate: false,
      showPicker: false,
      payList: [
        1, 2, 3
      ],
      pickerKey: '',
      formData: {
        personId: '',
        bussitype: '1',
        hezuo: '',
        money: '',
        bili: '',
        shopmoney: '',
        nianjian: '',
        baoxian: '',
        carNo: '',
        typeCar: '',
        buy: '',
        zuli: ''
      },
      formText: {
        nianjian: '',
        baoxian: ''
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
      formStatus: 1
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  created() {
    this.IdPattern = IdPattern;
    this.carNoRegExp = carNoRegExp
    this.validatorNum = validatorNum;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    goRouter() {
      this.$router.push({ path: '/addPay', query: { id: '123' }})
    },
    onSubmit1(values) {
      let params = { ...this.formData };
      console.log(params);
      this.formStatus++
    },
    onConfirm1(time) {
      let timeText = parseTime(time, '{y}-{m}-{d}');
      let timeCode = time.getTime()
      this.formText[this.pickerKey] = timeText;
      this.formData[this.pickerKey] = timeCode;
      this.showPickerDate = false;
    },
    changeDate(key) {
      this.pickerKey = key;
      this.showPickerDate = true
    },
    /**
     * picker 选择
     */
    onConfirmPicker(value) {
      this.formText[this.pickerKey] = value.name;
      this.formData[this.pickerKey] = value.code;
      this.showPicker = false;
    },
    /**
     * 显示picker
     */
    showPickerFn(key) {
      this.pickerKey = key;
      switch (key) {
        case 'zuli':
          this.columns = this.columns_zuli;
          break;
        case 'buy':
          this.columns = this.columns_buy;
          break;
        case 'typeCar':
          this.columns = this.columns_typeCar;
          break;
      }
      this.showPicker = true;
    },
    /**
     * 验证收入保障
     */
    moneyCheck(val) {
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
          this.formData.money = arr[0] + '.' + arr2;
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
          this.formData.bili = arr[0] + '.' + arr2[0];
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
    position: absolute;
    right: 50px;
    bottom: 100px;
    text-align: center;
    line-height: 50px;
  }
  .addPay{
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
}
</style>
