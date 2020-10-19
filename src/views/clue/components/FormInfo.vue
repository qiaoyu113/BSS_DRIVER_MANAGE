<template>
  <div class="FormInfo">
    <div v-if="Object.keys(obj).length > 0">
      <van-field
        label="姓名"
        :value="obj.name | DataIsNull"
        readonly
        colon
      >
        <template v-if="obj.productLineTag !== null" #button>
          <span v-text="obj.productLineTag"></span>
        </template>
      </van-field>
      <van-field
        label="联系方式"
        :value="obj.phone | DataIsNull"
        readonly
        colon
      />
      <van-field
        label="工作城市"
        colon
        :value="obj.workCityName | DataIsNull"
        readonly
      />

      <van-field
        label="车型"
        :value="obj.carTypeName | DataIsNull"
        readonly
        colon
      />
      <van-field
        :label="obj.gmDutyName === '渠道经理' ? '渠道经理' : '加盟经理'"
        :value="`${obj.gmName}（${obj.gmMobile}）`"
        readonly
        colon
      />
      <van-field
        label="渠道"
        colon
        :value="obj.sourceChannelName | DataIsNull"
        readonly
      />
      <van-field
        label="来源"
        :value="obj.modeName | DataIsNull"
        readonly
        colon
      />
      <van-field
        label="方式"
        :value="obj.joinTypeName | DataIsNull"
        readonly
        colon
      />
      <van-field
        label="备注"
        :value="obj.remark | DataIsNull"
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
