<template>
  <div class="lineListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="加盟运费详情" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <div v-if="obj.gmState === 0" class="headerRight" @click="showPopup(obj)">
            上报
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="freightDetail">
      <div class="title ellipsis">
        {{ obj.name }}
        <span v-if="obj.gmState === 1" class="prices">{{ obj.gmFee || 0 }}元</span>
        <span v-else class="states">{{ obj.gmStateName }}</span>
      </div>
      <div class="deter_context">
        <p class="text ellipsis">
          出车编号：<span>{{ obj.wayBillId }}</span>
        </p>
        <p class="text ellipsis">
          加盟经理：<span>{{ obj.gmName }}/{{ obj.gmPhone }}</span>
        </p>
        <p class="text ellipsis">
          线路名称：<span>{{ obj.lineName }}/{{ obj.lineId }}</span>
        </p>
        <p v-if="obj.gmState === 1" class="text ellipsis">
          上报人：<span>{{ obj.gmReportName }}/{{ obj.gmReportPhone }}</span>
        </p>
        <p v-if="obj.gmState === 1 || obj.gmState === 2" class="text ellipsis">
          上报时间：<span>{{ obj.gmReportTime }}({{ obj.gmReportName }})</span>
        </p>
        <div v-if="obj.gmState !== 2">
          <p v-for="item in obj.wayBillAmountVOS" :key="item.id" class="text ellipsis">
            趟数{{ item.tripNo }}金额：<span>{{ item.gmFee || 0 }}元</span>
          </p>
        </div>
        <p v-if="obj.gmState === 1 || obj.gmState === 2" class="text">
          备注：<span>{{ obj.remark | DataIsNull }}</span>
        </p>
        <p class="text ellipsis">
          确认状态：<span>{{ obj.confirmStateName }}/{{ obj.confirmMoney || 0 }}元</span>
        </p>
      </div>
    </div>
    <van-popup v-model="show">
      <div class="danceng" style=" border-radius:5px">
        <van-form :show-error="false" @submit="footer_confirm">
          <p class="title">
            运费上报
          </p>
          <van-field
            v-for="(item, index) in arrstr"
            :key="item.id"
            v-model="item.preMoney"
            v-only-number="{min: 0, max: 999999.99, precision: 2}"
            required
            :name="'趟数' + ( index + 1 ) + ': ' + item.deliverTime"
            :label="'趟数' + ( index + 1 ) + ': ' + item.deliverTime"
            placeholder="请输入运费(元)"
            label-width="120px"
            input-align="right"
            error-message-align="right"
            :rules="[{ required: true, message: '请输入运费' }]"
          >
          </van-field>
          <div class="Remarks">
            <van-field
              v-model="message"
              maxlength="150"
              rows="1"
              autosize
              label="备注:"
              type="textarea"
              placeholder="不超过150字符"
              show-word-limit
            />
          </div>
          <p class="footer_but">
            <van-button native-type="button" @click="show = false">
              取消
            </van-button>
            <van-button native-type="button" @click="opNoCarBatchByGM">
              未出车
            </van-button>
            <van-button native-type="submit">
              确认
            </van-button>
          </p>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { reportMoneyBatchByGM, reportMoneyBatchBySale, wayBillAmountDetail, noCarBatchByGM } from '@/api/freight'
import { delay } from '@/utils'
import { Toast } from 'vant';
export default {
  data() {
    return {
      show: false,
      obj: [],
      dataAll: [],
      value: '', // 上报金额
      message: '', // 备注
      arrstr: []

    }
  },
  mounted() {
    this.obj = JSON.parse(this.$route.query.obj);
  },
  methods: {
    /**
     * 线路详情
     */
    onClickLeft() {
      this.$router.go(-1)
    },
    footer_confirm() {
      let wayBillAmountIds = []
      let gmFee = []
      this.arrstr.forEach(item => {
        wayBillAmountIds.push(item.wayBillAmountId)
        gmFee.push(item.preMoney)
      })
      this.reportMoneyBatchByGM(wayBillAmountIds, gmFee) // 加盟运费上报
    },
    async reportMoneyBatchByGM(wayBillAmountIds, gmFee) {
      try {
        let parmas = {
          moneys: gmFee, // 运费
          wayBillAmountIds: wayBillAmountIds
        }
        this.$loading(true)
        let { data: res } = await reportMoneyBatchByGM(parmas, this.message) // 加盟运费
        if (res.success) {
          this.$loading(false)
          Toast.success('上报成功');
          this.show = false;
          this.$router.back(-1);
        } else {
          this.error = true;
          this.$loading(false)
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.$loading(false)
        this.error = true;
      }
    },
    async reportMoneyBatchBySale() {
      try {
        let parmas = {
          moneys: this.value, // 运费
          wayBillAmountIds: 'message'
        }
        this.$loading(true)
        let { data: res } = await reportMoneyBatchBySale(parmas, this.message) // 线外加盟运费
        if (res.success) {
          Toast.success('上报成功', res.data);
          setTimeout(() => {
            this.$router.go(-1)
          }, delay);
        } else {
          this.error = true;
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.error = true;
      } finally {

      // this.$loading(false)
      }
    },
    showPopup(id) {
      this.wayBillAmountDetail(this.obj.wayBillId)
    },
    async wayBillAmountDetail(id) { // 确认运费回显
      try {
        let { data: res } = await wayBillAmountDetail([id])
        if (res.success) {
          this.show = true;
          this.arrstr = res.data
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get search data fail:${err}`)
      }
    },
    async opNoCarBatchByGM() {
      let ids = []
      this.arrstr.forEach(i => {
        ids.push(i.wayBillAmountId)
      })
      if (this.arrstr.length) {
        try {
          let { data: res } = await noCarBatchByGM(ids)
          if (res.success) {
            this.show = false;
            Toast.success('运费上报成功');
            setTimeout(() => {
              this.$router.go(-1)
            }, delay);
            this.$router.back(-1)
          } else {
            this.$toast.fail(res.errorMsg)
          }
        } catch (err) {
          console.log(`get search data fail:${err}`)
        }
      } else {
        this.$toast.fail('暂无运费可上报')
      }
    }
  }

}

</script>

<style lang='scss' scoped>
.lineListContainer {
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
.freightDetail {
  .deter_context{
    padding-top: 10px;
  }
  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .title{
    border-bottom: 1px solid #ddd;
    line-height: 40px;
    padding: 0 15px;
    box-sizing: border-box;
    color: #3C4353;
    font-weight: bold;
    .states{
      color: #FF5D5D;
      font-weight: 400;
    }
  }

  .title {
    font-size: 14px;
    color: #666;
  }
  .title>span{
    float: right;
  }
  .text {
    width: 100%;
    line-height: 30px;
    margin: auto;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 13px;
    color:#A6AAB8;
    word-break: break-all;
    span{
      color: #3C4353;
    }
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
  overflow: hidden;
    padding: 15px;
    box-sizing: border-box;
  background-color: #fff;
  .title{
    text-align: center;
    font-size: 15px;
    color: #3C4353;
    margin: 0;
    font-weight: bold;
  }
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
  font-size: 12px;

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
