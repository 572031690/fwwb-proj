<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="linechart">
    <!-- 地区销售排行榜 -->
    <div class="linebody" ref="line_ref"></div>
  </div>
</template>

<script>
import { monthData } from '../../../assets/data/month'

export default {
  props: {
    titleFontSize: [Number]
  },
  watch: {
    titleFontSize: {
      handler: function (val) {
        this.screenAdapter(val)
      }
    }
  },
  data () {
    return {
      chartInstance: null,
      allData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], // 服务器返回的数据 // 服务器返回的数据
      endValue: 4,
      series: [],
      startValue: 0,
      timeId: null,
      colorArr: ['#ed3f35', '#01e2e5', '#596d90', '#f8b448']
    }
  },
  mounted () {
    this.initChart()
    this.getData()
  },

  methods: {
    /**
     * @desc 初始化echartInstance对象
     */
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.line_ref, this.theme)
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: '| 材料月增量统计',
          left: 20,
          top: 20,
          textStyle: {
            color: 'white'
          }
        },
        legend: {
          top: '15%',
          right: '5%',
          textStyle: {
            color: 'white'
          }
        },
        grid: {
          top: '33%',
          left: '0.5%',
          right: '3%',
          bottom: '7%',
          // 坐标轴位置是否包含文字
          containLabel: true
        },
        tooltip: {
          show: true,
          formatter: arg => {
            return (
              arg.seriesName +
              '</br>' +
              arg.marker +
              arg.name +
              '增加：' +
              arg.value +
              '万吨'
            )
          }
        },
        xAxis: {
          type: 'category',
          // 把刻度标签里面的文字颜色设置为黑色
          boundaryGap: false, // x轴的第1个元素是否与y轴有距离

          axisLabel: {
            color: 'white',
            interval: 0
          },
          // 坐标轴配置
          axisLine: {
            lineStyle: {
              color: '#5470c6'
            }
          },
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          name: '(万吨)',
          nameLocation: 'end', // name的具体位置，可调整上中下左
          nameTextStyle: {
            color: 'white',
            fonstSize: 15,
            padding: [0, 15, 0, 0]
          },
          type: 'value',
          // 设置轴分割线的颜色
          splitLine: {
            lineStyle: {
              color: '#5470c6'
            }
          },
          // 把刻度标签里面的文字颜色设置为黑色
          axisLabel: {
            color: 'white'
          }
        },
        series: [
          {
            type: 'line',
            stack: 'all', // 堆叠图的设置
            smooth: true, // 是否为平滑线
            symbol: 'circle', // 折线节点为小圆点
            symbolSize: '5' // 折线点大小
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    /**
     * @desc 获取服务器的数据
     */
    async getData () {
      const url = 'home/driver/monthIncrement'
      await this.$api(url).then((res) => {
        res.forEach((element, index) => {
          const myInitSeriseData = {
            name: '',
            type: 'line',
            stack: 'all', // 堆叠图的设置
            smooth: true, // 是否为平滑线
            symbol: 'circle', // 折线节点为小圆点
            symbolSize: '5', // 折线点大小
            data: [],
            lineStyle: {
              // 设置柱的样式
              color: ''
            },
            itemStyle: {
              // 设置线拐点的样式
              borderColor: '', // 折线点边框色
              color: 'white',
              borderWidth: 1
            }
          }
          myInitSeriseData.name = element.materiakName
          myInitSeriseData.lineStyle.color = this.colorArr[index]
          myInitSeriseData.itemStyle.borderColor = this.colorArr[index]
          myInitSeriseData.data = []
          this.allData.forEach(item => {
            myInitSeriseData.data.push(element[monthData[item]])
          })
          this.series.push({ ...myInitSeriseData })
        })
        this.updateChart()
      })
    },
    /**
     * @desc 更新图表
     */
    updateChart () {
      const dataOption = {
        xAxis: {
          data: this.allData
        },
        series: this.series
      }
      this.chartInstance.setOption(dataOption)
    },
    /**
     * @desc 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
     */
    screenAdapter (val) {
      // 和分辨率大小相关的配置项
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: val * 1.5
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      // 手动的调用图表对象的resize 才能产生效果
      // console.log("resizeresizeresizeresize");
      this.chartInstance.resize()
    }
  }
}
</script>

<style scoped>
.linechart {
  height: 100%;
  width: 100%;
}
.linebody {
  height: 100%;
  width: 100%;
}
</style>
