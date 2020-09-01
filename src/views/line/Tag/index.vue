<template>
  <div class="TagContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="打标签" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>
    <h4 class="title van-hairline--bottom">
      标签信息
    </h4>
    <van-form ref="tagForm" :show-error="false" @submit="onSubmit">
      <van-field
        label-width="100"
        readonly
        clickable
        required
        name="picker"
        :value="pickerNames['lineUrgent']"
        label="线路紧急程度"
        placeholder="请选择"
        :rules="[{ required: true, message: '请选择' }]"
        @click="showPickerFn('lineUrgent')"
      />
      <van-field
        label-width="100"
        readonly
        clickable
        required
        name="picker"
        :value="pickerNames['lineAdapter']"
        label="适配性"
        placeholder="请选择"
        :rules="[{ required: true, message: '请选择' }]"
        @click="showPickerFn('lineAdapter')"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-button type="primary" block class="btn">
        提交
      </van-button>
    </van-form>
  </div>
</template>

<script>
import { tagging } from '@/api/line'
import { getDictData } from '@/api/common'
export default {
  data() {
    return {
      form: {
        lineAdapter: '',
        lineUrgent: ''
      },
      pickerNames: {
        lineAdapter: '',
        lineUrgent: ''
      },
      pickerKey: '', // 显示picker的key
      columns: [], // picker的列表
      showPicker: false, // 是否打开picker,
      lineUrgentColumns: [], // 线路紧急程度数组
      lineAdapterColumns: [] // 适配性数组
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     *返回按钮
     */
    onClickLeft() {
      this.reset()
      this.$router.go(-1)
    },
    /**
     *提交
     */
    async onSubmit(values) {
      try {
        let params = {
          lineAdapter: this.form.lineAdapter,
          lineUrgent: this.form.lineUrgent
        }
        let { data: res } = await tagging(params)
        if (res.success) {
          this.$router.push({
            path: '/line'
          })
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`tag fail:${err}`)
      }
      console.log('submit', values);
    },
    // picker选择器
    onConfirm(obj) {
      this.pickerNames[this.pickerKey] = obj.label
      this.form[this.pickerKey] = obj.value
      this.showPicker = false;
    },
    // 显示picker
    showPickerFn(key) {
      this.columns = []
      this.pickerKey = key;
      if (key === 'lineUrgent') {
        this.columns.push(...this.lineUrgentColumns);
      } else if (key === 'lineAdapter') {
        this.columns.push(...this.lineAdapterColumns);
      }
      this.showPicker = true;
    },
    /**
     * 重置表单
     */
    reset() {
      this.$refs.tagForm.resetValidation()
    },
    // 初始化数据
    async init() {
      this.lineUrgentColumns = await this.getDictData('line_urgent')
      this.lineAdapterColumns = await this.getDictData('line_adapter')
    },
    // 从数据字典获取数据
    async getDictData(dictType) {
      try {
        let params = {
          dictType
        }
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
    }
  }
}

</script>

<style lang='scss' scoped>
.TagContainer {
  font-family: PingFangSC-Medium;
  .title {
    margin:10px 0px 0px 0px;
    padding-left: 15px;
    padding-bottom: 12.5px;
    font-size: 15px;
    color: #3C4353;
  }
  .btn {
    margin:100px 15px 0px;
    width: 345px;
  }
}

</style>
