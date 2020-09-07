<template>
  <div>
    <div class="CardItemcontainer">
      <h4 class="title ellipsis">
        <van-checkbox v-model="obj.checked">
          {{ obj.departureDate }}/ {{ obj.driverName }}/{{ obj.driverPhone }}
        </van-checkbox>
      </h4>
      <p class="Pink">
        {{ obj.statusName }}
      </p>
      <p class="text ellipsis">
        出车单号:{{ obj.wayBillId }}
      </p>
      <p class="text ellipsis">
        线路名称:{{ obj.lineName }}
      </p>

      <div class="detail van-hairline--top">
        <van-button type="default" round hairline @click="handleDetailClick">
          详情
        </van-button>
      </div>
    </div>
    <div class="Bulk">
      <button @click="cancel()">
        取消批量上传
      </button>
      <button @click="Add_to">
        批量上报运费
      </button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
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
      this.$router.push({ name: '/detail', params: { type: '1' }})
    },
    cancel() {
      this.$router.go(-1)
    },
    Add_to() {
      if (this.obj.checked === true) {
        this.$router.push({
          path: '/report',
          query: {
            obj: JSON.stringify(this.obj)
          }
        })
      } else {
        Toast.fail('请选择上报运费');
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
.all{
  margin-left: 20px;
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

  border: 1px solid #ff00008a;
  color: #ff00008a;
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
