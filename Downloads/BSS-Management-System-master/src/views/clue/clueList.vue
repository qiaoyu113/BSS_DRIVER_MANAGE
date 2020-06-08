<template>
  <div class="ClueList">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <el-date-picker
          v-model="DateValue"
          type="daterange"
          style="position: relative;top: -4px;"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          @change="changData">
        </el-date-picker>
        <el-input
          v-model="listQuery.key"
          placeholder="请输入查询条件"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"/>
        <el-button v-waves :disabled="disabled" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <div class="topBox">
          <span>线索总数：<i>{{ totalDetail.all }}</i></span> <span>待转化数：<i>{{ totalDetail.waitChange }}</i></span> <span>已转化数：<i>{{ totalDetail.changed }}</i></span>
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
      <el-table-column label="" align="left" class-name="fixed-width">
        <template slot-scope="scope">
          <p><span class="light-font">{{ scope.row.name }} </span></p>
          <p>{{ scope.row.phone }}</p>
        </template>
      </el-table-column>
      <el-table-column label="" prop="id" sortable="custom" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="noLight-font">线索编号：</span><span class="val">{{ scope.row.clueId }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="val" style="font-weight: bold;">{{ scope.row.clueTypeName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.workCityName }}</span></p>
          <p><span>{{ scope.row.carTypeName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="noLight-font">更新时间：</span></p>
          <p><span>{{ scope.row.updateDate | Timestamp }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="noLight-font">创建时间：</span></p>
          <p><span>{{ scope.row.createDate | Timestamp }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="noLight-font">线索状态：</span></p>
          <p><span>{{ scope.row.stateName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="noLight-font">司机状态：</span></p>
          <p><span>{{ scope.row.driverStateName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="noLight-font">更新类型：</span></p>
          <p><span>{{ scope.row.clueTypeName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['/driver/driver/clue/getBasicDetail']" v-if="scope.row.state === 1" type="success" plain size="mini" @click="addClue(scope.row.clueId)">跟进</el-button>
          <el-button v-permission="['/driver/driver/clue/detail']" type="primary" size="mini" plain @click="goDetals(scope.row.clueId)">详情</el-button>
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
import { getClueList } from '@/api/clue/clue-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'
import permission from '@/directive/permission/index'

export default {
  name: 'ClueList',
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
      totalDetail: {},
      listQuery: {
        key: '',
        page: 1,
        limit: 100,
        endDate: '',
        startDate: ''
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
      DateValue: '',
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
      getClueList(this.listQuery).then(response => {
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
    goDetals(id) {
      this.$router.push({ path: '/clue-detail', query: { id: id }})
    },
    addClue(id) {
      this.$router.push({ path: '/add-clue', query: { id: id }})
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  .ClueList{
    padding:20px;
    padding-top: 0;
    .el-date-editor .el-range-separator{
      width: 8%;
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

