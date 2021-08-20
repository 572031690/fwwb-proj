<template>
  <div class="welbody">
    <!-- <div class="welcomehome" ref="welcomehome">
                欢迎管理员回来！
        </div> -->
    <div class="bodyleft">
      <div class="tabbody">
        <div class="tabbodyafter"></div>
      </div>
      <div class="tabbody">
        <div class="tabbodyafter"></div>
      </div>
    </div>
    <div class="tabmid">
      <div class="tabmidtop"></div>
      <mapChina></mapChina>
    </div>
    <div class="bodyright">
      <div class="tabbody"><div class="tabbodyafter"></div></div>
      <div class="tabbody"><div class="tabbodyafter"></div></div>
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
  top: 2px;
  left: 2px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.tabbody::before {
  top: 2px;
  right: 2px;
  border-top: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}
.tabbodyafter::after {
  bottom: 2px;
  left: 2px;
  border-bottom: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.tabbodyafter::before {
  bottom: 2px;
  right: 2px;
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
  /* position: absolute; */
  top: 0;
  border: 2px solid black;
  /* height: 20%; */
  height: 96px;
  width: 60%;
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
