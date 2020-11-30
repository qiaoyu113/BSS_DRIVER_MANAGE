<template>
  <div class="DriverTitle">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      >
        <template v-if="showChange" #right>
          <div
            v-permission="[
              '/v2/driver/share/interview',
              '/v2/driver/special/interview'
            ]"
            class="checkStyle"
            style="margin-right: 10px; color: #fff; font-size: 12px"
            @click="showCreate = true"
          >
            新建
          </div>
          <!-- <div v-permission="['/v2/driver/updateGmByDriverId']" class="checkStyle" style="color: #fff; font-size: 12px;" @click="changeManager">

          </div> -->
          <div
            style="color: #fff"
            class="search"
            @click="showActionSheet = !showActionSheet"
          >
            <span>操作</span><van-icon
              name="play"
              class="play icon-play"
              :class="showActionSheet ? 'actice-play' : ''"
            />
          </div>
          <van-action-sheet
            v-model="showActionSheet"
            :actions="actions"
            cancel-text="取消"
            close-on-click-action
            @cancel="onCancel"
            @select="onSelect"
          />
        </template>
      </van-nav-bar>
      <van-search
        v-if="title === '司机管理'"
        v-permission="['/v2/driver/getDriverList']"
        readonly
        show-action
        placeholder="司机姓名/司机编号/司机手机号搜索"
        @click="searchClick"
      >
        <template #action>
          <div class="search" @click.stop="screenOut">
            <span>筛选</span>
            <van-icon class="play" name="play" />
          </div>
        </template>
      </van-search>
    </van-sticky>
    <van-popup v-model="showCreate" position="top">
      <div class="createBox">
        <van-cell
          v-permission="['/v2/driver/share/interview']"
          value="共享面试司机"
          clickable
          @click="goRouter('shareinterview')"
        />
        <van-cell
          v-permission="['/v2/driver/special/interview']"
          value="专车面试司机"
          clickable
          @click="goRouter('tailoredinterview')"
        />
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
    },
    actions: {
      type: Array,
      default: () => []
    }

  },
  data() {
    return {
      showCreate: false,
      showActionSheet: false
      // actions: [{ name: '更换加盟经理', value: 0 }, { name: '导出', value: 1 }]
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() { },
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
    },
    onCancel(e) {
      console.log(e)
    },
    onSelect(e) {
      this.$emit('changeManager', { show: true, value: e.value })
    }
  }
};
</script>
<style lang="scss" scoped>
.DriverTitle {
  .checkStyle:active {
    opacity: 0.7;
  }
  .createBox {
    width: 100%;
    .van-cell__value--alone {
      font-size: 17px;
      color: #4a4a4a;
      letter-spacing: 0;
      text-align: center;
    }
    .van-cell--clickable {
      color: #7f8fbd !important;
    }
  }
  .search {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .play {
      transform: rotate(90deg);
      -ms-transform: rotate(90deg); /* IE 9 */
      -moz-transform: rotate(90deg); /* Firefox */
      -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
      -o-transform: rotate(90deg);
    }
  }
  .icon-play {
    line-height: 20px;
  }
  .actice-play{
    transform: rotate(270deg)!important;
  }
}
</style>
<style scoped>
.van-search {
  /* padding: 5px 10px 5px 15px; */
  box-sizing: border-box;
}
.DriverTitle >>> .van-nav-bar__right:active {
  opacity: 1;
}
</style>
