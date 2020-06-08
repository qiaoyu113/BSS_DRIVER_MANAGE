<template>
  <div class="CustomDetail">
    <el-timeline>
      <mallki text="客户信息详情" class-name="mallki-text"/>
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
            <el-col v-for="item in detail" :key="item.value" :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>{{ item.fieldName }} </el-header>
                  <el-main>{{ item.value | DataIsNull }}</el-main>
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
import { customerPoolDetail } from '@/api/client/client-api'
import '@/styles/qiaoyu.scss'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  name: 'CustomDetail',
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
      customerPoolDetail({ custClueId: id }).then(res => {
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
  .CustomDetail {
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
