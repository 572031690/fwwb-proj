export default {
  data () {
    return {
      params: {
        limit: 5, // 每页显示5条记录
        page: 1, // 当前是第几页
        total: 0, // 总共几条记录去分页
        dname: '', // 查询数据
        selectValue: '' // 查询状态
      },
      searchUrl: '',
      currentList: {},
      openType: 'edit'
    }
  },
  methods: {
    // ajax请求后台数据 获得list数据 并用于分页
    async search () {
      // const url = '/webneed/findAllNeed'
      await this.$ajax.get(this.searchUrl, {
        params: {
          page: this.params.page, // 传递当前是第几页参数
          limit: this.params.limit, // 传递每页显示多少条记录参数
          username: this.params.dname // 传递搜索参数
        }
      }).then((res) => {
        console.log(res)
        const { data } = res
        this.list = data // 获取里面的data数据
        this.params.total = data.count // 获取后台传过来的总数据条数
        this.params.page = data.page // 将后端的当前页反传回来
      }).catch(() => {
        this.$message.error('网络异常')
      })
    },
    // 删除方法
    deletedata (data, url) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // const url = '/web/deleteUser'
          await this.$ajax.get(url, {
            params: data
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.search()
              // this.list.splice(e, 1)
            } else {
              this.$message.error('错了哦，删除失败')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 页码
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.params.limit = val // 设置每页多少条记录
      this.search()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.params.page = val
      this.search()
    },
    // 添加方法打开界面
    gethomeAdd () {
      this.openType = 'add'
      this.dialogFormShow = true
    },
    // 提交送审表单
    upData (e) {
      this.openType = 'approval'
      this.currentList = e
      this.dialogFormShow = true
    },
    // 修改表单
    seeData (e) {
      this.openType = 'edit'
      this.currentList = e
      this.dialogFormShow = true
    },
    // 关闭蒙版
    closeaddDialog () {
      this.dialogFormShow = false
    }
  }
}
