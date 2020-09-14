<template>
  <div class="DetailsItem">
    <van-collapse
      v-model="activeNames"
      :border="false"
      class="van-hairline--bottom"
    >
      <div>
        <!-- 客户信息 -->
        <van-collapse-item title="客户信息" :name="0">
          <!-- 使用 title 插槽来自定义标题 -->
          <van-cell
            title="客户名称："
            :value="
              DataIsNull(lineInfoVO.customerName) +
                '/' +
                DataIsNull(lineInfoVO.customerId)
            "
          ></van-cell>
          <van-cell
            title="项目名称："
            :value="
              DataIsNull(lineCloudProjectVO.projectName) +
                '/' +
                DataIsNull(lineCloudProjectVO.projectId)
            "
          ></van-cell>
          <van-cell
            title="线路名称："
            :value="
              DataIsNull(lineInfoVO.lineName) +
                '/' +
                DataIsNull(lineInfoVO.lineId)
            "
          ></van-cell>
          <van-cell
            title="上岗经理："
            :value="
              DataIsNull(lineInfoVO.dutyManagerIdName) +
                '/' +
                DataIsNull(lineInfoVO.dutyManagerPhone)
            "
          ></van-cell>
          <van-cell
            title="外线销售："
            :value="
              DataIsNull(lineInfoVO.lineSaleName) +
                '/' +
                DataIsNull(lineInfoVO.lineSalePhone)
            "
          ></van-cell>
          <div
            class="bottom van-hairline--top flex flex align-center justify-center"
          >
            <div
              class="details van-hairline--surround"
              @click="goCustomDetail(lineInfoVO.customerId)"
            >
              详情
            </div>
          </div>
        </van-collapse-item>
        <!-- 线路信息 -->
        <van-collapse-item :name="1">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="margin-right-xs">线路信息</span>
            <van-tag class="tag">
              {{ lineInfoVO.lineCategoryName | DataIsNull }}
            </van-tag>
            <van-tag class="tag">
              {{ lineInfoVO.busiTypeName | DataIsNull }}
            </van-tag>
          </template>
          <van-cell
            title="上岗时间："
            :value="lineInfoVO.driverWorkTime | DataIsNull"
          ></van-cell>
          <van-cell
            title="到仓时间："
            :value="lineInfoVO.deliveryStartDate | DataIsNull"
          ></van-cell>
          <van-cell
            title="仓库位置："
            :value="
              DataIsNull(lineCloudProjectVO.warehouseProvinceName)
                +
                DataIsNull(lineCloudProjectVO.warehouseCityName)
                +
                DataIsNull(lineCloudProjectVO.warehouseCountyName)
                +
                DataIsNull(lineCloudProjectVO.warehouseDistrict)
            "
          ></van-cell>
          <van-cell
            title="配送车型："
            :value="lineInfoVO.carTypeName | DataIsNull"
          ></van-cell>
          <van-cell
            title="配送区域："
            :value="
              DataIsNull(lineInfoVO.provinceAreaName)
                +
                DataIsNull(lineInfoVO.cityAreaName)
                +
                DataIsNull(lineInfoVO.countyAreaName)
                +
                DataIsNull(lineInfoVO.districtArea)
            "
          ></van-cell>
          <van-cell
            title="里程时间："
            :value="
              DataIsNull(lineInfoVO.distance)
                +
                'km/'
                +
                DataIsNull(lineInfoVO.timeDiff)
                +
                DataIsNull(lineInfoVO.countyAreaName)
            "
          ></van-cell>
          <div
            class="bottom van-hairline--top flex flex align-center justify-center"
          >
            <div
              class="details van-hairline--surround"
              @click="goLineDetail(lineInfoVO.lineId)"
            >
              详情
            </div>
          </div>
        </van-collapse-item>
        <!-- 司机信息 -->
        <van-collapse-item title="司机信息" :name="2">
          <van-cell
            title="司机信息："
            :value="
              DataIsNull(driverBusiInfoVO.name)
                +
                DataIsNull(driverBusiInfoVO.phone)
            "
          ></van-cell>
          <van-cell
            title="车型："
            :value="driverBusiInfoVO.carTypeName | DataIsNull"
          ></van-cell>
          <van-cell
            title="车牌号："
            :value="driverBusiInfoVO.carNo | DataIsNull"
          ></van-cell>
          <van-cell
            title="现住址："
            :value="driverBusiInfoVO.workCityName | DataIsNull"
          ></van-cell>
          <van-cell
            title="加盟经理："
            :value="
              DataIsNull(driverBusiInfoVO.gmName)
                +
                '/'
                +
                DataIsNull(driverBusiInfoVO.gmPhone)
            "
          ></van-cell>
          <div
            class="bottom van-hairline--top flex flex align-center justify-center"
          >
            <div
              class="details van-hairline--surround"
              @click="goDriverDetail(detail.driverId)"
            >
              详情
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item
          v-for="(item, index) in runTestStatusRecordVOList"
          :key="index"
          :title="item.recordFlag"
          :name="item.id + '-' + index"
        >
          <template v-if="item.recordFlag === '试跑意向记录'">
            <!-- 试跑意向记录 -->
            <van-cell
              title="操作人："
              :value="item.dealIdMessage | DataIsNull"
            ></van-cell>
            <van-cell
              title="操作时间："
              :value="item.createDate | DataIsNull"
            ></van-cell>
          </template>
          <template v-else-if="item.recordFlag.includes('掉线记录')">
            <!-- 掉线 -->
            <van-cell
              title="操作人："
              :value="item.dealIdMessage | DataIsNull"
            ></van-cell>
            <van-cell
              title="操作时间："
              :value="item.createDate | DataIsNull"
            ></van-cell>
            <van-cell
              title="掉线原因："
              :value="item.droppedReasonName | DataIsNull"
            ></van-cell>
            <van-cell
              title="其他原因："
              :value="item.otherReason | DataIsNull"
            ></van-cell>
          </template>
          <template v-else>
            <!-- 上岗记录 & 跟车记录 -->
            <van-cell
              title="操作人："
              :value="item.dealIdMessage | DataIsNull"
            ></van-cell>
            <van-cell
              title="操作时间："
              :value="item.createDate | DataIsNull"
            ></van-cell>
            <van-cell
              title="到仓接待人："
              :value="
                DataIsNull(item.receptionist)
                  +
                  '/'
                  +
                  DataIsNull(item.receptionistPhone)
              "
            ></van-cell>
            <van-cell
              title="到仓时间："
              :value="item.arrivalTime | DataIsNull"
            ></van-cell>
            <van-cell
              title="岗前叮嘱："
              :value="item.preJobAdvice | DataIsNull"
            ></van-cell>
          </template>
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
        return {};
      }
    }
  },
  data() {
    return {
      activeNames: [0]
    };
  },
  computed: {
    lineInfoVO() {
      return this.detail.lineInfoVO;
    },
    lineCloudProjectVO() {
      return this.detail.lineInfoVO.lineCloudProjectVO;
    },
    driverBusiInfoVO() {
      return this.detail.driverBusiInfoVO;
    },
    runTestStatusRecordVOList() {
      return this.detail.runTestStatusRecordVOList;
    }
  },
  methods: {
    DataIsNull(value) {
      if (value === 0) {
        return value;
      }
      if (!value && value !== undefined) {
        return '暂无数据';
      }
      if (value === undefined) {
        // return 'Loading...'
        return '暂无数据';
      }
      if (value === '') {
        return '暂无数据';
      }
      return value;
    },
    goDriverDetail(id) {
      this.$router.push({
        path: '/driverdetail',
        query: {
          id
        }
      });
    },
    goLineDetail(lineId) {
      this.$router.push({
        path: '/lineDetail',
        query: {
          lineId
        }
      });
    },
    goCustomDetail(customerId) {
      this.$router.push({
        path: '/clientDetail',
        query: {
          customerId
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.DetailsItem {
  .van-collapse {
    ::v-deep {
      .van-cell::after {
        border-bottom: 2px solid #e5e9ef;
        transform: scale(1);
      }
      .van-collapse-item--border::after {
        border-top: 2px solid #e5e9ef;
        transform: scale(1);
      }
      .van-collapse-item__content {
        .van-cell::after {
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
    .tag {
      height: 20px;
      padding: 0 11px;
      font-size: @font-size-sm;
      color: #eff5fe;
      background: #7f8fbd;
      border-radius: 3px;
      &::before {
        display: none;
      }
      & + .tag {
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
