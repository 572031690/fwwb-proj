<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="rankchart">
    <!-- 地区销售排行榜 -->
    <div class="rankbody" ref="rank_ref"></div>
  </div>
</template>

<script>
import { monthData } from '../../../assets/data/month';
export default {
  props: {
    titleFontSize: [Number]
  },
  watch: {
    titleFontSize: {
      handler: function (val) {
        this.screenAdapter(val)
      }
      // immediate: true
    }
  },
  data () {
    return {
      chartInstance: null,
      allData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], // 服务器返回的数据
      series: [
          {
            name: '',
            type: 'bar',
            data: [],
            itemStyle: {
              // 设置柱的颜色
              color: ''
            }
          },
          {
            name: '',
            type: 'bar',
            data: [],
            itemStyle: {
              // 设置柱的颜色
              color: ''
            }
          },
          {
            name: '',
            type: 'bar',
            data: [],
            itemStyle: {
              // 设置柱的颜色
              color: ''
            }
          }
        ],
      
      
      
      endValue: 4,
      startValue: 0,
      timeId: null,
      colorArr : ['#578bf1', '#56d0a3', '#596d90']
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    // this.screenAdapter();
    // window.onresize = this.chartInstance.resize;
    // window.addEventListener("resize", this.screenAdapter);
    // 在页面加载完成的时候, 主动进行屏幕的适配
  },
  destroyed () {
    // 在组件销毁的时候, 需要将监听器取消掉
    // window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timeId)
  },
  methods: {
    // 初始化echartInstance对象
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.rank_ref, this.theme)
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: '| 三大支柱材料月销量统计',
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
          left: '5%',
          right: '5%',
          bottom: '7%',
          // 坐标轴位置是否包含文字
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // 把刻度标签里面的文字颜色设置为黑色
          axisLabel: {
            color: 'white'
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
          },
          serise:this.series
        }
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timeId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    // 获取服务器的数据
    async getData () {
      const url = 'home/driver/monthSales'
      await this.$api(url).then((res) => {
        res.sort((a,b) => {
          return b.totalData - a.totalData
        })
        this.series.forEach((item,index) => {
          item.name = res[index].materiakName
          item.itemStyle.color = this.colorArr[index]
          this.allData.forEach(datas => {
            item.data.push(res[index][monthData[datas]])
          })
        })
        this.updateChart()
        this.startInterval()
      })
    },
    // 更新图表
    updateChart () {
      // 处理数据
      // 省份数据
      const dataOption = {
        tooltip: {
          show: true,
          formatter: arg => {
            return (
              arg.seriesName +
              '</br>' +
              arg.marker +
              arg.name +
              '：' +
              arg.value +
              '万吨'
            )
          }
        },
        xAxis: {
          data: this.allData
        },
        // 显示表格底部拖动显示条
        dataZoom: {
          show: false, // 隐藏
          startValue: this.startValue,
          endValue: this.endValue
        },
        series: this.series
      }
      this.chartInstance.setOption(dataOption)
    },
    // 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
    screenAdapter (val) {
      // 和分辨率大小相关的配置项
      // const titleFontSize = (this.$refs.rank_ref.offsetWidth / 100) * 3.6; // 16.38
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: val * 1.5
          }
        },
        series: [
          {
            barWidth: val,
            itemStyle: {
              barBorderRadius: [val / 2, val / 2, 0, 0]
            }
          },
          {
            barWidth: val,
            itemStyle: {
              barBorderRadius: [val / 2, val / 2, 0, 0]
            }
          },
          {
            barWidth: val,
            itemStyle: {
              barBorderRadius: [val / 2, val / 2, 0, 0]
            }
          }
        ]
      }
      this.chartInstance.setOption(adapterOption)
      // 手动的调用图表对象的resize 才能产生效果
      this.chartInstance.resize()
    },
    startInterval () {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        this.startValue++
        this.endValue++
        if (this.endValue > this.allData.length - 1) {
          this.endValue = 4
          this.startValue = 0
        }
        this.updateChart()
      }, 2000)
    }
  }
  // computed: {
  //   ...mapState(['theme'])
  // },
  // watch: {
  //   theme() {
  //     this.chartInstance.dispose() // 销毁当前的图表格
  //     this.initChart() // 重新以最新的主题初始化图表对象
  //     this.screenAdapter() // 完成屏幕适配
  //     this.updateChart() // 更新图表的展示
  //   }
  // }
}
</script>

<style scoped>
.rankchart {
  height: 100%;
  width: 100%;
}
.rankbody {
  height: 100%;
  width: 100%;
}
</style>
