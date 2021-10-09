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
                        placeholder="请输入需求名称"
                        @change="search"
                        v-model="params.dname"
                      />
                      <button type="button"></button>
                    </form>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <button class="bodyadd" @click="gethomeAdd()">
                  <i class="el-icon-plus"></i>添加
                </button></el-col
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
            <thead>
              <!-- 表头 -->
              <tr >
                <th v-for="(item,index) in tableText.tableTitle"
                :key="index"
                colspan="1"
                rowspan="1"
                :class="
                item === '购买单名'?'htop-th2'
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
              :'body-td1'" >

                <div class="cell" v-if="data!=='opetation'">
                  {{ item[data] }}
                </div>

                <div class="cell" v-if="data==='opetation'">
                  <button class="modify" @click="seeData(item)">编辑</button>
                  <button class="delete" @click="deletedata({buyid: item.buyid},'home/buy/deleteBuy')">删除</button>
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
    </div>
  </div>
</template>
<script>
import homeMix from '../../assets/mixins/home-mixins'

export default {
  mixins: [homeMix],
  components: {
  },
  data () {
    return {
      statusColorList: ['#eee', 'rgb(92, 92, 143)', 'rgb(226, 63, 63)', 'rgb(92, 92, 143)', 'rgb(23, 165, 23)'],
      tableText: this.$tables.buyList,
      dialogFormShow: false,
      drawOpenType: 'see',
      currentRouter: '',
      IntList: ['buyid', 'itemid', 'num', 'buyerid', 'neederid'],
      topChange: 'buyid',
      currentIndex: 1, // 查看审批数据
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
      list: [
        {
          buyid: 1,
          buytitle: '马佳辉',
          btime: 1373201546,
          itemtype: '3',
          itemid: '5',
          num: '50',
          buyerid: '',
          neederid: 15
        }
      ],
      loading2: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading2 = false
    }, 400)
    this.getSearchUrl()
    // 调用方法获取后端数据
    this.search()
  },
  methods: {
    /**
     * @desc 设置请求数据地址
     */
    getSearchUrl () {
      this.searchUrl = 'home/buy/getBuy'
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
