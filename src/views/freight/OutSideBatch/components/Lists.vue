<template>
  <div>
    <div class="CardItemcontainer">
      <h4 class="title ellipsis">
        {{ obj.departureDate |formatDate }}/ {{ obj.driverName }}/{{ obj.driverPhone }}
      </h4>

      <p class="text ellipsis">
        出车单号:{{ obj.wayBillId }}
      </p>
      <p class="text ellipsis">
        线路名称:{{ obj.lineName }} /{{ obj.lineId }}
      </p>

      <div class="detail van-hairline--top">
        <van-button type="default" round hairline @click="handleDetailClick(obj)">
          详情
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'vant'
import { shippingDetailBySale } from '@/api/freight'
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
    },
    checkedarr: {
      type: Array,
      default: () => {}
    },
    shipper: {
      type: Boolean,
      default: () => {}
    }
  },
  mounted() {

  },
  methods: {
    /**
     * 线路详情
     */
    handleDetailClick(obj) {
      this.getGmInfoList(obj.wayBillId)
    },
    async getGmInfoList(id) {
      try {
        let parmas = {
          wayBillId: id
        }
        let { data: res } = await shippingDetailBySale(parmas)
        if (res.success) {
          this.$router.push({
            path: '/detail',
            query: { obj: res.data,
              type: '2' }
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
  padding: 0px 30px;
  margin-top: 20px;
  margin-left:20px ;
  font-family: PingFangSC-Semibold;
  position: relative;
  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .title {
    margin: 10px 0px;
    font-size: 14px;
    color: #3C4353 ;
    position: relative;
  }
  .text {
    margin-top:0px;
    margin-bottom:8px;
    font-size: 13px;
    color: #3C4353 ;
  }
  .text_xiang{
    float: right;
    color: blue ;
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
.Bulk{
  width: 100%;
  height: 50px;
  background: oldlace;
  display: flex;
  z-index: 999;
  justify-content: space-between;

  position: fixed;
  bottom: 0;
}
.Bulk>button{
  border: none;
  border-radius: 5px;
}
.Bulk>button:nth-child(1){
  width: 50%;
    background: #ddd;
}
.Bulk>button:nth-child(2){
  width: 50%;
  color: #fff;;
  background: #0000ff75;
}
.Pink{
  width: 50px;
  line-height: 20px;
  text-align: center;
  border-radius:10px ;
  overflow: hidden;

  border: 1px solid #ff00008a;
  color: #ff00008a;
}
.checked{
  position: absolute;
  left: 0;
  top: 30px;
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
