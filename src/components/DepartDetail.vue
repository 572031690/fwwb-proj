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
          企业详情
        </div>
      </template>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="120px"
        class="demo-ruleForm"
      >

        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" style="width:400px"></el-input>
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
            <el-option label="10001" value="10001"></el-option>
            <el-option label="10010" value="10010"></el-option>
            <el-option label="10020" value="10020"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="地址" prop="address" >
              <el-input type="textarea" v-model="form.address" style="width:400px"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeres()">关 闭</el-button>
        <el-button type="primary" @click="submitForm('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
        name: [
          { required: true, message: '请输入姓名名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 24, message: '长度不能小于六位', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' } // 手机号码验证设置电话格式！！！！
          // { type: 'number', message: '电话为数字值',trigger: 'blur'},
        ],
        rescode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        employeeid: [
          { required: true, message: '请输入员工编号', trigger: 'change' },
          { type: 'number', message: '编号为数字值', trigger: 'blur' }
        ],
        departmentid: [
          { required: true, message: '请选择部门编号', trigger: 'change' }
        ]
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
    }
  }
}
</script>
