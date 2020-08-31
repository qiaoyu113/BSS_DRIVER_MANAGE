<template>
  <div class="OutSideList">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="外线运费上报" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <div class="headerRight" @click="showPicker = true">
            新建
            <van-icon name="add-o" />
          </div>
        </template>
      </van-nav-bar>
      <!-- 搜索 -->
      <van-search show-action placeholder="请输入线路名称/线路编号" readonly @click="handleSearchClick">
        <template #action>
          <div class="searchSelect" @click="showPopup=true">
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

    <!-- 选择临时线路or稳定线路 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        value-key="label"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>

    <!-- 右侧筛选抽屉 -->
    <SelfPopup
      :show.sync="showPopup"
      form-ref="form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <van-field
        readonly
        clickable
        label-width="7em"
        name="city"
        :value="listQuery.city"
        label="城市"
        is-link
        placeholder="请选择城市"
        @click="showPickerFn('city')"
      />
      <van-field
        v-model="listQuery.name1"
        colon
        name="name1"
        label-width="7em"
        label="客户"
        placeholder="请输入客户"
      />
      <van-field
        v-model="listQuery.name5"
        name="name5"
        colon
        label-width="7em"
        label="项目"
        placeholder="请输入项目"
      />
      <van-field
        v-model="listQuery.name5"
        name="name5"
        colon
        label-width="7em"
        label="上岗经理"
        placeholder="请输入上岗经理"
      />
      <van-field
        readonly
        colon
        clickable
        label="出车时间"
        label-width="7em"
        is-link
        name="date"
        :value="pickerNames.date"
        placeholder="请选择出车时间"
        @click="showCalendar = true"
      />
    </SelfPopup>
    <!-- 日历 -->
    <van-calendar
      v-model="showCalendar"
      type="range"
      :min-date="minDate"
      :max-data="maxDate"
      :allow-same-day="true"
      @confirm="onConfirmDate"
    />
    <!-- picker -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        value-key="name"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirmPicker"
      />
    </van-popup>
    <Suggest
      v-model="showModal"
      :options="options"
      :type="type"
      @keyWordValue="handleSearchChange"
      @finish="handleValueClick"
      @closed="showModal=false"
    />
    <van-popup v-model="showPicker8" position="bottom">
      <van-calendar v-model="showPicker8" @confirm="onConfirm8" />
    </van-popup>
    <van-popup v-model="showPicker9" position="bottom">
      <van-calendar v-model="showPicker9" @confirm="onConfirm9" />
    </van-popup>
    <van-popup v-model="showPicker10" position="bottom">
      <van-calendar v-model="showPicker10" @confirm="onConfirm10" />
    </van-popup>
    <van-popup v-model="showPicker11" position="bottom">
      <van-calendar v-model="showPicker11" @confirm="onConfirm11" />
    </van-popup>
  </div>
</template>

<script>
import CardItem from './components/Cardltem'
import SelfPopup from '@/components/SelfPopup';
import Suggest from '@/components/SuggestSearch.vue'
import { parseTime } from '@/utils'
export default {
  components: {
    CardItem,
    SelfPopup,
    Suggest
  },
  data() {
    return {
      showPopup: false, // 打开查询抽屉
      showCalendar: false, // 打开日历
      refreshing: false, // 下拉刷新
      loading: false, // 上拉加载
      finished: false, // 是否加载完成
      active: '', // 当前激活的tab,
      // picker
      minDate: new Date(+new Date() - 86400000 * 365),
      maxDate: new Date(+new Date() + 86400000 * 365),
      tabArrs: [ // tabs数组
        {
          text: '全部',
          num: 100
        },
        {
          text: '待上报',
          num: 0
        },
        {
          text: '已上报',
          num: 0
        }
      ],
      lists: [],
      showPicker: false,
      columns: [
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

      },
      // search
      listQuery: {
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        name6: '',
        name7: ''
      },
      pickerNames: {
        name4: '',
        name7: '',
        date: ''
      },
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,
      showPicker8: false,
      showPicker9: false,
      showPicker10: false,
      showPicker11: false,
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
      type: '',
      cityList: [
        {
          name: '北京市',
          code: 1
        },
        {
          name: '上海市',
          code: 0
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 选择线路
    onConfirm(obj) {
      this.showPicker = false;
      this.$router.push({
        path: '/createLine',
        query: {
          isStable: obj.value
        }
      })
    },
    /**
     * 日期选择
     */
    onConfirmDate(date) {
      const [start, end] = date;
      this.showCalendar = false;
      let startDate = parseTime(start, '{y}-{m}-{d}');
      let endDate = parseTime(end, '{y}-{m}-{d}');
      this.pickerNames.date = `${startDate} - ${endDate}`;
      this.listQuery.startDate = startDate;
      this.listQuery.endDate = endDate;
    },
    onLoad(isInit = false) {
      if (isInit === true) {
        this.lists = []
      }
      setTimeout(() => {
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
    /**
     * 提交查询
     */
    onSubmit(value) {
      this.showPopup = false;
      this.refreshing = true;
      this.onRefresh();
      console.log('submit', value);
    },
    /**
     * 重置form
     */
    onReset(form) {
      this.listQuery = this.$options.data().listQuery;
      this.pickerNames = this.$options.data().pickerNames;
      form.resetValidation();
    },
    /**
     * 显示picker
     */
    showPickerFn(key) {
      this.pickerKey = key;
      if (key === 'city') {
        this.columns = this.cityList;
      } else {
        this.columns = this.whyList;
      }
      this.showPicker = true;
    },
    // 线路类型 ----右侧pop选中关闭
    onConfirm1(obj) {
      this.form.a = obj.value
      this.text1 = obj.label
      this.showPicker1 = false
    },
    // 是否有线路余额 ----右侧pop选中关闭
    onConfirm2(obj) {
      this.form.b = obj.value
      this.text2 = obj.label
      this.showPicker2 = false
    },
    // 线路分类 ----右侧pop选中关闭
    onConfirm3(obj) {
      this.form.c = obj.value
      this.text3 = obj.label
      this.showPicker3 = false
    },
    // 是否为城配线 ----右侧pop选中关闭
    onConfirm4(obj) {
      this.form.d = obj.value
      this.text4 = obj.label
      this.showPicker4 = false
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
    handleShowModal(text) {
      if (text === 'manager') {
        this.options = []
      } else if (text === 'sell') {
        this.options = []
      } else if (text === 'carType') {
        this.options = []
      }
      this.type = text
      this.showModal = true
    },
    // 上架截止日期 ----右侧pop选中关闭
    onConfirm8(date) {
      this.text8 = `${date.getMonth() + 1}/${date.getDate()}`;
      this.form.o = date
      this.showPicker8 = false;
    },
    // 上架截止日期 ----右侧pop选中关闭
    onConfirm9(date) {
      this.text9 = `${date.getMonth() + 1}/${date.getDate()}`;
      this.form.p = date
      this.showPicker9 = false;
    },
    // 创建时间开始日期 ----右侧pop选中关闭
    onConfirm10(date) {
      this.text10 = `${date.getMonth() + 1}/${date.getDate()}`;
      this.form.r = date
      this.showPicker10 = false;
    },
    // 创建时间结束日期 ----右侧pop选中关闭
    onConfirm11(date) {
      this.text11 = `${date.getMonth() + 1}/${date.getDate()}`;
      this.form.s = date
      this.showPicker11 = false;
    }
  }
}

</script>

<style lang='scss' scoped>
.OutSideList {
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
