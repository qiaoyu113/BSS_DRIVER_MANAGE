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
      <p>提示：一批量选择 <span class="blur_clor">{{ 3 }}</span> 个出单车</p>
      <!-- 出车多趟 -->
      <ul>
        <li><span class="status">已出车</span> <span><van-switch v-model="checked" size="20px" /></span></li>
        <li>出车单号：11100000000</li>
        <li>司机姓名/手机号：方圆/17755668220</li>
        <li class="Number_ong">
          <p>*趟数1:0:02 - 06:00</p>
          <div class="Number">
            <!-- <van-field v-model="value" placeholder="" :border="fasle" /> -->
            <input v-model="value" type="text" style="border:none" placeholder="350.00元">

            <van-button type="default">
              <van-icon name="arrow" color="#A6AAB8" />
            </van-button>
          </div>
        </li>
        <li class="Number_ong">
          <p>*趟数2:0:02 - 06:00</p>
          <div class="Number">
            <!-- <van-field v-model="value" placeholder="" :border="fasle" /> -->
            <input v-model="value" type="text" style="border:none" placeholder="350.00元">

            <van-button type="default">
              <van-icon name="arrow" color="#A6AAB8" />
            </van-button>
          </div>
        </li>
      </ul>
      <!-- 单趟出车 -->
      <ul>
        <li><span class="status">已出车</span> <span><van-switch v-model="checked1" size="20px" /></span></li>
        <li>出车单号：11100000000</li>
        <li>司机姓名/手机号：方圆/17755668220</li>
        <li>
          <div class="Number_ong">
            <p>*趟数1:0:02 - 06:00</p>
            <div class="Number">
              <!-- <van-field v-model="value" placeholder="" :border="fasle" /> -->
              <input v-model="value" type="text" style="border:none" placeholder="350.00元">

              <van-button type="default">
                <van-icon name="arrow" color="#A6AAB8" />
              </van-button>
            </div>
          </div>
        </li>
      </ul>
      <!-- 未出车 -->
      <ul>
        <li><span class="status">已出车</span> <span><van-switch v-model="checked2" size="20px" /></span></li>
        <li>出车单号：11100000000</li>
        <li>司机姓名/手机号：方圆/17755668220</li>
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
      <button>全部上报</button>
    </div>
  </div>
</template>
<script>
import { noCarBatchByGM } from '@/api/freight'
export default {
  data() {
    return {
      checked: true,
      value: '',
      message: '',
      checked1: '',
      checked2: '',
      obj: ''
    }
  },
  mounted() {
    this.obj = JSON.parse(this.$route.query.obj)
    console.log(this.obj)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    cancel() {
      // this.$router.go(-1)
      this.noCarBatchByGM()
    },
    async noCarBatchByGM() {
      try {
        let { data: res } = await noCarBatchByGM()
        if (res.success) {
          this.lists = res.data
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
}
.cont_ent>p{
  background: #FBF8F2 ;
  text-indent: 20px;
}
.cont_ent>ul{
  width: 100%;
  padding: 10px 10px 20px 10px;
  box-sizing: border-box;
  background: #fff;
  height: 100%;
  margin-top: 10px;
}
.cont_ent>ul>li:nth-child(1){
  width: 100%;

  display: flex;
  justify-content: space-between;
}

.cont_ent>ul>li:nth-child(1)>span:nth-child(1){
  color: yellowgreen;
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
.blur_clor{
color:#0000ffa6;
}
.Number_ong{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.status{
  width: 50px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border: 1px solid #3ACB8D ;
  border-radius: 20px ;
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
