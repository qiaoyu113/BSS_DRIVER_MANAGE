<template>
  <div class="changemanager">
    <van-popup
      v-model="managerStatus"
      round
      closeable
      @close="colsedPop"
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
          label-width="80px"
          @submit="onSubmit"
        >
          <div class="managerForm">
            <van-field
              readonly
              clickable
              colon
              name="workCity"
              :value="pickerNames.workCity"
              label="所属城市"
              clearable
              :border="false"
              placeholder="请选择"
              @click="showPickerFn('workCity')"
            />
            <van-field
              readonly
              clickable
              colon
              :border="false"
              name="gmGroupId"
              :value="pickerNames.gmGroupId"
              label="加盟小组"
              clearable
              placeholder="请选择"
              @click="showPickerFn('gmGroupId')"
            />
            <van-field
              v-if="active === 0"
              readonly
              clickable
              colon
              :border="false"
              name="gmScIds"
              :value="pickerNames.gmScIds"
              label="归属人"
              clearable
              placeholder="请选择"
              :rules="[{ required: true, message: '请选择归属人' }]"
              @click="showPickerFn('gmScIds')"
            />
            <van-field
              v-else
              readonly
              clickable
              colon
              :border="false"
              name="gmId"
              :value="pickerNames.gmId"
              label="加盟经理"
              clearable
              placeholder="请选择"
              :rules="[{ required: true, message: '请填写加盟经理' }]"
              @click="showPickerFn('gmId')"
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
import { Popup, Notify } from 'vant';
import { delay } from '@/utils';
import { updateGmByClueId } from '@/api/clue.js'
import { getCurrentLowerOfficeCityData, GetUserList, GetGmGroup } from '@/api/common'
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
        gmId: '',
        gmScIds: '',
        gmGroupId: '',
        workCity: ''
      },
      formData: {
        gmId: '',
        gmScIds: '',
        gmGroupId: '',
        workCity: ''
      },
      columns: [],
      pickerKey: '',
      showPicker: false,
      columns_workCity: [],
      columns_gmId: [],
      columns_gmGroupId: [], // 加盟小组
      columns_scGmId: [], // 渠道经理
      managerStatus: false
    };
  },
  watch: {
    status(val) {
      this.managerStatus = val
    },
    active(val) {
      this.resetform();
      this.getGmId()
      this.getGmGroupId()
      this.getScGmId()
      this.formData.gmScIds = ''
      this.pickerNames.gmScIds = ''
      this.formData.gmId = ''
      this.pickerNames.gmId = ''
      this.formData.gmGroupId = ''
      this.pickerNames.gmGroupId = ''
    },
    'formData.workCity'(val) {
      if (val) {
        this.getGmGroupId()
        this.getGmId()
        this.getScGmId()
        this.formData.gmScIds = ''
        this.pickerNames.gmScIds = ''
        this.formData.gmId = ''
        this.pickerNames.gmId = ''
        this.formData.gmGroupId = ''
        this.pickerNames.gmGroupId = ''
      }
    },
    'formData.gmGroupId'() {
      this.getGmId()
      this.getScGmId()
      this.formData.gmId = ''
      this.pickerNames.gmId = ''
      this.formData.gmScIds = ''
      this.pickerNames.gmScIds = ''
    }
  },
  mounted() {
    this.managerStatus = this.status;
    this.fetchData();
  },
  methods: {
    // 获取渠道经理
    getScGmId(val) {
      let params = {
        'cityCode': this.formData.workCity, // 工作城市
        'productLine': this.active, // 业务线
        'gmGroup': this.formData.gmGroupId, // 加盟小组
        'roleType': 4
      }
      params = this.removeEmpty(params)
      GetUserList(params).then(({ data }) => {
        if (data.success) {
          this.columns_scGmId = data.data.map(ele => {
            return { name: ele.name + ' ' + ele.mobile + '（渠道经理）', code: ele.id, nameInput: ele.name }
          })
        } else {
          this.$toast(data.errorMsg)
        }
      })
        .catch((err) => {
          console.log(err)
        });
    },
    // 联动请求加盟小组
    getGmGroupId() {
      let params = {
        'cityCode': this.formData.workCity, // 工作城市
        'busiLine': this.active // 业务线
      }
      params = this.removeEmpty(params)
      GetGmGroup(params)
        .then(({ data }) => {
          if (data.success) {
            this.columns_gmGroupId = data.data.map(ele => {
              return { name: ele.name, code: ele.id, nameInput: ele.name }
            })
          } else {
            this.$toast(data.errorMsg)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    // 获取加盟经理
    getGmId() {
      let params = {
        'cityCode': this.formData.workCity, // 工作城市
        'productLine': this.active, // 业务线
        'gmGroup': this.formData.gmGroupId, // 加盟小组
        'roleType': 1
      }
      params = this.removeEmpty(params)
      GetUserList(params)
        .then(({ data }) => {
          if (data.success) {
            this.columns_gmId = data.data.map(ele => {
              return { name: ele.name + ' ' + ele.mobile + '（加盟经理）', code: ele.id, nameInput: ele.name }
            })
          } else {
            this.$toast(data.errorMsg)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    fetchData() {
      getCurrentLowerOfficeCityData({})
        .then(({ data }) => {
          if (data.success) {
            this.columns_workCity = data.data;
          }
        }).catch((err) => {
          console.log(err)
        });
      this.getGmId()
      this.getScGmId()
      this.getGmGroupId()
    },
    async onSubmit(values) {
      try {
        this.$loading(true)
        let params = {
          'gmId': this.formData.gmId,
          'clueIds': this.$parent.checkedList
        };
        if (!this.active) {
          params.gmId = this.formData.gmScIds
        }
        let { data: res } = await updateGmByClueId(params);
        if (res.success) {
          this.managerStatus = false;
          this.$loading(false)
          if (res.data.flag) {
            Notify({ type: 'success', message: '归属人更改成功' });
            this.$parent.checkedList = []
          } else {
            Notify({ type: 'warn', message: res.data.msg });
          }
          this.resetform();
          setTimeout(() => {
            this.$emit('changeOver')
          }, delay);
        } else {
          this.$loading(false)
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`fail:${err}`)
        this.$loading(false)
      }
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
        case 'gmId':
          this.columns = this.columns_gmId;
          break;
        case 'gmGroupId':
          this.columns = this.columns_gmGroupId;
          break;
        case 'gmScIds':
          this.columns = this.columns_gmId.concat(this.columns_scGmId);
          break;
        case 'workCity':
          this.columns = this.columns_workCity;
          break;
      }
      this.showPicker = true;
    },
    // 删除对象空属性
    removeEmpty(obj) {
      Object.keys(obj).forEach((key) => (obj[key] === '') && delete obj[key]);
      return obj
    },
    /**
     * picker 选择
     */
    onConfirmPicker(value) {
      if (!value) return;
      this.pickerNames[this.pickerKey] = value.nameInput ? value.nameInput : value.name;
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
