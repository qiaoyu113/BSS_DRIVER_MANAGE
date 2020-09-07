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
    <van-form class="formText" @submit="onSubmit">
      <van-field
        v-model="username"
        readonly
        required
        name="username"
        label="是否为司急"
        placeholder="是否为司急"
        :rules="[{required: true, message: '请填写是否为司急'}]"
        @click="suggestShow = true"
      />
      <van-field
        v-model="formData.message"
        rows="2"
        name="message"
        autosize
        required
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="最多可填50字"
        show-word-limit
        :rules="[{ required: true, message: '备注不能为空'}]"
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
      username: '',
      formData: {
        username: '',
        message: ''
      },
      actions: [{ name: '是', value: 1 }, { name: '否', value: 0 }]
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {},
  methods: {
    async onSubmit(values) {
      let parmas = { ...this.formData }
      try {
        this.$loading(true)
        let { data: res } = await insertLabel(parmas);
        if (res.success) {
          Notify({ type: 'success', message: '打标签成功' });
          this.$router.go(-1)
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
      this.username = item.name
      this.formData.username = item.value
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
