<template>
  <div class="DriverDetail">
    <van-sticky :offset-top="0">
      <van-nav-bar title="司机详情" left-text="返回" left-arrow @click-left="$router.go(-1)">
        <template #right>
          <div style="margin-right : 10px;font-size: 12px;">
            <van-dropdown-menu class="dropdown">
              <van-dropdown-item ref="item" title="订单">
                <van-cell-group>
                  <van-cell v-for="(item,index) in orderArray" :key="index" :title="item.name" is-link center @click="onConfirm(item.url)" />
                </van-cell-group>
              </van-dropdown-item>
            </van-dropdown-menu>
          </div>
          <div style="color: #fff; font-size: 12px;">
            <van-dropdown-menu class="dropdown">
              <van-dropdown-item ref="item" title="操作">
                <van-cell-group>
                  <van-cell v-for="(item,index) in dolist" :key="index" :title="item.name" is-link center @click="onConfirm(item.url)" />
                </van-cell-group>
              </van-dropdown-item>
            </van-dropdown-menu>
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
    <van-tabs v-model="active" class="detailTab" background="#EAEFF9" color="#2F448A" type="card" line-width="30" line-height="2" animated title-inactive-color="#3C4353" title-active-color="#EFF5FE">
      <van-tab v-for="(item,index) in tabList" :key="index" :title="item.type">
        <div v-if="active === item/code" class="lineInfo">
          <block v-for="(info,ind) in lineList" :key="ind">
            <LineInfoItem />
          </block>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { DropdownMenu, DropdownItem, Cell, CellGroup } from 'vant';
import LineInfoItem from './components/LineInfoItem'
export default {
  name: 'DriverDetail',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    LineInfoItem
  },
  data() {
    return {
      orderArray: [
        { name: '录入订单', url: '' },
        { name: '审核', url: '' },
        { name: '详情', url: '' },
        { name: '重新提交', url: '' }
      ],
      dolist: [
        { name: '编辑面试', url: '' },
        { name: '打标签', url: '' },
        { name: '标记退出', url: '' },
        { name: '标记成交', url: '' }
      ],
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
      ]
    };
  },
  mounted() {},
  methods: {
    onConfirm(url) {
      this.$refs.item.toggle();
    }
  }
};
</script>
<style lang="less" scoped>
@import '../DriverList/components/DriverItem.less';
.DriverDetail{
  background-color:@body-bg;
   .detailTitle{
     .cell-title,
      .cell-value{
        color: #838A9D;
      }
      .itemInfo{
        border: none;
      }
      .itemBox{
        margin-bottom: 0;
      }
   }
}
</style>
<style scoped>
.DriverDetail >>> .van-dropdown-menu__bar{
  background-color: rgb(47, 68, 138);
  height: 46px;
}
.DriverDetail >>> .van-dropdown-menu__title{
  color: rgb(255, 255, 255);
  font-size: 12px;
}
.DriverDetail >>> .van-cell--center{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.DriverDetail >>> .van-cell__title, .van-cell__value{
  flex: inherit;
}
.dropdown >>> .van-icon {
    color: #969799;
}
.detailTab >>> .van-tabs__nav--card, .detailTab >>> .van-tab{
    margin: 0;
    border: none;
    font-size: 13px;
}
.DriverDetail .lineInfo >>> .itemStatus{
  border: 1px solid #649CEE;
  color: #649CEE;
}
</style>
