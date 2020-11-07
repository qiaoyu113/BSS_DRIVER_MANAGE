<template>
  <div class="projectDetailContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="项目详情" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>

    <van-collapse v-model="activeNames">
      <van-collapse-item title="基本信息" name="1">
        <van-field label="项目名称" label-width="100" readonly :value="form.projectName | DataIsNull" :border="false" colon />
        <van-field label="项目编号" label-width="100" readonly :value="form.projectId | DataIsNull" :border="false" colon />
        <van-field label="客户名称" label-width="100" readonly :value="form.customerName | DataIsNull" :border="false" colon />
        <van-field label="客户编号" label-width="100" readonly :value="form.customerId | DataIsNull" :border="false" colon />
        <van-field label="线索名称" label-width="100" readonly :value="form.clueName | DataIsNull" :border="false" colon />
        <van-field label="线索编号" label-width="100" readonly :value="form.clueId | DataIsNull" :border="false" colon />
        <van-field label="审核状态" label-width="100" readonly :value="auditStateName" :border="false" colon />
        <van-field label="项目状态" label-width="100" readonly :value="form.projectState === 1 ? '禁用' :'启用'" :border="false" colon />
        <van-field label="上岗经理" label-width="100" readonly :value="form.dutyManagerName | DataIsNull" :border="false" colon />
        <van-field label="外线销售" label-width="100" readonly :value="form.lineSaleName | DataIsNull" :border="false" colon />
        <van-field label="所属城市" label-width="100" readonly :value="form.cityName | DataIsNull" :border="false" colon />
        <van-field label="联系人" label-width="100" readonly :value="form.bussinessName | DataIsNull" :border="false" colon />
        <van-field label="联系电话" label-width="100" readonly :value="form.bussinessPhone | DataIsNull" :border="false" colon />
        <van-field label="配送经验" label-width="100" readonly :value="form.isDelivery ===1 ? '有需求':'无需求' " :border="false" colon />
        <van-field label="收货点类型" label-width="100" readonly :value="form.receivingPointName | DataIsNull" :border="false" colon />
        <van-field label="总线路数" label-width="100" readonly :value="form.lineNum | DataIsNull" :border="false" colon />
        <van-field label="在跑线路数" label-width="100" readonly :value="form.runLineNum | DataIsNull" :border="false" colon />
        <van-field label="有效线路数" label-width="100" readonly :value="form.effectiveLineNum | DataIsNull" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="仓信息" name="2">
        <van-field label="仓名称" label-width="100" readonly :value="form.warehouseName | DataIsNull" :border="false" colon />
        <van-field label="仓联系人" label-width="100" readonly :value="form.warehouseContactName | DataIsNull" :border="false" colon />
        <van-field label="仓联系电话" label-width="100" readonly :value="form.warehouseContactPhone | DataIsNull" :border="false" colon />
        <van-field label="开放时间" label-width="100" readonly :value="`${form.warehouseOpen}-${form.warehouseClose}`" :border="false" colon />
        <van-field label="所在区域" label-width="100" autosize type="textarea" readonly :value="region | DataIsNull" :border="false" colon />
        <van-field label="详细地址" label-width="100" autosize type="textarea" readonly :value="form.warehouseDistrict | DataIsNull" :border="false" colon />
        <van-field label="备注" label-width="100" readonly autosize type="textarea" :value="form.warehouseRemark | DataIsNull" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="配送信息" name="3">
        <van-field label="是否走高速" label-width="100" readonly :value="form.runSpeed ===1 ? '是':'否'" :border="false" colon />
        <van-field label="是否需要回单" label-width="100" readonly :value="form.returnBill ===1 ? '是':'否'" :border="false" colon />
        <van-field label="配送车型" label-width="100" readonly :value="form.carTypeName | DataIsNull" :border="false" colon />
        <van-field label="配送点数量" label-width="100" readonly :value="form.deliveryNum | DataIsNull" :border="false" colon />
        <van-field label="配送总里程" label-width="100" readonly :value="form.distance | DataIsNull" :border="false" colon />
        <van-field label="预计工作时间" label-width="100" readonly :value="form.timeDiff | DataIsNull" :border="false" colon />
        <van-field label="限行区域说明" label-width="100" readonly autosize type="textarea" :value="form.limitRemark | DataIsNull" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="货物信息" name="4">
        <van-field label="货物类型" label-width="100" readonly :value="form.cargoTypeName | DataIsNull" :border="false" colon />
        <van-field label="货物件数" label-width="100" readonly :value="form.cargoNum | DataIsNull" :border="false" colon />
        <van-field label="是否需要搬运" label-width="100" readonly :value="form.carry === 1 ? '是':'否'" :border="false" colon />
        <van-field label="其他上岗要求" label-width="100" readonly autosize type="textarea" :value="form.dutyRemark | DataIsNull" :border="false" colon />
      </van-collapse-item>
    </van-collapse>
    <div v-if="form.projectState ===2 && form.auditState ===2" class="btn">
      <van-button v-permission="['/v2/line/lineInfo/createStableLine']" type="plain" hairline block class="distance" @click="handleLinkClick(0)">
        发布临时线路
      </van-button>

      <van-button v-permission="['/v2/line/lineInfo/createTemporaryLine']" type="primary" hairline block @click="handleLinkClick(1)">
        发布稳定线路
      </van-button>
    </div>
  </div>
</template>

<script>
import { getProjectDetail } from '@/api/project'
export default {

  data() {
    return {
      activeNames: ['1'],
      form: {},
      projectId: ''
    }
  },
  computed: {
    auditStateName() {
      if (this.form.auditState === 1) {
        return '待审核'
      } else if (this.form.auditState === 2) {
        return '审核通过'
      } else if (this.form.auditState === 3) {
        return '审核不通过'
      }
      return '暂无数据'
    },
    region() {
      let str = ''
      if (this.form.warehouseProvinceName) {
        str = this.form.warehouseProvinceName
      }
      if (this.form.warehouseCityName) {
        str += `/${this.form.warehouseCityName}`
      }
      if (this.form.warehouseCountyName) {
        str += `/${this.form.warehouseCountyName}`
      }
      return str
    }
  },
  mounted() {
    this.projectId = this.$route.query.projectId
    if (this.projectId) {
      this.getProjectDetail()
    }
  },
  methods: {
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.replace({
        path: '/project'
      })
    },

    /**
     * 发布线路
     */
    handleLinkClick(text) {
      this.$router.push({
        path: '/createLine',
        query: {
          isStable: text,
          projectId: this.projectId,
          isProject: 1
        }
      })
    },
    // 获取项目详情
    async getProjectDetail() {
      try {
        this.$loading(true)
        let params = {
          projectId: this.projectId
        }
        let { data: res } = await getProjectDetail(params)
        if (res.success) {
          this.form = res.data || {}
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

<style lang='scss' scoped>
.projectDetailContainer {
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
