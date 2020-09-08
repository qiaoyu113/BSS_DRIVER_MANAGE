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
        <self-area
          label-width="100"
          picker-key="interview"
          :form="area"
          :is-computed="area.interview.length > 2"
          required
          label="面试地址"
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
          value="name"
          :is-computed="formData['workCity']!==''"
          required
          label="工作城市"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
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
        <selftPicker
          picker-key="hasCar"
          :form="formData"
          :columns="isOrNot"
          value="name"
          :props="keyValue"
          :is-computed="formData['hasCar']!==''"
          required
          label="是否有车"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <selftPicker
          v-show="formData.hasCar === true"
          :props="keyValue"
          picker-key="currentCarType"
          :form="formData"
          :columns="columns_intentDrivingCarType"
          value="name"
          :is-computed="formData.hasCar"
          required
          label="当前车型"
          placeholder="请选择"
          :rules="[
            { required: formData.hasCar, message: '请选择' },
          ]"
        />
        <selftPicker
          v-show="formData.hasCar === false"
          :props="keyValue"
          picker-key="intentDrivingCarType"
          :form="formData"
          :columns="columns_intentDrivingCarType"
          value="name"
          :is-computed="!formData.hasCar"
          required
          label="意向驾驶车型"
          placeholder="请选择"
          :rules="[
            { required: !formData.hasCar, message: '请选择' },
          ]"
        />
        <self-area
          label-width="100"
          picker-key="liveaddress"
          :form="area"
          :is-computed="area.liveaddress.length > 2"
          required
          label="现居住地址"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
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
        <selftPicker
          :props="keyValue"
          picker-key="currentHasWork"
          :form="formData"
          :columns="isOrNot"
          value="name"
          :is-computed="formData['currentHasWork']!==''"
          required
          label="当前是否无业"
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
          value="name"
          :is-computed="formData['intentCargoType']!==''"
          required
          label="意向货物类型"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="intentWorkDuration"
          :form="formData"
          :columns="columns_intentWorkDuration"
          value="name"
          :is-computed="formData['intentWorkDuration']!==''"
          required
          label="意向工作时间段"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="heavyLifting"
          label-width="150px"
          :form="formData"
          :columns="isOrNot"
          value="name"
          :is-computed="formData['heavyLifting']!==''"
          required
          label="是否能承担较重搬运"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="sourceChannel"
          :form="formData"
          :columns="columns_sourceChannel"
          value="name"
          :is-computed="formData['sourceChannel']!==''"
          required
          label="邀约渠道"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="drivingLicenceType"
          :form="formData"
          :columns="columns_drivingLicenceType"
          value="name"
          :is-computed="formData['drivingLicenceType']!==''"
          required
          label="驾照类型"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="isLocalPlate"
          :form="formData"
          :columns="isOrNot"
          value="name"
          :is-computed="formData['isLocalPlate']!==''"
          required
          label="是否本地工作车牌"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <self-area
          label-width="100"
          picker-key="intentWork"
          :form="area"
          :is-computed="area.intentWork.length > 2"
          required
          label="高意向工作区域"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
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
        <selftPicker
          :props="keyValue"
          picker-key="isNewEnergy"
          :form="formData"
          :columns="isOrNot"
          value="name"
          :is-computed="formData['isNewEnergy']!==''"
          required
          label="是否新能源"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
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
            type="primary"
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
import { GetDictionaryList, getOpenCitys } from '@/api/common'
import SelfArea from '@/components/SelfArea'
import SelftPicker from '@/components/SelfPicker'
import { shareInterview, getInterview } from '@/api/driver.js'
export default {
  name: 'ShareInterview',
  components: {
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    SelftPicker,
    SelfArea
  },
  data() {
    return {
      keyValue: {
        label: 'name',
        value: 'code'
      },
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
      area: {
        liveaddress: [],
        interview: [],
        intentWork: []
      },
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
        isNewEnergy: '',
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
        { name: '是', code: true },
        { name: '否', code: false }
      ],
      columns_workCity: [],
      columns_intentDrivingCarType: [],
      columns_currentCarType: [],
      columns_intentCargoType: [],
      columns_intentWorkDuration: [],
      columns_sourceChannel: [],
      columns_drivingLicenceType: [],
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
      if (val === true) {
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
    this.driverId = this.$route.query.id;
    this.fetchData();
    if (this.routeName === '/editShare') {
      this.getDetail(this.driverId);
    }
  },
  created() {
    this.phonePattern = phoneRegExp;
    this.validatorNum = validatorNum;
  },
  methods: {
    fetchData() {
      GetDictionaryList(['Intentional_compartment', 'intent_cargo_type', 'source_channel', 'driving_licence_type', 'intent_work_duration'])
        .then(({ data }) => {
          if (data.success) {
            this.columns_intentDrivingCarType = data.data.Intentional_compartment.map(ele => {
              return { name: ele.dictLabel, code: ele.dictValue }
            })
            this.columns_intentCargoType = data.data.intent_cargo_type.map(ele => {
              return { name: ele.dictLabel, code: ele.dictValue }
            })
            this.columns_sourceChannel = data.data.source_channel.map(ele => {
              return { name: ele.dictLabel, code: ele.dictValue }
            })
            this.columns_intentWorkDuration = data.data.intent_work_duration.map(ele => {
              return { name: ele.dictLabel, code: ele.dictValue }
            })
            this.columns_drivingLicenceType = data.data.driving_licence_type.map(ele => {
              return { name: ele.dictLabel, code: ele.dictValue }
            })
          }
        }).catch((err) => {
          console.log(err)
        });
      getOpenCitys()
        .then(({ data }) => {
          if (data.success) {
            this.columns_workCity = data.data;
          }
        }).catch((err) => {
          console.log(err)
        });
    },
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
          console.log(res.data.isChange)
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
      console.log(values)
      try {
        this.$loading(true)
        let params = { ...this.formData };
        params.liveProvince = this.area.liveaddress[0]; // 居住地
        params.liveCity = this.area.liveaddress[1];
        params.liveCounty = this.area.liveaddress[2];
        params.intentWorkProvince = this.area.intentWork[0]; // 高意向工作地
        params.intentWorkCity = this.area.intentWork[1];
        params.intentWorkCounty = this.area.intentWork[2];
        // 面试地址
        params.interviewCity = this.area.interview[0]
        params.interviewCounty = this.area.interview[1]
        params.interviewProvince = this.area.interview[2]
        if (this.formData.hasCar === true) {
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
          this.columns = this.columns_currentCarType;
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
