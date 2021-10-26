<template>
  <div id="constrolDialog">
    <el-dialog
      title="仓库管理"
      :visible.sync="dialogVisibleRole"
      width="1000px">
      <div class="tableRole" v-if="list.length">
        <div class="tableRoleTop">
          <div  v-for="(item,key) in tableList.tableTitle" :key="key">
            <div class="textRole">
              {{item}}
            </div>
          </div>
        </div>
          <div class="tableRoleBody" v-for="(data,index) in list" :key="index">
            <div v-for="(curr,ind) in tableList.tableBody" :key="ind" v-show="!data.editType">
              <div class="textRole" v-if="curr !== 'opetation2' && curr !== 'opetation1'">
                {{data[curr]}}
              </div>
              <div class="textRole" v-if="curr==='opetation1'">
                  <button class="roleBtn" @click="upStock(item)">入库</button>
              </div>
              <div class="textRole" v-if="curr==='opetation2'">
                <button class="modify" @click="editData(data,index)"  >
                  编辑
                </button>
                <button class="delete" @click="deletedata({id: item.id},'home/buy/deleteBuy')"  >
                  删除
                </button>
              </div>
            </div>
            <div class="editBox" v-if="data.editType">
              <div class="textRole" >
                <el-select style="width: 220px;" v-model="editForm[index].itemid" placeholder="请选择" @change="setSearchForm" >
                  <el-option
                    v-for="item in optionsId"
                    :key="item.itemid"
                    :label="item.itemtype"
                    :value="item.itemtype">
                  </el-option>
                </el-select>
              </div>
              <div class="textRole" >
                <el-select style="width: 220px;" v-model="editForm[index].name" placeholder="请选择" @change="setSearchForm" >
                  <el-option
                    v-for="item in optionsType"
                    :key="item.itemid"
                    :label="item.itemtype"
                    :value="item.itemtype">
                  </el-option>
                </el-select>
              </div>
              <div class="textRole">
                {{editForm[index].needid}}
              </div>
              <div class="textRole">
                <el-input-number
                  v-model="editForm[index].num"
                  :step="50"
                  :min="50"
                  :max="999999999"
                  label="描述文字"
                ></el-input-number>
              </div>
              <div class="textRole" >
                <el-select style="width: 220px;" v-model="editForm[index].unit" placeholder="请选择" @change="setSearchForm" >
                  <el-option
                    v-for="item in optionsUnit"
                    :key="item.itemid"
                    :label="item.itemtype"
                    :value="item.itemtype">
                  </el-option>
                </el-select>
              </div>
               <div class="textRole" >

              </div>
              <div class="textRole">
                <button class="modify" @click="editData(data,indEdit)"  >
                  保存
                </button>
                <button class="delete" @click="cancelEditData(index)"  >
                  取消
                </button>
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
            :page-sizes="[5, 10, 15]"
            :page-size="params.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="params.total"
          >
          </el-pagination>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="upCurrentPermissionList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script >
export default {
  props: {
    dialogVisibleRole: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    roleId: {
      type: Number,
      default: () => {
        return 0
      }
    },
    currentList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    url: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    dialogVisibleRole: {
      handler: function (val) {
        if (val) this.search()
      }
    }
  },
  data () {
    return {
      params: {
        limit: 10, // 每页显示5条记录
        page: 1, // 当前是第几页
        total: 0, // 总共几条记录去分页
        searchName: '', // 查询数据
        selectName: '' // 查询状态
      },
      editForm: {},
      tableList: {},
      loading2: true,
      list: [],
      optionsUnit: [],
      optionsType: [],
      optionsId: []
    }
  },
  created () {
    this.tableList = this.$tables.controlStockList
  },
  mounted () {
    this.getUnit()
    this.getType()
    this.getId()
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    checkRoleList () {
      this.closeDialog(true)
    },
    async search () {
      const url = this.url.search
      const params = this.params
      await this.$api(url, { params }).then((res) => {
        res.list.forEach(item => {
          item.editType = false
        })
        this.list = res.list || [] // 获取里面的data数据
        this.params.total = res.count // 获取后台传过来的总数据条数
        this.loading2 = false
      }).catch(() => {
        this.loading2 = false
      })
    },
    async upCurrentPermissionList () {
      const url = 'home/role/addRolePerm'
      const data = {
        roleId: this.roleId,
        permId: this.currentPermission
      }
      await this.$api(url, data).then((res) => {
        if (res.code === '101') {
          this.$message.success('修改成功！')
          this.closeDialog()
        }
      })
    },
    editData (item, index) {
      this.editForm[index] = item
      this.list[index].editType = true
    },
    cancelEditData (index) {
      this.list[index].editType = false
    },
    setSearchForm () {

    },
    deletedata () {

    },
    /**
     * @desc 获取角色列表
     */
    async getPermissionList () {
      const url = 'home/permission/listPerm'
      const params = {
        page: 0, // 传递当前是第几页参数
        limit: 0, // 传递每页显示多少条记录参数
        searchName: '', // 传递搜索参数
        selectName: ''
      }
      await this.$api(url, { params }).then((res) => {
        this.permissionData = res.list
      })
    },
    /**
     * @desc 页码
     */
    handleSizeChange (val) {
      this.params.limit = val // 设置每页多少条记录
      this.search()
    },
    handleCurrentChange (val) {
      this.params.page = val
      this.search()
    },
    getUnit () {
      this.$api('home/item/findItemName', { params: { itemid: 7 } }).then(res => {
        this.optionsUnit = res.list
      }).catch(() => {

      })
    },
    getType () {
      this.$api('home/item/findItemName', { params: { itemid: 1 } }).then(res => {
        this.optionsType = res.list
      }).catch(() => {

      })
    },
    getId () {
      this.$api('home/item/findItemName', { params: { itemid: 16 } }).then(res => {
        this.optionsId = res.list
      }).catch(() => {

      })
    }
  }

}
</script>

<style lang="less" scoped>
.tableRole {
  height: 500px;
  overflow: auto;
  &Top {
    display: flex;
    border-bottom: 1px solid rgb(235, 238, 245);
  }
  &Body {
    display: flex;
    border-bottom: 1px solid rgb(235, 238, 245);
  }
  .textLongRole {
    color: rgb(111, 115, 116);
    font-size: 14px;
    width: 300px;
    height:50px;
    line-height: 50px;
  }
  .textRole {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(111, 115, 116);
    font-size: 14px;
    width: 120px;
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
  .modify {
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
  button {
    outline: none;
    border: 0.5px solid #8c959c;
    text-align: center;
    font-size: 8px;
    line-height: 26px;
    height: 26px;
    margin: 0 3px;
    width: 41px;
    cursor: pointer;
    border-radius: 4px;
  }

  .delete {
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
  .roleBtn {
    color: white;
    width: 60px;
    border: 0.5px solid rgb(51, 131, 223);
    background-color: rgb(78, 110, 242);
    &:hover {
      color: #8ebaed;
      border: 1px solid #8ebaed;
    }
    &:active {
      border: 1px solid #144379;
    }
  }
  .editBox {
    display: flex;
  }
}
</style>
