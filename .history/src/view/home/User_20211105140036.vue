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
                      placeholder="筛选角色"
                      clearable
                      size="small"
                      class="selectAvro"
                    >
                      <el-option
                        style="padding: 0 18px 0 10px"
                        v-for="item in rolaSelect"
                        :key="item.roleId"
                        :label="item.rolename"
                        :value="item.roleId"
                      >
                      </el-option>
                    </el-select>
                    <div class="search-right">
                      <input
                        type="text"
                        placeholder="请输入用户姓名"
                        @change="search"
                        v-model="params.dname"
                      />
                      <button type="button" @click="search"></button>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col
                :span="8"
              >
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
          <div class="mytable">
            <div class="table-top">
              <div
                v-for="(item, index) in tableText.tableTitle"
                :key="index"
                colspan="1"
                rowspan="1"
                :class="{
                  'htop-th2': item === '登陆账号',
                  'htop-ope1': item === '操作',
                  'htop-th7': item === '职位',
                }"
              >
                <div class="cell">{{ item }}</div>
              </div>
            </div>
            <vNone v-if="!list.length" />
            <div class="tbody">
              <div class="bodyLine" v-for="(item, key) in list" :key="key">
                <div
                  v-for="(data, index) in tableText.tableBody"
                  :key="index"
                  :class="{
                    ['body-td2']: data === 'username',
                    ['body-td3']: data === 'roleId',
                    ['body-ope1']: data === 'opetation',
                  }"
                >
                  <div
                    class="cell"
                    v-if="
                      data !== 'opetation' &&
                      data !== 'opetationRole' &&
                      data !== 'roleStatus' &&
                      data !== 'roleId'
                    "
                  >
                    {{
                      data === "index"
                        ? key + 1
                        : data === "telNum"
                        ? desen(item[data])
                        : item[data]
                    }}
                  </div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="showRoleData(item[data])"
                    placement="top"
                    v-if="data === 'roleId'"
                  >
                    <div class="cell">
                      {{ showRoleData(item[data]) }}
                    </div>
                  </el-tooltip>

                  <div class="cell" v-if="data === 'opetation'">
                    <button class="modify" @click="seeData(item)">编辑</button>
                    <button
                      class="delete"
                      @click="
                        deletedata(
                          { userid: item.userid },
                          'home/user/deleteUser'
                        )
                      "
                    >
                      删除
                    </button>
                    <button class="approval" @click="resetPass(item)">
                      重置密码
                    </button>
                  </div>
                  <div class="cell" v-if="data === 'opetationRole'">
                    <button class="roleBtn" @click="getRole(item)">
                      分配角色
                    </button>
                  </div>
                  <div class="cell" v-if="data === 'roleStatus'">
                    <el-switch
                      :name="item.userid.toString()"
                      v-model="item.isDisabled"
                      active-color="#ff4949"
                      inactive-color="#13ce66"
                      @change="setStatus(item.userid, key)"
                    >
                    </el-switch>
                    {{ item.isDisabled ? "禁用" : "正常" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-bottom">
          <!-- 底部页码功能 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-sizes="[5, 10]"
            :page-size="params.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="params.total"
          >
          </el-pagination>
        </div>

        <vDialog
          ref="addDialog"
          :dialogFormShow="dialogFormShow"
          @updata="search"
          :editDisabled="editDisabled"
          @closeaddDialog="closeaddDialog"
          :IntList="IntList"
          :topChange="topChange"
          :currentList="currentList"
          :openType="openType"
          name="userList"
        >
        </vDialog>

        <el-dialog
          title="分配角色"
          :visible.sync="dialogVisibleRole"
          width="30%"
        >
          <div class="tableRole">
            <div class="tableRoleTop">
              <div class="btnRole">选择</div>
              <div class="textRole">角色名称</div>
              <div class="textRole">描述</div>
            </div>
            <el-checkbox-group v-model="currentRola">
              <div
                class="tableRoleBody"
                v-for="(item, index) in rolaData"
                :key="index"
              >
                <div class="btnRole">
                  <el-checkbox :label="item.roleId">{{ "" }}</el-checkbox>
                </div>
                <div class="textRole">{{ item.rolename }}</div>
                <div class="textRole">{{ item.description }}</div>
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
import homeMix from '../../assets/mixins/home-mixins'
import { desensitization } from '../../assets/utils/index'

export default {
  mixins: [homeMix],
  computed: {
    desen: function () {
      return function (val) {
        return desensitization(val)
      }
    }
  },
  data () {
    return {
      tableText: '',
      constIndex: 0,
      editDisabled: ['username'],
      dialogFormShow: false,
      IntList: ['departmentid', 'userid'],
      topChange: 'userid',
      list: [
        {
          employeeid: '456456415dsadsadas',
          username: '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶',
          realname: '456846',
          telNum: 454546,
          roleStatus: true
        }
      ],
      loading2: true,
      roleId: 0,
      rolaData: [
        {
          roleId: 10000,
          roleName: '管理员',
          roleDescribe: '管理整个系统'
        },
        {
          roleId: 10001,
          roleName: '总经理',
          roleDescribe: '管理整个系统'
        }
      ],
      rolaSelect: [],
      dialogFormVisible: false, // 不让修改窗口打开
      dialogVisibleRole: false, // 角色分配窗口
      currentRola: [], // 当前选中的角色列表
      currentId: '' // 当前选中的用户id (分配角色使用)
    }
  },
  created () {
    // if (this.$store.getters.getPermission.includes('admin:addUser')) {
    //   this.tableText = this.$tables.userListedit
    // } else {
    this.tableText = this.$tables.userListsee
    // }
  },
  mounted () {
    this.$emit('changeRouterIndex', this.$route.query.routerIndex)
    this.getSearchUrl()
    // 调用方法获取后端数据
    this.search()
    this.getRolaList()
  },
  methods: {
    /**
     * @desc 请求用户数据
     */
    async search () {
      await this.$api(this.searchUrl, {
        params: {
          page: this.params.page, // 传递当前是第几页参数
          limit: this.params.limit, // 传递每页显示多少条记录参数
          searchName: this.params.dname, // 传递搜索参数
          selectName: this.params.selectValue // 筛选参数
        }
      })
        .then((res) => {
          this.list = res.list || [] // 获取里面的data数据
          this.getEmitData()
          this.params.total = res.count // 获取后台传过来的总数据条数
          this.params.page = res.page // 将后端的当前页反传回来
          this.loading2 = false
        })
        .catch(() => {
          this.loading2 = false
        })
    },
    /**
     * @desc 初始化请求得到的list里的isDisabled，把1变成true，0变成false
     */
    getEmitData () {
      this.list.forEach(function (item) {
        if (item.isDisabled) {
          item.isDisabled = true
        } else {
          item.isDisabled = false
        }
      })
    },
    /**
     * @desc 显示角色内容
     */
    showRoleData (val) {
      if (!val) return
      const rolaArr = []
      this.rolaSelect.forEach((item) => {
        if (val.includes(item.roleId)) rolaArr.push(item.rolename)
      })
      return rolaArr.join(',')
    },
    /**
     * @desc 分配角色请求
     */
    checkRoleList () {
      this.$confirm('确定是否分配此用户该权限角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const url = 'home/user/checkRola'
          const data = {
            roleId: this.currentRola,
            userid: this.currentId
          }
          await this.$api(url, data).then((res) => {
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
        .catch((err) => {
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
    /**
     * @desc 配置请求列表数据url
     */
    getSearchUrl () {
      this.searchUrl = 'home/user/getUser'
    },
    /**
     * @desc 重置密码
     */
    resetPass (item) {
      this.$confirm('确定是否重置此用户密码为6个8?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const url = 'home/user/resetPass'
          const params = {
            userid: item.userid
          }
          await this.$api(url, {
            params
          }).then((res) => {
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
        .catch((err) => {
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
     * @desc 打开分配角色表
     */
    getRole (item) {
      this.currentRola = []
      if (item.roleId[0] !== 0) this.currentRola = item.roleId || []
      this.currentId = item.userid
      this.dialogVisibleRole = true
    },

    /**
     * @desc 获取角色列表
     */
    async getRolaList () {
      const url = 'home/user/getRolaList'
      await this.$api(url).then((res) => {
        this.rolaData = res.roleList
        this.rolaSelect = res.roleList
      }).catch(() => {})
    },
    /**
     * @desc 更改用户状态
     */
    async setStatus (id, key) {
      const url = 'home/user/changeStatus'
      await this.$api(url, {
        params: {
          userid: id
        }
      })
        .then(() => {
          this.$message.success('更改状态成功')
        })
        .catch(() => {
          setTimeout(() => {
            this.list[key].isDisabled = !this.list[key].isDisabled
          }, 400)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../assets/less/right-table.less");
.searchfa {
  /deep/ .el-input__inner {
    padding: 0 5px;
  }
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
    height: 50px;
    line-height: 50px;
  }
  .btnRole {
    color: rgb(111, 115, 116);
    font-size: 14px;
    width: 60px;
    height: 50px;
    line-height: 50px;
  }
}
</style>
