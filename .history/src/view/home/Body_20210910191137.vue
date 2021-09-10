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
                  <el-select
                    v-model="params.selectValue"
                    @change="search"
                    placeholder="选择状态"
                    clearable
                    size="small"
                    class="selectAvro"
                  >
                    <el-option
                      style="padding:0 18px 0 10px;"
                      v-for="item in select"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <form v-on:submit.prevent="search">
                    <input
                      type="text"
                      placeholder="请输入用户姓名"
                      @change="search"
                      v-model="params.dname"
                    />
                    <button type="button"></button>
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
            <tr >
              <th v-for="(item,index) in tableText.tableTitle"
              :key="index"
              colspan="1"
              rowspan="1"
              :class="
              item === '需求单名'?'htop-th7'
              :item === '详情'?'htop-th2'
              :'htop-th1'">
                <div class="cell">{{item}}</div>
              </th>
            </tr>
          </thead>
        </div>
        <!-- 数据列表 -->
        <!-- <el-table v-loading="loading2" element-loading-text="拼命加载中"> -->
        <tbody>
          <tr
            v-for="(item, key) in list"
            :class="{ uppdate: item.uptype == 1 || item.uptype == 3 }"
            :key="key"
          >

            <td v-for="(data,index) in tableText.tableBody"
            :key="index"
            :class="data==='needtitle'? 'body-td3'
            :data==='comment'?'body-td2'
            :'body-td1'" >

              <div class="cell" v-if="data!=='opetation1' && data!=='opetation2'">
                {{ item[data] }}
              </div>
               <div class="bodyButton" v-if="data==='opetation1'">
                <div class="cell" v-if="item.uptype == 0 || item.uptype == 2">
                  <button id="modify" @click="edData(item)">
                    编辑
                  </button>
                  <button id="delete" @click="deletedata(item)">
                    删除
                  </button>
                </div>
                <div v-if="item.uptype == 1 || item.uptype == 3">
                  <button class="approval" @click="seeApproval(key)">
                    查看审批
                  </button>
                </div>
              </div>

               <div class="bodyButton" v-if="data==='opetation2'">
                <div class="cell" v-if="!item.uptype">
                  <button id="modify" @click="upData(item)">提交</button>
                </div>
                <div class="cell" v-if="item.uptype == 1">审批中....</div>
                <div v-if="item.uptype == 2">
                  <button class="approval" @click="seeApproval(key)">
                    驳回结果
                  </button>
                </div>
                <div class="cell" v-if="item.uptype == 3">审批通过</div>
              </div>
            </td>

          </tr>
        </tbody>

        <!-- 修改表单/ 提交表单 -->
        <el-dialog
          :title="form.showtype == 0 ? '修改数据' : '提交送审'"
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
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="submitForm('form')"
              v-show="!form.showtype"
              >保 存</el-button
            >
            <el-button
              type="primary"
              @click="updateForm('form')"
              v-show="form.showtype"
              >提交</el-button
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

      <addDialog ref="addDialog" :dialogData="dialogData" @updata="search"></addDialog>
      <Drawer
        :listIn="list[currentIndex]"
        :tableText="tableText"
        @close="drawerClose"
        ref="Draw"
        v-if="drawershow"
      ></Drawer>
    </div>
  </div>
</template>
<script>
import Drawer from '../../components/Drawer.vue'
import addDialog from '../../components/addDataDialog.vue'
export default {
  components: {
    Drawer,
    addDialog
  },
  data () {
    return {
      tableText: {
        tableTitle: ['编号', '需求单名', '类型', '类型ID', '数量', '日期', '需求部门编号', '详情', '操作', '状态'],
        tableBody: ['needid', 'needtitle', 'itemtype', 'itemid', 'neednum', 'needday', 'neederid', 'comment', 'opetation1', 'opetation2']
      },
      dialogData: {
        dialogType: '',
        dataTableList: [
          {
            label: '需求单名',
            putType: 'input',
            dataName: 'needtitle'
          },
          {
            label: '类型',
            putType: 'select',
            selectData: ['10000', '996', '007', '123'],
            dataName: 'itemtype'
          },
          {
            label: '类型ID',
            putType: 'select',
            selectData: ['10000', '996', '007', '123'],
            dataName: 'itemid'
          },
          { label: '数量', putType: 'num', dataName: 'neednum' },
          { label: '需求日期', putType: 'date', dataName: 'needday' },
          { label: '负责人部门号', putType: 'disput', dataName: 'neederid' },
          { label: '详情', putType: 'textarea', dataName: 'comment' }
        ],
        formList: {
          needid: '',
          needtitle: '',
          itemtype: '',
          itemid: '',
          neednum: '',
          needday: '',
          neederid: '',
          comment: '',
          uptype: 0
        },
        url: ''
      },
      select: [
        {
          value: '0',
          label: '未送审'
        },
        {
          value: '1',
          label: '审核中'
        },
        {
          value: '2',
          label: '驳回'
        },
        {
          value: '3',
          label: '通过'
        }
      ],
      currentIndex: 1, // 查看审批数据
      list: [
        {
          needid: 1,
          needtitle: '马佳辉1',
          itemtype: 5454165,
          itemid: 1373201546,
          neednum: '3',
          needday: '5',
          neederid: '14',
          comment: 'dsadsadas',
          uptype: 0
        },
        {
          needid: 1,
          needtitle: '马佳辉2',
          itemtype: 5454165,
          itemid: 1373201546,
          neednum: '3',
          needday: '5',
          neederid: '的撒大',
          comment: 'dsadsadas',
          uptype: 1
        },
        {
          needid: 1,
          needtitle: '马佳辉3',
          itemtype: 5454165,
          itemid: 1373201546,
          neednum: '3',
          needday: '5',
          neederid: '的撒大',
          comment: 'dsadsadas',
          uptype: 2
        },
        {
          needid: 1,
          needtitle: '马佳辉4',
          itemtype: 5454165,
          itemid: 1373201546,
          neednum: '3',
          needday: '5',
          neederid: '的撒大',
          comment: 'dsadsadas',
          uptype: 3
        }
      ],
      loading2: true,
      drawershow: false,
      params: {
        limit: 5, // 每页显示5条记录
        page: 1, // 当前是第几页
        total: 0, // 总共几条记录去分页
        dname: '', // 查询数据
        selectValue: '' // 查询状态
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
        showtype: ''
      },
      dialogFormVisibleadd: false, // 不让添加窗口打开
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
    drawerClose (val) {
      console.log(val, '=------------')
    },
    // 添加方法打开界面
    gethomeAdd () {
      this.dialogData.formList.neederid = parseInt(this.list[0].neederid)
      this.dialogData.url = '/web/saveUser'
      this.$refs.addDialog.dialogFormVisibleadd = true
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
            this.$message.error('错了哦，删除失败')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    seeApproval (e) {
      this.currentIndex = e
      this.drawershow = true
      // this.$refs.Draw.getFatherData()
      this.$refs.Draw.showDraw()
      // this.$store.commit('ChangeDraw')
    },
    upData (e) {
      this.form.showtype = 1
      this.seeData(e)
    },
    edData (e) {
      this.form.showtype = 0
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
      await this.$ajax.get(url, {
        params: {
          page: this.params.page, // 传递当前是第几页参数
          limit: this.params.limit, // 传递每页显示多少条记录参数
          username: this.params.dname // 传递搜索参数
        }
      }).then((res) => {
        console.log(res)
        const { data } = res
        this.list = data // 获取里面的data数据
        this.params.total = data.count // 获取后台传过来的总数据条数
        this.params.page = data.page // 将后端的当前页反传回来
      }).catch(() => {
        this.$message.error('网络异常')
      })
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
      this.$refs[formName].validate(valid => {
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
      this.$refs[formName].validate(valid => {
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
        .then(res => {
          console.log(res)
          if (res.data.code === 101) {
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
        .catch(err => {
          console.log(err)
          this.$message.error('错了哦，修改失败')
        })
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading2 = false
    }, 400)
    // 调用方法获取后端数据
    this.search()
  }
}
</script>
<style lang="less" scoped>
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
  img {
    vertical-align: middle;
    height: 26px;
    margin: 0 10px;
  }
  span {
    font-size: 16px;
    line-height: 28px;
    height: 28px;
    vertical-align: middle;
  }
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
  &:hover {
    background-color: #f0f7ff;
    color: #8ebaed;
    border: 1px solid #8ebaed;
  }
  &:active {
    border: 1px solid #144379;
  }
}
#modify {
  color: #8c959c;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #f0f7ff;
    color: #8ebaed;
    border: 1px solid #8ebaed;
  }
  &:active {
    border: 1px solid #144379;
  }
}
.approval {
  outline: none;
  border: 0.5px solid #8c959c;
  text-align: center;
  font-size: 8px;
  line-height: 26px;
  color: #8c959c;
  height: 26px;
  margin: 0 3px;
  width: 55px;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  &:hover {
    background-color: #f0f7ff;
    color: #8ebaed;
    border: 1px solid #8ebaed;
  }
  &:active {
    border: 1px solid #144379;
  }
}
#delete {
  color: #fff;
  background-color: red;
  cursor: pointer;
  &:hover {
    background-color: #df808f;
  }
  &:active {
    background: red;
  }
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
  button {
    outline: none;
    border: 0.5px solid #8c959c;
    text-align: center;
    font-size: 8px;
    line-height: 26px;
    height: 26px;
    margin: 0 3px;
    width: 41px;
    border-radius: 4px;
  }
}
.cell1 {
  height: 23px;
  width: 300px;
  overflow: hidden;
  /*顾名思义超出限定的宽度就隐藏内容*/
  white-space: nowrap;
  /*设置文字在一行显示不能换行*/
  text-overflow: ellipsis;
  /*规定当文本溢出时显示省略符号来代表被修剪的文本*/
}
.table-top {
  thead {
    tr {
      display: flex;
      flex-direction: row;
      th {
        display: flex;
        align-content: space-between;
        justify-content: center;
        width: 120px;
        height: 35px;
        border: 1px solid #dadce0;
        padding-top: 10px;
        text-align: center;
      }
      .htop-th2 {
        display: flex;
        align-content: space-between;
        justify-content: center;
        width: 350px;
      }
      .htop-th7 {
        display: flex;
        align-content: space-between;
        justify-content: center;
        width: 140px;
      }
    }
  }
}
.tbody {
  tr {
    display: flex;
    flex-direction: row;
  }
}
tbody {
  tr {
    transition: all 0.2s;
    display: flex;
    flex-direction: row;
    align-content: space-between;
    justify-content: center;
    td {
      display: flex;
      align-content: space-between;
      justify-content: center;
      width: 120px;
      height: 35px;
      border: 1px solid #dadce0;
      padding-top: 10px;
      text-align: center;
    }
    .body-td2 {
      width: 350px;
    }
    .body-td3 {
      width: 140px;
    }
    &:hover {
      background-color: #f5f7fa;
    }
  }
}
.uppdate {
  background: #eee;
  cursor: not-allowed;
}
.upbutton {
  cursor: not-allowed !important;
}
.table-bottom {
  margin-top: 15px;
  margin-left: 50%;
}
.selectAvro {
  width: 89px;
  position: absolute;
  margin-top: 1px;
  z-index: 10;
}
.searchfa {
}
.search {
  position: relative;
  float: left;
  width: 100%;
  height: 30px;
  display: flex;
  input {
    border: none;
    outline: none;
    width: 61.5%;
    height: 30px;
    padding-left: 105px;
    border: 2px solid #dadce0;
    border-right: 0;
    border-radius: 4px 2px 2px 4px;
    color: black;
    font-size: 16px;
  }
  button {
    border: none;
    outline: none;
    height: 30px;
    width: 45px;
    cursor: pointer;
    position: absolute;
    top: 1.6px;
    right: 26.5px;
    background: #dadce0;
    border-radius: 0 2px 2px 0;
    &:hover {
      background-color: #c8c8c8;
      box-shadow: 0 0 3px#c8c8c8;
    }
    &:active {
      padding-left: 1px;
      padding-top: 1px;
      background: #dadce0;
    }
    &:before {
      content: "\f002";
      font-family: FontAwesome;
      font-size: 16px;
      color: #f9f0da;
    }
  }
}
form {
  position: relative;
  width: 350px;
}
input {
  &::-webkit-input-placeholder {
    color: #c7c8c9;
  }
}
</style>
<style lang="less">
.selectAvro {
  div {
    .el-input__inner {
      text-align: center;
      padding: 0 24px 0 5px;
      border-radius: 4px 0 0 4px;
      &:focus {
        border-color: #dadce0;
      }
    }
  }
}
.search {
  .el-select {
    .el-input {
      &.is-focus {
        .el-input__inner {
          border-color: #dadce0;
        }
      }
    }
  }
}

</style>
