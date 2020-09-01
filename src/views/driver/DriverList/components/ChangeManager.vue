<template>
  <div class="changemanager">
    <van-popup
      v-model="managerStatus"
      closeable
      round
      @click-overlay="colsedPop"
    >
      <div class="managerBox">
        <div class="tabType">
          <van-tabs
            v-model="active"
            color="#2F448A"
            line-width="60"
            line-height="2"
            title-inactive-color="#A6AAB8"
            title-active-color="#2F448A"
          >
            <van-tab title="专车">
            </van-tab>
            <van-tab title="共享">
            </van-tab>
          </van-tabs>
        </div>
        <van-form
          ref="formMar"
          :show-error="false"
          label-width="60px"
          @submit="onSubmit"
        >
          <div class="managerForm">
            <van-field
              readonly
              clickable
              colon
              name="workCity"
              :value="pickerNames.workCity"
              label="工作城市"
              clearable
              :border="false"
              placeholder="请选择"
              :rules="[{ required: true, message: '请填写工作城市' }]"
              @click="showPickerFn('workCity')"
            />
            <van-field
              readonly
              clickable
              colon
              :border="false"
              name="joinManager"
              :value="pickerNames.joinManager"
              label="加盟经理"
              clearable
              placeholder="请选择"
              :rules="[{ required: true, message: '请填写加盟经理' }]"
              @click="showPickerFn('joinManager')"
            />
          </div>
          <div class="btnGroup">
            <van-button
              color="#2F448A"
              size="small"
              plain
              native-type="button"
              @click="resetform"
            >
              重置
            </van-button>
            <van-button
              type="primary"
              size="small"
              native-type="submit"
            >
              确定
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <!-- picker -->
    <van-popup
      v-model="showPicker"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        value-key="name"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirmPicker"
      />
    </van-popup>
  </div>
</template>
<script>
import { Popup } from 'vant';
export default {
  components: {
    [Popup.name]: Popup
  },
  props: {
    status: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      pickerNames: {
        joinManager: '',
        workCity: ''
      },
      formData: {
        joinManager: '',
        workCity: ''
      },
      columns: [],
      pickerKey: '',
      showPicker: false,
      columns_workCity: [
        {
          name: '北京',
          code: '123'
        },
        {
          name: '天津',
          code: '1223'
        }
      ],
      columns_joinManager: [
        {
          name: '泽拉斯',
          code: '123'
        },
        {
          name: '阿兹尔',
          code: '1223'
        }
      ],
      managerStatus: false
    };
  },
  watch: {
    status(val) {
      this.managerStatus = val
    },
    active(val) {
      this.resetform();
    }
  },
  mounted() {
    this.managerStatus = this.status
  },
  methods: {
    onSubmit(values) {
      let params = { ...this.formData };
      console.log(params, this.$parent.checkedList);
      this.managerStatus = false;
    },
    resetform() {
      this.formData = this.$options.data().formData;
      this.pickerNames = this.$options.data().pickerNames;
      this.$refs.formMar.resetValidation();
    },
    colsedPop() {
      this.$emit('closePop', { status: false });
    },
    showPickerFn(key) {
      this.pickerKey = key;
      switch (key) {
        case 'joinManager':
          this.columns = this.columns_workCity;
          break;
        case 'workCity':
          this.columns = this.columns_joinManager;
          break;
      }
      this.showPicker = true;
    },
    /**
     * picker 选择
     */
    onConfirmPicker(value) {
      this.pickerNames[this.pickerKey] = value.name;
      this.formData[this.pickerKey] = value.code;
      this.showPicker = false;
    }
  }
};
</script>
<style lang="less" scoped>
.managerBox {
  width: 300px;
  padding: 30px 0;
  .tabType {
    margin: 0 48px;
  }
}
.managerForm {
  margin: 16px 48px;
}
.btnGroup {
  width: 100%;
  padding: 16px 48px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .van-button {
    width: 48%;
    border-radius: 5px;
  }
  .van-button::before {
    border-radius: 5px;
  }
}
</style>
<style scoped>
.tabType >>> .van-tab {
  font-size: 16px;
}
</style>
