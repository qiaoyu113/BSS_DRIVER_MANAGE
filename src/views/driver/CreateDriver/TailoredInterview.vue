<template>
  <div class="TailoredInterview">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="cancelform"
      />
    </van-sticky>
    <div class="formBox">
      <van-form
        :show-error="false"
        label-width="130"
        @submit="onSubmit"
      >
        <van-field
          v-model="formData.name"
          name="name"
          label="司机姓名"
          clearable
          maxlength="10"
          required
          colon
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机姓名' }]"
          @focus="copyData('name')"
        />
        <van-field
          id="dirverPhone"
          v-model.trim="formData.phone"
          name="phonePatternIshas"
          label="司机手机号"
          type="tel"
          colon
          clearable
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入司机手机号！' },{pattern:phonePattern, message: '手机号码格式错误，请重新输入！'},{validator:phonePatternIshas, message: '该手机号已占用！'}]"
          @focus="copyData('phone')"
        />
        <selftPicker
          :props="keyValue"
          picker-key="inviteType"
          :form="formData"
          :columns="columns_inviteType"
          value="dictLabel"
          :is-computed="formData['inviteType']!=='' && columns_inviteType.length>0 "
          required
          label="邀约方式"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="workCity"
          :form="formData"
          :columns="columns_workCity"
          value="dictLabel"
          :is-computed="formData['workCity']!=='' && columns_workCity.length > 0 "
          required
          label="工作城市"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        />
        <selftPicker
          :props="keyValue"
          picker-key="sourceChannel"
          :form="formData"
          :columns="columns_sourceChannel"
          value="dictLabel"
          :is-computed="formData['sourceChannel']!=='' && columns_sourceChannel.length>0 "
          required
          label="邀约渠道"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        />
        <van-field
          v-model="formData.whereKnow"
          name="whereKnow"
          label="您是从哪里了解到我们的加盟方式"
          required
          colon
          maxlength="30"
          placeholder="请输入"
          show-word-limit
          :rules="[{ required: true, message: '请最多填写30个字' }]"
        />
        <van-field
          v-model="formData.heavyAgentName"
          name="heavyAgentName"
          label="重代理姓名"
          placeholder="请输入"
          maxlength="10"
          colon
        />

        <van-field
          v-model.number="formData.age"
          name="age"
          colon
          label="年龄"
          required
          maxlength="2"
          type="digit"
          clearable
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入0-60之间的数字' },{validator:validatorNum(18,60), message: '年龄应在18至60岁之间'}]"
          @focus="copyData('age')"
        />
        <self-area
          picker-key="liveaddress"
          :form="area"
          :props="{provinceAreaName:'liveProvinceName',cityAreaName:'liveCityName',countyAreaName:'liveCountyName'}"
          :is-computed="area.liveaddress.length > 2"
          required
          label="现居住地址"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
            { validator:validatorAddress, message: '请选择完整现居住地址' }
          ]"
          @changelabel="changeLabel"
        />
        <self-area
          picker-key="intentWork"
          :form="area"
          :is-computed="area.intentWork.length > 2"
          :props="{provinceAreaName:'intentWorkProvinceName',cityAreaName:'intentWorkCityName',countyAreaName:'intentWorkCountyName'}"
          required
          label="意向工作区域"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
            { validator:validatorAddress, message: '请选择完整工作区域' }
          ]"
          @changelabel="changeLabel"
        />
        <selftPicker
          :props="keyValue"
          picker-key="intentDeliveryMode"
          :form="formData"
          :columns="columns_intentDeliveryMode"
          value="dictLabel"
          :is-computed="formData['intentDeliveryMode']!=='' && columns_intentDeliveryMode.length>0 "
          required
          label="意向配送模式"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="intentCargoType"
          :form="formData"
          :columns="columns_intentCargoType"
          value="dictLabel"
          :is-computed="formData['intentCargoType']!=='' && columns_intentCargoType.length>0 "
          required
          label="意向货物类型"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        />
        <van-field
          name="intentWorkDuration"
          label="意向工作时间段:"
          required
          colon
          :rules="[{ validator: isNotNull, message: '请选择' }]"
        >
          <template #input>
            <van-checkbox-group
              v-model="formData.intentWorkDuration"
              direction="horizontal"
            >
              <van-checkbox :name="1">
                上午
              </van-checkbox>
              <van-checkbox :name="2">
                下午
              </van-checkbox>
              <van-checkbox :name="3">
                晚上
              </van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <!-- <selftPicker
          :props="keyValue"
          picker-key="intentWorkDuration"
          :form="formData"
          :columns="columns_intentWorkDuration"
          value="dictLabel"
          :is-computed="formData['intentWorkDuration']!=='' && columns_intentWorkDuration.length>0 "
          required
          label="意向工作时间段"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        /> -->
        <van-field
          v-model="formData.originIncomeAvg"
          v-only-number="{min: 0, max: 25000, precision: 0}"
          name="原收入(去油)(元/月)"
          label="原收入(去油)(元/月)"
          required
          colon
          placeholder="请填写0-25000的数字"
          :rules="[{ required: true, message: '请填写0-25000的数字' },{validator:validatorNum(0,25000), message: '原收入应在0至25000元之间'}]"
          @focus="copyData('originIncomeAvg')"
        />
        <van-field
          v-model="formData.expIncomeAvg"
          v-only-number="{min: 0, max: 25000, precision: 0}"
          colon
          name="期望收入(去油)(元/月)"
          label="期望收入(去油)(元/月)"
          required
          placeholder="请填写0-25000的数字"
          :rules="[{ required: true, message: '请填写0-25000的数字' },{validator:validatorNum(0,25000), message: '期望收入应在0至25000元之间'}]"
          @focus="copyData('expIncomeAvg')"
        />
        <selftPicker
          :props="keyValue"
          picker-key="householdType"
          :form="formData"
          :columns="columns_householdType"
          value="dictLabel"
          :is-computed="formData['householdType']!==''"
          required
          label="户籍类型"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <self-area
          picker-key="householdAddress"
          :form="area"
          :is-computed="area.householdAddress.length > 2"
          :props="{provinceAreaName:'householdProvinceName',cityAreaName:'householdCityName',countyAreaName:'householdCountyName'}"
          required
          label="户籍地址"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
            { validator:validatorAddress, message: '请选择完整户籍地址' }
          ]"
        />
        <van-field
          v-model.number="formData.householdDistrict"
          name="householdDistrict"
          label="户籍详细地址"
          maxlength="50"
          colon
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写详细地址' }]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="childNum"
          :form="formData"
          :columns="columns_childNum"
          value="dictLabel"
          name="validatorChildNum"
          :is-computed="formData['childNum']!=='' "
          required
          label="子女数"
          placeholder="请选择"
          :rules="[
            { validator:validatorChildNum, message: '请输入正确内容' },
          ]"
        />
        <van-field
          v-model="formData.experience"
          v-only-number="{min: 0, max: 500, precision: 0}"
          name="货物运输经验（月）"
          label="货物运输经验（月）"
          required
          colon
          type="digit"
          maxlength="3"
          placeholder="请填写0-500的数字'"
          :rules="[{ required: true, message: '请填写0-500的数字' },{validator:validatorNum(0,500), message: '请填写0-500的数字'}]"
          @focus="copyData('experience')"
        />
        <selftPicker
          :props="keyValue"
          picker-key="currentHasWork"
          :form="formData"
          :columns="isOrNot"
          value="dictLabel"
          :is-computed="formData['currentHasWork']!==''"
          required
          label="当前是否无业"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        />
        <van-field
          v-model="formData.drivingAge"
          v-only-number="{min: 0, max: 500, precision: 0}"
          name="drivingAge"
          label="实际货车驾龄（月）"
          required
          type="digit"
          colon
          maxlength="3"
          placeholder="请填写0-500的数字'"
          :rules="[{ required: true, message: '请填写0-500的数字' },{validator:validatorNum(0,500), message: '请填写0-500的数字'}]"
        />
        <van-field
          v-model="formData.livingAge"
          v-only-number="{min: 0, max: 730, precision: 0}"
          colon
          name="本城市居住时长（月）"
          label="本城市居住时长（月）"
          required
          type="digit"
          maxlength="3"
          placeholder="请填写0-730的数字'"
          :rules="[{ required: true, message: '请填写0-730的数字' },{validator:validatorNum(0,730), message: '请填写0-730的数字'}]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="drivingLicenceType"
          :form="formData"
          :columns="columns_drivingLicenceType"
          value="dictLabel"
          :is-computed="formData['drivingLicenceType']!=='' && columns_drivingLicenceType.length>0 "
          required
          label="驾照类型"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        />
        <selftPicker
          :props="keyValue"
          picker-key="hasCar"
          :form="formData"
          :columns="isOrNot"
          value="dictLabel"
          :is-computed="formData['hasCar']!==''"
          required
          label="是否有车"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        />

        <selftPicker
          v-if="formData.hasCar === true"
          key="currentCarType"
          :props="keyValue"
          picker-key="currentCarType"
          :form="formData"
          :columns="columns_intentDrivingCarType"
          value="dictLabel"
          :is-computed="columns_intentDrivingCarType.length > 0 &&formData.currentCarType!==''"
          required
          label="当前车型"
          placeholder="请选择"
          :rules="[
            { required: formData.hasCar, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        />

        <selftPicker
          v-if="formData.hasCar === false"
          key="intentDrivingCarType"
          :props="keyValue"
          picker-key="intentDrivingCarType"
          :form="formData"
          :columns="columns_intentDrivingCarType"
          value="dictLabel"
          :is-computed="columns_intentDrivingCarType.length > 0 &&formData.intentDrivingCarType!==''"
          required
          label="意向驾驶车型"
          placeholder="请选择"
          :rules="[
            { required: !formData.hasCar, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        />
        <selftPicker
          :props="keyValue"
          picker-key="maxAdvancePayment"
          :form="formData"
          :columns="columns_maxAdvancePayment"
          value="dictLabel"
          :is-computed="formData.maxAdvancePayment !=='' && columns_maxAdvancePayment.length > 0 "
          required
          label="最大可支付首付款"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="heavyLifting"
          :form="formData"
          :columns="isOrNot"
          value="dictLabel"
          :is-computed="formData['heavyLifting']!==''"
          required
          label="是否能承担较重搬运"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        />
        <selftPicker
          :props="keyValue"
          picker-key="providePersonalCredit"
          :form="formData"
          :columns="isOrNot"
          value="dictLabel"
          :is-computed="formData['providePersonalCredit']!==''"
          required
          label="是否提供个人征信"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        />
        <selftPicker
          :props="keyValue"
          picker-key="strategyRight"
          :form="formData"
          :columns="columns_strategyRight"
          value="dictLabel"
          :is-computed="formData['strategyRight']!=='' && columns_strategyRight.length > 0 "
          required
          label="投资决策权"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="cooperateFocusPoint"
          :form="formData"
          :columns="columns_cooperateFocusPoint"
          value="dictLabel"
          :is-computed="formData['cooperateFocusPoint']!=='' && columns_cooperateFocusPoint.length > 0 "
          required
          label="如果有机会和云鸟合作，你看中的是什么？"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="cooperateKeyFactor"
          :form="formData"
          :columns="columns_cooperateKeyFactor"
          value="dictLabel"
          :is-computed="formData['cooperateKeyFactor']!=='' && columns_cooperateKeyFactor.length > 0 "
          required
          label="最终决定你和云鸟合作的关键因素是什么？"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="isAdvancedIntention"
          :form="formData"
          :columns="isOrNot"
          value="dictLabel"
          :is-computed="formData['isAdvancedIntention']!==''"
          required
          label="是否是高意向司机"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        />
        <van-field
          v-model="formData.remarks"
          rows="2"
          autosize
          colon
          label="备注（其他个性化要求，如没有填写无）"
          type="textarea"
          maxlength="100"
          placeholder="请输入留言"
          required
          show-word-limit
          :rules="[
            { required: true, message: '请填写' },
          ]"
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
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import { Toast, Cell, Form, Popup, RadioGroup, Radio, Notify } from 'vant';
import { validatorNum } from '@/utils/validate';
import { phoneRegExp } from '@/utils/index';
import {
  specialInterview,
  getInterview,
  unqPhone,
  editInterview
} from '@/api/driver.js';
import { GetDictionaryList, getOpenCitys } from '@/api/common';
import SelftPicker from '@/components/SelfPicker';
import SelfArea from '@/components/SelfArea';
import { delay } from '@/utils/index.js';
export default {
  name: 'TailoredInterview',
  components: {
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Notify.Notify]: Notify,
    SelftPicker,
    SelfArea
  },
  data() {
    return {
      errMsg: '',
      keyValue: {
        label: 'dictLabel',
        value: 'dictValue'
      },
      username: '',
      password: '',
      value: '',
      showCityPicker: false,
      showAddressPicker: false,
      pickerKey: '',
      areaPickKey: '',
      showPicker: false,
      liveaddress: [],
      intentWork: [],
      area: {
        liveaddress: [],
        liveProvinceName: '',
        liveCityName: '',
        liveCountyName: '',
        intentWork: [],
        intentWorkProvinceName: '',
        intentWorkCityName: '',
        intentWorkCountyName: '',
        householdAddress: [],
        householdProvinceName: '',
        householdCityName: '',
        householdCountyName: ''
      },
      pickerNames: {
        currentHasWork: '',
        hasCar: '',
        inviteType: '',
        workCity: '',
        sourceChannel: '',
        liveaddress: '',
        intentDeliveryMode: '',
        intentCargoType: '',
        intentWorkDuration: '',
        householdType: '',
        householdAddress: '',
        childNum: '',
        drivingLicenceType: '',
        currentCarType: '',
        intentDrivingCarType: '',
        strategyRight: '',
        heavyLifting: '',
        providePersonalCredit: '',
        isAdvancedIntention: ''
      },
      formData: {
        name: '',
        whereKnow: '',
        inviteType: '',
        sourceChannel: '',
        workCity: '',
        heavyAgentName: '',
        cooperateFocusPoint: '',
        cooperateKeyFactor: '',
        phone: '',
        age: '',
        intentDeliveryMode: '',
        intentCargoType: '',
        intentWorkDuration: [],
        originIncomeAvg: '',
        expIncomeAvg: '',
        householdType: '',
        childNum: '',
        experience: '',
        currentHasWork: '',
        drivingAge: '',
        livingAge: '',
        drivingLicenceType: '',
        hasCar: '',
        currentCarType: '',
        intentDrivingCarType: '',
        heavyLifting: '',
        providePersonalCredit: '',
        maxAdvancePayment: '',
        strategyRight: '',
        isAdvancedIntention: '',
        remarks: '',
        liveProvince: '', // 居住地址
        liveCity: '',
        liveCounty: '',
        liveDistrict: '',
        intentWorkProvince: '', // 意向工作区域
        intentWorkCity: '',
        intentWorkCounty: '',
        intentWorkDistrict: '',
        householdProvince: '', // 户籍地址
        householdCity: '',
        householdCounty: '',
        householdDistrict: ''
      },
      isOrNot: [
        { dictLabel: '是', dictValue: true },
        { dictLabel: '否', dictValue: false }
      ],
      columns: [],
      columns_inviteType: [],
      columns_workCity: [],
      columns_intentDrivingCarType: [],
      columns_intentCargoType: [],
      columns_intentWorkDuration: [],
      columns_sourceChannel: [],
      columns_householdType: [
        {
          dictLabel: '城镇户口',
          dictValue: 2
        },
        {
          dictLabel: '农村户口',
          dictValue: 1
        }
      ],
      columns_drivingLicenceType: [],
      columns_intentDeliveryMode: [],
      columns_childNum: [
        {
          dictLabel: 0,
          dictValue: 0
        },
        {
          dictLabel: 1,
          dictValue: 1
        },
        {
          dictLabel: 2,
          dictValue: 2
        },
        {
          dictLabel: 3,
          dictValue: 3
        }
      ],
      columns_maxAdvancePayment: [],
      columns_currentCarType: [],
      columns_strategyRight: [],
      columns_cooperateFocusPoint: [],
      columns_cooperateKeyFactor: [],
      routeName: '',
      editForm: '',
      phone: '',
      Changed: true,
      isChangeCar: false
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  created() {
    this.validatorNum = validatorNum;
    this.phonePattern = phoneRegExp;
  },
  mounted() {
    this.routeName = this.$route.path;
    this.driverId = this.$route.query.id;
    this.fetchData();
  },
  methods: {
    changeLabel(val) {
      if (val === 'householdAddress' || val === ' liveaddress' || val === 'intentWork') {
        this.copyArea(val)
      } else {
        this.copyData(val)
      }
    },
    validatorAddress(val) {
      let arr = val.split('/');
      if (
        arr[2] === '' ||
        arr[1] === '' ||
        arr.length === 2 ||
        arr.length === 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    copyData(value) {
      if (value !== '' && !this.Changed) {
        if (value === 'hasCar') {
          if (!this.isChangeCar) {
            this.formData[value] = this.editForm[value];
            this.isChangeCar = true;
            return;
          }
        } else {
          this.formData[value] = this.editForm[value];
        }
      }
    },
    copyArea(value) {
      if (value !== '' && !this.Changed) {
        if (value === 'householdAddress') {
          // 户籍地址label不回显
          // this.area.householdProvinceName = this.editForm.householdProvinceName;
          // this.area.householdCityName = this.editForm.householdCityName;
          // this.area.householdCountyName = this.editForm.householdCountyName;
          // this.area.householdAddress = [
          //   String(this.editForm.householdProvince),
          //   String(this.editForm.householdCity),
          //   String(this.editForm.householdCounty)
          // ];
        } else if (value === 'liveaddress') {
          this.area.liveProvinceName = this.editForm.liveProvinceName;
          this.area.liveCityName = this.editForm.liveCityName;
          this.area.liveCountyName = this.editForm.liveCountyName;
          this.area.liveaddress = [
            String(this.editForm.liveProvince),
            String(this.editForm.liveCity),
            String(this.editForm.liveCounty)
          ];
        } else if (value === 'intentWork') {
          // 意向工作地址label回显
          this.area.intentWorkProvinceName = this.editForm.intentWorkProvinceName;
          this.area.intentWorkCityName = this.editForm.intentWorkCityName;
          this.area.intentWorkCountyName = this.editForm.intentWorkCountyName;
          this.area.intentWork = [
            String(this.editForm.intentWorkProvince),
            String(this.editForm.intentWorkCity),
            String(this.editForm.intentWorkCounty)
          ];
        }
      }
    },
    phonePatternIshas(val) {
      // Toast.loading('验证中...');
      return new Promise((resolve) => {
        if (
          this.routeName === '/editTailored' &&
          this.editForm.isChange !== null
        ) {
          if (this.phone === val) {
            resolve(true);
          } else {
            unqPhone({ phone: val }).then(({ data }) => {
              if (data.success) {
                if (data.data.flag) {
                  resolve(true);
                  this.errMsg = '';
                } else {
                  this.errMsg = data.data.msg;
                  Toast.fail(this.errMsg);
                  setTimeout(() => {
                    try {
                      document.querySelector('#dirverPhone').parentElement.nextElementSibling.textContent = data.data.msg
                    } catch (error) {
                      return error
                    }
                  })
                  resolve(false);
                }
              } else {
                this.$toast.fail(data);
                resolve(false);
              }
            });
          }
        } else {
          unqPhone({ phone: val }).then(({ data }) => {
            if (data.success) {
              if (data.data.flag) {
                resolve(true);
                this.errMsg = '';
              } else {
                resolve(false);
                setTimeout(() => {
                  try {
                    document.querySelector('#dirverPhone').parentElement.nextElementSibling.textContent = data.data.msg
                  } catch (error) {
                    return error
                  }
                })
                this.errMsg = data.data.msg;
              }
            } else {
              this.$toast.fail(data);
              resolve(false);
            }
          });
        }
      });
    },
    fetchData() {
      let params = [
        'source_channel',
        'intent_cargo_type',
        'accep_payment_range',
        'driving_licence_type',
        'invite_type',
        'intent_delivery_mode',
        'strategy_right',
        'cooperate_focus_point',
        'cooperate_key_factor',
        'intent_work_duration',
        'Intentional_compartment',
        'accep_payment_range'
      ];
      GetDictionaryList(params)
        .then(({ data }) => {
          if (data.success) {
            this.columns_carType = data.data.Intentional_compartment.map(
              (ele) => {
                return {
                  dictLabel: ele.dictLabel,
                  dictValue: Number(ele.dictValue)
                };
              }
            );
            this.columns_cooperateFocusPoint = data.data.cooperate_focus_point.map(
              (ele) => {
                return {
                  dictLabel: ele.dictLabel,
                  dictValue: Number(ele.dictValue)
                };
              }
            );

            this.columns_cooperateKeyFactor = data.data.cooperate_key_factor.map(
              (ele) => {
                return {
                  dictLabel: ele.dictLabel,
                  dictValue: Number(ele.dictValue)
                };
              }
            );

            this.columns_maxAdvancePayment = data.data.accep_payment_range.map(
              (ele) => {
                return {
                  dictLabel: ele.dictLabel,
                  dictValue: Number(ele.dictValue)
                };
              }
            );

            this.columns_inviteType = data.data.invite_type.map((ele) => {
              return {
                dictLabel: ele.dictLabel,
                dictValue: Number(ele.dictValue)
              };
            });

            this.columns_sourceChannel = data.data.source_channel.map((ele) => {
              return {
                dictLabel: ele.dictLabel,
                dictValue: Number(ele.dictValue)
              };
            });

            this.columns_intentDeliveryMode = data.data.intent_delivery_mode.map(
              (ele) => {
                return {
                  dictLabel: ele.dictLabel,
                  dictValue: Number(ele.dictValue)
                };
              }
            );

            this.columns_intentCargoType = data.data.intent_cargo_type.map(
              (ele) => {
                return {
                  dictLabel: ele.dictLabel,
                  dictValue: Number(ele.dictValue)
                };
              }
            );

            this.columns_intentWorkDuration = data.data.intent_work_duration.map(
              (ele) => {
                return {
                  dictLabel: ele.dictLabel,
                  dictValue: Number(ele.dictValue)
                };
              }
            );

            this.columns_drivingLicenceType = data.data.driving_licence_type.map(
              (ele) => {
                return {
                  dictLabel: ele.dictLabel,
                  dictValue: Number(ele.dictValue)
                };
              }
            );

            this.columns_intentDrivingCarType = data.data.Intentional_compartment.map(
              (ele) => {
                return {
                  dictLabel: ele.dictLabel,
                  dictValue: Number(ele.dictValue)
                };
              }
            );

            this.columns_strategyRight = data.data.strategy_right.map((ele) => {
              return {
                dictLabel: ele.dictLabel,
                dictValue: Number(ele.dictValue)
              };
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      getOpenCitys()
        .then(({ data }) => {
          if (data.success) {
            this.columns_workCity = data.data.map((ele) => {
              return { dictLabel: ele.name, dictValue: Number(ele.code) };
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      if (this.routeName === '/editTailored') {
        setTimeout(() => {
          this.getDetail(this.driverId);
        }, 1000);
      }
    },
    async getDetail(id) {
      try {
        let params = {
          driverId: id
        };
        this.$loading(true);
        let { data: res } = await getInterview(params);
        if (res.success) {
          this.phone = res.data.phone;
          this.areaShow(res);
          var str = String(res.data.intentWorkDuration)
          res.data.intentWorkDuration = str.split(',').map(item => { return Number(item) })
          this.formData.intentWorkDuration = res.data.intentWorkDuration
          if (res.data.isChange !== null) {
            this.Changed = false;
            this.editForm = {
              ...this.formData,
              ...res.data
            };
          } else {
            this.Changed = true;
            this.formData = {
              ...this.formData,
              ...res.data
            };
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
    areaShow(res) {
      if (res.data.isChange !== null) {
        return;
      }
      let areaData = res.data;
      // 现居住地址label回显
      this.area.liveProvinceName = res.data.liveProvinceName;
      this.area.liveCityName = res.data.liveCityName;
      this.area.liveCountyName = res.data.liveCountyName;
      // 意向工作地址label回显
      this.area.intentWorkProvinceName = res.data.intentWorkProvinceName;
      this.area.intentWorkCityName = res.data.intentWorkCityName;
      this.area.intentWorkCountyName = res.data.intentWorkCountyName;
      // 户籍地址label  更改业务线之后不用回显
      this.area.householdProvinceName = res.data.householdProvinceName;
      this.area.householdCityName = res.data.householdCityName;
      this.area.householdCountyName = res.data.householdCountyName;
      this.area.householdAddress = [
        String(areaData.householdProvince),
        String(areaData.householdCity),
        String(areaData.householdCounty)
      ];
      this.area.liveaddress = [
        String(areaData.liveProvince),
        String(areaData.liveCity),
        String(areaData.liveCounty)
      ];
      this.area.intentWork = [
        String(areaData.intentWorkProvince),
        String(areaData.intentWorkCity),
        String(areaData.intentWorkCounty)
      ];
    },
    async editTailored() {
      let params = { ...this.formData };
      params.intentWorkDuration = params.intentWorkDuration.join(',')
      params.liveProvince = this.area.liveaddress[0]; // 居住地址
      params.liveCity = this.area.liveaddress[1];
      params.liveCounty = this.area.liveaddress[2];
      params.intentWorkProvince = this.area.intentWork[0]; // 意向工作区域
      params.intentWorkCity = this.area.intentWork[1];
      params.intentWorkCounty = this.area.intentWork[2];
      params.householdProvince = this.area.householdAddress[0]; // 户籍地址
      params.householdCity = this.area.householdAddress[1];
      params.householdCounty = this.area.householdAddress[2];
      params.driverId = this.driverId;
      if (this.formData.hasCar === true) {
        params.intentDrivingCarType = '';
      } else {
        params.currentCarType = '';
      }
      let { data: res } = await editInterview(params);
      if (res.success) {
        Notify({ type: 'success', message: '编辑面试成功' });
        setTimeout(() => {
          this.$loading(false);
          this.$router.go(-1);
        }, delay);
      } else {
        this.$loading(false);
        this.$toast.fail(res.errorMsg);
      }
    },
    async buildTailore() {
      let params = { ...this.formData };
      params.intentWorkDuration = params.intentWorkDuration.join(',')
      params.liveProvince = this.area.liveaddress[0]; // 居住地址
      params.liveCity = this.area.liveaddress[1];
      params.liveCounty = this.area.liveaddress[2];
      params.intentWorkProvince = this.area.intentWork[0]; // 意向工作区域
      params.intentWorkCity = this.area.intentWork[1];
      params.intentWorkCounty = this.area.intentWork[2];
      params.householdProvince = this.area.householdAddress[0]; // 户籍地址
      params.householdCity = this.area.householdAddress[1];
      params.householdCounty = this.area.householdAddress[2];
      if (this.formData.hasCar === true) {
        params.intentDrivingCarType = '';
      } else {
        params.currentCarType = '';
      }
      let { data: res } = await specialInterview(params);
      if (res.success) {
        Notify({ type: 'success', message: '新建面试成功' });
        setTimeout(() => {
          this.$loading(false);
          this.$router.go(-1);
        }, delay);
      } else {
        this.$loading(false);
        this.$toast.fail(res.errorMsg);
      }
    },
    async onSubmit(values) {
      try {
        this.$loading(true);
        if (this.routeName === '/editTailored') {
          this.editTailored();
        } else {
          this.buildTailore();
        }
      } catch (err) {
        console.log(`fail:${err}`);
        this.$loading(false);
      }
    },
    cancelform() {
      Dialog.confirm({
        title: '取消',
        message: '确定要取消吗，取消后表单内容将会清空并返回'
      })
        .then(() => {
          // on confirm
          this.$router.go(-1);
        })
        .catch(() => {
          // on cancel
        });
    },
    // 校验子女数
    validatorChildNum(val) {
      if (val !== '') {
        return true;
      }
      return false;
    },
    // 验证工作时间
    isNotNull(val) {
      return Array.isArray(val) && Boolean(val.length)
    }
  }
};
</script>
<style lang="less" scoped>
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
</style>
