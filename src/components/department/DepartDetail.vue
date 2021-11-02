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
          style="
            color: #409eff;
            font-size: 26px;
            font-weight: bold;
            margin-top: 9px;
          "
        >
          企业详情
        </div>
      </template>
      <el-form
        :model="form"
        ref="form"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="部门名称：">
          <span>{{ form.name }}</span>
        </el-form-item>

        <el-form-item label="员工数量：">
          <span>{{ form.employenum }}</span>
        </el-form-item>
        <el-form-item label="部门编号：">
          <span>{{ form.departmentid }}</span>
        </el-form-item>
        <el-form-item label="企业描述：">
          <div class="detail">{{ form.detail }}</div>
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
        name: '',
        employenum: '',
        departmentid: '',
        detail: ''
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
<style scoped lang="less">
.detail {
  font-size: 16px;
  line-height: 20px;
}
</style>
