<template>
  <div class="otherInfo">
    <el-timeline>
      <el-timeline-item v-role="'wt'" timestamp="专车司机" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-row :gutter="12">
            <el-col v-for="item in detail" v-if="item.type !== 'matrix'" :key="item.value" :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>{{ item.fieldName }} </el-header>
                  <el-main>{{ item.value | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
          <el-card shadow="hover">
            <el-header>{{ matrixName }}</el-header>
            <el-table
              :data="matrix"
              style="width: 100%">
              <el-table-column
                v-for="(item, length) in matrix"
                :key="item.name"
                :prop="'a' + length"
                :label="item.name">
              </el-table-column>
            </el-table>
          </el-card>
        </el-card>
      </el-timeline-item>
      <el-timeline-item v-role="'pt'" timestamp="共享司机" style="margin-top: 20px;" placement="top">
        <el-card>
          <el-row :gutter="12">
            <el-col v-for="item in detail2" v-if="item.type !== 'matrix2'" :key="item.value" :span="8">
              <el-card shadow="hover">
                <el-container>
                  <el-header>{{ item.fieldName }} </el-header>
                  <el-main>{{ item.value | DataIsNull }}</el-main>
                </el-container>
              </el-card>
            </el-col>
          </el-row>
          <el-card shadow="hover">
            <el-header>{{ matrixName2 }}</el-header>
            <el-table
              :data="matrix2"
              style="width: 100%">
              <el-table-column
                v-for="(item, length) in matrix2"
                :key="item.name"
                :prop="'a' + length"
                :label="item.name">
              </el-table-column>
            </el-table>
          </el-card>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getOtherInfo } from '@/api/driver/driver-api'
import role from '@/directive/role/index'
export default {
  name: 'OtherInfo',
  directives: { role },
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
      detail: {},
      detail2: {},
      matrix: [],
      matrix2: [],
      matrixName: '',
      matrixName2: '',
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
      getOtherInfo({
        driverId: id,
        driverType: 0
      }).then((res) => {
        if (res.data.success) {
          let data = res.data.data;
          data.forEach((i, length) => {
            if (i.type === 'matrix') {
              this.matrixName = i.fieldName
              let arr = JSON.parse(i.value);
              if (arr.length) {
                let NewArr = []
                arr[0].forEach((i, idx) => {
                  let a = {}
                  a['name'] = arr[0][idx];
                  let arrNew = idx + 1;
                  if (arrNew < arr.length) {
                    arr[arrNew].forEach((item, index) => {
                      let val = arr[arrNew][index]
                      if (val !== '') {
                        a['a' + index] = arr[arrNew][index];
                      } else {
                        a['a' + index] = '-'
                      }
                    })
                    NewArr[idx] = a
                  } else {
                    arr[0].forEach((i, idxs) => {
                      a['a' + idxs] = '-';
                    })
                    NewArr[idx] = a
                  }
                })
                this.matrix = NewArr
              }
            }
          })
          this.detail = data;
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }).catch(err => {
        this.$message.error(err);
      })
      getOtherInfo({
        driverId: id,
        driverType: 1
      }).then((res) => {
        if (res.data.success) {
          let data = res.data.data;
          data.forEach((i, length) => {
            if (i.type === 'matrix') {
              this.matrixName2 = i.fieldName
              let arr = JSON.parse(i.value);
              if (arr.length) {
                let NewArr = []
                arr[0].forEach((i, idx) => {
                  let a = {}
                  a['name'] = arr[0][idx];
                  let arrNew = idx + 1;
                  if (arrNew < arr.length) {
                    arr[arrNew].forEach((item, index) => {
                      let val = arr[arrNew][index]
                      if (val !== '') {
                        a['a' + index] = arr[arrNew][index];
                      } else {
                        a['a' + index] = '-'
                      }
                    })
                    NewArr[idx] = a
                  } else {
                    arr[0].forEach((i, idxs) => {
                      a['a' + idxs] = '-';
                    })
                    NewArr[idx] = a
                  }
                })
                this.matrix2 = NewArr
              }
            }
          })
          this.detail2 = data;
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
  .otherInfo{
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
