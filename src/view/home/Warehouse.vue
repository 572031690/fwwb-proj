<template>
  <div class="right-body" id="body">
    <div class="overbox">
      <div class="bodyheart">
        <div class="body-top">
          <div class="bodytop-heart">
            <el-row>
              <el-col :span="8"
                ><img src="../../assets/img/查询数据列表.png" />
                <span>仓库列表</span></el-col
              >
              <el-col :span="8">
                <div class="searchfa">
                  <!-- 搜索框 -->
                  <div class="search">
                    <div class="search-right">
                      <input
                        type="text"
                        placeholder="请输入用户姓名"
                        @change="search"
                        v-model="params.dname"
                      />
                      <button type="button" @click="search"></button>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col
                :span="8"
                v-if="
                  $store.getters.getPermission.includes(
                    'depository:addDepository'
                  )
                "
              >
                <button class="bodyadd" @click="gethomeAdd()">
                  <i class="el-icon-plus"></i>添加
                </button></el-col
              >
            </el-row>
          </div>
        </div>
        <div
          class="tablebody"
          v-loading="loading2"
          element-loading-text="拼命加载中"
        >
          <div class="mytable">
            <div class="table-top">
              <div
                v-for="(item, index) in tableText.tableTitle"
                :key="index"
                colspan="1"
                rowspan="1"
                :class="
                  item === '描述'
                    ? 'htop-th3'
                    : item === '需求单名'
                    ? 'htop-th7'
                    : 'htop-th1'
                "
              >
                <div class="cell">{{ item }}</div>
              </div>
            </div>
            <vNone v-if="!list.length" />
            <div class="tbody">
              <div class="bodyLine" v-for="(item, key) in list" :key="key">
                <div
                  v-for="(data, index) in tableText.tableBody"
                  :key="index"
                  :class="{ 'body-td4': data === 'comment' }"
                >
                  <div class="cell" v-if="data !== 'opetation'">
                    {{ item[data] }}
                  </div>

                  <div class="cell" v-if="data === 'opetation'">
                    <button class="modify" @click="seeData(item)">修改</button>
                    <button
                      class="delete"
                      @click="
                        deletedata(
                          { id: item.id },
                          'home/warehouse/deleteDepository'
                        )
                      "
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <vDialog
            ref="addDialog"
            :dialogFormShow="dialogFormShow"
            @updata="search"
            :editDisabled="editDisabled"
            @closeaddDialog="closeaddDialog"
            :IntList="IntList"
            :currentList="currentList"
            :openType="openType"
            name="warehouse"
          >
          </vDialog>
        </div>
        <div class="table-bottom">
          <!-- 底部页码功能 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-sizes="[5, 10]"
            :page-size="params.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="params.total"
          >
          </el-pagination>
        </div>

        <!-- <div class="echarts" ref="echarts"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
import homeMix from '../../assets/mixins/home-mixins'
import { monthData } from '../../assets/data/month'

export default {
  mixins: [homeMix],
  data () {
    return {
      allData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], // 服务器返回的数据 // 服务器返回的数据
      editDisabled: ['id'],
      tableText: '',
      dialogFormShow: false,
      IntList: ['stock', 'totalstock'],
      list: [],
      loading2: true
    }
  },
  created () {
    if (
      this.$store.getters.getPermission.includes(
        'depository:updateDepository'
      ) &&
      this.$store.getters.getPermission.includes('depository:deleteDepository')
    ) {
      this.tableText = this.$tables.warehouseList
    } else {
      this.tableText = this.$tables.warehouseSeeList
    }
  },
  mounted () {
    this.thistime = setInterval(() => {
      this.search()
    }, 10000)
    // this.getCharts()
    // this.getData()
    this.$emit('changeRouterIndex', this.$route.query.routerIndex)
    this.getSearchUrl()
    // 调用方法获取后端数据
    this.search()
  },
  beforeDestroy () {
    clearInterval(this.thistime)
  },
  methods: {
    /**
     * @desc 获取服务器的数据
     */
    async getData () {
      const url = 'home/driver/monthSales'
      await this.$api(url).then((res) => {
        const series = []
        res.forEach((item) => {
          const type = {
            barWidth: 15,
            data: [],
            name: item.materiakName,
            stack: '信访', // 关键是stack一致
            type: 'bar'
          }
          this.allData.forEach((value) => {
            type.data.push(item[monthData[value]])
          })
          series.push(type)
        })
        console.log(series, 'series')
        this.getCharts(series)
      })
    },
    getCharts (series) {
      this.$nextTick(() => {
        const chance = this.$echarts.init(this.$refs.echarts)
        chance.setOption(this.getOption(series))
        // 跟随屏幕自适应
        window.onresize = chance.resize
      })
    },
    getOption (series) {
      const color = ['#1976d2', '#03a9f4', '#85c941', '#d9cc4c', '#ee8e00']
      const xdata = this.allData
      const option = {
        title: {
          text: '2021材料月销量统计',
          left: 'center',
          top: 15,
          textStyle: {
            color: 'rgba(0,0,0,0.6)',
            fontWeight: 700,
            fontSize: 20
          }
        },
        tooltip: { // 过滤掉统计的series

          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            const resultArr = params.reverse()
            let str = `<div><div>${params[0].axisValue}</div>`
            resultArr.forEach(item => {
              str += `<div style="display:flex;height:20px;align-items:center;">
                        <div style="width: 140px">${item.seriesName}</div>
                        <div style='font-family:Bebas Neue;color: ${color[item.componentIndex]};font-size: 16px;'>${item.value}</div>
                        <span>万吨</span>
                    </div></div>`
            })
            return str
          }
        },
        color,
        grid: {
          top: '65',
          left: '60',
          bottom: 40,
          right: '20'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#000',
              fontSize: 20,
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: '#038b8f'
              }
            },
            data: xdata
          }
        ],
        yAxis: [
          {
            name: '(万吨)',
            nameTextStyle: {
              fontSize: 16,
              color: 'rgba(0,0,0, 0.6)',
              fontWeight: 'bold',
              padding: [0, 30, 4, 0] // 设置位置
            },

            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(3,139,143,0.1)', 'rgba(255,255,255,0)']
              },
              interval: 1
            },
            axisLabel: {
              color: 'rgba(0,0,0,0.6)',
              fontWeight: 'bold',
              fontSize: 16
            }
          }
        ],
        series: series
      }
      return option
    },
    /**
     * @desc 请求列表数据
     */
    getSearchUrl () {
      this.searchUrl = 'home/warehouse/findDepository'
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../assets/less/right-table.less");
.echarts {
    height: 380px;
    width: 82%;
    margin: 20px auto 0;
    // border: 1px solid red;
    background: rgba(255,255,255,1);
    border-radius: 15px
}
.searchfa {
  margin-left: 35px;
}
.search {
  margin-left: 5px;
  float: left;
  height: 30px;
  input {
    float: left;
    border: none;
    outline: none;
    width: 95.5%;
    height: 30px;
    padding-left: 13px;
    border: 2px solid #dadce0;
    border-right: 0;
    border-radius: 5px;
    color: black;
    font-size: 16px;
  }
  button {
    float: left;
    border: none;
    outline: none;
    height: 30px;
    width: 45px;
    cursor: pointer;
    position: absolute;
    top: 1.6px;
    right: 0;
    background: #dadce0;
    border-radius: 0 5px 5px 0;
    &:hover {
      background-color: #c8c8c8;
      box-shadow: 0 0 3px #c8c8c8;
    }
    &:active {
      padding-left: 1px;
      padding-top: 1px;
      background: #dadce0;
    }
    &:before {
      content: "\f002";
      font-family: FontAwesome;
      font-size: 16px;
      color: #f9f0da;
    }
  }
}
</style>
