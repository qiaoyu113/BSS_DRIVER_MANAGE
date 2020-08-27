<template>
  <div class="SuggestContainer">
    <van-popup
      v-bind="$attrs"
      round
      position="bottom"
      :style="{ height: '90%',width: '100%' }"
    >
      <van-search
        v-model="keyWord"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
        @input="onSearch"
      ></van-search>
      <div>
        <van-cell v-for="item in options" :key="item[props.value]" @click="handleItemClick(item)">
          {{ item[props.label] }}
        </van-cell>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { debounce } from '@/utils/index'
export default {
  props: {
    options: {
      required: true,
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default: () => ({
        value: 'value',
        label: 'label'
      })
    }
  },
  data() {
    return {
      keyWord: ''
    }
  },
  methods: {
    onSearch: debounce(function() {
      if (!this.keyWord) {
        return false
      }
      this.$emit('keyWordValue', this.keyWord)
    }, 200),

    onCancel() {
      this.closed()
    },
    handleItemClick(item) {
      if (this.type) {
        item.type = this.type
      }
      this.$emit('finish', item)
      this.closed()
    },
    closed() {
      this.keyWord = ''
      this.$emit('closed')
    }
  }
}

</script>

<style lang='scss' module>
.SuggestContainer {

}

</style>
