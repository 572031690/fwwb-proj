<template>
  <div>
    <!-- 添加模板 -->
    <el-dialog
      :title="openType==='add'?'添加数据':openType==='edit'?'修改数据':'提交送审'"
      :visible.sync="dialogFormShow"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :show-close="false"
      :destroy-on-close="true"
      top="12vh"
      center
      width="672px"
    >
      <el-form
        :model="dialogData.formList"
        :rules="rulesData"
        ref="form"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item
          v-for="(item, index) in dialogData.dataTableList"
          :key="index"
          :label="item.label"
          :prop="item.dataName"
        >
          <el-input
            v-model="dialogData.formList[item.dataName]"
            style="width:400px"
            v-if="item.putType === 'input'"
          ></el-input>

          <el-date-picker
            v-model="dialogData.formList[item.dataName]"
            type="date"
            style="width: 150px;"
            v-if="item.putType === 'date'"
            placeholder="选择日期">
          </el-date-picker>

            <el-select
              v-model.number="dialogData.formList[item.dataName]"
              placeholder="请选择类型"
              v-if="item.putType === 'select'"
            >
              <el-option
                :label="dat"
                :value="dat"
                v-for="(dat, key) in item.selectData"
                :key="key"
              ></el-option>
            </el-select>

            <div v-if="item.putType === 'selectItem'">
              <el-select
                v-model.number="dialogData.formList[item.dataName]"
                placeholder="请选择材料"
                @change="getUnit"
                @visible-change="getItemList"
              >
                <el-option
                  :label="dat.itemtype"
                  :value="dat.itemtype"
                  v-for="(dat, key) in itemList"
                  :key="key"
                ></el-option>
              </el-select>
               单位：{{dialogData.formList.unit}}
            </div>
          <el-input-number
            v-model="dialogData.formList[item.dataName]"
            :step="50"
            :min="50"
            :max="999999999"
            label="描述文字"
            v-if="item.putType === 'num'"
          ></el-input-number>

          <el-input
            type="age"
            v-model.number="dialogData.formList[item.dataName]"
            style="width:400px"
            v-if="item.putType === 'numput'"
          ></el-input>

          <el-input
            type="age"
            auto-complete="off"
            style="width:400px"
            v-model.number="dialogData.formList[item.dataName]"
            disabled
            v-if="item.putType === 'disput'"
          ></el-input>

          <el-input
            type="textarea"
            v-model.number="dialogData.formList[item.dataName]"
            auto-complete="off"
            style="width: 400px"
            v-if="item.putType === 'textarea'"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">{{openType==='add'?'添 加':openType==='edit'?'修 改':'提交送审'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* post请求
类型 putType： textarea disput numput num select date input
*/
import { rulesData } from '../../assets/data/rules'
import { addEditList } from '../../assets/data/addEditList'
export default {
  name: 'vDialog',
  props: {
    dialogFormShow: Boolean,
    IntList: Array,
    openType: String,
    name: String,
    currentList: Object,
    // 在编辑模式下禁用的变量
    editDisabled: {
      type: [Array],
      default: () => {
        return []
      }
    },
    // 在添加和编辑时顶部第一个参数需要改变是否能禁用
    topChange: {
      type: [String, Boolean],
      default: () => {
        return false
      }
    }
  },
  watch: {
    dialogFormShow: {
      handler: function (val) {
        if (val) this.getType()
      }
    }
  },
  data () {
    return {
      rulesData,
      addEditList,
      dialogData: {
        dialogType: '',
        formList: '',
        dataTableList: ''
      },
      topData: {},
      itemList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getUnit (data) {
      const currentItem = this.itemList.filter(function (e) {
        return e.itemtype === data
      })
      this.dialogData.formList.itemid = currentItem[0].itemid
      this.dialogData.formList.unit = currentItem[0].unit
    },
    getList () {
      this.dialogData = this.addEditList[this.name]
      this.topData = this.dialogData.dataTableList[0]
    },
    getType () {
      this[this.openType]()
    },
    add () {
      if (this.editDisabled.length) {
        this.dialogData.dataTableList.forEach(item => {
          if (this.editDisabled.includes(item.dataName)) { item.putType = 'input' }
        })
      }
      if (this.dialogData.dataTableList[0].dataName === this.topChange && this.topChange) this.dialogData.dataTableList.splice(0, 1)
      for (const i in this.dialogData.formList) {
        this.dialogData.formList[i] = ''
      }
      this.dialogData.dataTableList.forEach(item => {
        if (item.putType === 'disput') {
          this.dialogData.formList[item.dataName] = parseInt(window.sessionStorage.getItem('employeeid'))
        }
      })
    },
    edit () {
      if (this.editDisabled.length) {
        this.dialogData.dataTableList.forEach(item => {
          if (this.editDisabled.includes(item.dataName)) { item.putType = 'disput' }
        })
      }
      if (this.dialogData.dataTableList[0].dataName !== this.topChange && this.topChange) this.dialogData.dataTableList.splice(0, 0, this.topData)
      for (const i in this.dialogData.formList) {
        if (this.IntList.includes(i)) {
          this.dialogData.formList[i] = this.currentList[i] ? parseInt(this.currentList[i]) : ''
        } else {
          this.dialogData.formList[i] = this.currentList[i] ? this.currentList[i].toString() : ''
        }
      }
    },
    approval () {
      if (this.editDisabled) {
        this.dialogData.dataTableList.forEach(item => {
          if (item.dataName === this.editDisabled) { item.putType = 'input' }
        })
      }
      if (this.dialogData.dataTableList[0].dataName !== this.topChange && this.topChange) this.dialogData.dataTableList.splice(0, 0, this.topData)
      for (const i in this.dialogData.formList) {
        if (this.IntList.includes(i)) this.dialogData.formList[i] = parseInt(this.currentList[i])
        else this.dialogData.formList[i] = this.currentList[i]
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm(this.openType === 'add' ? '是否确定保存并添加此条数据?'
            : this.openType === 'edit' ? '是否确定保存并修改此条数据'
              : '是否确定保存并提交此条数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.submitData()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async submitData () {
      var data = {}
      for (const i in this.dialogData.formList) {
        data[i] = this.dialogData.formList[i]
      }
      // $ajax请求
      const url = this.dialogData.url[this.openType]
      await this.$api(url, data).then(res => {
        const { code } = res
        if (parseInt(code) === 101) {
          if (this.openType === 'approval') {
            this.startApproval()
          } else {
            this.$message({
              type: 'success',
              message: this.openType === 'add' ? '添加成功!' : this.openType === 'edit' ? '修改成功' : '送审成功'
            })
            this.$emit('updata')
            this.close()
          }
        } else {
          this.$message.error(this.openType === 'add' ? '错了哦，添加失败' : this.openType === 'edit' ? '错了哦，修改失败' : '错了哦，送审失败')
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '网络异常'
        })
      })
    },
    close () {
      for (const i in this.dialogData.formList) {
        this.dialogData.formList[i] = ''
      }
      this.$emit('closeaddDialog')
    },
    getItemList () {
      if (this.itemList.length) return
      const params = {
        page: 1, // 传递当前是第几页参数
        limit: 20, // 传递每页显示多少条记录参数
        searchName: '', // 传递搜索参数
        selectName: '' // 筛选参数
      }
      this.$api('home/item/getItem', { params }).then(res => {
        this.itemList = res.list
      }).catch(err => {
        console.log(err)
      })
    },
    async startApproval () {
      const url = this.dialogData.url.startApproval
      console.log(url, 'dsad')
      const params = {
        needid: this.dialogData.formList.needid,
        buyid: this.dialogData.formList.buyid
      }
      await this.$api(url, { params }).then(res => {
        this.upApproval(res.list[0].taskId)
      })
    },
    async upApproval (taskId) {
      const url = this.dialogData.url.upApproval
      const params = {
        taskId: taskId
      }
      await this.$api(url, { params }).then(res => {
        this.$message({
          type: 'success',
          message: '送审成功'
        })
        this.$emit('updata')
        this.close()
      })
    }

  }
}
</script>

<style></style>
