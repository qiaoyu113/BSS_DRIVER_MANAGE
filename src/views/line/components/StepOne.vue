<template>
  <div class="stepOneContainer">
    <van-form ref="stepOne" :show-error="false" @submit="onSubmit">
      <h4 class="title van-hairline--bottom">
        基础信息
      </h4>
      <van-field
        v-model="form.a"
        required
        label="线路名称"
        placeholder="请输入"
        maxlength="10"
        :rules="[{ required: true, message: '请输入线路名称' }]"
      />
      <van-field
        v-model="form.b"
        required
        label="线路数量"
        placeholder="请输入"
        name="lineNumValidator"
        type="digit"
        :rules="[
          { required: true, message: '请输入线路数量' },
          { validator: lineNumValidator, message: '请输入1~99' }
        ]"
      />
      <van-field
        :value="text1"
        readonly
        clickable
        required
        label-width="100"
        label="是否有线路余额"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPicker1 = true"
      />
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns1"
          @confirm="onConfirm1"
          @cancel="showPicker1 = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        required
        :rules="[
          { required: true, message: '请选择' },
        ]"
        name="calendar"
        :value="text2"
        label="上架截止日期"
        placeholder="点击选择日期"
        @click="showPicker2 = true"
      />
      <van-calendar v-model="showPicker2" @confirm="onConfirm2" />

      <van-field
        :value="text3"
        readonly
        clickable
        required
        label-width="100"
        label="线路稳定性"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPicker3 = true"
      />
      <van-popup v-model="showPicker3" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns3"
          @confirm="onConfirm3"
          @cancel="showPicker3 = false"
        />
      </van-popup>
      <h4 class="title van-hairline--bottom">
        配送信息
      </h4>
      <van-field
        :value="text4"
        readonly
        clickable
        required
        label-width="100"
        label="是否走高速"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPicker4 = true"
      />
      <van-popup v-model="showPicker4" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns4"
          @confirm="onConfirm4"
          @cancel="showPicker4 = false"
        />
      </van-popup>
      <van-field
        :value="text5"
        readonly
        clickable
        required
        label-width="100"
        label="是否需要回单"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPicker5 = true"
      />
      <van-popup v-model="showPicker5" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns5"
          @confirm="onConfirm5"
          @cancel="showPicker5 = false"
        />
      </van-popup>
      <van-field
        :value="text6"
        readonly
        clickable
        required
        label="配送车型"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPicker6 = true"
      />
      <van-popup v-model="showPicker6" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns6"
          @confirm="onConfirm6"
          @cancel="showPicker6 = false"
        />
      </van-popup>
      <van-field
        :value="text7"
        readonly
        clickable
        required
        label="主要配送区域"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPicker7 = true"
      />
      <van-popup v-model="showPicker7" position="bottom">
        <van-area
          :value="form.i[2]"
          :area-list="columns7"
          :columns-placeholder="['请选择', '请选择', '请选择']"
          @confirm="onConfirm7"
          @cancel="showPicker7 = false"
        />
      </van-popup>
      <van-field
        v-model="form.j"
        required
        label="配送点数量"
        placeholder="请输入"
        name="lineNumValidator"
        type="digit"
        :rules="[
          { required: true, message: '请输入' },
          { validator: lineNumValidator, message: '请输入1~99' }
        ]"
      />
      <van-field
        v-model="form.k"
        required
        label="配送总里程数"
        placeholder="请输入"
        name="mileageValidator"
        type="digit"
        :rules="[
          { required: true, message: '请输入' },
          { validator: mileageValidator, message: '请输入1~9999' }
        ]"
      />
      <van-field
        v-model="form.remark"
        label-width="100"
        colon
        rows="2"
        autosize
        label="限行区域说明"
        placeholder="请输入..."
        type="textarea"
        maxlength="300"
        show-word-limit
        class="textarea"
      />
      <van-button type="primary" block class="btn">
        下一步
      </van-button>
    </van-form>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,
      showPicker5: false,
      showPicker6: false,
      showPicker7: false,
      columns1: [
        {
          label: '有余额线路',
          value: 1
        },
        {
          label: '无余额线路',
          value: 0
        }
      ],
      columns3: [
        {
          label: '一个月内（不稳定)',
          value: 1
        },
        {
          label: '两个月内（不稳定）',
          value: 2
        },
        {
          label: '2-4个月（一般稳定）',
          value: 3
        },
        {
          label: '4个月以上（很稳定）',
          value: 4
        }
      ],
      columns4: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ],
      columns5: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ],
      columns6: [],
      columns7: {
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
        }
      },
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',
      text6: '',
      text7: ''
    }
  },
  methods: {
    // 提交
    onSubmit(values) {
      console.log('submit', values);
    },
    // 线路数量校验
    lineNumValidator(val) {
      if (val >= 1 && val <= 99) {
        return true
      }
      return false
    },
    // 配送总里程数
    mileageValidator(val) {
      if (val >= 1 && val <= 9999) {
        return true
      }
      return false
    },
    // 是否有线路余额 ----底部pop选中关闭
    onConfirm1(obj) {
      this.form.c = obj.value
      this.text1 = obj.label
      this.showPicker1 = false
    },
    // 是否有线路余额 ----底部pop选中关闭
    onConfirm2(date) {
      this.text2 = `${date.getMonth() + 1}/${date.getDate()}`;
      this.form.d = date
      this.showPicker2 = false;
    },
    // 线路稳定性 ----底部pop选中关闭
    onConfirm3(obj) {
      this.form.e = obj.value
      this.text3 = obj.label
      this.showPicker3 = false
    },
    // 是否走高速 ----底部pop选中关闭
    onConfirm4(obj) {
      this.form.f = obj.value
      this.text4 = obj.label
      this.showPicker4 = false
    },
    // 是否需要回单 ----底部pop选中关闭
    onConfirm5(obj) {
      this.form.g = obj.value
      this.text5 = obj.label
      this.showPicker5 = false
    },
    // 配送车型 ----底部pop选中关闭
    onConfirm6(obj) {
      this.form.h = obj.value
      this.text6 = obj.label
      this.showPicker6 = false
    },
    // 主要配送区域 ----底部pop选中关闭
    onConfirm7(values) {
      this.form.i = this.value = values.map((item) => item.code)
      this.text7 = this.value = values.map((item) => item.name).join('/');
      this.showPicker7 = false
    },
    // 重置表单
    reset() {
      this.$refs.stepOne.resetValidation()
    }
  }
}

</script>

<style lang='scss' scoped>
.stepOneContainer {
  font-family: PingFangSC-Medium;
  .title {
    margin: 0px;
    padding: 10px 0px 12.5px 15px;
    font-size: 15px;
    color: #3C4353;
  }
  .btn {
    margin:100px 15px 0px;
    width: 345px;
  }
}

</style>

