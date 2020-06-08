<template>
  <div class="tenderList">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <el-input
          v-model="listQuery.key"
          placeholder="请输入查询条件"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"/>
        <el-button v-waves :disabled="disabled" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <el-select v-model="listQuery.status" placeholder="请选择状态" style="float:right;" @change="handleFilter">
          <el-option
            v-for="item in stateOptions"
            :key="item.codeVal"
            :label="item.code"
            :value="item.codeVal">
          </el-option>
        </el-select>
        <div class="topBox">
          <span>总标书数：<i>{{ totalDetail.all }}</i></span> <span>待中标数：<i>{{ totalDetail.waitPendingNum }}</i></span> <span>中标未成交数：<i>{{ totalDetail.successfulBiddingNum }}</i></span> <span>中标已成交数：<i>{{ totalDetail.successfulBidHasBeenCompletedNum }}</i></span> <span>异常下线数：<i>{{ totalDetail.manualOfflineNum }}</i></span> <span>到期结束下线数：<i>{{ totalDetail.endOfDueLineNum }}</i></span>
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
          <p class="el-button--primary is-plain no-bg"><span class="">货主编号：</span><span class="val">{{ scope.row.customerId }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">线路编号：</span><span class="val">{{ scope.row.lineId }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">标书编号：</span><span class="val">{{ scope.row.tenderId }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="货主编号" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.customerName }}</span></p>
          <p><span>{{ scope.row.lineName }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">仓库位置：</span><span class="val">{{ scope.row.warehouse }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">货主报价：</span><span class="val">{{ scope.row.lowestQuotations }}</span></p>
          <p><span>{{ scope.row.cityName }}</span></p>
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
          <p class="el-button--primary is-plain no-bg"><span class="">提交时间：</span></p>
          <p><span>{{ scope.row.createDate | Timestamp }}</span></p>
          <p><span>{{ scope.row.lineTaskCreater }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="left">
        <template slot-scope="scope">
          <p v-if="scope.row.driverId === ''"><span>未选择司机</span></p>
          <p v-if="scope.row.driverId !== ''" class="el-button--primary is-plain no-bg"><span class="">司机编号：</span><span class="val">{{ scope.row.driverId }}</span></p>
          <p v-if="scope.row.driverId !== ''"><span>{{ scope.row.driverName }}</span></p>
          <p v-if="scope.row.driverId !== ''"><span>{{ scope.row.carTypeName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="标书状态" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">标书状态：</span></p>
          <p><span>{{ scope.row.tenderStateName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--<el-button v-if="scope.row.tenderStateName === '待审核'" type="primary" size="mini" @click="goDetals(scope.row.lineId, scope.row.tenderId)">审核</el-button>-->
          <el-button v-permission="['/bss/v1/bss/tender/selectListByQuery/waitPending']" v-if="scope.row.tenderStateName === '待中标'" type="primary" size="mini" @click="changeDriver(scope.row.tenderId)">选择司机</el-button>
          <el-button type="primary" size="mini" plain @click="goLog(scope.row.tenderId)">操作记录</el-button>
          <el-button v-if="scope.row.tenderStateName === '中标已成交'" type="success" size="mini" plain @click="upLine(scope.row.driverId, scope.row.lineId, scope.row.tenderId, scope.row.thirdDriverId, scope.row.orderNo)">上线</el-button>
          <el-button v-if="scope.row.tenderStateName === '待中标' || scope.row.tenderStateName === '中标未成交' || scope.row.tenderStateName === '中标已成交' || scope.row.tenderStateName === '中标在跑'" type="danger" size="mini" plain @click="downLine(scope.row.tenderId)">下线</el-button>
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
import permission from '@/directive/permission/index'
import { GetTenderList, GetChooseDrive, offLine, getDriverListForChooseDriver, upOnLine } from '@/api/tender/tender-api'
import { getTenderTime } from '@/api/carline/carline-api'
import { dictionary } from '@/api/common'
// import { GetDriverList } from '@/api/driver/driver-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'

export default {
  name: 'TenderList',
  components: { Pagination, InfiniteLoading, Sticky, BackToTop },
  directives: { waves, permission },
  data() {
    return {
      driverOptions: [],
      driverLoading: false,
      optionList: [],
      totalDetail: {},
      calendarTypeOptions: '',
      states: ['Alabama', 'Alaska'],
      myBackToTopStyle: {
        right: '40px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },
      showHeader: false,
      disabled: false,
      tableKey: 0,
      list: [],
      list2: [],
      total: 0,
      total2: 0,
      limit: 0,
      limit2: 0,
      listLoading: true,
      listLoading2: true,
      listQuery: {
        key: '',
        status: '',
        page: 1,
        limit: 100
      },
      listQuery2: {
        key: '',
        status: '',
        page: 1,
        limit: 100
      },
      stateOptions: [],
      num: 1,
      num2: 1,
      state: null,
      state2: null,
      fullscreenLoading: false,
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        driver: '',
        workTime: ''
      },
      whyStop: {
        status: ''
      },
      stopRules: {
        status: [{ required: true, message: '请输入下线原因', trigger: 'change' }]
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        driver: [{ required: true, message: '请输入并选择上岗司机', trigger: 'change' }],
        workTime: [{ required: true, message: '请输入司机上岗时间', trigger: 'change' }]
      },
      downloadLoading: false,
      radioIndex: '',
      changDriver: {
        driverId: '',
        startingDate: '',
        tenderId: ''
      },
      downLineId: '',
      timeList: [],
      indexTab: 1,
      tabName: '',
      activeName: '0',
      tabList: [],
      scrollTop: 0
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
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.listLoading) {
        this.scrollTop = scrollTop
      }
    },
    remoteMethod(query) {
      if (query !== '') {
        this.driverLoading = true;
        // 远程请求搜索司机
        GetTenderList(this.listQuery).then(response => {
          this.driverLoading = false;
          if (response.data.success) {
            const list = response.data.data
            const optionList = list.map(item => {
              return { value: item.customerName, label: item.customerName };
            });
            this.driverOptions = optionList.filter(item => {
              // toLowerCase()将string类型全部转化为小写
              return item;
            })
          }
        })
        // setTimeout(() => {
        //   this.driverLoading = false;
        //   this.driverOptions = this.optionList.filter(item => {
        //     console.log(item)
        //     return item.label.toLowerCase()
        //       .indexOf(query.toLowerCase()) > -1;
        //   });
        // }, 200);
      } else {
        this.driverOptions = [];
      }
    },
    getList($state) {
      this.listLoading = true
      GetTenderList(this.listQuery).then(response => {
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
      this.$router.push({ path: '/add-client-list' })
    },
    detetTemp() {
      this.temp = {
        driver: '',
        workTime: ''
      }
      this.driverOptions = [];
    },
    changeDriver(id) {
      this.dialogStatus = '选择司机'
      this.dialogFormVisible = true
      this.detetTemp()
      this.changDriver.tenderId = id
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editDetails(id) {
      this.$router.push({ path: '/add-car-line', query: { id: id }})
    },
    goDetals(id, id2) {
      this.$router.push({ path: '/tender-audit', query: { id: id, tenderId: id2 }})
    },
    goLog(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/tender-log', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/tender-log', query: { id: id }})
      }
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
    updateData() {},
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
    upLine(driverId, lineId, tenderId, thirdDriverId, orderNo) {
      this.$confirm('是否确认上线?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        upOnLine({
          driverId: driverId,
          lineId: lineId,
          tenderId: tenderId,
          orderNo: orderNo,
          thirdDriverId: thirdDriverId
        }).then(res => {
          if (res.data.success) {
            if (res.data.data.success) {
              this.$message({
                type: 'success',
                message: '上线成功!'
              });
              this.handleFilter();
            } else {
              this.$prompt('请输入云鸟司机编号', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^(.+)$/,
                inputErrorMessage: '司机编号不能为空'
              }).then(({ value }) => {
                console.log(value)
                if (value) {
                  upOnLine({
                    driverId: driverId,
                    lineId: lineId,
                    tenderId: tenderId,
                    orderNo: orderNo,
                    thirdDriverId: value
                  }).then(res => {
                    if (res.data.success) {
                      if (res.data.data.success) {
                        this.$message({
                          type: 'success',
                          message: '上线成功!'
                        });
                        this.handleFilter();
                      }
                    } else {
                      this.$message.error(res.data.errorMsg);
                    }
                  }).catch((err) => {
                    this.$message.error(err);
                  })
                } else {
                  this.$message({
                    type: 'info',
                    message: '司机编号不能为空'
                  });
                }
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消上线'
                });
              });
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
          message: '已取消上线'
        });
      });
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
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  .tenderList{
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
</style>

