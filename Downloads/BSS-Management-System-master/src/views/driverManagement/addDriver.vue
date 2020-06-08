<template>
  <div class="addDriver">
    <div class="fromBox">
      <mallki text="司机信息采集" class-name="mallki-text"/>
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <el-timeline>
          <el-timeline-item timestamp="基本信息" placement="top">
            <el-card>
              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="姓名" prop="name" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.name" :disabled="editType" placeholder="请输入司机姓名" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="司机年龄" prop="age" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.age" type="number" placeholder="请输入司机年龄" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="联系方式" prop="phone" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.phone" :disabled="editType" type="number" placeholder="请输入联系方式" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col v-if="!editType" :span="8">
                      <el-form-item label-width="150px" label="面试时间" prop="signUpDate" class="postInfo-container-item inlineBlock">
                        <el-date-picker
                          v-model="postForm.signUpDate"
                          type="date"
                          prop="distribution"
                          value-format="timestamp"
                          style="width: auto;"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="工作城市" prop="workCity" class="postInfo-container-item">
                        <el-select :disabled="editType" v-model="postForm.workCity" placeholder="请选择">
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
                      <el-form-item label-width="150px" label="来源渠道" prop="source" class="postInfo-container-item">
                        <el-select v-model="postForm.source" placeholder="请选择来源渠道">
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
                      <el-form-item label-width="150px" label="货物运输经验(月)" prop="workExperience" class="postInfo-container-item inlineBlock">
                        <!--<el-select v-model="postForm.workExperience" placeholder="请选择货物运输经验">-->
                        <!--<el-option-->
                        <!--v-for="item in experienceList"-->
                        <!--:key="item.codeVal"-->
                        <!--:value="item.codeVal"-->
                        <!--:label="item.code">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <el-input v-model="postForm.workExperience" placeholder="请输入货物运输经验作" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="配送货物类型" prop="cargoType" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.cargoType" placeholder="请选择配送货物类型">
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
                      <el-form-item label-width="150px" label="可接受一天工作时长" prop="workHour" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.workHour" placeholder="请选择">
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
                      <el-form-item label-width="150px" label="意向车型" prop="carType" class="postInfo-container-item">
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
                      <el-form-item label-width="150px" prop="isHaveLoan" label="是否有在还贷款" class="postInfo-container-item">
                        <el-select v-model="postForm.isHaveLoan" placeholder="请选择是否有在还贷款">
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
                      <el-form-item label-width="150px" label="之前在哪工作" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.whereWorked" placeholder="请输入之前在哪工作" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="是否有货车" prop="isHaveCar" class="postInfo-container-item">
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
                      <el-form-item label-width="150px" label="平均月收入" class="postInfo-container-item inlineBlock">
                        <!--<el-select v-model="postForm.monthlyIncome" placeholder="请选择平均月收入">-->
                        <!--<el-option-->
                        <!--v-for="item in monthlyIncomeList"-->
                        <!--:key="item.codeVal"-->
                        <!--:value="item.codeVal"-->
                        <!--:label="item.code">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <el-input v-model="postForm.monthlyIncome" style="max-width:190px;" type="number" min="0" placeholder="请输入平均月收入" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" prop="accountType" label="户口类型" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.accountType" placeholder="请选择户口类型">
                          <el-option label="城镇户口" value="1"></el-option>
                          <el-option label="农村户口" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="家里几个孩子" prop="childrenNum" class="postInfo-container-item">
                        <el-input v-model="postForm.childrenNum" style="max-width:190px;" type="number" min="0" placeholder="请输入家里几个孩子" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="孩子的平均年龄" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.childrenAge" type="number" min="1" placeholder="请输入孩子的平均年龄" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="身份证号" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.idNumber" type="text" placeholder="请输入身份证号" />
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
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="是否跟车" prop="isPay" class="postInfo-container-item">
                        <el-select v-model="postForm.isPay" placeholder="请选择">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="征信是否通过" prop="isCreditPass" class="postInfo-container-item">
                        <el-select v-model="postForm.isCreditPass" placeholder="请选择">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="是否高意向" prop="isAdvancedIntentional" class="postInfo-container-item">
                        <el-select v-model="postForm.isAdvancedIntentional" placeholder="请选择">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <!--<el-col v-if="postForm.isPay === '1'" :span="8">-->
                    <!--<el-form-item label-width="150px" label="意向金缴纳日期" prop="payDate" class="postInfo-container-item">-->
                    <!--<el-date-picker-->
                    <!--v-model="postForm.payDate"-->
                    <!--type="date"-->
                    <!--prop="distribution"-->
                    <!--style="width: auto;"-->
                    <!--value-format="timestamp"-->
                    <!--placeholder="选择日期">-->
                    <!--</el-date-picker>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                  </el-row>
                </div>
              </el-col>

              <el-col>
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="备注" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.remarks" rows="5" type="textarea" placeholder="请输入备注" />
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
                <el-button v-if="editType" type="primary" @click="editForm('postForm', 0)">重新提交</el-button>
                <el-button v-if="editType" type="primary" @click="editForm('postForm', 1)">再次面试提交</el-button>
                <el-button v-if="!editType" @click="resetForm('postForm')">重置</el-button>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addDriver, editDriver, GetDriverDetail, theDriverRevisitedTheInterviewTime } from '@/api/driver/driver-api'
import { dictionary } from '@/api/common'
import '@/styles/qiaoyu.scss'
import Mallki from '@/components/TextHoverEffect/Mallki'

const defaultForm = {
  'acceptPayRange': '',
  'age': '',
  'buyCarFollow': [],
  'carType': '',
  'cargoType': '',
  'driverId': '',
  'expMonthlyIncome': '',
  'isHaveCar': '',
  'isHaveLoan': '',
  'isPay': '',
  'name': '',
  'payDate': '',
  'isAdvancedIntentional': '',
  'phone': '',
  'signUpDate': '',
  'idNumber': '',
  'isCreditPass': '',
  'source': '',
  'whereWorked': '',
  'workCity': '',
  'workExperience': '',
  'workHour': '',
  'accountType': '',
  'monthlyIncome': '',
  'childrenNum': '',
  'childrenAge': '',
  'remarks': ''
}

export default {
  name: 'AddDriver',
  components: { Mallki },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系电话'));
      } else {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('请输入正确电话格式'));
        }
        callback();
      }
    };
    var validateAge = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入司机年龄'))
      } else {
        if (value < 18) {
          callback(new Error('司机年龄不可小于18'))
        }
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      tempRoute: {},
      customers: [],
      clientNoList: ['食材', '水果', '方便食品', '团餐外卖', '酒水饮料', '建材', '汽配', '家电', '日化', '家具', '鲜花蛋糕', '3C数码', '洗涤', '印刷品', '服饰鞋帽', '医药保健', '包装', '母婴', '五金', '自行车', '大包裹/仪器', '其他'],
      rules: {
        name: [{ required: true, message: '请输入司机姓名', trigger: 'blur' }],
        age: [{ required: true, validator: validateAge, trigger: 'blur' }],
        phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        signUpDate: [{ required: true, message: '请选择面试时间', trigger: 'change' }],
        workCity: [{ required: true, message: '请选择工作城市', trigger: 'change' }],
        source: [{ required: true, message: '请选择来源渠道', trigger: 'change' }],
        isAdvancedIntentional: [{ required: true, message: '请选择是否高意向', trigger: 'change' }],
        workExperience: [{ required: true, message: '请选择货物运输经验', trigger: 'change' }],
        cargoType: [{ required: true, message: '请选择配送货物类型', trigger: 'change' }],
        expMonthlyIncome: [{ required: false, message: '请选择期望月收入', trigger: 'change' }],
        workHour: [{ required: false, message: '请选择可接受一天工作时长', trigger: 'change' }],
        carType: [{ required: true, message: '请选择意向车型', trigger: 'change' }],
        isHaveLoan: [{ required: false, message: '请选择是否有在还贷款', trigger: 'change' }],
        isHaveCar: [{ required: true, message: '请选择是否有货车', trigger: 'change' }],
        buyCarFollow: [{ required: true, message: '请选择购车最关注那些方面', trigger: 'change' }],
        isPay: [{ required: true, message: '请选择是否跟车', trigger: 'change' }],
        accountType: [{ required: true, message: '请选择户口类型', trigger: 'change' }],
        childrenNum: [{ required: true, message: '请输入家里几个孩子', trigger: 'change' }],
        isCreditPass: [{ required: true, message: '请选择征信是否通过', trigger: 'change' }],
        payDate: [{ required: false, message: '请选择意向金缴纳日期', trigger: 'change' }]
      },
      editType: false,
      userId: '',
      cityList: [],
      sourceList: [],
      expMonthlyIncomeList: [],
      workHourList: [],
      carList: [],
      acceptPayRangeList: [],
      btnPass: true,
      experienceList: [],
      monthlyIncomeList: []
    }
  },
  computed: {},
  watch: {
    'postForm.cargoType'(val) {
      if (val === '其他') {
        this.$prompt('请输入货物经验', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '已添加' + value + '，请重新选择'
          });
          this.clientNoList.unshift(value)
          this.postForm.cargoType = value
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
          this.postForm.cargoType = ''
        });
      }
    },
    'postForm.isPay'(val) {
      // if (val === '1') {
      //   this.rules.payDate[0].required = true;
      // } else {
      //   this.rules.payDate[0].required = false;
      // }
    }
  },
  created() {},
  mounted() {
    this.fetchData();
    const id = this.$route.query.id;
    if (id) {
      this.userId = id;
      this.editType = true;
      this.getDriverDetail(id);
    }
  },
  methods: {
    getDriverDetail(id) {
      GetDriverDetail({
        driverId: id
      }).then(res => {
        if (res.data.success) {
          const data = res.data.data;
          Object.getOwnPropertyNames(data).forEach(function(key) {
            if (data[key]) {
              data[key] = data[key].toString()
            }
            if (data[key] === 0) {
              data[key] = ''
            }
            if (data['childrenNum'] === '') {
              data['childrenNum'] = 0
            }
            if (data['cargoType'] === '0') {
              data['cargoType'] = ''
            }
          })
          if (data.buyCarFollow === '') {
            data.buyCarFollow = []
          } else {
            data.buyCarFollow = data.buyCarFollow.split(',')
          }
          data.signUpDate = new Date(data.signUpDate).getTime()
          data.payDate = new Date(data.payDate).getTime()
          this.postForm = data
          if (!this.postForm.payDate) {
            this.postForm.payDate = ''
          }
        }
      }).catch(err => {
        this.$message.error(err);
      })
    },
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
      // 平均月收入
      dictionary({
        dictType: 'driver_avg_monthly_income'
      }).then(res => {
        this.monthlyIncomeList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btnPass) {
            this.btnPass = false
            addDriver({
              'acceptPayRange': this.postForm.acceptPayRange,
              'age': this.postForm.age,
              'buyCarFollow': this.postForm.buyCarFollow.toString(),
              'carType': this.postForm.carType,
              'cargoType': this.postForm.cargoType,
              'driverId': this.postForm.driverId,
              'expMonthlyIncome': this.postForm.expMonthlyIncome,
              'isHaveCar': this.postForm.isHaveCar,
              'isHaveLoan': this.postForm.isHaveLoan,
              'isPay': this.postForm.isPay,
              'name': this.postForm.name,
              'payDate': this.postForm.payDate,
              'phone': this.postForm.phone,
              'signUpDate': this.postForm.signUpDate,
              'idNumber': this.postForm.idNumber,
              'isCreditPass': this.postForm.isCreditPass,
              'source': this.postForm.source,
              'whereWorked': this.postForm.whereWorked,
              'workCity': this.postForm.workCity,
              'workExperience': this.postForm.workExperience,
              'workHour': this.postForm.workHour,
              'monthlyIncome': this.postForm.monthlyIncome,
              'accountType': this.postForm.accountType,
              'childrenNum': this.postForm.childrenNum,
              'childrenAge': this.postForm.childrenAge,
              'remarks': this.postForm.remarks
            }).then(res => {
              if (res.data.success) {
                if (res.data.data.flag) {
                  this.$message({
                    message: '创建成功',
                    type: 'success'
                  });
                  setTimeout(() => {
                    this.$router.push({ path: '/driver-list-new' })
                  }, 1000)
                } else {
                  this.$message.error(res.data.data.msg);
                  this.btnPass = true
                }
              } else {
                this.$message.error(res.data.errorMsg);
                this.btnPass = true;
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
    editForm(formName, type) {
      if (!type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.btnPass) {
              this.btnPass = false
              editDriver({
                'userId': this.userId,
                'acceptPayRange': this.postForm.acceptPayRange,
                'age': this.postForm.age,
                'buyCarFollow': this.postForm.buyCarFollow.toString(),
                'carType': this.postForm.carType,
                'cargoType': this.postForm.cargoType,
                'isAdvancedIntentional': Number(this.postForm.isAdvancedIntentional),
                'driverId': this.postForm.driverId,
                'expMonthlyIncome': this.postForm.expMonthlyIncome,
                'isHaveCar': this.postForm.isHaveCar,
                'isHaveLoan': this.postForm.isHaveLoan,
                'isPay': this.postForm.isPay,
                'name': this.postForm.name,
                'payDate': this.postForm.payDate,
                'phone': this.postForm.phone,
                'signUpDate': this.postForm.signUpDate,
                'idNumber': this.postForm.idNumber,
                'isCreditPass': this.postForm.isCreditPass,
                'source': this.postForm.source,
                'whereWorked': this.postForm.whereWorked,
                'workCity': this.postForm.workCity,
                'workExperience': this.postForm.workExperience,
                'workHour': this.postForm.workHour,
                'monthlyIncome': this.postForm.monthlyIncome,
                'accountType': this.postForm.accountType,
                'childrenNum': this.postForm.childrenNum,
                'childrenAge': this.postForm.childrenAge,
                'remarks': this.postForm.remarks
              }).then(res => {
                if (res.data.success) {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$router.push({ path: '/driver-list-new' })
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
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.btnPass) {
              this.btnPass = false
              theDriverRevisitedTheInterviewTime({
                'userId': this.userId,
                'acceptPayRange': this.postForm.acceptPayRange,
                'age': this.postForm.age,
                'buyCarFollow': this.postForm.buyCarFollow.toString(),
                'carType': this.postForm.carType,
                'cargoType': this.postForm.cargoType,
                'isAdvancedIntentional': Number(this.postForm.isAdvancedIntentional),
                'driverId': this.postForm.driverId,
                'expMonthlyIncome': this.postForm.expMonthlyIncome,
                'isHaveCar': this.postForm.isHaveCar,
                'isHaveLoan': this.postForm.isHaveLoan,
                'isPay': this.postForm.isPay,
                'name': this.postForm.name,
                'payDate': this.postForm.payDate,
                'phone': this.postForm.phone,
                'signUpDate': this.postForm.signUpDate,
                'idNumber': this.postForm.idNumber,
                'isCreditPass': this.postForm.isCreditPass,
                'source': this.postForm.source,
                'whereWorked': this.postForm.whereWorked,
                'workCity': this.postForm.workCity,
                'workExperience': this.postForm.workExperience,
                'workHour': this.postForm.workHour,
                'monthlyIncome': this.postForm.monthlyIncome,
                'accountType': this.postForm.accountType,
                'childrenNum': this.postForm.childrenNum,
                'childrenAge': this.postForm.childrenAge,
                'remarks': this.postForm.remarks
              }).then(res => {
                if (res.data.success) {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$router.push({ path: '/driver-list-new' })
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
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .addDriver{
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

