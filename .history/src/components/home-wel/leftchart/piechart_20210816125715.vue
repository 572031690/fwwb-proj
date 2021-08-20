<template>
  <div id="pie-chart">
    <div class="piebody" ref="pie_chart">123</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      legendName: [
        "广东",
        "北京",
        "江苏",
        "浙江",
        "青海",
        "澳门",
        "黑龙江",
        "山东",
        "河北",
        "江西"
      ],
      seriesData: [
        {
          name: "广东",
          value: 654.5
        },
        {
          name: "北京",
          value: 650.2
        },
        {
          name: "江苏",
          value: 525.3
        },
        {
          name: "浙江",
          value: 125.3
        },
        {
          name: "青海",
          value: 225.3
        },
        {
          name: "澳门",
          value: 125.3
        },
        {
          name: "黑龙江",
          value: 85.3
        },
        {
          name: "山东",
          value: 325.3
        },
        {
          name: "河北",
          value: 255.3
        },
        {
          name: "江西",
          value: 725.3
        }
      ],
      titleFontSize: ""
    };
  },
  mounted() {
    this.getinitChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    // 在页面加载完成的时候, 主动进行屏幕的适配
    this.screenAdapter();
    // window.onresize = this.chartInstance.resize;
  },
  beforeDestroy() {
    // 在组件销毁的时候, 需要将监听器取消掉
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    getinitChart() {
      this.chartInstance = this.$echarts.init(this.$refs.pie_chart);
      // 对图表初始化配置的控制
      const initOption = {
        tooltip: {
          trigger: "item",
          formatter: arg => {
            return arg.marker + arg.name + " : " + arg.value + "万元"; // marker就是前面有颜色的标记球
          }
        },
        title: {
          text: "| 全国销量比TOP10",
          top: 25,
          left: 25,
          textStyle: {
            color: "white"
          }
        },
        legend: [
          {
            left: "center",
            bottom: "5%",

            textStyle: {
              color: "white"
            }
          },
          {
            left: "center",
            bottom: "0%",

            textStyle: {
              color: "white"
            }
          }
        ],
        series: [
          {
            type: "pie",
            // 饼图旁边文字显示和消失
            radius: ["30%", "50%"], // 第0个元素代表的是內圆的半径 第1个元素外圆的半径
            selectedMode: "single", // 选中的效果,能够将选中的区域偏离圆点一小段距离，并点击其他的时候恢复

            label: {
              show: true,
              color: "white",
              formatter: arg => {
                console.log(arg);
                return arg.name + ":" + arg.percent.toFixed(1) + "%";
              }
            },
            labelLine: {
              show: true
            }
            // }
          }
        ]
      };
      this.chartInstance.setOption(initOption);
    },
    async getData() {
      // const {data: ret} = await this.$http.get('rank')
      // this.allData = ret
      this.updateChart();
    },
    updateChart() {
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
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.pie_chart.offsetWidth / 100) * 3.6; // 15.3
      console.log(this.titleFontSize);
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize * 1.5
          }
        },
        legend: [
          {
            itemWidth: this.titleFontSize * 1.5,
            itemHeight: this.titleFontSize,
            itemGap: this.titleFontSize / 2,
            textStyle: {
              fontSize: this.titleFontSize / 1.2
            }
          },
          {
            itemWidth: this.titleFontSize * 1.5,
            itemHeight: this.titleFontSize,
            itemGap: this.titleFontSize / 2,
            textStyle: {
              fontSize: this.titleFontSize / 1.2
            }
          }
        ],
        series: [
          {
            // 设置半径
            radius: this.titleFontSize * 6.5
            // 设置圆的中心点
            // center: ["51%", "60%"]
          }
        ]
      };
      this.chartInstance.setOption(adapterOption);
      // 手动的调用图表对象的resize 才能产生效果
      this.chartInstance.resize();
    }
  }
};
</script>

<style>
.pie-chart {
  height: 100%;
  width: 100%;
}
.piebody {
  height: 100%;
  width: 100%;
}
</style>
