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
            <div class="grid-ct flex-sub">
              <img
                :src="item.icon"
                alt=""
                :style="item.style"
                class="grid-pic"
              >
              <div class="grid-text">
                {{ item.title }}
              </div>
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
      listQuery: {
        key: '',
        page: 1,
        limit: 100,
        endDate: '',
        appletSource: '',
        startDate: '',
        expandManager: '',
        clueType: '',
        carType: '',
        isSettledIn: '',
        workCity: '',
        sourceType: '',
        isPayDeposit: '',
        state: '1'
      },
      active: 1,
      total: 0,
      page: 1,
      loadedAll: false,
      actions: [
        { name: '线路云', value: 0 },
        { name: '司机云', value: 1 },
        { name: '试跑', value: 2 },
        { name: '运费管理', value: 3 }
      ],
      activeIndex: 0,
      show: false,
      list: [
        // 线路云
        [
          {
            title: '客户管理',
            url: '/client',
            icon: require('../../assets/Home/icon_1.png'),
            style: {
              width: '1.0933rem',
              height: '1.0933rem'
            }
          },
          {
            title: '项目管理',
            url: '/project',
            icon: require('../../assets/Home/icon_2.png'),
            style: {
              width: '0.9333rem',
              height: '1.0933rem'
            }
          },
          {
            title: '线路管理',
            url: '/line',
            icon: require('../../assets/Home/icon_3.png'),
            style: {
              width: '1.0267rem',
              height: '1.0933rem'
            }
          }
          // {
          //   title: '拼线',
          //   url: '',
          //   icon: require('../../assets/Home/icon_4.png'),
          //   style: {
          //     width: '1.0133rem',
          //     height: '1.0667rem'
          //   }
          // }
        ],
        // 司机云
        [
          {
            title: '司机管理',
            url: '/driverlist',
            icon: require('../../assets/Home/icon_5.png'),
            style: {
              width: '1.0933rem',
              height: '1.0933rem'
            }
          }
          // {
          //   title: '车辆管理',
          //   url: '',
          //   icon: require('../../assets/Home/icon_6.png'),
          //   style: {
          //     width: '1.3867rem',
          //     height: '0.96rem'
          //   }
          // }
        ],
        // 试跑-在跑
        [
          {
            title: '试跑-在跑',
            url: '/try-run',
            icon: require('../../assets/Home/icon_7.png'),
            style: {
              width: '1.28rem',
              height: '1.0933rem'
            }
          }
        ],
        // 运费
        [
          {
            title: '加盟运费上报',
            url: '',
            icon: require('../../assets/Home/icon_8.png'),
            style: {
              width: '1.2267rem',
              height: '1rem'
            }
          },
          {
            title: '外线运费上报',
            url: '/outsidefreight',
            icon: require('../../assets/Home/icon_9.png'),
            style: {
              width: '1.1733rem',
              height: '0.9467rem',
              marginTop: '0.1rem'
            }
          },
          {
            title: '运费确认',
            url: '/report',
            icon: require('../../assets/Home/icon_10.png'),
            style: {
              width: '1.04rem',
              height: '1.1333rem',
              marginTop: '-0.1rem'
            }
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
      this.activeIndex = item.value;
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
    .grid-ct{
      position: relative;
      width: 100%;
      padding-top: 16px;
    }
    .grid-pic {
      display: block;
      margin: 0 auto;
    }
    .grid-text {
      position: absolute;
      bottom: 10px;
      width: 100%;
      text-align: center;
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
