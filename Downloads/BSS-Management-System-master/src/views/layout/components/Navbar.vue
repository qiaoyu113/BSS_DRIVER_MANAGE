<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-tooltip content="下载功能" effect="dark" placement="bottom">
          <div class="right-menu-item hover-effect" @click="downFile">
            <i class="el-icon-download" style="font-size: 22px; vertical-align: -0.16em;font-weight: bold;"></i>
          </div>
        </el-tooltip>

        <!--<search class="right-menu-item" />-->
        <el-tooltip content="返回上一页" effect="dark" placement="bottom">
          <div class="right-menu-item hover-effect">
            <svg-icon class-name="" style="font-size: 22px; vertical-align : -0.25em;" icon-class="back" @click="clickBack" />
          </div>
        </el-tooltip>

        <el-tooltip content="打开新页面模式" effect="dark" placement="bottom">
          <div class="right-menu-item hover-effect">
            <svg-icon v-if="$store.getters.newTab" style="font-size: 22px; vertical-align : -0.25em;" icon-class="newTab" @click="changeTab(0)"/>
            <svg-icon v-if="!$store.getters.newTab" style="font-size: 22px; vertical-align : -0.25em;" icon-class="onlyTab" @click="changeTab(1)"/>
          </div>
        </el-tooltip>

        <error-log class="errLog-container right-menu-item hover-effect"/>

        <screenfull class="right-menu-item hover-effect"/>

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="right-menu-item hover-effect"/>
        </el-tooltip>

        <!--<lang-select class="right-menu-item hover-effect"/>-->

        <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="right-menu-item hover-effect"/>
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../../assets/image/user.png" class="user-avatar">
        </div>
        <el-dropdown-menu slot="dropdown">
          <!--<router-link to="/">-->
          <!--<el-dropdown-item>-->
          <!--{{ $t('navbar.dashboard') }}-->
          <!--</el-dropdown-item>-->
          <!--</router-link>-->
          <el-dropdown-item>
            <span style="display:block;cursor: text;">{{ userName }}</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-drawer
      :visible.sync="visible"
      :before-close="handleClose"
      :title="'v' + $store.getters.version + ' 更新内容：'"
      direction="rtl">
      <DirectionBox></DirectionBox>
    </el-drawer>
    <!--下载弹窗-->
    <el-dialog :visible.sync="dialogTableVisible" title="下载工具">
      <el-table
        v-loading="listLoading"
        :data="tableData"
        :show-header="false"
        style="width: 100%;max-height: 600px;overflow-y: auto;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="文件名称">
                <span>{{ props.row.fileName }}</span>
              </el-form-item>
              <el-form-item label="文件格式">
                <span>{{ props.row.fileFormat }}</span>
              </el-form-item>
              <el-form-item label="文件类型">
                <span>{{ props.row.fileType }}</span>
              </el-form-item>
              <el-form-item label="数据数量">
                <span>{{ props.row.dataNum }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createDate }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <span>{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 3" style="float: right;" type="primary" size="mini" plain @click="exportBtn(scope.row.fileUrl, scope.row.fileType + scope.row.recordId)">下载</el-button>
            <el-button v-if="scope.row.status === 1 || scope.row.status === 2" :loading="true" type="text" size="mini" plain>文件生成中</el-button>
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
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import DirectionBox from '@/components/DirectionBox'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import Search from '@/components/HeaderSearch'
import { removeToken } from '@/utils/auth'
import { getExportDownRecord } from '@/api/common'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: {
    Breadcrumb,
    InfiniteLoading,
    DirectionBox,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker,
    Search
  },
  data() {
    var userName = localStorage.getItem('userName');
    return {
      dialogTableVisible: false,
      tableData: [],
      visible: this.$store.getters.direction,
      userName: userName,
      listLoading: true,
      times: 30,
      total: '',
      limit: '',
      state: '',
      num: '1',
      listQuery: {
        page: 1,
        limit: 30
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
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
    },
    getList($state) {
      this.listLoading = true
      getExportDownRecord(this.listQuery).then(response => {
        if (response.data.success) {
          document.documentElement.scrollTop = this.scrollTop - 100;
          this.tableData = this.tableData.concat(response.data.data)
          this.total = response.data.page.total
          this.limit = response.data.page.limit
          this.totalDetail = response.data.title
          setTimeout(() => {
            this.listLoading = false
            this.disabled = false
            if (!this.listLoading) {
              $state.loaded()
            }
            if (Math.ceil(this.total / this.limit) < this.listQuery.page + 1) {
              $state.complete()
            }
          }, 500)
        } else {
          $state.complete()
          this.$message({
            message: response.data.errorMsg,
            type: 'error'
          });
        }
      })
    },
    exportBtn(url, name) {
      this.$confirm('是否确认下载?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.times === 30) {
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
            message: '下载完成!'
          });
          this.download(url, name)
        } else {
          this.$message({
            message: '下载冷却时间还剩' + this.times + '秒',
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
    download(data, name) {
      if (!data) {
        return
      }
      // let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = data
      link.setAttribute('download', name + '.xls')
      document.body.appendChild(link)
      link.click()
    },
    downFile() {
      this.dialogTableVisible = true;
      this.num = 0
      this.tableData = [];
      if (this.state) {
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
          this.state.reset()
          this.getInfinite(this.state)
        } else {
          this.state.reset()
        }
      }
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      // })
      // 清除token
      removeToken()
      // 刷新当前页跳转登录页面
      location.reload()
    },
    clickBack() {
      this.$router.back(-1)
    },
    changeTab(type) {
      let message = ''
      if (type) {
        message = '您已开启\'打开新页面\'操作模式'
      } else {
        message = '您已关闭\'打开新页面\'操作模式'
      }
      this.$notify({
        title: '成功',
        message: message,
        offset: 100,
        type: 'success'
      });
      this.$store.dispatch('setTab', type)
    },
    handleClose(done) {
      this.$confirm('您已了解本次更新的全部内容了么？')
        .then(_ => {
          this.$store.dispatch('setDireaction', false)
          this.$message({
            showClose: true,
            message: '欢迎使用梧桐BSS系统',
            type: 'success',
            center: true
          });
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .directionBox{
    padding:0 30px;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
    p{
      line-height: 30px;
    }
    i{
      font-weight: bold;
      font-size: 16px;
      margin-right:5px;
    }
  }
  .navbar {
    height: 50px;
    border-bottom: 1px solid #dcdfe6;
    overflow: hidden;

    .back-icon {
      cursor: pointer;
      font-size: 22px;
      vertical-align: middle;
    }

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
    .el-table::before {
      height: 0;
    }
  }
</style>
