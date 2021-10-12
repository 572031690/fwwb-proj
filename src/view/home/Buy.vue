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
                  <div class="search">
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
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="topRightBox">
                <div class="approvalBtn" v-if="!showAdd">
                  <div :class="{'currentBtn' : currentApprovalType}" @click="getApprovalType(true)">个人代办</div>
                  <div :class="{'currentBtn' : !currentApprovalType}" @click="getApprovalType(false)">历史代办</div>
                </div>
                <button class="bodyadd" @click="gethomeAdd()" v-if="showAdd">
                  <i class="el-icon-plus"></i>添加
                </button>
              </el-col>
            </el-row>
          </div>
        </div>
        <div
          class="tablebody"
          v-loading="loading2"
          element-loading-text="拼命加载中"
        >
        <div class="mytable">
          <div class="table-top">
            <thead>
              <!-- 表头 -->
              <tr >
                <th v-for="(item,index) in tableText.tableTitle"
                :key="index"
                colspan="1"
                rowspan="1"
                :class="
                item === '订单标题'?'htop-th2'
                :item==='操作'?'htop-ope1'
                :'htop-th1'">
                  <div class="cell">{{item}}</div>
                </th>
              </tr>

            </thead>
          </div>
          <vNone v-if="!list.length" />
          <!-- 数据列表 -->
          <tbody>
            <tr v-for="(item, key) in list" :key="key">
              <td v-for="(data,index) in tableText.tableBody"
              :key="index"
              :class="data==='buytitle'? 'body-td2'
              :data==='opetation1'?'body-ope1'
              :'body-td1'" >

                <div class="cell" v-if="data!=='opetation1' && data!=='opetation2'">
                  {{ data==='neednum'? item[data] + (item.unit  || '') :item[data]}}
                </div>
                <div class="bodyButton" v-if="data==='opetation1'">
                  <div class="cell" v-if="currentRouter==='see' ">
                    <button class="modify" @click="seeData(item)"  v-if="item.uptype == 0 || item.uptype == 4">
                      编辑
                    </button>
                    <button class="delete" @click="deletedata({needid: item.needid},'home/need/deleteNeed')"  v-if="item.uptype == 0 || item.uptype == 4">
                      删除
                    </button>
                    <button class="modify" v-if="!item.uptype" @click="upData(item)">提交</button>
                    <button class="approval" @click="seeApproval(key)" v-if="item.uptype == 1 || item.uptype == 4">
                      查看审批
                    </button>
                    <button class="approval" @click="seeApproval(key)" v-if="item.uptype == 2">
                      驳回结果
                    </button>
                  </div>
                  <div class="cell"  v-if="currentRouter==='approval'">
                    <button class="writeApproval" @click="writeApproval(key)">
                      审批
                    </button>
                  </div>
                </div>
                <div class="bodyButton" v-if="data==='opetation2'">
                  <div class="cell"  style="backgournd-color:red;">
                    <span class="tipsspan" :style="{
                      'background-color': statusColorList[item.uptype],
                      'color': item.uptype == 0?'black':'white'
                      }">
                      {{
                        item.uptype == 0 ? '未送审'
                        :item.uptype == 1 ? '审批中'
                        :item.uptype == 2? '部门通过'
                        :item.uptype == 3? '审批通过'
                        :item.uptype == 4? '审批驳回':''
                      }}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
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
      <vDialog ref="addDialog"
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
      <Drawer
        :listIn="list[currentIndex]"
        :urlList="drawerUrlList"
        typeName="buy"
        :openType="drawOpenType"
        @close="drawerClose"
        ref="Draw"
      ></Drawer>
    </div>
  </div>
</template>
<script>
import homeMix from '../../assets/mixins/home-mixins'
import Drawer from '../../components/Drawer.vue'
export default {
  mixins: [homeMix],
  components: {
    Drawer
  },
  data () {
    return {
      statusColorList: ['#eee', 'rgb(92, 92, 143)', 'rgb(226, 63, 63)', 'rgb(92, 92, 143)', 'rgb(23, 165, 23)'],
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
      select: [ // 搜索框筛选数据
        {
          value: '0',
          label: '未送审'
        },
        {
          value: '1',
          label: '审核中'
        },
        {
          value: '2',
          label: '驳回'
        },
        {
          value: '3',
          label: '部门通过'
        },
        {
          value: '4',
          label: '经理通过'
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
    this.getTyp()
  },
  methods: {
    /**
     * @desc 获取是管理员打开还是专员打开
     */
    getCurrentType () {
      this.currentRouter = sessionStorage.getItem('currentRouter')
      this.getTyp()
    },
    /**
     * @desc 获取登录账号信息
     */
    getTyp () {
      if (this.currentRouter === 'approval') {
        this.searchUrl = 'home/buy/queryBuyActTask'
        // this.searchUrl = 'home/need/getNeed'
        this.drawOpenType = 'write'
        this.showAdd = false
      } else {
        this.searchUrl = 'home/buy/getBuy'
        this.drawOpenType = 'see'
        this.showAdd = true
      }
      this.search()
    },
    /**
     * @desc 切换代办任务（审批）
     */
    getApprovalType (type) {
      this.currentApprovalType = type
      this.searchUrl = type ? 'home/buy/queryBuyActTask' : 'home/buy/getBuy'
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

.tipsspan {
    display: block;
    border-radius:3px;
    width: 75px;
    height: 27px;
    line-height: 27px;
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
