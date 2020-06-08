<template>
  <div v-loading="loading" class="city">
    <div class="menuBox">
      <el-row>
        <el-form label-width="70px">
          <el-col :span="24">
            <el-form-item label="城市">
              <el-select v-model="cityId" placeholder="请选择">
                <el-option
                  v-for="item in cityList"
                  :key="item.codeVal"
                  :label="item.code"
                  :value="item.codeVal"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="tip">赋能项统计</div>
    <el-table :data="list" :row-class-name="totalRow" header-cell-class-name="table-header" border style="width: 100%">
      <el-table-column prop="itemName" label="赋能项" fixed width="150">
        <template slot-scope="{ row }">
          {{ row.itemName === '-1' ? `${row.deptName}小计` : row.itemName }}
        </template>
      </el-table-column>
      <el-table-column prop="-1" label="合计"></el-table-column>
      <el-table-column v-for="item in titleList" :key="item.titleId" :label="item.titleName">
        <template slot-scope="{ row }">
          {{ row[item.titleEnName] || 0 }}
        </template>
      </el-table-column>
    </el-table>
    <div class="tip">部门统计</div>
    <el-table :data="depList" :row-class-name="totalRow2" header-cell-class-name="table-header" border style="width: 100%">
      <el-table-column prop="itemName" label="部门" fixed width="150">
        <template slot-scope="{ row }">
          {{ row.dept === '1' && row.itemId !== '-1'? row.itemName : row.deptName }}
        </template>
      </el-table-column>
      <el-table-column prop="-1" label="合计"></el-table-column>
      <el-table-column v-for="item in titleList" :key="item.titleId" :label="item.titleName">
        <template slot-scope="{ row }">
          {{ row[item.titleEnName] || 0 }}
        </template>
      </el-table-column>
    </el-table>
    <div class="tip">赋能项图示</div>
    <div v-if="list.length > 0">
      <div id="canvasBar" class="canvas-bar"></div>
    </div>
    <div v-else class="no-data">暂无数据</div>
    <div class="tip">赋能项图示</div>
    <div v-if="list.length > 0">
      <div id="canvasPic" class="canvas-pic"></div>
    </div>
    <div v-else class="no-data">暂无数据</div>
  </div>
</template>

<script>
import { canvasPic, canvasBar } from './echarts';
import echarts from 'echarts';
import { getCityRecords } from '@/api/score/score-api';
export default {
  props: {
    cityList: {
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
    city: {
      type: String,
      default() {
        return ''
      }
    },
    examId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      tableList: []
    };
  },
  computed: {
    cityId: {
      get() {
        return this.city || this.cityList[0].codeVal
      },
      set(val) {
        this.$emit('update:city', val)
      }
    },
    list() {
      return this.tableList.map(item => {
        return item.value.map(el => {
          return {
            ...el,
            dept: item.dept,
            deptName: item.deptName
          }
        }).sort((a, b) => {
          return Number(b.itemId) - Number(a.itemId)
        })
      }).flat(Infinity);
    },
    depList() {
      const list = this.tableList.map(item => {
        return item.value.map(el => {
          return {
            ...el,
            dept: item.dept,
            deptName: item.deptName
          }
        }).sort((a, b) => {
          return Number(b.itemId) - Number(a.itemId)
        })
      }).flat(Infinity);
      return list.filter(item => {
        if (item.dept === '1') {
          return true;
        } else if (item.dept !== '1' && item.itemId === '-1') {
          return true;
        }
        return false;
      });
    }
  },
  watch: {
    examId() {
      this.getCityRecords();
    },
    'cityId'(val) {
      // 城市
      this.getCityRecords();
    }
  },
  mounted() {
    this.getCityRecords();
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
    getCityRecords() {
      this.loading = true;
      getCityRecords({
        examId: this.examId,
        city: this.cityId
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
      const list = this.list.filter(item => item.itemName !== '-1').sort((a, b) => b['-1'] - a['-1']);
      const yAxis = list.map(item => item.itemName);
      const data = list.map(item => item['-1']);

      this.chart = echarts.init(document.getElementById('canvasBar'));
      this.chart.setOption(canvasBar(echarts, yAxis, data));

      // pic
      const picList = this.list.filter(item => item.itemName === '-1');

      const picData = picList.map(item => {
        return {
          name: item.deptName,
          value: item['-1']
        }
      });
      this.chartPic = echarts.init(document.getElementById('canvasPic'));
      this.chartPic.setOption(canvasPic(picData));
    }
  }
};
</script>

<style lang="scss">
.city{
  padding: 0 20px 20px;
}

</style>
