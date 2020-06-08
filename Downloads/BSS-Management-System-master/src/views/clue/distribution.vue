<template>
  <div class="Distribution">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <el-timeline>
        <el-timeline-item timestamp="基本信息" placement="top">
          <el-card>
            <el-col :span="24">
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label-width="150px" label="姓名" prop="name" class="postInfo-container-item inlineBlock">
                      <el-input v-model="postForm.name" placeholder="请输入姓名" />
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="150px" label="联系电话" prop="phone" class="postInfo-container-item inlineBlock">
                      <el-input v-model="postForm.phone" :disabled="disabled" placeholder="请输入联系电话" />
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="150px" label="来源渠道" prop="sourceType" class="postInfo-container-item inlineBlock">
                      <el-select v-model="postForm.sourceType" :disabled="disabled" placeholder="请选择来源渠道">
                        <el-option
                          v-for="item in sourceList"
                          :key="item.codeVal"
                          :value="item.codeVal"
                          :label="item.code">
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
                  <!--<el-col :span="8">-->
                  <!--<el-form-item label-width="150px" label="货物运输经验(月)" prop="cargoExperience" class="postInfo-container-item">-->
                  <!--<el-input v-model="postForm.cargoExperience" type="number" min="1" placeholder="请输入货物运输经验" />-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->

                  <el-col :span="8">
                    <el-form-item label-width="150px" label="工作城市" prop="workCity" class="postInfo-container-item">
                      <el-select v-model="postForm.workCity" placeholder="请选择工作城市" @change="selectCity">
                        <el-option
                          v-for="item in cityList"
                          :key="item.codeVal"
                          :value="item.codeVal"
                          :label="item.code">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col v-if="postForm.sourceType === '13'" :span="8">
                    <el-form-item label-width="150px" label="微信号" class="postInfo-container-item inlineBlock">
                      <el-input v-model="postForm.wechatId" :disabled="disabled" placeholder="请输入微信号" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>

            <el-col :span="24">
              <div class="postInfo-container">
                <el-row>
                  <!--<el-col :span="8">-->
                  <!--<el-form-item label-width="150px" label="司机意向" prop="hasIntention" class="postInfo-container-item inlineBlock">-->
                  <!--<el-select v-model="postForm.hasIntention" placeholder="请选择司机意向">-->
                  <!--<el-option label="有意向" value="1"></el-option>-->
                  <!--<el-option label="无意向" value="2"></el-option>-->
                  <!--</el-select>-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->

                  <!--<el-col v-if="postForm.hasIntention === '1'" :span="24">-->
                  <!--<el-form-item label-width="150px" label="意向关注点" prop="buyCarFollow" class="postInfo-container-item">-->
                  <!--<el-checkbox-group v-model="postForm.buyCarFollow">-->
                  <!--<el-checkbox label="货源" name="货源"></el-checkbox>-->
                  <!--<el-checkbox label="收入" name="收入"></el-checkbox>-->
                  <!--<el-checkbox label="工作强度" name="工作强度"></el-checkbox>-->
                  <!--<el-checkbox label="车辆品牌" name="车辆品牌"></el-checkbox>-->
                  <!--<el-checkbox label="首付比例" name="首付比例"></el-checkbox>-->
                  <!--<el-checkbox label="挂靠上牌" name="挂靠上牌"></el-checkbox>-->
                  <!--</el-checkbox-group>-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->

                  <!--<el-col v-if="postForm.hasIntention === '2'" :span="8">-->
                  <!--<el-form-item label-width="150px" label="无意向原因" prop="unintentionalReason" class="postInfo-container-item inlineBlock">-->
                  <!--<el-select v-model="postForm.unintentionalReason" placeholder="请选择无意向原因">-->
                  <!--<el-option-->
                  <!--v-for="item in unintentionalList"-->
                  <!--:key="item.codeVal"-->
                  <!--:value="item.codeVal"-->
                  <!--:label="item.code">-->
                  <!--</el-option>-->
                  <!--</el-select>-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->

                  <el-col :span="24">
                    <div class="postInfo-container">
                      <el-row>
                        <el-form-item label-width="150px" label="备注" class="postInfo-container-item inlineBlock">
                          <el-input v-model="postForm.remark" rows="5" type="textarea" placeholder="请输入备注" />
                        </el-form-item>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-card>
        </el-timeline-item>

        <el-timeline-item timestamp="入驻信息" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>物流从业经验 </el-header>
                    <el-main>{{ postForm.workExperienceName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>货物经验 </el-header>
                    <el-main>{{ postForm.cargoTypeName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>期望月收入 </el-header>
                    <el-main>{{ postForm.expMonthlyIncomeName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>可接受一天工作时长 </el-header>
                    <el-main>{{ postForm.workHourName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>意向车型 </el-header>
                    <el-main>{{ postForm.carTypeName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>户口类型 </el-header>
                    <el-main>{{ postForm.accountType | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>是否有在还贷款 </el-header>
                    <el-main v-if="postForm.isHaveLoan === 1">是</el-main>
                    <el-main v-if="postForm.isHaveLoan === 2">否</el-main>
                    <el-main v-else>暂无数据</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>家里有几个孩子 </el-header>
                    <el-main>{{ postForm.childrenNum | DataIsNull }}个</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>购车最关注哪些方面 </el-header>
                    <el-main>{{ postForm.buyCarFollow.toString() }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>

        <el-timeline-item timestamp="操作" class="noTimeLine" placement="top">
          <el-card>
            <div>
              <el-button :disabled="!btnPass" type="success" @click="submitForm('postForm')">提交线索</el-button>
              <el-button :disabled="!btnPass" @click="resetForm('postForm')">重置</el-button>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-form>
  </div>
</template>

<script>
import { clueInfo, clueDistribute } from '@/api/clue/clue-api'
import { dictionary, getFollowClueUserInfo } from '@/api/common'
const defaultForm = {
  buyCarFollow: [],
  cargoExperience: '',
  contactName: '',
  contactPhone: '',
  hasIntention: '',
  inviteDate: '',
  invited: '',
  name: '',
  phone: '',
  remark: '',
  sendMsg: '',
  sourceType: '',
  unintentionalReason: '',
  contactData: '',
  city: 'xx',
  workCity: ''
}

export default {
  name: 'Distribution',
  components: {},
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
    var validateAge = (rule, value, callback) => {
      if (value < 18) {
        callback(new Error('年龄需大于18岁'));
      } else {
        callback();
      }
    }
    var token = localStorage.getItem('Admin-Token')
    return {
      dialogImageUrl: '',
      stepsIndex: 1,
      dialogVisible: false,
      disabled: true,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      customerIdOppositeType: false,
      userListOptions: [],
      tempRoute: {},
      customers: [],
      myHeaders: { Authorization: token },
      rules: {
        name: [{ required: true, message: '请输入司机姓名', trigger: 'change' }],
        phone: [{ required: true, validator: validatePhone, trigger: 'change' }],
        buyCarFollow: [{ required: true, message: '请选择意向车型', trigger: 'change' }],
        age: [{ required: true, validator: validateAge, trigger: 'change' }],
        workCity: [{ required: true, message: '请输入城市', trigger: 'change' }],
        contactData: [{ required: true, message: '请选择联系人', trigger: 'change' }],
        hasIntention: [{ required: true, message: '请选择司机意向', trigger: 'change' }],
        inviteDate: [{ required: true, message: '请选择邀约面试时间', trigger: 'change' }],
        invited: [{ required: true, message: '请选择是否邀约面试', trigger: 'change' }],
        sendMsg: [{ required: true, message: '请输入邀约短信内容', trigger: 'change' }],
        sourceType: [{ required: true, message: '请选择线索来源', trigger: 'change' }],
        unintentionalReason: [{ required: true, message: '请选择线索来源', trigger: 'change' }]
      },
      unReasonList: [],
      unintentionalList: [],
      editType: false,
      customerId: '',
      upImgData: '',
      sourseList: [],
      btnPass: true,
      cityList: [],
      sourceList: [],
      experienceList: [],
      clientNoList: [],
      expMonthlyIncomeList: [],
      workHourList: [],
      carList: [],
      acceptPayRangeList: [],
      childrenList: [
        {
          code: '无',
          codeVal: '0'
        },
        {
          code: '1个',
          codeVal: '1'
        },
        {
          code: '2个',
          codeVal: '2'
        },
        {
          code: '3个',
          codeVal: '3'
        },
        {
          code: '4个',
          codeVal: '4'
        },
        {
          code: '5个',
          codeVal: '5'
        },
        {
          code: '6个',
          codeVal: '6'
        },
        {
          code: '7个',
          codeVal: '7'
        },
        {
          code: '8个',
          codeVal: '8'
        },
        {
          code: '9个',
          codeVal: '9'
        }
      ]
    }
  },
  watch: {
    'postForm.contactData'(val) {
      this.postForm.contactName = val.name;
      this.postForm.contactPhone = val.phone;
    }
  },
  created() {},
  mounted() {
    this.fetchData()
    let id = this.$route.query.id
    this.id = id;
    this.GetInfo(id)
  },
  methods: {
    fetchData(id) {
      // 工作城市
      dictionary({
        dictType: 'online_city'
      }).then(res => {
        this.cityList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 来源渠道
      dictionary({
        dictType: 'source_channel'
      }).then(res => {
        this.sourceList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 物流从业经验
      dictionary({
        dictType: 'logistics_experience'
      }).then(res => {
        this.experienceList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 货物经验
      dictionary({
        dictType: 'type_of_goods'
      }).then(res => {
        this.clientNoList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 期望月收入
      dictionary({
        dictType: 'expected_monthly_income'
      }).then(res => {
        this.expMonthlyIncomeList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 可接受一天工作时间
      dictionary({
        dictType: 'accept_one_day_of_work'
      }).then(res => {
        this.workHourList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 意向车型
      dictionary({
        dictType: 'Intentional_compartment'
      }).then(res => {
        this.carList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 可接受首付范围
      dictionary({
        dictType: 'accep_payment_range'
      }).then(res => {
        this.acceptPayRangeList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 无意向原因
      dictionary({
        dictType: 'unintentional_reason'
      }).then(res => {
        this.unintentionalList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      getFollowClueUserInfo({}).then(res => {
        this.unReasonList = res.data.data;
      })
      // GetClueDetail({ clueId: id }).then(res => {
      //   if (res.data.success) {
      //     this.detail = res.data.data
      //     if (this.detail.accountType === 1) {
      //       this.detail.accountType = '城镇户口'
      //     }
      //     if (this.detail.accountType === 2) {
      //       this.detail.accountType = '农村户口'
      //     }
      //     this.detail.buyCarFollow = this.detail.buyCarFollow.replace(',', '');
      //   } else {
      //     this.$message.error(res.data.errorMsg);
      //   }
      // }).catch(err => {
      //   this.$message.error(err);
      // })
    },
    selectCity(item) {
      this.cityList.forEach((i) => {
        if (i.codeVal === item) {
          this.postForm.city = i.code
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btnPass) {
            this.btnPass = false
            clueDistribute({
              'clueId': this.id,
              'name': this.postForm.name,
              'workCity': this.postForm.workCity,
              'buyCarFollow': this.postForm.buyCarFollow.toString(),
              'cargoExperience': this.postForm.cargoExperience,
              'remark': this.postForm.remark,
              'hasIntention': this.postForm.hasIntention,
              'unintentionalReason': this.postForm.unintentionalReason
            }).then(res => {
              if (res.data.success) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                this.$router.push({ name: 'ClueListNew' })
              } else {
                this.$message.error(res.data.errorMsg);
                this.btnPass = true
              }
            }).catch(err => {
              this.$message.error(err);
              this.btnPass = true
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
    },
    GetInfo(id) {
      clueInfo({
        clueId: id
      }).then(res => {
        if (res.data.success) {
          let datas = res.data.data;
          for (let key in datas) {
            if (datas[key]) datas[key] = datas[key].toString()
            if (key === 'buyCarFollow') datas[key] = datas[key].split(',')
          }
          this.postForm = Object.assign(this.postForm, datas)
        }
      })
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  .Distribution{
    width:100%;
    padding:30px 20px;
    box-sizing: border-box;
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
      color:#606266;
      line-height: 1.4;
    }
    .bold{
      color:#000;
      font-weight: bold;
    }
    .el-button--mini {
      width: auto
    }
    .el-button--primary.is-plain.no-bg{
      background: none;
      font-weight: bold;
      .val{
        color:#606266;
        font-weight: normal;
      }
    }
    .no-bg:hover{
      background: none !important;
      color: inherit;
    }
  }
</style>
