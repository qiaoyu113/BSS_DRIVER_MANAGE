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
            v-model="formStr.droppedTime"
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
          <van-field required name="droppedReason" label="掉线原因：">
            <template #input>
              <van-radio-group v-model="form.droppedReason">
                <van-radio
                  v-for="(item, index) in whyList"
                  :key="index"
                  :name="item.dictValue"
                  class="margin-bottom-xs"
                  checked-color="#3ACB8D"
                >
                  {{ item.dictLabel }}
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="form.otherReason"
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
            @click="onClickLeft"
          >
            取消
          </van-button>
          <van-button block type="primary" native-type="submit" class="sub-btn">
            确定
          </van-button>
        </div>
      </van-form>
    </div>
    <!-- picker -->
    <van-popup v-model="showModal" round position="bottom">
      <van-datetime-picker
        v-model="formStr.date"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { GetDictionaryList } from '@/api/common'
import { SwitchTryRun } from '@/api/tryrun'
export default {
  name: 'OffTry',
  data() {
    return {
      form: {
        droppedTime: '', // 掉线时间
        droppedReason: '', // 掉线原因
        otherReason: ''// 其他原因
      },
      formStr: {
        date: new Date(),
        droppedTime: ''
      },
      minDate: new Date(+new Date() - 86400000 * 365 * 10),
      maxDate: new Date(+new Date() + 86400000 * 365 * 10),
      showModal: false,
      whyList: []
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    this.lineId = this.$route.query.lineId;
    this.driverId = this.$route.query.driverId;
    this.fetchData();
  },
  methods: {
    /**
     * 请求字典接口
     */
    fetchData() {
      GetDictionaryList(['dropped_reason'])
        .then(({ data }) => {
          if (data.success) {
            this.whyList = data.data.dropped_reason
          }
        }).catch((err) => {
          console.log(err)
        });
    },
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
    /**
     * 返回按钮
     */
    onClickLeft() {
      this.$router.go(-1);
    },
    // 选择时间
    onConfirm(value) {
      this.formStr.droppedTime = parseTime(value, '{y}-{m}-{d} {h}:{m}');
      this.form.droppedTime = +new Date(value)
      this.showModal = false;
    },
    /**
     * 点击提交
     */
    async onSubmit() {
      try {
        this.$loading(true);
        let { data: res } = await SwitchTryRun({
          lineId: this.lineId, // 线路Id
          driverId: this.driverId, // 司机Id
          operateFlag: 'switchDropped',
          runTestStatusRecordFORM: {
            ...this.form
          }
        })
        if (res.success) {
          this.$dialog.confirm({
            title: '提示',
            message: '已成功操作试跑掉线，该线路是否需要激活？',
            confirmButtonText: '去激活线路'
          })
            .then(() => {
              // 去激活线路页面
            })
            .catch(() => {
              // 关闭弹窗
            });
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.$loading(false)
        console.log(`${err}`)
      } finally {
        // this.$loading(false)
      }
    }
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
