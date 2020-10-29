<template>
  <div class="DriverTitle">
    <van-sticky :offset-top="0">
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="$router.go(-1)">
        <template v-if="showChange" #right>
          <div v-permission="['/v2/driver/share/interview','/v2/driver/special/interview']" class="checkStyle" style="margin-right : 10px; color: #fff;font-size: 12px;" @click="showCreate = true">
            新建
          </div>
          <div v-permission="['/v2/driver/updateGmByDriverId']" class="checkStyle" style="color: #fff; font-size: 12px;" @click="changeManager">
            更换加盟经理
          </div>
        </template>
      </van-nav-bar>
      <van-search v-if="title === '司机管理'" v-permission="['/v2/driver/getDriverList']" disabled show-action placeholder="请输入搜索关键词" @click="searchClick">
        <template #action>
          <div class="search" @click.stop="screenOut ">
            <span>筛选</span>
            <van-icon class="play" name="play" />
          </div>
        </template>
      </van-search>
    </van-sticky>
    <van-popup v-model="showCreate" position="top">
      <div class="createBox">
        <van-cell v-permission="['/v2/driver/share/interview']" value="共享面试司机" clickable @click="goRouter('shareinterview')" />
        <van-cell v-permission="['/v2/driver/special/interview']" value="专车面试司机" clickable @click="goRouter('tailoredinterview')" />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Icon } from 'vant';
export default {
  name: 'DriverTitle',
  components: {
    [Icon.name]: Icon
  },
  props: {
    showChange: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showCreate: false
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {},
  methods: {
    screenOut() {
      this.$emit('screen', { show: true })
    },
    searchClick() {
      this.$router.push('/driversearch')
    },
    changeManager() {
      this.$emit('changeManager', { show: true })
    },
    goRouter(url) {
      this.$router.push(`/${url}`)
    }
  }
};
</script>
<style lang="scss" scoped>
.DriverTitle{
  .checkStyle{
    cursor: pointer;
  }
  .checkStyle:active{
    background-color: #2f448a;
    color: yellow;
  }
  .createBox{
    width: 100%;
    .van-cell__value--alone{
      font-size: 17px;
      color: #4A4A4A;
      letter-spacing: 0;
      text-align: center;
    }
    .van-cell--clickable{
      color: #7F8FBD!important;
    }
  }
  .search{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .play{
      transform:rotate(90deg);
      -ms-transform:rotate(90deg); 	/* IE 9 */
      -moz-transform:rotate(90deg); 	/* Firefox */
      -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
      -o-transform:rotate(90deg);
    }
  }
}

</style>
<style scoped>
.van-search{
  padding: 5px 10px 5px 15px;
  box-sizing: border-box;
}
.DriverTitle >>> .van-nav-bar__right{
  cursor: none;
}
.DriverTitle >>> .van-nav-bar__right:active{
  background: #2f448a;
  color: white;
}
</style>
