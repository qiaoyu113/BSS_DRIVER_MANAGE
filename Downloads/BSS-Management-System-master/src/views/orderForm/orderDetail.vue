<template>
  <div class="orderDetail">
    <el-form ref="productForm" :model="productForm" :rules="rules" class="form-container">
      <el-timeline>
        <el-timeline-item v-if="bidId !== 0" timestamp="选择标书" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>标书编号 </el-header>
                    <el-main>
                      <el-select v-model="tenderListId" placeholder="请选择" @change="changeTender">
                        <el-option
                          v-for="item in tenderList"
                          :key="item.bidId"
                          :label="item.bidId + ' ' + item.stateName"
                          :value="item.bidId">
                        </el-option>
                      </el-select>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
        <el-timeline-item v-if="bidId !== 0" timestamp="线路标书信息" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>货主编号 </el-header>
                    <el-main>{{ detail.customerId | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
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
                    <el-header>标书编号 </el-header>
                    <el-main>{{ detail.bidId | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>货主名称 </el-header>
                    <el-main>{{ detail.customerName | DataIsNull }}</el-main>
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
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>仓库位置 </el-header>
                    <el-main>{{ detail.warehouse | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>货主报价 </el-header>
                    <el-main>{{ detail.preLowestQuotations | DataIsNull }}</el-main>
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
                    <el-header>线路时间 </el-header>
                    <el-main>
                      <div v-for="item in detail.lineDeliveryInfoFORMS" :key="item.id">{{ item.workingTimeStart }}~{{ item.workingTimeEnd }}</div>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>提交时间 </el-header>
                    <el-main>{{ detail.createDate | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>

        <el-timeline-item timestamp="基本信息" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>姓名 </el-header>
                    <el-main>{{ driverDetail.driverName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>身份证号 </el-header>
                    <el-main>{{ driverDetail.idNumber | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>联系电话 </el-header>
                    <el-main>{{ driverDetail.driverPhone | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>现居住地址 </el-header>
                    <el-main>{{ driverDetail.address | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>工作城市 </el-header>
                    <el-main>{{ driverDetail.workCityName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>合同签约时间 </el-header>
                    <el-main>{{ driverDetail.contractStart | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>合同终止时间 </el-header>
                    <el-main>{{ driverDetail.contractEnd | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>

              <!--<el-col :span="8">-->
              <!--<el-card shadow="hover">-->
              <!--<el-container>-->
              <!--<el-header>成交时间 </el-header>-->
              <!--<el-main>{{ driverDetail.dealTime | DataIsNull }}</el-main>-->
              <!--</el-container>-->
              <!--</el-card>-->
              <!--</el-col>-->

              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>上岗时间 </el-header>
                    <el-main>{{ driverDetail.goToWorkTime | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>

              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>订单归属 </el-header>
                    <el-main v-if="driverDetail.busiType === 0">梧桐专车</el-main>
                    <el-main v-if="driverDetail.busiType === 1">梧桐共享</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>

        <el-timeline-item timestamp="银行及第三方认证信息" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>开户银行 </el-header>
                    <el-main>{{ driverDetail.bankName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>银行开户名 </el-header>
                    <el-main>{{ driverDetail.accountName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>银行账户 </el-header>
                    <el-main>{{ driverDetail.cardNumber | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>开户支行 </el-header>
                    <el-main>{{ driverDetail.accountOpeningBranch | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>

        <el-timeline-item timestamp="收入/支出" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>收入保障 </el-header>
                    <el-main>{{ driverDetail.protectAmountCalcName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>合作期限 </el-header>
                    <el-main>{{ driverDetail.yearOfCooperationName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>线路管理费 </el-header>
                    <el-main>{{ driverDetail.lineManagementFeeName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <!--<el-col :span="8">-->
              <!--<el-card shadow="hover">-->
              <!--<el-container>-->
              <!--<el-header>违章押金 </el-header>-->
              <!--<el-main>{{ product.depositViolation | DataIsNull }}</el-main>-->
              <!--</el-container>-->
              <!--</el-card>-->
              <!--</el-col>-->
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>支付渠道 </el-header>
                    <el-main>{{ driverDetail.purchaseWayName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>管理费首款 </el-header>
                    <el-main v-if="!againBtn">{{ driverDetail.managementFeeFirst | DataIsNull }}</el-main>
                    <el-main v-if="againBtn">
                      <el-form-item label-width="110px" label="管理费首款" prop="managementFeeFirst" class="postInfo-container-item inlineBlock">
                        <el-input v-model="productForm.managementFeeFirst" type="number" min="0" placeholder="请输入管理费首款"/>
                      </el-form-item>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>管理费尾款 </el-header>
                    <el-main v-if="!againBtn">{{ driverDetail.managementFee | DataIsNull }}</el-main>
                    <el-main v-if="againBtn">
                      <el-form-item label-width="110px" label="管理费尾款" prop="managementFee" class="postInfo-container-item inlineBlock">
                        <el-input v-model="productForm.managementFee" type="number" min="0" placeholder="请输入管理费尾款"/>
                      </el-form-item>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>交款流水号后四位 </el-header>
                    <el-main v-if="!againBtn">{{ driverDetail.last4Nums | DataIsNull }}</el-main>
                    <el-main v-if="againBtn">
                      <el-form-item label-width="110px" label="交款流水号后四位" prop="last4Nums" class="postInfo-container-item inlineBlock">
                        <el-input v-model="productForm.last4Nums" type="number" min="0" placeholder="请输入交款流水号后四位"/>
                      </el-form-item>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>备注 </el-header>
                    <el-main v-if="!againBtn">{{ driverDetail.remarks | DataIsNull }}</el-main>
                    <el-main v-if="againBtn">
                      <el-form-item label-width="110px" label="备注" prop="remarks" class="postInfo-container-item inlineBlock">
                        <el-input v-model="productForm.remarks" type="textarea" min="0" placeholder="请输入备注"/>
                      </el-form-item>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>

        <el-timeline-item timestamp="合作模式" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>合作模式 </el-header>
                    <el-main>{{ product.cooperationModel | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>

        <el-timeline-item v-if="driverDetail.cooperationModel === '购车'" timestamp="产品信息" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>产品方案 </el-header>
                    <el-main>{{ product.productName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>车辆品牌型号 </el-header>
                    <el-main>{{ product.brand | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>承保公司 </el-header>
                    <el-main>{{ product.insuranceName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>车价 </el-header>
                    <el-main>{{ product.noTax | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>购置税 </el-header>
                    <el-main>{{ product.purchaseTax | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>商业险 </el-header>
                    <el-main>{{ product.commercialInsurance | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>保险总额 </el-header>
                    <el-main>{{ product.totalInsurance | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>交强险 </el-header>
                    <el-main>{{ product.toPayHighInsurance | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>车船税 </el-header>
                    <el-main>{{ product.travelTax | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>GPS厂商名称 </el-header>
                    <el-main>{{ product.gpsname | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>GPS金额 </el-header>
                    <el-main>{{ product.gpsprice | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>上牌 </el-header>
                    <el-main>{{ product.boardFee | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>临牌 </el-header>
                    <el-main>{{ product.tempBoardFee | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>金融服务商 </el-header>
                    <el-main>{{ product.financialName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>金融手续费 </el-header>
                    <el-main>{{ product.financialFees | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>还款期数 </el-header>
                    <el-main>{{ product.stagingParam | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>贷款保证金 </el-header>
                    <el-main>{{ product.loanDeposit | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>是否选择购置税分期 </el-header>
                    <el-main>
                      <svg-icon v-if="product.purchaseTaxStaging === 2" icon-class="noPass" />
                      <svg-icon v-else-if="product.purchaseTaxStaging === 1" icon-class="pass" />
                      <span v-else>暂无数据</span>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>是否支持车险分期 </el-header>
                    <el-main>
                      <svg-icon v-if="product.autoInsuranceStaging === 2" icon-class="noPass" />
                      <svg-icon v-else-if="product.autoInsuranceStaging === 1" icon-class="pass" />
                      <span v-else>暂无数据</span>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>是否支持GPS分期 </el-header>
                    <el-main>
                      <svg-icon v-if="product.gpsstaging === 2" icon-class="noPass" />
                      <svg-icon v-else-if="product.gpsstaging === 1" icon-class="pass" />
                      <span v-else>暂无数据</span>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>是否支持金融手续分期 </el-header>
                    <el-main>
                      <svg-icon v-if="product.financialFeeStaging === 2" icon-class="noPass" />
                      <svg-icon v-else-if="product.financialFeeStaging === 1" icon-class="pass" />
                      <span v-else>暂无数据</span>
                    </el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>首付比 </el-header>
                    <el-main>{{ product.paymentRatio * 100 | DataIsNull }}%</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>年费率 </el-header>
                    <el-main>{{ product.annualizedRate * 100 | DataIsNull }}%</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>月供 </el-header>
                    <el-main>{{ product.monthPaymentCalc | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>贷款总额 </el-header>
                    <el-main>{{ product.loanAmountCalc | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>货主总利息 </el-header>
                    <el-main>{{ product.totalInterestCalc | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>首次支付总计 </el-header>
                    <el-main>{{ product.totalPayment | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>购车首付 </el-header>
                    <el-main>{{ product.bareCarDownPayment | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <!--<el-col :span="8">-->
              <!--<el-card shadow="hover">-->
              <!--<el-container>-->
              <!--<el-header>首付 </el-header>-->
              <!--<el-main>{{ product.bareCarDownPayment | DataIsNull }}</el-main>-->
              <!--</el-container>-->
              <!--</el-card>-->
              <!--</el-col>-->
            </el-row>

            <el-row :gutter="24">
              <!--<el-col :span="8">-->
              <!--<el-card shadow="hover">-->
              <!--<el-container>-->
              <!--<el-header>贷款金额 </el-header>-->
              <!--<el-main>{{ product.loanAmount | DataIsNull }}</el-main>-->
              <!--</el-container>-->
              <!--</el-card>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
              <!--<el-card shadow="hover">-->
              <!--<el-container>-->
              <!--<el-header>司机月收入 </el-header>-->
              <!--<el-main>{{ product.driverMonthIncome | DataIsNull }}</el-main>-->
              <!--</el-container>-->
              <!--</el-card>-->
              <!--</el-col>-->
            </el-row>

            <!--<el-row :gutter="24">-->
            <!--<el-col :span="8">-->
            <!--<el-card shadow="hover">-->
            <!--<el-container>-->
            <!--<el-header>其他购车服务 </el-header>-->
            <!--<el-main>{{ product.otherCarPurchaseServices | DataIsNull }}</el-main>-->
            <!--</el-container>-->
            <!--</el-card>-->
            <!--</el-col>-->
            <!--</el-row>-->
          </el-card>
        </el-timeline-item>

        <el-timeline-item v-if="driverDetail.cooperationModel === '租车'" timestamp="产品信息" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>租车车型 </el-header>
                    <el-main>{{ driverDetail.carRentalTypeName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>租赁方式 </el-header>
                    <el-main>{{ driverDetail.rentalMethodName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>租赁公司 </el-header>
                    <el-main>{{ driverDetail.leasingCompanyName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>

        <el-timeline-item v-if="driverDetail.cooperationModel === '带车'" timestamp="产品信息" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>带车车型 </el-header>
                    <el-main>{{ driverDetail.productIdForOwnCarName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>

        <!--<el-timeline-item timestamp="上传凭证" style="margin-top: 20px;" placement="top">-->
        <!--<el-card>-->
        <!--<el-row :gutter="24">-->
        <!--<el-col :span="24">-->
        <!--<el-card shadow="hover">-->
        <!--<el-container>-->
        <!--<el-header>线路管理费支付凭证 </el-header>-->
        <!--<el-main>-->
        <!--<div v-if="product.lineManagementFeePaymentVoucher && product.lineManagementFeePaymentVoucher.length > 0">-->
        <!--<div v-for="(item,i) in product.lineManagementFeePaymentVoucher" :key="i">-->
        <!--<img :src="item.url" style="width: 100%;">-->
        <!--</div>-->
        <!--</div>-->
        <!--<div v-else>暂无数据</div>-->
        <!--</el-main>-->
        <!--</el-container>-->
        <!--</el-card>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row :gutter="24">-->
        <!--<el-col :span="24">-->
        <!--<el-card shadow="hover">-->
        <!--<el-container>-->
        <!--<el-header>违章押金支付凭证 </el-header>-->
        <!--<el-main>-->
        <!--<div v-if="product.violationDepositPaymentVoucher && product.violationDepositPaymentVoucher.length > 0">-->
        <!--<div v-for="(item,i) in product.violationDepositPaymentVoucher" :key="i">-->
        <!--<img :src="item.url" style="width: 100%;">-->
        <!--</div>-->
        <!--</div>-->
        <!--<div v-else>暂无数据</div>-->
        <!--</el-main>-->
        <!--</el-container>-->
        <!--</el-card>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <!--</el-card>-->
        <!--</el-timeline-item>-->

        <el-timeline-item v-if="queryCarDetail.dueTime" timestamp="交付信息" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>交付时间 </el-header>
                    <el-main>{{ queryCarDetail.dueTime | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>车牌号 </el-header>
                    <el-main>{{ queryCarDetail.numberPlate | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>车架号 </el-header>
                    <el-main>{{ queryCarDetail.frameNumber | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>发动机品牌型号 </el-header>
                    <el-main>{{ queryCarDetail.model | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>颜色 </el-header>
                    <el-main>{{ queryCarDetail.color | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>载质量(吨) </el-header>
                    <el-main>{{ queryCarDetail.loadCapacity | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>总质量(吨) </el-header>
                    <el-main>{{ queryCarDetail.totalWeight | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>整备质量(吨)</el-header>
                    <el-main>{{ queryCarDetail.totalWeight | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>轮胎大小</el-header>
                    <el-main>{{ queryCarDetail.tireSize | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>配备补充备注</el-header>
                    <el-main>{{ queryCarDetail.remark | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>刹车系统</el-header>
                    <el-main>{{ queryCarDetail.brakeSystem | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>其他参数</el-header>
                    <el-main>{{ queryCarDetail.other | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>

        <el-timeline-item v-if="againBtn" timestamp="操作" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-button type="success" @click="pass('productForm')">确认签约成交</el-button>
                <el-button type="danger" @click="rejected">驳回</el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-form>
  </div>
</template>

<script>
import { GetLineTender, GetDriver, GetTenderList, orderConfirm } from '@/api/order/order-api'
import Mallki from '@/components/TextHoverEffect/Mallki'
import TenderInformations from '@/components/TenderInformation'

export default {
  name: 'OrderDetail',
  components: { Mallki, TenderInformations },
  data() {
    return {
      loading: false,
      detail: {},
      driverDetail: {},
      product: {},
      bidId: '',
      driverId: '',
      orderId: '',
      queryCarDetail: {},
      tenderType: true,
      tenderList: [],
      tenderListId: '',
      againBtn: false,
      productForm: {
        managementFeeFirst: '',
        managementFee: '',
        last4Nums: '',
        remark: ''
      },
      rules: {
        managementFeeFirst: [{ required: true, message: '请输入管理费首款', trigger: 'change' }],
        last4Nums: [{ required: true, message: '请输入交款流水号后四位', trigger: 'change' }],
        managementFee: [{ required: true, message: '请输入管理费尾款', trigger: 'change' }]
      }
    }
  },
  created() {},
  mounted() {
    const bidId = Number(this.$route.query.bidId)
    const driverId = this.$route.query.driverId
    const orderId = this.$route.query.orderId
    this.againBtn = Number(this.$route.query.againBtn)
    this.bidId = bidId
    this.driverId = driverId
    this.orderId = orderId
    this.fetchData(bidId, driverId, orderId)
  },
  methods: {
    fetchData(bidId, driverId, orderId) {
      // 查看订单下的所有标书
      GetTenderList({
        orderId: orderId,
        driverId: driverId
      }).then(res => {
        if (res.data.success) {
          this.tenderList = res.data.data;
          if (this.tenderList.length !== 0) {
            this.tenderListId = this.tenderList[0].bidId;
            // 获取线路详情
            GetLineTender({
              tenderId: this.tenderListId
            }).then(res => {
              if (res.data.success) {
                this.detail = res.data.data;
              }
            }).catch(err => {
              this.$message.error(err);
            })
          }
        }
      }).catch(err => {
        this.$message.error(err);
      })
      // 获取司机详情
      GetDriver({
        orderId: orderId
      }).then(res => {
        if (res.data.success) {
          let detail = res.data.data;
          let objs = Object.assign(detail.productInformationRequiredForCarRental, detail.driverBasicInfoForGeneraNewOrder, detail.incomeAndExpenditureInformation, detail.productInfoForGeneraNewOrder, { productIdForOwnCar: detail.productIdForOwnCar }, { orderId: detail.orderId }, { goToWorkTime: detail.goToWorkTime }, { productIdForOwnCarName: detail.productIdForOwnCarName }, { cooperationModel: detail.cooperationModel }, { busiType: detail.busiType })
          this.driverDetail = objs;
          if (this.againBtn && this.driverDetail.managementFeeFirst) {
            this.productForm.managementFeeFirst = this.driverDetail.managementFeeFirst
            this.productForm.last4Nums = this.driverDetail.last4Nums
          }
          if (Number(objs.financialName)) {
            objs.financialName = objs.financialNameChn
          }
          if (objs.cooperationModel === 1) {
            objs.cooperationModel = '购车'
          } else if (objs.cooperationModel === 2) {
            objs.cooperationModel = '租车'
          } else if (objs.cooperationModel === 3) {
            objs.cooperationModel = '带车'
          }
          this.product = objs;
        }
      }).catch(err => {
        this.$message.error(err);
      })
      // getProductDetails({
      //   orderId: orderId
      // }).then(res => {
      //   if (res.data.success) {
      //     this.product = res.data.data;
      //     if (this.product.violationDepositPaymentVoucher) {
      //       const imgArr = [];
      //       let arr = this.product.violationDepositPaymentVoucher;
      //       arr = arr.split(',')
      //       arr.map(item => {
      //         if (item !== '') {
      //           imgArr.push({
      //             name: 'image',
      //             url: item
      //           })
      //         }
      //       });
      //       this.product.violationDepositPaymentVoucher = imgArr
      //     }
      //     if (this.product.lineManagementFeePaymentVoucher) {
      //       const imgArr2 = [];
      //       let arr2 = this.product.lineManagementFeePaymentVoucher;
      //       arr2 = arr2.split(',')
      //       arr2.map(item => {
      //         if (item !== '') {
      //           imgArr2.push({
      //             name: 'image',
      //             url: item
      //           })
      //         }
      //       });
      //       this.product.lineManagementFeePaymentVoucher = imgArr2
      //     }
      //   }
      // }).catch(err => {
      //   this.$message.error(err);
      // })
      // GetQueryCar({
      //   driverId: driverId,
      //   orderId: orderId
      // }).then((res) => {
      //   if (res.data.success) {
      //     this.queryCarDetail = res.data.data;
      //   }
      // }).catch((err) => {
      //   this.$message.error(err);
      // })
    },
    changeTender() {
      let id = this.tenderListId;
      // 获取线路详情
      GetLineTender({
        tenderId: id
      }).then(res => {
        if (res.data.success) {
          this.detail = res.data.data;
        }
      }).catch(err => {
        this.$message.error(err);
      })
    },
    rejected() {
      this.$prompt('请输入驳回原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        orderConfirm({
          approvalStatus: 2,
          orderId: this.orderId,
          remarks: value
        }).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '已驳回'
            });
            setTimeout(() => {
              this.$router.back();
            }, 800)
          } else {
            this.$message.error(res.data.errorMsg);
          }
        }).catch(err => {
          this.$message.error(err);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    pass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (Number(this.product.lineManagementFee) !== (Number(this.productForm.managementFeeFirst) + Number(this.productForm.managementFee))) {
            this.$confirm('线路管理费未交齐，请确认线路费首款及尾款金额是否正确', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              orderConfirm({
                approvalStatus: 1,
                managementFeeFirst: this.productForm.managementFeeFirst,
                managementFee: this.productForm.managementFee,
                last4Nums: this.productForm.last4Nums,
                orderId: this.orderId,
                remarks: this.productForm.remarks
              }).then(res => {
                if (res.data.success) {
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  });
                  setTimeout(() => {
                    this.$router.back();
                  }, 800)
                } else {
                  this.$message.error(res.data.errorMsg);
                }
              }).catch(err => {
                this.$message.error(err);
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
          } else {
            orderConfirm({
              approvalStatus: 1,
              orderId: this.orderId,
              managementFeeFirst: this.productForm.managementFeeFirst,
              managementFee: this.productForm.managementFee,
              last4Nums: this.productForm.last4Nums,
              remarks: ''
            }).then(res => {
              if (res.data.success) {
                this.$message({
                  type: 'success',
                  message: '审核已通过'
                });
                setTimeout(() => {
                  this.$router.back();
                }, 800)
              }
            }).catch(err => {
              this.$message.error(err);
            })
          }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .orderDetail{
    width:100%;
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
      color:#333;
      font-weight: bold;
      font-size: 16px;
      line-height: 1.4;
    }
  }
</style>
