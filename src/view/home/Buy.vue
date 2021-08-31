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

      <addDialog ref="addDialog" :dialogData="dialogData" @updata="search"></addDialog>
      
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
  data() {
    return {
      dialogData: {
        dialogType:'',
        dataTableList: [
          {
            label: '购买单名',
            putType: 'input',
            dataName: 'buytitle'
          },
          {
            label: '日期',
            putType: 'date',
            dataName: 'btime'
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
          {
            label: '数量',
            putType: 'num',
            dataName: 'num'
          },
          {
            label: '购买编号',
            putType: 'numput',
            dataName: 'buyerid'
          },
          {
            label: '负责人编号',
            putType: 'disput',
            dataName: 'neederid'
          }
        ],
        formList: {
          buyid: "",
          buytitle: "",
          btime: "",
          itemtype: "",
          itemid: "",
          num: "",
          buyerid: "",
          neederid: 15
        },
        url: '',
      },
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
      }
    };
  },
  methods: {
    // 添加方法打开添加界面
    gethomeAdd() {
      this.dialogData.dialogType='add'
      this.dialogData.url="/webbuy/addBuy"
      // this.dialogFormVisibleadd = true;
      if(this.dialogData.dataTableList[0].label==="编号ID") this.dialogData.dataTableList.splice(0,1)
      for (const i in this.dialogData.formList) {
       this.dialogData.formList[i] = ''
      }
      this.$refs.addDialog.dialogFormVisibleadd = true

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
      this.dialogData.dialogType='edit'
      for (const i in this.dialogData.formList) {
        if(i==="itemid" || i==="num"|| i==="buyerid"|| i==="neederid") this.dialogData.formList[i] =parseInt(e[i])
        else this.dialogData.formList[i] = e[i]
      }
      this.dialogData.url="/webbuy/updateBuy"
      if(this.dialogData.dataTableList[0].label==="购买单名") this.dialogData.dataTableList.splice(0,0,{label: '编号ID',
            putType: 'disput',
            dataName: 'buyid'})
      this.$refs.addDialog.dialogFormVisibleadd = true
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

    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
  },
  mounted() {
    // var ps=String.split(this.form.pass);
    // console.log(ps);
    setTimeout(() => {
      this.loading2 = false;
    }, 400);
    // 调用方法获取后端数据
    this.search();
  }
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
