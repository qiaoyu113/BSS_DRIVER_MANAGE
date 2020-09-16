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
          label="是否为司急"
          colon
          :value="obj.isUrgentName | DataIsNull"
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
        class="remakeItem"
      >
        <div class="remakeTitle">
          <span>备注：</span>
          <div v-text="item.remark"></div>
        </div>
        <van-field
          label="创建人："
          :value="`${item.createName}/${item.createPhone}`"
          readonly
        />
        <van-field
          label="创建时间："
          :value="timeFormat(item.createDate,'YYYY-MM-DD')"
          readonly
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
    .remakeTitle {
      display: flex;
      font-size: 14px;
      color: #3c4353;
      padding: 15px;
      box-sizing: border-box;
      border-top: 2px solid #f6f7f9;
      span {
        display: inline-block;
        width: 50px;
      }
      div {
        flex-wrap: wrap;
        flex: 1;
      }
    }
  }
}
</style>
<style scoped>
.remakeItem >>> .van-field__label {
  width: auto;
}
</style>
