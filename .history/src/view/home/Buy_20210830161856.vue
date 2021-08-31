<template>
  <div class="right-body" id="body">
    <div class="bodyheart">
      <div class="body-top">
        <div class="bodytop-heart">
          <el-row>
            <el-col :span="8"
              ><img src="../../assets/img/查询数据列表.png" />
              <span>用户列表</span></el-col
            >
            <el-col :span="8">
              <div class="searchfa">
                <!-- 搜索框 -->
                <div class="search">
                  <form>
                    <input
                      type="text"
                      placeholder="请输入用户姓名"
                      @change="search"
                      v-model="params.dname"
                    />
                    <button type="submit"></button>
                  </form>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <button class="bodyadd" @click="gethomeAdd()">
                <i class="el-icon-plus"></i>添加
              </button></el-col
            >
          </el-row>
        </div>
      </div>
      <div
        class="tablebody"
        v-loading="loading2"
        element-loading-text="拼命加载中"
      >
        <div class="table-top">
          <thead>
            <!-- 表头 -->
            <tr>
              <th colspan="1" rowspan="1" class="htop-th1">
                <div class="cell">编号</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th2">
                <div class="cell">购买单名</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th3">
                <div class="cell">日期</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th4">
                <div class="cell">类型</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th5">
                <div class="cell">类型ID</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th6">
                <div class="cell">数量</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th5">
                <div class="cell">购买编号</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th5">
                <div class="cell">提交者编号</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th8">
                <div class="cell">操作</div>
              </th>
            </tr>
          </thead>
        </div>
        <!-- 数据列表 -->
        <!-- <el-table v-loading="loading2" element-loading-text="拼命加载中"> -->
        <tbody>
          <tr v-for="(item, key) in list">
            <td class="body-td1">
              <div class="cell" id="cellid">
                {{ item.buyid }}
              </div>
            </td>
            <td class="body-td2">
              <div class="cell2">
                {{ item.buytitle }}
              </div>
            </td>
            <td class="body-td1">
              <div class="cell">
                {{ item.btime }}
              </div>
            </td>
            <td class="body-td1">
              <div class="cell">
                {{ item.itemtype }}
              </div>
            </td>
            <td class="body-td1">
              <div class="cell">
                {{ item.itemid }}
              </div>
            </td>
            <td class="body-td1">
              <div class="cell1">
                {{ item.num }}
              </div>
            </td>
            <td class="body-td1">
              <div class="cell">
                {{ item.buyerid }}
              </div>
            </td>
            <td class="body-td1">
              <div class="cell">
                {{ item.neederid }}
              </div>
            </td>
            <td class="body-td1">
              <div class="cell">
                <button id="modify" @click="seeData(item)">编辑</button>
                <button id="delete" @click="deletedata(item)">删除</button>
              </div>
            </td>
          </tr>
        </tbody>

        <!-- 修改表单 -->
        <el-dialog
          title="修改数据"
          :visible.sync="dialogFormVisible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :show-close="false"
          center
          width="35%"
        >
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="编号ID" prop="buyid">
              <el-input
                type="age"
                v-model.number="form.buyid"
                auto-complete="off"
                style="width:400px"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="购买单名" prop="buytitle">
              <el-input v-model="form.buytitle" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item label="日期" prop="btime">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.btime"
                  style="width: 150px;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <!-- <el-col :span="11">
                                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                        </el-col> -->
            </el-form-item>
            <el-form-item label="类型" prop="itemtype">
              <el-select v-model="form.itemtype" placeholder="请选择类型">
                <el-option label="10000" value="10000"></el-option>
                <el-option label="996" value="996"></el-option>
                <el-option label="007" value="007"></el-option>
                <el-option label="123" value="123"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型ID" prop="itemid">
              <el-select v-model="form.itemid" placeholder="请选择ID">
                <el-option label="10000" value="10000"></el-option>
                <el-option label="996" value="996"></el-option>
                <el-option label="007" value="007"></el-option>
                <el-option label="123" value="123"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数量" prop="num">
              <!-- <el-input type="age" v-model.number="form.neednum" auto-complete="off" style="width:400px"></el-input> -->
              <el-input-number
                v-model="form.num"
                :step="50"
                :min="50"
                :max="999999999"
                label="描述文字"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="购买编号" prop="buyerid">
              <el-input
                type="age"
                v-model="form.buyerid"
                auto-complete="off"
                style="width:400px"
              ></el-input>
            </el-form-item>
            <el-form-item label="负责人编号" prop="neederid">
              <el-input
                type="age"
                v-model="form.neederid"
                auto-complete="off"
                style="width:400px"
                disabled
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')"
              >保 存</el-button
            >
          </div>
        </el-dialog>

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
            :model="addform"
            :rules="rules"
            ref="form"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="购买单名" prop="buytitle">
              <el-input
                v-model="addform.buytitle"
                style="width:400px"
              ></el-input>
            </el-form-item>
            <el-form-item label="日期" prop="btime">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="addform.btime"
                  style="width: 150px;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <!-- <el-col :span="11">
                                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                        </el-col> -->
            </el-form-item>
            <el-form-item label="类型" prop="itemtype">
              <el-select v-model="addform.itemtype" placeholder="请选择类型">
                <el-option label="10000" value="10000"></el-option>
                <el-option label="996" value="996"></el-option>
                <el-option label="007" value="007"></el-option>
                <el-option label="123" value="123"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型ID" prop="itemid">
              <el-select v-model="addform.itemid" placeholder="请选择ID">
                <el-option label="10000" value="10000"></el-option>
                <el-option label="996" value="996"></el-option>
                <el-option label="007" value="007"></el-option>
                <el-option label="123" value="123"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数量" prop="num">
              <!-- <el-input type="age" v-model.number="form.neednum" auto-complete="off" style="width:400px"></el-input> -->
              <el-input-number
                v-model="addform.num"
                :step="50"
                :min="50"
                :max="999999999"
                label="描述文字"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="购买编号" prop="buyerid">
              <el-input
                type="age"
                v-model.number="addform.buyerid"
                auto-complete="off"
                style="width:400px"
              ></el-input>
            </el-form-item>
            <el-form-item label="负责人编号" prop="neederid">
              <el-input
                type="age"
                v-model.number="addform.neederid"
                auto-complete="off"
                style="width:400px"
                disabled
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
            <el-button type="primary" @click="submitFormadd('form')"
              >添 加</el-button
            >
          </div>
        </el-dialog>

        <!-- </el-table> -->
      </div>
      <div class="table-bottom">
        <!-- 底部页码功能 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="params.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="params.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    // 验证两次密码输入是否一致
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表内静态数据列表
      list: [
        {
          buyid: 1,
          buytitle: "马佳辉",
          btime: 1373201546,
          itemtype: "3",
          itemid: "5",
          num: "dsadsadas",
          buyerid: "sad",
          neederid: 15
        }
      ],
      loading2: true,
      params: {
        limit: 5, // 每页显示5条记录
        page: 1, // 当前是第几页
        total: 0, // 总共几条记录去分页
        dname: "" // 查询数据
      },
      dialogFormVisible: false, // 不让修改窗口打开
      form: {
        buyid: "",
        buytitle: "",
        btime: "",
        itemtype: "",
        itemid: "",
        num: "",
        buyerid: "",
        neederid: 15
      },
      dialogFormVisibleadd: false, // 不让添加窗口打开
      addform: {
        buyid: "",
        buytitle: "",
        btime: "",
        itemtype: "",
        itemid: "",
        num: "",
        buyerid: "",
        neederid: 15
      },
      // 定义表单验证规则
      rules: {
        buyid: [
          { required: true, message: "ID不能为空", trigger: "blur" },
          { type: "number", message: "ID必须为数字值" }
        ],
        buytitle: [
          { required: true, message: "请输入需求单名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        btime: [
          { required: true, message: "需求日期不能为空", trigger: "blur" }
        ],
        itemtype: [
          { required: true, message: "请选择需求类型", trigger: "change" }
        ],
        itemid: [
          { required: true, message: "请选择需求编号", trigger: "change" }
        ],
        num: [
          { required: true, message: "需求数量不能为空", trigger: "blur" },
          { type: "number", message: "需求数量必须为数字值" }
        ],
        buyerid: [
          { required: true, message: "ID不能为空", trigger: "blur" },
          { type: "number", message: "ID必须为数字值" }
        ],
        neederid: [
          { required: true, message: "ID不能为空", trigger: "blur" },
          { type: "number", message: "ID必须为数字值" }
        ]
      }
    };
  },
  methods: {
    // 添加方法跳转添加界面
    gethomeAdd() {
      this.dialogFormVisibleadd = true;
    },
    // 删除方法
    deletedata(e) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const url = "/webbuy/deleteBuy";
          const { data: res } = await this.$ajax.get(url, {
            params: {
              buyid: e.buyid
            }
          });
          if (res) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.search();
            this.list.splice(e, 1);
          } else {
            this.$message, error("错了哦，删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 打开修改蒙版表单
    seeData(e) {
      // 编辑按钮 点击后显示编辑对话框
      this.form.buyid = e.buyid;
      this.form.buytitle = e.buytitle.toString();
      this.form.btime = e.btime;
      this.form.itemtype = e.itemtype;
      this.form.itemid = parseInt(e.itemid); // 转换成int
      // this.form.neednum=e.neednum.toString();  //data内如何直接拿pass过来会显示not string所以要转化成string类型防止后面rule一直被触发
      this.form.num = parseInt(e.num);
      this.form.buyerid = parseInt(e.buyerid); // 转换成int
      this.form.neederid = parseInt(e.neederid);
      this.dialogFormVisible = true;
    },
    // ajax请求后台数据 获得list数据 并用于分页
    async search() {
      const url = "/webbuy/findAllBuy";
      // const url = '/web/listUser';
      const { data: res } = await this.$ajax.get(url, {
        params: {
          page: this.params.page, // 传递当前是第几页参数
          limit: this.params.limit, // 传递每页显示多少条记录参数
          username: this.params.dname // 传递搜索参数
        }
      });
      console.log(res);
      this.list = res; // 获取里面的data数据
      this.params.total = res.count; // 获取后台传过来的总数据条数
      this.params.page = res.page; // 将后端的当前页反传回来
    },
    // 页码
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.params.limit = val; // 设置每页多少条记录
      this.search();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.page = val;
      this.search();
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 编辑表单的验证数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("是否确定保存编辑此条数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.editdata();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑表单请求
    editdata() {
      // $ajax请求

      const url = "/webbuy/updateBuy";
      console.log(this.form);
      this.$ajax
        .post(
          url,
          {
            buyid: this.form.buyid,
            buytitle: this.form.buytitle,
            btime: this.form.btime,
            itemtype: this.form.itemtype,
            itemid: this.form.itemid,
            num: this.form.num,
            buyerid: this.form.buyerid,
            neederid: this.form.neederid
          },
          {
            Headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 101) {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.dialogFormVisible = false;
            this.search(); // 从新调用页面获取表单数据
          } else {
            this.$message.error("错了哦，修改失败1");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("错了哦，修改失败");
        });
    },
    // 添加表单验证
    submitFormadd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("是否确定保存添加此条数据?", "提示", {
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
    // 添加表单请求
    async adddata() {
      var params = {
        buyid: this.addform.buyid,
        buytitle: this.addform.buytitle,
        btime: this.addform.btime,
        itemtype: this.addform.itemtype,
        itemid: this.addform.itemid,
        num: this.addform.num,
        buyerid: this.addform.buyerid,
        neederid: this.addform.neederid
      };
      // $ajax请求
      const url = "/webbuy/addBuy";
      const { data: res } = await this.$ajax.post(url, params, {});
      if (res) {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.search();
      } else {
        this.$message.error("错了哦，添加失败");
      }
    }
  },
  mounted() {
    // var ps=String.split(this.form.pass);
    // console.log(ps);
    setTimeout(() => {
      this.loading2 = false;
    }, 400);
    // 调用方法获取后端数据
    this.search();
  },
  components: {}
};
</script>
<style scoped>
.right-body {
  padding: 20px;
  height: 85.9vh;
  justify-content: center;
}
.bodyheart {
  padding: 20px;

  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;

  flex-direction: column;
}
.body-top {
  height: 45px;
  width: 1400px;
  border: 1px solid #dadce0;
  border-radius: 4px;
}
.bodytop-heart {
  margin: 7px 0;
  height: 28px;
  width: 100%;
}
.bodytop-heart img {
  vertical-align: middle;
  height: 26px;
  margin: 0 10px;
}
.bodytop-heart span {
  font-size: 16px;
  line-height: 28px;
  height: 28px;
  vertical-align: middle;
}
.rightbody-topmid {
  height: 25px;
}
.bodyadd {
  height: 28px;
  width: 48px;
  margin-top: 2px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  outline: none;
  border: 1px solid #dadce0;
  font-size: 11px;
  float: right;
  margin-right: 15px;
  cursor: pointer;
}
.bodyadd:hover,
#modify:hover {
  background-color: #f0f7ff;
  color: #8ebaed;
  border: 1px solid #8ebaed;
}
.bodyadd:active,
#modify:active {
  border: 1px solid #144379;
}
#delete:hover {
  background-color: #df808f;
}
#delete:active {
  background: red;
}
.tablebody {
  margin-top: 25px;

  border: 1px solid #dadce0;
  border-radius: 4px;
  position: flex;
  align-content: space-between;
  justify-content: center;
}

.cell {
  height: 23px;
  width: 100%;
}

.cell1 {
  height: 23px;
  width: 300px;
  overflow: hidden; /*顾名思义超出限定的宽度就隐藏内容*/
  white-space: nowrap; /*设置文字在一行显示不能换行*/
  text-overflow: ellipsis; /*规定当文本溢出时显示省略符号来代表被修剪的文本*/
}

.cell button {
  outline: none;
  border: 0.5px solid #8c959c;
  text-align: center;
  font-size: 8px;
  line-height: 26px;
  color: white;
  height: 26px;
  margin: 0 3px;
  width: 41px;

  border-radius: 4px;
}
#modify {
  color: #8c959c;
  background-color: white;
  cursor: pointer;
}
#delete {
  color: #fff;
  background-color: red;
  cursor: pointer;
}
.table-top thead tr,
.tbody tr {
  display: flex;
  flex-direction: row;
}
.table-top thead tr th,
tbody tr td {
  display: flex;
  align-content: space-between;
  justify-content: center;
  width: 120px;
  height: 35px;
  border: 1px solid #dadce0;
  padding-top: 10px;
  text-align: center;
}
.table-top thead tr .htop-th2 {
  display: flex;
  align-content: space-between;
  justify-content: center;
  width: 350px;
}
.table-top thead tr .htop-th7 {
  display: flex;
  align-content: space-between;
  justify-content: center;
  width: 150px;
}
tbody tr {
  transition: all 0.2s;
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: center;
}

tbody tr .body-td2 {
  width: 350px;
}
tbody tr .body-td3 {
  width: 150px;
}

tbody tr:hover {
  background-color: #f5f7fa;
}
.table-bottom {
  margin-top: 15px;
  margin-left: 50%;
}

.searchfa {
  margin-left: 35px;
}
form {
  position: relative;
  width: 350px;
}
.search {
  margin-left: 5px;
  float: left;

  height: 30px;
}

.search input {
  float: left;
  border: none;
  outline: none;
  width: 95.5%;
  height: 30px;
  padding-left: 13px;
  border: 2px solid #dadce0;
  border-right: 0;
  border-radius: 5px;
  color: black;
  font-size: 16px;
}

.search button {
  float: left;
  border: none;
  outline: none;
  height: 30px;
  width: 45px;
  cursor: pointer;
  position: absolute;
  top: 1.6px;
  right: 0;
  background: #dadce0;
  border-radius: 0 5px 5px 0;
}
.search button:hover {
  background-color: #c8c8c8;
  box-shadow: 0 0 3px#C8C8C8;
}
.search button:active {
  padding-left: 1px;
  padding-top: 1px;
  background: #dadce0;
}
.search button:before {
  content: "\f002";
  font-family: FontAwesome;
  font-size: 16px;
  color: #f9f0da;
}
input::-webkit-input-placeholder {
  color: #c7c8c9;
}
</style>
