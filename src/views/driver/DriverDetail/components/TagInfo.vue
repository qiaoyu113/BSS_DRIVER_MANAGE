<template>
  <div class="TagInfo">
    <div v-if="obj !== null" class="tags">
      <van-form :show-error="false" label-width="150px">
        <van-field
          label="是否小白司机"
          colon
          :value="obj.isNoviceName | DataIsNull"
          readonly
        />
        <van-field
          label="是否为紧急司机"
          colon
          :value="obj.isUrgentName"
          readonly
        />
        <van-field
          label="是否存在跳单行为"
          colon
          :value="obj.isDown === 0 ? '否' : obj.isDownName | DataIsNull"
          readonly
        />
      </van-form>
    </div>
    <div v-if="obj !== null" class="remakeList">
      <div
        v-for="(item,index) in obj.labelRemarkList"
        :key="index"
        class="remakeItem  van-hairline--top"
      >
        <van-field
          label="备注"
          :value="item.remark"
          readonly
          colon
          type="textarea"
          autosize
          rows="1"
        />
        <van-field
          label="创建人"
          :value="`${item.createName}/${item.createPhone}`"
          readonly
          colon
        />
        <van-field
          label="创建时间"
          :value="timeFormat(item.createDate,'YYYY-MM-DD')"
          readonly
          colon
        />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    };
  },
  methods: {
    timeFormat(date, format) {
      return dayjs(date).format(format)
    }
  }
};
</script>
<style lang="less" scoped>
.TagInfo {
  background-color: #fff;
  .van-cell {
    padding: 3px 15px;
    box-sizing: border-box;
  }
  .tags {
    padding: 13px 0;
    box-sizing: border-box;
  }
  .remakeItem {
    // border-top: 1px solid #838a9d;
  }
}
</style>
<style scoped>
.remakeItem >>> .van-field__label {
  width: auto;
}
</style>
