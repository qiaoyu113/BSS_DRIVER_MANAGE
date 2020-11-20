<template>
  <div class="driver-export">
    <van-nav-bar
      title="导出"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="driver-export-center" @click="selectExprot">
      <div v-for="(item,inx) in exportList" :key="inx" :data-value="item.value" :class="item.value==active?'active':''">
        {{ item.name }}
      </div>
    </div>
    <div class="export-description">
      <p style="margin-bottom: 12px">
        已选择<span class="blue">{{ allTotal }}</span>条数据
      </p>
      <p>
        点击导出后，请在web端：<a
          class="blue"
          :href="passURL"
        >szjw-bss-web.yunniao.cn</a>&nbsp;右上角下载工具中下载！
      </p>
    </div>
    <div class="export-btn">
      <van-button type="info" @click="diriveExport">
        导出
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DriverExport',
  data() {
    return {
      active: 1,
      exportList: [{
        name: '司机信息',
        value: 1
      }, {
        name: '订单信息',
        value: 2
      }],
      allTotal: this.$route.params.allTotal || 0
    }
  },
  computed: {
    passURL() {
      if (!process.env.NODE_ENV === 'development') {
        return 'https://szjw-bss-web.m1.yunniao.cn/'
      }
      return window.location.origin.replace('h5', 'web')
    }
  },
  methods: {
    onClickLeft() {
      this.$router.replace({ path: '/driverlist' })
    },
    selectExprot(e) {
      if (!e.target.dataset.value) return
      this.active = e.target.dataset.value
    },
    diriveExport() {
    }
  }

}
</script>

<style lang="scss" scoped>
.driver-export {
  font-size: 16px;
  color: #333;
  .driver-export-center {
    padding: 0 40px;
    display: flex;
    margin-top: 80px;
    justify-content: space-around;
    div {
      width: 120px;
      height: 46px;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 46px;
      border-radius: 5px;
    }
  }
  .export-description {
    margin-top: 120px;
    padding: 0 40px;
    p {
      margin: 0;
    }
  }
  .blue {
    font-size: 17px;
    color: #6e9ee8;
  }
  .active {
    background: #333;
    color: #fff;
  }
  .export-btn {
    display: flex;
    justify-content: center;
  }
  .van-button {
    width: 60%;
    margin-top: 90px;
  }
}
</style>
