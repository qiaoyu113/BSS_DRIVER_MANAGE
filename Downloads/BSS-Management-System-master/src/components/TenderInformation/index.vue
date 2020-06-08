<template>
  <div class="tenderInfomation">
    <sticky class-name="sub-navbar">
      <div class="filter-container">线路标书信息
      </div>
    </sticky>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      :show-header="showHeader"
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="货主名称" prop="id" sortable="custom" align="left">
        <template slot-scope="scope">
          <p class="el-button--primary is-plain no-bg"><span class="">标书编号：</span><span class="val">{{ scope.row.bidId }}</span></p>
          <p class="el-button--primary is-plain no-bg"><span class="">线路编号：</span><span class="val">{{ scope.row.lineId }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="货主编号" align="left">
        <template slot-scope="scope">
          <p class="bold"><span>{{ scope.row.customerName }}</span></p>
          <p><span>{{ scope.row.lineName }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="仓库位置" align="left">
        <template slot-scope="scope">
          <p><span>选中时间: {{ scope.row.choiceDate }}</span></p>
          <p><span>开跑时间: {{ scope.row.appointmentDate }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="left">
        <template slot-scope="scope">
          <p class="bold"><span>{{ scope.row.stateName }}</span></p>
          <p v-if="scope.row.stateName ==='到期结束下线' || scope.row.stateName === '异常下线'"><span>结束时间: {{ scope.row.stopDate | Timestamp }}</span></p>
        </template>
      </el-table-column>

      <infinite-loading
        slot="append"
        ref="infinite"
        spinner="bubbles"
        @infinite="getInfinite">
        <template slot="no-more">暂无更多数据</template>
      </infinite-loading>

    </el-table>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Sticky from '@/components/Sticky'
import { GetDriverTenderDetail } from '@/api/driver/driver-api'
export default {
  name: 'TenderInformation',
  components: { InfiniteLoading, Sticky },
  props: {
    tenderType: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      tableKey: 0,
      showHeader: false,
      listQuery: {
        key: '',
        page: 1,
        limit: 100
      },
      listLoading: true
    }
  },
  methods: {
    getList($state) {
      this.listLoading = true
      const id = this.$route.query.id
      GetDriverTenderDetail({ driverId: id }).then(response => {
        if (response.data.success) {
          this.list = this.list.concat(response.data.data)
          // this.total = response.data.page.total
          // this.limit = response.data.page.limit
          setTimeout(() => {
            this.listLoading = false
            if (!this.listLoading) {
              $state.loaded()
            }
            // if (Math.ceil(this.total / this.limit) < this.listQuery.page + 1) {
            $state.complete()
            // }
          }, 500)
        } else {
          this.listLoading = false
          $state.complete()
          this.$message.error(response.data.errorMsg);
        }
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
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .tenderInfomation{
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
    .bold{
      color:#000;
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
