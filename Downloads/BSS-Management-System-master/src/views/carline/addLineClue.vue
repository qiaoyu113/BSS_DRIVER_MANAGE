<template>
  <div class="addLineClue">
    <p class="warn-content" style="margin: 0;color:#4493E4;">创建线路线索信息，需要准确填入</p>
    <div class="fromBox">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <el-timeline>
          <el-timeline-item timestamp="基本信息" placement="top">
            <el-card>
              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="180px" label="城市" prop="city" class="postInfo-container-item">
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
                      <el-form-item label-width="180px" label="货主简称" prop="customer" class="postInfo-container-item inlineBlock">
                        <el-button type="text" @click="createNewCustomer()">创建新货主</el-button>
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
                            :key="item.customerId"
                            :label="item.customerName"
                            :value="item.customerId">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="180px" label="线路名称" prop="name" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.name" minlength="1" placeholder="名称应具有识别度" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="180px" label="货物类型" prop="cargo" class="postInfo-container-item inlineBlock">
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
                      <el-form-item label-width="180px" label="收入结算方式" prop="incomeSettlementMethod" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.incomeSettlementMethod" placeholder="请选择">
                          <el-option label="按趟结算" value="1"></el-option>
                          <el-option label="按底薪提成制结算" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="180px" label="选择车型" prop="carType" class="postInfo-container-item inlineBlock">
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

                  <el-row v-if="postForm.incomeSettlementMethod === '2'">
                    <el-col :span="8">
                      <el-form-item label-width="180px" label="预计货主月报价(元)" prop="lowestQuotations" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.lowestQuotations" type="number" min="0" placeholder="请输入金额" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="180px" label="预估月费用(元)(含油耗、过路、过桥)" prop="monthlyFuelConsumption" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.monthlyFuelConsumption" type="number" min="0" placeholder="请输入金额" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="180px" label="预计去油净收入(元)" class="postInfo-container-item inlineBlock">
                        <span style="color: #67C23A;font-weight: bold;">{{ postForm.lowestQuotations - postForm.monthlyFuelConsumption ? postForm.lowestQuotations - postForm.monthlyFuelConsumption : 0 }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row v-if="postForm.incomeSettlementMethod === '1'">
                    <el-col :span="8">
                      <el-form-item label-width="180px" label="货主单趟报价(元)" prop="lowestQuotations" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.lowestQuotations" type="number" min="0" placeholder="请输入金额" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="180px" label="预估单趟费用(元)(含油耗、过路、过桥)" prop="monthlyFuelConsumption" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.monthlyFuelConsumption" type="number" min="0" placeholder="请输入金额" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label-width="180px" label="单趟去油净收入(元)" class="postInfo-container-item inlineBlock">
                        <span style="color: #67C23A;font-weight: bold;">{{ postForm.lowestQuotations - postForm.monthlyFuelConsumption ? postForm.lowestQuotations - postForm.monthlyFuelConsumption : 0 }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="180px" label="每日配送趟数" prop="lapNum" class="postInfo-container-item inlineBlock">
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

                    <el-col :span="8">
                      <el-form-item label-width="180px" label="预计每日平均配送点位数" prop="deliveryNum" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.deliveryNum" type="number" placeholder="请输入点位数" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="180px" label="每月出车天数(天)" prop="month" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.month" type="number" min="1" placeholder="请输入每月出车天数" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="180px" label="操作时长(小时)" prop="timeDiff" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.timeDiff" type="number" min="0" placeholder="请输入操作时长" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="180px" label="预计单件货物重量(kg)" prop="singleCargoWeight" class="postInfo-container-item inlineBlock">
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

                    <el-col :span="8">
                      <el-form-item label-width="180px" label="总公里数(公里)/趟" prop="pointLocationDistance" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.pointLocationDistance" type="number" placeholder="请输入总公里数(公里)/趟" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="180px" label="线路稳定性" prop="stabilityRate" class="postInfo-container-item inlineBlock">
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
                      <el-form-item label-width="180px" label="集团确认可上车数(条)" prop="groupDeployNum" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.groupDeployNum" type="number" placeholder="请输入总公里数(公里)/趟" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="180px" label="装卸难度" prop="handlingDifficultyDegree" class="postInfo-container-item inlineBlock">
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

                    <el-col :span="8">
                      <el-form-item label-width="180px" label="备注信息" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.remark" type="textarea" placeholder="请输入备注信息" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-card>
          </el-timeline-item>

          <el-timeline-item v-permission="['/line/line/task/createLineTaskClue']" timestamp="完成提交" class="noTimeLine" placement="top">
            <el-card>
              <div>
                <el-button v-if="!editType" type="primary" @click="submitForm('postForm')">确认线路</el-button>
                <el-button @click="resetForm('postForm')">重置</el-button>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-form>
    </div>
    <!--创建货主信息-->
    <el-dialog :visible.sync="dialogFormVisible" title="货主信息创建">
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
                <el-input v-model="postForm2.customerName" placeholder="请输入创建货主简称" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="180px" label="货主公司主体" prop="customerNameAll" class="postInfo-container-item inlineBlock">
                <el-input v-model="postForm2.customerNameAll" placeholder="请输入货主公司主体" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="180px" label="城市" prop="city" class="postInfo-container-item">
                <el-select v-model="postForm2.city" multiple placeholder="请选择">
                  <el-option
                    v-for="(item,key) in cityList2"
                    :key="item"
                    :value="item"
                    :label="key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label-width="180px" label="一级分类" class="postInfo-container-item inlineBlock">
                <el-input v-model="postForm2.classify" :disabled="disabled2" type="text" placeholder="一级分类"/>
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
import { getLineUser, createLineTaskClue, customerSave } from '@/api/carline/carline-api'
import { getLineCustomerOneOrTwoCategory } from '@/api/client/client-api'
import { getCity } from '@/api/client/client-api'
import { getNewTender } from '@/api/tender/tender-api'
import permission from '@/directive/permission/index'
import { dictionary, GetProvince, GetCity } from '@/api/common'
import '@/styles/qiaoyu.scss'

const defaultForm = {
  customer: '',
  city: '',
  name: '',
  cargo: '',
  consignee: '',
  carType: '',
  address: '',
  distribution: '',
  back: '',
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
  driverNameFind: '',
  monthlyFuelConsumption: '',
  month: '',
  incomeSettlementMethod: '',
  waitDirveValidityDuration: '',
  singleCargoWeight: '',
  lowestQuotations: '',
  deliveryNum: '',
  cityText: [],
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
  name: 'AddLineClue',
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
      dialogFormVisible: false,
      disabled2: true,
      userListOptions: [],
      getLineCustomerTwo: [],
      tempRoute: {},
      customers: [],
      cargoList: ['食材', '水果', '方便食品', '团餐外卖', '酒水饮料', '建材', '汽配', '家电', '日化', '家具', '鲜花蛋糕', '3C数码', '洗涤', '印刷品', '服饰鞋帽', '医药保健', '包装', '母婴', '五金', '自行车', '大包裹/仪器', '其他'],
      rules: {
        customer: [{ required: true, message: '请选择货主', trigger: 'change' }],
        city: [{ required: true, message: '请选择城市', trigger: 'change' }],
        name: [{ required: true, message: '请输入线路名称', trigger: 'change' }, { min: 3, message: '长度不可小于3个字符', trigger: 'blur' }],
        cargo: [{ required: true, message: '请选择货物类型', trigger: 'change' }],
        consignee: [{ required: true, message: '请选择收货人类型', trigger: 'change' }],
        carType: [{ required: true, message: '请选择车型', trigger: 'change' }],
        address: [{ required: true, message: '请输入仓位置', trigger: 'change' }],
        distribution: [{ required: true, message: '请选择配送区域是否固定', trigger: 'change' }],
        back: [{ required: true, message: '请选择是否需要返仓', trigger: 'change' }],
        carry: [{ required: true, message: '请选择是否需要搬运', trigger: 'change' }],
        price: [{ required: true, message: '请输入单趟最低价', trigger: 'change' }],
        pointLocationNum: [{ required: true, message: '请输入预计每日平均配送点位', trigger: 'change' }],
        pointLocationDistance: [{ required: true, message: '请输入预计每日平均总公里数', trigger: 'change' }],
        frequency: [{ required: true, message: '请输入预计月频次', trigger: 'change' }],
        startTime: [{ required: false, message: '请输入开始工作时间', trigger: 'change' }],
        groupDeployNum: [{ required: true, message: '请输入集团确认可上车数', trigger: 'change' }],
        deliveryNum: [{ required: true, message: '请输入点位数', trigger: 'change' }],
        endTime: [{ required: false, message: '请输入结束工作时间', trigger: 'change' }],
        volume: [{ required: false, message: '请输入预计每日货物总体积', trigger: 'change' }],
        lapNum: [{ required: true, message: '请输入每日配送趟数', trigger: 'change' }],
        cost: [{ required: false, message: '请输入预计成本', trigger: 'change' }],
        monthlyFuelConsumption: [{ required: true, message: '请输入预计月油耗', trigger: 'change' }],
        month: [{ required: true, message: '请输入每月出车天数', trigger: 'change' }],
        districtArea: [{ required: true, message: '请输入具体线路区域范围', trigger: 'change' }],
        fuelRatio: [{ required: true, message: '请输入油耗占总结算百分比', trigger: 'change' }],
        returnBill: [{ required: true, message: '请选择是否需要回单', trigger: 'change' }],
        timeDiff: [{ required: true, message: '请输入操作时长', trigger: 'change' }],
        cityText: [{ required: true, message: '请选择区域', trigger: 'change' }],
        incomeSettlementMethod: [{ required: true, message: '请选择结算方式', trigger: 'change' }],
        handlingDifficultyDegree: [{ required: true, message: '请选择装卸难度', trigger: 'change' }],
        retentionRate: [{ required: false, message: '请选择留存率', trigger: 'change' }],
        stabilityRate: [{ required: true, message: '请选择稳定性', trigger: 'change' }],
        singleCargoWeight: [{ required: true, message: '请选择预计单件货物重量', trigger: 'change' }],
        income: [{ required: false, message: '请输入预计收入', trigger: 'change' }],
        lowestQuotations: [{ required: true, message: '请输入货主报价', trigger: 'change' }],
        waitDirveValidityDuration: [{ required: true, message: '请输入等待上车有效期', trigger: 'change' }]
      },
      postForm2: {
        classify: '集团客户',
        secondaryClassification: '',
        customerName: '',
        customerNameAll: '',
        city: [],
        customerIdOpposite: '',
        source: '',
        contractEnd: '',
        address: '',
        primaryClassification: '',
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
      cityList: [],
      cityList2: [],
      carList: [],
      consigneeList: [],
      options2: [],
      occurReasonList: [],
      lapNumList: [],
      handlingDifficultyList: [],
      retentionRateList: [],
      stabilityList: [],
      singleCargoWeightList: [],
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
      this.postForm.customer = customerId;
      this.remoteMethod(customerId)
      this.disabled = true;
    }
    if (city) {
      this.postForm.city = city;
      this.disabled = true;
    }
    if (id) {
      this.lineId = id;
      this.editType = true;
      this.getLineDetails(id);
    }
  },
  methods: {
    handleItemChange(val) {
      let id = '';
      this.cityLoading = true;
      this.options2.map((item) => {
        if (item.code === val[0]) {
          id = item.id
        }
      });
      GetCity({
        provinceId: id
      }).then(res => {
        if (res.data.success) {
          this.cityLoading = false;
          const data = res.data.data
          this.options2.map((item, i) => {
            if (item.code === val[0]) {
              item.children = data
            }
          });
        }
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        getLineUser({
          q: query,
          city: this.postForm.city,
          isGroupCustomer: true
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
        this.driverList = [];
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
      GetProvince().then(res => {
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
      // 获取城市
      getCity().then(res => {
        this.cityList2 = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    createNewCustomer() {
      this.dialogFormVisible = true;
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btnPass) {
            this.btnPass = false
            createLineTaskClue({
              'customerId': this.postForm.customer,
              'lineName': this.postForm.name,
              'city': this.postForm.city,
              'carType': this.postForm.carType,
              'cargoType': this.postForm.cargo,
              'deliveryNum': this.postForm.deliveryNum,
              'distance': this.postForm.pointLocationDistance,
              'month': this.postForm.month,
              'dayNum': this.postForm.lapNum,
              'remark': this.postForm.remark,
              'handlingDifficultyDegree': this.postForm.handlingDifficultyDegree,
              'incomeSettlementMethod': this.postForm.incomeSettlementMethod,
              'lowestQuotations': this.postForm.lowestQuotations,
              'monthlyFuelConsumption': this.postForm.monthlyFuelConsumption,
              'stabilityRate': this.postForm.stabilityRate,
              'singleCargoWeight': this.postForm.singleCargoWeight,
              'groupDeployNum': this.postForm.groupDeployNum,
              'timeDiff': this.postForm.timeDiff
            }).then(res => {
              if (res.data.success) {
                if (res.data.data.success) {
                  if (res.data.data.isWtLeader) {
                    let id = res.data.data.id;
                    this.$message({
                      message: '创建成功',
                      type: 'success'
                    });
                    this.$confirm('确认信息后需要补充对应的线路信息，信息补充完整提交后，线路将进入可售线路列表。', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      getNewTender({
                        lineId: id
                      }).then((res) => {
                        if (res.data.success) {
                          this.$message({
                            type: 'success',
                            message: '创建成功'
                          });
                          this.$router.push({ path: '/pend-line' })
                        }
                      }).catch((err) => {
                        this.$message.error(err.data.errorMsg);
                      })
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消'
                      });
                      setTimeout(() => {
                        this.$router.push({ name: 'PendLine' })
                      }, 500)
                    });
                  } else {
                    this.$message({
                      message: '创建成功',
                      type: 'success'
                    });
                    setTimeout(() => {
                      this.$router.push({ name: 'PendLine' })
                    }, 500)
                  }
                } else {
                  this.$message.error('创建失败');
                  this.btnPass = true
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
      this.postForm.cityText = []
      this.postForm.fuelRatio = '';
      this.postForm.deployNum = '';
      this.$refs[formName].resetFields()
    },
    createCustom(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btnPass) {
            this.btnPass = false
            customerSave({
              address: this.postForm2.address,
              billingCycle: this.postForm2.billingCycle,
              businessLicense: this.postForm2.businessLicense.toString(),
              bussinessCard: this.postForm2.bussinessCard,
              bussinessName: this.postForm2.bussinessName,
              bussinessPhone: this.postForm2.bussinessPhone,
              cities: this.postForm2.city,
              contractEnd: this.postForm2.contractEnd,
              contractStart: this.postForm2.contractStart,
              currentMonth: this.postForm2.currentMonth,
              customerId: this.postForm2.customerId,
              customerName: this.postForm2.customerName,
              secondaryClassification: this.postForm2.secondaryClassification,
              customerNameAll: this.postForm2.customerNameAll,
              remark: this.postForm2.remark
            }).then((res) => {
              if (res.data.success) {
                this.$message({
                  type: 'success',
                  message: '创建成功'
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.addLineClue{
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
  .el-dialog{
    width: 60%;
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

