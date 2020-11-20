<template>
  <div class="CreateHistoryRun">
    <div class="top">
      <van-nav-bar
        title="新增历史试跑"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="StepOne">
      <van-form ref="submitForm" :show-error="false" @submit="onSubmit">
        <van-cell-group class="border-none">
          <van-field
            :value="formDetails.line"
            readonly
            required
            clickable
            is-link
            name="lineId"
            label="选择线路："
            placeholder="请选择线路"
            :rules="[{required: true, message: '请选择线路'}]"
            @click="showModal = true"
          />
        </van-cell-group>
        <van-cell-group v-show="lineDetail.lineId" :class="{'border-none': !lineDetail.lineId}">
          <van-field
            :value="formDetails.driver"
            readonly
            required
            clickable
            is-link
            name="lineId"
            label="选择司机"
            placeholder="请选择司机"
            :rules="[{required: true, message: '请选择司机'}]"
            @click="showModalDriver = true"
          />
        </van-cell-group>
        <van-cell-group class="border-none">
          <van-field
            readonly
            required
            name="lineId"
            label="配送时间"
          >
            <template #input>
              <van-row>
                <van-col span="11">
                  <self-calendar
                    placeholder="配送开始日期"
                    :max-date="startMaxDate"
                    :min-date="startMinDate"
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
                    clickable
                    picker-key="deliveryEndDate"
                    :form="form"
                    :rules="[{required: true, message: '请选择配送结束日期'}]"
                  />
                </van-col>
              </van-row>
            </template>
          </van-field>
        </van-cell-group>
        <div class="btn-container">
          <van-row>
            <van-col span="11">
              <van-button
                block
                native-type="button"
                @click="handleCancelClick"
              >
                取消
              </van-button>
            </van-col>
            <van-col span="11" offset="2">
              <van-button
                block
                type="primary"
                native-type="button"
                @click="handleSubmitClick"
              >
                确认试跑
              </van-button>
            </van-col>
          </van-row>
        </div>
      </van-form>
      <!-- Suggest -->
      <van-popup
        v-model="showModal"
        round
        position="bottom"
        :style="{height: '90%', width: '100%'}"
        class="popup-container"
      >
        <van-search
          v-model="lineValue"
          show-action
          placeholder="请输入线路名称/编号"
        >
          <template #action>
            <div
              @click="() => {
                linePage.page = 1
                onSearch()
              }"
            >
              搜索
            </div>
          </template>
        </van-search>
        <div class="list">
          <van-radio-group
            v-if="lineList.length > 0"
            v-model="form.lineId"
          >
            <van-list
              v-model="lineLoadingMore"
              :finished="lineFinished"
              :error.sync="lineError"
              :immediate-check="false"
              finished-text="没有更多了"
              error-text="请求失败，点击重新加载"
              @load="() => {
                linePage.page++
                getLineList()
              }"
            >
              <div
                v-for="(item, index) in lineList"
                :key="index"
                class="list-item"
                @click="onSelectLine(item)"
              >
                <div class="title flex align-center">
                  <div class="title-tag flex align-center justify-center">
                    {{ item.labelTypeName }}
                  </div>
                  <h3 class="van-ellipsis">
                    {{ item.lineName }}（{{ item.lineId }}）
                  </h3>
                  <van-icon name="arrow" class="margin-right-xs" />
                  <van-radio checked-color="#3ACB8D" :name="item.lineId" />
                </div>
                <div class="line-details">
                  <div class="flex flex-wrap">
                    <div>上岗时间：</div>
                    <div class="flex-sub">
                      {{ item.driverWorkTime |parseTime('{y}-{m}-{d}') }}
                    </div>
                  </div>
                  <div class="flex flex-wrap">
                    <div>配送区域：</div>
                    <div class="flex-sub">
                      {{ item.provinceAreaName + item.cityAreaName + item.countyAreaName + item.districtArea }}
                    </div>
                  </div>
                  <div class="flex flex-wrap">
                    <div>里程时间：</div>
                    <div class="flex-sub">
                      {{ item.distance + 'km/' +item.timeDiff }}
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
          </van-radio-group>
          <div v-else class="noData">
            <img src="@/assets/search.png">
            <div class="text">
              <h4 class="tip">
                提示:未找到相关数据
              </h4>
              <p class="tip">
                1、线路必须在线路列表存在，且状态是：已上架
              </p>
              <p class="tip">
                2、线路必须存在，且线路有余额
              </p>
              <p class="tip">
                3、如果线路已开跑/开跑下架，需要补历史的出车单，在试跑在跑列表，右上角操作：创建历史试跑
              </p>
            </div>
          </div>
        </div>
        <div
          class="cancel flex align-center justify-center"
          @click="showModal = false"
        >
          取消
        </div>
      </van-popup>
      <!-- 选择司机 -->
      <van-popup
        v-model="showModalDriver"
        round
        position="bottom"
        :style="{height: '90%', width: '100%'}"
        class="popup-container"
      >
        <van-search
          v-model.trim="driverValue"
          placeholder="请输入司机姓名/手机号"
          show-action
        >
          <template #action>
            <div
              @click="() => {
                driverPage.page = 1
                onSearch()
              }"
            >
              搜索
            </div>
          </template>
        </van-search>
        <div class="list">
          <van-radio-group v-if="driverList.length > 0" v-model="form.driverId">
            <van-list
              v-model="driverLoadingMore"
              :finished="driverFinished"
              :error.sync="driverError"
              :immediate-check="false"
              finished-text="没有更多了"
              error-text="请求失败，点击重新加载"
              @load="() => {
                driverPage.page++
                getDriver()
              }"
            >
              <div
                v-for="(item, index) in driverList"
                :key="index"
                class="list-item"
                @click="onSelectDriver(item)"
              >
                <div class="title flex align-center">
                  <div class="title-tag flex align-center justify-center">
                    {{ item.busiTypeName }}
                  </div>
                  <h3 class="van-ellipsis">
                    {{ item.name }}/{{ item.phone }}
                  </h3>
                  <van-radio checked-color="#3ACB8D" :name="item.driverId" />
                </div>
                <div class="line-details">
                  <div class="flex flex-wrap">
                    <div>车型/车牌号：</div>
                    <div class="flex-sub">
                      {{ item.carTypeName }}{{ item.plateNo ? '/' + item.plateNo : '' }}
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
          </van-radio-group>
          <div v-else class="noData">
            <img src="@/assets/search.png">
            <div class="text">
              <h4 class="tip">
                提示:未找到相关数据
              </h4>
              <p class="tip">
                1、司机必须在司机列表存在，且状态是：已成交、已上岗、已终止服务
              </p>
              <p class="tip">
                2、司机的业务线（共享/专车），需要和线路的肥瘦标签匹配（共享不能上肥线）
              </p>
            </div>
          </div>
        </div>
        <div
          class="cancel flex align-center justify-center"
          @click="showModalDriver = false"
        >
          取消
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { delay } from '@/utils/index';
import { CreateHistoryLntentionRun, GetDriverList, GetLineByCreateHistoryTryRun } from '@/api/tryrun';
import { validatorValue } from '@/utils/validate';
import SelfCalendar from './components/SelfCalendar'
export default {
  name: 'CreateHistoryRun',
  components: {
    SelfCalendar
  },
  data() {
    return {
      showModal: false,
      showModalDriver: false,
      list: [],
      form: {
        lineId: '',
        driverId: '',
        deliveryStartDate: '',
        deliveryEndDate: ''
      },
      formDetails: {
        driver: '',
        line: ''
      },
      // 选择线路
      lineValue: '',
      lineRadio: '',
      lineList: [],
      lineDetail: {},
      // 选择司机
      driverValue: '',
      driverRadio: '',
      driverList: [],
      actionVal: '',
      endMaxDate: new Date(),
      startMinDate: new Date('2020-9-1'),
      driverLoadingMore: false,
      driverFinished: false,
      driverError: false,
      driverPage: {
        page: 1,
        limit: 100
      },
      lineLoadingMore: false,
      lineFinished: false,
      lineError: false,
      linePage: {
        page: 1,
        limit: 100
      }
    };
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
  methods: {
    // 取消
    handleCancelClick() {
      this.$router.go(-1);
    },
    // 确认试跑
    handleSubmitClick() {
      this.$refs.submitForm.submit();
    },
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.go(-1);
    },
    validatorValue,

    /**
     * 点击提交
     */
    async onSubmit() {
      try {
        this.$loading(true);
        let deliveryStartDate = new Date(this.form.deliveryStartDate).setHours(0, 0, 0)
        let deliveryEndDate = new Date(this.form.deliveryEndDate).setHours(23, 59, 59)
        let params = {
          driverId: this.form.driverId,
          lineId: this.form.lineId,
          deliveryStartDate,
          deliveryEndDate
        }
        let { data: res } = await CreateHistoryLntentionRun(params)
        if (res.success) {
          this.$toast.success('创建历史试跑成功！');
          setTimeout(() => {
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
    /**
     * input发生变化
     */
    onSearch() {
      if (this.showModal) {
        // 搜索线路
        this.getLineList();
      } else {
        // 搜索司机
        this.getDriver();
      }
    },
    onSelectLine(item) {
      this.form.lineId = item.lineId;
      this.lineDetail = item;
      this.formDetails.line = `${item.lineName}`;
      this.showModal = false;
      this.driverList = [];
      this.form.driverId = '';
      this.formDetails.driver = '';
    },
    /**
     * 搜索线路
     */
    async getLineList() {
      try {
        this.$loading(true);
        let { data: res } = await GetLineByCreateHistoryTryRun({
          key: this.lineValue,
          select: true,
          page: this.linePage.page,
          limit: this.linePage.limit
        });
        if (res.success) {
          this.lineLoadingMore = false
          if (this.linePage.page === 1) {
            let len = this.lineList.length
            if (len > 0) {
              this.lineList.splice(0, len)
            }
            setTimeout(() => {
              this.lineList = res.data || []
            }, 20)
          } else {
            this.lineList = this.lineList.concat(res.data || []);
          }
        } else {
          this.lineLoadingMore = true
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        this.lineLoadingMore = true
        console.log(`${err}`)
      } finally {
        this.$loading(false);
      }
    },
    // 选择司机
    async getDriver() {
      if (!validatorValue(this.driverValue)) {
        this.$notify({ type: 'warning', message: '请输入6位及以上数字或2位及以上非纯数字及以上的司机姓名' });
        return
      }
      try {
        this.$loading(true);
        const postData = {
          workCity: this.lineDetail.city,
          key: this.driverValue,
          statuss: [3, 4, 5],
          page: this.driverPage.page,
          limit: this.driverPage.limit
        }
        if (this.lineDetail.busiType !== 1 && this.lineDetail.busiType !== 9) {
          postData.busiType = this.lineDetail.busiType
        }
        let { data: res } = await GetDriverList(postData);
        if (res.success) {
          if (this.driverPage.page === 1) {
            let len = this.driverList.length
            if (len > 0) {
              this.driverList.splice(0, len)
            }
            setTimeout(() => {
              this.driverList = res.data || []
            }, 20)
          } else {
            this.driverList = this.driverList.concat(res.data || []);
          }
          this.driverLoadingMore = false
          if (res.data.length !== this.driverPage.limit) {
            this.driverFinished = true
          }
        } else {
          this.driverError = false
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        this.driverError = false
        console.log(`${err}`)
      } finally {
        this.$loading(false);
      }
    },
    // 选中司机
    onSelectDriver(item) {
      this.form.driverId = item.driverId;
      this.formDetails.driver = `${item.name}/${item.phone}`;
      this.showModalDriver = false;
    }
  }
};
</script>

<style lang="less" scoped>
.StepOne {
  .delimiter {
    line-height: 24px;
    height:24px;
  }
  // height: 100%;
  .btn-container {
    position: absolute;
    bottom: 15px;
    left: 15px;
    right: 15px;
  }
  .line-details {
    padding: 10px 25px;
    > div {
      font-size: @font-size-sm-1;
      color: @text-color-sm;
      line-height: 23px;
    }
    .details-btn {
      margin-top: 3px;
      width: 70px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: @text-color-sm;
      border: 1px solid @text-color-sm;
      border-radius: 10px;
    }
  }
  .van-cell-group.border-none {
    &::after {
      border-top: none;
    }
  }
  .popup-container {
    display: flex;
    flex-direction: column;
    background-color: #fafbfc;
    .van-search {
      padding-left: 15px;
      padding-right: 15px;
    }
    .list {
      padding: 10px 15px 0;
      flex: 1;
      overflow: auto;
    }
    .list-item {
      margin-bottom: 10px;
      padding-top: 10px;
      background-color: @white;
      .title {
        margin: 0 15px;
        height: 20px;
        line-height: 20px;
        .title-tag {
          margin-right: 10px;
          padding: 0 10px;
          height: 20px;
          font-size: @font-size-sm;
          color: #eff5fe;
          background: #7f8fbd;
          border-radius: 3px;
          white-space: nowrap;
        }
        h3 {
          margin: 0;
          font-size: @font-size-md;
          font-weight: bold;
          flex: 1;
        }
      }
      .line-details {
        padding: 5px 15px;
        > div {
          color: #3c4353;
        }
      }
    }
    .cancel {
      margin-top: 10px;
      height: 50px;
      line-height: 50px;
      font-size: 17px;
      color: #7f8fbd;
      background-color: @white;
    }
    .noData {
      margin-top: 41.5px;
      text-align: center;
      .text {
        margin-top: 15px;
        font-size: 15px;
        color: #656565;
        text-align: center;
      }
      img {
        width: 83px;
        height: 74px;
      }
    }
  }
  .tip {
    margin:0px;
    font-size:14px;
    color:#666;
  }
}
</style>
