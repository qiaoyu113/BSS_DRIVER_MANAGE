<template>
  <div class="creatOrder">
    <el-timeline>
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <el-timeline-item timestamp="基础信息" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-form-item label-width="150px" label="司机姓名（手机号）" prop="driverVal" class="postInfo-container-item inlineBlock">
              <el-select
                v-model="postForm.driverId"
                :remote-method="remoteMethod"
                :loading="loading"
                filterable
                remote
                reserve-keyword
                placeholder="请输入司机姓名或手机号"
                @change="checkDiver">
                <el-option
                  v-for="item in driverList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <div class="product">
              <el-collapse v-if="postForm.driverId" v-model="activeNames">
                <el-collapse-item title="司机信息" name="1">
                  <el-card>
                    <el-row :gutter="24">
                      <el-col :span="8">
                        <el-form-item label-width="110px" label="姓名" prop="driverName" class="postInfo-container-item inlineBlock">
                          <el-input v-model="postForm.driverName" placeholder="请输入姓名" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="110px" label="联系电话" prop="driverPhone" class="postInfo-container-item inlineBlock">
                          <el-input v-model="postForm.driverPhone" type="number" min="0" placeholder="请输入联系电话" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="110px" label="身份证号" prop="idNumber" class="postInfo-container-item inlineBlock">
                          <el-input v-model="postForm.idNumber" placeholder="请输入身份证号码" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="24">
                      <el-col :span="8">
                        <el-form-item label-width="110px" label="现居住地址" prop="address" class="postInfo-container-item inlineBlock">
                          <el-input v-model="postForm.address" placeholder="请输入现居住地址" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="110px" label="工作城市" prop="workCity" class="postInfo-container-item inlineBlock">
                          <el-select v-model="postForm.workCity" placeholder="请选择工作城市" disabled="disabled">
                            <el-option
                              v-for="item in cityList"
                              :key="item.codeVal"
                              :value="item.codeVal"
                              :label="item.code">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-collapse-item>
                <el-collapse-item title="银行及第三方认证信息" name="2">
                  <el-card>
                    <el-row :gutter="24">
                      <el-col :span="8">
                        <el-form-item label-width="110px" label="开户银行" prop="bankName" class="postInfo-container-item inlineBlock">
                          <el-input v-model="postForm.bankName" placeholder="请输入开户银行" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="110px" label="银行开户名" prop="accountName" class="postInfo-container-item inlineBlock">
                          <el-input v-model="postForm.accountName" placeholder="请输入银行开户名" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="110px" label="银行账户" prop="cardNumber" class="postInfo-container-item inlineBlock">
                          <el-input v-model="postForm.cardNumber" placeholder="请输入银行账户" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="110px" label="开户支行" prop="accountOpeningBranch" class="postInfo-container-item inlineBlock">
                          <el-input v-model="postForm.accountOpeningBranch" placeholder="请输入开户支行" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-card>
        </el-timeline-item>
        <el-form ref="productForm" :model="productForm" :rules="rules2" class="form-container">
          <el-timeline-item v-if="postForm.driverId" timestamp="产品信息" placement="top">
            <el-card>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label-width="110px" label="产品方案" prop="product" class="postInfo-container-item inlineBlock">
                    <el-select v-model="postForm.product" placeholder="请选择产品方案" @change="changProduct">
                      <el-option
                        v-for="item in productSolution"
                        :key="item.programId"
                        :value="item.programId"
                        :label="item.programName">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="">
                    <el-checkbox-group v-model="productType">
                      <el-checkbox label="保险"></el-checkbox>
                      <el-checkbox label="GPS及其他服务"></el-checkbox>
                      <el-checkbox label="金融"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-loading="loading" v-if="postForm.product" :gutter="24">
                <div class="product">
                  <el-collapse v-model="activeNames">
                    <el-collapse-item title="产品方案" name="1">
                      <el-card>
                        <el-row>
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                              <el-form-item label-width="75px" label="主产品" class="postInfo-container-item inlineBlock"></el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                              <el-form-item label-width="110px" label="车辆信息" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.vehicleConfiguration" placeholder="请输入车辆品牌型号" disabled="disabled"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="无税车价" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.noTax" placeholder="请输入车价" disabled="disabled"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="购置税" prop="purchaseTax" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.purchaseTax" type="number" style="width:180px;" placeholder="请输入购置税" />
                              </el-form-item>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>

                      <el-card v-if="productType.indexOf('保险') > -1">
                        <el-row>
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                              <el-form-item label-width="110px" label="子产品(保险)" class="postInfo-container-item inlineBlock"></el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                              <el-form-item label-width="110px" label="承保公司" class="postInfo-container-item inlineBlock">
                                <!--<el-input v-model="productForm.insuranceName" placeholder="请输入承保公司" disabled="disabled"/>-->
                                <el-select v-model="productForm.insuranceName" placeholder="请选择承保公司">
                                  <el-option
                                    v-for="item in insuranceList"
                                    :key="item.codeVal"
                                    :label="item.code"
                                    :value="item.codeVal">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label-width="110px" label="保险填写方式" prop="insuranceType" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.insuranceType" placeholder="请选择">
                                  <el-option label="明细填写" value="1"></el-option>
                                  <el-option label="总额填写" value="2"></el-option>
                                </el-select>
                              </el-form-item>
                              <div v-if="productForm.insuranceType === '1'">
                                <el-form-item label-width="110px" label="商业险" prop="commercialInsurance" class="postInfo-container-item inlineBlock">
                                  <el-input v-model="productForm.commercialInsurance" type="number" max="1" min="0" style="width:180px;" placeholder="请输入商业险" />
                                </el-form-item>
                                <el-form-item label-width="110px" label="交强险" prop="toPayHighInsurance" class="postInfo-container-item inlineBlock">
                                  <el-input v-model="productForm.toPayHighInsurance" type="number" placeholder="请输入交强险" />
                                </el-form-item>
                                <el-form-item label-width="110px" label="车船税" prop="travelTax" class="postInfo-container-item inlineBlock">
                                  <el-input v-model="productForm.travelTax" type="number" placeholder="请输入车船税" />
                                </el-form-item>
                              </div>
                              <div v-if="productForm.insuranceType === '2'">
                                <el-form-item label-width="110px" label="保险总额" prop="totalInsurance" class="postInfo-container-item inlineBlock">
                                  <el-input v-model="productForm.totalInsurance" type="number" placeholder="请输入保险总额" />
                                </el-form-item>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>

                      <el-card v-if="productType.indexOf('GPS及其他服务') > -1">
                        <el-row>
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                              <el-form-item label-width="150px" label="子产品(GPS及其他)" class="postInfo-container-item inlineBlock"></el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                              <el-form-item label-width="110px" label="GPS厂商名称" prop="gpsname" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.gpsname" placeholder="请输入GPS厂商名称"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="GPS金额" prop="gpsprice" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.gpsprice" type="number" placeholder="请输入GPS金额" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="上牌" prop="boardFee" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.boardFee" type="number" placeholder="请输入上牌金额" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="临牌" prop="tempBoardFee" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.tempBoardFee" type="number" placeholder="请输入临牌金额" />
                              </el-form-item>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>

                      <el-card v-if="productType.indexOf('金融') > -1">
                        <el-row>
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                              <el-form-item label-width="105px" label="子产品(金融)" class="postInfo-container-item inlineBlock"></el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                              <el-form-item label-width="110px" label="金融服务商" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.financialName" placeholder="请选择金融服务商" @change="changeFinancial">
                                  <el-option
                                    v-for="item in financialList"
                                    :key="item.id"
                                    :value="item.id"
                                    :label="item.financialName">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label-width="110px" label="还款期数" prop="stagingParam" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.stagingParam" placeholder="请选择还款期数" @change="changeFinancial2">
                                  <el-option
                                    v-for="item in productForm.staging"
                                    :key="item.proCardFee"
                                    :value="item.proCardFee"
                                    :label="item.stagingParamName">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label-width="110px" label="首付比(0-1)" prop="paymentRatio" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.paymentRatio" type="number" max="1" min="0" style="width:180px;" placeholder="请输入首付比" @input="checkNumber(productForm.paymentRatio)" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="年费率" prop="annualizedRate" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.annualizedRate" type="number" max="1" min="0" style="width:180px;" placeholder="请输入年费率" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="金融手续费" prop="financialFees" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.financialFees" type="number" placeholder="请输入金融手续费" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="贷款保证金" prop="loanDeposit" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.loanDeposit" type="number" placeholder="请输入贷款保证金" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="贷款金额" prop="loanAmountCalc" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.loanAmountCalc" type="number" placeholder="请输入贷款保证金" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="是否选择购置税分期" prop="purchaseTaxStaging" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.purchaseTaxStaging" placeholder="请选择">
                                  <el-option label="是" value="1"></el-option>
                                  <el-option label="否" value="2"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label-width="110px" label="是否支持车险分期" prop="autoInsuranceStaging" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.autoInsuranceStaging" placeholder="请选择">
                                  <el-option label="是" value="1"></el-option>
                                  <el-option label="否" value="2"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label-width="110px" label="是否支持GPS分期" prop="gpsstaging" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.gpsstaging" placeholder="请选择">
                                  <el-option label="是" value="1"></el-option>
                                  <el-option label="否" value="2"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label-width="110px" label="是否支持金融手续费分期" prop="financialFeeStaging" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.financialFeeStaging" placeholder="请选择">
                                  <el-option label="是" value="1"></el-option>
                                  <el-option label="否" value="2"></el-option>
                                </el-select>
                              </el-form-item>
                              <!--<el-form-item label-width="110px" label="贷款总额" class="postInfo-container-item inlineBlock">-->
                              <!--<el-tag>{{ productForm.loanAmountCalc }}</el-tag>-->
                              <!--</el-form-item>-->
                              <el-form-item label-width="110px" label="货主总利息" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.totalInterestCalc" placeholder="请输入货主总利息" disabled="disabled"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="月供" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.monthPaymentCalc" placeholder="请输入月供" disabled="disabled"/>
                              </el-form-item>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </el-row>
            </el-card>
          </el-timeline-item>
          <el-timeline-item v-if="postForm.product" timestamp="收入/支出" placement="top">
            <el-card>
              <el-row v-loading="loading" :gutter="24">
                <div class="product">
                  <el-collapse v-model="activeNames">
                    <el-collapse-item title="保活方案" name="2">
                      <el-card>
                        <el-row>
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                              <div>
                                <el-form-item label-width="110px" label="首次付出总计:" class="postInfo-container-item inlineBlock">
                                  <span style="color: #67C23A; font-weight: bold;">{{ productForm.totalPayment }}</span>
                                </el-form-item>
                              </div>
                              <div>
                                <el-form-item label-width="110px" label="订单金额总计:" class="postInfo-container-item inlineBlock">
                                  <span style="color: #67C23A; font-weight: bold;">{{ productForm.totalOrder }}</span>
                                </el-form-item>
                              </div>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                              <el-form-item label-width="110px" label="合作期限" prop="yearOfCooperation" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.yearOfCooperation" placeholder="请选择合作期限">
                                  <!--<el-option label="3个月" value="0.25"></el-option>-->
                                  <el-option label="1年" value="1"></el-option>
                                  <el-option label="2年" value="2"></el-option>
                                  <el-option label="3年" value="3"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label-width="110px" label="收入保障" prop="protectAmountCalc" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.protectAmountCalc" type="number" min="0" placeholder="请输入收入保障"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="线路管理费" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.lineManagementFee" type="number" min="0" placeholder="请输入线路管理费" disabled="disabled"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="违章押金" prop="depositViolation" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.depositViolation" type="number" min="0" placeholder="请输入违章押金"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="支付渠道" prop="purchaseWay" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.purchaseWay" placeholder="请选择支付渠道">
                                  <el-option
                                    v-for="item in payList"
                                    :key="item.codeVal"
                                    :label="item.code"
                                    :value="item.codeVal">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label-width="110px" label="管理费首款" prop="managementFeeFirst" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.managementFeeFirst" type="number" min="0" placeholder="请输入管理费首款"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="交款流水号后四位" prop="managementFeeFirst" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.last4Nums" type="number" min="0" placeholder="请输入交款流水号后四位"/>
                              </el-form-item>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </el-row>
            </el-card>
          </el-timeline-item>
          <el-timeline-item v-permission="['/order/orderManager/createNewOrder']" v-if="postForm.driverId" timestamp="操作" placement="top">
            <el-card>
              <div v-if="!types">
                <el-button :disabled="disabled" type="success" @click="submitForm('postForm', 'productForm', 1)">保存</el-button>
                <el-button :disabled="disabled" type="primary" @click="submitForm('postForm', 'productForm', 2)">提交成交</el-button>
                <el-button :disabled="disabled" type="primary" @click="submitCreat('postForm', 'productForm', 3)">提交并新建</el-button>
                <el-button @click="resetForm('postForm')">重置</el-button>
              </div>
              <div v-if="types">
                <el-button :disabled="disabled" type="success" @click="submitForm('postForm', 'productForm', 4)">保存</el-button>
              </div>
            </el-card>
          </el-timeline-item>
        </el-form>
      </el-form>
    </el-timeline>
  </div>
</template>

<script>
import { dictionary } from '@/api/common'
import permission from '@/directive/permission/index'
import { GetDriver, GetDriverDetail, GetProduct, getProductDetail, postSigning, GetFinancialList, GetFinancialDetail, GetFinancialProvidersStaging } from '@/api/order/order-api'
// import { GetLineTender, GetDriver, GetProduct, getProductDetail, postSigning } from '@/api/order/order-api'
import { getTenderTime } from '@/api/carline/carline-api'
import { GetDriverList } from '@/api/driver/driver-api'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  name: 'CreatOrder',
  components: { Mallki },
  directives: { permission },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系人电话'));
      } else {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('请输入正确电话格式'));
        }
        callback();
      }
    };
    var validateIdCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号'));
      } else {
        const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
        if (!(reg.test(value))) {
          callback(new Error('请输入正确身份证格式'));
        }
        callback();
      }
    };
    return {
      activeNames: ['1', '2'],
      driverList: [],
      loading: false,
      disabled: false,
      btnPass: true,
      postForm: {
        driverId: '',
        driverName: '',
        idNumber: '',
        driverPhone: '',
        census: [],
        address: '',
        workCity: '',
        contractStart: '',
        contractEnd: '',
        bankName: '',
        accountOpeningBranch: '',
        managementFeeFirst: '',
        administrativeFinal: '',
        product: '',
        accountName: '',
        cardNumber: '',
        purchaseWay: ''
      },
      productType: ['保险', 'GPS及其他服务', '金融'],
      checkProductType: [1, 1, 1],
      rules: {
        driverId: [{ required: true, message: '请选择司机', trigger: 'change' }],
        driverName: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        idNumber: [{ required: true, validator: validateIdCard, trigger: 'change' }],
        driverPhone: [{ required: true, validator: validatePhone, trigger: 'change' }],
        census: [{ required: true, message: '请选择户籍地址', trigger: 'change' }],
        address: [{ required: true, message: '请输入现居住地址', trigger: 'change' }],
        workCity: [{ required: true, message: '请选择工作城市', trigger: 'change' }],
        contractStart: [{ required: false, message: '请选择合同签约时间', trigger: 'change' }],
        contractEnd: [{ required: false, message: '请选择合同终止时间', trigger: 'change' }],
        bankName: [{ required: true, message: '请输入开户银行', trigger: 'change' }],
        // product: [{ required: true, message: '请选择产品方案', trigger: 'change' }],
        accountName: [{ required: true, message: '请输入银行开户名', trigger: 'change' }],
        cardNumber: [{ required: true, message: '请输入银行账号', trigger: 'change' }],
        accountOpeningBranch: [{ required: true, message: '请输入支行账户', trigger: 'change' }]
      },
      productForm: {
        paymentRatio: '',
        last4Nums: '',
        annualizedRate: '',
        commercialInsurance: '',
        gpsname: '',
        gpsneed: '1',
        gpsprice: '',
        boardFee: '',
        totalOrder: 0,
        totalPayment: 0,
        tempBoardFee: '',
        stagingParam: '',
        financialFees: '',
        loanDeposit: '',
        purchaseTaxStaging: '',
        purchaseTax: '',
        toPayHighInsurance: '',
        travelTax: '',
        autoInsuranceStaging: '',
        otherNeed: '1',
        financianlNeed: '1',
        gpsstaging: '',
        loanAmountCalc: '',
        protectAmountCalc: '',
        depositViolation: '',
        financialFeeStaging: '',
        lineManagementFeePaymentVoucher: [],
        violationDepositPaymentVoucher: [],
        accountOpeningBranch: '',
        managementFeeFirst: '',
        totalInsurance: '',
        insuranceType: '',
        administrativeFinal: ''
      },
      rules2: {
        commercialInsurance: [{ required: true, message: '请输入商业险', trigger: 'change' }],
        gpsname: [{ required: true, message: '请输入GPS厂商名称', trigger: 'change' }],
        gpsprice: [{ required: true, message: '请输入GPS金额', trigger: 'change' }],
        boardFee: [{ required: true, message: '请输入上牌金额', trigger: 'change' }],
        tempBoardFee: [{ required: true, message: '请输入临牌金额', trigger: 'change' }],
        stagingParam: [{ required: true, message: '请选择还款期数', trigger: 'change' }],
        financialFees: [{ required: true, message: '请输入金融手续费', trigger: 'change' }],
        loanDeposit: [{ required: true, message: '请输入贷款保证金', trigger: 'change' }],
        paymentRatio: [{ required: true, message: '请输入首付比，仅限两位小数', trigger: 'change' }],
        annualizedRate: [{ required: true, message: '请输入费率', trigger: 'change' }],
        purchaseTaxStaging: [{ required: true, message: '请选择购置税分期', trigger: 'change' }],
        autoInsuranceStaging: [{ required: true, message: '请选择是否支持车险分期', trigger: 'change' }],
        gpsstaging: [{ required: true, message: '请选择是否支持GPS分期', trigger: 'change' }],
        purchaseTax: [{ required: true, message: '请输入购置税', trigger: 'change' }],
        toPayHighInsurance: [{ required: true, message: '请输入交强险', trigger: 'change' }],
        travelTax: [{ required: true, message: '请输入车船税', trigger: 'change' }],
        driverMonthIncome: [{ required: false, message: '司机月收入', trigger: 'change' }],
        financialFeeStaging: [{ required: true, message: '请选择是否支持金融手续费分期', trigger: 'change' }],
        yearOfCooperation: [{ required: true, message: '请选择合作期限', trigger: 'change' }],
        loanAmountCalc: [{ required: true, message: '请输入贷款金额', trigger: 'change' }],
        depositViolation: [{ required: true, message: '请输入违章押金', trigger: 'change' }],
        lineManagementFeePaymentVoucher: [{ required: true, message: '请上传线路管理费支付凭证', trigger: 'change' }],
        protectAmountCalc: [{ required: true, message: '请输入收入保障', trigger: 'change' }],
        managementFeeFirst: [{ required: true, message: '请输入管理费首款', trigger: 'change' }],
        insuranceType: [{ required: true, message: '请选择保险填写分类', trigger: 'change' }],
        totalInsurance: [{ required: true, message: '请输入保险总额', trigger: 'change' }],
        purchaseWay: [{ required: true, message: '请选择支付渠道', trigger: 'change' }]
      },
      cityList: [],
      financialList: [],
      insuranceList: [],
      payList: [],
      productSolution: [],
      bidId: '',
      driverId: '',
      orderId: '',
      types: false
    }
  },
  watch: {
    'productForm.insuranceType'(val) {
      if (val === '2') {
        this.productForm.commercialInsurance = 0;
        this.productForm.toPayHighInsurance = 0;
        this.productForm.travelTax = 0;
        this.calcTotalInsurance()
      } else {
        this.changeProductType()
        this.calcTotalInsurance()
      }
    },
    'productType'(val) {
      this.changeProductType()
    },
    'productForm.managementFeeFirst'() {
      this.calcTotal()
    },
    'productForm.boardFee'() {
      this.calcTotal()
      this.calcOrder()
    },
    'productForm.tempBoardFee'() {
      this.calcTotal()
      this.calcOrder()
    },
    'productForm.totalInsurance'(val) {
      if (this.productForm.insuranceType === '2') {
        this.calcTotal()
        this.calcOrder()
      }
    },
    'productForm.stagingParam'(val) {
      this.productForm.staging.forEach(item => {
        if (item.proCardFee === val) {
          item.annualizedRate = Number(item.annualizedRatePoint)
          item.paymentRatio = Number(item.paymentRatioPoint)
          this.productForm = Object.assign(this.productForm, item)
          this.productForm.purchaseTaxStaging = String(this.productForm.purchaseTaxStaging)
          this.productForm.autoInsuranceStaging = String(this.productForm.autoInsuranceStaging)
          this.productForm.financialFeeStaging = String(this.productForm.financialFeeStaging)
          this.productForm.gpsstaging = String(this.productForm.gpsstaging)
        }
      })
      this.calcMonthPaymentCalc()
      this.calcTotal()
    },
    'productForm.autoInsuranceStaging'() {
      this.calcOtherCarPurchaseServices()
      this.calcTotal()
    },
    'productForm.financialFeeStaging'() {
      this.calcMonthPaymentCalc()
      this.calcTotal()
      this.calcOtherCarPurchaseServices()
    },
    'productForm.purchaseTaxStaging'() {
      this.calcMonthPaymentCalc()
      this.calcTotal()
      this.calcOtherCarPurchaseServices()
    },
    'productForm.bareCarDownPayment'(val) {
      this.calcBareCarDownPayment()
      this.calcTotal()
    },
    'productForm.commercialInsurance'(val) {
      this.calcTotalInsurance()
      this.calcOtherCarPurchaseServices()
      this.calcTotal()
    },
    'productForm.paymentRatio'(val) {
      if (Number(val) > 1) {
        this.productForm.paymentRatio = 1
      } else if (Number(val) < 0) {
        this.productForm.paymentRatio = 0
      }
      this.calcTotal()
      this.calcDownPaymentCalc()
      this.calcMonthPaymentCalc()
      this.calcBareCarDownPayment()
    },
    'productForm.annualizedRate'(val) {
      if (Number(val) > 1) {
        this.productForm.annualizedRate = 1
      } else if (Number(val) < 0) {
        this.productForm.annualizedRate = 0
      }
      this.calcTotal()
      this.calcTotalInterestCalc()
      this.calcMonthPaymentCalc()
    },
    'productForm.purchaseTax'(val) {
      this.calcMonthPaymentCalc()
      this.calcTotal()
      this.calcOrder()
      this.calcOtherCarPurchaseServices()
    },
    'productForm.toPayHighInsurance'(val) {
      this.calcTotalInsurance()
      this.calcTotal()
      this.calcOtherCarPurchaseServices()
    },
    'productForm.travelTax'(val) {
      this.calcTotalInsurance()
      this.calcTotal()
      this.calcOtherCarPurchaseServices()
    },
    'productForm.downPaymentCalc'(val) {
      this.calcDownPaymentCalc()
      this.calcTotal()
      this.calcBareCarDownPayment()
    },
    'productForm.monthPaymentCalc'(val) {
      this.calcMonthPaymentCalc()
      this.calcTotal()
    },
    'productForm.totalInterestCalc'(val) {
      this.calcTotalInterestCalc()
      this.calcTotal()
    },
    'productForm.loanAmountCalc'(val) {
      this.calcTotalInterestCalc()
      this.calcTotal()
    },
    'productForm.driverMonthIncome'(val) {
      this.calcProtectAmountCalc()
      this.calcLineManagementFee()
      this.calcTotal()
    },
    'productForm.yearOfCooperation'(val) {
      this.calcProtectAmountCalc()
      this.calcTotal()
    },
    'productForm.protectAmountCalc'(val) {
      this.calcProtectAmountCalc()
      this.calcLineManagementFee()
      this.calcTotal()
      this.calcOrder()
    },
    'productForm.otherCarPurchaseServices'(val) {
      this.calcOtherCarPurchaseServices()
      this.calcTotal()
    },
    'productForm.lineManagementFee'(val) {
      this.calcLineManagementFee()
      this.calcOrder()
      this.calcTotal()
    },
    'productForm.totalPayment'(val) {
      this.calcTotal()
    },
    'productForm.loanAmount'(val) {
      this.calcTotal()
    },
    'productForm.gpsstaging'(val) {
      this.calcMonthPaymentCalc()
      this.calcTotal()
      this.calcOtherCarPurchaseServices()
    },
    'productForm.financialFees'() {
      this.calcMonthPaymentCalc()
      this.calcTotal()
      this.calcOrder()
      this.calcOtherCarPurchaseServices()
    },
    'productForm.gpsprice'(val) {
      this.calcMonthPaymentCalc()
      this.calcTotal()
      this.calcOrder()
      this.calcOtherCarPurchaseServices()
    }
  },
  created() {},
  mounted() {
    let bidId = this.$route.query.bidId;
    let driverId = this.$route.query.driverId;
    let orderId = this.$route.query.orderId;
    this.bidId = bidId;
    this.postForm.driverId = driverId;
    this.orderId = orderId;
    this.types = this.$route.query.type;
    if (driverId) {
      this.remoteMethod(driverId)
      this.getDetail(orderId);
    }
  },
  methods: {
    // 选择产品方案计算
    changeProductType() {
      if (this.productType.indexOf('保险') <= -1) {
        this.productForm.insuranceNeed = 2;
        this.productForm.commercialInsurance = 0;
        this.productForm.commercialInsurance = 0;
        this.productForm.toPayHighInsurance = 0;
        this.productForm.travelTax = 0;
        this.calcTotalInsurance()
        this.calcTotal()
        this.calcOrder()
      } else {
        if (this.postForm.product) {
          this.productForm.insuranceNeed = 1;
          this.changProduct(this.postForm.product)
        }
      }
      if (this.productType.indexOf('GPS及其他服务') <= -1) {
        this.productForm.gpsneed = 2;
        this.productForm.otherNeed = 2;
        this.productForm.gpsprice = 0;
        this.productForm.boardFee = 0;
        this.productForm.tempBoardFee = 0;
      } else {
        if (this.postForm.product) {
          this.productForm.gpsneed = 1;
          this.productForm.otherNeed = 1;
          this.changProduct(this.postForm.product)
        }
      }
      if (this.productType.indexOf('金融') <= -1) {
        this.productForm.financianlNeed = 2;
        this.productForm.paymentRatio = 0;
        this.productForm.annualizedRate = 0;
        this.productForm.financialFees = 0;
        this.productForm.loanDeposit = 0;
        this.productForm.loanAmountCalc = 0;
        this.productForm.totalInterestCalc = 0;
        this.productForm.monthPaymentCalc = 0;
      } else {
        if (this.postForm.product) {
          this.productForm.financianlNeed = 1;
          this.changProduct(this.postForm.product)
        }
      }
    },
    // 保险总额
    calcTotalInsurance() {
      if (this.productForm.insuranceType === '1') {
        let num = Number(this.productForm.travelTax) + Number(this.productForm.toPayHighInsurance) + Number(this.productForm.commercialInsurance)
        this.productForm.totalInsurance = num.toString()
        this.calcTotal()
        this.calcOrder()
      } else {
        this.productForm.totalInsurance = ''
      }
    },
    // 购置税
    calcPurchaseTax() {
      // let num = (Number(this.productForm.noTax) / 11.6).toFixed(2)
      let num = Number(this.productForm.purchaseTax)
      // let num = Number(this.productForm.purchaseTax).toFixed(2)
      this.productForm.purchaseTax = String(num)
    },
    // 首付
    calcDownPaymentCalc() {
      let paymentRatio = 0
      if (this.productForm.paymentRatio && this.productForm.paymentRatio !== '') {
        paymentRatio = this.productForm.paymentRatio
      }
      this.productForm.downPaymentCalc = Number(this.productForm.noTax) * Number(paymentRatio)
    },
    // 裸车首付
    calcBareCarDownPayment() {
      this.productForm.bareCarDownPayment = Number(this.productForm.noTax) * Number(this.productForm.paymentRatio)
    },
    // 月供相关
    calcMonthPaymentCalc() {
      let gpsprice = 0;
      if (this.productForm.gpsstaging === '1') {
        gpsprice = this.productForm.gpsprice
      }
      let purchaseTax = 0
      if (this.productForm.purchaseTaxStaging === '1') {
        purchaseTax = this.productForm.purchaseTax
      }
      let financialFees = 0
      if (this.productForm.financialFeeStaging === '1') {
        financialFees = this.productForm.financialFees
      }
      let monthCountAll = 0
      // if (this.productForm.monthCountAll && this.productForm.monthCountAll !== '') {
      //   monthCountAll = this.productForm.monthCountAll
      // }
      if (this.productForm.stagingParam && this.productForm.stagingParam !== '') {
        monthCountAll = this.productForm.stagingParam
      }
      // let travelTax = 0
      // if (this.productForm.travelTax && this.productForm.travelTax !== '') {
      //   travelTax = this.productForm.travelTax
      // }
      // this.productForm.monthPaymentCalc = ((Number(this.productForm.noTax) + Number(purchaseTax) + Number(travelTax) + Number(gpsprice) + Number(financialFees) + Number(this.productForm.totalInterestCalc) - Number(this.productForm.downPaymentCalc)) / Number(monthCountAll)).toFixed(2)
      this.productForm.monthPaymentCalc = ((Number(this.productForm.noTax) + Number(purchaseTax) + Number(gpsprice) + Number(financialFees) + Number(this.productForm.totalInterestCalc) - Number(this.productForm.downPaymentCalc)) / Number(monthCountAll)).toFixed(2)
    },
    // 货主总利息
    calcTotalInterestCalc() {
      let loanAmountCalc = 0
      if (this.productForm.loanAmountCalc && this.productForm.loanAmountCalc !== '') {
        loanAmountCalc = this.productForm.loanAmountCalc
      }
      let annualizedRate = 0
      if (this.productForm.annualizedRate && this.productForm.annualizedRate !== '') {
        annualizedRate = this.productForm.annualizedRate
      }
      let monthCountAll = 0
      if (this.productForm.monthCountAll && this.productForm.monthCountAll !== '') {
        monthCountAll = this.productForm.monthCountAll
      }
      let totalInterestCalc = Number(loanAmountCalc) * Number(annualizedRate) * (Number(monthCountAll))
      this.productForm.totalInterestCalc = totalInterestCalc.toFixed(0)
    },
    // 收入保障
    calcProtectAmountCalc() {
      // let driverMonthIncome = 0
      // if (this.productForm.driverMonthIncome && this.productForm.driverMonthIncome !== '') {
      //   driverMonthIncome = this.productForm.driverMonthIncome
      // }
      // let yearOfCooperation = 0
      // if (this.productForm.yearOfCooperation && this.productForm.yearOfCooperation !== '') {
      //   yearOfCooperation = this.productForm.yearOfCooperation
      // }
      // this.productForm.protectAmountCalc = Number(driverMonthIncome) * Number(yearOfCooperation) * 12
      // this.calcLineManagementFee()
    },
    // 线路管理费
    calcLineManagementFee() {
      // let num = Number(this.productForm.protectAmountCalc)
      // if (num < this.productForm.carModelManagementFee) {
      //   this.productForm.lineManagementFee = this.productForm.carModelManagementFee
      // } else {
      //   this.productForm.lineManagementFee = num
      // }
      this.productForm.lineManagementFee = this.productForm.carModelManagementFee
    },
    // 其他购车服务
    calcOtherCarPurchaseServices() {
      let purchaseTax = 0
      if (this.productForm.purchaseTaxStaging === '2') {
        purchaseTax = this.productForm.purchaseTax
      }
      let commercialInsurance = 0;
      let toPayHighInsurance = 0;
      let travelTax = 0;
      if (this.productForm.autoInsuranceStaging === '2') {
        commercialInsurance = this.productForm.commercialInsurance
        toPayHighInsurance = this.productForm.toPayHighInsurance
        travelTax = this.productForm.travelTax
      }
      let gpsprice = this.productForm.gpsprice
      if (this.productForm.gpsstaging === '1') {
        gpsprice = 0
      }
      let financialFees = 0
      if (this.productForm.financialFeeStaging === '2') {
        financialFees = this.productForm.financialFees
      }
      const num = Number(purchaseTax) + Number(commercialInsurance) + Number(toPayHighInsurance) + Number(travelTax) + Number(gpsprice) + Number(this.productForm.boardFee) + Number(this.productForm.tempBoardFee) + Number(financialFees) + Number(this.productForm.loanDeposit)
      this.productForm.otherCarPurchaseServices = num.toFixed(2)
    },
    // 总计费用
    calcTotal() {
      let financialFees = 0
      if (this.productForm.financialFeeStaging === '2') {
        financialFees = this.productForm.financialFees
      }
      let totalInsurance = 0
      if (this.productForm.totalInsurance) {
        totalInsurance = this.productForm.totalInsurance
      }
      // console.log(1, Number(this.productForm.noTax))
      // console.log(2, Number(this.productForm.paymentRatio))
      // console.log(3, Number(this.productForm.purchaseTax))
      // console.log(4, Number(this.productForm.totalInsurance))
      // console.log(5, Number(this.productForm.boardFee))
      // console.log(6, Number(this.productForm.tempBoardFee))
      // console.log(7, Number(this.productForm.gpsprice))
      // console.log(8, Number(financialFees))
      // console.log(9, Number(this.productForm.managementFeeFirst))
      // const num = Number(this.productForm.noTax) * Number(this.productForm.paymentRatio) + Number(this.productForm.lineManagementFee) + Number(this.productForm.otherCarPurchaseServices)
      let num = Number(this.productForm.noTax) * Number(this.productForm.paymentRatio) + Number(this.productForm.purchaseTax) + Number(totalInsurance) + Number(this.productForm.boardFee) + Number(this.productForm.tempBoardFee) + Number(this.productForm.gpsprice) + Number(financialFees) + Number(this.productForm.managementFeeFirst)
      if (!num) {
        num = 0
      }
      this.productForm.totalPayment = num.toFixed(2)
    },
    // 订金总额
    calcOrder() {
      let financialFees = 0
      if (this.productForm.financialFeeStaging === '2') {
        financialFees = this.productForm.financialFees
      }
      let lineManagementFee = 0
      if (this.productForm.lineManagementFee) {
        lineManagementFee = this.productForm.lineManagementFee
      }
      let totalInsurance = 0
      if (this.productForm.totalInsurance) {
        totalInsurance = this.productForm.totalInsurance
      }
      // console.log(1, Number(this.productForm.noTax))
      // console.log(2, Number(lineManagementFee))
      // console.log(3, Number(this.productForm.purchaseTax))
      // console.log(4, Number(totalInsurance))
      // console.log(5, Number(this.productForm.boardFee))
      // console.log(6, Number(this.productForm.tempBoardFee))
      // console.log(7, Number(this.productForm.gpsprice))
      // console.log(8, Number(financialFees))
      let num = Number(this.productForm.noTax) + Number(lineManagementFee) + Number(this.productForm.purchaseTax) + Number(totalInsurance) + Number(this.productForm.boardFee) + Number(this.productForm.tempBoardFee) + Number(this.productForm.gpsprice) + Number(financialFees)
      if (!num) {
        num = 0
      }
      this.productForm.totalOrder = num.toFixed(2)
    },
    checkNumber(withdrawAmount) {
      this.productForm.paymentRatio = (withdrawAmount.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        GetDriverList({
          key: query
        }).then(response => {
          if (response.data.success) {
            let array = response.data.data;
            let newArr = []
            array.forEach((i) => {
              newArr.push({ value: i.driverId, label: i.name + i.phone })
            })
            this.driverList = newArr;
            this.loading = false;
          } else {
            this.$message.error(response.data.flag);
          }
        })
      } else {
        this.driverList = [];
      }
    },
    checkDiver(driverId) {
      this.fetchData()
      // 获取司机详情
      GetDriverDetail({
        driverId: driverId
      }).then(res => {
        if (res.data.success) {
          let data = res.data.data;
          Object.keys(data).forEach((key) => {
            if (data[key] !== null) {
              data[key] = String(data[key])
            } else {
              data[key] = ''
            }
          })
          data.driverName = data.name;
          data.driverPhone = data.phone;
          this.postForm = data;
          GetProduct({
            city: data.workCity
          }).then(res => {
            if (res.data.success) {
              this.productSolution = res.data.data
            }
          })
        }
      }).catch(err => {
        this.$message.error(err);
      })
    },
    getDetail(orderId) {
      this.fetchData()
      // 获取司机详情
      GetDriver({
        orderId: orderId
      }).then(res => {
        if (res.data.success) {
          let detail = res.data.data;
          let obj1 = detail.driverBasicInfoForGeneraNewOrder;
          let obj2 = detail.productInfoForGeneraNewOrder;
          Object.keys(obj1).forEach((key) => {
            if (obj1[key] !== null) {
              obj1[key] = String(obj1[key])
            } else {
              obj1[key] = ''
            }
          })
          Object.keys(obj2).forEach((key) => {
            if (obj2[key] !== null) {
              obj2[key] = String(obj2[key])
            } else {
              obj2[key] = ''
            }
          })
          let productTypeArr = [];
          if (obj2.financianlNeed === '1') {
            productTypeArr.push('金融')
          }
          if (obj2.otherNeed === '1') {
            productTypeArr.push('GPS及其他服务')
          }
          if (obj2.insuranceNeed === '1') {
            productTypeArr.push('保险')
          }
          this.productType = productTypeArr
          if (obj2.productId) {
            // obj2
            getProductDetail({
              programId: obj2.productId
            }).then(res => {
              if (res.data.success) {
                obj2.staging = res.data.data.staging
                obj2.carModelManagementFee = res.data.data.carModelManagementFee
                obj2.commission = res.data.data.commission
                obj1.product = obj2.productId;
                this.postForm = obj1;
                this.productForm = obj2;
                this.calcLineManagementFee()
                GetProduct({
                  city: detail.driverBasicInfoForGeneraNewOrder.workCity
                }).then(res => {
                  if (res.data.success) {
                    this.productSolution = res.data.data
                  }
                })
              }
            })
          } else {
            this.postForm = obj1;
            this.productForm = obj2;
            this.calcLineManagementFee()
            GetProduct({
              city: detail.driverBasicInfoForGeneraNewOrder.workCity
            }).then(res => {
              if (res.data.success) {
                this.productSolution = res.data.data
              }
            })
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
        if (res.data.success) {
          this.cityList = res.data.data;
        }
      }).catch(err => {
        this.$message.error(err);
      })
      // 支付渠道
      dictionary({
        dictType: 'purchaseWay'
      }).then(res => {
        if (res.data.success) {
          this.payList = res.data.data;
        }
      }).catch(err => {
        this.$message.error(err);
      })
      // 承保公司
      dictionary({
        dictType: 'purchaseWay'
      }).then(res => {
        if (res.data.success) {
          this.insuranceList = res.data.data;
        }
      }).catch(err => {
        this.$message.error(err);
      })
    },
    // 选择产品方案
    changProduct(code) {
      this.loading = true
      getProductDetail({
        programId: code
      }).then(res => {
        if (res.data.success) {
          const detail = res.data.data
          Object.keys(detail).forEach((key) => {
            if (key !== 'staging') {
              detail[key] = String(detail[key])
            }
          })
          this.productForm.annualizedRate = ''
          this.productForm.paymentRatio = ''
          detail.loanAmountCalc = 0
          detail.protectAmountCalc = ''
          detail.financialName = Number(detail.financialId)
          detail.gpsneed = this.productForm.gpsneed
          detail.otherNeed = this.productForm.otherNeed
          detail.insuranceNeed = this.productForm.insuranceNeed
          this.productForm = Object.assign(this.productForm, detail)
          this.calcPurchaseTax()
          this.calcProtectAmountCalc()
          this.calcTotalInterestCalc()
          this.calcDownPaymentCalc()
          this.getFinancial();
          this.changeFinancial(this.productForm.financialId)
          this.calcLineManagementFee()
          this.loading = false
        }
      })
    },
    getFinancial() {
      GetFinancialList({
        city: this.postForm.workCity
      }).then((res) => {
        if (res.data.success) {
          this.financialList = res.data.data
        }
      })
    },
    changeFinancial(id) {
      GetFinancialDetail({
        id: id
      }).then((res) => {
        if (res.data.success) {
          let detail = res.data.data
          this.productForm.autoInsuranceStaging = detail.autoInsuranceStaging ? String(detail.autoInsuranceStaging) : ''
          this.productForm.financialFeeStaging = detail.financialFeeStaging ? String(detail.financialFeeStaging) : ''
          this.productForm.financialFeesCent = detail.financialFeesCent ? String(detail.financialFeesCent) : ''
          // this.productForm.financialName = detail.financialName ? String(detail.financialName) : ''
          this.productForm.gpsStaging = detail.gpsStaging ? String(detail.gpsStaging) : ''
          this.productForm.loanDepositCent = detail.loanDepositCent ? String(detail.loanDepositCent) : ''
          this.productForm.purchaseTaxStaging = detail.purchaseTaxStaging ? String(detail.purchaseTaxStaging) : ''
          this.productForm.remarks = detail.remarks ? String(detail.remarks) : ''
        }
      })
      GetFinancialProvidersStaging({
        id: id
      }).then((res) => {
        if (res.data.success) {
          this.productForm.staging = res.data.data
        }
      })
    },
    changeFinancial2(item) {
      // this.productForm.staging.forEach(items => {
      //   if (items.proCardFee === item) {
      //     this.productForm.paymentRatio = items.paymentRatioPoint
      //     this.productForm.annualizedRate = items.annualizedRatePoint
      //   }
      // })
    },
    MoreTime(id) {
      getTenderTime({
        lineId: id
      }).then((res) => {
        if (res.data.success) {
          this.timeList = res.data.data
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }).catch((err) => {
        this.$message.error(err.errorMsg)
      })
    },
    submitCreat(formName, formName2, type) {
      this.$confirm('此操作会在司机名下增加新的订单，是否继续生成新订单？(适用场景：一位司机购买多辆车的简便操作，新订单只需要看是否需要修改对应产品信息)', '提示', {
        confirmButtonText: '确认新增订单',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   message: '新增成功!'
        // });
        this.submitForm(formName, formName2, type)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

    submitForm(formName, formName2, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (Number(this.productForm.managementFeeFirst) <= 0) {
            this.$message.error('线路管理费必须大于0');
            return false;
          }
          if (this.postForm.product && this.postForm.product !== '') {
            this.$refs[formName2].validate((valid) => {
              if (valid) {
                if (this.btnPass) {
                  this.btnPass = false
                  this.disabled = true
                  this.submitFunction(type)
                }
              } else {
                console.log('error submit!!')
                return false
              }
            })
          } else {
            if (this.btnPass) {
              this.btnPass = false
              this.disabled = true
              this.submitFunction(type)
            }
          }
        } else {
          console.log('error submit!!')
          this.$message.error('请填写完整资料');
          return false
        }
      })
    },
    submitFunction(type) {
      postSigning({
        'orderId': this.orderId,
        'orderCommitState': type,
        'driverBasicInfoForGeneraNewOrder': {
          'accountName': this.postForm.accountName,
          'bidId': this.bidId,
          'bankName': this.postForm.bankName,
          'accountOpeningBranch': this.postForm.accountOpeningBranch,
          'cardNumber': this.postForm.cardNumber,
          // 'contractEnd': this.postForm.contractEnd,
          // 'contractStart': this.postForm.contractStart,
          'driverId': this.postForm.driverId,
          'idNumber': this.postForm.idNumber,
          'driverPhone': this.postForm.driverPhone,
          'address': this.postForm.address,
          'carType': this.postForm.carType,
          'driverName': this.postForm.driverName,
          'workCity': this.postForm.workCity
        },
        'productInfoForGeneraNewOrder': {
          'totalOrder': this.productForm.totalOrder,
          'insuranceNeed': this.productForm.insuranceNeed,
          'purchaseWay': this.productForm.purchaseWay,
          'productId': this.postForm.product,
          'annualizedRate': this.productForm.annualizedRate,
          'autoInsuranceStaging': this.productForm.autoInsuranceStaging,
          'bareCarDownPayment': this.productForm.bareCarDownPayment,
          'boardFee': this.productForm.boardFee,
          'brand': this.productForm.brand,
          'carModel': this.productForm.carModel,
          'city': this.productForm.city,
          'cityName': this.productForm.cityName,
          'commercialInsurance': this.productForm.commercialInsurance,
          'insuranceType': this.productForm.insuranceType,
          'commission': this.productForm.commission,
          'downPaymentCalc': this.productForm.downPaymentCalc,
          'driverMonthIncome': this.productForm.driverMonthIncome,
          'financialFeeStaging': Number(this.productForm.financialFeeStaging),
          'financialFees': this.productForm.financialFees,
          'financialName': this.productForm.financialName,
          'financianlNeed': this.productForm.financianlNeed,
          'gpsname': this.productForm.gpsname,
          'gpsneed': this.productForm.gpsneed,
          'gpsprice': this.productForm.gpsprice,
          'gpsstaging': this.productForm.gpsstaging,
          'insuranceName': this.productForm.insuranceName,
          'lineManagementFee': this.productForm.lineManagementFee,
          'loanAmount': this.productForm.loanAmountCalc,
          'loanAmountCalc': this.productForm.loanAmountCalc,
          'loanDeposit': this.productForm.loanDeposit,
          'monthCount': this.productForm.monthCount,
          'monthCountAll': this.productForm.monthCountAll,
          'monthPaymentCalc': this.productForm.monthPaymentCalc,
          'noTax': this.productForm.noTax,
          'otherCarPurchaseServices': this.productForm.otherCarPurchaseServices,
          'otherNeed': this.productForm.otherNeed,
          'parameter': this.productForm.parameter,
          'paymentRatio': this.productForm.paymentRatio,
          'productName': this.productForm.productName,
          'protectAmountCalc': this.productForm.protectAmountCalc,
          'purchaseTax': this.productForm.purchaseTax,
          'purchaseTaxStaging': Number(this.productForm.purchaseTaxStaging),
          'stagingParam': this.productForm.stagingParam,
          'stagingParamName': this.productForm.stagingParamName,
          'taxRate': 1,
          'tempBoardFee': this.productForm.tempBoardFee,
          'toPayHighInsurance': this.productForm.toPayHighInsurance,
          'totalInterestCalc': this.productForm.totalInterestCalc,
          'totalPayment': this.productForm.totalPayment,
          'travelTax': this.productForm.travelTax,
          'yearOfCooperation': this.productForm.yearOfCooperation,
          'GPSNeed': this.productForm.GPSNeed,
          'GPSName': this.productForm.GPSName,
          'GPSPrice': this.productForm.GPSPrice,
          'GPSStaging': this.productForm.GPSStaging,
          'managementFeeFirst': this.productForm.managementFeeFirst,
          'totalInsurance': this.productForm.totalInsurance,
          'last4Nums': this.productForm.last4Nums,
          'depositViolation': this.productForm.depositViolation
        }
      }).then(res => {
        if (res.data.success) {
          if (res.data.data.flag) {
            if (type === 1) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              setTimeout(() => {
                this.$router.push({ name: 'PendOrder' })
              }, 1000)
            } else if (type === 2) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              setTimeout(() => {
                this.$router.push({ name: 'PendOrder' })
              }, 1000)
            } else if (type === 3) {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.btnPass = true
              this.disabled = false
            } else if (type === 4) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              setTimeout(() => {
                this.$router.push({ name: 'PendOrder' })
              }, 1000)
            }
          } else {
            this.$message.error(res.data.data.msg);
            this.btnPass = true
            this.disabled = false
          }
        } else {
          this.$message.error(res.data.errorMsg);
          this.btnPass = true
          this.disabled = false
        }
      }).catch(err => {
        this.$message.error(err);
        this.btnPass = true
        this.disabled = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .creatOrder{
   padding-right:20px;
   box-sizing: border-box;
   padding-left: 0;
   .optDriver{
     margin-right:20px;
   }
   .product{
     padding:0 15px;
     box-sizing: border-box;
     .el-card.is-always-shadow{
       box-shadow: none;
       margin-bottom:25px;
     }
     .el-card__body{
       padding-bottom: 0;
     }
     .totalBox{
       width: 100%;
       padding:20px 0;
       box-sizing: border-box;
       overflow: hidden;
       .el-col-12{
         text-align: right;
       }
     }
   }
 }
</style>
