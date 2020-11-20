<template>
  <div class="StepTwo">
    <van-form ref="submitForm" :show-error="false" @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="form.receptionist"
          required
          clearable
          name="receptionist"
          label="到仓接待人："
          placeholder="请选择到仓接待人"
          maxlength="10"
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

        <van-field
          readonly
          required
          name="lineId"
          label="配送时间："
        >
          <template #label>
            配送时间：<van-icon
              name="question"
              @click="() => {
                showTip = true
              }"
            />
          </template>
          <template #input>
            <van-row>
              <van-col span="11">
                <self-calendar
                  placeholder="配送开始日期"
                  :max-date="startMaxDate"
                  :min-date="startMinDate"
                  :default="form['deliveryStartDate']"
                  clickable
                  picker-key="deliveryStartDate"
                  :form="form"
                  :rules="[{required: true, message: '请选择配送开始日期'}]"
                />
              </van-col>
              <van-col span="2">
                <div class="delimiter">
                  -
                </div>
              </van-col>
              <van-col span="11">
                <self-calendar
                  placeholder="配送结束日期"
                  :max-date="endMaxDate"
                  :min-date="endMinDate"
                  :default="form['deliveryEndDate']"
                  clickable
                  picker-key="deliveryEndDate"
                  :form="form"
                />
              </van-col>
            </van-row>
          </template>
        </van-field>
      </van-cell-group>
      <p class="dateTip">
        不选择结束时间，出车单根据线路配送规则生成
      </p>
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
        @cancel="showPicker = false"
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
    <van-dialog v-model="showTip" confirm-button-text="知道了">
      <div class="tipBox">
        <h4 class="tipTxt">
          说明:
        </h4>
        <p class="tipTxt">
          1、开始时间可以选择T-20
        </p>
        <p class="tipTxt">
          2、结束时间可以不选择,不选择根据线路周期生成出车单
        </p>
        <p class="tipTxt">
          3、结束时间必须是今天以及以前
        </p>
        <p class="tipTxt">
          4、开始时间小于等于结束时间
        </p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { parseTime, phoneRegExp, delay } from '@/utils'
import { GetPersonInfo, TryRun, FollowCar, GetLineDetail, ToTryRun, GetDetails } from '@/api/tryrun';
import { driverDetail } from '@/api/driver'
import dayjs from 'dayjs'
import SelfCalendar from './SelfCalendar'
import { Dialog } from 'vant'
export default {
  name: 'StepTwo',
  components: {
    SelfCalendar,
    [Dialog.Component.name]: Dialog.Component
  },
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showTip: false,
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
        preJobAdvice: '', // 岗前叮嘱
        deliveryStartDate: '', // 配送开始时间
        deliveryEndDate: ''// 配送结束时间
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
      actionVal: '',
      endMaxDate: new Date(),
      startMinDate: new Date(+new Date() - 86400000 * 19)
    }
  },
  computed: {
    startMaxDate() {
      if (this.form.deliveryEndDate) {
        return new Date(this.form.deliveryEndDate)
      }
      return this.endMaxDate
    },
    endMinDate() {
      if (this.form.deliveryStartDate) {
        return new Date(this.form.deliveryStartDate)
      }
      return this.startMinDate
    }
  },
  created() {
    this.phonePattern = phoneRegExp;
  },
  mounted() {
    this.lineId = this.$route.query.lineId;
    this.driverId = this.$route.query.driverId;
    this.runTestId = this.$route.query.runTestId;
    if (this.to) {
      this.actions = [
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
        if (this.to) {
          // 跟车转试跑
          this.getTryDetail();
        } else {
          this.getLineDetail();
          this.getDriverDetail();
        }
      }
    },
    async getDriverDetail() {
      try {
        let { data: res } = await driverDetail({
          driverId: this.driverId
        })
        if (res.success) {
          this.driverDetail = res.data
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`${err}`)
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
          this.lineDetail = res.data;
          // driverWorkTime
          // 判断配送时间大小
          const timeList = res.data.lineDeliveryInfoFORMS;
          if (timeList.length > 0) {
            timeList.sort((a, b) => {
              const aTime = +new Date(2020, 1, 1, a.workingTimeStart.split(':')[0], a.workingTimeStart.split(':')[1]);
              const bTime = +new Date(2020, 1, 1, b.workingTimeStart.split(':')[0], b.workingTimeStart.split(':')[1])
              return bTime - aTime;
            })
          }
          const date = res.data.driverWorkTime.split(' ')[0] + ' ' + timeList[0].workingTimeStart
          this.formStr.arrivalTime = date;
          this.formStr.date = new Date(date.replace(/\-/g, '/'));
          this.form.arrivalTime = +new Date(date.replace(/\-/g, '/'));
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`${err}`)
      }
    },
    // 获取试跑详情
    async getTryDetail() {
      try {
        this.$loading(true);
        const runTestId = this.runTestId;
        let { data: res } = await GetDetails({ runTestId })
        if (res.success) {
          this.lineDetail = res.data.lineInfoVO;
          this.driverDetail = res.data.driverBusiInfoVO;

          const item = res.data.runTestStatusRecordVOList.find(item => item.recordFlag === '跟车记录');
          this.form.receptionist = item.receptionist;
          this.form.receptionistPhone = item.receptionistPhone;

          this.formStr.date = dayjs(item.arrivalTime).$d;
          this.formStr.arrivalTime = parseTime(dayjs(item.arrivalTime).$d, '{y}-{m}-{d} {h}:{i}');
          this.form.arrivalTime = +dayjs(item.arrivalTime).$d;
          this.form.preJobAdvice = item.preJobAdvice;
          this.form.deliveryStartDate = parseTime(res.data.deliveryStartDate, '{y}-{m}-{d}')
          this.form.deliveryEndDate = parseTime(res.data.deliveryEndDate, '{y}-{m}-{d}')
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.$loading(false)
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
      let deliveryStartDate = new Date(this.form.deliveryStartDate).setHours(0, 0, 0)
      let deliveryEndDate = null
      if (this.form.deliveryEndDate) {
        deliveryEndDate = new Date(this.form.deliveryEndDate).setHours(23, 59, 59)
      }

      let sub = {
        followCar: FollowCar,
        tryRun: TryRun,
        switchTryRun: ToTryRun
      }
      const SubmintForm = sub[this.operateFlag];
      try {
        this.$loading(true);
        let params = {
          lineId: this.lineId,
          driverId: this.driverId,
          runTestId: this.runTestId,
          operateFlag: this.operateFlag,
          driverMessage: `${this.driverDetail.name}/${this.driverDetail.phone}`,
          lineMessage: `${this.lineDetail.lineName}/${this.lineDetail.lineId}`,
          runTestStatusRecordFORM: {
            ...this.form,
            ...{
              deliveryStartDate,
              deliveryEndDate
            }
          },
          deliveryStartDate,
          deliveryEndDate: deliveryEndDate
        }

        let { data: res } = await SubmintForm(params)
        if (res.success) {
          let message = ''
          if (this.operateFlag === 'tryRun') {
            message = '确认试跑状态成功'
          } else if (this.operateFlag === 'followCar') {
            message = '确认跟车状态成功'
          }
          this.$toast.success(message);
          setTimeout(() => {
            this.$bus.$emit('update', '1')
            this.$router.go(-1);
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
      this.formStr.arrivalTime = parseTime(value, '{y}-{m}-{d} {h}:{i}');
      this.form.arrivalTime = +new Date(value)
      this.showPicker = false;
    }
  }
}
</script>

<style lang="less" scoped>
.StepTwo{
  // height: 100%;
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
  .tipBox {
    padding: 10px;
    .tipTxt {
      margin: 0px;
      font-size:12px;
      color:#333;
    }
  }
  .dateTip {
    margin: 0px;
    color: #999;
    font-size: 12px;
    padding: 0px 16px;
  }
}
</style>
