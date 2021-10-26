<template>
  <div id="permissionDialog">
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisibleRole"
      width="1000px">
      <div class="tableRole">
        <div class="tableRoleTop">
          <div class="btnRole">选择</div>
          <div class="textRole">权限名称</div>
          <div class="textLongRole">权限标识</div>
          <div class="textRole">权限类型</div>
          <div class="textLongRole">权限地址</div>
          <div class="textRole">状态</div>
        </div>
        <el-checkbox-group v-model="currentPermission">
          <div class="tableRoleBody" v-for="(item,index) in permissionData" :key="index">
            <div class="btnRole"><el-checkbox :label="item.id">{{''}}</el-checkbox></div>
            <div class="textRole">{{item.name}}</div>
            <div class="textLongRole">{{item.permission}}</div>
            <div class="textRole">{{item.type}}</div>
            <div class="textLongRole">{{item.url}}</div>
            <div class="textRole">{{item.isDisabled ? '禁用' : '正常'}}</div>

          </div>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="upCurrentPermissionList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script >
export default {
  props: {
    dialogVisibleRole: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    roleId: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  watch: {
    dialogVisibleRole: {
      handler: function (val) {
        if (val) this.getCurrentPermissionList()
      }
    }
  },
  data () {
    return {
      currentPermission: [],
      permissionData: []
    }
  },
  mounted () {
    this.getPermissionList()
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    checkRoleList () {
      this.closeDialog(true)
    },
    async getCurrentPermissionList () {
      const url = 'home/role/getRolePerm'
      const params = {
        roleId: this.roleId
      }
      await this.$api(url, { params }).then((res) => {
        this.currentPermission = []
        res.rolePerm.forEach(element => {
          this.currentPermission.push(element.permId)
        })
      })
    },
    async upCurrentPermissionList () {
      const url = 'home/role/addRolePerm'
      const data = {
        roleId: this.roleId,
        permId: this.currentPermission
      }
      await this.$api(url, data).then((res) => {
        if (res.code === '101') {
          this.$message.success('修改成功！')
          this.closeDialog()
        }
      })
    },
    /**
     * @desc 获取角色列表
     */
    async getPermissionList () {
      const url = 'home/permission/listPerm'
      const params = {
        page: 0, // 传递当前是第几页参数
        limit: 0, // 传递每页显示多少条记录参数
        searchName: '', // 传递搜索参数
        selectName: ''
      }
      await this.$api(url, { params }).then((res) => {
        this.permissionData = res.list
      })
    }
  }

}
</script>

<style lang="less" scoped>
.tableRole {
  height: 500px;
  overflow: auto;
  &Top {
    display: flex;
    border-bottom: 1px solid rgb(235, 238, 245);
  }
  &Body {
    display: flex;
    border-bottom: 1px solid rgb(235, 238, 245);
  }
  .textLongRole {
    color: rgb(111, 115, 116);
    font-size: 14px;
    width: 300px;
    height:50px;
    line-height: 50px;
  }
  .textRole {
    color: rgb(111, 115, 116);
    font-size: 14px;
    width: 150px;
    height:50px;
    line-height: 50px;
  }
  .btnRole {
    color: rgb(111, 115, 116);
    font-size: 14px;
    width: 60px;
    height:50px;
    line-height: 50px;
  }
}
</style>
