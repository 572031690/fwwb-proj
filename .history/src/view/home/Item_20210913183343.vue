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
            <tr>
               <th v-for="(item,index) in tableText.tableTitle"
              :key="index"
              colspan="1"
              rowspan="1"
              :class="
              item === '描述'?'htop-th3'
              :item === '需求单名'?'htop-th7'
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
            :class="data==='comment'? 'body-td4'
            :data==='needtitle'?'body-td3'
            :'body-td1'" >

              <div :class="data ==='comment'?'cell1':'cell'" v-if="data!=='opetation'">
                {{ item[data] }}
              </div>

              <div class="cell" v-if="data==='opetation'">
                <button id="modify" @click="seeData(item)">编辑</button>
                <button id="delete" @click="deletedata(item)">删除</button>
              </div>
            </td>

          </tr>
        </tbody>

        <addDialog ref="addDialog"
          :dialogFormShow="dialogFormShow"
          @updata="search"
          @closeaddDialog="closeaddDialog"
          :IntList="IntList"
          :topChange="topChange"
          :currentList="currentList"
          :openType="openType"
          name="itemList"
      >
      </addDialog>

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
import addDialog from '../../components/addDataDialog.vue'

export default {
  components: {
    addDialog
  },
  data () {
    return {
      tableText: this.$tables.itemList,
      dialogFormShow: false,
      IntList: ['neednum', 'neederid', 'itemid'],
      openType: 'edit',
      currentList: {},
      topChange: 'itemid',
      list: [
        {
          itemid: 1,
          itemtype: '马佳辉',
          comment: 5454165,
          neednum: '3',
          needtitle: '5'
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
      // this.dialogData.dialogType = 'add'
      // this.dialogData.url = '/webneed/addNeed'
      // if (this.dialogData.dataTableList[0].label === '编号ID') this.dialogData.dataTableList.splice(0, 1)
      // for (const i in this.dialogData.formList) {
      //   this.dialogData.formList[i] = ''
      // }
      // this.$refs.addDialog.dialogFormVisibleadd = true

      // this.dialogFormVisibleadd = true;
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
          const url = '/webneed/deleteNeed'
          const { data: res } = await this.$ajax.get(url, {
            params: {
              itemid: e.itemid
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
      // console.log(e, 'dasdas')
      // // 编辑按钮 点击后显示编辑对话框
      // this.dialogData.dialogType = 'edit'
      // for (const i in this.dialogData.formList) {
      //   if (i === 'neednum' || i === 'neederid') { this.dialogData.formList[i] = parseInt(e[i]) } else {
      //     this.dialogData.formList[i] = e[i].toString()
      //   }
      // }
      // this.dialogData.url = '/webneed/updateNeed'
      // if (this.dialogData.dataTableList[0].label === '需求单名') {
      //   this.dialogData.dataTableList.splice(0, 0, {
      //     label: '编号ID',
      //     putType: 'disput',
      //     dataName: 'itemid'
      //   })
      // }
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
  height: 45px;
  width: 1210px;
  border: 1px solid #dadce0;
  border-radius: 4px;
}
</style>
