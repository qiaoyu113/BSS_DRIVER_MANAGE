<template>
  <div class="DriverLog">
    <van-sticky :offset-top="0">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </van-sticky>
    <div class="logBox">
      <div class="datePicker">
        <div class="dateText" @click="showDate = true">
          <span>{{ timeText }}</span>
          <van-icon name="arrow-down" />
        </div>
      </div>
      <p class="tableName">
        操作人：李相赫（18848885135）
      </p>
      <div class="tableBox">
        <van-grid :column-num="3">
          <van-grid-item>
            <span>字段名称</span>
          </van-grid-item>
          <van-grid-item>
            <span>现信息</span>
          </van-grid-item>
          <van-grid-item>
            <span>{{ timeText }}</span>
          </van-grid-item>
          <template v-for="(item,index) in tableList">
            <van-grid-item :key="item.name + index">
              <span>字段名称</span>
            </van-grid-item>
            <van-grid-item :key="item.info + index">
              <span>现信息</span>
            </van-grid-item>
            <van-grid-item :key="item.time + index">
              <span>2020/08/24 10:03:25</span>
            </van-grid-item>
          </template>
        </van-grid>
      </div>
    </div>

    <van-popup
      v-model="showDate"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="timeList"
        @cancel="showDate = false"
        @confirm="onConfirmPicker"
      />
    </van-popup>
  </div>
</template>
<script>
import { getOperateTime, historyList } from '@/api/driver.js';
export default {
  data() {
    return {
      showTime: '',
      showDate: false,
      timeList: [],
      tableList: [
        {
          name: 'lll',
          info: 'sss',
          time: 123
        },
        {
          name: 'lll',
          info: 'sss',
          time: 123
        },
        {
          name: 'lll',
          info: 'sss',
          time: 123
        }
      ]
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
    // timeText(val) {
    //   return val.parseTime('{y}-{m}-{d}')
    // }
  },
  mounted() {
    this.getTimeList();
  },
  methods: {
    async getTimeList(id) {
      try {
        this.$loading(true);
        let { data: res } = await getOperateTime();
        if (res.success) {
          this.timeList = res.data;
          if (res.data.length > 0) {
            this.showTime = res.data[0];
            // this.timeText = res.data[0].parseTime('{y}-{m}-{d}')
          }
          console.log(res.data);
        } else {
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        console.log(`fail:${err}`);
      } finally {
        this.$loading(false);
      }
    },
    // async historyList(id) {
    //   try {
    //     this.$loading(true);
    //     let { data: res } = await getOperateTime();
    //     if (res.success) {
    //       this.timeList = res.data;
    //       if (res.data.length > 0) {
    //         this.showTime = res.data[0];
    //         // this.timeText = res.data[0].parseTime('{y}-{m}-{d}')
    //       }
    //       console.log(res.data);
    //     } else {
    //       this.$toast.fail(res.errorMsg);
    //     }
    //   } catch (err) {
    //     console.log(`fail:${err}`);
    //   } finally {
    //     this.$loading(false);
    //   }
    // },
    onConfirmPicker(val) {
      this.showTime = val;
      this.showDate = false;
    }
  }
};
</script>
<style lang="less" scoped>
.DriverLog {
  .logBox {
    padding: 10px 15px;
    box-sizing: border-box;
    .tableName {
      font-size: 14px;
      color: #3c4353;
      letter-spacing: 0;
      margin-bottom: 10px;
    }
    .tableBox {
      border: 1px solid #c8c9cc;
      // border-right: 1px solid #c8c9cc;
      border-width: 0 0 0px 1px;
      text-align: center;
    }
  }
  .datePicker {
    display: flex;
    align-items: center;
    justify-content: center;
    .dateText {
      background: #eaeff9;
      border-radius: 12.5px;
      font-size: 12px;
      color: #7f8fbd;
      letter-spacing: 0;
      text-align: center;
      padding: 4px 13px 4px 27px;
      display: flex;
      align-items: center;
      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
