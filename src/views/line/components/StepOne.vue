<template>
  <div class="stepOneContainer">
    <van-form ref="stepOne" :show-error="false" @submit="onSubmit">
      <h4 class="title van-hairline--bottom">
        基础信息
      </h4>
      <van-field
        v-model="form.a"
        label-width="100"
        colon
        required
        label="线路名称"
        placeholder="请输入"
        maxlength="10"
        :rules="[{ required: true, message: '请输入线路名称' }]"
      />
      <van-field
        v-model="form.b"
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
      <van-field
        label-width="100"
        colon
        :value="pickerNames['c']"
        readonly
        clickable
        required
        label="是否有线路余额"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('c')"
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
        :value="pickerNames['d']"
        label="上架截止日期"
        placeholder="点击选择日期"
        @click="showPickerFn('d')"
      />
      <van-field
        label-width="100"
        colon
        :value="pickerNames['e']"
        readonly
        clickable
        required
        label="线路稳定性"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('e')"
      />
      <h4 class="title van-hairline--bottom">
        配送信息
      </h4>
      <van-field
        label-width="100"
        colon
        :value="pickerNames['f']"
        readonly
        clickable
        required
        label="是否走高速"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('f')"
      />
      <van-field
        colon
        :value="pickerNames['g']"
        readonly
        clickable
        required
        label-width="100"
        label="是否需要回单"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('g')"
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
        :value="pickerNames['h']"
        readonly
        clickable
        required
        label="主要配送区域"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
        @click="showPickerFn('h')"
      />
      <van-field
        v-model="form.j"
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
        v-model="form.k"
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
    <!-- 底部弹出框 -->
    <van-popup v-model="showPicker" position="bottom">
      <template v-if="isArea">
        <!-- 配送区域 -->
        <van-area
          :value="form[pickerKey].length > 1 ?form[pickerKey][2]+'' : ''"
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
import Suggest from '@/components/SuggestSearch.vue'
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
    isStable: {
      type: Boolean,
      default: true,
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
      columns2: [
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
      columns3: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
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
      columns5: {
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
        city: '',
        b: '',
        c: '',
        startDate: '',
        endDate: ''
      },
      pickerKey: '', // 显示picker的key
      columns: [], // picker的列表
      showPicker: false, // 是否打开picker
      areaLists: ['h'], // 显示日历控件的字段集合
      timeLists: ['d'],
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
  methods: {
    // 提交
    onSubmit(values) {
      console.log('submit', values);
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
    handleSearchChange(value) {
      console.log('这里面接口请求模糊查询:', value)
    },
    /**
     *点击某一项
     */
    handleValueClick(obj) {
      console.log('xxx:', obj)
    },
    // 打开模糊查询框
    handleShowModal(key) {
      this.modalKey = key
      if (key === 'carType') {
        this.options = []
      }
      this.showModal = true
    },
    // 显示picker
    showPickerFn(key) {
      this.columns = []
      this.pickerKey = key;
      if (key === 'c') {
        this.columns.push(...this.columns1);
      } else if (key === 'e') {
        this.columns.push(...this.columns2);
      } else if (key === 'f') {
        this.columns.push(...this.columns3);
      } else if (key === 'g') {
        this.columns.push(...this.columns4);
      } else if (key === 'h') {
        this.columns = this.columns5
      }

      this.showPicker = true;
    },
    // picker选择器
    onConfirm(obj) {
      if (this.isDate) {
        this.pickerNames[this.pickerKey] = `${obj.getMonth() + 1}/${obj.getDate()}`;
      } else if (this.isArea) {
        this.form[this.pickerKey] = obj.map((item) => item.code)
        this.pickerNames[this.pickerKey] = obj.map((item) => item.name).join('/');
      } else {
        this.pickerNames[this.pickerKey] = obj.label
      }
      this.form[this.pickerKey] = obj
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

