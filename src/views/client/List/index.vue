<template>
  <div class="customerListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="客户管理" left-text="返回" left-arrow @click-left="onClickLeft" />
      <!-- 搜索 -->
      <van-search show-action placeholder="客户名称/客户编号/客户联系人手机号搜索" readonly @click="handleSearchClick">
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
        :value="pickerNames['city']"
        readonly
        clickable
        label="所属城市"
        placeholder="请选择"
        @click="handleShowModal('city')"
      />
      <van-field
        :value="pickerNames['b']"
        readonly
        clickable
        label="客户类型"
        placeholder="请选择"
        @click="showPickerFn('b')"
      />
      <van-field
        :value="pickerNames['c']"
        readonly
        clickable
        label="客户属性"
        placeholder="请选择"
        @click="showPickerFn('c')"
      />

      <van-field
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
      columns2: [
        {
          label: '公司',
          value: 1
        },
        {
          label: '个体',
          value: 0
        }
      ],
      columns3: [
        {
          label: '外线客户',
          value: 1
        },
        {
          label: '自承运',
          value: 2
        },
        {
          label: '集团客户',
          value: 3
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
      dateLists: ['date'] // 显示日历控件的字段集合
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
    // 返回
    onClickLeft() {
      this.$router.go(-1)
    },
    // 加载列表
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
            contacts: '小小悠',
            phone: '15021578693',
            clientProperty: '外线客户',
            createDate: Date.now(),
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
        path: '/clientSearch'
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
     *点击模糊查询框某一项
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
      if (key === 'b') {
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
.customerListContainer {
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
  .customerListContainer >>> .van-tab__text {
    font-size: 12px;
    color: #3C4353;
  }
</style>
