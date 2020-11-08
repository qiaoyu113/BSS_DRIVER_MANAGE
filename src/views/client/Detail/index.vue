<template>
  <div class="customertDetailContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="客户详情" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>
    <van-collapse v-model="activeNames">
      <van-field label="客户名称" label-width="100" readonly :value="form.customerCompanyName | DataIsNull" :border="false" colon />
      <van-field label="客户类型" label-width="100" readonly :value="form.customerTypeName | DataIsNull" :border="false" colon />
      <!-- 公司 -->
      <van-field v-if="form.customerType ===1" label="公司主体" label-width="100" readonly :value="form.customerCompanyMain | DataIsNull" :border="false" colon />
      <van-field label="客户编号" label-width="100" readonly :value="form.customerId | DataIsNull" :border="false" colon />
      <van-field label="创建人" label-width="100" readonly :value="form.createName | DataIsNull" :border="false" colon />
      <van-field v-if="false" label="审核状态" label-width="100" readonly :value="form.reviewStateName | DataIsNull" :border="false" colon />
      <van-field label="客户状态" label-width="100" readonly :value="form.customerStateName | DataIsNull" :border="false" colon />
      <van-field label="客户渠道" label-width="100" readonly :value="form.customerChannelsName | DataIsNull" :border="false" colon />
      <van-field label="客户分类" label-width="100" readonly :value="form.classificationName | DataIsNull" :border="false" colon />
      <van-field label="所属城市" label-width="100" readonly :value="form.cityName | DataIsNull" :border="false" colon />
      <van-field label="联系人" label-width="100" readonly :value="form.bussinessName | DataIsNull" :border="false" colon />
      <van-field label="联系电话" label-width="100" readonly :value="form.bussinessPhone | DataIsNull" :border="false" colon />
      <van-field label="职务" label-width="100" readonly :value="form.bussinessPosition | DataIsNull" :border="false" colon />
      <van-field label="身份证号" label-width="100" readonly :value="form.bussinessCard | DataIsNull" :border="false" colon />
      <van-field label="客户意向度" label-width="100" readonly :value="form.customerIntentionName | DataIsNull" :border="false" colon />
      <van-field label="客户体量" label-width="100" readonly :value="form.customerSize | DataIsNull" :border="false" colon />
      <van-field label="合同止期" label-width="100" readonly :value="form.contractEnd ?timeFormat(form.contractEnd,'YYYY-MM-DD') : '暂无数据'" :border="false" colon />
      <van-field label="创建日期" label-width="100" readonly :value="form.createDate ?timeFormat(form.createDate,'YYYY-MM-DD HH:mm:ss') : '暂无数据'" :border="false" colon />
      <van-field label="所在区域" label-width="100" readonly :value="region | DataIsNull" :border="false" colon />
      <van-field label="详细地址" label-width="100" readonly autosize type="textarea" :value="form.address | DataIsNull" :border="false" colon />
      <van-field label="备注" label-width="100" readonly autosize type="textarea" :value="form.remark | DataIsNull" colon />
      <van-cell-group v-if="form.customerType ===1" title="营业执照" class="busiLicense">
        <ImagePreview :image-arrs="form.businessLicenseUrl" />
      </van-cell-group>
    </van-collapse>
  </div>
</template>

<script>
import ImagePreview from '../../line/Detail/components/ImagePreview'
import { getClientDetail } from '@/api/client'
import dayjs from 'dayjs'
export default {
  components: {
    ImagePreview
  },
  data() {
    return {
      activeNames: ['1'],
      form: {},
      customerId: '' // 客户详情
    }
  },
  computed: {
    region() {
      let str = ''
      if (this.form.areaProvinceName) {
        str = this.form.areaProvinceName
      }
      if (this.form.areaCityName) {
        str += `/${this.form.areaCityName}`
      }
      if (this.form.areaCountyName) {
        str += `/${this.form.areaCountyName}`
      }
      return str
    }
  },
  mounted() {
    this.customerId = this.$route.query.customerId
    if (this.customerId) {
      this.getClientDetail()
    }
  },
  methods: {
    // YYYY-MM-DD dddd HH:mm:ss
    timeFormat(date, format) {
      return dayjs(date).format(format)
    },
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
    },
    // 获取客户详情
    async getClientDetail() {
      try {
        this.$loading(true)
        let params = {
          customerId: this.customerId
        }
        let { data: res } = await getClientDetail(params)
        if (res.success) {
          this.form = res.data || {}
          this.form.businessLicenseUrl = this.form.businessLicenseUrl && this.form.businessLicenseUrl.split(',') || []
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get client detail fail:${err}`)
      } finally {
        this.$loading(false)
      }
    }

  }
}

</script>

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
