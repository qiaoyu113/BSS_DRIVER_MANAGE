export function canvasPic(data) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: ' {b}: {c}'
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '0%',
      containLabel: true
    },
    legend: {
      orient: 'horizontal',
      x: 'center',
      itemWidth: 14,
      itemHeight: 14,
      align: 'auto',
      data: Array,
      textStyle: {
        color: '#666'
      }
    },
    series: [{
      name: '占比',
      type: 'pie',
      radius: ['20%', '60%'],
      color: ['#45A2E8', '#99E8FF', '#77D8E5', '#005FF5', '#008AE0', '#49B9FF'],
      label: {
        normal: {
          formatter: '{b}（{c}）',
          fontSize: 14,
          rich: {}
        }
      },
      z: 1,
      data: data
    }]
  }
}
export function canvasBar(echarts, yAxis, data) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: ' {b}: {c}'
    },
    backgroundColor: '#fff',
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#53AFD4'
        }
      },
      axisLabel: {
        color: '#438FC9',
        fontSize: 14
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '2%',
      top: '2%',
      containLabel: true
    },
    yAxis: {
      data: yAxis,
      nameTextStyle: {
        color: '#438FC9',
        fontSize: 1
      },
      axisLine: {
        lineStyle: {
          color: '#53AFD4'
        }
      },
      axisLabel: {
        color: '#438FC9',
        fontSize: 14
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#53AFD4'
        }
      },
      interval: 1000
    },
    series: [{
      label: {
        normal: {
          fontSize: 14,
          rich: {}
        }
      },
      type: 'bar',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#00b0ff'
          }, {
            offset: 0.8,
            color: '#53AFD4'
          }], false),
          label: {
            show: true, // 开启显示
            position: 'right', // 在上方显示
            textStyle: { // 数值样式
              color: '#53AFD4',
              fontSize: 12
            }
          },
          rich: {}
        }
      },
      data: data
    }]
  }
}
