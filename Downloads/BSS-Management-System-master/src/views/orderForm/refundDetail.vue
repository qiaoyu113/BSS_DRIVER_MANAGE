<template>
  <div class="RefundDetail">
    <el-timeline>
      <!--<el-timeline-item timestamp="线路状态" style="margin-top: 20px;" placement="top">-->
      <!--<el-card>-->
      <!--<el-card shadow="hover">-->
      <!--<el-container>-->
      <!--<el-main>-->
      <!--<div class="waitPass">{{ detail.city }}</div>-->
      <!--<div class="noPass">{{ detail.city }}</div>-->
      <!--<div class="pass">{{ detail.city }}</div>-->
      <!--</el-main>-->
      <!--<el-main>操作人: {{ detail.city }}</el-main>-->
      <!--</el-container>-->
      <!--</el-card>-->
      <!--</el-card>-->
      <!--</el-timeline-item>-->
      <el-timeline-item timestamp="基本信息" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>城市 </el-header>
                  <el-main>{{ detail.cityName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>姓名 </el-header>
                  <el-main>{{ detail.driverName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>联系方式 </el-header>
                  <el-main>{{ detail.driverPhone | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>退款原因 </el-header>
                  <el-main>{{ detail.refundReasonName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>支付渠道 </el-header>
                  <el-main>{{ detail.payTypeName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>总支付金额 </el-header>
                  <el-main>{{ detail.payMoney | DataIsNull }}元</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>应退金额 </el-header>
                  <el-main>{{ detail.refundMoney | DataIsNull }}元</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="上传图片" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>司机上传数据 </el-header>
                  <div v-if="detail.receiptPhoto.length > 0">
                    <el-main v-for="(item, i) in detail.receiptPhoto" :key="i">
                      <img :src="item" alt="" style="width:100%;">
                    </el-main>
                  </div>
                  <el-main v-if="detail.receiptPhoto.length === 0">
                    暂无数据
                  </el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col v-if="type !== '2'" :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>上传CM确认邮件截图 </el-header>
                  <div v-if="detail.mailConfirmPhoto.length > 0">
                    <el-main v-for="(item, i) in detail.mailConfirmPhoto" :key="i">
                      <img :src="item" alt="" style="width:100%;">
                    </el-main>
                  </div>
                  <el-main v-if="detail.mailConfirmPhoto.length === 0">
                    暂无数据
                  </el-main>
                </el-container>
              </el-card>
            </el-col>

            <el-col v-if="type === '2'" :span="16">
              <el-card>
                <el-header>上传CM确认邮件截图 </el-header>
                <el-upload
                  :action="getImgUrls"
                  :headers="myHeaders"
                  :limit="2"
                  :on-exceed="handleExceed"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="handleUpSuccess"
                  :file-list="detail.mailConfirmPhoto"
                  list-type="picture-card">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-card>
              <el-dialog :visible.sync="dialogVisible">
                <img :src="dialogImageUrl" width="100%" alt="">
              </el-dialog>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>

      <el-timeline-item v-if="type === '2'" timestamp="操作" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-button type="success" @click="pass('productForm')">确认通过退款</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getOrderRefundDetail, refundOrderConfirm } from '@/api/order/order-api'

export default {
  name: 'RefundDetail',
  data() {
    var token = localStorage.getItem('Admin-Token')
    return {
      dialogImageUrl: '',
      loading: false,
      dialogVisible: false,
      type: '',
      getImgUrls: this.getImgUrl(),
      myHeaders: { Authorization: token },
      detail: {
        clientName: '',
        companyMain: '',
        city: '',
        clientNo: '',
        businessName: '',
        businessPhone: '',
        address: '',
        endDate: '',
        source: '',
        settlementMonth: '',
        settlementDay: '',
        month: '',
        receiptPhoto: [],
        mailConfirmPhoto: [],
        day: ''
      }
    }
  },
  created() {},
  mounted() {
    const id = this.$route.query.id
    this.type = this.$route.query.type
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      getOrderRefundDetail({ refundApplyNo: id }).then(res => {
        if (res.data.success) {
          let datas = res.data.data;
          if (datas.receiptPhoto) {
            datas.receiptPhoto = datas.receiptPhoto.split(',')
          } else {
            datas.receiptPhoto = []
          }
          if (datas.mailConfirmPhoto) {
            datas.mailConfirmPhoto = datas.mailConfirmPhoto.split(',')
          } else {
            datas.mailConfirmPhoto = []
          }
          this.detail = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 配置图片上传接口
    getImgUrl() {
      let url;
      if (window.location.host === 'localhost:20061') {
        url = 'http://firmiana-bss.m1.yunniao.cn/api/base/v1/upload/uploadOSS/img/true/-1'
      } else {
        url = '/api/base/v1/upload/uploadOSS/img/true/-1'
      }
      return url
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      this.detail.mailConfirmPhoto = []
      fileList.map(item => {
        this.detail.mailConfirmPhoto.push({ name: 'image', url: item.url })
      })
    },
    handleExceed() {
      this.$message({
        type: 'info',
        message: '最多上传2张CM确认邮件截图'
      });
    },
    handleUpSuccess(res) {
      if (res.success) {
        this.detail.mailConfirmPhoto.push({ name: 'image', url: res.data.url })
      } else {
        this.$message.error('上传图片错误：' + res);
      }
    },
    pass(id) {
      this.$confirm('支付渠道为微信支付时，操作退款将直接微信原路退回', '确定通过退款后订单将结束，请谨慎操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.detail.mailConfirmPhoto.length) {
          let image = []
          this.detail.mailConfirmPhoto.forEach((i) => {
            image.push(i.url)
          })
          refundOrderConfirm({
            mailConfirmPhoto: image.toString(),
            refundApplyNo: this.detail.refundApplyNo.toString(),
            refundMoney: this.detail.refundMoney
          }).then(res => {
            if (res.data.success) {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              setTimeout(() => {
                this.$router.back();
              }, 800)
            } else {
              this.$message.error(res.data.errorMsg);
            }
          }).catch(err => {
            this.$message.error(err);
          })
        } else {
          this.$message({
            type: 'info',
            message: '请上传CM确认邮件截图'
          });
          return false;
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .RefundDetail {
    padding:20px;
    .waitPass{
      color: #409EFF;
    }
    .noPass{
      color: #F56C6C;
    }
    .pass{
      color: #71C546;
    }
    .el-tag--medium {
      height: 38px;
      line-height: 36px;
      font-size: 13px;
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
