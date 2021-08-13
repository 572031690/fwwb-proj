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
      var airData = [
        { name: "北京", value: 39.92, count: 35 },
        { name: "天津", value: 39.13, count: 35 },
        { name: "上海", value: 31.22, count: 35 },
        { name: "重庆", value: 0, count: 35 },
        { name: "河北", value: 147, count: 35 },
        { name: "河南", value: 113, count: 35 },
        { name: "云南", value: 25.04, count: 35 },
        { name: "辽宁", value: 50, count: 35 },
        { name: "黑龙江", value: 114, count: 35 },
        { name: "湖南", value: 175, count: 35 },
        { name: "安徽", value: 117, count: 35 },
        { name: "山东", value: 92, count: 35 },
        { name: "新疆", value: 84, count: 35 },
        { name: "江苏", value: 0, count: 35 },
        { name: "浙江", value: 0, count: 35 },
        { name: "江西", value: 96, count: 35 },
        { name: "湖北", value: 273, count: 35 },
        { name: "广西", value: 0, count: 35 },
        { name: "甘肃", value: 0, count: 35 },
        { name: "山西", value: 39, count: 35 },
        { name: "内蒙古", value: 0, count: 35 },
        { name: "陕西", value: 61, count: 35 },
        { name: "吉林", value: 51, count: 35 },
        { name: "福建", value: 29, count: 35 },
        { name: "贵州", value: 71, count: 35 },
        { name: "广东", value: 38, count: 35 },
        { name: "青海", value: 57, count: 35 },
        { name: "西藏", value: 0, count: 35 },
        { name: "四川", value: 58, count: 35 },
        { name: "宁夏", value: 0, count: 35 },
        { name: "海南", value: 54, count: 35 },
        { name: "台湾", value: 88, count: 35 },
        { name: "香港", value: 66, count: 35 },
        { name: "澳门", value: 77, count: 35 },
        { name: "南海诸岛", value: 0, count: 35 }
      ];
      var labelFormatter = [
        { name: "杭州", matter: "公司总部：杭州钢材科技公司" },
        { name: "拉萨", matter: "钢材公司1" },
        { name: "广州", matter: "钢材公司2" },
        { name: "西安", matter: "钢材公司3" }
      ];

      var lineSc = [
        {
          coords: [
            [91.1865, 30.1465],
            [120.213042, 29.86119]
          ],
          fromName: "拉萨",
          toName: "杭州",
          value: 100
        },
        {
          coords: [
            [113.5107, 23.2196],
            [120.213042, 29.86119]
          ],
          fromName: "广州",
          toName: "杭州",
          value: 100
        },
        {
          coords: [
            [109.1162, 34.2004],
            [120.213042, 29.86119]
          ],
          fromName: "西安",
          toName: "杭州",
          value: 100
        }
      ];
      var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
      // 基于准备好的dom，初始化echarts实例
      const mCharts = this.$echarts.init(document.getElementById("echartsmap"));
      // 绘制图表
      mCharts.setOption({
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
