<template>
  <div class="FormInfo">
    <div v-if="Object.keys(obj).length > 0">
      <div class="contentBox">
        <div>
          <van-field
            v-if="obj.name"
            label="姓名"
            :value="obj.name"
            readonly
            colon
          >
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
        </div>
        <template v-if="obj.productLineTag !== null">
          <span class="tagText" v-text="obj.productLineTag"></span>
        </template>
      </div>
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
<style lang="less" scoped>
.contentBox{
  display: flex;
  justify-content: space-between;
  .tagText{
    padding: 0.26667rem 0.42667rem;
    white-space:nowrap;
  }
}
</style>
