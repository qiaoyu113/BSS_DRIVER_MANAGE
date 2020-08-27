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
  </div>
</template>
<script>
import { DropdownMenu, DropdownItem, Cell, CellGroup } from 'vant';
export default {
  name: 'DriverDetail',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
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
</style>
