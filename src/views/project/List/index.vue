<template>
  <div class="projectListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="项目管理" left-text="返回" left-arrow @click-left="onClickLeft" />
      <!-- 搜索 -->
      <van-search show-action placeholder="项目名称/项目编号/项目联系人手机号搜索" readonly @click="handleSearchClick">
        <template #action>
          <div class="searchSelect" @click="show=true">
            筛选
            <van-icon name="play" color="#3C4353" />
          </div>
        </template>
      </van-search>
    </van-sticky>

    <!-- 下拉刷新  上拉加载 -->
    <van-pull-refresh v-model="refreshing" @refresh="onLoad(true)">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- tabs -->
        <van-tabs v-model="active" swipeable>
          <van-tab v-for="item in tabArrs" :key="item.text">
            <template #title>
              {{ item.text }}
              <div v-if="item.num" class="van-info">
                {{ item.num }}
              </div>
            </template>
            <div v-for="sub in lists" :key="sub.id">
              <CardItem :obj="sub" />
              <div class="lineHeight"></div>
            </div>
          </van-tab>
        </van-tabs>
      </van-list>
    </van-pull-refresh>

    <!-- 右侧筛选抽屉 -->
    <SelfPopup
      ref="lineLineForm"
      :show.sync="show"
      form-ref="form"
      @submit="onQuery"
      @reset="onReset"
    >
      <van-field
        label-width="100"
        :value="pickerNames['a']"
        readonly
        clickable
        label="收货点类型"
        placeholder="请选择"
        @click="showPickerFn('a')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['b']"
        readonly
        clickable
        label="配送经验"
        placeholder="请选择"
        @click="showPickerFn('b')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['c']"
        readonly
        clickable
        label="是否需要回单"
        placeholder="请选择"
        @click="showPickerFn('c')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['d']"
        readonly
        clickable
        label="上岗经理"
        placeholder="请选择"
        @click="handleShowModal('manager')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['e']"
        readonly
        clickable
        label="外线销售"
        placeholder="请选择"
        @click="handleShowModal('sell')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['date']"
        readonly
        clickable
        label="创建时间"
        placeholder="开始日期"
        :min-date="minDate"
        @click="showPickerFn('date')"
      />
    </SelfPopup>
    <van-popup v-model="showPicker" position="bottom">
      <template v-if="isDateRange">
        <!-- 选择日期区间 -->
        <van-calendar v-model="showPicker" type="range" @confirm="onConfirm" />
      </template>
      <template v-else>
        <!-- picker选择器 -->
        <van-picker
          value-key="label"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </template>
    </van-popup>

    <Suggest
      v-model="showModal"
      :options="options"
      :type="modalKey"
      @keyWordValue="handleSearchChange"
      @finish="handleValueClick"
      @closed="showModal=false"
    />
  </div>
</template>

<script>
import CardItem from './components/CardItem'
import SelfPopup from '@/components/SelfPopup';
import Suggest from '@/components/SuggestSearch.vue'
export default {
  components: {
    CardItem,
    SelfPopup,
    Suggest
  },
  data() {
    return {
      show: false, // 打开查询抽屉
      refreshing: false, // 下拉刷新
      loading: false, // 上拉加载
      finished: false, // 是否加载完成
      active: '', // 当前激活的tab,
      tabArrs: [ // tabs数组
        {
          text: '全部',
          num: 100
        },
        {
          text: '已启用',
          num: 0
        },
        {
          text: '已禁用',
          num: 0
        }
      ],
      lists: [],

      form: { // 查询表单
        date: ''
      },
      columns1: [
        {
          label: '仓库',
          value: 1
        },
        {
          label: '门店',
          value: 2
        },
        {
          label: '宅配',
          value: 3
        },
        {
          label: '指定位置',
          value: 4
        },
        {
          label: '无人货架',
          value: 5
        }
      ],
      columns2: [
        {
          label: '有需求',
          value: 1
        },
        {
          label: '无需求',
          value: 0
        }
      ],
      columns3: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ],
      showModal: false,
      options: [],
      modalKey: '',
      pickerNames: { // picker选中显示的名字
        city: '',
        b: '',
        c: '',
        startDate: '',
        endDate: ''
      },
      pickerKey: '', // 显示picker的key
      columns: [], // picker的列表
      showPicker: false, // 是否打开picker
      dateLists: ['date'] // 显示日历区间控件
    }
  },
  computed: {
    minDate() {
      if (this.form.r) {
        return new Date(this.form.r)
      }
      return new Date()
    },
    isDateRange() {
      return this.dateLists.includes(this.pickerKey)
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onLoad(isInit = false) {
      if (isInit === true) {
        this.lists = []
      }
      setTimeout(() => {
        console.log('xxxx')
        let id = this.lists.length
        for (let i = 0; i < 5; i++) {
          let obj = {
            id: id + i,
            title: '京东城配线(xs200808)',
            contacts: '小小悠',
            phone: '15021578693',
            carType: '小面',
            warehouseName: '近的顺义仓',
            lineCount: 20,
            worktime: '10小时',
            tag: i % 2 === 0 ? '已启用' : '已禁用'
          }
          this.lists.push(obj)
        }
        if (isInit === true) {
          this.refreshing = false
          this.finished = false
        }

        this.loading = false;
        if (this.lists.length > 15) {
          this.finished = true
        }
      }, 500)
    },
    // 搜索
    handleSearchClick() {
      this.$router.push({
        path: '/projectSearch'
      })
    },
    // 查询
    onQuery() {
      console.log('submit', this.form);
    },
    // 重置
    onReset(form) {
      this.form = {}
      this.pickerNames = {}
      console.log('reset');
    },
    // 模糊搜索
    handleSearchChange(value) {
      console.log('这里面接口请求模糊查询:', value)
    },
    /**
     *点击某一项
     */
    handleValueClick(obj) {
      console.log('xxx:', obj)
    },
    // 打开模糊查询框
    handleShowModal(key) {
      this.modalKey = key
      if (key === 'city') {
        this.options = []
      }
      this.showModal = true
    },
    // 显示picker
    showPickerFn(key) {
      this.columns = []
      this.pickerKey = key;
      if (key === 'a') {
        this.columns.push(...this.columns1);
      } else if (key === 'b') {
        this.columns.push(...this.columns2);
      } else if (key === 'c') {
        this.columns.push(...this.columns3);
      }
      this.showPicker = true;
    },
    // picker选择器
    onConfirm(obj) {
      // 如果是日期选择器
      if (this.isDateRange) {
        if (obj.length === 2) {
          let startName = `${obj[0].getMonth() + 1}/${obj[0].getDate()}`;
          let endName = `${obj[1].getMonth() + 1}/${obj[1].getDate()}`;
          this.pickerNames[this.pickerKey] = `${startName}-${endName}`
        }
      } else {
        this.pickerNames[this.pickerKey] = obj.label
      }
      this.form[this.pickerKey] = obj
      this.showPicker = false;
    }
  }
}

</script>

<style lang='scss' scoped>
.projectListContainer {
  font-family: PingFangSC-Medium;
  .headerRight {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #FFFFFF;
    i {
      margin-left:5px;
    }
  }
  .searchSelect {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #3C4353;
    i {
      transform: rotate(90deg);
    }
  }
  .lineHeight {
    background: #F9F9F9;
    height:10px;
    width:100%;
  }
}

</style>

<style scoped>
  .projectListContainer >>> .van-tab__text {
    font-size: 12px;
    color: #3C4353;
  }
</style>
