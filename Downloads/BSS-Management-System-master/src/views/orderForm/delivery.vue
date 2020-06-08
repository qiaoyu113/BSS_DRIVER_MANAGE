<template>
  <div class="delivery">
    <div class="fromBox">
      <mallki text="交付信息" class-name="mallki-text"/>
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <el-timeline>
          <el-timeline-item timestamp="基本信息" placement="top">
            <el-card>
              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="车牌号" prop="numberPlate" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.numberPlate" placeholder="请输入车牌号" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="车架号" prop="frameNumber" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.frameNumber" placeholder="请输入车架号" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="发动机品牌型号" prop="model" class="postInfo-container-item inlineBlock">
                        <el-input v-model="postForm.model" placeholder="请输入发动机品牌型号" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="颜色" class="postInfo-container-item">
                        <el-input v-model="postForm.color" placeholder="请输入颜色" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="载质量(吨)" class="postInfo-container-item">
                        <el-input v-model="postForm.loadCapacity" type="number" placeholder="请输入载质量" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="总质量(吨)" class="postInfo-container-item">
                        <el-input v-model="postForm.totalWeight" type="number" placeholder="请输入总质量" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="整备质量(吨)" class="postInfo-container-item">
                        <el-input v-model="postForm.equipmentQuality" type="number" placeholder="请输入整备质量" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="轮胎大小" class="postInfo-container-item">
                        <el-input v-model="postForm.tireSize" type="number" placeholder="请输入轮胎大小" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label-width="150px" label="配备补充备注" class="postInfo-container-item">
                        <el-input v-model="postForm.remark" placeholder="请输入配备补充备注" style="display: inline-block"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="150px" label="刹车系统" class="postInfo-container-item inlineBlock">
                        <el-select v-model="postForm.brakeSystem" placeholder="请选择">
                          <el-option label="气刹" value="1"></el-option>
                          <el-option label="断气刹" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="16">
                      <el-form-item label-width="150px" label="其他参数" class="postInfo-container-item inlineBlock">
                        <el-checkbox-group v-model="postForm.other">
                          <el-checkbox label="动转" name="动转"></el-checkbox>
                          <el-checkbox label="空调" name="空调"></el-checkbox>
                          <el-checkbox label="金属漆" name="金属漆"></el-checkbox>
                          <el-checkbox label="普通漆" name="普通漆"></el-checkbox>
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
                      <el-form-item label-width="150px" label="交付时间" prop="dueTime" class="postInfo-container-item">
                        <el-date-picker
                          v-model="postForm.dueTime"
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

          <el-timeline-item timestamp="完成提交" class="noTimeLine" placement="top">
            <el-card>
              <div>
                <el-button v-if="!editType" type="primary" @click="submitForm('postForm')">提交</el-button>
                <el-button @click="resetForm('postForm')">重置</el-button>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-form>
    </div>
  </div>
</template>

<script>
import { creatDelivery } from '@/api/order/order-api'
import '@/styles/qiaoyu.scss'
import Mallki from '@/components/TextHoverEffect/Mallki'

const defaultForm = {
  brakeSystem: '',
  color: '',
  driverId: '',
  dueTime: '',
  equipmentQuality: '',
  frameNumber: '',
  loadCapacity: '',
  model: '',
  numberPlate: '',
  orderId: '',
  other: [],
  remark: '',
  tireSize: '',
  totalWeight: ''
}

export default {
  name: 'Delivery',
  components: { Mallki },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      tempRoute: {},
      customers: [],
      clientNoList: ['食材', '水果', '方便食品', '团餐外卖', '酒水饮料', '建材', '汽配', '家电', '日化', '家具', '鲜花蛋糕', '3C数码', '洗涤', '印刷品', '服饰鞋帽', '医药保健', '包装', '母婴', '五金', '自行车', '大包裹/仪器', '其他'],
      rules: {
        numberPlate: [{ required: true, message: '请输入车牌号', trigger: 'change' }],
        frameNumber: [{ required: true, message: '请输入车架号', trigger: 'change' }],
        model: [{ required: true, message: '请输入发动机品牌型号', trigger: 'change' }],
        dueTime: [{ required: true, message: '请输入交付时间', trigger: 'change' }]
      },
      editType: false,
      orderId: '',
      driverId: '',
      upImgData: '',
      sourseList: [],
      btnPass: true,
      cityList: []
    }
  },
  computed: {},
  watch: {
    'postForm.cost'(val) {
      this.postForm.profit = Number(this.postForm.income) - Number(val);
    },
    'postForm.income'(val) {
      this.postForm.profit = Number(val) - Number(this.postForm.cost);
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
    const driverId = this.$route.query.driverId;
    const orderId = this.$route.query.orderId;
    if (driverId) {
      this.orderId = orderId;
      this.driverId = driverId;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (this.btnPass) {
          if (valid) {
            this.btnPass = false
            creatDelivery({
              brakeSystem: this.postForm.brakeSystem,
              color: this.postForm.color,
              driverId: this.driverId,
              dueTime: this.postForm.dueTime,
              equipmentQuality: this.postForm.equipmentQuality,
              frameNumber: this.postForm.frameNumber,
              loadCapacity: this.postForm.loadCapacity,
              model: this.postForm.model,
              numberPlate: this.postForm.numberPlate,
              orderId: this.orderId,
              other: this.postForm.other.toString(),
              remark: this.postForm.remark,
              tireSize: this.postForm.tireSize,
              totalWeight: this.postForm.totalWeight
            }).then(res => {
              if (res.data.success) {
                this.$message({
                  message: '创建成功',
                  type: 'success'
                });
                setTimeout(() => {
                  this.$router.push({ name: 'ClinchOrder' })
                }, 1000)
              } else {
                this.$message.error(res.data.errorMsg);
                this.btnPass = true
              }
            }).catch((err) => {
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
      this.$refs[formName].resetFields()
      this.postForm.customerIdOpposite = ''
      this.postForm.remark = ''
      this.postForm.businessLicense = []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .delivery{
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

