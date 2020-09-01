<template>
  <div>
    <P class="all">
      <input v-model="checkedo" type="checkbox" @change="quanxian"><span>全选</span> <span>已选择{{ obj.length }} 个出车单位</span>
    </P>
    <div v-for="item in obj" :key="item.id" class="CardItemcontainer">
      <h4 class="title ellipsis">
        {{ item.title }}
        <span>{{ item.statust }} <input v-model="item.all" type="checkbox" @change="checkboxall(item)"></span>
      </h4>
      <p class="text ellipsis">
        出车单号:{{ item.update }}
      </p>
      <p class="text ellipsis">
        线路名称:{{ item.carType }}
      </p>
      <p v-if="item.yicahng != ''" class="Pink">
        {{ item.yicahng }}
      </p>
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
export default {
  props: {
    obj: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      checkedo: '',
      checkedall: ''
    }
  },
  computed: {

  },

  methods: {
    /**
     * 线路详情
     */
    handleDetailClick() {
      this.$router.push({
        path: '/Details'
      })
    },
    quanxian() {
      this.obj.forEach(item => {
        item.all = this.checkedo
      });
    },
    checkboxall(v) {
      this.obj.filter(res => {
        if (res.all == true) {
          this.checkedo = true
        } else {
          this.checkedo = false
        }
      })
      this.obj.forEach(res => {
        if (res.all == false) {
          this.checkedo = false
        }
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    Add_to() {
      this.$router.push({
        name: 'report'
      })
    }
  }
}

</script>

<style lang='scss' scoped>
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
    color: #3C4353;
  }
  .title>span{
    float: right;
  }
  .text {
    margin-top:0px;
    margin-bottom:8px;
    font-size: 13px;
    color: #3C4353;
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
  margin-left: 30px;
}
.Bulk{
  width: 100%;
  height: 50px;
  display: flex;
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
  line-height: 25px;
  text-align: center;
  border-radius:6px ;
  background: #ff00008a;
  color: #fff;
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
