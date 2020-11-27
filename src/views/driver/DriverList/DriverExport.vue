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
        :class="active.includes(item.value) ? 'active' : ''"
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
          target="_blank"
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
      active: [this.$route.params.menu[0].value || '1'],
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
      if (!Array.isArray(this.active)) return ''
      return this.active.length > 0 ? '' : 'van-button--disabled'
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
      const inx = this.active.indexOf(e.target.dataset.value)
      if (inx !== -1) {
        this.active.splice(inx, 1)
      } else {
        if (e.target.dataset.value === '1' && this.isSuccessdriver || e.target.dataset.value === '2' && this.isSuccessOrder) {
          this.$toast({
            message: '当前下载任务已存在!',
            position: 'bottom'
          })
        } else {
          this.active.push(e.target.dataset.value)
        }
      }
    },
    isRouteRefresh() {
      if (typeof this.$route.params.allTotal === 'undefined') { this.onClickLeft() }
    },
    diriveExport() {
      if (Array.isArray(this.active) && this.active.length === 0) {
        this.$toast.fail('当前未选中导出信息类型，无法导出！')
      }
      if (this.active.includes('1') && this.isSuccessdriver || this.active.includes('2') && this.isSuccessOrder) {
        this.$toast({
          message: '当前下载任务已存在!',
          position: 'bottom'
        })
      }
      if (this.isOneClick) return
      if (this.active.includes('1') && !this.isSuccessdriver) {
        this.driverExportSure()
      }
      if (this.active.includes('2') && !this.isSuccessOrder) {
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
          const inx = this.active.indexOf('1')
          this.active.splice(inx, 1)
        } else {
          this.$toast.fail('导出失败')
          this.isSuccessdriver = false
        }
      } catch (error) {
        this.isSuccessdriver = false
      } finally {
        this.isOneClick = false
        this.$loading(false)
        this.$toast.clear()
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
          const inx = this.active.indexOf('2')
          this.active.splice(inx, 1)
        } else {
          this.$toast.fail('导出失败')
          this.isSuccessOrder = false
        }
      } catch (error) {
        this.isSuccessOrder = false
      } finally {
        this.isOneClick = false
        this.$loading(false)
        this.$toast.clear()
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
