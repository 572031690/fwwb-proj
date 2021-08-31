<template>
  <div>
    <button @click="dialogFormVisibleadd = true">132456</button>
    <!-- 添加模板 -->
    <el-dialog
      title="添加数据"
      :visible.sync="dialogFormVisibleadd"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :show-close="false"
      center
      width="35%"
    >
      <el-form
        :model="formList"
        :rules="rulesData"
        ref="form"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item
          v-for="(item, index) in dataTableList"
          :key="index"
          :label="item.label"
          :prop="item.dataName"
        >
          <el-input
            v-model="formList[item.dataName]"
            style="width:400px"
            v-if="item.putType === 'input'"
          ></el-input>

          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formList[item.dataName]"
              style="width: 150px;"
              v-if="item.putType === 'date'"
            ></el-date-picker>

            <el-select
              v-model="formList[item.dataName]"
              placeholder="请选择类型"
              v-if="item.putType === 'select'"
            >
              <el-option
                :label="dat"
                :value="dat"
                v-for="(dat, key) in item.selectData"
                :key="key"
              ></el-option>
            </el-select>
          </el-col>

          <el-input-number
            v-model="formList[item.dataName]"
            :step="50"
            :min="50"
            :max="999999999"
            label="描述文字"
            v-if="item.putType === 'num'"
          ></el-input-number>

          <el-input
            type="age"
            v-model.number="formList[item.dataName]"
            style="width:400px"
            v-if="item.putType === 'numput'"
          ></el-input>

          <el-input
            type="age"
            auto-complete="off"
            style="width:400px"
            v-model.number="formList[item.dataName]"
            disabled
            v-if="item.putType === 'disput'"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { rulesData } from "../assets/data/rules";
export default {
  data() {
    return {
      rulesData,
      dataTableList: [
        {
          label: "购买单名",
          putType: "input",
          dataName: "buytitle"
        },
        { label: "日期", putType: "date", dataName: "btime" },
        {
          label: "类型",
          putType: "select",
          selectData: ["10000", "996", "007", "123"],
          dataName: "itemid"
        },
        { label: "数量", putType: "num", dataName: "num" },
        { label: "购买编号", putType: "numput", dataName: "buyerid" },
        { label: "负责人编号", putType: "disput", dataName: "neederid" }
      ],
      formList: {
        buyid: "",
        buytitle: "",
        btime: "",
        itemtype: "",
        itemid: "",
        num: "",
        buyerid: "",
        neederid: 1
      },
      dialogFormVisibleadd: false
    };
  },
  methods: {
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
    async adddata() {
      var data = {};
      for (const i in this.formList) {
        data[i] = this.formList[i];
      }
      // $ajax请求
      const url = "/web/saveUser";
      const { data: res } = await this.$ajax.post(url, data, {});
      if (res) {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.dialogFormVisibleadd = false;
      } else {
        this.$message.error("错了哦，添加失败");
      }
    }
  }
};
</script>

<style></style>
