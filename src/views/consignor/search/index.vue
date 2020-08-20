<template>
  <div class="consignorSearch">
    <search :form="listQuery" :history-lists="historyLists" @search="handleSearchClick" @clear="handleClearClick" />
    <div ref="list" class="list">
      <ul v-if="lists.length > 0">
        <li v-for="(item,idx) in lists" :key="item.id">
          <Item :obj="item" :index="idx" @clickItem="handleItemClick(item)" />
        </li>
      </ul>
      <div v-else class="noData">
        <img src="./imgs/search.png">
        <div class="text">
          抱歉,未找到相关数据!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from './components/search'
import Item from '../components/item'
import { searchCustomerByKeyword, getSaleLine } from '@/api/consignor'
import { getUserInfo } from '@/api/common'
import { Toast } from 'vant'
export default {
  components: {
    Search,
    Item,
    [Toast.name]: Toast
  },
  data() {
    return {
      lists: [],
      listQuery: {
        key: ''
      },
      historyLists: [],
      lineSaleId: '',
      citys: []
    }
  },
  activated() {
    this.getSaleLine()
    this.getCity()
    let str = localStorage.getItem('historyKeyWord')
    if (str) {
      this.historyLists = JSON.parse(str)
    }
  },
  beforeRouteLeave(to, from, next) {
    this.listQuery.key = ''
    this.lists = []
    next()
  },
  methods: {
    async getCity() {
      try {
        let { data: res } = await getUserInfo()
        if (res.success) {
          this.citys = res.data.onlineCityList.map(item => +item.value)
        }
      } catch (err) {
        Toast.fail(err)
      }
    },
    async getSaleLine() {
      const toast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      try {
        let { data: res } = await getSaleLine()
        toast.clear()
        if (res.success && res.data.length === 1) {
          this.lineSaleId = res.data[0].userId
        }
      } catch (err) {
        toast.clear()
        if (err) {
          Toast.fail(err)
        }
      }
    },
    /**
     * 根据关键字获取列表
     */
    async handleSearchClick(obj = {}) {
      const toast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      try {
        obj.citys = this.citys
        if (this.lineSaleId) {
          obj.lineSaleId = this.lineSaleId
        }
        let { data: res } = await searchCustomerByKeyword(obj)
        toast.clear()
        if (res.success) {
          this.lists = res.data
        } else {
          Toast.fail(res.errorMsg || res.msg)
        }
      } catch (err) {
        toast.clear()
        if (err) {
          Toast.fail(err)
        }
      }
    },
    handleClearClick() {
      this.listQuery.key = ''
    },
    /**
     * 往历史记录添加关键字
     */
    handleItemClick(obj) {
      let index = this.historyLists.findIndex(item => item.customerId === obj.customerId)
      if (index > -1) {
        this.historyLists.splice(index, 1)
      }
      this.historyLists.unshift({
        customerId: obj.customerId,
        customerName: obj.customerName
      })

      if (this.historyLists.length > 5) {
        this.historyLists = this.historyLists.slice(0, 5)
      }
      localStorage.setItem('historyKeyWord', JSON.stringify(this.historyLists))
    }
  }
}

</script>

<style lang='scss' scoped>
.consignorSearch {
  .noData {
    margin-top:41.5px;
    text-align: center;
    .text {
      margin-top: 15px;
      font-size: 15px;
      color: #656565;
      text-align: center;
    }
    img {
      width: 83px;
      height:74px;
    }
  }
  .list {
    height:calc(100vh - 54px);
    overflow-y: auto;
  }
}

</style>
