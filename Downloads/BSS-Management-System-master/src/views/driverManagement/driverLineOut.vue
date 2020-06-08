<template>
  <div class="DriverLineOut">
    <p class="warn-content">累计外线出车收入 <span>{{ accumulatedExternalRevenue }}</span>元；累计外线提报收入 <span>{{ accumulatedExternalReportingIncome }}</span>元</p>
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
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>司机编号：</i>{{ scope.row.driverId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>线路编号：</i>{{ scope.row.lineId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>标书编号：</i>{{ scope.row.tenderId }}</span>
          </div>
          <el-row :gutter="30">
            <el-col :span="10">
              <p><span class="light-font">{{ scope.row.customerName }}</span></p>
              <p>{{ scope.row.lineName }}</p>
              <p>{{ scope.row.tenderStateName }}</p>
            </el-col>
            <el-col :span="10">
              <p v-if="scope.row.incomeSettlementMethod === 1">标书价格： {{ scope.row.tenderPrice }}元/趟</p>
              <p v-if="scope.row.incomeSettlementMethod === 2">标书价格： {{ scope.row.tenderPrice }}元/月</p>
              <p>累计出车收入： {{ scope.row.carIncome }}元</p>
              <p>累计提报收入： {{ scope.row.reportingIncome }}元</p>
            </el-col>
            <el-col :span="4" class="btnBox">
              <el-button v-permission="['/driver/driver/income/outsideIncomeDetail']" type="text" @click="goDetals(scope.row.driverId, scope.row.lineId, scope.row.tenderDayPrice, scope.row.customerName, scope.row.lineName, scope.row.incomeSettlementMethod, scope.row.tenderPrice, scope.row)">出车记录</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import permission from '@/directive/permission/index'
import Sticky from '@/components/Sticky'
import BackToTop from '@/components/BackToTop'
import { fetchListOut } from '@/api/driver/driver-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'

export default {
  name: 'DriverLineOut',
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
      tableKey: 0,
      list: [],
      total: 0,
      DateValue2: '',
      limit: 0,
      listLoading: true,
      listQuery: {
        driverId: ''
      },
      disabled: false,
      num: 1,
      state: null,
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
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
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      scrollTop: 0,
      accumulatedExternalReportingIncome: 0,
      accumulatedExternalRevenue: 0,
      lineCustomerList: []
    }
  },
  created() {},
  mounted() {
    this.listQuery.driverId = this.$route.query.driverId
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchListOut(this.listQuery).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          this.list = this.list.concat(response.data.data.lineVos)
          this.accumulatedExternalReportingIncome = response.data.data.accumulatedExternalReportingIncome
          this.accumulatedExternalRevenue = response.data.data.accumulatedExternalRevenue
          this.listLoading = false
        }
      })
    },
    goDetals(driverId, lineId, price, name, lineName, incomeSettlementMethod, tenderPrice, detail) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/dispatch-record', query: { driverId: driverId, lineId: lineId, price: price, name: name, lineName: lineName, incomeSettlementMethod: incomeSettlementMethod, tenderPrice: tenderPrice, detail: detail.toString() }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/dispatch-record', query: { driverId: driverId, lineId: lineId, price: price, name: name, lineName: lineName, incomeSettlementMethod: incomeSettlementMethod, tenderPrice: tenderPrice, detail: JSON.stringify(detail) }})
      }
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
.DriverLineOut{
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

