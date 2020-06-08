<template>
  <div v-loading="loading" class="all">
    <div class="menuBox">
      <el-row>
        <el-form label-width="70px">
          <el-col :span="24">
            <el-form-item label="赋能">
              <el-select v-model="itemId" placeholder="请选择">
                <el-option
                  v-for="item in itemList"
                  :key="item.itemId"
                  :label="item.itemName"
                  :value="item.itemId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="tip">城市项统计</div>
    <el-table :data="cityList" :row-class-name="totalRow" header-cell-class-name="table-header" border style="width: 100%">
      <el-table-column prop="code" label="城市" fixed width="150"></el-table-column>
      <el-table-column label="合计">
        <template slot-scope="{ row }">
          {{ setNumber(row.codeVal, '-1') }}
        </template>
      </el-table-column>
      <el-table-column v-for="item in titleList" :key="item.titleId" :label="item.titleName">
        <template slot-scope="{ row }">
          {{ setNumber(row.codeVal, item.titleEnName) }}
        </template>
      </el-table-column>
    </el-table>
    <div class="tip">赋能项图示</div>
    <div v-if="tableList.length > 0">
      <div id="canvasBar" class="canvas-bar"></div>
    </div>
    <div v-else class="no-data">暂无数据</div>
  </div>
</template>

<script>
import { canvasBar } from './echarts';
import echarts from 'echarts';
import { getEmpowerment } from '@/api/score/score-api';
export default {
  props: {
    cityList: {
      type: Array,
      default() {
        return []
      }
    },
    itemList: {
      type: Array,
      default() {
        return []
      }
    },
    titleList: {
      type: Array,
      default() {
        return []
      }
    },
    examId: {
      type: String,
      default: ''
    },
    item: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      loading: false,
      tableList: []
    };
  },
  computed: {
    itemId: {
      get() {
        return this.item || this.itemList[0].itemId
      },
      set(val) {
        this.$emit('update:item', val)
      }
    }
  },
  watch: {
    examId() {
      this.getEmpowerment();
    },
    'itemId'(val) {
      // 赋能项
      this.getEmpowerment();
    }
  },
  mounted() {
    this.getEmpowerment();
    this.addResize();
  },
  beforeDestroy() {
    // 组件销毁
    this.removeResize();
  },
  methods: {
    addResize() {
      window.addEventListener('resize', this.setChart, false);
    },
    removeResize() {
      window.removeEventListener('resize', this.setChart, false);
    },
    setChart() {
      this.chart && this.chart.resize();
      this.chartPic && this.chartPic.resize();
    },
    getEmpowerment() {
      this.loading = true;
      getEmpowerment({
        examId: this.examId,
        itemId: this.itemId
      })
        .then(({ data }) => {
          if (data.success) {
            this.tableList = data.data;
            if (data.data.length > 0) {
              this.$nextTick(() => {
                this.initChart();
              })
            }
          } else {
            this.$message.error(data.errorMsg || '请求错误')
          }
        })
        .catch(() => {
        })
        .finally(() => {
          this.loading = false;
        })
    },
    totalRow({ row, rowIndex }) {
      if (row.itemName === '-1') {
        return 'total-row'
      }
      if (rowIndex % 2) {
        return 'table-striped'
      }
      return ''
    },
    totalRow2({ row, rowIndex }) {
      if (rowIndex % 2) {
        return 'table-striped'
      }
      return ''
    },
    initChart() {
      const data = this.cityList.map(item => {
        let city = this.tableList.find(code => Number(item.codeVal) === code.city);
        item.value = 0;
        if (city) {
          item.value = city ? (city['-1'] || 0) : 0
        }
        return item
      }).sort((a, b) => b.value - a.value);
      const yAxis = data.map(item => item.code);
      const xAxis = data.map(item => item.value);

      this.chart = echarts.init(document.getElementById('canvasBar'));
      this.chart.setOption(canvasBar(echarts, yAxis, xAxis));
    },
    setNumber(val, key) {
      const item = this.tableList.find(item => item.city === Number(val))
      return item ? (item[key] || 0) : 0;
    }
  }
};
</script>
