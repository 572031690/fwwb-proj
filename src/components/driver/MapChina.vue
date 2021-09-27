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
import { planePath } from '@/assets/data/echarts'

export default {
  data () {
    return {
      mapData: {}, // 所获取的省份地图矢量数据缓存
      totalCount: 0,
      totalValue: 0,
      topCityData: [],
      chartInstance: null,
      effectScatterData: [
        // [120.213042, 29.86119],
        // [91.1865, 30.1465],
        // [113.5107, 23.2196],
        // [109.1162, 34.2004]
      ],
      airData: [],// 地图销量和单价数据
      labelFormatter: [
        // { name: '杭州', matter: '公司总部：杭州钢材科技公司' },
        // { name: '拉萨', matter: '钢材公司1' },
        // { name: '广州', matter: '钢材公司2' },
        // { name: '西安', matter: '钢材公司3' }
      ],
      lineSc: [
        // {
        //   coords: [
        //     [91.1865, 30.1465],
        //     [120.213042, 29.86119]
        //   ],
        //   fromName: '拉萨',
        //   toName: '杭州',
        //   value: 100
        // },
        // {
        //   coords: [
        //     [113.5107, 23.2196],
        //     [120.213042, 29.86119]
        //   ],
        //   fromName: '广州',
        //   toName: '杭州',
        //   value: 100
        // },
        // {
        //   coords: [
        //     [109.1162, 34.2004],
        //     [120.213042, 29.86119]
        //   ],
        //   fromName: '西安',
        //   toName: '杭州',
        //   value: 100
        // }
      ],
      planePath
    }
  },
  mounted () {
    this.getCountryData()
    this.getCompanyData()
  },
  methods: {
    async getCountryData () {
      const url = 'home/driver/countrySale'
       await this.$api(url).then((res) => {
         this.airData = res
         this.getMap()
         this.airData.forEach(item => {
           const lineData = {
              name: "",
              value: ''
            }
            lineData.name = item.name
            const currentValue = item.value * item.count 
            lineData.value = Math.round(currentValue/ 10000 * 10)/10
            this.totalValue += currentValue
            this.totalCount += item.count
            this.topCityData.push(lineData)
         })
         this.$emit('backMapData',this.topCityData,this.totalCount,this.totalValue)
      })
    },
    async getCompanyData () {
      const url = 'home/driver/findAllCompany'
        await this.$api(url).then((res) => {
          const homeName = res[0].countyname
          const homePort = res[0].port.split(',')
          res.forEach((item, index) => {
            this.effectScatterData.push(item.port.split(','))
            this.labelFormatter.push({
              name:item.countyname,
              matter:item.matter
            })
            const lineData = {
              coords: [],
              fromName: '',
              toName: '',
              value: 100
            }
            if (index) {
              lineData.fromName = item.countyname
              lineData.toName = homeName
              lineData.coords.push(item.port.split(','))
              lineData.coords.push(homePort)
              this.lineSc.push(lineData)
            }
          })
          console.log(this.lineSc,'.this.lineSc');
      })  
    },
    async getMap () {
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme)
      const ret = await this.$ajax.get(
        'http://localhost:8077/static/map/china.json'
      ) // 获得地图数据
      this.$echarts.registerMap('chinaMap', ret.data) // 注册map数据
      var that = this
      // 绘制图表
      const setOption = {
        tooltip: {
          // 鼠标一上去的信息框
          trigger: 'item'
        },
        geo: {
          type: 'map',
          map: 'chinaMap', // chinaMap需要和registerMap中的第一个参数保持一致
          roam: true, // 设置允许缩放以及拖动的效果
          label: {
            show: true, // 展示标签
            textStyle: {
              fontSize: 12,
              textWeight: 900,
              color: 'white'
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#416cbb', // 地图区域的颜色。
              borderColor: '#fff', // 图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
              shadowColor: 'black', // 阴影颜色。#41587f
              shadowBlur: 8, // 图形阴影的模糊大小。
              opacity: 0.75 // 图形透明度
            },
            emphasis: {
              areaColor: '#fdd145'
            }
          }
        },
        series: [
          {
            // 地图数据
            data: that.airData,
            geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
            type: 'map',
            tooltip: {
              textStyle: {
                fontSize: 10
              },
              // 利用formatter来自定义tooltip展示的数据
              formatter: function (params, ticket, callback) {
                if (params.value) {
                  return (
                    params.name +
                    '<br/>成交量：' +
                    that.airData[params.dataIndex].count+
                    '单<br/>' +
                    '平均每单价格：' +
                     params.value+
                    '元<br/>'
                  )
                } else {
                  return ''
                }
              }
            }
          },
          {
            // 动态红线
            name: ' 杭州 Top3',
            type: 'lines',
            zlevel: 1, // zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面。
            effect: {
              show: true,
              period: 4, // 动画的快慢
              trailLength: 0.7, // 红线的宽度
              color: 'red', // arrow箭头的颜色
              symbolSize: 3 // 红线的宽度
            },
            lineStyle: {
              width: 0,
              curveness: 0.2 // 弯曲度
            },
            data: that.lineSc
          },
          {
            // 箭头线
            name: ' 杭州 Top3',
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 10, // 设置箭头的大小
            effect: {
              show: true,
              period: 4,
              trailLength: 0, // 红线的宽度 设置为零只显示飞机
              symbol: that.planePath,
              symbolSize: 18
            },
            lineStyle: {
              normal: {
                width: 2,
                opacity: 0.6,
                curveness: 0.2
              }
            },
            data: that.lineSc,
            tooltip: {
              // 利用formatter来自定义tooltip展示的数据
              formatter: function (params, ticket, callback) {
                return (
                  params.data.fromName +
                  '采购：<br/> 木材：' +
                  params.data.value +
                  '万吨'
                )
              }
            }
          },
          {
            // 散点数据
            name: '杭州',
            data: that.effectScatterData, // 配置散点的坐标数据
            type: 'effectScatter',
            coordinateSystem: 'geo', // 指明散点使用的坐标系统  geo的坐标系统
            rippleEffect: {
              scale: 3, // 设置涟漪动画的缩放比例
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: function (params, ticket, callback) {
                  return that.labelFormatter[params.dataIndex].name
                }
              }
            },
            tooltip: {
              textStyle: {
                fontSize: 10
              },
              // 利用formatter来自定义tooltip展示的数据
              formatter: function (params, ticket, callback) {
                return that.labelFormatter[params.dataIndex].matter
              }
            }
          }
        ],
        visualMap: {
          // 渐变分层显示
          type: 'piecewise', // 分层
          min: 0,
          max: 300,
          text: ['高(平均单价)', '低'], // 两端的文本，如 ['High', 'Low']
          showLabel: true, // 是否显示每项的文本标签
          orient: 'horizontal', // 图例排列方向 水平horizontal 垂直vertical
          left: 'center',
          bottom: '5%',
          textStyle: {
            // 设置文字颜色（Demo左下组件）
            color: 'white',
            fontSize: 12
          },
          pieces: [
            // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
            { gt: 20000, lte: 9999999, label: '2万以上', color: '#0357C2' }, // (500, 900]
            { gt: 15000, lte: 20000, label: '1.5万~2万', color: '#187EFF' }, // (310, 500]
            { gt: 10000, lte: 15000, label: '1万~1.5万', color: '#9DC9FF' }, // (200, 300]
            { gt: 0, lte: 10000, label: '0~1万', color: '#B8E2FF' }, // (10, 200]
            { value: 0, label: '无数据', color: '#fff' } // [0]
          ]
        }
      }
      this.chartInstance.setOption(setOption)
      // 跟随屏幕自适应
      window.onresize = this.chartInstance.resize
    }
  }
}
</script>

<style scoped>
/* @import url(../../assets/CSS/约束缩放.css); */
</style>
<style scoped>
#mapchina {
  position: relative;
  width: 40vw;
  height: 40vw;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 93px;
}
.earthmap1,
.earthmap2,
.earthmap3 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); /* 50%为自身尺寸的一半 */
  /* z-index: 100; */
}
.earthmap1 {
  background: url(../../assets/img/map.png) no-repeat;
  background-size: 100% 100%;
  width: 70%;
  opacity: 0.3;
  height: 70%;
}
.earthmap2 {
  background: url(../../assets/img/lbx.png) no-repeat;
  background-size: 100% 100%;
  opacity: 0.5;
  width: 80%;
  height: 80%;
  animation: rotate 15s linear infinite; /* infinite代表无限循环 */
  /* z-index: 100; */
}
.earthmap3 {
  background: url(../../assets/img/jt.png) no-repeat;
  background-size: 100% 100%;
  width: 75%;
  opacity: 0.5;
  height: 75%;
  border-radius: 50%;

  animation: rotateline 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes rotateline {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
