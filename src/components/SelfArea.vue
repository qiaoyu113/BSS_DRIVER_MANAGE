<template>
  <div class="selfAreaContainer" :class="border ? 'van-hairline--bottom':''">
    <van-field
      :value="label"
      readonly
      colon
      clickable
      v-bind="$attrs"
      @click="showPickerFn"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-area
        :value="form[pickerKey].length > 1 ? form[pickerKey][2]+'' : ''"
        :area-list="areaList"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        @confirm="onConfirm"
        @cancel="showPicker = false"
        @change="handleAreaChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { GetCityByCode } from '@/api/common'
export default {
  props: {
    form: {
      type: Object,
      default: () => {},
      required: true
    },
    pickerKey: {
      type: String,
      default: '',
      required: true
    },
    isComputed: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    props: {
      type: Object,
      default: () => ({
        provinceAreaName: 'provinceAreaName',
        cityAreaName: 'cityAreaName',
        countyAreaName: 'countyAreaName'
      })
    }
  },
  data() {
    return {
      showPicker: false,
      label: '',
      columns: [],
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
      },
      isEcho: true // 是否回显
    }
  },
  watch: {
    isComputed(val) {
      if (val && this.isEcho) {
        this.getLable()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let provinceLists = await this.loadCityByCode(['100000'])
      this.areaList.province_list = provinceLists
    },
    // 获取label
    getLable() {
      this.label = `${this.form[this.props.provinceAreaName]}/${this.form[this.props.cityAreaName]}/${this.form[this.props.countyAreaName]}`
    },
    // 打开picker
    showPickerFn() {
      this.showPicker = true
    },
    // 点击确定
    onConfirm(obj) {
      this.form[this.pickerKey] = obj.map((item) => item.code)
      this.label = obj.map((item) => item.name).join('/');
      this.showPicker = false
      this.isEcho = false
    },
    // 三级联动变化
    async handleAreaChange(vm, item, index) {
      let params = ['100000']
      if (index === 0) {
        params.push(item[0].code)
        let result = await this.loadCityByCode(params)
        this.areaList.city_list = result
      } else if (index === 1) {
        params.push(item[0].code)
        params.push(item[1].code)
        let result = await this.loadCityByCode(params)
        this.areaList.county_list = result
      }
    },
    // 获取省、市、县
    async loadCityByCode(params) {
      try {
        let { data: res } = await GetCityByCode(params)
        if (res.success) {
          let codeObj = {}
          for (let i = 0; i < res.data.length; i++) {
            let item = res.data[i]
            codeObj[item.code] = item.name
          }
          return codeObj
        }
      } catch (err) {
        console.log(`load city by code fail:${err}`)
      }
    }
  }
}

</script>

