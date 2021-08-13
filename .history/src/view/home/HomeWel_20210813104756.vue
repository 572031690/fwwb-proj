<template>
  <div>
    <!-- <div class="welcomehome" ref="welcomehome">
                欢迎管理员回来！
        </div> -->
    <div
      id="echartsmap"
      style="width: 1000px;height:800px;background-color:#031255;border: 1px solid #eee;"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.getMap();
  },
  methods: {
    getMap() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById("echartsmap"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
.welcomehome {
  line-height: 500px;
  text-align: center;
  font-size: 80px;
  color: #409eff;
}
</style>
