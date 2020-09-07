<template>
  <div>
    <div class="CardItemcontainer" @click="checkChange">
      <h4 class="title ellipsis">
        {{ obj.departureDate }}/ {{ obj.driverName }}/{{ obj.driverPhone }}
        <span><input v-model="check" type="checkbox"></span>
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
    },
    checked: {
      type: Boolean,
      default: false
    },
    checkall: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      check: false,
      checkedo: '',
      checkLength: '',
      checkbox: ''
    }
  },
  computed: {

  },
  watch: {
    checkall(val) {
      console.log(val, this.obj)
      let status = false;
      val.map(ele => {
        if (ele === this.obj.id) {
          status = true
        }
        return
      })
      this.check = status
    }
  },
  mounted() {

  },

  methods: {
    checkChange() {
      if (this.checked) {
        this.$emit('changeCheck', { change: !this.check, obj: this.obj.customerId })
        this.check = !this.check
      }
    },
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
      console.log(this.check)
      if (this.check === true) {
        this.$router.push({
          path: '/report',
          query: {
            obj: JSON.stringify(this.obj)
          }
        })
      } else {
        Toast.fail('请选择上报运费');
      }
      // let obje = []
      // if (!this.checkLength) {
      //   Toast.fail('请选择上报运费');
      // } else {
      //   this.obj.forEach(item => {
      //     if (item.all === true) {
      //       obje.push(item)
      //     }
      //   })
      //   this.$router.push({
      //     path: '/report',
      //     query: {
      //       obj: JSON.stringify(obje)
      //     }
      //   })
      // }

      // this.$router.push({
      //   name: 'report'
      // })
    }
    // // 获取选中数量
    // getLength() {
    //   let num = 0;
    //   this.obj.forEach(res => {
    //     if (res.all === true) {
    //       num = num + 1
    //     }
    //   })
    //   this.checkLength = num
    //   console.log(this.checkLength)
    // }
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
  .title>span{
   position: absolute;
   left: 0px;
   top: 60px;

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
