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
                    <div class="cell"  style="backgournd-color:red;">
                      <span class="tipsspan" :style="{
                        'background-color': statusColorList[item.uptype],
                        'color': item.uptype == 0?'black':'white'
                        }">
                        {{
                          item.uptype == 0 ? '未送审'
                          :item.uptype == 1? '审批中...'
                          :item.uptype == 2? '审批驳回'
                          :item.uptype == 3? '审批通过':''
                        }}
                      </span>
                    </div>
                  </div>
                </td>

              </tr>
            </tbody>

            <!-- </el-table> -->
          </div>
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
      statusColorList: ['#eee', 'blue', 'rgb(226, 63, 63)', 'green'],
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
  @import url("../../assets/less/right-table.less");

  .tipsspan {
    display: block;
    border-radius:3px;
    width: 75px;
    height: 27px;
    line-height: 27px;
    color: rgb(226, 63, 63);
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
