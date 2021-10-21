<template>
  <div class="right-body" id="body">
    <div class="overbox">
      <div class="bodyheart">
        <div class="body-top">
          <div class="bodytop-heart">
            <el-row>
              <el-col :span="8"
                ><img src="../../assets/img/查询数据列表.png" />
                <span>仓库代办列表</span></el-col
              >
              <el-col :span="8">
                <div class="searchfa">
                  <!-- 搜索框 -->
                  <div class="search">
                    <form v-on:submit.prevent="search">
                      <input
                        type="text"
                        placeholder="请输入材料名称"
                        @change="search"
                        v-model="params.dname"
                      />
                      <button type="button"></button>
                    </form>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" >
                <div class="approvalBtn" >
                  <div :class="{'currentBtn' : currentApprovalType}" @click="getApprovalType(true)">需求出库</div>
                  <div :class="{'currentBtn' : !currentApprovalType}" @click="getApprovalType(false)">订单入库</div>
                </div></el-col
              >
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
                <div v-for="(item,index) in tableText.tableTitle"
                  :key="index"
                  colspan="1"
                  rowspan="1"
                  :class="
                  item === '描述'?'htop-th3'
                  :item === '需求单名'?'htop-th7'
                  :'htop-th1'">
                  <div class="cell">{{item}}</div>
                </div>
            </div>
            <vNone v-if="!list.length" />
            <div class="tbody" >
              <div class="bodyLine" v-for="(item, key) in list" :key="key">

                <div v-for="(data,index) in tableText.tableBody"
                :key="index"
                :class="{'body-td4': data==='comment'}" >

                  <div class="cell" v-if="data!=='opetation'">
                    {{ item[data] }}
                  </div>

                  <div class="cell" v-if="data==='opetation'">
                    <button class="roleBtn" @click="seeData(item)">处理代办</button>
                  </div>
                </div>

              </div >
            </div>
          </div>

          <vDialog ref="addDialog"
            :dialogFormShow="dialogFormShow"
            @updata="search"
            :editDisabled="editDisabled"
            @closeaddDialog="closeaddDialog"
            :IntList="IntList"
            :currentList="currentList"
            :openType="openType"
            name="itemList"
        >
        </vDialog>

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
      </div>
    </div>
  </div>
</template>
<script>
import homeMix from '../../assets/mixins/home-mixins'

export default {
  mixins: [homeMix],
  data () {
    return {
      currentApprovalType: true,
      editDisabled: ['itemid'],
      tableText: '',
      dialogFormShow: false,
      IntList: ['stock'],
      list: [
        {
          itemid: 'JPSC001',
          itemtype: '钢材',
          comment: '用于钢材的使用',
          stock: 30165,
          unit: 'kg'
        }
      ],
      loading2: true
    }
  },
  created () {
    if (this.$store.state.departmentId.includes('10000')) {
      this.tableText = this.$tables.itemListedit
    } else {
      this.tableText = this.$tables.itemListsee
    }
  },
  mounted () {
    this.$emit('changeRouterIndex', this.$route.query.routerIndex)
    this.getSearchUrl()
    // 调用方法获取后端数据
    this.search()
  },
  methods: {
    /**
     * @desc 请求列表数据
     */
    getSearchUrl () {
      this.searchUrl = 'home/item/getItem'
    },
    getApprovalType (index) {
      this.currentApprovalType = index
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../assets/less/right-table.less");

.searchfa {
  margin-left: 35px;
}
.search {
  margin-left: 5px;
  float: left;
  height: 30px;
  input {
    float: left;
    border: none;
    outline: none;
    width: 95.5%;
    height: 30px;
    padding-left: 13px;
    border: 2px solid #dadce0;
    border-right: 0;
    border-radius: 5px;
    color: black;
    font-size: 16px;
  }
  button {
    float: left;
    border: none;
    outline: none;
    height: 30px;
    width: 45px;
    cursor: pointer;
    position: absolute;
    top: 1.6px;
    right: 0;
    background: #dadce0;
    border-radius: 0 5px 5px 0;
    &:hover {
      background-color: #c8c8c8;
      box-shadow: 0 0 3px#c8c8c8;
    }
    &:active {
      padding-left: 1px;
      padding-top: 1px;
      background: #dadce0;
    }
    &:before {
      content: "\f002";
      font-family: FontAwesome;
      font-size: 16px;
      color: #f9f0da;
    }
  }
}
</style>
