<template>
  <div class="CardItemcontainer" @click="handleDetailClick">
    <h4 class="title van-ellipsis">
      {{ obj.customerCompanyName }} ({{ obj.customerId }}) {{ obj.customerTypeName }}
    </h4>
    <p class="text van-ellipsis">
      联系人:{{ obj.bussinessName }}
    </p>
    <p class="text van-ellipsis">
      手机:{{ obj.bussinessPhone }}
    </p>
    <p class="text van-ellipsis">
      客户属性:{{ obj.customerTypeName }}
    </p>
    <div class="footer">
      <div class="right">
        <p class="time">
          创建时间:{{ obj.createDate | parseTime('{y}-{m}-{d}') }}
        </p>
        <div>
          <van-tag
            v-if="obj.customerState ===2"
            class="tag"
            color="#3acb8d1a"
            text-color="#3ACB8D"
          >
            已启用
          </van-tag>
          <van-tag
            v-if="obj.customerState ===1"
            class="tag"
            color="#ffa0001a"
            text-color="#FFA000"
          >
            已禁用
          </van-tag>
        </div>
      </div>
    </div>
    <div class="detail van-hairline--top">
      <van-button type="default" round hairline>
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
     * 客户详情
     */
    handleDetailClick() {
      this.$router.push({
        path: '/clientDetail',
        query: {
          customerId: this.obj.customerId
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
