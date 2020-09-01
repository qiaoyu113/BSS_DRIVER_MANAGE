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
          v-model="formData.address"
          name="面试地址"
          label="面试地址"
          clearable
          required
          maxlength="32"
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写面试地址' }]"
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
        />
        <van-field
          v-model="formData.driverName"
          name="driverName"
          label="司机姓名"
          clearable
          maxlength="10"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机姓名' }]"
        />
        <van-field
          v-model="formData.driverPhone"
          name="driverPhone"
          clearable
          label="司机手机号"
          type="tel"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机手机号' },{pattern:phonePattern, message: '请输入正确的手机号'}]"
        />
        <van-field
          v-model="formData.driverAge"
          name="driverAge"
          label="年龄"
          maxlength="2"
          type="digit"
          clearable
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写年龄' },{validator:validatorNum(18,60), message: '年龄应在18至60岁之间'}]"
        />
        <van-field
          name="hasCar"
          required
          label="是否有车"
        >
          <template #input>
            <van-radio-group
              v-model="formData.hasCar"
              direction="horizontal"
            >
              <van-radio name="1">
                有
              </van-radio>
              <van-radio name="2">
                无
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-if="formData.hasCar === '1'"
          readonly
          clickable
          required
          name="carType"
          :value="pickerNames.carType"
          label="当前车型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('carType')"
        />
        <van-field
          v-if="formData.hasCar === '1'"
          readonly
          clickable
          required
          name="likeCarType"
          :value="pickerNames.likeCarType"
          label="意向驾驶车型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('likeCarType')"
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
          @click="showAddressPicker = true"
        />
        <van-field
          v-model="formData.express"
          name="货物运输经验（月）"
          clickable
          label="货物运输经验（月）"
          required
          placeholder="请填写0-500的数字'"
          type="digit"
          maxlength="3"
          :rules="[{ required: true, message: '请填写0-500的数字' },
                   {validator:validatorNum(0,500), message: '请填写0-500的数字'}]"
        />
        <van-field
          name="isNoWork"
          required
          label="当前是否无业"
        >
          <template #input>
            <van-radio-group
              v-model="formData.isNoWork"
              direction="horizontal"
            >
              <van-radio name="1">
                有
              </van-radio>
              <van-radio name="2">
                无
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          required
          name="意向货物类型"
          :value="pickerNames.cargoType"
          label="意向货物类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('cargoType')"
        />
        <van-field
          readonly
          clickable
          required
          name="workTime"
          :value="pickerNames.workTime"
          label="意向工作时间段"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('workTime')"
        />
        <van-field
          name="isWeight"
          required
          label="是否能承担较重搬运"
        >
          <template #input>
            <van-radio-group
              v-model="formData.isWeight"
              direction="horizontal"
            >
              <van-radio name="1">
                是
              </van-radio>
              <van-radio name="2">
                否
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          required
          name="邀约渠道"
          :value="pickerNames.comeType"
          label="邀约渠道"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('comeType')"
        />
        <van-field
          readonly
          clickable
          required
          name="驾照类型"
          :value="pickerNames.driveringType"
          label="驾照类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('driveringType')"
        />
        <van-field
          name="isHere"
          required
          label="是否本地工作车牌"
        >
          <template #input>
            <van-radio-group
              v-model="formData.isHere"
              direction="horizontal"
            >
              <van-radio name="1">
                是
              </van-radio>
              <van-radio name="2">
                否
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          required
          name="高意向工作区域"
          :value="pickerNames.liveaddress"
          label="高意向工作区域"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showAddressPicker = true"
        />
        <van-field
          v-model="formData.oldMoney"
          label-width="160px"
          name="原收入（去油）（元/月）"
          label="原收入（去油）（元/月）"
          required
          type="digit"
          maxlength="5"
          placeholder="请填写0-25000的数字'"
          :rules="[{ required: true, message: '请填写0-25000的数字' },{validator:validatorNum(0,25000), message: '原收入应在0至25000元之间'}]"
        />
        <van-field
          v-model="formData.likeMoney"
          label-width="160px"
          name="期望收入（去油）（元/月）"
          label="期望收入（去油）（元/月）"
          required
          maxlength="5"
          type="digit"
          placeholder="请填写0-25000的数字'"
          :rules="[{ required: true, message: '请填写0-25000的数字' },{validator:validatorNum(0,25000), message: '期望收入应在0至25000元之间'}]"
        />
        <van-field
          v-model="formData.comeTime"
          name="从业时间（月）"
          label="从业时间（月）"
          required
          maxlength="3"
          type="digit"
          placeholder="请填写0-500的数字'"
          :rules="[{ required: true, message: '请填写0-500的数字' },{validator:validatorNum(0,500), message: '从业时间应在0至500个月之间'}]"
        />
        <van-field
          v-model="formData.smallWorkInAll"
          name="零散活占比（%）"
          label="零散活占比（%）"
          required
          maxlength="3"
          type="digit"
          placeholder="请填写0-100的数字'"
          :rules="[{ required: true, message: '请填写0-100的数字' },{validator:validatorNum(0,100), message: '零散活占比应在100之间'}]"
        />
        <van-field
          name="isNewEnergy"
          required
          label="是否新能源"
        >
          <template #input>
            <van-radio-group
              v-model="formData.isNewEnergy"
              direction="horizontal"
            >
              <van-radio name="1">
                是
              </van-radio>
              <van-radio name="2">
                否
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
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
import { Toast, Cell, Form, Popup, RadioGroup, Radio } from 'vant';
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
        carType: '',
        likeCarType: '',
        liveaddress: '',
        workTime: '',
        comeType: '',
        cargoType: ''
      },
      formData: {
        address: '',
        workCity: '',
        driverName: '',
        driverPhone: '',
        driverAge: '',
        hasCar: '1',
        cargoType: '',
        carType: '',
        likeCarType: '',
        liveaddress: [],
        express: '',
        isNoWork: '1',
        workTime: '',
        isWeight: '1',
        comeType: '',
        isHere: '1',
        oldMoney: '',
        likeMoney: '',
        comeTime: '',
        smallWorkInAll: '',
        isNewEnergy: '1'
      },
      columns: [],
      showAddressPicker: false,
      columns_workCity: [
        { name: '北京1', code: '123456' },
        { name: '北京2', code: '123456' },
        { name: '北京3', code: '123456' }
      ],
      columns_carType: [
        {
          name: '金杯',
          code: '123'
        },
        {
          name: '金2杯',
          code: '1223'
        }
      ],
      columns_cargoType: [
        {
          name: '水果',
          code: '123'
        },
        {
          name: '家具',
          code: '1223'
        }
      ],
      columns_workTime: [
        {
          name: '12:00-15:00',
          code: '123'
        },
        {
          name: '16:00-23:00',
          code: '1223'
        }
      ],
      columns_comeType: [
        {
          name: '微信朋友圈',
          code: '123'
        },
        {
          name: '同行推荐',
          code: '1223'
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
    this.phonePattern = phoneRegExp;
    this.validatorNum = validatorNum
  },
  methods: {
    onSubmit(values) {
      console.log(this.formData);
      let params = { ...this.formData };
      if (this.formData.hasCar === '2') {
        params.carType = '';
        params.likeCarType = '';
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
        case 'likeCarType':
          this.columns = this.columns_carType;
          break;
        case 'cargoType':
          this.columns = this.columns_cargoType;
          break;
        case 'carType':
          this.columns = this.columns_carType;
          break;
        case 'workTime':
          this.columns = this.columns_workTime;
          break;
        case 'comeType':
          this.columns = this.columns_comeType;
          break;
        case 'driveringType':
          this.columns = this.columns_driveringType;
          break;
      }
      this.showPicker = true;
    },
    /**
     * 地区选则
     */
    onConfirmArea(values) {
      console.log(values);
      this.pickerNames.liveaddress = values.map((item) => item.name).join('/');
      this.formData.liveaddress = values.map((item) => item.code);
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
          this.$router.go(-1)
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss" scoped>
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
