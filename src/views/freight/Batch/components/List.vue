<template>
  <div>
    <P class="all">
      <input v-model="checkedo" type="checkbox" @change="quanxian"><span>全选</span> <span>已选择{{ obj.length }} 个出车单位</span>
    </P>
    <div v-for="item in obj" :key="item.id" class="CardItemcontainer">
      <h4 class="title ellipsis">
        {{ item.title }} <i v-if="item.yicahng != ''">{{ item.yicahng }}</i>
        <span>{{ item.statust }} <input v-model="item.all" type="checkbox" @change="checkboxall(item.all)"></span>

        <p class="text ellipsis">
          出车单号:{{ item.update }}
        </p>
        <p class="text ellipsis">
          加盟经理:{{ item.carType }}
        </p>
      </h4>
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
      console.log(this.checkedo)
      this.obj.forEach(item => {
        item.all = this.checkedo
      });
    },
    checkboxall(v) {
      console.log(v)
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

</style>

<style scoped>
  .CardItemcontainer >>> .van-button--default  {
    color:#838A9D;
    background: #fff;
    height:70px;
    height:20px;
  }
</style>
