<template>
  <div :style="{backgroundColor:lists.length > 0 ? '#F9F9F9' : ''}" :class="checked ? 'ClueSearch padd' : 'ClueSearch'">
    <!-- nav-bar -->
    <ClueTitle
      :show-change="checkCan"
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
          v-model="keyWord"
          show-action
          placeholder="请输入搜索关键词"
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
              更换归属人
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
import { getClueList } from '@/api/clue.js'
import ClueTitle from './components/ClueTitle';
import CardItem from './components/ListItem';
import changeManager from './components/ChangeManager'
import { Notify, Dialog } from 'vant';
export default {
  components: {
    CardItem,
    ClueTitle,
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
      checked: false
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
        if (val) {
          this.checkedList = [];
          this.lists.map((ele) => {
            this.checkedList.push(ele.clueId);
          });
        } else {
          this.checkedList = [];
        }
      }
    },
    checkCan() {
      return this.lists.length > 0;
    }
  },
  mounted() {
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
      // this.$nextTick(() => {
      this.checked = val.show;
      // })
      console.log(this.checked, 'check');
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
          message: '请选择线索',
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
          window.localStorage.removeItem('clue');
        })
        .catch(() => {
          // on cancel
        });
    },
    // 搜索
    onSearch() {
      if (!this.keyWord) {
        return false;
      }

      console.log(this.keyWord);
      // if (this.keyWord === 'd') {
      //   this.options = ['京东', '京东12121', '京东121212ddasddasd'];
      this.getLists(this.keyWord)
    },
    // 取消
    onCancel() {
      this.keyWord = '';
      this.lists = [];
    },
    handleItemClick(value) {
      this.keyWord = value;
    },
    async getLists(keyword = '') {
      try {
        let params = {
          page: 1,
          limit: 9999
        }
        keyword && (params.key = keyword)
        this.$loading(true)
        let { data: res } = await getClueList(params);
        if (res.success) {
          this.lists = res.data
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

      if (this.historyItems.length >= 5) {
        this.historyItems.shift()
      }
      this.historyItems.push(keyword)
      localStorage.setItem('clue', JSON.stringify(this.historyItems))
    },
    // 获取从localStorage
    getHistory() {
      let history = localStorage.getItem('clue')
      if (history) {
        return history
      }
    }
  }
};
</script>
<style lang='less' scoped>
.ClueSearch {
  .list {
    padding: 5px 15px 0 15px;
    box-sizing: border-box;
  }
  .bottomBtn {
    padding: 10px 0;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100vw - 30px);
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
.ClueSearch >>> .van-hairline--top::after {
  border-color: #649cee;
}
.ClueSearch >>> .van-search__content {
  display: flex;
  flex-direction: column-reverse;
}
.ClueSearch >>> .van-search {
  display: flex;
  align-items: flex-start;
}
</style>

