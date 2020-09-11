<template>
  <div class="DriverDetail">
    <van-sticky
      :offset-top="0"
      class="detailTitle"
    >
      <van-nav-bar
        title="司机详情"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      >
        <template #right>
          <div class="doBox">
            <span
              class="orderBtn"
              @click="showOrder = true"
            >订单</span>
            <van-icon
              name="arrow-down"
              size="12"
            />
          </div>
          <div
            class="doBox"
            style="margin-left:6px"
          >
            <span
              class="orderBtn"
              @click="showDothing = true"
            >操作</span>
            <van-icon
              name="arrow-down"
              size="12"
            />
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="detailTitle">
      <div class="itemBox">
        <van-cell>
          <template #title>
            <div class="title">
              <span>{{ detailInfo.name }}</span>
              <span>{{ detailInfo.phone }}</span>
              <span>({{ detailInfo.busiTypeName }}/{{ detailInfo.workCityName }})</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <div class="itemStatus">
              {{ detailInfo.statusName }}
            </div>
          </template>
        </van-cell>
        <div class="itemInfo">
          <van-cell
            title-class="cell-title"
            value-class="cell-value"
            title="司机编号："
            :value="detailInfo.driverId"
          />
          <van-cell
            title-class="cell-title"
            value-class="cell-value"
            title="加盟经理："
            :value="`${detailInfo.gmName}/${detailInfo.gmPhone}`"
          />
          <van-cell
            title-class="cell-title"
            value-class="cell-value"
            title="创建人："
            :value="`${detailInfo.createName}/${detailInfo.createPhone}`"
          />
          <van-cell
            title-class="cell-title"
            value-class="cell-value"
            title="创建时间："
            :value="detailInfo.createDate | parseTime('{y}-{m}-{d} {h}:{i}:{s}')"
          />
        </div>
      </div>
    </div>
    <van-tabs
      v-model="active"
      class="detailTab"
      background="#EAEFF9"
      color="#2F448A"
      type="card"
      line-width="30"
      line-height="2"
      animated
      title-inactive-color="#3C4353"
      title-active-color="#EFF5FE"
      @change="changeTab"
    >
      <van-tab
        v-for="(item,index) in tabList"
        :key="index"
        :title="item.type"
      >
        <div
          v-if="active === 3"
          class="lineInfo"
        >
          <div
            v-for="(info,ind) in lineList"
            :key="ind"
          >
            <LineInfoItem :obj="info" />
          </div>
        </div>
        <div v-if="active === 2">
          <OrderInfo :obj="orderInfo" />
        </div>
        <div v-if="active === 1">
          <TagInfo :obj="tagInfo" />
        </div>
        <div v-if="active === 0">
          <FormInfo :obj="detailInfo" />
        </div>
      </van-tab>
    </van-tabs>

    <van-action-sheet
      v-model="showOrder"
      :actions="doOrder"
      cancel-text="取消"
      close-on-click-action
      @cancel="showOrder = false"
      @select="onSelectOrder"
    />
    <van-action-sheet
      v-model="showDothing"
      :actions="doMore"
      cancel-text="取消"
      close-on-click-action
      @cancel="showDothing = false"
      @select="onSelectDothing"
    />
  </div>
</template>
<script>
import {
  DropdownMenu,
  DropdownItem,
  Cell,
  CellGroup,
  Toast,
  Notify
} from 'vant';
import FormInfo from './components/FormInfo';
import TagInfo from './components/TagInfo';
import LineInfoItem from './components/LineInfoItem';
import OrderInfo from './components/OrderInfo';
import { driverDetail, selectLabel, signDeal, signOut } from '@/api/driver.js';
import { orderDetail } from '@/api/order.js';
import { getLingMessageByDriverId } from '@/api/driver.js';
export default {
  name: 'DriverDetail',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    LineInfoItem,
    FormInfo,
    TagInfo,
    OrderInfo
  },
  data() {
    return {
      active: 0,
      tabList: [
        { type: '面试信息', code: '' },
        { type: '标签信息', code: 1 },
        { type: '订单信息', code: 2 },
        { type: '线路信息', code: 3 }
      ],
      showOrder: false,
      // orderActions: [
      //   { name: '录入订单', url: '/createOrder' },
      //   { name: '审核', url: '/orderAudit' },
      //   { name: '详情', url: '/orderDetail' },
      //   { name: '重新提交', url: '/resetOrder' }
      // ],
      showDothing: false,
      // dothingActions: [
      //   { name: '编辑面试', url: '/editTailored' },
      //   { name: '编辑面试', url: '/editShare' },
      //   { name: '打标签', url: '/tagView' },
      //   { name: '标记退出' },
      //   { name: '标记成交' }
      // ],
      driverId: '',
      detailInfo: {},
      tagInfo: {},
      orderInfo: {},
      lineList: []
    };
  },
  computed: {
    doMore() {
      return this.arrList();
    },
    doOrder() {
      return this.orderList();
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.driverId = id;
    this.getDetail(id);
  },
  methods: {
    orderList() {
      if (
        this.detailInfo.orderStatus === null ||
        this.detailInfo.orderStatus === 0
      ) {
        let arr = [{ name: '录入订单', url: '/createOrder' }];
        return arr;
      } else if (this.detailInfo.orderStatus === 20) {
        let arr = [
          { name: '审核', url: '/orderAudit' },
          { name: '详情', url: '/orderDetail' }
        ];
        return arr;
      } else if (this.detailInfo.orderStatus === 25) {
        let arr = [
          { name: '重新提交', url: '/resetOrder' },
          { name: '详情', url: '/orderDetail' }
        ];
        return arr;
      } else if (this.detailInfo.orderStatus === 30) {
        let arr = [{ name: '详情', url: '/orderDetail' }];
        return arr;
      }
    },
    arrList() {
      if (
        this.detailInfo.status === 1 ||
        this.detailInfo.status === 2 ||
        this.detailInfo.status === 4
      ) {
        let arr = [{ name: '打标签', url: '/tagView' }];
        if (this.detailInfo.busiType === 0) {
          arr.push({ name: '编辑专车面试', url: '/editTailored' });
        } else if (this.detailInfo.busiType === 1) {
          arr.push({ name: '编辑共享面试', url: '/editShare' });
        }
        return arr;
      } else if (this.detailInfo.status === 3) {
        let arr = [{ name: '打标签', url: '/tagView' }, { name: '标记成交' }];
        if (this.detailInfo.busiType === 0) {
          arr.push({ name: '编辑专车面试', url: '/editTailored' });
        } else if (this.detailInfo.busiType === 1) {
          arr.push({ name: '编辑共享面试', url: '/editShare' });
        }
        return arr;
      } else if (this.detailInfo.status === 5) {
        if (this.detailInfo.busiType === 0) {
          arr.push({ name: '编辑专车面试', url: '/editTailored' });
        } else if (this.detailInfo.busiType === 1) {
          arr.push({ name: '编辑共享面试', url: '/editShare' });
        }
        let arr = [{ name: '打标签', url: '/tagView' }, { name: '标记退出' }];
        return arr;
      }
    },
    onSelectOrder(item) {
      this.showOrder = false;
      if (item.url === '/createOrder') {
        this.$router.push({
          path: item.url,
          query: {
            id: this.driverId,
            driverName: this.detailInfo.name,
            driverPhone: this.detailInfo.phone,
            workCityName: this.detailInfo.workCityName,
            workCity: this.detailInfo.workCity
          }
        });
      } else if (item.url === '/resetOrder') {
        this.$router.push({
          path: item.url,
          query: {
            id: this.driverId,
            driverName: this.detailInfo.name,
            driverPhone: this.detailInfo.phone,
            workCityName: this.detailInfo.workCityName,
            workCity: this.detailInfo.workCity,
            orderId: this.detailInfo.orderId
          }
        });
      } else {
        console.log('this.driverId', this.driverId);
        this.$router.push({ path: item.url, query: { id: this.driverId }});
      }
    },
    onSelectDothing(item) {
      this.showDothing = false;
      if (item.name === '标记退出') {
        this.outSign(this.driverId);
      } else if (item.name === '标记成交') {
        this.dealSign(this.driverId);
      } else {
        this.$router.push({ path: item.url, query: { id: this.driverId }});
      }
    },
    async outSign(id) {
      try {
        this.$loading(true);
        let { data: res } = await signOut({ driverId: id });
        if (res.success) {
          Notify({ type: 'success', message: '标记退出成功' });
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    async dealSign(id) {
      try {
        this.$loading(true);
        let { data: res } = await signDeal({ driverId: id });
        if (res.success) {
          Notify({ type: 'success', message: '标记成交成功' });
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    changeTab(name, title) {
      let id = this.driverId;
      if (name === 1) {
        this.getTagInfo(id);
      } else if (name === 0) {
        this.getDetail(id);
      } else if (name === 2) {
        this.getOrderLabel(id);
      } else {
        this.getLineLabel(id);
      }
    },
    async getTagInfo(id) {
      try {
        this.$loading(true);
        let { data: res } = await selectLabel({ driverId: id });
        if (res.success) {
          this.tagInfo = res.data;
          console.log(res.data, 123);
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    async getDetail(id) {
      try {
        this.$loading(true);
        let { data: res } = await driverDetail({ driverId: id });
        if (res.success) {
          this.detailInfo = res.data;
          console.log(res.data);
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    async getLineLabel(id) {
      try {
        this.$loading(true);
        let { data: res } = await getLingMessageByDriverId({ driverId: id });
        if (res.success) {
          this.lineList = res.data;
          console.log(res.data);
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    async getOrderLabel(id) {
      try {
        this.$loading(true);
        let { data: res } = await orderDetail({ driverId: id });
        if (res.success) {
          this.orderInfo = res.data;
          console.log(res.data);
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../DriverList/components/DriverItem.less";
.DriverDetail {
  background-color: @body-bg;
  .doBox {
    display: flex;
    align-items: center;
  }
  .orderBtn {
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    margin-right: 3px;
  }
  .detailTitle {
    .cell-title,
    .cell-value {
      color: #838a9d;
    }
    .itemInfo {
      border: none;
    }
    .itemBox {
      margin-bottom: 0;
    }
  }
}
</style>
<style scoped>
.DriverDetail >>> .van-dropdown-menu__bar {
  background-color: rgb(47, 68, 138);
  height: 46px;
}
.DriverDetail >>> .van-dropdown-menu__title {
  color: rgb(255, 255, 255);
  font-size: 12px;
}
.DriverDetail .detailTitle >>> .van-cell--center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.DriverDetail .detailTitle >>> .van-cell__title,
.van-cell__value {
  flex: inherit;
}
.dropdown >>> .van-icon {
  color: #969799;
}
.detailTab >>> .van-tabs__nav--card,
.detailTab >>> .van-tab {
  margin: 0;
  border: none;
  font-size: 13px;
}
.detailTab >>> .van-cell::after {
  border: none;
}
.DriverDetail .lineInfo >>> .itemStatus {
  border: 1px solid #649cee;
  color: #649cee;
}
</style>
