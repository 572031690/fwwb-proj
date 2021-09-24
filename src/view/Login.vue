<template>
  <div id="Login" ref="loginview">
    <!-- <div class="topline" ></div> -->
    <!-- <router-view class="homecss"></router-view>  -->

    <div ref="appref">
      <div class="top-backhome">
        <img
          src="../assets/img/login-top.png"
          height="50px"
          style="vertical-align: middle;"
        />
        <span>登陆界面</span>
      </div>
      <div class="login-top">
        <img src="../assets/img/center-login.png" width="100%" />
        <div class="login-center">
          <transition name="centerboxout">
            <div class="centerbox" v-show="centerbox">
              <div class="center-heart">
                <div class="imgtop">
                  <img src="../assets/img/login-top.png" />
                </div>
                <div class="logintext">
                  登陆
                </div>
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
                    <button type="button" id="regiser" @click="seeData">
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
import ValidateCode from '../components/ValidateCode'
import register from '../components/Register.vue' // 注册页面
export default {
  components: {
    'v-validateCode': ValidateCode,
    register
  },

  data () {
    return {
      inputVal: '', // 获取input内输入的验证码
      checkCode: '', // 用于存放验证码答案
      result: '', // 显示验证码校验结果
      // getCodeBtnDisable:false,// 是否禁用按钮
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
  mounted () {
    setTimeout(() => {
      this.centerbox = true
    }, 100)
  },
  methods: {
    // 获得验证码组件内的验证码答案
    changeCode (value) {
      this.checkCode = value
    },
    // compare() {
    // if (this.inputVal.toUpperCase() === this.checkCode) {
    // this.result = "比对成功";
    // } else {
    // this.result = "比对失败,请重新输入";
    // this.inputVal = "";
    // this.$refs["ref_validateCode"].draw();
    // }
    // },
    // 打开注册蒙版表单
    seeData () {
      // 注册按钮 点击后显示编辑对话框
      this.$refs.registertable.dialogFormVisible = true
    },
    // 密码眼睛切换
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
      console.log(this.$refs.passeyes.src)
    },
    // 登陆按钮事件
    login () {
      const me = this
      if (!this.$refs.logintext.value) {
        this.tips1 = '账号不能为空'
      } else if (!this.$refs.passwordeye.value) {
        this.tips2 = '密码不能为空'
        this.tips1 = ''
      } else if (this.$refs.passwordeye.value.length < 6) {
        this.tips2 = '密码长度不能少于6位'
        this.tips1 = ''
        // 验证验证码是否正确，如果正确就往下一个界面跳
      } else if (this.inputVal.toUpperCase() === this.checkCode) {
        this.tips2 = ''
        this.tips1 = ''
        this.inputVal = ''

        const url = 'login/login'
        this.$api(url, {
          params: {
            username: this.logindata.uname,
            password: this.logindata.pass
          }
        })
          .then(res => {
            const { code, user } = res
            console.log(res)
            if (parseInt(code) === 101) {
              // console.log(res);
              window.sessionStorage.setItem(
                'storeData',
                user.username
              ) // 将数据存储到浏览器内嵌的数据库内
              window.sessionStorage.setItem(
                'sData',
                user.roleId
              ) // 将数据存储到浏览器内嵌的数据库内
              this.logindata.uname = ''
              this.logindata.pass = ''
              me.$router.push({ path: 'home' }) // 页面跳转
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
            this.$message.error('网络异常')
          })
      } else {
        this.result = '验证码输入错误'
        // 验证码input内的值
        this.inputVal = ''
        this.tips2 = ''
        this.tips1 = ''
        this.$refs.ref_validateCode.draw()
      }
    }
  }
}
</script>

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
  padding-top: 20px;
  span {
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
  background: #409eff;
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
  margin-top: 12px;
  button {
    width: 50%;
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
