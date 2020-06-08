<template>
  <div class="spendIncome">
    <el-timeline>
      <el-timeline-item timestamp="支出汇总" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-table
            v-loading="listLoading"
            :key="tableKey"
            :data="list"
            :show-header="showHeader"
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column prop="id" sortable="custom" align="left">
              <template slot-scope="scope">
                <p class="el-button--primary is-plain no-bg"><span class="">订单编号：</span><span class="val">{{ scope.row.orderId }}</span></p>
                <p class="el-button--primary is-plain no-bg"><span class="">产品编号：</span><span class="val">{{ scope.row.productId }}</span></p>
              </template>
            </el-table-column>
            <el-table-column align="left">
              <template slot-scope="scope">
                <p class="bold"><span>{{ scope.row.productName | DataIsNull }} </span></p>
                <p class="el-button--primary is-plain no-bg"><span class="">司机保障：</span><span class="val">{{ scope.row.protection | DataIsNull }}</span></p>
              </template>
            </el-table-column>
            <el-table-column align="left">
              <template slot-scope="scope">
                <p class="el-button--primary is-plain no-bg"><span class="">支付金额：</span><span class="val">{{ scope.row.paymentAmount | DataIsNull }}</span></p>
                <p class="el-button--primary is-plain no-bg"><span class="">贷款金额：</span><span class="val">{{ scope.row.loanAmount | DataIsNull }}</span></p>
              </template>
            </el-table-column>
            <el-table-column align="left">
              <template slot-scope="scope">
                <p class="bold state">{{ scope.row.state | DataIsNull }}</p>
                <p class="el-button--primary is-plain no-bg"><span class="">成交时间：</span><span class="val">{{ scope.row.time | DataIsNull }}</span></p>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="收入汇总" style="margin-top: 20px;" placement="top">
        <el-card>
          累计收入总计：<span class="price">{{ income | DataIsNull }}</span> 元
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="查看收入日历" style="margin-top: 20px;" placement="top">
        <el-button type="warning" plain @click="goDate()">查看收入日历</el-button>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getInCome } from '@/api/driver/driver-api'
export default {
  name: 'SpendInCome',
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
      listLoading: true,
      income: 0,
      id: ''
    }
  },
  created() {},
  mounted() {
    const id = this.$route.query.id
    this.id = id;
    this.getData(id)
  },
  methods: {
    getData(id) {
      getInCome({
        driverId: id
      }).then((res) => {
        if (res.data.success) {
          this.list = res.data.data.expenditureSummary;
          this.income = res.data.data.incomeSummary;
          this.listLoading = false;
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }).catch(err => {
        this.$message.error(err);
      })
    },
    goDate() {
      this.$router.push({ path: '/income-calendar', query: { id: this.id }})
    }
  }
}
</script>

<style rel="stylesheet" lang="scss" scoped>
  .spendIncome{
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
