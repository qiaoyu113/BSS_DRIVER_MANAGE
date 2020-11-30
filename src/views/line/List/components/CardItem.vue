<template>
  <div class="CardItemcontainer" @click="handleDetailClick">
    <h4 class="title van-ellipsis">
      {{ obj.lineName }} ({{ obj.lineId }})
    </h4>
    <div class="status">
      <van-tag type="primary" plain round color="#FFFFFF" text-color="#FFA000" class="tag2">
        {{ obj.lineStateName | DataIsNull }}
      </van-tag>
    </div>
    <p class="text van-ellipsis">
      上架截止日期:{{ obj.waitDirveValidity | parseTime('{y}-{m}-{d}') }}
    </p>
    <p class="text van-ellipsis">
      {{ line | DataIsNull }}
    </p>
    <p class="text van-ellipsis">
      配送车型:{{ obj.carTypeName | DataIsNull }}
    </p>
    <p class="text van-ellipsis">
      试跑状态:{{ obj.runTestStateName | DataIsNull }}
    </p>
    <p class="text van-ellipsis">
      司机上岗时间:{{ obj.driverWorkTime | parseTime('{y}-{m}-{d}') }}
    </p>
    <p class="text van-ellipsis">
      每日配送趟数:{{ obj.dayNum | DataIsNull }}
    </p>
    <p class="text van-ellipsis">
      线路亮点:{{ obj.sellPointName | DataIsNull }}
    </p>
    <div class="car">
      <template v-if="obj.isHot ===1">
        <van-tag type="primary" color="#EFF5FE" text-color="#649CEE" class="tag">
          爆款
        </van-tag>
      </template>
      <van-tag type="primary" color="#EFF5FE" text-color="#649CEE">
        {{ obj.labelTypeName | DataIsNull }}
      </van-tag>
      <template v-if="obj.inLine ===1">
        <van-tag type="primary" color="#EFF5FE" text-color="#649CEE" class="tag">
          已采线
        </van-tag>
      </template>
      <template v-else-if="obj.inLine ===2">
        <van-tag type="primary" color="#EFF5FE" text-color="#649CEE" class="tag">
          未采线
        </van-tag>
      </template>
    </div>
    <div v-permission="['/v2/line/lineInfo/detail']" class="detail van-hairline--top">
      <van-button round plain size="small" class="routeBtn" type="default">
        详情
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    line() {
      let str = ''
      if (this.obj.lineCategoryName) {
        str = this.obj.lineCategoryName
      }
      if (this.obj.lineBalanceName) {
        str += `/${this.obj.lineBalanceName}`
      }
      if (this.obj.lineTypeName) {
        str += `/${this.obj.lineTypeName}`
      }
      return str
    }
  },
  methods: {
    /**
     * 线路详情
     */
    handleDetailClick() {
      if (!this.$permissionDetail('/v2/line/lineInfo/detail')) return
      if (this.$checkRouteIsNull(this.obj.lineId)) {
        this.$router.push({
          path: '/lineDetail',
          query: {
            lineId: this.obj.lineId
          }
        })
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.CardItemcontainer {
  position: relative;
  margin-top:5px;
  padding: 0px 15px;
  box-sizing: border-box;
  background: #fff;
  .title {
    margin: 0;
    padding:10px 0;
    box-sizing: border-box;
    font-size: 14px;
    color: #3C4353;
    font-weight: bold;
  }
  .status {
    position: absolute;
    right: 15px;
    top: 40px;
  }
  .text {
    margin-top:0px;
    margin-bottom:3px;
    font-size: 13px;
    color: #3C4353;
  }
  .car {
    margin-bottom: 10px;
    margin-top:8px;
  }
  .tag2 {
    height: 20px;
    padding: 0 11px;
    font-size: 12px;
    line-height: normal;
    border: 1px solid #ffa000;
    &::before {
      display: none;
    }
    & + .tag {
      margin-left: 10px;
    }
  }
  .detail {
    padding: 7px 0px;
    text-align: center;
    border-top-color:#D8D8D8;
    .routeBtn{
      width: 70px;
      height: 22px;
      padding: 2px 0;
      line-height: normal;
      color: #838a9d;
      border-radius: 10px;
      text-align: center;
      font-size: 12px;
      &::after {
        border-radius: 20px;
      }
    }
  }
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
