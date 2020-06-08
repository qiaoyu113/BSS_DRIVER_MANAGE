<template>
  <div class="tenderLog">
    <sticky class-name="sub-navbar">
      <div class="filter-container">标书操作记录
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
      <el-table-column label="操作类型" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.operType }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="操作员" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.createrName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="执行结果" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.result }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="操作后状态" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.afterState }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.createDate }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="备注/原因" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.remarks }}</span></p>
        </template>
      </el-table-column>
    </el-table>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import BackToTop from '@/components/BackToTop'
import { GetTenderLog } from '@/api/tender/tender-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'TenderLog',
  components: { Pagination, Sticky, BackToTop },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
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
      showHeader: true,
      tableKey: 0,
      list: [],
      total: 0,
      limit: 0,
      listLoading: true,
      listQuery: {
        tenderId: ''
      },
      num: 1,
      state: null,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {},
  mounted() {
    const id = this.$route.query.id
    this.getList(id)
  },
  methods: {
    getList(id) {
      this.listLoading = true
      this.listQuery.tenderId = id
      GetTenderLog(this.listQuery).then(response => {
        if (response.data.success) {
          this.list = this.list.concat(response.data.data);
          this.listLoading = false;
        } else {
          this.$message.error(response.message);
        }
      }).catch((err) => {
        this.$message.error(err);
        this.listLoading = false;
      })
    },
    handleFilter() {
      this.num = 0
      this.list = []
      this.state.reset()
      this.getInfinite()
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
    editDetails(id) {
      this.$router.push({ path: '/add-car-line', query: { id: id }})
    },
    goDetals(id) {
      this.$router.push({ path: '/tender-audit', query: { id: id }})
    },
    createData() {},
    updateData() {}
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  .tenderLog{
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
  }
</style>

