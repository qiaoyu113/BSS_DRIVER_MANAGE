<template>
  <div class="SuggestForm">
    <div class-name="sub-navbar">
      <div class="filter-container">
        <div class="menuBox">
          <el-row>
            <el-form :label-width="isPC ? '120px' : '28%'">
              <el-col :span="isPC ? 6 : 24">
                <el-form-item label="城市">
                  <el-select
                    v-model="listQuery.city"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in optionsCity"
                      :key="item.codeVal"
                      :label="item.code"
                      :value="item.codeVal"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="isPC ? 6 : 24">
                <el-form-item label="城市">
                  <el-select
                    v-model="listQuery.city"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in optionsCity"
                      :key="item.codeVal"
                      :label="item.code"
                      :value="item.codeVal"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="isPC ? 6 : 24">
                <el-form-item label="城市">
                  <el-select
                    v-model="listQuery.city"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in optionsCity"
                      :key="item.codeVal"
                      :label="item.code"
                      :value="item.codeVal"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="isPC ? 6 : 24">
                <el-form-item label="城市">
                  <el-select
                    v-model="listQuery.city"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in optionsCity"
                      :key="item.codeVal"
                      :label="item.code"
                      :value="item.codeVal"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="isPC ? 12 : 24">
                <el-form-item label="创建日期">
                  <el-date-picker
                    v-if="isPC"
                    v-model="DateValue"
                    type="daterange"
                    value-format="timestamp"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changData(0)"
                  />
                  <el-date-picker
                    v-else
                    v-model="DateValueM"
                    class="el-date-m"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    @change="changData(1)"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="isPC ? 12 : 24"
                class="btn-box"
              >
                <el-button
                  :class="isPC ? 'filter-item' : 'filter-item-m'"
                  type="primary"
                >
                  导出
                </el-button>
                <el-button
                  :class="isPC ? 'filter-item' : 'filter-item-m'"
                  type="primary"
                >
                  导出2
                </el-button>
              </el-col>
            </el-form>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { PermissionModule } from '@/store/modules/permission'
import { SettingsModule } from '@/store/modules/settings'

@Component({
  name: 'SuggestForm',
  components: {
  }
})
export default class extends Vue {
    private optionsCity: any[] = []
    private DateValue: any[] = []
    private DateValueM: any = ''
    private listQuery = {
      key: '',
      page: 1,
      limit: 30,
      endDate: '',
      startDate: '',
      state: '',
      lineSaleId: ''
    }

    get isPC() {
      return SettingsModule.isPC
    }

    get routes() {
      return PermissionModule.routes
    }

    get showLogo() {
      return SettingsModule.showSidebarLogo
    }

    private changData(type: any) {
      if (type) {
        console.log(this.DateValueM)
        if (this.DateValueM) {
          this.listQuery.startDate = this.DateValueM
          this.listQuery.endDate = this.DateValueM
        } else {
          this.listQuery.startDate = ''
          this.listQuery.endDate = ''
        }
      } else {
        console.log(this.DateValue)
        if (this.DateValue) {
          this.listQuery.startDate = this.DateValue[0]
          this.listQuery.endDate = this.DateValue[1]
        } else {
          this.listQuery.startDate = ''
          this.listQuery.endDate = ''
        }
      }
    }
}
</script>

<style lang="scss">
.SuggestForm{
    width: 100%;
    .filter-container{
        padding:0;
    }
    .menuBox{
        padding: 20px 0 8px;
        box-sizing: border-box;
        .el-date-m {
            width: 79%;
        }
        .btn-box{
            text-align: center;
            .filter-item{
                float: right;
                margin-right: 30px;
            }
            .filter-item-m{
                width: 80%;
                margin: 0 auto 10px;
            }
        }
    }
  }
</style>

<style lang="scss" scope>
.el-collapse-item__content{
    padding-bottom:0;
}
</style>
