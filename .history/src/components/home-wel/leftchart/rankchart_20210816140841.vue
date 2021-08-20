<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="rankchart">
    <!-- 地区销售排行榜 -->
    <div class="rankbody" ref="rank_ref"></div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  data() {
    return {
      chartInstance: null,
      allData: [
        {
          name: "1月",
          value: 230
        },
        {
          name: "2月",
          value: 214
        },
        {
          name: "3月",
          value: 203
        },
        {
          name: "4月",
          value: 310
        },
        {
          name: "5月",
          value: 289
        },
        {
          name: "6月",
          value: 207
        },
        {
          name: "7月",
          value: 189
        },
        {
          name: "8月",
          value: 195
        },
        {
          name: "9月",
          value: 160
        },
        {
          name: "10月",
          value: 140
        },
        {
          name: "11月",
          value: 170
        },
        {
          name: "12月",
          value: 106
        }
      ], // 服务器返回的数据
      endValue: 9,
      startValue: 0,
      timeId: null
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    // 在页面加载完成的时候, 主动进行屏幕的适配
    this.screenAdapter();
  },
  destroyed() {
    // 在组件销毁的时候, 需要将监听器取消掉
    window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timeId);
  },
  methods: {
    // 初始化echartInstance对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.rank_ref, this.theme);
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: "| 地区销售排行榜",
          left: 20,
          top: 20,
          textStyle: {
            color: "white"
          }
        },
        grid: {
          top: "30%",
          left: "5%",
          right: "5%",
          bottom: "10%",
          // 坐标轴位置是否包含文字
          containLabel: true
        },
        tooltip: {
          show: true
        },
        xAxis: {
          type: "category",
          // 把刻度标签里面的文字颜色设置为黑色
          axixLabel: {
            color: "white"
          },
          // 坐标轴配置
          axisLine: {
            lineStyle: {
              color: "#263a52"
            }
          }
        },
        yAxis: {
          type: "value",
          // 设置轴分割线的颜色
          splitLine: {
            lineStyle: {
              color: "#263a52"
            }
          }
        },
        series: [
          {
            type: "bar"
          }
        ]
      };
      this.chartInstance.setOption(initOption);
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timeId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    // 获取服务器的数据
    async getData() {
      // const {data: ret} = await this.$http.get('rank')
      // this.allData = ret
      // this.allData.sort((a, b) => {
      //   return b.value - a.value;
      // });
      this.updateChart();
      this.startInterval();
    },
    // 更新图表
    updateChart() {
      const colorArr = [
        ["#0BA82C", "#4FF778"],
        ["#2E72BF", "#23E5E5"],
        ["#5052EE", "#AB6EE5"]
      ];
      // 处理数据
      // 省份数据
      const provinceArr = this.allData.map(item => {
        return item.name;
      });
      // console.log(provinceArr)
      // 销售金额数据
      const valueArr = this.allData.map(item => {
        return item.value;
      });
      const dataOption = {
        xAxis: {
          data: provinceArr
        },
        // 显示表格底部拖动显示条
        dataZoom: {
          show: false, // 隐藏
          startValue: this.startValue,
          endValue: this.endValue
        },
        series: [
          {
            data: valueArr,
            itemStyle: {
              // 设置柱的颜色
              color: arg => {
                //   console.log(arg);
                let targetColorArr = null;
                if (arg.value > 300) {
                  targetColorArr = colorArr[0];
                } else if (arg.value > 200) {
                  targetColorArr = colorArr[1];
                } else {
                  targetColorArr = colorArr[2];
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColorArr[0]
                  },

                  {
                    offset: 1,
                    color: targetColorArr[1]
                  }
                ]);
              }
            }
          }
        ]
      };
      this.chartInstance.setOption(dataOption);
    },
    // 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
    screenAdapter() {
      // 和分辨率大小相关的配置项
      const titleFontSize = (this.$refs.rank_ref.offsetWidth / 100) * 3.6; // 16.38
      console.log(titleFontSize);
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize * 1.5
          }
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0]
            }
          }
        ]
      };
      this.chartInstance.setOption(adapterOption);
      // 手动的调用图表对象的resize 才能产生效果
      this.chartInstance.resize();
    },
    startInterval() {
      if (this.timeId) {
        clearInterval(this.timeId);
      }
      this.timeId = setInterval(() => {
        this.startValue++;
        this.endValue++;
        if (this.endValue > this.allData.length - 1) {
          this.endValue = 5;
          this.startValue = 0;
        }
        this.updateChart();
      }, 1000);
    }
  }
  // computed: {
  //   ...mapState(['theme'])
  // },
  // watch: {
  //   theme() {
  //   //   console.log("主题切换了");
  //     this.chartInstance.dispose() // 销毁当前的图表格
  //     this.initChart() // 重新以最新的主题初始化图表对象
  //     this.screenAdapter() // 完成屏幕适配
  //     this.updateChart() // 更新图表的展示
  //   }
  // }
};
</script>

<style scoped>
.rankchart {
  height: 100%;
  width: 100%;
}
.rankbody {
  height: 100%;
  width: 100%;
}
</style>
