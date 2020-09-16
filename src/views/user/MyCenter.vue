<template>
  <div class="mycenter">
    <div style="padding:30px;box-sizing: border-box;">
      <van-button style="margin-top:40%" color="linear-gradient(to right, #ff6034, #ee0a24)" block @click="removeLocal">
        退出登陆
      </van-button>
    </div>
    <footer-tabbar />
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs } from 'vant'
import FooterTabbar from '@/components/FooterTabbar'
export default {
  name: 'MyCenter',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    FooterTabbar
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    removeLocal() {
      localStorage.clear();
      this.$router.replace({
        name: 'login'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mycenter {
    width: 100%;
}
</style>
