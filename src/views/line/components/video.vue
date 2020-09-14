<template>
  <div class="videoContainer">
    <van-image-preview closeable v-bind="$attrs" v-on="$listeners">
      <template v-slot:cover>
        <div id="xg"></div>
      </template>
    </van-image-preview>
  </div>
</template>

<script>
import Player from 'xgplayer'
import { ImagePreview } from 'vant';
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      player: null
    }
  },
  watch: {
    'url': {
      handler(val) {
        if (val) {
          setTimeout(() => {
            this.init()
          }, 120)
        }
      },
      immediate: true
    }
  },
  beforeDestroy() {
    // 销毁播放器实例
    if (this.player) {
      this.player.destroy(true)
      this.player = null
    }
  },
  methods: {
    // 初始化视频播放器
    init() {
      this.player = new Player({
        id: 'xg',
        fluid: true,
        volume: 0.6,
        whitelist: ['iPhone OS 9', 'iPhone OS 10', 'iPhone OS 11', 'iPhone OS 12', 'Android'],
        playsinline: true,
        enterBg: { // 视频加载页背景
          color: 'rgba(0,0,0,0.87)'
        },
        enterTips: { // 视频加载页加载特效
          background: 'linear-gradient(to right, rgba(0,0,0,0.87), #3D96FD, rgba(86,195,248), #3D96FD, rgba(0,0,0,0.87))'
        },
        pluginRule: true,
        closeVideoDblclick: true, // 关闭默认的dblclick触发进入/退出全屏功能
        closeVideoTouch: true, // 关闭默认的touchend触发视频暂停/播放功能
        'x5-video-player-type': 'h5',
        'x5-video-player-fullscreen': false,
        'x5-video-orientation': 'portraint',
        rotate: { // 视频旋转按钮配置项
          innerRotate: true, // 只旋转内部video
          clockwise: false // 旋转方向是否为顺时针
        },
        url: this.url,
        videoInit: true
      })
      // this.player.on('play', () => {
      //   this.player.getFullscreen(this.player.root)
      // })
    }
  }
}

</script>

<style scoped>
  .videoContainer >>>.van-icon-clear {
    z-index:110;
  }
</style>
<style>
  .videoContainer .van-image-preview__cover {
    width: 100vw!important;
  }
</style>
