<template>
  <div class="OrderInfo">
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
          <p class="el-button--primary is-plain no-bg"><span class="">订单编号：</span><span class="val">{{ scope.row.orderId }}</span></p>
          <p><span>{{ scope.row.carTypeName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="货主编号" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">标书编号：</span><span class="val">{{ scope.row.bidIds }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">线路编号：</span><span class="val">{{ scope.row.lineIds }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.driverName }}</span></p>
          <p><span>{{ scope.row.cityName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="标书状态" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.stateName }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">成交时间：</span><span class="val">{{ scope.row.dealTime }}</span></p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" plain @click="changeBankId(scope.row.orderId)">修改银行卡号</el-button>
          <!--<el-button v-if="scope.row.stateName === '成交'" type="primary" size="mini" @click="changeDriver(scope.row.lineId)">下线操作</el-button>-->
        </template>
      </el-table-column>

      <!--<infinite-loading-->
      <!--slot="append"-->
      <!--ref="infinite"-->
      <!--spinner="bubbles"-->
      <!--@infinite="getInfinite">-->
      <!--<template slot="no-more">暂无更多数据</template>-->
      <!--</infinite-loading>-->
    </el-table>

    <!--修改银行卡号-->
    <el-dialog :visible.sync="dialogFormVisible" title="银行卡号信息(银行卡信息将同步财务，请谨慎操作)" >
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-position="left" label-width="70px" style="margin-left:50px;">
        <el-form-item label-width="100px" label="订单司机姓名">
          {{ dataForm.driverName }}
        </el-form-item>
        <el-form-item label-width="100px" prop="bankName" label="开户银行">
          <el-input v-model="dataForm.bankName" placeholder="请输入开户银行" />
        </el-form-item>
        <el-form-item label-width="100px" prop="accountName" label="银行开户人">
          <el-input v-model="dataForm.accountName" placeholder="请输入银行开户人" />
        </el-form-item>
        <el-form-item label-width="100px" prop="cardNumber" label="银行卡号">
          <el-input v-model="dataForm.cardNumber" placeholder="请输入银行卡号" />
        </el-form-item>
        <el-form-item label-width="100px" label="开户支行" prop="accountOpeningBranch">
          <el-input v-model="dataForm.accountOpeningBranch" placeholder="请输入开户支行" />
        </el-form-item>
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
import BackToTop from '@/components/BackToTop'
import { QueryOrdersByDriverId, queryDriverBankCards, updateDriverBankCards } from '@/api/order/order-api'
export default {
  name: 'OrderInfo',
  components: { InfiniteLoading, BackToTop },
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
        limit: 100,
        startDate: '',
        state: 1,
        endDate: ''
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
        bankName: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
        accountName: [{ required: true, message: '请输入开户人', trigger: 'blur' }],
        accountOpeningBranch: [{ required: true, message: '请输入开户支行', trigger: 'blur' }],
        cardNumber: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }]
      },
      dataForm: {
        bankName: '',
        accountName: '',
        accountOpeningBranch: '',
        cardNumber: ''
      },
      downloadLoading: false,
      querySearchList: [],
      loading: false,
      activeName: 0,
      list2: [],
      state2: '',
      orderId: '',
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
    const id = this.$route.query.id
    this.id = id;
    this.getList(id)
  },
  methods: {
    changeBankId(orderId) {
      this.dialogFormVisible = true;
      this.orderId = orderId
      queryDriverBankCards({
        driverId: this.id,
        orderId: orderId
      }).then(res => {
        if (res.data.success) {
          this.dataForm = res.data.data
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }).catch(err => {
        this.$message.error(err.errorMsg)
      })
    },
    getList(id) {
      this.listLoading = true
      this.orderId = id;
      QueryOrdersByDriverId({
        driverId: id
      }).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          if (response.data.data) {
            this.list = this.list.concat(response.data.data)
          }
          // this.total = response.data.page.total
          // this.limit = response.data.page.limit
          // this.totalDetail = response.data.title
          setTimeout(() => {
            this.listLoading = false
            this.disabled = false
            // if (!this.listLoading) {
            // $state.loaded()
            // }
            // if (Math.ceil(this.total / this.limit) < this.listQuery.page + 1) {
            // $state.complete()
            // }
          }, 500)
        } else {
          this.listLoading = false
          this.disabled = false
          this.$message.error(response.data.errorMsg);
          // $state.complete()
        }
      }).catch(err => {
        this.listLoading = false
        this.disabled = false
        this.$message.error(err.errorMsg)
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
    goDate() {
      this.$router.push({ path: '/income-calendar', query: { id: this.id }})
    },
    upMount(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('银行卡号将同步至财务进行打款，请确认银行卡号是否需要变更', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            updateDriverBankCards({
              accountName: this.dataForm.accountName,
              accountOpeningBranch: this.dataForm.accountOpeningBranch,
              bankName: this.dataForm.bankName,
              cardNumber: this.dataForm.cardNumber,
              driverId: this.dataForm.driverId,
              orderId: this.orderId
            }).then(res => {
              if (res.data.success) {
                this.dialogFormVisible = false
                this.$message({
                  type: 'success',
                  message: '修改成功'
                });
              } else {
                this.$message.error(res.data.errorMsg);
              }
            }).catch(err => {
              this.$message.error(err.errorMsg)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消变更'
            });
          });
        }
      })
    }
  }
}
</script>

<style rel="stylesheet" lang="scss" scoped>
  .OrderInfo{
    width:100%;
    padding:20px;
    box-sizing: border-box;
    .bold{
      color:#000;
      font-weight: bold;
    }
    .state{
      color:#67C23A;
    }
    .price{
      color:#F56C6C;
      font-weight: bold;
    }
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
  }
</style>
