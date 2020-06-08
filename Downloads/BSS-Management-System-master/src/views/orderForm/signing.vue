<template>
  <div class="signing">
    <mallki text="确认签约信息" class-name="mallki-text"/>
    <el-timeline>
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <el-timeline-item v-if="tenderDetail.customerName" timestamp="线路标书信息" placement="top">
          <el-card>
            <el-row :gutter="24">
              <!--<div class="orderInformation">-->
              <!--<el-button style="float: right;" type="primary" icon="el-icon-edit" circle @click="changEditor"></el-button>-->
              <!--</div>-->
              <el-col :span="6">
                <div class="width100 line_height25 fontSize14 defaultColor"><span class="bold el-button--primary is-plain no-bg">货主编号：</span>{{ tenderDetail.customerId }}</div>
                <div class="width100 line_height25 fontSize14 defaultColor"><span class="bold el-button--primary is-plain no-bg">线路编号：</span>{{ tenderDetail.lineId }}</div>
                <div class="width100 line_height25 fontSize14 defaultColor"><span class="bold el-button--primary is-plain no-bg">标书编号：</span>{{ tenderDetail.bidId }}</div>
              </el-col>
              <el-col :span="6">
                <div class="width100 line_height25 fontSize14 defaultColor">{{ tenderDetail.customerName }}</div>
                <div class="width100 line_height25 fontSize14 defaultColor">{{ tenderDetail.lineName }}</div>
                <div class="width100 line_height25 fontSize14 defaultColor"><span class="bold el-button--primary is-plain no-bg">仓库位置：</span>{{ tenderDetail.warehouse }}</div>
              </el-col>
              <el-col :span="6">
                <div class="width100 line_height25 fontSize14 defaultColor"><span class="bold el-button--primary is-plain no-bg">货主报价：</span>{{ tenderDetail.preLowestQuotations }}元</div>
                <div class="width100 line_height25 fontSize14 defaultColor">{{ tenderDetail.cityName }}</div>
                <div class="width100 line_height25 fontSize14 defaultColor">
                  <el-popover
                    placement="right"
                    width="400"
                    trigger="click">
                    <div v-for="item in timeList" :key="item.id">配送时间：<span class="moreBtnNum">{{ item.workingTimeStart }} - {{ item.workingTimeEnd }}</span></div>
                    <el-button slot="reference" class="moreBtn" @click="MoreTime(tenderDetail.lineId)"><span class="">配送趟数：</span>{{ tenderDetail.dayNum }}<i class="el-icon-caret-bottom"></i></el-button>
                  </el-popover>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="width100 line_height25 fontSize14 defaultColor"><span class="bold el-button--primary is-plain no-bg">提交时间：</span></div>
                <div class="width100 line_height25 fontSize14 defaultColor">{{ tenderDetail.createDate }}</div>
                <div class="width100 line_height25 fontSize14 defaultColor">{{ tenderDetail.createrName }}</div>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="基本信息" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-form-item label-width="110px" label="姓名" prop="name" class="postInfo-container-item inlineBlock">
                  <el-input v-model="postForm.driverName" placeholder="请输入姓名" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="110px" label="身份证号" prop="idNumber" class="postInfo-container-item inlineBlock">
                  <el-input v-model="postForm.idNumber" placeholder="请输入身份证号码" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="110px" label="联系电话" prop="phone" class="postInfo-container-item inlineBlock">
                  <el-input v-model="postForm.driverPhone" type="number" placeholder="请输入联系电话" />
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
              <!--<el-col :span="8">-->
              <!--<el-form-item label-width="110px" label="合同签约时间" prop="contractStart" class="postInfo-container-item inlineBlock">-->
              <!--<el-date-picker-->
              <!--v-model="postForm.contractStart"-->
              <!--:picker-options="pickerBeginDateBefore"-->
              <!--type="date"-->
              <!--style="width: auto"-->
              <!--value-format="timestamp"-->
              <!--placeholder="请选择合同签约时间">-->
              <!--</el-date-picker>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
            </el-row>
            <!--<el-row :gutter="24">-->
            <!--<el-col :span="8">-->
            <!--<el-form-item label-width="110px" label="合同终止时间" prop="contractEnd" class="postInfo-container-item inlineBlock">-->
            <!--<el-date-picker-->
            <!--v-model="postForm.contractEnd"-->
            <!--:picker-options="pickerBeginDateAfter"-->
            <!--type="date"-->
            <!--style="width: auto"-->
            <!--value-format="timestamp"-->
            <!--placeholder="请选择合同终止时间">-->
            <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--</el-row>-->
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="产品信息" placement="top">
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
            </el-row>
            <el-row v-loading="loading" v-if="postForm.product" :gutter="24">
              <el-form ref="productForm" :model="productForm" :rules="rules2" class="form-container">
                <div class="product">
                  <el-collapse v-model="activeNames">
                    <el-collapse-item title="产品方案" name="1">
                      <el-card>
                        <el-row>
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                              <el-form-item label-width="110px" label="车辆品牌型号" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.brand" placeholder="请输入车辆品牌型号" disabled="disabled"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="承保公司" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.insuranceName" placeholder="请输入承保公司" disabled="disabled"/>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                              <el-form-item label-width="110px" label="车价" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.noTax" placeholder="请输入车价" disabled="disabled"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="购置税" prop="purchaseTax" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.purchaseTax" type="number" style="width:180px;" placeholder="请输入购置税" />
                              </el-form-item>
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
                          </el-col>
                        </el-row>
                      </el-card>

                      <el-card>
                        <el-row>
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                              <el-form-item label-width="110px" label="GPS厂商名称" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.gpsname" placeholder="请输入GPS厂商名称" disabled="disabled"/>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                              <el-form-item label-width="110px" label="GPS金额" prop="gpsprice" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.gpsprice" type="number" placeholder="请输入GPS金额" />
                              </el-form-item>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>

                      <el-card>
                        <el-row>
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                              <el-form-item label-width="110px" label="其他购车服务" class="postInfo-container-item inlineBlock"></el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="grid-content bg-purple-light">
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

                      <el-card>
                        <el-row>
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                              <el-form-item label-width="110px" label="金融服务商" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.financialName" placeholder="请输入金融服务商" disabled="disabled"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="还款期数" prop="stagingParam" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.stagingParam" placeholder="请选择还款期数">
                                  <el-option
                                    v-for="item in productForm.staging"
                                    :key="item.proCardFee"
                                    :value="item.proCardFee"
                                    :label="item.proCardFeeName">
                                  </el-option>
                                </el-select>
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
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                              <el-form-item label-width="110px" label="金融手续费" prop="financialFees" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.financialFees" type="number" placeholder="请输入金融手续费" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="贷款保证金" prop="loanDeposit" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.loanDeposit" type="number" placeholder="请输入贷款保证金" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="首付比(0-1)" prop="paymentRatio" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.paymentRatio" type="number" max="1" min="0" style="width:180px;" placeholder="请输入首付比" @input="checkNumber(productForm.paymentRatio)" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="首付" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.downPaymentCalc" placeholder="请输入首付" disabled="disabled"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="贷款金额" prop="loanAmountCalc" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.loanAmountCalc" type="number" placeholder="请输入贷款金额" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="月费率" prop="annualizedRate" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.annualizedRate" type="number" max="1" min="0" style="width:180px;" placeholder="请输入年费率" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="月供" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.monthPaymentCalc" placeholder="请输入月供" disabled="disabled"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="货主总利息" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.totalInterestCalc" placeholder="请输入货主总利息" disabled="disabled"/>
                              </el-form-item>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>
                    </el-collapse-item>
                    <el-collapse-item title="保活方案" name="2">
                      <el-card>
                        <el-row>
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                              <el-form-item label-width="110px" label="司机月收入" prop="driverMonthIncome" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.driverMonthIncome" type="number" placeholder="请输入司机月收入" />
                              </el-form-item>
                              <el-form-item label-width="110px" label="合作期限" prop="yearOfCooperation" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.yearOfCooperation" placeholder="请选择合作期限">
                                  <!--<el-option label="3个月" value="0.25"></el-option>-->
                                  <el-option label="1年" value="1"></el-option>
                                  <el-option label="2年" value="2"></el-option>
                                  <el-option label="3年" value="3"></el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                              <el-form-item label-width="110px" label="收入保障" prop="protectAmountCalc" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.protectAmountCalc" placeholder="请输入收入保障"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="违章押金" prop="depositViolation" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.depositViolation" placeholder="请输入收入保障"/>
                              </el-form-item>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>
                    </el-collapse-item>
                    <el-collapse-item title="首次支付费用总计" name="3">
                      <el-card>
                        <el-row>
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                              <el-form-item label-width="110px" label="裸车首付" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.bareCarDownPayment" placeholder="请输入购车首付" disabled="disabled"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="其他购车服务" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.otherCarPurchaseServices" placeholder="请输入其他购车服务" disabled="disabled"/>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                              <el-form-item label-width="110px" label="线路管理费" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.lineManagementFee" placeholder="请输入线路管理费" disabled="disabled"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="支付渠道" prop="yearOfCooperation" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.purchaseWay" placeholder="请选择支付渠道">
                                  <el-option
                                    v-for="item in payList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>
                      <div class="totalBox">
                        <el-col :span="12">
                          <div class="grid-content bg-purple">
                            <el-form-item label-width="110px" label="首次支付总计" class="postInfo-container-item inlineBlock">
                              <el-tag type="success">{{ productForm.totalPayment }}</el-tag>
                            </el-form-item>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple-light">
                            <el-form-item label-width="110px" label="贷款总额" class="postInfo-container-item inlineBlock">
                              <el-tag>{{ productForm.loanAmountCalc }}</el-tag>
                            </el-form-item>
                          </div>
                        </el-col>
                      </div>
                    </el-collapse-item>
                  <!--<el-collapse-item title="上传凭证" name="4">-->
                  <!--<el-card>-->
                  <!--<el-row>-->
                  <!--<el-col :span="12">-->
                  <!--<el-form-item label-width="150px" label="线路管理费支付凭证" prop="lineManagementFeePaymentVoucher" class="postInfo-container-item inlineBlock">-->
                  <!--<el-upload-->
                  <!--:action="getImgUrls"-->
                  <!--:headers="myHeaders"-->
                  <!--:on-preview="handlePictureCardPreview"-->
                  <!--:on-remove="handleRemove"-->
                  <!--:on-success="handleUpSuccess"-->
                  <!--:file-list="productForm.lineManagementFeePaymentVoucher"-->
                  <!--list-type="picture-card">-->
                  <!--<i class="el-icon-plus"></i>-->
                  <!--</el-upload>-->
                  <!--<el-dialog :visible.sync="dialogVisible">-->
                  <!--<img :src="dialogImageUrl" width="100%" alt="">-->
                  <!--</el-dialog>-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--<el-col :span="12">-->
                  <!--<el-form-item label-width="150px" label="违章押金支付凭证" class="postInfo-container-item inlineBlock">-->
                  <!--<el-upload-->
                  <!--:action="getImgUrls"-->
                  <!--:headers="myHeaders"-->
                  <!--:on-preview="handlePictureCardPreview2"-->
                  <!--:on-remove="handleRemove2"-->
                  <!--:on-success="handleUpSuccess2"-->
                  <!--:file-list="productForm.violationDepositPaymentVoucher"-->
                  <!--list-type="picture-card">-->
                  <!--<i class="el-icon-plus"></i>-->
                  <!--</el-upload>-->
                  <!--<el-dialog :visible.sync="dialogVisible2">-->
                  <!--<img :src="dialogImageUrl2" width="100%" alt="">-->
                  <!--</el-dialog>-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->
                  <!--</el-row>-->
                  <!--</el-card>-->
                  <!--</el-collapse-item>-->
                  </el-collapse>
                </div>
              </el-form>
            </el-row>
          </el-card>
        </el-timeline-item>
        <el-timeline-item v-if="postForm.product" timestamp="银行及第三方认证信息" placement="top">
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
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-form-item label-width="110px" label="开户支行" prop="accountOpeningBranch" class="postInfo-container-item inlineBlock">
                  <el-input v-model="postForm.accountOpeningBranch" placeholder="请输入开户支行" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="确认成交" placement="top">
          <el-card>
            <div>
              <el-button :disabled="disabled" type="primary" @click="submitForm('postForm', 'productForm')">确认签约成交</el-button>
              <el-button @click="resetForm('postForm')">重置</el-button>
            </div>
          </el-card>
        </el-timeline-item>
      </el-form>
    </el-timeline>
  </div>
</template>

<script>
import '@/styles/qiaoyu.scss'
import { dictionary } from '@/api/common'
import { GetLineTender, GetDriver, GetProduct, getProductDetail, postSigning } from '@/api/order/order-api'
import { getTenderTime } from '@/api/carline/carline-api'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  name: 'Signing',
  components: { Mallki },
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
    var token = localStorage.getItem('Admin-Token')
    return {
      bidId: '',
      driverId: '',
      tenderDetail: {},
      loading: false,
      radioIndex: '',
      productSolution: [],
      cityList: [],
      btnPass: true,
      disabled: false,
      inputMaxL: 2,
      detail: {
        customer: ''
      },
      postForm: {
        driverName: '',
        idNumber: '',
        driverPhone: '',
        census: [],
        address: '',
        workCity: '',
        contractStart: '',
        contractEnd: '',
        bankName: '',
        product: '',
        accountName: '',
        accountOpeningBranch: '',
        cardNumber: ''
      },
      rules: {
        driverName: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        idNumber: [{ required: true, validator: validateIdCard, trigger: 'change' }],
        driverPhone: [{ required: true, validator: validatePhone, trigger: 'change' }],
        census: [{ required: true, message: '请选择户籍地址', trigger: 'change' }],
        address: [{ required: true, message: '请输入现居住地址', trigger: 'change' }],
        workCity: [{ required: true, message: '请选择工作城市', trigger: 'change' }],
        contractStart: [{ required: false, message: '请选择合同签约时间', trigger: 'change' }],
        contractEnd: [{ required: false, message: '请选择合同终止时间', trigger: 'change' }],
        bankName: [{ required: true, message: '请输入开户银行', trigger: 'change' }],
        product: [{ required: false, message: '请选择产品方案', trigger: 'change' }],
        accountName: [{ required: true, message: '请输入银行开户名', trigger: 'change' }],
        cardNumber: [{ required: true, message: '请输入银行账号', trigger: 'change' }],
        accountOpeningBranch: [{ required: true, message: '请输入支行账户', trigger: 'change' }]
      },
      productForm: {
        paymentRatio: '',
        annualizedRate: '',
        commercialInsurance: '',
        gpsprice: '',
        boardFee: '',
        tempBoardFee: '',
        stagingParam: '',
        financialFees: '',
        loanDeposit: '',
        purchaseTaxStaging: '',
        purchaseTax: '',
        toPayHighInsurance: '',
        travelTax: '',
        autoInsuranceStaging: '',
        gpsstaging: '',
        loanAmountCalc: '',
        protectAmountCalc: 0,
        depositViolation: '',
        financialFeeStaging: '',
        lineManagementFeePaymentVoucher: [],
        violationDepositPaymentVoucher: []
      },
      rules2: {
        commercialInsurance: [{ required: true, message: '请输入商业险', trigger: 'change' }],
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
        protectAmountCalc: [{ required: true, message: '请输入收入保障', trigger: 'change' }]
      },
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          const beginDateVal = this.postForm.contractEnd;
          if (beginDateVal) {
            return time.getTime() > beginDateVal;
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          const beginDateVal = this.postForm.contractStart;
          if (beginDateVal) {
            return time.getTime() < beginDateVal;
          }
        }
      },
      activeNames: ['1', '2', '3', '4'],
      censusOption: [{
        label: '江苏',
        cities: []
      }, {
        label: '浙江',
        cities: []
      }],
      props: {
        value: 'label',
        children: 'cities'
      },
      multipleSelection: [],
      orderId: '',
      timeList: [],
      getImgUrls: this.getImgUrl(),
      myHeaders: { Authorization: token },
      dialogVisible: false,
      dialogVisible2: false,
      dialogImageUrl: '',
      dialogImageUrl2: '',
      payList: []
    }
  },
  watch: {
    'productForm.stagingParam'(val) {
      this.productForm.staging.forEach(item => {
        if (item.proCardFee === val) {
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
      this.calcOtherCarPurchaseServices()
    },
    'productForm.toPayHighInsurance'(val) {
      this.calcTotal()
      this.calcOtherCarPurchaseServices()
    },
    'productForm.travelTax'(val) {
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
    },
    'productForm.otherCarPurchaseServices'(val) {
      this.calcOtherCarPurchaseServices()
      this.calcTotal()
    },
    'productForm.lineManagementFee'(val) {
      this.calcLineManagementFee()
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
      this.calcOtherCarPurchaseServices()
    },
    'productForm.gpsprice'(val) {
      this.calcMonthPaymentCalc()
      this.calcTotal()
      this.calcOtherCarPurchaseServices()
    }
  },
  created() {},
  mounted() {
    const bidId = this.$route.query.bidId;
    const driverId = this.$route.query.driverId;
    const orderId = this.$route.query.orderId;
    this.bidId = bidId;
    this.driverId = driverId;
    this.orderId = orderId;
    this.fetchData();
    this.getDetail(bidId, driverId, orderId);
  },
  methods: {
    // 购置税
    calcPurchaseTax() {
      let num = (Number(this.productForm.noTax) / 11.6).toFixed(2)
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
      // let num = Number(this.productForm.protectAmountCalc) * Number(this.productForm.commission)
      // if (num < this.productForm.carModelManagementFee) {
      //   this.productForm.lineManagementFee = this.productForm.carModelManagementFee
      // } else {
      //   this.productForm.lineManagementFee = num
      // }
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
      const num = Number(this.productForm.noTax) * Number(this.productForm.paymentRatio) + Number(this.productForm.lineManagementFee) + Number(this.productForm.otherCarPurchaseServices)
      this.productForm.totalPayment = num.toFixed(2)
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
    },
    getDetail(bidId, driverId, orderId) {
      // 获取线路详情
      if (bidId) {
        GetLineTender({
          tenderId: bidId
        }).then(res => {
          if (res.data.success) {
            let data = res.data.data;
            Object.keys(data).forEach((key) => {
              data[key] = String(data[key])
            })
            this.tenderDetail = data;
          }
        }).catch(err => {
          this.$message.error(err);
        })
      }
      // 获取司机详情
      // GetDriver({
      //   driverId: driverId
      // }).then(res => {
      //   if (res.data.success) {
      //     let data = res.data.data;
      //     Object.keys(data).forEach((key) => {
      //       if (data[key] !== null) {
      //         data[key] = String(data[key])
      //       }
      //     })
      //     this.postForm = data;
      //     GetProduct({
      //       city: data.workCity
      //     }).then(res => {
      //       if (res.data.success) {
      //         this.productSolution = res.data.data
      //       }
      //     })
      //   }
      // }).catch(err => {
      //   this.$message.error(err);
      // })
      GetDriver({
        orderId: orderId
      }).then(res => {
        if (res.data.success) {
          let detail = res.data.data;
          let data = Object.assign(detail.driverBasicInfoForGeneraNewOrder, detail.productInfoForGeneraNewOrder, { orderId: detail.orderId })
          Object.keys(data).forEach((key) => {
            if (data[key] !== null) {
              data[key] = String(data[key])
            }
          })
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
          detail.protectAmountCalc = 0
          this.productForm = Object.assign(this.productForm, detail)
          this.calcPurchaseTax()
          this.calcProtectAmountCalc()
          this.calcTotalInterestCalc()
          this.calcDownPaymentCalc()
          this.loading = false
        }
      })
    },
    changEditor() {
      this.dialogFormVisible = true;
    },
    handleItemChange(val) {
      setTimeout(_ => {
        if (val.indexOf('江苏') > -1 && !this.censusOption[0].cities.length) {
          this.censusOption[0].cities = [{
            label: '南京'
          }];
        } else if (val.indexOf('浙江') > -1 && !this.censusOption[1].cities.length) {
          this.censusOption[1].cities = [{
            label: '杭州'
          }];
        }
      }, 300);
    },
    submitForm(formName, formName2) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.productForm.product) {
            this.$refs[formName2].validate((valid) => {
              if (valid) {
                if (this.btnPass) {
                  this.btnPass = false
                  this.disabled = true
                  let violationDepositPaymentVoucher = [];
                  let lineManagementFeePaymentVoucher = [];
                  if (this.productForm.lineManagementFeePaymentVoucher.length) {
                    this.productForm.lineManagementFeePaymentVoucher.map(item => {
                      lineManagementFeePaymentVoucher.push(item.url)
                    })
                  }
                  if (this.productForm.violationDepositPaymentVoucher.length) {
                    this.productForm.violationDepositPaymentVoucher.map(item => {
                      violationDepositPaymentVoucher.push(item.url)
                    })
                  }
                  this.signingPost(lineManagementFeePaymentVoucher, violationDepositPaymentVoucher)
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
              let violationDepositPaymentVoucher = [];
              let lineManagementFeePaymentVoucher = [];
              this.signingPost(lineManagementFeePaymentVoucher, violationDepositPaymentVoucher)
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    signingPost(lineManagementFeePaymentVoucher, violationDepositPaymentVoucher) {
      postSigning({
        'orderId': this.orderId,
        'tenderId': this.bidId,
        'driverConfirmContractFORM': {
          'accountName': this.postForm.accountName,
          'bidId': this.bidId,
          'bankName': this.postForm.bankName,
          'cardNumber': this.postForm.cardNumber,
          'accountOpeningBranch': this.postForm.accountOpeningBranch,
          // 'contractEnd': this.postForm.contractEnd,
          // 'contractStart': this.postForm.contractStart,
          'driverId': this.driverId,
          'idNumber': this.postForm.idNumber,
          'phone': this.postForm.phone,
          'address': this.postForm.address
        },
        'productProgramDetailRealFORM': {
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
          'commission': this.productForm.commission,
          'downPaymentCalc': this.productForm.downPaymentCalc,
          'driverMonthIncome': this.productForm.driverMonthIncome,
          'financialFeeStaging': Number(this.productForm.financialFeeStaging),
          'financialFees': this.productForm.financialFees,
          'financialName': '北京4s店金融服务商',
          'financianlNeed': this.productForm.financialFeeStaging,
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
          'totalOrder': this.productForm.totalPayment,
          'travelTax': this.productForm.travelTax,
          'yearOfCooperation': this.productForm.yearOfCooperation,
          'GPSNeed': this.productForm.GPSNeed,
          'GPSName': this.productForm.GPSName,
          'GPSPrice': this.productForm.GPSPrice,
          'GPSStaging': this.productForm.GPSStaging,
          'depositViolation': this.productForm.depositViolation,
          'lineManagementFeePaymentVoucher': lineManagementFeePaymentVoucher.toString(),
          'violationDepositPaymentVoucher': violationDepositPaymentVoucher.toString()
        }
      }).then(res => {
        if (res.data.success) {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push({ path: '/order-list' })
          }, 1000)
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleCurrentChange(val, index) {
      this.currentRow = val;
      this.$emit('data', val.pkg);
    },
    checkNumber(withdrawAmount) {
      this.productForm.paymentRatio = (withdrawAmount.match(/^\d*(\.?\d{0,2})/g)[0]) || null
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
    // 上传凭照
    handleRemove(file, fileList) {
      this.productForm.lineManagementFeePaymentVoucher = []
      fileList.map(item => {
        this.productForm.lineManagementFeePaymentVoucher.push({ name: 'image', url: item.url })
      })
    },
    handleRemove2(file, fileList) {
      this.productForm.violationDepositPaymentVoucher = []
      fileList.map(item => {
        this.productForm.violationDepositPaymentVoucher.push({ name: 'image', url: item.url })
      })
    },
    handleUpSuccess(res) {
      if (res.success) {
        this.productForm.lineManagementFeePaymentVoucher.push({ name: 'image', url: res.data.url })
      } else {
        this.$message.error('上传图片错误：' + res);
      }
    },
    handleUpSuccess2(res) {
      if (res.success) {
        this.productForm.violationDepositPaymentVoucher.push({ name: 'image', url: res.data.url })
      } else {
        this.$message.error('上传图片错误：' + res);
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl2 = file.url;
      this.dialogVisible2 = true;
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
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
  .signing{
    padding:20px;
    box-sizing: border-box;
    .product{
      padding:0 20px;
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
    .el-timeline{
      padding-top: 20px;
      padding-left: 0;
    }
    .orderInformation{
      font-size: 14px;
      position: relative;
      .el-button{
        position: absolute;
        right: 20px;
        top: 10px;
      }
    }

    .el-button--primary.is-plain.no-bg{
      background: none;
      .val{
        color:#606266;
        font-weight: normal;
      }
    }
    .no-bg:hover{
      background: none !important;
      color: #409EFF !important;
    }
    .findBox{
      padding-bottom:20px;
    }
    .table_box{
      max-height: 460px;
      overflow: auto;
    }
    .moreBtn{
       border:none;
       background:none;
       text-align: left;
       padding: 0;
     }
  }
  .moreBtnNum{
    color:#409EFF;
    padding:0 10px;
  }
</style>
