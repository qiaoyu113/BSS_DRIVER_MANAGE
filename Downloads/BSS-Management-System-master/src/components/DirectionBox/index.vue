<template>
  <div class="DirectionBox">
    <p><i>1.新增司机运费模块</i></p>
  </div>
</template>

<script>
export default {
  name: 'DirectionBox',
  props: {
    tenderType: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  mounted() {},
  methods: {

  }
}
</script>

<style rel="stylesheet" lang="scss">
  .DirectionBox{
    padding:0 30px;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
    p{
      line-height: 30px;
    }
    i{
      font-weight: bold;
      font-size: 16px;
      margin-right:5px;
    }
  }
</style>
