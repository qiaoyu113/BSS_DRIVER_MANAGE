<template>
  <div class="createTender">
    <div class="fromBox">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <el-timeline>
          <el-timeline-item timestamp="标书信息" placement="top">
            <el-card>
              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="标书类型" prop="tenderType" class="postInfo-container-item inlineBlock">
                        <el-select
                          v-model="postForm.tenderType"
                          placeholder="请选择标书类型">
                          <el-option :value="1" label="普通标书"></el-option>
                          <el-option :value="2" label="竞价标书"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col v-if="postForm.tenderType === 2" :span="8">
                      <el-form-item label-width="150px" label="" prop="guidePrice" class="postInfo-container-item inlineBlock">
                        <template slot="label">
                          <div style="display: inline-block">指导价格
                            <el-popover
                              placement="top-start"
                              title="参考价格说明"
                              width="400"
                              trigger="hover"
                              content="参考价格：等于标书价格，也是司机在小程序看到的价格，司机的报价不得高于该价格。">
                              <i slot="reference" class="el-icon-info"></i>
                            </el-popover>
                          </div>
                        </template>
                        <el-input v-model="postForm.guidePrice" type="text" placeholder="请输入指导价格" @input="onlyNumber" />
                        <i class="item-right">元</i>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="配送日期" label-width="150px" prop="deliveryDateType">
                        <el-radio-group v-model="postForm.deliveryDateType">
                          <el-radio :label="1">随时上岗</el-radio>
                          <el-radio :label="2">固定日期</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="postForm.deliveryDateType === 2" :span="8">
                      <el-form-item label="选择上车日期" label-width="150px" prop="deliveryDate">
                        <el-date-picker
                          v-model="postForm.deliveryDate"
                          :picker-options="pickerOptions"
                          type="date"
                          value-format="timestamp"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="基本信息" style="margin-top: 20px;" placement="top">
            <el-card>
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>货主 </el-header>
                      <el-main>{{ detail.customerName | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
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
                      <el-header>线路名称 </el-header>
                      <el-main>{{ detail.lineName | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>

              <el-row :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>货物类型 </el-header>
                      <el-main>{{ detail.cargoType | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>收货人类型 </el-header>
                      <el-main>{{ detail.receiverType | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>车型 </el-header>
                      <el-main>{{ detail.carTypeName | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>

              <el-row :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>仓位置 </el-header>
                      <el-main>{{ detail.warehouse | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>配送区域是否固定 </el-header>
                      <el-main>
                        <svg-icon v-if="detail.distributionSites === 2" icon-class="noPass" />
                        <svg-icon v-if="detail.distributionSites === 1" icon-class="pass" />
                      </el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>是否需要返仓 </el-header>
                      <el-main>
                        <svg-icon v-if="detail.returnWarehouse === 2" icon-class="noPass" />
                        <svg-icon v-if="detail.returnWarehouse === 1" icon-class="pass" />
                      </el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>

              <el-row :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>是否需要搬运 </el-header>
                      <el-main>
                        <svg-icon v-if="detail.carry === 2" icon-class="noPass" />
                        <svg-icon v-if="detail.carry === 1" icon-class="pass" />
                      </el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>是否需要回单 </el-header>
                      <el-main>
                        <svg-icon v-if="detail.returnBill === 2" icon-class="noPass" />
                        <svg-icon v-if="detail.returnBill === 1" icon-class="pass" />
                      </el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>收入结算方式 </el-header>
                      <el-main>{{ detail.incomeSettlementMethodName | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>

              <el-row v-if="detail.incomeSettlementMethod === 1" :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>货主单趟最低报价 </el-header>
                      <el-main>{{ detail.preLowestQuotations | NumFormat }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预估单趟费用(元)(含油耗、过路、过桥) </el-header>
                      <el-main>{{ detail.monthlyFuelConsumption | NumFormat }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>单趟去油净收入 </el-header>
                      <el-main>{{ Number(detail.preLowestQuotations) - Number(detail.monthlyFuelConsumption) ? Number(detail.preLowestQuotations) - Number(detail.monthlyFuelConsumption) : 0 | NumFormat }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>

              <el-row v-if="detail.incomeSettlementMethod === 2" :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预计货主月报价 </el-header>
                      <el-main>{{ detail.preLowestQuotations | NumFormat }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预估月费用(元)(含油耗、过路、过桥) </el-header>
                      <el-main>{{ detail.monthlyFuelConsumption | NumFormat }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预计去油净收入 </el-header>
                      <el-main>{{ Number(detail.preLowestQuotations) - Number(detail.monthlyFuelConsumption) ? Number(detail.preLowestQuotations) - Number(detail.monthlyFuelConsumption) : 0 | NumFormat }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>

              <el-row :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>油卡结算(%) </el-header>
                      <el-main>{{ detail.fuelRatio | DataIsNull }}%</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>线路区域 </el-header>
                      <el-main>{{ detail.provinceAreaName }}{{ detail.cityAreaName }}{{ detail.countyAreaName }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>具体区域范围 </el-header>
                      <el-main>
                        <el-main>{{ detail.districtArea | DataIsNull }}</el-main>
                      </el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>

              <el-row :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>线路编号 </el-header>
                      <el-main>{{ detail.lineId | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>

                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>线路入池原因 </el-header>
                      <el-main>{{ detail.occurReasonName | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>

                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>可上车数 </el-header>
                      <el-main>{{ detail.deployNum | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>

              <el-row :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>线路稳定性 </el-header>
                      <el-main>{{ detail.stabilityRateName | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>

                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>创建线路难度 </el-header>
                      <el-main>{{ detail.handlingDifficultyDegreeName | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>

                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>备注信息 </el-header>
                      <el-main>{{ detail.remark | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="单趟配送信息" placement="top">
            <el-card>
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预计每日平均配送点位数 </el-header>
                      <el-main>{{ detail.deliveryNum | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预计每日平均总里程(公里) </el-header>
                      <el-main>{{ detail.distance | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预计月出车天数 </el-header>
                      <el-main>{{ detail.month | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>

              <el-row :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预计日工作时间 </el-header>
                      <el-main>
                        <div v-for="item in detail.lineDeliveryInfoFORMS" :key="item.id">{{ item.workingTimeStart }}~{{ item.workingTimeEnd }}</div>
                      </el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预计每日货物总体积(立方米) </el-header>
                      <el-main>{{ detail.volume | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预计单件货物重量(kg) </el-header>
                      <el-main>{{ detail.singleCargoWeightName | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>每日配送趟数 </el-header>
                      <el-main>{{ detail.dayNumName | DataIsNull }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="成本计算" placement="top">
            <el-card>
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预计成本 </el-header>
                      <el-main>{{ detail.preCost | NumFormat }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预计收入 </el-header>
                      <el-main>{{ detail.preIncome | NumFormat }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>预计毛利 </el-header>
                      <el-main>{{ detail.preGrossProfit | NumFormat }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>

          <el-timeline-item v-permission="['/line/line/task/create']" timestamp="完成提交" class="noTimeLine" placement="top">
            <el-card>
              <div>
                <el-button :disabled="!btnPass" type="primary" @click="submitForm('postForm')">立即创建</el-button>
                <el-button :disabled="!btnPass" @click="resetForm('postForm')">重置</el-button>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-form>
    </div>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
import permission from '@/directive/permission/index'
import BackToTop from '@/components/BackToTop'

import { GetTenderDetail, CreateTender } from '@/api/tender/tender-api'

import '@/styles/qiaoyu.scss'

const defaultForm = {
  tenderType: '',
  lineId: '',
  guidePrice: '',
  deliveryDateType: '',
  deliveryDate: ''
}

export default {
  name: 'CreateTender',
  components: { BackToTop },
  directives: { permission },
  data() {
    return {
      myBackToTopStyle: {
        right: '40px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (Date.now() - 86400000);
        }
      },
      btnPass: true,
      postForm: Object.assign({}, defaultForm),
      detail: {},
      days: '', // 配送时间是几天
      rules: {
        tenderType: [
          { required: true, message: '请选择标书类型', trigger: 'change' }
        ],
        guidePrice: [
          { required: true, message: '请输入指导价格', trigger: 'change' }
        ],
        deliveryDateType: [
          { required: true, message: '请选择配送日期', trigger: 'change' }
        ],
        deliveryDate: [
          { required: true, message: '请选择上车日期', trigger: 'change' }
        ]
      }
    }
  },
  computed: {

  },
  watch: {
    'postForm.tenderType'(newVal) {
      if (newVal === 1) {
        this.postForm.guidePrice = '';
      }
    },
    'postForm.dateType'(newVal) {
      if (newVal === 1) {
        this.postForm.deliveryDate = '';
      }
    }
  },
  created() {

  },
  mounted() {
    const id = this.$route.query.id;
    this.postForm.lineId = id;
    this.fetchData(id);
  },
  methods: {
    fetchData(id) {
      GetTenderDetail({ lineId: id }).then(res => {
        if (res.data.success) {
          this.detail = res.data.data;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onlyNumber() {
      let val = this.postForm.guidePrice;
      if (val.length === 1) {
        this.postForm.guidePrice = val.replace(/[^1-9]/g, '').substr(0, 6);
      } else {
        this.postForm.guidePrice = val.replace(/\D/g, '').substr(0, 6);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btnPass) {
            this.btnPass = false
            CreateTender({
              ...this.postForm
            }).then(res => {
              if (res.data.success) {
                if (res.data.data.flag) {
                  let that = this;
                  this.$message({
                    message: '创建成功',
                    type: 'success',
                    onClose() {
                      that.$router.push({ name: 'AllTenderList' })
                    }
                  });
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
          window.scrollTo(0, 0)
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .createTender{
    padding: 20px;
    .fromBox{
      padding-top: 20px;
    }
    .el-form-item{
      position: relative;
      .item-right{
        position: absolute;
        top: 0;
        right: -18px;
        font-style: normal;
      }
      .item-right-date{
        font-style: normal;
      }
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
      color:#606266;
      line-height: 1.4;
    }
  }
</style>

