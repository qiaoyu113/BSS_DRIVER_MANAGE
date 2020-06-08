<template>
  <div class="behaviorMonitoring">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <div class="menuBox">
          <!--<span class="topFont">上岗时间：</span>-->
          <!--<el-date-picker-->
          <!--v-model="DateValue"-->
          <!--type="daterange"-->
          <!--style="position: relative;top: -4px;"-->
          <!--range-separator="至"-->
          <!--start-placeholder="开始日期"-->
          <!--end-placeholder="结束日期"-->
          <!--value-format="timestamp"-->
          <!--@change="changData">-->
          <!--</el-date-picker>-->
          <span class="topFont">出车时间：</span>
          <el-date-picker
            v-model="DateValue2"
            :picker-options="pickerOptions"
            type="daterange"
            style="position: relative;top: -4px;"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
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
          <!--v-permission="['/driver/driver/moniter/exportExcelList']"-->
          <!--class="filter-item"-->
          <!--style="float: right;"-->
          <!--type="primary"-->
          <!--icon="el-icon-add"-->
          <!--@click="exportBtn">导出-->
          <!--</el-button>-->
        </div>
        <div>
          <el-badge :value="listQuery.state === '' ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== ''" type="primary" size="small" @click="stateChange('')">开跑总数</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 1 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 1" type="primary" size="small" @click="stateChange(1)">在线数</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 2 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 2" type="primary" size="small" @click="stateChange(2)">掉线数</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 3 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 3" type="primary" size="small" @click="stateChange(3)">收入异常数</el-button>
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
          <div class="topBorder">
            <span><i>订单编号：</i>{{ scope.row.orderId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>司机编号：</i>{{ scope.row.driverId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>上岗时间：</i>{{ scope.row.goToWorkTime | Timestamp }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>操作人：</i>{{ scope.row.creatorName }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>线路标书：</i>{{ scope.row.bidId }}</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="5">
              <p><span class="light-font">{{ scope.row.driverName }}</span> {{ scope.row.driverPhone }}</p>
              <p>{{ scope.row.cityName }} {{ scope.row.carTypeName }}</p>
              <p>云鸟司机编号：
                <span v-if="scope.row.thirdDriverId">{{ scope.row.thirdDriverId }}</span>
                <span v-if="!scope.row.thirdDriverId" class="val">暂无数据</span>
              </p>
            </el-col>
            <el-col :span="4">
              <p v-if="scope.row.driverState === 1"><svg-icon icon-class="onLine" /> 在线</p>
              <p v-if="scope.row.driverIncomeState === 1"><svg-icon icon-class="onLine" /> 收入正常</p>
              <p v-if="scope.row.driverState === 2"><svg-icon icon-class="lostLine" /> 掉线</p>
              <p v-if="scope.row.driverIncomeState === 2"><svg-icon icon-class="lostLine" /> 收入异常</p>
              <p class="el-button--primary is-plain no-bg">
                <span class="font-Normal">月保障率：</span>
                <span v-if="scope.row.monthlyGuaranteeRate">{{ scope.row.monthlyGuaranteeRate }}</span>
                <span v-if="!scope.row.monthlyGuaranteeRate" class="val">暂无数据</span>
              </p>
            </el-col>
            <el-col :span="6">
              <p class="el-button--primary is-plain no-bg">
                <span class="font-Normal">本月出车：</span>
                <span v-if="scope.row.numberOfDaysOfDrivingThisMonth">{{ scope.row.numberOfDaysOfDrivingThisMonth }}天 {{ scope.row.totalVehicleRevenueThisMonth }}元</span>
                <span v-if="!scope.row.numberOfDaysOfDrivingThisMonth" class="val">暂无数据</span>
              </p>
              <p class="el-button--primary is-plain no-bg">
                <span class="font-Normal">最近出车：</span>
                <span v-if="scope.row.recentDepartureTime">{{ scope.row.recentDepartureTime }} {{ scope.row.recentIncomeOnTheDayOfDeparture }}</span>
                <span v-if="!scope.row.recentDepartureTime" class="val">暂无数据</span>
              </p>
              <p class="el-button--primary is-plain no-bg">
                <span class="font-Normal">历史出车日均收入：</span>
                <span v-if="scope.row.historicalAverageDailyIncomeStr">{{ scope.row.historicalAverageDailyIncomeStr }}</span>
                <span v-if="!scope.row.historicalAverageDailyIncomeStr" class="val">暂无数据</span>
              </p>
            </el-col>
            <el-col :span="5">
              <p class="el-button--primary is-plain no-bg">
                <span v-if="scope.row.periodTime">{{ scope.row.periodTime }}</span>
                <span v-if="!scope.row.periodTime" class="val">暂无数据</span>
              </p>
              <p class="el-button--primary is-plain no-bg">
                <span class="font-Normal">理论累计收入：</span>
                <span v-if="scope.row.theoreticalCumulativeIncome">{{ scope.row.theoreticalCumulativeIncome }}</span>
                <span v-if="!scope.row.theoreticalCumulativeIncome" class="val">暂无数据</span>
              </p>
              <p class="el-button--primary is-plain no-bg">
                <span class="font-Normal">实际累计收入：</span>
                <span v-if="scope.row.actualAccumulatedIncome">{{ scope.row.actualAccumulatedIncome }}</span>
                <span v-if="!scope.row.actualAccumulatedIncome" class="val">暂无数据</span>
              </p>
            </el-col>
            <el-col :span="4" class="btnBox">
              <div style="width: 100px;height: 30px;line-height: 30px;text-align: center;position: absolute;right: -30px;top:-5px;color: #e6d3bd;">NO.{{ scope.$index+1 }}</div>
              <el-button v-if="scope.row.driverState === 1" type="text" @click="guard(scope.row.driverId, scope.row.orderId, scope.row.bidId, scope.row.driverName, scope.row, 1)">加跑线路标书</el-button>
              <!--<el-button v-permission="['/driver/driver/income/calendar']" type="text" size="mini" @click="goLineIn(scope.row.driverId)">内线收入<i class="el-icon-arrow-right el-icon-download"></i></el-button>-->
              <el-button v-permission="['/driver/driver/income/outsideIncomeList']" type="text" @click="goLineOut(scope.row.driverId)">外线收入<i class="el-icon-arrow-right el-icon-upload2"></i></el-button>
              <el-button v-permission="['/driver/driver/income/driverAttendanceManagementList']" type="text" @click="checkWork(scope.row.driverId)">考勤管理</el-button>
              <el-button v-if="scope.row.driverState === 2" type="text" @click="guard(scope.row.driverId, scope.row.orderId, scope.row.bidId, scope.row.driverName, scope.row, 2)">操作上线</el-button>
              <el-button v-permission="['/driver/driver/income/calendar']" type="primary" style="margin-top:5px !important;" size="mini" plain @click="goDate(scope.row.driverId, scope.row.orderId)">收入详情</el-button>
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
    <el-dialog :visible.sync="dialogFormVisible" :title="titleAdd">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-position="left" label-width="70px" style="margin-left:50px;">
        <el-form-item label-width="120px" label="司机编号">
          <el-input v-model="dataForm.thirdDriverId" style="max-width: 220px;" placeholder="请输入司机编号" />
        </el-form-item>
        <!--<el-form-item label-width="120px" label="合同开始时间" prop="goToWorkTime">-->
        <!--<el-date-picker v-model="dataForm.goToWorkTime" type="datetime" value-format="timestamp" placeholder="请输入合同开始时间"/>-->
        <!--</el-form-item>-->
        <div style="max-width: 320px;">
          <el-input v-model="findKey" placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" :disabled="disabled" icon="el-icon-search" @click="findDriver"></el-button>
          </el-input>
          <p style="font-size:13px;color:#999;">* 请选择需要上岗的标书</p>
        </div>
        <div class="table_box">
          <el-table
            v-loading="listLoading2"
            ref="multipleTable"
            :data="list2"
            :show-header="showHeader"
            tooltip-effect="dark"
            style="width: 100%;max-height:600px;overflow-y: scroll"
            @selection-change="getCurrentRow">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="id">
              <template slot-scope="scope">
                <p class="el-button--primary is-plain no-bg"><span class="val">{{ scope.row.tenderId }}</span></p>
              </template>
            </el-table-column>
            <el-table-column
              prop="name">
              <template slot-scope="scope">
                <p>{{ scope.row.customerName }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="name">
              <template slot-scope="scope">
                <p>{{ scope.row.lineName }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="address">
              <template slot-scope="scope">
                <p>{{ scope.row.workingTimeRegin }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="address">
              <template slot-scope="scope">
                <p>货主报价：{{ scope.row.preLowestQuotations }}</p>
              </template>
            </el-table-column>
            <infinite-loading
              slot="append"
              ref="infinite"
              spinner="bubbles"
              @infinite="getOrderDuty">
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
import BackToTop from '@/components/BackToTop'
import permission from '@/directive/permission/index'
import { GetDriverMonitoring, offLineChecks, exportExcelList } from '@/api/driver/driver-api'
import { goToWorkAdd, getTenderForOrderDuty, beforeGotowork } from '@/api/order/order-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'BehaviorMonitoring',
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
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.selectDate = minDate.getTime();
          if (maxDate) {
            this.selectDate = ''
          }
        }, disabledDate: (time) => {
          if (this.selectDate !== '') {
            const one = 30 * 24 * 3600 * 1000;
            const minTime = this.selectDate - one;
            const maxTime = this.selectDate + one;
            return time.getTime() < minTime || time.getTime() > maxTime
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
      selectDate: '',
      totalDetail: {},
      showHeader: false,
      times: 30,
      tableKey: 0,
      list: [],
      total: 0,
      limit: 0,
      listLoading: true,
      listQuery: {
        key: '',
        page: 1,
        limit: 100,
        endDate: '',
        startDate: '',
        state: ''
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
      titleAdd: '',
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
        offLineOperation: [{ required: true, message: '请选择征信是否通过', trigger: 'change' }],
        goToWorkTime: [{ required: true, message: '请选择合同开始时间', trigger: 'change' }]
      },
      scrollTop: 0,
      stateBtn: 1,
      DateValue: '',
      findKey: '',
      DateValue2: '',
      dataForm: {
        driverId: '',
        goToWorkTime: '',
        orderId: '',
        tenderId: '',
        thirdDriverId: ''
      },
      list2: [],
      querySearchList: [],
      listLoading2: false
    }
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    getCurrentRow(val) {
      let arr = val;
      let tenderArr = [];
      arr.map((i) => {
        tenderArr.push(i.tenderId)
      })
      this.dataForm.tenderId = tenderArr.toString();
    },
    goDate(id, orderId) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/income-calendar', query: { id: id, orderId: orderId }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/income-calendar', query: { id: id, orderId: orderId }})
      }
    },
    goLineIn(driverId) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/driverLine-in', query: { driverId: driverId }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/driverLine-in', query: { driverId: driverId }})
      }
    },
    goLineOut(driverId) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/driverLine-Out', query: { driverId: driverId }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/driverLine-Out', query: { driverId: driverId }})
      }
    },
    checkWork(driverId) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/checkOn-work', query: { driverId: driverId }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/checkOn-work', query: { driverId: driverId }})
      }
    },
    changData() {
      if (this.DateValue) {
        this.listQuery.startDate = this.DateValue[0]
        this.listQuery.endDate = this.DateValue[1]
      } else {
        this.listQuery.startDate = ''
        this.listQuery.endDate = ''
      }
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
    getOrderDuty($state) {
      if (this.page2 === 1) {
        if (this.listLoading2) {
          setTimeout(() => {
            this.list2 = []
            this.state2 = $state
            this.getTender($state)
          }, 800)
        } else {
          this.page2 += 1
          this.state2 = $state
          this.getTender($state)
        }
      } else {
        if (!this.listLoading2) {
          this.page2 += 1
          this.state2 = $state
          this.getTender($state)
        }
      }
    },
    getTender($state) {
      this.listLoading2 = true
      getTenderForOrderDuty({
        orderId: this.dataForm.orderId,
        limit: 20,
        page: this.page2,
        key: this.findKey
      }).then((res) => {
        if (res.data.success) {
          this.list2 = this.list2.concat(res.data.data)
          this.total2 = res.data.page.total
          this.limit2 = res.data.page.limit
          let checkBox = []
          this.list2.forEach((i) => {
            if (i.tenderState === 7) {
              checkBox.push(i.lineId)
            }
          })
          this.$nextTick(() => {
            checkBox.forEach((v) => {
              this.list2.forEach((_v) => {
                if (_v.lineId === v) {
                  this.$refs.multipleTable.toggleRowSelection(_v)
                }
              })
            })
          })
          this.dataForm.tenderId = checkBox.toString();
          setTimeout(() => {
            this.listLoading2 = false
            this.disabled = false
            if (!this.listLoading2) {
              $state.loaded()
            }
            if (Math.ceil(this.total2 / this.limit2) < this.page2 + 1) {
              $state.complete()
            }
          }, 500)
        } else {
          this.$message.error(res.data.errorMsg);
          $state.complete()
        }
      }).catch((err) => {
        this.$message.error(err)
        $state.complete()
      })
    },
    findDriver() {
      this.page2 = 0
      this.disabled = true
      // this.findKey = ''
      this.list2 = []
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        this.state2.reset()
        this.getOrderDuty(this.state2)
      } else {
        this.page2 = 0
        this.state2.reset()
      }
    },
    guard(driverId, orderId, tenderId, driverName, date, type) {
      if (type === 1) {
        this.titleAdd = '加跑线路标书'
      } else {
        this.titleAdd = '操作上线'
      }
      beforeGotowork({
        orderId: orderId
      }).then((res) => {
        if (res.data.success) {
          if (res.data.data.flag) {
            this.page2 = 1;
            this.driverName = driverName
            this.dialogFormVisible = true
            this.listLoading2 = true
            this.dataForm.driverId = driverId;
            this.dataForm.orderId = orderId;
            this.dataForm.goToWorkTime = '';
            this.dataForm.thirdDriverId = date.thirdDriverId;
            this.querySearchList = [];
            this.dataForm.goToWorkTime = new Date().getTime();
            this.goWorkData = {
              driverName: date,
              driverPhone: date,
              source: date
            }
            this.goWorkData.driverName = date.driverName
            this.goWorkData.driverPhone = date.driverPhone
            this.goWorkData.source = ''
            if (this.state2 && this.state2 !== '') {
              this.findDriver()
            }
          } else {
            this.$alert(res.data.data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                if (this.$store.getters.newTab) {
                  let routeData = this.$router.resolve({ path: '/creat-order', query: { bidId: tenderId, driverId: driverId, orderId: orderId, type: 1 }})
                  window.open(routeData.href, '_blank');
                } else {
                  this.$router.push({ path: '/creat-order', query: { bidId: tenderId, driverId: driverId, orderId: orderId, type: 1 }})
                }
              }
            });
          }
        } else {
          this.$message.error(res.data.errorMsg);
          this.$alert(res.data.errorMsg + ',请补充完整信息', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              if (this.$store.getters.newTab) {
                let routeData = this.$router.resolve({ path: '/creat-order', query: { bidId: tenderId, driverId: driverId, orderId: orderId, type: 1 }})
                window.open(routeData.href, '_blank');
              } else {
                this.$router.push({ path: '/creat-order', query: { bidId: tenderId, driverId: driverId, orderId: orderId, type: 1 }})
              }
            }
          });
        }
      })
    },
    upMount(formName) {
      this.$refs[formName].validate((valid) => {
        let ckeckArr = this.dataForm.tenderId;
        if (ckeckArr === '') {
          this.$message.error('请选择标书');
          return false;
        }
        if (valid) {
          beforeGotowork({
            orderId: this.dataForm.orderId
          }).then((res) => {
            if (res.data.success) {
              if (res.data.data.flag) {
                goToWorkAdd({
                  driverId: this.dataForm.driverId,
                  orderId: this.dataForm.orderId,
                  tenderId: this.dataForm.tenderId,
                  thirdDriverId: this.dataForm.thirdDriverId,
                  contractStart: this.dataForm.goToWorkTime,
                  driverName: this.goWorkData.driverName,
                  driverPhone: this.goWorkData.driverPhone,
                  source: this.goWorkData.source
                }).then((res) => {
                  if (res.data.success) {
                    this.$message({
                      message: '上岗成功',
                      type: 'success'
                    });
                    this.dialogFormVisible = false;
                    setTimeout(() => {
                      this.handleFilter()
                    }, 1000)
                  } else {
                    this.$message.error(res.data.errorMsg);
                  }
                }).catch((err) => {
                  this.$message.error(err)
                })
              } else {
                this.$confirm('该操作会变更司机绑定的标书，是否要释放原标书直接更换？说明：（否：在原绑定线路标书上增加新线路标书；确定：新线路标书替换原绑定线路标书。）', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '否',
                  type: 'warning'
                }).then(() => {

                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });
              }
            }
          })
        }
      })
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
      GetDriverMonitoring(this.listQuery).then(response => {
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
    offLineCheck(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          offLineChecks({
            'driverId': this.offLineId,
            'isCreditPass': this.formPost.offLineOperation
          }).then(res => {
            if (res.data.success) {
              this.$message({
                message: '标记成功',
                type: 'success'
              });
              this.dialogFormOperation = false;
              setTimeout(() => {
                this.$router.push({ path: '/driver-list' })
              }, 1000)
            }
          }).catch(err => {
            this.$message.error(err);
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
    exportBtn() {
      if (this.listQuery.startDate === '') {
        this.$message({
          type: 'info',
          message: '请选择时间范围'
        });
      } else {
        this.$confirm('是否确认导出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.times === 30) {
            exportExcelList({
              start: this.listQuery.startDate,
              end: this.listQuery.endDate
            }).then((res) => {
              var overTime = setInterval(() => {
                if (this.times > 1) {
                  this.times = this.times - 1
                } else {
                  this.times = 30
                  clearInterval(overTime)
                }
              }, 1000)
              this.$message({
                type: 'success',
                message: '导出成功!'
              });
              this.download(res.data)
            })
          } else {
            this.$message({
              message: '导出冷却时间还剩' + this.times + '秒',
              type: 'warning'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    download(data) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '司机监控列表.xlsx')
      document.body.appendChild(link)
      link.click()
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
    updateData() {}
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .behaviorMonitoring{
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
