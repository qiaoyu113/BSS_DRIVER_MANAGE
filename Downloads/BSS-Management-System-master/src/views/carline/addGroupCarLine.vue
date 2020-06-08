<template>
  <div class="AddGroupCarLine">
    <p class="warn-content" style="margin: 0;color:#4493E4;">创建线路任务信息，需要准确填入，审核后可以匹配司机</p>
    <div class="fromBox">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <el-timeline>
          <el-timeline-item timestamp="基本信息" placement="top">
            <el-card>
              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="选择已创建货主" prop="customer" class="postInfo-container-item inlineBlock">
                        <el-select
                          v-model="postForm.customer"
                          :remote-method="remoteMethod"
                          :loading="loading"
                          :disabled="disabled"
                          filterable
                          remote
                          reserve-keyword
                          placeholder="请输入并选择货主">
                          <el-option
                            v-for="item in customers"
                            :key="item.customerName"
                            :label="item.customerName"
                            :value="item.customerId">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="城市" prop="city" class="postInfo-container-item">
                        <el-select v-model="postForm.city" :disabled="disabled" placeholder="请选择">
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
                      <el-form-item label-width="150px" label="线路名称" prop="lineName" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.lineName" minlength="1" placeholder="名称应具有识别度" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="货物类型" prop="cargo" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.cargo" placeholder="请选择货物类型">
                          <el-option
                            v-for="item in cargoList"
                            :key="item.code"
                            :value="item.code"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="收货人类型" prop="consignee" class="postInfo-container-item">
                        <el-select v-model="postForm.consignee" placeholder="请选择收货人类型">
                          <el-option
                            v-for="item in consigneeList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="选择车型" prop="carType" class="postInfo-container-item">
                        <el-select v-model="postForm.carType" placeholder="请选择车型">
                          <el-option
                            v-for="item in carList"
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
                      <el-form-item v-if="!postForm.address" label-width="150px" label="仓位置" prop="address" class="postInfo-container-item inlineBlock">
                        <el-cascader
                          v-loading="cityLoading2"
                          :options="options2"
                          :props="props"
                          v-model="postForm.address"
                          @change="getCity"
                          @active-item-change="handleItemChange2">
                        </el-cascader>
                      </el-form-item>
                      <el-form-item v-if="postForm.address" label-width="150px" label="仓位置" prop="address" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.address" type="text" placeholder="请输入仓位置" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="配送区域是否固定" prop="distribution" class="postInfo-container-item">
                        <el-select v-model="postForm.distribution" placeholder="请选择">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="是否需要返仓" prop="returnWarehouse" class="postInfo-container-item">
                        <el-select v-model="postForm.returnWarehouse" placeholder="请选择">
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
                      <el-form-item label-width="150px" label="是否需要搬运" prop="carry" class="postInfo-container-item">
                        <el-select v-model="postForm.carry" placeholder="请选择">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="是否需要回单" prop="returnBill" class="postInfo-container-item">
                        <el-select v-model="postForm.returnBill" placeholder="请选择">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="收入结算方式" prop="incomeSettlementMethod" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.incomeSettlementMethod" placeholder="请选择">
                          <el-option label="按趟结算" value="1"></el-option>
                          <el-option label="按底薪提成制结算" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row v-if="postForm.incomeSettlementMethod === '2'">
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="预计货主月报价(元)" prop="lowestQuotations" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.lowestQuotations" type="number" min="0" placeholder="请输入金额" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="预估月费用(元)(含油耗、过路、过桥)" prop="monthlyFuelConsumption" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.monthlyFuelConsumption" type="number" min="0" placeholder="请输入金额" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="160px" label="预计去油净收入(元)" class="postInfo-container-item inlineBlock">
                        <span style="color: #67C23A;font-weight: bold;">{{ postForm.lowestQuotations - postForm.monthlyFuelConsumption ? postForm.lowestQuotations - postForm.monthlyFuelConsumption : 0 }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row v-if="postForm.incomeSettlementMethod === '1'">
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="货主单趟报价(元)" prop="lowestQuotations" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.lowestQuotations" type="number" min="0" placeholder="请输入金额" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="预估单趟费用(元)(含油耗、过路、过桥)" prop="monthlyFuelConsumption" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.monthlyFuelConsumption" type="number" min="0" placeholder="请输入金额" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="单趟去油净收入(元)" class="postInfo-container-item inlineBlock">
                        <span style="color: #67C23A;font-weight: bold;">{{ postForm.lowestQuotations - postForm.monthlyFuelConsumption ? postForm.lowestQuotations - postForm.monthlyFuelConsumption : 0 }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="油卡结算(%)" prop="fuelRatio" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.fuelRatio" type="number" style="min-width: 180px;" max="100" min="0" placeholder="请输入油卡结算" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="线路区域" prop="cityText" class="postInfo-container-item">
                        <el-cascader
                          v-loading="cityLoading"
                          :options="options2"
                          :props="props"
                          v-model="postForm.cityText"
                          @active-item-change="handleItemChange">
                        </el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="具体区域范围" prop="districtArea" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.districtArea" placeholder="请输入具体区域范围" />
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
                        <el-input v-model="postForm.remark" type="textarea" placeholder="请输入备注信息" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="线路入池原因" class="postInfo-container-item">
                        <!--<el-input v-model="postForm.occurReason" type="textarea" placeholder="请输入线路产生原因" />-->
                        <el-select v-model="postForm.occurReason" placeholder="请选择线路入池原因">
                          <el-option
                            v-for="item in occurReasonList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="等待上车有效期(天)" prop="waitDirveValidityDuration" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.waitDirveValidityDuration" type="number" min="0" placeholder="请输入等待上车有效期" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="装卸难度" prop="handlingDifficultyDegree" class="postInfo-container-item">
                        <el-select v-model="postForm.handlingDifficultyDegree" placeholder="请选择">
                          <el-option
                            v-for="item in handlingDifficultyList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!--<el-col :span="8">-->
                    <!--<el-form-item label-width="150px" label="司机留存率" prop="retentionRate" class="postInfo-container-item">-->
                    <!--<el-select v-model="postForm.retentionRate" placeholder="请选择">-->
                    <!--<el-option-->
                    <!--v-for="item in retentionRateList"-->
                    <!--:key="item.codeVal"-->
                    <!--:value="item.codeVal"-->
                    <!--:label="item.code">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="线路稳定性" prop="stabilityRate" class="postInfo-container-item">
                        <el-select v-model="postForm.stabilityRate" placeholder="请选择">
                          <el-option
                            v-for="item in stabilityList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="集团确认可上车数" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.groupDeployNum" type="number" disabled placeholder="请输入集团确认可上车数" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="城市确认可上车数" prop="deployNum" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.deployNum" type="number" placeholder="请输入可上车数" />
                      </el-form-item>
                    </el-col>
                    <el-col v-if="Number(postForm.groupDeployNum) !== Number(postForm.deployNum)" :span="8">
                      <el-form-item label-width="150px" label="可上车数变化原因" prop="deployNumChangeReason" class="postInfo-container-item">
                        <el-select v-model="postForm.deployNumChangeReason" placeholder="请选择">
                          <el-option
                            v-for="item in deployNumChangeReasonList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="线路类型" prop="distinguishedType" class="postInfo-container-item">
                        <el-select v-model="postForm.distinguishedType" placeholder="请选择">
                          <el-option
                            v-for="item in distinguishedTypeList"
                            :key="item.codeVal"
                            :value="item.codeVal"
                            :label="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="首岗是否有人跟车" prop="firstNeededFollow" class="postInfo-container-item">
                        <el-select v-model="postForm.firstNeededFollow" placeholder="请选择">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="每日配送趟数" placement="top">
            <el-card>
              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="每日配送趟数" prop="lapNum" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.lapNum" placeholder="请选择">
                          <el-option
                            v-for="item in lapNumList"
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
            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="录入单趟配送信息" placement="top">
            <el-card>
              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label-width="210px" label="预计每日平均配送点位数" prop="pointLocationNum" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.pointLocationNum" type="number" placeholder="请输入个数" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item label-width="210px" label="预计每日平均总公里数(公里)" prop="pointLocationDistance" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.pointLocationDistance" type="number" placeholder="请输入公里" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label-width="210px" label="预计月出车天数" prop="frequency" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.frequency" type="number" placeholder="请输入月出车天数" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row v-for="item in postForm.LineDeliveryInfoFORM" :key="item.id">
                    <el-col :span="24">
                      <el-form-item label-width="210px" label=" 预计日工作时间" required class="postInfo-container-item inlineBlock">
                        <el-col :span="12">
                          <el-form-item >
                            <el-time-select
                              v-model="item.workingTimeStart"
                              :picker-options="{start: '00:00',step: '00:15',end: '23:59',maxTime: postForm.endTime}"
                              placeholder="起始时间">
                            </el-time-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item>
                            <el-time-select
                              v-model="item.workingTimeEnd"
                              :picker-options="{start: '00:00',step: '00:15',end: '23:59',minTime: postForm.startTime}"
                              placeholder="结束时间">
                            </el-time-select>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label-width="210px" label=" 预计单件货物重量(kg)" prop="singleCargoWeight" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.singleCargoWeight" placeholder="请选择预计单件货物重量">
                          <el-option
                            v-for="item in singleCargoWeightList"
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
                    <el-col :span="12">
                      <el-form-item label-width="210px" label=" 预计每日货物总体积(立方米)" prop="volume" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.volume" type="number" placeholder="请输入体积" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-card>
          </el-timeline-item>

          <el-timeline-item v-permission="['/line/line/task/create']" timestamp="完成提交" class="noTimeLine" placement="top">
            <el-card>
              <div>
                <el-button type="primary" @click="submitForm('postForm')">确认</el-button>
                <el-button @click="resetForm('postForm')">重置</el-button>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-form>
    </div>
    <!--创建货主信息-->
    <el-dialog :visible.sync="dialogFormVisible" title="货主信息">
      <el-form
        ref="postForm2"
        :rules="rules2"
        :model="postForm2"
        label-position="right"
        label-width="100px">
        <el-col :span="24">
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="180px" label="货主简称" prop="customerName" class="postInfo-container-item inlineBlock">
                <el-input v-model="postForm2.customerName" disabled placeholder="请输入创建货主简称" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="180px" label="货主公司主体" prop="customerNameAll" class="postInfo-container-item inlineBlock">
                <el-input v-model="postForm2.customerNameAll" disabled placeholder="请输入货主公司主体" />
              </el-form-item>
            </el-col>

            <el-col :span="12">

              <el-form-item label-width="180px" label="城市" prop="city" class="postInfo-container-item inlineBlock">
                <el-input v-model="postForm2.cityName" disabled placeholder="请输入货主公司主体" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="180px" label="一级分类" class="postInfo-container-item inlineBlock">
                <el-input v-model="postForm2.classify" disabled type="text" placeholder="一级分类"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="180px" label="二级分类" prop="secondaryClassification" class="postInfo-container-item">
                <el-select v-model="postForm2.secondaryClassification" placeholder="请选择二级分类">
                  <el-option
                    v-for="item in getLineCustomerTwo"
                    :key="item.code"
                    :value="item.code"
                    :label="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="180px" label="结算周期是否含当月" prop="currentMonth" class="postInfo-container-item">
                <el-select v-model="postForm2.currentMonth" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="180px" label="结算周期(天)" prop="billingCycle" class="postInfo-container-item inlineBlock">
                <el-input v-model="postForm2.billingCycle" type="number" placeholder="请输入结算周期(天)" style="display: inline-block"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label-width="180px" label="详细地址" prop="address" class="postInfo-container-item inlineBlock">
                <el-input v-model="postForm2.address" placeholder="请输入详细地址" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="180px" label="业务对接人姓名" prop="bussinessName" class="postInfo-container-item inlineBlock">
                <el-input v-model="postForm2.bussinessName" placeholder="请输入业务对接人姓名" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label-width="180px" label="业务对接人联系电话" prop="bussinessPhone" class="postInfo-container-item inlineBlock">
                <el-input v-model="postForm2.bussinessPhone" type="number" placeholder="请输入业务对接人联系电话" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="180px" label="业务对接人身份证号" prop="bussinessCard" class="postInfo-container-item inlineBlock">
                <el-input v-model="postForm2.bussinessCard" placeholder="请输入业务对接人身份证号" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="180px" label="合同止期" prop="contractEnd" class="postInfo-container-item inlineBlock">
                <el-date-picker
                  v-model="postForm2.contractEnd"
                  type="date"
                  prop="distribution"
                  value-format="timestamp"
                  style="width: auto;"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="180px" label="备注信息" class="postInfo-container-item inlineBlock">
                <el-input
                  v-model="postForm2.remark"
                  :rows="6"
                  type="textarea"
                  placeholder="请输入内容">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="createCustom('postForm2')">{{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getLineUser, confirmLineTaskClue, putCreatCustomerLine, getConfirmClueInfo, customerInfo, customerEdit } from '@/api/carline/carline-api'
import { getLineCustomerOneOrTwoCategory } from '@/api/client/client-api'
import permission from '@/directive/permission/index'
import { getCity } from '@/api/client/client-api'
import { dictionary, GetReginByCityCode } from '@/api/common'
import '@/styles/qiaoyu.scss'

const defaultForm = {
  customer: '',
  city: '',
  lineName: '',
  cargo: '',
  firstNeededFollow: '',
  consignee: '',
  carType: '',
  address: '',
  distribution: '',
  returnWarehouse: '',
  carry: '',
  returnBill: '',
  price: '',
  pointLocationNum: '',
  pointLocationDistance: '',
  frequency: '',
  startTime: '',
  endTime: '',
  volume: '',
  lapNum: '',
  groupDeployNum: '',
  remark: '',
  occurReason: '',
  districtArea: '',
  fuelRatio: '',
  cost: '',
  income: '',
  handlingDifficultyDegree: '',
  stabilityRate: '',
  retentionRate: '',
  cityArea: '',
  provinceArea: '',
  countyArea: '',
  driverNameFind: '',
  monthlyFuelConsumption: '',
  incomeSettlementMethod: '',
  waitDirveValidityDuration: '',
  distinguishedType: '',
  singleCargoWeight: '',
  lowestQuotations: '',
  cityText: [],
  distinguishedTypeList: [],
  LineDeliveryInfoFORM: [
    {
      workingTimeStart: '',
      workingTimeEnd: ''
    }
  ],
  profit: '0',
  deployNum: ''
}

export default {
  name: 'AddGroupCarLine',
  components: {},
  directives: { permission },
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
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      cityLoading: false,
      cityLoading2: false,
      dialogFormVisible: false,
      userListOptions: [],
      getLineCustomerTwo: [],
      tempRoute: {},
      customers: [],
      cargoList: ['食材', '水果', '方便食品', '团餐外卖', '酒水饮料', '建材', '汽配', '家电', '日化', '家具', '鲜花蛋糕', '3C数码', '洗涤', '印刷品', '服饰鞋帽', '医药保健', '包装', '母婴', '五金', '自行车', '大包裹/仪器', '其他'],
      rules: {
        customer: [{ required: true, message: '请选择货主', trigger: 'change' }],
        city: [{ required: true, message: '请选择城市', trigger: 'change' }],
        lineName: [{ required: true, message: '请输入线路名称', trigger: 'change' }, { min: 3, message: '长度不可小于3个字符', trigger: 'blur' }],
        cargo: [{ required: true, message: '请选择货物类型', trigger: 'change' }],
        consignee: [{ required: true, message: '请选择收货人类型', trigger: 'change' }],
        carType: [{ required: true, message: '请选择车型', trigger: 'change' }],
        address: [{ required: true, message: '请输入仓位置', trigger: 'change' }],
        distribution: [{ required: true, message: '请选择配送区域是否固定', trigger: 'change' }],
        returnWarehouse: [{ required: true, message: '请选择是否需要返仓', trigger: 'change' }],
        carry: [{ required: true, message: '请选择是否需要搬运', trigger: 'change' }],
        price: [{ required: true, message: '请输入单趟最低价', trigger: 'change' }],
        pointLocationNum: [{ required: true, message: '请输入预计每日平均配送点位', trigger: 'change' }],
        pointLocationDistance: [{ required: true, message: '请输入预计每日平均总公里数', trigger: 'change' }],
        firstNeededFollow: [{ required: true, message: '请选择首岗是否有人跟车', trigger: 'change' }],
        frequency: [{ required: true, message: '请输入预计月出车天数', trigger: 'change' }],
        startTime: [{ required: false, message: '请输入开始工作时间', trigger: 'change' }],
        endTime: [{ required: false, message: '请输入结束工作时间', trigger: 'change' }],
        volume: [{ required: false, message: '请输入预计每日货物总体积', trigger: 'change' }],
        lapNum: [{ required: true, message: '请输入每日配送趟数', trigger: 'change' }],
        cost: [{ required: false, message: '请输入预计成本', trigger: 'change' }],
        monthlyFuelConsumption: [{ required: true, message: '请输入预计月油耗', trigger: 'change' }],
        districtArea: [{ required: true, message: '请输入具体线路区域范围', trigger: 'change' }],
        fuelRatio: [{ required: true, message: '请输入油耗占总结算百分比', trigger: 'change' }],
        returnBill: [{ required: true, message: '请选择是否需要回单', trigger: 'change' }],
        cityText: [{ required: true, message: '请选择区域', trigger: 'change' }],
        incomeSettlementMethod: [{ required: true, message: '请选择结算方式', trigger: 'change' }],
        handlingDifficultyDegree: [{ required: true, message: '请选择装卸难度', trigger: 'change' }],
        retentionRate: [{ required: false, message: '请选择留存率', trigger: 'change' }],
        stabilityRate: [{ required: true, message: '请选择稳定性', trigger: 'change' }],
        singleCargoWeight: [{ required: true, message: '请选择预计单件货物重量', trigger: 'change' }],
        deployNumChangeReason: [{ required: true, message: '请选择可上车数变化原因', trigger: 'change' }],
        income: [{ required: false, message: '请输入预计收入', trigger: 'change' }],
        lowestQuotations: [{ required: true, message: '请输入货主报价', trigger: 'change' }],
        distinguishedType: [{ required: true, message: '请选择线路类型', trigger: 'change' }],
        deployNum: [{ required: true, message: '请输入城市确认可上车数', trigger: 'change' }],
        waitDirveValidityDuration: [{ required: false, message: '请输入等待上车有效期', trigger: 'change' }]
      },
      postForm2: {
        classify: '集团客户',
        customerName: '',
        customerNameAll: '',
        city: [],
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
      },
      rules2: {
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
      lineId: '',
      customerId: '',
      cityList: [],
      carList: [],
      consigneeList: [],
      options2: [],
      occurReasonList: [],
      lapNumList: [],
      handlingDifficultyList: [],
      retentionRateList: [],
      stabilityList: [],
      singleCargoWeightList: [],
      cityList2: [],
      btnPass: true,
      disabled: false,
      props: {
        label: 'name',
        value: 'code',
        children: 'children'
      }
    }
  },
  computed: {},
  watch: {
    'postForm.frequency'(val) {
      if (val !== '') {
        if (Number(val) <= 0) {
          this.postForm.frequency = 1
        }
        if (Number(val) >= 32) {
          this.postForm.frequency = 31
        }
      }
    },
    'postForm.fuelRatio'(val) {
      if (val !== '') {
        if (val > 100) {
          this.postForm.fuelRatio = 100
        }
        if (val < 0) {
          this.postForm.fuelRatio = 0
        }
        if (Number(val) === 0) {
          this.postForm.fuelRatio = 0
        }
      }
    },
    'postForm.lapNum'(val) {
      let arr = []
      for (let i = 0; i < val; i++) {
        if (this.postForm.lineDeliveryInfoFORM && this.postForm.lineDeliveryInfoFORM[i]) {
          if (this.postForm.lineDeliveryInfoFORM[i].workingTimeStart !== '' || this.postForm.lineDeliveryInfoFORM[i].workingTimeEnd !== '') {
            arr.push(this.postForm.lineDeliveryInfoFORM[i])
          }
        } else {
          arr.push({
            workingTimeStart: '',
            workingTimeEnd: ''
          })
        }
      }
      this.postForm.LineDeliveryInfoFORM = arr;
    },
    'postForm.cost'(val) {
      const num = Number(this.postForm.income) - Number(val)
      this.postForm.profit = num.toFixed(2);
    },
    'postForm.income'(val) {
      const num = Number(val) - Number(this.postForm.cost)
      this.postForm.profit = num.toFixed(2);
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
    // this.getLineUserList();
    this.fetchData();
    const id = this.$route.query.id;
    const customerId = this.$route.query.customerId;
    const city = this.$route.query.city;
    if (customerId) {
      this.customerId = customerId;
      this.postForm.customer = customerId;
      this.remoteMethod(customerId)
      this.getcustomerDetails(customerId);
      this.disabled = true;
    }
    if (city) {
      this.postForm.city = city;
      this.disabled = true;
    }
    if (id) {
      this.lineId = id;
      this.dialogFormVisible = true;
      this.getLineDetails(id);
    }
  },
  methods: {
    handleItemChange2(val) {
      this.cityLoading2 = true;
      GetReginByCityCode(val).then(res => {
        if (res.data.success) {
          this.cityLoading2 = false;
          const data = res.data.data
          if ((val[0] && val.length === 1)) {
            this.options2.map((item) => {
              if (item.code === val[0]) {
                data.map(i => {
                  this.$set(i, 'children', [])
                })
                item.children = data
              }
            });
          }
          if (val[1] && val.length === 2) {
            this.options2.map((item) => {
              if (item.code === val[0]) {
                item.children.map((i) => {
                  if (i.code === val[1]) {
                    i.children = data
                  }
                })
              }
            });
          }
        }
      })
    },
    handleItemChange(val) {
      this.cityLoading = true;
      GetReginByCityCode(val).then(res => {
        if (res.data.success) {
          this.cityLoading = false;
          const data = res.data.data
          if ((val[0] && val.length === 1)) {
            this.options2.map((item) => {
              if (item.code === val[0]) {
                data.map(i => {
                  this.$set(i, 'children', [])
                })
                item.children = data
              }
            });
          }
          if (val[1] && val.length === 2) {
            this.options2.map((item) => {
              if (item.code === val[0]) {
                item.children.map((i) => {
                  if (i.code === val[1]) {
                    i.children = data
                  }
                })
              }
            });
          }
        }
      })
    },
    createCustom(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btnPass) {
            this.btnPass = false
            customerEdit({
              address: this.postForm2.address,
              billingCycle: this.postForm2.billingCycle,
              businessLicense: this.postForm2.businessLicense.toString(),
              bussinessCard: this.postForm2.bussinessCard,
              bussinessName: this.postForm2.bussinessName,
              bussinessPhone: this.postForm2.bussinessPhone,
              contractEnd: this.postForm2.contractEnd,
              contractStart: this.postForm2.contractStart,
              currentMonth: this.postForm2.currentMonth,
              customerId: this.customerId,
              customerName: this.postForm2.customerName,
              customerNameAll: this.postForm2.customerNameAll,
              remark: this.postForm2.remark
            }).then((res) => {
              if (res.data.success) {
                this.$message({
                  type: 'success',
                  message: '编辑成功'
                });
                this.dialogFormVisible = false;
                this.btnPass = true
              } else {
                this.$message.error(res.data.errorMsg);
                this.btnPass = true
              }
            }).catch(err => {
              this.$message.error(err);
            })
          }
        }
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        getLineUser({
          q: query
        }).then(response => {
          if (response.data.success) {
            let array = response.data.data;
            this.customers = array;
            this.loading = false;
          } else {
            this.$message.error(response.data.flag);
          }
        })
      } else {
        this.customers = [];
      }
    },
    getCity(val) {
      if (this.postForm.address) {
        this.options2.map((item) => {
          if (item.code === val[0]) {
            this.postForm.address = ''
            this.postForm.address = this.postForm.address + item.name
            item.children.map((i) => {
              if (i.code === val[1]) {
                this.postForm.address = this.postForm.address + i.name
                i.children.map((mi) => {
                  if (mi.code === val[2]) {
                    this.postForm.address = this.postForm.address + mi.name
                    this.$prompt('请输入详细地址', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消'
                    }).then(({ value }) => {
                      this.postForm.address = this.postForm.address + value
                      this.cityLoading2 = false;
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '取消输入'
                      });
                      this.cityLoading2 = false;
                    });
                  }
                })
              }
            })
          }
        })
      }
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
      // 城市
      GetReginByCityCode([]).then(res => {
        const data = res.data.data;
        data.map(item => {
          this.$set(item, 'children', [])
        })
        this.options2 = data;
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
      // 货物经验
      dictionary({
        dictType: 'type_of_goods'
      }).then(res => {
        this.cargoList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 线路入池原因
      dictionary({
        dictType: 'line_entry_reason'
      }).then(res => {
        this.occurReasonList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 收货人类型
      dictionary({
        dictType: 'consignee_type'
      }).then(res => {
        this.consigneeList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 每日配送趟数
      dictionary({
        dictType: 'line_task_daynum'
      }).then(res => {
        this.lapNumList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 装卸难度
      dictionary({
        dictType: 'handling_difficulty_degree'
      }).then(res => {
        this.handlingDifficultyList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 司机留存率
      dictionary({
        dictType: 'linetask_retention_rate'
      }).then(res => {
        this.retentionRateList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 稳定性
      dictionary({
        dictType: 'linetask_stability_rate'
      }).then(res => {
        this.stabilityList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 单件货物重量
      dictionary({
        dictType: 'single_cargo_weight'
      }).then(res => {
        this.singleCargoWeightList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 可上车数变化原因
      dictionary({
        dictType: 'deploy_num_change_reason'
      }).then(res => {
        this.deployNumChangeReasonList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 获取城市
      getCity().then(res => {
        this.cityList2 = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
      // 线路类型
      dictionary({
        dictType: 'line_distinguished_type'
      }).then(res => {
        this.distinguishedTypeList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    getcustomerDetails(id) {
      customerInfo({
        customerId: id
      }).then((res) => {
        if (res.data.success) {
          let datas = res.data.data;
          for (let key in datas) {
            if (datas[key]) datas[key] = datas[key].toString()
          }
          if (datas.secondaryClassification === 0) {
            datas.secondaryClassification = ''
          } else {
            datas.secondaryClassification = Number(datas.secondaryClassification)
          }
          datas.contractEnd = new Date(datas.contractEnd).getTime()
          this.postForm2 = Object.assign(this.postForm2, datas)
        }
      })
      getLineCustomerOneOrTwoCategory({}).then(res => {
        if (res.data.success) {
          let getLineCustomerOne = res.data.data
          getLineCustomerOne.forEach((i) => {
            if (i.code === 3) {
              this.getLineCustomerTwo = i.nextCategorys
            }
          })
        }
      })
    },
    getLineDetails(id) {
      getConfirmClueInfo({ lineId: id }).then(res => {
        if (res.data.success) {
          const data = res.data.data;
          for (let key in data) {
            if (!data[key]) data[key] = ''
            if (data[key]) data[key] = String(data[key])
          }
          this.postForm = Object.assign(this.postForm, data)
          this.postForm.customer = Number(data.customerId);
          this.postForm.groupDeployNum = Number(data.groupDeployNum);
          // this.postForm.name = data.lineName;
          // this.postForm.city = String(data.city);
          // this.postForm.carType = String(data.carType);
          // this.postForm.cargo = data.cargoType;
          // this.postForm.consignee = data.receiverTypeId;
          // this.postForm.address = data.warehouse;
          // this.postForm.carry = String(data.carry);
          // this.postForm.distribution = String(data.distributionSites);
          // this.postForm.returnWarehouse = String(data.returnWarehouse);
          // this.postForm.price = data.preLowestQuotations;
          // this.postForm.pointLocationNum = data.deliveryNum;
          // this.postForm.pointLocationDistance = data.distance;
          // this.postForm.frequency = data.month;
          // this.postForm.lineDeliveryInfoFORM = data.lineDeliveryInfoFORMS;
          // // this.postForm.endTime = data.workingTimeEnd;
          // this.postForm.volume = data.volume;
          // this.postForm.lapNum = String(data.dayNum);
          // this.postForm.cost = data.preCost;
          // this.postForm.income = data.preIncome;
          // this.postForm.profit = data.preGrossProfit;
          // this.postForm.districtArea = data.districtArea;
          // this.postForm.remark = data.remark;
          // this.postForm.occurReason = data.occurReason;
          // this.postForm.returnBill = String(data.returnBill);
          // this.postForm.fuelRatio = data.fuelRatio;
          // this.postForm.cityArea = data.cityArea;
          // this.postForm.provinceArea = data.provinceArea;
          // this.postForm.countyArea = data.countyArea;
          // this.postForm.deployNum = data.deployNum;
          // this.postForm.incomeSettlementMethod = String(data.incomeSettlementMethod);
          // this.postForm.lowestQuotations = data.preLowestQuotations;
          // this.postForm.monthlyFuelConsumption = data.monthlyFuelConsumption;
          // this.postForm.waitDirveValidityDuration = data.waitDirveValidityDuration;
          // this.postForm.retentionRate = String(data.retentionRate);
          // this.postForm.stabilityRate = String(data.stabilityRate);
          // this.postForm.handlingDifficultyDegree = String(data.handlingDifficultyDegree);
          // this.postForm.singleCargoWeight = String(data.singleCargoWeight);
          this.postForm.cityText.splice(0, 1, String(data.provinceArea))
          this.postForm.cityText.splice(1, 1, String(data.cityArea))
          this.postForm.cityText.splice(2, 1, String(data.countyArea))
          this.getCity(this.postForm.cityText)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getLineUserList() {
      getLineUser().then(res => {
        if (res.data.success) {
          this.customers = res.data.data;
        }
      }).catch(err => {
        this.$message.error(err);
      })
    },
    submitForm(formName) {
      for (var i = 0; i < this.postForm.LineDeliveryInfoFORM.length; i += 1) {
        let item = this.postForm.LineDeliveryInfoFORM[i];
        if (!item.workingTimeStart || !item.workingTimeEnd || item.workingTimeEnd === '' || item.workingTimeStart === '') {
          this.$message.error('请填写完整预计日工作时间');
          this.btnPass = true
          return false;
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btnPass) {
            this.btnPass = false
            if (!Number(this.postForm.deployNum)) {
              this.postForm.deployNum = 1;
            }
            for (var i = 0; i < this.postForm.LineDeliveryInfoFORM.length; i += 1) {
              let item = this.postForm.LineDeliveryInfoFORM[i];
              if (!item.workingTimeStart || !item.workingTimeEnd || item.workingTimeEnd === '' || item.workingTimeStart === '') {
                this.$message.error('请填写完整预计日工作时间');
                this.btnPass = true
                return false;
              }
            }
            confirmLineTaskClue({
              'deployNumChangeReason': this.postForm.deployNumChangeReason,
              'groupDeployNum': this.postForm.groupDeployNum,
              'lineId': this.lineId,
              'customerId': this.postForm.customer,
              'lineName': this.postForm.lineName,
              'firstNeededFollow': this.postForm.firstNeededFollow,
              'city': this.postForm.city,
              'carType': this.postForm.carType,
              'cargoType': this.postForm.cargo,
              'receiverType': this.postForm.consignee,
              'warehouse': this.postForm.address,
              'carry': this.postForm.carry,
              'distributionSites': this.postForm.distribution,
              'returnWarehouse': this.postForm.returnWarehouse,
              'deliveryNum': this.postForm.pointLocationNum,
              'distance': this.postForm.pointLocationDistance,
              'month': this.postForm.frequency,
              // 'workingTimeStart': this.postForm.startTime,
              // 'workingTimeEnd': this.postForm.endTime,
              'lineDeliveryInfoFORMS': this.postForm.LineDeliveryInfoFORM,
              'volume': this.postForm.volume,
              'dayNum': this.postForm.lapNum,
              'cost': this.postForm.cost,
              'fuelRatio': this.postForm.fuelRatio,
              'income': this.postForm.income,
              'districtArea': this.postForm.districtArea,
              'distinguishedType': this.postForm.distinguishedType,
              'remark': this.postForm.remark,
              'returnBill': this.postForm.returnBill,
              'occurReason': this.postForm.occurReason,
              'handlingDifficultyDegree': this.postForm.handlingDifficultyDegree,
              'incomeSettlementMethod': this.postForm.incomeSettlementMethod,
              'lowestQuotations': this.postForm.lowestQuotations,
              'monthlyFuelConsumption': this.postForm.monthlyFuelConsumption,
              'waitDirveValidityDuration': this.postForm.waitDirveValidityDuration,
              'stabilityRate': this.postForm.stabilityRate,
              'singleCargoWeight': this.postForm.singleCargoWeight,
              'cityArea': Number(this.postForm.cityText[1]),
              'provinceArea': Number(this.postForm.cityText[0]),
              'countyArea': Number(this.postForm.cityText[2]),
              'deployNum': Number(this.postForm.deployNum)
            }).then(res => {
              if (res.data.success) {
                if (res.data.data.success) {
                  this.$alert('确认信息后线路将进入可售线路列表，可售条数为城市确认可上车数', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      setTimeout(() => {
                        this.$router.push({ path: '/vendibility-line' })
                      }, 500)
                    }
                  });
                } else {
                  this.$message.error('创建失败');
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
    editForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btnPass) {
            this.btnPass = false
            if (!Number(this.postForm.deployNum)) {
              this.postForm.deployNum = 1;
            }
            for (var i = 0; i < this.postForm.LineDeliveryInfoFORM.length; i += 1) {
              let item = this.postForm.LineDeliveryInfoFORM[i];
              if (item.workingTimeStart && item.workingTimeEnd) {
                if (item.workingTimeEnd === '' || item.workingTimeStart === '') {
                  this.$message.error('请填写完整预计日工作时间');
                  this.btnPass = true
                  return false;
                }
              } else {
                this.$message.error('请填写完整预计日工作时间');
                this.btnPass = true
                return false;
              }
            }
            putCreatCustomerLine({
              'customerId': this.postForm.customer,
              'lineName': this.postForm.name,
              'city': this.postForm.city,
              'lineId': this.lineId,
              'carType': this.postForm.carType,
              'cargoType': this.postForm.cargo,
              'receiverType': this.postForm.consignee,
              'warehouse': this.postForm.address,
              'carry': this.postForm.carry,
              'distributionSites': this.postForm.distribution,
              'returnWarehouse': this.postForm.returnWarehouse,
              'deliveryNum': this.postForm.pointLocationNum,
              'distance': this.postForm.pointLocationDistance,
              'month': this.postForm.frequency,
              // 'workingTimeStart': this.postForm.startTime,
              // 'workingTimeEnd': this.postForm.endTime,
              'lineDeliveryInfoFORMS': this.postForm.LineDeliveryInfoFORM,
              'volume': this.postForm.volume,
              'dayNum': this.postForm.lapNum,
              'fuelRatio': this.postForm.fuelRatio,
              'cost': this.postForm.cost,
              'income': this.postForm.income,
              'districtArea': this.postForm.districtArea,
              'remark': this.postForm.remark,
              'returnBill': this.postForm.returnBill,
              'occurReason': this.postForm.occurReason,
              'grossProfit': this.postForm.profit,
              'handlingDifficultyDegree': this.postForm.handlingDifficultyDegree,
              'incomeSettlementMethod': this.postForm.incomeSettlementMethod,
              'lowestQuotations': this.postForm.lowestQuotations,
              'monthlyFuelConsumption': this.postForm.monthlyFuelConsumption,
              'waitDirveValidityDuration': this.postForm.waitDirveValidityDuration,
              'retentionRate': this.postForm.retentionRate,
              'stabilityRate': this.postForm.stabilityRate,
              'singleCargoWeight': this.postForm.singleCargoWeight,
              'cityArea': Number(this.postForm.cityArea),
              'provinceArea': Number(this.postForm.provinceArea),
              'countyArea': Number(this.postForm.countyArea),
              'deployNum': Number(this.postForm.deployNum)
            }).then(res => {
              if (res.data.success) {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$router.push({ name: 'AllCarLineList' })
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
      this.postForm.cityText = []
      this.postForm.fuelRatio = '';
      this.postForm.deployNum = '';
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .AddGroupCarLine{
    .fromBox{
      padding:20px;
    }
    .el-form{
      padding-top: 20px;
    }
    .no-bg{
      background: none;
    }
    .no-bg:hover{
      background: none !important;
      color: inherit;
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

