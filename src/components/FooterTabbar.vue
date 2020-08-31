<template>
  <van-tabbar
    class="FooterTabbar"
    route
    :safe-area-inset-bottom="true"
    :active-color="deepBlue"
    inactive-color="#DDE2EE"
  >
    <van-tabbar-item
      icon="wap-home"
      replace
      to="/"
    >
      首页
    </van-tabbar-item>
    <van-tabbar-item
      icon="manager"
      replace
      to="/mycenter"
    >
      个人中心
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import variablesLess from '@/style'; // 引入less 变量
const { vantLess } = variablesLess;
export default {
  name: 'FooterTabbar',
  data() {
    return {
      deepBlue: vantLess.deepBlue
    }
  }
}
</script>
<style lang="less" scoped>
.FooterTabbar{
  ::v-deep{
    .van-tabbar-item{
      .van-icon{
        font-size: 25px;
      }
    }
  }
}
</style>
