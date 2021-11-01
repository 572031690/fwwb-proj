<template>
  <div id="mapchina" @dblclick="revertMap">
    <div class="tipsText" v-if="inflag">双击中间任意位置返回中国地图</div>
    <div class="earthmap1"></div>
    <div class="earthmap2"></div>
    <div class="earthmap3"></div>
    <div ref="map_ref" class="map"></div>
  </div>
</template>

<script>
import { planePath } from '@/assets/data/echarts'
import { getProvinceMapInfo } from '@/assets/utils/map_utils'

export default {
  data () {
    return {
      mapData: {}, // 所获取的省份地图矢量数据缓存
      totalCount: 0,
      totalValue: 0,
      topCityData: [],
      chartInstance: null,
      effectScatterData: [],
      airData: [], // 地图销量和单价数据
      labelFormatter: [],
      lineSc: [],
      planePath,
      inflag: false
    }
  },
  mounted () {
    this.getMap()
    this.getCountryData()
    this.getCompanyData()
  },
  methods: {
    /**
     * @desc 获取地区销量统计数据
     */
    async getCountryData () {
      const url = 'home/driver/countrySale'
      await this.$api(url).then((res) => {
        this.airData = res
        // this.getMap()
        setTimeout(() => {
          this.upDataMap()
        }, 0)
        this.airData.forEach(item => {
          const lineData = {
            name: '',
            value: ''
          }
          lineData.name = item.name
          const currentValue = item.value * item.count
          lineData.value = Math.round(currentValue / 10000 * 10) / 10
          this.totalValue += currentValue
          this.totalCount += item.count
          this.topCityData.push(lineData)
        })
        this.$emit('backMapData', this.topCityData, this.totalCount, this.totalValue)
      })
    },
    /**
     * @desc 获取交易公司信息
     */
    async getCompanyData () {
      const url = 'home/driver/findAllCompany'
      await this.$api(url).then((res) => {
        const homeName = res[0].countyname
        const homePort = res[0].port.split(',')
        res.forEach((item, index) => {
          this.effectScatterData.push(item.port.split(','))
          this.labelFormatter.push({
            name: item.countyname,
            matter: item.matter
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
      })
    },
    /**
     * @desc 构建地图
     */
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
        geo: [

          {
            zoom: 1.2, // 默认显示级别
            layoutSize: '80%', // 设置地图占容器的大小百分比
            layoutCenter: ['50%', '50%'], // 设置地图中心点位置
            zlevel: 2,
            type: 'map',
            map: 'chinaMap', // chinaMap需要和registerMap中的第一个参数保持一致
            // roam: 'false', // true 设置允许缩放以及拖动的效果 也可以设置scale，move
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
          {
            map: 'chinaMap',
            // aspectScale: 0.7,  //这个参数用于 scale 地图的长宽比。geoBoundingRect.width / geoBoundingRect.height * aspectScale
            roam: false, // 是否允许缩放
            zoom: 1.2, // 默认显示级别
            layoutSize: '80%',
            layoutCenter: ['50.5%', '51.5%'],
            itemStyle: {
              // areaColor: '#005DDC',
              areaColor: 'black', // 'rgba(0,27,95,0.4)',
              // borderColor: '#004db5',
              borderWidth: 0
            },
            zlevel: 1,
            silent: true
          }
        ],
        series: [
          {
            // 地图数据
            data: [],
            // data: that.airData,
            geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
            type: 'map'
            // tooltip: {
            //   textStyle: {
            //     fontSize: 10
            //   },
            //   // 利用formatter来自定义tooltip展示的数据
            //   formatter: function (params, ticket, callback) {
            //     if (params.value) {
            //       return (
            //         params.name +
            //         '<br/>成交量：' +
            //         that.airData[params.dataIndex].count + '单<br/>' +
            //         '平均每单价格：' +
            //         params.value +
            //         '元<br/>'
            //       )
            //     } else {
            //       return ''
            //     }
            //   }
            // }
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
            // data: that.lineSc
            data: []
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
            data: []
            // data: that.lineSc,
            // tooltip: {
            //   // 利用formatter来自定义tooltip展示的数据
            //   formatter: function (params, ticket, callback) {
            //     return (
            //       params.data.fromName +
            //       '采购：<br/> 木材：' +
            //       params.data.value +
            //       '万吨'
            //     )
            //   }
            // }
          },
          {
            // 散点数据
            name: '杭州',
            data: [],
            zlevel: 2,
            // data: that.effectScatterData, // 配置散点的坐标数据
            type: 'effectScatter',
            coordinateSystem: 'geo', // 指明散点使用的坐标系统  geo的坐标系统
            rippleEffect: {
              scale: 3, // 设置涟漪动画的缩放比例
              brushType: 'stroke'
            }
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'right',
            //     formatter: function (params, ticket, callback) {
            //       return that.labelFormatter[params.dataIndex].name
            //     }
            //   }
            // },
            // tooltip: {
            //   textStyle: {
            //     fontSize: 10
            //   },
            //   // 利用formatter来自定义tooltip展示的数据
            //   formatter: function (params, ticket, callback) {
            //     return that.labelFormatter[params.dataIndex].matter
            //   }
            // }
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
      this.setonClick()
    },
    async setonClick () {
      // 监听点击
      this.chartInstance.on('click', async (arg) => {
        console.log(arg)
        if (this.inflag) return
        // console.log(arg)
        // 调用外部方法获取中文身份的拼音
        const provinceInfo = getProvinceMapInfo(arg.name)
        // 判断获取的地图数据是否已经缓存 如果不存在
        if (!this.mapData[provinceInfo.key]) {
          // 获取这个省份的地图矢量数据
          const ret = await this.$ajax.get(
            'http://localhost:8077' + provinceInfo.path
          )
          // 缓存数据
          this.mapData[provinceInfo.key] = ret.data
          this.$echarts.registerMap(provinceInfo.key, ret.data)
        }
        const changeOption = {
          geo: [
            {
              map: provinceInfo.key
            },
            {
              map: provinceInfo.key
            }
          ]
        }
        this.chartInstance.setOption(changeOption)
        this.inflag = true
      })
    },
    upDataMap () {
      const that = this
      const setUpOption = {
        series: [
          {
            data: that.airData,
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
                    that.airData[params.dataIndex].count + '单<br/>' +
                    '平均每单价格：' +
                    params.value +
                    '元<br/>'
                  )
                } else {
                  return ''
                }
              }
            }
          },
          {
            data: this.lineSc
          },
          {
            data: this.lineSc,
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
            data: this.effectScatterData, // 配置散点的坐标数据
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: (params, ticket, callback) => {
                  return this.labelFormatter[params.dataIndex].name
                }
              }
            },
            tooltip: {
              textStyle: {
                fontSize: 10
              },
              // 利用formatter来自定义tooltip展示的数据
              formatter: (params, ticket, callback) => {
                return this.labelFormatter[params.dataIndex].matter
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(setUpOption)
    },
    // 双击事件返回china
    revertMap () {
      if (!this.inflag) return
      const revertOption = {
        geo: [
          {
            map: 'chinaMap'
          },
          {
            map: 'chinaMap'
          }
        ]
      }
      this.chartInstance.setOption(revertOption)
      this.inflag = false
    }
  }
}
</script>

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
.tipsText {
  position: absolute;
  color: white;
  top: 10%;
  opacity: 0.8;
  z-index: 99999;
  background-color: rgb(84, 116, 177);
  border: 1px solid #031942;
  padding: 2px 5px;
}
</style>
