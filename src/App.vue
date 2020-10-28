<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="cachedViews">
        <!-- <keep-alive> -->
        <router-view v-if="$route.meta.keepAlive" class="router"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive" class="router"></router-view>
    </transition>
    <div v-if="version" class="version">
      {{ version }}
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import defaultSetting from './settings'
export default {
  name: 'App',
  data() {
    return {
      version: ''
    }
  },
  computed: {
    ...mapState({
      cachedViews: (state) => state['cached-views'].cachedViews
    }),
    transitionName() {
      if (defaultSetting.needPageTrans) {
        return this.$store.state.direction
      }
      return ''
    }
  },
  watch: {
    $route() {
      const { name } = this.$route
      if (name === 'index') {
        this.$store.dispatch('cached-views/delAllViews')
      }
      if (name) {
        this.$store.dispatch('cached-views/addView', this.$route)
      }
    }
  },
  mounted() {
    if (window.location.host !== 'firmiana-wechat.yunniao.cn') {
      this.version = this.GLOBAL.version
    }
  },
  methods: {
    wxLogin() {
      // wx.config({
      //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //   appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
      //   timestamp: '', // 必填，生成签名的时间戳
      //   nonceStr: '', // 必填，生成签名的随机串
      //   signature: '', // 必填，签名，见附录1
      //   jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      // });
    }
  }
}
</script>

<style lang="scss">
html,body{ margin:0px; height:100%;}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
}

.version{
  font-size: 12px;
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  z-index:100;
  height: 100px;
}

.router {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // background-color: #fff;
}
</style>
