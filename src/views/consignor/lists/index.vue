<template>
  <div class="consignorLists">
    <search />
    <section class="item-list">
      <vo-pages
        :data="lists"
        :loaded-all="loadedAll"
        :no-data-hint="false"
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
      >
        <ul class="consignor-list">
          <li v-for="item in lists" :key="item.id">
            <list-item :obj="item">
            </list-item>
          </li>
        </ul>
      </vo-pages>
    </section>
  </div>
</template>

<script>
import { Toast } from 'vant'
import Search from './components/search'
import listItem from '../components/item'
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
import { fetchList, getSaleLine } from '@/api/consignor'
import { getUserInfo } from '@/api/common'
export default {
  components: {
    [Toast.name]: Toast,
    Search,
    listItem,
    VoPages
  },
  data() {
    return {
      lists: [],
      beforePullDown: false,
      loadedAll: false,
      listQuery: {
        page: 1,
        limit: 50
      },
      toast: '',
      lineSaleId: '',
      citys: []
    }
  },
  async activated() {
    this.toast = Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    });
    try {
      await this.getBaseData()
      await this.getLists(false)
      this.toast.clear()
    } catch (err) {
      this.toast.clear()
    }
  },
  methods: {
    async getBaseData() {
      try {
        let requestArr = [getSaleLine(), getUserInfo()]
        let res = await Promise.all(requestArr)
        if (res.length === requestArr.length) {
          if (res[0].data.data.length === 1) {
            this.lineSaleId = res[0].data.data[0].userId
          }
          this.citys = res[1].data.data.onlineCityList.map(item => +item.value)
        } else {
          this.toast.clear()
        }
      } catch (err) {
        this.toast.clear()
      }
    },

    /**
     * 获取列表
     */
    async getLists(loadMore = true) {
      try {
        this.listQuery.citys = this.citys
        if (this.lineSaleId) {
          this.listQuery.lineSaleId = this.lineSaleId
        } else {
          this.listQuery.lineSaleId = null
        }
        let { data: res } = await fetchList(this.listQuery)
        if (res.success) {
          this.listQuery.total = res.page.total
          const newList = res.data
          if (loadMore) {
            this.lists = this.lists.concat(newList)
          } else {
            this.lists = newList
          }
          if (!this.beforePullDown) {
            this.beforePullDown = true
          }
          this.loadedAll = this.listQuery.total <= this.lists.length
        } else {
          this.toast.clear()
          Toast.fail(res.errorMsg || res.msg)
        }
      } catch (err) {
        this.toast.clear()
        Toast.fail(err)
      }
    },
    /**
     * 下拉刷新
     */
    pullingDown() {
      this.beforePullDown = false
      this.listQuery.page = 1
      this.listQuery.total = 0
      this.getLists(false)
    },
    /**
     * 上拉加载更多
     */
    pullingUp() {
      this.listQuery.page += 1
      this.getLists()
    }
  }
}

</script>

<style lang='scss' scoped>

.consignorLists {
  .item-list {
    height: calc(100vh - 50px);
    padding-bottom: 50px;
    box-sizing: border-box;
    overflow: hidden;
    .consignor-list {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding: 15px 0px;
    }
  }
}

</style>
