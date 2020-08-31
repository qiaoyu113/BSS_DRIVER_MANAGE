<template>
  <div class="LineInfoItem">
    <div class="itemBox">
      <van-cell>
        <template #title>
          <div class="title">
            <span>沙漠皇帝阿兹尔</span>
            <van-icon name="arrow" />
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="itemStatus">
            试跑
          </div>
        </template>
      </van-cell>
      <div class="itemInfo">
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="线路编号："
          value="XL19980822651"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="仓位置："
          value="如意湖王鼎国际"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="配送区域："
          value="信阳浉河贤山庙"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="外线销售："
          value="李威山/18848885135"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="创建时间："
          value="2020/8-27/18:07"
        />
      </div>
      <div class="detailBtn">
        <van-button round plain size="small" class="routeBtn" @click="goRouter">
          详情
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DriverList',
  data() {
    return {}
  },
  methods: {
    goRouter() {}
  }
}
</script>
<style lang="less" scoped>
@import '../../DriverList/components/DriverItem.less';
.LineInfoItem{
}
</style>
