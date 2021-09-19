<template>
  <div>
    <div class="top-box">
      <el-card class="box-card-right">
        <div slot="header" class="clearfix">
          <span>用户信息</span>
        </div>
        <div>
          <el-table :data="tableData" borderstyle="width: 100%">
            <el-table-column prop="userid" label="用户账户" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
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
         {{item.name+':'+item.num+'万吨'}}
          </div>

        <div class="text1">材料库存</div>
      </el-card>
    </div>
    <div class="bottom-box" >
      <el-card class="box-card" style=" background-color: MediumSeaGreen;" v-if="$store.state.departmentId==='10000' || $store.state.departmentId==='10001'|| $store.state.departmentId==='10020'"  >
        <div class="img">
          <i class="el-icon-document-checked" style="font-size: 100px; color: white"></i>
        </div>
        <div class="text item">
          {{ needpass }}
        </div>
        <div class="text1">需求通过数量</div>
      </el-card>
      <el-card class="box-card" style="background-color:#f56c6c;" v-if="$store.state.departmentId==='10000' || $store.state.departmentId==='10001'|| $store.state.departmentId==='10020'">
        <div class="img">
          <i class="el-icon-s-data" style="font-size: 100px; color: white"></i>
        </div>

        <div class="text item">
          {{ needreject }}
        </div>
        <div class="text1">需求驳回数量</div>
      </el-card>
      <el-card class="box-card" style=" background-color: #409eff" v-if="$store.state.departmentId==='10000' || $store.state.departmentId==='10001'|| $store.state.departmentId==='10020'">
        <div class="img">
          <i class="el-icon-s-order" style="font-size: 100px; color: white"></i>
        </div>
        <div class="text item">
          {{ needtotal }}
        </div>
        <div class="text1">需求总数</div>
      </el-card>
      <el-card class="box-card" style=" background-color: MediumSeaGreen;" v-if="$store.state.departmentId==='10000' || $store.state.departmentId==='10001'|| $store.state.departmentId==='10010'">
        <div class="img">
          <i class="el-icon-document-checked" style="font-size: 100px; color: white"></i>
        </div>
        <div class="text item">
          {{ orderpass }}
        </div>
        <div class="text1">订单通过数量</div>
      </el-card>
      <el-card class="box-card" style=" background-color:#f56c6c;" v-if="$store.state.departmentId==='10000' || $store.state.departmentId==='10001'|| $store.state.departmentId==='10010'">
        <div class="img">
          <i class="el-icon-s-data" style="font-size: 100px; color: white"></i>
        </div>
        <div class="text item">
          {{ orderreject }}
        </div>
        <div class="text1">订单驳回数量</div>
      </el-card>
      <el-card class="box-card" style=" background-color: #409eff;" v-if="$store.state.departmentId==='10000' || $store.state.departmentId==='10001'|| $store.state.departmentId==='10010'">
        <div class="img">
          <i class="el-icon-s-order" style="font-size: 100px; color: white"></i>
        </div>
        <div class="text item">
          {{ ordertotal }}
        </div>
        <div class="text1">订单总数量</div>
      </el-card>

    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          userid: 'admin',
          name: '张三',
          department: '管理员',
          role: '超级管理员'
        }
      ],
      needpass: 5,
      needreject: 0.00,
      needtotal: 0.00,
      orderpass: 0.00,
      orderreject: 0.00,
      ordertotal: 0.00,
      datalist: [
        { name: '钢材', num: 1000 },
        { name: '木材', num: 10001 },
        { name: '煤炭', num: 10000 },
        { name: '塑料', num: 10000 }
      ]
    }
  },
  methods: {

  }

}
</script>

<style lang="less" scoped>
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

.box-card {
  width: 450px;
  height: 200px;
  float: left;
  margin-top: 30px;
  margin-left: 40px;

}
.box-card-right {
  width: 940px;
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
.top-box {
  padding-top: 40px;
  display: flex;
  justify-content:center;
}

</style>
