<template>
  <div class="TryRunDetail flex">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template v-if="actions.length > 0" #right>
          <div class="navBarTit" @click="onClickRight">
            操作
          </div>
        </template>
      </van-nav-bar>
      <div class="detail-type">
        {{ arrList[detail.status] }}
      </div>
    </div>
    <div class="container">
      <DetailsItem
        v-if="Object.keys(detail).length > 0"
        :detail="detail"
      />
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    />
  </div>
</template>

<script>
import DetailsItem from './components/DetailsItem';
import { GetDetails } from '@/api/tryrun'
export default {
  name: 'TryRunDetail',
  components: {
    DetailsItem
  },
  data() {
    return {
      detail: {},
      show: false,
      actions: [],
      arrList: {
        100: '待试跑',
        200: '已试跑',
        300: '已跟车',
        400: '跟车掉线',
        500: '稳定上岗',
        600: '试跑掉线',
        700: '稳定掉线'
      }
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    // 左侧返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 右侧按钮
    onClickRight() {
      this.show = true;
    },
    // 选择
    onSelect(item) {
      const { index } = item;
      let path = '';
      let query = {
        lineId: 'XL202009010002',
        driverId: 'ceshi'
      };
      switch (index) {
        case 0:
          path = '/create-run';
          query.step = '1';
          break;
        case 1:
          path = '/to-try';
          break;
        case 2:
          path = '/off-try';
          break;
      }
      this.$router.push({
        path: path,
        query
      })
    },
    // 获取详情
    async getDetail() {
      try {
        this.$loading(true);
        const runTestId = this.id;
        let { data: res } = await GetDetails({ runTestId })
        if (res.success) {
          this.detail = res.data;
          this.setRightBtn();
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
    // 设置右侧按钮list
    setRightBtn() {
      const status = this.detail.status;
      switch (status) {
        case 100:
          this.actions = [
            { name: '创建试跑', index: 0 }
          ]
          break;
        case 300:
          this.actions = [
            { name: '转试跑', index: 1 },
            { name: '转掉线', index: 2 }
          ]
          break;
        case 200:
          this.actions = [
            { name: '转掉线', index: 2 }
          ]
          break;
        default:
          this.actions = [
            { name: '创建试跑', index: 0 },
            { name: '转试跑', index: 1 },
            { name: '转掉线', index: 2 }
          ]
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.TryRunDetail {
  flex-direction: column;
  background: @body-bg;
  .top {
    background-color: @body-bg;
  }
  .container {
    flex: 1;
    overflow: auto;
  }
  .navBarTit {
    color: #649cee;
  }
  .detail-type {
    height: 25px;
    line-height: 25px;
    font-size: @font-size-sm-1;
    color: @tab-active-color;
    background-color: #fdeed7;
    text-align: center;
  }

}
</style>
