<template>
  <div class="personal">
    <div class="personal-table">表格位置</div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.personal {
  height: 95%;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  &-table {
    height: 90%;
    width: 90%;
    border: 1px solid red;
  }
}
</style>