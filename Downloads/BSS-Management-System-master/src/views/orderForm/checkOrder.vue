<template>
  <div class="pendOrder">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <div class="menuBox">
          <span class="topFont">创建时间：</span>
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
          <el-input
            v-model="listQuery.key"
            placeholder="请输入查询条件"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"/>
          <el-button v-waves :disabled="disabled" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
          <!--<el-button-->
          <!--class="filter-item"-->
          <!--style="float: right;"-->
          <!--type="primary"-->
          <!--icon="el-icon-add"-->
          <!--@click="handleCreate">导出-->
          <!--</el-button>-->
        </div>
        <div>
          <el-badge :value="totalDetail.all" class="item" type="primary">
            <el-button :plain="listQuery.state !== 2" type="primary" size="small" @click="stateChange(2)">总订单数</el-button>
          </el-badge>
        </div>
      </div>
    </sticky>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      :show-header="showHeader"
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column label="货主名称" prop="id" sortable="custom" align="left">
        <template slot-scope="scope">
          <div style="width: 100px;height: 30px;line-height: 30px;text-align: center;position: absolute;right: 10px;color: #e6d3bd;">NO.{{ scope.$index+1 }}</div>
          <div class="topBorder">
            <span><i>订单编号：</i>{{ scope.row.orderId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>标书编号：</i>{{ scope.row.bidId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>司机编号：</i>{{ scope.row.driverId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>创建时间：</i>{{ scope.row.createDate | Timestamp }}<i v-if="scope.row.creatorName">（{{ scope.row.creatorName }}）</i></span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i v-if="scope.row.busiType === 0">(梧桐专车)</i><i v-if="scope.row.busiType === 1">(梧桐共享)</i></span>
          </div>
          <el-row :gutter="20">
            <el-col :span="4">
              <p><span class="light-font">{{ scope.row.driverName }}</span></p>
              <p>{{ scope.row.lineName }}</p>
              <p>{{ scope.row.cityName }}</p>
              <!--<p>已成交数量：{{ scope.row.cityName }}</p>-->
            </el-col>
            <el-col :span="5">
              <p class="light-font">
                <span v-if="scope.row.prodInfo">{{ scope.row.prodInfo.productName | DataIsNull }}</span>
                <span v-if="!scope.row.prodInfo">暂无数据</span>
              </p>
            </el-col>
            <el-col :span="5">
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">订单状态：</span><span class="val">{{ scope.row.stateName }}</span></p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">购车状态：</span><span class="val">{{ scope.row.buyCarStateName }}</span></p>
            </el-col>
            <el-col :span="5">
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">首次付出总计：</span><span v-if="scope.row.prodInfo" class="val">{{ scope.row.prodInfo.totalPayment }}</span><span v-else class="val">0</span></p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">订单总金额：</span><span v-if="scope.row.prodInfo" class="val">{{ scope.row.prodInfo.totalOrder }}</span><span v-else class="val">0</span></p>
            </el-col>
            <el-col :span="4" class="btnBox">
              <el-button v-permission="['/order/orderManager/createNewOrder']" type="text" @click="goCreat(scope.row.bidId, scope.row.driverId, scope.row.orderId, 1)">编辑</el-button>
              <el-button v-permission="['/match/tender/getTenderListByDriverId', '/order/orderManager/orderDetail', '/match/tender/signLineTenderDetail']" type="text" @click="goDetail(scope.row.bidId, scope.row.driverId, scope.row.orderId, 0)">详情</el-button>
              <el-button v-permission="['/order/toConfirm/confirm/button0']" v-if="scope.row.state === 4" type="primary" size="mini" plain @click="goDetail(scope.row.bidId, scope.row.driverId, scope.row.orderId, 1)">确认成交</el-button>
              <el-button v-permission="['/order/orderManager/orderDelete']" type="danger" size="mini" style="margin-top: 10px !important;" @click="deletOrder(scope.row.orderId)">删除</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>

      <infinite-loading
        slot="append"
        ref="infinite"
        spinner="bubbles"
        @infinite="getInfinite">
        <template slot="no-more">暂无更多数据</template>
      </infinite-loading>
    </el-table>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Sticky from '@/components/Sticky'
import permission from '@/directive/permission/index'
import BackToTop from '@/components/BackToTop'
import { GetOrderListReject, orderDelete } from '@/api/order/order-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'PendOrder',
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
      limit: 0,
      listLoading: true,
      listQuery: {
        key: '',
        page: 1,
        limit: 100,
        startDate: '',
        state: 2,
        endDate: ''
      },
      num: 1,
      state: null,
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        driver: '',
        workTime: ''
      },
      disabled: false,
      dialogFormVisible: false,
      dialogFormOperation: false,
      offLineId: '',
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false,
      formPost: {
        offLineOperation: ''
      },
      rules: {
        offLineOperation: [{ required: true, message: '请选择征信是否通过', trigger: 'change' }]
      },
      scrollTop: 0,
      stateBtn: 1,
      DateValue: '',
      DateValue2: '',
      dataForm: {
        driverId: '',
        goToWorkTime: '',
        orderId: '',
        tenderId: '',
        thirdDriverId: ''
      },
      list2: [],
      listLoading2: false
    }
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    goDate(id) {
      this.$router.push({ path: '/income-calendar', query: { id: id }})
    },
    changData() {
      this.handleFilter()
    },
    changData2() {
      if (this.DateValue2) {
        this.listQuery.startDate = this.DateValue2[0]
        this.listQuery.endDate = this.DateValue2[1]
      } else {
        this.listQuery.startDate = ''
        this.listQuery.endDate = ''
      }
      this.handleFilter()
    },
    stateChange(num) {
      this.listQuery.state = num;
      this.totalDetail.all = '...';
      this.handleFilter()
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.listLoading) {
        this.scrollTop = scrollTop
      }
    },
    getList($state) {
      this.listLoading = true
      GetOrderListReject(this.listQuery).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          this.list = this.list.concat(response.data.data)
          this.total = response.data.page.total
          this.limit = response.data.page.limit
          this.totalDetail = response.data.title
          setTimeout(() => {
            this.listLoading = false
            this.disabled = false
            if (!this.listLoading) {
              $state.loaded()
            }
            if (Math.ceil(this.total / this.limit) < this.listQuery.page + 1) {
              $state.complete()
            }
          }, 500)
        } else {
          $state.complete()
        }
      })
    },
    handleSign(id) {
      this.offLineId = id;
      this.formPost.offLineOperation = ''
      this.dialogFormOperation = true
    },
    goSigning(bidId, driverId, orderId) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/signing', query: { bidId: bidId, driverId: driverId, orderId: orderId }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/signing', query: { bidId: bidId, driverId: driverId, orderId: orderId }})
      }
    },
    goDetail(bidId, driverId, orderId, type) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/order-detail', query: { bidId: bidId, driverId: driverId, orderId: orderId, againBtn: type }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/order-detail', query: { bidId: bidId, driverId: driverId, orderId: orderId, againBtn: type }})
      }
    },
    goCreat(bidId, driverId, orderId, type) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/creat-order', query: { bidId: bidId, driverId: driverId, orderId: orderId, type: type }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/creat-order', query: { bidId: bidId, driverId: driverId, orderId: orderId, type: type }})
      }
    },
    getInfinite($state) {
      if (this.listQuery.page === 1) {
        if (this.listLoading) {
          setTimeout(() => {
            this.list = []
            this.state = $state
            this.getList($state)
          }, 800)
        } else {
          this.num += 1
          this.state = $state
          this.listQuery.page = this.num
          this.getList($state)
        }
      } else {
        if (!this.listLoading) {
          this.num += 1
          this.state = $state
          this.listQuery.page = this.num
          this.getList($state)
        }
      }
    },
    handleFilter() {
      this.num = 0
      this.disabled = true
      this.list = []
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        this.state.reset()
        this.getInfinite(this.state)
      } else {
        this.state.reset()
      }
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleCreate() {
      this.$router.push({ path: '/add-driver' })
    },
    detetTemp() {
      this.temp = {
        driver: '',
        workTime: ''
      }
      this.list2 = [];
      this.listLoading2 = false;
    },
    changeDriver(id) {
      this.dialogFormVisible = true
      this.detetTemp()
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    goEdit(id) {
      this.$router.push({ path: '/add-driver', query: { id: id }})
    },
    deletOrder(orderId) {
      this.$confirm('删除操作不可逆，会导致订单下的标书自动释放，更新为待中标，司机状态变更为面试司机，请确认是否继续进行操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orderDelete({
          orderId: orderId
        }).then((res) => {
          if (res.data.success) {
            if (res.data.data.flag) {
              this.$message({
                type: 'success',
                message: '订单已删除'
              });
              setTimeout(() => {
                this.handleFilter()
              }, 1000)
            } else {
              this.$message.error(res.data.data.msg);
            }
          } else {
            this.$message.error(res.data.errorMsg);
          }
        }).catch((err) => {
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    updateData() {}
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .pendOrder{
    padding:20px;
    padding-top: 0;
    .delet_color{
      color: #F56C6C;
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
