<template>
  <div class="TryRunDetail flex">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #right>
          <div class="navBarTit" @click="onClickRight">
            操作
          </div>
        </template>
      </van-nav-bar>
      <div class="detail-type">
        待试跑
      </div>
    </div>
    <div class="container">
      <DetailsItem
        :list="list"
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
      list: [
        {
          title: '客户信息',
          children: [
            {
              title: '客户名称',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '项目名称',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '线路名称',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '上岗经理',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '外线销售',
              value: (a, b) => `${a}/${b}`
            }
          ],
          detail: '/' // 详情地址
        },
        {
          title: '线路信息',
          children: [
            {
              title: '上岗时间',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '到仓时间',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '仓库位置',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '配送车型',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '配送区域',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '里程时间',
              value: (a, b) => `${a}/${b}`
            }
          ],
          tags: ['稳线', '共享'],
          detail: '/' // 详情地址
        },
        {
          title: '司机信息',
          children: [
            {
              title: '司机信息',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '车型',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '车牌号',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '现住址',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '加盟经理',
              value: (a, b) => `${a}/${b}`
            }
          ],
          detail: '/' // 详情地址
        },
        {
          title: '试跑意向记录',
          children: [
            {
              title: '操作人',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '操作时间',
              value: (a, b) => `${a}/${b}`
            }
          ]
        },
        {
          title: '上岗记录',
          children: [
            {
              title: '操作人',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '操作时间',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '到仓接待人',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '到仓时间',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '岗前叮嘱',
              value: (a, b) => `${a}/${b}`
            }
          ]
        },
        {
          title: '转跑记录',
          children: [
            {
              title: '操作人',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '操作时间',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '到仓接待人',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '到仓时间',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '岗前叮嘱',
              value: (a, b) => `${a}/${b}`
            }
          ],
          hide: true
        },
        {
          title: '掉线记录',
          children: [
            {
              title: '操作人',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '操作时间',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '掉线原因',
              value: (a, b) => `${a}/${b}`
            },
            {
              title: '其他原因',
              value: (a, b) => `${a}/${b}`
            }
          ]
        }
      ],
      show: false,
      actions: [
        { name: '创建试跑', index: 0 },
        { name: '转试跑', index: 1 },
        { name: '转掉线', index: 2 }
      ]
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
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.show = true;
    },
    onSelect() {},
    async getDetail() {
      try {
        this.$loading(true);
        const runTestId = this.id;
        let { data: res } = await GetDetails({ runTestId })
        if (res.success) {
          console.log(res)
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`${err}`)
      } finally {
        this.$loading(false)
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
