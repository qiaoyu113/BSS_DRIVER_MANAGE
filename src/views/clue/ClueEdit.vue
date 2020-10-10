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
          placeholder="请输入"
        />
        <van-field
          v-model="formData.phone"
          name="phone"
          label="联系方式"
          clearable
          required
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写司机姓名' },
                   {pattern:phonePattern, message: '请输入正确的手机号'}]"
        />
        <selftPicker
          :props="keyValue"
          picker-key="workCity"
          :form="formData"
          :columns="columns_workCity"
          value="dictLabel"
          name="workCity"
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
          name="carType"
          :columns="columns_carType"
          value="dictLabel"
          :is-computed="formData['carType']!=='' && columns_carType.length > 0 "
          label="车型"
          placeholder="请选择"
        />
        <van-field
          v-model="formData.remake"
          rows="2"
          autosize
          name="remake"
          label="备注"
          type="textarea"
          maxlength="100"
          placeholder="请输入,最多可填写100字"
          show-word-limit
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
          <van-button type="primary" native-type="submit">
            确定
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { phoneRegExp } from '@/utils/index';
import SelftPicker from '@/components/SelfPicker';
import { Notify } from 'vant';
import { getOpenCitys, getDictData } from '@/api/common.js';
import { clueInfo, clueEdit } from '@/api/clue.js';
export default {
  name: 'ClueEdit',
  components: {
    SelftPicker
  },
  data() {
    return {
      keyValue: {
        label: 'dictLabel',
        value: 'dictValue'
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
  created() {
    this.phonePattern = phoneRegExp;
  },
  mounted() {
    this.fetchData()
    let id = this.$route.query.id;
    this.clueId = id;
    this.getDetail(id);
  },
  methods: {
    async fetchData() {
      let { data: cityRes } = await getOpenCitys({})
      if (cityRes.success) {
        this.columns_workCity = cityRes.data.map(ele => {
          return ({
            dictLabel: ele.name,
            dictValue: +ele.code
          })
        })
      }
      let { data: carRes } = await getDictData({ dictType: 'Intentional_compartment' })
      if (carRes.success) {
        this.columns_carType = carRes.data.map(ele => {
          return ({
            dictLabel: ele.dictLabel,
            dictValue: +ele.dictValue
          })
        })
      }
    },
    async onSubmit(values) {
      try {
        this.$loading(true);
        let params = {}
        this.formData.name && (params.name = this.formData.name)
        this.formData.phone && (params.phone = this.formData.phone)
        this.formData.workCity && (params.workCity = this.formData.workCity)
        this.formData.carType && (params.carType = this.formData.carType)
        this.formData.remake && (params.remake = this.formData.remake)
        params.clueId = this.clueId
        let { data: res } = await clueEdit(params);
        if (res.success) {
          Notify({ type: 'success', message: '线索编辑成功' });
          this.$router.go(-1)
        } else {
          this.$toast.fail(res.errorMsg);
        }
        this.$loading(false);
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
    },
    cancelform() {
    //   Dialog.confirm({
    //     title: '返回',
    //     message: '是否要退出编辑'
    //   })
    //     .then(() => {
    //       // on confirm
      this.$router.go(-1)
    //     })
    //     .catch(() => {
    //       // on cancel
    //     });
    }
  }
}
</script>
<style lang="less" scoped>
.ClueEdit{
  position: relative;
}
.btnGroup {
  position: absolute;
  left: 0;
  bottom: 0;
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
