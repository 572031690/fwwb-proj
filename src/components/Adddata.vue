<template>
  <div class="adddata" id="adddata">
    <span class="addtops">添加数据</span>
    <div class="addheart">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="form.pass"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input
            type="age"
            v-model.number="form.tel"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门编号" prop="dpart">
          <el-select v-model="form.dpart" placeholder="请选择部门编号">
            <el-option label="10000" value="10000"></el-option>
            <el-option label="996" value="996"></el-option>
            <el-option label="007" value="007"></el-option>
            <el-option label="123" value="123"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工号" prop="employeeid">
          <el-input
            type="age"
            v-model.number="form.employeeid"
            auto-complete="off"
            style="width:400px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" class="onsub"
            >立即创建</el-button
          >
          <el-button @click="$router.back(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        userId: "",
        name: "",
        pass: "",
        tel: "",
        dpart: "",
        employeeid: ""
      },
      // 定义表单验证规则
      rules: {
        userId: [
          { required: true, message: "ID不能为空", trigger: "blur" },
          { type: "number", message: "ID必须为数字值" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 24, message: "长度不能小于六位", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不正确" } // 手机号码验证！！！！
          // { type: 'number', message: '电话为数字值',trigger: 'blur'},
          // { min: 9, max: 15, message: '长度不能小于9位', trigger: 'blur' }
        ],
        dpart: [
          { required: true, message: "请选择部门编号", trigger: "change" }
        ],
        employeeid: [
          { required: true, message: "请输入员工编号", trigger: "change" },
          { type: "number", message: "编号为数字值", trigger: "blur" }
        ],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }]
      }
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("是否确定保存并添加此条数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.adddata();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async adddata() {
      // $ajax请求
      const url = "/web/saveUser";
      const { data: res } = await this.$ajax.post(
        url,
        {
          username: this.form.name,
          password: this.form.pass,
          telNum: this.form.tel,
          departmentid: this.form.dpart,
          employeeid: this.form.employeeid
        },
        {}
      );
      if (res) {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.$router.go(-1);
      } else {
        this.$message.error("错了哦，添加失败");
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.adddata {
  width: 32%;
  padding: 40px;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid rgb(199, 197, 197);
  border-radius: 8px;
}
.addtops {
  font-size: 26px;
  font-weight: bold;
  margin-left: 43%;
}
.addheart {
  margin-top: 25px;
}
.onsub {
  margin-left: 25%;
}

/*步骤条end*/
</style>
