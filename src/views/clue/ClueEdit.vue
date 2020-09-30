<template>
  <div class="ClueEdit">
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="编辑"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </van-sticky>
    <div class="formBox">
      <van-form
        :scroll-to-error="true"
        :show-error="false"
        label-width="120px"
        @submit="onSubmit"
        @failed="onFailed"
      >
        <van-field
          v-model="formData.name"
          name="name"
          label="姓名"
          clearable
          maxlength="10"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机姓名' }]"
        />
        <van-field
          v-model="formData.phone"
          name="name"
          label="联系方式"
          clearable
          maxlength="10"
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机姓名' }]"
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
        />
        <selftPicker
          :props="keyValue"
          picker-key="carType"
          :form="formData"
          :columns="columns_carType"
          value="name"
          :is-computed="formData['carType']!=='' && columns_carType.length > 0 "
          required
          label="车型"
          placeholder="请选择"
          :rules="[
            { required: true, message: '请选择' },
          ]"
        />
        <van-field
          v-model="formData.remake"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="100"
          placeholder="请输入留言"
          required
          show-word-limit
        />
      </van-form>
    </div>
  </div>
</template>
<script>
import SelftPicker from '@/components/SelfPicker';
import { clueInfo } from '@/api/clue.js';
export default {
  name: 'ClueEdit',
  components: {
    SelftPicker
  },
  data() {
    return {
      keyValue: {
        label: 'name',
        value: 'code'
      },
      formData: {
        name: '',
        phone: '',
        workCity: '',
        carType: '',
        remake: ''
      },
      columns_workCity: [],
      columns_carType: [],
      clueId: ''
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.clueId = id;
    this.getDetail(id);
  },
  methods: {
    async onSubmit(values) {
      try {
        this.$loading(true);
      } catch (err) {
        this.$loading(false);
        console.log(`fail:${err}`);
      }
    },
    onFailed(error) {
      console.log('xxxxx:', error)
    },
    async getDetail(id) {
      try {
        this.$loading(true);
        let { data: res } = await clueInfo({ clueId: id });
        if (res.success) {
          this.formData = res.data;
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
