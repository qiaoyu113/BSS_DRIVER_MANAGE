<template>
  <div class="ListItem">
    <van-radio name="1" shape="square" checked-color="#07c160">
      单选框 1
    </van-radio>
    <div class="title">
      <span>杨师傅 18848885135</span>
      <span>已面试</span>
    </div>
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      value="共享/北京/4.2米厢货"
    />
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="加盟经理："
      value="王经理/18848885135"
    />
    <van-cell
      value="详情"
      is-link
      title-class="cell-title"
    >
      <template #title>
        <span class="custom-title">创建时间：</span>
        <span>2020/8-27/18:07</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ListItem {
  margin-bottom: 10px;
  padding: 0 15px;
  color: @text-color;
  background-color: @white;
  .title {
    height: 40px;
    line-height: 40px;
    font-size: @font-size-md;
    font-weight: bold;
  }
  .van-cell{
    padding: 0;
    &::after{
      display: none;
    }
    .cell-title,
    .cell-value{
      font-size: @font-size-sm-1;
      color: @text-color;
      line-height: 23px;
      flex: none;
    }
    .cell-title{
      flex-shrink : 0;
    }
    .cell-value{
      flex: auto;
      text-align: left;
    }
  }
}
</style>
