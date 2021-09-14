<template>
  <div class="right-body" id="body">
    <div class="overbox">
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
                item === '操作'?'htop-th1'
                :'htop-th3'">
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
              :class="data==='opetation'? 'body-td1'
              :'body-td4'"
              @click="getDetail(item)">

                <div class="cell1" v-if="data!=='opetation'">
                  {{ item[data] }}
                </div>

                <div class="cell" v-if="data==='opetation'">
                  <button class="modify" @click.stop="seeData(item)">编辑</button>
                  <button class="delete" @click.stop="deletedata(item)">删除</button>
                </div>
              </td>
            </tr>
          </tbody>

        <addDialog ref="addDialog"
        :dialogFormShow="dialogFormShow"
        @updata="search"
        @closeaddDialog="closeaddDialog"
        :IntList="IntList"
        :currentList="currentList"
        :openType="openType"
        name="department"
        >
        </addDialog>

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
        <detail ref="detail"/>
      </div>
    </div>
  </div>
</template>
<script>
import addDialog from '../../components/addDataDialog.vue'
import detail from '../../components/DepartDetail.vue'
export default {
  components: {
    addDialog,
    detail
  },
  data () {
    return {
      tableText: this.$tables.departmentList,
      IntList: ['departmentid'],
      openType: 'edit',
      dialogFormShow: false,
      currentList: {},
      // 表内静态数据列表
      list: [
        {
          departmentname: 'sadasd',
          departmentid: '12'
        }
      ],
      loading2: true,
      params: {
        limit: 5, // 每页显示5条记录
        page: 1, // 当前是第几页
        total: 0, // 总共几条记录去分页
        dname: '' // 查询数据
      }
    }
  },
  methods: {
    // 添加方法跳转添加界面
    gethomeAdd () {
      // this.dialogFormVisibleadd = true;
      this.openType = 'add'
      // this.dialogData.url = '/webbuy/addBuy'
      // for (const i in this.dialogData.formList) {
      //   this.dialogData.formList[i] = ''
      // }
      this.dialogFormShow = true
    },
    // 删除方法
    deletedata (e) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const url = '/webDepartment/deleteDepartment'
          const { data: res } = await this.$ajax.get(url, {
            params: {
              departmentid: e.departmentid
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
    // 打开修改蒙版表单
    seeData (e) {
      // 编辑按钮 点击后显示编辑对话框
      // this.form.departmentname = e.departmentname.toString();
      this.openType = 'edit'
      this.currentList = e
      // for (const i in this.dialogData.formList) {
      //   if (i === 'departmentid') this.dialogData.formList[i] = parseInt(e[i])
      //   else this.dialogData.formList[i] = e[i]
      // }
      // this.dialogData.url = '/webbuy/updateBuy'
      this.dialogFormShow = true
    },
    // 关闭蒙版
    closeaddDialog () {
      this.dialogFormShow = false
    },
    // ajax请求后台数据 获得list数据 并用于分页
    async search () {
      const url = '/webDepartment/findAllDepartment'
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
    // 打开部门详情页面
    getDetail (item) {
      console.log(item)
      const form = {
        name: '采购部',
        employenum: 25,
        departmentid: 10020,
        detail: '此部门用于处理公司的采购订单等信息部门用于处理公司的采购订单等信息部门用于处理公司的采购订单等信息部门用于处理公司的采购订单等信息'
      }
      this.$refs.detail.form = form
      this.$refs.detail.dialogFormVisible = true
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
  }
}
</script>
<style lang="less" scoped>
@import url("../../assets/less/right-table.less");

.body-top {
  width: 1210px;
}

.searchfa {
  margin-left: 35px;
}
.search {
  margin-left: 5px;
  float: left;
  height: 30px;
  input {
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
  button {
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
</style>
