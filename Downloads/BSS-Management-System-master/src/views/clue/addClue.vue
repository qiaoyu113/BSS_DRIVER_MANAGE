<template>
  <div class="addClue">
    <div class="fromBox">
      <mallki text="跟进信息" class-name="mallki-text"/>
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
                      <el-form-item label-width="150px" label="司机年龄" prop="age" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.age" type="number" min="18" placeholder="请输入司机年龄" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="联系电话" prop="phone" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.phone" placeholder="请输入联系电话" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="是否跟车" prop="isPayDeposit" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.isPayDeposit" placeholder="请选择是否跟车">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="工作城市" prop="workCity" class="postInfo-container-item">
                        <el-select v-model="postForm.workCity" placeholder="请选择工作城市">
                          <el-option
                            v-for="item in cityList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="来源渠道" prop="sourceType" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.sourceType" disabled="disabled" placeholder="请选择来源渠道">
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
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="物流从业经验" prop="workExperience" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.workExperience" placeholder="请选择物流从业经验">
                          <el-option
                            v-for="item in experienceList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="货物经验" prop="cargoType" class="postInfo-container-item">
                        <el-select v-model="postForm.cargoType" placeholder="请选择货物经验">
                          <el-option
                            v-for="item in clientNoList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="期望月收入" prop="expMonthlyIncome" class="postInfo-container-item">
                        <el-select v-model="postForm.expMonthlyIncome" placeholder="请选择期望月收入">
                          <el-option
                            v-for="item in expMonthlyIncomeList"
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
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="可接受一天工作时长" prop="workHour" class="postInfo-container-item">
                        <el-select v-model="postForm.workHour" placeholder="请选择可接受一天工作时长">
                          <el-option
                            v-for="item in workHourList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="意向车型" prop="carType" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.carType" placeholder="请选择意向车型">
                          <el-option
                            v-for="item in carList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="是否有货车" prop="isHaveCar" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.isHaveCar" placeholder="请选择是否有货车">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
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
                      <el-form-item label-width="150px" label="可接受首付范围" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.acceptPayRange" placeholder="请选择可接受首付范围">
                          <el-option
                            v-for="item in acceptPayRangeList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="之前在哪工作" prop="whereWorked" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.whereWorked" placeholder="请输入之前在哪工作" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="孩子的年龄" prop="childrenAge" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.childrenAge" type="number" min="1" placeholder="请输入孩子的年龄" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="户口类型" prop="accountType" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.accountType" placeholder="请选择可接受首付范围">
                          <el-option label="农村户口" value="2"></el-option>
                          <el-option label="城市户口" value="1"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="是否有在还贷款" prop="isHaveLoan" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.isHaveLoan" placeholder="请选择是否有在还贷款">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="家里有几个孩子" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.childrenNum" placeholder="请选择家里有几个孩子">
                          <el-option
                            v-for="item in childrenList"
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
                    <el-col :span="24">
                      <el-form-item label-width="150px" label="购车最关注那些方面" prop="buyCarFollow" class="postInfo-container-item">
                        <el-checkbox-group v-model="postForm.buyCarFollow">
                          <el-checkbox label="货源" name="货源"></el-checkbox>
                          <el-checkbox label="收入" name="收入"></el-checkbox>
                          <el-checkbox label="工作强度" name="工作强度"></el-checkbox>
                          <el-checkbox label="车辆品牌" name="车辆品牌"></el-checkbox>
                          <el-checkbox label="首付比例" name="首付比例"></el-checkbox>
                          <el-checkbox label="挂靠上牌" name="挂靠上牌"></el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-form-item label-width="150px" label="备注" class="postInfo-container-item inlineBlock">
                      <el-input v-model="postForm.remark" rows="5" type="textarea" placeholder="请输入备注" />
                    </el-form-item>
                  </el-row>
                </div>
              </el-col>
            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="完成提交" class="noTimeLine" placement="top">
            <el-card>
              <div>
                <el-button :disabled="!btnPass" type="success" @click="submitForm('postForm')">保存信息</el-button>
                <el-button :disabled="!btnPass" type="primary" @click="editForm('postForm')">提交转化</el-button>
                <el-button :disabled="!btnPass" @click="resetForm('postForm')">重置</el-button>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-form>
    </div>
  </div>
</template>

<script>
import { saveClue, translateClue, PostClueDetail } from '@/api/clue/clue-api'
import { dictionary } from '@/api/common'
import '@/styles/qiaoyu.scss'
import Mallki from '@/components/TextHoverEffect/Mallki'

const defaultForm = {
  name: '',
  phone: '',
  age: '',
  isPayDeposit: '',
  workCity: '',
  sourceType: '',
  workExperience: '',
  cargoType: '',
  expMonthlyIncome: '',
  workHour: '',
  carType: '',
  isHaveCar: '',
  cceptPayRange: '',
  childrenAge: '',
  isHaveLoan: '',
  childrenNum: '',
  buyCarFollow: [],
  accountType: '',
  remark: ''
}

export default {
  name: 'AddClue',
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
      dialogVisible: false,
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
        age: [{ required: true, validator: validateAge, trigger: 'change' }],
        isPayDeposit: [{ required: true, message: '请选择是否跟车', trigger: 'change' }],
        workCity: [{ required: true, message: '请输入城市', trigger: 'change' }],
        workExperience: [{ required: true, message: '请选择物流从业经验', trigger: 'change' }],
        cargoType: [{ required: true, message: '请选择货物经验', trigger: 'change' }],
        expMonthlyIncome: [{ required: true, message: '请选择期望月收入', trigger: 'change' }],
        workHour: [{ required: true, message: '请选择可接受工作时长', trigger: 'change' }],
        carType: [{ required: true, message: '请选择意向车型', trigger: 'change' }],
        accountType: [{ required: true, message: '请选择户口类型', trigger: 'change' }],
        buyCarFollow: [{ required: true, message: '请选择意向车型', trigger: 'change' }],
        isHaveCar: [{ required: true, message: '请选择是否有货车', trigger: 'change' }]
      },
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
    this.fetchData()
    const id = this.$route.query.id;
    this.postForm.clueId = id;
    this.getDetails(id);
  },
  methods: {
    fetchData() {
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
    },
    getDetails(id) {
      PostClueDetail({ clueId: id }).then(res => {
        if (res.data.success) {
          let detail = res.data.data
          for (let key in detail) {
            if (typeof detail[key] === 'number') {
              detail[key] = detail[key].toString()
              if (detail[key] === '0') {
                detail[key] = ''
              }
            }
          }
          detail.buyCarFollow = detail.buyCarFollow.split(',')
          this.postForm = detail
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }).catch(err => {
        this.$message.error(err);
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btnPass) {
            this.btnPass = false
            saveClue({
              'acceptPayRange': this.postForm.acceptPayRange,
              'accountType': this.postForm.accountType,
              'age': this.postForm.age,
              'buyCarFollow': this.postForm.buyCarFollow.toString(),
              'carType': this.postForm.carType,
              'cargoType': this.postForm.cargoType,
              'childrenAge': this.postForm.childrenAge,
              'childrenNum': this.postForm.childrenNum,
              'clueId': this.postForm.clueId,
              'expMonthlyIncome': this.postForm.expMonthlyIncome,
              'isHaveCar': this.postForm.isHaveCar,
              'isHaveLoan': this.postForm.isHaveLoan,
              'isPayDeposit': this.postForm.isPayDeposit,
              'name': this.postForm.name,
              'phone': this.postForm.phone,
              'remark': this.postForm.remark,
              'sourceType': this.postForm.sourceType,
              'whereWorked': this.postForm.whereWorked,
              'workCity': this.postForm.workCity,
              'workExperience': this.postForm.workExperience,
              'workHour': this.postForm.workHour
            }).then(res => {
              if (res.data.success) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                setTimeout(() => {
                  this.$router.push({ path: '/clue-list' })
                }, 1000)
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
    editForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btnPass) {
            this.$confirm('请确认司机已经到公司面试, 司机转化后状态更新为面试司机。信息将同步司机管理模块后续操作!', '提示', {
              confirmButtonText: '确定转化',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.btnPass = false
              translateClue({
                'acceptPayRange': this.postForm.acceptPayRange,
                'accountType': this.postForm.accountType,
                'age': this.postForm.age,
                'buyCarFollow': this.postForm.buyCarFollow.toString(),
                'carType': this.postForm.carType,
                'cargoType': this.postForm.cargoType,
                'childrenAge': this.postForm.childrenAge,
                'childrenNum': this.postForm.childrenNum,
                'clueId': this.postForm.clueId,
                'expMonthlyIncome': this.postForm.expMonthlyIncome,
                'isHaveCar': this.postForm.isHaveCar,
                'isHaveLoan': this.postForm.isHaveLoan,
                'isPayDeposit': this.postForm.isPayDeposit,
                'name': this.postForm.name,
                'phone': this.postForm.phone,
                'remark': this.postForm.remark,
                'sourceType': this.postForm.sourceType,
                'whereWorked': this.postForm.whereWorked,
                'workCity': this.postForm.workCity,
                'workExperience': this.postForm.workExperience,
                'workHour': this.postForm.workHour
              }).then(res => {
                if (res.data.success) {
                  this.$message({
                    message: '提交转化成功',
                    type: 'success'
                  });
                  setTimeout(() => {
                    this.$router.push({ path: '/clue-list' })
                  }, 1000)
                } else {
                  this.$message.error(res.data.errorMsg);
                  this.btnPass = true
                }
              }).catch(err => {
                this.$message.error(err);
                this.btnPass = true
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
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
  .addClue{
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

