
<template>
  <div class="right-body" id="body">
    <div class="bodyheart">
      <div class="body-top">
        <div class="bodytop-heart">
          <el-row>
            <el-col :span="8"
              ><img src="../../assets/查询数据列表.png" />
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
              <th colspan="1" rowspan="1" class="htop-th7">
                <div class="cell">需求单名</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th3">
                <div class="cell">类型</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th4">
                <div class="cell">类型ID</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th5">
                <div class="cell">数量</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th6">
                <div class="cell">日期</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th5">
                <div class="cell">需求部门编号</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th2">
                <div class="cell">详情</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th8">
                <div class="cell">操作</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th8">
                <div class="cell">状态</div>
              </th>
            </tr>
          </thead>
        </div>
        <!-- 数据列表 -->
        <!-- <el-table v-loading="loading2" element-loading-text="拼命加载中"> -->
        <tbody>
          <tr v-for="(item, key) in list" :class="{ uppdate: item.uptype }">
            <td class="body-td1">
              <div class="cell" id="cellid">
                {{ item.needid }}
              </div>
            </td>
            <td class="body-td3">
              <div class="cell3">
                {{ item.needtitle }}
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
              <div class="cell">
                {{ item.neednum }}
              </div>
            </td>
            <td class="body-td1">
              <div class="cell1">
                {{ item.needday }}
              </div>
            </td>
            <td class="body-td1">
              <div class="cell">
                {{ item.neederid }}
              </div>
            </td>
            <td class="body-td2">
              <div class="cell1">
                {{ item.comment }}
              </div>
            </td>
            <td class="body-td1">
              <div class="cell" v-if="!item.uptype">
                <button
                  id="modify"
                  @click="seeData(item)"
                  :disabled="item.uptype"
                  :class="{ upbutton: item.uptype }"
                >
                  编辑
                </button>
                <button
                  id="delete"
                  @click="deletedata(item)"
                  :disabled="item.uptype"
                  :class="{ upbutton: item.uptype }"
                >
                  删除
                </button>
              </div>
              <div v-if="item.uptype">
                <button
                  class="approval"
                  @click="seeData(item)"
                  :disabled="item.uptype"
                  :class="{ upbutton: item.uptype }"
                >
                  查看审批
                </button>
              </div>
            </td>
            <td class="body-td1">
              <div class="cell" v-if="!item.uptype">
                <button id="modify" @click="upData(item)">提交</button>
              </div>
              <div class="cell" v-if="item.uptype">审批中....</div>
            </td>
          </tr>
        </tbody>

        <!-- 修改表单/ 提交表单 -->
        <el-dialog
          :title="!form.uptype ? '修改数据': '提交送审'"
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
            <el-form-item label="编号ID" prop="needid">
              <el-input
                type="age"
                v-model.number="form.needid"
                auto-complete="off"
                style="width: 400px"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="需求单名" prop="needtitle">
              <el-input
                v-model="form.needtitle"
                style="width: 400px"
              ></el-input>
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
            <el-form-item label="数量" prop="neednum">
              <!-- <el-input type="age" v-model.number="form.neednum" auto-complete="off" style="width:400px"></el-input> -->
              <el-input-number
                v-model="form.neednum"
                :step="50"
                :min="50"
                :max="999999999"
                label="描述文字"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="需求日期" prop="needday">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.needday"
                  style="width: 150px"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <!-- <el-col :span="11">
                                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                        </el-col> -->
            </el-form-item>
            <el-form-item label="负责人部门编号" prop="neederid">
              <el-input
                type="age"
                v-model="form.neederid"
                auto-complete="off"
                style="width: 400px"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="详情" prop="comment">
              <el-input
                type="textarea"
                v-model.number="form.comment"
                auto-complete="off"
                style="width: 400px"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false,form.uptype = false">取 消</el-button>
            <el-button
              type="primary"
              @click="submitForm('form')"
              v-show="!form.uptype"
              >保 存</el-button
            >
            <el-button
              type="primary"
              @click="updateForm('form')"
              v-show="form.uptype"
              >提交</el-button
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
            <el-form-item label="需求单名" prop="needtitle">
              <el-input
                v-model="addform.needtitle"
                style="width: 400px"
              ></el-input>
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
            <el-form-item label="数量" prop="neednum">
              <!-- <el-input type="age" v-model.number="form.neednum" auto-complete="off" style="width:400px"></el-input> -->
              <el-input-number
                v-model="addform.neednum"
                :step="50"
                :min="50"
                :max="999999999"
                label="描述文字"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="需求日期" prop="needday">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="addform.needday"
                  style="width: 150px"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <!-- <el-col :span="11">
                                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                        </el-col> -->
            </el-form-item>
            <el-form-item label="负责人部门编号" prop="neederid">
              <el-input
                type="age"
                v-model="list[0].neederid"
                auto-complete="off"
                style="width: 400px"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="详情" prop="comment">
              <el-input
                type="textarea"
                v-model.number="addform.comment"
                auto-complete="off"
                style="width: 400px"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
            <el-button type="primary" @click="submitFormadd('addform')"
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
  data () {
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
      list: [
        {
          needid: 1,
          needtitle: '马佳辉',
          itemtype: 5454165,
          itemid: 1373201546,
          neednum: '3',
          needday: '5',
          neederid: '的撒大',
          comment: 'dsadsadas',
          uptype: true
        },
        {
          needid: 1,
          needtitle: '马佳辉',
          itemtype: 5454165,
          itemid: 1373201546,
          neednum: '3',
          needday: '5',
          neederid: '的撒大',
          comment: 'dsadsadas',
          uptype: false
        }
      ],
      loading2: true,
      uptype: true,
      params: {
        limit: 5, // 每页显示5条记录
        page: 1, // 当前是第几页
        total: 0, // 总共几条记录去分页
        dname: '' // 查询数据
      },
      dialogFormVisible: false, // 不让修改窗口打开
      form: {
        needid: '',
        needtitle: '',
        itemtype: '',
        itemid: '',
        neednum: '',
        needday: '',
        neederid: '',
        comment: '',
        uptype: ''
      },
      dialogFormVisibleadd: false, // 不让添加窗口打开
      addform: {
        needid: '',
        needtitle: '',
        itemtype: '',
        itemid: '',
        neednum: '',
        needday: '',
        neederid: '',
        comment: ''
      },
      // 定义表单验证规则
      rules: {
        needid: [
          { required: true, message: 'ID不能为空', trigger: 'blur' },
          { type: 'number', message: 'ID必须为数字值' }
        ],
        needtitle: [
          { required: true, message: '请输入需求单名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          }
        ],
        itemtype: [
          { required: true, message: '请选择需求类型', trigger: 'change' }
        ],
        itemid: [
          { required: true, message: '请选择需求编号', trigger: 'change' }
        ],
        neednum: [
          { required: true, message: '需求数量不能为空', trigger: 'blur' },
          { type: 'number', message: '需求数量必须为数字值' }
        ],
        needday: [
          { required: true, message: '需求日期不能为空', trigger: 'blur' }
        ],
        comment: [{ required: true, message: '请填写详情', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 添加方法跳转添加界面
    gethomeAdd () {
      this.dialogFormVisibleadd = true
    },
    // 删除方法
    deletedata (e) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const url = '/webneed/deleteNeed'
          const { data: res } = await this.$ajax.get(url, {
            params: {
              needid: e.needid
            }
          })
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.search()
            this.list.splice(e, 1)
          } else {
            this.$message, error('错了哦，删除失败')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    upData (e) {
      this.form.uptype = !e.uptype
      this.seeData(e)
    },
    // 打开修改蒙版表单
    seeData (e) {
      // 编辑按钮 点击后显示编辑对话框
      this.form.needid = e.needid
      this.form.needtitle = e.needtitle.toString()
      this.form.itemtype = e.itemtype
      this.form.itemid = e.itemid
      this.form.neednum = parseInt(e.neednum) // 转换成int
      // this.form.neednum=e.neednum.toString();  //data内如何直接拿pass过来会显示not string所以要转化成string类型防止后面rule一直被触发
      this.form.needday = e.needday
      this.form.neederid = parseInt(e.neederid) // 转换成int
      this.form.comment = e.comment.toString()

      this.dialogFormVisible = true
    },
    // ajax请求后台数据 获得list数据 并用于分页
    async search () {
      const url = '/webneed/findAllNeed'
      // const url = '/web/listUser';
      const { data: res } = await this.$ajax.get(url, {
        params: {
          page: this.params.page, // 传递当前是第几页参数
          limit: this.params.limit, // 传递每页显示多少条记录参数
          username: this.params.dname // 传递搜索参数
        }
      })
      console.log(res)
      this.list = res // 获取里面的data数据
      this.params.total = res.count // 获取后台传过来的总数据条数
      this.params.page = res.page // 将后端的当前页反传回来
    },
    // 页码
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.params.limit = val // 设置每页多少条记录
      this.search()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.params.page = val
      this.search()
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 提交送审
    updateForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确定提交送审?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.editdata()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑表单的验证数据
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确定保存编辑此条数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.editdata()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑表单请求
    editdata () {
      // $ajax请求

      const url = '/webneed/updateNeed'
      console.log(this.form)
      this.$ajax
        .post(
          url,
          {
            needid: this.form.needid,
            needtitle: this.form.needtitle,
            itemtype: this.form.itemtype,
            itemid: this.form.itemid,
            neednum: this.form.neednum,
            needday: this.form.needday,
            neederid: this.form.neederid,
            comment: this.form.comment
          },
          {
            Headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
          }
        )
        .then((res) => {
          console.log(res)
          if (res.data.code == 101) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.dialogFormVisible = false
            this.search() // 从新调用页面获取表单数据
          } else {
            this.$message.error('错了哦，修改失败1')
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('错了哦，修改失败')
        })
    },
    // 添加表单验证
    submitFormadd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确定保存添加此条数据?', '提示', {
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
    // 添加表单请求
    async adddata () {
      // $ajax请求
      const url = '/webneed/addNeed'
      const { data: res } = await this.$ajax.post(
        url,
        {
          needid: this.addform.needid,
          needtitle: this.addform.needtitle,
          itemtype: this.addform.itemtype,
          itemid: this.addform.itemid,
          neednum: this.addform.neednum,
          needday: this.addform.needday,
          neederid: this.addform.neederid,
          comment: this.addform.comment
        },
        {}
      )
      if (res) {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.search()
      } else {
        this.$message.error('错了哦，添加失败')
      }
    }
  },
  mounted () {
    // var ps=String.split(this.form.pass);
    // console.log(ps);
    setTimeout(() => {
      this.loading2 = false
    }, 400)
    // 调用方法获取后端数据
    // this.search()
  },
  components: {}
}
</script >
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
  width: 1460px;
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
  border: 0.5px solid #dadce0;
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
.approval {
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
  width: 140px;
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
  width: 140px;
}

tbody tr:hover {
  background-color: #f5f7fa;
}
.uppdate {
  background: #f5f7fa;
  cursor: not-allowed;
}
.upbutton {
  cursor: not-allowed !important;
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
