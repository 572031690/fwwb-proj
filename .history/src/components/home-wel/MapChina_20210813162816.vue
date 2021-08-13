<template>
  <div id="mapchina">
    <div class="earthmap1"></div>
    <div class="earthmap2"></div>
    <div class="earthmap3"></div>
    <!-- <img src="../../assets/img/map.png" alt="" class="earthmap" /> -->
    <div ref="map_ref" class="map"></div>
  </div>
</template>

<script>
import { planePath } from "@/assets/data/echarts";

export default {
  data() {
    return {
      mapData: {}, // 所获取的省份地图矢量数据缓存
      chartInstance: null,
      effectScatterData: [
        [120.213042, 29.86119],
        [91.1865, 30.1465],
        [113.5107, 23.2196],
        [109.1162, 34.2004]
      ],
      planePath
    };
  },
  mounted() {
    this.getMap();
  },
  methods: {
    async getMap() {
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
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme);
      const ret = await this.$ajax.get(
        "http://localhost:8080/static/map/china.json"
      ); // 获得地图数据
      this.$echarts.registerMap("chinaMap", ret.data); // 注册map数据
      // 绘制图表
      const setOption = {
        tooltip: {
          // 鼠标一上去的信息框
          trigger: "item"
        },
        geo: {
          type: "map",
          map: "chinaMap", // chinaMap需要和registerMap中的第一个参数保持一致
          roam: true, // 设置允许缩放以及拖动的效果
          label: {
            show: true, // 展示标签
            textStyle: {
              fontSize: 12,
              textWeight: 900,
              color: "white"
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#416cbb", // 地图区域的颜色。
              borderColor: "#fff", // 图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
              shadowColor: "black", // 阴影颜色。#41587f
              shadowBlur: 8, // 图形阴影的模糊大小。
              opacity: 0.75 // 图形透明度
            },
            emphasis: {
              areaColor: "#fdd145"
            }
          }
        },
        series: [
          {
            // 地图数据
            data: airData,
            geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
            type: "map",
            tooltip: {
              textStyle: {
                fontSize: 10
              },
              // 利用formatter来自定义tooltip展示的数据
              formatter: function(params, ticket, callback) {
                if (params.value) {
                  console.log(params.value);
                  return (
                    params.name +
                    "<br/>成交量：" +
                    params.value +
                    "单<br/>" +
                    "平均标签价格：" +
                    airData[params.dataIndex].count +
                    "元<br/>"
                  );
                } else {
                  return "";
                }
              }
            }
          },
          {
            // 动态红线
            name: " 杭州 Top3",
            type: "lines",
            zlevel: 1, // zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面。
            effect: {
              show: true,
              period: 4, // 动画的快慢
              trailLength: 0.7, // 红线的宽度
              color: "red", // arrow箭头的颜色
              symbolSize: 3 // 红线的宽度
            },
            lineStyle: {
              width: 0,
              curveness: 0.2 // 弯曲度
            },
            data: lineSc
          },
          {
            // 箭头线
            name: " 杭州 Top3",
            type: "lines",
            zlevel: 2,
            symbol: ["none", "arrow"],
            symbolSize: 10, // 设置箭头的大小
            effect: {
              show: true,
              period: 4,
              trailLength: 0, // 红线的宽度 设置为零只显示飞机
              symbol: this.planePath,
              symbolSize: 18
            },
            lineStyle: {
              normal: {
                width: 2,
                opacity: 0.6,
                curveness: 0.2
              }
            },
            data: lineSc,
            tooltip: {
              // 利用formatter来自定义tooltip展示的数据
              formatter: function(params, ticket, callback) {
                console.log(params);
                return (
                  params.data.fromName +
                  "采购：<br/> 木材：" +
                  params.data.value +
                  "万吨"
                );
              }
            }
          },
          {
            // 散点数据
            name: "杭州",
            data: this.effectScatterData, // 配置散点的坐标数据
            type: "effectScatter",
            coordinateSystem: "geo", // 指明散点使用的坐标系统  geo的坐标系统
            rippleEffect: {
              scale: 3, // 设置涟漪动画的缩放比例
              brushType: "stroke"
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: function(params, ticket, callback) {
                  return labelFormatter[params.dataIndex].name;
                }
              }
            },
            tooltip: {
              textStyle: {
                fontSize: 10
              },
              // 利用formatter来自定义tooltip展示的数据
              formatter: function(params, ticket, callback) {
                return labelFormatter[params.dataIndex].matter;
              }
            }
          }
        ],
        visualMap: {
          // 渐变分层显示
          type: "piecewise", // 分层
          min: 0,
          max: 300,
          text: ["高", "低"], // 两端的文本，如 ['High', 'Low']
          showLabel: true, // 是否显示每项的文本标签
          orient: "horizontal", // 图例排列方向 水平horizontal 垂直vertical
          left: "center",
          textStyle: {
            // 设置文字颜色（Demo左下组件）
            color: "white",
            fontSize: 12
          },

          pieces: [
            // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
            { gt: 200, lte: 300, label: "200~300", color: "#0357C2" }, // (500, 900]
            { gt: 100, lte: 200, label: "100~200", color: "#187EFF" }, // (310, 500]
            { gt: 50, lte: 100, label: "50~100", color: "#9DC9FF" }, // (200, 300]
            { gt: 0, lte: 50, label: "0~50人", color: "#B8E2FF" }, // (10, 200]
            { value: 0, label: "无数据", color: "#fff" } // [0]
          ]
        }
      };
      this.chartInstance.setOption(setOption);
      // 跟随屏幕自适应
      window.onresize = this.chartInstance.resize;
    }
  }
};
</script>

<style scoped>
#mapchina {
  position: relative;
}
.earthmap1 {
  background-image: url(../../assets/img/map.png) no-repeat;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); /* 50%为自身尺寸的一半 */
  opacity: 0.3;
}
.map {
  /* opacity: 0; */
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
}
</style>
