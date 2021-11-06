<template>
  <div class="right-body" id="body">
    <div class="overbox">
      <div class="bodyheart">
        <div class="body-top">
          <div class="bodytop-heart">
            <el-row>
              <el-col :span="8"
                ><img src="../../assets/img/查询数据列表.png" />
                <span>角色列表</span></el-col
              >
              <el-col :span="8">
                <div class="searchfa">
                  <!-- 搜索框 -->
                  <div class="search">
                    <form v-on:submit.prevent="search">
                      <input
                        type="text"
                        placeholder="请输入材料名称"
                        @change="search"
                        v-model="params.dname"
                      />
                      <button type="button"></button>
                    </form>
                  </div>
                </div>
              </el-col>
              <el-col
                :span="8"
                v-if="$store.getters.getPermission.includes('admin:addRole')"
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
                :class="item === '描述' ? 'htop-th3' : 'htop-th1'"
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
                  :class="{ 'body-td4': data === 'description' }"
                >
                  <div
                    class="cell"
                    v-if="
                      data !== 'isDeleted' &&
                      data !== 'opetation' &&
                      data !== 'opetationRole' &&
                      data !== 'index'
                    "
                  >
                    {{ item[data] }}
                  </div>
                  <div class="cell" v-if="data === 'isDeleted'">
                    <el-switch
                      :name="item.roleId.toString()"
                      v-model="item.isDisabled"
                      active-color="#ff4949"
                      inactive-color="#13ce66"
                      @change="setStatus(item.roleId, key)"
                    >
                    </el-switch>
                    {{ item[data] ? "禁用" : "正常" }}
                  </div>
                  <div class="cell" v-if="data === 'index'">
                    {{ key + 1 }}
                  </div>
                  <div class="cell" v-if="data === 'opetationRole'">
                    <button class="roleBtn" @click="getRole(item)">
                      分配权限
                    </button>
                  </div>
                  <div class="cell" v-if="data === 'opetation'">
                    <button class="modify" @click="seeData(item)">编辑</button>
                    <button
                      class="delete"
                      @click="
                        deletedata(
                          { roleId: item.roleId },
                          'home/role/deleteRole'
                        )
                      "
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <vDialog
            ref="addDialog"
            :dialogFormShow="dialogFormShow"
            @updata="search"
            @closeaddDialog="closeaddDialog"
            :IntList="IntList"
            :currentList="currentList"
            :openType="openType"
            name="roleList"
          >
          </vDialog>
          <permissionDialog
            :dialogVisibleRole="dialogVisibleRole"
            @closeDialog="closeDialog"
            :roleId="roleId"
          />
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
      </div>
    </div>
  </div>
</template>
<script>
import homeMix from '../../assets/mixins/home-mixins'
import permissionDialog from '../../components/role/role-permission.vue'

export default {
  mixins: [homeMix],
  components: {
    permissionDialog
  },
  data () {
    return {
      tableText: '',
      dialogFormShow: false,
      IntList: ['roleId'],
      list: [],
      roleId: -1,
      currentRola: '',
      rolaData: '',
      dialogVisibleRole: false,
      loading2: true
    }
  },
  created () {
    this.tableText = this.$tables.roleList
  },
  mounted () {
    this.$emit('changeRouterIndex', this.$route.query.routerIndex)
    this.getSearchUrl()
    // 调用方法获取后端数据
    this.search()
  },
  methods: {
    /**
     * @desc 请求列表数据
     */
    getSearchUrl () {
      this.searchUrl = 'home/role/listRole'
    },
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
     * @desc 打开分配权限表
     */
    getRole (item) {
      this.currentRola = []
      if (item.roleId[0] !== 0) this.currentRola = item.roleId || []
      this.roleId = item.roleId
      this.dialogVisibleRole = true
    },
    /**
     * @desc 更改状态
     */
    async setStatus (id, key) {
      const url = 'home/role/updateRoleStatus'
      const data = {
        roleId: id,
        isDisabled: this.list[key].isDisabled ? 1 : 0
      }
      await this.$api(url, data)
        .then(() => {
          this.$message.success('更改状态成功')
        })
        .catch(() => {
          setTimeout(() => {
            this.list[key].isDisabled = !this.list[key].isDisabled
          }, 400)
        })
    },
    /**
     * @desc 关闭权限弹窗
     */
    closeDialog (val) {
      this.dialogVisibleRole = false
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../assets/less/right-table.less");

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
