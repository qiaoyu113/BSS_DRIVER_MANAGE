<template>
  <div class="DriverDetail">
    <van-sticky
      :offset-top="0"
      class="detailTitle"
    >
      <van-nav-bar
        title="司机详情"
        left-text="返回"
        left-arrow
        @click-left="goRouter"
      >
        <template #right>
          <div class="doBox">
            <div v-permission="['/v2/order/createOrUpdateOrder', '/v2/order/auditOrderNoPass' ,'/v2/order/abort', '/v2/order/getOrderDetialByDriverId']" class="checkStyle" @click="createOrders">
              <span
                class="orderBtn"
              >录入订单</span>
            </div>
          </div>
          <div
            class="doBox"
            style="margin-left:6px"
          >
            <div v-permission="['/v2/driver/insertLabel' ,'/v2/driver/edit/interview', '/v2/driver/signOut',' /v2/driver/signDeal']" class="checkStyle" @click="showDothing = true">
              <span
                class="orderBtn"
              >操作</span>
              <van-icon
                name="arrow-down"
                size="12"
              />
            </div>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="detailTitle">
      <div class="itemBox">
        <van-cell>
          <template #title>
            <div class="title">
              <span>{{ detailInfo.name | DataIsNull }}</span>&#8194;
              <span>{{ detailInfo.phone| DataIsNull }}</span>&#8194;
              <span v-text="removeEmpty([detailInfo.busiTypeName ,detailInfo.workCityName],true)"></span>
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
            title="司机编号："
            :value="detailInfo.driverId | DataIsNull"
          />
          <van-cell
            title-class="cell-title"
            value-class="cell-value"
            title="加盟经理："
            :value="removeEmpty([detailInfo.gmName ,detailInfo.gmPhone])"
          />
          <van-cell
            title-class="cell-title"
            value-class="cell-value"
            title="创建人："
            :value="removeEmpty([detailInfo.createName ,detailInfo.createPhone])"
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
        <div
          v-if="active === 4"
          class="lineInfo"
        >
          <template v-if="lineList.length > 0">
            <div
              v-for="(info,ind) in lineList"
              :key="ind"
            >
              <LineInfoItem :obj="info" />
            </div>
          </template>
          <template v-else>
            <div>
              <van-empty image="error" description="暂无内容" />
            </div>
          </template>
        </div>
        <div v-if="active === 3">
          <template v-if="contractList.length > 0">
            <div
              v-for="(info,ind) in contractList"
              :key="ind"
            >
              <ContractInfoItem
                :obj="info"
                @activeContract="activeContract"
              />
            </div>
          </template>
          <template v-else>
            <div>
              <van-empty image="error" description="暂无内容" />
            </div>
          </template>
        </div>
        <div v-if="active === 2">
          <template v-if="orderInfoList.length > 0">
            <div
              v-for="(info,ind) in orderInfoList"
              :key="ind"
            >
              <OrderInfo
                :obj="info"
                @orderStop="orderStop"
              />
            </div>
          </template>
          <template v-else>
            <div>
              <van-empty image="error" description="暂无内容" />
            </div>
          </template>
        </div>
        <div v-if="active === 1">
          <TagInfo :obj="tagInfo" />
        </div>
        <div v-if="active === 0">
          <FormInfo :obj="detailInfo" />
        </div>
      </van-tab>
    </van-tabs>

    <van-action-sheet
      v-model="showDothing"
      :actions="doMore | isPermission"
      cancel-text="取消"
      close-on-click-action
      @cancel="showDothing = false"
      @select="onSelectDothing"
    />

    <van-dialog v-model="showDio">
      <div class="DioAlert">
        <span>购车/租车订单暂不支持电子合同，<br>请签约纸质合同！</span>
      </div>
    </van-dialog>

    <van-dialog v-model="interviewDio" show-cancel-button confirm-button-text="立即填写" cancel-button-text="稍后再说" @confirm="interviewConfirm" @cancel="interviewCancel">
      <div class="DioAlert">
        <span>{{ `该司机未填写${computedBusi().busiTypeName}面试！请点击右上角“操作—编辑${computedBusi().busiTypeName}面试”按钮或点击下方“立即填写”按钮填写${computedBusi().busiTypeName}面试信息后再录入订单！` }}</span>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import {
  DropdownMenu,
  DropdownItem,
  Cell,
  CellGroup,
  Toast,
  Notify
} from 'vant';
import FormInfo from './components/FormInfo';
import TagInfo from './components/TagInfo';
import LineInfoItem from './components/LineInfoItem';
import ContractInfoItem from './components/ContractInfoItem';
import OrderInfo from './components/OrderInfo';
import { driverDetail, selectLabel } from '@/api/driver.js';
import dayjs from 'dayjs';
import { contractList, orderAbort, getOrderList } from '@/api/order.js';
import { getLingMessageByDriverId } from '@/api/driver.js';
import { addCach } from '@/utils/mixins.js'
export default {
  name: 'DriverDetail',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    LineInfoItem,
    FormInfo,
    TagInfo,
    OrderInfo,
    ContractInfoItem
  },
  mixins: [addCach],
  data() {
    return {
      active: 0,
      tabList: [
        { type: '面试信息', code: '' },
        { type: '标签信息', code: 1 },
        { type: '订单信息', code: 2 },
        { type: '合同信息', code: 3 },
        { type: '线路信息', code: 4 }
      ],
      showDothing: false,
      driverId: '',
      detailInfo: {},
      tagInfo: {},
      orderInfoList: [],
      lineList: [],
      contractList: [],
      showDio: false,
      interviewDio: false
    };
  },
  computed: {
    doMore() {
      return this.arrList();
    },
    doOrder() {
      return this.orderList();
    },
    // 录入订单 判断逻辑
    isStep() {
      if (this.orderInfoList.length === 0) {
        return true;
      } else {
        let statusArr = [];
        this.orderInfoList.map((ele) => {
          if (ele.status === 45 || ele.status === 0) {
            statusArr.push(ele);
          }
        });
        return statusArr.length === this.orderInfoList.length;
      }
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.driverId = id;
    this.getDetail(id);
    this.getOrderLabel(id);
  },
  beforeRouteEnter(to, from, next) {
    if (['/resetOrder', '/createOrder'].includes(from.path)) {
      if (to.query.canShow === true) {
        next(vm => {
          // 通过 `vm` 访问组件实例
          vm.showDio = true
        })
        return false
      }
    }
    next()
  },
  methods: {
    goRouter() {
      this.$router.push('/driverlist')
    },
    interviewConfirm() {
      const busiType = this.computedBusi().busiType
      if (busiType === 0) {
        this.$router.push({
          path: '/editTailored',
          query: {
            id: this.driverId
          }
        })
      } else {
        this.$router.push({
          path: '/editShare',
          query: {
            id: this.driverId
          }
        })
      }
    },
    interviewCancel() {
      this.interviewDio = false
    },
    computedBusi() {
      const busiType = this.detailInfo.busiType
      const busiTypeArray = this.detailInfo.interviewInfoVOList || []
      let hasBusi = busiTypeArray.some(ele => {
        return ele.busiType === busiType
      })
      return {
        status: hasBusi,
        busiTypeName: busiType === 0 ? '专车' : '共享',
        busiType: busiType
      }
    },
    removeEmpty(arr, type) {
      let text = (arr.map(item => {
        if (item) {
          return item
        } else {
          return '暂无数据'
        }
      }) || []).join('/')
      if (type) {
        return `(${text})`
      } else {
        return text
      }
    },
    // YYYY-MM-DD dddd HH:mm:ss
    timeFormat(date, format) {
      return dayjs(date).format(format);
    },
    createOrders() {
      // 已面试  已终止服务
      if (this.isStep) {
        const computedBusi = this.computedBusi()
        if (!computedBusi.status) {
          this.interviewDio = true
          return
        } else {
          return this.$router.push({
            path: '/createOrder',
            query: {
              id: this.driverId,
              driverName: this.detailInfo.name,
              driverPhone: this.detailInfo.phone,
              workCityName: this.detailInfo.workCityName,
              workCity: this.detailInfo.workCity,
              busiType: this.detailInfo.busiType
            }
          });
        }
      }

      // 已成交
      const dealOver = this.orderInfoList.some(ele => ele.status === 30)
      if (dealOver) {
        this.$toast('该司机已存在已成交订单，不能再次录入')
        return
      }

      // 待审核
      const waitAudit = this.orderInfoList.some(ele => ele.status === 20)
      if (waitAudit) {
        this.$toast('该司机已存在待审核订单，不能再次录入')
        return
      }

      // 审核不通过
      const noAudit = this.orderInfoList.some(ele => ele.status === 25)
      if (noAudit) {
        this.$toast('该司机已存在待重新提交订单，不能再次录入')
        return
      }
    },
    arrList() {
      let arr = [];
      const tagView = {
        name: '打标签',
        url: '/tagView',
        pUrl: ['/v2/driver/insertLabel']
      };
      const editTailored = {
        name: '编辑专车面试',
        url: '/editTailored',
        pUrl: ['/v2/driver/edit/interview']
      };
      const editShare = {
        name: '编辑共享面试',
        url: '/editShare',
        pUrl: ['/v2/driver/edit/interview']
      };
      if (
        this.detailInfo.status === 1 ||
        this.detailInfo.status === 2 ||
        this.detailInfo.status === 4
      ) {
        arr.push(tagView);
        if (this.detailInfo.busiType === 0) {
          arr.push(editTailored);
        } else if (this.detailInfo.busiType === 1) {
          arr.push(editShare);
        }
        return arr;
      } else if (this.detailInfo.status === 3) {
        arr.push(tagView);
        if (this.detailInfo.busiType === 0) {
          arr.push(editTailored);
        } else if (this.detailInfo.busiType === 1) {
          arr.push(editShare);
        }
        return arr;
      } else if (this.detailInfo.status === 5) {
        arr.push(tagView);
        if (this.detailInfo.busiType === 0) {
          arr.push(editTailored);
        } else if (this.detailInfo.busiType === 1) {
          arr.push(editShare);
        }
        return arr;
      }
    },
    onSelectDothing(item) {
      this.showDothing = false;
      this.$router.push({ path: item.url, query: { id: this.driverId }});
    },
    changeTab(name, title) {
      let id = this.driverId;
      if (name === 1) {
        this.getTagInfo(id);
      } else if (name === 0) {
        this.getDetail(id);
      } else if (name === 2) {
        this.getOrderLabel(id);
      } else if (name === 3) {
        this.getContract(id);
      } else {
        this.getLineLabel(id);
      }
    },
    async getTagInfo(id) {
      try {
        this.$loading(true);
        let { data: res } = await selectLabel({ driverId: id });
        if (res.success) {
          this.tagInfo = res.data || {};
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    async getDetail(id) {
      try {
        // this.$loading(true);
        let { data: res } = await driverDetail({ driverId: id });
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
    async getLineLabel(id) {
      try {
        this.$loading(true);
        let { data: res } = await getLingMessageByDriverId({ driverId: id });
        if (res.success) {
          this.lineList = res.data || [];
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    async getContract(id) {
      try {
        this.$loading(true);
        let { data: res } = await contractList({ driverId: id });
        if (res.success) {
          this.contractList = res.data;
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    async getOrderLabel(id) {
      try {
        this.$loading(true);
        let params = {
          driverId: id
        };
        let { data: res } = await getOrderList(params);
        if (res.success) {
          this.orderInfoList = res.data || [];
          this.$loading(false);
        } else {
          this.$toast.fail(res.errorMsg);
          this.$loading(false);
        }
      } catch (err) {
        console.log(`fail:${err}`);
        this.$loading(false);
      }
    },
    activeContract() {
      this.getDetail(this.driverId);
      this.getContract(this.driverId);
    },
    orderStop() {
      this.getOrderLabel(this.driverId);
    },
    async stopOrder(params) {
      let { data: res } = await orderAbort(params);
      if (res.success) {
        Notify({ type: 'success', message: '订单终止成功' });
        this.getOrderLabel(this.driverId);
        this.getDetail(this.driverId);
      } else {
        Notify({ type: 'warning', message: res.errorMsg });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../DriverList/components/DriverItem.less";
.DriverDetail {
  .DioAlert{
    padding: 20px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .checkStyle:active{
    opacity: .7;
  }
  background-color: @body-bg;
  .doBox {
    display: flex;
    align-items: center;
  }
  .orderBtn {
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
  }
  .checkStyle:active{
    opacity: .7;
  }
  .detailTitle {
    .cell-title,
    .cell-value {
      color: #838a9d;
    }
    .itemInfo {
      border: none;
      padding: 0 0 8px 0;
    }
    .itemBox {
      margin-bottom: 0;
    }
  }
}
</style>
<style scoped>
.DriverDetail >>> .van-nav-bar__right:active{
  opacity: 1;
}
.DriverDetail >>> .van-nav-bar__title{
  z-index: 999;
}
.DriverDetail >>> .van-dropdown-menu__bar {
  background-color: rgb(47, 68, 138);
  height: 46px;
}
.DriverDetail >>> .van-dropdown-menu__title {
  color: rgb(255, 255, 255);
  font-size: 12px;
}
.DriverDetail .detailTitle >>> .van-cell--center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.DriverDetail .detailTitle >>> .van-cell__title,
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
  line-height: normal;
}
.detailTab >>> .van-cell::after {
  border: none;
}
.DriverDetail .lineInfo >>> .itemStatus {
  border: 1px solid #649cee;
  color: #649cee;
}
</style>
