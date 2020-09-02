<template>
  <div class="TailoredInterview">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </van-sticky>
    <div class="formBox">
      <van-form :show-error="false" label-width="120px" @submit="onSubmit">
        <van-field
          v-model="formData.name"
          name="name"
          label="司机姓名"
          clearable
          maxlength="10"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机姓名' }]"
        />
        <van-field
          readonly
          clickable
          required
          name="邀约方式"
          :value="pickerNames.inviteType"
          label="邀约方式"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('inviteType')"
        />
        <van-field
          readonly
          clickable
          required
          name="workCity"
          :value="pickerNames.workCity"
          label="工作城市"
          placeholder="请选择"
          :rules="[{ required: true, message: '请填写密码' }]"
          @click="showPickerFn('workCity')"
        />
        <van-field
          readonly
          clickable
          required
          name="sourceChannel"
          :value="pickerNames.sourceChannel"
          label="邀约渠道"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('sourceChannel')"
        />
        <van-field
          v-model="formData.whereKnow"
          name="whereKnow"
          label="您是从哪里了解到我们的加盟方式"
          required
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
          :rules="[{ required: true, message: '请输入' }]"
        />
        <van-field
          v-model="formData.phone"
          name="phone"
          label="司机手机号"
          type="tel"
          clearable
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机手机号' },{pattern:phonePattern, message: '请输入正确的手机号'}]"
        />
        <van-field
          v-model="formData.age"
          name="age"
          label="年龄"
          required
          maxlength="2"
          type="digit"
          clearable
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入0-60之间的数字' },{validator:validatorNum(18,60), message: '年龄应在18至60岁之间'}]"
        />
        <van-field
          readonly
          clickable
          required
          name="liveaddress"
          :value="pickerNames.liveaddress"
          label="现居住地址"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="areaPickFn('liveaddress')"
        />
        <van-field
          readonly
          clickable
          required
          name="意向工作区域"
          :value="pickerNames.intentWork"
          label="意向工作区域"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="areaPickFn('intentWork')"
        />
        <van-field
          readonly
          clickable
          required
          name="intentDeliveryMode"
          :value="pickerNames.intentDeliveryMode"
          label="意向配送模式"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('intentDeliveryMode')"
        />
        <van-field
          readonly
          clickable
          required
          name="intentCargoType"
          :value="pickerNames.intentCargoType"
          label="意向货物类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('intentCargoType')"
        />
        <van-field
          readonly
          clickable
          required
          name="intentWorkDuration"
          :value="pickerNames.intentWorkDuration"
          label="意向工作时间段"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('intentWorkDuration')"
        />
        <van-field
          v-model="formData.originIncomeAvg"
          label-width="160px"
          name="原收入(去油)(元/月)"
          label="原收入(去油)(元/月)"
          required
          placeholder="请填写0-25000的数字'"
          :rules="[{ required: true, message: '请填写0-25000的数字' },{validator:validatorNum(0,25000), message: '原收入应在0至25000元之间'}]"
        />
        <van-field
          v-model="formData.expIncomeAvg"
          label-width="160px"
          name="期望收入(去油)(元/月)"
          label="期望收入(去油)(元/月)"
          required
          placeholder="请填写0-25000的数字'"
          :rules="[{ required: true, message: '请填写0-25000的数字' },{validator:validatorNum(0,25000), message: '期望收入应在0至25000元之间'}]"
        />
        <van-field
          readonly
          clickable
          required
          name="householdType"
          :value="pickerNames.householdType"
          label="户籍类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('householdType')"
        />
        <van-field
          readonly
          clickable
          required
          name="householdAddress"
          :value="pickerNames.householdAddress"
          label="户籍地址"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="areaPickFn('householdAddress')"
        />
        <van-field
          v-model="formData.householdDistrict"
          name="householdDistrict"
          label="户籍详细地址"
          maxlength="50"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写详细地址' }]"
        />
        <van-field
          readonly
          clickable
          required
          name="childNum"
          :value="pickerNames.childNum"
          label="子女数"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('childNum')"
        />
        <van-field
          v-model="formData.experience"
          name="货物运输经验（月）"
          label="货物运输经验（月）"
          required
          type="digit"
          maxlength="3"
          placeholder="请填写0-500的数字'"
          :rules="[{ required: true, message: '请填写0-500的数字' },{validator:validatorNum(0,500), message: '请填写0-500的数字'}]"
        />
        <van-field
          readonly
          clickable
          required
          name="currentHasWork"
          :value="pickerNames.currentHasWork"
          label="当前是否无业"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('currentHasWork')"
        />
        <van-field
          v-model="formData.drivingAge"
          name="drivingAge"
          label="实际货车驾龄（月）"
          required
          type="digit"
          maxlength="3"
          placeholder="请填写0-500的数字'"
          :rules="[{ required: true, message: '请填写0-500的数字' },{validator:validatorNum(0,500), message: '请填写0-500的数字'}]"
        />
        <van-field
          v-model="formData.livingAge"
          label-width="130px"
          name="本城市居住时长（月）"
          label="本城市居住时长（月）"
          required
          type="digit"
          maxlength="3"
          placeholder="请填写0-730的数字'"
          :rules="[{ required: true, message: '请填写0-730的数字' },{validator:validatorNum(0,730), message: '请填写0-730的数字'}]"
        />
        <van-field
          readonly
          clickable
          required
          name="drivingLicenceType"
          :value="pickerNames.drivingLicenceType"
          label="驾照类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('drivingLicenceType')"
        />
        <van-field
          readonly
          clickable
          required
          name="hasOwnCar"
          :value="pickerNames.hasOwnCar"
          label="是否有车"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('hasOwnCar')"
        />
        <van-field
          v-if="formData.hasOwnCar === '1'"
          readonly
          clickable
          required
          name="currentCarType"
          :value="pickerNames.currentCarType"
          label="当前车型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('currentCarType')"
        />
        <van-field
          v-if="formData.hasOwnCar === '1'"
          readonly
          clickable
          required
          name="intentDrivingCarType"
          :value="pickerNames.intentDrivingCarType"
          label="意向驾驶车型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('intentDrivingCarType')"
        />
        <van-field
          readonly
          clickable
          required
          name="maxAdvancePayment"
          :value="pickerNames.maxAdvancePayment"
          label="最大可支付首付款"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('maxAdvancePayment')"
        />
        <van-field
          readonly
          clickable
          required
          name="heavyLifting"
          :value="pickerNames.heavyLifting"
          label="是否能承担较重搬运"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('heavyLifting')"
        />
        <van-field
          readonly
          clickable
          required
          name="providePersonalCredit"
          :value="pickerNames.providePersonalCredit"
          label="是否提供个人征信"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('providePersonalCredit')"
        />
        <van-field
          readonly
          clickable
          required
          name="strategyRight"
          :value="pickerNames.strategyRight"
          label="投资决策权"
          placeholder="投资决策权"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('strategyRight')"
        />
        <van-field
          readonly
          clickable
          required
          name="cooperateFocusPoint"
          :value="pickerNames.cooperateFocusPoint"
          label="如果有机会和云鸟合作，你看中的是什么？"
          placeholder="如果有机会和云鸟合作，你看中的是什么？"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('cooperateFocusPoint')"
        />
        <van-field
          readonly
          clickable
          required
          name="cooperateKeyFactor"
          :value="pickerNames.cooperateKeyFactor"
          label="最终决定你和云鸟合作的关键因素是什么？"
          placeholder="最终决定你和云鸟合作的关键因素是什么？"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('cooperateKeyFactor')"
        />
        <van-field
          readonly
          clickable
          required
          name="isAdvancedIntention"
          :value="pickerNames.isAdvancedIntention"
          label="是否是高意向司机"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('isAdvancedIntention')"
        />
        <van-field
          v-model="formData.remarks"
          rows="2"
          autosize
          label="备注（其他个性化要求，如没有填写无）"
          type="textarea"
          maxlength="100"
          placeholder="请输入留言"
          show-word-limit
        />
        <div class="btnGroup">
          <van-button color="#2F448A" plain @click="cancelform">
            取消
          </van-button>
          <van-button type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>

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
    <van-popup v-model="showAddressPicker" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="onConfirmArea"
        @cancel="showAddressPicker = false"
      />
    </van-popup>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import { Toast, Cell, Form, Popup, RadioGroup, Radio, Notify } from 'vant';
import { validatorNum } from '@/utils/validate';
import { phoneRegExp } from '@/utils/index';
import { specialInterview } from '@/api/driver.js'
export default {
  name: 'TailoredInterview',
  components: {
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Notify.Notify]: Notify
  },
  data() {
    return {
      username: '',
      password: '',
      value: '',
      radio: '1',
      showCityPicker: false,
      showAddressPicker: false,
      pickerKey: '',
      areaPickKey: '',
      showPicker: false,
      liveaddress: [],
      intentWork: [],
      householdAddress: [],
      pickerNames: {
        currentHasWork: '',
        hasOwnCar: '',
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
        phone: '',
        age: '',
        address: [],
        intentDeliveryMode: '',
        intentCargoType: '',
        intentWorkDuration: '',
        originIncomeAvg: '',
        expIncomeAvg: '',
        householdType: '',
        childNum: '',
        experience: '',
        currentHasWork: '',
        drivingAge: '',
        livingAge: '',
        drivingLicenceType: '',
        hasOwnCar: '',
        currentCarType: '',
        intentDrivingCarType: '',
        heavyLifting: '',
        providePersonalCredit: '',
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
        { name: '是', code: '0' },
        { name: '否', code: '1' }
      ],
      columns: [],
      columns_inviteType: [
        { name: '电话', code: '123456' },
        { name: '微信', code: '123456' },
        { name: '线下', code: '123456' }
      ],
      columns_workCity: [
        { name: '北京1', code: '123456' },
        { name: '北京2', code: '123456' },
        { name: '北京3', code: '123456' }
      ],
      columns_intentDrivingCarType: [
        {
          name: '金杯',
          code: '123'
        },
        {
          name: '金2杯',
          code: '1223'
        }
      ],
      columns_intentCargoType: [
        {
          name: '水果',
          code: '123'
        },
        {
          name: '家具',
          code: '1223'
        }
      ],
      columns_intentWorkDuration: [
        {
          name: '12:00-15:00',
          code: '123'
        },
        {
          name: '16:00-23:00',
          code: '1223'
        }
      ],
      columns_sourceChannel: [
        {
          name: '微信朋友圈',
          code: '123'
        },
        {
          name: '同行推荐',
          code: '1223'
        }
      ],
      columns_householdType: [
        {
          name: '城镇户口',
          code: '1'
        },
        {
          name: '农村户口',
          code: '0'
        }
      ],
      columns_driveringType: [
        {
          name: 'C1',
          code: '123'
        },
        {
          name: 'B1',
          code: '1223'
        }
      ],
      columns_intentDeliveryMode: [
        {
          name: '配送模式1',
          code: '123'
        },
        {
          name: '配送模式2',
          code: '1223'
        }
      ],
      columns_childNum: [
        {
          name: '1',
          code: '123'
        },
        {
          name: '2',
          code: '1223'
        },
        {
          name: '3',
          code: '1223'
        }
      ],
      columns_maxAdvancePayment: [
        {
          name: '3万',
          code: '123'
        },
        {
          name: '5万',
          code: '1223'
        },
        {
          name: '10万',
          code: '1223'
        }
      ],
      columns_currentCarType: [
        {
          name: '金杯1',
          code: '123'
        },
        {
          name: '金2杯3',
          code: '1223'
        }
      ],
      columns_strategyRight: [
        {
          name: '自己拍板',
          code: '123'
        },
        {
          name: '妻子拍板',
          code: '1223'
        },
        {
          name: '协商决定',
          code: '1223'
        }
      ],
      columns_cooperateFocusPoint: [
        {
          name: '稳定货源',
          code: '1223'
        },
        {
          name: '依靠公司有保障',
          code: '1223'
        }
      ],
      columns_cooperateKeyFactor: [
        {
          name: '资金',
          code: '1223'
        },
        {
          name: '对云鸟的信任度',
          code: '1223'
        }
      ],
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区'
          // ....
        }
      }
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
  methods: {
    async onSubmit(values) {
      try {
        this.$loading(true)
        let params = { ...this.formData };
        params.liveProvince = this.liveaddress[0]; // 居住地址
        params.liveCity = this.liveaddress[1];
        params.liveCounty = this.liveaddress[2];
        params.intentWorkProvince = this.intentWork[0];// 意向工作区域
        params.intentWorkCity = this.intentWork[1];
        params.intentWorkCounty = this.intentWork[2];
        params.householdProvince = this.householdAddress[0] // 户籍地址
        params.householdCity = this.householdAddress[1]
        params.householdCounty = this.householdAddress[2]
        if (this.formData.hasOwnCar === '2') {
          params.currentCarType = '';
          params.intentDrivingCarType = '';
        }
        console.log(params, 'params');
        let { data: res } = await specialInterview(params);
        if (res.success) {
          Notify({ type: 'success', message: '面试成功' });
          this.$router.go(-1)
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`fail:${err}`)
      } finally {
        this.$loading(false)
      }
    },
    areaPickFn(key) {
      this.pickerKey = key;
      this.showAddressPicker = true;
    },
    /**
     * 地区选则
     */
    onConfirmArea(values) {
      this.pickerNames[this.pickerKey] = values.map((item) => item.name).join('/');
      this[this.pickerKey] = values.map((item) => item.code);
      this.showAddressPicker = false;
    },
    /**
     * picker 选择
     */
    onConfirmPicker(value) {
      this.pickerNames[this.pickerKey] = value.name;
      this.formData[this.pickerKey] = value.code;
      this.showPicker = false;
    },
    /**
     * 显示picker
     */
    showPickerFn(key) {
      this.pickerKey = key;
      switch (key) {
        case 'workCity':
          this.columns = this.columns_workCity;
          break;
        case 'intentDrivingCarType':
          this.columns = this.columns_intentDrivingCarType;
          break;
        case 'intentCargoType':
          this.columns = this.columns_intentCargoType;
          break;
        case 'currentCarType':
          this.columns = this.columns_currentCarType;
          break;
        case 'intentWorkDuration':
          this.columns = this.columns_intentWorkDuration;
          break;
        case 'sourceChannel':
          this.columns = this.columns_sourceChannel;
          break;
        case 'inviteType':
          this.columns = this.columns_inviteType;
          break;
        case 'drivingLicenceType':
          this.columns = this.columns_driveringType;
          break;
        case 'intentDeliveryMode':
          this.columns = this.columns_intentDeliveryMode;
          break;
        case 'householdType':
          this.columns = this.columns_householdType;
          break;
        case 'childNum':
          this.columns = this.columns_childNum;
          break;
        case 'maxAdvancePayment':
          this.columns = this.columns_maxAdvancePayment;
          break;
        case 'strategyRight':
          this.columns = this.columns_strategyRight;
          break;
        case 'cooperateFocusPoint':
          this.columns = this.columns_cooperateFocusPoint;
          break;
        case 'cooperateKeyFactor':
          this.columns = this.columns_cooperateKeyFactor;
          break;
        case 'currentHasWork':
          this.columns = this.isOrNot;
          break;
        case 'hasOwnCar':
          this.columns = this.isOrNot;
          break;
        case 'isAdvancedIntention':
          this.columns = this.isOrNot;
          break;
        case 'providePersonalCredit':
          this.columns = this.isOrNot;
          break;
        case 'heavyLifting':
          this.columns = this.isOrNot;
          break;
      }
      this.showPicker = true;
    },
    /**
     * 取消
     */
    cancelform() {
      Dialog.confirm({
        title: '取消',
        message: '确定要取消吗，取消后表单内容将会清空并返回'
      })
        .then(() => {
          // on confirm
          this.$router.go(-1)
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="less" scoped>
.btnGroup{
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .van-button{
    width: 48%;
  }
}
</style>
