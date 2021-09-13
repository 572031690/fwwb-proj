<template>
  <div class="right-body" id="body">
    <div class="bodyheart">
      <div class="body-top">
        <div class="heart-box">
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
              :class="{
                'htop-th7':item === '需求单名',
                'htop-th2':item === '详情',
                'htop-ope1':item === '操作'
              }"
              >
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
            :class="{
              ['body-td3']:data==='needtitle',
              ['body-td2']:data==='comment',
              ['body-ope1']:data==='opetation1'
            }"
            >
              <div class="cell" v-if="data!=='opetation1' && data!=='opetation2'">
                {{ item[data] }}
              </div>
               <div class="bodyButton" v-if="data==='opetation1'">
                <div class="cell">
                  <button id="modify" @click="edData(item)"  v-if="item.uptype == 0 || item.uptype == 2">
                    编辑
                  </button>
                  <button id="delete" @click="deletedata(item)"  v-if="item.uptype == 0 || item.uptype == 2">
                    删除
                  </button>
                  <button id="modify" v-if="!item.uptype" @click="upData(item)">提交</button>
                  <button class="approval" @click="seeApproval(key)" v-if="item.uptype == 1 || item.uptype == 3">
                    查看审批
                  </button>
                  <button class="approval" @click="seeApproval(key)" v-if="item.uptype == 2">
                    驳回结果
                  </button>
                </div>
              </div>

               <div class="bodyButton" v-if="data==='opetation2'">
                 <div class="cell" v-if="item.uptype == 0">未送审</div>
                <div class="cell" v-if="item.uptype == 1">审批中....</div>
                <div class="cell" v-if="item.uptype == 2">审批驳回</div>
                <div class="cell" v-if="item.uptype == 3">审批通过</div>
              </div>
            </td>

          </tr>
        </tbody>

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

      <addDialog ref="addDialog"
        :dialogFormShow="dialogFormShow"
        @updata="search"
        @closeaddDialog="closeaddDialog"
        :IntList="IntList"
        :topChange="topChange"
        :currentList="currentList"
        :openType="openType"
        name="needList"
      >
      </addDialog>

      <Drawer
        :listIn="list[currentIndex]"
        typeName="need"
        @close="drawerClose"
        ref="Draw"
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
      tableText: this.$tables.needList,
      dialogFormShow: false,
      IntList: ['needid', 'neednum', 'neederid'],
      openType: 'edit',
      currentList: {},
      topChange: 'needid',
      select: [ // 搜索框筛选数据
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
          comment: 'dsadsadasdsadasdsadsadas',
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
      params: {
        limit: 5, // 每页显示5条记录
        page: 1, // 当前是第几页
        total: 0, // 总共几条记录去分页
        dname: '', // 查询数据
        selectValue: '' // 查询状态
      }
    }
  },
  methods: {
    drawerClose (val) {
      console.log(val, '=------------')
    },
    // 添加方法打开界面
    gethomeAdd () {
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
    // 打卡抽屉
    seeApproval (e) {
      this.currentIndex = e
      // this.$refs.Draw.getFatherData()
      this.$refs.Draw.showDraw()
      // this.$store.commit('ChangeDraw')
    },
    // 提交送审表单
    upData (e) {
      this.openType = 'approval'
      this.currentList = e
      this.dialogFormShow = true
    },
    // 修改表单
    edData (e) {
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
  height: 100%;
  width: 100%;

}
.bodyheart {
  display: flex;
  width: 100%;
  align-items: center; /*由于flex-direction: column，因此align-items代表的是水平方向*/
  justify-content: center; /*由于flex-direction: column，因此justify-content代表的是垂直方向*/
  flex-direction: column;
  // overflow-x：scroll;

}
.body-top {
  margin-top: 50px;
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
  width: 90%;
  overflow: auto;
}
.cell {
  height: 28px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
        width: 350px;
      }
      .htop-th7 {
        width: 140px;
      }
      .htop-ope1 {
        width: 156px;
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
    .body-ope1 {
      width: 156px;
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
