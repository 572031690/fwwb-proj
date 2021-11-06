<template>
  <div id="Login" ref="loginview">
    <div class="stars-spot-anima" ref="stars">
      <div
        class="star-spot-anima"
        v-for="(item, key) in startList"
        :key="key"
        :ref="'star' + key"
      ></div>
    </div>
    <div ref="appref">
      <div class="top-backhome">
        <img
          src="../assets/img/titleImportant.png"
          height="50px"
          style="vertical-align: middle"
        />
        <span>智能制造协同共享平台</span>
      </div>
      <div class="login-top">
        <img src="../assets/img/center-login.png" class="filImg" />
        <div class="login-center">
          <transition name="centerboxout">
            <div class="centerbox" v-show="centerbox">
              <div class="center-heart">
                <div class="imgtop">
                  <img src="../assets/img/login-top.png" />
                </div>
                <div class="logintext">登录</div>
                <form>
                  <div class="inputbox">
                    <span class="userimg"></span>
                    <input
                      v-focus
                      @keyup.enter="login()"
                      type="text"
                      class="name"
                      placeholder="username"
                      ref="logintext"
                      v-model="logindata.uname"
                    />
                    <div class="logintip">
                      {{ tips1 }}
                    </div>
                  </div>
                  <div class="inputbox">
                    <span class="passimg"></span>
                    <input
                      @keyup.enter="login()"
                      type="password"
                      class="password"
                      ref="passwordeye"
                      placeholder="password"
                      v-model="logindata.pass"
                    />
                    <img
                      :src="studyDataPic"
                      class="passeyes"
                      ref="passeyes"
                      @click="eyeschange()"
                    />
                    <div class="logintip">
                      {{ tips2 }}
                    </div>
                  </div>
                  <div class="regiserbox">
                    <span>验证码：</span>
                    <input
                      type="text"
                      class="regisertext"
                      v-model="inputVal"
                      @keyup.enter="login()"
                    />
                    <!-- 验证码组件 -->
                    <v-validateCode
                      ref="ref_validateCode"
                      @change="changeCode"
                      class="regiserimg"
                    ></v-validateCode>
                  </div>
                  <div class="logintip">
                    {{ result }}
                  </div>
                  <div class="loginbutton">
                    <button type="button" id="login" @click="login()">
                      登陆
                    </button>
                    <button
                      type="button"
                      id="regiser"
                      @click="seeData"
                      v-if="false"
                    >
                      注册
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </transition>
          <!-- 注册表单 -->
          <register ref="registertable"></register>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 调用验证码
import ValidateCode from '../components/login/ValidateCode.vue'
import register from '../components/login/Register.vue' // 注册页面
export default {
  components: {
    'v-validateCode': ValidateCode,
    register
  },

  data () {
    return {
      startList: [],
      inputVal: '', // 获取input内输入的验证码
      checkCode: '', // 用于存放验证码答案
      result: '', // 显示验证码校验结果
      // 获取睁闭眼图片  require默认是在根目录的不需要..来向后退
      studyDataPic: require('@/assets/img/closeeye.png'),
      eyesflag: true, // 判断眼睛图标是睁眼还是闭眼
      // 账号和密码输入不规范提示框
      tips1: '',
      tips2: '',
      logindata: { uname: '', pass: '' }, // 存放输入用户名和密码
      centerbox: false
    }
  },
  created () {
    document.body.removeAttribute('style')
    const List = (len) => [...new Array(len).keys()]
    this.startList = List(800)
  },
  mounted () {
    this.getStar()
    setTimeout(() => {
      this.centerbox = true
    }, 100)
  },
  methods: {
    /**
     * @desc 生成800个动画星星
     */
    getStar () {
      // transformOrigin设置旋转元素的基点位置
      this.startList.forEach((item, key) => {
        var s = 0.2 + Math.random() * 1
        var curR = 800 + Math.random() * 300
        this.$refs['star' + key][0].style.transformOrigin =
          '0 0 ' + curR + 'px'
        this.$refs['star' + key][0].style.transform =
          ' translate3d(0,0,-' +
          curR +
          'px) rotateY(' +
          Math.random() * 360 +
          'deg) rotateX(' +
          Math.random() * -50 +
          'deg) scale(' +
          s +
          ',' +
          s +
          ')'
      })
    },
    /**
     * @desc 获得验证码组件内的验证码答案
     */
    changeCode (value) {
      this.checkCode = value
    },
    /**
     * @desc 打开注册蒙版表单
     */
    seeData () {
      // 注册按钮 点击后显示编辑对话框
      this.$refs.registertable.dialogFormVisible = true
    },
    /**
     * @desc 密码眼睛切换
     */
    eyeschange () {
      if (this.eyesflag) {
        this.studyDataPic = require('@/assets/img/eye.png')
        this.eyesflag = !this.eyesflag
        this.$refs.passwordeye.type = 'text'
      } else {
        this.studyDataPic = require('@/assets/img/closeeye.png')
        this.eyesflag = !this.eyesflag
        this.$refs.passwordeye.type = 'password'
      }
    },
    /**
     * @desc 登陆按钮事件
     */
    login () {
      if (!this.$refs.logintext.value) {
        this.tips1 = '账号不能为空'
      } else if (!this.$refs.passwordeye.value) {
        this.tips2 = '密码不能为空'
        this.tips1 = ''
      } else if (this.$refs.passwordeye.value.length < 5) {
        this.tips2 = '密码长度不能少于5位'
        this.tips1 = ''
        // 验证验证码是否正确，如果正确就往下一个界面跳
      } else if (this.inputVal.toUpperCase() === this.checkCode) {
        this.tips2 = ''
        this.tips1 = ''
        this.inputVal = ''
        this.goLogin()
      } else {
        this.result = '验证码输入错误'
        // 验证码input内的值
        this.inputVal = ''
        this.tips2 = ''
        this.tips1 = ''
        this.$refs.ref_validateCode.draw()
      }
    },
    /**
     * @desc 登陆
     */
    async goLogin () {
      const url = 'login/login'
      const data = {
        username: this.logindata.uname,
        password: this.logindata.pass
      }
      await this.$api(url, data)
        .then((res) => {
          const { code, user, sessionId, permission, permissionName } = res
          if (parseInt(code) === 101) {
            this.getCache(user, sessionId, permission, permissionName)
            this.logindata.uname = ''
            this.logindata.pass = ''
            this.$router.push({
              path: 'home/homewel',
              query: { routerIndex: 1 }
            }) // 页面跳转
            this.$notify({
              // element登陆成功提示框右上边
              title: '登陆成功',
              message: '欢迎管理员！',
              type: 'success'
            })
          } else if (parseInt(code) === 102) {
            this.$message.error('账号或密码错误') // element失败提示框上部
            this.tips2 = '账号或密码错误'
            // 验证码提示框
            this.result = ''
          } else {
            this.$message.error(res.error)
          }
        })
        .catch(() => {
        })
    },
    /**
     * @desc 缓存数据到浏览器内
     */
    getCache (user, sessionId, permission, permissionName) {
      window.sessionStorage.setItem('storeData', user.realname) // 将数据存储到浏览器内嵌的数据库内
      window.sessionStorage.setItem('sessionId', sessionId) // 将数据存储到浏览器内嵌的数据库内
      window.sessionStorage.setItem('userData', JSON.stringify(user)) // 将数据存储到浏览器内嵌的数据库内
      window.sessionStorage.setItem('sData', user.roleId) // 将数据存储到浏览器内嵌的数据库内
      window.sessionStorage.setItem('userid', user.userid) // 用户ID
      permissionName.push(0)
      window.sessionStorage.setItem(
        'permissionName',
        JSON.stringify(permissionName)
      ) // 权限Name
      window.sessionStorage.setItem('permission', JSON.stringify(permission)) // 权限Id
    }
  },
  beforeDestroy () {
    document.querySelector('body').setAttribute('style', 'background:#f4f4f4;')
  }
}
</script>
<style >
body {
  /* background: radial-gradient(200% 100% at bottom center, #0070aa, #0b2570, #000035, #000); */
  background: radial-gradient(
    220% 105% at top center,
    #000 10%,
    #000035 40%,
    #0b2570 65%,
    #0070aa
  );
  background-attachment: fixed;
  overflow: hidden;
}
/* .bodyss {
    height: 100%;
    width: 100%;
    background: radial-gradient(200% 100% at bottom center, #0070aa, #0b2570, #000035, #000);
    background: radial-gradient(220% 105% at top center, #000 10%, #000035 40%, #0b2570 65%, #0070aa);
    background-attachment: fixed;
    overflow: hidden;
  } */

@keyframes rotatestar {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }

  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}

.stars-spot-anima {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  bottom: 0;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotatestar 90s infinite linear;
}

.star-spot-anima {
  width: 2px;
  height: 2px;
  background: #f7f7b6;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0 -300px;
  transform: translate3d(0, 0, -300px);
  backface-visibility: hidden; /* 旋转元素背面不可见*/
  animation: none;
  /* box-shadow: 10px 10px 5px #888888; */
  opacity: 1;
}
</style>
<style lang="less" scoped>
/*无法选中图片文字方法*/
span,
div,
img {
  user-select: none;
}
.topline {
  height: 0.1px;
  width: 100%;
  border-top: 0.5px solid #eee;
}
.top-backhome {
  font-size: 30px;
  line-height: 30px;
  padding: 20px 0 0 15px;
  span {
    margin-left: 15px;
    color: white;
    text-decoration: none;
    transition: all 0.2s;
    &:hover {
      color: #409eff;
    }
  }
}
.login-top {
  position: relative;
  display: flex;
  align-content: space-between;
  justify-content: center;
  margin-top: 180px;
  height: 380px;
  background: rgba(64, 158, 255, 0.5);
  .filImg {
    width: 100%;
    height: 100%;
  }
}
.login-center {
  border-radius: 5px;
  position: absolute;
  bottom: 20px;
  height: 390px;
  width: 390px;
  border: none;
  background: #409eff;
  box-shadow: 0 0 12px #f3f3f3;
  /*阴影 */
}
/* .centerboxout-enter-active {
  transition: all 0.8s;
}
.centerboxout-enter {
  opacity: 0;
} */
.centerbox {
  margin-top: 10px;
  background-color: white;
  height: 380px;
  border-radius: 5px;
  border: none;
}
.center-heart {
  margin-left: 25px;
  margin-top: 25px;
  /* background: yellow; */
  height: 360px;
  width: 340px;
  display: flex;
  /* align-content: space-between; */
  /* justify-content: space-between; */
  flex-direction: column;
  /* display: table-cell;
text-align: center; */
}
.imtop {
  display: flex;
  align-content: space-between;
  justify-content: space-between;
  margin-top: 5px;
}
.imgtop {
  img {
    margin-left: 120px;
  }
}
.logintip {
  align-items: center;
  height: 15px;
  font-size: 14px;
  line-height: 14px;
  color: red;
}
.logintext {
  margin: 5px 0;
  font-size: 26px;
  color: #409eff;
  text-align: center;
}
input {
  &::-webkit-input-placeholder {
    color: #ecedee;
  }
}
.inputbox {
  position: relative;
}
.name {
  /* background-image: url(../assets/img/登陆.png); 设置小图标 */
  /* background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: 5px 6px; */
  height: 38px;
  border: 2px solid #ddd;
  padding: 0 15px 0 42px;
  width: 281px;
  font-size: 22px;
  border-radius: 5px;
  margin: 15px 0 0 0;
  outline: none;
}
.password {
  height: 38px;
  border: 2px solid #ddd;
  padding: 0 41px 0 42px;
  width: 255px;
  font-size: 22px;
  border-radius: 5px;
  outline: none;
}
.userimg {
  &::after {
    content: "";
    background: url(../assets/img/登陆.png);
    background-size: 30px 30px;
    background-repeat: no-repeat;
    top: 23px;
    left: 5px;
    height: 38px;
    width: 38px;
    position: absolute;
  }
}
.passimg {
  &::after {
    content: "";
    background: url(../assets/img/密码.png);
    background-size: 32px 32px;
    background-repeat: no-repeat;
    top: 5px;
    left: 3px;
    height: 38px;
    width: 38px;
    position: absolute;
  }
}
.passeyes {
  height: 22px;
  width: 24px;
  position: absolute;
  right: 10px;
  top: 12px;
  cursor: pointer;
}
.regiserbox {
  display: flex;
  margin-top: 5px;
  span {
    margin-top: 9px;
    font-size: 22px;
    line-height: 22px;
  }
  .regisertext {
    height: 35px;
    width: 75px;
    font-size: 21px;
    padding: 0 6px;
    outline: none;
  }
  .regiserimg {
    margin-left: 13px;
  }
}
.loginbutton {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 12px;
  button {
    width: 70%;
    color: white;
    font-size: 18px;
    background-color: #409eff;
    height: 38px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.5s;
    /*缓慢hover显示 */
    &:hover {
      background-color: #73b8fe;
      box-shadow: 0 0 12px#73b8fe;
    }
    &:active {
      position: relative;
      top: 0.5px;
      left: 0.5px;
    }
  }
}
#regiser {
  margin-left: 15px;
}
#login {
  margin-left: 7px;
}
/*css设置不可点击时置灰*/
/* .el-button.disabled-style {
  background-color: #eeeeee;
  color: #cccccc;
} */
</style>
close
