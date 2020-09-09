<template>
  <div class="CardItemcontainer">
    <h4 class="title ellipsis">
      {{ obj.driverName }}/{{ obj.driverPhone }}
    </h4>
    <p v-if="obj.statusName != ''" class="dai">
      {{ obj.statusName }}
    </p>
    <p class="text ellipsis">
      出车单号:{{ obj.wayBillId }}
    </p>
    <p class="text ellipsis">
      加盟经理:{{ obj.joinManagerName }}
    </p>
    <p class="text ellipsis">
      路线名称:{{ obj.lineName }}
    </p>
    <div class="detail van-hairline--top">
      <van-button type="default" round hairline @click="handleDetailClick(obj)">
        详情
      </van-button>
    </div>
  </div>
</template>

<script>
import { getProjectWayBillList } from '@/api/freight'
export default {
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    /**
     * 线路详情
     */
    handleDetailClick(obj) {
      this.$router.push({
        path: '/outsidebatch'

      })
      this.getGmInfoList(obj.project)
    },
    async getGmInfoList(id) {
      try {
        let parmas = {

          projectId: id
        }
        let { data: res } = await getProjectWayBillList(parmas)
        if (res.success) {
          this.$router.push({
            path: '/outsidebatch',
            query: { obj: res.data }
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

<style lang='scss' scoped>
.CardItemcontainer {
  padding: 0px 15px;
  font-family: PingFangSC-Semibold;
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
  .text {
    margin-top:0px;
    margin-bottom:8px;
    font-size: 13px;
    color: #3C4353;
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
    padding: 7px 0px;
    text-align: center;
    border-top-color:#D8D8D8;
  }
}
.dai{
  width: 40px;
  height: 15px;
  border: 1px solid #FF5D5D;
  border-radius: 10px;
  text-align: center;
  color: #FF5D5D;
}

</style>

<style scoped>
  .CardItemcontainer >>> .van-button--default  {
    color:#838A9D;
    background: #fff;
    height:70px;
    height:20px;
  }
</style>
