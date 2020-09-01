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
          readonly
          clickable
          required
          name="邀约方式"
          :value="pickerNames.comeHereType"
          label="邀约方式"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('comeHereType')"
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
          name="comeType"
          :value="pickerNames.comeType"
          label="邀约渠道"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('comeType')"
        />
        <van-field
          v-model="formData.knowUs"
          name="knowUs"
          label="您是从哪里了解到我们的加盟方式"
          required
          maxlength="30"
          placeholder="请输入"
          show-word-limit
          :rules="[{ required: true, message: '请最多填写30个字' }]"
        />
        <van-field
          v-model="formData.managerName"
          name="managerName"
          label="重代理姓名"
          placeholder="请输入"
          maxlength="10"
          :rules="[{ required: true, message: '请输入' }]"
        />
        <van-field
          v-model="formData.driverPhone"
          name="driverPhone"
          label="司机手机号"
          type="tel"
          clearable
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机手机号' },{pattern:phonePattern, message: '请输入正确的手机号'}]"
        />
        <van-field
          v-model="formData.driverAge"
          name="driverAge"
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
          :value="pickerNames.address"
          label="现居住地址"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="areaPickFn('address')"
        />
        <van-field
          readonly
          clickable
          required
          name="意向工作区域"
          :value="pickerNames.liveaddress"
          label="意向工作区域"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="areaPickFn('liveaddress')"
        />
        <van-field
          readonly
          clickable
          required
          name="sendType"
          :value="pickerNames.sendType"
          label="意向配送模式"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('sendType')"
        />
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
          v-model="formData.oldMoney"
          label-width="160px"
          name="原收入（去油）（元/月）"
          label="原收入（去油）（元/月）"
          required
          placeholder="请填写0-25000的数字'"
          :rules="[{ required: true, message: '请填写0-25000的数字' },{validator:validatorNum(0,25000), message: '原收入应在0至25000元之间'}]"
        />
        <van-field
          v-model="formData.likeMoney"
          label-width="160px"
          name="期望收入（去油）（元/月）"
          label="期望收入（去油）（元/月）"
          required
          placeholder="请填写0-25000的数字'"
          :rules="[{ required: true, message: '请填写0-25000的数字' },{validator:validatorNum(0,25000), message: '期望收入应在0至25000元之间'}]"
        />
        <van-field
          readonly
          clickable
          required
          name="户籍类型"
          :value="pickerNames.HouseholdType"
          label="户籍类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('HouseholdType')"
        />
        <van-field
          readonly
          clickable
          required
          name="HouseholdType"
          :value="pickerNames.HouseholdAddress"
          label="户籍地址"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="areaPickFn('HouseholdAddress')"
        />
        <van-field
          v-model="formData.detailAddress"
          name="详细地址"
          label="详细地址"
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
          v-model="formData.express"
          name="货物运输经验（月）"
          label="货物运输经验（月）"
          required
          type="digit"
          maxlength="3"
          placeholder="请填写0-500的数字'"
          :rules="[{ required: true, message: '请填写0-500的数字' },{validator:validatorNum(0,500), message: '请填写0-500的数字'}]"
        />
        <van-field name="isNoWork" required label="当前是否无业">
          <template #input>
            <van-radio-group v-model="formData.isNoWork" direction="horizontal">
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
          v-model="formData.driverTime"
          name="driverTime"
          label="实际货车驾龄（月）"
          required
          type="digit"
          maxlength="3"
          placeholder="请填写0-500的数字'"
          :rules="[{ required: true, message: '请填写0-500的数字' },{validator:validatorNum(0,500), message: '请填写0-500的数字'}]"
        />
        <van-field
          v-model="formData.liveTime"
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
          name="driveringType"
          :value="pickerNames.driveringType"
          label="驾照类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('driveringType')"
        />
        <van-field name="hasCar" required label="是否有车">
          <template #input>
            <van-radio-group v-model="formData.hasCar" direction="horizontal">
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
          name="maxFirstPay"
          :value="pickerNames.maxFirstPay"
          label="最大可支付首付款"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('maxFirstPay')"
        />
        <van-field name="isWeight" required label="是否能承担较重搬运">
          <template #input>
            <van-radio-group v-model="formData.isWeight" direction="horizontal">
              <van-radio name="1">
                是
              </van-radio>
              <van-radio name="2">
                否
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="isSelfCredit " required label="是否提供个人征信">
          <template #input>
            <van-radio-group v-model="formData.isSelfCredit" direction="horizontal">
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
          name="dealforWho"
          :value="pickerNames.dealforWho"
          label="投资决策权"
          placeholder="投资决策权"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('dealforWho')"
        />
        <van-field
          readonly
          clickable
          required
          name="reason"
          :value="pickerNames.reason"
          label="如果有机会和云鸟合作，你看中的是什么？"
          placeholder="如果有机会和云鸟合作，你看中的是什么？"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('reason')"
        />
        <van-field
          readonly
          clickable
          required
          name="picker"
          :value="pickerNames.reason2"
          label="最终决定你和云鸟合作的关键因素是什么？"
          placeholder="最终决定你和云鸟合作的关键因素是什么？"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPickerFn('reason2')"
        />
        <van-field name="isLikeDriver" required label="是否高意向司机">
          <template #input>
            <van-radio-group v-model="formData.isLikeDriver" direction="horizontal">
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
          v-model="formData.reamke"
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
import { Toast, Cell, Form, Popup, RadioGroup, Radio } from 'vant';
import { validatorNum } from '@/utils/validate';
import { phoneRegExp } from '@/utils/index';
export default {
  name: 'TailoredInterview',
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
      username: '',
      password: '',
      value: '',
      radio: '1',
      showCityPicker: false,
      showAddressPicker: false,
      pickerKey: '',
      areaPickKey: '',
      showPicker: false,
      pickerNames: {
        comeHereType: '',
        workCity: '',
        comeType: '',
        address: '',
        liveaddress: '',
        sendType: '',
        cargoType: '',
        workTime: '',
        HouseholdType: '',
        HouseholdAddress: '',
        childNum: '',
        driveringType: '',
        carType: '',
        likeCarType: '',
        dealforWho: ''
      },
      formData: {
        driverName: '',
        knowUs: '',
        comeHereType: '',
        comeType: '',
        workCity: '',
        managerName: '',
        driverPhone: '',
        driverAge: '',
        address: [],
        liveaddress: [],
        sendType: '',
        cargoType: '',
        workTime: '',
        oldMoney: '',
        likeMoney: '',
        HouseholdType: '',
        HouseholdAddress: '',
        detailAddress: '',
        childNum: '',
        express: '',
        isNoWork: '1',
        driverTime: '',
        liveTime: '',
        driveringType: '',
        hasCar: '1',
        carType: '',
        likeCarType: '',
        isWeight: '1',
        isSelfCredit: '1',
        dealforWho: '',
        isLikeDriver: '1',
        reamke: ''
      },
      columns: [],
      columns_comeHereType: [
        { name: '电话', code: '123456' },
        { name: '微信', code: '123456' },
        { name: '线下', code: '123456' }
      ],
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
      columns_HouseholdType: [
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
      columns_sendType: [
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
      columns_maxFirstPay: [
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
      columns_dealforWho: [
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
      columns_reason: [
        {
          name: '稳定货源',
          code: '1223'
        },
        {
          name: '依靠公司有保障',
          code: '1223'
        }
      ],
      columns_reason2: [
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
    onSubmit(values) {
      console.log(this.formData);
      let params = { ...this.formData };
      if (this.formData.hasCar === '2') {
        params.carType = '';
        params.likeCarType = '';
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
      this.formData[this.pickerKey] = values.map((item) => item.code);
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
        case 'comeHereType':
          this.columns = this.columns_comeHereType;
          break;
        case 'driveringType':
          this.columns = this.columns_driveringType;
          break;
        case 'sendType':
          this.columns = this.columns_sendType;
          break;
        case 'HouseholdType':
          this.columns = this.columns_HouseholdType;
          break;
        case 'childNum':
          this.columns = this.columns_childNum;
          break;
        case 'maxFirstPay':
          this.columns = this.columns_maxFirstPay;
          break;
        case 'dealforWho':
          this.columns = this.columns_dealforWho;
          break;
        case 'reason':
          this.columns = this.columns_reason;
          break;
        case 'reason2':
          this.columns = this.columns_reason2;
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
