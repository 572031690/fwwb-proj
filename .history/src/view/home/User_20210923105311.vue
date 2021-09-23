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
                    <el-select
                      v-model="params.selectValue"
                      @change="search"
                      placeholder="筛选部门"
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
                        placeholder="请输入用户姓名"
                        @change="search"
                        v-model="params.dname"
                      />
                      <button type="button"></button>
                    </form>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" v-if="this.$store.state.departmentId === '10000'">
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
              <tr >
                <th v-for="(item,index) in tableText.tableTitle"
                :key="index"
                colspan="1"
                rowspan="1"
                :class="{'htop-th2':  item === '用户名','htop-ope1':item === '操作'}">
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
              :class="{
                  ['body-td2']:data==='username',
                  ['body-ope1']:data==='opetation'
                }"
              >

                <div class="cell" v-if="data!=='opetation'">
                  {{ item[data] }}
                </div>

                <div class="cell" v-if="data==='opetation'">
                  <button class="modify" @click="seeData(item)">编辑</button>
                  <button class="delete" @click="deletedata({userid: item.userid},'home/user/deleteUser')">删除</button>
                  <button class="approval" @click="resetPass(item)">重置密码</button>
                </div>
              </td>
            </tr>
          </tbody>

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
          name="userList"
        >
        </addDialog>
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
      IntList: ['departmentid', 'employeeid', 'userid'],
      topChange: 'userid',
      list: [
        {
          userid: 1,
          username: '马佳辉',
          password: 5454165,
          telNum: 17816536995,
          employeeid: '3',
          departmentid: '10001'
        },
        {
          userid: 2,
          username: '夏航宇',
          password: 15615,
          telNum: 15865645646,
          employeeid: '1',
          departmentid: '10021'
        }
      ],
      loading2: true,
      select: [
        {
          value: '10011',
          label: '需求专员'
        },
        {
          value: '10010',
          label: '需求经理'
        },
        {
          value: '10021',
          label: '采购专员'
        },
        {
          value: '10020',
          label: '采购经理'
        },
        {
          value: '10001',
          label: '总经理'
        },
        {
          value: '10000',
          label: '管理员'
        }

      ],
      dialogFormVisible: false // 不让修改窗口打开
    }
  },
  created () {
    if (this.$store.state.departmentId === '10000') {
      this.tableText = this.$tables.userListedit
    } else {
      this.tableText = this.$tables.userListsee
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading2 = false
      console.log(this.list, 'list')
    }, 400)
    this.getSearchUrl()
    // 调用方法获取后端数据
    this.search()
  },
  methods: {
    getSearchUrl () {
      this.searchUrl = 'home/user/getUser'
    },
    resetPass (item) {

    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../assets/less/right-table.less");

.body-top {
  width: 1040px;
}
</style>
