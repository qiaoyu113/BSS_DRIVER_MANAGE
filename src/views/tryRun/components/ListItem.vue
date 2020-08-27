<template>
  <div class="ListItem">
    <div class="title">
      京东城配线路京东城配线路2京…（XS200808）
    </div>
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="上岗时间："
      value="稳定线路"
    />
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="仓库位置："
      value="稳定线路"
    />
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="配送车型："
      value="稳定线路"
    />
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="配送区域："
      value="稳定线路"
    />
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="里程时间："
      value="稳定线路"
    />
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="司机信息："
      value="稳定线路"
    />
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
