<template>
  <div class="consignorContent">
    <van-cell-group :border="false">
      <van-cell title="公司简称" :value="obj.customerName | DataIsNull" />
      <van-cell title="货主公司主体" :value="obj.customerNameAll | DataIsNull " />
      <van-cell title="城市" :value="obj.cityName | DataIsNull" />
      <van-cell v-if="false" title="线索编号" :value="obj.lineSaleId" />
      <van-cell title="货主编号" :value="obj.customerId | DataIsNull" />
      <div class="middle">
        <van-cell title="业务对接人姓名" :value="obj.bussinessName | DataIsNull" />
        <van-cell title="业主对接人电话" :value="obj.bussinessPhone | DataIsNull" />
        <van-cell title="详细地址" :value="obj.address | DataIsNull" />
      </div>
      <van-cell title="合同止期" :value="obj.contractEnd | DataIsNull" />
      <van-cell title="一级分类" :value="obj.primaryClassificationName | DataIsNull" />
      <van-cell v-if="obj.secondaryClassificationName" title="二级分类" :value="obj.secondaryClassificationName | DataIsNull" />
      <van-cell v-else-if="obj.customerIdOpposite" title="第三方编号" :value="obj.customerIdOpposite | DataIsNull" />
      <van-cell title="结算周期" :value="'('+obj.billingCycle +'天) ' + obj.month + '个月' + obj.day+'天'" />
      <van-cell title="线路销售" :value="obj.lineSaleName" />
    </van-cell-group>
    <div class="btnGroup">
      <van-button type="info" block class="btn" round color="linear-gradient(270deg, #5C9BDD 0%, #80D8F3 100%)" @click="handleCreateLine">
        创建线路
      </van-button>
      <van-button type="primary" round :to="'/bss/consignorEdit?id='+obj.customerId" block class="btn">
        编辑货主
      </van-button>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem, Button, Cell, CellGroup, Dialog } from 'vant';
import dayjs from 'dayjs'
export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.name]: Dialog
  },
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleCreateLine() {
      let date = this.obj.contractEnd
      let year = dayjs(date).format('YYYY')
      let month = dayjs(date).format('MM')
      let day = dayjs(date).format('DD')
      if (new Date(date).getTime() < new Date().getTime()) {
        Dialog.alert({
          title: '合同截止日期过期',
          closeOnPopstate: true,
          message: `此货主合同截止日期为${year}年${month}月${day}日，已超期，不可再创建线路，请及时和客户沟通，并在货主列表进行编辑维护。`,
          confirmButtonColor: '#5c9bdd'
        }).then(() => {
          // on close
        });
      } else {
        this.$router.push({
          path: '/bss/add-line',
          query: {
            customerId: this.obj.customerId,
            city: this.obj.city
          }
        })
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.consignorContent {
  margin: 10px;
  .middle {
    border-top:3px solid #F2F2F2;
    border-bottom:3px solid #F2F2F2;
  }
  .btn {
    margin:30px auto;
  }
}

</style>

