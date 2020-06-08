<template>
  <div v-loading="loading" class="all">
    <div class="menuBox">
      <el-row>
        <el-form label-width="70px">
          <el-col :span="8">
            <el-form-item label="城市">
              <el-select v-model="listQuery.city" placeholder="请选择">
                <el-option label="全部城市" value=""></el-option>
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
          <el-col :span="8">
            <el-form-item label="赋能项">
              <el-select v-model="listQuery.item" placeholder="请选择">
                <el-option label="全部赋能项" value=""></el-option>
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
          <el-col :span="8">
            <el-form-item label="职务">
              <el-select v-model="listQuery.title" placeholder="请选择">
                <el-option label="全部职务" value="0"></el-option>
                <el-option
                  v-for="item in titleList"
                  :key="item.titleId"
                  :label="item.titleName"
                  :value="item.titleId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="tip">赋能项统计</div>
    <el-table id="elTable" :data="list" :row-class-name="totalRow" header-cell-class-name="table-header" border>
      <el-table-column prop="itemName" label="赋能项" fixed>
        <template slot-scope="{ row }">
          {{ setItemText(row) }}
        </template>
      </el-table-column>
      <el-table-column prop="-1" label="合计" width="60"></el-table-column>
      <el-table-column v-for="item in cityList" :key="item.codeVal" :label="item.code" :width="65">
        <template slot-scope="{ row }">
          {{ row[item.codeVal] || 0 }}
        </template>
      </el-table-column>
    </el-table>
    <div class="tip">部门统计</div>
    <el-table :data="depList" :row-class-name="totalRow2" header-cell-class-name="table-header" border style="width: 100%">
      <el-table-column prop="itemName" label="部门" fixed>
        <template slot-scope="{ row }">
          {{ row.dept === '1' && row.itemId !== '-1'? row.itemName : row.deptName }}
        </template>
      </el-table-column>
      <el-table-column prop="-1" label="合计" width="60"></el-table-column>
      <el-table-column v-for="item in cityList" :key="item.codeVal" :label="item.code" :width="65">
        <template slot-scope="{ row }">
          {{ row[item.codeVal] || 0 }}
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
import { getRecords } from '@/api/score/score-api';
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
    itemList: {
      type: Array,
      default() {
        return []
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
      tableList: [],
      listQuery: {
        city: '',
        title: '0',
        item: ''
      },
      totalList: null
    };
  },
  computed: {
    list() {
      const aryList = this.tableList.map(item => {
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
      if (this.totalList && this.totalList[0]) {
        const item = this.totalList[0];
        aryList.unshift({
          dept: item.dept,
          deptName: item.deptName || '合计',
          ...item.value[0]
        })
      }
      return aryList
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
      const aryList = list.filter(item => {
        if (item.dept === '1') {
          return true;
        } else if (item.dept !== '1' && item.itemId === '-1') {
          return true;
        }
        return false;
      });
      if (this.totalList && this.totalList[0]) {
        const item = this.totalList[0];
        aryList.unshift({
          dept: item.dept,
          deptName: item.deptName || '合计',
          ...item.value[0]
        })
      }
      return aryList
    }
  },
  watch: {
    examId() {
      this.getRecords();
    },
    'listQuery.title'() {
      // 职务
      this.getRecords();
    },
    'listQuery.item'(val) {
      // 赋能项
      this.$emit('setItem', val)
    },
    'listQuery.city'(val) {
      // 城市
      this.$emit('setCity', val)
    }
  },
  mounted() {
    this.getRecords();
    this.addResize();
  },
  beforeDestroy() {
    // 组件销毁
    this.removeResize();
  },
  methods: {
    setItemText(row) {
      if (row.dept === '-1') {
        return row.deptName;
      }
      return row.itemName === '-1' ? `${row.deptName}小计` : row.itemName;
    },
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
    getRecords() {
      this.loading = true;
      getRecords({
        examId: this.examId,
        title: this.listQuery.title
      })
        .then(({ data }) => {
          if (data.success) {
            this.tableList = data.data.filter(item => item.dept !== '-1');
            this.totalList = data.data.filter(item => item.dept === '-1'); // 合计
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
      if (row.dept === '-1') {
        return 'total-row'
      }
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
      const picList = this.list.filter(item => item.itemName === '-1' && item.dept !== '-1');

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
.all{
  padding: 0 20px 20px;
}

</style>
