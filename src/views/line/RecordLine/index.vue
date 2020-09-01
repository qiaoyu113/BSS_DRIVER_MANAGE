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
        <van-uploader slot="input" v-model="form.warehouseLoadingPictures" name="warehouseLoadingPictures" :after-read="afterRead" :max-count="6" :before-delete="handleDeleteFile" />
      </van-field>
      <van-field label="其他图片" colon>
        <van-uploader slot="input" v-model="form.otherPictures" name="otherPictures" :after-read="afterRead" :max-count="6" :before-delete="handleDeleteFile" />
      </van-field>
      <van-field label="装货视频" colon class="video">
        <van-uploader slot="input" v-model="form.loadingVideo" name="loadingVideo" :after-read="afterRead" :before-read="beforeRead" :max-count="1" :preview-full-image="false" :before-delete="handleDeleteFile">
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
  </div>
</template>

<script>
import Toast from 'vant'
import { upload } from '@/api/common'
import { collectLineInfo } from '@/api/line'
export default {
  components: {
    [Toast.name]: Toast
  },
  data() {
    return {
      form: {
        warehouseLoadingPictures: [], // 库房装货图片
        otherPictures: [], // 其他图片
        loadingVideo: [], // 装货视频
        informationDescription: '' // 现场信息说明
      }
    }
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
        let params = {}
        if (this.form.warehouseLoadingPictures.length > 0) {
          params.warehouseLoadingPictures = this.form.warehouseLoadingPictures.map(item => item.url).join(',')
        }
        if (this.form.otherPictures.length > 0) {
          params.otherPictures = this.form.otherPictures.map(item => item.url).join(',')
        }
        if (this.form.loadingVideo.length > 0) {
          params.loadingVideo = this.form.loadingVideo.map(item => item.url).join('')
        }

        this.form.informationDescription && (params.informationDescription = this.form.informationDescription)
        let { data: res } = await collectLineInfo(params)
        if (res.success) {
          this.$router.push({
            path: '/line'
          })
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`submit fail:${err}`)
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

    /**
     * 上传前校验
     */
    beforeRead(file) {
      // if (file.type !== 'image/jpeg') {
      //   Toast('请上传 jpg 格式图片');
      //   return false;
      // }
      return true;
    },
    // 上传文件
    async uploadFile(file, key) {
      try {
        let formData = new FormData() // 创建form对象
        formData.append('file', file.file)
        let params = {
          expire: 0,
          folder: 'img',
          isEncode: true
        }
        let { data: res } = await upload(params, formData)
        if (res.success) {
          this.form[key].forEach((item, idx) => {
            if (!item.url) {
              this.form[key].splice(idx, 1)
            }
            this.form[key].push({
              url: res.data.url
            })
          })
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`upload file fail:${err}`)
      }
    },
    /**
     * 删除文件
     */
    handleDeleteFile(file, { index, name }) {
      this.form[name].splice(index, 1)
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
