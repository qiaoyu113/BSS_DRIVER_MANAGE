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
      <h4 class="title van-hairline--bottom">
        标签信息
      </h4>
      <selftPicker
        picker-key="labelType"
        :form="form"
        :columns="labelTypeArr"
        value="label"
        :is-computed="form['labelType']!==''&&labelTypeArr.length > 0"
        required
        label-width="100"
        label="线路肥瘦标签"
        placeholder="请选择"
        :rules="[
          { required: true, message: '请选择线路肥瘦标签！' },
        ]"
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
    <!-- 选择亮点 -->
    <van-popup v-model="showModalChecked" position="bottom">
      <div class="van-picker__toolbar">
        <button type="button" class="van-picker__cancel" @click="showModalChecked = false">
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
      ],
      // 线路肥瘦标签
      labelTypeArr: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        let requestArr = [
          this.getDictData('type_of_goods'),
          this.getDictData('line_label')
        ]
        let res = await Promise.all(requestArr)
        if (res && res.length === requestArr.length) {
          this.cargoTypeArr = res[0]
          this.labelTypeArr = res[1]
        }
      } catch (err) {
        console.log(`get dict fail:${err}`)
      }
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
  .list{
    padding: 10px 16px 20px;
    font-size: 14px;
    .chenckItem{
      margin-right: 0;
      width: 33.333333%;
    }
  }
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
    margin:26.66vw 4vw 13.333vw;/*no*/
    width: 92vw;/*no*/
    .lastStep {
       margin-right:1.333vw;/*no*/
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
