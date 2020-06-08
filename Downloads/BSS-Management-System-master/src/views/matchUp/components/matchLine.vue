<template>
  <div class="match-panel">
    <div class="top-info div-row">
      <span class="item-title" v-html="row.title"></span>
      <br>
      <span v-html="row.addr"></span>
    </div>
    <div class="right-top-label">
      <span v-html="row.mgr"></span>
    </div>
    <div class="div-row">
      <span v-for="tag in row.tagState" :key="tag.tag" :class="[tag.state ? 'bg-green':'bg-red']" class="tag-item" v-html="tag.tag"></span>
    </div>
    <div class="div-row">
      <el-row>
        <el-col :span="6">
          <div class="match-score">
            <div>匹配度</div>
            <div>{{ row.match.score }} %</div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="state-item">
            <p>所需车型</p>
            <p><span :class="[row.match.carType?'clor-green el-icon-success':'clor-red el-icon-warning']" class="icon-size"></span></p>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="state-item">
            <p>货物类型</p>
            <p><span :class="[row.match.proType?'clor-green el-icon-success':'clor-red el-icon-warning']" class="icon-size"></span></p>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="state-item">
            <p>到仓区域</p>
            <p><span :class="[row.match.arriveArea?'clor-green el-icon-success':'clor-red el-icon-warning']" class="icon-size"></span></p>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="state-item">
            <p>配送区域</p>
            <p><span :class="[row.match.disArea?'clor-green el-icon-success':'clor-red el-icon-warning']" class="icon-size"></span></p>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="state-item">
            <p>装卸难度</p>
            <p><span :class="[row.match.handleDiff?'clor-green el-icon-success':'clor-red el-icon-warning']" class="icon-size"></span></p>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="state-item">
            <p>出车时段</p>
            <p><span :class="[row.match.driveTime?'clor-green el-icon-success':'clor-red el-icon-warning']" class="icon-size"></span></p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bottom-row">
      <el-row>
        <el-col :span="7">
          <div class="bottom-col">
            <span>结算方式</span>
            <span>{{ row.settlement }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bottom-col">
            <span v-if="row.settlement == '按趟结算'">单趟去油净收入</span>
            <span v-else>预计去油净收入</span>
            <span>¥ {{ row.income }}</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="bottom-col">
            <span>账期</span>
            <span>{{ row.accPeriod }}天</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bottom-col">
            <span>可上车数</span>
            <span>{{ row.availableNum }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="btnVisible" class="recommend-btn">
      <el-button type="primary" plain size="mini" @click="handleRecommend">撮合推荐此路线给司机</el-button>
    </div>
  </div>
</template>

<script>

import { recommend } from '@/api/matchUp/matchup-api'

export default {
  name: 'MatchComp',
  props: {
    params: {
      required: true,
      default: () => {},
      type: Object
    },
    ids: {
      required: false,
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      row: null,
      btnVisible: false
    }
  },
  created() {
    this.row = this.params
    if (this.ids) {
      this.btnVisible = true;
    }
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    handleRecommend() {
      this.$confirm('是否确认撮合推荐此线路给司机?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          lineId: this.row.id,
          driverId: this.ids.driverId
        }
        recommend(params).then(res => {
          console.log(res.data)
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '撮合推荐成功'
            });
            this.$emit('handleFatherMethod')
          } else {
            this.$message({
              type: 'error',
              message: '撮合推荐失败'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $green: rgb(112, 199, 64);
  $red: rgb(220, 104, 87);
  $brown: rgb(247, 218, 225);
  $grey: #cbc5b8;
  $dark-blue: rgb(90,124,170);
  .match-panel{
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    position: relative;
    border: 1px solid $brown;
    .top-info{
      padding-left: 10px;
    }
    .item-title{
      font-size: 18px;
      font-weight: bold;
      color: #000;
    }
    .right-top-label{
      position: absolute;
      right: -1px;
      top: -1px;
      padding: 0 10px;
      color: #fff;
      border-radius: 5px;
      background: $red;
    }
    .tag-item{
      display: inline-block;
      padding: 2px 10px;
      margin: 5px 5px 5px 0;
      border-radius: 10px;
      color: #fff;
      text-align: center;
      font-size: 12px;
      min-width: 100px;
    }
    .state-item{
      text-align: center;
      font-size: 12px;
      color: $grey;
      p{
        margin: 2px;
      }
    }
    .match-score{
      font-size: 18px;
      line-height: 45px;
      div:first-child{
        color: #000;
      }
      div{
        font-weight: bold;
        color: $dark-blue;
        padding: 5px;
        float: left;
        width: 50%;
      }
    }
    .bottom-col{
      font-size: 12px;
      span:first-child{
        color: #000;
        font-weight: inherit;
      }
      span{
        color: $red;
        font-weight: bold;
      }
    }
    .recommend-btn{
      text-align: center;
    }
    .bg-green{
      background: $green;
    }
    .bg-red{
      background: $red;
    }
    .clor-green{
      color: $green;
    }
    .clor-red{
      color: $red;
    }
    .icon-size{
      font-size: 18px;
    }
    .div-row {
      padding: 5px;
      border-bottom: 1px solid rgb(225, 225, 225);
    }
    .bottom-row {
      padding: 5px;
    }

  }
</style>
