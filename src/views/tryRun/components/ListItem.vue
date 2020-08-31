<template>
  <div class="ListItem">
    <div class="title flex align-center">
      <div class="title-tag flex align-center justify-center">
        共享
      </div>
      <h3 class="van-ellipsis">
        京东城配线路京东城配线路2京…（XS200808）
      </h3>
      <van-icon name="arrow" />
    </div>
    <div class="list-tag-ct flex align-center">
      <van-tag
        plain
        round
        type="primary"
        class="tag-item"
      >
        标签
      </van-tag>
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
    <div class="bottom-tag-ct flex align-center">
      <van-tag
        plain
        round
        type="primary"
        class="bottom-tag"
      >
        司机跳单
      </van-tag>
      <van-tag
        plain
        round
        type="primary"
        class="bottom-tag"
      >
        司机跳单
      </van-tag>
    </div>
    <div class="bottom van-hairline--top flex flex align-center justify-center">
      <div class="details van-hairline--surround">
        详情
      </div>
    </div>
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
    .title-tag{
      margin-right: 10px;
      padding: 0 10px;
      height: 20px;
      font-size: @font-size-sm;
      color: #EFF5FE;
      background: #7F8FBD;
      border-radius: 3px;
      white-space: nowrap;
    }
    h3{
      margin: 0;
      font-size: @font-size-md;
      font-weight: bold;
    }
  }
  .list-tag-ct{
    margin-bottom: 7px;
  }
  .tag-item{
    padding: 0 8px;
    height: 20px;
    border-color: @tab-active-color;
    color: @tab-active-color;
    font-size: @font-size-xs-1;
    border-radius: 12px;
    &+.tag-item{
      margin-left: 10px;
    }
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
  .bottom-tag-ct{
    margin: 5px 0;
    .bottom-tag{
      height: 24px;
      padding: 0 11px;
      font-size: @font-size-sm;
      color: #649CEE;
      background: #EFF5FE;
      border-radius: 3px;
      &::before{
        display: none;
      }
      &+.bottom-tag{
        margin-left: 10px;
      }
    }
  }
  .bottom{
    height: 30px;
    .details{
      width: 70px;
      height: 20px;
      line-height: 20px;
      color: #838A9D;
      border-radius: 10px;
      text-align: center;
      font-size: @font-size-sm;
      &::after{
        border-radius: 20px;
      }
    }
  }
}
</style>
