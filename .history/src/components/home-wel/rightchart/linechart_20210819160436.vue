<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="linechart">
    <!-- 地区销售排行榜 -->
    <div class="linebody" ref="line_ref"></div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  props: {
    titleFontSize: [Number]
  },
  watch: {
    titleFontSize: {
      handler: function(val) {
        // console.log("414141414141414141");
        this.chartInstance.resize();

        this.screenAdapter(val);
      }
    }
  },
  data() {
    return {
      chartInstance: null,
      allData: [
        {
          name: "1月",
          value: 230,
          value2: 150,
          value3: 212
        },
        {
          name: "2月",
          value: 214,
          value2: 170,
          value3: 180
        },
        {
          name: "3月",
          value: 203,
          value2: 120,
          value3: 110
        },
        {
          name: "4月",
          value: 310,
          value2: 150,
          value3: 212
        },
        {
          name: "5月",
          value: 289,
          value2: 150,
          value3: 212
        },
        {
          name: "6月",
          value: 207,
          value2: 180,
          value3: 212
        },
        {
          name: "7月",
          value: 189,
          value2: 190,
          value3: 212
        },
        {
          name: "8月",
          value: 195,
          value2: 102,
          value3: 320
        },
        {
          name: "9月",
          value: 160,
          value2: 210,
          value3: 110
        },
        {
          name: "10月",
          value: 140,
          value2: 150,
          value3: 150
        },
        {
          name: "11月",
          value: 170,
          value2: 160,
          value3: 140
        },
        {
          name: "12月",
          value: 106,
          value2: 217,
          value3: 112
        }
      ], // 服务器返回的数据
      endValue: 4,
      startValue: 0,
      timeId: null
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    // window.addEventListener("resize", this.screenAdapter);
    // 在页面加载完成的时候, 主动进行屏幕的适配
    // this.screenAdapter();
  },
  destroyed() {
    // 在组件销毁的时候, 需要将监听器取消掉
    // window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    // 初始化echartInstance对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.line_ref, this.theme);
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: "| 材料月增量统计",
          left: 20,
          top: 20,
          textStyle: {
            color: "white"
          }
        },
        legend: {
          top: "15%",
          right: "5%",
          textStyle: {
            color: "white"
          }
        },
        grid: {
          top: "33%",
          left: "0.5%",
          right: "3%",
          bottom: "7%",
          // 坐标轴位置是否包含文字
          containLabel: true
        },
        tooltip: {
          show: true,
          formatter: arg => {
            return (
              arg.seriesName +
              "</br>" +
              arg.marker +
              arg.name +
              "增加：" +
              arg.value +
              "万吨"
            );
          }
        },
        xAxis: {
          type: "category",
          // 把刻度标签里面的文字颜色设置为黑色
          boundaryGap: false, // x轴的第1个元素是否与y轴有距离

          axisLabel: {
            color: "white",
            interval: 0
          },
          // 坐标轴配置
          axisLine: {
            lineStyle: {
              color: "#5470c6"
            }
          },
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          name: "(万吨)",
          nameLocation: "end", // name的具体位置，可调整上中下左
          nameTextStyle: {
            color: "white",
            fonstSize: 15,
            padding: [0, 15, 0, 0]
          },
          type: "value",
          // 设置轴分割线的颜色
          splitLine: {
            lineStyle: {
              color: "#5470c6"
            }
          },
          // 把刻度标签里面的文字颜色设置为黑色
          axisLabel: {
            color: "white"
          }
        },
        series: [
          {
            name: "钢材",
            type: "line",
            stack: "all", // 堆叠图的设置
            smooth: true, // 是否为平滑线
            symbol: "circle", // 折线节点为小圆点
            symbolSize: "5" // 折线点大小
          },
          {
            name: "木材",
            type: "line",
            stack: "all", // 堆叠图的设置
            smooth: true, // 是否为平滑线
            symbol: "circle", // 折线节点为小圆点
            symbolSize: 5 // 折线点大小
          },
          {
            name: "煤炭",
            type: "line",
            stack: "all", // 堆叠图的设置
            smooth: true, // 是否为平滑线
            symbol: "circle", // 折线节点为小圆点
            symbolSize: 5 // 折线点大小
          }
        ]
      };
      this.chartInstance.setOption(initOption);
    },
    // 获取服务器的数据
    async getData() {
      // const {data: ret} = await this.$http.get('line')
      // this.allData = ret
      // this.allData.sort((a, b) => {
      //   return b.value - a.value;
      // });
      this.updateChart();
    },
    // 更新图表
    updateChart() {
      const colorArr = ["#ed3f35", "#01e2e5", "#596d90"];
      // 处理数据
      // 省份数据
      const provinceArr = this.allData.map(item => {
        return item.name;
      });
      // 销售金额数据
      const valueArr = this.allData.map(item => {
        return item.value;
      });
      const valueArr2 = this.allData.map(item => {
        return item.value2;
      });
      const valueArr3 = this.allData.map(item => {
        return item.value3;
      });
      const dataOption = {
        xAxis: {
          data: provinceArr
        },
        series: [
          {
            data: valueArr,
            lineStyle: {
              // 设置柱的样式

              color: colorArr[0]
            },
            itemStyle: {
              // 设置线拐点的样式
              borderColor: colorArr[0], // 折线点边框色
              color: "white",
              borderWidth: 2
            }
          },
          {
            data: valueArr2,
            lineStyle: {
              // 设置柱的样式
              color: colorArr[1]
            },
            itemStyle: {
              borderColor: colorArr[1], // 折线点边框色
              color: "white",
              borderWidth: 2
            }
          },
          {
            data: valueArr3,
            lineStyle: {
              // 设置柱的样式
              color: colorArr[2]
            },
            itemStyle: {
              borderColor: colorArr[2], // 折线点边框色
              color: "white",
              borderWidth: 2
            }
          }
        ]
      };
      this.chartInstance.setOption(dataOption);
    },
    // 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
    screenAdapter(val) {
      // 和分辨率大小相关的配置项
      // const titleFontSize = (this.$refs.line_ref.offsetWidth / 100) * 3.6; // 16.38
      // console.log("dsadasd");
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: val * 1.5
          }
        }
      };
      this.chartInstance.setOption(adapterOption);
      // 手动的调用图表对象的resize 才能产生效果
      this.chartInstance.resize();
    }
  }
  // computed: {
  //   ...mapState(['theme'])
  // },
  // watch: {
  //   theme() {
  //   //   console.log("主题切换了");
  //     this.chartInstance.dispose() // 销毁当前的图表格
  //     this.initChart() // 重新以最新的主题初始化图表对象
  //     this.screenAdapter() // 完成屏幕适配
  //     this.updateChart() // 更新图表的展示
  //   }
  // }
};
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
