<template>
  <div class="projectDetailContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="项目详情" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>

    <van-collapse v-model="activeNames">
      <van-collapse-item title="基本信息" name="1">
        <van-field label="项目名称" readonly :value="form.lineName" :border="false" colon />
        <van-field label="项目编号" readonly :value="form.lineName" :border="false" colon />
        <van-field label="客户名称" readonly :value="form.lineName" :border="false" colon />
        <van-field label="客户编号" readonly :value="form.lineName" :border="false" colon />
        <van-field label="线索名称" readonly :value="form.lineName" :border="false" colon />
        <van-field label="线索编号" readonly :value="form.lineName" :border="false" colon />
        <van-field label="审核状态" readonly :value="form.lineName" :border="false" colon />
        <van-field label="客户状态" readonly :value="form.lineName" :border="false" colon />
        <van-field label="客户渠道" readonly :value="form.lineName" :border="false" colon />
        <van-field label="客户属性" readonly :value="form.lineName" :border="false" colon />
        <van-field label="所属城市" readonly :value="form.lineName" :border="false" colon />
        <van-field label="联系人" readonly :value="form.lineName" :border="false" colon />
        <van-field label="联系电话" readonly :value="form.lineName" :border="false" colon />
        <van-field label="收货点类型" label-width="100" readonly :value="form.lineName" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="仓信息" name="2">
        <van-field label="仓名称" readonly :value="form.lineName" :border="false" colon />
        <van-field label="仓联系人" readonly :value="form.lineName" :border="false" colon />
        <van-field label="仓联系电话" readonly :value="form.lineName" :border="false" colon />
        <van-field label="开放时间" readonly :value="form.lineName" :border="false" colon />
        <van-field label="所在区域" readonly :value="form.lineName" :border="false" colon />
        <van-field label="详细地址" readonly :value="form.lineName" :border="false" colon />
        <van-field label="备注" readonly :value="form.lineName" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="配送信息" name="3">
        <van-field label="是否走高速" readonly :value="form.lineName" :border="false" colon />
        <van-field label="是否需要回单" readonly :value="form.lineName" label-width="100" :border="false" colon />
        <van-field label="配送车型" readonly :value="form.lineName" :border="false" colon />
        <van-field label="配送点数量" readonly :value="form.lineName" :border="false" colon />
        <van-field label="配送总里程" readonly :value="form.lineName" :border="false" colon />
        <van-field label="预计工作时间" readonly :value="form.lineName" label-width="100" :border="false" colon />
        <van-field label="限行区域说明" readonly :value="form.lineName" label-width="100" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="货物信息" name="4">
        <van-field label="货物类型" readonly :value="form.lineName" :border="false" colon />
        <van-field label="货物件数" readonly :value="form.lineName" :border="false" colon />
        <van-field label="是否需要搬运" readonly :value="form.lineName" label-width="100" :border="false" colon />
        <van-field label="其他上岗要求" readonly :value="form.lineName" label-width="100" :border="false" colon />
      </van-collapse-item>
    </van-collapse>
    <div class="btn">
      <van-button type="plain" hairline block class="distance" @click="handleLinkClick(0)">
        发布临时线路
      </van-button>

      <van-button type="primary" hairline block @click="handleLinkClick(1)">
        发布稳定线路
      </van-button>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      activeNames: ['3'],
      form: {
        lineName: '祥云物流项目'
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
.projectDetailContainer {
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
  .projectDetailContainer >>> .van-collapse-item__content {
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .projectDetailContainer >>> .van-collapse-item__title .van-cell__title {
    font-size: 15px;
    color: #3C4353;
  }

  .projectDetailContainer >>> .van-field__label {
    font-size: 14px;
    color: #A6AAB8;
  }

  .projectDetailContainer >>> .van-field__control{
    font-size: 14px;
    color: #3C4353;
  }

  .projectDetailContainer >>>.file .van-cell::after{
    border-bottom: none;
  }
  .projectDetailContainer >>> .van-image__img {
    border-radius: 10px;
  }
</style>
