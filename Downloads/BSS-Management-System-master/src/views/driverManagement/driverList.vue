<template>
  <div class="driverList">
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
          icon="el-icon-add"
          @click="handleCreate">新建司机
        </el-button>
        <div class="topBox">
          <span>总司机数：<i>{{ totalDetail.all }}</i></span> <span>面试司机数：<i>{{ totalDetail.intention }}</i></span> <span>跟车司机数：<i>{{ totalDetail.deposit }}</i></span> <span>待交付司机数：<i>{{ totalDetail.pendingdelivery }}</i></span> <span>待上岗数：<i>{{ totalDetail.pendinggotowork }}</i></span> <span>成交在跑数：<i>{{ totalDetail.running }}</i></span> <span>成交未跑数：<i>{{ totalDetail.notrunning }}</i></span>
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
          <p class="el-button--primary is-plain no-bg"><span class="">司机编号：</span><span class="val">{{ scope.row.driverId }}</span></p>
          <p><span>{{ scope.row.sourceName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="货主编号" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.name }} {{ scope.row.phone }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.workCityName }}</span></p>
          <p v-if="scope.row.carTypeName != ''"><span>{{ scope.row.carTypeName }}</span></p>
          <p v-if="scope.row.carTypeName == ''"><span>未匹配车型</span></p>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">创建时间：</span></p>
          <p><span>{{ scope.row.createDate | Timestamp }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">签约状态：</span></p>
          <p><span>{{ scope.row.stateName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['/driver/driver/detail']" v-if="scope.row.state === 1" type="primary" size="mini" @click="goEdit(scope.row.driverId)">编辑</el-button>
          <el-button v-permission="['/driver/driver/income/calendar']" v-if="scope.row.state === 2 && scope.row.isCreditPass === 1" type="primary" size="mini" @click="handleSign(scope.row.driverId)">征信标记</el-button>
          <el-button v-permission="['/driver/driver/detail']" type="primary" size="mini" plain @click="goDetail(scope.row.driverId)">详情</el-button>
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

    <el-dialog :visible.sync="dialogFormOperation" title="下线操作">
      <el-form ref="formPost" :model="formPost" :rules="rules">
        <el-form-item label="征信是否通过" prop="offLineOperation">
          <el-select v-model="formPost.offLineOperation" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormOperation = false">取 消</el-button>
        <el-button type="primary" @click="offLineCheck('formPost')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Sticky from '@/components/Sticky'
import permission from '@/directive/permission/index'
import BackToTop from '@/components/BackToTop'
import { GetDriverList, offLineChecks } from '@/api/driver/driver-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'

export default {
  name: 'DriverList',
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
        limit: 100
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
      GetDriverList(this.listQuery).then(response => {
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
    handleCreate() {
      this.$router.push({ path: '/add-driver' })
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
    goEdit(id) {
      this.$router.push({ path: '/add-driver', query: { id: id }})
    },
    updateData() {}
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  .driverList{
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

