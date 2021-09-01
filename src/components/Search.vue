<template>
    <div class="search">
        <form>
            <input type="text" placeholder="请输入您要搜索的内容">
            <button type="submit"></button>
        </form>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
form {
  position: relative;
  width: 350px;
}
.search {
  margin-left: 5px;
  float: left;
  height: 30px;
  input {
    float: left;
    border: none;
    outline: none;
    width: 100%;
    height: 30px;
    padding-left: 13px;
    border: 2px solid #409eff;
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
    top: 0;
    right: 0;
    background: #409eff;
    border-radius: 0 5px 5px 0;
    &:hover {
      background-color: #73b8fe;
      box-shadow: 0 0 3px#73b8fe;
    }
    &:active {
      padding-left: 1px;
      padding-top: 1px;
      background: #409eff;
    }
    &:before {
      content: "\f002";
      font-family: FontAwesome;
      font-size: 16px;
      color: #f9f0da;
    }
  }
}
input {
  &::-webkit-input-placeholder {
    color: #c7c8c9;
  }
}
</style>
