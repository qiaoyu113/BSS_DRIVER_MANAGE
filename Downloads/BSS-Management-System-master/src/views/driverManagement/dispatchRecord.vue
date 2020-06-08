<template>
  <div class="DispatchRecord">
    <sticky class-name="sub-navbar" style="height: auto !important;">
      <div class="filter-container">
        <div class="menuBox">
          <span class="topFont">出车时间：</span>
          <el-date-picker
            v-model="DateValue2"
            :picker-options="{ disabledDate(time) {return time.getTime() > Date.now()} }"
            type="daterange"
            value-format="timestamp"
            style="position: relative;top: -4px;"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changData2">
          </el-date-picker>
        </div>
        <p class="warn-content">出车天数 <span>{{ daysOfDriving }}</span>；掉线天数 <span>{{ numberOfDaysDropped }}</span>；外线出车收入 <span>{{ outsideLineIncome }}</span>；外线提报收入 <span>{{ reportingIncomeFromOutside }}</span>元</p>
      </div>
    </sticky>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      :show-header="showHeader"
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="货主名称" prop="id" sortable="custom" align="left">
        <template slot-scope="scope">
          <div class="topBorder">
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>司机编号：</i>{{ listQuery.driverId }}</span>
          </div>
          <el-row :gutter="24">
            <el-col :span="6">
              <p>{{ scope.row.carOutDate }}</p>
              <p v-if="scope.row.state === 1" style="color:#6FABF9;">请假</p>
              <p v-if="scope.row.state === 2" style="color:#F56C6C;">休息</p>
              <p v-else-if="scope.row.state === 3" style="color:#71BF4B;">出车</p>
            </el-col>
            <el-col :span="7">
              <p><span class="light-font">{{ name.customerName }}</span></p>
              <p>{{ name.lineName }}</p>
              <p v-if="name.incomeSettlementMethod === 1">标书价格：{{ name.tenderPrice }}元/趟</p>
              <p v-if="name.incomeSettlementMethod === 2">标书价格：{{ name.tenderPrice }}元/月</p>
            </el-col>
            <el-col :span="6">
              <p>出车收入：{{ scope.row.carIncome }}元</p>
              <p>提报收入：{{ scope.row.reportingIncome }}元</p>
            </el-col>
            <el-col :span="5" class="btnBox">
              <el-button v-permission="['/driver/driver/income/driverIncomeChange']" type="text" @click="changeComeIn()">收入变更</el-button>
              <el-button v-permission="['/driver/driver/income/oneDayOutsideReportDetails']" type="text" @click="goDetals(scope.row.driverId, scope.row.carOutDate, scope.row.carIncome, scope.row.reportingIncome)">司机提报详情</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>

    <el-dialog :visible.sync="dialogFormOperation" title="收入变更">
      <el-form ref="formPost" :model="formPost" :rules="rules" label-position="center">
        <el-form-item label-width="150px" label="变更范围" prop="time">
          <el-date-picker v-model="formPost.time" type="daterange" value-format="timestamp" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="150px" label="变更后收入(元)" prop="money">
          <el-input v-model="formPost.money" type="number" min="0" style="width:260px;" placeholder="请输入变更后收入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormOperation = false">取 消</el-button>
        <el-button type="primary" @click="changeCheck('formPost')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import permission from '@/directive/permission/index'
import Sticky from '@/components/Sticky'
import BackToTop from '@/components/BackToTop'
import { changePriceChecks, fetchListRecord } from '@/api/driver/driver-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'

export default {
  name: 'DispatchRecord',
  components: { Pagination, InfiniteLoading, Sticky, BackToTop },
  directives: { waves, permission },
  data() {
    return {
      myBackToTopStyle: {
        right: '40px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },
      totalDetail: {},
      showHeader: false,
      dialogFormOperation: false,
      tableKey: 0,
      list: [],
      formPost: {
        time: [],
        money: ''
      },
      name: {
        customerName: '',
        incomeSettlementMethod: '',
        tenderPrice: '',
        lineName: ''
      },
      total: 0,
      DateValue2: [new Date().getTime(), new Date().getTime()],
      limit: 0,
      listLoading: true,
      listQuery: {
        driverId: '',
        lineId: '',
        tenderDayMoney: '',
        queryEnd: new Date().getTime(),
        queryStart: new Date().getTime()
      },
      disabled: false,
      num: 1,
      state: null,
      importanceOptions: [1, 2, 3],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      pvData: [],
      rules: {
        time: [{ required: true, message: '请选择变更范围', trigger: 'change' }],
        money: [{ required: true, message: '请输入变更后收入', trigger: 'change' }]
      },
      downloadLoading: false,
      scrollTop: 0,
      daysOfDriving: '',
      numberOfDaysDropped: '',
      outsideLineIncome: '',
      reportingIncomeFromOutside: '',
      detail: '',
      lineCustomerList: []
    }
  },
  created() {},
  mounted() {
    this.listQuery.driverId = this.$route.query.driverId
    this.listQuery.lineId = this.$route.query.lineId
    this.listQuery.tenderDayMoney = this.$route.query.price
    this.name.customerName = this.$route.query.name
    this.name.lineName = this.$route.query.lineName
    this.name.incomeSettlementMethod = this.$route.query.incomeSettlementMethod
    this.name.tenderPrice = this.$route.query.tenderPrice
    this.detail = this.$route.query.detail
    this.getList()
  },
  methods: {
    changeComeIn() {
      this.dialogFormOperation = true;
      this.formPost = {
        time: [],
        money: ''
      }
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.listLoading) {
        this.scrollTop = scrollTop
      }
    },
    getList() {
      this.listLoading = true
      fetchListRecord(this.listQuery).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          this.list = this.list.concat(response.data.data.lineVos)
          this.daysOfDriving = response.data.data.daysOfDriving;
          this.numberOfDaysDropped = response.data.data.numberOfDaysDropped;
          this.outsideLineIncome = response.data.data.outsideLineIncome;
          this.reportingIncomeFromOutside = response.data.data.reportingIncomeFromOutside;
          this.listLoading = false
        }
      })
    },
    changData2() {
      if (this.DateValue2) {
        this.listQuery.queryStart = this.DateValue2[0]
        this.listQuery.queryEnd = this.DateValue2[1]
      } else {
        this.listQuery.queryStart = new Date().getTime()
        this.listQuery.queryEnd = new Date().getTime()
        this.DateValue2 = [new Date().getTime(), new Date().getTime()]
      }
      this.handleFilter()
    },
    handleFilter() {
      this.disabled = true
      this.list = []
      this.getList()
    },
    goLine(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ name: 'AllCarLine', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ name: 'AllCarLine', query: { id: id }})
      }
    },
    goDetals(driverId, time, carIncome, reportingIncome) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ name: 'ComeinDetail', query: { driverId: this.listQuery.driverId, lineId: this.listQuery.lineId, time: time, detail: this.detail, carIncome: carIncome, reportingIncome: reportingIncome }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ name: 'ComeinDetail', query: { driverId: this.listQuery.driverId, lineId: this.listQuery.lineId, time: time, detail: this.detail, carIncome: carIncome, reportingIncome: reportingIncome }})
      }
    },
    changeCheck(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePriceChecks({
            'driverId': this.listQuery.driverId,
            'lineId': this.listQuery.lineId,
            'lineName': this.name.lineName,
            'startTime': this.formPost.time[0],
            'endTime': this.formPost.time[1],
            'money': this.formPost.money
          }).then(res => {
            if (res.data.success) {
              if (res.data.data.flag) {
                this.$message({
                  message: '收入变更成功',
                  type: 'success'
                });
                this.dialogFormOperation = false;
                this.list = [];
                this.getList()
              } else {
                this.$message.error(res.data.data.msg);
              }
            } else {
              this.$message.error(res.data.errorMsg);
            }
          }).catch(err => {
            this.$message.error(err);
          })
        }
      })
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
.DispatchRecord{
  padding:20px;
  padding-top: 0;
  .el-loading-mask{
    z-index: 1000 !important;
  }
  .el-button--mini {
    width: auto
  }
  .el-button--primary.is-plain.no-bg{
    background: none;
    font-weight: bold;
    .val{
      color:#333;
      font-weight: normal;
    }
  }
  .no-bg:hover{
    background: none !important;
    color: inherit;
    pointer-event:none;
  }
  .topBox{
    width:100%;
    background:#fff;
    font-size:14px;
    color:#333;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    span{
      font-size:14px;
      margin-right:20px;
      i{
        color: #67C23A;
        font-weight: bold;
      }
    }
  }
  .filter-container{
    background: #fff;
    padding: 0;
  }
  .sub-navbar{
    padding:0;
    height:auto !important;
  }
  .el-button--mini{
    margin-left: 0 !important;
    margin:5px;
  }
  .el-date-editor .el-range-separator{
    width: 8%;
  }
  .topFont{
    font-size:14px;
    color:#333;
    display: inline-block;
    line-height: 30px !important;
    position: relative;
    top: -4px;
    padding-left: 10px;
  }
  .el-badge__content.is-fixed{
    top:16px;
    z-index:100;
  }
  .el-badge{
    margin-right:20px;
  }
  .menuBox{
    line-height: 20px;
    margin-top: 20px;
  }
  .warn-content{
    text-align: right;
    color: #333;
    /*border:1px solid #c6e2ff;*/
    background-color: #ecf5ff;
    padding:6px 1rem;
    font-size:14px;
    margin-bottom:3px;
    box-shadow: 0 15px 30px -5px rgba(255,255,255,1);
    -webkit-box-shadow: 0 15px 30px -5px rgba(255,255,255,1);
    -moz-box-shadow:0 15px 30px -5px rgba(255,255,255,1);
    span{
      color: #409EFF;
    }
  }
  .topBorder{
    padding:10px 0;
    border-bottom:1px dotted #EBEEF4;
    overflow: hidden;
    color:#ABABAB;
    span{
      margin-right:20px;
      /*color:#333;*/
      i{
        font-style:normal;
        /*font-weight: bold;*/
        /*color:#606266;*/
      }
    }
  }
  .light-font{
    font-weight: bold;
    color:#333;
    font-size:16px;
    margin-right: 10px;
  }
  .noLight-font{
    color:#ABABAB;
  }
  .font-Normal{
    font-weight: normal;
    color:#606266;
  }
  .moreBtn{
    border:none;
    background:none;
    text-align: left;
    padding: 0;
  }
  .btnBox{
    padding:10px 0;
    box-sizing: border-box;
    text-align: center;
    button{
      display: block;
      margin: auto !important;
    }
  }
}
</style>

