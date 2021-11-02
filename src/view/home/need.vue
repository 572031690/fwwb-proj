<template>
  <div class="right-body" id="body">
    <div class="overbox">
      <div class="bodyheart">
        <div class="body-top">
          <div class="bodytop-heart">
            <el-row>
              <el-col :span="8"
                ><img src="../../assets/img/查询数据列表.png" />
                <span>需求列表</span></el-col
              >
              <el-col :span="8">
                <div class="searchfa">
                  <!-- 搜索框 -->
                  <div style="opacity: 0">.</div>
                  <!-- <div class="search" v-if="false">
                        <el-select
                          v-model="params.selectValue"
                          @change="search"
                          placeholder="选择状态"
                          clearable
                          size="small"
                          class="selectAvro"
                        >
                          <el-option
                            style="padding:0 18px 0 10px;"
                            v-for="item in select"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                        <form v-on:submit.prevent="search">
                          <input
                            type="text"
                            placeholder="请输入需求标题"
                            @change="search"
                            v-model="params.dname"
                          />
                          <button type="button"></button>
                        </form>
                      </div> -->
                </div>
              </el-col>
              <el-col :span="8" class="topRightBox">
                <div class="approvalBtn" v-if="!showAdd">
                  <div
                    :class="{ currentBtn: currentApprovalType }"
                    @click="getApprovalType(true)"
                  >
                    个人待办
                  </div>
                  <div
                    :class="{ currentBtn: !currentApprovalType }"
                    @click="getApprovalType(false)"
                  >
                    历史待办
                  </div>
                </div>
                <div class="approvalBtn" v-if="showAdd">
                  <el-button
                    class="systemBtn"
                    type="primary"
                    plain
                    @click="getPrint()"
                    >打 印</el-button
                  >
                  <el-button
                    class="systemBtn"
                    type="primary"
                    plain
                    @click="outData()"
                    >导 出</el-button
                  >
                </div>
                <button class="bodyadd" @click="gethomeAdd()" v-if="showAdd">
                  <i class="el-icon-plus"></i>添加
                </button>
              </el-col>
            </el-row>
          </div>
        </div>
        <needSearch v-if="showAdd" @getSearchForm="getSearchForm" />
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
                  'htop-th7': item === '需求标题',
                  'htop-th2': item === '详情',
                  'htop-ope1': item === '操作',
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
                    ['body-td3']: data === 'needtitle',
                    ['body-td2']: data === 'comment',
                    ['body-ope1']: data === 'opetation1',
                  }"
                >
                  <div
                    class="cell"
                    v-if="data !== 'opetation1' && data !== 'opetation2'"
                  >
                    {{
                      data === "neednum"
                        ? item[data] + (item.unit || "")
                        : item[data]
                    }}
                  </div>
                  <div class="bodyButton" v-if="data === 'opetation1'">
                    <div class="cell" v-if="currentRouter === 'see'">
                      <button
                        class="modify"
                        @click="seeData(item)"
                        v-if="item.uptype == 0 || item.uptype == 4"
                      >
                        编辑
                      </button>
                      <button
                        class="delete"
                        @click="
                          deletedata(
                            { needid: item.needid },
                            'home/need/deleteNeed'
                          )
                        "
                        v-if="item.uptype == 0 || item.uptype == 4 || item.uptype == 5"
                      >
                        删除
                      </button>
                      <button
                        class="modify"
                        v-if="!item.uptype"
                        @click="upData(item)"
                      >
                        提交
                      </button>
                      <button
                        class="approval"
                        @click="seeApproval(key)"
                        v-if="
                          item.uptype == 1 ||
                          item.uptype == 2 ||
                          item.uptype == 3
                        "
                      >
                        查看审批
                      </button>
                      <button
                        class="approval"
                        @click="seeApproval(key)"
                        v-if="item.uptype == 4"
                      >
                        驳回结果
                      </button>
                    </div>
                    <div
                      class="cell"
                      v-if="currentRouter === 'approval' && currentApprovalType"
                    >
                      <button class="writeApproval" @click="writeApproval(key)">
                        审批
                      </button>
                    </div>
                  </div>

                  <div class="bodyButton" v-if="data === 'opetation2'">
                    <div class="cell">
                      <span
                        class="tipsspan"
                        :style="{
                          'background-color': select[item.uptype].color,
                          color: item.uptype == 0 ? 'black' : 'white',
                        }"
                      >
                        {{
                          showStatus(
                            item.uptype,
                            item.planName,
                            item.approvaltype
                          )
                        }}
                      </span>
                    </div>
                  </div>
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
        @closeaddDialog="closeaddDialog"
        :IntList="IntList"
        :topChange="topChange"
        :currentList="currentList"
        :openType="openType"
        name="needList"
      >
      </vDialog>

      <vDrawer
        :listIn="list[currentIndex]"
        :urlList="drawerUrlList"
        typeName="need"
        :openType="drawOpenType"
        @close="drawerClose"
        ref="Draw"
      ></vDrawer>
    </div>
  </div>
</template>
<script>
import homeMix from '../../assets/mixins/home-mixins'
import needSearch from '../../components/need/needSearch.vue'
import printJS from 'print-js'

export default {
  mixins: [homeMix],
  components: {
    needSearch
  },
  computed: {
    showStatus: function () {
      return function (type, plan, approvaltype) {
        if (type !== 3) return this.select[type].label
        else if (approvaltype === 1) return plan === 1 ? '待采购' : '待出库'
        else if (approvaltype === 2) {
          return plan === 1 ? '完成采购' : '完成出库'
        }
      }
    }
  },
  data () {
    return {
      statusColorList: [
        '#eee',
        'rgb(92, 92, 143)',
        'rgb(92, 92, 143)',
        'rgb(23, 165, 23)',
        'rgb(226, 63, 63)'
      ],
      tableText: this.$tables.needList,
      dialogFormShow: false,
      drawerUrlList: {
        ressetApproval: 'home/need/startNeedActAgain',
        getApprovalList: 'home/need/findHistoty',
        passRequest: 'home/need/completeprocess',
        rejectRequest: 'home/need/deleteprocess'
      },
      dialogUrl: {
        startApproval: 'home/need/approvalNeed',
        upApproval: 'home/need/completeprocess'
      },
      params: {
        limit: 10, // 每页显示5条记录
        page: 1, // 当前是第几页
        total: 0, // 总共几条记录去分页
        searchName: '', // 查询数据
        selectName: '', // 查询状态
        department: '', // 需求单位
        itemtype: '', // 物料类别
        itemid: '', // 物料编号
        needday: '' // 需求时间
      },
      currentApprovalType: true,
      drawOpenType: 'see',
      IntList: ['needid', 'neednum', 'neederid'],
      topChange: 'needid',
      currentRouter: '',
      currentIndex: 1, // 查看审批数据
      showAdd: false,
      list: [
        {
          needid: 1,
          needtitle: '马佳辉1',
          itemtype: '',
          itemid: 1373201546,
          neednum: '3',
          needday: '5',
          unit: 'kg',
          neederid: '14',
          comment: 'dsadsadas',
          uptype: 0
        },
        {
          needid: 1,
          needtitle: '马佳辉2',
          itemtype: 5454165,
          itemid: 1373201546,
          neednum: '3',
          needday: '5',
          unit: 'kg',
          neederid: '18',
          comment: 'dsadsadasdsadasdsadsadas',
          uptype: 1
        },
        {
          needid: 1,
          needtitle: '马佳辉3',
          itemtype: 5454165,
          itemid: 1373201546,
          neednum: '3',
          needday: '5',
          unit: 'kg',
          neederid: '15',
          comment: 'dsadsadas',
          uptype: 2
        },
        {
          needid: 1,
          needtitle: '马佳辉4',
          itemtype: 5454165,
          itemid: 1373201546,
          neednum: '3',
          unit: 'kg',
          needday: '5',
          neederid: '16',
          comment: 'dsadsadas',
          uptype: 3
        }
      ],
      select: [
        // 搜索框筛选数据
        {
          value: 0,
          label: '未送审',
          color: '#eee'
        },
        {
          value: 1,
          label: '审核中',
          color: 'rgb(92, 92, 143)'
        },
        {
          value: 2,
          label: '部门通过',
          color: 'rgb(92, 92, 143)'
        },
        {
          value: 3,
          label: '经理通过',
          color: 'rgb(23, 165, 23)'
        },
        {
          value: 4,
          label: '驳回',
          color: 'rgb(226, 63, 63)'
        },
        {
          value: 5,
          label: '逾期',
          color: 'rgb(98, 98, 207)'
        }
      ],
      loading2: true
    }
  },
  created () {
    this.currentRouter = sessionStorage.getItem('currentRouter')
  },
  mounted () {
    this.getTyp()
    this.getCurrentType()
  },
  methods: {
    /**
     * @desc ajax请求后台数据 获得list数据 并用于分页
     */
    async search () {
      const data = { ...this.params }
      await this.$api(this.searchUrl, data)
        .then((res) => {
          this.list = res.list || [] // 获取里面的data数据
          this.params.total = res.count // 获取后台传过来的总数据条数
          // this.params.page = res.page // 将后端的当前页反传回来
          this.loading2 = false
        })
        .catch(() => {
          this.loading2 = false
        })
    },
    /**
     * @desc 打印调取数据库全部数据
     */
    async getPrint () {
      const data = {
        limit: 0, // 每页显示5条记录
        page: 0, // 当前是第几页
        searchName: '', // 查询数据
        selectName: '' // 查询状态
      }
      await this.$api(this.searchUrl, data)
        .then((res) => {
          const currentPrint = []
          for (let i = 0; i < this.list.length; i++) {
            currentPrint.push({
              needid: res.list[i].needid,
              needtitle: res.list[i].needtitle,
              itemtype: res.list[i].itemtype,
              itemid: res.list[i].itemid,
              neednum: res.list[i].neednum + res.list[i].unit,
              needday: res.list[i].needday,
              neederid: res.list[i].neederid,
              department: res.list[i].department,
              comment: res.list[i].comment,
              uptype: this.showStatus(
                res.list[i].uptype,
                res.list[i].planName,
                res.list[i].approvaltype
              )
            })
          }
          this.setPrintJS(currentPrint)
        })
        .catch(() => {
          this.loading2 = false
        })
    },
    /**
     * @desc 导出请求
     */
    outData () {
      window.location.href =
        'http://localhost:8081/controller_war/webneed/needResult'
    },
    /**
     * @desc 打印方法
     */
    setPrintJS (currentPrint) {
      const titleList = [
        '编号',
        '需求标题',
        '物料名称',
        '物料编号',
        '数量',
        '需求日期',
        '需求专员编号',
        '部门',
        '描述',
        '审批状态'
      ]
      let keys = 0
      const propertiesList = []
      for (const i in currentPrint[0]) {
        propertiesList.push({
          field: i,
          displayName: titleList[keys],
          columnSize: 1
        })
        keys++
      }
      printJS({
        printable: currentPrint,
        properties: propertiesList,
        type: 'json',
        header: '需求申报列表',
        // 样式设置
        gridStyle: 'border: 2px solid #3c3d3d;padding: 3px 1px;',
        gridHeaderStyle:
          'color: black; padding: 3px 5px;border: 2px solid #3c3d3d;'
      })
    },
    /**
     * @desc 顶部搜索调用更新表格
     */
    getSearchForm (searchFrom) {
      Object.assign(this.params, searchFrom)
      this.search()
    },
    /**
     * @desc 获取是管理员打开还是专员打开
     */
    getCurrentType () {
      this.currentRouter = sessionStorage.getItem('currentRouter')
      this.$emit('changeRouterIndex', this.$route.query.routerIndex)
      this.getTyp()
    },
    /**
     * @desc 获取登录账号信息
     */
    getTyp () {
      if (this.currentRouter === 'approval') {
        this.searchUrl = 'home/need/queryNeedActTask'
        this.drawOpenType = 'write'
        this.showAdd = false
      } else {
        this.searchUrl = 'home/need/getNeed'
        this.drawOpenType = 'see'
        this.showAdd = true
        this.tableText = this.$tables.needList
        this.currentApprovalType = true
      }
      this.search()
    },
    /**
     * @desc 切换代办任务（审批）
     */
    getApprovalType (type) {
      this.loading2 = true
      this.currentApprovalType = type
      this.searchUrl = type
        ? 'home/need/queryNeedActTask'
        : 'home/need/findFinishedNeed'
      this.tableText = type
        ? this.$tables.needList
        : this.$tables.needListHistry
      this.search()
    },
    /**
     * @desc 抽屉关闭事件
     */
    drawerClose (val) {
      this.search()
    },
    /**
     * @desc 打开查看抽屉
     */
    seeApproval (e) {
      this.currentIndex = e
      this.$refs.Draw.showDraw()
    },
    /**
     * @desc 打开书写抽屉
     */
    writeApproval (e) {
      this.currentIndex = e
      this.$refs.Draw.showDraw()
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../assets/less/right-table.less");

.approvalBtn {
  /deep/ .el-button {
    padding: 8px 20px !important;
  }
}
.tipsspan {
  margin: 0 auto;
  display: block;
  border-radius: 3px;
  width: 75px;
  height: 27px;
  line-height: 27px;
}
</style>
<style lang="less">
.selectAvro {
  div {
    .el-input__inner {
      text-align: center;
      padding: 0 24px 0 5px;
      border-radius: 4px 0 0 4px;
      &:focus {
        border-color: #dadce0;
      }
    }
  }
}
.search {
  .el-select {
    .el-input {
      &.is-focus {
        .el-input__inner {
          border-color: #dadce0;
        }
      }
    }
  }
}
</style>
