<template>
  <div class="lineListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="线路管理" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="headerRight" @click="showPickerFn('selectLine')">
            新建
            <van-icon name="add-o" />
          </div>
        </template>
      </van-nav-bar>
      <!-- 搜索 -->
      <van-search show-action placeholder="请输入线路名称/线路编号" readonly @click="handleSearchClick">
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
        label="线路类型"
        placeholder="请选择"
        @click="showPickerFn('a')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['b']"
        readonly
        clickable
        label="是否有线路余额"
        placeholder="请选择"
        @click="showPickerFn('b')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['c']"
        readonly
        clickable
        label="线路分类"
        placeholder="请选择"
        @click="showPickerFn('c')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['d']"
        readonly
        clickable
        label="是否为城配线"
        placeholder="请选择"
        @click="showPickerFn('d')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['manager']"
        readonly
        clickable
        label="上岗经理"
        placeholder="请选择"
        @click="handleShowModal('manager')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['sell']"
        readonly
        clickable
        label="外线销售"
        placeholder="请选择"
        @click="handleShowModal('sell')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['carType']"
        readonly
        clickable
        label="配送车型"
        placeholder="请选择"
        @click="handleShowModal('carType')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['e']"
        readonly
        clickable
        label="上架截止日期"
        placeholder="请选择"
        @click="showPickerFn('e')"
      />
      <van-field
        label-width="100"
        :value="pickerNames['f']"
        readonly
        clickable
        label="司机上岗时间"
        placeholder="请选择"
        @click="showPickerFn('f')"
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
    <!-- 底部弹出框 -->
    <van-popup v-model="showPicker" position="bottom">
      <template v-if="isDateRange">
        <!-- 选择日期 -->
        <van-calendar v-model="showPicker" type="range" @confirm="onConfirm" />
      </template>
      <template v-else-if="isDate">
        <van-datetime-picker
          v-model="form[pickerKey]"
          type="date"
          title="选择年月日"
          :min-date="minTime"
          :max-date="maxTime"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
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
    <!-- 模糊搜索组件 -->
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
          text: '已上架',
          num: 0
        },
        {
          text: '已售罄',
          num: 0
        },
        {
          text: '未开跑已下架',
          num: 0
        },
        {
          text: '已开跑下架',
          num: 0
        }
      ],
      lists: [],
      lineColumns: [
        {
          label: '稳定线路',
          value: 1
        },
        {
          label: '临时线路',
          value: 0
        }
      ],
      form: { // 查询表单
        date: ''
      },
      columns1: [
        {
          label: '专车',
          value: 1
        },
        {
          label: '共享',
          value: 0
        }
      ],
      columns2: [
        {
          label: '有线路余额',
          value: 1
        },
        {
          label: '无线路余额',
          value: 0
        }
      ],
      columns3: [
        {
          label: '稳定线路',
          value: 1
        },
        {
          label: '临时线路',
          value: 0
        }
      ],
      columns4: [
        {
          label: '城配线',
          value: 1
        },
        {
          label: '支线',
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
      dateLists: ['date'], // 显示日历控件的字段集合
      timeLists: ['e', 'f'],
      minTime: new Date(),
      maxTime: new Date(2125, 12, 31)
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
    },
    isDate() {
      return this.timeLists.includes(this.pickerKey)
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
            update: '2020-080-09',
            line: '稳定线路/无线路余额/支线',
            carType: '小面',
            status: '已试跑',
            rearchDate: '2020-08-09',
            worktime: '10小时',
            tags: ['已上架', '共享', '已采线']
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
        path: '/lineSearch'
      })
    },
    // 查询
    onQuery() {
      console.log('submit', this.form);
    },
    // 重置
    onReset(form) {
      this.pickerNames = {}
      this.form = {}
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
      if (key === 'manager') {
        this.options = []
      } else if (key === 'sell') {
        this.options = []
      } else if (key === 'carType') {
        this.options = []
      }
      this.showModal = true
    },
    // 显示picker
    showPickerFn(key) {
      this.columns = []
      this.pickerKey = key;
      if (key === 'selectLine') {
        this.columns.push(...this.lineColumns);
      } else if (key === 'a') {
        this.columns.push(...this.columns1);
      } else if (key === 'b') {
        this.columns.push(...this.columns2);
      } else if (key === 'c') {
        this.columns.push(...this.columns3);
      } else if (key === 'd') {
        this.columns.push(...this.columns4);
      }

      this.showPicker = true;
    },
    // picker选择器
    onConfirm(obj) {
      if (this.pickerKey === 'selectLine') {
        this.showPicker = false;
        return this.$router.push({
          path: '/createLine',
          query: {
            isStable: obj.value
          }
        })
      } else if (this.isDateRange) {
        if (obj.length === 2) {
          let startName = `${obj[0].getMonth() + 1}/${obj[0].getDate()}`;
          let endName = `${obj[1].getMonth() + 1}/${obj[1].getDate()}`;
          this.pickerNames[this.pickerKey] = `${startName}-${endName}`
        }
      } else if (this.isDate) {
        this.pickerNames[this.pickerKey] = `${obj.getMonth() + 1}/${obj.getDate()}`;
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
.lineListContainer {
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
  .ListContainer >>> .van-tab__text {
    font-size: 12px;
    color: #3C4353;
  }
</style>
