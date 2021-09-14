<template>
  <div id="Home" ref="gobacklogin">
    <div :class="{ leftNavigation: navshow, leftNavigationChange: !navshow }">
      <div v-for="(item,index) in routerList" v-show="item.showtab" :key="index">
        <div @click="judgeType(item)" class="navhome">
          <img :src="item.imgSrc" class="navhome-img" />
          <span class="spans1" :ref="item.ref">{{ item.label }}</span>
          <img
            v-if="item.type === 'tips' && item.showtab"
            :src="item.imgtips"
            class="arrow"
            ref="arrow"
          />
        </div>
        <!-- 子列表 -->
        <div
          class="navhome-box"
          ref="navhomebox"
          v-if="item.childrenList.length"
          v-show="item.showtab"
        >
          <transition name="navhom">
            <div class="navhome-son" v-show="navSonShow">
              <div
                @click="!item.disabled && goToRouter(item)"
                v-for="(item, index) in item.childrenList"
                :key="index"
              >
                <div :class="!item.disabled?'namehome-son1':'disabledClick'">
                  <img :src="item.imgSrc" class="navson-img" />
                  <span :ref="item.ref">{{ item.label }}</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="rightNavigation">
      <div class="rightnav-top">
        <div class="rightnav-topimg">
          <img
            src="../assets/img/heng.png"
            class="rightnav-topimghome"
            ref="rightnavtopimghome"
            @click="changehomeimg()"
          />
        </div>

        <span>首页</span>

        <div class="topright">
          <span class="top-time">{{ nowTime }}</span>
          <!-- 苹果图标 -->
          <img src="../assets/img/timg.jpg" class="timg" />
          <!-- 退出下拉框 -->
          <el-dropdown @command="gobacklogin" class="elsign-out">
            <span class="el-dropdown-link">
              欢迎你管理员: <span class="adminname">{{ adminname }} </span
              ><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="rightbody">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// 引入jquery
// import $ from 'jquery'
// 引入搜索框
// import EditData from '../unusercom/EditData.vue'
import { routerList } from '../assets/data/homeRouter'
export default {

  provide () {
    return {
      departId: () => {
        return this.departmentID
      }
    }
  },
  data () {
    return {
      nowTime: '',
      thistime: '',
      key: 90,
      arrowflag: true,
      imghomeflag: true,
      adminname: '',
      departmentID: '',
      navshow: true,
      navSonShow: true,
      lastTime: 0, // 默认上一次点击时间为0
      admin: true,
      routerChioce: 1,
      routerList
    }
  },
  methods: {
    // 旋转子列箭头
    changearrow () {
      this.navSonShow = !this.navSonShow
      if (this.arrowflag) {
        this.$refs.arrow[0].style.transform = 'rotate(270deg)'
        this.arrowflag = !this.arrowflag
      } else {
        this.$refs.arrow[0].style.transform = 'rotate(90deg)'
        this.arrowflag = !this.arrowflag
      }
    },
    // 右边栏三条杠点击事件
    changehomeimg () {
      // 动画class绑定
      this.navshow = !this.navshow
      let status = 'none'
      let rotate = 'rotate(90deg)'
      let times = 0
      // 首页旁边三条杠图标旋转和文字消失
      if (this.imghomeflag) {
        status = 'none'
        rotate = 'rotate(90deg)'
        times = 0
      } else {
        status = 'block'
        rotate = 'rotate(0deg)'
        times = 700
      }
      this.$refs.rightnavtopimghome.style.transform = rotate
      this.imghomeflag = !this.imghomeflag
      const me = this
      setTimeout(function () {
        me.routerList.forEach(item => {
          me.$refs[item.ref][0].style.display = status
          if (item.childrenList.length) {
            item.childrenList.forEach(val => {
              me.$refs[val.ref][0].style.display = status
            })
          }
        })
        me.$refs.arrow[0].style.display = status
      }, times)
    },
    // 开始动画文字出现延迟
    changehomeimgCreate () {
      this.changehomeimg()
      this.changehomeimg()
    },

    // 退出登陆方法
    gobacklogin (command) {
      this.$confirm('是否退出登陆', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.clear() // 删除所有数据
        this.$router.push({ name: 'login' }) // 直接跳转
        this.$message({
          type: 'success',
          message: '退出登陆成功!'
        })
      })
    },
    // 显示当前时间（年月日时分秒）
    timeFormate (timeStamp) {
      const year = new Date(timeStamp).getFullYear()
      const month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? '0' + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1
      const date =
        new Date(timeStamp).getDate() < 10
          ? '0' + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate()
      const hh =
        new Date(timeStamp).getHours() < 10
          ? '0' + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours()
      const mm =
        new Date(timeStamp).getMinutes() < 10
          ? '0' + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes()
      const ss =
        new Date(timeStamp).getSeconds() < 10
          ? '0' + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds()
      this.nowTime =
        year +
        '年' +
        month +
        '月' +
        date +
        '日' +
        ' ' +
        hh +
        ':' +
        mm +
        ':' +
        ss
      // console.log(this.nowTime)
    },
    nowTimes () {
      const that = this
      this.thistime = setInterval(function () {
        that.timeFormate(new Date())
      }, 1000)
    },
    clearTime () {
      clearInterval(this.thistime)
    },
    getAdminType () {
      if (this.departmentID === '10000' || this.departmentID === '10001') { // 最大管理管 // 审批管理员
        this.routerList[2].showtab = true
        // this.routerList[1].showtab = true
        this.routerList[3].showtab = true
        this.routerList[4].showtab = true
        this.routerList[5].showtab = true
      } else if (this.departmentID === '10010') { // 需求部门
        this.routerList[1].showtab = true
        this.routerList[1].childrenList[1].disabled = true
        this.routerList[1].childrenList[0].disabled = false
      } else if (this.departmentID === '10020') { // 购买部门
        this.routerList[1].showtab = true
        this.routerList[1].childrenList[1].disabled = false
        this.routerList[1].childrenList[0].disabled = true
      }
    },
    judgeType (val) {
      if (val.type === 'tips') this.changearrow()
      if (val.type === 'router') this.goToRouter(val)
    },
    goToRouter (val) {
      if (!val.disabled) {
        this.$router.push({ path: val.path })
      } // 页面跳转
    }
  },
  created () {
    this.adminname = window.sessionStorage.getItem('storeData') // 获取浏览器缓存值
    this.departmentID = window.sessionStorage.getItem('sData')
    this.getAdminType()
  },
  mounted () {
    this.changehomeimgCreate()
    this.nowTimes()
    // 实现左边子栏的缓慢消失jQuery
    // $(document).ready(function(){
    // $("#listlep").click(function(){
    //     $(".navhome-son").slideToggle(500);
    //   });
    // });

    // //实现左边nav栏的缩小
    // $(document).ready(function(){
    // $('.rightnav-topimghome').click(function(){
    //     if($('.right-navigation').css("margin-left")=="180px"){
    //         $('.right-navigation').animate({
    //         'margin-left':'50px'
    //     },700);
    // }else{
    // $('.right-navigation').animate({
    //     'margin-left':'180px'
    //     },700);
    // }
    // });
    // });

    // $(document).ready(function(){
    // $('.rightnav-topimghome').click(function(){
    //     if($('.left-navigation').css("width")!="50px"){
    //         $('.left-navigation').animate({
    //         width:'50px'
    //     },700);
    // }else{
    // $('.left-navigation').animate({
    //     width:'180px'
    //     },700);
    // }
    // });
    // });
  },
  beforeDestroy () {
    this.clearTime()
  }
}
</script>
<style>
/* @import url("../assets/CSS/约束缩放.css"); */
</style>
<style lang="less" scoped>
#Home {
  height: 100vh;
  width: 100vw;
  background-color: white;
  display: flex;
  flex-direction: row;
}
.leftNavigation {
  /* position: fixed; */
  display: inline-block;
  width: 10%;
  background-color: #304156;
  height: 100%;
  /*占满一个屏幕的高度 */
  animation: navlong 0.7s;
}
.leftNavigationChange {
  /* position: fixed; */
  width: 2.6%;
  background-color: #304156;
  height: 100vh;
  /*占满一个屏幕的高度 */
  animation: navshort 0.7s;
}
@keyframes navlong {
  0% {
    width: 2.6%;
  }
  100% {
    width: 10%;
  }
}

@keyframes navshort {
  0% {
    width: 10%;
  }
  100% {
    width: 2.6%;
  }
}
.leftNavigation {
    a {
      text-decoration: none;
    }
}

.navhome {
  display: flex;
  flex-direction: row;
  /*水平排布*/
  align-items: center;
  height: 56px;
  width: 100%;
  background-color: #304156;
  transition: all 0.5s;
  &:hover {
    background-color: #263445;
    cursor: pointer;
  }
  span {
    display: none;
    font-size: 0.9vw;
    line-height: 0.9vw;
    color: #9fc6ff;
  }
}
.navhome-img {
  /* -webkit-transform:rotate(90deg); */
  width: 1.5vw;
  margin: 0 7%;
  margin-left: 13%;
  color: #409eff;
}
.arrow {
  display: none;
  margin-left: 5%;
  width: 15%;
  transition: all 0.5s;
  transform: rotate(90deg);
}
.navhom-enter-active {
  transition: all 0.5s;
}
.navhom-leave-active {
  transition: all 0.5s;
}
.navhom-enter {
  height: 0;
}
.navhom-leave-to {
  height: 0;
}
.navhom-enter-to {
  height: 159px;
}
.navhom-leave {
  height: 159px;
}
.navhome-son {
  cursor: pointer;
  background-color: #1f2d3d;
  overflow: hidden;
  span {
    display: none;
    font-size: 0.8vw;
    line-height: 0.8vw;
    color: #9fc6ff;
    margin-left: 6%;
  }
}
.namehome-son1 {
  display: flex;
  flex-direction: row;
  /*水平排布*/
  align-items: center;
  transition: all 1.5s;
  width: 100%;
  height: 53px;
  &:hover {
    background-color: #001121;
  }
}
.disabledClick{
  display: flex;
  flex-direction: row;
  /*水平排布*/
  align-items: center;
  width: 100%;
  height: 53px;
  background-color: rgb(88, 88, 88);
  cursor:no-drop;
  span{
    color: rgb(49, 48, 48);
  }
  img {
    opacity: 0.6;
  }
}
.navson-img {
  width: 1.3vw;
  margin-left: 25%;
  color: #409eff;
}
.rightNavigation {
  display: inline-block;
  width: 90%;
  height: 100vh;
  /*占满一个屏幕的高度 */
  box-sizing: border-box;
  /* margin-left: 180px; */
  /* animation: rightNavlong 0.7s; */
}
/* .rightNavigations { */
/* display: inline-block; */
/* width: 100%; */
/* height: 100vh; 占满一个屏幕的高度 */
/* box-sizing: border-box; */
/* margin-left: 50px; */
/* animation: rightNavshort 0.7s; */
/* } */
/* @keyframes rightNavlong {
  0% {
    margin-left: 50px;
  }
  100% {
    margin-left: 180px;
  }
}
@keyframes rightNavshort {
  0% {
    margin-left: 180px;
  }
  100% {
    margin-left: 50px;
  }
} */
.rightnav-top {
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #dadce0;
  border-top: 1px solid #dadce0;
  span {
    padding-top: 12px;
    /* margin-left: 10px; */
  }
}
.rightnav-topimg {
  padding: 0 14px;
  height: 50px;
}
.rightnav-topimghome {
  cursor: pointer;
  margin-top: 10px;
  height: 25px;
  transition: all 0.4s;
}
.top-time {
  color: #409eff;
  font-size: 14px;
  margin-top: 2px;
}
.topright {
  float: right;
  right: 1%;
  position: absolute;
  display: flex;
}
.timg {
  height: 48px;
  cursor: pointer;
  border-radius: 10px;
}
.weltop {
  font-size: 14px;
}
#eldown {
  margin-top: 1px;
  font-size: 20px;
}
.elsign-out {
  padding-top: 13px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.adminname {
  color: black;
  font-size: 15px;
}
.rightbody {
  height: calc(100% - 50px);
  width: 100%;
}

</style>
