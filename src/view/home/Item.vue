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
              <th colspan="1" rowspan="1" class="htop-th4">
                <div class="cell">类型ID</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th3">
                <div class="cell">类型</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th2">
                <div class="cell">描述</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th5">
                <div class="cell">数量</div>
              </th>
              <th colspan="1" rowspan="1" class="htop-th1">
                <div class="cell">单位</div>
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
              <div class="cell">
                {{ item.itemid }}
              </div>
            </td>
            <td class="body-td1">
              <div class="cell">
                {{ item.itemtype }}
              </div>
            </td>
            <td class="body-td2">
              <div class="cell1">
                {{ item.comment }}
              </div>
            </td>
            <td class="body-td1">
              <div class="cell">
                {{ item.neednum }}
              </div>
            </td>

            <td class="body-td1">
              <div class="cell1">
                {{ item.needtitle }}
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
            label: '需求单名',
            putType: 'input',
            dataName: 'needtitle'
          },
          {
            label: '需求日期',
            putType: 'date',
            dataName: 'needday'
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
            dataName: 'neednum'
          },
          {
            label: '负责人部门号',
            putType: 'disput',
            dataName: 'neederid'
          },
          {
            label: '详情',
            putType: 'textarea',
            dataName: 'comment'
          }
        ],
        formList: {
          itemid: "",
          needtitle:"",
          needday:"",
          itemtype: "",
          itemid:"",
          neednum: "",
          neederid: "",
          comment: ""
        },
        url: '',
      },
      list: [
        {
          itemid: 1,
          itemtype: "马佳辉",
          comment: 5454165,
          neednum: "3",
          needtitle: "5"
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
    // 添加方法跳转添加界面
    gethomeAdd() {
      this.dialogData.dialogType='add'
      this.dialogData.url="/webneed/addNeed"
      if(this.dialogData.dataTableList[0].label==="编号ID") this.dialogData.dataTableList.splice(0,1)
      for (const i in this.dialogData.formList) {
       this.dialogData.formList[i] = ''
      }
      this.$refs.addDialog.dialogFormVisibleadd = true

      // this.dialogFormVisibleadd = true;
    },
    // 删除方法
    deletedata(e) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const url = "/webneed/deleteNeed";
          const { data: res } = await this.$ajax.get(url, {
            params: {
              itemid: e.itemid
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
        if(i==="neednum" || i==="neederid") this.dialogData.formList[i] =parseInt(e[i])
        else this.dialogData.formList[i] = e[i].toString();
      }
      this.dialogData.url="/webneed/updateNeed"
      if(this.dialogData.dataTableList[0].label==="需求单名") this.dialogData.dataTableList.splice(0,0,{label: '编号ID',
            putType: 'disput',
            dataName: 'itemid'})
      this.$refs.addDialog.dialogFormVisibleadd = true
    },
    // ajax请求后台数据 获得list数据 并用于分页
    async search() {
      const url = "/webneed/findAllNeed";
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
  }
};
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
  width: 1210px;
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
      .htop-th7 {
        display: flex;
        align-content: space-between;
        justify-content: center;
        width: 150px;
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
    .body-td3 {
      width: 150px;
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
input {
  &::-webkit-input-placeholder {
    color: #c7c8c9;
  }
}

</style>
