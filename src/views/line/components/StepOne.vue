<template>
  <div class="stepOneContainer">
    <van-form ref="stepOne" :show-error="false" @submit="onSubmit">
      <h4 class="title van-hairline--bottom">
        基础信息
      </h4>
      <van-field
        v-model="form.lineName"
        label-width="100"
        colon
        required
        label="线路名称"
        placeholder="请输入"
        maxlength="10"
        :rules="[{ required: true, message: '请输入线路名称' }]"
      />
      <template v-if="['copy','create'].includes(type)">
        <van-field
          v-model="form.lineNum"
          label-width="100"
          colon
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
      </template>
      <van-field
        label-width="100"
        colon
        :value="pickerNames['lineBalance']"
        readonly
        clickable
        required
        label="是否有线路余额"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('lineBalance')"
      />
      <van-field
        label-width="100"
        colon
        readonly
        clickable
        required
        :rules="[
          { required: true, message: '请选择' },
        ]"
        name="calendar"
        :value="pickerNames['waitDirveValidity']"
        label="上架截止日期"
        placeholder="点击选择日期"
        @click="showPickerFn('waitDirveValidity')"
      />
      <van-field
        label-width="100"
        colon
        :value="pickerNames['stabilityRate']"
        readonly
        clickable
        required
        label="线路稳定性"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('stabilityRate')"
      />
      <h4 class="title van-hairline--bottom">
        配送信息
      </h4>
      <van-field
        label-width="100"
        colon
        :value="pickerNames['runSpeed']"
        readonly
        clickable
        required
        label="是否走高速"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('runSpeed')"
      />
      <van-field
        colon
        :value="pickerNames['returnBill']"
        readonly
        clickable
        required
        label-width="100"
        label="是否需要回单"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('returnBill')"
      />
      <van-field
        label-width="100"
        colon
        :value="pickerNames['carType']"
        readonly
        clickable
        required
        label="配送车型"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="handleShowModal('carType')"
      />
      <van-field
        label-width="100"
        colon
        :value="pickerNames['area']"
        readonly
        clickable
        required
        label="主要配送区域"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('area')"
      />
      <van-field
        v-model="form.districtArea"
        colon
        label-width="100"
        rows="2"
        autosize
        label="详细地址"
        placeholder="请输入..."
        type="textarea"
        maxlength="30"
        show-word-limit
        class="textarea"
      />
      <van-field
        v-model="form.deliveryNum"
        label-width="100"
        colon
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
        v-model="form.distance"
        label-width="100"
        colon
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
        v-model="form.limitRemark"
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
    <!-- 底部弹出框 -->
    <van-popup v-model="showPicker" position="bottom">
      <template v-if="isArea">
        <!-- 配送区域 -->
        <van-area
          :value="form['area'].length > 1 ?form['area'][2]+'' : ''"
          :area-list="columns"
          :columns-placeholder="['请选择', '请选择', '请选择']"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </template>
      <template v-else-if="isDate">
        <van-datetime-picker
          v-model="form[pickerKey]"
          type="date"
          title="选择年月日"
          :min-date="minTime"
          :max-date="maxTime"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </template>
      <template v-else>
        <!-- picker选择器 -->
        <van-picker
          ref="fromOnePicker"
          value-key="label"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </template>
    </van-popup>
    <!-- 模糊搜索组件 -->
    <Suggest
      v-model="showModal"
      :options="options"
      :type="modalKey"
      @keyWordValue="handleSearchChange"
      @finish="handleValueClick"
      @closed="showModal=false"
    />
  </div>
</template>

<script>
import Suggest from '@/components/SuggestSearch'
import { getDictData } from '@/api/common'
export default {
  components: {
    Suggest
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
      // 主要配送区域
      areaArr: {
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
      showModal: false,
      options: [],
      modalKey: '',
      pickerNames: { // picker选中显示的名字
        lineBalance: '',
        waitDirveValidity: '',
        stabilityRate: '',
        runSpeed: '',
        returnBill: '',
        carType: '',
        area: ''
      },
      pickerKey: '', // 显示picker的key
      columns: [], // picker的列表
      showPicker: false, // 是否打开picker
      areaLists: ['area'], // 显示日历控件的字段集合
      timeLists: ['waitDirveValidity'],
      minTime: new Date(),
      maxTime: new Date(2125, 12, 31)
    }
  },
  computed: {
    isArea() {
      return this.areaLists.includes(this.pickerKey)
    },
    isDate() {
      return this.timeLists.includes(this.pickerKey)
    }
  },
  watch: {
    'form.lineId'(val) {
      if (this.type === 'edit' && val !== '') {
        this.showPickerLable()
        this.pickerNames.driverWorkTime = this.form.driverWorkTime
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let result = await this.getDictData('Intentional_compartment')
      this.options = result
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
      if (val >= 1 && val <= 9999) {
        return true
      }
      return false
    },
    // 模糊搜索
    async handleSearchChange(value) {
      console.log('这里面接口请求模糊查询:', value)
      if (this.modalKey === 'carType') {
        let result = await this.getDictData('Intentional_compartment', value)
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
        let result = await this.getDictData('Intentional_compartment')
        this.options = result
      }
      this.showModal = true
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
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get dict data fail:${err}`)
      }
    },
    // 显示picker
    showPickerFn(key) {
      this.columns = []
      this.pickerKey = key;
      if (key === 'lineBalance') {
        this.columns.push(...this.lineBalanceArr);
      } else if (key === 'stabilityRate') {
        this.columns.push(...this.stabilityRateArr);
      } else if (key === 'runSpeed') {
        this.columns.push(...this.runSpeedArr);
      } else if (key === 'returnBill') {
        this.columns.push(...this.returnBillArr);
      } else if (key === 'area') {
        this.columns = this.areaArr
      }

      this.showPicker = true;
      if (['edit'].includes(this.type)) {
        let index = this.columns.findIndex(item => item.value === this.form[this.pickerKey])
        if (index === -1) {
          index = 0
        }
        setTimeout(() => {
          this.$refs.fromOnePicker.setIndexes([index])
        }, 20)
      }
    },
    // picker选择器
    onConfirm(obj) {
      if (this.isDate) {
        this.pickerNames[this.pickerKey] = `${obj.getMonth() + 1}/${obj.getDate()}`;
        this.form[this.pickerKey] = obj
      } else if (this.isArea) {
        this.form[this.pickerKey] = obj.map((item) => item.code)
        this.pickerNames[this.pickerKey] = obj.map((item) => item.name).join('/');
      } else {
        this.pickerNames[this.pickerKey] = obj.label
        this.form[this.pickerKey] = obj.value
      }

      this.showPicker = false;
    },
    // 重置表单
    reset() {
      this.pickerNames = {}
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

