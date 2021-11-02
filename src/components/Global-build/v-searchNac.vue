<template>
  <div class="vSearchBoxs" :style="'width:' + width + ';'">
    <div
      class="inputLabel"
      :style="'width:' + (label ? labelwidth : '30px') + ';'"
    >
      {{ label ? label + "：" : "" }}
    </div>
    <div style="width: 100px">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vSearchNav',
  props: {
    labelwidth: {
      type: [String, Number],
      default: () => {
        return '80px'
      }
    },
    width: {
      type: [String, Number],
      default: () => {
        return '240px'
      }
    },
    label: {
      type: [String, Number],
      default: () => {
        return ''
      }
    }
  }
}
</script>

<style lang="less">
.vSearchBoxs {
  padding: 5px 0;
  display: flex;
  align-items: center;
  .inputLabel {
    text-align: end;
  }
  .el-input__inner {
    height: 30px;
    // width: 180px;
  }
  input {
    height: 30px;
  }
  .el-input__icon {
    line-height: 30px;
  }
}
</style>
