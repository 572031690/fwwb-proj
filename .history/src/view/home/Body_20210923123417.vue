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
                            placeholder="请输入需求名称"
                            @change="search"
                            v-model="params.dname"
                          />
                          <button type="button"></button>
                        </form>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8" v-if="$store.state.departmentId==='10010' || $store.state.departmentId==='10020'">
                    <button class="bodyadd" @click="gethomeAdd()">
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
            <div class="table-top">
              <thead>
                <!-- 表头 -->
                <tr >
                  <th v-for="(item,index) in tableText.tableTitle"
                  :key="index"
                  colspan="1"
                  rowspan="1"
                  :class="{
                    'htop-th7':item === '需求单名',
                    'htop-th2':item === '详情',
                    'htop-ope1':item === '操作'
                  }"
                  >
                    <div class="cell">{{item}}</div>
                  </th>
                </tr>
              </thead>
            </div>
            <!-- 数据列表 -->
            <!-- <el-table v-loading="loading2" element-loading-text="拼命加载中"> -->
            <tbody>
              <tr
                v-for="(item, key) in list"
                :class="{ uppdate: item.uptype == 1 || item.uptype == 3 }"
                :key="key"
              >

                <td v-for="(data,index) in tableText.tableBody"
                :key="index"
                :class="{
                  ['body-td3']:data==='needtitle',
                  ['body-td2']:data==='comment',
                  ['body-ope1']:data==='opetation1'
                }"
                >
                  <div class="cell" v-if="data!=='opetation1' && data!=='opetation2'">
                    {{ data==='neednum'? item[data] + item.itemunit  || '' :item[data]}}
                  </div>
                  <div class="bodyButton" v-if="data==='opetation1'">
                    <div class="cell" v-if="$store.state.departmentId==='10011' ">
                      <button class="modify" @click="seeData(item)"  v-if="item.uptype == 0 || item.uptype == 2">
                        编辑
                      </button>
                      <button class="delete" @click="deletedata({needid: item.needid},'home/need/deleteNeed')"  v-if="item.uptype == 0 || item.uptype == 2">
                        删除
                      </button>
                      <button class="modify" v-if="!item.uptype" @click="upData(item)">提交</button>
                      <button class="approval" @click="seeApproval(key)" v-if="item.uptype == 1 || item.uptype == 3">
                        查看审批
                      </button>
                      <button class="approval" @click="seeApproval(key)" v-if="item.uptype == 2">
                        驳回结果
                      </button>
                    </div>
                    <div class="cell"  v-if="$store.state.departmentId==='10010' || $store.state.departmentId==='10001'">
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
                          :item.uptype == 1? '待审批'
                          :item.uptype == 2? '审批驳回'
                          :item.uptype == 3? '审批通过':''
                        }}
                      </span>
                    </div>
                  </div>
                </td>

              </tr>
            </tbody>

            <!-- </el-table> -->
          </div>
        </div>

        <div class="table-bottom">
          <!-- 底部页码功能 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="params.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="params.total"
          >
          </el-pagination>
        </div>

        <addDialog ref="addDialog"
          :dialogFormShow="dialogFormShow"
          @updata="search"
          @closeaddDialog="closeaddDialog"
          :IntList="IntList"
          :topChange="topChange"
          :currentList="currentList"
          :openType="openType"
          name="needList"
        >
        </addDialog>

        <Drawer
          :listIn="list[currentIndex]"
          typeName="need"
          :openType="drawOpenType"
          @close="drawerClose"
          ref="Draw"
        ></Drawer>
      </div>
  </div>
</template>
<script>
import Drawer from '../../components/Drawer.vue'
import addDialog from '../../components/addDataDialog.vue'
import homeMix from '../../assets/mixins/home-mixins'

export default {
  mixins: [homeMix],
  components: {
    Drawer,
    addDialog
  },
  // inject: ['departId'],
  data () {
    return {
      statusColorList: ['#eee', 'rgb(92, 92, 143)', 'rgb(226, 63, 63)', 'rgb(23, 165, 23)'],
      tableText: this.$tables.needList,
      dialogFormShow: false,
      drawOpenType: 'see',
      IntList: ['needid', 'neednum', 'neederid'],
      topChange: 'needid',
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
          label: '通过'
        }
      ],
      currentIndex: 1, // 查看审批数据
      list: [
        {
          needid: 1,
          needtitle: '马佳辉1',
          itemtype: 5454165,
          itemid: 1373201546,
          neednum: '3',
          needday: '5',
          itemunit: 'kg',
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
          itemunit: 'kg',
          neederid: '的撒大',
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
          neederid: '的撒大',
          comment: 'dsadsadas',
          uptype: 2
        },
        {
          needid: 1,
          needtitle: '马佳辉4',
          itemtype: 5454165,
          itemid: 1373201546,
          neednum: '3',
          needday: '5',
          neederid: '的撒大',
          comment: 'dsadsadas',
          uptype: 3
        }
      ],
      loading2: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading2 = false
    }, 400)
    this.getTyp()
    this.getSearchUrl()
    // 调用方法获取后端数据
    this.search()
  },
  methods: {
    // 获取登录账号信息
    getTyp () {
      if (this.$store.state.departmentId === '10000' || this.$store.state.departmentId === '10001') this.drawOpenType = 'write'
      else this.drawOpenType = 'see'
    },
    getSearchUrl () {
      this.searchUrl = 'home/need/getNeed'
    },
    // 抽屉关闭事件
    drawerClose (val) {
      console.log(val, '=------------')
    },
    // 打卡抽屉
    seeApproval (e) {
      this.currentIndex = e
      this.$refs.Draw.showDraw()
    },
    // 打开书写抽屉
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
