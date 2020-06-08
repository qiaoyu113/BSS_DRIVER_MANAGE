<template>
  <div class="follow-up">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <div class="menuBox">
          <el-row>
            <el-col :span="12">
              <div>
                <el-badge :value="listQuery.state === '' ? totalDetail.all : ''" class="item" type="primary">
                  <el-button :plain="listQuery.state !== ''" type="primary" size="small" @click="stateChange('')">全部</el-button>
                </el-badge>
                <el-badge :value="listQuery.state === 1 ? totalDetail.all : ''" class="item" type="primary">
                  <el-button :plain="listQuery.state !== 1" type="primary" size="small" @click="stateChange(1)">推送</el-button>
                </el-badge>
                <el-badge :value="listQuery.state === 2 ? totalDetail.all : ''" class="item" type="primary">
                  <el-button :plain="listQuery.state !== 2" type="primary" size="small" @click="stateChange(2)">看活</el-button>
                </el-badge>
                <el-badge :value="listQuery.state === 3 ? totalDetail.all : ''" class="item" type="primary">
                  <el-button :plain="listQuery.state !== 3" type="primary" size="small" @click="stateChange(3)">试跑</el-button>
                </el-badge>
                <el-badge :value="listQuery.state === 4 ? totalDetail.all : ''" class="item" type="primary">
                  <el-button :plain="listQuery.state !== 4" type="primary" size="small" @click="stateChange(4)">上手</el-button>
                </el-badge>
                <el-badge :value="listQuery.state === 5 ? totalDetail.all : ''" class="item" type="primary">
                  <el-button :plain="listQuery.state !== 5" type="primary" size="small" @click="stateChange(5)">失败</el-button>
                </el-badge>
              </div>
            </el-col>
            <el-col :span="12">
              <span>加盟经理</span>
              <el-select v-model="listQuery.joinMgr" placeholder="请选择" class="filter-item" @change="handleFilter">
                <el-option
                  v-for="mgr in joinMgrs"
                  :key="mgr.userId"
                  :label="mgr.name"
                  :value="mgr.userId">
                </el-option>
              </el-select>
              <span>线路销售</span>
              <el-select v-model="listQuery.lineMgr" placeholder="请选择" class="filter-item" @change="handleFilter">
                <el-option
                  v-for="mgr in lineMgrs"
                  :key="mgr.userId"
                  :label="mgr.name"
                  :value="mgr.userId">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </div>
    </sticky>
    <el-table
      v-loading="listLoading"
      key="0"
      :data="list"
      :show-header="showHeader"
      class="follow-table"
      fit
      cell-class-name="follow-tb-cell"
      style="width: 100%;">
      <el-table-column label="" prop="id" sortable="custom" align="left">
        <template slot-scope="scope">
          <div class="table-cell-item">
            <el-row>
              <el-col :span="12">
                <match-comp :params="scope.row.line"></match-comp>
              </el-col>
              <el-col :span="12">
                <div class="follow-driver-item">
                  <p>
                    <span class="item-title" v-html="scope.row.driver.title"></span>
                    <span v-html="scope.row.driver.addr"></span>
                    <span v-if="scope.row.driver.mgr" class="right-top-label" v-html="scope.row.driver.mgr"></span>
                  </p>
                  <div class="record-rows">
                    <p v-for="record in scope.row.driver.records" :key="record.id" class="record-row">
                      <el-row>
                        <el-col :span="18">
                          <span class="record-item" v-html="record.tag"></span>
                          <span v-html="record.desc"></span>
                        </el-col>
                        <el-col :span="6" class="record-time">
                          <span v-html="record.time"></span>
                        </el-col>
                      </el-row>
                    </p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
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
      <back-to-top
        ref="backToTop"
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="50"
        transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Sticky from '@/components/Sticky'
import BackToTop from '@/components/BackToTop'
import permission from '@/directive/permission/index'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import role from '@/directive/role/index'
import matchComp from './components/matchLine'
import { fetchLineSales, fetchJoinMgr, fetchFollowList } from '@/api/matchUp/matchup-api'

export default {
  name: 'FollowUp',
  components: { Pagination, InfiniteLoading, Sticky, BackToTop, matchComp },
  directives: { waves, permission, role },
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
      currentRowId: 1,
      showHeader: false,
      scrollTop: 0,
      totalDetail: {},
      page: 1,
      limit: 0,
      total: 0,
      state: null,
      listLoading: true,
      disabled: false,
      listQuery: {
        lineMgr: '',
        joinMgr: '',
        page: 1,
        limit: 100,
        state: ''
      },
      joinMgrs: [],
      lineMgrs: [],
      list: []
    }
  },
  created() {
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchJoinMgr().then(response => {
        let arr = response.data.data
        arr.unshift({
          name: '全部',
          userId: ''
        })
        this.joinMgrs = arr
      }).catch(err => {
        this.$message.error(err);
      })
      fetchLineSales().then(response => {
        let arr = response.data.data
        arr.unshift({
          name: '全部',
          userId: ''
        })
        this.lineMgrs = arr
      }).catch(err => {
        this.$message.error(err);
      })
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.listLoading) {
        this.scrollTop = scrollTop
      }
    },
    stateChange(num) {
      this.listQuery.state = num;
      this.totalDetail.all = '...';
      this.handleFilter()
    },
    handleFilter() {
      this.page = 0
      this.list = []
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        this.state.reset()
        this.getInfinite(this.state)
      } else {
        this.state.reset()
      }
    },

    getInfinite($state) {
      if (this.listQuery.page === 1) {
        if (this.listLoading) {
          setTimeout(() => {
            this.list = []
            this.state = $state
            this.listQuery.page = this.page
            this.getList($state)
          }, 800)
        } else {
          this.page += 1
          this.state = $state
          this.listQuery.page = this.page
          this.getList($state)
        }
      } else {
        if (!this.listLoading) {
          this.page += 1
          this.state = $state
          this.listQuery.page = this.page
          this.getList($state)
        }
      }
    },
    getList($state) {
      this.listLoading = true
      fetchFollowList(this.listQuery).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          this.list = this.list.concat(response.data.data)
          this.total = response.data.page.total
          this.limit = response.data.page.limit
          this.totalDetail.all = this.total
          setTimeout(() => {
            this.listLoading = false
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
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  $light-color: rgb(253, 246, 242);
  $grey: #A6A197;
  .follow-up {
    padding-top: 0;
    .filter-container {
      padding: 0;
      .filter-item {
        margin-bottom: 0px;
      }
    }
    .sub-navbar {
      padding: 0;
      height: auto !important;
    }
    .el-button--mini {
      margin-left: 0 !important;
      margin: 5px;
    }
    .menuBox {
      line-height: 20px;
      margin-top: 20px;
      margin-left: 20px;
      padding-bottom: 10px;
    }
    .el-badge{
      margin-right:20px;
    }
  }
  .table-cell-item{
    background: $light-color;
    border: 1px solid #e4decf;
    border-radius: 5px;
    position: relative;
    .item-title{
      font-size: 18px;
      font-weight: bold;
      color: #000;
    }
    .right-top-label{
      position: absolute;
      right: -1px;
      top: -1px;
      padding: 0 10px;
      color: #fff;
      border-radius: 5px;
      background: rgb(217, 95, 76);
    }
    .follow-driver-item{
      padding: 0 10px;
      font-size: 12px;
      position: relative;
      span{
        display: inline-block;
        padding: 0 5px;
        height: 20px;
        line-height: 20px;
        color: #000;
      }
      .record-rows{
        height: 180px;
        overflow-y: auto;
        .record-row{
          margin-top: 5px;
          .record-item{
            background: rgb(223, 158, 96);
            color: #fff;
            border-radius: 10px;
            text-align: center;
            width:60px;
          }
          .record-time{
            text-align: right;
            span{
              color: $grey;
            }
          }
        }
      }
      .right-top-label{
        position: absolute;
        right: -1px;
        top: -14px;
        font-size: 14px;
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        color: #fff;
        border-radius: 5px;
        background: rgb(217, 95, 76);
      }
    }
  }
  .tb-cell{
    border-bottom: 0px!important;
  }
  .driver-highlight-row{
    border: 2px solid red;
    background: #fff;
  }
  .follow-tb-cell{
    border-bottom: 0px!important;
  }

  .follow-table .el-table__body tr:hover>td{
    background-color: #fff !important;
  }
  .follow-table .el-table__body tr.current-row > td{
    background-color: #fff !important;
  }
</style>
