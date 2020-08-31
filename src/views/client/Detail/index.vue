<template>
  <div class="customertDetailContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="客户详情" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>

    <van-field label="客户名称" readonly :value="form.lineName" :border="false" colon />
    <van-field label="客户类型" readonly :value="form.lineName" :border="false" colon />
    <!-- 公司 -->
    <van-field label="公司主体" readonly :value="form.lineName" :border="false" colon />
    <van-field label="客户编号" readonly :value="form.lineName" :border="false" colon />
    <van-field label="创建人" readonly :value="form.lineName" :border="false" colon />
    <van-field label="审核状态" readonly :value="form.lineName" :border="false" colon />
    <van-field label="客户状态" readonly :value="form.lineName" :border="false" colon />
    <van-field label="客户渠道" readonly :value="form.lineName" :border="false" colon />
    <van-field label="客户分类" readonly :value="form.lineName" :border="false" colon />
    <van-field label="所属城市" readonly :value="form.lineName" :border="false" colon />
    <van-field label="联系人" readonly :value="form.lineName" :border="false" colon />
    <van-field label="联系电话" readonly :value="form.lineName" :border="false" colon />
    <van-field label="职务" label-width="100" readonly :value="form.lineName" :border="false" colon />

    <van-field label="身份证号" readonly :value="form.lineName" :border="false" colon />
    <van-field label="客户意向度" readonly :value="form.lineName" :border="false" colon />
    <van-field label="客户体量" readonly :value="form.lineName" :border="false" colon />
    <van-field label="合同止期" readonly :value="form.lineName" :border="false" colon />
    <van-field label="创建日期" readonly :value="form.lineName" :border="false" colon />
    <van-field label="所在区域" readonly :value="form.lineName" :border="false" colon />
    <van-field label="详细地址" readonly :value="form.lineName" :border="false" colon />
    <van-field label="备注" readonly :value="form.lineName" colon />

    <van-cell-group title="营业执照" class="busiLicense">
      <ImagePreview :image-arrs="form.pics" />
    </van-cell-group>
  </div>
</template>

<script>
import ImagePreview from '../../line/Detail/components/ImagePreview'
export default {
  components: {
    ImagePreview
  },
  data() {
    return {
      form: {
        lineName: '祥云物流项目',
        pics: [
          'https://img.yzcdn.cn/vant/leaf.jpg',
          'https://img.yzcdn.cn/vant/cat.jpeg'
        ]
      }

    }
  },
  mounted() {

  },
  methods: {
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.go(-1)
    },

    /**
     * 发布线路
     */
    handleLinkClick(text) {
      this.$router.push({
        path: '/createLine',
        query: {
          isStable: text
        }
      })
    }

  }
}

</script>

<style lang='scss' scoped>
.customertDetailContainer {
  font-family: PingFangSC-Medium;
}

</style>

<style scoped>
  .customertDetailContainer >>> .van-collapse-item__content {
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .customertDetailContainer >>> .van-collapse-item__title .van-cell__title {
    font-size: 15px;
    color: #3C4353;
  }

  .customertDetailContainer >>> .van-field__label {
    font-size: 14px;
    color: #A6AAB8;
  }

  .customertDetailContainer >>> .van-field__control{
    font-size: 14px;
    color: #3C4353;
  }

  .customertDetailContainer >>>.file .van-cell::after{
    border-bottom: none;
  }
  .customertDetailContainer >>> .van-image__img {
    border-radius: 10px;
  }

  .busiLicense >>> .van-field {
    padding: 10px;
    height:0px;
  }
  .customertDetailContainer >>>.van-cell-group__title {
    font-size: 15px;
    color: #3C4353;
  }
</style>
