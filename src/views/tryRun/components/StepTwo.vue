<template>
  <div class="StepTwo">
    <van-form ref="submitForm" @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="form.receptionist"
          required
          clearable
          name="receptionist"
          label="到仓接待人："
          placeholder="请选择到仓接待人"
          :rules="[
            {required: true, message: '请选择到仓接待人'}
          ]"
        >
          <template #button>
            <van-button
              size="mini"
              type="primary"
              native-type="button"
              plain
              @click="showModal = true"
            >
              选择到仓接待人
            </van-button>
          </template>
        </van-field>
        <van-field
          v-model="form.receptionistPhone"
          required
          label="手机号："
          name="receptionistPhone"
          placeholder="请输入手机号"
          :rules="[
            {required: true, message: '请输入手机号'},
            {pattern: phonePattern, message: '请输入正确的手机号'}
          ]"
        />
        <van-field
          v-model="formStr.arrivalTime"
          readonly
          required
          clickable
          is-link
          name="arrivalTime"
          label="到仓时间："
          placeholder="请选择时间"
          :rules="[{required: true, message: '请选择时间'}]"
          @click="showPicker = true"
        />
        <van-field
          v-model="form.preJobAdvice"
          rows="2"
          autosize
          name="preJobAdvice"
          label="岗前叮嘱："
          type="textarea"
          maxlength="150"
          placeholder="司机可见/请输入不超过150字"
        />
      </van-cell-group>
      <div class="btn-container">
        <van-button
          block
          type="primary"
          native-type="button"
          class="sub-btn"
          @click="showActionSheet = true"
        >
          更多操作
        </van-button>
      </div>
    </van-form>
    <van-action-sheet
      v-model="showActionSheet"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    />
    <!-- picker -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-datetime-picker
        v-model="formStr.date"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-popup v-model="showModal" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showModal = false"
        @confirm="onConfirmPicker"
      />
    </van-popup>
  </div>
</template>

<script>
import { parseTime, phoneRegExp, delay } from '@/utils'
import { GetPersonInfo, TryRun, FollowCar, GetLineDetail } from '@/api/tryrun';
export default {
  name: 'StepTwo',
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showModal: false,
      showPicker: false,
      showActionSheet: false,
      minDate: new Date(+new Date() - 86400000 * 365 * 10),
      maxDate: new Date(+new Date() + 86400000 * 365 * 10),
      options: [],
      form: {
        receptionist: '', // 到仓接待人
        receptionistPhone: '', // 到仓接待人手机号
        arrivalTime: '', // 到仓时间
        preJobAdvice: ''// 岗前叮嘱
      },
      operateFlag: '', // 操作标识  跟车 followCar   试跑tryRun   转试跑switchTryRun   转掉线switchDropped
      formStr: {
        arrivalTime: '',
        date: new Date()
      },
      columns: [],
      actions: [
        { name: '确认跟车', value: 'followCar' },
        { name: '确认试跑', value: 'tryRun' }
      ],
      actionVal: ''
    }
  },
  created() {
    this.phonePattern = phoneRegExp;
  },
  mounted() {
    this.lineId = this.$route.query.lineId;
    this.driverId = this.$route.query.driverId;
    if (this.to) {
      this.actions = [
        { name: '确认跟车', value: 'followCar' },
        { name: '确认试跑', value: 'switchTryRun' }
      ]
    }
    this.getPersonInfo();
  },
  methods: {
    // 选项格式化函数
    formatter(type, val) {
      // year、month、day、hour、minute
      const format = {
        year: '年',
        month: '月',
        day: '日',
        hour: '时',
        minute: '分'
      }
      return val + format[type]
    },
    // 获取到仓联系人
    async getPersonInfo() {
      try {
        this.$loading(true);
        let { data: res } = await GetPersonInfo({
          lineId: this.lineId
        })
        if (res.success) {
          const arr = ['上岗经理', '外线销售']
          this.columns = res.data.map((item, index) => {
            item.text = `${arr[index]}/${item.name}`
            return item;
          })
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`${err}`)
      } finally {
        this.getLineDetail();
      }
    },
    // 确认到仓联系人
    onConfirmPicker(item) {
      this.form.receptionist = item.name;
      this.form.receptionistPhone = item.phone;
      this.showModal = false;
    },
    async getLineDetail() {
      try {
        let { data: res } = await GetLineDetail({
          lineId: this.lineId
        })
        if (res.success) {
          console.log(res.data)
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`${err}`)
      } finally {
        this.$loading(false)
      }
    },
    /**
     * 点击选则提交类型
     */
    onSelect(item) {
      this.operateFlag = item.value;
      this.$refs.submitForm.submit();
    },
    /**
     * 点击提交
     */
    async onSubmit() {
      const SubmintForm = this.form.operateFlag === 'followCar' ? FollowCar : TryRun;
      try {
        this.$loading(true);
        let { data: res } = await SubmintForm({
          lineId: this.lineId,
          driverId: this.driverId,
          operateFlag: this.operateFlag,
          runTestStatusRecordFORM: {
            ...this.form
          }
        })
        if (res.success) {
          if (this.form.operateFlag === 'followCar') {
            this.$toast.success('确认跟车成功！');
          } else {
            this.$toast.success('确认试跑成功！');
          }
          setTimeout(() => {
            this.$router.push('/try-run')
          }, delay);
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`${err}`)
      } finally {
        this.$loading(false)
      }
    },
    onConfirm(value) {
      this.formStr.arrivalTime = parseTime(value, '{y}-{m}-{d} {h}:{m}');
      this.form.arrivalTime = +new Date(value)
      this.showPicker = false;
    }
  }
}
</script>

<style lang="less" scoped>
.StepTwo{
  height: 100%;
  .btn-container{
    position: absolute;
    bottom: 15px;
    left: 15px;
    right: 15px;
  }
  .van-cell-group{
    &::after{
      border-top: none;
    }
  }
}
</style>
