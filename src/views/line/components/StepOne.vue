<template>
  <div class="stepOneContainer">
    <van-form ref="stepOne" :show-error="false" @submit="onSubmit">
      <h4 class="title van-hairline--bottom">
        基础信息
      </h4>
      <van-field
        v-model="form.lineName"
        label-width="130"
        colon
        required
        :disabled="type === 'edit'"
        label="线路名称"
        name="asyncValidatorLineName"
        placeholder="请输入"
        maxlength="10"
        :rules="[
          { required: true, message: '请输入线路名称！' },
          { validator: asyncValidatorLineName, message: '系统已存在相同名称线路' }
        ]"
      />
      <template v-if="['copy','create'].includes(type)">
        <van-field
          v-model.number="form.lineNum"
          label-width="130"
          colon
          required
          label="线路数量"
          placeholder="请输入"
          name="lineNumValidator"
          type="digit"
          :rules="[
            { required: true, message: '请输入线路数量！' },
            { validator: lineNumValidator, message: '请输入1~99' }
          ]"
        />
      </template>
      <selftPicker
        picker-key="lineBalance"
        :form="form"
        :columns="lineBalanceArr"
        value="label"
        :is-computed="form['lineBalance']!==''"
        required
        label-width="130"
        label="是否有线路余额"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择是否有线路余额！' },
        ]"
      />
      <selfDatetimePicker
        label-width="130"
        picker-key="waitDirveValidity"
        :is-computed="form['waitDirveValidity']!==''"
        :form="form"
        required
        :rules="[
          { required: true, message: '请选择上架截止日期！' },
        ]"
        label="上架截止日期"
        placeholder="点击选择日期"
      />
      <selftPicker
        picker-key="stabilityRate"
        :form="form"
        :columns="stabilityRateArr"
        value="label"
        :is-computed="form['stabilityRate']!==''"
        required
        label-width="130"
        label="线路稳定性"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择线路稳定性！' },
        ]"
      />
      <h4 class="title van-hairline--bottom">
        配送信息
      </h4>
      <selftPicker
        picker-key="runSpeed"
        :form="form"
        :columns="runSpeedArr"
        value="label"
        :is-computed="form['runSpeed']!==''"
        required
        label-width="130"
        label="是否走高速"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择是否走高速！' },
        ]"
      />
      <selftPicker
        picker-key="returnBill"
        :form="form"
        :columns="returnBillArr"
        value="label"
        :is-computed="form['returnBill']!==''"
        required
        label-width="130"
        label="是否需要回单"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择是否需要回单！' },
        ]"
      />
      <van-field
        label-width="130"
        colon
        :value="pickerNames['carType'] || form['carTypeName']"
        readonly
        clickable
        required
        label="配送车型"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择配送车型！' },
        ]"
        @click="handleShowModal('carType')"
      />
      <self-area
        label-width="130"
        picker-key="area"
        :form="form"
        name="areaValidator"
        :is-computed="form.area.length > 2"
        required
        label="主要配送区域"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择主要配送区域！' },
          { validator:areaValidator, message: '请选择完整省、市、县' }
        ]"
      />
      <van-field
        v-model="form.districtArea"
        colon
        label-width="130"
        rows="2"
        required
        autosize
        label="详细地址"
        placeholder="请输入..."
        type="textarea"
        maxlength="30"
        show-word-limit
        class="textarea"
        :rules="[
          { required: true, message: '请输入详细地址！' }
        ]"
      />
      <van-field
        v-model.number="form.deliveryNum"
        label-width="130"
        colon
        required
        label="配送点数量"
        placeholder="请输入"
        name="lineNumValidator"
        type="digit"
        :rules="[
          { required: true, message: '请输入配送点数量！' },
          { validator: lineNumValidator, message: '请输入1~99' }
        ]"
      />
      <van-field
        v-model.number="form.distance"
        v-only-number="{min: 1, max: 9999.9, precision: 1}"
        label-width="130"
        colon
        required
        label="配送总里程数(公里)"
        placeholder="请输入"
        name="mileageValidator"
        type="number"
        :rules="[
          { required: true, message: '请输入配送总里程数！' },
          { validator: mileageValidator, message: '请输入1~9999' }
        ]"
      />
      <van-field
        v-model="form.limitRemark"
        label-width="130"
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
    <!-- 模糊搜索组件 -->
    <Suggest
      v-model="showModal"
      :options="options"
      :type="modalKey"
      @keyWordValue="handleSearchChange"
      @finish="handleValueClick"
      @closed="showModal=false"
    />
    <div class="cycle">
      1/3
    </div>
  </div>
</template>

<script>
import Suggest from '@/components/SuggestSearch'
import { getDictDataByKeyword } from '@/api/common'
import SelftPicker from '@/components/SelfPicker'
import SelfDatetimePicker from '@/components/SelfDatetimePicker'
import SelfArea from '@/components/SelfArea'
import { judgeLineExist, judgeLineExistByLineName, judgeLineExistByLineNameAndLineLogo } from '@/api/line'
export default {
  components: {
    Suggest,
    SelftPicker,
    SelfDatetimePicker,
    SelfArea
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
      // 是否有线路余额
      lineBalanceArr: [
        {
          label: '有余额线路',
          value: 1
        },
        {
          label: '无余额线路',
          value: 2
        }
      ],
      // 线路稳定性
      stabilityRateArr: [
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
      // 是否走高速
      runSpeedArr: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 2
        }
      ],
      // 是否需要回单
      returnBillArr: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 2
        }
      ],
      showModal: false,
      options: [],
      modalKey: '',
      pickerNames: {
        carType: ''
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let result = await this.getDictDataByKeyword('Intentional_compartment')
      this.options = result
    },
    // 提交
    onSubmit(values) {
      this.$emit('stepTwo')
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
      if (val >= 1 && val <= 9999.9) {
        return true
      }
      return false
    },
    // 模糊搜索
    async handleSearchChange(value) {
      if (this.modalKey === 'carType') {
        let result = await this.getDictDataByKeyword('Intentional_compartment', value)
        this.options = result
      }
    },
    /**
     *点击某一项
     */
    handleValueClick(obj) {
      this.form[obj.type] = obj.value
      this.pickerNames[obj.type] = obj.label
    },
    // 打开模糊查询框
    async handleShowModal(key) {
      this.modalKey = key
      if (this.modalKey === 'carType') {
        let result = await this.getDictDataByKeyword('Intentional_compartment')
        this.options = result
      }
      this.showModal = true
    },
    // 从数据字典获取数据
    async getDictDataByKeyword(type, keyword = '') {
      try {
        let params = {
          type
        }
        keyword && (params.keyword = keyword)
        let { data: res } = await getDictDataByKeyword(params)
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
    },
    // 重置表单
    reset() {
      this.$refs.stepOne.resetValidation()
    },
    // 校验线路名称
    asyncValidatorLineName(val) {
      return new Promise(async(resolve) => {
        let result = await this.handleLineNameBlur()
        resolve(result)
      });
    },
    // 校验线路名称是否重复
    async handleLineNameBlur() {
      try {
        if (this.type === 'create') {
          let params = {
            lineLogo: this.form.lineName
          }
          let { data: res } = await judgeLineExist(params)
          if (res.success) {
            return true
          } else {
            return false
          }
        } else if (['active'].includes(this.type)) {
          let params = {
            lineName: this.form.lineName,
            lineId: this.form.lineId
          }
          let { data: res } = await judgeLineExistByLineName(params)
          if (res.success) {
            return true
          } else {
            return false
          }
        } else if (this.type === 'copy') {
          let params = {
            lineName: this.form.lineName
          }
          let { data: res } = await judgeLineExistByLineNameAndLineLogo(params)
          if (res.success) {
            return true
          } else {
            return false
          }
        }
      } catch (err) {
        console.log(`validate fail:${err}`)
        return false
      }
    },
    // 省、市、县校验
    areaValidator(val) {
      console.log(this.form.area)
      let arr = this.form.area.filter(item => item)
      if (arr.length === 3) {
        return true
      }
      return false
    }
  }
}

</script>

<style lang='scss' scoped>
.stepOneContainer {
  position: relative;
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

