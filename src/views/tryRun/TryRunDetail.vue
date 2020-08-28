<template>
  <div class="TryRunDetail flex">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #right>
          <div class="navBarTit">
            操作
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="container">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="标题1" name="1">
          内容
        </van-collapse-item>
        <van-collapse-item title="标题2" name="2">
          内容
        </van-collapse-item>
        <van-collapse-item title="标题3" name="3">
          内容
        </van-collapse-item>
      </van-collapse>

      <br>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="标题1" name="1">
          内容
        </van-collapse-item>
        <van-collapse-item title="标题2" name="2">
          内容
        </van-collapse-item>
        <van-collapse-item title="标题3" name="3">
          内容
        </van-collapse-item>
      </van-collapse>
      <br>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="标题1" name="1">
          内容
        </van-collapse-item>
        <van-collapse-item title="标题2" name="2">
          内容
        </van-collapse-item>
        <van-collapse-item title="标题3" name="3">
          内容
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TryRunDetail',
  data() {
    return {
      activeNames: []
    };
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.TryRunDetail {
  display: flex;
  flex-direction: column;
  background: @body-bg;
  .top{
    margin-bottom: 5px;
    background-color: @body-bg;
  }
  .list{
    flex: 1;
    overflow: auto;
  }
  .navBarTit{
    color: @white;
  }
}
</style>
