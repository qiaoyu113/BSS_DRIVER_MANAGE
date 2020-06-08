<template>
  <div class="ClientDetail">
    <el-timeline>
      <mallki text="货主信息详情" class-name="mallki-text"/>
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
                  <el-header>货主简称 </el-header>
                  <el-main>{{ detail.customerName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>货主公司主体 </el-header>
                  <el-main>{{ detail.customerNameAll | DataIsNull }}</el-main>
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
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>货主编号 </el-header>
                  <el-main>{{ detail.customerId | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>业务对接人姓名 </el-header>
                  <el-main>{{ detail.bussinessName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>业务对接人联系电话 </el-header>
                  <el-main>{{ detail.bussinessPhone | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>详细地址 </el-header>
                  <el-main>{{ detail.address | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>合同止期 </el-header>
                  <el-main>{{ detail.contractEnd | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>一级分类 </el-header>
                  <el-main>{{ detail.primaryClassificationName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col v-if="detail.secondaryClassificationName" :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>二级分类 </el-header>
                  <el-main>{{ detail.secondaryClassificationName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col v-if="detail.customerIdOpposite" :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>第三方货主编号 </el-header>
                  <el-main>{{ detail.customerIdOpposite | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>结算周期日 </el-header>
                  <el-main>( {{ detail.billingCycle }}天）{{ detail.month }}个月{{ detail.day }}天</el-main>
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
import { getClientDetail } from '@/api/client/client-api'
import '@/styles/qiaoyu.scss'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  name: 'ClientDetail',
  components: { Mallki },
  data() {
    return {
      loading: false,
      detail: {
        clientName: '',
        companyMain: '',
        city: '',
        clientNo: '',
        businessName: '',
        businessPhone: '',
        address: '',
        endDate: '',
        source: '',
        settlementMonth: '',
        settlementDay: '',
        month: '',
        day: ''
      }
    }
  },
  created() {},
  mounted() {
    const id = this.$route.query.id
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      getClientDetail({ customerId: id }).then(res => {
        if (res.data.success) {
          this.detail = res.data.data
          this.detail.month = parseInt(this.detail.billingCycle / 30)
          this.detail.day = parseInt(this.detail.billingCycle - (this.detail.month * 30))
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .ClientDetail {
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
