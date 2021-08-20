<template>
  <div id="Login" ref="loginview">
    <!-- <div class="topline" ></div> -->
    <!-- <router-view class="homecss"></router-view>  -->

    <div class="clammjh" ref="appref">
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
          <el-dialog
            :visible.sync="dialogFormVisible"
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            :show-close="false"
            center
            width="35%"
          >
            <template slot="title">
              <div
                style="color:#409EFF;font-size:26px;font-weight:bold;margin-top:9px;"
              >
                注册用户
              </div>
            </template>
            <el-form
              :model="form"
              :rules="rules"
              ref="form"
              label-width="120px"
              class="demo-ruleForm"
            >
              <!-- <el-form-item label="员工ID" prop="userId" >
                                        <el-input type="age" v-model.number="form.userId" auto-complete="off" style="width:400px" disabled></el-input>
                                    </el-form-item> -->
              <el-form-item label="用户名" prop="name">
                <el-input v-model="form.name" style="width:400px"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input
                  v-model="form.pass"
                  style="width:400px"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="repass">
                <el-input
                  v-model="form.repass"
                  style="width:400px"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="tel">
                <el-input
                  type="age"
                  v-model.number="form.tel"
                  auto-complete="off"
                  style="width:400px"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="rescode">
                <el-input
                  type="age"
                  v-model.number="form.rescode"
                  auto-complete="off"
                  style="width:200px"
                ></el-input>

                <el-button
                  type="primary"
                  plain
                  size="small"
                  @click="sendresCode()"
                  :class="{ 'disabled-style': getCodeBtnDisable }"
                  :disabled="getCodeBtnDisable"
                  style="width:100px; margin-left:12px;height:30px;text-align: center;"
                  >{{ codenum }}</el-button
                >
              </el-form-item>
              <el-form-item label="员工号" prop="employeeid">
                <el-input
                  type="age"
                  v-model.number="form.employeeid"
                  auto-complete="off"
                  style="width:400px"
                ></el-input>
              </el-form-item>
              <el-form-item label="部门编号" prop="departmentid">
                <el-select v-model="form.departmentid" placeholder="请选择编号">
                  <el-option label="10000" value="10000"></el-option>
                  <el-option label="996" value="996"></el-option>
                  <el-option label="007" value="007"></el-option>
                  <el-option label="123" value="123"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="地址" prop="address" >
                                        <el-input type="textarea" v-model="form.address" style="width:400px"></el-input>
                                    </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="closeres()">取 消</el-button>
              <el-button type="primary" @click="submitForm('form')"
                >注 册</el-button
              >
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 调用验证码
import ValidateCode from "../components/ValidateCode";

export default {
  mounted() {
    setTimeout(() => {
      this.centerbox = true;
    }, 100);
  },
  data() {
    // 验证注册两次密码是否一致 value是input输入的值 callback是返回的提示
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      inputVal: "", // 获取input内输入的验证码
      checkCode: "", // 用于存放验证码答案
      result: "", // 显示验证码校验结果
      codenum: "发送验证码", // 注册手机验证码倒数
      waitTime: 61, // 获取验证码按钮失效时间
      // getCodeBtnDisable:false,// 是否禁用按钮
      // 获取睁闭眼图片  require默认是在根目录的不需要..来向后退
      studyDataPic: require("@/assets/img/closeeye.png"),
      eyesflag: true, // 判断眼睛图标是睁眼还是闭眼
      // 账号和密码输入不规范提示框
      tips1: "",
      tips2: "",
      logindata: { uname: "", pass: "" }, // 存放输入用户名和密码
      dialogFormVisible: false, // 不让注册修改窗口打开
      // 注册界面输入的数据
      form: {
        // userId:'',
        name: "",
        pass: "",
        repass: "",
        tel: "",
        rescode: "",
        departmentid: "",
        employeeid: ""
      },
      centerbox: false,
      // 短信验证码验证
      phone: {
        num: "",
        code: ""
      },
      // 定义注册表单验证规则
      rules: {
        //   userId:[
        //     { required: true, message: 'ID不能为空',trigger: 'blur'},
        //     { type: 'number', message: 'ID必须为数字值'}
        //   ],
        name: [
          { required: true, message: "请输入姓名名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 24, message: "长度不能小于六位", trigger: "blur" }
        ],
        repass: [{ required: true, validator: validatePass2, trigger: "blur" }],
        tel: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不正确" } // 手机号码验证设置电话格式！！！！
          // { type: 'number', message: '电话为数字值',trigger: 'blur'},
          // { min: 9, max: 15, message: '长度不能小于9位', trigger: 'blur' }
        ],
        rescode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        employeeid: [
          { required: true, message: "请输入员工编号", trigger: "change" },
          { type: "number", message: "编号为数字值", trigger: "blur" }
        ],
        departmentid: [
          { required: true, message: "请选择部门编号", trigger: "change" }
        ]
        //   address: [
        //     { required: true, message: '请填写地址', trigger: 'blur' }
        //   ]
      }
    };
  },
  methods: {
    // 获得验证码组件内的验证码答案
    changeCode(value) {
      this.checkCode = value;
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
    seeData() {
      // 注册按钮 点击后显示编辑对话框
      this.dialogFormVisible = true;
    },
    // 编辑表 的验证数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提示框
          this.$confirm("是否确定保存并注册账户?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            if (
              this.form.tel == this.phone.num &&
              this.form.rescode == this.phone.code
            ) {
              this.register();
            } else {
              this.$message.error("验证码错误!");
              this.form.rescode = "";
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 注册ajax请求
    register() {
      // $ajax请求
      const url = "/web/logon";
      // const {data:res}=await
      this.$ajax
        .post(
          url,
          {
            // params:{
            userid: this.form.userId,
            username: this.form.name,
            password: this.form.pass,
            telNum: this.form.tel,
            employeeid: this.form.employeeid,
            departmentid: this.form.departmentid
          },
          {}
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 100) {
            this.$message({
              type: "success",
              message: "注册成功!"
            });
            this.dialogFormVisible = false;
          } else if (res.data.code == 99) {
            this.$message.error("用户名重复!");
          }
        })
        .catch(error => {
          this.$message.error("网络异常"); // element失败提示框上部
        });
    },
    closeres() {
      this.dialogFormVisible = false;
      (this.form.name = ""),
        (this.form.pass = ""),
        (this.form.repass = ""),
        (this.form.tel = ""),
        (this.form.rescode = ""),
        (this.form.departmentid = ""),
        (this.form.employeeid = "");
    },
    // 密码眼睛切换
    eyeschange() {
      if (this.eyesflag) {
        this.studyDataPic = require("@/assets/img/eye.png");
        this.eyesflag = !this.eyesflag;
        this.$refs.passwordeye.type = "text";
      } else {
        this.studyDataPic = require("@/assets/img/closeeye.png");
        this.eyesflag = !this.eyesflag;
        this.$refs.passwordeye.type = "password";
      }
      console.log(this.$refs.passeyes.src);
    },
    // 登陆按钮事件
    login() {
      const me = this;
      if (!this.$refs.logintext.value) {
        this.tips1 = "账号不能为空";
      } else if (!this.$refs.passwordeye.value) {
        this.tips2 = "密码不能为空";
        this.tips1 = "";
      } else if (this.$refs.passwordeye.value.length < 6) {
        this.tips2 = "密码长度不能少于6位";
        this.tips1 = "";
        // 验证验证码是否正确，如果正确就往下一个界面跳
      } else if (this.inputVal.toUpperCase() === this.checkCode) {
        this.tips2 = "";
        this.tips1 = "";
        this.inputVal = "";
        // this.$refs.appref.style.display='none';
        // console.log(this.logindata)

        const url = "/web/login";
        this.$ajax
          .get(url, {
            params: {
              username: this.logindata.uname,
              password: this.logindata.pass
            }
          })
          .then(res => {
            // if(res.data==0){
            // 	this.$message.error('用户名输入不正确');  //判断后端项目传回值的结果
            // }
            console.log(res);
            if (res.data.code == 100) {
              // console.log(res);
              window.sessionStorage.setItem(
                "storeData",
                res.data.user.username
              ); // 将数据存储到浏览器内嵌的数据库内
              window.sessionStorage.setItem(
                "sData",
                res.data.user.departmentid
              ); // 将数据存储到浏览器内嵌的数据库内
              me.$router.push({ path: "home" }); // 页面跳转
              this.$notify({
                // element登陆成功提示框右上边
                title: "登陆成功",
                message: "欢迎管理员！",
                type: "success"
              });
            } else if (res.data.code == 90) {
              this.$message.error("账号或密码错误"); // element失败提示框上部
              this.tips2 = "账号或密码错误";
              // 验证码提示框
              this.result = "";
            } else {
              this.$message.error("网络异常"); // element失败提示框上部
            }
          })
          .catch(error => {
            this.$message.error("网络异常"); // element失败提示框上部
            // console.error(error);
          });
      } else {
        this.result = "验证码输入错误";
        // 验证码input内的值
        this.inputVal = "";
        this.tips2 = "";
        this.tips1 = "";
        this.$refs.ref_validateCode.draw();
      }
    },
    // 发送验证码 变数字倒数
    sendresCode() {
      // if(this.phoneNumberStyle){
      // let params = {}
      // params.telNum = this.form.tel;
      // console.log(params);
      // 调用获取短信验证码接口
      this.$ajax
        .get("/getCode", { params: { phone: this.form.tel } })
        .then(res => {
          res = res.data;
          console.log(res);
          if (res.code) {
            this.phone.code = res.code;
            this.phone.num = this.form.tel;
            this.$message({
              message: "验证码已发送，请稍候...",
              type: "success",
              center: true
            });
          } else {
            this.$message.error("发送失败！请稍后尝试"); // element失败提示框上部
          }
        });
      // 因为下面用到了定时器，需要保存this指向
      const that = this;
      that.waitTime--;
      that.getCodeBtnDisable = true;
      this.codenum = `${this.waitTime}s 重新获取`;
      const timer = setInterval(function() {
        if (that.waitTime > 1) {
          that.waitTime--;
          that.codenum = `${that.waitTime}s 重新获取`;
        } else {
          clearInterval(timer);
          that.codenum = "获取验证码";
          that.getCodeBtnDisable = false;
          that.waitTime = 61;
        }
      }, 1000);
      // }
    }
  },
  // 计算机属性
  computed: {
    // 用于校验手机号码格式是否正确
    phoneNumberStyle() {
      const reg = /^1[3456789]\d{9}$/;
      if (!reg.test(this.form.tel)) {
        return false;
      }
      return true;
    },
    // 控制获取验证码按钮是否可点击
    getCodeBtnDisable: {
      get() {
        if (this.waitTime == 61) {
          if (this.form.tel && this.phoneNumberStyle) {
            return false;
          }
          return true;
        }
        return true;
      },
      // 注意：因为计算属性本身没有set方法，不支持在方法中进行修改，而下面我要进行这个操作，所以需要手动添加
      set() {}
    }
  },
  components: {
    "v-validateCode": ValidateCode
  }
};
</script>

<style>
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

.clammjh {
  z-index: 3;
}
.top-backhome {
  font-size: 30px;
  line-height: 30px;
  padding-top: 20px;
}
.top-backhome span {
  text-decoration: none;
  transition: all 0.2s;
}
.top-backhome span:hover {
  color: #409eff;
}

.login-top {
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
  margin-top: -27px;
  height: 390px;
  width: 390px;
  border: none;
  background: #409eff;
  box-shadow: 0 0 12px #f3f3f3; /*阴影 */
}
.centerboxout-enter-active {
  transition: all 0.8s;
}
.centerboxout-enter {
  opacity: 0;
}

.centerbox {
  margin-top: 10px;
  position: relative;
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
  position: relative;

  display: flex;
  align-content: space-between;
  justify-content: space-between;
  margin-top: 5px;
}
.imgtop img {
  position: relative;
  margin-left: 120px;
}
.logintip {
  align-items: center;
  height: 15px;
  font-size: 14px;
  line-height: 14px;
  color: red;
}
.logintext {
  align-items: center;
  margin: 5px 0;
  font-size: 26px;
  color: #409eff;
  text-align: center;
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
input::-webkit-input-placeholder {
  color: #ecedee;
}
.inputbox {
  position: relative;
}
.userimg::after {
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
.passimg::before {
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
.password {
  height: 38px;
  border: 2px solid #ddd;
  padding: 0 15px 0 42px;
  width: 281px;
  font-size: 22px;
  border-radius: 5px;
  outline: none;
}
.regiserbox {
  display: flex;
  margin-top: 5px;
}
.regiserbox span {
  margin-top: 9px;
  font-size: 22px;
  line-height: 22px;
}
.regiserbox .regisertext {
  height: 35px;
  width: 75px;
  font-size: 21px;
  padding: 0 6px;
  outline: none;
}
.regiserbox .regiserimg {
  margin-left: 13px;
}
.loginbutton {
  display: flex;
  flex-direction: row;
  margin-top: 12px;
}
.loginbutton button {
  width: 50%;
  color: white;
  font-size: 18px;
  background-color: #409eff;
  height: 38px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.5s; /*缓慢hover显示 */
}
.loginbutton button:hover {
  background-color: #73b8fe;
  box-shadow: 0 0 12px#73B8FE;
}
.loginbutton button:active {
  /* background-color: #409EFF; */
  position: relative;
  top: 0.5px;
  left: 0.5px;
}

.passeyes {
  height: 22px;
  width: 24px;
  position: absolute;
  margin-left: 307px;
  top: 197px;
  cursor: pointer;
}
#regiser {
  margin-left: 15px;
  margin-right: 7px;
}
#login {
  margin-left: 7px;
}
/*css设置不可点击时置灰*/
.el-button.disabled-style {
  background-color: #eeeeee;
  color: #cccccc;
}
</style>
close
