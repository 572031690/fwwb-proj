<template>
  <div>
    <el-drawer
      title="审批信息"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="30%"
    >
      <div class="drawerStyle">
        <el-form :model="listIn" label-width="120px">
          <div class="topstatus">
            <el-steps
              :space="200"
              :active="form.uptype"
              finish-status="success"
            >
              <el-step title="已提交"></el-step>
              <el-step title="审核"></el-step>
              <el-step title="通过"></el-step>
            </el-steps>
          </div>
          <el-form-item :label="item.label+'：'" v-for="(item,index) in drawerText" :key="index">
            <div class="drawerText">{{listIn[item.model]}}</div>
          </el-form-item>

        </el-form>

        <div style="width:400px;margin-left:40px;">
          <h3>审批详情</h3>
          <hr />
          <br />
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(item, key) in list"
                :icon="item.icon"
                :color="item.color"
                size="large"
                :key="key"
                :timestamp="item.time"
                placement="top"
              >
                <el-card>
                  <span style="font-weight:bold;">{{ item.top }}</span
                  ><span v-show="item.auther"> 审批人：{{ item.auther }}</span>
                  <br />
                  <span v-show="item.upname"> 提交人：{{ item.upname }}</span>
                  <p v-show="item.text">审批意见：{{ item.text }}</p>
                  <!-- <el-button type="danger" @click="deletedata(key)"
                    >删除</el-button -->
                </el-card>
              </el-timeline-item>
            </el-timeline>
            <!-- <el-button type="danger" @click="add()">添加</el-button> -->
          </div>
        </div>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">关 闭</el-button>
          <el-button
            v-show="form.uptype==2"
            type="primary"
            @click="upData()"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "再次提交" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: ['listIn', 'drawerText'],
  mounted () {
    this.msg()
    // this.$parent.drawerClose(1)
  },
  computed: {},
  components: {},
  data () {
    return {
      dialog: false,
      loading: false,
      timer: null,
      // 时间线
      list: [
        {
          id: '1',
          time: '7/28 11:40',
          top: '提交申请',
          upname: '莫恩康',
          text: '',
          icon: '',
          color: ''
        },
        {
          id: '2',
          time: '7/28 11:40',
          top: '通过',
          auther: '马家辉',
          upname: '莫恩康',
          text:
            '这次可以的加油这次可以的加油这次可以的加油这次可以的加油这次可以的加油',
          icon: 'el-icon-check',
          color: '#0bbd87'
        },
        {
          id: '3',
          time: '7/28 11:40',
          top: '驳回',
          auther: '马家辉',
          upname: '莫恩康',
          text: '王小虎 提交于 2018/4/3 20:46',
          icon: 'el-icon-close',
          color: 'red'
        }
      ],
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
      // 进度步骤条
      active: 0
    }
  },
  methods: {
    upData () {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            // this.$store.commit('ChangeDraw')
            this.dialog = !this.dialog
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 300)
          }, 300)
        })
        .catch(_ => {})
    },
    handleClose (done) {
      // if (this.loading) {
      //   return
      // }
      // this.$confirm('确定要提交表单吗？')
      //   .then(_ => {
      //     this.loading = true
      //     this.timer = setTimeout(() => {
      //       // this.$store.commit('ChangeDraw')
      this.dialog = !this.dialog
      //       // 动画关闭需要一定的时间
      //       setTimeout(() => {
      //         this.loading = false
      //       }, 300)
      //     }, 300)
      //   })
      //   .catch(_ => {})
      // this.$emit('close', 1)
    },
    cancelForm () {
      this.loading = false
      // this.$store.commit('ChangeDraw')
      this.dialog = !this.dialog

      clearTimeout(this.timer)
    },
    msg () {
      console.log(this.listIn, 'draw输出')
    },
    // getFatherData () {
    //   setTimeout(() => { this.form = this.listIn }, 0) // props得到数据会有延迟所以得这样设置
    // },
    showDraw () {
      this.dialog = !this.dialog
    }
  }
}
</script>

<style lang="less" scoped>
.drawerText {
  border: 1px solid rgba(99, 94, 94,0.6);
  border-radius: 20%;
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
