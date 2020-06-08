<template>
  <div class="clueInfomation">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="推荐人信息" name="1">
        <div>推荐人手机号：{{ phone | DataIsNull }}</div>
        <div>推荐人姓名：{{ name | DataIsNull }}</div>
        <div v-if="bdManagerVO">拓展经理：{{ bdManagerVO.name | DataIsNull }}（{{ bdManagerVO.phone | DataIsNull }}） / {{ bdManagerVO.bindTypeName | DataIsNull }}<el-button v-permission="['/driver/driver/clue/bss/updateBDManager']" type="text" style="margin-left:20px;" @click="showBox = true">修改</el-button></div>
      </el-collapse-item>
      <el-collapse-item title="收藏线路信息(梧桐专车) / 报名线路信息(梧桐共享)" name="2">
        <el-table
          v-loading="listLoading"
          :key="tableKey"
          :data="list"
          :show-header="showHeader"
          fit
          highlight-current-row
          style="width: 100%;">
          <el-table-column label="客户名称" prop="id" sortable="custom" align="left">
            <template slot-scope="scope">
              <p class="el-button--primary is-plain no-bg"><span class="">线路编号：</span><span class="val">{{ scope.row.lineId }}</span></p>
            </template>
          </el-table-column>
          <el-table-column label="客户编号" align="left">
            <template slot-scope="scope">
              <p><span>{{ scope.row.lineName }}</span></p>
            </template>
          </el-table-column>
          <el-table-column label="仓库位置" align="left">
            <template slot-scope="scope">
              <p><span>{{ scope.row.choiceDate }}</span></p>
            </template>
          </el-table-column>
          <el-table-column label="仓库位置" align="left">
            <template slot-scope="scope">
              <p><span>可上车数：{{ scope.row.deployNum }}</span></p>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <el-dialog :visible.sync="showBox" title="修改拓展经理">
      <el-form label-width="120px">
        <el-form-item label="请选择拓展经理">
          <el-select v-model="expandManager" placeholder="请选择">
            <el-option
              v-for="item in optionsManager"
              :key="item.userId"
              :label="item.name"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="checkManager">确认</el-button>
        <el-button @click="showBox = false">取消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index'
import { GetClueDetailInformation, getBDManager, checkManager } from '@/api/clue/clue-api'
export default {
  name: 'ClueInfomation',
  directives: { permission },
  props: {
    tenderType: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      optionsManager: [],
      tableKey: 0,
      showHeader: false,
      bdManagerVO: '',
      listQuery: {
        key: '',
        page: 1,
        limit: 100
      },
      listLoading: true,
      showBox: false,
      phone: '',
      name: '',
      expandManager: '',
      activeNames: ['1', '2']
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList($state) {
      this.listLoading = true
      const id = this.$route.query.id
      // 拓展经理
      getBDManager({}).then(res => {
        let arr = res.data.data;
        this.optionsManager = arr;
      }).catch(err => {
        this.$message.error(err);
      })
      GetClueDetailInformation({ clueId: id }).then(response => {
        if (response.data.success) {
          this.listLoading = false
          this.phone = response.data.data.puserPhone
          this.name = response.data.data.puserName
          this.bdManagerVO = response.data.data.bdManagerVO
          this.list = response.data.data.lineBasicInfoVOList
        } else {
          this.listLoading = false
          this.$message.error(response.data.errorMsg);
        }
      })
    },
    checkManager() {
      const id = this.$route.query.id;
      checkManager({
        'clueIds': [
          id
        ],
        'userIds': [
          this.expandManager
        ]
      }).then((res) => {
        if (res.data.success) {
          this.showBox = false
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.getList()
        } else {
          this.showBox = false
          this.$message.error(res.data.errorMsg);
        }
      })
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .clueInfomation{
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
