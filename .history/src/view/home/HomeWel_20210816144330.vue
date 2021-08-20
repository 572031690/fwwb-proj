<template>
  <div class="welbody">
    <!-- <div class="welcomehome" ref="welcomehome">
                欢迎管理员回来！
        </div> -->
    <div class="bodyleft">
      <div class="tabbody">
        <rankchart class="piechart"></rankchart>

        <div class="tabbodyafter"></div>
      </div>
      <div class="tabbody">
        <piechart class="piechart"></piechart>
        <div class="tabbodyafter"></div>
      </div>
    </div>
    <div class="tabmid">
      <div class="tabmidtop"></div>
      <mapChina></mapChina>
    </div>
    <div class="bodyright">
      <div class="tabbody">
        <linechart class="piechart"></linechart>
        <div class="tabbodyafter"></div>
      </div>
      <div class="tabbody"><div class="tabbodyafter"></div></div>
    </div>

    <!-- <div ref="map_ref" class="bodymap"></div> -->
  </div>
</template>
<script>
import mapChina from "@/components/home-wel/MapChina.vue";
import piechart from "@/components/home-wel/leftchart/piechart.vue";
import rankchart from "@/components/home-wel/leftchart/rankchart.vue";
import linechart from "@/components/home-wel/rightchart/linechart.vue";

export default {
  components: {
    mapChina,
    piechart,
    rankchart,
    linechart
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
  background: url(../../assets/img/line.png) no-repeat;
  background-size: 100% 100%;
  height: 49%;
  width: 97.3%;
  position: relative;
  margin: 5px;
  border: 1px solid rgba(47, 137, 207, 0.2);
  /* opacity: 0.3; */
}
.piechart {
  height: 100%;
  width: 100%;
}
.tabbody::after,
.tabbody::before,
.tabbodyafter::after,
.tabbodyafter::before {
  content: "";
  position: absolute;
  height: 10px;
  width: 10px;
}
.tabbody::after {
  top: 0px;
  left: 0px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.tabbody::before {
  top: 0px;
  right: 0px;
  border-top: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}
.tabbodyafter::after {
  bottom: 0px;
  left: 0px;
  border-bottom: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.tabbodyafter::before {
  bottom: 0px;
  right: 0px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}
.tabmid {
  /* display: flex; */
  /* padding-top: 180px; */
  /* justify-content: center; */
  /* align-items: center; */
  /* flex-direction: column; */
  position: relative;
}
.tabmidtop {
  position: absolute;
  /* height: 20%; */
  height: 120px;
  width: 60%;
  border: 2px solid black;
  left: 50%;
  transform: translate(-50%, 0); /* 50%为自身尺寸的一半 */
}
/* .bodymap { */
/* width: 41vw; */
/* height: 41vw; */
/* background-color: #031255; */
/* } */
/* .welcomehome {
  line-height: 500px;
  text-align: center;
  font-size: 80px;
  color: #409eff;
} */
</style>
