<template>
  <div class="welbody">
    <!-- <div class="welcomehome" ref="welcomehome">
                欢迎管理员回来！
        </div> -->
    <div class="bodyleft">
      <div class="tabbody"></div>
      <div class="tabbody"></div>
    </div>
    <div><mapChina class="bodymap"></mapChina></div>
    <div class="bodyright">
      <div class="tabbody"></div>
      <div class="tabbody"></div>
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
.welbody > div {
  flex: 1;
  height: 100%;
}
.welbody div:nth-child(2) {
  flex: 2;
}
.tabbody {
  height: 50%;
  position: relative;
  /* border: 1px solid black; */
}
.tabbody::after {
  content: "";
  position: absolute;
  height: 20px;
  width: 20px;
  top: 1px;
  left: 1px;
  border-top: 1px solid black;
  border-left: 1px solid black;
}
.tabbody::before {
  content: "";
  position: absolute;
  height: 20px;
  width: 20px;
  top: 1px;
  right: 1px;
  border-top: 1px solid black;
  border-right: 1px solid black;
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
