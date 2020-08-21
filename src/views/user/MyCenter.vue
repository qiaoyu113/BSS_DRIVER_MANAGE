<template>
  <div class="mycenter">
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

  }
}
</script>
<style lang="scss" scoped>
.mycenter {
    width: 100%;
}
</style>
