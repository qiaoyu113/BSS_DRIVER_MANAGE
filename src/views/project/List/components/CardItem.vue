<template>
  <div class="CardItemcontainer" @click="handleDetailClick">
    <h4 class="title van-ellipsis">
      {{ obj.projectName }}({{ obj.projectId }})
    </h4>
    <p class="text van-ellipsis">
      联系人:{{ obj.bussinessName | DataIsNull }}
    </p>
    <p class="text van-ellipsis">
      手机:{{ obj.bussinessPhone | DataIsNull }}
    </p>
    <p class="text van-ellipsis">
      配送车型:{{ obj.carTypeName | DataIsNull }}
    </p>
    <p class="text van-ellipsis">
      仓名称:{{ obj.warehouseName | DataIsNull }}
    </p>
    <p class="text van-ellipsis">
      线路数:{{ obj.lineNum | DataIsNull }}条线
    </p>
    <div class="footer">
      <div class="right">
        <p class="time">
          创建时间:{{ obj.createDate | parseTime('{y}-{m}-{d}') }}
        </p>
        <div>
          <van-tag
            v-if="obj.projectState ===2"
            class="tag"
            color="rgba(58, 203, 141, 0.1)"
            text-color="#3ACB8D"
          >
            已启用
          </van-tag>
          <van-tag
            v-else-if="obj.projectState ===1"
            class="tag"
            color="rgba(255, 160, 0, 0.1)"
            text-color="#FFA000"
          >
            已禁用
          </van-tag>
        </div>
      </div>
    </div>
    <div class="detail van-hairline--top">
      <van-button type="default" round hairline>
        详情
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    /**
     * 项目详情
     */
    handleDetailClick() {
      this.$router.push({
        path: '/projectDetail',
        query: {
          projectId: this.obj.projectId
        }
      })
    }
  }
}

</script>

<style lang='scss' scoped>
.CardItemcontainer {
  padding: 0px 15px;
  font-family: PingFangSC-Semibold;
  .title {
    margin: 10px 0px;
    font-size: 14px;
    color: #3C4353;
  }
  .text {
    margin-top:0px;
    margin-bottom:8px;
    font-size: 13px;
    color: #3C4353;
  }
  .footer {
    margin-bottom:12.5px;
    display: flex;
    flex-direction: column;
    .time {
      margin: 0px;
      font-size: 11px;
      color: #838A9D;
      line-height: 20px;
    }
    .right {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .tag {
        margin-right:5px;
        padding: 3px 10px;
      }
    }
  }
  .detail {
    padding: 7px 0px;
    text-align: center;
    border-top-color:#D8D8D8;
  }
}

</style>

<style scoped>
  .CardItemcontainer >>> .van-button--default  {
    color:#838A9D;
    background: #fff;
    height:70px;
    height:20px;
  }
</style>
