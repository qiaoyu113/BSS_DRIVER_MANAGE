<template>
  <div class="OffTry">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="bottom">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="form.date"
            readonly
            required
            clickable
            is-link
            name="lineId"
            label="掉线时间："
            placeholder="请选择掉线时间"
            :rules="[{required: true, message: '请选择掉线时间'}]"
            @click="showModal = true"
          />
        </van-cell-group>
        <div class="tit">
          提示：掉线时间当天，不再生成出车单
        </div>
        <van-cell-group>
          <van-field required name="radio" label="掉线原因：">
            <template #input>
              <van-radio-group v-model="form.radio">
                <van-radio name="1" class="margin-bottom-xs">
                  客户不合作/撤线
                </van-radio>
                <van-radio name="2" class="margin-bottom-xs">
                  配送要求变更
                </van-radio>
                <van-radio name="3" class="margin-bottom-xs">
                  司机跳单
                </van-radio>
                <van-radio name="4" class="margin-bottom-xs">
                  司机换线
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="form.message"
            rows="2"
            autosize
            label="其他原因："
            type="textarea"
            maxlength="150"
            placeholder="请输入掉线原因，不超过150字"
          />
        </van-cell-group>
        <div class="btn-container">
          <van-button
            block
            plain
            type="primary"
            size="normal"
            native-type="button"
            class="cancel-btn"
          >
            取消
          </van-button>
          <van-button block type="primary" native-type="submit" class="sub-btn">
            确定
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OffTry',
  data() {
    return {
      form: {
        date: '',
        radio: ''
      },
      showModal: false
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  methods: {
    /**
     * 返回按钮
     */
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit() {}
  }
};
</script>

<style lang="less" scoped>
.OffTry {
  display: flex;
  flex-direction: column;
  .top {
    background-color: @body-bg;
  }
  .bottom {
    flex: 1;
    overflow: auto;
    .btn-container {
      position: absolute;
      bottom: 15px;
      left: 15px;
      right: 15px;
      display: flex;
      .cancel-btn {
        margin-right: 5px;
      }
    }
  }
  .tit {
    margin-top: 4px;
    margin-bottom: 20px;
    padding-left: 15px;
    font-size: @font-size-sm;
    color: #ff5d5d;
  }
}
</style>
