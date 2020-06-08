<template>
  <div class="clientList">
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
          @click="handleCreate">+ 创建货主
        </el-button>
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
      <el-table-column label="货主编号" align="left" class-name="fixed-width">
        <template slot-scope="scope">
          <p><span class="light-font">{{ scope.row.customerName }}</span></p>
          <p><span>{{ scope.row.cityName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="货主名称" prop="id" sortable="custom" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="noLight-font">他平台货主号：</span><span class="val">{{ scope.row.customerIdOpposite }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="noLight-font">货主编号：</span><span class="val">{{ scope.row.customerId }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="货主编号" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.sourceName }}</span></p>
          <p><span>{{ scope.row.contractEffectiveness }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="noLight-font">创建时间：</span></p>
          <p><span>{{ scope.row.createDate | Timestamp }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="noLight-font">合同止期：</span></p>
          <p><span>{{ scope.row.contractEnd | Timestamp }}</span></p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['/line/line/customer/edit']" type="primary" size="mini" @click="editDetails(scope.row.customerId)">{{ $t('table.edit') }}</el-button>
          <el-button v-permission="['/bss/v1/bss/line/task/ownLineTasks']" type="success" plain size="mini" @click="goLine(scope.row.customerId)">所有线路</el-button>
          <el-button v-permission="['/line/line/customer/info']" type="primary" size="mini" plain @click="goDetals(scope.row.customerId)">详情</el-button>
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
import permission from '@/directive/permission/index'
import Sticky from '@/components/Sticky'
import BackToTop from '@/components/BackToTop'
import { fetchList } from '@/api/client/client-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'

export default {
  name: 'ClientList',
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
      disabled: false,
      num: 1,
      state: null,
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
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
      fetchList(this.listQuery).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          this.list = this.list.concat(response.data.data)
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
      this.$router.push({ path: '/add-client' })
    },
    editDetails(id) {
      this.$router.push({ path: '/add-client', query: { id: id }})
    },
    goDetals(id) {
      this.$router.push({ path: '/client-detail', query: { id: id }})
    },
    goLine(id) {
      this.$router.push({ name: 'AllCarLine', query: { id: id }})
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  .clientList{
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
    .el-button--mini{
      margin-left: 0 !important;
      margin:5px;
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
  }
</style>

