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
          <div v-permission="['/v2/runtest/creatIntentionRun', '/v2/runtest/switchTryRun' ,'/v2/runtest/switchDropped']" class="navBarTit" @click="onClickRight">
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
import { mapGetters } from 'vuex';
import DetailsItem from './components/DetailsItem';
import { addCach } from '@/utils/mixins.js'
import { GetDetails } from '@/api/tryrun'
export default {
  name: 'TryRunDetail',
  components: {
    DetailsItem
  },
  mixins: [addCach],
  data() {
    return {
      detail: {},
      show: false,
      actions: [],
      arrList: {
        100: '试跑意向',
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
    ...mapGetters([
      'userData'
    ]),
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
        lineId: this.detail.lineId,
        driverId: this.detail.driverId,
        runTestId: this.detail.runTestId
      };
      const list = this.detail.runTestStatusRecordVOList
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
          if (list && list.length > 0) {
            const item = list.find(item => item.recordFlag.includes('掉线记录'));
            if (item) {
              query.id = item.id;
            }
          }
          query.status = this.detail.status
          query.isStable = this.detail.lineInfoVO.lineCategory
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
            { name: '创建试跑', index: 0, disabled: this.permission('/v2/runtest/creatIntentionRun') }
          ]
          break;
        case 300:
          this.actions = [
            { name: '转试跑', index: 1, disabled: this.permission('/v2/runtest/switchTryRun') },
            { name: '转掉线', index: 2, disabled: this.permission('/v2/runtest/switchDropped') }
          ]
          break;
        case 200:
        case 500:
          this.actions = [
            { name: '转掉线', index: 2, disabled: this.permission('/v2/runtest/switchDropped') }
          ]
          break;
        default:
          this.actions = []
          break;
      }
    },
    permission(val) {
      const permissionList = this.userData.stringPermissions
      return !permissionList.some(item => item === val)
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
