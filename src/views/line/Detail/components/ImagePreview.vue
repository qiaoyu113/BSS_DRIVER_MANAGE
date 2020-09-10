<template>
  <div class="file">
    <van-field :label="label" label-width="100">
      <span slot="input"></span>
    </van-field>
    <template v-if="imageArrs.length > 0">
      <van-image
        v-for="(item,index) in imageArrs"
        :key="label+index"
        :style="{
          marginRight:index % 4 === 3 ? '0px':'',
          marginLeft:index % 4 ===0 ? '0.43rem':''
        }"
        class="image"
        :src="item"
        @click="handleImagePreview(index)"
      />
    </template>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  props: {
    imageArrs: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    /**
     * 预览图片
     */
    handleImagePreview(startPosition) {
      ImagePreview({
        images: this.imageArrs,
        startPosition,
        closeable: true
      });
    }
  }
}

</script>

<style lang='scss' scoped>
.file {
  .image {
    margin-right:10px;
    width:75px;
    height:75px;
  }
}
</style>
