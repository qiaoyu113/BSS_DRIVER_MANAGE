<template>
  <div class="DataStatisticsCar">
    <el-timeline>
      <el-timeline-item timestamp="车辆成交" style="margin-top: 20px;" placement="top">
        <el-card shadow="hover">
          <el-container>
            <el-row :gutter="24" style="width: 100%;">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  <el-main>
                    <el-table
                      :data="tableData"
                      :header-cell-style="headClass"
                      fit
                      highlight-current-row
                      show-summary>
                      <el-table-column label="成交数据统计表">
                        <el-table-column
                          prop="name"
                          label="成交"
                          style="text-align: center;"
                          width="120">
                          <el-table-column
                            prop="province"
                            label="城市">
                          </el-table-column>
                          <el-table-column
                            prop="province"
                            label="负责人">
                          </el-table-column>
                          <el-table-column
                            prop="province"
                            label="排名">
                          </el-table-column>
                          <el-table-column
                            prop="province"
                            label="系统录入订单">
                          </el-table-column>
                          <el-table-column
                            prop="province"
                            label="系统已成交">
                          </el-table-column>
                          <el-table-column
                            prop="province"
                            label="系统实际成交">
                          </el-table-column>
                          <el-table-column
                            prop="province"
                            label="未完成">
                          </el-table-column>
                          <el-table-column
                            prop="pencent"
                            label="完成率(%)">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column label="收入（管理费+供应链）">
                          <el-table-column
                            prop="province"
                            label="目标">
                          </el-table-column>
                          <el-table-column
                            prop="city"
                            label="已收">
                          </el-table-column>
                          <el-table-column
                            prop="address"
                            label="差额">
                          </el-table-column>
                          <el-table-column
                            prop="zip"
                            label="完成率">
                          </el-table-column>
                          <el-table-column
                            prop="zip"
                            label="单车收入">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column label="意向金">
                          <el-table-column
                            prop="province"
                            label="人数">
                          </el-table-column>
                          <el-table-column
                            prop="city"
                            label="总金额">
                          </el-table-column>
                          <el-table-column
                            prop="address"
                            label="平均金额">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-main>
                </div>
              </el-col>
              <el-col :span="4" style="box-sizing: border-box;padding: 20px;">
                <el-row :gutter="12">
                  <el-col :span="24">
                    <el-card shadow="hover">
                      <div slot="header" class="clearfix">
                        <h4>功能导航</h4>
                      </div>
                      <div class="text item">
                        <el-button type="text">数据调整</el-button>
                      </div>
                      <div class="text item">
                        <el-button type="text">报表导出</el-button>
                      </div>
                      <div class="text item">
                        <el-switch
                          v-model="headBg"
                          style="display: block"
                          active-color="#13ce66"
                          inactive-color="#dfdfdf"
                          inactive-text="开启皮肤">
                        </el-switch>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="24" style="margin-top:20px;">
                    <div slot="header" class="clearfix">
                      <h4>功能导航</h4>
                    </div>
                    <el-card shadow="hover">
                      <div slot="header" class="clearfix">
                        <el-row :gutter="20">
                          <el-col :span="16">
                            <p style="font-weight: bold;">累计成单交易额</p>
                          </el-col>
                          <el-col :span="8">
                            <p style="color: #666;">10笔</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="text item">
                        <h2 style="color:#E6A23C;">¥ 12000</h2>
                      </div>
                      <div class="text item">
                        <el-row :gutter="20">
                          <el-col :span="20">
                            <p style="color: #666;">月环比
                              <i class="el-icon-caret-bottom" style="color:#F56C6C;"></i>
                              <i class="el-icon-caret-top" style="color:#67C23A;"></i>
                              10%
                            </p>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                    <el-card shadow="hover" style="margin-top:20px;">
                      <div slot="header" class="clearfix">
                        <el-row :gutter="20">
                          <el-col :span="16">
                            <p style="font-weight: bold;">累计意向金总额</p>
                          </el-col>
                          <el-col :span="8">
                            <p style="color: #666;">120笔</p>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="text item">
                        <h2 style="color:#E6A23C;">¥ 42900</h2>
                      </div>
                      <div class="text item">
                        <el-row :gutter="20">
                          <el-col :span="20">
                            <p style="color: #666;">月环比
                              <i class="el-icon-caret-bottom" style="color:#F56C6C;"></i>
                              <i class="el-icon-caret-top" style="color:#67C23A;"></i>
                              21.5%
                            </p>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-container>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="合作模式占比" placement="top">
        <el-card shadow="hover">
          <el-container>
            <el-row :gutter="24" style="width: 100%;">
              <el-col v-for="(item, index) in echartsList" :key="item.id" :span="6">
                <div class="chart-container">
                  <div :id="'chart' + (index + 1)" :class="'chart' + (index + 1)" style="height:300px;width:100%;"/>
                </div>
              </el-col>
            </el-row>
          </el-container>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="面试成交转化率" placement="top">
        <el-card shadow="hover">
          <el-container>
            <el-row :gutter="24" style="width: 100%;">
              <el-col v-for="(item, index) in echartsList2" :key="item.id" :span="6">
                <div class="chart-container">
                  <div :id="'charts' + (index + 1)" :class="'chart' + (index + 1)" style="height:300px;width:100%;"/>
                </div>
              </el-col>
            </el-row>
          </el-container>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
// import { GetClueDetailInformation } from '@/api/clue/clue-api'
import echarts from 'echarts'
export default {
  name: 'DataStatisticsCar',
  components: { echarts },
  props: {
    tenderType: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headBg: true,
      chart: '',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        pencent: '20'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        pencent: '20'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        pencent: '20'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        pencent: '20'
      }],
      echartsList: [
        {
          title: '北京市',
          value: [
            {
              value: 3600,
              name: '购车'
            }, {
              value: 5400,
              name: '租车'
            }, {
              value: 1400,
              name: '带车'
            }
          ]
        }, {
          title: '上海市',
          value: [
            {
              value: 3600,
              name: '购车'
            }, {
              value: 5400,
              name: '租车'
            }, {
              value: 1400,
              name: '带车'
            }
          ]
        }, {
          title: '深圳市',
          value: [
            {
              value: 520,
              name: '购车'
            }, {
              value: 122,
              name: '租车'
            }, {
              value: 233,
              name: '带车'
            }
          ]
        }, {
          title: '成都市',
          value: [
            {
              value: 323,
              name: '购车'
            }, {
              value: 445,
              name: '租车'
            }, {
              value: 677,
              name: '带车'
            }
          ]
        }
      ],
      echartsList2: [
        {
          title: '北京市',
          value: [
            {
              value: 3600,
              name: '购车'
            }, {
              value: 5400,
              name: '租车'
            }, {
              value: 1400,
              name: '带车'
            }
          ]
        }, {
          title: '上海市',
          value: [
            {
              value: 3600,
              name: '购车'
            }, {
              value: 5400,
              name: '租车'
            }, {
              value: 1400,
              name: '带车'
            }
          ]
        }, {
          title: '深圳市',
          value: [
            {
              value: 520,
              name: '购车'
            }, {
              value: 122,
              name: '租车'
            }, {
              value: 233,
              name: '带车'
            }
          ]
        }, {
          title: '成都市',
          value: [
            {
              value: 323,
              name: '购车'
            }, {
              value: 445,
              name: '租车'
            }, {
              value: 677,
              name: '带车'
            }
          ]
        }, {
          title: '成都市',
          value: [
            {
              value: 323,
              name: '购车'
            }, {
              value: 445,
              name: '租车'
            }, {
              value: 677,
              name: '带车'
            }
          ]
        }, {
          title: '成都市',
          value: [
            {
              value: 323,
              name: '购车'
            }, {
              value: 445,
              name: '租车'
            }, {
              value: 677,
              name: '带车'
            }
          ]
        }, {
          title: '成都市',
          value: [
            {
              value: 323,
              name: '购车'
            }, {
              value: 445,
              name: '租车'
            }, {
              value: 677,
              name: '带车'
            }
          ]
        }, {
          title: '成都市',
          value: [
            {
              value: 323,
              name: '购车'
            }, {
              value: 445,
              name: '租车'
            }, {
              value: 677,
              name: '带车'
            }
          ]
        }
      ]
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
      this.echartsList.forEach((item, index) => {
        this.initChart2(item, index, 'chart')
      })
      this.echartsList2.forEach((item, index) => {
        this.initChart2(item, index, 'charts')
      })
    },
    initChart(data, index, name) {
      let idName = name + (index + 1)
      this.chart = echarts.init(document.getElementById(idName))
      this.chart.setOption({
        backgroundColor: '#fff',
        legend: {
          orient: 'vertical',
          x: 'left',
          y: '40',
          itemWidth: 14,
          itemHeight: 14,
          padding: 5,
          itemGap: 20,
          textStyle: { color: '#666' }
        },
        title: {
          text: data.title,
          left: 'center',
          top: 20,
          textStyle: {
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        visualMap: {
          show: false,
          min: 500,
          max: 600,
          inRange: {
          }
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '35%',
          selectedMode: 'single',
          selectedOffset: 3,
          clockwise: true,
          center: ['50%', '50%'],
          color: ['#32F275', '#43cadd', '#3893e5'],
          data: data.value.sort(function(a, b) {
            return a.value - b.value
          }),
          roseType: 'radius',
          label: {
            normal: {
              formatter: ['{b|{b}{d}%}', '{c|{c}万元}'].join('\n'),
              rich: {
                b: {
                  color: '#333',
                  fontSize: 12,
                  height: 40
                },
                c: {
                  color: '#666',
                  fontSize: 12,
                  fontWeight: 'bold',
                  lineHeight: 5
                }
              }
            }
          },
          itemStyle: {
            borderWidth: '20',
            color: 'pink',
            borderColor: '#FFF',
            normal: {
              borderWidth: '3',
              borderColor: 'rgba(0,0,0,2)'
            }
          },
          labelLine: {
            normal: {
              backgroundColor: 'yellow',
              borderColor: 'skyblue',
              borderWidth: 10,
              lineStyle: {
                borderColor: 'skyblue',
                borderWidth: 10,
                backgroundColor: 'yellow'
              }
            }
          }
        }]
      })
    },
    initChart2(data, index, name) {
      let colorList = ['#21DE17', '#43cadd', '#3893e5'];
      let idName = name + (index + 1)
      this.chart = echarts.init(document.getElementById(idName))
      this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          text: data.title,
          left: 'center',
          top: 20,
          textStyle: {
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        grid: {
          top: '1%',
          containLabel: true
        },
        series: [{
          type: 'pie',
          radius: ['27%', '53%'],
          // roseType: 'radius',
          clockwise: false,
          z: 5,
          itemStyle: {
            normal: {
              color: function(params) {
                return colorList[params.dataIndex]
              },
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          },
          label: {
            normal: {
              formatter: '{d|{b}}\n{hr|}\n{d|({d}%)}',
              rich: {
                b: {
                  fontSize: 12,
                  color: '#fff',
                  align: 'left',
                  padding: 4
                },
                hr: {
                  //		                            borderColor: '#12EABE',
                  width: '100%',
                  borderWidth: 1,
                  height: 0
                },
                d: {
                  fontSize: 12,
                  color: '#333',
                  align: 'left',
                  padding: 1
                },
                c: {
                  fontSize: 12,
                  color: '#333',
                  align: 'center'
                }
              }
            }
          },

          labelLine: {
            normal: {
              length: 22,
              length2: 0,
              lineStyle: {
                width: 2
              }
            }
          },
          data: data.value
        }]
      })
    }
  }
}
</script>

<style rel="stylesheet" lang="scss">
  .DataStatisticsCar{
    .border{
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
  }
</style>
