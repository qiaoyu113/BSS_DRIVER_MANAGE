<template>
  <div class="CardItemcontainer" @click="handleDetailClick">
    <p class="title van-ellipsis">
      {{ obj.customerCompanyName }} ({{ obj.customerId }}) {{ obj.customerTypeName }}
    </p>
    <p class="text van-ellipsis">
      联系人:{{ obj.bussinessName | DataIsNull }}
    </p>
    <p class="text van-ellipsis">
      手机:{{ obj.bussinessPhone | DataIsNull }}
    </p>
    <p class="text van-ellipsis">
      客户属性:{{ obj.classificationName | DataIsNull }}
    </p>
    <div class="footer">
      <div class="right">
        <p class="time">
          创建时间:{{ timeFormat(obj.createDate,'YYYY-MM-DD HH:mm:ss') }}
        </p>
        <div>
          <van-tag
            v-if="obj.customerState ===2"
            class="tag"
            color="rgba(58, 203, 141, 0.1)"
            text-color="#3ACB8D"
          >
            已启用
          </van-tag>
          <van-tag
            v-if="obj.customerState ===1"
            class="tag"
            color="rgba(255, 160, 0, 0.1)"
            text-color="#FFA000"
          >
            已禁用
          </van-tag>
        </div>
      </div>
    </div>
    <div v-permission="['/v2/line/customer/findCustomerInfo']" class="detail van-hairline--top">
      <van-button type="default" round hairline>
        详情
      </van-button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
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
      if (!this.$permissionDetail('/v2/line/customer/findCustomerInfo')) return
      if (this.$checkRouteIsNull(this.obj.customerId)) {
        this.$router.push({
          path: '/clientDetail',
          query: {
            customerId: this.obj.customerId
          }
        })
      }
    },
    // YYYY-MM-DD dddd HH:mm:ss
    timeFormat(date, format) {
      return dayjs(date).format(format)
    }
  }
}

</script>

<style lang='scss' scoped>
.CardItemcontainer {
  margin-top:5px;
  padding: 0px 15px;
  box-sizing: border-box;
  background: #fff;
  .title {
    margin: 0;
    padding:10px 0;
    box-sizing: border-box;
    font-size: 14px;
    color: #3C4353;
    font-weight: bold;
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
