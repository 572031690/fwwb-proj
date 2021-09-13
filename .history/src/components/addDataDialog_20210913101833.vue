<template>
  <div>
    <!-- 添加模板 -->
    <el-dialog
      :title="openType==='add'?'添加数据':openType==='edit'?'修改数据':'提交送审'"
      :visible.sync="dialogFormShow"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :show-close="false"
      top="12vh"
      center
      width="35%"
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
import { rulesData } from '../assets/data/rules'
import { addEditList } from '../assets/data/addEditList'
export default {
  props: {
    dialogFormShow: Boolean,
    IntList: Array,
    openType: String,
    name: String,
    currentList: Object,
    topChange: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  watch: {
    dialogFormShow: {
      handler: function (val) {
        this.getType()
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
      topData: {}
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.dialogData = this.addEditList[this.name]
      this.topData = this.dialogData.dataTableList[0]
    },
    getType () {
      this[this.openType]()
    },
    add () {
      if (this.dialogData.dataTableList[0].dataName === this.topChange && this.topChange) this.dialogData.dataTableList.splice(0, 1)
      for (const i in this.dialogData.formList) {
        this.dialogData.formList[i] = ''
      }
    },
    edit () {
      if (this.dialogData.dataTableList[0].dataName !== this.topChange && this.topChange) this.dialogData.dataTableList.splice(0, 0, this.topData)
      for (const i in this.dialogData.formList) {
        if (this.IntList.includes(i)) this.dialogData.formList[i] = parseInt(this.currentList[i])
        else this.dialogData.formList[i] = this.currentList[i]
      }
    },
    approval () {
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
      console.log(data, 'datadatadata')
      // $ajax请求
      const url = this.dialogData.url[this.openType]
      await this.$ajax.post(url, data, {}).then(res => {
        const { data } = res
        if (data.code === '101') {
          this.$message({
            type: 'success',
            message: this.openType === 'add' ? '添加成功!' : this.openType === 'edit' ? '修改成功' : '送审成功'
          })
          this.$emit('updata')
          this.close()
          // this.dialogFormShow = false
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
      this.$emit('closeaddDialog')
    }
  }
}
</script>

<style></style>
