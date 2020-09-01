<template>
  <div class="lineListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="运费详情" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <!-- <div class="headerRight">
            批量上报
          </div> -->
        </template>
      </van-nav-bar>
    </van-sticky>
    <p class="sahngbao" @click="showPopup">
      上报
    </p>
    <div class="CardItemcontainer">
      <div>场景1</div>
      <h4 class="title ellipsis">
        2020/09/08  李斯 / 1666666 <span style="color:red;">待上报</span>
      </h4>
      <P class="text ellipsis">
        出车编号：111111111
      </P>
      <p class="text ellipsis">
        趟数1金额：1000
      </p>
      <p class="text ellipsis">
        趟数2金额：1000
      </p>
      <p class="text ellipsis">
        确认状态：已确认/确认的金额
      </p>
    </div>
    <div class="CardItemcontainer megin">
      <div>场景2</div>
      <h4 class="title ellipsis">
        2020/09/02 张山 1888888333 <span style="color: 0000ff73;">500.00</span>
      </h4>
      <P class="text ellipsis">
        出车单号：111111111
      </P>
      <P class="text ellipsis">
        加盟经理：马文涛/173333322
      </P>
      <P class="text ellipsis">
        线路名称：京东线路A
      </P>

      <p class="text ellipsis">
        上报人：马文涛/173333322
      </p>
      <p class="text ellipsis">
        上报时间：2020/09/08 12:00:00
      </p>
      <p class="text ellipsis">
        趟数1金额：1000
      </p>
      <p class="text ellipsis">
        趟数2金额：1000
      </p>
      <p class="text ellipsis">
        备注：
      </p>
      <p class="text ellipsis">
        确认状态：已确认/确认的金额
      </p>
    </div>
    <van-popup v-model="show">
      <div class="danceng">
        <p>运费上报</p>
        <div>
          <p style="display: flex; justify-content:space-around;color:#000;">
            趟数1:<input
              type="text"
              style="width:123px"
            >
            <span>元</span>
          </p>
          <p>
            <span class="beizhu">备注：</span> <textarea cols="20" rows="3">内容</textarea>
          </p>
        </div>
        <div class="but_ton">
          <button>取消</button>
          <button>未出车</button>
          <button>确认</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      obj: ''
    }
  },
  mounted() {
    console.log(this.$route.query.obj)
    this.obj = this.$route.query.obj
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
  width: 200px;
   height: 200px;
  background-color: #fff;
  padding: 10px;

}
.but_ton{
  display: flex;
  justify-content: space-around;
}
.but_ton>button{
  width: 60px;
  border: none;
  color: #fff;
  height: 30px;
}
.but_ton>button:nth-child(1){
  background:#ddd;

}
.but_ton>button:nth-child(2){
  background:#f28787;
}
.but_ton>button:nth-child(3){
  background:#6d8bee;
}
.beizhu{
  position: relative;
  bottom:30px;
  left: 6px;
}

</style>

