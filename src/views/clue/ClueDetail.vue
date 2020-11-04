<template>
  <div class="ClueDetail">
    <van-sticky
      :offset-top="0"
      class="detailTitle"
    >
      <van-nav-bar
        title="线索详情"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      >
        <template #right>
          <div
            class="doBox"
            style="margin-left:6px"
          >
            <span
              v-if="detailInfo.status === 0"
              v-permission="['/v2/clue/edit']"
              class="orderBtn"
              @click="goRouter"
            >编辑</span>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="detailTitle">
      <div class="itemBox">
        <van-cell>
          <template #title>
            <div class="title">
              <span v-if="detailInfo.name">{{ detailInfo.name }}&#8194;</span>
              <span v-if="detailInfo.phone">{{ detailInfo.phone }}&#8194;</span>
              <span v-text="removeEmpty([detailInfo.busiTypeName ,detailInfo.workCityName])"></span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <div class="itemStatus">
              {{ detailInfo.statusName | DataIsNull }}
            </div>
          </template>
        </van-cell>
        <div class="itemInfo">
          <van-cell
            title-class="cell-title"
            value-class="cell-value"
            title="线索编号："
            :value="detailInfo.clueId | DataIsNull"
          />
          <van-cell
            v-if="detailInfo.gmDutyName"
            title-class="cell-title"
            value-class="cell-value"
            :title="setLabel(detailInfo.gmDutyName) + '：'"
            :value="`${detailInfo.gmName}/${detailInfo.gmMobile}`"
          />
          <van-cell
            title-class="cell-title"
            value-class="cell-value"
            title="创建时间："
            :value="timeFormat(detailInfo.createDate,'YYYY-MM-DD HH:mm:ss')"
          />
        </div>
      </div>
    </div>
    <van-tabs
      v-model="active"
      class="detailTab"
      background="#EAEFF9"
      color="#2F448A"
      type="card"
      line-width="30"
      line-height="2"
      animated
      title-inactive-color="#3C4353"
      title-active-color="#EFF5FE"
      @change="changeTab"
    >
      <van-tab
        v-for="(item,index) in tabList"
        :key="index"
        :title="item.type"
      >
        <div v-if="active === 0">
          <FormInfo :obj="detailInfo" />
        </div>
        <div v-else>
          <van-empty image="error" description="暂无内容" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import {
  DropdownMenu,
  DropdownItem,
  Cell,
  CellGroup,
  Toast
  // Notify
} from 'vant';
import FormInfo from './components/FormInfo';
// import TagInfo from './components/TagInfo';
// import LineInfoItem from './components/LineInfoItem';
// import ContractInfoItem from './components/ContractInfoItem';
// import OrderInfo from './components/OrderInfo';
import { clueInfo } from '@/api/clue.js';
import dayjs from 'dayjs'
export default {
  name: 'ClueDetail',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    // LineInfoItem,
    FormInfo
    // TagInfo,
    // OrderInfo,
    // ContractInfoItem
  },
  data() {
    return {
      active: 0,
      tabList: [
        { type: '基本信息', code: '' },
        { type: '我的推荐', code: 1 },
        { type: '推荐人信息', code: 2 },
        { type: '收藏线路', code: 3 }
      ],
      clueId: '',
      detailInfo: {}
    };
  },
  mounted() {
    let id = this.$route.query.id;
    this.clueId = id;
    this.getDetail(id);
  },
  methods: {
    setLabel(val) {
      if (String(val).indexOf('加盟') !== -1) {
        return val.substr(2)
      }
      return val
    },
    removeEmpty(arr) {
      return (arr.filter(item => item) || []).join('/')
    },
    // YYYY-MM-DD dddd HH:mm:ss
    timeFormat(date, format) {
      return dayjs(date).format(format)
    },
    changeTab(name, title) {
      let id = this.clueId;
      if (name === 1) {
        console.log(1)
      } else if (name === 0) {
        this.getDetail(id);
      } else if (name === 2) {
        console.log(1)
      } else {
        console.log(1)
      }
    },
    async getDetail(id) {
      try {
        // this.$loading(true);
        let { data: res } = await clueInfo({ clueId: id });
        if (res.success) {
          this.detailInfo = res.data;
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        // this.$loading(false);
      }
    },
    goRouter() {
      this.$router.push({ path: '/clueedit', query: { id: this.clueId }})
    }
  }
};
</script>
<style lang="less" scoped>
@import "../driver/DriverList/components/DriverItem.less";
.ClueDetail {
  background-color: #fff;
  .doBox {
    display: flex;
    align-items: center;
  }
  .orderBtn {
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    margin-right: 3px;
  }
  .detailTitle {
    .cell-title,
    .cell-value {
      color: #838a9d;
    }
    .itemInfo {
      border: none;
    }
    .itemBox {
      margin-bottom: 0;
    }
  }
}
</style>
<style scoped>
.ClueDetail >>> .van-dropdown-menu__bar {
  background-color: rgb(47, 68, 138);
  height: 46px;
}
.ClueDetail >>> .van-dropdown-menu__title {
  color: rgb(255, 255, 255);
  font-size: 12px;
}
.ClueDetail .detailTitle >>> .van-cell--center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ClueDetail .detailTitle >>> .van-cell__title,
.van-cell__value {
  flex: inherit;
}
.dropdown >>> .van-icon {
  color: #969799;
}
.detailTab >>> .van-tabs__nav--card,
.detailTab >>> .van-tab {
  margin: 0;
  border: none;
  font-size: 13px;
}
.detailTab >>> .van-cell::after {
  border: none;
}
.ClueDetail .lineInfo >>> .itemStatus {
  border: 1px solid #649cee;
  color: #649cee;
}
</style>
