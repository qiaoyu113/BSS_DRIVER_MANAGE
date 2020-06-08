<template>
  <div class="carLIneDetail">
    <el-timeline>
      <mallki :text="detail.lineName + '/' + detail.source + '/' + detail.lineRank" class-name="mallki-text"/>
      <el-timeline-item v-if="detail.selfState === 0" timestamp="线路状态" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-card shadow="hover">
            <el-container>
              <!--<el-main>-->
              <!--<div class="waitPass">{{ detail.city }}</div>-->
              <!--<div class="noPass">{{ detail.city }}</div>-->
              <!--<div class="pass">{{ detail.city }}</div>-->
              <!--</el-main>-->
              <el-main style="color:red;font-weight: bold;text-align: center;">{{ detail.selfStateName }}</el-main>
            </el-container>
          </el-card>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="基本信息" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>货主 </el-header>
                  <el-main>{{ detail.customerName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>城市 </el-header>
                  <el-main>{{ detail.cityName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>线路名称 </el-header>
                  <el-main>{{ detail.lineName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>货物类型 </el-header>
                  <el-main>{{ detail.cargoType | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>收货人类型 </el-header>
                  <el-main>{{ detail.receiverType | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>车型 </el-header>
                  <el-main>{{ detail.carTypeName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>仓位置 </el-header>
                  <el-main>{{ detail.warehouse | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>配送区域是否固定 </el-header>
                  <el-main>
                    <svg-icon v-if="detail.distributionSites === 2" icon-class="noPass" />
                    <svg-icon v-if="detail.distributionSites === 1" icon-class="pass" />
                  </el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>是否需要返仓 </el-header>
                  <el-main>
                    <svg-icon v-if="detail.returnWarehouse === 2" icon-class="noPass" />
                    <svg-icon v-if="detail.returnWarehouse === 1" icon-class="pass" />
                  </el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>是否需要搬运 </el-header>
                  <el-main>
                    <svg-icon v-if="detail.carry === 2" icon-class="noPass" />
                    <svg-icon v-if="detail.carry === 1" icon-class="pass" />
                  </el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>是否需要回单 </el-header>
                  <el-main>
                    <svg-icon v-if="detail.returnBill === 2" icon-class="noPass" />
                    <svg-icon v-if="detail.returnBill === 1" icon-class="pass" />
                  </el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>收入结算方式 </el-header>
                  <el-main>{{ detail.incomeSettlementMethodName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row v-if="detail.incomeSettlementMethod === 1" :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>货主单趟最低报价 </el-header>
                  <el-main>{{ detail.preLowestQuotations | NumFormat }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>预估单趟费用(元)(含油耗、过路、过桥) </el-header>
                  <el-main>{{ detail.monthlyFuelConsumption | NumFormat }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>单趟去油净收入 </el-header>
                  <el-main>{{ Number(detail.preLowestQuotations) - Number(detail.monthlyFuelConsumption) ? Number(detail.preLowestQuotations) - Number(detail.monthlyFuelConsumption) : 0 | NumFormat }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row v-if="detail.incomeSettlementMethod === 2" :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>预计货主月报价 </el-header>
                  <el-main>{{ detail.preLowestQuotations | NumFormat }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>预估月费用(元)(含油耗、过路、过桥) </el-header>
                  <el-main>{{ detail.monthlyFuelConsumption | NumFormat }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>预计去油净收入 </el-header>
                  <el-main>{{ Number(detail.preLowestQuotations) - Number(detail.monthlyFuelConsumption) ? Number(detail.preLowestQuotations) - Number(detail.monthlyFuelConsumption) : 0 | NumFormat }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>油卡结算(%) </el-header>
                  <el-main>{{ detail.fuelRatio | DataIsNull }}%</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>线路区域 </el-header>
                  <el-main>{{ detail.provinceAreaName }}{{ detail.cityAreaName }}{{ detail.countyAreaName }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>具体区域范围 </el-header>
                  <el-main>
                    <el-main>{{ detail.districtArea | DataIsNull }}</el-main>
                  </el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>线路编号 </el-header>
                  <el-main>{{ detail.lineId | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>

            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>线路入池原因 </el-header>
                  <el-main>{{ detail.occurReasonName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>

            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>可上车数 </el-header>
                  <el-main>{{ detail.deployNum | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>线路稳定性 </el-header>
                  <el-main>{{ detail.stabilityRateName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>

            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>账期 </el-header>
                  <el-main>{{ detail.billingCycle | DataIsNull }}天</el-main>
                </el-container>
              </el-card>
            </el-col>

            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>创建线路难度 </el-header>
                  <el-main>{{ detail.handlingDifficultyDegreeName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>

            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>备注信息 </el-header>
                  <el-main>{{ detail.remark | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>线路类型 </el-header>
                  <el-main>{{ detail.distinguishedTypeName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col v-if="detail.waitDirveValidityDuration > 0" :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>线路失效截止时间 </el-header>
                  <el-main>{{ detail.waitDirveValidity | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col v-if="detail.waitDirveValidityDuration > 0" :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>等待上车有效期（天） </el-header>
                  <el-main>{{ detail.waitDirveValidityDuration | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>首岗是否有人跟车
                  </el-header>
                  <el-main>
                    <svg-icon v-if="detail.firstNeededFollow === 2" icon-class="noPass" />
                    <svg-icon v-if="detail.firstNeededFollow === 1" icon-class="pass" />
                  </el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="单趟配送信息" placement="top">
        <el-card>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>预计每日平均配送点位数 </el-header>
                  <el-main>{{ detail.deliveryNum | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>预计每日平均总里程(公里) </el-header>
                  <el-main>{{ detail.distance | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>预计月出车天数 </el-header>
                  <el-main>{{ detail.month | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>预计日工作时间 </el-header>
                  <el-main>
                    <div v-for="item in detail.lineDeliveryInfoFORMS" :key="item.id">{{ item.workingTimeStart }}~{{ item.workingTimeEnd }}</div>
                  </el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>预计每日货物总体积(立方米) </el-header>
                  <el-main>{{ detail.volume | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>预计单件货物重量(kg) </el-header>
                  <el-main>{{ detail.singleCargoWeightName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>每日配送趟数 </el-header>
                  <el-main>{{ detail.dayNumName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>
      <!--<el-timeline-item timestamp="成本计算" placement="top">-->
      <!--<el-card>-->
      <!--<el-row :gutter="12">-->
      <!--<el-col :span="8">-->
      <!--<el-card shadow="hover">-->
      <!--<el-container>-->
      <!--<el-header>预计成本 </el-header>-->
      <!--<el-main>{{ detail.preCost | NumFormat }}</el-main>-->
      <!--</el-container>-->
      <!--</el-card>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<el-card shadow="hover">-->
      <!--<el-container>-->
      <!--<el-header>预计收入 </el-header>-->
      <!--<el-main>{{ detail.preIncome | NumFormat }}</el-main>-->
      <!--</el-container>-->
      <!--</el-card>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<el-card shadow="hover">-->
      <!--<el-container>-->
      <!--<el-header>预计毛利 </el-header>-->
      <!--<el-main>{{ detail.preGrossProfit | NumFormat }}</el-main>-->
      <!--</el-container>-->
      <!--</el-card>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--</el-card>-->
      <!--</el-timeline-item>-->

      <el-timeline-item timestamp="关键信息核对" placement="top">
        <el-card>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>预计月收入 </el-header>
                  <el-main>{{ monthlyTransaction | NumFormat }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>每日总里程（公里） </el-header>
                  <el-main>{{ detail.distance | NumFormat }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>配送总时长 </el-header>
                  <el-main>{{ timeDiff }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getLineDetail } from '@/api/carline/carline-api'
import '@/styles/qiaoyu.scss'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  name: 'CarLIneDetail',
  components: { Mallki },
  data() {
    return {
      loading: false,
      timeDiff: '',
      monthlyTransaction: '',
      detail: {
        customer: '',
        city: '',
        name: '',
        cargo: '',
        consignee: '',
        carType: '',
        address: '',
        distribution: '',
        back: '',
        carry: '',
        price: '',
        pointLocationNum: '',
        pointLocationDistance: '',
        frequency: '',
        startTime: '',
        endTime: '',
        weight: '',
        volume: '',
        lapNum: '',
        cost: '',
        income: '',
        profit: ''
      }
    }
  },
  created() {},
  mounted() {
    const id = this.$route.query.id
    this.timeDiff = this.$route.query.timeDiff
    this.monthlyTransaction = this.$route.query.monthlyTransaction
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      getLineDetail({ lineId: id }).then(res => {
        if (res.data.success) {
          this.detail = res.data.data
          if (this.detail.secondaryClassificationName) {
            this.detail.source = this.detail.primaryClassificationName + '/' + this.detail.secondaryClassificationName
          } else {
            this.detail.source = this.detail.primaryClassificationName
          }
          if (!this.detail.fuelRatio) {
            this.detail.fuelRatio = ''
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .carLIneDetail {
    padding:20px;
    .waitPass{
      color: #409EFF;
    }
    .noPass{
      color: #F56C6C;
    }
    .pass{
      color: #71C546;
    }
    .el-tag--medium {
      height: 38px;
      line-height: 36px;
      font-size: 13px;
    }
    .el-card{
      margin:12px;
      cursor: pointer;
    }
    .el-aside {
      /*font-weight: bold;*/
      color:#409EFF;
      line-height: 1.4;
    }
    .el-header{
      color:#909399;
      height: auto !important;
      padding: 0;
      margin-bottom: 10px;
      font-weight: 500;
    }
    .el-main {
      padding: 0;
      color:#606266;
      line-height: 1.4;
    }
  }
</style>
