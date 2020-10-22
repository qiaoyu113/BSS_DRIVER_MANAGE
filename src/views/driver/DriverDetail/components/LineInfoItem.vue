<template>
  <div class="LineInfoItem">
    <div class="itemBox">
      <van-cell>
        <template #title>
          <div class="title">
            <span>{{ obj.lineName }}</span>
            <van-icon name="arrow" />
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="itemStatus">
            {{ obj.lineStateName }}
          </div>
        </template>
      </van-cell>
      <div class="itemInfo">
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="线路编号："
          :value="obj.lineId"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="仓位置："
          :value="obj.warehouseAreaName"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="配送区域："
          :value="obj.deliveryAreaName"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="外线销售："
          :value="obj.lineSaleNamePhone"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="创建时间："
          :value="timeFormat(obj.createDate,'YYYY-MM-DD')"
        />
      </div>
      <div v-permission="['/v2/line/lineInfo/detail']" class="detailBtn">
        <van-button round plain size="small" class="routeBtn" @click="goRouter">
          详情
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
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
      this.$router.push({ path: '/lineDetail', query: { lineId: this.obj.lineId }})
    },
    timeFormat(date, format) {
      return dayjs(date).format(format)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../DriverList/components/DriverItem.less';
</style>
