<template>
  <div class="StepThireeContainer">
    <van-form ref="stepThree" :show-error="false" @submit="onSubmit">
      <h4 class="title van-hairline--bottom">
        配送时间信息
      </h4>
      <van-field
        v-model="form.a"
        required
        label="货物类型"
        placeholder="请输入"
        :rules="[{ required: true, message: '请输入' }]"
      />
      <van-field
        v-model="form.b"
        label="货物件数"
        type="digit"
        name="numValidator"
        placeholder="请输入"
        :rules="[
          { required: false, message: '请输入' },
          { validator: numValidator, message: '请输入1~999999' }
        ]"
      />
      <!-- 精确小数点后一位 -->
      <van-field
        v-model="form.c"
        required
        label="货物体积"
        name="numValidator"
        type="number"
        placeholder="请输入"
        :rules="[
          { required: true, message: '请输入' },
          { validator: numValidator, message: '请输入1~999999' }
        ]"
      />
      <van-field
        v-model="form.d"
        required
        label="货物重量"
        name="numValidator"
        placeholder="请输入"
        maxlength="10"
        :rules="[
          { required: true, message: '请输入' },
          { validator: numValidator, message: '请输入1~999999' }
        ]"
      />
      <van-field
        v-model="form.e"
        required
        label="货物重量"
        name="numValidator"
        placeholder="请输入"
        maxlength="10"
        :rules="[
          { required: true, message: '请输入' },
          { validator: numValidator, message: '请输入1~999999' }
        ]"
      />
      <van-field
        :value="text1"
        readonly
        clickable
        required
        label-width="100"
        label="是否需要搬运"
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
        v-model="form.remark"
        label-width="100"
        colon
        rows="2"
        autosize
        label="其他上岗要求"
        placeholder="请输入..."
        type="textarea"
        maxlength="300"
        show-word-limit
        class="textarea"
      />
      <div class="btn">
        <van-button type="default" block class="lastStep" native-type="button">
          返回上一步
        </van-button>
        <van-button type="primary" block>
          下一步
        </van-button>
      </div>
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
      text1: '',
      columns1: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 2
        }
      ],
      showPicker1: false
    }
  },
  methods: {
    // 提交
    onSubmit(values) {
      console.log('submit', values);
    },
    // 货物件数
    numValidator(val) {
      if (val >= 1 && val <= 999999) {
        return true
      }
      return false
    },
    // 是否需要搬运
    onConfirm1(obj) {
      this.form.f = obj.value
      this.text1 = obj.label
      this.showPicker1 = false
    }
  }
}

</script>

<style lang='scss' scoped>
.StepThireeContainer {
  font-family: PingFangSC-Medium;
  .title {
    margin: 0px;
    padding: 10px 0px 12.5px 15px;
    font-size: 15px;
    color: #3C4353;
  }
  .btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin:100px 15px 0px;
    width: 345px;
    .lastStep {
      margin-right:5px;
    }
  }
}

</style>
