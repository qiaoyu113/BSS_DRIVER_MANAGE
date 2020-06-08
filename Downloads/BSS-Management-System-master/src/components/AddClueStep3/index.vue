<template>
  <div class="AddClueStep3">
    <el-timeline>
      <el-timeline-item timestamp="跟进信息" placement="top">
        <el-card>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>跟进方式 </el-header>
                  <el-main>{{ postForm.wayName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>跟进情况 </el-header>
                  <el-main>{{ postForm.situation | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="基本信息" placement="top">
        <el-card>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>姓名 </el-header>
                  <el-main>{{ postForm.name | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>联系电话 </el-header>
                  <el-main>{{ postForm.phone | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col v-if="postForm.wechatId" :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>微信号 </el-header>
                  <el-main>{{ postForm.wechatId | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>来源渠道 </el-header>
                  <el-main>{{ postForm.sourceTypeName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <!--<el-col :span="8">-->
            <!--<el-card shadow="hover">-->
            <!--<el-container>-->
            <!--<el-header>货物运输经验(月) </el-header>-->
            <!--<el-main>{{ postForm.cargoExperience | DataIsNull }}</el-main>-->
            <!--</el-container>-->
            <!--</el-card>-->
            <!--</el-col>-->
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>工作城市 </el-header>
                  <el-main>{{ postForm.workCityName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>是否能邀约面试 </el-header>
                  <el-main v-if="postForm.sendMsg">是</el-main>
                  <el-main v-if="!postForm.sendMsg">否</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row v-if="postForm.sendMsg">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>预约面试时间 </el-header>
                  <el-main>{{ postForm.inviteDate | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>是否能发送邀约短信 </el-header>
                  <el-main>{{ postForm.inviteDate | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>联系人 </el-header>
                  <el-main>{{ postForm.contactData | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row>
            <!--<el-col :span="8">-->
            <!--<el-card shadow="hover">-->
            <!--<el-container>-->
            <!--<el-header>司机意向 </el-header>-->
            <!--<el-main v-if="postForm.hasIntention === 1">有意向</el-main>-->
            <!--<el-main v-else-if="postForm.hasIntention === 2">无意向</el-main>-->
            <!--<el-main v-else>暂无数据</el-main>-->
            <!--</el-container>-->
            <!--</el-card>-->
            <!--</el-col>-->
            <el-col v-if="postForm.hasIntention === 2" :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>无意向原因 </el-header>
                  <el-main>{{ postForm.unintentionalReason | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>是否添加微信 </el-header>
                  <el-main v-if="postForm.isAddWechat === 1">是</el-main>
                  <el-main v-else-if="postForm.isAddWechat === 2">否</el-main>
                  <el-main v-else>暂无数据</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="24">
              <el-card shadow="hover">
                <el-container>
                  <el-header>备注 </el-header>
                  <el-main>{{ postForm.remark | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="入驻信息" placement="top">
        <el-card>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>物流从业经验 </el-header>
                  <el-main>{{ postForm.workExperienceName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>货物经验 </el-header>
                  <el-main>{{ postForm.cargoTypeName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>期望月收入 </el-header>
                  <el-main>{{ postForm.expMonthlyIncomeName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>可接受一天工作时长 </el-header>
                  <el-main>{{ postForm.workHourName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>意向车型 </el-header>
                  <el-main>{{ postForm.carTypeName | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>户口类型 </el-header>
                  <el-main>{{ postForm.accountType | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>是否有在还贷款 </el-header>
                  <el-main v-if="postForm.isHaveLoan === 1">是</el-main>
                  <el-main v-if="postForm.isHaveLoan === 2">否</el-main>
                  <el-main v-else>暂无数据</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>家里有几个孩子 </el-header>
                  <el-main>{{ postForm.childrenNum | DataIsNull }}个</el-main>
                </el-container>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>购车最关注哪些方面 </el-header>
                  <el-main>{{ postForm.buyCarFollow }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="操作" class="noTimeLine" placement="top">
        <el-card>
          <div>
            <el-button v-if="postForm.driverId" type="primary" @click="goCarDetail(postForm.driverId)">查看司机信息</el-button>
            <el-button type="info" @click="back()">返回线索列表</el-button>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { clueInfo } from '@/api/clue/clue-api'
import '@/styles/qiaoyu.scss'

export default {
  name: 'AddClueStep3',
  data() {
    var token = localStorage.getItem('Admin-Token')
    return {
      id: '',
      dialogImageUrl: '',
      stepsIndex: 1,
      dialogVisible: false,
      loading: false,
      disabled: true,
      customerIdOppositeType: false,
      userListOptions: [],
      tempRoute: {},
      customers: [],
      myHeaders: { Authorization: token },
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
      postForm: {}
    }
  },
  computed: {},
  watch: {

  },
  created() {},
  mounted() {
    let id = this.$route.query.id
    this.id = id;
    this.GetInfo(id)
  },
  methods: {
    GetInfo(id) {
      clueInfo({
        clueId: id
      }).then(res => {
        if (res.data.success) {
          let detail = res.data.data
          if (detail.accountType === 1) {
            detail.accountType = '城镇户口'
          }
          if (detail.accountType === 2) {
            detail.accountType = '农村户口'
          } else {
            detail.accountType = '暂无数据'
          }
          detail.buyCarFollow = detail.buyCarFollow.replace(',', '');
          this.postForm = Object.assign(detail, this.postForm)
        }
      })
    },
    goCarDetail(id) {
      this.$router.push({ path: '/driver-detail', query: { id: id }})
    },
    back() {
      this.$router.push({ name: 'ClueListNew' })
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .AddClueStep3{
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
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
    .bold{
      color:#000;
      font-weight: bold;
    }
    .el-button--mini {
      width: auto
    }
    .el-button--primary.is-plain.no-bg{
      background: none;
      font-weight: bold;
      .val{
        color:#606266;
        font-weight: normal;
      }
    }
    .no-bg:hover{
      background: none !important;
      color: inherit;
    }
  }
  .el-input.is-disabled .el-input__inner{
    background-color: #fff!important;
  }
  .el-textarea.is-disabled .el-textarea__inner{
    background-color: #fff!important;
  }
</style>
