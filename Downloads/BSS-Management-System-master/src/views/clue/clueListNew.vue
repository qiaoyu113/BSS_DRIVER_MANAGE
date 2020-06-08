<template>
  <div class="clueListNew">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <div class="menuBox">
          <el-row>
            <el-form label-width="120px">
              <el-col :span="6">
                <el-form-item label="拓展经理">
                  <el-select v-model="listQuery.expandManager" placeholder="请选择">
                    <el-option
                      v-for="item in optionsManager"
                      :key="item.userId"
                      :label="item.name"
                      :value="item.userId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="更新类型">
                  <el-select v-model="listQuery.clueType" placeholder="请选择">
                    <el-option
                      v-for="item in optionsUpdate"
                      :key="item.codeVal"
                      :label="item.code"
                      :value="item.codeVal">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="车型">
                  <el-select v-model="listQuery.carType" placeholder="请选择">
                    <el-option
                      v-for="item in optionsCar"
                      :key="item.codeVal"
                      :label="item.code"
                      :value="item.codeVal">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否入驻">
                  <el-select v-model="listQuery.isSettledIn" placeholder="请选择">
                    <el-option
                      key=""
                      label="全部"
                      value="">
                    </el-option>
                    <el-option
                      key="1"
                      label="是"
                      value="1">
                    </el-option>
                    <el-option
                      key="0"
                      label="否"
                      value="0">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="城市">
                  <el-select v-model="listQuery.workCity" placeholder="请选择">
                    <el-option
                      v-for="item in optionsCity"
                      :key="item.codeVal"
                      :label="item.code"
                      :value="item.codeVal">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="来源渠道">
                  <el-select v-model="listQuery.sourceType" placeholder="请选择">
                    <el-option
                      v-for="item in optionsSource"
                      :key="item.codeVal"
                      :label="item.code"
                      :value="item.codeVal">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否保证金">
                  <el-select v-model="listQuery.isPayDeposit" placeholder="请选择">
                    <el-option
                      key=""
                      label="全部"
                      value="">
                    </el-option>
                    <el-option
                      key="1"
                      label="是"
                      value="1">
                    </el-option>
                    <el-option
                      key="0"
                      label="否"
                      value="0">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="sourceShow" :span="6">
                <el-form-item label="来源小程序">
                  <el-select v-model="listQuery.appletSource" placeholder="请选择">
                    <el-option
                      v-for="item in optionsXcx"
                      :key="item.codeVal"
                      :label="item.code"
                      :value="item.codeVal">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <div class="menuBox">
          <span class="topFont">更新时间：</span>
          <el-date-picker
            v-model="DateValue2"
            :picker-options="pickerOptions"
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
            v-permission="['/driver/driver/clue/bss/create']"
            class="filter-item"
            style="margin-right: 10px;float: right;"
            type="primary"
            icon="el-icon-add"
            @click="handleCreate()">添加线索
          </el-button>
          <el-button
            v-permission="['/bss/v1/bss/driver/clue/export']"
            class="filter-item"
            style="float: right;"
            type="primary"
            icon="el-icon-add"
            @click="exportBtn">导出
          </el-button>
          <el-button
            v-permission="['/driver/driver/clue/bss/updateBDManager']"
            class="filter-item"
            style="float: right;"
            type="primary"
            icon="el-icon-add"
            @click="changeManager">修改拓展经理
          </el-button>
        </div>
        <div>
          <el-badge :value="listQuery.state === '' ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== ''" type="primary" size="small" @click="stateChange('')">线索总数</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 1 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 1" type="primary" size="small" @click="stateChange(1)">待跟进数</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 2 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 2" type="primary" size="small" @click="stateChange(2)">已跟进数</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 3 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 3" type="primary" size="small" @click="stateChange(3)">已转化数</el-button>
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
      @sort-change="sortChange"
      @selection-change="handleSelectionChange">
      <el-table-column
        v-permission="['/driver/driver/clue/bss/updateBDManager']"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="货主名称" prop="id" sortable="custom" align="left">
        <template slot-scope="scope">
          <div style="width: 100px;height: 30px;line-height: 30px;text-align: center;position: absolute;right: 10px;color: #e6d3bd;">NO.{{ scope.$index+1 }}</div>
          <!--
          <div class="topBorder">
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>线索编号：</i>{{ scope.row.clueId }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>更新类型：</i>{{ scope.row.clueTypeName }}</span>
            <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>更新时间：</i>{{ scope.row.updateDate | Timestamp }}<i v-if="scope.row.creatorName">（{{ scope.row.creatorName }}）</i></span>
          </div>
          <el-row :gutter="30">
            <el-col :span="4">
              <p><span class="light-font">{{ scope.row.name }} / {{ scope.row.phone | DataIsNull }}</span></p>
              <p>{{ scope.row.sourceTypeName }}</p>
              <p>{{ scope.row.workCityName }}</p>
              <p>{{ scope.row.carTypeName }}</p>
            </el-col>
            <el-col :span="4">
              <p>跟进次数： {{ scope.row.followCount | DataIsNull }}</p>
              <p>跟进备注： {{ scope.row.followSituation }}</p>
              <p>最近跟进时间： {{ scope.row.recentFollowDate | Timestamp }}</p>
            </el-col>
            <el-col :span="4">
              <p>线索方式： {{ scope.row.wayName | DataIsNull }}</p>
              <p>线索状态： {{ scope.row.stateName | DataIsNull }}</p>
              <p>司机状态： {{ scope.row.driverStateName | DataIsNull }}</p>
            </el-col>
            <el-col :span="4">
              <p>拓展经理： {{ scope.row.expandManager }} / {{ scope.row.bindTypeName }}</p>
              <p>车型： {{ scope.row.carTypeName | DataIsNull }}</p>
              <p>来源渠道： {{ scope.row.sourceTypeName }}</p>
            </el-col>
            <el-col :span="4">
              <p v-if="scope.row.isPayDeposit === 1">是否缴纳服务费： 是 {{ `（${scope.row.depositFee}元）` }}</p>
              <p v-else>是否缴纳服务费： 否 </p>
              <p>入驻日期： {{ scope.row.createDate | Timestamp }}</p>
            </el-col>
            <el-col :span="4" class="btnBox">
              <el-button v-permission="['/driver/driver/clue/bss/create']" v-if="(scope.row.state === 1 || scope.row.state === 2) && scope.row.workCityName" type="primary" plain size="mini" @click="addClue(scope.row.clueId)">跟进</el-button>
              <el-button v-permission="['/driver/driver/clue/bss/clueDistribute']" type="text" @click="distributionClue(scope.row.clueId)">线索分配</el-button>
              <el-button v-permission="['/driver/driver/clue/bss/clueInfo']" type="text" @click="goDetals(scope.row.clueId)">详情</el-button>
              <el-button v-permission="['/driver/driver/clue/log/list']" type="text" @click="goLog(scope.row.clueId)">操作日志</el-button>
            </el-col>
          </el-row>
          -->
          <el-row :gutter="30">
            <el-col :span="4">
              <p>线索编号： {{ scope.row.clueId }}</p>
              <p>城市： {{ scope.row.workCityName | DataIsNull }}</p>
            </el-col>
            <el-col :span="6">
              <p>司机姓名： {{ scope.row.name }} / {{ scope.row.phone | DataIsNull }}</p>
              <p>拓展经理： {{ scope.row.expandManager }} / {{ scope.row.bindTypeName }}</p>
            </el-col>
            <el-col :span="3">
              <p>车型： {{ scope.row.carTypeName | DataIsNull }}</p>
              <p>来源渠道： {{ scope.row.sourceTypeName }}</p>
            </el-col>
            <el-col :span="5">
              <p v-if="scope.row.isPayDeposit === 1">是否缴纳服务费： 是 {{ `（${scope.row.depositFee}元）` }}</p>
              <p v-else>是否缴纳服务费： 否 </p>
              <p>入驻日期： {{ scope.row.createDate | Timestamp }}</p>
            </el-col>
            <el-col :span="3">
              <p>司机状态： {{ scope.row.driverStateName | DataIsNull }}</p>
              <p>跟进备注： {{ scope.row.followSituation }}</p>
            </el-col>
            <el-col :span="3" class="btnBox">
              <div>
                <el-button v-permission="['/driver/driver/clue/bss/create']" v-if="(scope.row.state === 1 || scope.row.state === 2) && scope.row.workCityName" class="inline" type="text" @click="addClue(scope.row.clueId)">跟进</el-button><el-button v-permission="['/driver/driver/clue/bss/clueInfo']" class="inline" type="text" @click="goDetals(scope.row.clueId, scope.row.userId)">详情</el-button>
              </div>
              <div>
                <el-button v-permission="['/driver/driver/clue/bss/clueDistribute']" class="inline" type="text" @click="distributionClue(scope.row.clueId)">线索分配</el-button><el-button v-permission="['/driver/driver/clue/log/list']" class="inline" type="text" @click="goLog(scope.row.clueId)">操作日志</el-button>
              </div>
              <!-- <el-button v-permission="['/driver/driver/clue/log/list']" type="text" @click="goLog(scope.row.clueId)">操作日志</el-button> -->
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

    <el-dialog :visible.sync="changeManagerBox" title="修改拓展经理">
      <el-form label-width="120px">
        <el-form-item label="请选择拓展经理">
          <el-select v-model="managerIds" multiple placeholder="请选择">
            <el-option
              v-for="item in optionsManager2"
              :key="item.userId"
              :label="item.name"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="checkManager">确认</el-button>
        <el-button @click="changeManagerBox = false">取消</el-button>
      </el-form>
    </el-dialog>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Sticky from '@/components/Sticky'
import BackToTop from '@/components/BackToTop'
import permission from '@/directive/permission/index'
import role from '@/directive/role/index'
import { dictionary } from '@/api/common'
import { getClueList, exportExcelClueList, getBDManager, checkManager } from '@/api/clue/clue-api'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'

export default {
  name: 'ClueListNew',
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
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.selectDate = minDate.getTime();
          if (maxDate) {
            this.selectDate = ''
          }
        }, disabledDate: (time) => {
          if (this.selectDate !== '') {
            const one = 30 * 24 * 3600 * 1000;
            const minTime = this.selectDate - one;
            const maxTime = this.selectDate + one;
            return time.getTime() < minTime || time.getTime() > maxTime
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
      selectDate: '',
      showHeader: false,
      sourceShow: false,
      times: 30,
      tableKey: 0,
      DateValue2: '',
      dialogFormOperation: false,
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
        appletSource: '',
        startDate: '',
        expandManager: '',
        clueType: '',
        carType: '',
        isSettledIn: '',
        workCity: '',
        sourceType: '',
        isPayDeposit: '',
        state: ''
      },
      managerIds: [],
      optionsUpdate: [],
      optionsCar: [],
      optionsCity: [],
      optionsSource: [],
      optionsXcx: [],
      disabled: false,
      changeManagerBox: false,
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
      clueIds: [],
      optionsManager: [],
      optionsManager2: [],
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
    this.fetchData()
    let role = localStorage.getItem('role');
    if (role.length > 1) {
      this.sourceShow = true;
    } else {
      this.listQuery.appletSource = role
    }
    let id = this.$route.query.id
    if (id) {
      this.listQuery.key = id;
    }
  },
  methods: {
    // 多选
    handleSelectionChange(val) {
      let ClueIds = [];
      if (val.length) {
        val.forEach((i) => {
          ClueIds.push(i.clueId)
        })
      }
      this.clueIds = [].concat(ClueIds);
    },
    // 修改拓展经理
    changeManager() {
      if (this.clueIds.length) {
        this.changeManagerBox = true;
        this.managerIds = [];
      } else {
        this.$message({
          message: '请选择要修改的线索',
          type: 'warning'
        });
      }
    },
    // 确定修改
    checkManager() {
      if (this.managerIds.length) {
        checkManager({
          'clueIds': this.clueIds,
          'userIds': this.managerIds
        }).then((res) => {
          if (res.data.success) {
            this.changeManagerBox = false
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.handleFilter()
          } else {
            this.changeManagerBox = false
            this.$message.error(res.data.errorMsg);
          }
        })
      } else {
        this.$message({
          message: '请选择拓展经理',
          type: 'warning'
        });
      }
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.listLoading) {
        this.scrollTop = scrollTop
      }
    },
    handleCreate() {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/add-clue-new', query: { index: 1 }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/add-clue-new', query: { index: 1 }})
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
    stateChange(num) {
      this.listQuery.state = num;
      this.totalDetail.all = '...';
      this.handleFilter()
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
    fetchData() {
      // 工作城市
      dictionary({
        dictType: 'online_city'
      }).then(res => {
        let arr = res.data.data;
        arr.unshift({
          code: '全部',
          codeVal: ''
        })
        this.optionsCity = arr;
      }).catch(err => {
        this.$message.error(err);
      })
      // 来源渠道
      dictionary({
        dictType: 'source_channel'
      }).then(res => {
        let arr = res.data.data;
        arr.unshift({
          code: '全部',
          codeVal: ''
        })
        this.optionsSource = arr;
      }).catch(err => {
        this.$message.error(err);
      })
      // 来源小程序
      dictionary({
        dictType: 'applet_source'
      }).then(res => {
        let arr = res.data.data;
        arr.unshift({
          code: '全部',
          codeVal: ''
        })
        this.optionsXcx = arr;
      }).catch(err => {
        this.$message.error(err);
      })
      // 意向车型
      dictionary({
        dictType: 'Intentional_compartment'
      }).then(res => {
        let arr = res.data.data;
        arr.unshift({
          code: '全部',
          codeVal: ''
        })
        this.optionsCar = arr;
      }).catch(err => {
        this.$message.error(err);
      })
      // 更新类型
      dictionary({
        dictType: 'driver_clue_type'
      }).then(res => {
        let arr = res.data.data;
        arr.unshift({
          code: '全部',
          codeVal: ''
        })
        this.optionsUpdate = arr;
      }).catch(err => {
        this.$message.error(err);
      })
      // 拓展经理
      getBDManager({}).then(res => {
        let arr = res.data.data;
        let arr2 = [].concat(arr)
        this.optionsManager2 = arr2;
        arr.unshift({
          name: '全部',
          userId: ''
        })
        this.optionsManager = arr;
      }).catch(err => {
        this.$message.error(err);
      })
    },
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
            // exportExcelClueList({
            //   state: this.listQuery.state,
            //   page: this.listQuery.page,
            //   limit: this.listQuery.limit,
            //   key: this.listQuery.key,
            //   startDate: this.listQuery.startDate,
            //   endDate: this.listQuery.endDate
            // }).then((res) => {
            exportExcelClueList(this.listQuery).then((res) => {
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
      }
    },
    download(data) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '线索管理列表.xlsx')
      document.body.appendChild(link)
      link.click()
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    goDetals(id, driverId) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/clue-detail', query: { id: id, driverId: driverId }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/clue-detail', query: { id: id, driverId: driverId }})
      }
    },
    goLog(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/clue-log', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/clue-log', query: { id: id }})
      }
    },
    addClue(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/add-clue-new', query: { id: id, index: 2 }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/add-clue-new', query: { id: id, index: 2 }})
      }
    },
    distributionClue(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ name: 'Distribution', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ name: 'Distribution', query: { id: id }})
      }
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  .clueListNew{
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
      z-index: 2 !important;
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
      .inline{
        display: inline-block;
        margin: 0 5px !important;
      }
    }
  }
</style>

