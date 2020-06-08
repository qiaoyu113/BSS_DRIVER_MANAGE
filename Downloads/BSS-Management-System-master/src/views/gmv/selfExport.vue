<template>
  <div class="SelfExport">
    <el-timeline>
      <el-timeline-item timestamp="" placement="top">
        <el-card>
          <h4>自承运纵线导出</h4>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="" placement="top">
        <el-card>
          <h4>选择时间一键导出</h4>
          <div>
            <el-date-picker
              v-model="DateValue"
              :picker-options="{ disabledDate(time) {return time.getTime() > Date.now()} }"
              type="daterange"
              value-format="yyyy-MM-dd"
              style="position: relative;top: -4px;"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changData">
            </el-date-picker>
            <div style="margin-top: 20px;">
              <el-button slot="trigger" type="warning" @click="exportBtn">一键导出</el-button>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { fileDownSelf } from '@/api/gmv/gmv-api'
import '@/styles/qiaoyu.scss'

export default {
  name: 'SelfExport',
  data() {
    return {
      fileList: [],
      DateValue: '',
      times: 30,
      listQuery: {
        startDate: '',
        endDate: ''
      }
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    changData() {
      if (this.DateValue) {
        this.listQuery.startDate = this.DateValue[0]
        this.listQuery.endDate = this.DateValue[1]
      } else {
        this.listQuery.startDate = ''
        this.listQuery.endDate = ''
      }
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
            fileDownSelf({
              ...this.listQuery
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
              this.download(res.data, res.headers.filename)
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
    download(data, name) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .SelfExport{
    width:100%;
    margin: auto;padding:40px 40px 40px 0;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    .groupInBox{
      width:600px;
      padding:200px 30px;
      border-radius: 8px;
      box-sizing: border-box;
      position: absolute;
      left: 260px;
      right: 0;
      top: 260px;
      margin: auto;
      opacity: 1;
      background: #41835D;
      z-index:200;
      box-shadow: 10px 10px 13px 0px rgba(0,0,0,0.47);
      color: #fff;
      .noFile{
        font-size: 14px;
        margin-top: 20px;
        color: white
      }
    }
    .modal-dialog{
      width:375px;
      height: 267px;
      background: #285F9A;
      color: #fff;
      position: absolute;
      left: 125px;
      top:60px;
      padding: 25px;
      border-radius: 6px;
      -webkit-box-shadow: 0 3px 9px rgba(0,0,0,0.5);
      box-shadow: 0 3px 9px rgba(0,0,0,0.5);
      background-clip: padding-box;
      z-index:210;
      .modal-content{
        position: relative;
        outline: 0;
        display: flex;
        font-size: 24px;
        font-weight: bold;
        .left{
          // flex: 1;
          padding-top: 30px;
          box-sizing: border-box;
        }
        .right{
          text-align: left;
          flex: 1;
          padding-top: 130px;
          box-sizing: border-box;
        }
      }
    }
    .modal-contact{
      background: #e3e7e1;
      padding: 20px 40px;
      max-width: 100%;
      min-height:480px;
      top: 30px;
      width: 730px;
      position: absolute;
      left: 230px;
      box-shadow: 10px 10px 13px 0px rgba(0,0,0,0.47);
      .felx{
        width: 100%;
        font-size: 26px;
        margin-top: 20px;
      }
      .left{
        text-align: left;
      }
      .right{
        text-align: right;
      }
      .center{
        text-align: center;
      }
    }
  }
</style>
