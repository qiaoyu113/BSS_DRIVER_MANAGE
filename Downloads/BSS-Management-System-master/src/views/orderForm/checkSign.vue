<template>
  <div class="checkSign">
    <div class="mallki">
      <mallki text="确认签约信息" class-name="mallki-text"/>
    </div>
    <el-timeline>
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <el-timeline-item timestamp="基础信息" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-form-item label-width="110px" label="选择司机" prop="driverVal" class="postInfo-container-item inlineBlock">
              <el-select
                v-model="postForm.driverId"
                :remote-method="remoteMethod"
                :loading="loading"
                filterable
                remote
                reserve-keyword
                disabled="disabled"
                placeholder="请输入并选择司机"
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
              <el-collapse v-if="postForm.driverId && clueShow" v-model="activeNames">
                <el-collapse-item title="订单归属" name="3">
                  <el-card>
                    <el-row :gutter="24">
                      <el-col :span="8">
                        <el-form-item label-width="150px" label="订单归属" prop="busiType" class="postInfo-container-item">
                          <el-select v-model="postForm.busiType" placeholder="请选择订单归属" disabled>
                            <el-option key="wt" value="0" label="梧桐专车"></el-option>
                            <el-option key="pt" value="1" label="梧桐共享"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-collapse-item>
              </el-collapse>
              <el-collapse v-if="postForm.driverId" v-model="activeNames">
                <el-collapse-item title="司机信息" name="1">
                  <el-card>
                    <el-row :gutter="24">
                      <el-col :span="8">
                        <el-form-item label-width="110px" label="姓名" prop="name" class="postInfo-container-item inlineBlock">
                          <el-input v-model="postForm.driverName" placeholder="请输入姓名" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label-width="110px" label="联系电话" prop="phone" class="postInfo-container-item inlineBlock">
                          <el-input v-model="postForm.driverPhone" placeholder="请输入联系电话" />
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
                    </el-row>

                    <el-row :gutter="24">
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
          <el-timeline-item v-if="postForm.driverId" timestamp="合作模式" placement="top">
            <el-card>
              <el-form-item label="" style="text-align: center;margin-bottom: 0;" prop="cooperationModel">
                <el-radio-group v-model="productForm.cooperationModel">
                  <el-radio border label="购车" value="1"></el-radio>
                  <el-radio border label="租车" value="2"></el-radio>
                  <el-radio border label="带车" value="3"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-card>
          </el-timeline-item>
          <el-timeline-item v-if="productForm.cooperationModel" timestamp="收入/支出" placement="top">
            <el-card>
              <el-row v-loading="loading" :gutter="24">
                <div class="product">
                  <el-collapse v-model="activeNames">
                    <el-collapse-item title="保活方案" name="2">
                      <el-card>
                        <el-row>
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                              <el-form-item label-width="110px" label="首次付出总计:" class="postInfo-container-item inlineBlock">
                                <span style="color: #67C23A; font-weight: bold;">{{ productForm.totalPayment }}</span>
                              </el-form-item>
                              <el-form-item label-width="110px" label="订单金额总计:" class="postInfo-container-item inlineBlock">
                                <span style="color: #67C23A; font-weight: bold;">{{ productForm.totalOrder }}</span>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                              <el-form-item label-width="150px" label="合作期限" prop="yearOfCooperation" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.yearOfCooperation" placeholder="请选择合作期限">
                                  <!--<el-option label="3个月" value="0.25"></el-option>-->
                                  <el-option label="1年" value="1"></el-option>
                                  <el-option label="2年" value="2"></el-option>
                                  <el-option label="3年" value="3"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label-width="150px" label="收入保障" prop="protectAmountCalc" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.protectAmountCalc" placeholder="请选择收入保障">
                                  <el-option
                                    v-for="item in protectAmountCalcList"
                                    :key="item.codeVal"
                                    :label="item.code"
                                    :value="item.codeVal">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label-width="150px" label="线路管理费" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.lineManagementFee" prop="lineManagementFee" placeholder="请选择线路管理费" @change="changelineManagementFee">
                                  <el-option
                                    v-for="item in lineManagementFeeList"
                                    :key="item.codeVal"
                                    :label="item.code"
                                    :value="item.codeVal">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label-width="150px" label="支付渠道" prop="purchaseWay" class="postInfo-container-item inlineBlock">
                                <el-select v-model="productForm.purchaseWay" placeholder="请选择支付渠道">
                                  <el-option
                                    v-for="item in payList"
                                    :key="item.codeVal"
                                    :label="item.code"
                                    :value="item.codeVal">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item v-if="productForm.lineManagementFee" label-width="150px" label="管理费首款" prop="managementFeeFirst" class="postInfo-container-item inlineBlock">
                                <el-input v-model="productForm.managementFeeFirst" type="number" min="0" placeholder="请输入管理费首款"/>
                              </el-form-item>
                              <el-form-item label-width="150px" label="交款流水号后四位" prop="managementFeeFirst" class="postInfo-container-item inlineBlock">
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
          <el-timeline-item v-if="postForm.driverId && productForm.cooperationModel === '购车'" timestamp="产品信息" placement="top">
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
                                <el-input v-model="productForm.brand" placeholder="请输入车辆品牌型号" disabled="disabled"/>
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
                                <el-input v-model="productForm.insuranceName" placeholder="请输入承保公司" disabled="disabled"/>
                              </el-form-item>
                              <el-form-item label-width="110px" label="保险填写方式" prop="purchaseTaxStaging" class="postInfo-container-item inlineBlock">
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
                                    :label="item.proCardFeeName">
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
          <el-timeline-item v-if="productForm.cooperationModel === '租车'" timestamp="产品方案" placement="top">
            <el-card>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label-width="110px" label="租车车型" prop="carRentalType" class="postInfo-container-item inlineBlock">
                    <el-select v-model="productForm.carRentalType" placeholder="请选择租车车型">
                      <el-option
                        v-for="item in carRentalModel"
                        :key="item.productId"
                        :value="item.productId"
                        :label="item.productName">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="110px" label="租赁方式" prop="rentalMethod" class="postInfo-container-item inlineBlock">
                    <el-select v-model="productForm.rentalMethod" placeholder="请选择租赁方式">
                      <el-option label="总部租赁" value="1"></el-option>
                      <el-option label="雷鸟租赁" value="2"></el-option>
                      <el-option label="自拓租赁" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item v-if="productForm.rentalMethod" label-width="110px" label="租赁公司" prop="leasingCompany" class="postInfo-container-item inlineBlock">
                    <el-select v-if="productForm.rentalMethod === '1'" v-model="productForm.leasingCompany" placeholder="请选择租赁公司">
                      <el-option
                        v-for="item in rentalCompanies"
                        :key="item.productId"
                        :value="item.productId"
                        :label="item.productName">
                      </el-option>
                    </el-select>
                    <el-select v-if="productForm.rentalMethod === '2'" v-model="productForm.leasingCompany" placeholder="请选择租赁公司">
                      <el-option
                        v-for="item in rentalCompanies2"
                        :key="item.productId"
                        :value="item.productId"
                        :label="item.productName">
                      </el-option>
                    </el-select>
                    <el-select v-if="productForm.rentalMethod === '3'" v-model="productForm.leasingCompany" placeholder="请选择租赁公司">
                      <el-option
                        v-for="item in rentalCompanies3"
                        :key="item.productId"
                        :value="item.productId"
                        :label="item.productName">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
          <el-timeline-item v-if="productForm.cooperationModel === '带车'" timestamp="产品方案" placement="top">
            <el-card>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label-width="110px" label="带车车型" prop="productIdForOwnCar" class="postInfo-container-item inlineBlock">
                    <el-select v-model="productForm.productIdForOwnCar" placeholder="请选择带车车型">
                      <el-option
                        v-for="item in rentalCarType"
                        :key="item.productId"
                        :value="item.productId"
                        :label="item.productName">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
          <el-timeline-item v-if="postForm.driverId" timestamp="确认成交" placement="top">
            <el-card>
              <div>
                <el-button :disabled="disabled" type="primary" @click="submitForm('postForm', 'productForm', 2)">确认签约成交</el-button>
                <el-button @click="resetForm('postForm')">重置</el-button>
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
import { GetDriver, GetProduct, getProductDetail, postSigning, GetFinancialList, GetFinancialDetail, GetFinancialProvidersStaging, carRentalModelSelection, rentalCompaniesSelection, withCarModelSelection } from '@/api/order/order-api'
// import { GetLineTender, GetDriver, GetProduct, getProductDetail, postSigning } from '@/api/order/order-api'
import { getTenderTime } from '@/api/carline/carline-api'
import { GetDriverList } from '@/api/driver/driver-api'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  name: 'CheckSign',
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
    return {
      activeNames: ['1', '2', '3'],
      driverList: [],
      carRentalModel: [],
      rentalCompanies: [],
      rentalCompanies2: [],
      rentalCompanies3: [],
      rentalCarType: [],
      protectAmountCalcList: [],
      lineManagementFeeList: [],
      loading: false,
      disabled: false,
      btnPass: true,
      clueShow: true,
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
        busiType: '',
        accountOpeningBranch: '',
        product: '',
        accountName: '',
        cardNumber: '',
        purchaseWay: ''
      },
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
        accountOpeningBranch: [{ required: true, message: '请输入开户支行', trigger: 'change' }],
        // product: [{ required: true, message: '请选择产品方案', trigger: 'change' }],
        busiType: [{ required: true, message: '请选择订单归属', trigger: 'change' }],
        accountName: [{ required: true, message: '请输入银行开户名', trigger: 'change' }],
        cardNumber: [{ required: true, message: '请输入银行账号', trigger: 'change' }]
      },
      productForm: {
        paymentRatio: '',
        cooperationModel: '',
        last4Nums: '',
        annualizedRate: '',
        commercialInsurance: '',
        productIdForOwnCar: '',
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
        carRentalType: [{ required: true, message: '请选择租车车型', trigger: 'change' }],
        rentalMethod: [{ required: true, message: '请选择租赁方式', trigger: 'change' }],
        leasingCompany: [{ required: true, message: '请确认租赁公司', trigger: 'change' }],
        productIdForOwnCar: [{ required: true, message: '请选择带车车型', trigger: 'change' }],
        cooperationModel: [{ required: true, message: '请选择合作模式', trigger: 'change' }],
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
        protectAmountCalc: [{ required: true, message: '请选择收入保障', trigger: 'change' }],
        lineManagementFee: [{ required: true, message: '请选择线路管理费', trigger: 'change' }],
        managementFeeFirst: [{ required: true, message: '请选择管理费首款', trigger: 'change' }],
        insuranceType: [{ required: true, message: '请选择保险填写分类', trigger: 'change' }],
        totalInsurance: [{ required: true, message: '请输入保险总额', trigger: 'change' }],
        purchaseWay: [{ required: true, message: '请选择支付渠道', trigger: 'change' }]
      },
      cityList: [],
      payList: [],
      financialList: [],
      productSolution: [],
      productType: ['保险', 'GPS及其他服务', '金融'],
      bidId: '',
      lineManagementFeeMax: '',
      driverId: '',
      insuranceType: '',
      orderId: ''
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
    'productForm.managementFeeFirst'(val) {
      this.lineManagementFeeList.forEach((item) => {
        if (item.codeVal === this.productForm.lineManagementFee) {
          this.lineManagementFeeMax = Number(item.code)
        }
      })
      if (Number(val) > Number(this.lineManagementFeeMax)) {
        this.productForm.managementFeeFirst = this.lineManagementFeeMax
      }
      if (this.productForm.cooperationModel === '购车') {
        this.calcTotal()
      } else {
        this.productForm.totalPayment = this.productForm.managementFeeFirst
      }
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
      if (this.productForm.staging) {
        this.productForm.staging.forEach(item => {
          if (item.proCardFee === Number(val)) {
            item.annualizedRate = Number(item.annualizedRatePoint)
            item.paymentRatio = Number(item.paymentRatioPoint)
            this.productForm = Object.assign(this.productForm, item)
            this.productForm.purchaseTaxStaging = String(this.productForm.purchaseTaxStaging)
            this.productForm.autoInsuranceStaging = String(this.productForm.autoInsuranceStaging)
            this.productForm.financialFeeStaging = String(this.productForm.financialFeeStaging)
            this.productForm.gpsstaging = String(this.productForm.gpsstaging)
          }
        })
      }
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
    'productForm.cooperationModel'(val) {
      this.fetchData2()
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
    if (driverId) {
      this.remoteMethod(driverId)
      this.checkDiver();
    }
  },
  methods: {
    // 选择产品方案计算
    changeProductType() {
      if (this.productType.indexOf('保险') <= -1) {
        this.productForm.commercialInsurance = 0;
        this.productForm.toPayHighInsurance = 0;
        this.productForm.travelTax = 0;
        this.calcTotalInsurance()
        this.calcTotal()
        this.calcOrder()
      } else {
        if (this.postForm.product) {
          this.changProduct(this.postForm.product)
        }
      }
      if (this.productType.indexOf('GPS及其他服务') <= -1) {
        this.productForm.gpsprice = 0;
        this.productForm.boardFee = 0;
        this.productForm.tempBoardFee = 0;
      } else {
        if (this.postForm.product) {
          this.changProduct(this.postForm.product)
        }
      }
      if (this.productType.indexOf('金融') <= -1) {
        this.productForm.paymentRatio = 0;
        this.productForm.annualizedRate = 0;
        this.productForm.financialFees = 0;
        this.productForm.loanDeposit = 0;
        this.productForm.loanAmountCalc = 0;
        this.productForm.totalInterestCalc = 0;
        this.productForm.monthPaymentCalc = 0;
      } else {
        if (this.postForm.product) {
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
        // this.productForm.totalInsurance = ''
      }
    },
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
      // let num = Number(this.productForm.protectAmountCalc)
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
      let financialFees = 0
      if (this.productForm.financialFeeStaging === '2') {
        financialFees = this.productForm.financialFees
      }
      // const num = Number(this.productForm.noTax) * Number(this.productForm.paymentRatio) + Number(this.productForm.lineManagementFee) + Number(this.productForm.otherCarPurchaseServices)
      const num = Number(this.productForm.noTax) * Number(this.productForm.paymentRatio) + Number(this.productForm.purchaseTax) + Number(this.productForm.totalInsurance) + Number(this.productForm.boardFee) + Number(this.productForm.tempBoardFee) + Number(this.productForm.gpsprice) + Number(financialFees) + Number(this.productForm.managementFeeFirst)
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
      const num = Number(this.productForm.noTax) + Number(lineManagementFee) + Number(this.productForm.purchaseTax) + Number(this.productForm.totalInsurance) + Number(this.productForm.boardFee) + Number(this.productForm.tempBoardFee) + Number(this.productForm.gpsprice) + Number(financialFees)
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
    checkDiver() {
      this.fetchData()
      this.getDetail(this.orderId)
    },
    getDetail(orderId) {
      // 获取司机详情
      GetDriver({
        orderId: orderId
      }).then(res => {
        if (res.data.success) {
          let detail = res.data.data;
          let obj1 = detail.driverBasicInfoForGeneraNewOrder;
          let obj2 = Object.assign(detail.productInfoForGeneraNewOrder, detail.productInformationRequiredForCarRental, detail.incomeAndExpenditureInformation, { productIdForOwnCar: detail.productIdForOwnCar }, { cooperationModel: detail.cooperationModel }, { busiType: detail.busiType });
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
          if (obj2.cooperationModel === '1') {
            obj2.cooperationModel = '购车'
          } else if (obj2.cooperationModel === '2') {
            obj2.cooperationModel = '租车'
          } else if (obj2.cooperationModel === '3') {
            obj2.cooperationModel = '带车'
          }
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
          obj2.stagingParam = Number(obj2.stagingParam)
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
                obj1.busiType = obj2.busiType;
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
            obj1.busiType = obj2.busiType;
            this.postForm = obj1;
            this.productForm = obj2;
            this.calcLineManagementFee()
            this.fetchData2()
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
    changelineManagementFee(val) {
      this.lineManagementFeeList.forEach((item) => {
        if (item.codeVal === val) {
          this.lineManagementFeeMax = Number(item.code)
        }
      })
    },
    fetchData2() {
      // 租车车型
      carRentalModelSelection({
        city: this.postForm.workCity
      }).then(res => {
        if (res.data.success) {
          this.carRentalModel = res.data.data;
        }
      }).catch(err => {
        this.$message.error(err);
      })
      // 租赁公司总部
      rentalCompaniesSelection({
        city: this.postForm.workCity
      }).then(res => {
        if (res.data.success) {
          this.rentalCompanies = res.data.data.headquarters;
          this.rentalCompanies2 = res.data.data.thunder;
          this.rentalCompanies3 = res.data.data.self;
        }
      }).catch(err => {
        this.$message.error(err);
      })
      // 带车车型
      withCarModelSelection({
        city: this.postForm.workCity
      }).then(res => {
        if (res.data.success) {
          this.rentalCarType = res.data.data;
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
      // 收入保障
      dictionary({
        dictType: 'income_security'
      }).then(res => {
        if (res.data.success) {
          this.protectAmountCalcList = res.data.data;
        }
      }).catch(err => {
        this.$message.error(err);
      })
      // 线路管理费
      dictionary({
        dictType: 'line_management_fee'
      }).then(res => {
        if (res.data.success) {
          this.lineManagementFeeList = res.data.data;
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
          if (!this.postForm.driverId) {
            this.productForm.annualizedRate = ''
            this.productForm.paymentRatio = ''
          }
          detail.loanAmountCalc = 0
          detail.protectAmountCalc = 0
          detail.protectAmountCalc = this.productForm.protectAmountCalc
          detail.financialName = Number(detail.financialId)
          this.productForm = Object.assign(this.productForm, detail)
          this.calcPurchaseTax()
          this.calcProtectAmountCalc()
          this.calcTotalInterestCalc()
          this.calcDownPaymentCalc()
          this.getFinancial();
          this.changeFinancial(this.productForm.financialId)
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
      this.productForm.staging.forEach(items => {
        if (items.proCardFee === item) {
          this.productForm.paymentRatio = items.paymentRatioPoint
          this.productForm.annualizedRate = items.annualizedRatePoint
        }
      })
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
          this.$message.error('请填写完整资料');
          console.log('error submit!!')
          return false
        }
      })
    },
    submitFunction(type) {
      let cooperationModel = ''
      if (this.productForm.cooperationModel === '购车') {
        cooperationModel = 1
      } else if (this.productForm.cooperationModel === '租车') {
        cooperationModel = 2
      } else if (this.productForm.cooperationModel === '带车') {
        cooperationModel = 3
      }
      postSigning({
        'orderId': this.orderId,
        'cooperationModel': cooperationModel,
        'orderCommitState': type,
        'busiType': this.postForm.busiType,
        'productIdForOwnCar': this.productForm.productIdForOwnCar,
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
        'incomeAndExpenditureInformation': {
          'last4Nums': this.productForm.last4Nums,
          'lineManagementFee': this.productForm.lineManagementFee,
          'managementFeeFirst': this.productForm.managementFeeFirst,
          'protectAmountCalc': this.productForm.protectAmountCalc,
          'purchaseWay': this.productForm.purchaseWay,
          'yearOfCooperation': this.productForm.yearOfCooperation
        },
        'productInfoForGeneraNewOrder': {
          'totalOrder': this.productForm.totalOrder,
          'insuranceNeed': this.productForm.insuranceNeed,
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
          'GPSNeed': this.productForm.GPSNeed,
          'GPSName': this.productForm.GPSName,
          'GPSPrice': this.productForm.GPSPrice,
          'GPSStaging': this.productForm.GPSStaging,
          'totalInsurance': this.productForm.totalInsurance,
          'depositViolation': this.productForm.depositViolation
        },
        'productInformationRequiredForCarRental': {
          'carRentalType': this.productForm.carRentalType,
          'leasingCompany': this.productForm.leasingCompany,
          'rentalMethod': this.productForm.rentalMethod
        }
      }).then(res => {
        if (res.data.success) {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push({ path: '/pend-order' })
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .checkSign{
    padding-right:20px;
    box-sizing: border-box;
    padding-left: 0;
    .mallki{
      padding:20px;
      padding-bottom:0;
      box-sizing: border-box;
    }
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
