<template>
  <div class="lineListContainer">
    <van-sticky :offset-top="0">
      <van-nav-bar title="批量运费上报" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <!-- <div class="headerRight" @click="batch">
            批量上报
          </div> -->
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="cont_ent">
      <div class="cont_ent_title">
        提示：已批量选择 <span class="blur_clor">{{ obj.length }}</span> 个出单车
      </div>
      <!-- 出车多趟 -->
      <ul v-for="(item, index) in obj" :key="item.id">
        <li class="li_value_btn">
          <span v-if="item.check" class="status">已出车</span> <span v-if="!item.check" class="status_no">未出车</span> <span><van-switch v-model="item.check" size="20px" active-color="#7F8FBD" /></span>
        </li>
        <li class="li_value">
          出车单号：{{ item.wayBillId }}
        </li>
        <li class="li_value">
          司机姓名/手机号：  {{ item.driverName }}/{{ item.driverPhone }}
        </li>
        <van-form @submit="onSubmit">
          <li class="Number_ong">
            <div v-for="(i, ins) in item.list" :key="i.id">
              <!-- <p>趟数{{ ins + 1 }}: {{ i.deliverTime }}</p>
              <div class="Number">
                <input v-model="value" type="text" style="border:none" placeholder="350.00元">
                <van-button type="default">
                  <van-icon name="arrow" color="#A6AAB8" />
                </van-button>
              </div> -->
              <van-field
                v-model="i.deliverTime"
                :name="'趟数' + ( ins + 1 )"
                :label="'趟数' + ( ins + 1 )"
                placeholder="请输入"
                :rules="[{ required: true, message: '请输入正确内容' }]"
              />
            </div>
          </li>
        </van-form>
      </ul>
    </div>
    <div class="Remarks">
      <van-field
        v-model="message"
        rows="3"
        autosize
        label="备注:"
        type="textarea"
        placeholder="请输入不超过150字"
        show-word-limit
      />
    </div>
    <div class="Bulk">
      <button @click="cancel">
        全部未出车
      </button>
      <button @click="Report()">
        全部上报
      </button>
    </div>
  </div>
</template>
<script>
import { noCarBatchBySale, reportMoneyBatchBySale } from '@/api/freight'
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
          check: lists.check,
          price: lists.price
        })
        list.push(lists)
      } else {
        list.array.forEach((e) => {
          if (e.wayBillId === i.wayBillId) {
            i.check = true
            i.price = ''
            let lists = Object.assign({}, i)
            e.list.push({
              deliverTime: lists.deliverTime,
              wayBillId: lists.wayBillId,
              check: lists.check,
              price: lists.price
            })
          }
        })
      }
    })
    this.obj = list
    console.log(this.obj)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    Report() {
      this.obj.filter(item => {
        if (item.checked === true) {
          this.reportMoneyBatchByGM(item.wayBillAmountId, item.preMoney)
        }
      })
    },

    async reportMoneyBatchByGM(wayBillAmountId, preMoney) {
      try {
        let parmas = {
          remark: this.message, // 备注
          moneys: preMoney, // 上报金额
          wayBillAmountIds: wayBillAmountId

        }
        let { data: res } = await reportMoneyBatchBySale(parmas)
        console.log(res)
        if (res.success) {
          Toast.success('已提交成功'); // 全部批量上报
          res.data
        } else {
          Toast.success('失败');
          // this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get search data fail:${err}`)
      }
    },
    cancel() { // 全部未出车
      Dialog.confirm({
        title: '提示',
        message: `确定全部的${this.obj.length}个出全部未出车`
      }).then(() => {
        let arr = []
        this.obj.filter(item => {
          if (item.checked === undefined) {
            arr.push(item.wayBillAmountId)
          }
        })
        this.noCarBatchByGM(arr)
      })
    },
    async noCarBatchByGM(arr) {
      try {
        let parmas = {
          wayBillAmountIds: arr
        }
        let { data: res } = await noCarBatchBySale(parmas)
        if (res.success) {
          res.data // 全部未出车
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
  z-index: 999;
  font-size: 15px;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
}
.Bulk>button{
  border: none;

  border-radius: 2px;
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
}
.status_no{
  width: 50px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border: 1px solid #db5572 ;
  border-radius: 20px ;
  color: #db5572;
}
.li_value{
  font-size: 13px;
  color: #838A9D;
  padding: 0 25px;
  box-sizing: border-box;
}
.li_value_btn{
  padding: 0 15px;
  box-sizing: border-box;
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
  font-size: ;
}
</style>
