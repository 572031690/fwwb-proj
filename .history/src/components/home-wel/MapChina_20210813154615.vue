<template>
  <div id="mapchina">
    <div ref="map_ref" class="map"></div>
  </div>
</template>

<script>
import { planePath } from "../../assets/data/echarts";

export default {};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
}
</style>
