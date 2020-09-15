<template>
  <div class="lineListContainer">
    <van-sticky :offset-top="0">
      <van-nav-bar title="批量运费上报" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>
    <div class="cont_ent">
      <div class="cont_ent_title">
        提示：已批量选择 <span class="blur_clor">{{ obj.length }}</span> 个出单车
      </div>
      <!-- 出车多趟 -->
      <van-form :show-error="false" @submit="onSubmit">
        <ul v-for="item in obj" :key="item.id" class="listStyle" :style="!item.check ? 'padding-bottom: 10px;' : ''">
          <li class="li_value_btn">
            <div class="li_value_btn_list">
              <span v-if="item.check" class="status">已出车</span>
              <span v-if="!item.check" class="status_no">未出车</span>
            </div>
            <van-switch v-model="item.check" size="20px" active-color="#7F8FBD" />
          </li>
          <li class="li_value">
            出车单号：{{ item.wayBillId }}
          </li>
          <li class="li_value">
            司机姓名/手机号：  {{ item.driverName }}/{{ item.driverPhone }}
          </li>
          <div
            v-if="item.check"
          >
            <li
              v-for="(i, ins) in item.list"
              :key="i.id"
              class="Number_ong"
            >
              <van-field
                v-model="i.price"
                v-only-number="{min: 0}"
                required
                :name="'趟数' + ( ins + 1 ) + ': ' + i.deliverTime"
                :label="'趟数' + ( ins + 1 ) + ': ' + i.deliverTime"
                placeholder="请输入运费(元)"
                label-width="150px"
                input-align="right"
                error-message-align="right"
                :rules="[{ required: true, message: '请输入运费' }]"
              >
              </van-field>
            </li>
          </div>
        </ul>
        <div class="Bulk">
          <van-button @click="cancel">
            全部未出车
          </van-button>
          <van-button native-type="submit">
            全部上报
          </van-button>
        </div>
      </van-form>
    </div>
    <van-form>
      <van-field
        v-model="message"
        rows="3"
        autosize
        label="备注:"
        type="textarea"
        placeholder="请输入不超过150字"
        show-word-limit
      />
    </van-form>
  </div>
</template>
<script>
import { noCarBatchByGM, reportMoneyBatchByGM, wayBillAmountDetail } from '@/api/freight'
import { delay } from '@/utils'
import { Toast } from 'vant';
import { Dialog } from 'vant';
export default {
  data() {
    return {
      checked: false,
      value: '',
      message: '',
      checked1: '',
      checked2: '',
      obj: []
    }
  },
  mounted() {
    let objs = JSON.parse(this.$route.query.obj)
    this.getList(objs)
  },
  methods: {
    async getList(id) {
      let { data: res } = await wayBillAmountDetail(id)
      if (res.success) {
        let objs = res.data
        let ret = []
        let list = []
        objs.forEach((i, index) => {
          // this.freightForm[index].list = i
          if (ret.indexOf(i.wayBillId) === -1) {
            ret.push(i.wayBillId)
            i.check = true
            i.price = ''
            i.list = []
            let lists = Object.assign({}, i)
            lists.list.push({
              deliverTime: lists.deliverTime,
              wayBillId: lists.wayBillId,
              wayBillAmountId: lists.wayBillAmountId,
              check: lists.check,
              price: lists.price
            })
            list.push(lists)
          } else {
            list.forEach((e) => {
              if (e.wayBillId === i.wayBillId) {
                i.check = true
                i.price = ''
                let lists = Object.assign({}, i)
                e.list.push({
                  deliverTime: lists.deliverTime,
                  wayBillId: lists.wayBillId,
                  wayBillAmountId: lists.wayBillAmountId,
                  check: lists.check,
                  price: lists.price
                })
              }
            })
          }
        })
        this.obj = list
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onSubmit(value) {
      let wayBillIds = []
      let wayBillPrices = []
      let noBillIds = []
      this.obj.forEach(item => {
        if (item.check) {
          item.list.forEach(i => {
            if (i.check === true) {
              wayBillIds.push(i.wayBillAmountId)
              wayBillPrices.push(i.price)
            }
          })
        } else {
          noBillIds.push(item.wayBillAmountId)
        }
      })
      if (wayBillIds.length) {
        this.reportMoneyBatchByGM(wayBillIds, wayBillPrices)
      }
      if (noBillIds.length) {
        this.noCarBatchByGM(wayBillIds)
      }
      if (!wayBillIds.length && !noBillIds.length) {
        this.$toast.fail('暂无上报数据')
      }
    },
    async reportMoneyBatchByGM(wayBillAmountId, preMoney) {
      try {
        let parmas = {
          remark: this.message, // 备注
          moneys: preMoney, // 上报金额
          wayBillAmountIds: wayBillAmountId

        }
        let { data: res } = await reportMoneyBatchByGM(parmas)
        if (res.success) {
          Toast.success('运费上报成功'); // 全部批量上报
          setTimeout(() => {
            this.$router.back(-1)
          }, delay);
        } else {
          Toast.success(res.errorMsg);
          return false
        }
      } catch (err) {
        console.log(`get search data fail:${err}`)
      }
    },
    cancel() { // 全部未出车
      Dialog.confirm({
        title: '提示',
        message: `提示：确定全部的${this.obj.length}个出车，全部未出车!`
      }).then(() => {
        let wayBillIds = []
        this.obj.forEach(item => {
          item.list.forEach(i => {
            wayBillIds.push(i.wayBillAmountId)
          })
        })
        this.noCarBatchByGM(wayBillIds)
      })
    },
    async noCarBatchByGM(arr) {
      try {
        let { data: res } = await noCarBatchByGM(arr)
        if (res.success) {
          Toast.success('运费上报成功');
          setTimeout(() => {
            this.$router.back(-1)
          }, delay);
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get search data fail:${err}`)
      }
    }

  }
}
</script>
<style lang='scss' scoped>
.lineListContainer {
  font-family: PingFangSC-Medium;
  background: #F9F9F9;
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
.cont_ent{
  width: 100%;
  overflow: hidden;
  .cont_ent_title{
    height: 25px;
    line-height: 25px;
    background: #FBF8F2;
    padding: 0 15px;
    font-size: 12px;
    color: #838A9D;
    .blur_clor{
      color:#EBAF51;
    }
  }
}
.cont_ent>ul{
  width: 100%;
  padding: 10px 0 20px;
  box-sizing: border-box;
  background: #fff;
  height: 100%;
  margin-bottom: 10px;
}
.cont_ent>ul>li:nth-child(1){
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.Number{
  width: 50%;
  height: 35px;
  display: flex;
  justify-content: space-between;
}
.Number>input{
  text-align: right;
}
.cont_ent>ul>li:nth-child(2){
  color: #666;
  line-height: 25px;
}
.cont_ent>ul>li:nth-child(3){
  color: #666;
    line-height: 25px;
}
.van-cell {
line-height: 0.5rem;
border-right: 1px solid #ccc;
border-bottom :none;
border-radius:5px  0px  0px  5px;

}
.Remarks{
  margin: 10px 0 80px 0;
}
.Bulk{
  width: 100%;
  height: 38px;
  display: flex;
  z-index: 999;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  padding: 11px 0 15px;
  background: #fff;
}
.Bulk>button{
  width:46%;
  height: 100%;
  border: none;
  border-radius: 5px;
  margin:0 auto;
}
.Bulk>button:nth-child(1){
  width: 46%;
  background: #fff;
  border: 1px solid #2F448A;
    color: #2F448A;
}
.Bulk>button:nth-child(2){
  width: 46%;
  color: #fff;;
  background: #2F448A;
}
.Number_ong{
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 3px solid #f9f9f9;
  margin-top: 5px;
}
.status{
  width: 50px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border: 1px solid #3ACB8D ;
  border-radius: 20px ;
  color: #3ACB8D;
  display: inline-block;
}
.status_no{
  width: 50px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border: 1px solid #db5572 ;
  border-radius: 20px ;
  color: #db5572;
  display: inline-block;
}
.li_value{
  font-size: 13px;
  color: #838A9D;
  padding: 0 25px;
  box-sizing: border-box;
}
.li_value_btn{
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  .li_value_btn_list{
    flex: 1;
  }
}
.listStyle{
  background: #fff;
  margin-bottom: 10px;
}

</style>
<style scoped>
.Remarks >>> .van-field__body  {
    border: 1px solid #ddd;
}
.Remarks >>>.van-cell {
    line-height: 0.5rem;
    border: none;
    border-radius: 0.13333rem 0px 0px 0.13333rem;
}
.Remarks >>>.van-field__label {
    width: 3.2em;
}
.Remarks >>>.van-cell {
    width: 84%;
}
.Number >>>.van-button{
  height: 35px;
}
.van-button--default{
  border: none;
  background: #fff;
  color: #A6AAB8;
}
</style>
