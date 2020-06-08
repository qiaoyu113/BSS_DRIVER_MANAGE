<template>
  <div class="scoreData">
    <div class="menu-lt">
      <el-scrollbar>
        <el-menu
          :collapse="isCollapse"
          class="el-menu-vertical"
          @select="handleSelect2"
        >
          <el-menu-item v-for="item in list" :index="`${item.examId}-${item.status}`" :key="item.examId">
            <div class="list">
              <div class="left">{{ item.examDate.split("-")[1]+'月' }}</div>
              <div v-if="!isCollapse" class="center">总部职能赋能打分</div>
              <div v-if="!isCollapse" class="right">{{ item.status | status }}</div>
            </div>
            <span v-if="isCollapse" slot="title">{{ item.status | status }}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
      <div class="menu-icon">
        <i :class="`el-icon-${isCollapse ? 'right' : 'back'}`" @click="isCollapse = !isCollapse"></i>
      </div>
    </div>

    <el-scrollbar
      v-if="rightData.status !== ''"
      :class="isCollapse ? 'body-rt margin-lt' : 'body-rt'"
    >
      <div v-if="rightData.status ==='3'">
        <el-menu
          :default-active="activeIndex"
          class="el-menu"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">全景视角</el-menu-item>
          <el-menu-item index="2">城市视角</el-menu-item>
          <el-menu-item index="3">赋能视角</el-menu-item>
        </el-menu>
        <div class="hr20"></div>
        <All
          v-if="activeIndex === '1'"
          :city-list="cityList"
          :exam-id="rightData.id"
          :title-list="titleList"
          :item-list="itemList"
          @setCity="setCity"
          @setItem="setItem"
        />
        <City
          v-if="activeIndex === '2'"
          :exam-id="rightData.id"
          :city-list="cityList"
          :city.sync="city"
          :title-list="titleList"
        />
        <Enable
          v-if="activeIndex === '3'"
          :exam-id="rightData.id"
          :city-list="cityList"
          :item-list="itemList"
          :item.sync="item"
          :title-list="titleList"
        />
      </div>
      <div v-else class="start-ct">
        <el-button v-if="rightData.status ==='1'" class="start-btn" type="primary" @click="start">开始打分</el-button>
        <el-button v-else class="start-btn" type="primary" disabled>{{ btnText }}</el-button>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import All from './components/all.vue';
import City from './components/city.vue';
import Enable from './components/enable.vue';
import { getMonthList, startScore, getTitleList, getItemList } from '@/api/score/score-api';
import { dictionary } from '@/api/common'

export default {
  name: 'ScoreData',
  components: { All, City, Enable },
  filters: {
    status(val) {
      // 1:未开始 2：进行中 3：已结束
      const obj = {
        '1': '未开始',
        '2': '进行中',
        '3': '查看数据'
      }
      return obj[val] || ''
    }
  },
  data() {
    return {
      activeIndex: '1',
      list: [],
      isCollapse: false,
      rightData: {
        id: '',
        status: ''
      },
      cityList: [],
      titleList: [],
      itemList: [],
      // 城市视角
      city: '',
      // 赋能视角
      item: '',
      btnText: '打分进行中' // 剩余时间状态（1 2 3 -1）
    };
  },
  mounted() {
    this.fetchData();
    this.getMonthList();
  },
  methods: {
    setCity(val) {
      this.city = val;
      this.activeIndex = '2';
    },
    setItem(val) {
      this.item = val;
      this.activeIndex = '3';
    },
    getMonthList() {
      getMonthList()
        .then(({ data }) => {
          if (data.success) {
            this.list = data.data;
            const item = this.list.find(item => item.examId === this.rightData.id);
            if (item) {
              this.rightData.status = String(item.status);
            }
          } else {
            this.$message.error(data.errorMsg);
          }
        }).catch((err) => {
          this.$message.error(err);
        });
    },
    handleSelect(key) {
      this.activeIndex = key;
    },
    handleSelect2(key) {
      const [id, status] = key.split('-');
      this.rightData = {
        id, status
      }
      // if (status === '2') {
      //   // 打分进行中
      //   this.getClock();
      // }
    },
    fetchData() {
      // 工作城市
      dictionary({
        dictType: 'online_city'
      }).then(res => {
        this.cityList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      });
      // 获取职务
      getTitleList()
        .then(res => {
          this.titleList = res.data.data;
        }).catch(err => {
          this.$message.error(err);
        });
      // 获取打分项
      getItemList()
        .then(res => {
          this.itemList = res.data.data;
        }).catch(err => {
          this.$message.error(err);
        });
    },
    // 开始答题
    start() {
      this.$alert('确认开始打分？', '提示', {
        confirmButtonText: '确定',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '提交中...';
            startScore({
              'examId': this.rightData.id
            })
              .then(({ data }) => {
                if (data.data) {
                  this.$message.success('打分已开始！');
                  this.getMonthList();
                  done();
                } else {
                  this.$message.error(data.errorMsg || '请求错误')
                }
              })
              .catch(() => {})
              .finally(() => {
                instance.confirmButtonText = '确定';
                instance.confirmButtonLoading = false;
              })
          } else {
            done();
          }
        }
      }).then(action => {})
        .catch(() => {})
    }
  }
};
</script>
<style lang="scss">
.menuBox{
  line-height: 20px;
  margin-top: 20px;
}

.el-table{
  .total-row{
    background: #ebeef3;
  }
  th.table-header{
    background-color: #dceaf2;
  }
  tr.table-striped{
    background-color: #f9f9f9;
  }
}
.tip{
  position: relative;
  padding-left: 20px;
  margin: 15px 0;
  font-size: 16px;
  color: #333;
  font-weight: bold;
  &::before{
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -5px;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: rgb(240, 149, 84);
  }
}
.canvas-bar{
  width: 100%;
  height: 600px;
}
.canvas-pic{
  width: 100%;
  height: 400px;
}
.no-data{
  line-height: 60px;
  color: #909399;
  text-align: center;
}
</style>
<style lang="scss" scoped>
.scoreData {
  background: rgb(242, 242, 242);
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  position: relative;
  display: flex;
  min-height: calc(100vh - 50px);
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 400px;
  }
  .el-menu-vertical {
    .el-menu-item {
      padding-right: 0;
      &:hover,
      &:focus {
        outline: none;
        background-color: initial;
      }
    }
  }
  .is-active {
    .left {
      color: #f09554;
    }
  }
  .menu-lt {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    height: calc(100vh - 50px);
    background-color: #f2f2f2;
    margin-right: 16px;
    overflow: hidden;
    background: #FFF6F2;
    .el-scrollbar{
      height: calc(100vh - 50px);
    }
    .el-menu{
      border-right: none!important;
      background: #FFF6F2;
    }
    .menu-icon{
      position: absolute;
      bottom: 40px;
      right: 14px;
      i{
        width: 36px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 20px;
        border-radius: 50%;
        background-color: #fff;
        cursor: pointer;
        &:hover {
          color: #f09554;
        }
      }
    }
    .el-menu-item{
      padding-left: 0!important;
      &.is-active{
        background: #FBE7DB;
      }
    }
    /deep/ .el-tooltip{
      padding: 0!important;
      .left{
        left: 50%!important;
        top: 50%!important;
        margin-top: -12px;
        margin-left: -18px;
      }
    }
    .list{
      position: relative;
      display: flex;
      height: 100%;
      border-bottom: 1px solid #FCDDCB;
      .left{
        position: absolute;
        left: 0;
        top: 5px;
        width: 30px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: #D8804E;
        font-size: 12px;
        color: #FFFFFF;
        &:before {
          content:"";
          position: absolute;
          right: -6px;
          top: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 12px 0 12px 6px;
          border-color: transparent transparent transparent #D8804E;
        }
      }
      .center {
        flex: 1;
        padding-left: 40px;
        font-size: 16px;
        color: #656565;
      }
      .right{
        padding-right: 30px;
        font-size: 12px;
        color: #D8804E;
      }
    }
  }
  .body-rt {
    margin: 20px 20px 20px 416px;
    height: calc(100vh - 90px);
    flex: 1;
    overflow: hidden;
    transition: 0.3s;
    position: relative;
    background: #fff;
    &.margin-lt{
      margin: 20px 20px 20px 84px;
    }
    .hr20{
      height: 20px;
      background: rgb(242, 242, 242);
    }
    .el-menu{
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
    }
  }
  .el-scrollbar__view{
    position: relative;
  }
  .start-ct{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color:#fff;
    text-align: center;
  }
  .start-btn{
    margin: 50px auto;
  }

}
</style>
