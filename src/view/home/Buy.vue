<template>
  <div class="right-body" id="body">
    <div class="overbox">
      <div class="bodyheart">
        <div class="body-top">
          <div class="bodytop-heart">
            <el-row>
              <el-col :span="8"
                ><img src="../../assets/img/查询数据列表.png" />
                <span>订单列表</span></el-col
              >
              <el-col :span="8">
                <div class="searchfa">
                  <!-- 搜索框 -->
                  <!-- <div class="search">
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
                  <div style="opacity: 0">.</div>
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
                  <!-- <button class="bodyadd" v-if="showAdd">
                    打印
                  </button> -->
                  <!-- v-print="'#printTest'"  -->
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
        <buySearch v-if="showAdd" @getSearchForm="getSearchForm" />
        <div
          class="tablebody"
          v-loading="loading2"
          element-loading-text="拼命加载中"
          id="printTest"
        >
          <div class="mytable">
            <div class="table-top">
              <div
                v-for="(item, index) in tableText.tableTitle"
                :key="index"
                colspan="1"
                rowspan="1"
                :class="
                  item === '订单标题'
                    ? 'htop-th2'
                    : item === '操作'
                    ? 'htop-ope1'
                    : 'htop-th1'
                "
              >
                <div
                  class="cell"
                  v-show="
                    item !== '紧急程度' &&
                    item !== '到货日期' &&
                    item !== '需求日期' &&
                    item !== '编号'
                  "
                >
                  {{ item }}
                </div>
                <div
                  class="cellSort"
                  @click="checkTriangle(sortList[item])"
                  v-show="
                    item === '紧急程度' ||
                    item === '到货日期' ||
                    item === '需求日期' ||
                    item === '编号'
                  "
                >
                  <div class="cellSortBox">
                    <div
                      v-if="showAdd"
                      :style="{
                        'border-bottom-color':
                          params.sortType === sortList[item]
                            ? 'rgb(77, 90, 204)'
                            : 'rgb(189, 207, 228)',
                      }"
                      class="triangleTop"
                    ></div>
                    <!-- <div class="triangleBottom"> </div> -->
                  </div>
                  <div class="cell">{{ item }}</div>
                </div>
              </div>
            </div>
            <vNone v-if="!list.length" />
            <!-- 数据列表 -->
            <div class="tbody">
              <div class="bodyLine" v-for="(item, key) in list" :key="key">
                <div
                  v-for="(data, index) in tableText.tableBody"
                  :key="index"
                  :class="
                    data === 'buytitle'
                      ? 'body-td2'
                      : data === 'opetation1'
                      ? 'body-ope1'
                      : 'body-td1'
                  "
                >
                  <div
                    class="cell"
                    v-if="
                      data !== 'opetation1' &&
                      data !== 'opetation2' &&
                      data !== 'importance'
                    "
                  >
                    {{
                      data === "num"
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
                            { buyid: item.buyid },
                            'home/buy/deleteBuy'
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
                    <div class="cell" v-if="currentRouter === 'approval'">
                      <button class="writeApproval" @click="writeApproval(key)">
                        审批
                      </button>
                    </div>
                  </div>
                  <div class="cell" v-if="data === 'importance' && item[data]">
                    <span class="importantSpan">{{
                      importanceList[item[data] - 1].text
                    }}</span>
                  </div>
                  <div class="bodyButton" v-if="data === 'opetation2'">
                    <div class="cell" style="backgournd-color: red">
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
                            item.buytype
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
        name="buyList"
      >
      </vDialog>
      <vDrawer
        :listIn="list[currentIndex]"
        :urlList="drawerUrlList"
        typeName="buy"
        :openType="drawOpenType"
        @close="drawerClose"
        ref="Draw"
      ></vDrawer>
    </div>
  </div>
</template>
<script>
import homeMix from '../../assets/mixins/home-mixins'
import buySearch from '../../components/buy/buySearch.vue'
import printJS from 'print-js'

export default {
  mixins: [homeMix],
  components: {
    buySearch
  },
  computed: {
    showStatus: function () {
      return function (type, approvaltype) {
        if (type !== 3) return this.select[type].label
        else if (approvaltype === 1) return '待采购'
        else if (approvaltype === 2) return '完成采购'
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
        'rgb(226, 63, 63)',
        'rgb(98, 98, 207)'
      ],
      tableText: this.$tables.buyList,
      dialogFormShow: false,
      drawerUrlList: {
        ressetApproval: 'home/buy/startBuyActAgain',
        getApprovalList: 'home/buy/findHistotyBuy',
        passRequest: 'home/buy/completeprocess',
        rejectRequest: 'home/buy/deleteprocess'
      },
      dialogUrl: {
        startApproval: 'home/buy/startBuyAct',
        upApproval: 'home/buy/completeprocess'
      },
      currentApprovalType: true,
      drawOpenType: 'see',
      currentRouter: '',
      IntList: ['buyid', 'num', 'buyerid', 'neederid', 'auditid'],
      topChange: 'buyid',
      currentIndex: 1, // 查看审批数据
      showAdd: false,
      importanceList: [
        {
          text: '一般',
          color: 'rgb(23, 165, 23)'
        },
        {
          text: '紧急',
          color: 'rgb(92, 92, 143)'
        },
        {
          text: '加急',
          color: 'rgb(226, 63, 63)'
        }
      ],
      params: {
        limit: 10, // 每页显示5条记录
        page: 1, // 当前是第几页
        total: 0, // 总共几条记录去分页
        searchName: '', // 查询数据
        selectName: '', // 查询状态
        sortType: -1,
        ordertype: 0,
        // importancetype: 0,
        // arrivaltimetype: 0,
        // btimetype: 0,
        department: '', // 需求单位
        itemtype: '', // 物料类别
        itemid: '', // 物料编号
        btime: '' // 需求时间: '' // 需求时间
      },
      sortList: {
        编号: '',
        紧急程度: 1,
        到货日期: 2,
        需求日期: 3
      },
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
      // 表内静态数据列表
      list: [],
      loading2: true
    }
  },
  created () {
    this.currentRouter = sessionStorage.getItem('currentRouter')
  },
  mounted () {
    this.thistime = setInterval(() => {
      this.search()
    }, 8000)
    this.$emit('changeRouterIndex', this.$route.query.routerIndex)
    this.getTyp()
  },
  beforeDestroy () {
    clearInterval(this.thistime)
  },
  methods: {
    /**
     * @desc 修改排序方法
     */
    checkTriangle (tips) {
      if (this.params.sortType === tips) {
        this.params.sortType = 0
        this.params.ordertype = 0
      } else {
        this.params.sortType = tips
        if (this.params.sortType === '') this.params.ordertype = 1
      }
      // this.params[tips] = 1 - this.params[tips]
      this.search()
    },
    /**
     * @desc 提交送审表单
     */
    upData (item) {
      if (!item.importance) {
        this.$message.error('请补全采购数据！')
        return
      }
      this.$confirm('是否确定提交审批申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.startApproval(item)
        })
        .catch(err => {
          if (err === 'cancel') {
            this.$message('取消提交')
          } else {
            this.$message({
              type: 'error',
              message: err
            })
          }
        })
    },
    /**
     * @desc 导出请求
     */
    outData () {
      window.location.href =
        'http://localhost:8081/controller_war/webbuy/buyResult'
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
              buyid: res.list[i].buyid,
              buytitle: res.list[i].buytitle,
              btime: res.list[i].btime,
              arrivaltime: res.list[i].arrivaltime,
              itemtype: res.list[i].itemtype,
              itemid: res.list[i].itemid,
              num: res.list[i].num,
              importance: this.importanceList[res.list[i].importance - 1].text,
              uptype: this.showStatus(
                res.list[i].uptype,
                res.list[i].buytype
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
     * @desc 打印方法
     */
    setPrintJS (currentPrint) {
      const titleList = [
        '编号',
        '采购标题',
        '需求日期',
        '到货日期',
        '物料名称',
        '物料编号',
        '数量',
        '紧急程度',
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
        header: '采购申报列表',
        // 样式设置
        scanStyles: false,
        gridStyle: 'border: 2px solid #3c3d3d; padding: 3px 1px;',
        gridHeaderStyle:
          'color: black; padding: 3px 5px; border: 2px solid #3c3d3d;'
      })
    },
    /**
     * @desc ajax请求后台数据 获得list数据 并用于分页
     */
    async search () {
      const data = { ...this.params }
      await this.$api(this.searchUrl, data)
        .then((res) => {
          this.list = res.list || [] // 获取里面的data数据
          this.params.total = res.count // 获取后台传过来的总数据条数
          this.loading2 = false
        })
        .catch(() => {
          this.loading2 = false
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
        this.searchUrl = 'home/buy/queryBuyActTask'
        this.drawOpenType = 'write'
        this.showAdd = false
      } else {
        this.searchUrl = 'home/buy/getBuy'
        this.drawOpenType = 'see'
        this.tableText = this.$tables.buyList
        this.currentApprovalType = true
        this.showAdd = true
      }
      this.search()
    },
    /**
     * @desc 切换代办任务（审批）
     */
    getApprovalType (type) {
      this.currentApprovalType = type
      this.searchUrl = type
        ? 'home/buy/queryBuyActTask'
        : 'home/buy/findFinishedBuy'
      this.tableText = type ? this.$tables.buyList : this.$tables.buyListHistry
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
.cellSort {
  display: flex;
  cursor: pointer;
  &Box {
    margin-right: 2px;
    .triangleTop {
      border-style: solid;
      border-width: 7px;
      border-color: transparent transparent rgb(189, 207, 228) transparent;
      width: 0px;
      height: 0px;
      margin-bottom: 1px;
    }
    .triangleBottom {
      border-style: solid;
      border-width: 6px;
      border-color: rgb(189, 207, 228) transparent transparent transparent;
      width: 0px;
      height: 0px;
    }
  }
}
.tipsspan {
  display: block;
  border-radius: 3px;
  width: 75px;
  height: 27px;
  line-height: 27px;
  text-align: center;
}
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
