<template>
  <div class="RecordLineContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="补录线路" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>
    <h4 class="title van-hairline--bottom">
      标签信息
    </h4>
    <!-- form表单 -->
    <van-form ref="recordLine" @submit="onSubmit">
      <van-field label="库房装货图片" colon label-width="100">
        <van-uploader
          slot="input"
          v-model="showForm.warehouseLoadingPictures"
          name="warehouseLoadingPictures"
          :after-read="afterRead"
          :max-count="6"
          :before-delete="handleDeleteFile"
          :max-size="5 * 1024 * 1024"
          @oversize="onOversize('5M')"
        />
      </van-field>
      <van-field label="其他图片" colon>
        <van-uploader
          slot="input"
          v-model="showForm.otherPictures"
          name="otherPictures"
          :after-read="afterRead"
          :max-count="6"
          :before-delete="handleDeleteFile"
          :max-size="5 * 1024 * 1024"
          @oversize="onOversize('5M')"
        />
      </van-field>
      <van-field label="装货视频" colon class="video">
        <van-uploader
          slot="input"
          v-model="showForm.loadingVideo"
          name="loadingVideo"
          :after-read="afterRead"
          :max-count="1"
          :preview-full-image="false"
          accept="video/*"
          :before-delete="handleDeleteFile"
          :max-size="50 * 1024 * 1024"
          @oversize="onOversize('50M')"
          @click-preview="handleVideoPreview"
        >
        </van-uploader>
      </van-field>
      <p class="tips van-hairline--bottom">
        提示:上传视频限制50M
      </p>

      <van-field
        v-model="form.informationDescription"
        label-width="100"
        colon
        rows="2"
        autosize
        label="现场信息说明"
        placeholder="请输入..."
        type="textarea"
        maxlength="300"
        show-word-limit
        class="textarea"
      />
      <van-button type="primary" block class="btn">
        提交
      </van-button>
    </van-form>

    <VideoPlay
      v-if="show"
      v-model="show"
      :url="videoUrl"
      @close="show=false"
    />
  </div>
</template>

<script>
import { upload } from '@/api/common'
import { collectLineInfo } from '@/api/line'
import VideoPlay from '../components/video'
export default {
  components: {
    VideoPlay
  },
  data() {
    return {
      showForm: {
        warehouseLoadingPictures: [], // 库房装货图片
        otherPictures: [], // 其他图片
        loadingVideo: [] // 装货视频
      },
      form: {
        warehouseLoadingPictures: [], // 库房装货图片
        otherPictures: [], // 其他图片
        loadingVideo: [], // 装货视频
        informationDescription: '' // 现场信息说明
      },
      show: false,
      videoUrl: '',
      lineId: ''
    }
  },
  mounted() {
    this.lineId = this.$route.query.lineId
  },
  methods: {
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.go(-1)
    },
    /**
     *提交
     */
    async onSubmit(values) {
      try {
        this.$loading(true)
        let params = {
          lineId: this.lineId
        }
        if (this.form.warehouseLoadingPictures.length > 0) {
          params.warehouseLoadingPictures = this.form.warehouseLoadingPictures
        }
        if (this.form.otherPictures.length > 0) {
          params.otherPictures = this.form.otherPictures
        }
        if (this.form.loadingVideo.length > 0) {
          params.loadingVideo = this.form.loadingVideo.join('')
        }

        this.form.informationDescription && (params.informationDescription = this.form.informationDescription)
        let { data: res } = await collectLineInfo(params)
        if (res.success) {
          this.$router.push({
            path: '/line'
          })
        } else {
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`submit fail:${err}`)
      } finally {
        this.$loading(false)
      }
    },
    /**
     * 重置表单
     */
    reset() {
      this.$refs.recordLine.resetValidation()
    },
    // 上传库房装货图片
    afterRead(file, { name }) {
      this.uploadFile(file, name)
    },
    // 上传文件
    async uploadFile(file, key) {
      try {
        file.status = 'uploading';
        file.message = '上传中...';
        let formData = new FormData() // 创建form对象
        formData.append('file', file.file)
        let params = {
          expire: 0,
          folder: key === 'loadingVideo' ? 'video' : 'img',
          isEncode: true
        }
        let { data: res } = await upload(params, formData)
        if (res.success) {
          file.status = 'done';
          this.form[key].push(res.data.url)
        } else {
          this.$fail(res.errorMsg)
          file.status = 'failed';
          file.message = '上传失败';
        }
      } catch (err) {
        console.log(`upload file fail:${err}`)
        file.status = 'failed';
        file.message = '上传失败';
      }
    },
    /**
     * 删除文件
     */
    handleDeleteFile(file, { index, name }) {
      this.form[name].splice(index, 1)
      this.showForm[name].splice(index, 1)
    },
    // 预览视频
    handleVideoPreview() {
      this.videoUrl = this.showForm.loadingVideo[0].content
      this.show = true
    },
    // 文件最大限制
    onOversize(size) {
      this.$toast(`文件大小不能超过${size}`)
    }
  }
}

</script>

<style lang='scss' scoped>
.RecordLineContainer {
  font-family: PingFangSC-Medium;
  .title {
    margin:10px 0px 0px 0px;
    padding-left: 15px;
    padding-bottom: 12.5px;
    font-size: 15px;
    color: #3C4353;
  }
  .btn {
    margin:50px 15px 0px;
    width: 345px;
  }
  .tips {
    padding-left: 15px;
    padding-bottom: 15px;
    margin-top:10px;
    font-size: 11px;
    color: #FFA000;
  }
  .video {
    &.van-cell::after {
      border-bottom:none;
    }
  }
}

</style>

<style scoped>
  .RecordLineContainer >>> .van-image__img {
    border-radius: 8px;
  }
  .RecordLineContainer >>> .van-cell {
    display: flex;
    flex-direction: column;
  }
  .RecordLineContainer >>> .van-field__label {
    margin-bottom: 10px;
  }
  .textarea >>> .van-field__value {
    padding: 3px;
    background: #FAFBFC;
    border: 1px solid #DDE2EE;
    border-radius: 6px;
  }
</style>
