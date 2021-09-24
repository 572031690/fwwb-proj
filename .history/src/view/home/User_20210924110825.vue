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
                      placeholder="筛选部门"
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
              <el-col :span="8" v-if="this.$store.state.departmentId.includes('10000')">
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
                :class="{'htop-th2':  item === '用户名','htop-ope1':item === '操作'}">
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
              :class="{
                  ['body-td2']:data==='username',
                  ['body-ope1']:data==='opetation'
                }"
              >

                <div class="cell" v-if="data!=='opetation' && data!=='opetationRole' && data!=='roleStatus'">
                  {{ data==='departmentid' ? departmentData[parseInt(item[data])] :item[data] }}
                </div>

                <div class="cell" v-if="data==='opetation'">
                  <button class="modify" @click="seeData(item)">编辑</button>
                  <button class="delete" @click="deletedata({userid: item.userid},'home/user/deleteUser')">删除</button>
                  <button class="approval" @click="resetPass(item)">重置密码</button>
                </div>
                <div class="cell" v-if="data==='opetationRole'">
                  <button class="roleBtn" @click="getRole(item)">分配角色</button>
                </div>
                <div class="cell" v-if="data==='roleStatus'">
                    <el-switch
                      v-model="item.disabledRole"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value=1
                      @change="setStatus(item.userid)"
                      inactive-value=0>
                    </el-switch>
                    {{item.disabledRole? '正常': '禁用'}}
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

        <el-dialog
          title="分配角色"
          :visible.sync="dialogVisibleRole"
          width="30%">
          <div class="tableRole">
            <div class="tableRoleTop">
              <div class="btnRole">选择</div>
              <div class="textRole">角色名称</div>
              <div class="textRole">描述</div>
            </div>
            <el-checkbox-group v-model="currentRola">
              <div class="tableRoleBody" v-for="(item,index) in rolaData" :key="index">
                <div class="btnRole"><el-checkbox :label="item.rolaID">{{''}}</el-checkbox></div>
                <div class="textRole">{{item.roleName}}</div>
                <div class="textRole">{{item.roleDescribe}}</div>
              </div>
            </el-checkbox-group>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleRole = false">取 消</el-button>
            <el-button type="primary" @click="checkRoleList">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import addDialog from '../../components/addDataDialog.vue'
import homeMix from '../../assets/mixins/home-mixins'

export default {
  mixins: [homeMix],
  components: {
    addDialog
  },
  data () {
    return {
      tableText: '',
      dialogFormShow: false,
      IntList: ['departmentid', 'employeeid', 'userid'],
      topChange: 'userid',
      list: [
        {
          userid: 1,
          username: '马佳辉',
          password: 5454165,
          telNum: 17816536995,
          employeeid: '3',
          departmentid: '10001',
          disabledRole: 0
        },
        {
          userid: 2,
          username: '夏航宇',
          password: 15615,
          telNum: 15865645646,
          employeeid: '1',
          departmentid: '10021',
          disabledRole: 0
        }
      ],
      departmentData: {
        10000: '管理员',
        10001: '总经理',
        10010: '需求经理',
        10011: '需求专员',
        10020: '采购经理',
        10021: '采购专员'
      },
      loading2: true,
      rolaID: 0,
      rolaData: [
        {
          rolaID: 10000,
          roleName: '管理员',
          roleDescribe: '管理整个系统'
        },
        {
          rolaID: 10001,
          roleName: '总经理',
          roleDescribe: '管理整个系统'
        }
      ],
      select: [
        {
          value: '10011',
          label: '需求专员'
        },
        {
          value: '10010',
          label: '需求经理'
        },
        {
          value: '10021',
          label: '采购专员'
        },
        {
          value: '10020',
          label: '采购经理'
        },
        {
          value: '10001',
          label: '总经理'
        },
        {
          value: '10000',
          label: '管理员'
        }

      ],
      dialogFormVisible: false, // 不让修改窗口打开
      dialogVisibleRole: false, // 角色分配窗口
      currentRola: [],
      currentId: ''
    }
  },
  created () {
    if (this.$store.state.departmentId.includes('10000')) {
      this.tableText = this.$tables.userListedit
    } else {
      this.tableText = this.$tables.userListsee
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading2 = false
      console.log(this.list, 'list')
    }, 400)
    this.getSearchUrl()
    // 调用方法获取后端数据
    this.search()
  },
  methods: {
    checkRoleList () {
      console.log(this.currentRola)
      this.$confirm('确定是否分配此用户该权限角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const url = 'home/user/checkRola'
        const params = {
          departmentid: this.currentRola.join(','),
          userid: this.currentId
        }
        await this.$api(url, {
          params
        }).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '分配权限成功!'
            })
            this.search()
            this.dialogVisibleRole = false
          } else {
            this.$message.error('错了哦，分配失败')
          }
        })
      })
        .catch(err => {
          if (err === 'cancel') {
            this.$message('取消删除')
          } else {
            this.$message({
              type: 'error',
              message: err
            })
          }
        })
    },
    getSearchUrl () {
      this.searchUrl = 'home/user/getUser'
    },
    resetPass (item) {
      this.$confirm('确定是否重置此用户密码为6个8?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const url = 'home/user/resetPass'
        const params = {
          userid: item.userid
        }
        await this.$api(url, {
          params
        }).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '重置成功!'
            })
            this.search()
            this.dialogVisibleRole = false
          } else {
            this.$message.error('错了哦，重置密码失败')
          }
        })
      })
        .catch(err => {
          if (err === 'cancel') {
            this.$message('取消重置')
          } else {
            this.$message({
              type: 'error',
              message: err
            })
          }
        })
    },
    /**
     * @desc 获取渲染表格头部
     */
    getRole (item) {
      this.currentId = item.userid
      this.getRolaList()
    },

    async getRolaList () {
      const url = 'home/user/getRolaList'
      await this.$api(url).then((res) => {
        console.log(res)
        this.dialogVisibleRole = true
      })
    },
    async setStatus (id) {
      const url = 'home/user/changeStatus'
      await this.$api(url, {
        params: {
          userid: id
        }
      }).then((res) => {
        console.log(res)
        this.search()
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../assets/less/right-table.less");

.body-top {
  width: 1280px;
}

.tableRole {
  &Top {
    display: flex;
    border-bottom: 1px solid rgb(235, 238, 245);
  }
  &Body {
    display: flex;
    border-bottom: 1px solid rgb(235, 238, 245);
  }
  .textRole {
    color: rgb(111, 115, 116);
    font-size: 14px;
    width: 150px;
    height:50px;
    line-height: 50px;
  }
  .btnRole {
    color: rgb(111, 115, 116);
    font-size: 14px;
    width: 60px;
    height:50px;
    line-height: 50px;
  }
}
</style>
