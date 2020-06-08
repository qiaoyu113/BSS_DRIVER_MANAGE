<template>
  <div class="CheckOnWork">
    <div class="filter-container">
      <el-date-picker
        v-model="time"
        type="month"
        align="right"
        unlink-panels
        placeholder="请选择月份"
        style="width: 200px;float: left;"
        range-separator="至"
        value-format="timestamp"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleFilter">
      </el-date-picker>
      <el-button
        v-permission="['/driver/driver/income/driverAttendanceManagementChange']"
        class="filter-item"
        style="float: right;"
        type="primary"
        icon="el-icon-add"
        @click="changeDate()">考核变更
      </el-button>
    </div>
    <p class="warn-content">本月出车天数 <span>{{ daysOfDriving }}</span>；本月请假天数 <span>{{ leaveDays }}</span>；本月休息天数 <span>{{ numberOfDaysOff }}</span>；本月掉线天数 <span>{{ numberOfDaysDropped }}</span></p>
    <el-calendar v-model="time">
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <div style="height: 100%;">
          <p :class="data.isSelected ? 'is-selected dateColor' : 'dateColor'">
            {{ data.day.split('-').slice(1).join('-') }}
          </p>
          <div v-if="checkNormal('2019-' + data.day.split('-').slice(1).join('-'))">
            <div class="normalCar"></div>
          </div>
          <div v-for="(item, index) in detail" :key="index">
            <div v-if="item.leaveDate === '2019-' + data.day.split('-').slice(1).join('-')">
              <div>
                <p v-if="item.type === 1"><i class="el-icon-caret-right" style="color:#F8CF5F;"></i>请假</p>
                <p v-else-if="item.type === 2"><i class="el-icon-caret-right" style="color:#F56C6C;"></i>休息</p>
                <p v-else><i class="el-icon-caret-right" style="color:#599EF8;"></i>正常</p>
              </div>
              <div>
                <p><i class="el-icon-caret-right" style="color:#67C23A;"></i>{{ item.reason }}</p>
              </div>
            </div>
            <!--<div>-->
            <!--<p><i v-if="item.type === 1" class="el-icon-caret-right" style="color:#F56C6C;"></i>请假</p>-->
            <!--<p><i v-if="item.type === 2" class="el-icon-caret-right" style="color:#F56C6C;"></i>休息</p>-->
            <!--</div>-->
            <!--<div>-->
            <!--<p><i class="el-icon-caret-right" style="color:#67C23A;"></i>休息</p>-->
            <!--<p><i class="el-icon-caret-right" style="color:#67C23A;"></i>项目不出车</p>-->
            <!--<p><i class="el-icon-caret-right" style="color:#67C23A;"></i>0.5天</p>-->
            <!--</div>-->
          </div>
        </div>
      </template>
    </el-calendar>
    <!--考核变更-->
    <el-dialog :visible.sync="dialogFormOperation" title="考勤变更">
      <el-form ref="formPost" :model="formPost" :rules="rules" label-position="center">
        <el-form-item label-width="200px" label="变更类型" prop="type">
          <el-radio-group v-model="formPost.type">
            <el-radio label="1">请假</el-radio>
            <el-radio label="2">休息</el-radio>
            <el-radio label="3">正常出车</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="200px" label="开始时间" prop="startTime">
          <el-date-picker :picker-options="endTime" v-model="formPost.startTime" type="date" value-format="timestamp" placeholder="请选择开始日期" @change="getTimeLong"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="200px" label="开始时间（上午/下午）" prop="startTimeFlag">
          <el-radio-group v-model="formPost.startTimeFlag">
            <el-radio label="1">上午</el-radio>
            <el-radio label="2">下午</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="200px" label="结束时间" prop="endTime">
          <el-date-picker :picker-options="startTime" v-model="formPost.endTime" type="date" value-format="timestamp" placeholder="请选择开始日期" @change="getTimeLong"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="200px" label="结束时间（上午/下午）" prop="endTimeFlag">
          <el-radio-group v-model="formPost.endTimeFlag">
            <el-radio label="1">上午</el-radio>
            <el-radio label="2">下午</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="formPost.type !== '3'" label-width="200px" label="请假事由" prop="reason">
          <el-input v-model="formPost.reason" type="text" placeholder="请输入请假事由" />
        </el-form-item>
        <el-form-item label-width="200px" label="请假时长">
          {{ getTimeLong() }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormOperation = false">取 消</el-button>
        <el-button type="primary" @click="changeCheck('formPost')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { driverAttendanceManagementList, driverAttendanceManagementChange } from '@/api/driver/driver-api'
import permission from '@/directive/permission/index'

export default {
  name: 'CheckOnWork',
  directives: { permission },
  data() {
    return {
      daysOfDriving: '',
      leaveDays: '',
      numberOfDaysDropped: '',
      numberOfDaysOff: '',
      detail: [],
      id: '',
      dialogFormOperation: false,
      formPost: {
        reason: '',
        endTime: '',
        endTimeFlag: '',
        startTime: '',
        startTimeFlag: '',
        type: ''
      },
      startTime: {
        disabledDate: time => {
          if (this.formPost.startTime) {
            return time.getTime() < this.formPost.startTime
          }
        }
      },
      endTime: {
        disabledDate: time => {
          if (this.formPost.endTime) {
            return time.getTime() > this.formPost.endTime
          }
        }
      },
      rules: {
        reason: [{ required: true, message: '请输入请假事由', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
        endTimeFlag: [{ required: true, message: '请选择结束时间上下午', trigger: 'change' }],
        startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
        startTimeFlag: [{ required: true, message: '请选择开始时间上下午', trigger: 'change' }],
        type: [{ required: true, message: '请选择变更类型', trigger: 'change' }]
      },
      time: new Date().getTime()
    }
  },
  created() {},
  mounted() {
    const id = this.$route.query.driverId
    this.id = id;
    this.GetData(id);
  },
  methods: {
    GetData(id) {
      driverAttendanceManagementList({
        driverId: id,
        time: new Date(this.time).getTime()
      }).then(res => {
        if (res.data.success) {
          this.detail = res.data.data.dates
          this.daysOfDriving = res.data.data.daysOfDriving;
          this.leaveDays = res.data.data.leaveDays;
          this.numberOfDaysDropped = res.data.data.numberOfDaysDropped;
          this.numberOfDaysOff = res.data.data.numberOfDaysOff;
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }).catch(err => {
        this.$message.error(err);
      })
    },
    checkNormal(val) {
      for (let i = 0; i < this.detail.length; i++) {
        if (this.detail[i].leaveDate === val) {
          return false;
        }
      }
      return true;
    },
    getTimeLong() {
      let dates = Math.floor((this.formPost.endTime - this.formPost.startTime)) / (1000 * 60 * 60 * 24);
      if (this.formPost.startTime && this.formPost.endTime) {
        return dates + 1
      } else {
        return 0
      }
    },
    changeDate() {
      this.dialogFormOperation = true;
      this.formPost = {
        reason: '',
        endTime: '',
        endTimeFlag: '',
        startTime: '',
        startTimeFlag: '',
        type: ''
      }
    },
    handleFilter() {
      if (this.time) {
        this.GetData(this.id)
      } else {
        this.$message.error('请选择查询时间');
      }
    },
    changeCheck(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          driverAttendanceManagementChange({
            'driverId': this.id,
            'startTime': this.formPost.startTime,
            'endTime': this.formPost.endTime,
            'endTimeFlag': this.formPost.endTimeFlag,
            'startTimeFlag': this.formPost.startTimeFlag,
            'reason': this.formPost.reason,
            'type': this.formPost.type
          }).then(res => {
            if (res.data.success) {
              if (res.data.data.flag) {
                this.$message({
                  message: '考勤变更成功',
                  type: 'success'
                });
                this.dialogFormOperation = false;
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
    }
  }
}
</script>

<style lang="scss">
  .CheckOnWork{
    width: 100%;
    padding:20px;
    box-sizing: border-box;
    .filter-container{
      overflow: hidden;
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
    .dateColor{
      color:#909399;
      font-weight: bold;
      margin-bottom: 10px !important;
    }
    .is-selected {
      color: #1989FA;
    }
    .el-calendar-table .el-calendar-day{
      height: 150px !important;
    }
    .el-calendar-day{
      padding:10px;
      box-sizing: border-box;
      p{
        margin:3px 0;
      }
    }
    .el-calendar__button-group{
      display: none !important;
    }
    .normalCar{
      width:30px;
      height:30px;
      background: url("https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/83e84ebd7cd64f1da99cd83a21d66de3")no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
