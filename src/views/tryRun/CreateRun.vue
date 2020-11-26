<template>
  <div class="CreateRun">
    <div class="top">
      <van-nav-bar
        :title="step === '0' ? '创建试跑意向':'确认试跑状态'"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="bottom">
      <div class="step-container flex align-center justify-between">
        <div class="step-item flex align-center flex-direction active">
          <div class="top">
            1
          </div>
          <div class="tit">
            创建试跑意向
          </div>
        </div>
        <div
          :class="[{activeLine: step === '1'}, 'line van-hairline--top']"
        ></div>
        <div
          :class="[
            {
              active: step === '1',
            },
            'step-item flex align-center flex-direction',
          ]"
        >
          <div class="top">
            2
          </div>
          <div class="tit">
            确认试跑状态
          </div>
        </div>
      </div>
      <div class="hr-5"></div>
      <StepOne v-if="step === '0'" />
      <StepTwo v-if="step === '1'" />
    </div>
  </div>
</template>

<script>
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import { addCach } from '@/utils/mixins.js'
export default {
  name: 'CreateRun',
  components: {
    StepOne,
    StepTwo
  },
  mixins: [addCach],
  computed: {
    title() {
      return this.$route.meta.title;
    },
    step() {
      return this.$route.query.step || '0';
    }
  },
  methods: {
    /**
     * 返回按钮
     */
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.CreateRun {
  display: flex;
  flex-direction: column;
  .bottom{
    flex: 1;
    overflow: auto;
  }
  .step-container {
    position: relative;
    margin: 0 77px;
    height: 86px;
    .line {
      position: absolute;
      left: 58px;
      right: 45px;
      top: 30px;
    }
    .step-item {
      background-color: @white;
      .top {
        margin-bottom: 8px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        font-size: 15px;
        color: @white;
        background: #dde2ee;
        border-radius: 50%;
        text-align: center;
      }
      .tit {
        font-size: 12px;
        color: #dde2ee;
      }
      &.active {
        .top {
          background-color: #3acb8d;
        }
        .tit {
          color: @gray-9;
        }
      }
    }
    .activeLine::after {
      border-color: #3acb8d;
    }
  }
  .hr-5 {
    height: 5px;
    background-color: @body-bg;
  }
}
</style>
