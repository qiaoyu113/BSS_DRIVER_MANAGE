<template>
  <div class="outLineTender">
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
            <el-button :plain="stateBtn !== 1" type="primary" size="small" @click="stateChange(1)">当前待审核线路数</el-button>
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
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>标书编号：</i>{{ scope.row.tenderId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>创建时间：</i>{{ scope.row.createDate | Timestamp }}</span>
          </div>
          <el-row :gutter="30">
            <el-col :span="7">
              <p><span class="light-font">{{ scope.row.customerName }}（{{ scope.row.cityName }}）</span><span v-if="scope.row.primaryClassificationName">/ {{ scope.row.primaryClassificationName }}</span></p>
              <p>{{ scope.row.lineName }}<span v-if="scope.row.lineRankName">/ {{ scope.row.lineRankName }}</span></p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">标书状态：</span><span class="val">{{ scope.row.tenderStateName }}</span></p>
            </el-col>
            <el-col :span="7">
              <p><span class="light-font">货主报价：</span>{{ scope.row.lowestQuotations }}元</p>
              <p>{{ scope.row.carTypeName }}/{{ scope.row.cargoType }}</p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">仓库位置：</span><span class="val">{{ scope.row.warehouse }}</span></p>
            </el-col>
            <el-col :span="7">
              <p class="el-button--primary is-plain no-bg"><span v-if="scope.row.driverName" class="val">{{ scope.row.driverName }}</span><span v-if="!scope.row.driverName" class="val">未选择司机</span></p>
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
            </el-col>
            <el-col :span="3" class="btnBox">
              <el-button v-permission="['/match/tender/log/list']" type="text" @click="goLog(scope.row.tenderId)">操作记录</el-button>
              <el-button v-permission="['/line/line/task/detail']" type="text" @click="goDetals(scope.row.lineId, scope.row.timeDiff)">详情</el-button>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="140px"
        style="width: 400px; margin-left:50px;"
        @submit.native.prevent>
        <el-form-item label="选择上岗司机" prop="driver">
          <el-input
            v-model="temp.driver"
            placeholder="请输入查询条件"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter2"/>
        </el-form-item>
        <!--<el-form-item-->
        <!--label="选择(预计)上岗时间"-->
        <!--prop="workTime">-->
        <!--<el-date-picker v-model="temp.workTime" type="date" placeholder="请选择预计上岗时间" value-format="timestamp" style="width: auto;"/>-->
        <!--</el-form-item>-->
      </el-form>
      <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
        <el-tab-pane v-for="(item,index) in tabList" :key="index" :label="item.code" :name="item.codeVal"></el-tab-pane>
      </el-tabs>
      <div class="table_box">
        <el-table
          v-loading="listLoading2"
          ref="multipleTable"
          :data="list2"
          :show-header="showHeader"
          tooltip-effect="dark"
          style="width: 100%;max-height:400px;overflow-y: scroll">
          <el-table-column label="选择" width="70" center>
            <template slot-scope="scope">
              <el-radio v-model="radioIndex" :label="scope.$index" class="radio" @change.native="getCurrentRow(scope.row.driverId, scope.row.name)" >&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            label="id"
            width="120">
            <template slot-scope="scope">{{ scope.row.driverId }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
            <template slot-scope="scope">{{ scope.row.name }} {{ scope.row.phone }}</template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.idNumber }}</template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.stateName }}</template>
          </el-table-column>
          <infinite-loading
            slot="append"
            ref="infinite"
            spinner="bubbles"
            @infinite="getDriveList">
            <template slot="no-more">暂无更多数据</template>
          </infinite-loading>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;radioIndex = ''">{{ $t('table.cancel') }}</el-button>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="createData('dataForm')">{{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <!--下线-->
    <el-dialog :visible.sync="dialogFormVisible2" title="下线操作">
      <el-form
        ref="dataForm2"
        :rules="stopRules"
        :model="whyStop"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;">
        <el-form-item label-width="130px" label="下线原因" prop="status" class="postInfo-container-item">
          <el-select v-model="whyStop.status" class="filter-item" placeholder="请选择停用原因">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.code"
              :label="item.code"
              :value="item.codeVal"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="checkStopStatus('dataForm2')">{{ $t('table.confirm') }}
        </el-button>
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
import BackToTop from '@/components/BackToTop'
import { GetTenderListOffined, GetChooseDrive, getDriverListForChooseDriver, offLine } from '@/api/tender/tender-api'
import { getTenderTime } from '@/api/carline/carline-api'
import permission from '@/directive/permission/index'
import { dictionary } from '@/api/common'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'OutLineTender',
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
      fullscreenLoading: false,
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
        state: '3'
      },
      num: 1,
      state: null,
      state2: null,
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        driver: '',
        workTime: ''
      },
      changDriver: {
        driverId: '',
        startingDate: '',
        tenderId: ''
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
      listQuery2: {
        key: '',
        status: '',
        page: 1,
        limit: 100
      },
      list2: [],
      timeList: [],
      tabList: [],
      num2: 0,
      activeName: '',
      radioIndex: '',
      calendarTypeOptions: '',
      dialogFormVisible2: false,
      downLineId: '',
      whyStop: {
        status: ''
      },
      stopRules: {
        status: [{ required: true, message: '请输入下线原因', trigger: 'change' }]
      },
      listLoading2: false
    }
  },
  created() {},
  mounted() {
    // 状态字典查询
    dictionary({
      dictType: 'bid_tender_state'
    }).then(res => {
      this.stateOptions = res.data.data;
      this.stateOptions.unshift({
        code: '全部状态',
        codeVal: ''
      })
    }).catch(err => {
      this.$message.error(err);
    })
    // 司机状态
    dictionary({
      dictType: 'driver_signing'
    }).then(res => {
      this.tabList = res.data.data;
    }).catch(err => {
      this.$message.error(err);
    })
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    goDetals(id, timeDiff) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ name: 'CarLIneDetail', query: { id: id, timeDiff: timeDiff }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ name: 'CarLIneDetail', query: { id: id, timeDiff: timeDiff }})
      }
    },
    goLog(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ name: 'TenderLog', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ name: 'TenderLog', query: { id: id }})
      }
    },
    downLine(id) {
      // 停用原因
      dictionary({
        dictType: 'tender_deadline_reason'
      }).then(res => {
        this.calendarTypeOptions = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      this.dialogFormVisible2 = true;
      this.whyStop.status = '';
      this.downLineId = id;
    },
    changData() {
      this.handleFilter()
    },
    getCurrentRow(val, name) {
      this.temp.driver = name;
      this.changDriver.driverId = val
    },
    handleFilter2() {
      this.num2 = 0
      this.activeName = ''
      this.radioIndex = ''
      this.listQuery2.key = this.temp.driver
      this.listQuery2.status = ''
      this.list2 = []
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        this.state2.reset()
        this.getInfinite(this.state)
      } else {
        this.state2.reset()
      }
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
      this.stateBtn = num;
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
      GetTenderListOffined(this.listQuery).then(response => {
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
    createData(formName) {
      if (this.radioIndex === '') {
        this.temp.driver = ''
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changDriver.startingDate = this.temp.workTime
          this.fullscreenLoading = true;
          GetChooseDrive({
            'driverId': this.changDriver.driverId,
            // 'appointmentDate': this.changDriver.startingDate,
            'tenderId': this.changDriver.tenderId
          }).then(res => {
            if (res.data.success) {
              this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
              })
              this.fullscreenLoading = false;
              this.radioIndex = ''
              this.dialogFormVisible = false;
              setTimeout(() => {
                this.handleFilter()
              }, 1000)
            } else {
              this.$message.error(res.data.errorMsg);
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getDrive($state) {
      this.listLoading2 = true
      getDriverListForChooseDriver(this.listQuery2).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          this.list2 = this.list2.concat(response.data.data)
          this.total2 = response.data.page.total
          this.limit2 = response.data.page.limit
          if (this.radioIndex === '') {
            this.temp.driver = ''
          }
          setTimeout(() => {
            this.listLoading2 = false
            if (!this.listLoading2) {
              $state.loaded()
            }
            if (Math.ceil(this.total2 / this.limit2) < this.listQuery2.page + 1) {
              $state.complete()
            }
          }, 500)
        } else {
          $state.complete()
        }
      })
    },
    getDriveList($state) {
      if (this.listQuery2.page === 1) {
        if (this.listLoading2) {
          setTimeout(() => {
            this.list2 = []
            this.state2 = $state
            this.getDrive($state)
          }, 800)
        } else {
          this.num2 += 1
          this.state2 = $state
          this.listQuery2.page = this.num2
          this.getDrive($state)
        }
      } else {
        if (!this.listLoading2) {
          this.num2 += 1
          this.state2 = $state
          this.listQuery2.page = this.num2
          this.getDrive($state)
        }
      }
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
    tabClick(tab) {
      this.num2 = 0
      this.activeName = tab.name
      this.radioIndex = ''
      this.listQuery2.key = ''
      this.listQuery2.status = tab.name
      this.temp.driver = ''
      this.list2 = []
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        this.state2.reset()
        this.getInfinite(this.state)
      } else {
        this.state2.reset()
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
      this.activeName = ''
      this.list2 = [];
      this.listLoading2 = false;
    },
    changeDriver(id) {
      this.dialogStatus = '选择司机'
      this.dialogFormVisible = true
      this.detetTemp()
      this.changDriver.tenderId = id
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        if (this.state2) {
          this.handleFilter2()
        }
      })
    },
    goEdit(id) {
      this.$router.push({ path: '/add-driver', query: { id: id }})
    },
    checkStopStatus(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('下线操作会导致标书不可用，且无法启用, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            offLine({
              bidId: this.downLineId,
              deadlineReason: this.whyStop.status
            }).then((res) => {
              if (res.data.success) {
                this.dialogFormVisible2 = false;
                this.$message({
                  type: 'success',
                  message: '已下线'
                });
                setTimeout(() => {
                  this.handleFilter();
                }, 1000)
              } else {
                this.$message.error(res.data.errorMsg);
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消下线'
            });
          });
        }
      })
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
  .outLineTender{
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
