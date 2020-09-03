<template>
  <div class="DetailsItem">
    <van-collapse
      v-model="activeNames"
      :border="false"
      class="van-hairline--bottom"
    >
      <div>
        <!-- 客户信息 -->
        <van-collapse-item
          title="客户信息"
          :name="0"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <van-cell title="客户名称：" :value="`${lineInfoVO.customerName}/${lineInfoVO.customerId}`"></van-cell>
          <van-cell title="项目名称：" :value="`${lineCloudProjectVO.projectName}/${lineCloudProjectVO.projectId}`"></van-cell>
          <van-cell title="线路名称：" :value="`${lineInfoVO.lineName}/${lineInfoVO.lineId}`"></van-cell>
          <van-cell title="上岗经理：" :value="`${lineInfoVO.dutyManagerIdName}/${lineInfoVO.dutyManagerIdName}`"></van-cell>
          <van-cell title="外线销售：" :value="`${lineInfoVO.lineSaleName}/${lineInfoVO.lineSalePhone}`"></van-cell>
          <div class="bottom van-hairline--top flex flex align-center justify-center">
            <div class="details van-hairline--surround">
              详情
            </div>
          </div>
        </van-collapse-item>
        <!-- 线路信息 -->
        <van-collapse-item
          :name="1"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template
            #title
          >
            <span class="margin-right-xs">线路信息</span>
            <van-tag
              class="tag"
            >
              {{ lineInfoVO.lineCategory }}
            </van-tag>
            <van-tag
              class="tag"
            >
              {{ lineInfoVO.busiTypeName }}
            </van-tag>
          </template>
          <van-cell title="上岗时间：" :value="`${lineInfoVO.driverWorkTime}`"></van-cell>
          <van-cell title="到仓时间：" :value="`${lineInfoVO.deliveryStartDate}`"></van-cell>
          <van-cell title="仓库位置：" :value="`${lineInfoVO.warehouseProvinceName}${lineInfoVO.warehouseCityName}${lineInfoVO.warehouseCountyName}${lineInfoVO.warehouseDistrict}`"></van-cell>
          <van-cell title="配送车型：" :value="`${lineInfoVO.carTypeName}`"></van-cell>
          <van-cell title="配送区域：" :value="`${lineInfoVO.provinceAreaName}${lineInfoVO.cityAreaName}${lineInfoVO.countyAreaName	}`"></van-cell>
          <van-cell title="里程时间：" :value="`${lineInfoVO.distance}/${lineInfoVO.timeDiff}`"></van-cell>
          <div class="bottom van-hairline--top flex flex align-center justify-center">
            <div class="details van-hairline--surround">
              详情
            </div>
          </div>
        </van-collapse-item>
        <!-- 司机信息 -->
        <van-collapse-item
          title="司机信息"
          :name="2"
        >
          <van-cell title="司机信息：" :value="`${driverBusiInfoVO.name}/${driverBusiInfoVO.phone}`"></van-cell>
          <van-cell title="车型：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
          <van-cell title="车牌号：" :value="``"></van-cell>
          <van-cell title="现住址：" :value="`${driverBusiInfoVO.workCityName}`"></van-cell>
          <van-cell title="加盟经理：" :value="`${driverBusiInfoVO.gmName}/${driverBusiInfoVO.gmPhone}`"></van-cell>
          <div class="bottom van-hairline--top flex flex align-center justify-center">
            <div class="details van-hairline--surround">
              详情
            </div>
          </div>
        </van-collapse-item>
        <!-- 试跑意向记录 -->
        <van-collapse-item
          title="试跑意向记录"
          :name="3"
        >
          <van-cell title="操作人：" :value="`${driverBusiInfoVO.name}/${driverBusiInfoVO.phone}`"></van-cell>
          <van-cell title="操作时间：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
        </van-collapse-item>
        <!-- 上岗记录 -->
        <van-collapse-item
          title="上岗记录"
          :name="4"
        >
          <van-cell title="操作人：" :value="`${driverBusiInfoVO.name}/${driverBusiInfoVO.phone}`"></van-cell>
          <van-cell title="操作时间：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
          <van-cell title="到仓接待人：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
          <van-cell title="到仓时间：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
          <van-cell title="岗前叮嘱：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
        </van-collapse-item>
        <!-- 转试跑记录 -->
        <van-collapse-item
          title="转试跑记录"
          :name="5"
        >
          <van-cell title="操作人：" :value="`${driverBusiInfoVO.name}/${driverBusiInfoVO.phone}`"></van-cell>
          <van-cell title="操作时间：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
          <van-cell title="到仓接待人：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
          <van-cell title="到仓时间：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
          <van-cell title="岗前叮嘱：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
        </van-collapse-item>
        <!-- 掉线记录 -->
        <van-collapse-item
          title="掉线记录"
          :name="6"
        >
          <van-cell title="操作人：" :value="`${driverBusiInfoVO.name}/${driverBusiInfoVO.phone}`"></van-cell>
          <van-cell title="操作时间：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
          <van-cell title="掉线原因：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
          <van-cell title="其他原因：" :value="`${driverBusiInfoVO.carTypeName}`"></van-cell>
        </van-collapse-item>
      </div>
    </van-collapse>
  </div>
</template>

<script>
export default {
  name: 'DetailsItem',
  props: {
    detail: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      activeNames: [0]
    }
  },
  computed: {
    lineInfoVO() {
      return this.detail.lineInfoVO
    },
    lineCloudProjectVO() {
      return this.detail.lineInfoVO.lineCloudProjectVO
    },
    driverBusiInfoVO() {
      return this.detail.driverBusiInfoVO
    }
  }
}
</script>

<style lang="less" scoped>
.DetailsItem{
  .van-collapse {
    ::v-deep {
      .van-cell::after{
        border-bottom: 2px solid #E5E9EF;
        transform: scale(1);
      }
      .van-collapse-item--border::after{
        border-top: 2px solid #E5E9EF;
        transform: scale(1);
      }
      .van-collapse-item__content {
        .van-cell::after{
          display: none;
        }
        .van-cell__title {
          margin-right: 10px;
          flex: none;
          width: 6em;
          font-size: @font-size-md;
          color: @gray-10;
        }
        .van-cell__value {
          flex-wrap: wrap;
          text-align: left;
          font-size: @font-size-md;
          color: @text-color;
        }
      }
    }
    .tag{
      height: 20px;
      padding: 0 11px;
      font-size: @font-size-sm;
      color: #EFF5FE;
      background: #7F8FBD;
      border-radius: 3px;
      &::before{
        display: none;
      }
      &+.tag{
        margin-left: 10px;
      }
    }
    .bottom {
      margin: 0 15px;
      height: 35px;
      .details {
        width: 70px;
        height: 20px;
        line-height: 20px;
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
}
</style>
