<template>
  <div class="DataStatistics">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">车辆成交</el-menu-item>
      <el-menu-item index="2">司机转化</el-menu-item>
    </el-menu>

    <DataStatisticsCar v-if="activeIndex === '1'"></DataStatisticsCar>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import BackToTop from '@/components/BackToTop'
// import { GetClueLog } from '@/api/clue/clue-api'
import DataStatisticsCar from '@/components/DataStatisticsCar'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import '@/styles/qiaoyu.scss'

export default {
  name: 'DataStatistics',
  components: { Pagination, Sticky, BackToTop, DataStatisticsCar },
  data() {
    return {
      activeIndex: '1'
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
.DataStatistics{
}
</style>

