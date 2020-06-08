<template>
  <div class="addClueNew">
    <div class="stepsBox">
      <el-steps :active="stepsIndex">
        <el-step title="添加线索信息"></el-step>
        <el-step title="线索跟进"></el-step>
        <el-step title="面试成功-完成转化"></el-step>
      </el-steps>
    </div>
    <AddClueStep1 v-if="stepsIndex === 1"></AddClueStep1>
    <AddClueStep2 v-if="stepsIndex === 2"></AddClueStep2>
    <AddClueStep3 v-if="stepsIndex === 3"></AddClueStep3>
  </div>
</template>

<script>
// import { saveClue, translateClue, PostClueDetail } from '@/api/clue/clue-api'
import { dictionary } from '@/api/common'
import AddClueStep1 from '@/components/AddClueStep1'
import AddClueStep2 from '@/components/AddClueStep2'
import AddClueStep3 from '@/components/AddClueStep3'
import '@/styles/qiaoyu.scss'

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
  name: 'AddClueNew',
  components: { AddClueStep1, AddClueStep2, AddClueStep3 },
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
      stepsIndex: 1,
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
  created() {},
  mounted() {
    let index = this.$route.query.index;
    this.stepsIndex = Number(index)
    this.fetchData()
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
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss" scoped>
  .addClueNew{
    width:100%;
    padding:20px;
    box-sizing: border-box;
    .stepsBox{
      padding:20px 50px;
      box-sizing: border-box;
    }
  }
</style>
