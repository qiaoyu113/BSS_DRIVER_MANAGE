<template>
  <div class="ListItem" @click="onDetails(item.runTestId)">
    <div class="title flex align-center">
      <div class="title-tag flex align-center justify-center">
        {{ lineInfoEs.lineCategoryName }}
      </div>
      <h3 class="van-ellipsis">
        {{ lineInfoEs.lineName }}/{{ lineInfoEs.lineId }}
      </h3>
      <van-icon name="arrow" />
    </div>
    <div class="list-tag-ct flex align-center">
      <van-tag plain round type="primary" class="tag-item">
        {{ item.statusName }}
      </van-tag>
    </div>
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="上岗时间："
      :value="lineInfoEs.driverWorkTime | parseTime('{y}-{m}-{d}')"
    />
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="仓库位置："
      :value="warehouse"
    />
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="配送车型："
      :value="lineInfoEs.carTypeName"
    />
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="配送区域："
      :value="distribution"
    />
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="里程时间："
      :value="lineInfoEs.distance + 'km/' + lineInfoEs.timeDiff"
    />
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="司机信息："
      :value="item.driverName + '/' + item.driverPhone"
    />
    <van-cell
      title-class="cell-title"
      value-class="cell-value"
      title="创建时间："
      :value="item.createDate | parseTime"
    />
    <div v-if="item.droppedReasonName" class="bottom-tag-ct flex align-center">
      <van-tag
        plain
        round
        type="primary"
        class="bottom-tag"
      >
        {{ item.droppedReasonName }}
      </van-tag>
    </div>
    <div v-permission="['/v2/runtest/runDetial']" class="bottom van-hairline--top flex flex align-center justify-center">
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
  },
  computed: {
    lineInfoEs() {
      return this.item.lineInfoEs || '';
    },
    warehouse() {
      const { lineInfoEs } = this.item;
      if (!lineInfoEs) return ''
      return (
        lineInfoEs.warehouseProvinceName +
        lineInfoEs.warehouseCityName +
        lineInfoEs.warehouseCountyName +
        lineInfoEs.warehouseDistrict
      );
    },
    distribution() {
      const { lineInfoEs } = this.item;
      if (!lineInfoEs) return ''
      return (
        lineInfoEs.provinceAreaName +
        lineInfoEs.cityAreaName +
        lineInfoEs.countyAreaName +
        lineInfoEs.districtArea
      );
    }
  },
  methods: {
    // 跳转详情
    onDetails(id) {
      if (this.$permissionDetail('/v2/runtest/runDetial')) {
        if (this.$checkRouteIsNull(id)) {
          this.$router.push({
            path: '/try-detail',
            query: {
              id
            }
          })
        }
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
    line-height: normal;
    .title-tag {
      margin-right: 10px;
      padding: 0 10px;
      height: 20px;
      font-size: @font-size-sm;
      color: #eff5fe;
      background: #7f8fbd;
      border-radius: 3px;
      white-space: nowrap;
      line-height: normal;
    }
    h3 {
      margin: 0;
      font-size: @font-size-md;
      font-weight: bold;
    }
  }
  .list-tag-ct {
    margin-bottom: 7px;
  }
  .tag-item {
    padding: 0 8px;
    height: 20px;
    border-color: @tab-active-color;
    color: @tab-active-color;
    font-size: @font-size-xs-1;
    border-radius: 12px;
    line-height: normal;
    & + .tag-item {
      margin-left: 10px;
    }
  }
  .van-cell {
    padding: 0;
    &::after {
      display: none;
    }
    .cell-title,
    .cell-value {
      font-size: @font-size-sm-1;
      color: @text-color;
      line-height: 23px;
      flex: none;
    }
    .cell-title {
      flex-shrink: 0;
    }
    .cell-value {
      flex: auto;
      text-align: left;
    }
  }
  .bottom-tag-ct {
    margin-top: 5px;
    .bottom-tag {
      height: 24px;
      padding: 0 11px;
      font-size: @font-size-sm;
      color: #649cee;
      background: #eff5fe;
      border-radius: 3px;
      &::before {
        display: none;
      }
      & + .bottom-tag {
        margin-left: 10px;
      }
    }
  }
  .bottom {
    margin-top: 5px;
    height: 30px;
    .details {
      width: 70px;
      padding: 2px 0;
      line-height: normal;
      color: #838a9d;
      border-radius: 10px;
      text-align: center;
      font-size: @font-size-sm;
      &::after {
        border-radius: 20px;
      }
    }
  }
}
</style>
