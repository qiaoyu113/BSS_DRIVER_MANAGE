<template>
  <div class="projectDetailContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="项目详情" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>

    <van-collapse v-model="activeNames">
      <van-collapse-item title="基本信息" name="1">
        <van-field label="项目名称" label-width="100" readonly :value="form.projectName" :border="false" colon />
        <van-field label="项目编号" label-width="100" readonly :value="form.projectId" :border="false" colon />
        <van-field label="客户名称" label-width="100" readonly :value="form.customerName" :border="false" colon />
        <van-field label="客户编号" label-width="100" readonly :value="form.customerId" :border="false" colon />
        <van-field label="线索名称" label-width="100" readonly :value="form.clueName" :border="false" colon />
        <van-field label="线索编号" label-width="100" readonly :value="form.clueId" :border="false" colon />
        <van-field label="审核状态" label-width="100" readonly :value="form.auditState === 1 ? '待审核' : '审核通过'" :border="false" colon />
        <van-field label="项目状态" label-width="100" readonly :value="form.projectState === 1 ? '禁用' :'启用'" :border="false" colon />
        <van-field label="上岗经理" label-width="100" readonly :value="form.dutyManagerName" :border="false" colon />
        <van-field label="外线销售" label-width="100" readonly :value="form.lineSaleName" :border="false" colon />
        <van-field label="所属城市" label-width="100" readonly :value="form.cityName" :border="false" colon />
        <van-field label="联系人" label-width="100" readonly :value="form.bussinessName" :border="false" colon />
        <van-field label="联系电话" label-width="100" readonly :value="form.bussinessPhone" :border="false" colon />
        <van-field label="配送经验" label-width="100" readonly :value="form.bussinessPhone" :border="false" colon />
        <van-field label="收货点类型" label-width="100" readonly :value="receivingPointName" :border="false" colon />
        <van-field label="总线路数" label-width="100" readonly :value="form.lineNum" :border="false" colon />
        <van-field label="在跑线路数" label-width="100" readonly :value="form.runLineNum" :border="false" colon />
        <van-field label="有效线路数" label-width="100" readonly :value="form.effectiveLineNum" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="仓信息" name="2">
        <van-field label="仓名称" label-width="100" readonly :value="form.warehouseName" :border="false" colon />
        <van-field label="仓联系人" label-width="100" readonly :value="form.warehouseContactName" :border="false" colon />
        <van-field label="仓联系电话" label-width="100" readonly :value="form.warehouseContactPhone" :border="false" colon />
        <van-field label="开放时间" label-width="100" readonly :value="form.warehouseOpen | parseTime('{y}-{m}-{d}')" :border="false" colon />
        <van-field label="所在区域" label-width="100" readonly :value="region" :border="false" colon />
        <van-field label="详细地址" label-width="100" readonly :value="form.warehouseDistrict" :border="false" colon />
        <van-field label="备注" label-width="100" readonly :value="form.warehouseRemark" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="配送信息" name="3">
        <van-field label="是否走高速" label-width="100" readonly :value="form.runSpeed ===1 ? '是':'否'" :border="false" colon />
        <van-field label="是否需要回单" label-width="100" readonly :value="form.returnBill ===1 ? '是':'否'" :border="false" colon />
        <van-field label="配送车型" label-width="100" readonly :value="form.carTypeName" :border="false" colon />
        <van-field label="配送点数量" label-width="100" readonly :value="form.deliveryNum" :border="false" colon />
        <van-field label="配送总里程" label-width="100" readonly :value="form.distance" :border="false" colon />
        <van-field label="预计工作时间" label-width="100" readonly :value="form.timeDiff" :border="false" colon />
        <van-field label="限行区域说明" label-width="100" readonly :value="form.limitRemark" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="货物信息" name="4">
        <van-field label="货物类型" label-width="100" readonly :value="form.cargoTypeName" :border="false" colon />
        <van-field label="货物件数" label-width="100" readonly :value="form.cargoNum" :border="false" colon />
        <van-field label="是否需要搬运" label-width="100" readonly :value="form.carry === 1 ? '是':'否'" :border="false" colon />
        <van-field label="其他上岗要求" label-width="100" readonly :value="form.dutyRemark" :border="false" colon />
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
    region() {
      return this.form.warehouseProvinceName + '/' + this.form.warehouseCityName + '/' + this.form.warehouseCountyName
    },
    receivingPointName() {
      if (this.form.receivingPoint === 1) {
        return '仓库'
      } else if (this.form.receivingPoint === 2) {
        return '门店'
      } else if (this.form.receivingPoint === 3) {
        return '宅配'
      } else if (this.form.receivingPoint === 4) {
        return '指定位置'
      } else if (this.form.receivingPoint === 5) {
        return '无人货架'
      }
      return ''
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
      this.$router.go(-1)
    },

    /**
     * 发布线路
     */
    handleLinkClick(text) {
      this.$router.push({
        path: '/createLine',
        query: {
          isStable: text,
          projectId: this.projectId
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
          this.form = res.data
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
