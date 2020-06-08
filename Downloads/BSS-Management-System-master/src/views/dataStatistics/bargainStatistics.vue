<template>
  <div class="BargainStatistics">
    <el-timeline>
      <el-timeline-item timestamp="统计时间" style="margin-top: 20px;" placement="top">
        <el-card shadow="hover">
          <el-date-picker
            v-model="dateVal"
            type="month"
            value-format="timestamp"
            placeholder="请选择月份"
            @change="getData">
          </el-date-picker>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="车辆成交" style="margin-top: 20px;" placement="top">
        <el-card shadow="hover">
          <el-container>
            <el-row :gutter="24" style="width: 100%;">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-main>
                    <el-table
                      v-loading="loading"
                      :data="tableData"
                      :header-cell-style="headClass"
                      fit
                      highlight-current-row
                      show-summary>
                      <el-table-column label="成交数据统计表">
                        <el-table-column
                          prop="cityName"
                          label="城市">
                        </el-table-column>
                        <el-table-column
                          prop="principal"
                          label="负责人">
                        </el-table-column>
                        <el-table-column
                          prop="goal"
                          align="right"
                          label="目标">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.goal" min="0" type="number"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="systemEntryOrder"
                          align="right"
                          label="系统录入订单">
                        </el-table-column>
                        <el-table-column
                          prop="systemHasBeenSold"
                          align="right"
                          label="系统已成交">
                        </el-table-column>
                        <el-table-column
                          prop="actuallySold"
                          align="right"
                          label="实际已成交">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.actuallySold" min="0" type="number"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-main>
                </div>
              </el-col>
            </el-row>
          </el-container>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="操作" style="margin-top: 20px;" placement="top">
        <el-container>
          <el-button type="primary" @click="save">保存</el-button>
        </el-container>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { queryVehicleTransactionStatistics, updateVehicleTransactionStatistics } from '@/api/data/data-api'
export default {
  name: 'DataStatisticsCar',
  data() {
    return {
      loading: true,
      headBg: true,
      chart: '',
      tableData: [],
      dateVal: new Date().getTime()
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    headClass() {
      if (this.headBg) {
        return 'text-align: center;'
      } else {
        return 'text-align: center;background: #fff;'
      }
    },
    getData() {
      this.loading = true;
      queryVehicleTransactionStatistics({
        queryDate: this.dateVal
      }).then(res => {
        if (res.data.success) {
          this.tableData = res.data.data;
          this.loading = false;
        }
      })
    },
    save() {
      for (let item = 0; item < this.tableData.length; item++) {
        if (Number(this.tableData[item].goal) < 0 || Number(this.tableData[item].actuallySold) < 0) {
          this.$message.error('输入项不能小于0');
          return false;
        }
      }
      updateVehicleTransactionStatistics({
        'lists': this.tableData,
        'date': this.dateVal
      }).then(res => {
        if (res.data.success) {
          if (res.data.data.flag) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            setTimeout(() => {
              this.getData()
            }, 1000)
          } else {
            this.$message.error(res.data.data.msg);
          }
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }).catch(err => {
        this.$message.error(err);
      })
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .BargainStatistics{
    padding-right: 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .border{
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
  }
</style>
