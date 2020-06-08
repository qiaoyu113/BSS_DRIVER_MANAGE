<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>

    <div class="versions">v{{ $store.getters.version }}</div>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet" lang="scss" scoped>
  .versions{
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1000;
    color: #fff;
    text-align: center;
    font-size: 13px;
  }
  .menu-wrapper{
    z-index:1001;
    position: relative;
  }
</style>
