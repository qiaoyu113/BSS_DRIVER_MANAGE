<template>
  <div class="FeedbackList">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <div class="menuBox">
          <span class="topFont">创建时间：</span>
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
          <!--<el-button-->
          <!--class="filter-item"-->
          <!--style="float: right;"-->
          <!--type="primary"-->
          <!--icon="el-icon-add"-->
          <!--@click="handleCreate">导出-->
          <!--</el-button>-->
        </div>
        <div>
          <el-badge :value="listQuery.state === '' ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== ''" type="primary" size="small" @click="stateChange('')">问题总数</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 1 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 1" type="primary" size="small" @click="stateChange(1)">未处理</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 2 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 2" type="primary" size="small" @click="stateChange(2)">未解决</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 3 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 3" type="primary" size="small" @click="stateChange(3)">已解决</el-button>
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
          <div style="width: 100px;height: 30px;line-height: 30px;text-align: center;position: absolute;right: 10px;color: #e6d3bd;">NO.{{ scope.$index+1 }}</div>
          <div class="topBorder">
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>问题编号：</i>{{ scope.row.issueId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>司机编号：</i>{{ scope.row.driverId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>创建时间：</i>{{ scope.row.createDate | Timestamp }}<i v-if="scope.row.creatorName">（{{ scope.row.creatorName }}）</i></span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>处理时间：</i>{{ scope.row.handleDate | Timestamp }}<i v-if="scope.row.creatorName">（{{ scope.row.creatorName }}）</i></span>
          </div>
          <el-row :gutter="30">
            <el-col :span="8">
              <p><span class="light-font">{{ scope.row.name }} / {{ scope.row.phone }}</span></p>
              <p>{{ scope.row.cityName }}</p>
            </el-col>
            <el-col :span="5">
              <p v-if="scope.row.issueType">{{ scope.row.issueType }}</p>
            </el-col>
            <el-col :span="7">
              <p>{{ scope.row.stateName }}</p>
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">处理次数：</span><span class="val">{{ scope.row.handleCount }}</span></p>
            </el-col>
            <el-col :span="4" class="btnBox">
              <!--<el-button v-permission="['/driver/driver/detail']" v-if="scope.row.state === 1" type="primary" size="mini" plain @click="goEdit(scope.row.driverId)">问题处理</el-button>-->
              <el-button v-permission="['/driver/driver/detail']" type="text" @click="goDetail(scope.row)">详情</el-button>
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

    <!--详情-->
    <el-dialog :visible.sync="activateVisible" :title="detail.detailTitle">
      <el-row :gutter="12">
        <el-col :span="12">
          <el-card shadow="hover">
            <el-container>
              <el-header>城市</el-header>
              <el-main>{{ detail.cityName | DataIsNull }}</el-main>
            </el-container>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <el-container>
              <el-header>问题类型</el-header>
              <el-main>{{ detail.issueType | DataIsNull }}</el-main>
            </el-container>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <el-container>
              <el-header>问题内容</el-header>
              <el-main>{{ detail.content | DataIsNull }}</el-main>
            </el-container>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <el-container>
              <el-header>是否已解决</el-header>
              <el-main>{{ detail.stateName | DataIsNull }}</el-main>
            </el-container>
          </el-card>
        </el-col>
        <!--<el-col :span="12">-->
        <!--<el-card shadow="hover">-->
        <!--<el-container>-->
        <!--<el-header>解决方案</el-header>-->
        <!--<el-main>{{ detail.value | DataIsNull }}</el-main>-->
        <!--</el-container>-->
        <!--</el-card>-->
        <!--</el-col>-->
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Sticky from '@/components/Sticky'
import BackToTop from '@/components/BackToTop'
import permission from '@/directive/permission/index'
import { feedbackAll, offLineChecks, feedbackSolved, feedbackUnprocessed, feedbackUnsolved, feedbackDetail } from '@/api/driver/driver-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'

export default {
  name: 'FeedbackList',
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
      DateValue2: '',
      total: 0,
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
      activateVisible: false,
      offLineId: '',
      dialogStatus: '',
      detail: '',
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
    getList($state) {
      this.listLoading = true
      if (this.listQuery.state === '') {
        feedbackAll(this.listQuery).then(response => {
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
      } else if (this.listQuery.state === 1) {
        feedbackSolved(this.listQuery).then(response => {
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
      } else if (this.listQuery.state === 2) {
        feedbackUnprocessed(this.listQuery).then(response => {
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
      } else if (this.listQuery.state === 3) {
        feedbackUnsolved(this.listQuery).then(response => {
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
      }
    },
    stateChange(num) {
      this.listQuery.state = num;
      this.totalDetail.all = '...';
      this.handleFilter()
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
                if (this.$store.getters.newTab) {
                  let routeData = this.$router.resolve({ path: '/driver-list' })
                  window.open(routeData.href, '_blank');
                } else {
                  this.$router.push({ path: '/driver-list' })
                }
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
    goDetail(detail) {
      // if (this.$store.getters.newTab) {
      //   let routeData = this.$router.resolve({ path: '/driver-feedback-detail', query: { id: id, name: name, phone: phone }})
      //   window.open(routeData.href, '_blank');
      // } else {
      //   this.$router.push({ path: '/driver-feedback-detail', query: { id: id, name: name, phone: phone }})
      // }
      feedbackDetail({
        issueId: detail.issueId
      }).then(res => {
        if (res.data.success) {
          detail.content = res.data.data
          this.detail = detail;
          this.detail.detailTitle = detail.name + '/' + detail.phone;
          this.activateVisible = true;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    goDate(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/income-calendar', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/income-calendar', query: { id: id }})
      }
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
    handleCreate(type) {
      let url = window.location.host;
      if (type) {
        if (url === 'firmiana-bss.yunniao.cn') {
          window.open('https://jinshuju.net/f/AleZyO ', '_blank')
        } else {
          window.open('https://jinshuju.net/f/r4mifv ', '_blank')
        }
      } else {
        if (url === 'firmiana-bss.yunniao.cn') {
          window.open('https://jinshuju.net/f/gKsmHG', '_blank')
        } else {
          window.open('https://jinshuju.net/f/l9hLok ', '_blank')
        }
      }
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
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/driver-feedback-detail', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/driver-feedback-detail', query: { id: id }})
      }
    },
    updateData() {}
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  .FeedbackList{
    padding:20px;
    padding-top: 0;
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
    .el-card{
      margin:12px;
      cursor: pointer;
    }
    .el-aside {
      /*font-weight: bold;*/
      color:#409EFF;
      line-height: 1.4;
    }
    .el-header{
      color:#909399;
      height: auto !important;
      padding: 0;
      margin-bottom: 10px;
      font-weight: 500;
    }
    .el-main {
      padding: 0;
      color:#000;
      font-weight: bold;
      line-height: 1.4;
    }
  }
</style>

