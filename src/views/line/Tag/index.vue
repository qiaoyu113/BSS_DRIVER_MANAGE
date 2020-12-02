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
      <selftPicker
        picker-key="lineUrgent"
        :form="form"
        :columns="lineUrgentColumns"
        value="label"
        :is-computed="form['lineUrgent']!=='' && lineAdapterColumns.length > 0"
        required
        label-width="100"
        label="线路紧急程度"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
      />
      <selftPicker
        picker-key="lineAdapter"
        :form="form"
        :columns="lineAdapterColumns"
        value="label"
        :is-computed="form['lineAdapter']!==''&&lineAdapterColumns.length > 0"
        required
        label-width="100"
        label="适配性"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择' },
        ]"
      />
      <selftPicker
        picker-key="isHot"
        :form="form"
        :columns="hotColum"
        value="label"
        :is-computed="form['isHot']!==''&&hotColum.length > 0"
        label-width="100"
        label="是否为爆款"
        placeholder="请选择"
        required
        :rules="[{ required: true, message: '请选择'}]"
      />
      <van-field
        :key="form.isHot"
        :value="checkedStrList.map(item => item.label).join('，')"
        label-width="100"
        colon
        readonly
        clickable
        :required="false"
        label="线路亮点"
        placeholder="请选择"
        autosize
        type="textarea"
        :rules="[{ required: false, message: '请选择'}]"
        @click="showModal = true"
      >
      </van-field>
      <van-button v-preventreclick type="primary" block class="btn">
        提交
      </van-button>
    </van-form>

    <!-- 选择亮点 -->
    <van-popup v-model="showModal" position="bottom">
      <div class="van-picker__toolbar">
        <button type="button" class="van-picker__cancel" @click="showModal = false">
          取消
        </button>
        <button type="button" class="van-picker__confirm" @click="checked">
          确认
        </button>
      </div>
      <div class="list">
        <van-checkbox-group v-model="checkedList" direction="horizontal">
          <van-checkbox
            v-for="(item, index) in sellPointColumns"
            :key="index"
            :name="item.value"
            class="margin-bottom-xs chenckItem"
          >
            {{ item.label }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { tagging, getLineDetail } from '@/api/line'
import { getDictData } from '@/api/common'
import SelftPicker from '@/components/SelfPicker'
export default {
  components: {
    SelftPicker
  },
  data() {
    return {
      form: {
        lineAdapter: '',
        lineUrgent: ''
      },
      lineId: '',
      lineUrgentColumns: [], // 线路紧急程度数组
      lineAdapterColumns: [] // 适配性数组
    }
  },
  mounted() {
    this.lineId = this.$route.query.lineId
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
        this.$loading(true)
        let params = {
          lineAdapter: this.form.lineAdapter,
          lineUrgent: this.form.lineUrgent,
          lineId: this.lineId
        }
        let { data: res } = await tagging(params)
        if (res.success) {
          this.$router.push({
            path: '/line'
          })
        } else {
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`tag fail:${err}`)
      } finally {
        this.$loading(false)
      }
      console.log('submit', values);
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
      this.getLineDetail()
    },
    // 获取线路详情
    async getLineDetail() {
      try {
        this.$loading(true)
        let params = {
          lineId: this.lineId
        }
        let { data: res } = await getLineDetail(params)
        if (res.success) {
          let result = res.data
          this.form = {
            lineAdapter: result.lineAdapter,
            lineUrgent: result.lineUrgent
          }
        } else {
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        this.$fail()
      } finally {
        this.$loading(false)
      }
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
.TagContainer {

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
  .list{
    padding: 10px 16px 20px;
    font-size: 14px;
    .chenckItem{
      margin-right: 0;
      width: 33.333333%;
    }
  }
}

</style>
