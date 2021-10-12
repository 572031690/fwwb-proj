<template>
  <div id="pie-chart">
    <div class="piebody" ref="pie_chart"></div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * @desc 界面适配比例大小值
     */
    titleFontSize: {
      type: Number,
      default: () => {
        return 15
      }
    },
    /**
     * @desc 关闭抽屉方法
     */
    pieData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    /**
     * @desc 监听屏幕适配参数
     */
    titleFontSize: {
      handler: function (val) {
        this.screenAdapter(val)
      }
    },
    /**
     * @desc 饼图数据
     */
    pieData: {
      handler: function (val) {
        if (val.length) {
          this.getData()
        }
      }
    }
  },
  data () {
    return {
      chartInstance: null,
      legendName: [],
      seriesData: []
    }
  },
  mounted () {
    this.getinitChart()
  },
  methods: {
    /**
     * @desc 初始化echarts
     */
    getinitChart () {
      this.chartInstance = this.$echarts.init(this.$refs.pie_chart)
      // 对图表初始化配置的控制
      const initOption = {
        tooltip: {
          trigger: 'item',
          formatter: arg => {
            return arg.marker + arg.name + ' : ' + arg.value + '万元' // marker就是前面有颜色的标记球
          }
        },
        title: {
          text: '| 全国销量比TOP10',
          top: 25,
          left: 25,
          textStyle: {
            color: 'white'
          }
        },
        legend: [
          {
            left: 'center',
            bottom: '5%',

            textStyle: {
              color: 'white'
            }
          },
          {
            left: 'center',
            bottom: '0%',

            textStyle: {
              color: 'white'
            }
          }
        ],
        series: [
          {
            type: 'pie',
            // 饼图旁边文字显示和消失
            radius: ['33%', '48%'], // 第0个元素代表的是內圆的半径 第1个元素外圆的半径
            selectedMode: 'single', // 选中的效果,能够将选中的区域偏离圆点一小段距离，并点击其他的时候恢复

            label: {
              show: true,
              color: 'white',
              formatter: arg => {
                return arg.name + ':' + arg.percent.toFixed(1) + '%'
              }
            },
            labelLine: {
              show: true
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    /**
     * @desc 赋值数据
     */
    getData () {
      const pieDataCopy = JSON.parse(JSON.stringify(this.pieData))
      for (let i = 0; i < pieDataCopy.length; i++) {
        for (let j = i + 1; j < pieDataCopy.length; j++) {
          if (pieDataCopy[i].value < pieDataCopy[j].value) {
            const pie = pieDataCopy[i]
            pieDataCopy[i] = pieDataCopy[j]
            pieDataCopy[j] = pie
          }
        }
      }
      const TopData10 = pieDataCopy.slice(0, 10)
      TopData10.forEach(item => {
        this.legendName.push(item.name)
      })
      this.seriesData = TopData10
      this.updateChart()
    },
    /**
     * @desc 更新图表
     */
    updateChart () {
      const dataOption = {
        // 顶部事例
        legend: [
          {
            data: this.legendName.slice(0, 6)
          },
          {
            data: this.legendName.slice(6, 10)
          }
        ],
        series: [
          {
            data: this.seriesData
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    /**
     * @desc 以及屏幕适配
     */
    screenAdapter (val) {
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: val * 1.5
          }
        },
        legend: [
          {
            itemWidth: val * 1.5,
            itemHeight: val,
            itemGap: val / 2,
            textStyle: {
              fontSize: val / 1.2
            }
          },
          {
            itemWidth: val * 1.5,
            itemHeight: val,
            itemGap: val / 2,
            textStyle: {
              fontSize: val / 1.2
            }
          }
        ],
        series: [
          {
            label: {
              fontSize: val * 0.9
            }
          }
        ]
      }
      this.chartInstance.setOption(adapterOption)
      // 手动的调用图表对象的resize 才能产生效果
      this.chartInstance.resize()
    }
  }
}
</script>

<style scoped>
.pie-chart {
  height: 100%;
  width: 100%;
}
.piebody {
  height: 100%;
  width: 100%;
}
</style>
