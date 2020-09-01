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
          <div class="doBox" style="margin-left:6px">
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
              <span>杨师傅</span>
              <span>18848885135</span>
              <span>(共享/北京市)</span>
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
            title="司机编号："
            value="SJ19980822"
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
            title="创建人："
            value="王经理/18848885135(共享一组)"
          />
          <van-cell
            title-class="cell-title"
            value-class="cell-value"
            title="创建时间："
            value="2020/8-27/18:07"
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
            <LineInfoItem />
          </div>
        </div>
        <div v-if="active === 2">
          <OrderInfo />
        </div>
        <div v-if="active === 1">
          <TagInfo />
        </div>
        <div v-if="active === 0">
          <FormInfo />
        </div>
      </van-tab>
    </van-tabs>

    <van-action-sheet
      v-model="showOrder"
      :actions="orderActions"
      cancel-text="取消"
      close-on-click-action
      @cancel="showOrder = false"
      @select="onSelectOrder"
    />
    <van-action-sheet
      v-model="showDothing"
      :actions="dothingActions"
      cancel-text="取消"
      close-on-click-action
      @cancel="showDothing = false"
      @select="onSelectDothing"
    />
  </div>
</template>
<script>
import { DropdownMenu, DropdownItem, Cell, CellGroup, Toast } from 'vant';
import FormInfo from './components/FormInfo';
import TagInfo from './components/TagInfo';
import LineInfoItem from './components/LineInfoItem';
import OrderInfo from './components/OrderInfo';
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
      lineList: [
        { type: '面试信息', code: '' },
        { type: '标签信息', code: 1 },
        { type: '订单信息', code: 2 },
        { type: '线路信息', code: 3 }
      ],
      showOrder: false,
      orderActions: [
        { name: '录入订单', url: '/createOrder' },
        { name: '审核', url: '/orderAudit' },
        { name: '详情', url: '/orderDetail' },
        { name: '重新提交', url: '/resetOrder' }
      ],
      showDothing: false,
      dothingActions: [
        { name: '编辑面试', url: '/editTailored' },
        { name: '编辑面试', url: '/editShare' },
        { name: '打标签', url: '/tagView' },
        { name: '标记退出', url: '' },
        { name: '标记成交', url: '' }
      ]
    };
  },
  mounted() {},
  methods: {
    onSelectOrder(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.showOrder = false;
      Toast(item.name);
      this.$router.push({ path: item.url, query: { id: '132' }})
    },
    onSelectDothing(item) {
      this.showDothing = false;
      Toast(item.name);
      this.$router.push({ path: item.url, query: { id: '132' }})
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
