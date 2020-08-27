<template>
  <div class="ShareInterview">
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="填写面试表单"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </van-sticky>
    <div class="formBox">
      <van-form :show-error="false" @submit="onSubmit">
        <van-field
          v-model="username"
          name="面试地址"
          label="面试地址"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写面试地址' }]"
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
          v-model="username"
          name="司机姓名"
          label="司机姓名"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机姓名' }]"
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
          :rules="[{ required: true, message: '请填写年龄' }]"
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
          label="现居住地址"
          placeholder="请选择"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showAddressPicker = true"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          required
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
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
    <!-- showhasCarPicker -->
  </div>
</template>
<script>
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
