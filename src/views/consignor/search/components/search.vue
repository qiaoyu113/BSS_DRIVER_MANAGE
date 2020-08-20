<template>
  <div class="searchContainer">
    <van-search
      v-model="form.key"
      placeholder="请输入货主名称"
      background="#F2F2F2"
      @input="onSearch"
      @search="onSearch"
      @clear="onClear"
      @focus="onFocus"
      @blur="onBlur"
    >
    </van-search>
    <dl v-show="isShow" v-if="historyLists.length > 0" class="history">
      <dt>历史搜索</dt>
      <dd v-for="item in historyLists" :key="item.customerId" @click="handleItemClick(item)">
        {{ item.customerName }}
      </dd>
    </dl>
  </div>
</template>

<script>
import { Search } from 'vant';
import { debounce } from '@/utils/index'
export default {
  components: {
    [Search.name]: Search
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    historyLists: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    this.$parent.$refs.list.addEventListener('scroll', this.onBlur, false)
  },
  beforeDestroy() {
    this.$parent.$refs.list.removeEventListener('scroll', this.onBlur, false)
  },
  methods: {
    /**
     * 搜索
     */
    onSearch: debounce(function() {
      if (!this.form.key) {
        this.$emit('clear')
        return false
      }
      this.$emit('search', { customerName: this.form.key })
    }, 500),
    /**
     * 清除
     */
    onClear() {
      this.form.key = ''
      this.$emit('clear')
    },
    onFocus() {
      this.isShow = true
    },
    onBlur() {
      this.isShow = false
    },
    handleItemClick(item) {
      this.form.key = item.customerName
      this.$emit('search', item)
    }
  }
}

</script>

<style lang='scss' scoped>
.searchContainer {
  position: relative;
  .history {
    margin: 0px 10px;
    position: absolute;
    left: 2px;
    top: 44px;
    width: 351px;
    background: #ffffff;
    box-shadow: 0 2px 24px 0 rgba(0,0,0,0.20);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    z-index: 10;
    &:before {
      margin-left:10px;
      display: block;
      content:'';
      width: 331px;
      border-top:1px solid #5C9BDD;
    }
    dt {
      margin: 10px;
      font-size:14px;
      color:#686F75;
      font-weight: bold;
    }
    dd {
      margin-left: 0px;
      padding: 0px 20px;
      width: calc(100% - 40px);
      text-overflow:ellipsis;
      overflow: hidden;
      white-space: nowrap;
      height:30px;
      line-height: 30px;
      color:#94999D;
      font-size:14px;

    }
  }
}

</style>

<style scoped>
  .searchContainer >>> .van-search__content {
    background: #ffffff;
  }

</style>

