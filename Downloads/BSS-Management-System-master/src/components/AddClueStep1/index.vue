<template>
  <div class="AddClueStep1">
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
                    <el-form-item label-width="150px" label="来源渠道" prop="sourceType" class="postInfo-container-item inlineBlock">
                      <el-select v-model="postForm.sourceType" placeholder="请选择来源渠道">
                        <el-option
                          v-for="item in sourceList"
                          :key="item.codeVal"
                          :value="item.codeVal"
                          :label="item.code">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="150px" label="联系电话" prop="phone" class="postInfo-container-item inlineBlock">
                      <el-input v-model="postForm.phone" type="number" placeholder="请输入联系电话" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>

            <el-col :span="24">
              <div class="postInfo-container">
                <el-row>
                  <el-col v-if="postForm.sourceType === '13' || postForm.sourceType === '70'" :span="8">
                    <el-form-item label-width="150px" label="微信号" class="postInfo-container-item inlineBlock">
                      <el-input v-model="postForm.wechatId" placeholder="请输入微信号" />
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="150px" label="是否添加微信" prop="isAddWechat" class="postInfo-container-item inlineBlock">
                      <el-select v-model="postForm.isAddWechat" placeholder="请选择是否添加微信">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

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

                  <el-col :span="8">
                    <el-form-item label-width="150px" label="邀约方式" prop="way" class="postInfo-container-item inlineBlock">
                      <el-select v-model="postForm.way" placeholder="请选择跟进方式">
                        <el-option
                          v-for="item in followList"
                          :key="item.codeVal"
                          :value="item.codeVal"
                          :label="item.code">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="150px" label="是否能邀约面试" prop="invited" class="postInfo-container-item inlineBlock">
                      <el-select v-model="postForm.invited" placeholder="请选择是否能邀约面试">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col v-if="postForm.invited === 'true'" :span="8">
                    <el-form-item label-width="150px" label="是否能发送邀约短信" prop="sendMsg" class="postInfo-container-item">
                      <el-select v-model="postForm.sendMsg" placeholder="请选择是否能发送邀约短信">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col v-if="postForm.sendMsg === 'true'" :span="8">
                    <el-form-item label-width="150px" label="预约面试时间" prop="inviteDate" class="postInfo-container-item">
                      <el-date-picker
                        v-model="postForm.inviteDate"
                        style="width: auto;"
                        type="date"
                        value-format="timestamp"
                        placeholder="请选择预约面试时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>

                  <el-col v-if="postForm.sendMsg === 'true'" :span="8">
                    <el-form-item label-width="150px" label="联系人" prop="contactData" class="postInfo-container-item inlineBlock">
                      <el-select v-model="postForm.contactData" placeholder="请选择联系人" @change="changeContactData">
                        <el-option
                          v-for="item in unReasonList"
                          :key="item.name"
                          :value="item.name"
                          :label="item.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="8">-->
                  <!--<el-form-item label-width="150px" label="货物运输经验(月)" prop="cargoExperience" class="postInfo-container-item">-->
                  <!--<el-input v-model="postForm.cargoExperience" type="number" min="1" placeholder="请输入货物运输经验" />-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="8">
                    <el-form-item v-if="clueShow" label-width="150px" label="线索归属" prop="appletSource" class="postInfo-container-item">
                      <el-select v-model="postForm.appletSource" placeholder="请选择线索归属">
                        <el-option
                          v-for="item in appletList"
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

            <el-col v-if="postForm.sendMsg === 'true'" :span="24">
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="24">
                    <div class="postInfo-container">
                      <el-row>
                        <el-form-item label-width="150px" label="邀约短信" class="postInfo-container-item inlineBlock">
                          <el-input :value="'短信模板内容：' + postForm.name + '您好！北京云鸟科技有限公司邀请您来公司了解梧桐业务，预约时间：' + Timestamps(postForm.inviteDate) + '，公司地址：' + postForm.city + '。联系人:' + postForm.contactName + '(' + postForm.contactPhone + ')'" :disabled="disabled" rows="5" style="width: 300px;" type="textarea" placeholder="请输入邀约短信" />
                        </el-form-item>
                      </el-row>
                    </div>
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
import { dictionary, getFollowClueUserInfo } from '@/api/common'
import { creatClue } from '@/api/clue/clue-api'
import '@/styles/qiaoyu.scss'
const defaultForm = {
  buyCarFollow: [],
  cargoExperience: '',
  appletSource: '',
  contactName: '',
  contactPhone: '',
  hasIntention: '',
  isAddWechat: '',
  way: '',
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
  wechatId: '',
  workCity: ''
}
export default {
  name: 'AddClueStep1',
  data() {
    var validatePhone = (rule, value, callback) => {
      if (this.postForm.sourceType !== '13' && this.postForm.sourceType !== '70') {
        if (value === '') {
          callback(new Error('请输入业务对接人联系电话'));
        } else {
          if (!(/^1[3456789]\d{9}$/.test(value))) {
            callback(new Error('请输入正确电话格式'));
          }
          callback();
        }
      } else {
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
      clueShow: false,
      customerIdOppositeType: false,
      userListOptions: [],
      tempRoute: {},
      customers: [],
      myHeaders: { Authorization: token },
      rules: {
        name: [{ required: true, message: '请输入司机姓名', trigger: 'change' }],
        phone: [{ required: true, validator: validatePhone, trigger: 'change' }],
        buyCarFollow: [{ required: true, message: '请选择意向关注点', trigger: 'change' }],
        age: [{ required: true, validator: validateAge, trigger: 'change' }],
        workCity: [{ required: true, message: '请输入城市', trigger: 'change' }],
        contactData: [{ required: true, message: '请选择联系人', trigger: 'change' }],
        hasIntention: [{ required: true, message: '请选择司机意向', trigger: 'change' }],
        inviteDate: [{ required: true, message: '请选择邀约面试时间', trigger: 'change' }],
        invited: [{ required: true, message: '请选择是否邀约面试', trigger: 'change' }],
        sendMsg: [{ required: true, message: '请输入邀约短信内容', trigger: 'change' }],
        sourceType: [{ required: true, message: '请选择线索来源', trigger: 'change' }],
        way: [{ required: true, message: '请选择邀约方式', trigger: 'change' }],
        appletSource: [{ required: true, message: '请选择线索归属', trigger: 'change' }],
        isAddWechat: [{ required: true, message: '请选择是否添加微信', trigger: 'change' }],
        unintentionalReason: [{ required: true, message: '请选择线索来源', trigger: 'change' }]
      },
      unReasonList: [],
      unintentionalList: [],
      appletList: [], // 线索归属
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
      followList: [],
      cityList_sms: [],
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
    'postForm.sourceType'(val) {
      if (val === '13' || val === '70') {
        this.rules.phone[0].required = false;
        this.postForm.phone = '';
      } else {
        this.rules.phone[0].required = true;
        this.postForm.phone = '';
      }
    }
  },
  created() {},
  mounted() {
    this.fetchData();
    let role = localStorage.getItem('role');
    if (role.length > 1) {
      this.clueShow = true;
    } else {
      this.postForm.appletSource = role
    }
  },
  methods: {
    changeContactData(val) {
      this.postForm.contactName = val;
      this.unReasonList.forEach((item) => {
        if (item.name === val) {
          this.postForm.contactPhone = item.phone;
        }
      })
    },
    fetchData() {
      // 线索归属
      dictionary({
        dictType: 'applet_source'
      }).then(res => {
        this.appletList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 工作城市
      dictionary({
        dictType: 'online_city'
      }).then(res => {
        this.cityList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 面试地址
      dictionary({
        dictType: 'sms_invited_address'
      }).then(res => {
        this.cityList_sms = res.data.data;
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
      // 跟进方式
      dictionary({
        dictType: 'clue_follow_way'
      }).then(res => {
        this.followList = res.data.data;
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
    },
    selectCity(item) {
      this.cityList_sms.forEach((i) => {
        if (i.codeVal === item) {
          this.postForm.city = i.code
        }
      })
    },
    Timestamps(time) {
      var date = new Date(time);
      if (!time) {
        return 'xx'
      }
      function change(t) {
        if (t < 10) {
          return '0' + t;
        } else {
          return t;
        }
      }
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      const D = change(date.getDate()) + ' ';
      // const h = change(date.getHours()) + ':';
      // const m = change(date.getMinutes()) + ':';
      // const s = change(date.getSeconds());
      return Y + M + D;
    },
    submitForm(formName) {
      if (this.postForm.sourceType === '13' || this.postForm.sourceType === '70') {
        if (this.postForm.phone === '' && this.postForm.wechatId === '') {
          this.$message.error('请填写联系电话或微信号至少一项');
          return false;
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btnPass) {
            this.btnPass = false
            creatClue({
              'name': this.postForm.name,
              'phone': this.postForm.phone,
              'remark': this.postForm.remark,
              'sourceType': this.postForm.sourceType,
              'buyCarFollow': this.postForm.buyCarFollow.toString(),
              'workCity': this.postForm.workCity,
              'cargoExperience': this.postForm.cargoExperience,
              'contactName': this.postForm.contactName,
              'contactPhone': this.postForm.contactPhone,
              'hasIntention': this.postForm.hasIntention,
              'inviteDate': this.postForm.inviteDate,
              'isAddWechat': this.postForm.isAddWechat,
              'invited': this.postForm.invited,
              'sendMsg': this.postForm.sendMsg,
              'way': this.postForm.way,
              'wechatId': this.postForm.wechatId,
              'unintentionalReason': this.postForm.unintentionalReason,
              'appletSource': this.postForm.appletSource
            }).then(res => {
              if (res.data.success) {
                if (res.data.data.flag) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.$router.push({ name: 'ClueListNew' })
                } else {
                  this.btnPass = true
                  this.$message.error(res.data.data.msg);
                }
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
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .AddClueStep1{
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
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
