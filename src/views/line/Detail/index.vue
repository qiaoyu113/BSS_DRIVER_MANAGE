<template>
  <div class="lineDetailContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="线路详情" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>

    <van-collapse v-model="activeNames">
      <van-collapse-item title="基本信息" name="1">
        <van-field label="线路名称">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="线路编号">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="项目名称">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="项目编号">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="线路属性">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="线路类型">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="是否有线路余额" label-width="100">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="线路状态">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="试跑状态">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="上架截止期">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="线路稳定性">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="收货点类型">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
      </van-collapse-item>
      <van-collapse-item title="配送信息" name="2">
        <van-field label="是否走高速">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="是否需要回单">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="配送车型">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="主要配送区域">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="配送点数量">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="配送总里程数">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="限行区域说明">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
      </van-collapse-item>
      <van-collapse-item title="配送时间信息" name="3">
        <van-field label="司机上岗时间">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="配送时间">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="每日配送趟数">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="预计工作时间">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
      </van-collapse-item>
      <van-collapse-item title="结算信息" name="4">
        <van-field label="结算方式">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="结算周期">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="结算天数">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
      </van-collapse-item>
      <van-collapse-item title="货物信息" name="5">
        <van-field label="货物类型">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="货物件数">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="是否需要搬运">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="货物体积">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="货物重量">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="其他上岗要求">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
      </van-collapse-item>
      <van-collapse-item title="标签信息" name="6">
        <van-field label="线路肥瘦标签">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="线路紧急程度">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
        <van-field label="适配性">
          <span slot="input">{{ form.lineName }}</span>
        </van-field>
      </van-collapse-item>
      <van-collapse-item title="现场信息" name="7">
        <ImagePreview label="库房装货图片:" :image-arrs="form.storeRoomPics" />
        <ImagePreview label="其他图片:" :image-arrs="form.otherPics" />
        <VideoPreview :video-url="form.videoUrl" label="装货视频:" />
      </van-collapse-item>
    </van-collapse>
    <div class="btn">
      <!-- 线路状态为已上架、已开跑状态时显示此按钮 -->
      <van-button type="plain" hairline block class="distance" @click="handleLinkClick('copy')">
        复制线路
      </van-button>
      <!-- 线路状态为已上架状态时显示此按钮 -->
      <van-button type="primary" hairline block @click="handleLinkClick('edit')">
        编辑
      </van-button>
    </div>
    <div class="btn">
      <!-- 线路状态为已上架、已开跑状态时显示此按钮 -->
      <van-button type="plain" hairline block class="distance" @click="handleLinkClick('record')">
        采线
      </van-button>

      <!-- 线路状态为已上架、已开跑状态时显示此按钮 -->
      <van-button type="primary" hairline block @click="handleLinkClick('tag')">
        打标签
      </van-button>
    </div>
    <div class="btn">
      <!-- 当线路状态为已上架的时候存在此按钮 -->
      <van-button type="plain" hairline block class="distance" @click="handleOffShelf">
        下架
      </van-button>
      <!-- 所有线路状态下显示此按钮 -->
      <van-button type="primary" hairline block @click="handleLinkClick('active')">
        激活线路
      </van-button>
    </div>
  </div>
</template>

<script>
import ImagePreview from './components/ImagePreview'
import VideoPreview from './components/VideoPreview'
import { Dialog } from 'vant';
export default {
  components: {
    ImagePreview,
    VideoPreview,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      activeNames: [],
      form: {
        lineName: '祥云物流项目',
        storeRoomPics: [
          'https://img.yzcdn.cn/vant/leaf.jpg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/leaf.jpg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/leaf.jpg',
          'https://img.yzcdn.cn/vant/cat.jpeg'
        ],
        otherPics: [
          'https://img.yzcdn.cn/vant/leaf.jpg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/leaf.jpg'
        ],
        videoUrl: ''
      }

    }
  },
  mounted() {
    this.form.videoUrl = 'https://s3.pstatp.com/aweme/resource/web/static/image/index/tvc-v3_0b9db49.mp4'
  },
  methods: {
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.go(-1)
    },
    /**
     * 下架
     */
    handleOffShelf() {
      Dialog.confirm({
        title: '提示',
        message: '确认要下架该线路吗?',
        confirmButtonText: '确定',
        confirmButtonColor: '#2F448A',
        cancelButtonColor: ''
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    /**
     * 打标签
     */
    handleLinkClick(text) {
      let path = ''
      switch (text) {
        case 'tag':
          path = '/lineTag'
          break;
        case 'record':
          path = '/recordLine'
          break;
        case 'copy':
          path = '/copyLine'
          break;
        case 'edit':
          path = '/editLine'
          break;
        case 'active':
          path = '/activeLine'
          break;
        default:
          path = '/'
      }

      this.$router.push({
        path: path
      })
    }

  }
}

</script>

<style lang='scss' scoped>
.lineDetailContainer {
  font-family: PingFangSC-Medium;
  .btn {
    padding: 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .distance {
      margin-right:5px;
    }
  }
}

</style>

<style scoped>
  .lineDetailContainer >>> .van-collapse-item__content {
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .lineDetailContainer >>> .van-collapse-item__title .van-cell__title {
    font-size: 15px;
    color: #3C4353;
  }

  .lineDetailContainer >>> .van-field__label {
    font-size: 14px;
    color: #A6AAB8;
  }

  .lineDetailContainer >>> .van-field__control{
    font-size: 14px;
    color: #3C4353;
  }

  .lineDetailContainer >>>.file .van-cell::after{
    border-bottom: none;
  }
  .lineDetailContainer >>> .van-image__img {
    border-radius: 10px;
  }
</style>
