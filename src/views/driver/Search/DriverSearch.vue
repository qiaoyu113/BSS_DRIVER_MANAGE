<template>
  <div :style="{backgroundColor:lists.length > 0 ? '#F9F9F9' : ''}" :class="checked ? 'driverSearch padd' : 'driverSearch'">
    <!-- nav-bar -->
    <DriverTitle
      :show-change="checkCan"
      :actions="filterPermission"
      @screen="startScreen"
      @changeManager="changeManager"
    />
    <!-- 搜索 -->
    <van-sticky
      :offset-top="46"
      :style="{height: checked ? '72px' : '54px'}"
    >
      <form action="/">
        <van-search
          v-model.trim="keyWord"
          show-action
          placeholder="司机姓名/司机编号/司机手机号搜索"
          @search="onSearch"
          @clear="onCancel"
        >
          <template #action>
            <div @click="onSearch">
              搜索
            </div>
          </template>
        </van-search>
      </form>
      <div
        v-if="checked"
        class="checkAll"
      >
        <van-checkbox
          v-model="checkall"
          checked-color="#7F8FBD"
          class="checked"
          shape="square"
        >
          全选({{ checkedList.length }})
        </van-checkbox>
      </div>
    </van-sticky>

    <!-- 搜索结果 -->
    <div
      v-if="checkCan"
      class="list"
      :style="{paddingTop: checked ? '15px' : '5px'}"
    >
      <template>
        <div
          v-for="(item, index) in lists"
          :key="index"
        >
          <CardItem
            class="items"
            :item="item"
            :checked="checked"
            :checkall="checkedList"
            @changeCheck="changeCheck"
          />
          <div class="lineHeight"></div>
          <div
            v-if="checked"
            class="bottomBtn"
          >
            <van-button
              color="#2F448A"
              plain
              style="width:38%"
              @click="cancelManager"
            >
              取消
            </van-button>
            <van-button
              type="primary"
              style="width:61%"
              @click="confirmManager"
            >
              选择加盟经理
            </van-button>
          </div>
        </div>
      </template>
    </div>
    <template v-else>
      <div
        v-show="options.length === 0"
        class="history"
      >
        <div class="historyBox">
          <h4>历史搜索记录</h4>
          <van-icon v-if="historyItems.length > 0" name="delete" size="20" color="#7F8FBD" @click="deleteBtn" />
        </div>
        <div class="historyContainer">
          <div
            v-for="item in historyItems"
            :key="item"
            class="item van-ellipsis"
            @click="handleItemClick(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <van-empty
        image="search"
        description="抱歉，未找到相关数据！"
      />
    </template>

    <!-- 选择加盟经理弹窗 -->
    <changeManager :status="changeManagerStatus" @closePop="closeManagerPop" @changeOver="changeOver" />
  </div>
</template>

<script>
import { validatorValue } from '@/utils/validate';
import { getDriverList } from '@/api/driver.js'
import DriverTitle from '../DriverList/components/DriverTitle';
import CardItem from '../DriverList/components/ListItem';
import changeManager from '../DriverList/components/ChangeManager'
import { Notify, Dialog } from 'vant';
import { isPermission } from '@/filters';

export default {
  components: {
    CardItem,
    DriverTitle,
    changeManager
  },
  data() {
    return {
      changeManagerStatus: false,
      keyWord: '',
      lists: [],
      historyItems: [],
      options: [],
      checkedList: [],
      checked: false,
      allTotal: 0,
      menuActive: [{ name: '更换加盟经理', pUrl: ['/v2/driver/updateGmByDriverId'], value: 0 },
        { name: '导出', pUrl: ['/v2/driver/export', '/v2/order/driver/export'], value: 1 }],
      exportBtn: [{
        name: '司机信息',
        value: '1',
        pUrl: ['/v2/driver/export']
      }, {
        name: '订单信息',
        value: '2',
        pUrl: ['/v2/order/driver/export']
      }]
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    checkall: {
      get: function() {
        return this.lists.length === this.checkedList.length;
      },
      set: function(val) {
        console.log(val);
        if (val) {
          this.checkedList = [];
          this.lists.map((ele) => {
            this.checkedList.push(ele.driverId);
          });
        } else {
          this.checkedList = [];
        }
      }
    },
    checkCan() {
      return this.lists.length > 0;
    },
    filterPermission() {
      return isPermission(this.menuActive)
    }
  },
  mounted() {
    this.validatorValue = validatorValue
    let historyData = this.getHistory()
    if (historyData) {
      this.historyItems = JSON.parse(historyData)
    }
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      this.$router.go(-1);
    },
    closeManagerPop(val) {
      this.changeManagerStatus = val.status
    },
    /**
     * 新建面试表单入口
     */
    startScreen(val) {
      this.showScreen = val.show;
    },
    /**
     * item选中
     */
    changeCheck(val) {
      console.log('tag', val);
      if (val.change) {
        this.checkedList.push(val.item);
      } else {
        let arr = this.checkedList.filter((ele) => {
          return ele !== val.item;
        });
        this.checkedList = arr;
      }
    },
    /**
     * 更换加盟经理
     */
    changeManager(val) {
      if (val.value === 0) {
        this.checked = val.show;
      } else if (val.value === 1) {
        this.exportDrive()
      }
    },
    exportDrive() {
      if (this.allTotal >= 3000) { return this.$toast.fail('当前导出数据超过3000条！') }
      let params = {
        page: 1,
        limit: 9999
      }
      params.key = this.keyWord
      this.$router.replace({
        name: 'driverExport',
        params: { rlueFrom: params, allTotal: this.allTotal, menu: isPermission(this.exportBtn) }
      })
    },
    /**
     * 取消选择加盟经理
     */
    cancelManager() {
      this.checked = false;
      this.checkedList = [];
    },
    changeOver() {
      this.checked = false;
    },
    /**
     * 选则加盟经理
     */
    confirmManager() {
      if (this.checkedList.length === 0) {
        return Notify({
          type: 'warning',
          message: '请选择新的加盟经理',
          duration: 2000
        });
      } else {
        this.changeManagerStatus = true
      }
    },
    deleteBtn() {
      Dialog.confirm({
        title: '提示',
        message: '确认删除全部历史记录？'
      })
        .then(() => {
          // on confirm
          this.historyItems = []
          window.localStorage.removeItem('driver');
        })
        .catch(() => {
          // on cancel
        });
    },
    // 搜索
    onSearch() {
      if (!validatorValue(this.keyWord)) {
        Notify({ type: 'warning', message: '请输入6位及以上数字或2位及以上非纯数字' });
        return
      }

      if (!this.keyWord) {
        return false;
      }
      this.getLists(this.keyWord)
    },
    // 取消
    onCancel() {
      this.keyWord = '';
      this.lists = [];
    },
    handleItemClick(value) {
      this.keyWord = value;
      this.getLists(this.keyWord)
    },
    async getLists(keyword = '') {
      try {
        let params = {
          page: 1,
          limit: 9999
        }
        keyword && (params.key = keyword)
        this.$loading(true)
        let { data: res } = await getDriverList(params);
        if (res.success) {
          this.lists = res.data
          this.allTotal = res.page.total
          if (keyword) {
            this.setHistory(keyword)
          }
        } else {
          this.$toast.fail(res.errorMsg)
        }
      } catch (err) {
        console.log(`fail:${err}`)
      } finally {
        this.$loading(false)
      }
    },
    // 存localStorage
    setHistory(keyword) {
      let index = this.historyItems.findIndex(item => item === keyword)
      if (index > -1) {
        this.historyItems.splice(index, 1)
      }

      this.historyItems.unshift(keyword)
      const len = this.historyItems.length
      if (len > 5) {
        // this.historyItems.shift()
        this.historyItems.splice(len - 1)
      }
      localStorage.setItem('driver', JSON.stringify(this.historyItems))
    },
    // 获取从localStorage
    getHistory() {
      let history = localStorage.getItem('driver')
      if (history) {
        return history
      }
    }
  }
};
</script>
<style lang='less' scoped>
.driverSearch {
  .list {
    // padding: 5px 15px 0 15px;
    box-sizing: border-box;
  }
  .bottomBtn {
    padding: 10px 15px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: @body-bg;
  }
  .checkAll {
    padding: 5px 15px 7px 15px;
    box-sizing: border-box;
    font-size: 13px;
    color: #7f8fbd;
    letter-spacing: 0;
    text-align: center;
    z-index: 2;
    background-color: @body-bg;
  }
  font-family: PingFangSC-Regular;
  .lineHeight {
    background: #f9f9f9;
    height: 10px;
    width: 100%;
  }
  .history {
    padding: 10px 12px;
    h4 {
      margin: 0px;
      font-size: 15px;
      color: #838a9d;
    }
    .historyBox{
      display: flex;
      justify-content:space-between;
      align-items: center;
    }
    .historyContainer {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .item {
        margin-right: 5px;
        margin-top: 7.5px;
        padding: 4px 17px;
        background: #f6f7f9;
        border-radius: 3px;
        font-size: 13px;
        color: #838a9d;
      }
    }
  }
}
.padd {
  padding-bottom: 45px;
  box-sizing: border-box;
}
</style>

<style scoped>
.driverSearch >>> .van-hairline--top::after {
  border-color: #649cee;
}
.driverSearch >>> .van-search__content {
  display: flex;
  flex-direction: column-reverse;
}
.driverSearch >>> .van-search {
  display: flex;
  align-items: flex-start;
}
</style>

