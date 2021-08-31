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
        <el-form-item label="购买单名" prop="buytitle">
          <el-input v-model="formList.buytitle" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="btime">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formList.btime"
              style="width: 150px;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <!-- <el-col :span="11">
                                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                        </el-col> -->
        </el-form-item>
        <el-form-item label="类型" prop="itemtype">
          <el-select v-model="formList.itemtype" placeholder="请选择类型">
            <el-option label="10000" value="10000"></el-option>
            <el-option label="996" value="996"></el-option>
            <el-option label="007" value="007"></el-option>
            <el-option label="123" value="123"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型ID" prop="itemid">
          <el-select v-model="formList.itemid" placeholder="请选择ID">
            <el-option label="10000" value="10000"></el-option>
            <el-option label="996" value="996"></el-option>
            <el-option label="007" value="007"></el-option>
            <el-option label="123" value="123"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="num">
          <!-- <el-input type="age" v-model.number="form.neednum" auto-complete="off" style="width:400px"></el-input> -->
          <el-input-number
            v-model="formList.num"
            :step="50"
            :min="50"
            :max="999999999"
            label="描述文字"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="购买编号" prop="buyerid">
          <el-input
            type="age"
            v-model.number="formList.buyerid"
            auto-complete="off"
            style="width:400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人编号" prop="neederid">
          <el-input
            type="age"
            v-model.number="list[0].neederid"
            auto-complete="off"
            style="width:400px"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
        <el-button type="primary" @click="submitFormadd('formList')"
          >添 加</el-button
        >
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
          rules: "needtitle",
          putType: "input",
          dataName: "buytitle"
        },
        { label: "日期", rules: "btime", putType: "date", dataName: "btime" },
        {
          label: "类型",
          rules: "itemtype",
          putType: "select",
          selectData: ["10000", "996", "007", "123"],
          dataName: "itemid"
        },
        { label: "数量", rules: "neednum", putType: "num", dataName: "num" }
      ],
      formList: {
        buyid: "",
        buytitle: "",
        btime: "",
        itemtype: "",
        itemid: "",
        num: "",
        buyerid: "",
        neederid: ""
      },
      dialogFormVisibleadd: false
    };
  }
};
</script>

<style></style>
