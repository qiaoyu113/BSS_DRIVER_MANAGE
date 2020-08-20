<template>
  <div class="consignorNavBar">
    <van-nav-bar
      :title="$route.query.id ? '编辑货主':'创建货主'"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Icon, Dialog } from 'vant';
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog
  },
  data() {
    return {

    }
  },
  methods: {

  }
}

</script>

<style lang='scss' scoped>
.consignorNavBar {
  .rightText {
    color:#333;
    font-weight:bold;
    font-size:14px;
  }
}

</style>

<style scoped>
  .consignorNavBar >>>  .van-nav-bar__right {
    display: flex;
    align-items: center;
  }
</style>
