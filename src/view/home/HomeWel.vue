<template>
  <div class="wel-body">
    <div class="wel-body-overbox">
      <div class="top-box">
        <el-card class="box-card-right">
          <div slot="header" class="clearfix">
            <span>系统简介</span>
          </div>
          <div>
            <el-table :data="tableData" borderstyle="width: 100%">
              <el-table-column prop="username" label="用户账户" width="180">
              </el-table-column>
              <el-table-column prop="realname" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="department" label="所属部门">
              </el-table-column>
              <el-table-column prop="role" label="用户角色"> </el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-card class="box-card" style=" background-color: #E6A23C;">
          <div class="img">
            <i class="el-icon-s-marketing" style="font-size: 100px; color: white"></i>
          </div>
            <div v-for="(item,index) in datalist"  class="item" :key="index" style="font-size:20px;color:white;padding-left:30px" >
          {{item.name+'：'+item.num+item.unit}}
            </div>

          <div class="text1">材料库存</div>
        </el-card>
      </div>
      <div class="bottom-box" >
        <el-card class="box-card" style=" background-color: MediumSeaGreen;" v-if="getdpartmentTypeNeed"  >
          <div class="img">
            <i class="el-icon-document-checked" style="font-size: 100px; color: white"></i>
          </div>
          <div class="text item">
            {{ needCount.approve }}
          </div>
          <div class="text1">需求通过数量</div>
        </el-card>
        <el-card class="box-card" style="background-color:#f56c6c;" v-if="getdpartmentTypeNeed">
          <div class="img">
            <i class="el-icon-s-data" style="font-size: 100px; color: white"></i>
          </div>

          <div class="text item">
            {{ needCount.reject }}
          </div>
          <div class="text1">需求驳回数量</div>
        </el-card>
        <el-card class="box-card" style=" background-color: #409eff" v-if="getdpartmentTypeNeed">
          <div class="img">
            <i class="el-icon-s-order" style="font-size: 100px; color: white"></i>
          </div>
          <div class="text item">
            {{ needCount.sum }}
          </div>
          <div class="text1">需求总数</div>
        </el-card>
        <el-card class="box-card" style=" background-color: MediumSeaGreen;" v-if="getdpartmentTypeBuy">
          <div class="img">
            <i class="el-icon-document-checked" style="font-size: 100px; color: white"></i>
          </div>
          <div class="text item">
            {{ buyCount.approve }}
          </div>
          <div class="text1">订单通过数量</div>
        </el-card>
        <el-card class="box-card" style=" background-color:#f56c6c;" v-if="getdpartmentTypeBuy">
          <div class="img">
            <i class="el-icon-s-data" style="font-size: 100px; color: white"></i>
          </div>
          <div class="text item">
            {{ buyCount.reject }}
          </div>
          <div class="text1">订单驳回数量</div>
        </el-card>
        <el-card class="box-card" style=" background-color: #409eff;" v-if="getdpartmentTypeBuy">
          <div class="img">
            <i class="el-icon-s-order" style="font-size: 100px; color: white"></i>
          </div>
          <div class="text item">
            {{ buyCount.sum }}
          </div>
          <div class="text1">订单总数量</div>
        </el-card>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    getdpartmentTypeNeed () {
      const partIdList = ['10000', '10001', '10010', '10011']
      for (const i of partIdList) {
        if (this.$store.state.departmentId.includes(i)) return true
      }
      return false
    },
    getdpartmentTypeBuy () {
      const partIdList = ['10000', '10001', '10020', '10021']
      for (const i of partIdList) {
        if (this.$store.state.departmentId.includes(i)) return true
      }
      return false
    }
  },
  data () {
    return {
      rolaSelect: [
        {
          value: '10011',
          label: '需求专员',
          depart: '需求部'
        },
        {
          value: '10010',
          label: '需求经理',
          depart: '需求部'
        },
        {
          value: '10021',
          label: '采购专员',
          depart: '采购部'
        },
        {
          value: '10020',
          label: '采购经理',
          depart: '采购部'
        },
        {
          value: '10001',
          label: '总经理',
          depart: '经理部'
        },
        {
          value: '10000',
          label: '管理员',
          depart: '管理部'
        }

      ],
      tableData: [
        {
          username: '',
          realname: '',
          department: '',
          role: '',
          roleId: ''
        }
      ],
      needCount: {
        approve: '',
        reject: '',
        sum: ''
      },
      buyCount: {
        approve: '',
        reject: '',
        sum: ''
      },
      datalist: []
    }
  },
  mounted () {
    this.getUserData()
    this.getItemData()
    this.getAprovalCount()
  },
  methods: {
    /**
     * @desc 获取用户信息
     */
    getUserData () {
      const userList = JSON.parse(window.sessionStorage.getItem('userData'))
      this.tableData[0] = userList
      this.tableData[0].role = this.showRoleData(this.tableData[0].roleId)
      this.tableData[0].department = this.showDepartData(this.tableData[0].roleId)
    },
    /**
     * @desc 显示角色内容
     */
    showRoleData (val) {
      if (!val) return
      const rolaArr = []
      this.rolaSelect.forEach(item => {
        if (val.includes(parseInt(item.value))) rolaArr.push(item.label)
      })
      return rolaArr.join(',')
    },
    /**
     * @desc 显示部门内容
     */
    showDepartData (val) {
      if (!val) return
      let depart
      this.rolaSelect.forEach(item => {
        if (val.includes(parseInt(item.value))) depart = item.depart
      })
      return depart
    },
    /**
     * @desc 获取审批数据
     */
    getAprovalCount () {
      this.$api('home/welcome/getNeedCount').then(res => {
        this.needCount = res
      })
      this.$api('home/welcome/getBuyCount').then(res => {
        this.buyCount = res
      })
    },
    /**
     * @desc 请求库存数据
     */
    async getItemData () {
      await this.$api('home/item/getItem', {
        params: {
          page: 1, // 传递当前是第几页参数
          limit: 20, // 传递每页显示多少条记录参数
          searchName: '',
          selectName: ''
        }
      }).then((res) => {
        const itemData = res.list
        this.datalist = []
        for (let i = 0; i < 4; i++) {
          this.datalist.push({
            name: itemData[i].itemtype,
            num: itemData[i].stock,
            unit: itemData[i].unit
          })
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.wel-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &-overbox {
    overflow: auto;
  }
  .top-box {
    display: flex;
    justify-content:center;
  }
  .box-card-right {
    width: 55%;
    height: 230px;
    float: left;
    margin-top: 30px;
    margin-left: 40px;
  }
  .bottom-box {
    display: flex;
    justify-content:center;
    flex-wrap: wrap;
  }
  .box-card {
    width: 26%;
    min-width: 315px;
    height: 200px;
    float: left;
    margin-top: 30px;
    margin-left: 40px;
  }
    .img {
    float: right;
    padding-top: 25px;
  }

  .text {
    font-size: 50px;
    color: white;
    padding-left: 40px;
    padding-top: 20px;
    width: 50px;
  }
  .text1 {
    color: white;
    padding-left: 40px;
    width: 120px;
  }

  .item {
    margin-bottom: 9px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
}

</style>
