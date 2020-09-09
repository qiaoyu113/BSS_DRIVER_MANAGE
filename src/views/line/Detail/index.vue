<template>
  <div class="lineDetailContainer">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="线路详情" left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </van-sticky>

    <van-collapse v-model="activeNames">
      <van-collapse-item title="基本信息" name="1">
        <van-field label="线路名称" label-width="110" readonly :value="form.lineName" :border="false" colon />
        <van-field label="线路编号" label-width="110" readonly :value="form.lineId" :border="false" colon />
        <van-field label="项目名称" label-width="110" readonly :value="form.projectName" :border="false" colon />
        <van-field label="项目编号" label-width="110" readonly :value="form.projectId" :border="false" colon />
        <van-field label="线路分类" label-width="110" readonly :value="form.lineCategory ===1 ? '稳定线路':'临时线路'" :border="false" colon />
        <van-field label="线路类型" label-width="110" readonly :value="form.busiTypeName" :border="false" colon />
        <van-field label="是否有线路余额" label-width="110" readonly :value="form.lineBalance ===1 ? '有线路余额': '无线路余额'" :border="false" colon />
        <van-field label="线路状态" label-width="110" readonly :value="form.lineStateName" :border="false" colon />
        <van-field label="试跑状态" label-width="110" readonly :value="form.runTestStateName" :border="false" colon />

        <van-field label="上架截止日期" label-width="110" readonly :value="upTime" :border="false" colon />
        <van-field label="线路稳定性" label-width="110" readonly :value="form.stabilityRateName" :border="false" colon />
        <van-field label="对外销售" label-width="110" readonly :value="form.lineSaleName" :border="false" colon />
        <van-field label="上岗经理" label-width="110" readonly :value="form.dutyManagerIdName" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="配送信息" name="2">
        <van-field label="是否走高速" label-width="110" readonly :value="form.runSpeed === 1 ? '是':'否'" :border="false" colon />
        <van-field label="是否需要回单" label-width="110" readonly :value="form.returnBill === 1 ? '是':'否'" :border="false" colon />
        <van-field label="配送车型" label-width="110" readonly :value="form.carTypeName" :border="false" colon />
        <van-field label="主要配送区域" label-width="110" readonly :value="region" :border="false" colon />
        <van-field label="详细地址" label-width="110" readonly :value="form.districtArea" :border="false" colon />
        <van-field label="配送点数量" label-width="110" readonly :value="form.deliveryNum" :border="false" colon />
        <van-field label="配送总里程数" label-width="110" readonly :value="form.distance" :border="false" colon />
        <van-field label="限行区域说明" label-width="110" readonly :value="form.limitRemark" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="配送时间信息" name="3">
        <van-field label="司机上岗时间" label-width="110" readonly :value="form.driverWorkTime | parseTime('{y}-{m}-{d}')" :border="false" colon />
        <van-field label="配送时间" label-width="110" readonly :value="deliveryWeekCycle" :border="false" colon />
        <van-field label="每日配送趟数" label-width="110" readonly :value="form.dayNum" :border="false" colon />
        <div v-for="(item,idx) in form.lineDeliveryInfoFORMS" :key="'time'+idx">
          <van-field label="预计工作时间" label-width="110" readonly :value="`${item.workingTimeStart}-${item.workingTimeEnd}`" :border="false" colon />
        </div>
      </van-collapse-item>
      <van-collapse-item title="结算信息" name="4">
        <van-field label="结算方式" label-width="110" readonly :value="form.incomeSettlementMethodName" :border="false" colon />
        <van-field label="结算周期" label-width="110" readonly :value="form.settlementCycleName" :border="false" colon />
        <van-field label="结算天数" label-width="110" readonly :value="form.settlementDaysName" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="货物信息" name="5">
        <van-field label="货物类型" label-width="110" readonly :value="form.cargoTypeName" :border="false" colon />
        <van-field label="货物件数" label-width="110" readonly :value="form.cargoNum" :border="false" colon />
        <van-field label="是否需要搬运" label-width="110" readonly :value="form.carry ===1 ? '是':'否'" :border="false" colon />
        <van-field label="货物体积" label-width="110" readonly :value="form.volume" :border="false" colon />
        <van-field label="货物重量" label-width="110" readonly :value="form.goodsWeight" :border="false" colon />
        <van-field label="其他上岗要求" label-width="110" readonly :value="form.dutyRemark" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="标签信息" name="6">
        <van-field label="线路紧急程度" label-width="110" readonly :value="form.lineUrgentName" :border="false" colon />
        <van-field label="适配性" label-width="110" readonly :value="form.lineAdapterName" :border="false" colon />
      </van-collapse-item>
      <van-collapse-item title="现场信息" name="7">
        <ImagePreview label="库房装货图片:" :image-arrs="fileForm.warehouseLoadingPicture" />
        <ImagePreview label="其他图片:" :image-arrs="fileForm.otherPicture" />
        <VideoPreview :video-url="fileForm.loadingVideo" label="装货视频:" />
      </van-collapse-item>
    </van-collapse>
    <div class="btn">
      <!-- 线路状态为已上架、已开跑状态时显示此按钮 -->
      <van-button type="plain" hairline block class="distance" @click="handleLinkClick('copy')">
        复制线路
      </van-button>
      <!-- 线路状态为已上架状态时显示此按钮 -->
      <van-button v-if="form.lineState ===1" type="primary" hairline block @click="handleLinkClick('edit')">
        编辑
      </van-button>
    </div>
    <div v-if="[1,2].includes(form.lineState)" class="btn">
      <!-- 线路状态为已上架、已开跑状态时显示此按钮 -->
      <van-button type="plain" hairline block class="distance" @click="handleLinkClick('record')">
        采线
      </van-button>

      <!-- 线路状态为已上架、已开跑状态时显示此按钮 -->
      <van-button type="primary" hairline block @click="handleLinkClick('tag')">
        打标签
      </van-button>
    </div>
    <div v-if="[1,3,4].includes(form.lineState)" class="btn">
      <!-- 当线路状态为已上架的时候存在此按钮 -->
      <van-button v-if="form.lineState ===1" type="plain" hairline block class="distance" @click="handleOffShelf">
        下架
      </van-button>
      <!-- 所有线路状态下显示此按钮 -->
      <van-button v-if="[3,4].includes(form.lineState)" type="primary" hairline block @click="handleLinkClick('active')">
        激活线路
      </van-button>
    </div>
  </div>
</template>

<script>
import ImagePreview from './components/ImagePreview'
import VideoPreview from './components/VideoPreview'
import { Dialog, Notify } from 'vant';
import dayjs from 'dayjs'
import { getLineDetail, undercarriage, judgeMeetConditions } from '@/api/line'
export default {
  components: {
    ImagePreview,
    VideoPreview,
    [Dialog.Component.name]: Dialog.Component,
    [Notify.Component.name]: Notify.Component
  },
  data() {
    return {
      activeNames: ['1'],
      form: {},
      fileForm: {},
      lineId: ''

    }
  },
  computed: {
    upTime() {
      if (this.form.waitDirveValidity) {
        return dayjs(this.form.waitDirveValidity).format('YYYY/MM/DD')
      }
      return ''
    },
    region() {
      return this.form.provinceAreaName + '/' + this.form.cityAreaName + '/' + this.form.countyAreaName
    },
    // 配送时间
    deliveryWeekCycle() {
      if (+this.form.lineCategory === 1) {
        let arrs = [
          {
            label: '一',
            value: 1
          },
          {
            label: '二',
            value: 2
          },
          {
            label: '三',
            value: 3
          },
          {
            label: '四',
            value: 4
          },
          {
            label: '五',
            value: 5
          },
          {
            label: '六',
            value: 6
          },
          {
            label: '日',
            value: 7
          }
        ]
        let name = ''
        arrs.forEach((item, idx) => {
          if (this.form.deliveryWeekCycle.indexOf(item.value) > -1) {
            if (idx !== 0) {
              name += '、'
            }
            name += `周${item.label}`
          }
        })
        return name
      }
      return this.form.lineCategory
    }
  },
  mounted() {
    this.lineId = this.$route.query.lineId
    if (this.lineId) {
      this.getLineDetail()
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
     * 下架
     */
    handleOffShelf() {
      Dialog.confirm({
        title: '提示',
        message: '确认要下架该线路吗?',
        confirmButtonText: '确定',
        cancelButtonColor: ''
      })
        .then(() => {
          this.undercarriage()
        })
        .catch(() => {
          // on cancel
        });
    },
    /**
     * 打标签
     */
    async handleLinkClick(text) {
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

      if (['copy', 'active'].includes(text)) {
        let result = await this.judgeMeetConditions(text)
        if (result) {
          this.$router.push({
            path: path,
            query: {
              lineId: this.lineId,
              isStable: this.form.lineCategory
            }
          })
        }
      } else {
        this.$router.push({
          path: path,
          query: {
            lineId: this.lineId,
            isStable: this.form.lineCategory
          }
        })
      }
    },
    // 判断激活和复制是否有权限
    async judgeMeetConditions(conditionType) {
      try {
        let params = {
          lineId: this.lineId,
          conditionType
        }
        let { data: res } = await judgeMeetConditions(params)
        if (res.success && res.data.success) {
          return true
        } else {
          Dialog.alert({
            title: '提示',
            message: res.data.msg
          }).then(() => {
            return false
          })
        }
      } catch (err) {
        console.log('judgeMeetConditions fail:', err)
      }
    },
    // 获取线路详情
    async getLineDetail() {
      try {
        this.$loading(true)
        let params = {
          lineId: this.lineId
        }
        let { data: res } = await getLineDetail(params)
        if (res.success) {
          this.form = res.data
          this.fileForm = res.data.linePictureRelatedVO
        } else {
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`get client detail fail:${err}`)
      } finally {
        this.$loading(false)
      }
    },
    // 下架
    async undercarriage() {
      try {
        let params = {
          lineId: this.lineId
        }
        let { data: res } = await undercarriage(params)
        if (res.success) {
          this.getLineDetail()
          this.$toast.success('操作成功');
        } else {
          this.$fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`undercarriage fail:${err}`)
      }
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
    button {
      width:170px;
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
