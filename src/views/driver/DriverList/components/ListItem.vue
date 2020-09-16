<template>
  <div class="ListItem" @click="checkChange">
    <van-checkbox v-if="checked" v-model="check" class="checked" shape="square" checked-color="#7F8FBD"></van-checkbox>
    <div class="itemBox">
      <van-cell>
        <template #title>
          <div class="title">
            <span>{{ item.name }}</span>
            <span>{{ item.phone }}</span>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="itemStatus">
            {{ item.statusName }}
          </div>
        </template>
      </van-cell>
      <div class="itemInfo">
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          :value="`${item.busiTypeName}/${item.workCityName}/${item.carTypeName}`"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="加盟经理："
          :value="`${item.gmName}/${item.gmMobile}`"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="创建时间："
          :value="item.createDate | parseTime('{y}/{m}/{d}')"
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
        if (ele === this.item.driverId) {
          status = true
        }
        return
      })
      this.check = status
    }
  },
  mounted() {
    console.log(this.obj)
  },
  methods: {
    checkChange() {
      if (this.checked) {
        this.$emit('changeCheck', { change: !this.check, item: this.item.driverId })
        this.check = !this.check
      } else {
        this.$router.push({ path: '/driverdetail', query: { id: this.item.driverId }})
      }
    },
    goRouter() {
      this.$router.push({ path: '/driverdetail', query: { id: this.item.driverId }})
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
