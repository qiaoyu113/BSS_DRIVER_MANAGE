<template>
  <div class="groupIn">
    <el-timeline>
      <el-timeline-item timestamp="" placement="top">
        <el-card>
          <h4>审核GMV导入</h4>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="" placement="top">
        <el-card>
          <h4>选择文件</h4>
          <p>一键导入<i class="el-icon-upload2"></i></p>
          <p>
            <el-upload
              ref="upload"
              :http-request="customUpload"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :file-list="fileList"
              :auto-upload="true"
              :multiple="false"
              :accept="'.xlsx'"
              class="upload-demo"
              action="/line/gmv/importFile">
              <el-button slot="trigger" type="success">选取文件一键上传</el-button>
            </el-upload>
          </p>
          <p><el-button type="primary" @click="download"><span class="download">下载模板</span></el-button></p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { fileUpload2 } from '@/api/gmv/gmv-api'
import '@/styles/qiaoyu.scss'

export default {
  name: 'LeaderIn',
  data() {
    return {
      fileList: []
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    customUpload(param) {
      // 自定义上传
      const formData = new FormData()
      formData.append('file', param.file)
      fileUpload2(formData).then(({ data }) => {
        if (data.success) {
          this.$message.success('上传成功')
        } else {
          this.$message({
            showClose: true,
            duration: 0,
            message: data.errorMsg,
            type: 'error'
          });
        }
      })
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
      // console.log(this.fileList)
    },
    download() {
      window.open('https://yn-static.oss-cn-beijing.aliyuncs.com/%E7%BA%BF%E8%B7%AFGMV%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx')
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
 .groupIn{
   width:100%;
   padding:40px 40px 40px 0;
   box-sizing: border-box;
   margin: auto;
   text-align: center;
   position: relative;
   .download{
     padding: 0 2em;
   }
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
     background: #B3D7CC;
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
     background: #F8CF5F;
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
       color:#333;
       .left{
         flex: 1;
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
 @keyframes anima {
   0% {
     background-image: linear-gradient(280deg, rgb(47, 42, 41) 0%, rgb(47, 42, 41) 100%);
   }
   100% {
     background-image: linear-gradient(255deg, rgb(240, 149, 84), rgb(240, 149, 84) 100%);
   }
 }
</style>
