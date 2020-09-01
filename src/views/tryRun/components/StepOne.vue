<template>
  <div class="StepOne">
    <van-form ref="submitForm" @submit="onSubmit">
      <van-cell-group class="border-none">
        <van-field
          v-model="form.lineId"
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
      <div v-show="details.lineId" class="line-details">
        <div class="flex flex-wrap">
          <div>线路信息：</div>
          <div class="flex-sub">
            线路名称线路名称线路名称线路名称线路名称线路名称线路名称线路名称线路名称/线路编号
          </div>
        </div>
        <div class="flex flex-wrap">
          <div>上岗时间：</div>
          <div class="flex-sub">
            2020-08-09
          </div>
        </div>
        <div class="flex flex-wrap">
          <div>配送区域：</div>
          <div class="flex-sub">
            XXX
          </div>
        </div>
        <div class="flex flex-wrap">
          <div>里程时间：</div>
          <div class="flex-sub">
            100.00KM/6小时12分钟
          </div>
        </div>
        <div class="details-btn">
          详情
        </div>
      </div>
      <van-cell-group :class="{'border-none': !details.lineId}">
        <van-field
          v-model="form.driverId"
          readonly
          required
          clickable
          is-link
          name="lineId"
          label="选择司机"
          placeholder="请选择司机"
          :rules="[{required: true, message: '请选择司机'}]"
          @click="showModal = true"
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
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
        @input="onSearch"
      />
      <div class="list">
        <van-radio-group v-model="radio">
          <div class="list-item" @click="onChecked">
            <div class="title flex align-center">
              <div class="title-tag flex align-center justify-center">
                共享
              </div>
              <h3 class="van-ellipsis">
                京东城配线路京东城配线路2京…（XS200808）京东城配线路京东城配线路2京…（XS200808）
              </h3>
              <van-icon name="arrow" class="margin-right-xs" />
              <van-radio checked-color="#3ACB8D" name="1" />
            </div>
            <div class="line-details">
              <div class="flex flex-wrap">
                <div>上岗时间：</div>
                <div class="flex-sub">
                  2020-08-09
                </div>
              </div>
              <div class="flex flex-wrap">
                <div>配送区域：</div>
                <div class="flex-sub">
                  XXX
                </div>
              </div>
              <div class="flex flex-wrap">
                <div>里程时间：</div>
                <div class="flex-sub">
                  100.00KM/6小时12分钟
                </div>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="title flex align-center">
              <div class="title-tag flex align-center justify-center">
                共享
              </div>
              <h3 class="van-ellipsis">
                京东城配线路京东城配线路2京…（XS200808）京东城配线路京东城配线路2京…（XS200808）
              </h3>
              <van-icon name="arrow" class="margin-right-xs" />
              <van-radio checked-color="#3ACB8D" name="2" />
            </div>
            <div class="line-details">
              <div class="flex flex-wrap">
                <div>上岗时间：</div>
                <div class="flex-sub">
                  2020-08-09
                </div>
              </div>
              <div class="flex flex-wrap">
                <div>配送区域：</div>
                <div class="flex-sub">
                  XXX
                </div>
              </div>
              <div class="flex flex-wrap">
                <div>里程时间：</div>
                <div class="flex-sub">
                  100.00KM/6小时12分钟
                </div>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="title flex align-center">
              <div class="title-tag flex align-center justify-center">
                共享
              </div>
              <h3 class="van-ellipsis">
                京东城配线路京东城配线路2京…（XS200808）京东城配线路京东城配线路2京…（XS200808）
              </h3>
              <van-icon name="arrow" class="margin-right-xs" />
              <van-radio checked-color="#3ACB8D" name="4" />
            </div>
            <div class="line-details">
              <div class="flex flex-wrap">
                <div>上岗时间：</div>
                <div class="flex-sub">
                  2020-08-09
                </div>
              </div>
              <div class="flex flex-wrap">
                <div>配送区域：</div>
                <div class="flex-sub">
                  XXX
                </div>
              </div>
              <div class="flex flex-wrap">
                <div>里程时间：</div>
                <div class="flex-sub">
                  100.00KM/6小时12分钟
                </div>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="title flex align-center">
              <div class="title-tag flex align-center justify-center">
                共享
              </div>
              <h3 class="van-ellipsis">
                京东城配线路京东城配线路2京…（XS200808）京东城配线路京东城配线路2京…（XS200808）
              </h3>
              <van-icon name="arrow" class="margin-right-xs" />
              <van-radio checked-color="#3ACB8D" name="3" />
            </div>
            <div class="line-details">
              <div class="flex flex-wrap">
                <div>上岗时间：</div>
                <div class="flex-sub">
                  2020-08-09
                </div>
              </div>
              <div class="flex flex-wrap">
                <div>配送区域：</div>
                <div class="flex-sub">
                  XXX
                </div>
              </div>
              <div class="flex flex-wrap">
                <div>里程时间：</div>
                <div class="flex-sub">
                  100.00KM/6小时12分钟
                </div>
              </div>
            </div>
          </div>
          <div class="list-item">
            <div class="title flex align-center">
              <div class="title-tag flex align-center justify-center">
                共享
              </div>
              <h3 class="van-ellipsis">
                京东城配线路京东城配线路2京…（XS200808）京东城配线路京东城配线路2京…（XS200808）
              </h3>
              <van-icon name="arrow" class="margin-right-xs" />
              <van-radio checked-color="#3ACB8D" name="5" />
            </div>
            <div class="line-details">
              <div class="flex flex-wrap">
                <div>上岗时间：</div>
                <div class="flex-sub">
                  2020-08-09
                </div>
              </div>
              <div class="flex flex-wrap">
                <div>配送区域：</div>
                <div class="flex-sub">
                  XXX
                </div>
              </div>
              <div class="flex flex-wrap">
                <div>里程时间：</div>
                <div class="flex-sub">
                  100.00KM/6小时12分钟
                </div>
              </div>
            </div>
          </div>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { debounce } from '@/utils/index';
import { CreateLntentionRun } from '@/api/tryrun'
export default {
  name: 'StepOne',
  data() {
    return {
      showModal: false,
      showActionSheet: false,
      list: [],
      form: {
        operateFlag: 'tryRun',
        lineId: '1',
        driverId: '2'
      },
      value: '',
      radio: '',
      actions: [
        { name: '提交', value: '1' },
        { name: '提交并创建试跑', value: '2' }
      ],
      details: {}
    };
  },
  methods: {
    /**
     * 点击选则提交类型
     */
    onSelect() {
      this.$refs.submitForm.submit();
    },
    /**
     * 点击提交
     */
    onSubmit() {
      this.loading = true;
      CreateLntentionRun(this.form)
        .then(({ data }) => {
          if (data.success) {
            this.$toast.success('创建试跑意向成功！')
          } else {
            this.$toast.fail(data.errorMsg)
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    /**
     * 点击选中
     */
    onChecked() {
      console.log(111)
    },
    /**
     * 点击取消
     */
    onCancel() {
      this.showModal = false;
    },
    /**
     * input发生变化
     */
    onSearch: debounce(function() {
      if (!this.value) {
        return false;
      }
      this.getList();
    }, 200),
    /**
     * 搜索线路
     */
    getList() {
      console.log(111);
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
    .van-search{
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
        >div{
          color: #3c4353;
        }
      }
    }
  }
}
</style>
