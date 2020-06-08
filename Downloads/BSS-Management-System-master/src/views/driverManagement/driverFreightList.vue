<template>
  <div class="driverFreightList">
    <sticky class-name="sub-navbar">
      <div class="filter-container">
        <div class="menuBox">
          <el-row>
            <el-form label-width="120px">
              <el-col :span="6">
                <el-form-item label="运费是否上报">
                  <el-select v-model="listQuery.isSubmitted" placeholder="请选择">
                    <el-option
                      key=""
                      label="全部"
                      value="">
                    </el-option>
                    <el-option
                      key="1"
                      label="是"
                      value="true">
                    </el-option>
                    <el-option
                      key="0"
                      label="否"
                      value="false">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运费是否变更">
                  <el-select v-model="listQuery.isChanged" placeholder="请选择">
                    <el-option
                      key=""
                      label="全部"
                      value="">
                    </el-option>
                    <el-option
                      key="1"
                      label="是"
                      value="true">
                    </el-option>
                    <el-option
                      key="0"
                      label="否"
                      value="false">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="城市">
                  <el-select v-model="listQuery.city" placeholder="请选择">
                    <el-option
                      v-for="item in optionsCity"
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
          <span class="topFont">日报时间：</span>
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
          <!--<el-button
            v-permission="['/driver/driver/exportDriverPortrait']"
            class="filter-item"
            style="float: right;"
            type="primary"
            icon="el-icon-add"
            @click="exportBtn">导出
          </el-button>-->
        </div>
        <!--<div>
          <el-badge :value="listQuery.state === '' ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== ''" type="primary" size="small" @click="stateChange('')">共计出车</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 1 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 1" type="primary" size="small" @click="stateChange(1)">运费上报</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 2 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 2" type="primary" size="small" @click="stateChange(2)">运费未上报</el-button>
          </el-badge>
          <el-badge :value="listQuery.state === 3 ? totalDetail.all : ''" class="item" type="primary">
            <el-button :plain="listQuery.state !== 3" type="primary" size="small" @click="stateChange(3)">运费变更</el-button>
          </el-badge>
        </div>-->
      </div>
    </sticky>

    <div class="block blocks">
      <el-timeline class="el-timeline-new">
        <el-timeline-item v-for="(item, index) in list" :key="index" :timestamp="item[0].recordDate | TimestampYMD" placement="top">
          <el-card>
            <el-table
              v-loading="listLoading"
              :key="tableKey"
              :data="item"
              :show-header="showHeader"
              fit
              highlight-current-row
              style="width: 100%;"
              @sort-change="sortChange">
              <el-table-column label="货主名称" align="left" >
                <template slot-scope="scope">
                  <div style="width: 100px;height: 30px;line-height: 30px;text-align: center;position: absolute;right: 10px;color: #e6d3bd;">NO.{{ scope.$index+1 }}</div>
                  <div class="topBorder">
                    <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>司机编号：</i>{{ scope.row.driverId }}</span>
                    <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>标书编号：</i>{{ scope.row.bidId }}</span>
                    <span :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><i>城市：</i>{{ scope.row.cityName }}</span>
                  </div>
                  <el-row :gutter="24">
                    <el-col :span="5">
                      <p><span class="light-font bold-font">{{ scope.row.driverName }}</span></p>
                    </el-col>
                    <el-col :span="5">
                      <p><span class="light-font">{{ scope.row.driverPhone }}</span></p>
                    </el-col>
                    <el-col :span="4">
                      <p><span class="light-font">{{ scope.row.carTypeName }}</span></p>
                    </el-col>
                    <el-col :span="5">
                      <p>线路数：<span class="light-font color-num">{{ scope.row.list.length }}</span></p>
                    </el-col>
                    <el-col :span="5">
                      <p>实际运费总计：<span class="light-font color-num">¥{{ scope.row.totalCost }}</span></p>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-row v-for="(item, i) in props.row.list" :key="i" :gutter="30" style="border-bottom: 1px dotted #EBEEF4;'">
                      <el-col :span="7">
                        <p><span class="light-font2 bold-font"><el-tag>线路{{ i + 1 }}</el-tag> {{ item.lineName }}</span></p>
                        <p><span class="light-font2">线路ID：{{ item.lineId }}</span></p>
                        <p><span class="light-font2">出车ID：{{ item.deliveryId }}</span></p>
                        <p><span class="light-font2">{{ item.cargoTypeName }}</span></p>
                      </el-col>
                      <el-col :span="7">
                        <p class="light-font2">运费是否提交：<span v-if="item.submitted === true">是</span><span v-if="item.submitted !== true">否</span></p>
                        <p class="light-font2">运费是否变更：<span v-if="item.changed === true">是</span><span v-if="item.changed !== true">否</span></p>
                        <p v-if="item.changed === true" class="light-font2">变更操作信息：{{ item.changedUserName }} / {{ item.changedDate }}</p>
                      </el-col>
                      <el-col :span="7">
                        <p><span class="light-font2">预估运费：¥ {{ item.predictCost }}</span></p>
                        <p><span class="light-font2">上报运费：¥ {{ item.confirmedCost }}</span></p>
                        <p><span class="light-font2">实际运费：¥ {{ item.exactCost }}</span></p>
                      </el-col>
                      <el-col :span="3">
                        <el-button v-permission="['/dispatch/driver/dispatch/bss/change_record']" v-if="item.changed !== true" type="warning" plain class="btnChang" size="small" @click="changePrice(item)">运费变更</el-button>
                      </el-col>
                    </el-row>
                  </el-form>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <infinite-loading
        slot="append"
        ref="infinite"
        spinner="bubbles"
        @infinite="getInfinite">
        <template slot="no-more">暂无更多数据</template>
      </infinite-loading>
    </div>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>

    <el-dialog :visible.sync="dialogFormOperation" title="运费变更">
      <el-form ref="formPost" :model="formPost" :rules="rules">
        <p>司机：{{ formPost.driverName }}</p>
        <p>日期：{{ formPost.recordDate }}</p>
        <p>线路ID：{{ formPost.lineId }}</p>
        <p>线路名称：{{ formPost.lineName }}</p>
        <el-form-item label="司机运费(元)" prop="exactCost">
          <el-input v-model="formPost.exactCost" maxlength="6" type="number" @input="changeValInp"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormOperation = false">取 消</el-button>
        <el-button type="danger" @click="offLineCheck('formPost', false)">未出车</el-button>
        <el-button type="primary" @click="offLineCheck('formPost', true)">确定变更</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Sticky from '@/components/Sticky'
import BackToTop from '@/components/BackToTop'
import permission from '@/directive/permission/index'
import { GetDriverFreightList, changFreight, exportDriverPortrait } from '@/api/driver/driver-api'
import { dictionary } from '@/api/common'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import role from '@/directive/role/index'
import '@/styles/qiaoyu.scss'

export default {
  name: 'DriverFreightList',
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
      optionsCity: [],
      DateValue2: [
        (new Date()).getTime() - 24 * 60 * 60 * 1000,
        (new Date()).getTime() - 24 * 60 * 60 * 1000
      ],
      total: 0,
      limit: 0,
      listLoading: true,
      listQuery: {
        city: '',
        key: '',
        page: 1,
        limit: 100,
        endDate: new Date(this.TimestampYMD((new Date()).getTime() - 24 * 60 * 60 * 1000) + ' 00:00:00').getTime(),
        startDate: new Date(this.TimestampYMD((new Date()).getTime() - 24 * 60 * 60 * 1000) + ' 00:00:00').getTime(),
        isChanged: '',
        isSubmitted: ''
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
        exactCost: ''
      },
      rules: {
        exactCost: [{ required: true, message: '请输入变更运费金额', trigger: 'change' }]
      },
      scrollTop: 0,
      oldInputVal: 0,
      changeLine: {}
    }
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.fetchData();
  },
  methods: {
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
    },
    changeValInp(e, news) {
      console.log(Number(e))
      if (Number(e) > 10000000 || Number(e) < 0) {
        this.formPost.exactCost = this.oldInputVal;
      } else {
        this.oldInputVal = e;
      }
    },
    changePrice(item) {
      this.dialogFormOperation = true;
      let arr = item;
      this.formPost = Object.assign({}, arr);
      this.formPost.exactCost = '';
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
        this.listQuery.startDate = new Date(this.TimestampYMD(this.DateValue2[0]) + ' 00:00:00').getTime()
        this.listQuery.endDate = new Date(this.TimestampYMD(this.DateValue2[1]) + ' 00:00:00').getTime()
      } else {
        this.listQuery.startDate = ''
        this.listQuery.endDate = ''
      }
      this.handleFilter()
    },
    TimestampYMD(timestamp) {
      function change(t) {
        if (t < 10) {
          return '0' + t;
        } else {
          return t;
        }
      }
      if (timestamp) {
        var date = new Date(timestamp);
        const Y = date.getFullYear() + '/';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
        const D = change(date.getDate()) + ' ';
        return Y + M + D;
      } else {
        return '暂无数据'
      }
    },
    getList($state) {
      this.listLoading = true
      GetDriverFreightList(this.listQuery).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          let arr = response.data.data;
          let newArr = [];
          let tempArr = [];
          for (let i = 0; i < arr.length; i++) {
            if ((i + 1) < arr.length) {
              if (this.TimestampYMD(arr[i].recordDate) === this.TimestampYMD(arr[i + 1].recordDate)) {
                tempArr.push(arr[i]);
              } else {
                tempArr.push(arr[i]);
                newArr.push(tempArr.slice(0));
                tempArr.length = 0;
              }
            } else {
              tempArr.push(arr[i]);
              newArr.push(tempArr.slice(0));
              tempArr.length = 0;
            }
          }

          let driverList = [];
          let afterData = [];
          for (let i = 0; i < newArr.length; i++) {
            let secArr = newArr[i];
            let tempArrs = [];
            for (let i = 0; i < secArr.length; i++) {
              let driver = {
                driverName: '',
                recordDate: '',
                bidId: '',
                driverId: '',
                cityName: '',
                driverPhone: '',
                carTypeName: '',
                totalCost: '',
                list: []
              };
              if (tempArrs.indexOf(secArr[i].driverId) === -1) {
                driver.driverName = secArr[i].driverName
                driver.recordDate = secArr[i].recordDate
                driver.bidId = secArr[i].bidId
                driver.driverId = secArr[i].driverId
                driver.cityName = secArr[i].cityName
                driver.driverPhone = secArr[i].driverPhone
                driver.carTypeName = secArr[i].carTypeName
                driver.totalCost = secArr[i].exactCost
                driver['list'].push(secArr[i])
                afterData.push(driver);
                tempArrs.push(secArr[i].driverId)
              } else {
                for (let j = 0; j < afterData.length; j++) {
                  if (afterData[j].driverId === secArr[i].driverId) {
                    afterData[j]['totalCost'] = Number(afterData[j]['totalCost']) + secArr[i].exactCost;
                    afterData[j]['list'].push(secArr[i])
                    break;
                  }
                }
              }
            }
            driverList.push(afterData.slice(0))
            afterData.length = 0;
          }
          this.list = this.list.concat(driverList)
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
    offLineCheck(formName, type) {
      if (type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postChange(type);
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$confirm('是否变更为未出车?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postChange(type)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    postChange(type) {
      changFreight({
        'deliveryId': this.formPost.deliveryId,
        'exactCost': this.formPost.exactCost,
        'workable': type
      }).then(res => {
        if (res.data.success) {
          this.$message({
            message: '变更成功',
            type: 'success'
          });
          this.dialogFormOperation = false;
          setTimeout(() => {
            this.handleFilter()
          }, 1500)
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }).catch(err => {
        this.$message.error(err);
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
  .driverFreightList{
    padding:20px;
    padding-top: 0;
    .el-row:nth-last-child(0){
      border: none !important;
    }
    .el-timeline-new{
      padding-left: 10px;
    }
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
      /*font-weight: bold;*/
      color:#333;
      font-size:16px;
      margin-right: 10px;
    }
    .bold-font{
      font-weight: bold;
    }
    .light-font2{
      color:#99a9bf;
      font-size:14px;
      margin-right: 10px;
    }
    .color-num{
      color: #F09554;
      font-weight: bold;
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
    .miniList{
      width: 100%;
      border-bottom: 1px dotted #EBEEF4;
    }
    .btnChang{
      position: absolute;
      top: 37%;
      margin: auto;
    }
    .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
      box-shadow: none;
    }
    table tr:nth-last-child(1){
      border: none;
    }
    .blocks{
      padding-top: 25px;
    }
  }
</style>
