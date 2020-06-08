<template>
  <div class="CustomFollow">
    <div class="fromBox">
      <mallki :text="customName" class-name="mallki-text"/>
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <el-timeline>
          <el-timeline-item timestamp="跟进信息" placement="top">
            <el-card>
              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label-width="150px" label="跟进时间" prop="followDate" class="postInfo-container-item inlineBlock">
                        <el-date-picker
                          :picker-options="pickerOptions"
                          v-model="postForm.followDate"
                          type="date"
                          prop="distribution"
                          value-format="timestamp"
                          style="width: auto;"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>

                    <el-col :span="24">
                      <el-form-item label-width="150px" label="跟进方式" prop="way" class="postInfo-container-item">
                        <el-select v-model="postForm.way" style="width: 210px;" placeholder="请选择">
                          <el-option
                            v-for="item in wayList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="24">
                      <el-form-item label-width="150px" label="跟进备注" prop="remarks" class="postInfo-container-item inlineBlock">
                        <el-input
                          v-model="postForm.remarks"
                          :rows="6"
                          type="textarea"
                          style="width: 210px;"
                          placeholder="请输入内容">
                        </el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="24">
                      <el-form-item label-width="150px" label="是否成交" prop="successfullyTraded" class="postInfo-container-item">
                        <el-select v-model="postForm.successfullyTraded" style="width: 210px;" placeholder="请选择">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-card>
          </el-timeline-item>

          <!--<el-timeline-item timestamp="基本信息" placement="top">-->
          <!--<el-card>-->
          <!--<el-col :span="24">-->
          <!--<div class="postInfo-container">-->
          <!--<el-row>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="客户名称" class="postInfo-container-item inlineBlock">-->
          <!--<el-input v-model="detail.customerName" :disabled="true" style="width: 210px;" placeholder="请输入客户名称" />-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="客户方联系人" class="postInfo-container-item inlineBlock">-->
          <!--<el-input v-model="detail.clientsName" :disabled="true" style="width: 210px;" placeholder="请输入客户方联系人" />-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="客户方联系电话" class="postInfo-container-item inlineBlock">-->
          <!--<el-input v-model="detail.clientPhone" :disabled="true" style="width: 210px;" type="number" placeholder="请输入客户方联系电话" />-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="客户行业" prop="city" class="postInfo-container-item">-->
          <!--<el-select v-model="postForm.city" placeholder="请选择">-->
          <!--<el-option-->
          <!--v-for="(item,key) in cityList"-->
          <!--:key="item"-->
          <!--:value="item"-->
          <!--:label="key">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="一级分类" prop="primaryClassification" class="postInfo-container-item inlineBlock">-->
          <!--<el-select v-model="postForm.primaryClassification" placeholder="请选择一级分类" @change="changeOne">-->
          <!--<el-option-->
          <!--v-for="item in getLineCustomerOne"-->
          <!--:key="item.code"-->
          <!--:value="item.code"-->
          <!--:label="item.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col v-if="getLineCustomerTwo && getLineCustomerTwo.length > 0" :span="24">-->
          <!--<el-form-item label-width="150px" label="二级分类" prop="secondaryClassification" class="postInfo-container-item">-->
          <!--<el-select v-model="postForm.secondaryClassification" placeholder="请选择二级分类">-->
          <!--<el-option-->
          <!--v-for="item in getLineCustomerTwo"-->
          <!--:key="item.code"-->
          <!--:value="item.code"-->
          <!--:label="item.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col v-if="postForm.primaryClassification === 1" :span="24">-->
          <!--<el-form-item label-width="150px" label="第三方货主编号" prop="customerIdOpposite" class="postInfo-container-item inlineBlock">-->
          <!--<el-input v-model="postForm.customerIdOpposite" placeholder="请填写A端货主编号" />-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="客户要求配送特征" prop="primaryClassification" class="postInfo-container-item inlineBlock">-->
          <!--<el-select v-model="postForm.primaryClassification" placeholder="请选择一级分类">-->
          <!--<el-option-->
          <!--v-for="item in getLineCustomerOne"-->
          <!--:key="item.code"-->
          <!--:value="item.code"-->
          <!--:label="item.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="需要车型" prop="primaryClassification" class="postInfo-container-item inlineBlock">-->
          <!--<el-select v-model="postForm.primaryClassification" placeholder="请选择一级分类">-->
          <!--<el-option-->
          <!--v-for="item in carList"-->
          <!--:key="item.code"-->
          <!--:value="item.code"-->
          <!--:label="item.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="月毛收入" prop="primaryClassification" class="postInfo-container-item inlineBlock">-->
          <!--<el-input v-model="postForm.customerIdOpposite" placeholder="请填写A端货主编号" style="display: inline-block;max-width: 195px;"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="月净收入（元）去油去过路过桥" prop="primaryClassification" class="postInfo-container-item inlineBlock">-->
          <!--<el-input v-model="postForm.customerIdOpposite" placeholder="请填写A端货主编号" style="display: inline-block;max-width: 195px;"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="月出车天数" prop="primaryClassification" class="postInfo-container-item inlineBlock">-->
          <!--<el-input v-model="postForm.customerIdOpposite" placeholder="请填写A端货主编号" style="display: inline-block;max-width: 195px;"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="日出车数" prop="primaryClassification" class="postInfo-container-item inlineBlock">-->
          <!--<el-input v-model="postForm.customerIdOpposite" placeholder="请填写A端货主编号" style="display: inline-block;max-width: 195px;"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="客户线路条数" prop="primaryClassification" class="postInfo-container-item inlineBlock">-->
          <!--<el-input v-model="postForm.customerIdOpposite" placeholder="请填写A端货主编号" style="display: inline-block;max-width: 195px;"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="是否是高意向客户" prop="primaryClassification" class="postInfo-container-item inlineBlock">-->
          <!--<el-select v-model="postForm.currentMonth" placeholder="请选择">-->
          <!--<el-option label="是" value="1"></el-option>-->
          <!--<el-option label="否" value="2"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="是否找到KP" prop="primaryClassification" class="postInfo-container-item inlineBlock">-->
          <!--<el-select v-model="postForm.currentMonth" placeholder="请选择">-->
          <!--<el-option label="是" value="1"></el-option>-->
          <!--<el-option label="否" value="2"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="合作难点" prop="primaryClassification" class="postInfo-container-item inlineBlock">-->
          <!--<el-input v-model="postForm.customerIdOpposite" placeholder="请填写A端货主编号" style="display: inline-block;max-width: 195px;"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label-width="150px" label="跟进备注" class="postInfo-container-item inlineBlock">-->
          <!--<el-input-->
          <!--v-model="postForm.remark"-->
          <!--:rows="6"-->
          <!--type="textarea"-->
          <!--style="display: inline-block;max-width: 195px;"-->
          <!--placeholder="请输入内容">-->
          <!--</el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <!--</div>-->
          <!--</el-col>-->
          <!--</el-card>-->
          <!--</el-timeline-item>-->

          <el-timeline-item timestamp="基本信息" style="margin-top: 20px;" placement="top">
            <el-card>
              <el-row :gutter="8">
                <el-col v-for="item in detail" :key="item.value" :span="24">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>{{ item.fieldName }} </el-header>
                      <el-main>{{ item.value | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="完成提交" class="noTimeLine" placement="top">
            <el-card>
              <div>
                <el-button type="primary" @click="submitForm('postForm')">保存提交</el-button>
                <el-button @click="resetForm('postForm')">重置</el-button>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-form>
    </div>
  </div>
</template>

<script>
import { editCustomer, getSourse, getCity, customerPoolFollow, getLineCustomerOneOrTwoCategory, customerPoolDetail } from '@/api/client/client-api'
import { dictionary } from '@/api/common'
import Mallki from '@/components/TextHoverEffect/Mallki'

const defaultForm = {
  customerName: '',
  customerNameAll: '',
  city: '',
  customerIdOpposite: '',
  source: '',
  contractEnd: '',
  address: '',
  currentMonth: '',
  billingCycle: '',
  remark: '',
  getLineCustomerOne: [],
  getLineCustomerTwo: [],
  businessLicense: []
}

export default {
  name: 'CustomFollow',
  components: { Mallki },
  data() {
    var token = localStorage.getItem('Admin-Token')
    return {
      customName: '客户名字',
      dialogImageUrl: '',
      dialogVisible: false,
      postForm: Object.assign({}, defaultForm),
      loading: false,
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
        day: ''
      },
      customerIdOppositeType: false,
      userListOptions: [],
      getLineCustomerOne: [],
      getLineCustomerTwo: [],
      tempRoute: {},
      customers: [],
      carList: [],
      myHeaders: { Authorization: token },
      clientNoList: ['食材', '水果', '方便食品', '团餐外卖', '酒水饮料', '建材', '汽配', '家电', '日化', '家具', '鲜花蛋糕', '3C数码', '洗涤', '印刷品', '服饰鞋帽', '医药保健', '包装', '母婴', '五金', '自行车', '大包裹/仪器', '其他'],
      rules: {
        followDate: [{ required: true, message: '请选择跟进日期', trigger: 'change' }],
        successfullyTraded: [{ required: true, message: '请选择是否成功进行交易', trigger: 'change' }],
        way: [{ required: true, message: '请选择跟进方式', trigger: 'change' }],
        remarks: [{ required: true, message: '请输入备注信息', trigger: 'change' }]
      },
      // detail: {
      //   clientPhone: '',
      //   customerName: '',
      //   clientsName: ''
      // },
      editType: false,
      custClueId: '',
      upImgData: '',
      getImgUrls: this.getImgUrl(),
      sourseList: [],
      btnPass: true,
      pickerOptions: {},
      wayList: []
    }
  },
  created() {},
  mounted() {
    this.fetchData();
    const id = this.$route.query.id;
    // const createDate = this.$route.query.createDate;
    // const customerName = this.$route.query.customerName;
    // const clientsName = this.$route.query.clientsName;
    // const clientPhone = this.$route.query.clientPhone;
    this.postForm.businessLicense = []
    this.getOneLeave()
    if (id) {
      this.custClueId = id;
      this.editType = true;
      // this.detail = {
      //   customerName: customerName,
      //   clientsName: clientsName,
      //   clientPhone: clientPhone
      // }
      this.fetchDataDetail(id)
      // this.pickerOptions = {
      //   disabledDate: (time) => {
      //     return time.getTime() < createDate - 8.64e7
      //   }
      // }
    }
  },
  methods: {
    fetchData() {
      // 工作城市
      dictionary({
        dictType: 'clue_follow_way'
      }).then(res => {
        this.wayList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    fetchDataDetail(id) {
      customerPoolDetail({ custClueId: id }).then(res => {
        if (res.data.success) {
          let detailRes = res.data.data;
          let detailResNew = [];
          let arrResearch = ['field_4', 'field_17', 'field_18', 'field_5', 'field_21', 'field_9', 'field_25', 'field_12', 'field_24', 'field_13', 'field_26', 'field_27', 'field_20', 'field_28', 'field_14', 'field_10', '']
          detailRes.forEach((i) => {
            if (arrResearch.indexOf(i.fieldEn) > -1) {
              detailResNew.push(i)
            }
          })
          this.detail = detailResNew;
          this.detail.month = parseInt(this.detail.billingCycle / 30)
          this.detail.day = parseInt(this.detail.billingCycle - (this.detail.month * 30))
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
    changeOne(val) {
      this.getLineCustomerOne.forEach((i) => {
        if (i.code === val) {
          this.getLineCustomerTwo = i.nextCategorys
        }
      })
    },
    getOneLeave() {
      getLineCustomerOneOrTwoCategory({}).then(res => {
        if (res.data.success) {
          this.getLineCustomerOne = res.data.data
        }
      })
    },
    handleRemove(file, fileList) {
      this.postForm.businessLicense = []
      fileList.map(item => {
        this.postForm.businessLicense.push({ name: 'image', url: item.url })
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleUpSuccess(res) {
      if (res.success) {
        this.postForm.businessLicense.push({ name: 'image', url: res.data.url })
      } else {
        this.$message.error('上传图片错误：' + res);
      }
    },
    getSourseList() {
      getSourse().then(res => {
        this.sourseList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    getCityList() {
      getCity().then(res => {
        this.cityList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    handleImgs() {
      if (this.postForm.businessLicense.length) {
        let businessLicense = [];
        this.postForm.businessLicense.map(item => {
          businessLicense.push(item.url)
        })
        this.postForm.businessLicense2 = businessLicense;
      }
      return true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btnPass) {
            this.btnPass = false
            customerPoolFollow({
              'custClueId': this.custClueId,
              'followDate': this.postForm.followDate,
              'remarks': this.postForm.remarks,
              'successfullyTraded': this.postForm.successfullyTraded,
              'way': this.postForm.way
            }).then(res => {
              if (res.data.success) {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                if (this.postForm.successfullyTraded === '1') {
                  this.$confirm('说明：已成交客户为已确定了合作意向及可以提供外线给司机直接上车的客户，客户已成交，需要录入货主信息，是否立即录入货主信息？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '否',
                    type: 'warning'
                  }).then(() => {
                    setTimeout(() => {
                      this.$router.push({ path: '/add-client', query: { custClueId: this.custClueId }})
                    }, 1000)
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    });
                    setTimeout(() => {
                      this.$router.push({ path: '/custom-list' })
                    }, 1000)
                  });
                } else {
                  setTimeout(() => {
                    this.$router.push({ path: '/custom-list' })
                  }, 1000)
                }
              } else {
                this.$message.error(res.data.errorMsg);
                this.btnPass = true
              }
            }).catch(err => {
              this.$message.error(err);
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editForm(formName) {
      this.$refs[formName].validate((valid) => {
        const imgBtn = this.handleImgs();
        if (valid && imgBtn) {
          if (this.btnPass) {
            if (this.postForm.source === '1') {
              if (this.postForm.customerIdOpposite === '') {
                this.$message.error('自承运需必填写货主编号');
                return false;
              }
            } else {
              this.postForm.customerIdOpposite = ''
            }
            this.btnPass = false
            if (this.postForm.businessLicense2) {
              this.postForm.businessLicense2 = this.postForm.businessLicense2.toString()
            } else {
              this.postForm.businessLicense2 = ''
            }
            editCustomer({
              'customerId': this.customerId,
              'address': this.postForm.address,
              'billingCycle': this.postForm.billingCycle,
              'businessLicense': this.postForm.businessLicense2,
              'bussinessCard': this.postForm.bussinessCard,
              'bussinessName': this.postForm.bussinessName,
              'bussinessPhone': this.postForm.bussinessPhone,
              'city': this.postForm.city,
              'contractEnd': this.postForm.contractEnd,
              'currentMonth': this.postForm.currentMonth,
              'customerIdOpposite': this.postForm.customerIdOpposite,
              'customerName': this.postForm.customerName,
              'customerNameAll': this.postForm.customerNameAll,
              'remark': this.postForm.remark,
              'source': this.postForm.source
            }).then(res => {
              if (res.data.success) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                setTimeout(() => {
                  this.$router.push({ path: '/client-list' })
                }, 1000)
              } else {
                this.$message.error(res.data.errorMsg);
                this.btnPass = true
              }
            }).catch(err => {
              this.$message.error(err);
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.postForm.customerIdOpposite = ''
      this.postForm.remark = ''
      this.postForm.businessLicense = []
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .CustomFollow{
    padding:20px;
    padding-top: 0;
    .fromBox{
      padding:20px;
    }
    .el-form{
      padding-top: 20px;
    }
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
