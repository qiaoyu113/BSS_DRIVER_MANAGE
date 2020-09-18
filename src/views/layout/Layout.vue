<template>
  <div class="bss">
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view :class="showFooter ? 'padding router' : 'router'"></router-view>
      </keep-alive>
      <router-view v-else :class="showFooter ? 'padding router' : 'router'"></router-view>
    </transition>
    <BssFooter v-if="showFooter" />
  </div>
</template>

<script>

import defaultSetting from '@/settings'
import BssFooter from '@/components/BssFooter';
export default {
  name: 'Layout',
  components: {
    BssFooter
  },
  data() {
    return {
      showFooter: true,
      arr: []
    }
  },
  computed: {
    transitionName() {
      if (defaultSetting.needPageTrans) {
        return this.$store.state.direction
      }
      return ''
    }
  },
  watch: {
    // $route: {
    //   handler(to, from) {
    //     console.log(to, from)
    //     const { showFooter } = to.meta;
    //     this.setShowFooter(showFooter);
    //   },
    //   deep: true
    // }
    // 监听router
    $route(to, from) {
      console.log(to)
      if (from.meta.keepAlive) {
        this.arr.includes(from.name) || this.arr.push(from.name)
      } else {
        var name = from.name
        if (this.arr.includes(name)) {
          var index = this.arr.findIndex(function(item) {
            return item === name
          })
          this.arr.splice(index, 1)
        }
      }
      if (to) {
        this.arr.includes(to.name) || this.arr.push(to.name)
      }
      // console.log(`从${from.name}去${to.name},缓存页面有： ${this.arr}`)
    }
  },
  mounted() {
    const { showFooter } = this.$route.meta;
    this.setShowFooter(showFooter);
  },
  methods: {
    setShowFooter(showFooter) {
      this.showFooter = !!showFooter;
    }
  }
}
</script>

<style lang="scss">
@import "../../style/bss.scss";
.padding{
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>
