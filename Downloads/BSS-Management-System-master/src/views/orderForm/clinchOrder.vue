<template>
  <div class="pendOrder">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <div class="menuBox">
          <span class="topFont">成交时间：</span>
          <el-date-picker
            v-model="DateValue2"
            :picker-options="pickerOptions"
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
          <el-button
            v-permission="['/order/orderManager/orderExport']"
            class="filter-item"
            style="float: right;"
            type="primary"
            icon="el-icon-add"
            @click="exportBtn">导出
          </el-button>
        </div>
        <div>
          <el-badge :value="listQuery.state === 3 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 3" type="primary" size="small" @click="stateChange(3)">已成交总数</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 6 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 6" type="primary" size="small" @click="stateChange(6)">待上岗</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 7 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 7" type="primary" size="small" @click="stateChange(7)">已交付已上岗</el-button>
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
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>标书编号：</i>{{ scope.row.bidId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>司机编号：</i>{{ scope.row.driverId }}</span>
            <!--<span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>成交时间：</i>{{ scope.row.dealTime | Timestamp }}<i v-if="scope.row.creatorName">（{{ scope.row.creatorName }}）</i></span>-->
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>成交时间：</i>{{ scope.row.dealDate | Timestamp }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>上岗时间：</i>{{ scope.row.goToWorkTime | Timestamp }}</span>
            <span style="float: right;">
              <el-button v-permission="['/match/tender/getTenderListByDriverId']" v-if="scope.row.showUpdateButton" type="text" @click="changeDate(scope.row.orderId, scope.row.driverName)">变更成交日期</el-button>
            </span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i v-if="scope.row.busiType === 0">(梧桐专车)</i><i v-if="scope.row.busiType === 1">(梧桐共享)</i></span>
          </div>
          <el-row :gutter="20">
            <el-col :span="5">
              <p><span class="light-font">{{ scope.row.driverName }}</span></p>
              <p>{{ scope.row.cityName }}</p>
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
              <div style="width: 100px;height: 30px;line-height: 30px;text-align: center;position: absolute;right: -20px;top:0;color: #e6d3bd;">NO.{{ scope.$index+1 }}</div>
              <el-button v-permission="['/match/tender/getTenderListByDriverId', '/order/orderManager/orderDetail', '/match/tender/signLineTenderDetail']" type="text" @click="goDetail(scope.row.bidId, scope.row.driverId, scope.row.orderId, 0)">详情</el-button>
              <el-button v-permission="['/order/order/beforeGoToWork']" v-if="scope.row.stateName === '成交' && scope.row.buyCarStateName === '待上岗'" type="primary" size="mini" plain @click="guard(scope.row.driverId, scope.row.orderId, scope.row.bidId, scope.row.driverName, scope.row)">上岗</el-button>
              <el-button v-if="scope.row.stateName === '成交' && scope.row.buyCarStateName === '未交付'" type="primary" size="mini" @click="delivery(scope.row.bidId, scope.row.driverId, scope.row.orderId)">车辆交付</el-button>
              <el-button v-permission="['/order/orderManager/orderDelete']" v-if="scope.row.buyCarState !== 3" type="danger" size="mini" style="margin-top: 10px !important;" @click="deletOrder(scope.row.orderId)">删除</el-button>
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

    <el-dialog :title="'司机姓名：' + driverName" :visible.sync="dialogFormVisible" @submit.native.prevent>
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-position="left" label-width="70px" style="margin-left:50px;" >
        <el-form-item label-width="120px" label="司机编号">
          <el-input v-model="dataForm.thirdDriverId" style="max-width: 220px;" placeholder="请输入司机编号" />
        </el-form-item>
        <el-form-item label-width="120px" label="合同开始时间" prop="goToWorkTime">
          <el-date-picker v-model="dataForm.goToWorkTime" type="datetime" value-format="timestamp" placeholder="请输入合同开始时间"/>
        </el-form-item>
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
            style="width: 100%;max-height:500px;overflow-y: scroll"
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
        <el-button @click="dialogFormVisible = false;findKey = '';list2 = []">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="upMount('dataForm')">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!--更改时间-->
    <el-dialog :visible.sync="dialogFormOperation" :title="changeDateName">
      <el-form ref="formPost" :model="formPost" :rules="rules2">
        <el-form-item label-width="150px" label="创建时间" prop="creatTime">
          <el-date-picker
            v-model="formPost.creatTime"
            type="datetime"
            value-format="timestamp"
            placeholder="请选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="150px" label="成交时间" prop="paymentTime">
          <el-date-picker
            v-model="formPost.paymentTime"
            :picker-options="pickerOptions1"
            type="datetime"
            value-format="timestamp"
            placeholder="请选择成交时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormOperation = false">取 消</el-button>
        <el-button type="primary" @click="changeDriverNo2('formPost')">确 定</el-button>
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
import BackToTop from '@/components/BackToTop'
import { GetOrderListDeal, goToWork, getTenderForOrderDuty, beforeGotowork, orderDelete, exportExcelOrderList, changeTheDateOfTheTransaction } from '@/api/order/order-api'
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
      pickerOptions2: {
        disabledDate: (time) => {
          let curDate = (new Date()).getTime();
          let three = 6 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.formPost.creatTime + 1).getTime() - (24 * 60 * 60 * 1000);
        }
      },
      selectDate: '',
      totalDetail: {},
      showHeader: false,
      tableKey: 0,
      times: 30,
      list: [],
      total: 0,
      limit: 0,
      listLoading: true,
      listQuery: {
        key: '',
        page: 1,
        limit: 100,
        startDate: '',
        state: 3,
        endDate: ''
      },
      driverName: '',
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
      changeDateName: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false,
      formPost: {
        orderId: '',
        paymentTime: '',
        creatTime: ''
      },
      rules: {
        offLineOperation: [{ required: true, message: '请选择征信是否通过', trigger: 'change' }],
        goToWorkTime: [{ required: true, message: '请选择合同开始时间', trigger: 'change' }]
      },
      rules2: {
        paymentTime: [{ required: false, message: '请选择成交时间', trigger: 'change' }],
        creatTime: [{ required: false, message: '请选择创建时间', trigger: 'change' }]
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
      listLoading2: false,
      page2: 1,
      state2: '',
      findKey: '',
      goWorkData: {
        contractStart: '',
        driverName: '',
        driverPhone: '',
        source: ''
      },
      getDateDay3: false,
      querySearchList: []
    }
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.getDateDay()
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
    getDateDay() {
      let date = new Date();
      let strDate = date.getDate();
      if (strDate > 3) {
        this.getDateDay3 = true;
      } else {
        this.getDateDay3 = false;
      }
    },
    goDate(id) {
      this.$router.push({ path: '/income-calendar', query: { id: id }})
    },
    changData() {
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
            exportExcelOrderList({
              start: this.listQuery.startDate,
              state: this.listQuery.state,
              key: this.listQuery.key,
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
      link.setAttribute('download', '已成交列表.xlsx')
      document.body.appendChild(link)
      link.click()
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
      GetOrderListDeal(this.listQuery).then(response => {
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
    changeDate(id, name) {
      this.formPost.orderId = id;
      this.changeDateName = name;
      this.formPost.creatTime = '';
      this.formPost.paymentTime = '';
      this.dialogFormOperation = true;
    },
    changeDriverNo2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changeTheDateOfTheTransaction({
            orderId: this.formPost.orderId,
            dealTime: this.formPost.paymentTime,
            createTime: this.formPost.creatTime
          }).then((res) => {
            if (res.data.success) {
              if (res.data.data.flag) {
                this.$message({
                  type: 'success',
                  message: '变更成功'
                });
                this.dialogFormOperation = false;
                setTimeout(() => {
                  this.handleFilter()
                }, 1000)
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
    goDetail(bidId, driverId, orderId, type) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/order-detail', query: { bidId: bidId, driverId: driverId, orderId: orderId, againBtn: type }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/order-detail', query: { bidId: bidId, driverId: driverId, orderId: orderId, againBtn: type }})
      }
    },
    delivery(bidId, driverId, orderId) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/delivery', query: { bidId: bidId, driverId: driverId, orderId: orderId }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/delivery', query: { bidId: bidId, driverId: driverId, orderId: orderId }})
      }
    },
    guard(driverId, orderId, tenderId, driverName, date) {
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
            this.dataForm.thirdDriverId = '';
            this.querySearchList = [];
            this.dataForm.goToWorkTime = new Date().getTime();
            // this.goWorkData = {
            //   driverName: date,
            //   driverPhone: date,
            //   source: date
            // }
            this.goWorkData.driverName = date.driverName
            this.goWorkData.driverPhone = date.driverPhone
            this.goWorkData.source = ''
            this.$nextTick(() => {
              if (this.state2) {
                this.getOrderDuty(this.state2)
              }
            })
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
              checkBox.push(i.tenderId)
            }
          })
          this.$nextTick(() => {
            checkBox.forEach((v) => {
              this.list2.forEach((_v) => {
                if (_v.tenderId === v) {
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
    findDriver() {
      this.page2 = 0;
      this.disabled = true
      // this.findKey = ''
      this.list2 = []
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        this.state2.reset()
        // this.page2 = 0;
        this.getOrderDuty(this.state2)
      } else {
        this.state2.reset()
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
                goToWork({
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
    updateData() {}
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .pendOrder{
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
    .btnBox{
      padding:10px 0;
      box-sizing: border-box;
      text-align: center;
      button{
        display: block;
        margin: auto !important;
      }
    }
    .el-dialog{
      max-height: 700px;
      overflow-y: auto;
      .el-table{
        max-height: 320px !important;
      }
    }
    .el-table::before{
      height: auto;
    }
  }
</style>
