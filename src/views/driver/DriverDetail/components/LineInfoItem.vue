<template>
  <div class="LineInfoItem">
    <div class="itemBox">
      <van-cell>
        <template #title>
          <div class="title">
            <span>{{ obj.customerName }}</span>
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
          :value="`${obj.dutyManagerIdName}/${obj.lineSalePhone}`"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="创建时间："
          :value="obj"
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
  name: 'LineInfoItem',
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {
    goRouter() {
      this.$router.push({ path: '/lineDetail', id: '' })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../DriverList/components/DriverItem.less';
.LineInfoItem{
}
</style>
