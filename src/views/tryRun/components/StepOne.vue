<template>
  <div class="StepOne">
    <van-form ref="submitForm" @submit="onSubmit">
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
      <div v-show="lineDetail.lineId" class="line-details">
        <div class="flex flex-wrap">
          <div>线路信息：</div>
          <div class="flex-sub">
            {{ lineDetail.lineName }}/{{ lineDetail.lineId }}
          </div>
        </div>
        <div class="flex flex-wrap">
          <div>上岗时间：</div>
          <div class="flex-sub">
            {{ lineDetail.driverWorkTime | parseTime('{y}-{m}-{d}') }}
          </div>
        </div>
        <div class="flex flex-wrap">
          <div>配送区域：</div>
          <div class="flex-sub">
            {{ lineDetail.lineArea }}
          </div>
        </div>
        <div class="flex flex-wrap">
          <div>里程时间：</div>
          <div class="flex-sub">
            {{ lineDetail.distance + '/' +lineDetail.timeDiff }}
          </div>
        </div>
        <div class="details-btn">
          详情
        </div>
      </div>
      <van-cell-group :class="{'border-none': !lineDetail.lineId}">
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
          @click="showModaldDriver = true"
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
        placeholder="请输入搜索关键词"
        @input="onSearch"
      >
        <template #action>
          <div @click="onSearch">
            搜索
          </div>
        </template>
      </van-search>
      <div class="list">
        <van-radio-group
          v-if="lineList.length > 0"
          v-model="form.lineId"
        >
          <div
            v-for="(item, index) in lineList"
            :key="index"
            class="list-item"
            @click="onSelectLine(item)"
          >
            <div class="title flex align-center">
              <div class="title-tag flex align-center justify-center">
                {{ item.busiTypeName }}
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
                  {{ item.distance + '/' +item.timeDiff }}
                </div>
              </div>
            </div>
          </div>
        </van-radio-group>
        <div v-else class="noData">
          <img src="@/assets/search.png">
          <div class="text">
            抱歉,未找到相关数据!
          </div>
        </div>
      </div>
      <div
        class="cancel flex align-center justify-center"
        @click="showModald = false"
      >
        取消
      </div>
    </van-popup>
    <!-- 选择司机 -->
    <van-popup
      v-model="showModaldDriver"
      round
      position="bottom"
      :style="{height: '90%', width: '100%'}"
      class="popup-container"
    >
      <van-search
        v-model="driverValue"
        placeholder="请输入搜索关键词"
        show-action
        @input="onSearch"
      >
        <template #action>
          <div @click="onSearch">
            搜索
          </div>
        </template>
      </van-search>
      <div class="list">
        <van-radio-group v-if="driverList.length > 0" v-model="form.driverId">
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
        </van-radio-group>
        <div v-else class="noData">
          <img src="@/assets/search.png">
          <div class="text">
            抱歉,未找到相关数据!
          </div>
        </div>
      </div>
      <div
        class="cancel flex align-center justify-center"
        @click="showModaldDriver = false"
      >
        取消
      </div>
    </van-popup>
  </div>
</template>

<script>
import { debounce, delay } from '@/utils/index';
import { CreateLntentionRun, GetDriverList, GetLine } from '@/api/tryrun';
export default {
  name: 'StepOne',
  data() {
    return {
      showModal: false,
      showModaldDriver: false,
      showActionSheet: false,
      list: [],
      form: {
        operateFlag: 'creatIntentionRun', // 创建试跑意向
        lineId: '',
        driverId: ''
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
      driverDetail: {},
      actions: [
        { name: '提交', value: '1' },
        { name: '提交并创建试跑', value: '2' }
      ],
      actionVal: ''
    };
  },
  methods: {
    /**
     * 点击选则提交类型
     */
    onSelect(item) {
      this.actionVal = item.value;
      this.$refs.submitForm.submit();
    },
    /**
     * 点击提交
     */
    async onSubmit() {
      try {
        this.$loading(true);
        let { data: res } = await CreateLntentionRun({
          driverMessage: `${this.driverDetail.name}/${this.driverDetail.phone}`,
          lineMessage: `${this.lineDetail.lineName}/${this.lineDetail.lineId}`,
          ...this.form
        })
        if (res.success) {
          this.$toast.success('创建试跑意向成功！');
          setTimeout(() => {
            if (this.actionVal === '1') { // 1提交 2提交并创建试跑
            // 返回试跑列表
              this.$router.push('/try-run')
            } else {
            // 进入创建试跑
              this.$router.push({
                path: '/create-run',
                query: {
                  step: '1',
                  lineId: this.form.lineId
                }
              })
            }
          }, delay);
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        this.$loading(false)
        console.log(`${err}`)
      } finally {
        // this.$loading(false)
      }
    },
    /**
     * input发生变化
     */
    onSearch: debounce(function() {
      if (this.showModal) {
        // 搜索线路
        this.getLineList();
      } else {
        // 搜索司机
        this.getDriver();
      }
    }, 200),
    onSelectLine(item) {
      this.form.lineId = item.lineId;
      this.lineDetail = item;
      this.formDetails.line = `${item.lineName}`;
      this.showModal = false;
    },
    /**
     * 搜索线路
     */
    async getLineList() {
      try {
        this.$loading(true);
        let { data: res } = await GetLine({
          key: this.lineValue,
          dutyManagerId: ''
        });
        if (res.success) {
          this.lineList = res.data;
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`${err}`)
      } finally {
        this.$loading(false);
      }
    },
    // 选择司机
    async getDriver() {
      try {
        this.$loading(true);
        let { data: res } = await GetDriverList({ key: this.driverValue });
        if (res.success) {
          this.driverList = res.data;
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`${err}`)
      } finally {
        this.$loading(false);
      }
    },
    // 选中司机
    onSelectDriver(item) {
      this.form.driverId = item.driverId;
      this.driverDetail = item;
      this.formDetails.driver = `${item.name}/${item.phone}`;
      this.showModaldDriver = false;
    }
  }
};
</script>

<style lang="less" scoped>
.StepOne {
  height: 100%;
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
}
</style>
