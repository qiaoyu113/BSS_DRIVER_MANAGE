<template>
  <div class="join-in">
    <el-row>
      <el-col :span="12" class="left-part">
        <sticky class-name="sub-navbar">
          <div class="filter-container">
            <div class="menuBox">
              <span>加盟经理</span>
              <el-select v-model="driverQuery.joinMgr" placeholder="请选择" class="filter-item">
                <el-option
                  v-for="mgr in joinMgrs"
                  :key="mgr.userId"
                  :label="mgr.name"
                  :value="mgr.userId">
                </el-option>
              </el-select>
              <el-input
                v-model="driverQuery.query"
                placeholder="请输入查询条件"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleDriverFilter"/>
              <el-button v-waves :disabled="driverDisabled" class="filter-item" type="primary" icon="el-icon-search" @click="handleDriverFilter">{{ $t('table.search') }}
              </el-button>
            </div>
          </div>
        </sticky>
        <div id="driver-panel" ref="driverPanel" :style="tableStyle" class="table-panel" @scroll="driverScroll">
          <el-table
            v-loading="driverLoading"
            ref="driverTable"
            key="0"
            :data="driverList"
            :show-header="showHeader"
            class="driver-table"
            fit
            highlight-current-row
            cell-class-name="tb-cell"
            style="width: 100%;">
            <el-table-column label="" prop="id" sortable="custom" align="left">
              <template slot-scope="scope">
                <div :class="{'driver-item-active' : currentRowId === scope.row.id }" class="driver-item" @click="handleClickDriver(scope.row.id)">
                  <p>
                    <span class="item-title" v-html="scope.row.title"></span>
                    <span v-html="scope.row.addr"></span>
                  </p>
                  <p class="right-top-label">
                    <span v-html="scope.row.mgr"></span>
                  </p>
                  <p>
                    <span v-for="tag in scope.row.tags" v-if="tag" :key="tag" class="tag-item" v-html="tag"></span>
                  </p>
                </div>
              </template>
            </el-table-column>
            <infinite-loading
              slot="append"
              ref="driver-infinite"
              spinner="bubbles"
              force-use-infinite-wrapper="#driver-panel"
              @infinite="getDriverInfinite">
              <template slot="no-more">暂无更多数据</template>
              <template slot="no-results">暂无更多数据</template>
            </infinite-loading>
          </el-table>
        </div>
      </el-col>

      <el-col :span="12" class="right-part">
        <sticky class-name="sub-navbar-right">
          <div class="filter-container">
            <div class="menuBox">
              <span>线路销售</span>
              <el-select v-model="lineQuery.lineMgr" placeholder="请选择" class="filter-item">
                <el-option
                  v-for="mgr in lineMgrs"
                  :key="mgr.userId"
                  :label="mgr.name"
                  :value="mgr.userId">
                </el-option>
              </el-select>
              <el-input
                v-model="lineQuery.query"
                placeholder="请输入查询条件"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleLineFilter"/>
              <el-button v-waves :disabled="lineDisabled" class="filter-item" type="primary" icon="el-icon-search" @click="handleLineFilter">{{ $t('table.search') }}
              </el-button>
            </div>
          </div>
        </sticky>
        <div id="line-panel" ref="linePanel" :style="tableStyle" class="table-panel" @scroll="lineScroll">
          <el-table
            v-loading="lineLoading"
            key="0"
            :data="lineList"
            :show-header="showHeader"
            class="line-table"
            fit
            cell-class-name="line-tb-cell"
            style="width: 100%;">
            <el-table-column label="" prop="id" sortable="custom" align="left">
              <template slot-scope="scope">
                <match-comp :params="scope.row" :ids="recommendIds" @handleFatherMethod="reloadLineList"></match-comp>
              </template>
            </el-table-column>
            <infinite-loading
              slot="append"
              ref="line-infinite"
              spinner="bubbles"
              force-use-infinite-wrapper="#line-panel"
              @infinite="getLineInfinite">
              <template slot="no-more">暂无更多数据</template>
              <template slot="no-results">暂无更多数据</template>
            </infinite-loading>
          </el-table>
        </div>
      </el-col>
    </el-row>

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
import { fetchLineSales, fetchJoinMgr, fetchDriverList, fetchLineList } from '@/api/matchUp/matchup-api'

export default {
  name: 'JoinIn',
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
      tableStyle: {
        height: '500px',
        'overflow-y': 'auto'
      },
      currentRowId: 1,
      showHeader: false,
      scrollTop: 0,
      driverScrollTop: 0,
      lineScrollTop: 0,
      recommendIds: {
        driverId: 1,
        lineId: 1
      },
      driverPage: 1,
      driverLimit: 0,
      driverTotal: 0,
      driverState: null,
      driverLoading: true,
      driverDisabled: false,
      driverQuery: {
        joinMgr: '',
        query: '',
        page: 1,
        limit: 100
      },
      linePage: 1,
      lineLimit: 0,
      lineTotal: 0,
      lineState: null,
      lineLoading: false,
      lineDisabled: false,
      lineQuery: {
        lineMgr: '',
        query: '',
        driverId: '',
        page: 1,
        limit: 100
      },
      joinMgrs: [],
      lineMgrs: [],
      driverList: [],
      lineList: []
    }
  },
  created() {
  },
  mounted() {
    window.addEventListener('scroll', this.driverScroll)
    window.addEventListener('scroll', this.lineScroll)
    window.addEventListener('resize', this.resizeTableHeight)
    this.fetchData()
    this.resizeTableHeight()
  },
  destoryed() {
    window.removeEventListener('resize', this.resizeTableHeight)
  },
  methods: {
    resizeTableHeight() {
      this.tableStyle.height = window.innerHeight - 150 + 'px'
    },
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
    driverScroll() {
      let scrollTop = this.$refs.driverPanel.scrollTop
      if (this.driverLoading) {
        this.driverScrollTop = scrollTop
      }
    },
    lineScroll() {
      let scrollTop = this.$refs.linePanel.scrollTop
      if (this.lineLoading) {
        this.lineScrollTop = scrollTop
      }
    },
    handleDriverFilter() {
      this.driverPage = 0
      this.driverDisabled = true
      this.driverList = []
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        this.driverState.reset()
        this.getDriverInfinite(this.driverState)
      } else {
        this.driverState.reset()
      }
    },
    handleLineFilter() {
      this.linePage = 0
      this.lineDisabled = true
      this.lineList = []
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        this.lineState.reset()
        this.getLineInfinite(this.lineState)
      } else {
        this.lineState.reset()
      }
    },
    emptyLineList() {
      this.lineQuery.driverId = ''
      this.handleLineFilter()
    },
    getDriverInfinite($state) {
      if (this.driverQuery.page === 1) {
        if (this.driverLoading) {
          setTimeout(() => {
            this.driverList = []
            this.driverState = $state
            this.getDriverList($state).then(res => {
              if (res && res.id) {
                this.handleClickDriver(res.id)
              } else {
                this.emptyLineList()
              }
            })
          }, 800)
        } else {
          this.driverPage += 1
          this.driverState = $state
          this.driverQuery.page = this.driverPage
          this.getDriverList($state).then(res => {
            if (res && res.id) {
              this.handleClickDriver(res.id)
            } else {
              this.emptyLineList()
            }
          })
        }
      } else {
        if (!this.driverLoading) {
          this.driverPage += 1
          this.driverState = $state
          this.driverQuery.page = this.driverPage
          if (this.driverPage === 1) {
            this.getDriverList($state).then(res => {
              if (res && res.id) {
                this.handleClickDriver(res.id)
              } else {
                this.emptyLineList()
              }
            })
          } else {
            this.getDriverList($state)
          }
        }
      }
    },
    getLineInfinite($state) {
      if (this.lineQuery.page === 1) {
        if (this.lineLoading) {
          setTimeout(() => {
            this.lineList = []
            this.lineState = $state
            this.lineQuery.page = this.linePage
            this.getLineList($state)
          }, 800)
        } else {
          this.linePage += 1
          this.lineState = $state
          this.lineQuery.page = this.linePage
          this.getLineList($state)
        }
      } else {
        if (!this.lineLoading) {
          this.linePage += 1
          this.lineState = $state
          this.lineQuery.page = this.linePage
          this.getLineList($state)
        }
      }
    },
    getDriverList($state) {
      return new Promise((resolve, reject) => {
        this.driverLoading = true
        fetchDriverList(this.driverQuery).then(response => {
          if (response.data.success) {
            this.$refs.driverPanel.scrollTop = this.driverScrollTop - 100;
            this.driverList = this.driverList.concat(response.data.data)
            this.driverTotal = response.data.page.total
            this.driverLimit = response.data.page.limit
            setTimeout(() => {
              this.driverLoading = false
              this.driverDisabled = false
              if (!this.driverLoading) {
                $state.loaded()
              }
              if (Math.ceil(this.driverTotal / this.driverLimit) < this.driverQuery.page + 1) {
                $state.complete()
              }
            }, 500)
            if (this.driverPage === 1) {
              resolve(this.driverList[0])
            }
          } else {
            $state.complete()
            reject('fetch driver list fail')
          }
        })
      })
    },
    getLineList($state) {
      if (this.lineQuery.driverId) {
        this.lineLoading = true
        setTimeout(() => {
          fetchLineList(this.lineQuery).then(response => {
            if (response.data.success) {
              this.$refs.linePanel.scrollTop = this.lineScrollTop - 100;
              this.lineList = this.lineList.concat(response.data.data)
              this.lineTotal = response.data.page.total
              this.lineLimit = response.data.page.limit
              setTimeout(() => {
                this.lineLoading = false
                this.lineDisabled = false
                if (!this.lineLoading) {
                  $state.loaded()
                }
                if (Math.ceil(this.lineTotal / this.lineLimit) < this.lineQuery.page + 1) {
                  $state.complete()
                }
              }, 500)
            } else {
              $state.complete()
            }
          })
        }, 2000)
      } else {
        if (this.lineLoading) {
          this.lineLoading = !this.lineLoading
        }
        $state.complete()
      }
    },
    handleClickDriver(id) {
      this.currentRowId = id
      this.recommendIds.driverId = id
      this.lineQuery.driverId = id
      this.reloadLineList()
    },
    reloadLineList() {
      let time = 800
      if (document.documentElement.scrollTop > 100) {
        this.$refs.backToTop.backToTop()
      } else {
        time = 100
      }
      setTimeout(() => {
        this.scrollTop = 0
        this.handleLineFilter()
      }, time)
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  $light-color: rgb(253, 246, 242);
  $active-border-color: rgb(231, 171, 133);
  .join-in {
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
      margin-left: 20px;
      margin-top: 20px;
      padding-bottom: 10px;
    }
  }
  .left-part{
    background: #fff;
  }
  .right-part{
    background: $light-color;
  }
  .sub-navbar-right {
    padding: 0;
    height: auto !important;
    background: $light-color;
  }

  .driver-item{
    background: $light-color;
    border: 1px solid #e4decf;
    border-radius: 5px;
    padding: 2px 10px;
    position: relative;
    cursor: pointer;
    .item-title{
      font-size: 18px;
      font-weight: bold;
      color: #000;
    }
    .tag-item{
      background: rgb(223, 158, 96);
      display: inline-block;
      padding: 2px 10px;
      margin: 5px 5px 0 0;
      border-radius: 10px;
      color: #fff;
      text-align: center;
      font-size: 12px;
      min-width: 100px;
    }
    .right-top-label{
      position: absolute;
      right: -1px;
      top: -15px;
      padding: 0 10px;
      color: #fff;
      border-radius: 5px;
      background: rgb(217, 95, 76);
    }
  }
  .driver-item-active{
    background: #fff;
    border: 2px solid $active-border-color;
  }
  .tb-cell{
    border-bottom: 0px!important;
  }
  .driver-highlight-row{
    border: 2px solid red;
    background: #fff;
  }
  .line-tb-cell{
    background: $light-color;
    border-bottom: 0px!important;
  }

  .driver-table .el-table__body tr:hover>td{
    background-color: #fff !important;
  }
  .driver-table .el-table__body tr.current-row > td{
    background-color: #fff !important;
  }

  .line-table .el-table__body tr:hover>td{
    background-color: $light-color !important;
  }
  .line-table .el-table__body tr.current-row > td{
    background-color: $light-color !important;
  }
  .table-panel::-webkit-scrollbar {
    width: 0px;
    height: 1px;
  }
  .table-panel::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : #535353;
  }
  .table-panel::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background   : #ededed;
  }
</style>
