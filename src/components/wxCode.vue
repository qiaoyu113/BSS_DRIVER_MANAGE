<template>
  <div class="wxCodeContainer">
    <van-grid-item>
      <div class="grid-ct flex-sub">
        <img
          :src="url"
          class="grid-pic wxIcon"
          @click.stop="preview"
        >
        <div class="grid-text">
          我的推广码
        </div>
      </div>
    </van-grid-item>
  </div>
</template>

<script>
import { GetcreateQrCodeFrontUrl } from '@/api/driver.js'
import { ImagePreview } from 'vant';
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        let { data: res } = await GetcreateQrCodeFrontUrl()
        if (res.success) {
          this.url = res.data
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get wx code fail:${err}`)
      }
    },
    // 预览
    preview() {
      ImagePreview({
        images: [this.url],
        closeable: true
      });
    }
  }
}

</script>

<style lang='less' scoped>
.wxCodeContainer {

  .wxIcon {
    width: 1.0933rem;
    height: 1.0933rem;
  }
  .list-content {
    padding: 0 23px;
  }
  .grid-ct{
    position: relative;
    width: 100%;
    padding: 16px 16px 0px;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: center;

  }
  .grid-pic {
    display: block;
    margin: 0 auto;
  }
  .grid-text {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    font-size: @font-size-xs-1;
    color: @gray-13;
  }
}

</style>
