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
        // this.chartInstance.resize();

        this.screenAdapter(val);
      },
      immediate: true
    }
  },
  data() {
    return {
      chartInstance: null,
      totalData: [702, 350, 610, 793, 664],
      surplusData: [70, 34, 60, 78, 69],
      DataName: ["钢材", "木材", "煤炭", "印度", "中国"]
      // 服务器返回的数据
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    // window.addEventListener("resize", this.screenAdapter);
    // 在页面加载完成的时候, 主动进行屏幕的适配
    // this.screenAdapter();
  },
  // destroyed() {
  //   // 在组件销毁的时候, 需要将监听器取消掉
  //   // window.removeEventListener("resize", this.screenAdapter);
  // },
  methods: {
    // 初始化echartInstance对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.line_ref, this.theme);
      var myColor = ["#1089E7", "#f57474", "#56D0e3", "#f8b448", "#8b78f6"];
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: "| 材料库存统计",
          left: 20,
          top: 20,
          textStyle: {
            color: "white"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          // 设置显示的文字内容
          formatter: function(args) {
            return (
              args[0].name +
              "库存：" +
              " " +
              (args[1].axisValue * args[0].value) / 100 +
              "万吨"
            );
          }
        },

        grid: {
          left: "10%",
          top: "30%",
          bottom: "5%",
          containLabel: true
        },
        // 不显示x轴
        xAxis: {
          show: false
        },
        yAxis: [
          {
            type: "category",
            // data: this.DataName, // 数据显示的时候会反过来
            inverse: true, // 是否不是反转数据 改成true就可以让原来反转的数据正过来了
            // 不显示y轴的线
            axisLine: {
              show: false
            },
            // 不显示y轴的小刻度
            axisTick: {
              show: false
            },
            // 把刻度标签里面的文字颜色设置为黑色
            axisLabel: {
              color: "white"
            }
          },
          {
            type: "category",
            // data: this.totalData, // 数据显示的时候会反过来
            inverse: true, // 是否不是反转数据 改成true就可以让原来反转的数据正过来了
            // 不显示y轴的线
            axisLine: {
              show: false
            },
            // 不显示y轴的刻度
            axisTick: {
              show: false
            },
            // 把刻度标签里面的文字颜色设置为黑色
            axisLabel: {
              textStyle: {
                color: "white",
                fontSize: 12
              },
              formatter: "{value} 万吨"
            }
          }
        ],
        series: [
          {
            yAxisIndex: 0, // 设置两个柱子重叠在一起的前后
            name: "条",
            type: "bar",
            // data: this.surplusData,
            // 设置第一类柱子的样式
            itemStyle: {
              barBorderRadius: 20,
              color: function(params) {
                return myColor[params.dataIndex]; // dataIndex当前柱子的索引号
              }
            },
            // 柱子的间距
            barCategoryGap: 50,
            // 柱子的宽度
            barWidth: 10,
            // 显示柱子内的文字
            label: {
              show: true,
              position: "inside", // 显示的位置在柱子的内部
              formatter: "{c}%" // 设置显示的文字的样式 c代表的就是他的data数据值    a代表系列名name，b代表数据名
            }
          },
          {
            yAxisIndex: 1, // 设置两个柱子重叠在一起的前后
            name: "框",
            barWidth: 15,
            barCategoryGap: 50,
            // data: [100, 100, 100, 100, 100],
            type: "bar",
            itemStyle: {
              barBorderRadius: 15,
              borderWidth: 3,
              borderColor: "#00c1de",
              color: "none" // 看不到柱子 取而代之的是上面的border
            }
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
      // 处理数据
      // 省份数据
      // const provinceArr = this.allData.map(item => {
      //   return item.name;
      // });
      // // 销售金额数据
      // const valueArr = this.allData.map(item => {
      //   return item.value;
      // });
      // const valueArr2 = this.allData.map(item => {
      //   return item.value2;
      // });
      // const valueArr3 = this.allData.map(item => {
      //   return item.value3;
      // });
      const that = this;
      const dataOption = {
        yAxis: [
          {
            data: that.DataName // 数据显示的时候会反过来
          },
          {
            data: that.totalData // 数据显示的时候会反过来
          }
        ],
        series: [
          {
            data: that.surplusData
          },
          {
            data: [100, 100, 100, 100, 100]
          }
        ]
      };
      this.chartInstance.setOption(dataOption);
    },
    // 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
    screenAdapter(val) {
      // 和分辨率大小相关的配置项
      // const titleFontSize = (this.$refs.line_ref.offsetWidth / 100) * 3.6; // 16.38
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
