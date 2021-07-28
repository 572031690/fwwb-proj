<template lang="">
  <div>
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose1(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ New Tag</el-button
    >

    <hr />
    <br />

    <hr />
    <el-button @click="gettime()">获取时间</el-button>

    <br />
    <hr />
    <br />

    <hr />
    <el-button type="text" @click="dialog = true"
      >打开嵌套 Form 的 Drawer</el-button
    >

    <el-drawer
      title="审批信息"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="30%"
    >
      <div class="drawerStyle">
        <el-form :model="form" label-width="120px">
          <div class="topstatus">
            <el-steps
              :space="200"
              :active="form.uptype"
              finish-status="success"
            >
              <el-step title="已提交"></el-step>
              <el-step title="审核中"></el-step>
              <el-step title="通过"></el-step>
            </el-steps>
          </div>
          <el-form-item label="编号ID" prop="needid">
            <el-input
              type="age"
              v-model.number="form.needid"
              auto-complete="off"
              style="width: 300px"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="需求单名" prop="needtitle">
            <el-input
              v-model="form.needtitle"
              style="width: 300px"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="itemtype">
            <el-input
              v-model="form.needtitle"
              style="width: 200px"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="类型ID" prop="itemid">
            <el-input
              v-model="form.needtitle"
              style="width: 200px"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="neednum">
            <el-input-number
              v-model="form.neednum"
              label="描述文字"
              disabled
            ></el-input-number>
          </el-form-item>
          <el-form-item label="需求日期" prop="needday">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.needday"
                style="width: 150px"
                disabled
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
          </el-form-item>
          <el-form-item label="负责人部门编号" prop="neederid">
            <el-input
              type="age"
              v-model="form.neederid"
              auto-complete="off"
              style="width: 300px"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="详情" prop="comment">
            <el-input
              type="textarea"
              v-model.number="form.comment"
              auto-complete="off"
              style="width: 300px"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>

        <div style="width:400px;margin-left:40px;">
          <h3>审批详情</h3><hr> <br>
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(item, key) in list"
                :icon="item.icon"
                :color="item.color"
                :key="key"
                :timestamp="item.time"
                placement="top"
              >
                <el-card>
                  <h4>{{ item.top }}</h4>
                  <p>{{ item.text }}</p>
                  <!-- <el-button type="danger" @click="deletedata(key)"
                    >删除</el-button -->
                  >
                </el-card>
              </el-timeline-item>
            </el-timeline>
            <!-- <el-button type="danger" @click="add()">添加</el-button> -->
          </div>
        </div>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">关 闭</el-button>
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      loading: false,
      form: {
        needid: '25',
        needtitle: '数据表',
        itemtype: '对',
        itemid: '156',
        neednum: '25000',
        needday: '2019/5/6',
        neederid: '156',
        comment: '458',
        uptype: 2
      },
      formLabelWidth: '80px',
      timer: null,
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      ams: '加油',
      // 获取时间
      nowDate: '',
      // 时间线
      list: [
        {
          id: '1',
          time: '7/28 11:40',
          top: '更新 Github 模板',
          text: '王小虎 提交于 2018/4/3 20:46',
          icon: 'el-icon-more',
          color: '#0bbd87'
        },
        {
          id: '2',
          time: '7/28 11:40',
          top: '审批人：马家辉',
          text: '审批意见：这次可以的加油',
          icon: 'el-icon-check',
          color: '#0bbd87'
        },
        {
          id: '3',
          time: '2018/4/12',
          top: '更新 Github 模板',
          text: '王小虎 提交于 2018/4/3 20:46',
          icon: '',
          color: ''
        }
      ],
      listadd: [
        {
          id: '1',
          time: '2018/4/12',
          top: '更新 Github 模板djdj',
          text: '王小虎 提交于 2018/4/3 20:46'
        }
      ],
      // 进度步骤条
      active: 0
    }
  },
  methods: {
    handleClose (done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
        })
        .catch(_ => {})
    },
    cancelForm () {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
    handleClose1 (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    // 时间轴
    deletedata (e) {
      this.list.splice(e, 1)
    },
    add () {
      this.list = this.list.concat(this.listadd) // 合并两个数组
    },

    gettime () {
      const myDate = new Date()
      const yy = String(myDate.getFullYear())
      const mm = myDate.getMonth() + 1
      const dd = String(
        myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
      )
      const hou = String(
        myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
      )
      const min = String(
        myDate.getMinutes() < 10
          ? '0' + myDate.getMinutes()
          : myDate.getMinutes()
      )
      this.nowDate = mm + '/' + dd + ' ' + hou + ':' + min
      console.log(this.nowDate)
    },
    // 进度步骤条
    next () {
      if (this.active++ > 2) this.active = 0
    }
  },
  mounted () {
    this.dynamicTags.splice(0, 0, this.ams)
    console.log(this.ams)
  }
}
</script>
<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.drawerStyle {
  padding: 10px 25px;
  overflow: auto;
  height: 850px;
}
.topstatus {
  margin-left: 80px;
  margin-bottom: 30px;
}
.demo-drawer__footer {
  text-align: center;
}
</style>
