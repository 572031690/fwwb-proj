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
      chartInstance: null
    };
  },
  mounted() {
    this.getinitChart();
  },
  methods: {
    getinitChart() {
      this.chartInstance = this.$echarts.init(this.$refs.pie_chart, this.theme);
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: "| 热销商品的占比",
          top: 25,
          left: 25
        },
        // 顶部图例设置
        legend: {
          top: "13%",
          icon: "circle"
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
                show: false
              }
            }
          }
        ]
      };
    }
  }
};
</script>

<style></style>
