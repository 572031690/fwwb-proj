<template>
  <div id="constrolDialog">
    <el-dialog
      title="仓库管理"
      :visible.sync="dialogVisibleRole"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      top="30px"
      width="1000px"
    >
      <div class="topText">
        <slot></slot>
      </div>
      <div class="tableRole">
        <div class="tableRoleTopAdd">
          <div :class="showAdd ? 'textRole' : 'textRoleTitle'">
            <span v-show="!showAdd" style="font-weight: 700">
              仓库操作列表 出库{{ geTotalNum }}/总共{{
                openType ? currentList.neednum : currentList.num
              }}
            </span>
            <el-select
              style="width: 220px"
              v-show="showAdd"
              v-model="addData.itemid"
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionsId"
                :key="item.itemid"
                :label="item.itemtype"
                :value="item.itemtype"
              >
              </el-option>
            </el-select>
          </div>
          <div class="textRole">
            <el-select
              style="width: 220px"
              v-show="showAdd"
              v-model="addData.name"
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionsType"
                :key="item.itemid"
                :label="item.itemtype"
                :value="item.itemtype"
              >
              </el-option>
            </el-select>
          </div>
          <div class="textRole">
            <span v-show="showAdd">{{
              openType ? currentList.needid : currentList.buyid
            }}</span>
          </div>
          <div class="textRole">
            <el-input-number
              v-show="showAdd"
              v-model="addData.num"
              :step="50"
              :min="50"
              :max="999999999"
              label="描述文字"
            ></el-input-number>
          </div>
          <div class="textRole">
            <el-select
              style="width: 220px"
              v-show="showAdd"
              v-model="addData.unit"
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionsUnit"
                :key="item.itemid"
                :label="item.itemtype"
                :value="item.itemtype"
              >
              </el-option>
            </el-select>
          </div>

          <div class="textRole"></div>
          <div
            class="textRole"
            v-if="
              !showAdd &&
              (list.outRept === 1 || list.inRept === 1)
            "
          >
            <button class="bodyadd" @click="getAdd()">
              <i class="el-icon-plus"></i>添加
            </button>
          </div>
          <div class="textRole" v-if="showAdd">
            <button class="modify" @click="saveAddData()">保存</button>
            <button class="delete" @click="cancelAddData()">取消</button>
          </div>
        </div>
        <div class="tableRoleTop">
          <div v-for="(item, key) in tableList.tableTitle" :key="key">
            <div class="textRole">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="tableRoleBody" v-for="(data, index) in list" :key="index">
          <div
            v-for="(curr, ind) in tableList.tableBody"
            :key="ind"
            v-show="!data.editType"
          >
            <div
              class="textRole"
              v-if="curr !== 'opetation2' && curr !== 'opetation1'"
            >
              {{ data[curr] }}
            </div>
            <div class="textRole" v-if="curr === 'opetation1'">
              <button
                class="roleBtn"
                @click="upStock(data)"
                v-if="!data.status"
              >
                {{ openType ? "出 库" : "入 库" }}
              </button>
              <span v-if="data.status">
                {{ openType ? "已出库" : "已入库" }}
              </span>
            </div>
            <div class="textRole" v-if="curr === 'opetation2'">
              <button
                class="modify"
                @click="editData(data, index)"
                v-if="!data.status"
              >
                编辑
              </button>
              <el-popover
                placement="top"
                width="160"
                v-model="data.visible"
                v-if="!data.status"
              >
                <p>这是一段内容确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="data.visible = false"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="deletedata(data.id, index)"
                    >确定</el-button
                  >
                </div>
                <button class="delete" slot="reference">删除</button>
              </el-popover>
            </div>
          </div>
          <div class="editBox" v-if="data.editType">
            <div class="textRole">
              <el-select
                style="width: 220px"
                v-model="editForm[index].itemid"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in optionsId"
                  :key="item.itemid"
                  :label="item.itemtype"
                  :value="item.itemtype"
                >
                </el-option>
              </el-select>
            </div>
            <div class="textRole">
              <el-select
                style="width: 220px"
                v-model="editForm[index].name"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in optionsType"
                  :key="item.itemid"
                  :label="item.itemtype"
                  :value="item.itemtype"
                >
                </el-option>
              </el-select>
            </div>
            <div class="textRole">
              {{ openType ? editForm[index].needid : editForm[index].buyid }}
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
            <div class="textRole">
              <el-select
                style="width: 220px"
                v-model="editForm[index].unit"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in optionsUnit"
                  :key="item.itemid"
                  :label="item.itemtype"
                  :value="item.itemtype"
                >
                </el-option>
              </el-select>
            </div>
            <div class="textRole">
              {{ editForm[index].time }}
            </div>
            <div class="textRole">
              <button class="modify" @click="saveeditData(data, index)">
                保存
              </button>
              <button class="delete" @click="cancelEditData(index)">
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
        <el-button @click="closeDialog()">关 闭</el-button>
        <!-- <el-button type="primary" @click="upCurrentPermissionList">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script >
export default {
  props: {
    /**
     * @desc 控制弹窗打开关闭
     */
    dialogVisibleRole: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    /**
     * @desc 弹窗打开类型是采购还是需求（false/true）
     */
    openType: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    /**
     * @desc 角色id
     */
    roleId: {
      type: Number,
      default: () => {
        return 0
      }
    },
    /**
     * @desc 当前采购或者需求数据
     */
    currentList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * @desc 请求地址
     */
    url: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    geTotalNum () {
      let total = 0
      this.list.forEach((item) => {
        if (item.status) {
          total += this.openType ? item.neednum : item.num
        }
      })
      return total
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
      visible: '',
      showAdd: false,
      addData: {
        itemid: '',
        name: '',
        needid: '',
        num: '',
        time: '',
        unit: '',
        buyid: ''
      },
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
  created () {},
  mounted () {
    this.getUnit()
    this.getType()
    this.getId()
  },
  methods: {
    /**
     * @desc 关闭弹窗
     */
    closeDialog () {
      this.cancelAddData()
      this.$emit('closeDialog')
    },
    /**
     * @desc 获取代办数据
     */
    async search () {
      this.tableList = this.openType
        ? this.$tables.controlOutStockList
        : this.$tables.controlInStockList
      const url = this.url.search
      this.params.selectName = this.openType
        ? this.currentList.needid
        : this.currentList.buyid
      const params = this.params
      await this.$api(url, { params })
        .then((res) => {
          res.list.forEach((item) => {
            item.editType = false
            item.visible = false
          })
          this.list = res.list || [] // 获取里面的data数据
          this.params.total = res.count // 获取后台传过来的总数据条数
          this.loading2 = false
        })
        .catch(() => {
          this.loading2 = false
        })
    },
    /**
     * @desc 编辑按钮点击事件
     */
    editData (item, index) {
      this.editForm[index] = item
      this.list[index].editType = true
    },
    /**
     * @desc 保存编辑
     */
    saveeditData (data, index) {
      const url = this.url.edit
      this.$api(url, data)
        .then((res) => {
          if (res.code === '101') {
            this.$message.success('修改成功！')
            this.cancelEditData(index)
            this.search()
          }
        })
        .catch(() => {})
    },
    /**
     * @desc 取消编辑
     */
    cancelEditData (index) {
      this.list[index].editType = false
    },
    /**
     * @desc 操作入库/出库
     */
    upStock (item) {
      const data = { ...item }
      const url = this.url.Repos
      this.$api(url, data)
        .then((res) => {
          if (res.code === '101') {
            this.$message.success('仓库操作成功！')
            this.search()
          } else {
            this.$message.error(res.error)
          }
        })
        .catch(() => {})
    },
    /**
     * @desc 添加按钮事件
     */
    getAdd () {
      this.showAdd = !this.showAdd
    },
    /**
     * @desc 保存添加
     */
    saveAddData () {
      this.addData.needid = this.currentList.needid || 1
      this.addData.buyid = this.currentList.buyid || 1
      this.addData.time = new Date()
      if (this.checkAdd()) {
        this.$message.error('请填写完整！')
        return
      }
      const data = { ...this.addData }
      const url = this.url.add
      this.$api(url, data)
        .then((res) => {
          if (res.code === '101') {
            this.$message.success('添加成功！')
            this.cancelAddData()
            this.search()
          }
        })
        .catch(() => {})
    },
    /**
     * @desc 添加按钮验证
     */
    checkAdd () {
      for (const i in this.addData) {
        if (!this.addData[i] && this.addData[i] !== 0) return true
      }
    },
    /**
     * @desc 取消添加
     */
    cancelAddData () {
      for (const i in this.addData) {
        this.addData[i] = ''
      }
      this.showAdd = false
    },
    /**
     * @desc 删除事件
     */
    deletedata (id, index) {
      this.list[index].visible = false
      const params = { id: id }
      const url = this.url.delete
      this.$api(url, { params })
        .then((res) => {
          if (res.code === '101') {
            this.$message.success('删除成功！')
            this.search()
          }
        })
        .catch(() => {})
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
    /**
     * @desc 获取单位筛选框数据
     */
    getUnit () {
      this.$api('home/item/findItemName', { params: { itemid: 7 } })
        .then((res) => {
          this.optionsUnit = res.list
        })
        .catch(() => {})
    },
    /**
     * @desc 获取物料类别筛选框数据
     */
    getType () {
      this.$api('home/item/findItemName', { params: { itemid: 1 } })
        .then((res) => {
          this.optionsType = res.list
        })
        .catch(() => {})
    },
    /**
     * @desc 获取编码筛选框数据
     */
    getId () {
      this.$api('home/item/findItemName', { params: { itemid: 16 } })
        .then((res) => {
          this.optionsId = res.list
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.tableRole {
  max-height: 500px;
  min-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 15px;
  /deep/ .el-input__inner {
    border: none;
    padding: 0;
    text-align: center;
  }
  /deep/ .el-input-number__decrease {
    width: 20px;
  }
  /deep/ .el-input-number__increase {
    width: 20px;
  }
  &Top {
    display: flex;
    border-bottom: 1px solid rgb(235, 238, 245);
    &Add {
      display: flex;
      border-top: 1px solid rgb(235, 238, 245);
    }
  }
  &Body {
    display: flex;
    border-bottom: 1px solid rgb(235, 238, 245);
  }
  .bodyadd {
    height: 28px;
    width: 48px;
    margin: 2px 15px 0 0;
    margin-left: auto;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    outline: none;
    border: 1px solid #dadce0;
    font-size: 11px;
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
  .textLongRole {
    color: rgb(111, 115, 116);
    font-size: 14px;
    width: 300px;
    height: 50px;
    line-height: 50px;
  }
  .textRole {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(111, 115, 116);
    font-size: 15px;
    width: 120px;
    height: 50px;
    line-height: 50px;
  }
  .textRoleTitle {
    display: flex;
    // justify-content: center;
    align-items: center;
    color: rgb(111, 115, 116);
    font-size: 15px;
    width: 300px;
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
