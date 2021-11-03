<template>
  <div id="app">
    <!-- <keep-alive  exclude="driver"> -->
      <router-view />
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {},
  mounted () {
    // this.$router.push({ path: 'login' }) // 页面跳转
  }
}
</script>

<style></style>
