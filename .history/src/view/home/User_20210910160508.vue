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
            <tr >
              <th v-for="(item,index) in tableText.tableTitle"
              :key="index"
              colspan="1"
              rowspan="1"
              :class="
              item === '用户名'?'htop-th2'
              :item === '密码'?'htop-th3'
              :'htop-th1'">
                <div class="cell">{{item}}</div>
              </th>
            </tr>
          </thead>
        </div>
        <!-- 数据列表 -->
        <!-- <el-table v-loading="loading2" element-loading-text="拼命加载中"> -->
        <tbody>
          <tr v-for="(item, key) in list" :key="key">

            <td v-for="(data,index) in tableText.tableBody"
            :key="index"
            :class="data==='username'? 'body-td2'
            :data==='password'?'body-td3'
            :'body-td1'" >

              <div class="cell" v-if="data!=='opetation'">
                {{ item[data] }}
              </div>

              <div class="cell" v-if="data==='opetation'">
                <button id="modify" @click="seeData(item)">编辑</button>
                <button id="delete" @click="deletedata(item)">删除</button>
              </div>
            </td>
          </tr>
        </tbody>

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

    </div>
  </div>
</template>
<script>
import addDialog from '../../components/addDataDialog.vue'
export default {
  components: {
    addDialog
  },
  data () {
    return {
      tableText: {
        tableTitle: ['编号', '用户名', '密码', '电话号码', '职工号', '部门号', '操作'],
        tableBody: ['userid', 'username', 'password', 'telNum', 'employeeid', 'departmentid', 'opetation']
      },
      dialogData: {
        dialogType: '',
        dataTableList: [
          {
            label: '姓名',
            putType: 'input',
            dataName: 'username'
          },
          {
            label: '密码',
            putType: 'input',
            dataName: 'password'
          },
          {
            label: '电话',
            putType: 'numput',
            dataName: 'telNum'
          },
          {
            label: '部门编号',
            putType: 'select',
            selectData: ['10000', '996', '007', '123'],
            dataName: 'departmentid'
          },
          {
            label: '员工号',
            putType: 'numput',
            dataName: 'employeeid'
          }
        ],
        formList: {
          username: '',
          password: '',
          telNum: '',
          departmentid: '',
          employeeid: ''
        },
        url: ''
      },
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
        dname: '', // 查询数据
        selectValue: '' // 查询状态
      },
      select: [
        {
          value: '0',
          label: '超级管理员'
        },
        {
          value: '1',
          label: '审批管理员'
        },
        {
          value: '2',
          label: '需求部'
        },
        {
          value: '3',
          label: '采购部'
        }
      ],
      dialogFormVisible: false // 不让修改窗口打开
    }
  },
  methods: {
    // 添加方法跳转添加界面
    gethomeAdd () {
      this.dialogData.dialogType = 'add'
      this.dialogData.url = '/web/saveUser'
      delete this.dialogData.formList.userid
      if (this.dialogData.dataTableList[0].label === '编号') this.dialogData.dataTableList.splice(0, 1)
      for (const i in this.dialogData.formList) {
        this.dialogData.formList[i] = ''
      }
      this.$refs.addDialog.dialogFormVisibleadd = true
      // this.$router.push({ path: '/home/add' })
    },
    // 删除方法
    deletedata (e) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const url = '/web/deleteUser'
          await this.$ajax.get(url, {
            params: {
              userid: e.userid
            }
          }).then(res => {
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 打开修改蒙版表单
    seeData (e) {
      // 编辑按钮 点击后显示编辑对话框
      this.dialogData.dialogType = 'edit'
      for (const i in this.dialogData.formList) {
        if (i === 'departmentid' || i === 'employeeid') this.dialogData.formList[i] = parseInt(e[i])
        else this.dialogData.formList[i] = e[i]
      }
      this.dialogData.formList.userid = parseInt(e.userid)
      if (this.dialogData.dataTableList[0].label === '姓名') {
        this.dialogData.dataTableList.splice(0, 0, {
          label: '编号',
          putType: 'disput',
          dataName: 'userid'
        })
      }
      this.dialogData.url = '/web/updateUser'
      this.$refs.addDialog.dialogFormVisibleadd = true
    },

    // ajax请求后台数据 获得list数据 并用于分页
    async search () {
      const url = 'web/listUser'
      await this.$ajax.get(url, {
        params: {
          page: this.params.page, // 传递当前是第几页参数
          limit: this.params.limit, // 传递每页显示多少条记录参数
          username: this.params.dname // 传递搜索参数
        }
      }).then((res) => {
        console.log(res)
        const { data } = res
        this.list = data.list // 获取里面的data数据
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
  width: 1340px;
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
  border: 1px solid #dadce0;
  border-radius: 4px;
  position: flex;
  align-content: space-between;
  justify-content: center;
}
.cell {
  height: 23px;
  width: 99px;
  button {
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
}
.cell1 {
  height: 23px;
  width: 450px;
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
        width: 135.5px;
        height: 35px;
        border: 1px solid #dadce0;
        padding-top: 10px;
        text-align: center;
      }
      .htop-th2 {
        display: flex;
        align-content: space-between;
        justify-content: center;
        width: 500px;
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
      width: 135.5px;
      height: 35px;
      border: 1px solid #dadce0;
      padding-top: 10px;
      text-align: center;
    }
    .body-td2 {
      width: 500px;
    }
    &:hover {
      background-color: #f5f7fa;
    }
  }
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
