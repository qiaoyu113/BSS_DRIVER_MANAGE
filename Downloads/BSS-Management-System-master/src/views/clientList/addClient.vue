<template>
  <div class="addClient">
    <div class="fromBox">
      <mallki text="货主信息创建" class-name="mallki-text"/>
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <el-timeline>
          <el-timeline-item timestamp="基本信息" placement="top">
            <el-card>
              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="货主简称" prop="customerName" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.customerName" placeholder="请输入创建货主简称" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="货主公司主体" prop="customerNameAll" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.customerNameAll" placeholder="请输入货主公司主体" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="城市" prop="city" class="postInfo-container-item">
                        <el-select v-model="postForm.city" placeholder="请选择">
                          <el-option
                            v-for="(item,key) in cityList"
                            :key="item"
                            :value="item"
                            :label="key">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="合同止期" prop="contractEnd" class="postInfo-container-item inlineBlock">
                        <el-date-picker
                          v-model="postForm.contractEnd"
                          type="date"
                          prop="distribution"
                          value-format="timestamp"
                          style="width: auto;"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="一级分类" prop="primaryClassification" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.primaryClassification" placeholder="请选择一级分类" @change="changeOne">
                          <el-option
                            v-for="item in getLineCustomerOne"
                            :key="item.code"
                            :value="item.code"
                            :label="item.name">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col v-if="getLineCustomerTwo && getLineCustomerTwo.length > 0" :span="8">
                      <el-form-item label-width="150px" label="二级分类" prop="secondaryClassification" class="postInfo-container-item">
                        <el-select v-model="postForm.secondaryClassification" placeholder="请选择二级分类">
                          <el-option
                            v-for="item in getLineCustomerTwo"
                            :key="item.code"
                            :value="item.code"
                            :label="item.name">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col v-if="postForm.primaryClassification === 1" :span="8">
                      <el-form-item label-width="150px" label="第三方货主编号" prop="customerIdOpposite" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.customerIdOpposite" placeholder="请填写A端货主编号" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="详细地址" prop="address" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.address" placeholder="请输入详细地址" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="结算周期是否含当月" prop="currentMonth" class="postInfo-container-item">
                        <el-select v-model="postForm.currentMonth" placeholder="请选择">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="结算周期(天)" prop="billingCycle" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.billingCycle" type="number" placeholder="请输入结算周期(天)" style="display: inline-block"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="业务对接人姓名" prop="bussinessName" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.bussinessName" placeholder="请输入业务对接人姓名" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="业务对接人联系电话" prop="bussinessPhone" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.bussinessPhone" type="number" placeholder="请输入业务对接人联系电话" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="业务对接人身份证号" prop="bussinessCard" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.bussinessCard" placeholder="请输入业务对接人身份证号" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="备注信息" class="postInfo-container-item inlineBlock">
                        <el-input
                          v-model="postForm.remark"
                          :rows="6"
                          type="textarea"
                          placeholder="请输入内容">
                        </el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="16">
                      <el-form-item label-width="150px" label="上传营业执照" class="postInfo-container-item inlineBlock">
                        <el-upload
                          :action="getImgUrls"
                          :headers="myHeaders"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="handleRemove"
                          :on-success="handleUpSuccess"
                          :file-list="postForm.businessLicense"
                          list-type="picture-card">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img :src="dialogImageUrl" width="100%" alt="">
                        </el-dialog>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="完成提交" class="noTimeLine" placement="top">
            <el-card>
              <div>
                <el-button v-if="!editType" type="primary" @click="submitForm('postForm')">立即创建</el-button>
                <el-button v-if="editType" type="primary" @click="editForm('postForm')">重新提交</el-button>
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
import { creatCustomer, editClientDetail, editCustomer, getCity, getCustInfo, getLineCustomerOneOrTwoCategory } from '@/api/client/client-api'
import '@/styles/qiaoyu.scss'
import Mallki from '@/components/TextHoverEffect/Mallki'

const defaultForm = {
  customerName: '',
  customerNameAll: '',
  city: '',
  customerIdOpposite: '',
  source: '',
  contractEnd: '',
  address: '',
  primaryClassification: '',
  secondaryClassification: '',
  currentMonth: '',
  billingCycle: '',
  bussinessName: '',
  bussinessPhone: '',
  bussinessCard: '',
  remark: '',
  businessLicense: []
}

export default {
  name: 'AddClient',
  components: { Mallki },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入业务对接人联系电话'));
      } else {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('请输入正确电话格式'));
        }
        callback();
      }
    };
    var token = localStorage.getItem('Admin-Token')
    return {
      dialogImageUrl: '',
      custClueId: '',
      dialogVisible: false,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      customerIdOppositeType: false,
      userListOptions: [],
      tempRoute: {},
      customers: [],
      myHeaders: { Authorization: token },
      clientNoList: ['食材', '水果', '方便食品', '团餐外卖', '酒水饮料', '建材', '汽配', '家电', '日化', '家具', '鲜花蛋糕', '3C数码', '洗涤', '印刷品', '服饰鞋帽', '医药保健', '包装', '母婴', '五金', '自行车', '大包裹/仪器', '其他'],
      rules: {
        customerName: [{ required: true, message: '请输入货主简称', trigger: 'change' }],
        customerNameAll: [{ required: true, message: '请输入货主公司主体', trigger: 'change' }],
        city: [{ required: true, message: '请输入城市', trigger: 'change' }],
        customerIdOpposite: [{ required: true, message: '请填写A端货主编号', trigger: 'change' }],
        source: [{ required: true, message: '请选择货主来源', trigger: 'change' }],
        primaryClassification: [{ required: true, message: '请选择一级分类', trigger: 'change' }],
        secondaryClassification: [{ required: true, message: '请选择二级分类', trigger: 'change' }],
        contractEnd: [{ required: false, message: '请选择合同止日期', trigger: 'change' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'change' }],
        currentMonth: [{ required: true, message: '请输入结算周期是否含当月', trigger: 'change' }],
        billingCycle: [{ required: true, message: '请输入结算周期(日)', trigger: 'change' }],
        bussinessName: [{ required: true, message: '请输入业务对接人姓名', trigger: 'change' }],
        bussinessPhone: [{ required: true, validator: validatePhone, trigger: 'change' }],
        bussinessCard: [{ required: false, message: '请输入业务对接人姓名', trigger: 'change' }],
        remark: [{ required: false, message: '请输入备注信息', trigger: 'change' }]
      },
      editType: false,
      customerId: '',
      upImgData: '',
      getImgUrls: this.getImgUrl(),
      sourseList: [],
      getLineCustomerOne: [],
      getLineCustomerTwo: [],
      btnPass: true,
      cityList: []
    }
  },
  computed: {},
  watch: {
    'postForm.cost'(val) {
      this.postForm.profit = Number(this.postForm.income) - Number(val);
    },
    'postForm.income'(val) {
      this.postForm.profit = Number(val) - Number(this.postForm.cost);
    },
    'postForm.cargo'(val) {
      if (val === '其他') {
        this.$prompt('请输入货物类型', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '已添加' + value + '，请重新选择'
          });
          this.cargoList.unshift(value)
          this.postForm.cargo = value
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
          this.postForm.cargo = ''
        });
      }
    }
  },
  created() {},
  mounted() {
    this.getCityList();
    const id = this.$route.query.id;
    const custClueId = this.$route.query.custClueId;
    this.postForm.businessLicense = []
    this.getOneLeave()
    if (id) {
      this.customerId = id;
      this.editType = true;
      this.getDetails(id);
    }
    if (custClueId) {
      this.custClueId = custClueId;
      this.getcustInfo(custClueId);
    }
  },
  methods: {
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
    handleRemove(file, fileList) {
      this.postForm.businessLicense = []
      fileList.map(item => {
        this.postForm.businessLicense.push({ name: 'image', url: item.url })
      })
    },
    changeOne(val) {
      this.getLineCustomerOne.forEach((i) => {
        if (i.code === val) {
          this.getLineCustomerTwo = i.nextCategorys
        }
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
    getcustInfo(custClueId) {
      getCustInfo({ custClueId: custClueId }).then(res => {
        if (res.data.success) {
          const data = res.data.data;
          data.city = String(data.city);
          data.contractEnd = new Date(data.contractEnd).getTime();
          this.postForm = Object.assign(this.postForm, data);
          if (Number(this.postForm.oneCustomerCategory)) {
            this.postForm.primaryClassification = Number(this.postForm.oneCustomerCategory)
          }
          if (Number(this.postForm.twoCustomerCategory)) {
            this.postForm.secondaryClassification = Number(this.postForm.twoCustomerCategory)
          }
          if (this.postForm.primaryClassification) {
            this.changeOne(this.postForm.primaryClassification)
          }
        }
      })
    },
    getOneLeave() {
      getLineCustomerOneOrTwoCategory({}).then(res => {
        if (res.data.success) {
          this.getLineCustomerOne = res.data.data
          if (this.postForm.primaryClassification) {
            this.changeOne(this.postForm.primaryClassification)
          }
        }
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
    getDetails(id) {
      editClientDetail({ customerId: id }).then(res => {
        if (res.data.success) {
          const data = res.data.data;
          data.city = String(data.city);
          data.currentMonth = String(data.currentMonth);
          // data.source = String(data.source);
          const imgArr = [];
          data.businessLicense.map(item => {
            if (item !== '') {
              imgArr.push({
                name: 'image',
                url: item
              })
            }
          });
          data.businessLicense = imgArr
          data.contractEnd = new Date(data.contractEnd).getTime();
          this.postForm = data;
          if (this.postForm.primaryClassification) {
            this.getOneLeave()
          }
        }
      }).catch(err => {
        this.$message.error(err);
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const imgBtn = this.handleImgs();
        if (valid && imgBtn) {
          if (this.btnPass) {
            this.btnPass = false
            if (this.postForm.businessLicense2) {
              this.postForm.businessLicense2 = this.postForm.businessLicense2.toString()
            }
            creatCustomer({
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
              'primaryClassification': this.postForm.primaryClassification,
              'secondaryClassification': this.postForm.secondaryClassification
              // 'source': this.postForm.source
            }).then(res => {
              if (res.data.success) {
                let customerId = res.data.data.customerId
                this.$message({
                  message: '创建成功',
                  type: 'success'
                });
                this.$confirm('已成功创建货主，是否立即创建线路？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '否',
                  type: 'warning'
                }).then(() => {
                  setTimeout(() => {
                    this.$router.push({ path: '/add-line', query: { customerId: customerId, city: this.postForm.city }})
                  }, 1000)
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                  setTimeout(() => {
                    this.$router.push({ path: '/client-list' })
                  }, 1000)
                });
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
              'primaryClassification': this.postForm.primaryClassification,
              'secondaryClassification': this.postForm.secondaryClassification
              // 'source': this.postForm.source
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

<style rel="stylesheet/scss" lang="scss">
  .addClient{
    .fromBox{
      padding:20px;
    }
    .el-form{
      padding-top: 20px;
    }
  }

  .disabled-input.el-input.is-disabled{
    .el-input__inner{
      color:#333 !important;
      background:#fff !important;
    }
  }
  .el-input.is-disabled .el-input__inner{
    background-color:#ffffff !important;
  }
</style>

