<template>
  <div class="clueDetail">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">基本信息</el-menu-item>
      <el-menu-item index="2">相关信息</el-menu-item>
      <el-menu-item index="3">我的推荐</el-menu-item>
    </el-menu>
    <div v-if="activeIndex === '1'" class="detailBox">
      <AddClueStep3 v-if="activeIndex === '1'"></AddClueStep3>
    </div>

    <ClueInformation v-if="activeIndex === '2'"></ClueInformation>

    <MyRecommended v-if="activeIndex === '3'"></MyRecommended>
  </div>
</template>

<script>
import { clueInfo } from '@/api/clue/clue-api'
import Mallki from '@/components/TextHoverEffect/Mallki'
import ClueInformation from '@/components/ClueInformation'
import MyRecommended from '@/components/MyRecommended'
import AddClueStep3 from '@/components/AddClueStep3'

export default {
  name: 'ClueDetail',
  components: { Mallki, ClueInformation, AddClueStep3, MyRecommended },
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
    this.id = this.$route.query.id || '';
    this.driverId = this.$route.query.driverId || '';
    if (this.$route.query && this.$route.query.activeIndex) {
      this.activeIndex = String(this.$route.query.activeIndex || '1');
    }
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
      this.$router.replace({ name: 'ClueDetail', query: { id: this.id, driverId: this.driverId, activeIndex: key }})
    },
    fetchData(id) {
      clueInfo({ clueId: id }).then(res => {
        if (res.data.success) {
          this.detail = res.data.data
          if (this.detail.accountType === 1) {
            this.detail.accountType = '城镇户口'
          }
          if (this.detail.accountType === 2) {
            this.detail.accountType = '农村户口'
          } else {
            this.detail.accountType = '暂无数据'
          }
          this.detail.buyCarFollow = this.detail.buyCarFollow.replace(',', '');
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
  .clueDetail{
    .detailBox{
      padding:30px 0;
      box-sizing: border-box;
    }
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
