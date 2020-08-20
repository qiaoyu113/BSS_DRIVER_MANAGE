<template>
  <div class="consignorSearch">
    <van-search class="search-left" placeholder="请输入货主名称" background="#F2F2F2" @click="handleSearchClick" />
    <div class="add">
      <van-icon name="add" size="40" color="#5C9BDD " @click="handleAddClick" />
      <!-- <p @click="handleAddClick">
        新建货主
      </p> -->
    </div>
  </div>
</template>

<script>
import { Search, Icon } from 'vant';
export default {
  components: {
    [Search.name]: Search,
    [Icon.name]: Icon
  },
  methods: {
    handleSearchClick() {
      this.$router.push({
        path: '/bss/consignorSearch'
      })
    },
    handleAddClick() {
      this.$router.push({
        path: '/bss/consignorAdd'
      })
    }
  }
}

</script>

<style lang='scss' scoped>
.consignorSearch {
  display: flex;
  .search-left{
    flex: 1;
  }
  .add {
    display: flex;
    align-items: center;
    .van-icon{
      padding: 0 5px;
    }
  }
}

</style>

<style scoped>
  .consignorSearch >>> .van-search__content {
    background: #ffffff;
  }
</style>
