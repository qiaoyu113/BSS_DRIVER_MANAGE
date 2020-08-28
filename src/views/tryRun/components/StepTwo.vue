<template>
  <div class="StepTwo">
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="formStr.lineId"
          readonly
          required
          clickable
          is-link
          name="lineId"
          label="到仓接待人："
          placeholder="请选择线路"
          :rules="[{required: true, message: '请选择线路'}]"
          @click="showModal = true"
        />
        <van-field
          v-model="form.value"
          required
          label="手机号："
          name="lineId"
          placeholder="请输入手机号"
          :rules="[{required: true, message: '请输入手机号'}]"
        />
        <van-field
          v-model="form.date"
          readonly
          required
          clickable
          is-link
          name="date"
          label="到仓时间："
          placeholder="请选择时间"
          :rules="[{required: true, message: '请选择时间'}]"
          @click="showPicker = true"
        />
        <van-field
          v-model="form.message"
          rows="2"
          autosize
          label="岗前叮嘱："
          type="textarea"
          maxlength="150"
          placeholder="司机可见/请输入不超过150字"
        />
      </van-cell-group>
    </van-form>
    <!-- picker -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-datetime-picker
        v-model="formStr.date"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
      />
    </van-popup>

    <!-- Suggest -->
    <Suggest
      v-model="showModal"
      :options="options"
      type="selectName"
      @keyWordValue="handleSearchChange"
      @finish="handleValueClick"
      @closed="showModal=false"
    />
  </div>
</template>

<script>
import Suggest from '@/components/SuggestSearch';
import { parseTime } from '@/utils'
export default {
  name: 'StepTwo',
  components: {
    Suggest
  },
  data() {
    return {
      showModal: false,
      showPicker: false,
      minDate: new Date(+new Date() - 86400000 * 365 * 5),
      maxDate: new Date(+new Date() + 86400000 * 365 * 5),
      options: [],
      form: {
        value: '',
        message: '',
        date: ''
      },
      formStr: {
        lineId: '',
        driverId: '',
        date: new Date()
      }
    }
  },
  methods: {
    onSubmit() {},
    onConfirm(value) {
      this.form.date = parseTime(value, '{y}-{m}-{d} {h}:{m}');
      this.showPicker = false;
    },
    handleSearchChange() {},
    handleValueClick() {}
  }
}
</script>

<style>

</style>
