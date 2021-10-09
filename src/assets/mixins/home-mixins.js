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
    /**
     * @desc ajax请求后台数据 获得list数据 并用于分页
     */
    async search () {
      // const url = '/webneed/findAllNeed'
      await this.$api(this.searchUrl, {
      // await this.$ajax.get('/web/listUser', {
        params: {
          page: this.params.page, // 传递当前是第几页参数
          limit: this.params.limit, // 传递每页显示多少条记录参数
          searchName: this.params.dname, // 传递搜索参数
          selectName: this.params.selectValue // 筛选参数
        }
      }).then((res) => {
        // debugger;
        console.log(res)
        // const { data } = res
        this.list = res.list || [] // 获取里面的data数据
        console.log(this.list, 'this.listthis.list')
        this.params.total = res.count // 获取后台传过来的总数据条数
        this.params.page = res.page // 将后端的当前页反传回来
      })
    },
    /**
     * @desc 删除方法
     */
    deletedata (data, url) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // const url = '/web/deleteUser'
          await this.$api(url, {
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
        .catch(err => {
          if (err === 'cancel') {
            this.$message('取消删除')
          } else {
            this.$message({
              type: 'error',
              message: err
            })
          }
        })
    },
    /**
     * @desc 页码
     */
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
    /**
     * @desc 添加方法打开界面
     */
    gethomeAdd () {
      this.openType = 'add'
      this.dialogFormShow = true
    },
    /**
     * @desc 提交送审表单
     */
    upData (e) {
      this.openType = 'approval'
      this.currentList = e
      this.dialogFormShow = true
    },
    /**
     * @desc 修改表单
     */
    seeData (e) {
      this.openType = 'edit'
      this.currentList = e
      this.dialogFormShow = true
    },
    /**
     * @desc 关闭蒙版
     */
    closeaddDialog () {
      this.dialogFormShow = false
    }
  }
}
