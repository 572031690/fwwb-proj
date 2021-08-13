<template>
  <div id="mapchina">
    <div ref="map_ref" class="map"></div>
  </div>
</template>

<script>
import { planePath } from "../../assets/data/echarts";

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
      planePath: planePath
    };
  },
  mounted() {
    this.getMap();
  },
  methods: {
    async getMap() {
      console.log(this.planePath, "planePath");
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme);
      const ret = await this.$ajax.get(
        "http://localhost:8080/static/map/china.json"
      ); // 获得地图数据
      this.$echarts.registerMap("chinaMap", ret.data); // 注册map数据
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
}
</style>
