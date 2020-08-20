<template>
  <div class="consignorItem">
    <div class="wrapper">
      <div class="top flex">
        <div class="left">
          <h4 class="title">
            {{ obj.customerName }}<template v-if="obj.cityName">
              (
              {{ obj.cityName }})
            </template>
          </h4>
          <p class="stext">
            <span>货主编号: {{ obj.customerId }}</span>
            <span style="margin-left:20px;">创建时间: {{ obj.createDate | TimestampYMD }}</span>
          </p>
        </div>
        <div class="right">
          <van-button plain color="#5C9BDD" size="small" @click="handleItemClick">
            详情
          </van-button>
        </div>
      </div>
      <p class="text">
        {{ obj.primaryClassificationName }} <template v-if="obj.secondaryClassificationName">
          /{{ obj.secondaryClassificationName }}
        </template>
      </p>
      <p class="text">
        <span class="label">联系人</span>:{{ obj.lineSaleName | DataIsNull }}
      </p>
      <p class="text">
        <span class="label">合同止期</span>:{{ _dayjs(obj.contractEnd) }}
      </p>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';
import dayjs from 'dayjs'
export default {
  components: {
    [Button.name]: Button
  },
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    _dayjs(date) {
      return dayjs(date).format('YYYY-MM-DD')
    },
    handleItemClick() {
      this.$emit('clickItem')
      this.$router.push({
        path: '/bss/consignorDetail',
        query: {
          id: this.obj.customerId
        }
      })
    }
  }
}

</script>

<style lang='scss' scoped>
.consignorItem {
   &:after {
    display: block;
    content:'';
    height:10px;
    width: 100%;
    background: #F2F2F2;
  }
  .wrapper {
    background: #ffffff;
    padding: 3px 10px;
    .top {
      padding-top: 10px;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #F7F7F7;
      .title {
        margin: 0px 5px;
        font-size:16px;
        font-weight: bold;
        color:#6A7177;
        width: 230px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .stext {
        color:#999999;
        font-size:12px;
      }
    }
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .text {
      color:#575757;
      font-size:14px;
      .label {
        font-weight:bold;
      }
    }
    p {
      margin:3px;
    }
  }
}

</style>
