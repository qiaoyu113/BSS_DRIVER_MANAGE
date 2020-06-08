<template>
  <div class="vendibilityLine">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <div class="menuBox">
          <span class="topFont">审核时间：</span>
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
          <el-badge :value="listQuery.state === 9 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 9" type="primary" size="small" @click="stateChange(9)">可售列表总数</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 9 ? totalDetail.canSellNum : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 9" type="primary" size="small" @click="stateChange(9)">可售线路数</el-button>
          </el-badge>
          <el-badge v-for="(items, length) in lineList" :key="length" :value="Number(listQuery.state) === (Number(length) + Number(1)) ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="Number(listQuery.state) !== (Number(length) + Number(1))" type="primary" size="small" @click="stateChange2(items.codeVal)">{{ items.code }}线路</el-button>
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
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>线路编号：</i>{{ scope.row.lineId }}</span>
            <span v-if="scope.row.auditorInfo.auditDate" :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>审核时间：</i>{{ scope.row.auditorInfo.auditDate | Timestamp }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>创建时间：</i>{{ scope.row.createDate | Timestamp }}<i v-if="scope.row.creatorName">（{{ scope.row.creatorName }}）</i></span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i v-if="scope.row.busiType === 0">(梧桐专车)</i><i v-if="scope.row.busiType === 1">(梧桐共享)</i></span>
          </div>
          <el-row :gutter="30">
            <el-col :span="7">
              <p><span class="light-font">{{ scope.row.customerName }}（{{ scope.row.cityName }}）<i v-if="scope.row.primaryClassificationName">/ {{ scope.row.primaryClassificationName }}</i></span></p>
              <p>{{ scope.row.lineName }} <i v-if="scope.row.lineName">/ {{ scope.row.lineRankName }}</i></p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">线路状态：</span><span class="val">{{ scope.row.selfStateName }}</span></p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">审核状态：</span><span class="val">{{ scope.row.lineStateName }}</span></p>
            </el-col>
            <el-col :span="7">
              <p v-if="scope.row.incomeSettlementMethod === 2"><span class="light-font">货主预计报价(月)：</span>{{ scope.row.preLowestQuotations }}元</p>
              <p v-if="scope.row.incomeSettlementMethod === 1"><span class="light-font">货主单趟报价：</span>{{ scope.row.preLowestQuotations }}元</p>
              <p>{{ scope.row.carTypeName }}/{{ scope.row.cargoType }}</p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">可上车数：</span><span class="val">{{ scope.row.publishedBidsNum }}/{{ scope.row.deployNum }}</span></p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">仓库位置：</span><span class="val">{{ scope.row.warehouse }}</span></p>
            </el-col>
            <el-col :span="7">
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">总计用时：</span><span class="val">{{ scope.row.timeDiff }}</span></p>
              <p class="el-button--primary is-plain no-bg">
                <el-popover
                  placement="right"
                  width="400"
                  trigger="click">
                  <div v-for="item in timeList" :key="item.id">配送时间：<span class="moreBtnNum">{{ item.workingTimeStart }} - {{ item.workingTimeEnd }}</span></div>
                  <el-button slot="reference" class="moreBtn" @click="MoreTime(scope.row.lineId)"><span class="">配送趟数：</span>{{ scope.row.dayNum }}<i class="el-icon-caret-bottom"></i></el-button>
                </el-popover>
              </p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">可售数：</span><span class="val">{{ scope.row.canSellLineNum }}</span></p>
            </el-col>
            <el-col :span="3" class="btnBox">
              <el-button v-permission="['/line/line/task/manuallyCreateTender']" v-role="'wt'" v-if="scope.row.state === 2 && scope.row.selfState !== 0 && (scope.row.publishedBidsNum < scope.row.deployNum)" type="primary" plain size="mini" @click="NewLine(scope.row.lineId, 0)">创建新标书（专车）</el-button>
              <el-button v-permission="['/line/line/task/manuallyCreateTender']" v-role="'pt'" v-if="scope.row.state === 2 && scope.row.selfState !== 0 && (scope.row.publishedBidsNum < scope.row.deployNum)" type="primary" plain size="mini" @click="NewLine(scope.row.lineId, 1)">创建新标书（共享）</el-button>
              <el-button v-permission="['/line/line/task/edit']" v-if="scope.row.busiType === 1 && scope.row.selfState !== 0 && (scope.row.state === 1 || scope.row.state === 2)" type="primary" plain size="mini" style="margin-top: 10px !important;" @click="editDetails(scope.row.lineId)">{{ $t('table.edit') }}</el-button>
              <el-button v-permission="['/bss/v1/bss/tender/listByLineId']" type="text" @click="goAllTender(scope.row.lineId)">所有标书</el-button>
              <el-button v-permission="['/line/line/task/detail']" type="text" @click="goDetals(scope.row.lineId, scope.row.timeDiff, scope.row.monthlyTransaction)">详情</el-button>
              <el-button v-permission="['/line/line/task/log/list']" type="text" @click="goOperation(scope.row.lineId)">操作日志</el-button>
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

    <!--加跑线路标书-->
    <el-dialog :visible.sync="dialogFormVisible" title="加跑线路标书">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-position="left" label-width="70px" style="margin-left:50px;">
        <el-form-item label-width="400px" label="选择下方其中之一线路标书完成撮合">
          <!--<el-input v-model="dataForm.thirdDriverId" placeholder="请输入关键字查询" />-->
          <el-input v-model="dataForm.thirdDriverId" placeholder="请输入关键字查询" class="input-with-select">
            <el-button slot="append" disabled="disabled" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
        <div class="table_box">
          <el-table
            v-loading="listLoading2"
            ref="multipleTable"
            :data="list2"
            :show-header="showHeader"
            tooltip-effect="dark"
            style="width: 100%;max-height:600px;overflow-y: scroll">
            <el-table-column
              label="id"
              width="120">
              <template slot-scope="scope">
                <p class="el-button--primary is-plain no-bg"><span class="">标书编号：</span><span class="val">{{ scope.row.tenderId }}</span></p>
                <p class="el-button--primary is-plain no-bg"><span class="">线路编号：</span><span class="val">{{ scope.row.lineId }}</span></p>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
              <template slot-scope="scope">
                <p>{{ scope.row.customerName }}</p>
                <p>{{ scope.row.lineName }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <p>选中时间：{{ scope.row.createDate }}</p>
                <p class="el-button--primary is-plain no-bg"><span class="">{{ scope.row.tenderStateName }}</span></p>
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
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="upMount('dataForm')">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Sticky from '@/components/Sticky'
import permission from '@/directive/permission/index'
import role from '@/directive/role/index'
import BackToTop from '@/components/BackToTop'
import { fetchListCanSell, getTenderTime, AddLine } from '@/api/carline/carline-api'
import { dictionary } from '@/api/common'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'VendibilityLine',
  components: { Pagination, InfiniteLoading, Sticky, BackToTop },
  directives: { waves, permission, role },
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
        customerId: '',
        endDate: '',
        startDate: '',
        rank: '',
        state: 9
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
      lineList: [],
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
      timeList: [],
      listLoading2: false
    }
  },
  created() {},
  mounted() {
    this.fetchData()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    editDetails(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ name: 'AddCarLine', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ name: 'AddCarLine', query: { id: id }})
      }
    },
    fetchData() {
      // 货主分类
      dictionary({
        dictType: 'line_rank'
      }).then(res => {
        this.lineList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    goDate(id) {
      this.$router.push({ path: '/income-calendar', query: { id: id }})
    },
    goDetals(id, timeDiff, monthlyTransaction) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ name: 'CarLIneDetail', query: { id: id, timeDiff: timeDiff, monthlyTransaction: monthlyTransaction }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ name: 'CarLIneDetail', query: { id: id, timeDiff: timeDiff, monthlyTransaction: monthlyTransaction }})
      }
    },
    NewLine(id, type) {
      // if (type) {
      // if (this.$store.getters.newTab) {
      //   let routeData = this.$router.resolve({ name: 'CreateTenderP', query: { id: id }})
      //   window.open(routeData.href, '_blank');
      // } else {
      //   this.$router.push({ name: 'CreateTenderP', query: { id: id }})
      // }
      // } else {
      this.$confirm('是否创建新标书?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        AddLine({
          lineId: id
        }).then((res) => {
          if (res.data.success) {
            if (res.data.data.flag) {
              this.$message({
                type: 'success',
                message: '创建成功!'
              });
              setTimeout(() => {
                this.handleFilter();
              }, 1000)
            } else {
              this.$message.error(res.data.data.msg)
            }
          } else {
            this.$message.error(res.data.errorMsg);
          }
        }).catch((err) => {
          this.$message.error(err.errorMsg)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
      // }
    },
    goOperation(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ name: 'LineLog', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ name: 'LineLog', query: { id: id }})
      }
    },
    goAllTender(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ name: 'AllTender', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ name: 'AllTender', query: { id: id }})
      }
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
      this.listQuery.rank = '';
      this.totalDetail.all = '...';
      this.handleFilter()
    },
    stateChange2(num) {
      this.listQuery.state = num;
      this.listQuery.rank = num;
      this.totalDetail.all = '...';
      this.handleFilter()
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.listLoading) {
        this.scrollTop = scrollTop
      }
    },
    goAudit(id, id2) {
      this.$router.push({ path: '/tender-audit', query: { id: id, tenderId: id2 }})
    },
    getList($state) {
      this.listLoading = true
      fetchListCanSell(this.listQuery).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          this.list = this.list.concat(response.data.data)
          this.totalDetail = response.data.title
          this.total = response.data.page.total
          this.limit = response.data.page.limit
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
    goDetail(id) {
      this.$router.push({ path: '/driver-detail', query: { id: id }})
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
    MoreTime(id) {
      getTenderTime({
        lineId: id
      }).then((res) => {
        if (res.data.success) {
          this.timeList = res.data.data
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }).catch((err) => {
        this.$message.error(err.errorMsg)
      })
    },
    updateData() {}
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .vendibilityLine{
    padding:20px;
    padding-top: 0;
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
