<template>
  <div class="CardItemcontainer" @click="handleDetailClick(obj)">
    <h4 class="title ellipsis">
      {{ obj.projectName }}
    </h4>
    <p class="dai">
      {{ obj.reportState ? '已上报':'待上报' }}
    </p>
    <div class="textBox">
      <p class="text ellipsis">
        上岗经理:{{ obj.dutyManagerName +'/'+ obj.dutyManagerPhone }}
      </p>
      <p class="text ellipsis">
        出车单数:{{ obj.wayBillNum+'个' }}
      </p>
      <p class="text ellipsis">
        上报单数:{{ `未上报${obj.wayBillNum - obj.lineReportedNum}/已上报${obj.lineReportedNum}` }} <span v-if="obj.isDiff && obj.reportState" class="differ">{{ obj.lineReportedMoney || 0 }}元</span>
      </p>
      <div v-if="obj.isDiff && obj.reportState" class="text2 ellipsis">
        <p class="differ">
          有差异
        </p>
        <p class="right_text">
          {{ obj.lineReportedMoney || 0 }}元
        </p>
      </div>
    </div>
    <div
      v-permission="['/v2/waybill/getProjectWayBillList']"
      class="detail van-hairline--top"
    >
      <van-button round plain size="small" class="routeBtn" type="default">
        详情
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { shippingDetailByGM } from '@/api/freight'

export default {
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + MM + '-' + d;
    }
  },
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  methods: {
    /**
     * 线路详情
     */
    handleDetailClick(item) {
      // this.getGmInfoList(id)
      let disable = this.permission('/v2/waybill/getProjectWayBillList')
      if (disable) {
        this.$router.push({
          path: '/outsidefreightlist',
          query: {
            id: item.projectId,
            start: item.startDate,
            end: item.endDate,
            title: item.name
          }
        })
      } else {
        this.$toast.fail('暂无详情权限')
      }
    },
    permission(val) {
      const permissionList = this.userData.stringPermissions
      return permissionList.some(item => item === val)
    },
    async getGmInfoList(id) {
      try {
        let parmas = {
          wayBillId: id
        }
        let { data: res } = await shippingDetailByGM(parmas)
        if (res.success) {
          this.$router.push({
            path: '/outsidefreightlist',
            query: { obj: res.data,
              type: '1' }
          })
        } else {
          // this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get search data fail:${err}`)
      }
    }

  }
}

</script>

<style lang='scss'>
.CardItemcontainer {
  padding: 5px 15px 0px;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .title {
    margin: 10px 0px;
    font-size: 14px;
    color: #3C4353;
  }
  .title>span{
    float: right;
  }
  .textBox{
    padding: 10px 0;
  }
  .text {
    font-size: 13px;
    // padding: 0 10px;
    box-sizing: border-box;
    color: #3C4353;
    margin: 0;
    line-height: 24px;
    .differ{
      height: 25px;
      line-height: 25px;
      float: right;
      margin: auto;
      color: #7F8FBD;
    }
  }
  .text2 {
    height: 25px;
    font-size: 13px;
    padding: 0;
    box-sizing: border-box;
    color: #3C4353;
    margin: 0 -10px;
    margin-top: 4px;
    .differ{
      padding:3px 15px;
      box-sizing: border-box;
      background: #EFF5FE;
      border-radius: 3px;
      font-size: 13px;
      color: #649CEE;
      display: inline-block;
      margin: 0;
      height: 25px;
    }
    .right_text{
      height: 25px;
      line-height: 25px;
      float: right;
      margin: auto;
      color: #7F8FBD;
    }
  }
  .footer {
    margin-bottom:12.5px;
    display: flex;
    flex-direction: column;
    .time {
      margin: 0px;
      font-size: 11px;
      color: #838A9D;
      line-height: 20px;
    }
    .right {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .tag {
        margin-right:5px;
        padding: 3px 10px;
      }
    }
  }
  .detail {
    padding: 5px 0px;
    text-align: center;
    // border-top: 1px solid #D8D8D8;
    .routeBtn{
      width: 70px;
      height: 22px;
      padding: 2px 0;
      line-height: normal;
      color: #838a9d;
      border-radius: 10px;
      text-align: center;
      font-size: 12px;
      &::after {
        border-radius: 20px;
      }
    }
  }
}
.dai{
  border: 1px solid #FF5D5D;
  border-radius: 12px;
  border-radius: 10px;
  display: inline;
  padding: 2px 6px;
  text-align: center;
  color: #FF5D5D;
}

</style>

<style scoped>
  .CardItemcontainer >>> .van-button--default  {
    color:#838A9D;
    background: #fff;
    width: 70px;
    height: 22px;
    line-height: 22px;
    font-size: 13px;
  }
</style>
