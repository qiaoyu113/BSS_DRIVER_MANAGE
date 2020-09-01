<template>
  <div class="index">
    <van-nav-bar :title="title">
      <template #right>
        <div class="navBarTit" @click="show = true">
          <div :class="{open: show, 'right-btn': true}">
            {{ actions[activeIndex]['name'] }}
          </div>
        </div>
      </template>
    </van-nav-bar>
    <div class="list-wrap">
      <div class="list-title">
        工作台
      </div>
      <div class="list-content">
        <van-grid :gutter="5" :border="false">
          <van-grid-item
            v-for="(item, index) in list[activeIndex]"
            :key="index"
            :to="item.url"
          >
            <img :src="item.icon" alt="" class="grid-pic">
            <div class="grid-text">
              {{ item.title }}
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @select="onSelect"
      />
    </div>
    <footer-tabbar />
  </div>
</template>
<script>
import FooterTabbar from '@/components/FooterTabbar';
export default {
  name: 'Index',
  components: {
    FooterTabbar
  },
  data() {
    return {
      activeIndex: 0,
      actions: [
        { name: '线路云', index: 0 },
        { name: '司机云', index: 1 },
        { name: '试跑-在跑', index: 2 },
        { name: '运费管理', index: 3 }
      ],
      show: false,
      list: [
        // 线路云
        [
          {
            title: '客户管理',
            url: '/client',
            icon: require('../../assets/Home/line_1.png')
          },
          {
            title: '项目管理',
            url: '/project',
            icon: require('../../assets/Home/line_2.png')
          },
          {
            title: '线路管理',
            url: '/line',
            icon: ''
          },
          {
            title: '拼线',
            url: '',
            icon: require('../../assets/Home/line_4.png')
          }
        ],
        // 司机云
        [
          {
            title: '司机管理',
            url: '',
            icon: ''
          },
          {
            title: '车辆管理',
            url: '',
            icon: ''
          }
        ],
        // 试跑-在跑
        [
          {
            title: '试跑-在跑',
            url: '/try-run',
            icon: ''
          }
        ]
      ]
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    this.activeIndex = localStorage.getItem('HOME_ACTIVE') || 0;
  },
  methods: {
    onSelect(item) {
      this.activeIndex = item.index;
      // 设置缓存，下次进入取缓存值
      localStorage.setItem('HOME_ACTIVE', this.activeIndex)
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  .navBarTit {
    color: @white;
    .right-btn {
      position: relative;
      padding-right: 8px;
      &.open {
        &::after {
          margin-top: -1px;
          transform: rotate(135deg);
        }
      }
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -4px;
        margin-top: -5px;
        border: 3px solid;
        border-color: transparent transparent @white @white;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }
  }
  .list-title {
    padding: 11px 0 16px 20px;
    font-size: @font-size-md-1;
    color: @gray-9;
  }
  .list-content {
    padding: 0 23px;
    .grid-pic {
      display: block;
      margin-bottom: 10px;
      width: 41px;
      height: 41px;
    }
    .grid-text {
      font-size: @font-size-xs-1;
      color: @gray-13;
    }
    ::v-deep {
      .van-grid-item__content--center {
        height: 90px;
        padding: 0;
        background: #eff5fe;
        border-radius: 3px;
      }
    }
  }
}
</style>
