<template>
  <div class="TagView">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </van-sticky>
    <van-cell class="tagText" value="标签信息" size="large" />
    <van-form :show-error="false" class="formText" @submit="onSubmit">
      <van-field
        v-model="isUrgent"
        readonly
        name="isUrgent"
        label-width="100px"
        label="是否为紧急司机"
        placeholder="是否为紧急司机"
        @click="suggestShow = true"
      />
      <van-field
        v-model="formData.remark"
        rows="2"
        name="remark"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="最多可填50字"
        show-word-limit
      />
      <div style="margin:100px 15px 0 15px;">
        <van-button color="#2F448A" block type="info" native-type="submit">
          提交
        </van-button>
      </div>
      <van-action-sheet v-model="suggestShow" :actions="actions" @select="onSelect" />
    </van-form>
  </div>
</template>
<script>
import { insertLabel } from '@/api/driver.js'
import { Toast, Cell, Form, Notify } from 'vant';
export default {
  name: 'TagView',
  components: {
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Form.name]: Form
  },
  data() {
    return {
      suggestShow: false,
      isUrgent: '',
      formData: {
        isUrgent: '',
        remark: '',
        driverId: ''
      },
      actions: [{ name: '是', value: 1 }, { name: '否', value: 2 }]
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    this.formData.driverId = this.$route.query.id
  },
  methods: {
    async onSubmit(values) {
      let parmas = {}
      parmas.driverId = this.formData.driverId
      this.formData.isUrgent !== '' && (parmas.isUrgent = this.formData.isUrgent)
      this.formData.remark !== '' && (parmas.remark = this.formData.remark)
      try {
        this.$loading(true)
        let { data: res } = await insertLabel(parmas);
        if (res.success) {
          this.$router.go(-1)
          Notify({ type: 'success', message: '打标签成功' });
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`fail:${err}`)
      } finally {
        this.$loading(false)
      }
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.suggestShow = false;
      this.isUrgent = item.name
      this.formData.isUrgent = item.value
    }
  }
};
</script>
<style scoped>
.tagText >>> .van-cell__value--alone{
  font-size: 15px;
  color: #3C4353;
}
.tagText >>> .van-cell--large {
    padding-top: 10px;
    padding-bottom: 12.5px;
}
.tagText >>> .van-cell::after{
  border-bottom: 2px solid #E5E9EF;
}
.formText >>> .van-field__label{
  color: #3C4353;
}
.formText >>> .van-cell{
  font-size: 13px;
}
.formText >>> .van-cell::after{
  border-bottom: 1px solid #E5E9EF;
}
</style>
