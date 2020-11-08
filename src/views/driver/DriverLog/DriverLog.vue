<template>
  <div class="DriverLog">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </van-sticky>
    <div class="logBox">
      <div v-if="Object.keys(newDetail).length > 0" class="datePicker">
        <div class="dateText" @click="showDate = true">
          <span>{{ timeText }}</span>
          <van-icon name="arrow-down" />
        </div>
      </div>
      <p v-if="newDetail.createName" class="tableName" v-text="` 操作人：${newDetail.createName}（${newDetail.createPhone}）`">
      </p>

      <!--共享-->
      <div v-if="busiType === 1" class="tableBox">
        <van-grid :column-num="3">
          <van-grid-item>
            <span>字段名称</span>
          </van-grid-item>
          <van-grid-item>
            <span>现信息</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ timeText }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>面试地址</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.interviewProvinceName + detail.interviewCityName + detail.interviewCountyName + detail.interviewDistrict }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.interviewProvinceName">{{ newDetail.interviewProvinceName + newDetail.interviewCityName + newDetail.interviewCountyName + newDetail.interviewDistrict }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>工作城市</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.workCityName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.workCityName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>司机姓名</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.name }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.name }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>司机手机号</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.phone }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.phone }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>年龄</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.age }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.age }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>是否有车</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ isBoolean(detail.hasCar) }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.hasCar !== undefined">{{ isBoolean(newDetail.hasCar) }}</span>
          </van-grid-item>

          <template v-if="showCurrentCarTypeStatus">
            <van-grid-item>
              <span>当前车型</span>
            </van-grid-item>
            <van-grid-item>
              <span>{{ detail.currentCarTypeName }}</span>
            </van-grid-item>
            <van-grid-item>
              <span>{{ newDetail.currentCarTypeName }}</span>
            </van-grid-item>
          </template>

          <template v-if="showIntentDrivingCarType">
            <van-grid-item>
              <span>意向驾驶车型</span>
            </van-grid-item>
            <van-grid-item>
              <span>{{ detail.intentDrivingCarTypeName }}</span>
            </van-grid-item>
            <van-grid-item>
              <span>{{ newDetail.intentDrivingCarTypeName }}</span>
            </van-grid-item>
          </template>

          <van-grid-item>
            <span>现居住地址</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.liveProvinceName + detail.liveCityName + detail.liveCountyName + detail.liveDistrict }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.liveProvinceName">{{ newDetail.liveProvinceName + newDetail.liveCityName + newDetail.liveCountyName + newDetail.liveDistrict }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>货物运输经验（月）</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.experience }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.experience }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>当前是否无业</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ isBoolean(detail.currentHasWork) }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.currentHasWork !== undefined">{{ isBoolean(newDetail.currentHasWork) }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>意向货物类型</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.intentCargoTypeName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.intentCargoTypeName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>意向工作时间段</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.intentWorkDurationName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.intentWorkDurationName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>是否能承重较重搬运</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ isBoolean(detail.heavyLifting) }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.heavyLifting !== undefined">{{ isBoolean(newDetail.heavyLifting) }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>邀约渠道</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.sourceChannelName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.sourceChannelName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>驾照类型</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.drivingLicenceTypeName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.drivingLicenceTypeName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>是否工作地车牌</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ isBoolean(detail.isLocalPlate) }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.isLocalPlate !== undefined">{{ isBoolean(newDetail.isLocalPlate) }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>高意向工作区域</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.intentWorkProvinceName + detail.intentWorkCityName + detail.intentWorkCountyName + detail.intentWorkDistrict }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.intentWorkProvinceName">{{ newDetail.intentWorkProvinceName + newDetail.intentWorkCityName + newDetail.intentWorkCountyName + newDetail.intentWorkDistrict }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>原收入（去油）（元/月）</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.originIncomeAvg }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.originIncomeAvg }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>期望收入（去油）（元/月）</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.expIncomeAvg }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.expIncomeAvg }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>从业时间（月）</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.workDuration }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.workDuration }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>零散活占比（月）</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.scatteredJobRate }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.scatteredJobRate }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>是否新能源</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ isBoolean(detail.isNewEnergy) }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.isNewEnergy !== undefined">{{ isBoolean(newDetail.isNewEnergy) }}</span>
          </van-grid-item>
        </van-grid>
      </div>

      <!--专车-->
      <div v-if="busiType === 0" class="tableBox">
        <van-grid :column-num="3">
          <van-grid-item>
            <span>字段名称</span>
          </van-grid-item>
          <van-grid-item>
            <span>现信息</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ timeText }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>司机姓名</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.name }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.name }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>邀约方式</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.inviteTypeName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.inviteTypeName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>工作城市</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.workCityName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.workCityName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>邀约渠道</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.inviteTypeName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.inviteTypeName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>了解渠道</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.sourceChannelName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.sourceChannelName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>重代理姓名</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.heavyAgentName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.heavyAgentName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>司机手机号</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.phone }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.phone }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>年龄</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.age }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.age }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>现居住地址</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.liveProvinceName + detail.liveCityName + detail.liveCountyName + detail.liveDistrict }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.liveProvinceName">{{ newDetail.liveProvinceName + newDetail.liveCityName + newDetail.liveCountyName + newDetail.liveDistrict }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>意向工作区域</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.intentWorkProvinceName + detail.intentWorkCityName + detail.intentWorkCountyName + detail.intentWorkDistrict }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.intentWorkProvinceName">{{ newDetail.intentWorkProvinceName + newDetail.intentWorkCityName + newDetail.intentWorkCountyName + newDetail.intentWorkDistrict }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>意向配送模式</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.intentDeliveryModeName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.intentDeliveryModeName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>意向货物类型</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.intentCargoTypeName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.intentCargoTypeName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>意向工作时间段</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.intentWorkDurationName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.intentWorkDurationName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>原收入（去油）（元/月）</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.originIncomeAvg }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.originIncomeAvg }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>期望收入（去油）（元/月）</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.expIncomeAvg }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.expIncomeAvg }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>户籍类型</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ isHouseholdTypeName(detail.householdType) }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.householdType">{{ isHouseholdTypeName(newDetail.householdType) }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>子女数</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.childNum }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.childNum }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>货物运输经验（月）</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.experience }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.experience }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>当前是否无业</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ isBoolean(detail.currentHasWork) }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.currentHasWork !== undefined">{{ isBoolean(newDetail.currentHasWork) }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>实际货车驾龄（月）</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.drivingAge }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.drivingAge }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>本城市居住时长（月）</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.livingAge }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.livingAge }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>驾照类型</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.drivingLicenceTypeName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.drivingLicenceTypeName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>是否有车</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ isBoolean(detail.hasCar) }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.hasCar !== undefined">{{ isBoolean(newDetail.hasCar) }}</span>
          </van-grid-item>

          <template v-if="currentCarTypeStatus">
            <van-grid-item>
              <span>当前车型</span>
            </van-grid-item>
            <van-grid-item>
              <span>{{ detail.currentCarTypeName }}</span>
            </van-grid-item>
            <van-grid-item>
              <span>{{ newDetail.currentCarTypeName }}</span>
            </van-grid-item>
          </template>

          <template v-if="showIntentDrivingCarType">
            <van-grid-item>
              <span>意向驾驶车型</span>
            </van-grid-item>
            <van-grid-item>
              <span>{{ detail.intentDrivingCarTypeName }}</span>
            </van-grid-item>
            <van-grid-item>
              <span>{{ newDetail.intentDrivingCarTypeName }}</span>
            </van-grid-item>
          </template>

          <van-grid-item>
            <span>最大可支付首付款</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.maxAdvancePaymentName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.maxAdvancePaymentName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>是否能承担较重搬运</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ isBoolean(detail.heavyLifting) }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.heavyLifting !== undefined">{{ isBoolean(newDetail.heavyLifting) }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>能否提供个人征信</span>
          </van-grid-item>
          <van-grid-item>
            =
            <span>{{ isBoolean(detail.providePersonalCredit) }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.providePersonalCredit !== undefined">{{ isBoolean(newDetail.providePersonalCredit) }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>投资决策权</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.strategyRightName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.strategyRightName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>有机会合作，看中什么？</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.cooperateFocusPointName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.cooperateFocusPointName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>决定合作的因素</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.cooperateKeyFactorName }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.cooperateKeyFactorName }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>是否高意向司机</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ isBoolean(detail.isAdvancedIntention) }}</span>
          </van-grid-item>
          <van-grid-item>
            <span v-if="newDetail.isAdvancedIntention !== undefined">{{ isBoolean(newDetail.isAdvancedIntention) }}</span>
          </van-grid-item>

          <van-grid-item>
            <span>备注</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ detail.remarks }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ newDetail.remarks }}</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <van-popup
      v-model="showDate"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="timeList"
        value-key="time"
        @cancel="showDate = false"
        @confirm="onConfirmPicker"
      />
    </van-popup>
  </div>
</template>
<script>
import { getOperateTime, historyList, driverDetail } from '@/api/driver.js';
export default {
  data() {
    return {
      showTime: '',
      timeText: '',
      showDate: false,
      timeList: [],
      tableList: [],
      newDetail: {},
      detail: {},
      id: '',
      busiType: ''
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    showIntentDrivingCarType() {
      return this.intentDrivingCarTypeStatus()
    },
    showCurrentCarTypeStatus() {
      return this.currentCarTypeStatus()
    }
  },
  mounted() {
    let id = this.$route.query.id
    let busiType = this.$route.query.busiType
    this.busiType = Number(busiType)
    let params = {
      driverId: id,
      busiType: busiType
    }
    this.id = id
    this.getDetail(id)
    this.getTimeList(params);
  },
  methods: {
    isBoolean(value) {
      if ((typeof value) === 'boolean') {
        if (value) {
          return '是'
        } else {
          return '否'
        }
      } else {
        return ''
      }
    },
    isHouseholdTypeName(value) {
      if ((typeof value) === 'number') {
        if (Number(value) === 1) {
          return '城镇户口'
        } else {
          return '农村户口'
        }
      } else {
        return ''
      }
    },
    intentDrivingCarTypeStatus() {
      if (this.detail.intentDrivingCarType === 0 && this.newDetail.intentDrivingCarType === 0) {
        return false
      } else if (this.detail.intentDrivingCarType === 0 && this.newDetail.intentDrivingCarType === undefined) {
        return false
      } else {
        return true
      }
    },
    currentCarTypeStatus() {
      console.log(this.detail.currentCarType === 0 && this.newDetail.currentCarType === undefined)
      if (this.detail.currentCarType === 0 && this.newDetail.currentCarType === 0) {
        return false
      } else if (this.detail.currentCarType === 0 && this.newDetail.currentCarType === undefined) {
        return false
      } else {
        return true
      }
    },
    async getDetail(id) {
      try {
        let params = {
          driverId: id
        };
        let { data: res } = await driverDetail(params);
        if (res.success) {
          this.detail = res.data.interviewInfoVOList.find(ele => {
            return ele.busiType === this.busiType
          })
        } else {
          this.$toast.fail(res);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        console.log('fail:xxxx');
      }
    },
    async getTimeList(params) {
      console.log(params)
      try {
        this.$loading(true);
        let { data: res } = await getOperateTime(params);
        this.$loading(false);
        if (res.success) {
          this.timeList = res.data;
          if (res.data.length > 0) {
            this.showTime = res.data[0].id;
            this.timeText = res.data[0].time
            this.getHistoryList(this.showTime)
          }
          console.log(res.data);
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        this.$loading(false);
        console.log(`fail:${err}`);
      }
    },
    async getHistoryList(id) {
      try {
        this.$loading(true);
        let { data: res } = await historyList({ id: id });
        this.$loading(false);
        if (res.success) {
          this.newDetail = res.data;
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        this.$loading(false);
        console.log(`fail:${err}`);
      }
    },
    onConfirmPicker(val) {
      console.log(val)
      this.timeText = val.time
      this.showTime = val.time;
      this.showDate = false;
      this.getHistoryList(val.id)
    }
  }
};
</script>
<style lang="less" scoped>
.DriverLog {
  .logBox {
    padding: 10px 15px;
    box-sizing: border-box;
    .tableName {
      font-size: 14px;
      color: #3c4353;
      letter-spacing: 0;
      margin-bottom: 10px;
    }
    .tableBox {
      border: 1px solid #c8c9cc;
      // border-right: 1px solid #c8c9cc;
      border-width: 0 0 0px 1px;
      text-align: center;
    }
  }
  .datePicker {
    display: flex;
    align-items: center;
    justify-content: center;
    .dateText {
      background: #eaeff9;
      border-radius: 12.5px;
      font-size: 12px;
      color: #7f8fbd;
      letter-spacing: 0;
      text-align: center;
      padding: 4px 13px 4px 27px;
      display: flex;
      align-items: center;
      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
