<template>
  <div ref="scrollBox" class="carLinelist">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <el-input
          v-model="listQuery.key"
          placeholder="请输入查询条件"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"/>
        <el-button v-waves :disabled="disabled" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <el-button
          class="filter-item"
          style="margin-right: 10px;float: right;margin-top: 12px;"
          type="primary"
          icon="el-icon-user"
          @click="handleCreate">+ 创建线路任务
        </el-button>
      </div>
      <div class="topBox">
        <span>总提交线路数：<i>{{ totalDetail.all }}</i></span> <span>总提交可上车数：<i>{{ totalDetail.totalDeployNumSum }}</i></span> <span>当前可售线路数：<i>{{ totalDetail.canSellNum }}</i></span> <span>已上车数：<i>{{ totalDetail.publishedBidsNumSum }}</i></span> <span>待审核线路数：<i>{{ totalDetail.waitApplyNum }}</i></span> <span>审核未通过数：<i>{{ totalDetail.applyNotPassNum }}</i></span> <span>审核通过：<i>{{ totalDetail.applyPassNum }}</i></span> <span>线路停用数：<i>{{ totalDetail.selfStateEqStopCount }}</i></span>
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
          <p class="el-button--primary is-plain no-bg"><span class="">货主编号：</span><span class="val">{{ scope.row.customerId }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">线路编号：</span><span class="val">{{ scope.row.lineId }}</span></p>
          <!--<p class="table-name">线路编号：<span>{{ scope.row.lineId }}</span></p>-->
        </template>
      </el-table-column>
      <el-table-column label="货主编号" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.customerName }}</span></p>
          <p><span>{{ scope.row.clueSourceName }}</span></p>
          <p><span>{{ scope.row.lineName }}</span></p>
          <p>
            <span>{{ scope.row.carTypeName }}</span>
            <span> {{ scope.row.cargoType }}</span>
          </p>
          <p class="el-button--primary is-plain no-bg"><span class="">可上车数：</span><span class="val">{{ scope.row.publishedBidsNum }}/{{ scope.row.deployNum }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="仓库位置" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.cityName }}</span></p>
          <p><span>{{ scope.row.cityAreaName }}{{ scope.row.provinceAreaName }}{{ scope.row.districtArea }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">仓库位置：</span><span class="val">{{ scope.row.warehouse }}</span></p>
          <!--<p><span>{{ scope.row.workingTimeStart }} - {{ scope.row.workingTimeEnd }}</span></p>-->
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">货主报价：</span><span class="val">{{ scope.row.preLowestQuotations | NumFormat }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">预估月成交：</span><span class="val">{{ scope.row.monthlyTransaction | NumFormat }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">创建时间：</span><span class="val">{{ scope.row.createDate | Timestamp }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class=""></span><span class="val">{{ scope.row.timeDiff }}</span></p>
          <p class="el-button--primary is-plain no-bg">
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <div v-for="item in timeList" :key="item.id">配送时间：<span class="moreBtnNum">{{ item.workingTimeStart }} - {{ item.workingTimeEnd }}</span></div>
              <el-button slot="reference" class="moreBtn" @click="MoreTime(scope.row.lineId)"><span class="">配送趟数：</span>{{ scope.row.dayNum }}<i class="el-icon-caret-bottom"></i></el-button>
            </el-popover>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">审核状态：</span><span class="val">{{ scope.row.lineStateName }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">线路状态：</span><span class="val">{{ scope.row.selfStateName }}</span></p>
          <p v-if="scope.row.tenderStateName !== '---'" class="el-button--primary is-plain no-bg"><span class="">标书状态：</span>
            <!--<span class="val">{{ scope.row.tenderStateName }}</span>-->
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <div v-for="item in tenderLine" :key="item.id">标书编号：<span class="moreBtnNum">{{ item.bidId }}</span> <span>{{ item.stateName }}</span></div>
              <el-button slot="reference" class="moreBtn" @click="MoreTender(scope.row.lineId)">{{ scope.row.tenderStateName }}<i class="el-icon-caret-bottom"></i></el-button>
            </el-popover>
          </p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--<el-button type="warning" size="mini" plain @click="editDetails(scope.row.lineId)">重新提交</el-button>-->
          <el-button v-if="scope.row.selfState !== 0 && (scope.row.state === 1 || scope.row.state === 3)" type="primary" size="mini" @click="editDetails(scope.row.lineId)">{{ $t('table.edit') }}</el-button>
          <el-button type="primary" size="mini" plain @click="goDetals(scope.row.lineId)">详情</el-button>
          <el-button type="primary" size="mini" plain @click="goOperation(scope.row.lineId)">操作日志</el-button>
          <el-button v-if="scope.row.selfState === 1 || scope.row.selfState === 2" type="danger" size="mini" plain @click="stopStatus(scope.row.lineId)">停用</el-button>
          <el-button v-if="scope.row.selfState !== 0 && scope.row.state === 1" type="primary" size="mini" @click="goAudit(scope.row.lineId, scope.row.tenderId)">审核</el-button>
          <el-button v-if="scope.row.state === 2 && scope.row.selfState !== 0 && (scope.row.publishedBidsNum < scope.row.deployNum)" type="success" size="mini" plain @click="NewLine(scope.row.lineId)">创建新标书</el-button>
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

    <!--<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />-->

    <el-dialog :visible.sync="dialogFormVisible" title="停用操作">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="whyStop"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;">
        <el-form-item label="停用原因" prop="status">
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
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="checkStopStatus('dataForm')">{{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
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
import { fetchList, stopStatus, AddLine, getTenderLine, getTenderTime } from '@/api/carline/carline-api'
import { dictionary } from '@/api/common'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

export default {
  name: 'CarLineList',
  components: { Pagination, InfiniteLoading, Sticky, BackToTop },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
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
      stopId: '',
      showHeader: false,
      tableKey: 0,
      list: [],
      total: 0,
      limit: 0,
      listLoading: true,
      listQuery: {
        key: '',
        customerId: '',
        page: 1,
        limit: 100
      },
      cityList: [],
      disabled: false,
      num: 1,
      state: null,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      whyStop: {
        status: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        status: [{ required: true, message: '请选择停用原因', trigger: 'change' }]
      },
      totalDetail: {},
      tenderLine: [],
      timeList: [],
      scrollTop: 0
    }
  },
  created() {},
  mounted() {
    let id = this.$route.query.id;
    if (id) {
      this.listQuery.customerId = id
    }
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.listLoading) {
        this.scrollTop = scrollTop
      }
    },
    fetchData() {
      // 停用原因
      dictionary({
        dictType: 'line_deadline_reason'
      }).then(res => {
        this.calendarTypeOptions = res.data.data;
        this.dialogFormVisible = true
      }).catch(err => {
        this.$message.error(err);
      })
    },
    getList($state) {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
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
      this.list = []
      this.listQuery.customerId = ''
      this.disabled = true
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
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    goAudit(id, id2) {
      this.$router.push({ path: '/tender-audit', query: { id: id, tenderId: id2 }})
    },
    handleCreate() {
      this.$router.push({ name: 'AddCarLine' })
    },
    editDetails(id) {
      this.$router.push({ name: 'AddCarLine', query: { id: id }})
    },
    goDetals(id) {
      this.$router.push({ name: 'CarLIneDetail', query: { id: id }})
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    stopStatus(id) {
      this.stopId = id;
      this.whyStop.status = '';
      this.fetchData()
    },
    checkStopStatus(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('此操作将导致线路不可用, 且无法启用，是否确认线路停用?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            stopStatus({
              deadlineReason: this.whyStop.status,
              lineId: this.stopId
            }).then((res) => {
              if (res.data.success) {
                if (!res.data.data.success) {
                  let arr = res.data.data.runningTenderVO;
                  let obj = [];
                  arr.forEach((item) => {
                    obj.push(item.tenderId)
                  })
                  this.$message.error('该线路中存在在跑标书：' + obj.toString() + '，请先操作标书下线');
                } else {
                  this.dialogFormVisible = false;
                  this.$message({
                    type: 'success',
                    message: '已停用'
                  });
                  setTimeout(() => {
                    this.handleFilter();
                  }, 1000)
                }
              } else {
                this.$message.error(res.data.errorMsg);
              }
            }).catch(err => {
              this.$message.error(err);
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消停用'
            });
          });
        }
      })
    },
    goOperation(id) {
      this.$router.push({ name: 'LineLog', query: { id: id }})
    },
    NewLine(id) {
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
    },
    MoreTender(id) {
      getTenderLine({
        lineId: id
      }).then((res) => {
        if (res.data.success) {
          this.tenderLine = res.data.data
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }).catch((err) => {
        this.$message.error(err.errorMsg)
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
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  .carLinelist{
    padding:20px;
    padding-top: 0;
    .el-button--mini {
      width: auto
    }
    .el-button--primary.is-plain.no-bg{
      background: none;
      font-weight: bold;
      .val{
        color:#606266;
        font-weight: normal;
      }
    }
    .no-bg:hover{
      background: none !important;
      color: inherit;
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
      height:auto !important;
    }
    .el-button--mini{
      margin-left: 0 !important;
      margin:5px;
    }
    .moreBtn{
      border:none;
      background:none;
      text-align: left;
      padding: 0;
    }
  }
  .moreBtnNum{
    color:#409EFF;
    padding:0 10px;
  }
  .el-message{
    z-index: 3000 !important;
  }
</style>

