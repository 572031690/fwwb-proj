<template>
  <div class="personal">
    <div class="personal-table">
      <el-descriptions direction="horizontal" :column="1" border class="style" >
        <el-descriptions-item label="登陆账户" >
          {{userData.username}}
        </el-descriptions-item>
        <el-descriptions-item label="姓名">{{ userData.realname }}</el-descriptions-item>
        <el-descriptions-item label="所属部门">
          {{userData.department}}
        </el-descriptions-item>
        <el-descriptions-item label="工号">
           {{userData.employeeid}}
        </el-descriptions-item>
        <el-descriptions-item label="手机号码">
          {{userData.telNum}}
       </el-descriptions-item>
        <el-descriptions-item label="用户角色">
          {{ userData.role }}
        </el-descriptions-item>
         <el-descriptions-item label="账号状态">
          {{userData.isDisabled ? '禁用' : '正常'}}
        </el-descriptions-item>
        <el-descriptions-item label="密码">
          <el-button type="primary" size="small" @click="changepassword()"
            >修改密码</el-button
          >
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
          <el-form-item label="原密码" prop="oldpassword">
            <el-input
              v-model="form.oldpassword"
              style="width: 400px"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input
              v-model="form.password"
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rolaSelect: [
        {
          value: '10011',
          label: '需求专员',
          depart: '需求部'
        },
        {
          value: '10010',
          label: '需求经理',
          depart: '需求部'
        },
        {
          value: '10021',
          label: '采购专员',
          depart: '采购部'
        },
        {
          value: '10020',
          label: '采购经理',
          depart: '采购部'
        },
        {
          value: '10001',
          label: '总经理',
          depart: '经理部'
        },
        {
          value: '10000',
          label: '管理员',
          depart: '管理部'
        }

      ],
      dialogFormVisible: false,
      userData: {},
      form: {
        oldpassword: '',
        password: '',
        repass: ''
      },
      rules: {
        oldpassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 24, message: '长度不能小于六位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 24, message: '长度不能小于六位', trigger: 'blur' }
        ],
        repass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.$emit('changeRouterIndex', this.$route.query.routerIndex)
    this.getUserData()
  },
  methods: {
    /**
     * @desc 获取角色信息
     */
    getUserData () {
      const userList = JSON.parse(window.sessionStorage.getItem('userData'))
      this.userData = userList
      this.userData.role = this.showRoleData(this.userData.roleId)
      this.userData.department = this.showDepartData(this.userData.roleId)
    },
    /**
     * @desc 显示角色内容
     */
    showRoleData (val) {
      if (!val) return
      const rolaArr = []
      this.rolaSelect.forEach(item => {
        if (val.includes(parseInt(item.value))) rolaArr.push(item.label)
      })
      return rolaArr.join(',')
    },
    /**
     * @desc 显示部门内容
     */
    showDepartData (val) {
      if (!val) return
      let depart
      this.rolaSelect.forEach(item => {
        if (val.includes(parseInt(item.value))) depart = item.depart
      })
      return depart
    },
    /**
     * @desc 打开修改密码
     */
    changepassword () {
      this.dialogFormVisible = true
    },
    /**
     * @desc 提交修改密码
     */
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提示框
          this.$confirm('修改成功后会自动退出登陆，是否确定修改密码?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.upPassword()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * @desc 关闭窗口
     */
    closeres () {
      this.dialogFormVisible = false
      for (const i in this.form) {
        this.form[i] = ''
      }
    },
    /**
     * @desc 请求修改密码
     */
    async upPassword () {
      const url = 'home/personal/updateUserPassword'
      const data = {
        ...this.form
      }
      data.userid = this.userData.userid
      await this.$api(url, data).then((res) => {
        if (res.code === '101') {
          this.$message.success('修改成功')
          sessionStorage.clear() // 删除所有数据
          this.$router.push({ name: 'login' }) // 直接跳转
        } else if (res.code === '102') {
          this.$message.error('原密码不正确')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" >
.personal {
  height: 95%;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;

  &-table {
    height: 90%;
    width: 90%;
    overflow: auto;
  }
  .el-descriptions {
    box-sizing: border-box;
    font-size: 16px;
    color: #303133;

  }
  .style{
    .el-descriptions__body .el-descriptions__table .el-descriptions-item__cell {
        box-sizing: border-box;
        text-align: center;
        font-weight: 400;
        line-height: 3;
    }
  }
}

</style>
