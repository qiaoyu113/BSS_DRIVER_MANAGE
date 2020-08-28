<template>
  <div class="StepOne">
    <van-form @submit="onSubmit">
      <van-cell-group>
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
        <van-field
          v-model="formStr.lineId"
          readonly
          required
          label="线路信息："
        />
        <van-field
          v-model="formStr.lineId"
          readonly
          required
          label="上岗时间："
        />
        <van-field
          v-model="formStr.lineId"
          readonly
          required
          label="配送区域："
        />
        <van-field
          v-model="formStr.lineId"
          readonly
          required
          label="里程时间："
        />
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

<style>

</style>
