<template>
  <div class="StepThireeContainer">
    <van-form ref="stepThree" :show-error="false" @submit="onSubmit">
      <h4 class="title van-hairline--bottom">
        货物信息
      </h4>
      <selftPicker
        picker-key="cargoType"
        :form="form"
        :columns="cargoTypeArr"
        value="label"
        :is-computed="form['cargoType']!==''&&cargoTypeArr.length > 0"
        required
        label-width="100"
        label="货物类型"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择货物类型！' },
        ]"
      />
      <van-field
        v-model.number="form.cargoNum"
        label-width="100"
        colon
        label="货物件数"
        type="digit"
        name="cargoNumValidator"
        placeholder="请输入"
        :rules="[
          { required: false, message: '请输入货物件数！' },
          { validator: cargoNumValidator, message: '请输入1~999999' }
        ]"
      />
      <!-- 精确小数点后一位 -->

      <van-field
        v-model.number="form.volume"
        v-only-number="{min: 1, max: 999999.9, precision: 1}"
        label-width="100"
        colon
        required
        name="numValidator"
        label="货物体积(m³)"
        type="number"
        placeholder="请输入"
        :rules="[
          { required: true, message: '请输入货物体积！' },
          { validator: numValidator, message: '请输入1~999999.9' }
        ]"
      />
      <!-- 精确小数点后一位 -->
      <van-field
        v-model.number="form.goodsWeight"
        v-only-number="{min: 1, max: 999999.9, precision: 1}"
        label-width="100"
        colon
        required
        name="numValidator"
        label="货物重量(吨)"
        placeholder="请输入"
        maxlength="10"
        :rules="[
          { required: true, message: '请输入货物重量！' },
          { validator: numValidator, message: '请输入1~999999.9' }
        ]"
      />
      <selftPicker
        picker-key="carry"
        :form="form"
        :columns="carryArr"
        value="label"
        :is-computed="form['carry']!==''&&carryArr.length > 0"
        required
        label-width="100"
        label="是否需要搬运"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择是否需要搬运！' },
        ]"
      />
      <van-field
        v-model="form.dutyRemark"
        colon
        label-width="100"
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
        <van-button type="default" block class="lastStep" native-type="button" @click="$emit('step-two')">
          返回上一步
        </van-button>
        <van-button type="primary" block>
          提交
        </van-button>
      </div>
    </van-form>
    <div class="cycle">
      3/3
    </div>
  </div>
</template>

<script>
import { getDictData } from '@/api/common'
import SelftPicker from '@/components/SelfPicker'
export default {
  components: {
    SelftPicker
  },
  props: {
    form: {
      type: Object,
      default: () => {},
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      // 货物类型
      cargoTypeArr: [],
      // 是否需要搬运
      carryArr: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 2
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let result = await this.getDictData('type_of_goods')
      this.cargoTypeArr = result
    },
    // 提交
    onSubmit(values) {
      this.$emit('submit')
    },
    numValidator(val) {
      if ((val >= 1 && val <= 999999.9)) {
        return true
      }
      return false
    },
    // 货物件数
    cargoNumValidator(val) {
      if ((val >= 1 && val <= 999999) || val === '') {
        return true
      }
      return false
    },
    // 从数据字典获取数据
    async getDictData(dictType, keyword = '') {
      try {
        let params = {
          dictType
        }
        keyword && (params.keyword = keyword)
        let { data: res } = await getDictData(params)

        if (res.success) {
          return res.data.map(item => ({
            label: item.dictLabel,
            value: +item.dictValue
          }))
        } else {
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get dict data fail:${err}`)
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.StepThireeContainer {
  position: relative;
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
  .cycle {
    position: absolute;
    right:30px;
    bottom:80px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid #2f448a;
    color: #2f448a;
    z-index: 99;
    font-size: 13px;
    text-align: center;
    line-height: 40px;
    margin-right: 15px;
    margin-top: 15px;
  }
}

</style>
