<template>
  <div class="driverDetail">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-permission="['/driver/driver/detail']" index="1">基本信息</el-menu-item>
      <el-menu-item v-permission="['/driver/driver/otherInfo']" index="3">其他信息</el-menu-item>
      <!--<el-menu-item index="4">评估信息</el-menu-item>-->
      <el-menu-item v-permission="['/driver/driver/queryOrdersByDriverId']" index="6">订单信息</el-menu-item>
      <!--<el-menu-item index="2">线路标书信息</el-menu-item>-->
      <!--<el-menu-item index="5">支出收入信息</el-menu-item>-->
      <el-menu-item v-permission="['/driver/driver/relatedLineInformation']" index="7">相关线路信息</el-menu-item>
    </el-menu>

    <el-timeline v-if="activeIndex == 1">
      <el-timeline-item timestamp="基本信息" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>姓名 </el-header>
                  <el-main>{{ detail.name | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>身份证号 </el-header>
                  <el-main>{{ detail.idNumber | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>联系电话 </el-header>
                  <el-main>{{ detail.phone | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="24">
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
                  <el-header>工作城市 </el-header>
                  <el-main>{{ detail.workCityName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>户籍地址 </el-header>
                  <el-main>{{ detail.cityName | DataIsNull }}{{ detail.provinceName }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>面试时间 </el-header>
                  <el-main>{{ detail.interviewTime | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>货物经验 </el-header>
                  <el-main>{{ detail.cargoTypeName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>物流从业经验 </el-header>
                  <el-main>{{ detail.workExperienceName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>可接受一天工作时长 </el-header>
                  <el-main>{{ detail.workHourName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>意向车型 </el-header>
                  <el-main>{{ detail.carTypeName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>是否有在还贷款 </el-header>
                  <el-main v-if="detail.isHaveLoan === 1">是</el-main>
                  <el-main v-if="detail.isHaveLoan === 2">否</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>期望月收入 </el-header>
                  <el-main>{{ detail.expMonthlyIncomeName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>司机年龄 </el-header>
                  <el-main>{{ detail.age | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>可接受首付范围 </el-header>
                  <el-main>{{ detail.acceptPayRangeName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>现居住地址 </el-header>
                  <el-main>{{ detail.address | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>之前在哪工作 </el-header>
                  <el-main>{{ detail.whereWorked | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>来源渠道 </el-header>
                  <el-main>{{ detail.sourceName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>征信是否通过 </el-header>
                  <el-main v-if="detail.isCreditPass === 1">是</el-main>
                  <el-main v-else-if="detail.isCreditPass === 2">否</el-main>
                  <el-main v-else>暂无数据</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>是否跟车 </el-header>
                  <el-main v-if="detail.isPay === 1">是</el-main>
                  <el-main v-else-if="detail.isPay === 2">否</el-main>
                  <el-main v-else>暂无数据</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>意向金缴纳日期 </el-header>
                  <el-main>{{ detail.payDate | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>上岗时间 </el-header>
                  <el-main>{{ detail.goToWorkTime | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>

            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>平均月收入 </el-header>
                  <el-main>{{ detail.monthlyIncome | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>

            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>户口类型 </el-header>
                  <el-main>{{ detail.accountType | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>家里几个孩子 </el-header>
                  <el-main>{{ detail.childrenNum | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>

            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>孩子的平均年龄 </el-header>
                  <el-main>{{ detail.childrenAge | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>

            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>是否有货车 </el-header>
                  <el-main v-if="detail.isHaveCar === 1">是</el-main>
                  <el-main v-else-if="detail.isHaveCar === 2">否</el-main>
                  <el-main v-else>暂无数据</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>征信是否通过 </el-header>
                  <el-main v-if="detail.isCreditPass === 1">是</el-main>
                  <el-main v-else-if="detail.isCreditPass === 2">否</el-main>
                  <el-main v-else>暂无数据</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="合同有效期" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>合同签约时间 </el-header>
                  <el-main>{{ detail.contractStart | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>合同终止时间 </el-header>
                  <el-main>{{ detail.contractEnd | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="购车最关注哪些方面" style="margin-top: 20px;" placement="top">
        <el-card>
          {{ detail.buyCarFollow | DataIsNull }}
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="备注" style="margin-top: 20px;" placement="top">
        <el-card>
          {{ detail.remarks | DataIsNull }}
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <OtherInfo v-if="activeIndex == 3"></OtherInfo>

    <!--<AssessInfo v-if="activeIndex == 4"></AssessInfo>-->

    <TenderInformations v-if="activeIndex == 2" @tenderType="tenderType"></TenderInformations>

    <spendInCome v-if="activeIndex == 5"></spendInCome>

    <OrderInfo v-if="activeIndex == 6"></OrderInfo>

    <Correlation v-if="activeIndex == 7"></Correlation>
  </div>
</template>

<script>
import { GetDriverDetail } from '@/api/driver/driver-api'
import permission from '@/directive/permission/index'
import Mallki from '@/components/TextHoverEffect/Mallki'
import TenderInformations from '@/components/TenderInformation'
import spendInCome from '@/components/SpendInCome'
import OtherInfo from '@/components/OtherInfo'
import AssessInfo from '@/components/AssessInfo'
import OrderInfo from '@/components/OrderInfo'
import Correlation from '@/components/Correlation'

export default {
  name: 'DriverDetail',
  components: { Mallki, TenderInformations, spendInCome, OtherInfo, AssessInfo, OrderInfo, Correlation },
  directives: { permission },
  data() {
    return {
      activeIndex: '1',
      loading: false,
      detail: {},
      tenderType: true
    }
  },
  created() {},
  mounted() {
    const id = this.$route.query.id
    this.fetchData(id)
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
    },
    fetchData(id) {
      GetDriverDetail({ driverId: id }).then(res => {
        if (res.data.success) {
          this.detail = res.data.data
          this.detail.buyCarFollow = this.detail.buyCarFollow.replace(',', '')
          if (this.detail.accountType === 1) {
            this.detail.accountType = '城镇户口'
          }
          if (this.detail.accountType === 2) {
            this.detail.accountType = '农村户口'
          }
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }).catch(err => {
        this.$message.error(err);
      })
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .driverDetail{
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
      color:#333;
      font-weight: bold;
      font-size: 16px;
      line-height: 1.4;
    }
  }
</style>
