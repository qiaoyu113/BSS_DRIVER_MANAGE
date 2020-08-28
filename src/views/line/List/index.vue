<template>
  <div class="lineListContainer">
    <!-- navbar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="线路管理" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft">
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
      ref="lineLineForm"
      :show.sync="show"
      form-ref="form"
      @submit="onQuery"
      @reset="onReset"
    >
      <van-field
        :value="text1"
        readonly
        clickable
        label="线路类型"
        placeholder="请选择"
        @click="showPicker1 = true"
      />
      <van-field
        :value="text2"
        readonly
        clickable
        label-width="100"
        label="是否有线路余额"
        placeholder="请选择"
        @click="showPicker2 = true"
      />
      <van-field
        :value="text3"
        readonly
        clickable
        label="线路分类"
        placeholder="请选择"
        @click="showPicker3 = true"
      />
      <van-field
        :value="text4"
        readonly
        clickable
        label-width="100"
        label="是否为城配线"
        placeholder="请选择"
        @click="showPicker4 = true"
      />
      <van-field
        :value="text5"
        readonly
        clickable
        label="上岗经理"
        placeholder="请选择"
        @click="handleShowModal('manager')"
      />
      <van-field
        :value="text6"
        readonly
        clickable
        label="外线销售"
        placeholder="请选择"
        @click="handleShowModal('sell')"
      />
      <van-field
        :value="text7"
        readonly
        clickable
        label="配送车型"
        placeholder="请选择"
        @click="handleShowModal('carType')"
      />
      <van-field
        :value="text8"
        readonly
        clickable
        label-width="100"
        label="上架截止日期"
        placeholder="请选择"
        @click="showPicker8 = true"
      />
      <van-field
        :value="text9"
        readonly
        clickable
        label-width="100"
        label="司机上岗时间"
        placeholder="请选择"
        @click="showPicker9 = true"
      />
      <van-field
        :value="text10"
        readonly
        clickable
        label="创建时间"
        placeholder="开始日期"
        :min-date="minDate"
        @click="showPicker10 = true"
      />
      <van-field
        :value="text11"
        readonly
        clickable
        input-align="center"
        placeholder="结束日期"
        @click="showPicker11 = true"
      />
    </SelfPopup>
    <van-popup v-model="showPicker1" position="bottom">
      <van-picker
        value-key="label"
        show-toolbar
        :columns="columns1"
        @confirm="onConfirm1"
        @cancel="showPicker1 = false"
      />
    </van-popup>
    <van-popup v-model="showPicker2" position="bottom">
      <van-picker
        value-key="label"
        show-toolbar
        :columns="columns2"
        @confirm="onConfirm2"
        @cancel="showPicker2 = false"
      />
    </van-popup>
    <van-popup v-model="showPicker3" position="bottom">
      <van-picker
        value-key="label"
        show-toolbar
        :columns="columns3"
        @confirm="onConfirm3"
        @cancel="showPicker3 = false"
      />
    </van-popup>
    <van-popup v-model="showPicker4" position="bottom">
      <van-picker
        value-key="label"
        show-toolbar
        :columns="columns4"
        @confirm="onConfirm4"
        @cancel="showPicker4 = false"
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
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',
      text6: '',
      text7: '',
      text8: '',
      text9: '',
      text10: '',
      text11: '',
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
      type: ''
    }
  },
  computed: {
    minDate() {
      if (this.form.r) {
        return new Date(this.form.r)
      }
      return new Date()
    }
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
      this.text1 = ''
      this.text2 = ''
      this.text3 = ''
      this.text4 = ''
      this.text5 = ''
      this.text6 = ''
      this.text7 = ''
      this.text8 = ''
      this.text9 = ''
      this.text10 = ''
      this.text11 = ''
      this.form = {}
      console.log('reset');
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
