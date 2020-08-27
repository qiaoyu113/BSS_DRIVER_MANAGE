<template>
  <div class="TailoredInterview">
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="填写面试表单"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </van-sticky>
    <div class="formBox">
      <van-form :show-error="false" label-width="120px" @submit="onSubmit">
        <van-field
          v-model="username"
          name="司机姓名"
          label="司机姓名"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机姓名' }]"
        />
        <van-field
          readonly
          clickable
          required
          name="邀约方式"
          :value="value"
          label="邀约方式"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field
          readonly
          clickable
          required
          name="picker"
          :value="value"
          label="工作城市"
          placeholder="请选择"
          :rules="[{ required: true, message: '请填写密码' }]"
          @click="showCityPicker = true"
        />
        <van-field
          readonly
          clickable
          required
          name="邀约渠道"
          :value="value"
          label="邀约渠道"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field
          v-model="username"
          name="您是从哪里了解到我们的加盟方式"
          label="您是从哪里了解到我们的加盟方式"
          required
          maxlength="30"
          placeholder="请输入"
          :rules="[{ required: true, message: '请最多填写30个字' }]"
        />
        <van-field
          v-model="username"
          name="重代理姓名"
          label="重代理姓名"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入' }]"
        />
        <van-field
          v-model="username"
          name="司机手机号"
          label="司机手机号"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机手机号' }]"
        />
        <van-field
          v-model="username"
          name="年龄"
          label="年龄"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入0-60之间的数字' }]"
        />
        <van-field
          readonly
          clickable
          required
          name="picker"
          :value="value"
          label="现居住地址"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showAddressPicker = true"
        />
        <van-field
          readonly
          clickable
          required
          name="意向工作区域"
          :value="value"
          label="意向工作区域"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field
          readonly
          clickable
          required
          name="意向配送模式"
          :value="value"
          label="意向配送模式"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field
          readonly
          clickable
          required
          name="意向货物类型"
          :value="value"
          label="意向货物类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field
          readonly
          clickable
          required
          name="意向工作时间段"
          :value="value"
          label="意向工作时间段"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field
          v-model="username"
          label-width="160px"
          name="原收入（去油）（元/月）"
          label="原收入（去油）（元/月）"
          required
          placeholder="请填写0-25000的数字'"
          :rules="[{ required: true, message: '请填写0-25000的数字' }]"
        />
        <van-field
          v-model="username"
          label-width="160px"
          name="期望收入（去油）（元/月）"
          label="期望收入（去油）（元/月）"
          required
          placeholder="请填写0-25000的数字'"
          :rules="[{ required: true, message: '请填写0-25000的数字' }]"
        />
        <van-field
          readonly
          clickable
          required
          name="户籍类型"
          :value="value"
          label="户籍类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field
          readonly
          clickable
          required
          name="户籍地址"
          :value="value"
          label="户籍地址"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showAddressPicker = true"
        />
        <van-field
          v-model="username"
          name="详细地址"
          label="详细地址"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写详细地址' }]"
        />
        <van-field
          readonly
          clickable
          required
          name="子女数"
          :value="value"
          label="子女数"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field
          v-model="username"
          name="货物运输经验（月）"
          label="货物运输经验（月）"
          required
          placeholder="请填写0-500的数字'"
          :rules="[{ required: true, message: '请填写0-500的数字' }]"
        />
        <van-field name="radio" required label="当前是否无业">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
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
          v-model="username"
          name="实际货车驾龄（月）"
          label="实际货车驾龄（月）"
          required
          placeholder="请填写0-500的数字'"
          :rules="[{ required: true, message: '请填写0-500的数字' }]"
        />
        <van-field
          v-model="username"
          label-width="130px"
          name="本城市居住时长（月）"
          label="本城市居住时长（月）"
          required
          placeholder="请填写0-730的数字'"
          :rules="[{ required: true, message: '请填写0-730的数字' }]"
        />
        <van-field
          readonly
          clickable
          required
          name="驾照类型"
          :value="value"
          label="驾照类型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field name="radio" required label="是否有车">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
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
          name="picker"
          :value="value"
          label="当前车型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field
          readonly
          clickable
          required
          name="picker"
          :value="value"
          label="意向驾驶车型"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field
          readonly
          clickable
          required
          name="最大可支付首付款"
          :value="value"
          label="最大可支付首付款"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field name="radio" required label="是否能承担较重搬运">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1">
                是
              </van-radio>
              <van-radio name="2">
                否
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" required label="是否提供个人征信">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
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
          name="picker"
          :value="value"
          label="投资决策权"
          placeholder="投资决策权"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field
          readonly
          clickable
          required
          name="picker"
          :value="value"
          label="如果有机会和云鸟合作，你看中的是什么？"
          placeholder="如果有机会和云鸟合作，你看中的是什么？"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field
          readonly
          clickable
          required
          name="picker"
          :value="value"
          label="最终决定你和云鸟合作的关键因素是什么？"
          placeholder="最终决定你和云鸟合作的关键因素是什么？"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showCityPicker = true"
        />
        <van-field name="radio" required label="是否高意向司机">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
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
          v-model="username"
          rows="2"
          autosize
          label="备注（其他个性化要求，如没有填写无）"
          type="textarea"
          maxlength="100"
          placeholder="请输入留言"
          show-word-limit
        />
        <div style="margin: 16px;">
          <van-button block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <van-popup v-model="showCityPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showCityPicker = false"
      />
    </van-popup>
    <van-popup v-model="showAddressPicker" position="bottom">
      <van-area title="标题" :area-list="areaList" />
    </van-popup>
  </div>
</template>
<script>
import { Toast, Cell, Form, Popup, RadioGroup, Radio } from 'vant';
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
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showCityPicker: false,
      showAddressPicker: false
    };
  },
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
    onConfirm(value) {
      this.value = value;
      this.showCityPicker = false;
    }
  }
};
</script>
<style lang="less" scoped></style>
