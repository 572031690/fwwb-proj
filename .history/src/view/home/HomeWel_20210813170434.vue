<template>
  <div class="welbody">
    <!-- <div class="welcomehome" ref="welcomehome">
                欢迎管理员回来！
        </div> -->
    <mapChina class="bodymap"></mapChina>
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
.bodymap {
  width: 40vw;
  height: 40vw;
  /* background-color: #031255; */
}
/* .welcomehome {
  line-height: 500px;
  text-align: center;
  font-size: 80px;
  color: #409eff;
} */
</style>
