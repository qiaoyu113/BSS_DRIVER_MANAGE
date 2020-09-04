<template>
  <div class="ShareInterview">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </van-sticky>
    <div class="formBox">
      <van-form
        :show-error="false"
        label-width="120px"
        @submit="onSubmit"
      >
        <van-field
          readonly
          clickable
          required
          name="interview"
          :value="pickerNames.interview"
          label="面试地址"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择现居住地址' }]"
          @click="showPickerFnArea('interview')"
          @focus="copyData('interview','select')"
        />
        <van-field
          readonly
          clickable
          required
          name="workCity"
          :value="pickerNames.workCity"
          label="工作城市"
          clearable
          placeholder="请选择"
          :rules="[{ required: true, message: '请填写工作城市' }]"
          @click="showPickerFn('workCity')"
          @focus="copyData('workCity','select')"
        />
        <van-field
          v-model="formData.name"
          name="name"
          label="司机姓名"
          clearable
          maxlength="10"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机姓名' }]"
          @focus="copyData('name')"
        />
        <van-field
          v-model="formData.phone"
          name="phone"
          clearable
          label="司机手机号"
          type="tel"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机手机号' },{pattern:phonePattern, message: '请输入正确的手机号'}]"
          @focus="copyData('phone')"
        />
        <van-field
          v-model="formData.age"
          name="age"
          label="年龄"
          maxlength="2"
          type="digit"
          clearable
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写年龄' },{validator:validatorNum(18,60), message: '年龄应在18至60岁之间'}]"
          @focus="copyData('age')"
        />
        <van-field
          readonly
          clickable
          required
          name="hasCar"
          :value="pickerNames.hasCar"
          label="是否有车"
          clearable
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('hasCar')"
          @focus="copyData('hasCar','select')"
        />
        <van-field
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
          @focus="copyData('currentCarType','select')"
        />
        <van-field
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
          @focus="copyData('currentCarType','select')"
        />
        <van-field
          readonly
          clickable
          required
          name="liveaddress"
          :value="pickerNames.liveaddress"
          label="现居住地址"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择现居住地址' }]"
          @click="showPickerFnArea('liveaddress')"
        />
        <van-field
          v-model="formData.experience"
          name="货物运输经验（月）"
          clickable
          label="货物运输经验（月）"
          required
          placeholder="请填写0-500的数字'"
          type="digit"
          maxlength="3"
          :rules="[{ required: true, message: '请填写0-500的数字' },
                   {validator:validatorNum(0,500), message: '请填写0-500的数字'}]"
          @focus="copyData('experience')"
        />
        <van-field
          readonly
          clickable
          required
          name="currentHasWork"
          :value="pickerNames.currentHasWork"
          label="当前是否无业"
          clearable
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('currentHasWork')"
        />
        <van-field
          readonly
          clickable
          required
          name="意向货物类型"
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
          readonly
          clickable
          required
          name="heavyLifting"
          :value="pickerNames.heavyLifting"
          label="是否能承担较重搬运"
          clearable
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('heavyLifting')"
        />
        <van-field
          readonly
          clickable
          required
          name="邀约渠道"
          :value="pickerNames.sourceChannel"
          label="邀约渠道"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('sourceChannel')"
        />
        <van-field
          readonly
          clickable
          required
          name="驾照类型"
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
          name="isLocalPlate"
          :value="pickerNames.isLocalPlate"
          label="是否本地工作车牌"
          clearable
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('isLocalPlate')"
        />
        <van-field
          readonly
          clickable
          required
          name="高意向工作区域"
          :value="pickerNames.intentWork"
          label="高意向工作区域"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFnArea('intentWork')"
        />
        <van-field
          v-model="formData.originIncomeAvg"
          label-width="160px"
          name="原收入（去油）（元/月）"
          label="原收入（去油）（元/月）"
          required
          type="digit"
          maxlength="5"
          placeholder="请填写0-25000的数字'"
          :rules="[{ required: true, message: '请填写0-25000的数字' },{validator:validatorNum(0,25000), message: '原收入应在0至25000元之间'}]"
          @focus="copyData('originIncomeAvg')"
        />
        <van-field
          v-model="formData.expIncomeAvg"
          label-width="160px"
          name="期望收入（去油）（元/月）"
          label="期望收入（去油）（元/月）"
          required
          maxlength="5"
          type="digit"
          placeholder="请填写0-25000的数字'"
          :rules="[{ required: true, message: '请填写0-25000的数字' },{validator:validatorNum(0,25000), message: '期望收入应在0至25000元之间'}]"
          @focus="copyData('expIncomeAvg')"
        />
        <van-field
          v-model="formData.workDuration"
          name="从业时间（月）"
          label="从业时间（月）"
          required
          maxlength="3"
          type="digit"
          placeholder="请填写0-500的数字'"
          :rules="[{ required: true, message: '请填写0-500的数字' },{validator:validatorNum(0,500), message: '从业时间应在0至500个月之间'}]"
          @focus="copyData('workDuration')"
        />
        <van-field
          v-model="formData.scatteredJobRate"
          name="零散活占比（%）"
          label="零散活占比（%）"
          required
          maxlength="3"
          type="digit"
          placeholder="请填写0-100的数字'"
          :rules="[{ required: true, message: '请填写0-100的数字' },{validator:validatorNum(0,100), message: '零散活占比应在100之间'}]"
          @focus="copyData('scatteredJobRate')"
        />
        <van-field
          readonly
          clickable
          required
          name="isNewEnergy"
          :value="pickerNames.isNewEnergy"
          label="是否新能源"
          clearable
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('isNewEnergy')"
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
    <van-popup
      v-model="showAddressPicker"
      position="bottom"
      round
    >
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
import { phoneRegExp } from '@/utils/index';
import { validatorNum } from '@/utils/validate';
import { Toast, Cell, Form, Popup, RadioGroup, Radio, Notify } from 'vant';
import { shareInterview, getInterview } from '@/api/driver.js'
export default {
  name: 'ShareInterview',
  components: {
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  data() {
    return {
      pickerKey: '',
      showPicker: false,
      pickerNames: {
        workCity: '',
        hasCar: '',
        currentHasWork: '',
        heavyLifting: '',
        currentCarType: '',
        isLocalPlate: '',
        intentDrivingCarType: '',
        liveaddress: '',
        intentWork: '',
        interview: '',
        intentWorkDuration: '',
        sourceChannel: '',
        intentCargoType: '',
        isNewEnergy: ''
      },
      liveaddress: [],
      intentWork: [],
      interview: [],
      formData: {
        workCity: '',
        name: '',
        phone: '',
        age: '',
        hasCar: '',
        intentCargoType: '',
        currentCarType: '',
        intentDrivingCarType: '',
        experience: '',
        currentHasWork: '',
        intentWorkDuration: '',
        heavyLifting: '',
        sourceChannel: '',
        isLocalPlate: '',
        originIncomeAvg: '',
        expIncomeAvg: '',
        workDuration: '',
        scatteredJobRate: '',
        isNewEnergy: '1',
        liveProvince: '', // 居住地
        liveCity: '',
        liveCounty: '',
        liveDistrict: '', // 暂无
        intentWorkProvince: '', // 高意向工作地
        intentWorkCity: '',
        intentWorkCounty: '',
        intentWorkDistrict: '' // 暂无
      },
      columns: [],
      showAddressPicker: false,
      isOrNot: [
        { name: '是', code: '1' },
        { name: '否', code: '0' }
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
      columns_drivingLicenceType: [
        {
          name: 'C1',
          code: '123'
        },
        {
          name: 'B1',
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
      },
      routeName: '',
      driverId: '',
      editForm: {}
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  watch: {
    'formData.hasCar'(val) {
      if (val === '0') {
        this.formData.currentCarType = '';
        this.pickerNames.currentCarType = ''
      } else {
        this.formData.intentDrivingCarType = '';
        this.pickerNames.intentDrivingCarType = ''
      }
    }
  },
  mounted() {
    this.routeName = this.$route.path;
    this.driverId = this.$route.id;
    if (this.routeName === '/editShare') {
      this.getDetail(this.driverId);
    }
  },
  created() {
    this.phonePattern = phoneRegExp;
    this.validatorNum = validatorNum;
  },
  methods: {
    copyData(value) {
      if (value && value !== 0) {
        this.formData[value] = this.editForm[value]
      }
    },
    async getDetail(id) {
      try {
        let params = {
          driverId: id
        }
        this.$loading(true)
        let { data: res } = await getInterview(params);
        if (res.success) {
          this.editForm = res.data
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
        params.liveProvince = this.liveaddress[0]; // 居住地
        params.liveCity = this.liveaddress[1];
        params.liveCounty = this.liveaddress[2];
        params.intentWorkProvince = this.intentWork[0]; // 高意向工作地
        params.intentWorkCity = this.intentWork[1];
        params.intentWorkCounty = this.intentWork[2];
        // 面试地址
        params.interviewCity = this.interview[0]
        params.interviewCounty = this.interview[1]
        params.interviewProvince = this.interview[2]
        if (this.formData.hasCar === '0') {
          params.currentCarType = '';
        } else {
          params.intentDrivingCarType = '';
        }
        console.log(params, 'params');
        let { data: res } = await shareInterview(params);
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
          this.columns = this.columns_intentDrivingCarType;
          break;
        case 'intentWorkDuration':
          this.columns = this.columns_intentWorkDuration;
          break;
        case 'sourceChannel':
          this.columns = this.columns_sourceChannel;
          break;
        case 'drivingLicenceType':
          this.columns = this.columns_drivingLicenceType;
          break;
        default:
          this.columns = this.isOrNot;
      }
      this.showPicker = true;
    },
    showPickerFnArea(key) {
      this.pickerKey = key;
      // switch (key) {
      //   case 'workCity':
      //     this.columns = this.columns_workCity;
      //     break;
      //   case 'intentDrivingCarType':
      //     this.columns = this.columns_intentDrivingCarType;
      //     break;
      // }
      this.showAddressPicker = true;
    },
    /**
     * 地区选则
     */
    onConfirmArea(values) {
      this.pickerNames[this.pickerKey] = values
        .map((item) => item.name)
        .join('/');
      this[this.pickerKey] = values.map((item) => item.code);
      this.showAddressPicker = false;
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
          this.$router.go(-1);
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss" scoped>
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
