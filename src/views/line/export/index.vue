<template>
  <div class="line-export">
    <van-nav-bar
      title="导出"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <template v-if="!exportSuccess">
      <div class="export-text">
        <p>
          已选择数据项：<span style="color: blue"> {{ allTatol }} </span>条数据，点击按钮导出！
        </p>
        <van-button block type="primary" @click="exportSure">
          导出
        </van-button>
      </div>
    </template>
    <template v-if="exportSuccess">
      <div class="copy-export">
        <p>请复制下面链接，前往电脑端打开此链接，操作导出！</p>
        <div class="copy-text">
          https://szjw-bss-web.yunniao.cn/
        </div>
        <input
          id="inputRef"
          type="text"
          readonly
          class="copy-input"
          :value="address"
        >
        <van-button block type="primary" @click="copyAddress">
          复制链接
        </van-button>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allTatol: this.$route.params.allTotal,
      address: 'https://szjw-bss-web.yunniao.cn/',
      exportSuccess: false
    }
  },
  created() {
    this.isRouteRefresh()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    copyAddress() {
      const input = document.querySelector('#inputRef')
      input.select()
      document.execCommand('copy')
      this.$toast({
        message: '复制链接成功！',
        position: 'bottom'
      })
    },
    exportSure() {
      const purl = this.$route.params.purl
      if (purl === 'line') {
        this.lineManagement()
      } else if (purl === 'project') {
        this.projectManagement()
      }
    },
    isRouteRefresh() {
      if (typeof this.$route.params.allTotal === 'undefined') { this.onClickLeft() }
    },
    async lineManagement() {
      console.log(1)
      //
    },
    async projectManagement() {
      console.log(2)
    }

  }
}
</script>

<style lang="less" scoped>
.line-export {
  .export-text {
    margin-top: 129px;
    padding: 0 16px;
    p {
      color: #333;
      font-size: 16px;
      margin-bottom: 129px;
    }
  }
  .copy-export {
    font-size: 16px;
    padding: 0 8px;
    p {
      margin-top: 69px;
      padding: 20px 0;
    }
    .copy-text {
      line-height: 59px;
      text-align: center;
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      margin: 60px 0;
      background-color: #fff;
    }
    .copy-input {
      opacity: 0;
      position: absolute;
      top: -500px;
      left: -500px;
    }
  }
}
</style>
