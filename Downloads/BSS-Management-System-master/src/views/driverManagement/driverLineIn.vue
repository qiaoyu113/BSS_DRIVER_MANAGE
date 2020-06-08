<template>
  <div class="DriverLineIn">
    <sticky class-name="sub-navbar" style="height: auto !important;">
      <div class="filter-container">
        <div class="menuBox">
          <span class="topFont">选择时间：</span>
          <el-date-picker
            v-model="DateValue2"
            :picker-options="{ disabledDate(time) {return time.getTime() > Date.now()} }"
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
            v-permission="['/line/line/customer/save']"
            class="filter-item"
            style="margin-right: 10px;float: right;"
            type="primary"
            icon="el-icon-user"
            @click="handleCreate">+ 创建货主
          </el-button>
        </div>
        <div style="overflow: hidden;">
          <el-badge :value="listQuery.state === '' ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== ''" type="primary" size="small" @click="stateChange('')">全部</el-button>
          </el-badge>
          <el-badge v-for="(items, length) in lineCustomerList" :key="length" :value="Number(listQuery.state) === (Number(length) + Number(1)) ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="Number(listQuery.state) !== (Number(length) + Number(1))" type="primary" size="small" @click="stateChange(items.code)">{{ items.name }}</el-button>
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
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>货主编号：</i>{{ scope.row.customerId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>创建时间：</i>{{ scope.row.createDate | Timestamp }}<i v-if="scope.row.creatorName">（{{ scope.row.creatorName }}）</i></span>
          </div>
          <el-row :gutter="30">
            <el-col :span="10">
              <p><span class="light-font">{{ scope.row.customerName }} （{{ scope.row.cityName }}）</span></p>
              <p>{{ scope.row.primaryClassificationName }}<span v-if="scope.row.secondaryClassificationName">/{{ scope.row.secondaryClassificationName }}</span></p>
              <p>{{ scope.row.contractEffectiveness }}</p>
            </el-col>
            <el-col :span="10">
              <p>合同止期： {{ scope.row.contractEnd | Timestamp }}</p>
              <p v-if="scope.row.source === 1">他平台货主号： {{ scope.row.customerIdOpposite | DataIsNull }}</p>
            </el-col>
            <el-col :span="4" class="btnBox">
              <el-button v-permission="['/line/line/customer/edit']" type="primary" plain size="mini" @click="editDetails(scope.row.customerId)">{{ $t('table.edit') }}</el-button>
              <el-button v-permission="['/bss/v1/bss/line/task/ownLineTasks']" type="text" @click="goLine(scope.row.customerId)">所有线路</el-button>
              <el-button v-permission="['/line/line/customer/info']" type="text" @click="goDetals(scope.row.customerId)">详情</el-button>
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
import permission from '@/directive/permission/index'
import Sticky from '@/components/Sticky'
import BackToTop from '@/components/BackToTop'
import { fetchList, getLineCustomerOneOrTwoCategory } from '@/api/client/client-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'

export default {
  name: 'DriverLineIn',
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
      DateValue2: '',
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
      scrollTop: 0,
      lineCustomerList: []
    }
  },
  created() {},
  mounted() {
    this.fetchData();
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    fetchData() {
      // 货主分类
      getLineCustomerOneOrTwoCategory({}).then(res => {
        this.lineCustomerList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    stateChange(item) {
      this.listQuery.state = item;
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
      fetchList(this.listQuery).then(response => {
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
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/add-client' })
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/add-client' })
      }
    },
    editDetails(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/add-client', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/add-client', query: { id: id }})
      }
    },
    goDetals(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/client-detail', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/client-detail', query: { id: id }})
      }
    },
    goLine(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ name: 'AllCarLine', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ name: 'AllCarLine', query: { id: id }})
      }
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
.DriverLineIn{
  padding:20px;
  padding-top: 0;
  .el-loading-mask{
    z-index: 1000 !important;
  }
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
  .moreBtn{
    border:none;
    background:none;
    text-align: left;
    padding: 0;
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

