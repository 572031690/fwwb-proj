<template lang="">
  <div>
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
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
    <div style="width:600px">
      <el-collapse
        v-model="activeNames"
        @change="handleChange"
        v-for="(item, key) in form"
      >
        <el-collapse-item :title="item.name" :name="item.id">
          <div>{{ item.mg }}</div>
          <div>{{ item.ma }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <hr />
    <br />

    <div style="width:800px;margin-left:200px;">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(item, key) in list"
            :key="key"
            :timestamp="item.time"
            placement="top"
          >
            <el-card>
              <h4>{{ item.top }}</h4>
              <p>{{ item.text }}</p>
              <el-button type="danger" @click="deletedata(key)">删除</el-button>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <el-button type="danger" @click="add()">添加</el-button>
      </div>
    </div>

    <hr />
    <el-button @click="gettime()">获取时间</el-button>

    <br />
    <hr />
    <br />
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    <br />
    <hr />
    <el-button type="text" @click="dialog = true"
      >打开嵌套 Form 的 Drawer</el-button
    >

    <el-drawer
      title="我嵌套了 Form !"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form1">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form1.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form1.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
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
      form1: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      timer: null,
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      ams: '加油',
      // 获取时间
      nowDate: '',
      // 折叠板
      activeNames: ['1'],
      form: [
        {
          id: '1',
          name: '一致性 Consistency',
          mg:
            '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
          ma:
            '在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
        },
        {
          id: '2',
          name: '一致性 Consistency1',
          mg:
            '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
          ma:
            '在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
        },
        {
          id: '3',
          name: '一致性 Consistency2',
          mg:
            '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
          ma:
            '在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
        }
      ],
      // 时间线
      list: [
        {
          id: '1',
          time: '2018/4/12',
          top: '更新 Github 模板',
          text: '王小虎 提交于 2018/4/3 20:46'
        },
        {
          id: '2',
          time: '2018/4/12',
          top: '更新 Github 模板',
          text: '王小虎 提交于 2018/4/3 20:46'
        },
        {
          id: '3',
          time: '2018/4/12',
          top: '更新 Github 模板',
          text: '王小虎 提交于 2018/4/3 20:46'
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
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
    handleClose (tag) {
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

    // 折叠版
    handleChange (val) {
      console.log(val)
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
</style>
