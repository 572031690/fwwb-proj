<template>
  <div class="welbody" ref="body_ref" id="body">
    <!-- <div class="welcomehome" ref="welcomehome">
                欢迎管理员回来！
        </div> -->
    <div class="bodyleft">
      <div class="tabbody">
        <rankchart class="piechart" :titleFontSize="titleFontSize"></rankchart>

        <div class="tabbodyafter"></div>
      </div>
      <div class="tabbody">
        <piechart class="piechart" :titleFontSize="titleFontSize"></piechart>
        <div class="tabbodyafter"></div>
      </div>
    </div>
    <div class="tabmid">
      <div class="tabmidtop">
        <div class="tabmidtopTitle">2021年统计</div>
        <div  class="tabmidtopBody" >
          <div class="tabmidtopBodyLeft">
            <span>15000 </span>
            <span> 单</span>
          </div>
          <div class="tabmidtopBodyRight">
            <span>25500 </span>
            <span> 万元</span>
          </div>
        </div>
        <div  class="tabmidtopBottom" >
          <div>
            销售单量
          </div>
          <div>
            销售额
          </div>
        </div>
      </div>
      <mapChina></mapChina>
    </div>
    <div class="bodyright">
      <div class="tabbody">
        <linechart class="piechart" :titleFontSize="titleFontSize"></linechart>
        <div class="tabbodyafter"></div>
      </div>
      <div class="tabbody">
        <totalchart
          class="piechart"
          :titleFontSize="titleFontSize"
        ></totalchart>
        <div class="tabbodyafter"></div>
      </div>
    </div>

    <!-- <div ref="map_ref" class="bodymap"></div> -->
  </div>
</template>
<script>
import mapChina from '@/components/home-wel/MapChina.vue'
import piechart from '@/components/home-wel/leftchart/piechart.vue'
import rankchart from '@/components/home-wel/leftchart/rankchart.vue'
import linechart from '@/components/home-wel/rightchart/linechart.vue'
import totalchart from '@/components/home-wel/rightchart/totalchart.vue'
import elementResizeDetectorMaker from 'element-resize-detector'
import '../../assets/图标字体/DS-DIGIT.TTF'
export default {
  components: {
    mapChina,
    piechart,
    rankchart,
    linechart,
    totalchart
  },
  data () {
    return {
      titleFontSize: 15
    }
  },
  mounted () {
    // window.addEventListener("resize", this.screenAdapter);
    // 在页面加载完成的时候, 主动进行屏幕的适配
    // setTimeout(() => {
    // this.screenAdapter();
    // }, 600);
    const _this = this
    const erd = elementResizeDetectorMaker()
    erd.listenTo(document.getElementById('body'), element => {
      _this.$nextTick(() => {
        // 监听到事件后执行的业务逻辑
        this.screenAdapter()
      })
    })
  },
  destroyed () {
    // 在组件销毁的时候, 需要将监听器取消掉
    // window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    screenAdapter () {
      this.titleFontSize = (this.$refs.body_ref.clientWidth / 100) * 0.8 // 15
      console.log(this.titleFontSize, 'titleFontSize132')
    }
  }
}
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
.bodyleft,
.bodyright {
  flex: 1;
  height: 100%;
  width: 25%;
  /* width: 22%;
  min-width: 22%;
  max-width: 22%; */
}
.tabmid {
  position: relative;
  flex: 2;
  width: 50%;
  height: 100%;
  /* width: 48%;
  min-width: 48%;
  max-width: 48%; */
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

.tabmidtop {
  position: absolute;
  /* height: 20%; */
  height: 120px;
  width: 60%;
  border: 2px solid rgb(13, 31, 107);
  left: 50%;
  background-color: rgb(13, 31, 107);
  transform: translate(-50%, 0); /* 50%为自身尺寸的一半 */
}
.tabmidtopTitle {
  color: white;
  font-size: 1.1vw;
  padding: 8px 15px 5px;
}
.tabmidtopBody{
  display: flex;
  height: 50px;
  width: 95%;
  margin: 0 auto;
  border: 1px solid rgba(47, 137, 207, 0.2);
}
/*引入图标字体文件*/
    @font-face {
        font-family: electronicFont;
        src: url(../../assets/图标字体/DS-DIGIT.TTF);
    }
.tabmidtopBodyLeft, .tabmidtopBodyRight {
  flex: 1;
  position: relative;
  color: rgb(255, 235, 123);
  text-align: center;
  font-size: 2vw;
  line-height: 50px;
  font-family: 'electronicFont'
}
.tabmidtopBodyLeft span:nth-child(2), .tabmidtopBodyRight span:nth-child(2) {
    font-size: 1vw;

}
.tabmidtopBodyLeft::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 35px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.tabmidtopBodyLeft::before {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  height: 35px;
  width: 2px;
  background-color:  rgba(46, 147, 224, 0.2);

}
.tabmidtopBodyRight::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  height: 15px;
  width: 35px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}
.tabmidtopBottom {
  display: flex;
  margin-top: 4px;
}
.tabmidtopBottom > div {
  font-size: 0.8vw;
  flex: 1;
  color: rgb(180, 187, 210);
  text-align: center;
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
