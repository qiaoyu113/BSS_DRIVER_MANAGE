<template>
  <div class="consignorDetail">
    <Content :obj="obj" />
  </div>
</template>

<script>
import Content from './components/content'
import { getClientDetail } from '@/api/consignor'
import { Toast } from 'vant'
export default {
  components: {
    Content
  },
  data() {
    return {
      obj: {},
      customerId: ''
    }
  },
  activated() {
    this.customerId = this.$route.query.id
    this.getDetail()
  },
  methods: {
    /**
     * 获取货主详情
     */
    async getDetail() {
      const toast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      try {
        let params = {
          customerId: this.customerId
        }
        let { data: res } = await getClientDetail(params)
        toast.clear()
        if (res.success) {
          this.obj = res.data
          this.obj.month = parseInt(this.obj.billingCycle / 30)
          this.obj.day = parseInt(this.obj.billingCycle - (this.obj.month * 30))
        } else {
          Toast.fail(res.errorMsg || res.msg)
        }
      } catch (err) {
        toast.clear()
        Toast.fail(err)
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.consignorDetail {

}

</style>
