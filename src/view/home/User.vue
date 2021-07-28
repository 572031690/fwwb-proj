
<template>
    <div class="right-body" id="body">
        <div class="bodyheart">
            <div class="body-top">
                <div class="bodytop-heart">
                    <el-row>
                    <el-col :span="8"><img src="../../assets/查询数据列表.png" >
                    <span>用户列表</span></el-col>
                    <el-col :span="8">
                       <div class="searchfa">
                           <!-- 搜索框 -->
                           <div class="search">
                                <form>
                                    <input type="text" placeholder="请输入用户姓名"  @change="search" v-model="params.dname">
                                    <button type="submit"></button>
                                </form>
                            </div>

                       </div>
                    </el-col>
                    <el-col :span="8"> <button class="bodyadd" @click="gethomeAdd()"><i class="el-icon-plus"></i>添加</button></el-col>
                    </el-row>

                </div>
            </div>
            <div class="tablebody" v-loading="loading2" element-loading-text="拼命加载中">
                <div  class="table-top">
                    <thead>
                        <tr>
                            <th colspan="1" rowspan="1" class="htop-th1"><div class="cell">编号</div></th>
                            <th colspan="1" rowspan="1" class="htop-th2"><div class="cell">用户名</div></th>
                            <th colspan="1" rowspan="1" class="htop-th3"><div class="cell">密码</div></th>
                            <th colspan="1" rowspan="1" class="htop-th4"><div class="cell">电话号码</div></th>
                            <th colspan="1" rowspan="1" class="htop-th5"><div class="cell">职工号</div></th>
                            <th colspan="1" rowspan="1" class="htop-th6"><div class="cell">部门号</div></th>
                            <th colspan="1" rowspan="1" class="htop-th8"><div class="cell">操作</div></th>
                        </tr>
                    </thead>
                </div>
                <!-- 数据列表 -->
                <!-- <el-table v-loading="loading2" element-loading-text="拼命加载中"> -->
                    <tbody >
                        <tr  v-for="(item,key) in list" >
                            <td class="body-td1" >
                                <div class="cell"  id="cellid">
                                    {{item.userid}}
                                </div>
                            </td>
                            <td class="body-td2" >
                                <div class="cell">
                                    {{item.username}}
                                </div>
                            </td>
                            <td class="body-td1" >
                                <div class="cell">
                                    {{item.password}}
                                </div>
                            </td>
                            <td class="body-td1" >
                                <div class="cell">
                                    {{item.telNum}}
                                </div>
                            </td>
                            <td class="body-td1" >
                                <div class="cell">
                                {{item.employeeid}}
                                </div>
                            </td>
                            <td class="body-td1" >
                                <div class="cell1">
                                {{item.departmentid}}
                                </div>
                            </td>
                            <td class="body-td1">
                                <div class="cell">
                                    <button id="modify" @click="seeData(item)" >编辑</button>
                                    <button id="delete" @click="deletedata(item)">删除</button>
                                </div>
                            </td>

                        </tr>

                    </tbody>

                     <!-- 修改表单 -->
                            <el-dialog title="修改数据" :visible.sync="dialogFormVisible" :modal-append-to-body='false' :close-on-click-modal="false" :show-close="false" center  width="35%">
                                <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
                                    <el-form-item label="员工ID" prop="userId" >
                                        <el-input type="age" v-model.number="form.userId" auto-complete="off" style="width:400px" disabled></el-input>
                                    </el-form-item>
                                    <el-form-item label="姓名"  prop="name">
                                        <el-input v-model="form.name" style="width:400px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" prop="pass">
                                        <el-input v-model="form.pass" style="width:400px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电话" prop="tel" >
                                        <el-input type="age" v-model.number="form.tel" auto-complete="off" style="width:400px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="部门编号" prop="dpart">
                                        <el-select v-model="form.dpart" placeholder="请选择编号" >
                                        <el-option label="10000" value="10000"></el-option>
                                        <el-option label="996" value="996"></el-option>
                                        <el-option label="007" value="007"></el-option>
										<el-option label="123" value="123"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="员工号" prop="employeeid" >
                                        <el-input type="age" v-model.number="form.employeeid" auto-complete="off" style="width:400px"></el-input>
                                    </el-form-item>
                                    <!-- <el-form-item >
                                        <el-button type="primary" @click="submitForm('form')" class="onsub">立即创建</el-button>
                                        <el-button @click="dialogFormVisible = false">取消</el-button>
                                    </el-form-item> -->
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
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
                    :total="params.total">
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
          userid: 1,
          username: '马佳辉',
          password: 5454165,
          telNum: 1373201546,
          employeeid: '3',
          departmentid: '5'
        },
        {
          userid: 2,
          username: '夏航宇',
          password: 15615,
          telNum: 15865645646,
          employeeid: '1',
          departmentid: '5'

        }
      ],
      loading2: true,
      params: {
        limit: 5, // 每页显示5条记录
        page: 1, // 当前是第几页
        total: 0, // 总共几条记录去分页
        dname: ''// 查询数据
      },
      dialogFormVisible: false, // 不让修改窗口打开
      form: {
        userId: '',
        name: '',
        pass: '',
        tel: '',
        dpart: '',
        employeeid: ''
      },
      // 定义表单验证规则
      rules: {
        userId: [
          { required: true, message: 'ID不能为空', trigger: 'blur' },
          { type: 'number', message: 'ID必须为数字值' }
        ],
        name: [
          { required: true, message: '请输入姓名名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 24, message: '长度不能小于六位', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' } // 手机号码验证！！！！
          // { min: 9, max: 15, message: '长度不能小于9位', trigger: 'blur' }
        ],
        dpart: [
          { required: true, message: '请选择部门编号', trigger: 'change' }
        ],
        employeeid: [
          { required: true, message: '请输入员工编号', trigger: 'change' },
			 { type: 'number', message: '编号为数字值', trigger: 'blur' }
        ]
        //   address: [
        //     { required: true, message: '请填写地址', trigger: 'blur' }
        //   ]
      }

    }
  },
  methods: {
    // 添加方法跳转添加界面
    gethomeAdd () {
      this.$router.push({ path: '/home/add' })
    },
    // 删除方法
    deletedata (e) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const url = '/web/deleteUser'
        const {
          data: res
        } = await this.$ajax.get(url, {
          params: {
            userid: e.userid
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 打开修改蒙版表单
    seeData (e) { // 编辑按钮 点击后显示编辑对话框
      this.form.userId = e.userid
      this.form.name = e.username.toString()
      this.form.pass = e.password.toString() // data内如何直接拿pass过来会显示not string所以要转化成string类型防止后面rule一直被触发
      this.form.tel = e.telNum
      this.form.dpart = e.departmentid
      this.form.employeeid = parseInt(e.employeeid) // 转换成int
      this.dialogFormVisible = true
    },
    // ajax请求后台数据 获得list数据 并用于分页
    async search () {
      const url = 'web/listUser'
      // const url = '/web/listUser';
      const { data: res } = await this.$ajax.get(url,
        {
          params: {
            page: this.params.page, // 传递当前是第几页参数
            limit: this.params.limit, // 传递每页显示多少条记录参数
            username: this.params.dname// 传递搜索参数
          }
        }
      )
      console.log(res)
      this.list = res.list // 获取里面的data数据
      this.params.total = res.count// 获取后台传过来的总数据条数
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

    editdata () {
      // $ajax请求
      const url = '/web/updateUser'
      console.log(this.form.name)
      this.$ajax.post(url,
        {

          userid: this.form.userId,
          username: this.form.name,
          password: this.form.pass,
          telNum: this.form.tel,
          departmentid: this.form.dpart,
          employeeid: this.form.employeeid

        }, {
          Headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }
      ).then(res => {
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
      }).catch(err => {
        console.log(err)
        this.$message.error('错了哦，修改失败')
      })
    }

  },
  mounted () {
    // var ps=String.split(this.form.pass);
    // console.log(ps);
    setTimeout(() => {
      this.loading2 = false
    }, 400)
    // 调用方法获取后端数据
    this.search()
  },
  components: {
  }
}
</script >
<style scoped>
    .right-body{
        padding: 20px;
        height: 85.9vh;
        justify-content: center;
    }
    .bodyheart{

        padding: 20px;

        display: flex;
        /*实现垂直居中*/
        align-items: center;
        /*实现水平居中*/
        justify-content: center;

        flex-direction: column;
    }
    .body-top{

        height: 45px;
        width: 1340px;
        border: 1px solid #DADCE0;
        border-radius: 4px;
    }
    .bodytop-heart{
        margin: 7px 0 ;
        height: 28px;
        width: 100%;
    }
    .bodytop-heart img{
        vertical-align: middle;
        height: 26px;
        margin: 0 10px;
    }
    .bodytop-heart span{
        font-size: 16px;
        line-height: 28px;
        height: 28px;
        vertical-align: middle;
    }
    .rightbody-topmid{
        height: 25px;

    }
    .bodyadd{
        height: 28px;
        width: 48px;
        margin-top:2px ;
        vertical-align: middle;
        background-color: #fff;
        border-radius: 4px;
        outline: none;
        border: 1px solid #DADCE0;
        font-size: 11px;
        float: right;
        margin-right: 15px;
        cursor: pointer;
    }
    .bodyadd:hover , #modify:hover{
        background-color: #F0F7FF;
        color: #8EBAED;
        border: 1px solid #8EBAED;
    }
    .bodyadd:active ,#modify:active{
        border: 1px solid #144379;
    }
    #delete:hover{
        background-color: #DF808F;
    }
    #delete:active{
        background: red;
    }
    .tablebody{
        margin-top:25px ;

        border: 1px solid #DADCE0;
        border-radius: 4px;
        position: flex;
        align-content: space-between;
        justify-content: center;
    }

    .cell{
        height: 23px;
        width: 99px;

    }

    .cell1{
        height: 23px;
        width: 450px;
        overflow:hidden; /*顾名思义超出限定的宽度就隐藏内容*/
        white-space: nowrap; /*设置文字在一行显示不能换行*/
        text-overflow: ellipsis;/*规定当文本溢出时显示省略符号来代表被修剪的文本*/

    }
     .cell button{
        outline: none;
        border: 0.5px solid #8C959C;
        text-align: center;
        font-size: 8px;
        line-height: 26px;
        color: white;
        height: 26px;
        margin: 0 3px;
        width: 41px;

        border-radius:4px ;
     }
     #modify{
         color:#8C959C;
         background-color: white;
         cursor: pointer;
     }
     #delete{
         color:#fff;
         background-color: red;
         cursor: pointer;
     }
    .table-top thead tr,.tbody tr{
        display: flex;
        flex-direction: row;

    }
    .table-top thead tr th,tbody tr td{
        display: flex;
        align-content: space-between;
        justify-content: center;
        width: 135.5px;
        height: 35px;
        border: 1px solid #DADCE0;
        padding-top:10px ;
        text-align: center;
    }
    .table-top thead tr .htop-th2{
        display: flex;
        align-content: space-between;
        justify-content: center;
        width: 500px;
    }
    tbody tr{
        transition: all 0.2s;
        display:flex ;
        flex-direction: row;
        align-content: space-between;
        justify-content: center;
    }

    tbody tr .body-td2{
        width: 500px;
    }

    tbody tr:hover{
        background-color: #F5F7FA;
    }
    .table-bottom{

        margin-top: 15px;
        margin-left: 50%;
    }

    .searchfa{
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
	    border: 2px solid #DADCE0;
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
	    background:#DADCE0;
	    border-radius: 0 5px 5px 0;
	}
    .search button:hover{
        background-color:#C8C8C8 ;
		box-shadow:0 0 3px#C8C8C8 ;

	}
 	.search button:active{
		 padding-left: 1px;
         padding-top: 1px;
         background:#DADCE0;
    }
	.search button:before {
	    content: "\f002";
	    font-family: FontAwesome;
	    font-size: 16px;
	    color: #F9F0DA;
	}
	input::-webkit-input-placeholder {
        color: #c7c8c9;
    }

</style>
