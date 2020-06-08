<template>
  <div class="tenderAudit">
    <p class="warn-content" style="margin: 0;color:#4493E4;">线路任务审核，请详看参数是否准确</p>
    <div class="tenderBox">
      <el-timeline>
        <mallki :text="detail.lineName" class-name="mallki-text"/>
        <!--<el-timeline-item timestamp="线路状态" style="margin-top: 20px;" placement="top">-->
        <!--<el-card>-->
        <!--<el-card shadow="hover">-->
        <!--<el-container>-->
        <!--<el-main>-->
        <!--<div class="waitPass">{{ detail.city }}</div>-->
        <!--<div class="noPass">{{ detail.city }}</div>-->
        <!--<div class="pass">{{ detail.city }}</div>-->
        <!--</el-main>-->
        <!--<el-main>操作人: {{ detail.city }}</el-main>-->
        <!--</el-container>-->
        <!--</el-card>-->
        <!--</el-card>-->
        <!--</el-timeline-item>-->
        <el-timeline-item timestamp="基本信息" style="margin-top: 20px;" placement="top">
          <el-card>
            <el-row :gutter="12">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>货主 </el-header>
                    <el-main>{{ detail.customerName }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>城市 </el-header>
                    <el-main>{{ detail.cityName }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>线路名称 </el-header>
                    <el-main>{{ detail.lineName }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="12">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>货物类型 </el-header>
                    <el-main>{{ detail.cargoType }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>收货人类型 </el-header>
                    <el-main>{{ detail.receiverType }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>车型 </el-header>

                    <el-main>{{ detail.carTypeName }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="12">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>仓位置 </el-header>
                    <el-main>{{ detail.warehouse }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>配送点是否固定 </el-header>
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
              <el-col v-if="detail.incomeSettlementMethod === 1" :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>货主单趟最低报价 </el-header>
                    <el-main>{{ detail.preLowestQuotations | NumFormat }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col v-if="detail.incomeSettlementMethod === 2" :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>货主预计报价(月) </el-header>
                    <el-main>{{ detail.preLowestQuotations | NumFormat }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>线路编号 </el-header>
                    <el-main>{{ detail.lineId }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>线路类型 </el-header>
                    <el-main>{{ detail.distinguishedTypeName | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col v-if="detail.waitDirveValidityDuration > 0" :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>线路失效截止时间 </el-header>
                    <el-main>{{ detail.waitDirveValidity | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col v-if="detail.waitDirveValidityDuration > 0" :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>等待上车有效期（天） </el-header>
                    <el-main>{{ detail.waitDirveValidityDuration | DataIsNull }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>首岗是否有人跟车
                    </el-header>
                    <el-main>
                      <svg-icon v-if="detail.firstNeededFollow === 2" icon-class="noPass" />
                      <svg-icon v-if="detail.firstNeededFollow === 1" icon-class="pass" />
                    </el-main>
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
                    <el-main>{{ detail.deliveryNum }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>预计每日平均总里程(公里) </el-header>
                    <el-main>{{ detail.distance }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>预计月频次 </el-header>
                    <el-main>{{ detail.month }}</el-main>
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
                    <el-main>{{ detail.volume }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>每日配送趟数 </el-header>
                    <el-main>{{ detail.dayNum }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="关键信息核对" placement="top">
          <el-card>
            <el-row :gutter="12">
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>预计月收入 </el-header>
                    <el-main>{{ monthlyTransaction | NumFormat }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>每日总里程（公里） </el-header>
                    <el-main>{{ detail.distance | NumFormat }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card shadow="hover">
                  <el-container>
                    <el-header>配送总时长 </el-header>
                    <el-main>{{ timeDiff }}</el-main>
                  </el-container>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="审核操作" placement="top">
          <el-button v-permission="['/line/line/task/manuallyCreateTender']" :disabled="disabled" type="primary" @click="passBtn(detail.lineId, true)">审核通过(可创建标书)</el-button>
          <el-button v-permission="['/line/line/task/manuallyCreateTender']" :disabled="disabled" type="primary" @click="passBtn(detail.lineId, false)">审核通过</el-button>
          <el-button :disabled="disabled" type="danger" @click="noPassBtn(detail.lineId)">拒绝通过</el-button>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="标书信息" @close="changeRouter">
      <el-form
        label-position="left"
        label-width="100px"
        style="width: 600px; margin-left:50px;">
        <el-timeline>
          <el-timeline-item timestamp="基本信息" placement="top">
            <el-card>
              <el-row :gutter="12">
                <el-col :span="12">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>货主编号 </el-header>
                      <el-main>{{ detail.customerId }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>货主名称 </el-header>
                      <el-main>{{ detail.customerName }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>
              <el-row :gutter="12">
                <el-col :span="12">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>线路编号 </el-header>
                      <el-main>{{ detail.lineId }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>线路名称 </el-header>
                      <el-main>{{ detail.lineName }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>
              <el-row :gutter="12">
                <el-col :span="12">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>仓位置 </el-header>
                      <el-main>{{ detail.warehouse }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
                <el-col :span="12">
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
              <el-row :gutter="12">
                <el-col :span="12">
                  <el-card shadow="hover">
                    <el-container>
                      <el-header>城市 </el-header>
                      <el-main>{{ detail.cityName }}</el-main>
                    </el-container>
                  </el-card>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="操作" placement="top">
            <el-button type="primary" @click="changeRouter">确定</el-button>
          </el-timeline-item>
        </el-timeline>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { GetTenderDetail, passTender, NopassTender, getNewTender } from '@/api/tender/tender-api'
import '@/styles/qiaoyu.scss'
import Mallki from '@/components/TextHoverEffect/Mallki'
import permission from '@/directive/permission/index'
import role from '@/directive/role/index'

export default {
  name: 'TenderAudit',
  components: { Mallki, role, permission },
  data() {
    return {
      loading: false,
      disabled: false,
      dialogFormVisible: false,
      detail: {
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
        price: '',
        pointLocationNum: '',
        pointLocationDistance: '',
        frequency: '',
        startTime: '',
        endTime: '',
        weight: '',
        volume: '',
        lapNum: '',
        cost: '',
        income: '',
        profit: ''
      },
      timeDiff: '0',
      monthlyTransaction: '0',
      tenderId: '',
      newTender: ''
    }
  },
  created() {},
  mounted() {
    const id = this.$route.query.id
    this.tenderId = this.$route.query.tenderId
    this.timeDiff = this.$route.query.timeDiff
    this.monthlyTransaction = this.$route.query.monthlyTransaction
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      GetTenderDetail({ lineId: id }).then(res => {
        if (res.data.success) {
          this.detail = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    passBtn(id, type) {
      this.disabled = true
      passTender({
        'lineId': id,
        'tenderId': this.tenderId,
        'reason': ''
      }).then(res => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '审核已通过 '
          });
          if (type) {
            this.$confirm('是否立即创建标书?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // setTimeout(() => {
              //   this.$router.push({ path: '/car-line' })
              // }, 500)
              getNewTender({
                lineId: id
              }).then((res) => {
                if (res.data.success) {
                  this.$message({
                    type: 'success',
                    message: '创建成功'
                  });
                  this.dialogFormVisible = true;
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
            setTimeout(() => {
              this.$router.push({ name: 'PendLine' })
            }, 500)
          }
        } else {
          this.disabled = false
          this.$message.error(res.data.errorMsg);
        }
      })
    },
    noPassBtn(id) {
      this.disabled = true
      this.$prompt('请输入拒绝理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (!value || value === '') {
          this.$message({
            type: 'warning',
            message: '请输入拒绝理由'
          });
          this.disabled = false
          return false;
        }
        NopassTender({
          'lineId': id,
          'tenderId': this.tenderId,
          'reason': value
        }).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '审核已拒绝 '
            });
            setTimeout(() => {
              this.$router.push({ name: 'PendLine' })
            }, 500)
          } else {
            this.disabled = false
            this.$message.error(res.data.errorMsg);
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        });
        this.disabled = false
      });
    },
    changeRouter() {
      this.dialogFormVisible = false;
      setTimeout(() => {
        this.$router.push({ name: 'WaitTogetherTender' })
      }, 500)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .tenderAudit {
    .tenderBox{
      padding: 20px;
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
  .el-message{
    z-index: 3000 !important;
  }
</style>
