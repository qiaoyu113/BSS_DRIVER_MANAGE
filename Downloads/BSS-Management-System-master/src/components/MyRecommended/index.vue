<template>
  <div class="MyRecommended">
    <el-form
      ref="myForm"
      :model="listQuery"
      :inline="true"
      label-position="right"
      label-width="90px"
      style="margin-left:50px;"
    >
      <el-form-item label="线索编号：">
        <el-input v-model="listQuery.clueId" placeholder="请输入线索编号" />
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="listQuery.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="推荐人：">
        <el-input v-model="listQuery.puserName" placeholder="请输入推荐人" />
      </el-form-item>
      <el-form-item label="车型：">
        <el-select v-model="listQuery.carType" placeholder="请选择车型">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="item in carList"
            :key="item.codeVal"
            :value="item.codeVal"
            :label="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否入驻：">
        <el-select v-model="listQuery.isSettledIn" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          v-waves
          :disabled="disabled"
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >{{ $t('table.search') }}</el-button>
        <el-button
          v-permission="['/bss/v1/bss/driver/clue/myRecommendListExport']"
          v-waves
          class="filter-item"
          style="float: right;"
          type="primary"
          icon="el-icon-add"
          @click="exportBtn"
        >导出</el-button>
      </el-form-item>
    </el-form>
    <el-badge
      :value="total || '0'"
      type="primary"
      style="margin-bottom:20px;"
    >
      <el-button type="primary" size="small">共计人数</el-button>
    </el-badge>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="线索编号" align="center" width="120">
        <template slot-scope="{ row }">
          <el-button type="text" @click="distributionClue(row.clueId)">{{ row.clueId }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车型" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.carTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="推荐人" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.puserName+'&nbsp;&nbsp;&nbsp;'+row.puserPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="推荐级别" align="center" min-width="120px">
        <template slot="header" slot-scope="{ $index }">
          <span :data-index="$index">
            推荐级别
            <el-popover placement="top-start" title="排序说明：" width="400" trigger="hover">
              <div>
                <p>1、推荐等级：按照推荐等级的级别，从小到大，正序排序；可以看到每个等级的人数；</p>
                <p>2、所属关系：按照推荐人的对应关系，一条推荐链条按照顺序排列；</p>
                <p>3、默认排序是所属关系。</p>
              </div>
              <i slot="reference" class="el-icon-info"></i>
            </el-popover>
          </span>
        </template>
        <template slot-scope="{ row }">
          <span>{{ row.recommendLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="近七日访问次数" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.uv }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否入驻" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.isSettledIn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入驻线路编号" align="center" width="120">
        <template slot-scope="{ row }">
          <el-button type="text" @click="goLineList(row.settledInLineId)">{{ row.settledInLineId }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="报名个数" align="center">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.collectNum"
            type="text"
            @click="goCollect(row.clueId)"
          >{{ row.collectNum }}
          </el-button>
          <span v-else>{{ row.collectNum }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      class="pagination"
      @pagination="getList"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves'; // Waves directive
import permission from '@/directive/permission/index'
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
import { dictionary } from '@/api/common';
import { selectMyRecommendList, myRecommendListExport } from '@/api/clue/clue-api'
export default {
  name: 'MyRecommended',
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      disabled: false,
      total: 0,
      times: 30,
      carList: [],
      listQuery: {
        page: 1,
        limit: 20,
        carType: '',
        clueId: undefined,
        driverUserId: undefined,
        isSettledIn: '',
        name: undefined,
        puserName: undefined
      },
      listLoading: false,
      list: []
    };
  },
  mounted() {
    let id = this.$route.query.id
    this.id = id;
    this.listQuery.driverUserId = this.$route.query.driverId || undefined;
    this.fetchData();
    this.handleFilter();
  },
  methods: {
    handleFilter() {
      this.num = 0;
      this.disabled = true;
      this.listLoading = true;
      this.list = [];
      this.getList();
    },
    handleCreate() {},
    getList() {
      let data = this.dealObjectValue(this.listQuery);
      // data.clueId = data.clueId || this.id;
      selectMyRecommendList(data)
        .then((res) => {
          if (res.data.success) {
            this.list = res.data.data;
            this.total = res.data.page.total;
          } else {
            this.$message.error(res.data.errorMsg);
            this.total = res.data.page.total;
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.listLoading = false;
          this.disabled = false;
        });
    },
    sortTable({ column, prop, order }) {
      console.log(12312);
      console.log(column, prop, order);
    },
    fetchData() {
      // 车型
      dictionary({
        dictType: 'Intentional_compartment'
      }).then(res => {
        this.carList = res.data.data;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    distributionClue(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/clue-list', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/clue-list', query: { id: id }})
      }
    },
    goLineList(id) {
      if (this.$store.getters.newTab) {
        let routeData = this.$router.resolve({ path: '/all-line-list', query: { id: id }})
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push({ path: '/all-line-list', query: { id: id }})
      }
    },
    goCollect(id) {
      this.$router.push({ name: 'ClueDetail', query: { id: id, driverId: this.driverId, activeIndex: '2' }})
    },
    exportBtn() {
      let data = this.dealObjectValue(this.listQuery);
      // data.clueId = data.clueId || this.id;
      delete data.limit;
      delete data.page;
      this.$confirm('是否确认导出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.times === 30) {
          myRecommendListExport(data).then((res) => {
            var overTime = setInterval(() => {
              if (this.times > 1) {
                this.times = this.times - 1
              } else {
                this.times = 30
                clearInterval(overTime)
              }
            }, 1000)
            this.$message({
              type: 'success',
              message: '导出成功!'
            });
            this.download(res.data)
          })
        } else {
          this.$message({
            message: '导出冷却时间还剩' + this.times + '秒',
            type: 'warning'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    download(data) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', this.dateFormat(+new Date(), 'yyyy-MM-dd hh-mm-ss') + '我的推荐.xlsx')
      document.body.appendChild(link)
      link.click()
    },
    dateFormat(time, fmt) {
      let date = new Date(time)
      let o = {
        'M+': date.getMonth() + 1, /* 月份 */
        'd+': date.getDate(), /* 日 */
        'h+': date.getHours(), /* 小时 */
        'm+': date.getMinutes(), /* 分 */
        's+': date.getSeconds(), /* 秒 */
        'q+': Math.floor((date.getMonth() + 3) / 3), /* 季度 */
        'S': date.getMilliseconds() /* 毫秒 */
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      for (let k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); }
      return fmt;
    },
    dealObjectValue(obj) {
      return Object.keys(obj).filter(key => obj[key]).reduce(
        (newObj, key) => {
          newObj[key] = obj[key]
          return newObj
        }, {}
      )
    }
  }
};
</script>

<style rel="stylesheet" lang="scss" scoped>
.MyRecommended {
  padding: 20px;
  .el-form {
    max-width: 1040px;
  }
  .el-select,
  .el-input {
    width: 180px;
  }
  .pagination{
    margin-top: 0;
  }
}
</style>
