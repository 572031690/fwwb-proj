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
      legendName: ["逗弄", "的撒", "的d"],
      seriesData: [
        {
          name: "逗弄",
          value: 65
        },
        {
          name: "的撒",
          value: 65
        },
        {
          name: "的d",
          value: 65
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
  height: 400px;
  width: 100%;
}
</style>
