<template>
  <div class="FormInfo">
    <van-cell-group v-if="Object.keys(obj).length > 0">
      <van-field
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
        label="联系方式"
        :value="obj.phone"
        readonly
        colon
      />
      <van-field
        label="工作城市"
        colon
        :value="obj.workCityName"
        readonly
      />

      <van-field
        label="车型"
        :value="obj.carTypeName"
        readonly
        colon
      />
      <van-field
        :label="obj.gmType === 1 ? '渠道经理' : '加盟经理'"
        :value="`${obj.gmName}（${obj.gmMobile}）`"
        readonly
        colon
      />
      <van-field
        label="渠道"
        colon
        :value="obj.sourceChannelName"
        readonly
      />
      <van-field
        label="来源"
        :value="obj.modeName"
        readonly
        colon
      />
      <van-field
        label="方式"
        :value="obj.joinTypeName"
        readonly
        colon
      />
      <van-field
        label="备注"
        :value="obj.remake"
        readonly
        colon
      />
    </van-cell-group>
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
