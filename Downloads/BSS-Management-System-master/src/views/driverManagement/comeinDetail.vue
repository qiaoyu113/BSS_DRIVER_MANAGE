<template>
  <div class="ComeinDetail">
    <el-timeline>
      <mallki text="司机提报详情" class-name="mallki-text"/>
      <!--<el-timeline-item timestamp="线路状态" style="margin-top: 20px;" placement="top">-->
      <!--<el-card>-->
      <!--<el-card shadow="hover">-->
      <!--<el-container>-->
      <!--<el-main>-->
      <!--<div class="waitPass">{{ detail.city }}</div>-->
      <!--<div class="noPass">{{ detail.city }}</div>-->
      <!--<div class="pass">{{ detail.city }}</div>-->
      <!--</el-main>-->
      <!--<el-main>操作人: {{ detail.city }}</el-main>-->
      <!--</el-container>-->
      <!--</el-card>-->
      <!--</el-card>-->
      <!--</el-timeline-item>-->
      <el-timeline-item timestamp="基本信息" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>司机编号 </el-header>
                  <el-main>{{ detail.driverId | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>司机姓名 </el-header>
                  <el-main>{{ detail.driverName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>工作城市 </el-header>
                  <el-main>{{ detail.cityName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>标书编号 </el-header>
                  <el-main>{{ oldDetail.tenderId | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>标书名称 </el-header>
                  <el-main>{{ oldDetail.lineName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>标书价格 </el-header>
                  <el-main>
                    <p v-if="oldDetail.incomeSettlementMethod === 1">{{ oldDetail.tenderPrice | DataIsNull }}元/趟</p>
                    <p v-if="oldDetail.incomeSettlementMethod === 2">{{ oldDetail.tenderPrice | DataIsNull }}元/月</p>
                  </el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>提报日期 </el-header>
                  <el-main>{{ time | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>提报收入（元） </el-header>
                  <el-main>{{ oldDetail.reportingIncome | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>考勤状态 </el-header>
                  <el-main>{{ detail.state | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col v-if="detail.changedCarIncome" :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>变更后收入（元） </el-header>
                  <el-main>{{ oldDetail.carIncome | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col v-if="detail.signatureReceiptUrl.length > 0" :span="24">
              <el-card shadow="hover">
                <el-container>
                  <el-header>回单照片 </el-header>
                  <el-main>
                    <div v-for="item in detail.signatureReceiptUrl" :key="item.ins" style="float:left;padding:0 20px;box-sizing:border-box;">
                      <img :src="item" alt="" style="width:200px;">
                    </div>
                  </el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="操作记录" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-table
            :data="detail.logVos"
            style="width: 100%">
            <el-table-column
              prop="type"
              label="操作类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="operator"
              label="操作员"
              width="180">
            </el-table-column>
            <el-table-column
              prop="afterState"
              label="操作后状态">
            </el-table-column>
            <el-table-column
              prop="operatingTime"
              label="操作时间">
            </el-table-column>
          </el-table>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { oneDayOutsideReportDetails } from '@/api/driver/driver-api'
import '@/styles/qiaoyu.scss'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  name: 'ComeinDetail',
  components: { Mallki },
  data() {
    return {
      loading: false,
      time: '',
      oldDetail: {},
      detail: {
        clientName: '',
        companyMain: '',
        city: '',
        clientNo: '',
        businessName: '',
        businessPhone: '',
        driverId: '',
        driverName: '',
        state: '',
        address: '',
        endDate: '',
        source: '',
        settlementMonth: '',
        settlementDay: '',
        month: '',
        oldDetail: '',
        signatureReceiptUrl: [],
        day: ''
      }
    }
  },
  created() {},
  mounted() {
    const driverId = this.$route.query.driverId
    const lineId = this.$route.query.lineId
    const time = this.$route.query.time
    this.time = time;
    this.oldDetail = JSON.parse(this.$route.query.detail);
    this.oldDetail.carIncome = this.$route.query.carIncome
    this.oldDetail.reportingIncome = this.$route.query.reportingIncome
    this.fetchData(driverId, lineId, time)
  },
  methods: {
    fetchData(driverId, lineId, time) {
      oneDayOutsideReportDetails({
        driverId: driverId,
        lineId: lineId,
        time: new Date(time).getTime()
      }).then(res => {
        if (res.data.success) {
          let detailNew = res.data.data
          for (var key in detailNew) {
            if (detailNew[key] !== null) {
              this.detail[key] = detailNew[key]
            }
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
  .ComeinDetail {
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
      color:#000;
      font-weight: bold;
      line-height: 1.4;
    }
  }
</style>
