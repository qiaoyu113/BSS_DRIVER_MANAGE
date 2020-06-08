<template>
  <div class="Correlation">
    <p>线路标书信息</p>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list2"
      :show-header="showHeader"
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="货主名称" prop="id" sortable="custom" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">标书编号：</span><span class="val">{{ scope.row.tenderId }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">线路编号：</span><span class="val">{{ scope.row.lineId }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="货主编号" align="left">
        <template slot-scope="scope">
          <p>{{ scope.row.customerName }}</p>
          <p>{{ scope.row.lineName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="" align="left">
        <template slot-scope="scope">
          <!--<p class="el-button&#45;&#45;primary is-plain no-bg"><span class="">选中时间：</span><span class="val">{{ scope.row.selectedTime | Timestamp }}</span></p>-->
          <p v-if="scope.row.stateName === '中标在跑'" class="el-button--primary is-plain no-bg"><span class="">开跑时间：</span><span class="val">{{ scope.row.startingTime | Timestamp }}</span></p>
          <p v-else>-</p>
        </template>
      </el-table-column>
      <el-table-column label="标书状态" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.stateName }}</span></p>
        </template>
      </el-table-column>
      <!--<infinite-loading-->
      <!--slot="append"-->
      <!--ref="infinite"-->
      <!--spinner="bubbles"-->
      <!--@infinite="getInfinite">-->
      <!--<template slot="no-more">暂无更多数据</template>-->
      <!--</infinite-loading>-->
    </el-table>

    <p>收藏线路信息</p>
    <el-table
      v-loading="listLoading"
      :key="tableKey2"
      :data="list"
      :show-header="showHeader"
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="货主名称" prop="id" sortable="custom" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">线路编号：</span><span class="val">{{ scope.row.lineId }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">可上车数：</span><span class="val">{{ scope.row.numberOfTrainsAvailable }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="货主编号" align="left">
        <template slot-scope="scope">
          <p>{{ scope.row.customerName }}</p>
          <p>{{ scope.row.lineName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">创建时间：</span><span class="val">{{ scope.row.creationTime }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="标书状态" align="left">
        <template slot-scope="scope">
          <p><span>{{ scope.row.stateName }}</span></p>
        </template>
      </el-table-column>
      <!--<infinite-loading-->
      <!--slot="append"-->
      <!--ref="infinite"-->
      <!--spinner="bubbles"-->
      <!--@infinite="getInfinite">-->
      <!--<template slot="no-more">暂无更多数据</template>-->
      <!--</infinite-loading>-->
    </el-table>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import BackToTop from '@/components/BackToTop'
import { relatedLineInformation } from '@/api/driver/driver-api'
export default {
  name: 'Correlation',
  components: { InfiniteLoading, BackToTop },
  data() {
    return {
      myBackToTopStyle: {
        right: '40px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },
      showHeader: false,
      tableKey: 0,
      tableKey2: 1,
      list: [],
      total: 0,
      total2: 0,
      limit: 0,
      limit2: 0,
      page2: 1,
      listLoading: true,
      listLoading2: true,
      dialogFormVisible: false,
      listQuery: {
        key: '',
        page: 1,
        limit: 100,
        startDate: '',
        state: 1,
        endDate: ''
      },
      disabled: false,
      totalDetail: {},
      num: 1,
      state: null,
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        driver: '',
        workTime: ''
      },
      driverName: '',
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        bankName: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
        accountName: [{ required: true, message: '请输入开户人', trigger: 'blur' }],
        accountOpeningBranch: [{ required: true, message: '请输入开户支行', trigger: 'blur' }],
        cardNumber: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }]
      },
      dataForm: {
        bankName: '',
        accountName: '',
        accountOpeningBranch: '',
        cardNumber: ''
      },
      downloadLoading: false,
      querySearchList: [],
      loading: false,
      activeName: 0,
      list2: [],
      state2: '',
      orderId: '',
      list2Check: {
        name: '',
        driverId: ''
      },
      scrollTop: 0
    }
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    const id = this.$route.query.id
    this.id = id;
    this.getList(id)
  },
  methods: {
    getList(id) {
      this.listLoading = true
      this.orderId = id;
      relatedLineInformation({
        driverId: id
      }).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          if (response.data.data) {
            this.list = this.list.concat(response.data.data.favoriteLineInformationVOS)
            this.list2 = this.list2.concat(response.data.data.lineTenderInformationVOS)
          }
          // this.total = response.data.page.total
          // this.limit = response.data.page.limit
          // this.totalDetail = response.data.title
          setTimeout(() => {
            this.listLoading = false
            this.disabled = false
            // if (!this.listLoading) {
            // $state.loaded()
            // }
            // if (Math.ceil(this.total / this.limit) < this.listQuery.page + 1) {
            // $state.complete()
            // }
          }, 500)
        } else {
          this.listLoading = false
          this.disabled = false
          this.$message.error(response.data.errorMsg);
          // $state.complete()
        }
      }).catch(err => {
        this.listLoading = false
        this.disabled = false
        this.$message.error(err.errorMsg)
      })
    },
    getInfinite($state) {
      if (this.listQuery.page === 1) {
        if (this.listLoading) {
          setTimeout(() => {
            this.list = []
            this.state = $state
            this.getList($state)
          }, 800)
        } else {
          this.num += 1
          this.state = $state
          this.listQuery.page = this.num
          this.getList($state)
        }
      } else {
        if (!this.listLoading) {
          this.num += 1
          this.state = $state
          this.listQuery.page = this.num
          this.getList($state)
        }
      }
    },
    goDate() {
      this.$router.push({ path: '/income-calendar', query: { id: this.id }})
    }
  }
}
</script>

<style rel="stylesheet" lang="scss" scoped>
.Correlation{
  width:100%;
  padding:20px;
  box-sizing: border-box;
  .bold{
    color:#000;
    font-weight: bold;
  }
  .state{
    color:#67C23A;
  }
  .price{
    color:#F56C6C;
    font-weight: bold;
  }
  .el-button--mini {
    width: auto
  }
  .el-button--primary.is-plain.no-bg{
    background: none;
    font-weight: bold;
    .val{
      color:#606266;
      font-weight: normal;
    }
  }
  .no-bg:hover{
    background: none !important;
    color: inherit;
  }
}
</style>
