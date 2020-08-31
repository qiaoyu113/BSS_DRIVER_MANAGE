<template>
  <div class="ListItem" @click="checkChange">
    <van-checkbox v-if="checked" v-model="check" class="checked" shape="square" checked-color="#7F8FBD"></van-checkbox>
    <div class="itemBox">
      <van-cell>
        <template #title>
          <div class="title">
            <span>杨师傅</span>
            <span>18848885135</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="itemStatus">
            已面试
          </div>
        </template>
      </van-cell>
      <div class="itemInfo">
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          value="共享/北京/4.2米厢货"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="加盟经理："
          value="王经理/18848885135"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="创建时间："
          value="2020/8-27/18:07"
        />
      </div>
      <div class="detailBtn">
        <van-button round plain size="small" class="routeBtn" @click="goRouter">
          详情
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
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
      check: false
    }
  },
  watch: {
    checkall(val) {
      let status = false;
      val.map(ele => {
        if (ele.item === this.item.item) {
          status = true
        }
        return
      })
      this.check = status
    }
  },
  methods: {
    checkChange() {
      if (this.checked) {
        this.$emit('changeCheck', { change: !this.check, item: this.item })
        this.check = !this.check
      }
    },
    goRouter() {
      this.$router.push('/driverdetail')
    }
  }
};
</script>

<style lang="less" scoped>
@import './DriverItem.less';
.ListItem {
  display: flex;
  align-items: center;
  .checked{
    margin-right: 10px;
  }
  .detailBtn{
    text-align: center;
    .routeBtn{
      margin: 5px 0;
      width: 70px;
      height: 25px;
    }
  }
}
</style>
