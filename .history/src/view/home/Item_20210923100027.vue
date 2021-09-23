<template>
  <div class="right-body" id="body">
    <div class="overbox">
      <div class="bodyheart">
        <div class="body-top">
          <div class="bodytop-heart">
            <el-row>
              <el-col :span="8"
                ><img src="../../assets/img/查询数据列表.png" />
                <span>用户列表</span></el-col
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
          <div class="table-top">
            <thead>
              <!-- 表头 -->
              <tr>
                <th v-for="(item,index) in tableText.tableTitle"
                :key="index"
                colspan="1"
                rowspan="1"
                :class="
                item === '描述'?'htop-th3'
                :item === '需求单名'?'htop-th7'
                :'htop-th1'">
                  <div class="cell">{{item}}</div>
                </th>
              </tr>
            </thead>
          </div>
          <!-- 数据列表 -->
          <!-- <el-table v-loading="loading2" element-loading-text="拼命加载中"> -->
          <tbody>
            <tr v-for="(item, key) in list" :key="key">

              <td v-for="(data,index) in tableText.tableBody"
              :key="index"
              :class="{'body-td4': data==='comment'}" >

                <div :class="data ==='comment'?'cell1':'cell'" v-if="data!=='opetation'">
                  {{ item[data] }}
                </div>

                <div class="cell" v-if="data==='opetation'">
                  <button class="modify" @click="seeData(item)">编辑</button>
                  <button class="delete" @click="deletedata({itemid: item.itemid},'home/item/deleteItem')">删除</button>
                </div>
              </td>

            </tr>
          </tbody>

          <addDialog ref="addDialog"
            :dialogFormShow="dialogFormShow"
            @updata="search"
            @closeaddDialog="closeaddDialog"
            :IntList="IntList"
            :currentList="currentList"
            :openType="openType"
            name="itemList"
        >
        </addDialog>

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
      </div>
    </div>
  </div>
</template>
<script>
import addDialog from '../../components/addDataDialog.vue'
import homeMix from '../../assets/mixins/home-mixins'

export default {
  mixins: [homeMix],
  components: {
    addDialog
  },
  data () {
    return {
      tableText: '',
      dialogFormShow: false,
      IntList: ['neednum'],
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
    if (this.$store.state.departmentId === '10000') { this.tableText = this.$tables.itemListedit } else this.tableText = this.$tables.itemListsee
  },
  mounted () {
    // var ps=String.split(this.form.pass);
    // console.log(ps);
    setTimeout(() => {
      this.loading2 = false
    }, 400)
    this.getSearchUrl()
    // 调用方法获取后端数据
    this.search()
  },
  methods: {
    getSearchUrl () {
      this.searchUrl = 'home/item/getItem'
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../assets/less/right-table.less");

.body-top {
  height: 45px;
  width: 1210px;
  border: 1px solid #dadce0;
  border-radius: 4px;
}

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
