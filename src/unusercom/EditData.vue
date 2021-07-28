<template>
    <div class="adddata" id="adddata">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">

                <el-form-item
                    label="员工ID"
                    prop="userId"
                    :rules="[
                    { required: true, message: 'ID不能为空'},
                    { type: 'number', message: 'ID必须为数字值'},
                    ]"
                >
                    <el-input type="age" v-model.number="form.userId" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="姓名"  prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input v-model="form.pass" ></el-input>
                </el-form-item>
                <el-form-item
                    label="电话"
                    prop="tel"
                    :rules="[
                    { required: true, message: '电话不能为空'},
                    { type: 'number', message: '电话必须为数字值'},
                    ]"
                >
                    <el-input type="age" v-model.number="form.tel" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="部门编号" prop="dpart">
                    <el-select v-model="form.dpart" placeholder="请选择活动区域" >
                    <el-option label="1" value="shanghai"></el-option>
                    <el-option label="2" value="beijing"></el-option>
                    <el-option label="3" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="地址" prop="address">
                    <el-input type="textarea" v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="submitForm('form')" class="onsub">立即创建</el-button>
                    <el-button @click="$router.back(-1)">取消</el-button>
                </el-form-item>
            </el-form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        userId: '',
        name: '',
        pass: '',
        tel: '',
        dpart: '',
        address: ''
      },
      // 定义表单验证规则
      rules: {
        name: [
          { required: true, message: '请输入姓名名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 24, message: '长度不能小于六位', trigger: 'blur' }
        ],
        // tel: [
        //   { required: true, message: '请输入电话号码', trigger: 'blur' },
        //   { type: 'number', message: '电话为数字值'},
        //   { min: 9, max: 15, message: '长度不能小于9位', trigger: 'blur' }
        // ],
        dpart: [
          { required: true, message: '请选择部门编号', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请填写地址', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    onSubmit () {
      console.log('submit!')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确定保存并添加此条数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.adddata()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    goback () {

    },
    async adddata () {
      // $ajax请求
      const url = '#'
      const { data: res } = await this.$ajax.get(url,
        {
          params: {
            userId: this.form.userId,
            name: this.form.name,
            pass: this.form.pass,
            tel: this.form.tel,
            dpart: this.form.dpart,
            address: this.form.address
          }
        }
      )
      if (res) {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.$router.go(-1)
      } else {
        this.$message.error('错了哦，添加失败')
      }
    }

  },
  mounted () {

  }
}
</script>
<style scoped>

.onsub{
    margin-left: 25%;
}

    /*步骤条end*/
</style>
