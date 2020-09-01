<template>
  <div class="StepOne">
    <van-form @submit="onSubmit">
      <van-cell-group class="border-none">
        <van-field
          v-model="formStr.lineId"
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
      <div class="line-details">
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
      <van-cell-group>
        <van-field
          v-model="formStr.driverId"
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
          native-type="submit"
          class="sub-btn"
        >
          更多操作
        </van-button>
      </div>
    </van-form>
    <!-- Suggest -->
    <Suggest
      v-model="showModal"
      :options="options"
      type="selectName"
      @keyWordValue="handleSearchChange"
      @finish="handleValueClick"
      @closed="showModal=false"
    />
  </div>
</template>

<script>
import Suggest from '@/components/SuggestSearch';
export default {
  name: 'StepOne',
  components: {
    Suggest
  },
  data() {
    return {
      showModal: false,
      options: [],
      formStr: {
        lineId: '',
        driverId: ''
      }
    }
  },
  methods: {
    onSubmit() {},
    handleSearchChange() {},
    handleValueClick() {}
  }
}
</script>

<style lang="less" scoped>
.StepOne{
  height: 100%;
  .btn-container{
    position: absolute;
    bottom: 15px;
    left: 15px;
    right: 15px;
  }
  .line-details{
    padding: 10px 25px;
    >div{
      font-size: @font-size-sm-1;
      color: @text-color-sm;
      line-height: 23px;
    }
    .details-btn{
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
  .van-cell-group.border-none{
    &::after{
      border-top: none;
    }
  }
}
</style>
