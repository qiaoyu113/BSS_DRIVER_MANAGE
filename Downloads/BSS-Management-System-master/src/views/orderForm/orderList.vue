<template>
  <div class="orderList">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <el-input
          v-model="listQuery.key"
          placeholder="请输入查询条件"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"/>
        <el-button v-waves :disabled="disabled" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <div class="topBox">
          <span>总订单数：<i>{{ totalDetail.all }}</i></span> <span>中标未成交数：<i>{{ totalDetail.notyet }}</i></span> <span>已成交数：<i>{{ totalDetail.deal }}</i></span> <span>已交付已上岗数：<i>{{ totalDetail.havingGoToWork }}</i></span>
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
          <p class="el-button--primary is-plain no-bg"><span class="">订单编号：</span><span class="val">{{ scope.row.orderId }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">司机编号：</span><span class="val">{{ scope.row.driverId }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="货主编号" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">标书编号：</span></p>
          <p><span>{{ scope.row.bidId }}</span></p>
          <p><span>{{ scope.row.createName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">创建时间：</span><span class="val">{{ scope.row.createDate | Timestamp }}</span></p>
          <!--<p><span>{{ scope.row.driverName }}</span></p>-->
        </template>
      </el-table-column>
      <el-table-column label="" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.driverName }}</span></p>
          <p><span>{{ scope.row.carTypeName }}</span></p>
          <p><span>{{ scope.row.cityName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">购车状态：</span></p>
          <p><span>{{ scope.row.buyCarStateName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="标书状态" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">订单状态：</span></p>
          <p><span>{{ scope.row.stateName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.stateName === '待成交'" type="primary" size="mini" @click="goSigning(scope.row.bidId, scope.row.driverId, scope.row.orderId)">签约成交</el-button>
          <el-button v-if="scope.row.stateName === '确认驳回'" type="primary" size="mini" @click="goSigning(scope.row.bidId, scope.row.driverId, scope.row.orderId)">重新提交</el-button>
          <el-button v-if="scope.row.stateName === '已支付待确认'" type="success" size="mini" @click="goDetail(scope.row.bidId, scope.row.driverId, scope.row.orderId, 1)">确认成交</el-button>
          <el-button v-if="scope.row.stateName === '成交' && scope.row.buyCarStateName === '未交付'" type="primary" size="mini" @click="delivery(scope.row.bidId, scope.row.driverId, scope.row.orderId)">车辆交付</el-button>
          <el-button v-if="scope.row.stateName === '成交' && scope.row.buyCarStateName === '待上岗'" type="primary" size="mini" @click="guard(scope.row.driverId, scope.row.orderId, scope.row.bidId, scope.row.driverName)">上岗</el-button>
          <el-button type="primary" size="mini" plain @click="goDetail(scope.row.bidId, scope.row.driverId, scope.row.orderId, 0)">详情</el-button>
          <!--<el-button v-if="scope.row.stateName === '成交'" type="primary" size="mini" @click="changeDriver(scope.row.lineId)">下线操作</el-button>-->
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

    <el-dialog :title="'司机姓名：' + driverName" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-position="left" label-width="70px" style="margin-left:50px;">
        <!--<el-form-item label-width="100px" label="司机编号">-->
        <!--<el-select-->
        <!--v-model="dataForm.thirdDriverId"-->
        <!--:loading="loading"-->
        <!--:remote-method="querySearchAsync"-->
        <!--style="width: 230px;"-->
        <!--filterable-->
        <!--remote-->
        <!--reserve-keyword-->
        <!--placeholder="请输入云鸟司机手机号或姓名">-->
        <!--<el-option-->
        <!--v-for="item in querySearchList"-->
        <!--:key="item.driverId"-->
        <!--:label="item.driverId"-->
        <!--:value="item.driverId">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label-width="100px" label="司机编号">
          <el-input v-model="dataForm.thirdDriverId" placeholder="请输入司机编号" />
        </el-form-item>
        <!--<el-form-item label-width="100px" label="上岗日期" prop="goToWorkTime">-->
        <!--<el-date-picker v-model="dataForm.goToWorkTime" type="datetime" value-format="timestamp" placeholder="请输入上岗日期"/>-->
        <!--</el-form-item>-->
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

    <!--<pagination v-show="total>0" :total="total" :page.sync="
    .page" :limit.sync="listQuery.limit" @pagination="getList" />-->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Sticky from '@/components/Sticky'
import BackToTop from '@/components/BackToTop'
// import { GetOrderList, goToWork, queryDriverInfo } from '@/api/order/order-api'
import { GetOrderList, goToWork, getTenderForOrderDuty } from '@/api/order/order-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'

export default {
  name: 'OrderList',
  components: { Pagination, InfiniteLoading, Sticky, BackToTop },
  directives: { waves },
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
      showHeader: false,
      tableKey: 0,
      list: [],
      total: 0,
      total2: 0,
      limit: 0,
      limit2: 0,
      page2: 1,
      listLoading: true,
      listLoading2: true,
      dialogFormVisible: false,
      listQuery: {
        key: '',
        page: 1,
        limit: 100
      },
      disabled: false,
      totalDetail: {},
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
      driverName: '',
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        goToWorkTime: [{ required: true, message: '请选择上岗日期', trigger: 'blur' }]
      },
      dataForm: {
        driverId: '',
        goToWorkTime: '',
        orderId: '',
        tenderId: '',
        thirdDriverId: ''
      },
      downloadLoading: false,
      querySearchList: [],
      loading: false,
      activeName: 0,
      list2: [],
      state2: '',
      list2Check: {
        name: '',
        driverId: ''
      },
      scrollTop: 0
    }
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.listLoading) {
        this.scrollTop = scrollTop
      }
    },
    getList($state) {
      this.listLoading = true
      GetOrderList(this.listQuery).then(response => {
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
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    goSigning(bidId, driverId, orderId) {
      this.$router.push({ path: '/signing', query: { bidId: bidId, driverId: driverId, orderId: orderId }})
    },
    goDetail(bidId, driverId, orderId, type) {
      this.$router.push({ path: '/order-detail', query: { bidId: bidId, driverId: driverId, orderId: orderId, againBtn: type }})
    },
    delivery(bidId, driverId, orderId) {
      this.$router.push({ path: '/delivery', query: { bidId: bidId, driverId: driverId, orderId: orderId }})
    },
    guard(driverId, orderId, tenderId, driverName) {
      this.page2 = 1;
      this.driverName = driverName
      this.dialogFormVisible = true
      this.listLoading2 = true
      this.dataForm.driverId = driverId;
      this.dataForm.orderId = orderId;
      this.dataForm.goToWorkTime = '';
      this.dataForm.thirdDriverId = '';
      this.querySearchList = [];
      if (this.state2 !== '') {
        this.state2.reset()
      }
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
        driverId: this.dataForm.driverId,
        limit: 100,
        page: this.page2
      }).then((res) => {
        if (res.data.success) {
          this.list2 = this.list2.concat(res.data.data)
          this.total2 = res.data.page.total
          this.limit2 = res.data.page.limit
          setTimeout(() => {
            this.listLoading2 = false
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
    getCurrentRow(val) {
      let arr = val;
      let tenderArr = [];
      arr.map((i) => {
        tenderArr.push(i.tenderId)
      })
      this.dataForm.tenderId = tenderArr.toString();
    },
    upMount(formName) {
      this.$refs[formName].validate((valid) => {
        let ckeckArr = this.dataForm.tenderId;
        if (ckeckArr === '') {
          this.$message.error('请选择标书');
          return false;
        }
        if (valid) {
          goToWork({
            driverId: this.dataForm.driverId,
            orderId: this.dataForm.orderId,
            tenderId: this.dataForm.tenderId,
            thirdDriverId: this.dataForm.thirdDriverId
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
        }
      })
    }
    // querySearchAsync(queryString) {
    //   if (queryString !== '') {
    //     this.loading = true;
    //     queryDriverInfo({
    //       content: queryString,
    //       mobile: '',
    //       name: ''
    //     }).then((res) => {
    //       if (res.data.success) {
    //         this.loading = false;
    //         this.querySearchList = res.data.data;
    //       } else {
    //         this.loading = false;
    //         this.$message.error(res.data.errorMsg);
    //       }
    //     }).catch((err) => {
    //       this.loading = false;
    //       this.$message.error(err)
    //     })
    //   } else {
    //     this.loading = false;
    //     this.querySearchList = [];
    //   }
    // }

  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  .orderList{
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
      height:auto !important;
    }
    .el-button--mini{
      margin-left: 0 !important;
      margin:5px;
    }
  }
</style>

