<template>
  <div id="incomeCalendar">
    <div class="filter-container">
      <el-date-picker
        v-model="time"
        :picker-options="pickerOptions"
        type="daterange"
        align="right"
        unlink-panels
        style="width: 400px;float: left;"
        range-separator="至"
        value-format="timestamp"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button :disabled="disabled" style="float: left;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <!--<el-button-group style="float: left;margin-left: 30px;">-->
      <!--<el-button type="primary">全部</el-button>-->
      <!--<el-button type="primary">本月</el-button>-->
      <!--</el-button-group>-->
      <!--<el-button-->
      <!--v-permission="['/driver/driver/moniter/exportExcelDetail']"-->
      <!--class="filter-item"-->
      <!--style="float: right;"-->
      <!--type="primary"-->
      <!--icon="el-icon-add"-->
      <!--@click="exportBtn">导出-->
      <!--</el-button>-->
      <!--<el-button-->
      <!--v-permission="['/driver/driver/moniter/exportExcelDetail']"-->
      <!--class="filter-item"-->
      <!--style="float: right;"-->
      <!--type="primary"-->
      <!--icon="el-icon-add"-->
      <!--@click="changeIncome">收入变更-->
      <!--</el-button>-->
      <el-button
        v-permission="['/driver/driver/moniter/exportExcelDetail']"
        class="filter-item"
        style="float: right;"
        type="primary"
        icon="el-icon-add"
        @click="changeYunniaoId('提示：追加云鸟司机编号后将开始获取新编号收入', 1)">追加云鸟司机编号
      </el-button>
    </div>
    <div v-for="(item,idx) in yunNiaoInfos" :key="idx">
      <p class="menu_font">云鸟司机编号：{{ item.yunNiaoDriverId }} <el-button type="text" @click="changeYunniaoId('提示：变更云鸟司机编号后将按新编号重新获取收入', 2, item.yunNiaoDriverId)">变更</el-button> <el-button v-if="item.yunNiaoDriverId && !item.stopTime" type="text" @click="changeYunniaoId('提示：停止获取收入后，该司机编号在设置时间段内将不在获取收入', 3, item.yunNiaoDriverId, item.goToWorkTime)">停止获取收入</el-button>  获取收入时间：{{ item.goToWorkTime }} <span v-if="item.stopTime">- {{ item.stopTime }}</span></p>
    </div>
    <p class="warn-content">总天数 <span>{{ totalDay }}</span>；累计出车天数 <span>{{ cumulativeNumberOfDays }}</span>；掉线天数 <span>{{ numberOfDaysDropped }}</span>；累计收入 <span>{{ actualAccumulated }}</span>元</p>
    <div class="calendar">
      <div v-for="(item,idx) in calendarList" :key="idx" class="calendar-list">
        <div class="calendarTop">{{ item.payDate }}</div>
        <div v-if="item.flag === 2" class="hasMore">
          <div v-if="item.carIncome">出车收入：{{ item.carIncome }}元</div>
          <div v-if="item.otherDeductions">其他扣缴：{{ item.otherDeductions }}元</div>
          <div v-if="item.customerNames">{{ item.customerNames }}</div>
        </div>
        <div v-if="item.flag === 1" class="noneMore">闲置</div>
      </div>
    </div>

    <!--追加/修改/变更-->
    <el-dialog :visible.sync="dialogFormOperation2" :title="titleName">
      <el-form ref="formPost" :model="formPost2" :rules="rules3">
        <el-form-item v-if="dialogType === 1" :disabled="dialogType === 3" label-width="220px" label="请输入需要追加的云鸟司机编号" prop="yunNiaoDriverId">
          <el-input v-model="formPost2.yunNiaoDriverId" type="number" placeholder="请输入云鸟司机编号" />
        </el-form-item>
        <el-form-item v-if="dialogType === 2" label-width="220px" label="请输入变更后的云鸟司机编号">
          <el-input v-model="formPost2.yunNiaoDriverId" type="number" placeholder="请输入云鸟司机编号" />
        </el-form-item>
        <el-form-item v-if="dialogType === 3" label-width="220px" label="变更后的云鸟司机编号">
          <div>{{ formPost2.yunNiaoDriverIdOld }}</div>
        </el-form-item>
        <el-form-item v-if="dialogType !== 3" label-width="220px" label="获取收入时间" prop="goToWorkTime">
          <el-date-picker
            :picker-options="pickerOptions1"
            v-model="formPost2.goToWorkTime"
            type="datetime"
            value-format="timestamp"
            placeholder="选择获取收入时间"
            @change="getSTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-else label-width="220px" label="获取收入时间">
          <div>{{ formPost2.goToWorkTime }}</div>
        </el-form-item>
        <el-form-item v-if="formPost2.goToWorkTime" label-width="220px" label="停止获取收入时间" prop="stopWorkTime">
          <el-date-picker
            :picker-options="pickerOptions0"
            v-model="formPost2.stopWorkTime"
            type="datetime"
            value-format="timestamp"
            placeholder="选择停止获取收入时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormOperation2 = false">取 消</el-button>
        <el-button type="primary" @click="changeDriverNo3('formPost')">确 定</el-button>
      </div>
    </el-dialog>

    <!--更改时间-->
    <el-dialog :visible.sync="dialogFormOperation" title="提示：变更云鸟司机编号后将按新编号重新获取">
      <el-form ref="formPost" :model="formPost" :rules="rules">
        <el-form-item label-width="150px" label="请输入需要追加的云鸟司机编号" prop="yunNiaoDriverId">
          <el-input v-model="formPost.yunNiaoDriverId" type="number" placeholder="请输入云鸟司机编号" />
        </el-form-item>
        <el-form-item label-width="150px" label="获取收入开始时间" prop="incomeTime">
          <el-date-picker
            v-model="formPost.incomeTime"
            type="datetime"
            value-format="timestamp"
            placeholder="选择开始日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="150px" label="获取收入结束时间" prop="overTime">
          <el-date-picker
            v-model="formPost.overTime"
            type="datetime"
            value-format="timestamp"
            placeholder="选择结束日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormOperation = false">取 消</el-button>
        <el-button type="primary" @click="changeDriverNo2('formPost')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible" title="选择需要变更的收入" @submit.native.prevent>
      <el-form ref="dataForm" :rules="rules2" :model="dataForm" label-position="left" label-width="70px" style="margin-left:50px;" >
        <el-form-item label-width="200px" label="选择需要修改的时间范围" prop="goToWorkTime">
          <el-date-picker v-model="dataForm.goToWorkTime" type="daterange" value-format="timestamp" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" @change="getOrderDuty"/>
        </el-form-item>
        <el-form-item label-width="150px" label="出车收入（元）" prop="carIncome">
          <el-input v-model="dataForm.carIncome" type="number" placeholder="请输入出车收入" />
        </el-form-item>
        <el-form-item label-width="150px" label="其他扣款（元）" prop="otherDeductions">
          <el-input v-model="dataForm.otherDeductions" type="number" placeholder="请输入其他扣款" />
        </el-form-item>
        <div v-if="dataForm.goToWorkTime" class="table_box">
          <el-table
            v-loading="listLoading2"
            ref="multipleTable"
            :data="list2"
            :show-header="showHeader"
            tooltip-effect="dark"
            style="width: 100%;max-height:500px;overflow-y: scroll"
            @selection-change="getCurrentRow">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="id">
              <template slot-scope="scope">
                <p>{{ scope.row.payDate | Timestamp }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="name">
              <template slot-scope="scope">
                <p>{{ scope.row.customerNames }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="name">
              <template slot-scope="scope">
                <p>出车收入：{{ scope.row.carIncome }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="address">
              <template slot-scope="scope">
                <p>其他扣款：{{ scope.row.otherDeductions }}</p>
              </template>
            </el-table-column>
            <!--<infinite-loading-->
            <!--slot="append"-->
            <!--ref="infinite"-->
            <!--spinner="bubbles"-->
            <!--@infinite="getOrderDuty">-->
            <!--<template slot="no-more">暂无更多数据</template>-->
            <!--</infinite-loading>-->
          </el-table>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;findKey = '';list2 = []">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="upMount('dataForm')">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { getInComeCalendar, updateYunNiaoDriverIdOrDay, exportExcelDetail, driverChangeIncomeQuery, driverChangeIncomeUpdate, addYunNiaoDriverIdOrDay10, updateYunNiaoDriverIdOrDay10, stopYunNiaoDriverIdOrDay10 } from '@/api/driver/driver-api'
import permission from '@/directive/permission/index'
export default {
  name: 'IncomeCalendar',
  directives: { permission },
  components: { InfiniteLoading },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.formPost2.goToWorkTime !== '') {
            return time.getTime() < this.formPost2.goToWorkTime;
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < this.formPost2.stopWorkTime;
        }
      },
      time: [Date.parse(new Date()), Date.parse(new Date())],
      disabled: false,
      actualAccumulated: 0,
      estimatedCumulative: 0,
      totalDay: 0,
      numberOfDaysDropped: 0,
      cumulativeNumberOfDays: 0,
      times: 30,
      goToWorkTime: '',
      yunNiaoInfos: [],
      yunNiaoDriverId: '',
      dialogFormOperation: false,
      dialogFormOperation2: false,
      dialogFormVisible: false,
      showHeader: false,
      formPost: {
        incomeTime: '',
        overTime: '',
        yunNiaoDriverId: '',
        followNo: ''
      },
      formPost2: {
        incomeTime: '',
        yunNiaoDriverIdNew: '',
        yunNiaoDriverIdOld: '',
        stopWorkTime: '',
        goToWorkTime: '',
        overTime: '',
        yunNiaoDriverId: ''
      },
      listLoading2: false,
      dialogType: false,
      dataForm: {
        goToWorkTime: '',
        carIncome: '',
        otherDeductions: '',
        updateTimes: ''
      },
      rules: {
        incomeTime: [{ required: true, message: '请选择获取收入时间', trigger: 'change' }],
        yunNiaoDriverId: [{ required: true, message: '请输入司机编号', trigger: 'change' }]
      },
      rules2: {
        goToWorkTime: [{ required: true, message: '请选择需要更改的时间范围', trigger: 'change' }],
        otherDeductions: [{ required: true, message: '请输入其他扣款', trigger: 'change' }],
        carIncome: [{ required: true, message: '请输入出车收入', trigger: 'change' }]
      },
      rules3: {
        followNo: [{ required: true, message: '请输入需要追加的云鸟司机编号', trigger: 'change' }],
        yunNiaoDriverId: [{ required: true, message: '请输入变更后的云鸟司机编号', trigger: 'change' }],
        otherDeductions: [{ required: true, message: '请输入其他扣款', trigger: 'change' }],
        stopWorkTime: [{ required: true, message: '请选择停止获取收入时间', trigger: 'change' }],
        goToWorkTime: [{ required: true, message: '请选择获取收入时间', trigger: 'change' }],
        carIncome: [{ required: true, message: '请输入出车收入', trigger: 'change' }]
      },
      calendarList: [
        {
          lineListvo: []
        }
      ],
      list2: [],
      id: '',
      total2: '',
      limit2: '',
      titleName: '',
      orderId: ''
    }
  },
  created() {},
  mounted() {
    const id = this.$route.query.id
    const orderId = this.$route.query.orderId
    this.id = id;
    this.orderId = orderId;
    this.GetData(id)
  },
  methods: {
    GetData(id) {
      getInComeCalendar({
        orderId: this.orderId,
        driverId: id,
        queryDateEnd: this.time[1],
        queryDateStart: this.time[0]
      }).then(res => {
        if (res.data.success) {
          if (res.data.data.actualAccumulated) {
            this.actualAccumulated = res.data.data.actualAccumulated;
          }
          if (res.data.data.estimatedCumulative) {
            this.actualAccumulated = res.data.data.estimatedCumulative;
          }
          if (res.data.data.totalDay) {
            this.totalDay = res.data.data.totalDay;
          }
          if (res.data.data.cumulativeNumberOfDays) {
            this.cumulativeNumberOfDays = res.data.data.cumulativeNumberOfDays;
          }
          if (res.data.data.numberOfDaysDropped) {
            this.numberOfDaysDropped = res.data.data.numberOfDaysDropped;
          }
          this.yunNiaoInfos = res.data.data.yunNiaoInfos;
          this.calendarList = res.data.data.driverIncomeListVOS;
          this.yunNiaoDriverId = res.data.data.yunNiaoDriverId;
          this.goToWorkTime = res.data.data.goToWorkTime;
          this.formPost2.incomeTime = ''
          this.formPost2.yunNiaoDriverIdNew = ''
          this.formPost2.yunNiaoDriverIdOld = ''
          this.formPost2.stopWorkTime = ''
          this.formPost2.goToWorkTime = ''
          this.formPost2.overTime = ''
          this.formPost2.yunNiaoDriverId = ''
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }).catch(err => {
        this.$message.error(err);
      })
    },
    getSTime(val) {
      if (!val) {
        this.formPost2.stopWorkTime = ''
      }
    },
    getCurrentRow(val) {
      let arr = val;
      let tenderArr = [];
      arr.map((i) => {
        tenderArr.push(i.payDate)
      })
      this.dataForm.updateTimes = tenderArr.toString();
    },
    getOrderDuty($state) {
      if (this.page2 === 1) {
        if (this.listLoading2) {
          setTimeout(() => {
            this.list2 = []
            this.state2 = $state
            this.getList($state)
          }, 800)
        } else {
          this.page2 += 1
          this.state2 = $state
          this.getList($state)
        }
      } else {
        if (!this.listLoading2) {
          this.page2 += 1
          this.state2 = $state
          this.getList($state)
        }
      }
    },
    getList($state) {
      driverChangeIncomeQuery({
        driverId: this.id,
        orderId: this.orderId,
        queryDateStart: this.dataForm.goToWorkTime[0],
        queryDateEnd: this.dataForm.goToWorkTime[1]
      }).then((res) => {
        if (res.data.success) {
          this.list2 = this.list2.concat(res.data.data)
          // this.total2 = res.data.page.total
          // this.limit2 = res.data.page.limit
          setTimeout(() => {
            this.listLoading2 = false
            this.disabled = false
            // if (!this.listLoading2) {
            //   $state.loaded()
            // }
            // if (Math.ceil(this.total2 / this.limit2) < this.page2 + 1) {
            //   $state.complete()
            // }
          }, 500)
        }
      })
    },
    handleFilter() {
      if (this.time) {
        this.GetData(this.id)
      } else {
        this.$message.error('请选择查询时间');
      }
    },
    changeDriverNo() {
      this.dialogFormOperation = true;
    },
    changeDriverNo2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateYunNiaoDriverIdOrDay({
            driverId: this.id,
            orderId: this.orderId,
            yunNiaoDriverId: this.formPost.yunNiaoDriverId,
            goToWorkTime: this.formPost.incomeTime,
            stopWorkTime: this.formPost.overTime
          }).then((res) => {
            if (res.data.success) {
              if (res.data.data.flag) {
                this.$message({
                  type: 'success',
                  message: '变更成功'
                });
                this.GetData(this.id)
              } else {
                this.$message.error(res.data.data.msg);
              }
            } else {
              this.$message.error(res.data.errorMsg);
            }
          }).catch(err => {
            this.$message.error(err);
          })
        }
      })
    },
    changeDriverNo3(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogType === 1) {
            addYunNiaoDriverIdOrDay10({
              driverId: this.id,
              orderId: this.orderId,
              yunNiaoDriverId: this.formPost2.yunNiaoDriverId,
              goToWorkTime: this.formPost2.goToWorkTime,
              stopWorkTime: this.formPost2.stopWorkTime
            }).then((res) => {
              if (res.data.success) {
                if (res.data.data.flag) {
                  this.$message({
                    type: 'success',
                    message: '追加成功'
                  });
                  this.GetData(this.id)
                  this.dialogFormOperation2 = false;
                } else {
                  this.$message.error(res.data.data.msg);
                }
              } else {
                this.$message.error(res.data.errorMsg);
              }
            }).catch(err => {
              this.$message.error(err);
            })
          }
          if (this.dialogType === 2) {
            updateYunNiaoDriverIdOrDay10({
              driverId: this.id,
              orderId: this.orderId,
              yunNiaoDriverIdNew: this.formPost2.yunNiaoDriverId,
              yunNiaoDriverIdOld: this.formPost2.yunNiaoDriverIdOld,
              goToWorkTime: this.formPost2.goToWorkTime,
              stopWorkTime: this.formPost2.stopWorkTime
            }).then((res) => {
              if (res.data.success) {
                if (res.data.data.flag) {
                  this.$message({
                    type: 'success',
                    message: '变更成功'
                  });
                  this.GetData(this.id)
                  this.dialogFormOperation2 = false;
                } else {
                  this.$message.error(res.data.data.msg);
                }
              } else {
                this.$message.error(res.data.errorMsg);
              }
            }).catch(err => {
              this.$message.error(err);
            })
          }
          if (this.dialogType === 3) {
            stopYunNiaoDriverIdOrDay10({
              driverId: this.id,
              orderId: this.orderId,
              yunNiaoDriverId: this.formPost2.yunNiaoDriverId,
              stopWorkTime: this.formPost2.stopWorkTime
            }).then((res) => {
              if (res.data.success) {
                if (res.data.data.flag) {
                  this.$message({
                    type: 'success',
                    message: '停止成功'
                  });
                  this.GetData(this.id)
                  this.dialogFormOperation2 = false;
                } else {
                  this.$message.error(res.data.data.msg);
                }
              } else {
                this.$message.error(res.data.errorMsg);
              }
            }).catch(err => {
              this.$message.error(err);
            })
          }
        }
      })
    },
    changeIncome() {
      this.$confirm('司机收入情况月底会同步司机及财务，请核实后谨慎修改。注：内线收入只能对7天前的收入进行修改。（内线收入7天内福利，扣款可能有变动）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$nextTick(() => {
          this.dialogFormVisible = true;
          if (this.state2) {
            this.getOrderDuty(this.state2)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    changeYunniaoId(titleName, type, id, time) {
      this.titleName = titleName;
      this.dialogFormOperation2 = true;
      this.dialogType = type;
      if (id) {
        this.formPost2.yunNiaoDriverIdOld = id;
        this.formPost2.yunNiaoDriverId = id;
      }
      if (type === 1 || type === 2) {
        this.rules3.stopWorkTime[0].required = false
      } else {
        this.rules3.stopWorkTime[0].required = true
      }
      if (time) {
        this.formPost2.goToWorkTime = time;
      }
    },
    exportBtn() {
      if (!this.time) {
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
            exportExcelDetail({
              start: this.time[0],
              end: this.time[1],
              driverId: this.id
            }).then((res) => {
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
      link.setAttribute('download', '司机监控详情.xlsx')
      document.body.appendChild(link)
      link.click()
    },
    upMount(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dataForm.updateTimes === '') {
            this.$message({
              message: '请选择需要变更的收入',
              type: 'warning'
            });
            return false;
          }
          driverChangeIncomeUpdate({
            driverId: this.id,
            orderId: this.orderId,
            carIncome: this.dataForm.carIncome,
            otherDeductions: this.dataForm.otherDeductions,
            updateTimes: this.dataForm.updateTimes
          }).then((res) => {
            if (res.data.success) {
              if (res.data.data.flag) {
                this.$message({
                  type: 'success',
                  message: '变更成功'
                });
                this.GetData(this.id)
                this.dialogFormVisible = false;
              } else {
                this.$message.error(res.data.data.msg);
              }
            } else {
              this.$message.error(res.data.errorMsg);
            }
          }).catch(err => {
            this.$message.error(err);
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
  #incomeCalendar{
    width:100%;
    padding:20px;
    box-sizing: border-box;
    .filter-container{
      overflow: hidden;
    }
    .header-center{
      /*display: none !important;*/
    }
    .warn-content{
      margin: 0;
      text-align: right;
      color:#333;
      font-size:14px;
      font-weight: bold;
      border:1px solid #c6e2ff;
      background-color: #ecf5ff;
      padding:3px 1rem;
      span{
        color: #409EFF;
      }
    }
    .calendar{
      width:100%;
      overflow: hidden;
      margin-top: 20px;
      .calendar-list{
        width:20%;
        /*float:left;*/
        padding:1px;
        box-sizing: border-box;
        position:relative;
        vertical-align: top;
        display:inline-block;
        .calendarTop{
          width:100%;
          background:#9ED9EB;
          text-align: center;
          color:#333;
          font-weight: bold;
          font-size: 14px;
          padding:10px 20px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          border-bottom: 1px solid #fff;
          border-radius: 3px;
          overflow: hidden;
        }
        .hasMore{
          height:100%;
          min-height:150px;
          /*line-height:150px;*/
          padding:0 10px;
          box-sizing: border-box;
          background: #9EEBA1;
          text-align: left;
          color: #333;
          font-size:15px;
          font-weight: bold;
          overflow: hidden;
          .calendarCenter{
            width:100%;
            padding:10px;
            border-radius: 8px;
            margin:10px 0;
            background:#9EEBA1;
            box-sizing: border-box;
            .calendarTitle{
              color: #0a76a4;
            }
            .calendarVal{
              padding:3px 0;
              box-sizing: border-box;
            }
          }
          div{
            display: block;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
          }
        }
        .noneMore{
          width:100%;
          height:100%;
          min-height:150px;
          line-height:150px;
          color:#333;
          font-size:15px;
          text-align: center;
          background: #EDE89A;
        }
      }
    }
    .menu_font{
      font-size:14px;
      color:#333;
      margin: 0;
      button{
        margin:0 30px 0 10px;
      }
    }
  }
</style>
