<template>
  <div class="driverListNew">
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
          <!--style="margin-right: 10px;float: right;"-->
          <!--type="primary"-->
          <!--icon="el-icon-add"-->
          <!--@click="handleCreate(0)">新建司机评估表-->
          <!--</el-button>-->
          <el-button
            v-permission="['/driver/driver/exportDriverPortrait']"
            class="filter-item"
            style="float: right;"
            type="primary"
            icon="el-icon-add"
            @click="exportBtn">导出司机画像
          </el-button>
          <el-button
            v-role="'wt'"
            class="filter-item"
            style="margin-right: 10px;float: right;"
            type="primary"
            icon="el-icon-add"
            @click="handleCreate(1)">新建专车司机
          </el-button>
          <el-button
            v-role="'pt'"
            class="filter-item"
            style="margin-right: 10px;float: right;"
            type="primary"
            icon="el-icon-add"
            @click="handleCreate2(1)">新建共享司机
          </el-button>
        </div>
        <div>
          <el-badge :value="listQuery.state === '' ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== ''" type="primary" size="small" @click="stateChange('')">全部司机数</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 1 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 1" type="primary" size="small" @click="stateChange(1)">面试司机</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 2 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 2" type="primary" size="small" @click="stateChange(2)">跟车司机</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 3 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 3" type="primary" size="small" @click="stateChange(3)">高意向司机</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 4 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 4" type="primary" size="small" @click="stateChange(4)">成交在跑</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 5 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 5" type="primary" size="small" @click="stateChange(5)">成交未跑</el-button>
          </el-badge>
          <!--<el-badge :value="listQuery.state === 6 ? totalDetail.all : ''" class="item" type="primary">-->
          <!--<el-button :plain="listQuery.state !== 6" type="primary" size="small" @click="stateChange(6)">未录评估信息</el-button>-->
          <!--</el-badge>-->
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
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>司机编号：</i>{{ scope.row.driverId }}</span>
            <!--<span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>创建时间：</i>{{ scope.row.createDate | Timestamp }}<i v-if="scope.row.creatorName">（{{ scope.row.creatorName }}）</i> <i v-if="scope.row.markedAsUnevaluated" style="float:right;">（未录入评估信息）</i></span>-->
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>创建时间：</i>{{ scope.row.createDate | Timestamp }}<i v-if="scope.row.creatorName">（{{ scope.row.creatorName }}）</i></span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i v-if="scope.row.driverType === 0 || scope.row.driverType === 99">(专车司机)</i><i v-if="scope.row.driverType === 1 || scope.row.driverType === 99">(共享司机)</i></span>
          </div>
          <el-row :gutter="30">
            <el-col :span="8">
              <p><span class="light-font">{{ scope.row.name }} / {{ scope.row.phone }}</span></p>
              <p>{{ scope.row.sourceName }}</p>
              <p>{{ scope.row.workCityName }}</p>
            </el-col>
            <el-col :span="5">
              <p v-if="scope.row.carTypeName">{{ scope.row.carTypeName }}</p>
              <p v-if="!scope.row.carTypeName">未匹配车型</p>
            </el-col>
            <el-col :span="7">
              <p class="el-button--primary is-plain no-bg"><span class="noLight-font">签约状态：</span><span class="val">{{ scope.row.stateName }}</span></p>
            </el-col>
            <el-col :span="4" class="btnBox">
              <el-button v-permission="['/driver/driver/detail']" v-if="scope.row.state === 1" type="primary" size="mini" plain @click="goEdit(scope.row.driverId)">编辑</el-button>
              <el-button v-permission="['/driver/driver/creditMarking']" v-if="scope.row.state === 2 && scope.row.isCreditPass === 1" type="primary" size="mini" plain @click="handleSign(scope.row.driverId)">征信标记</el-button>
              <!--<el-button v-permission="['/driver/driver/income/calendar']" type="primary" size="mini" plain @click="goDate(scope.row.driverId)">收入日历</el-button>-->
              <el-button v-permission="['/driver/driver/detail']" type="text" @click="goDetail(scope.row.driverId)">详情</el-button>
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
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Sticky from '@/components/Sticky'
import BackToTop from '@/components/BackToTop'
import permission from '@/directive/permission/index'
import { GetDriverList, offLineChecks, exportDriverPortrait } from '@/api/driver/driver-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import role from '@/directive/role/index'
import '@/styles/qiaoyu.scss'

export default {
  name: 'DriverListNew',
  components: { Pagination, InfiniteLoading, Sticky, BackToTop },
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
      totalDetail: {},
      showHeader: false,
      tableKey: 0,
      times: 30,
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
    exportBtn() {
      if (this.listQuery.startDate === '') {
        this.$message({
          type: 'info',
          message: '请选择时间范围'
        });
      } else {
        this.$confirm('是否确认导出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.times === 30) {
            exportDriverPortrait({
              startDate: this.listQuery.startDate,
              endDate: this.listQuery.endDate
            }).then((res) => {
              if (res.data.success) {
                var overTime = setInterval(() => {
                  if (this.times > 1) {
                    this.times = this.times - 1
                  } else {
                    this.times = 30
                    clearInterval(overTime)
                  }
                }, 1000)
                const h = this.$createElement;
                const i = this.$createElement;
                const c = this.$createElement;
                this.$notify({
                  title: '导出成功',
                  message: i('i', { style: 'color: teal;font-style: normal;' }, ['导出文件正在生成，请前往', h('i', { class: 'el-icon-download', style: 'color: #333; font-weight:bold;font-size:24px;' }, ''), c('i', { style: 'color: teal;font-style: normal;' }, '下载工具进行下载')]),
                  duration: 0,
                  offset: 100
                });
              } else {
                this.$message({
                  message: res.data.errorMsg,
                  type: 'warning'
                });
              }
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
      }
    },
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
      GetDriverList(this.listQuery).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          this.list = this.list.concat(response.data.data)
          this.total = response.data.page.total
          this.limit = response.data.page.limit
          this.totalDetail = response.data.title
          if (this.listQuery.state === 3) {
            this.totalDetail.all = this.totalDetail.advancedIntentional_count
          }
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
    goDetail(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/driver-detail', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/driver-detail', query: { id: id }})
      }
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
        if (url === 'firmiana-bss.yunniao.cn' || url === 'partner-bss.yunniao.cn') {
          window.open('https://jinshuju.net/f/AleZyO ', '_blank')
        } else {
          window.open('https://jinshuju.net/f/r4mifv ', '_blank')
        }
      } else {
        if (url === 'firmiana-bss.yunniao.cn' || url === 'partner-bss.yunniao.cn') {
          window.open('https://jinshuju.net/f/gKsmHG', '_blank')
        } else {
          window.open('https://jinshuju.net/f/l9hLok ', '_blank')
        }
      }
    },
    handleCreate2(type) {
      let url = window.location.host;
      if (type) {
        if (url === 'firmiana-bss.yunniao.cn' || url === 'partner-bss.yunniao.cn') {
          window.open('https://jinshuju.net/f/qx2KCY ', '_blank')
        } else {
          window.open('https://jinshuju.net/f/JV9HG4 ', '_blank')
        }
      } else {
        if (url === 'firmiana-bss.yunniao.cn' || url === 'partner-bss.yunniao.cn') {
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
        let routeData = this.$router.resolve({ path: '/add-driver', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/add-driver', query: { id: id }})
      }
    },
    updateData() {}
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  .driverListNew{
    padding:20px;
    padding-top: 0;
    .el-button--mini {
      width: auto
    }
    .el-loading-mask{
      z-index: 1000 !important;
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
