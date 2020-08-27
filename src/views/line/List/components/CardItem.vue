<template>
  <div class="CardItemcontainer">
    <h4 class="title ellipsis">
      {{ obj.title }}
    </h4>
    <p class="text ellipsis">
      上架有效期:{{ obj.update }}
    </p>
    <p class="text ellipsis">
      {{ obj.line }}
    </p>
    <p class="text ellipsis">
      配送类型{{ obj.carType }}
    </p>
    <p class="text ellipsis">
      试跑状态:{{ obj.status }}
    </p>
    <div class="footer">
      <p class="time">
        到仓时间:{{ obj.rearchDate }}
      </p>
      <div class="right">
        <p class="time">
          预计工作时间:{{ obj.worktime }}
        </p>
        <div>
          <van-tag v-for="tag in obj.tags" :key="tag" type="primary" color="#EFF5FE" text-color="#7F8FBD" class="tag">
            {{ tag }}
          </van-tag>
        </div>
      </div>
    </div>
    <div class="detail van-hairline--top">
      <van-button type="default" round hairline @click="handleDetailClick">
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
    handleDetailClick() {
      this.$router.push({
        path: '/lineDetail'
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

</style>

<style scoped>
  .CardItemcontainer >>> .van-button--default  {
    color:#838A9D;
    background: #fff;
    height:70px;
    height:20px;
  }
</style>
