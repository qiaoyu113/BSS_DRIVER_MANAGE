<template>
  <div class="StepThireeContainer">
    <van-form ref="stepThree" :show-error="false" @submit="onSubmit">
      <h4 class="title van-hairline--bottom">
        配送时间信息
      </h4>
      <van-field
        :value="pickerNames['cargoType']"
        label-width="100"
        colon
        required
        label="货物类型"
        placeholder="请选择"
        :rules="[{ required: true, message: '请选择' }]"
        @click="showPickerFn('cargoType')"
      />
      <van-field
        v-model="form.cargoNum"
        label-width="100"
        colon
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
        v-model="form.volume"
        v-only-number="{min: 1, max: 999999, precision: 1}"
        label-width="100"
        colon
        required
        label="货物体积(m³)"
        type="number"
        name="numValidator"
        placeholder="请输入"
        :rules="[
          { required: true, message: '请输入' },
          { validator: numValidator, message: '请输入1~999999' }
        ]"
      />
      <!-- 精确小数点后一位 -->
      <van-field
        v-model="form.goodsWeight"
        v-only-number="{min: 1, max: 999999, precision: 1}"
        label-width="100"
        colon
        required
        label="货物重量(吨)"
        name="numValidator"
        placeholder="请输入"
        maxlength="10"
        :rules="[
          { required: true, message: '请输入' },
          { validator: numValidator, message: '请输入1~999999' }
        ]"
      />
      <van-field
        label-width="100"
        colon
        :value="pickerNames['carry']"
        readonly
        clickable
        required
        label="是否需要搬运"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('carry')"
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
          下一步
        </van-button>
      </div>
    </van-form>
    <van-popup v-model="showPicker" position="bottom">
      <!-- picker选择器 -->
      <van-picker
        ref="fromThreePicker"
        value-key="label"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getDictData } from '@/api/common'
export default {
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
      ],
      pickerNames: { // picker选中显示的名字
        cargoType: '',
        carry: ''
      },
      pickerKey: '', // 显示picker的key
      columns: [], // picker的列表
      showPicker: false // 是否打开picker
    }
  },
  watch: {
    'form.lineId'(val) {
      if (this.type === 'edit' && val !== '') {
        this.showPickerLable()
      }
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
    // 编辑生成label
    showPickerLable() {
      for (let key in this.pickerNames) {
        let listKey = `${key}Arr`
        let index = this[listKey].findIndex(item => item.value === this.form[key])
        console.log(index, this.form[key], key)
        if (index > -1) {
          this.pickerNames[key] = this[`${key}Arr`][index].label
        }
      }
    },
    // 提交
    onSubmit(values) {
      this.$emit('submit')
    },
    // 货物件数
    numValidator(val) {
      if (val >= 1 && val <= 999999) {
        return true
      }
      return false
    },
    // 显示picker
    showPickerFn(key) {
      this.columns = []
      this.pickerKey = key;
      if (key === 'carry') {
        this.columns.push(...this.carryArr);
      } else if (key === 'cargoType') {
        this.columns.push(...this.cargoTypeArr);
      }

      this.showPicker = true;

      if (['edit'].includes(this.type)) {
        let index = this.columns.findIndex(item => item.value === this.form[this.pickerKey])
        if (index === -1) {
          index = 0
        }
        setTimeout(() => {
          this.$refs.fromThreePicker.setIndexes([index])
        }, 20)
      }
    },
    // picker选择器
    onConfirm(obj) {
      this.pickerNames[this.pickerKey] = obj.label
      this.form[this.pickerKey] = obj.value
      this.showPicker = false;
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
            value: item.dictValue
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
