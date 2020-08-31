<template>
  <div class="formInfo">
    <van-cell title="共享面试表">
      <template #right-icon>
        <span class="doBtn">操作记录</span>
      </template>
    </van-cell>
    <van-cell-group>
      <van-field
        label="司机姓名："
        value="输入框只读"
        readonly
      />
      <van-field
        label="司机电话："
        value="输入框只读"
        readonly
      />
    </van-cell-group>
    <br>
    <van-cell title="专车面试表">
      <template #right-icon>
        <span class="doBtn">操作记录</span>
      </template>
    </van-cell>
    <van-cell-group>
      <van-field
        label="司机姓名："
        value="输入框只读"
        readonly
      />
      <van-field
        label="司机电话："
        value="输入框只读"
        readonly
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.formInfo {
  .van-cell-group {
    padding: 15px 0;
    box-sizing: border-box;
  }
  .van-cell {
    padding: 3px 15px;
    box-sizing: border-box;
  }
  .van-cell__title {
    font-size: 15px;
    color: #3c4353;
  }
  .doBtn {
    font-size: 12px;
    color: #7f8fbd;
  }
}
</style>
