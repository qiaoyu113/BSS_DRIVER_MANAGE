<template>
  <div class="formInfo">
    <van-form :show-error="false" label-width="150px">
      <template v-for="type in obj.interviewInfoVOList">
        <div
          v-if="type.busiType === 1"
          :key="type.busiTypeName"
          class="busiTypeBox"
        >
          <van-cell title="共享面试表">
            <template #right-icon>
              <span
                class="doBtn"
                @click="goRouter(type.driverId,type.busiType)"
              >操作记录</span>
            </template>
          </van-cell>
          <van-cell-group>
            <van-field
              label="司机姓名"
              :value="obj.name"
              readonly
              colon
            />
            <van-field
              label="司机电话"
              :value="obj.phone"
              readonly
              colon
            />
            <van-field
              label="面试地址"
              colon
              :value="`${type.interviewProvinceName}${type.interviewCityName}${type.interviewCountyName}`"
              readonly
            />

            <van-field
              label="工作城市"
              :value="obj.workCityName"
              readonly
              colon
            />
            <van-field
              label="司机年龄"
              :value="type.age"
              readonly
              colon
            />
            <van-field
              label="是否有车"
              colon
              :value="type.hasCar=== false ?'否':'是'"
              readonly
            />
            <van-field
              v-if="type.hasCar === true"
              label="当前车型"
              :value="type.currentCarTypeName"
              readonly
              colon
            />
            <van-field
              v-if="type.hasCar === false"
              label="意向驾驶车型"
              :value="type.intentDrivingCarTypeName"
              readonly
              colon
            />
            <van-field
              label="现居住地址"
              colon
              :value="`${type.liveProvinceName}${type.liveCityName}${type.liveCountyName}`"
              readonly
            />
            <van-field
              label="货物运输经验（月）"
              :value="type.experience"
              readonly
              colon
            />
            <van-field
              label="当前是否无业"
              :value="type.currentHasWork===0?'否':'是'"
              readonly
              colon
            />
            <van-field
              label="意向货物类型"
              colon
              :value="type.intentCargoTypeName"
              readonly
            />
            <van-field
              label="意向工作时间段"
              colon
              :value="type.intentWorkDurationName"
              readonly
            />
            <van-field
              label="是否能承担较重搬运"
              colon
              :value="type.heavyLifting ? '是' : '否'"
              readonly
            />
            <van-field
              label="邀约渠道"
              colon
              :value="type.sourceChannelName"
              readonly
            />
            <van-field
              label="驾照类型"
              colon
              :value="type.drivingLicenceTypeName"
              readonly
            />
            <van-field
              label="是否本地工作车牌"
              colon
              :value="type.isLocalPlate===0?'否':'是'"
              readonly
            />
            <van-field
              label="高意向工作区域"
              colon
              :value="type.intentWorkCountyName"
              readonly
            />
            <van-field
              label-width="200px"
              label="原收入(去油)(元/月)"
              colon
              :value="type.originIncomeAvg"
              readonly
            />
            <van-field
              label-width="200px"
              label="期望收入(去油)(元/月)"
              colon
              :value="type.expIncomeAvg"
              readonly
            />
            <van-field
              label="从业时间（月）"
              colon
              :value="type.workDuration"
              readonly
            />
            <van-field
              label="零散活占比（%）"
              colon
              :value="type.scatteredJobRate"
              readonly
            />
            <van-field
              label="是否新能源"
              colon
              :value="type.isNewEnergy===0?'否':'是'"
              readonly
            />
          </van-cell-group>
        </div>
        <div
          v-if="type.busiType === 0"
          :key="type.busiTypeName"
          class="busiTypeBox"
        >
          <van-cell title="专车面试表">
            <template #right-icon>
              <span
                class="doBtn"
                @click="goRouter(type.driverId,type.busiType)"
              >操作记录</span>
            </template>
          </van-cell>
          <van-cell-group>
            <van-field
              label="司机姓名"
              :value="obj.name"
              colon
              readonly
            />
            <van-field
              label="司机电话"
              :value="obj.phone"
              readonly
              colon
            />
            <van-field
              label="邀约方式"
              :value="type.inviteTypeName"
              colon
              readonly
            />
            <van-field
              label="工作城市"
              :value="type.workCityName"
              readonly
              colon
            />
            <van-field
              label="邀约渠道"
              :value="type.sourceChannelName"
              colon
              readonly
            />
            <van-field
              label="您是从哪里了解到我们的加盟方式"
              :value="type.whereKnow"
              colon
              readonly
            />
            <van-field
              label="重代理姓名"
              :value="type.heavyAgentName"
              readonly
              colon
            />
            <van-field
              label="司机年龄"
              :value="type.age"
              colon
              readonly
            />
            <van-field
              label="现居住地址"
              :value="`${type.liveProvinceName}${type.liveCityName}${type.liveCountyName}`"
              readonly
              colon
            />
            <van-field
              label="意向工作区域"
              :value="type.intentWorkCountyName"
              colon
              readonly
            />
            <van-field
              label="意向配送模式"
              :value="type.intentDeliveryModeName"
              readonly
              colon
            />
            <van-field
              label="意向货物类型"
              :value="type.intentCargoTypeName"
              colon
              readonly
            />
            <van-field
              label="意向工作时间段"
              :value="type.intentWorkDurationName"
              readonly
              colon
            />
            <van-field
              label="原收入(去油)(元/月)"
              :value="type.originIncomeAvg"
              colon
              readonly
            />
            <van-field
              label="期望收入(去油)(元/月)"
              :value="type.expIncomeAvg"
              readonly
              colon
            />
            <van-field
              label="户籍类型"
              :value="type.householdTypeName === 1 ? '城镇户口' : '农村户口'"
              colon
              readonly
            />
            <van-field
              label="户籍地址"
              :value="`${type.householdProvinceName}${type.householdCityName}${type.householdCountyName}`"
              readonly
              colon
            />
            <van-field
              label="户籍详细地址"
              :value="type.householdDistrict"
              colon
              readonly
            />
            <van-field
              label="子女数"
              :value="type.childNum"
              readonly
              colon
            />
            <van-field
              label="货物运输经验（月）"
              :value="type.experience"
              colon
              readonly
            />
            <van-field
              label="当前是否无业"
              :value="type.currentHasWork===0?'否':'是'"
              readonly
              colon
            />
            <van-field
              label="实际货车驾龄（月）"
              :value="type.drivingAge"
              colon
              readonly
            />
            <van-field
              label="本城市居住时长（月）"
              :value="type.livingAge"
              readonly
              colon
            />
            <van-field
              label="驾照类型"
              :value="type.drivingLicenceTypeName"
              colon
              readonly
            />
            <van-field
              label="是否有车"
              :value="type.hasCar=== false ? '否' : '是'"
              readonly
              colon
            />
            <van-field
              v-if="type.hasCar=== true"
              label="当前车型"
              :value="type.currentCarTypeName"
              colon
              readonly
            />
            <van-field
              v-if="type.hasCar=== false"
              label="意向驾驶车型"
              :value="type.intentDrivingCarTypeName"
              readonly
              colon
            />
            <van-field
              label="最大可支付首付款"
              :value="type.maxAdvancePaymentName"
              colon
              readonly
            />
            <van-field
              label="是否能承担较重搬运"
              :value="type.heavyLiftingName===0?'否':'是'"
              readonly
              colon
            />
            <van-field
              label="是否提供个人征信"
              :value="type.providePersonalCreditName===0?'否':'是'"
              colon
              readonly
            />
            <van-field
              label="投资决策权"
              :value="type.strategyRightName"
              readonly
              colon
            />
            <van-field
              label="如果有机会和云鸟合作，你看中的是什么？"
              :value="type.cooperateFocusPointName"
              colon
              readonly
            />
            <van-field
              label="最终决定你和云鸟合作的关键因素是什么？"
              :value="type.cooperateKeyFactorName"
              readonly
              colon
            />
            <van-field
              label="是否是高意向司机"
              :value="type.isAdvancedIntention===0?'否':'是'"
              colon
              readonly
            />
            <van-field
              v-if="type.remarks"
              label="备注"
              :value="type.remarks"
              readonly
              colon
            />
          </van-cell-group>
        </div>
      </template>
    </van-form>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    goRouter(id, type) {
      this.$router.push({ path: '/driverLog', query: { id: id, busiType: type }});
    }
  }
};
</script>
<style lang="less" scoped>
.formInfo {
  .van-form .busiTypeBox {
    margin-bottom: 10px;
  }
  .van-cell-group {
    padding: 15px 0;
    box-sizing: border-box;
  }
  .van-cell {
    padding: 3px 15px;
    box-sizing: border-box;
  }
  .van-cell__title {
    font-size: 15px;
    color: #3c4353;
  }
  .doBtn {
    font-size: 12px;
    color: #7f8fbd;
  }
}
.van-form .busiTypeBox:last-child {
    margin-bottom: 0px;
  }
</style>
