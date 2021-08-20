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
        }
      };
    }
  }
};
</script>

<style></style>
