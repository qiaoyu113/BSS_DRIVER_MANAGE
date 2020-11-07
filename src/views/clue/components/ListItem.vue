<template>
  <div class="ListItem" @click="checkChange">
    <van-checkbox v-if="checked" v-model="check" class="checked" shape="square" checked-color="#7F8FBD"></van-checkbox>
    <div class="itemBox">
      <van-cell>
        <template #title>
          <div class="title">
            <a
              v-if="item.phone"
              class="phone"
              :href="'tel:' + item.phone"
              @click.stop
            >
              <span>{{ item.name }}</span>
              <span>{{ item.phone }}</span>
            </a>
            <template v-else>
              <span>{{ item.name }}</span>
              <span>{{ item.phone }}</span>
            </template>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <div class="itemStatus">
            {{ item.statusName }}
          </div>
        </template>
      </van-cell>
      <div class="itemInfo">
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          :value="removeEmpty([item.busiTypeName,item.workCityName,item.carTypeName])"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          :title="setLabel(item.gmDutyName) + '：'"
          :value="removeEmpty([item.gmName,item.gmMobile])"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="创建时间："
          :value="item.createDate | parseTime"
        />
      </div>
      <div class="detailBtn">
        <van-button round plain size="small" class="routeBtn" @click.stop="goRouter">
          详情
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    checked: {
      type: Boolean,
      default: false
    },
    checkall: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      check: false
    }
  },
  watch: {
    checkall(val) {
      let status = false;
      val.map(ele => {
        if (ele === this.item.clueId) {
          status = true
        }
        return
      })
      this.check = status
    }
  },
  mounted() {
    // console.log(this.obj)
  },
  methods: {
    removeEmpty(arr) {
      return (arr.filter(item => item) || []).join('/')
    },
    setLabel(val) {
      if (val.includes('加盟')) {
        return val.substr(2)
      }
      return val
    },
    checkChange() {
      if (this.checked) {
        this.$emit('changeCheck', { change: !this.check, item: this.item.clueId })
        this.check = !this.check
      } else {
        this.$router.push({ path: '/cluedetail', query: { id: this.item.clueId }})
      }
    },
    goRouter() {
      this.$router.push({ path: '/cluedetail', query: { id: this.item.clueId }})
    }
  }
};
</script>

<style lang="less" scoped>
@import './CuleItem.less';
.ListItem {
  display: flex;
  align-items: center;
  .phone{
    color: #3C4353;
  }
  .checked{
    margin-right: 10px;
  }
  .detailBtn{
    text-align: center;
    .routeBtn{
      margin: 5px 0;
      width: 70px;
      height: 25px;
    }
  }
}
</style>
