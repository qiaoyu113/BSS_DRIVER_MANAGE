<template>
  <div class="FeedbackDetail">
    <el-timeline>
      <mallki :text="name + '/' + phone" class-name="mallki-text"/>
      <el-timeline-item timestamp="基本信息" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-row :gutter="12">
            <el-col :span="12">
              <el-card shadow="hover">
                <el-container>
                  <el-header>城市</el-header>
                  <el-main>{{ detail.value | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover">
                <el-container>
                  <el-header>问题类型</el-header>
                  <el-main>{{ detail.value | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover">
                <el-container>
                  <el-header>问题内容</el-header>
                  <el-main>{{ detail.value | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover">
                <el-container>
                  <el-header>问题补充</el-header>
                  <el-main>{{ detail.value | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover">
                <el-container>
                  <el-header>是否已解决</el-header>
                  <el-main>{{ detail.value | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover">
                <el-container>
                  <el-header>解决方案</el-header>
                  <el-main>{{ detail.value | DataIsNull }}</el-main>
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
  name: 'FeedbackDetail',
  components: { Mallki },
  data() {
    return {
      loading: false,
      detail: {},
      name: '',
      phone: ''
    }
  },
  created() {},
  mounted() {
    const id = this.$route.query.id
    this.name = this.$route.query.name
    this.phone = this.$route.query.phone
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
  .FeedbackDetail {
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
