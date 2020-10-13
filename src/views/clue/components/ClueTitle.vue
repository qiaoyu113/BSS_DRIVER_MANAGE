<template>
  <div class="ClueTitle">
    <van-sticky :offset-top="0">
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="$router.go(-1)">
        <template v-if="showChange" #right>
          <div v-permission="['/v2/clue/updateGmByClueId']" style="color: #fff; font-size: 0.37333rem;" @click="changeManager">
            更换归属人
          </div>
        </template>
      </van-nav-bar>
      <van-search v-if="title === '线索管理'" disabled show-action placeholder="线索姓名/线索编号/线索手机号" @click="searchClick">
        <template #action>
          <div class="search" @click.stop="screenOut ">
            <span>筛选</span>
            <van-icon class="play" name="play" />
          </div>
        </template>
      </van-search>
    </van-sticky>
  </div>
</template>
<script>
export default {
  name: 'ClueTitle',
  props: {
    showChange: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
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
      this.$router.push('/cluesearch')
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
.ClueTitle{
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
</style>
