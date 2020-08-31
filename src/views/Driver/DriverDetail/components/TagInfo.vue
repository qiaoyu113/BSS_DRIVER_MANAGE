<template>
  <div class="TagInfo">
    <div class="tags">
      <van-form label-width="150px">
        <van-field
          label="是否小白司机："
          value="是"
          readonly
        />
        <van-field
          label="是否为司急："
          value="是"
          readonly
        />
        <van-field
          label="是否存在跳单行为："
          value="否"
          readonly
        />
      </van-form>
    </div>
    <div class="remakeList">
      <div
        v-for="(item,index) in tagList"
        :key="index"
        class="remakeItem"
      >
        <div class="remakeTitle">
          <span>备注：</span>
          <div>是否存在跳单行为是否存在跳单行为是否存在跳单行为是否存在跳单行为是否存在跳单行为</div>
        </div>
        <van-field
          label="创建人："
          value="李威山/18848885135"
          readonly
        />
        <van-field
          label="创建时间："
          value="2020/08/15 13:59:239"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagList: [1, 2, 3]
    };
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
