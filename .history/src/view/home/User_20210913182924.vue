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
              :item === '密码'?'htop-th2'
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
            :data==='password'?'body-td2'
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

      <addDialog ref="addDialog"
        :dialogFormShow="dialogFormShow"
        @updata="search"
        @closeaddDialog="closeaddDialog"
        :IntList="IntList"
        :topChange="topChange"
        :currentList="currentList"
        :openType="openType"
        name="userList"
      >
      </addDialog>
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
      tableText: this.$tables.userList,
      dialogFormShow: false,
      IntList: ['departmentid', 'employeeid', 'userid'],
      openType: 'edit',
      currentList: {},
      topChange: 'userid',
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
          value: '10000',
          label: '管理部'
        },
        {
          value: '10001',
          label: '审批部'
        },
        {
          value: '10010',
          label: '需求部'
        },
        {
          value: '10020',
          label: '采购部'
        }
      ],
      dialogFormVisible: false // 不让修改窗口打开
    }
  },
  methods: {
    // 添加方法跳转添加界面
    gethomeAdd () {
      // this.dialogData.dialogType = 'add'
      // this.dialogData.url = '/web/saveUser'
      // delete this.dialogData.formList.userid
      // if (this.dialogData.dataTableList[0].label === '编号') this.dialogData.dataTableList.splice(0, 1)
      // for (const i in this.dialogData.formList) {
      //   this.dialogData.formList[i] = ''
      // }
      // this.$refs.addDialog.dialogFormVisibleadd = true
      // this.$router.push({ path: '/home/add' })
      this.openType = 'add'
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
      // this.dialogData.dialogType = 'edit'
      // for (const i in this.dialogData.formList) {
      //   if (i === 'departmentid' || i === 'employeeid') this.dialogData.formList[i] = parseInt(e[i])
      //   else this.dialogData.formList[i] = e[i]
      // }
      // this.dialogData.formList.userid = parseInt(e.userid)
      // if (this.dialogData.dataTableList[0].label === '姓名') {
      //   this.dialogData.dataTableList.splice(0, 0, {
      //     label: '编号',
      //     putType: 'disput',
      //     dataName: 'userid'
      //   })
      // }
      // this.dialogData.url = '/web/updateUser'
      // this.$refs.addDialog.dialogFormVisibleadd = true
      this.openType = 'edit'
      this.currentList = e
      this.dialogFormShow = true
    },
    // 关闭蒙版
    closeaddDialog () {
      this.dialogFormShow = false
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
@import url("../../assets/less/right-table.less");

.body-top {
  width: 1340px;
}
</style>
