<template>
  <div class="match-statistics">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <div class="menuBox">
          <el-row>
            <el-col :span="12">
              <div>
                <el-badge :value="listQuery.state === '' ? totalDetail.all : ''" class="item" type="primary">
                  <el-button :plain="listQuery.state !== ''" type="primary" size="small" @click="stateChange('')">今日</el-button>
                </el-badge>
                <el-badge :value="listQuery.state === 1 ? totalDetail.all : ''" class="item" type="primary">
                  <el-button :plain="listQuery.state !== 1" type="primary" size="small" @click="stateChange(1)">昨日</el-button>
                </el-badge>
                <el-badge :value="listQuery.state === 2 ? totalDetail.all : ''" class="item" type="primary">
                  <el-button :plain="listQuery.state !== 2" type="primary" size="small" @click="stateChange(2)">本周</el-button>
                </el-badge>
                <el-badge :value="listQuery.state === 3 ? totalDetail.all : ''" class="item" type="primary">
                  <el-button :plain="listQuery.state !== 3" type="primary" size="small" @click="stateChange(3)">上周</el-button>
                </el-badge>
                <el-badge :value="listQuery.state === 4 ? totalDetail.all : ''" class="item" type="primary">
                  <el-button :plain="listQuery.state !== 4" type="primary" size="small" @click="stateChange(4)">本月</el-button>
                </el-badge>
                <el-badge :value="listQuery.state === 5 ? totalDetail.all : ''" class="item" type="primary">
                  <el-button :plain="listQuery.state !== 5" type="primary" size="small" @click="stateChange(5)">上月</el-button>
                </el-badge>
              </div>
            </el-col>
            <el-col :span="12">
              <span>城市</span>
              <el-select v-model="listQuery.city" placeholder="请选择" class="filter-item" @change="handleFilter">
                <el-option
                  v-for="it in cityList"
                  :key="it.codeVal"
                  :label="it.code"
                  :value="it.codeVal">
                </el-option>
              </el-select>
              <span>排序</span>
              <el-select v-model="listQuery.sort" placeholder="请选择" class="filter-item" @change="handleFilter">
                <el-option
                  v-for="it in sortList"
                  :key="it.id"
                  :label="it.name"
                  :value="it.id">
                </el-option>
              </el-select>
              <el-button type="primary" size="small" @click="exportStat">导出</el-button>
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
      class="stat-table"
      fit
      cell-class-name="stat-tb-cell"
      style="width: 100%;">
      <el-table-column label="" prop="id" sortable="custom" align="left">
        <template slot-scope="scope">
          <div class="stat-cell-item">
            <el-row>
              <el-col :span="20">
                <div class="col-title">
                  <span v-html="scope.row.name"></span>
                </div>
                <div class="col-tags">
                  <p>
                    <span>推送</span>
                    <span v-html="scope.row.push"></span>
                  </p>
                  <p>
                    <span>看活</span>
                    <span v-html="scope.row.look"></span>
                  </p>
                  <p>
                    <span>试跑</span>
                    <span v-html="scope.row.running"></span>
                  </p>
                  <p>
                    <span>上手</span>
                    <span v-html="scope.row.upHand"></span>
                  </p>
                  <p>
                    <span>失败</span>
                    <span v-html="scope.row.fail"></span>
                  </p>
                  <p>
                    <span>失败率</span>
                    <span v-html="scope.row.failRate"></span>
                  </p>
                  <p>
                    <span>成功率</span>
                    <span v-html="scope.row.succRate"></span>
                  </p>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="col-group">
                  <p>
                    <span class="group-item" v-html="scope.row.group"></span>
                    <span class="group-item" v-html="scope.row.groupRole"></span>
                  </p>
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
import { fetchCity, fetchSort, fetchStatistics, exportFile } from '@/api/matchUp/matchup-api'

export default {
  name: 'MatchStatistics',
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
      times: 30,
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
        city: '',
        sort: 1,
        page: 1,
        limit: 100,
        state: ''
      },
      cityList: [],
      sortList: [],
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
      fetchCity().then(response => {
        let arr = response.data.data
        this.listQuery.city = arr[0].codeVal
        this.cityList = arr
      }).catch(err => {
        this.$message.error(err);
      })
      fetchSort().then(response => {
        let arr = response.data.data
        this.sortList = arr
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
      fetchStatistics(this.listQuery).then(response => {
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
    },
    exportStat() {
      let { city, sort, tag } = this.listQuery
      let params = { city, sort, tag }
      this.$confirm('是否确认导出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.times === 30) {
          exportFile(params).then((res) => {
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
    },
    download(data) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '撮合统计列表.xlsx')
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  $light-color: rgb(253, 246, 242);
  $grey: #A6A197;
  $red: rgb(220, 104, 87);
  $brown: rgb(228, 153, 96);
  .match-statistics {
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
  .stat-table{
    margin-top: 10px;
  }
  .stat-cell-item {
    background: $light-color;
    border: 1px solid #e4decf;
    border-radius: 5px;
    position: relative;
    width: 100%;
    .col-title{
      font-size: 14px;
      font-weight: bold;
      color: #000;
      padding: 5px 20px;
      display: inline-block;
    }
    .col-tags{
      display: inline-block;
      color: #fff;
      font-size: 12px;
      p{
        display: inline-block;
        margin-left: 10px;
        background: $brown;
        padding: 0px 2px;
        width: 80px;
        border-radius: 10px;
        position: relative;
        span:first-child{
          text-align: center;
          width: 45px;
          display: inline-block;
        }
        span:nth-child(2){
          width: 35px;
          text-align: center;
          display: inline-block;
          position: absolute;
          right: 0;
          background: $red;
          border-radius: 10px;
        }
      }
    }
    .col-group {
      display: inline-block;
      text-align: right;
      width: 100%;
      color: #fff;
      font-size: 12px;
      padding-right: 10px;
      .group-item{
        background: $red;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }
  .stat-tb-cell{
    border-bottom: 0px!important;
    padding: 2px 0!important;
  }

  .stat-table .el-table__body tr:hover>td{
    background-color: #fff !important;
  }
  .stat-table .el-table__body tr.current-row > td{
    background-color: #fff !important;
  }
</style>
