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
              <el-button type="primary" @click="submitForm('form')"
                >注 册</el-button
              >
            </div>
          </el-dialog>
    </div>
</template>
<script>
export default {
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

    }
  }
}
</script>
