<template>
  <div class="SelfPopup">
    <van-popup
      v-model="showPopup"
      :position="position"
      :style="{
        width: '80%',
        height: '100vh'
      }"
    >
      <van-form
        style="position: relative;"
        @submit="onSubmit"
      >
        <slot />
      </van-form>

      <div class="bottom">
        <van-button block type="primary" size="normal">
          小型按钮
        </van-button>
        <van-button block type="primary" size="normal">
          小型按钮
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'SelfPopup',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'right'
    }
  },
  computed: {
    showPopup: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
    onReset(values) {
      console.log(values);
    }
  }
}
</script>
<style lang="scss" scoped>
.SelfPopup .bottom{
  position: sticky;
  bottom: 0;
  padding: 10px 18px;
  display: flex;
  background-color: #fff;
}
.SelfPopup .van-button + .van-button{
  margin-left: 20px;
}
</style>
<style scoped>
.SelfPopup >>> .van-popup{
  box-sizing: border-box;
}
</style>
