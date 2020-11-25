<template>
  <div class="driver-export">
    <van-nav-bar
      title="导出"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="driver-export-center" @click="selectExprot">
      <div
        v-for="(item, inx) in exportList"
        :key="inx"
        :data-value="item.value"
        :class="item.value == active ? 'active' : ''"
      >
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
      <van-button type="info" :class="disableCss" @click="diriveExport">
        导出
      </van-button>
    </div>
  </div>
</template>

<script>
import { driverExport } from '@/api/driver';
import { orderExport } from '@/api/order';
export default {
  name: 'DriverExport',
  data() {
    return {
      active: this.$route.params.menu[0].value || 1,
      isSuccessdriver: false,
      isSuccessOrder: false,
      exportList: this.$route.params.menu,
      allTotal: this.$route.params.allTotal || 0,
      queryInfo: this.$route.params.rlueFrom
    }
  },
  computed: {
    passURL() {
      if (!process.env.NODE_ENV === 'development') {
        return 'https://szjw-bss-web.m1.yunniao.cn/'
      }
      return window.location.origin.replace('h5', 'web')
    },
    disableCss() {
      if (this.active === '1' && this.isSuccessdriver) {
        return 'van-button--disabled'
      } else if (this.active === '2' && this.isSuccessOrder) {
        return 'van-button--disabled'
      }
      return ''
    }
  },
  created() {
    this.isRouteRefresh()
  },
  methods: {
    onClickLeft() {
      this.$router.replace({ path: '/driverlist' })
    },
    selectExprot(e) {
      if (!e.target.dataset.value) return
      this.active = e.target.dataset.value
    },
    isRouteRefresh() {
      if (typeof this.$route.params.allTotal === 'undefined') { this.onClickLeft() }
    },
    diriveExport() {
      if (this.active === '1' && this.isSuccessdriver || this.active === '2' && this.isSuccessOrder) {
        this.$toast.fail('当前下载任务已存在!')
      }
      if (this.isOneClick) return
      if (this.active === '1' && !this.isSuccessdriver) {
        this.driverExportSure()
      } else if (this.active === '2' && !this.isSuccessOrder) {
        this.orderExportSure()
      }
    },
    async driverExportSure() {
      this.isOneClick = true
      try {
        this.$loading(true)
        const { data } = await driverExport(this.queryInfo)
        if (data.success) {
          this.$toast.success('导出成功')
          this.isSuccessdriver = true
        } else {
          this.$toast.fail('导出失败')
          this.isSuccessdriver = false
        }
      } catch (error) {
        this.isSuccessdriver = false
        return error
      } finally {
        this.isOneClick = false
        this.$loading(false)
      }
    },
    async orderExportSure() {
      try {
        this.isOneClick = true
        this.$loading(true)

        const { data } = await orderExport(this.queryInfo)
        if (data.success) {
          this.$toast.success('导出成功')
          this.isSuccessOrder = true
        } else {
          this.$toast.fail('导出失败')
          this.isSuccessOrder = false
        }
      } catch (error) {
        this.isSuccessOrder = false
      } finally {
        this.isOneClick = false
        this.$loading(false)
      }
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
