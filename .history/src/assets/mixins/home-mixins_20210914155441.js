export default {
  methods: {
    // 删除方法
    deletedata (e, url) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // const url = '/webneed/deleteNeed'
          const { data: res } = await this.$ajax.get(url, {
            params: {
              needid: e.needid
            }
          })
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.search()
            this.list.splice(e, 1)
          } else {
            this.$message.error('错了哦，删除失败')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
