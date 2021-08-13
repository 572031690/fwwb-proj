<template>
  <div class="welbody">
    <!-- <div class="welcomehome" ref="welcomehome">
                欢迎管理员回来！
        </div> -->
    <div class="bodyleft">
      123
      <div></div>
      <div></div>
    </div>
    <div><mapChina class="bodymap"></mapChina></div>
    <div class="bodyright">
      <div></div>
      <div></div>
    </div>

    <!-- <div ref="map_ref" class="bodymap"></div> -->
  </div>
</template>
<script>
import mapChina from "../../components/home-wel/MapChina.vue";
export default {
  components: {
    mapChina
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.welbody {
  height: 100%;
  width: 100%;
  background: #0d3465;
  display: flex;
  justify-content: center;
  align-items: center;
}
.welbody div {
  flex: 1;
  height: 100%;
}
.welbody div:nth-child(2) {
  flex: 2;
}
.bodymap {
  width: 45vw;
  height: 45vw;
  /* background-color: #031255; */
}
/* .welcomehome {
  line-height: 500px;
  text-align: center;
  font-size: 80px;
  color: #409eff;
} */
</style>
