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

        <el-form-item label="部门名称：" >
          <span>{{form.name}}</span>
        </el-form-item>

        <el-form-item label="员工数量：" >
          <span>{{form.employenum}}</span>
        </el-form-item>
        <el-form-item label="部门编号：" >
          <span>{{form.departmentid}}</span>
        </el-form-item>
        <el-form-item label="企业描述：" >
              <span>{{form.detail}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeres()">关 闭</el-button>
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
        name: '采购部',
        employenum: 25,
        departmentid: 10020,
        detail: '此部门用于处理公司的采购订单等信息部门用于处理公司的采购订单等信息部门用于处理公司的采购订单等信息部门用于处理公司的采购订单等信息'
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
        detail: [
          { required: true, message: '请输入部门描述', trigger: 'blur' }
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
