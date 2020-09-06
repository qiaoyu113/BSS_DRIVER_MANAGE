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
        <selftPicker
          picker-key="inviteType"
          :form="formData"
          :columns="columns_inviteType"
          value="dictLabel"
          :is-computed="formData['inviteType']!==''"
          required
          label="邀约方式"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="邀约方式"
          :value="pickerNames.inviteType"
          label="邀约方式"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('inviteType')"
        /> -->
        <selftPicker
          picker-key="workCity"
          :form="formData"
          :columns="columns_workCity"
          value="name"
          :is-computed="formData['workCity']!==''"
          required
          label="工作城市"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="workCity"
          :value="pickerNames.workCity"
          label="工作城市"
          placeholder="请选择"
          :rules="[{ required: true, message: '请填写密码' }]"
          @click="showPickerFn('workCity')"
        /> -->
        <selftPicker
          picker-key="sourceChannel"
          :form="formData"
          :columns="columns_sourceChannel"
          value="dictLabel"
          :is-computed="formData['sourceChannel']!==''"
          required
          label="邀约渠道"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="sourceChannel"
          :value="pickerNames.sourceChannel"
          label="邀约渠道"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('sourceChannel')"
        /> -->
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
        <selftPicker
          picker-key="intentDeliveryMode"
          :form="formData"
          :columns="columns_intentDeliveryMode"
          value="dictLabel"
          :is-computed="formData['intentDeliveryMode']!==''"
          required
          label="意向配送模式"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="intentDeliveryMode"
          :value="pickerNames.intentDeliveryMode"
          label="意向配送模式"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('intentDeliveryMode')"
        /> -->
        <selftPicker
          picker-key="intentCargoType"
          :form="formData"
          :columns="columns_intentCargoType"
          value="dictLabel"
          :is-computed="formData['intentCargoType']!==''"
          required
          label="意向货物类型"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="intentCargoType"
          :value="pickerNames.intentCargoType"
          label="意向货物类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('intentCargoType')"
        /> -->
        <selftPicker
          picker-key="intentWorkDuration"
          :form="formData"
          :columns="columns_intentWorkDuration"
          value="dictLabel"
          :is-computed="formData['intentWorkDuration']!==''"
          required
          label="意向工作时间段"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="intentWorkDuration"
          :value="pickerNames.intentWorkDuration"
          label="意向工作时间段"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('intentWorkDuration')"
        /> -->
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
        <selftPicker
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
        <!-- <van-field
          readonly
          clickable
          required
          name="householdType"
          :value="pickerNames.householdType"
          label="户籍类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('householdType')"
        /> -->
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
        <selftPicker
          picker-key="childNum"
          :form="formData"
          :columns="columns_childNum"
          value="dictLabel"
          :is-computed="formData['childNum']!==''"
          required
          label="子女数"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="childNum"
          :value="pickerNames.childNum"
          label="子女数"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('childNum')"
        /> -->
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
        <selftPicker
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
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="currentHasWork"
          :value="pickerNames.currentHasWork"
          label="当前是否无业"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('currentHasWork')"
        /> -->
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
        <selftPicker
          picker-key="drivingLicenceType"
          :form="formData"
          :columns="columns_drivingLicenceType"
          value="dictLabel"
          :is-computed="formData['drivingLicenceType']!==''"
          required
          label="驾照类型"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="drivingLicenceType"
          :value="pickerNames.drivingLicenceType"
          label="驾照类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('drivingLicenceType')"
        /> -->
        <selftPicker
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
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="hasCar"
          :value="pickerNames.hasCar"
          label="是否有车"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('hasCar')"
        /> -->
        <selftPicker
          v-if="formData.hasCar === '1'"
          picker-key="currentCarType"
          :form="formData"
          :columns="columns_currentCarType"
          value="dictLabel"
          :is-computed="formData['currentCarType']!==''"
          required
          label="当前车型"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          v-if="formData.hasCar === '1'"
          readonly
          clickable
          required
          name="currentCarType"
          :value="pickerNames.currentCarType"
          label="当前车型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('currentCarType')"
        /> -->
        <selftPicker
          picker-key="intentDrivingCarType"
          :form="formData"
          :columns="columns_intentDrivingCarType"
          value="dictLabel"
          :is-computed="formData['intentDrivingCarType']!==''"
          required
          label="意向驾驶车型"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          v-if="formData.hasCar === '0'"
          readonly
          clickable
          required
          name="intentDrivingCarType"
          :value="pickerNames.intentDrivingCarType"
          label="意向驾驶车型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('intentDrivingCarType')"
        /> -->
        <selftPicker
          picker-key="maxAdvancePayment"
          :form="formData"
          :columns="columns_maxAdvancePayment"
          value="dictLabel"
          :is-computed="formData['maxAdvancePayment']!==''"
          required
          label="最大可支付首付款"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="maxAdvancePayment"
          :value="pickerNames.maxAdvancePayment"
          label="最大可支付首付款"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('maxAdvancePayment')"
        /> -->
        <selftPicker
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
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="heavyLifting"
          :value="pickerNames.heavyLifting"
          label="是否能承担较重搬运"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('heavyLifting')"
        /> -->
        <selftPicker
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
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="providePersonalCredit"
          :value="pickerNames.providePersonalCredit"
          label="是否提供个人征信"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('providePersonalCredit')"
        /> -->
        <selftPicker
          picker-key="strategyRight"
          :form="formData"
          :columns="columns_strategyRight"
          value="dictLabel"
          :is-computed="formData['strategyRight']!==''"
          required
          label="投资决策权"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="strategyRight"
          :value="pickerNames.strategyRight"
          label="投资决策权"
          placeholder="投资决策权"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('strategyRight')"
        /> -->
        <selftPicker
          picker-key="cooperateFocusPoint"
          :form="formData"
          :columns="columns_cooperateFocusPoint"
          value="dictLabel"
          :is-computed="formData['cooperateFocusPoint']!==''"
          required
          label="如果有机会和云鸟合作，你看中的是什么？"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="cooperateFocusPoint"
          :value="pickerNames.cooperateFocusPoint"
          label="如果有机会和云鸟合作，你看中的是什么？"
          placeholder="如果有机会和云鸟合作，你看中的是什么？"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('cooperateFocusPoint')"
        /> -->
        <selftPicker
          picker-key="cooperateKeyFactor"
          :form="formData"
          :columns="columns_cooperateKeyFactor"
          value="dictLabel"
          :is-computed="formData['cooperateKeyFactor']!==''"
          required
          label="最终决定你和云鸟合作的关键因素是什么？"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="cooperateKeyFactor"
          :value="pickerNames.cooperateKeyFactor"
          label="最终决定你和云鸟合作的关键因素是什么？"
          placeholder="最终决定你和云鸟合作的关键因素是什么？"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('cooperateKeyFactor')"
        /> -->
        <selftPicker
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
        />
        <!-- <van-field
          readonly
          clickable
          required
          name="isAdvancedIntention"
          :value="pickerNames.isAdvancedIntention"
          label="是否是高意向司机"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('isAdvancedIntention')"
        /> -->
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
        value-key="label"
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
import { specialInterview, getInterview } from '@/api/driver.js'
import { GetDictionaryList, getOpenCitys } from '@/api/common'
import SelftPicker from '@/components/SelfPicker'
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
    SelftPicker
  },
  data() {
    return {
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
      householdAddress: [],
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
        hasCar: '',
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
        { dictLabel: '是', dictValue: 1 },
        { dictLabel: '否', dictValue: 0 }
      ],
      columns: [],
      columns_inviteType: [
        { dictLabel: '电话', dictValue: '123456' },
        { dictLabel: '微信', dictValue: '123456' },
        { dictLabel: '线下', dictValue: '123456' }
      ],
      columns_workCity: [
        { dictLabel: '北京1', dictValue: '123456' },
        { dictLabel: '北京2', dictValue: '123456' },
        { dictLabel: '北京3', dictValue: '123456' }
      ],
      columns_intentDrivingCarType: [
        {
          dictLabel: '金杯',
          dictValue: '123'
        },
        {
          dictLabel: '金2杯',
          dictValue: '1223'
        }
      ],
      columns_intentCargoType: [
        {
          dictLabel: '水果',
          dictValue: '123'
        },
        {
          dictLabel: '家具',
          dictValue: '1223'
        }
      ],
      columns_intentWorkDuration: [
        {
          dictLabel: '12:00-15:00',
          dictValue: '123'
        },
        {
          dictLabel: '16:00-23:00',
          dictValue: '1223'
        }
      ],
      columns_sourceChannel: [
        {
          dictLabel: '微信朋友圈',
          dictValue: '123'
        },
        {
          dictLabel: '同行推荐',
          dictValue: '1223'
        }
      ],
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
      columns_drivingLicenceType: [
        {
          dictLabel: 'C1',
          dictValue: '123'
        },
        {
          dictLabel: 'B1',
          dictValue: '1223'
        }
      ],
      columns_intentDeliveryMode: [
        {
          dictLabel: '配送模式1',
          dictValue: '123'
        },
        {
          dictLabel: '配送模式2',
          dictValue: '1223'
        }
      ],
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
      columns_maxAdvancePayment: [
        {
          dictLabel: '3万',
          dictValue: '123'
        },
        {
          dictLabel: '5万',
          dictValue: '1223'
        },
        {
          dictLabel: '10万',
          dictValue: '1223'
        }
      ],
      columns_currentCarType: [
        {
          dictLabel: '金杯1',
          dictValue: '123'
        },
        {
          dictLabel: '金2杯3',
          dictValue: '1223'
        }
      ],
      columns_strategyRight: [
        {
          dictLabel: '自己拍板',
          dictValue: '123'
        },
        {
          dictLabel: '妻子拍板',
          dictValue: '1223'
        },
        {
          dictLabel: '协商决定',
          dictValue: '1223'
        }
      ],
      columns_cooperateFocusPoint: [
        {
          dictLabel: '稳定货源',
          dictValue: '1223'
        },
        {
          dictLabel: '依靠公司有保障',
          dictValue: '1223'
        }
      ],
      columns_cooperateKeyFactor: [
        {
          dictLabel: '资金',
          dictValue: '1223'
        },
        {
          dictLabel: '对云鸟的信任度',
          dictValue: '1223'
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
      },
      routeName: '',
      editForm: ''
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  watch: {
    'formData.hasCar'(val) {
      if (val === 0) {
        this.formData.currentCarType = '';
        this.pickerNames.currentCarType = ''
      } else {
        this.formData.intentDrivingCarType = '';
        this.pickerNames.intentDrivingCarType = ''
      }
    }
  },
  created() {
    this.validatorNum = validatorNum;
    this.phonePattern = phoneRegExp;
  },
  mounted() {
    this.routeName = this.$route.path;
    this.driverId = this.$route.id;
    this.fetchData()
    if (this.routeName === '/editTailored') {
      this.getDetail(this.driverId);
    }
  },
  methods: {
    fetchData() {
      let params = ['source_channel', 'intent_cargo_type', 'accep_payment_range', 'driving_licence_type', 'invite_type', 'intent_delivery_mode', 'strategy_right', 'cooperate_focus_point', 'cooperate_key_factor', 'intent_work_duration', 'Intentional_compartment']
      GetDictionaryList(params)
        .then(({ data }) => {
          if (data.success) {
            this.columns_carType = data.data.Intentional_compartment
            this.columns_inviteType = data.data.invite_type
            this.columns_sourceChannel = data.data.source_channel
            this.columns_intentDeliveryMode = data.data.intent_delivery_mode
            this.columns_intentCargoType = data.data.intent_cargo_type
            this.columns_intentWorkDuration = data.data.intent_work_duration
            this.columns_drivingLicenceType = data.data.driving_licence_type
            this.columns_intentDrivingCarType = data.data.Intentional_compartment
            this.columns_strategyRight = data.data.strategy_right
            this.columns_cooperateFocusPoint = data.data.cooperate_focus_point
            this.columns_cooperateKeyFactor = data.data.cooperate_key_factor
          }
        }).catch((err) => {
          console.log(err)
        });
      getOpenCitys({})
        .then(({ data }) => {
          if (data.success) {
            this.columns_workCity = data.data;
          }
        }).catch((err) => {
          console.log(err)
        });
    },
    async getDetail(id) {
      try {
        let params = {
          driverId: id
        }
        this.$loading(true)
        let { data: res } = await getInterview(params);
        if (res.success) {
          if (res.data.isChange === false) {
            this.editForm = res.data
          } else {
            this.formData = { ...this.formData, ...res.data }
          }
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`fail:${err}`)
      } finally {
        this.$loading(false)
      }
    },
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
        if (this.formData.hasCar === '0') {
          params.currentCarType = '';
        } else {
          params.intentDrivingCarType = '';
        }
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
      this.pickerNames[this.pickerKey] = values.map((item) => item.dictLabel).join('/');
      this[this.pickerKey] = values.map((item) => item.dictValue);
      this.showAddressPicker = false;
    },
    /**
     * picker 选择
     */
    onConfirmPicker(value) {
      this.pickerNames[this.pickerKey] = value.dictLabel;
      this.formData[this.pickerKey] = value.dictValue;
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
          this.columns = this.columns_drivingLicenceType;
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
        case 'hasCar':
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
        default:
          this.columns = this.isOrNot;
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
