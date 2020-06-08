<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">

    <el-table-column
      v-loading="loading"
      align="center"
      label="ID"
      width="65"
      element-loading-text="请给我点时间！">
      <template slot-scope="scope">
        <span>{{ scope.row.clueId }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="订单号">
      <template slot-scope="scope">
        <span>{{ scope.row.custNo }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="车辆种类">
      <template slot-scope="scope">
        <span>{{ scope.row.clueTypeName }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="状态">
      <template slot-scope="scope">
        <span>{{ scope.row.clueStatusName }}</span>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 5,
        key: ''
      },
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data
        this.loading = false
      })
    }
  }
}
</script>

