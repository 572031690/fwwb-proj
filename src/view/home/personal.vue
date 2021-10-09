<template>
  <div class="personal">
    <div class="personal-table">
<<<<<<< HEAD
      <el-descriptions direction="vertical" :column="3" border>
        <el-descriptions-item label="用户名">{{
          username
        }}</el-descriptions-item>
        <el-descriptions-item label="所属部门">{{
          department
        }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{ realname }}</el-descriptions-item>
        <el-descriptions-item label="手机号码">{{
          telNum
        }}</el-descriptions-item>
        <el-descriptions-item label="用户角色">{{ role }}</el-descriptions-item>
        <el-descriptions-item label="密码">
          <el-button type="primary" size="small" @click="changepassword()">修改密码</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </div>
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
            style="
              color: #409eff;
              font-size: 26px;
              font-weight: bold;
              margin-top: 9px;
            "
          >
            修改密码
          </div>
        </template>
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="originalpass">
            <el-input v-model="form.originalpass" style="width: 400px" type="password"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              v-model="form.pass"
              style="width: 400px"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repass">
            <el-input
              v-model="form.repass"
              style="width: 400px"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeres()">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')"
            >修 改</el-button
          >
        </div>
      </el-dialog>
       
=======
        <el-descriptions class="margin-top" title="带边框列表" :column="3" size="" border>
    <template slot="extra">
      <el-button type="primary" size="small">操作</el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        居住地
      </template>
      苏州市
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        备注
      </template>
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      江苏省苏州市吴中区吴中大道 1188 号
    </el-descriptions-item>
  </el-descriptions>
>>>>>>> 9c1e58ef1ddd494d1802c5455b7ffaaa7f0266ee
    </div>
  </div>
</template>

<script>
export default {
  data() {
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
        dialogFormVisible: false,
        username: 'mek',
        realname:'mek',
        password: 5454165,
        telNum: 17816536995,
        employeeid: '3',
        department: '10001',
        role:'管理员',
        form: {
        // userId:'',
        originalpass: '',
        pass: '',
        repass: '', 
        },
        rules:{
        originalpass:[
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 24, message: '长度不能小于六位', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 24, message: '长度不能小于六位', trigger: 'blur' }
        ],
        repass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        }  
    }
  },
  mounted() {
    this.getUserData
  },
  methods: {
    getUserData() {
      const userList = JSON.parse(window.sessionStorage.getItem('userData'))
    },
    changepassword() {
      this.dialogFormVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提示框
          this.$confirm('是否确定修改密码?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.edit()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
     closeres () {
      this.dialogFormVisible = false
      for (const i in this.form) {
        this.form[i] = ''
      }
    },
    edit () {
      // $ajax请求
      const url = ''
      // const {data:res}=await
      const data = {
          originalpass: this.form.originalpass,
          password: this.form.pass,   
      }
      this.$api(
        url,
        data
      )
        .then(res => {
          if (res.code === '101') {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.dialogFormVisible = false
          } else if (res.code === '99') {
            this.$message.error('用户名重复!')
          }
        })
        .catch(() => {
          this.$message.error('网络异常') // element失败提示框上部
        })
    },
  }
}
</script>

<style lang="less" scoped>
.personal {
  height: 95%;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;

  &-table {
    height: 90%;
    width: 90%;
  }
}
</style>