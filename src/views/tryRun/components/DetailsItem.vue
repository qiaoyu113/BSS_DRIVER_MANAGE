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
          <div @click="goCustomDetail(lineInfoVO.customerId, '/v2/line/customer/findCustomerInfo')">
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
              v-permission="['/v2/line/customer/findCustomerInfo']"
              class="bottom van-hairline--top flex flex align-center justify-center"
            >
              <div
                class="details van-hairline--surround"
              >
                详情
              </div>
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
            <van-tag v-if="lineInfoVO.labelTypeName" class="tag">
              {{ lineInfoVO.labelTypeName | DataIsNull }}
            </van-tag>
          </template>
          <div @click="goLineDetail(lineInfoVO.lineId, '/v2/line/lineInfo/detail')">
            <van-cell
              title="上岗时间："
              :value="timeFormat(lineInfoVO.driverWorkTime,'YYYY-MM-DD')"
            ></van-cell>
            <van-cell
              title="到仓时间："
              :value="getWorkTime"
            ></van-cell>
            <van-cell
              title="仓库位置："
              :value="warehouseAddress"
            ></van-cell>
            <van-cell
              title="配送车型："
              :value="lineInfoVO.carTypeName | DataIsNull"
            ></van-cell>
            <van-cell
              title="配送区域："
              :value="distributionArea"
            ></van-cell>
            <van-cell
              title="里程时间："
              :value="
                DataIsNull(lineInfoVO.distance)
                  +
                  'km/'
                  +
                  DataIsNull(lineInfoVO.timeDiff)
              "
            ></van-cell>
            <div
              v-permission="['/v2/line/lineInfo/detail']"
              class="bottom van-hairline--top flex flex align-center justify-center"
            >
              <div
                class="details van-hairline--surround"
              >
                详情
              </div>
            </div>
          </div>
        </van-collapse-item>
        <!-- 司机信息 -->
        <van-collapse-item title="司机信息" :name="2">
          <div @click="goDriverDetail(detail.driverId, '/v2/driver/selectDriverDetail')">
            <van-cell
              title="司机信息："
              :value="
                DataIsNull(driverBusiInfoVO.name)
                  + '/' +
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
              :value="driverBusiInfoVO.address | DataIsNull"
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
              v-permission="['/v2/driver/selectDriverDetail']"
              class="bottom van-hairline--top flex flex align-center justify-center"
            >
              <div
                class="details van-hairline--surround"
              >
                详情
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item
          v-for="(item, index) in runTestStatusRecordVOList"
          :key="index"
          :title="item.recordFlag"
          :name="item.id + '-' + index"
        >
          <template v-if="item.recordFlag === '试跑记录'">
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
          <template v-if="item.recordFlag === '创建历史试跑'">
            <!-- 创建历史试跑 -->
            <van-cell
              title="创建人"
              :value="item.dealIdMessage | DataIsNull"
            ></van-cell>
            <van-cell
              title="创建时间："
              :value="item.createDate | DataIsNull"
            ></van-cell>
            <van-cell
              title="配送时间："
              :value="item.createDate | DataIsNull"
            ></van-cell>
          </template>
          <template v-else-if="item.recordFlag.includes('系统掉线记录')">
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
import dayjs from 'dayjs'
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
    // 仓库位置：
    warehouseAddress() {
      let str = ''
      if (this.lineCloudProjectVO.warehouseProvinceName) {
        str = this.lineCloudProjectVO.warehouseProvinceName
      }
      if (this.lineCloudProjectVO.warehouseCityName) {
        str += this.lineCloudProjectVO.warehouseCityName
      }
      if (this.lineCloudProjectVO.warehouseCountyName) {
        str += this.lineCloudProjectVO.warehouseCountyName
      }
      if (this.lineCloudProjectVO.warehouseDistrict) {
        str += this.lineCloudProjectVO.warehouseDistrict
      }
      return str
    },
    // 配送区域
    distributionArea() {
      let str = ''
      if (this.lineInfoVO.provinceAreaName) {
        str = this.lineInfoVO.provinceAreaName
      }
      if (this.lineInfoVO.cityAreaName) {
        str += this.lineInfoVO.cityAreaName
      }
      if (this.lineInfoVO.countyAreaName) {
        str += this.lineInfoVO.countyAreaName
      }
      if (this.lineInfoVO.districtArea) {
        str += this.lineInfoVO.districtArea
      }
      return str
    },
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
    },
    getWorkTime() {
      const timeList = (this.detail.lineInfoVO.lineDeliveryInfoFORMS || []).slice()
      timeList.sort((a, b) => {
        const aTimeList = a.workingTimeStart.split(':')
        const bTimeList = b.workingTimeStart.split(':')
        const aTime = Number(aTimeList[0]) * 60 + Number(aTimeList[1])
        const bTime = Number(bTimeList[0]) * 60 + Number(bTimeList[1])
        return aTime - bTime
      })
      return timeList[0] ? timeList[0].workingTimeStart : ''
    }
  },
  methods: {
    // YYYY-MM-DD dddd HH:mm:ss
    timeFormat(date, format) {
      return dayjs(date).format(format)
    },
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
      if (this.$permissionDetail('/v2/driver/selectDriverDetail')) {
        this.$router.push({
          path: '/driverdetail',
          query: {
            id
          }
        });
      }
    },
    goLineDetail(lineId) {
      if (this.$permissionDetail('/v2/line/lineInfo/detail')) {
        this.$router.push({
          path: '/lineDetail',
          query: {
            lineId
          }
        });
      }
    },
    goCustomDetail(customerId) {
      if (this.$permissionDetail('/v2/line/customer/findCustomerInfo')) {
        this.$router.push({
          path: '/clientDetail',
          query: {
            customerId
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.DetailsItem {
  .van-collapse {
    ::v-deep {
      // .van-cell::after {
      //   border-bottom: 2px solid #e5e9ef;
      //   transform: scale(1);
      // }
      // .van-collapse-item--border::after {
      //   border-top: 2px solid #e5e9ef;
      //   transform: scale(1);
      // }
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
      line-height: normal;
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
}
</style>
