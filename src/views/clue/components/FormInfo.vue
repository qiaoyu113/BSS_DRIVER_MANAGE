<template>
  <div class="FormInfo">
    <div v-if="Object.keys(obj).length > 0">
      <van-field
        v-if="obj.name"
        label="姓名"
        :value="obj.name"
        readonly
        colon
      >
        <template v-if="obj.productLineTag !== null" #button>
          <span v-text="obj.productLineTag"></span>
        </template>
      </van-field>
      <van-field
        v-if="obj.phone"
        label="联系方式"
        :value="obj.phone"
        readonly
        colon
      />
      <van-field
        v-if="obj.workCityName"
        label="工作城市"
        colon
        :value="obj.workCityName"
        readonly
      />

      <van-field
        v-if="obj.carTypeName"
        label="车型"
        :value="obj.carTypeName"
        readonly
        colon
      />
      <van-field
        v-if="obj.gmDutyName"
        :label="obj.gmDutyName === '渠道经理' ? '渠道经理' : '加盟经理'"
        :value="`${obj.gmName}（${obj.gmMobile}）`"
        readonly
        colon
      />
      <van-field
        v-if="obj.sourceChannelName"
        label="渠道"
        colon
        :value="obj.sourceChannelName"
        readonly
      />
      <van-field
        v-if="obj.modeName"
        label="来源"
        :value="obj.modeName"
        readonly
        colon
      />
      <van-field
        v-if="obj.joinTypeName"
        label="方式"
        :value="obj.joinTypeName"
        readonly
        colon
      />
      <van-field
        v-if="obj.remark"
        label="备注"
        :value="obj.remark"
        readonly
        type="textarea"
        rows="1"
        autosize
        colon
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'FormInfo',
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  }
}
</script>
<style lang="less" scoped></style>
