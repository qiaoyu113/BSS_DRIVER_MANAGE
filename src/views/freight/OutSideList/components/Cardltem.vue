<template>
  <div class="CardItemcontainer">
    <h4 class="title ellipsis">
      {{ obj.projectName }}
    </h4>

    <p class="text ellipsis">
      上岗经理:{{ obj.dutyManagerName }}/{{ obj.dutyManagerPhone }}
    </p>
    <p class="text ellipsis">
      出车单数:{{ obj.wayBillNum }}
    </p>
    <p class="text ellipsis">
      上报单数:{{ obj.lineReportedNum }}
    </p>
    <div class="detail van-hairline--top">
      <van-button type="default" round hairline @click="handleDetailClick(obj)">
        详情
      </van-button>
    </div>
  </div>
</template>

<script>
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
        path: '/outsidebatch1',
        query: { endDate: obj.startDate,
          startDate: obj.endDate,
          projectId: obj.projectId
        }
      })
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
