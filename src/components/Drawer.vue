<template>
  <div>
    <el-drawer
      title="审批信息"
      :destroy-on-close="true"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      :size="openType === 'write'? '90%':585"
    >
      <div class="drawercenter">
        <div class="drawerStyle" :style="{'width': openType === 'write'? '760px':'520px'}">
          <div class="drawertopstatus"  v-if="openType === 'see'">
            <el-steps
              :space="200"
              align-center
              :active="listIn.uptype===4 ? 0 : listIn.uptype"
              finish-status="success"
            >
              <el-step title="待审核"></el-step>
              <el-step title="部门通过"></el-step>
              <el-step title="通过"></el-step>
            </el-steps>
          </div>
          <div class="drawerFormBox">
            <div class="formBody">
              <el-form :model="listIn" label-width="120px" v-if="openType === 'write'">
                <el-form-item :label="item.label+'：'" v-for="(item,index) in drawerText[typeName]" :key="index">
                  <span v-if="item.model!=='comment'" >{{(item.model!=='neednum' && item.model!=='num') ?listIn[item.model]:listIn[item.model]+listIn.unit}}</span>
                  <div v-if="item.model==='comment'" class="drawerText">{{listIn[item.model]}}</div>
                </el-form-item>
              </el-form>

              <div class="drawerInputBox" v-if="openType === 'write'">
                <h3>审批意见</h3>
                <hr />
                <br />
                <div class="inputBox">
                    <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请输入意见"
                      v-model="opinion">
                    </el-input>
                </div>
              </div>
              <div  class="drawerApprovalBox" v-if="openType === 'see'">
                <h3>审批详情</h3>
                <hr />
                <br />
                <div class="block">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(item, key) in list"
                      :icon="typeList[parseInt(item.id)-1].icon"
                      :color="typeList[parseInt(item.id)-1].color"
                      size="large"
                      :key="key"
                      :timestamp="item.endTime"
                      placement="top"
                    >
                      <el-card>
                        <div class="departmentId">{{parseInt(item.id)===2?'部门经理':parseInt(item.id)===3?'总经理':''}}</div>
                          <span style="font-weight:bold;">{{ typeList[parseInt(item.id)-1].title }}</span
                          ><span v-if="item.auther"> 审批人：{{ item.auther }}</span>
                          <br />
                          <span v-show="item.upname"> 提交人：{{ item.upname }}</span>
                          <p v-show="item.text">审批意见：{{ item.text }}</p>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </div>

              <div class="demo-drawer__footer">
                <div v-if="openType === 'see'">
                  <el-button @click="cancelForm">关 闭</el-button>
                  <el-button
                    v-show="listIn.uptype===4"
                    type="primary"
                    @click="upData()"
                    :loading="loading"
                    >{{ loading ? "提交中 ..." : "再次提交" }}</el-button
                  >
                </div>
                <div v-else>
                  <el-button @click="cancelForm">关 闭</el-button>
                  <el-button @click="witeApproval('reject')" type="danger">驳 回</el-button>
                  <el-button @click="witeApproval('pass')"  type="success">通 过</el-button>
                </div>
              </div>
            </div>
            <div  class="drawerApprovalBoxRight" v-if="openType === 'write'">
              <h3>审批详情</h3>
              <hr />
              <br />
              <div class="block">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item, key) in list"
                    :icon="typeList[parseInt(item.id)-1].icon"
                    :color="typeList[parseInt(item.id)-1].color"
                    size="large"
                    :key="key"
                    :timestamp="item.endTime"
                    placement="top"
                  >
                    <el-card>
                      <div class="departmentId">{{parseInt(item.id)===2?'部门经理':parseInt(item.id)===3?'总经理':''}}</div>
                      <span style="font-weight:bold;">{{ typeList[parseInt(item.id)-1].title }}</span
                      ><span v-if="item.auther"> 审批人：{{ item.auther }}</span>
                      <br />
                      <span v-show="item.upname"> 提交人：{{ item.upname }}</span>
                      <p v-show="item.text">审批意见：{{ item.text }}</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </div>

        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { drawerText } from '../assets/data/drawerData' // 表单字段名称和label显示内容数据
export default {
  props: {
    /**
     * @desc 表单数据
     */
    listIn: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * @desc 获取drawerText对应当前表的数据
     */
    typeName: {
      type: String,
      default: () => {
        return ''
      }
    },
    /**
     * @desc 打开抽屉的类型 see write
     */
    openType: {
      type: String,
      default: () => {
        return ''
      }
    },
    /**
     * @desc 请求地址数据
     */
    urlList: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      size: '30%',
      dialog: false,
      loading: false,
      drawerText,
      opinion: '',
      typeList: [
        {
          title: '提交申请',
          icon: '',
          color: ''
        },
        {
          title: '通过',
          icon: 'el-icon-check',
          color: '#0bbd87'
        }, {
          title: '通过',
          icon: 'el-icon-check',
          color: '#0bbd87'
        },
        {
          title: '驳回',
          icon: 'el-icon-close',
          color: 'red'
        }
      ],
      // 时间线
      list: [
        {
          id: '1',
          endTime: '7/28 11:40',
          upname: '莫恩康',
          text: ''

        },
        {
          id: '2',
          endTime: '7/28 11:40',
          auther: '马家辉',
          upname: '莫恩康',
          text:
            '这次可以的加油这次可以的加油这次可以的加油这次可以的加油这次可以的加油'
        },
        {
          id: '3',
          endTime: '7/28 11:40',
          auther: '马家辉',
          upname: '莫恩康',
          text: '王小虎 提交于 2018/4/3 20:46'
        }, {
          id: '4',
          endTime: '7/28 11:40',
          auther: '马家辉',
          upname: '莫恩康',
          text: '王小虎 提交于 2018/4/3 20:46'
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
    /**
     * @desc 提交审批
     */
    upData () {
      if (this.loading) return
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.resetApproval()
        })
        .catch(() => {})
    },
    /**
     * @desc 驳回后重启审批请求
     */
    async resetApproval () {
      const url = this.urlList.ressetApproval
      const params = {
        buyid: this.listIn.buyid
      }
      this.$api(url, { params }).then(res => {
        if (res.code === '101') {
          this.$message.success('提交审批成功')
          this.loading = false
          this.dialog = !this.dialog
          this.$emit('close')
        }
      })
    },
    /**
     * @desc 关闭抽屉之前回调
     */
    handleClose () {
      this.dialog = !this.dialog
    },
    /**
     * @desc 关闭抽屉方法
     */
    cancelForm () {
      this.loading = false
      this.list = []
      this.dialog = !this.dialog
    },
    /**
     * @desc 获取审批记录信息请求
     */
    async searchApprovalList () {
      const url = this.urlList.getApprovalList
      const params = {
        needid: this.listIn.needid,
        buyid: this.listIn.buyid
      }
      await this.$api(url, { params }).then((res) => {
        this.list = res.list
      })
    },
    /**
     * @desc 打开抽屉方法
     */
    showDraw () {
      this.dialog = !this.dialog
      this.$nextTick(() => {
        this.searchApprovalList()
      })
      // console.log(object);
    },
    /**
     * @desc 审批（驳回/通过）
     */
    witeApproval (type) {
      this.$confirm(type === 'reject' ? '是否确定驳回此申请' : '是否确定通过此申请', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.approvalAct(type)
        })
    },
    /**
     * @desc 审批请求
     */
    approvalAct (type) {
      const url = type === 'pass' ? this.urlList.passRequest : this.urlList.rejectRequest
      const params = {
        text: this.opinion,
        taskId: this.listIn.taskId
      }
      this.$api(url, { params }).then(res => {
        this.loading = false
        this.dialog = !this.dialog
        this.$$message.success('审批成功')
        this.$emit('close')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" >

.drawercenter {
  border-top: 1px solid #eee;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: auto;
}
.drawerStyle {
  margin-top: 20px;
  padding: 0px 25px;
  height: 780px;
}

.drawertopstatus {
  margin-bottom: 30px;
}
.drawerFormBox {
  display: flex;
}
.drawerApprovalBox {
  margin-left:40px;
}
.departmentId {
  font-weight: 600;
  font-size: 15px;
  color: rgb(177, 7, 16);
}
.drawerApprovalBoxRight {
  margin-left:20px;
  padding: 0 40px;
  height: 720px;
  overflow: auto;
  border-left: 2px dashed #eee;
}
.drawerInputBox {
  margin: 30px 0 20px;
  .inputBox {
    padding:0  10px;
  }
}
.demo-drawer__footer {
  text-align: center;

}
.drawerText {
  border: 1px solid rgba(99, 94, 94,0.3);
  border-radius: 5px;
  font-size: 16px;
  line-height: 18px;
  padding: 5px;
  width: 270px;
  margin-top: 6px;
  min-height: 50px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-break: break-all;

}
.el-drawer__header {
  margin-bottom: 22px !important;
  span {
    text-align: center;
    font-weight: 700;
    font-size: 20px;
  }
}
</style>
