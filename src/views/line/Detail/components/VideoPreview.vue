<template>
  <div class="VideoPreviewContainer">
    <div>{{ label }}</div>
    <div>
      <van-image
        class="image"
        src="https://img.yzcdn.cn/vant/leaf.jpg"
        @click="show=true"
      />
      <VideoPlay
        v-if="show"
        v-model="show"
        :url="videoUrl"
        @close="show=false"
      />
    </div>
  </div>
</template>

<script>
import VideoPlay from '../../components/video'
export default {
  components: {
    VideoPlay
  },
  props: {
    videoUrl: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
    }
  }

}

</script>

<style lang='scss' scoped>
.VideoPreviewContainer {
  padding: 10px 16px;
  .image {
    margin-top:10px;
    width:75px;
    height:75px;
  }
}

</style>

