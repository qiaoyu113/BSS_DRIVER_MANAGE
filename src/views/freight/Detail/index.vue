<template>
  <div class="lineListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="运费详情" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="headerRight" @click="showPopup">
            上报
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- <div v-for="item in obj" :key="item" class="CardItemcontainer megin">
      <h4 class="title ellipsis">
        2020/09/02 张山 1888888333 <span style="color: 0000ff73;">{{ item.confirmMoney }}</span>
      </h4>
      <P class="text ellipsis">
        出车单号：{{ item.wayBillId }}
      </P>
      <P class="text ellipsis">
        加盟经理：{{ item.gmName }}/{{ item.gmPhone }}
      </P>
      <P class="text ellipsis">
        线路名称：{{ item.lineName }}
      </P>

      <p class="text ellipsis">
        上报人：{{ item.gmReportName }}/{{ item.gmReportPhone }}
      </p>
      <p class="text ellipsis">
        上报时间：{{ item.gmReportTime }}
      </p>
      <p class="text ellipsis">
        趟数1金额：1000
      </p>
      <p class="text ellipsis">
        趟数2金额：1000
      </p>
      <p class="text ellipsis">
        备注：{{ item.remark }}
      </p>
      <p class="text ellipsis">
        确认状态：{{ item.gmState }}
      </p>
    </div> -->
    <div class="CardItemcontainer megin">
      <h4 class="title ellipsis">
        <span style="color: 0000ff73;">{{ obj.predictCost }}</span>
      </h4>
      <P class="text ellipsis">
        出车单号:{{ obj.wayBillId }}
      </P>
      <P class="text ellipsis">
        加盟经理:{{ obj.joinManagerName }}/{{ obj.gmPhone }}
      </P>
      <P class="text ellipsis">
        线路名称：{{ obj.lineName }}
      </P>

      <p class="text ellipsis">
        上报人：{{ obj.gmReportName }}/{{ obj.gmReportPhone }}
      </p>
      <p class="text ellipsis">
        上报时间：{{ obj.gmReportTime }}
      </p>
      <p class="text ellipsis">
        趟数1金额：{{ obj.gmFee }}
      </p>
      <!-- <p class="text ellipsis">
        趟数2金额：{{}}
      </p> -->
      <p class="text ellipsis">
        备注：
      </p>
      <p class="text ellipsis">
        确认状态：{{ obj.gmStatusCode }}
      </p>
    </div>
    <van-popup v-model="show">
      <div class="danceng" style=" border-radius:5px">
        <p>运费上报</p>
        <div>
          <p>*趟数1</p>
          <li>
            <span>0:20-06:00</span>
            <input v-model="value" type="text" style="border:none" placeholder="350.00">
            <van-button type="default">
              元
            </van-button>
          </li>
          <div class="Remarks">
            <van-field
              v-model="message"
              rows="1"
              autosize
              label="备注:"
              type="textarea"
              placeholder="请输入不超过150字"
              show-word-limit
            />
          </div>
          <p class="footer_but">
            <button @click="show = false">
              取消
            </button>
            <button>未出车</button>
            <button @click="footer_confirm">
              确认
            </button>
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { shippingDetailByGM, wayBillAmountDetail } from '@/api/freight'
export default {
  data() {
    return {
      show: false,
      obj: '',
      dataAll: [],
      value: '', // 上报金额
      message: '' // 备注

    }
  },
  mounted() {
    this.obj = this.$route.query.obj
    console.log(this.$route.query.obj)
    this.shippingDetailByGM()
  },

  methods: {
    /**
     * 线路详情
     */
    onClickLeft() {
      this.$router.go(-1)
    },
    showPopup() {
      this.show = true;
    },
    footer_confirm() {
      this.wayBillAmountDetail() // 运费上报
    },
    async wayBillAmountDetail() {
      try {
        let parmas = {
          driverName: '', // 司机名称
          driverPhone: '', // 司机手机号
          lineName: '', // 线路名称
          wayBillId: '', // 出车单号
          deliverTime: '', // 配送时间段
          deliverNo: '', // 第几趟
          preMoney: '' // 预估用费
        }
        this.$loading(true)
        let { data: res } = await wayBillAmountDetail(parmas)
        console.log(res)
        if (res.success) {
          res.data
        } else {
          this.error = true;
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.error = true;
      } finally {
        this.$loading(false)
      }
    },
    async shippingDetailByGM() {
      try {
        this.$loading(true)
        let { data: res } = await shippingDetailByGM()
        if (res.success) {
          this.dataAll = res.data
        } else {
          this.error = true;
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.error = true;
      } finally {
        this.$loading(false)
      }
    }

  }
}

</script>

<style lang='scss' scoped>
.lineListContainer {
  font-family: PingFangSC-Medium;
  .headerRight {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #FFFFFF;
    i {
      margin-left:5px;
    }
  }
  .searchSelect {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #3C4353;
    i {
      transform: rotate(90deg);
    }
  }
  .lineHeight {
    background: #F9F9F9;
    height:10px;

    width:100%;
  }
}
.con_tent{
  width: 95%;
  margin: auto;

}
.CardItemcontainer {
  padding: 0px 15px;
  margin-top: 20px;
  font-family: PingFangSC-Semibold;
  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  h4{
    border-bottom: 1px solid #ddd;
    line-height: 40px;
  }

  .title {
    margin: 10px 0px;
    font-size: 14px;
    color: #666;
  }
  .title>span{
    float: right;

  }
  .text {
    margin-top:0px;
    margin-bottom:8px;
    font-size: 13px;
    color: #666;
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
.sahngbao{
  width: 60px;
  height: 30px;
  background: #0000ff73;
  color: #FFFFFF;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  margin-left: 10px ;
}
.danceng{
  width: 260px;
   height: 220px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;

}
.danceng>p:nth-child(1){
  text-align: center;
  color: #000;
}
.danceng>div>li{

 list-style: none;
}
.footer_but{
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.footer_but>button{
  width: 30%;
  height: 30px;
  border: none;

}
.footer_but>button:nth-child(1){
  border:1px solid #2F448A ;
  color:#2F448A ;
   background: #fff;
  border-radius: 5px;
}
.footer_but>button:nth-child(2){
  border:1px solid #7F8FBD ;
  color:#fff ;
   background: #7F8FBD;
  border-radius: 5px;
}
.footer_but>button:nth-child(3){
  border:1px solid #2F448A ;
  color:#fff ;
   background: #2F448A;
  border-radius: 5px;
}
</style>

