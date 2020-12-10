<template>
  <div class="ShareInterview">
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
        :scroll-to-error="true"
        :show-error="false"
        label-width="130"
        @submit="onSubmit"
        @failed="onFailed"
      >
        <self-area
          picker-key="interview"
          :form="area"
          name="interview"
          :props="{provinceAreaName:'interviewProvinceName',cityAreaName:'interviewCityName',countyAreaName:'interviewCountyName'}"
          :is-computed="area.interview.length > 2"
          required
          label="面试地址"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
            { validator:validatorAddress, message: '请选择完整面试地址' }
          ]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="workCity"
          :form="formData"
          :columns="columns_workCity"
          value="name"
          :is-computed="formData['workCity']!=='' && columns_workCity.length > 0 "
          required
          label="工作城市"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
          @changelabel="changeLabel"
        />
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
          v-model.trim="formData.phone"
          name="phone"
          clearable
          label="司机手机号"
          type="tel"
          colon
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入司机手机号！' },{pattern:phonePattern, message: '手机号码格式错误，请重新输入！'},{validator:phonePatternIshas, message: `该手机号已占用！`}]"
          @focus="copyData('phone')"
        />
        <van-field
          v-model.number="formData.age"
          name="age"
          label="年龄"
          maxlength="2"
          type="digit"
          colon
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
          @changelabel="changeLabel"
        />

        <selftPicker
          v-if="formData.hasCar === true"
          :props="keyValue"
          picker-key="currentCarType"
          :form="formData"
          :columns="columns_intentDrivingCarType"
          value="name"
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
          :props="keyValue"
          picker-key="intentDrivingCarType"
          :form="formData"
          :columns="columns_intentDrivingCarType"
          value="name"
          :is-computed="columns_intentDrivingCarType.length > 0 &&formData.intentDrivingCarType!==''"
          required
          label="意向驾驶车型"
          placeholder="请选择"
          :rules="[
            { required: !formData.hasCar, message: '请选择' },
          ]"
          @changelabel="changeLabel"
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
        <van-field
          v-model="formData.experience"
          v-only-number="{min: 0, max: 500, precision: 0}"
          name="货物运输经验(月)"
          clickable
          label="货物运输经验(月)"
          required
          colon
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
          @changelabel="changeLabel"
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
          @changelabel="changeLabel"
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
          @changelabel="changeLabel"
        />
        <selftPicker
          :props="keyValue"
          picker-key="heavyLifting"
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
          @changelabel="changeLabel"
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
          @changelabel="changeLabel"
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
          @changelabel="changeLabel"
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
          picker-key="intentWork"
          :form="area"
          :props="{provinceAreaName:'intentWorkProvinceName',cityAreaName:'intentWorkCityName',countyAreaName:'intentWorkCountyName'}"
          :is-computed="area.intentWork.length > 2"
          required
          label="高意向工作区域"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
            { validator:validatorAddress, message: '请选择完整工作区域' }
          ]"
          @changelabel="changeLabel"
        />
        <van-field
          v-model="formData.originIncomeAvg"
          v-only-number="{min: 0, max: 25000, precision: 0}"
          name="原收入(去油)(元/月)"
          label="原收入(去油)(元/月)"
          required
          colon
          type="digit"
          maxlength="5"
          placeholder="请填写0-25000的数字"
          :rules="[{ required: true, message: '请填写0-25000的数字' },{validator:validatorNum(0,25000), message: '原收入应在0至25000元之间'}]"
          @focus="copyData('originIncomeAvg')"
        />
        <van-field
          v-model="formData.expIncomeAvg"
          v-only-number="{min: 0, max: 25000, precision: 0}"
          name="期望收入(去油)(元/月)"
          label="期望收入(去油)(元/月)"
          required
          colon
          maxlength="5"
          type="digit"
          placeholder="请填写0-25000的数字"
          :rules="[{ required: true, message: '请填写0-25000的数字' },{validator:validatorNum(0,25000), message: '期望收入应在0至25000元之间'}]"
          @focus="copyData('expIncomeAvg')"
        />
        <van-field
          v-model="formData.workDuration"
          v-only-number="{min: 0, max: 500, precision: 0}"
          name="从业时间(月)"
          label="从业时间(月)"
          required
          colon
          maxlength="3"
          type="digit"
          placeholder="请填写0-500的数字"
          :rules="[{ required: true, message: '请填写0-500的数字' },{validator:validatorNum(0,500), message: '从业时间应在0至500个月之间'}]"
        />
        <van-field
          v-model="formData.scatteredJobRate"
          v-only-number="{min: 0, max: 100, precision: 0}"
          name="零散活占比(%)"
          label="零散活占比(%)"
          required
          colon
          maxlength="3"
          type="digit"
          placeholder="请填写0-100的数字"
          :rules="[{ required: true, message: '请填写0-100的数字' },{validator:validatorNum(0,100), message: '零散活占比应在100之间'}]"
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
import { phoneRegExp } from '@/utils/index';
import { validatorNum } from '@/utils/validate';
import { addCach } from '@/utils/mixins.js'
import { Toast, Cell, Form, Popup, RadioGroup, Radio, Notify } from 'vant';
import { GetDictionaryList, getOpenCitys } from '@/api/common';
import SelfArea from '@/components/SelfArea';
import SelftPicker from '@/components/SelfPicker';
import { delay } from '@/utils/index.js';
import {
  shareInterview,
  getInterview,
  unqPhone,
  editInterview
} from '@/api/driver.js';
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
  mixins: [addCach],
  data() {
    return {
      errMsg: '',
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
        liveProvinceName: '',
        liveCityName: '',
        liveCountyName: '',
        interviewProvinceName: '',
        interviewCityName: '',
        interviewCountyName: '',
        intentWorkProvinceName: '',
        intentWorkCityName: '',
        intentWorkCountyName: '',
        intentWork: []
      },
      formData: {
        workCity: '',
        drivingLicenceType: '',
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
      editForm: {},
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
  mounted() {
    this.routeName = this.$route.path;
    this.driverId = this.$route.query.id;
    this.fetchData();
  },
  created() {
    this.phonePattern = phoneRegExp;
    this.validatorNum = validatorNum;
  },
  methods: {
    changeLabel(val) {
      this.copyData(val)
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
    phonePatternIshas(val) {
      // Toast.loading('验证中...');
      return new Promise((resolve) => {
        if (
          this.routeName === '/editShare' &&
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
                  resolve(false);
                  Toast.fail(this.errMsg);
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
      GetDictionaryList([
        'Intentional_compartment',
        'intent_cargo_type',
        'source_channel',
        'driving_licence_type',
        'intent_work_duration'
      ])
        .then(({ data }) => {
          if (data.success) {
            this.columns_intentDrivingCarType = data.data.Intentional_compartment.map(
              (ele) => {
                return { name: ele.dictLabel, code: Number(ele.dictValue) };
              }
            );
            this.columns_intentCargoType = data.data.intent_cargo_type.map(
              (ele) => {
                return { name: ele.dictLabel, code: Number(ele.dictValue) };
              }
            );
            this.columns_sourceChannel = data.data.source_channel.map((ele) => {
              return { name: ele.dictLabel, code: Number(ele.dictValue) };
            });
            this.columns_intentWorkDuration = data.data.intent_work_duration.map(
              (ele) => {
                return { name: ele.dictLabel, code: Number(ele.dictValue) };
              }
            );
            this.columns_drivingLicenceType = data.data.driving_licence_type.map(
              (ele) => {
                return { name: ele.dictLabel, code: Number(ele.dictValue) };
              }
            );
            if (this.routeName === '/editShare') {
              this.getDetail(this.driverId);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      getOpenCitys()
        .then(({ data }) => {
          if (data.success) {
            this.columns_workCity = data.data.map((ele) => {
              return { name: ele.name, code: Number(ele.code) };
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    copyData(value) {
      if (value !== '' && !this.Changed) {
        if (value === 'interview') {
          return
          // 面试地址label回显 更换业务线必定没有面试地址的信息所以不用copy回显
          // this.area.interviewProvinceName = this.editForm.interviewProvinceName;
          // this.area.interviewCityName = this.editForm.interviewCityName;
          // this.area.interviewCountyName = this.editForm.interviewCountyName;
          // this.area.interview = [
          //   String(this.editForm.interviewProvince),
          //   String(this.editForm.interviewCity),
          //   String(this.editForm.interviewCounty)
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
        } else if (value === 'hasCar') {
          if (!this.isChangeCar) {
            this.formData[value] = this.editForm[value]
            this.isChangeCar = true
            return
          }
        } else {
          this.formData[value] = this.editForm[value];
        }
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
      // 面试地址label回显
      this.area.interviewProvinceName = res.data.interviewProvinceName;
      this.area.interviewCityName = res.data.interviewCityName;
      this.area.interviewCountyName = res.data.interviewCountyName;
      // 现居住地址label回显
      this.area.liveProvinceName = res.data.liveProvinceName;
      this.area.liveCityName = res.data.liveCityName;
      this.area.liveCountyName = res.data.liveCountyName;
      // 意向工作地址label回显
      this.area.intentWorkProvinceName = res.data.intentWorkProvinceName;
      this.area.intentWorkCityName = res.data.intentWorkCityName;
      this.area.intentWorkCountyName = res.data.intentWorkCountyName;
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
      this.area.interview = [
        String(areaData.interviewProvince),
        String(areaData.interviewCity),
        String(areaData.interviewCounty)
      ];
    },
    async editShared() {
      let params = { ...this.formData };
      params.liveProvince = this.area.liveaddress[0]; // 居住地
      params.liveCity = this.area.liveaddress[1];
      params.liveCounty = this.area.liveaddress[2];
      params.intentWorkProvince = this.area.intentWork[0]; // 高意向工作地
      params.intentWorkCity = this.area.intentWork[1];
      params.intentWorkCounty = this.area.intentWork[2];
      // 面试地址
      params.interviewCity = this.area.interview[1];
      params.interviewCounty = this.area.interview[2];
      params.interviewProvince = this.area.interview[0];
      params.driverId = this.driverId;
      if (this.formData.hasCar === true) {
        params.intentDrivingCarType = '';
      } else {
        params.currentCarType = '';
      }
      let { data: res } = await editInterview(params);
      if (res.success) {
        this.$bus.$emit('update', '1')
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
    async buildShared() {
      let params = { ...this.formData };
      params.liveProvince = this.area.liveaddress[0]; // 居住地
      params.liveCity = this.area.liveaddress[1];
      params.liveCounty = this.area.liveaddress[2];
      params.intentWorkProvince = this.area.intentWork[0]; // 高意向工作地
      params.intentWorkCity = this.area.intentWork[1];
      params.intentWorkCounty = this.area.intentWork[2];
      // 面试地址
      params.interviewCity = this.area.interview[1];
      params.interviewCounty = this.area.interview[2];
      params.interviewProvince = this.area.interview[0];
      if (this.formData.hasCar === true) {
        params.intentDrivingCarType = '';
      } else {
        params.currentCarType = '';
      }
      let { data: res } = await shareInterview(params);
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
        if (this.routeName === '/editShare') {
          this.editShared();
        } else {
          this.buildShared();
        }
      } catch (err) {
        this.$loading(false);
        console.log(`fail:${err}`);
      }
    },
    onFailed(error) {
      console.log('xxxxx:', error);
    },
    cancelform() {
      Dialog.confirm({
        title: '取消',
        message: '确定要取消吗，取消后表单内容将会清空并返回'
      })
        .then(() => {
          this.$router.go(-1);
        })
        .catch(() => {
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
