<template>
  <div id="register">
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
        <el-button type="primary" @click="submitForm('form')">注 册</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  computed: {
    // 用于校验手机号码格式是否正确
    phoneNumberStyle () {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(this.form.tel)) {
        return false
      }
      return true
    },
    // 控制获取验证码按钮是否可点击
    getCodeBtnDisable: {
      get () {
        if (this.waitTime == 61) {
          if (this.form.tel && this.phoneNumberStyle) {
            return false
          }
          return true
        }
        return true
      },
      // 注意：因为计算属性本身没有set方法，不支持在方法中进行修改，而下面我要进行这个操作，所以需要手动添加
      set () {}
    }
  },
  data () {
    // 验证注册两次密码是否一致 value是input输入的值 callback是返回的提示
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      codenum: '发送验证码', // 注册手机验证码倒数
      waitTime: 61, // 获取验证码按钮失效时间
      dialogFormVisible: false, // 不让注册修改窗口打开
      // 注册界面输入的数据
      form: {
        // userId:'',
        name: '',
        pass: '',
        repass: '',
        tel: '',
        rescode: '',
        departmentid: '',
        employeeid: ''
      },
      phone: {
        num: '',
        code: ''
      },
      // 定义注册表单验证规则
      rules: {
        //   userId:[
        //     { required: true, message: 'ID不能为空',trigger: 'blur'},
        //     { type: 'number', message: 'ID必须为数字值'}
        //   ],
        name: [
          { required: true, message: '请输入姓名名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 24, message: '长度不能小于六位', trigger: 'blur' }
        ],
        repass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        tel: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' } // 手机号码验证设置电话格式！！！！
          // { type: 'number', message: '电话为数字值',trigger: 'blur'},
          // { min: 9, max: 15, message: '长度不能小于9位', trigger: 'blur' }
        ],
        rescode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        employeeid: [
          { required: true, message: '请输入员工编号', trigger: 'change' },
          { type: 'number', message: '编号为数字值', trigger: 'blur' }
        ],
        departmentid: [
          { required: true, message: '请选择部门编号', trigger: 'change' }
        ]
        //   address: [
        //     { required: true, message: '请填写地址', trigger: 'blur' }
        //   ]
      }
    }
  },
  methods: {
    // 编辑表 的验证数据
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提示框
          this.$confirm('是否确定保存并注册账户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (
              this.form.tel === this.phone.num &&
              this.form.rescode === this.phone.code
            ) {
              this.register()
            } else {
              this.$message.error('验证码错误!')
              this.form.rescode = ''
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 注册ajax请求
    register () {
      // $ajax请求
      const url = '/web/logon'
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
          console.log(res)
          if (res.data.code === 100) {
            this.$message({
              type: 'success',
              message: '注册成功!'
            })
            this.dialogFormVisible = false
          } else if (res.data.code === 99) {
            this.$message.error('用户名重复!')
          }
        })
        .catch(() => {
          this.$message.error('网络异常') // element失败提示框上部
        })
    },
    // 关闭注册蒙版
    closeres () {
      this.dialogFormVisible = false
      for (const i in this.form) {
        this.form[i] = ''
      }
    },
    // 发送验证码 变数字倒数
    sendresCode () {
      // if(this.phoneNumberStyle){
      // let params = {}
      // params.telNum = this.form.tel;
      // console.log(params);
      // 调用获取短信验证码接口
      this.$ajax
        .get('/getCode', { params: { phone: this.form.tel } })
        .then(res => {
          res = res.data
          console.log(res)
          if (res.code) {
            this.phone.code = res.code
            this.phone.num = this.form.tel
            this.$message({
              message: '验证码已发送，请稍候...',
              type: 'success',
              center: true
            })
          } else {
            this.$message.error('发送失败！请稍后尝试') // element失败提示框上部
          }
        }).catch(() => {
          this.$message.error('网络异常') // element失败提示框上部
        })
      // 因为下面用到了定时器，需要保存this指向
      const that = this
      that.waitTime--
      that.getCodeBtnDisable = true
      this.codenum = `${this.waitTime}s 重新获取`
      const timer = setInterval(function () {
        if (that.waitTime > 1) {
          that.waitTime--
          that.codenum = `${that.waitTime}s 重新获取`
        } else {
          clearInterval(timer)
          that.codenum = '获取验证码'
          that.getCodeBtnDisable = false
          that.waitTime = 61
        }
      }, 1000)
      // }
    }
  }
}
</script>
