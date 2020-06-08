<template>
  <div class="CustomListNew">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <div class="menuBox">
          <span class="topFont">创建时间：</span>
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
          <!--<span class="topFont">客户类型：</span>-->
          <!--<el-select v-model="listQuery.type" placeholder="请选择" style="top: -3px;" @change="handleFilter">-->
          <!--<el-option-->
          <!--v-for="item in typeList"-->
          <!--:key="item.codeVal"-->
          <!--:value="item.codeVal"-->
          <!--:label="item.code">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <el-button
            v-permission="['/bss/v1/bss/driver/clue/export']"
            class="filter-item"
            style="float: right;"
            type="primary"
            icon="el-icon-add"
            @click="exportBtn">导出
          </el-button>
        </div>
        <div>
          <el-badge :value="listQuery.state === '' ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== ''" type="primary" size="small" @click="stateChange('')">客户池总数</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 1 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 1" type="primary" size="small" @click="stateChange(1)">成交客户</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 2 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 2" type="primary" size="small" @click="stateChange(2)">跟进中客户</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 3 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 3" type="primary" size="small" @click="stateChange(3)">高意向客户</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 4 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 4" type="primary" size="small" @click="stateChange(4)">外包承运</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 5 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 5" type="primary" size="small" @click="stateChange(5)">货主自营</el-button>
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
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>客户线索编号：</i>{{ scope.row.customerNo }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>创建时间：</i>{{ Number(scope.row.createDate) | Timestamp }}<i v-if="scope.row.lastFollowerName && scope.row.lastFollowerName !== 'null'">（{{ scope.row.lastFollowerName }}）</i></span>
            <span v-if="scope.row.isHighIntention === '是'" :xs="8" :sm="6" :md="4" :lg="4" :xl="1" style="float: right;margin-right: 90px;"><i>高意向客户</i></span>
          </div>
          <el-row :gutter="20">
            <el-col :span="7">
              <p><span class="light-font">{{ scope.row.customerName }}（{{ scope.row.city }}）<i v-if="scope.row.clueSource">/ {{ scope.row.clueSource }}</i></span></p>
              <p>{{ scope.row.carType }} <i v-if="scope.row.carType && scope.row.distributionType">/</i>{{ scope.row.distributionType }}</p>
              <p>{{ scope.row.distributionCharacteristics }}</p>
            </el-col>
            <el-col :span="7">
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">月毛收入：</span><span class="val">{{ scope.row.grossMonthlyIncome }}元</span></p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">月净收入：</span><span class="val">{{ scope.row.netMonthlyIncome }}元</span></p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">月出车天数：</span><span class="val">{{ scope.row.monthlyDepartureDays | DataIsNull }}</span></p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">每日出车趟数：</span><span class="val">{{ scope.row.dailyDeliveries | DataIsNull }}</span></p>
            </el-col>
            <el-col :span="5">
              <p class="el-button--primary is-plain no-bg"><span class="val">{{ scope.row.clueStatus | DataIsNull }}</span></p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">跟进次数：</span><span class="val">{{ scope.row.followCount | DataIsNull }}</span></p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">跟进备注：</span><span class="val">{{ scope.row.followRemarks | DataIsNull }}</span></p>
            </el-col>
            <el-col :span="4" class="btnBox">
              <el-button v-permission="['/line/line/customer/customerPool/follow']" v-if="scope.row.clueStatus === '跟进中'" type="primary" plain size="mini" @click="followCustom(scope.row.customerNo, scope.row.customerName, scope.row.clientsName, scope.row.clientPhone, scope.row.createDate)">跟进</el-button>
              <el-button v-permission="['/line/line/customer/customerPool/detail']" type="text" @click="goDetals(scope.row.customerNo)">详情</el-button>
              <el-button v-permission="['/line/line/task/log/customer/clue/log/list']" type="text" @click="goLog(scope.row.customerNo)">操作日志</el-button>
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
import BackToTop from '@/components/BackToTop'
import { dictionary } from '@/api/common'
import { GetCustomList, exportExcelCustomList } from '@/api/client/client-api'
import permission from '@/directive/permission/index'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CustomListNew',
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
      times: 30,
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
        state: '',
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
      typeList: [],
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
      listLoading2: false
    }
  },
  created() {},
  mounted() {
    this.fetchData()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    fetchData() {
      // 客户类型
      dictionary({
        dictType: 'line_deadline_reason'
      }).then(res => {
        this.typeList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    goLog(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/custom-log', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/custom-log', query: { id: id }})
      }
    },
    goDetals(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/custom-detail', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/custom-detail', query: { id: id }})
      }
    },
    followCustom(id, customerName, clientsName, clientPhone, createDate) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/custom-follow', query: { id: id, customerName: customerName, clientsName: clientsName, clientPhone: clientPhone, createDate: createDate }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/custom-follow', query: { id: id, customerName: customerName, clientsName: clientsName, clientPhone: clientPhone, createDate: createDate }})
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
      GetCustomList(this.listQuery).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          this.list = this.list.concat(response.data.data)
          this.total = response.data.page.total
          this.limit = response.data.page.limit
          this.totalDetail = response.data.title
          console.log('custom list: ', response.data)
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
    goDetail(bidId, driverId, orderId, type) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/order-detail', query: { bidId: bidId, driverId: driverId, orderId: orderId, againBtn: type }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/order-detail', query: { bidId: bidId, driverId: driverId, orderId: orderId, againBtn: type }})
      }
    },
    goSigning(bidId, driverId, orderId) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/signing', query: { bidId: bidId, driverId: driverId, orderId: orderId }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/signing', query: { bidId: bidId, driverId: driverId, orderId: orderId }})
      }
    },
    deletOrder(orderId) {
      this.$confirm('删除操作不可逆，会导致订单下的标书自动释放，更新为待中标，司机状态变更为面试司机，请确认是否继续进行操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '订单已删除'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
            exportExcelCustomList({
              key: this.listQuery.key,
              page: this.listQuery.page,
              limit: this.listQuery.limit,
              startDate: this.listQuery.startDate,
              state: this.listQuery.state,
              endDate: this.listQuery.endDate
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
      link.setAttribute('download', '客户池列表.xlsx')
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
  .CustomListNew{
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
  }
</style>
