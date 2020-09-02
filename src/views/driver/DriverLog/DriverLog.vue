<template>
  <div class="DriverLog">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </van-sticky>
    <div class="logBox">
      <div class="datePicker">
        <span>2020/08/24 10:03:25</span>
        <van-icon name="arrow-down" />
      </div>
      <p class="tableName">
        操作人：李相赫（18848885135）
      </p>
      <div class="tableBox">
        <van-grid :column-num="3">
          <van-grid-item>
            <span>字段名称</span>
          </van-grid-item>
          <van-grid-item>
            <span>现信息</span>
          </van-grid-item>
          <van-grid-item>
            <span>2020/08/24 10:03:25</span>
          </van-grid-item>
          <template v-for="(item,index) in tableList">
            <van-grid-item :key="item.name + index">
              <span>字段名称</span>
            </van-grid-item>
            <van-grid-item :key="item.info + index">
              <span>现信息</span>
            </van-grid-item>
            <van-grid-item :key="item.time + index">
              <span>2020/08/24 10:03:25</span>
            </van-grid-item>
          </template>
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableList: [
        {
          name: 'lll',
          info: 'sss',
          time: 123
        },
        {
          name: 'lll',
          info: 'sss',
          time: 123
        },
        {
          name: 'lll',
          info: 'sss',
          time: 123
        }
      ]
    }
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  }
}
</script>
<style lang="less" scoped>
.DriverLog{
  .logBox{
    padding: 10px 15px;
    box-sizing: border-box;
    .tableName{
      font-size: 14px;
      color: #3C4353;
      letter-spacing: 0;
      margin-bottom: 10px;
    }
    .tableBox{
      text-align: center;
    }
  }
  .datePicker{
    width: 150px;
    text-align: center;
    margin: 0 auto;
    background: #EAEFF9;
    border-radius: 12.5px;
    font-size: 12px;
    color: #7F8FBD;
    letter-spacing: 0;
    text-align: center;
    padding: 4px 13px 4px 27px;
    display: flex;
    align-items: center;
    span{
      margin-right: 10px;
    }
  }
}
</style>
