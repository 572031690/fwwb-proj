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
        "广东",
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
          name: "广东",
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
      ]
    };
  },
  mounted() {
    this.getinitChart();
    this.getData();
  },
  methods: {
    getinitChart() {
      this.chartInstance = this.$echarts.init(this.$refs.pie_chart);
      // 对图表初始化配置的控制
      const initOption = {
        tooltip: {
          trigger: "item"
        },
        legend: {
          bottom: "5%",
          left: "center"
        },
        series: [
          {
            type: "pie",
            // 饼图旁边文字显示和消失
            radius: ["40%", "50%"], // 第0个元素代表的是內圆的半径 第1个元素外圆的半径

            label: {
              show: false
            },
            // 设置高亮的显示内容
            emphasis: {
              label: {
                show: true
              },
              labelLine: {
                show: true
              }
            }
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
        legend: {
          data: this.legendName
        },
        series: [
          {
            data: this.seriesData
          }
        ]
      };
      this.chartInstance.setOption(dataOption);
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
