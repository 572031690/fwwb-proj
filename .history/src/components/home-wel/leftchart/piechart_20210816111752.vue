<template>
  <div id="pie-chart">
    123
    <div ref="pie_chart"></div>
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
          top: "5%",
          left: "center"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2
            },
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" }
            ]
          }
        ]
      };
      this.chartInstance.setOption(initOption);
    },
    async getData() {
      // const {data: ret} = await this.$http.get('rank')
      // this.allData = ret
      // this.updateChart();
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

<style></style>
