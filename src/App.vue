<template>
  <div id="app" >
	  		<!-- <v-login></v-login> -->
			<router-view ></router-view>
	</div>
</template>

<script>

export default {
  data () {
    	return {

    	}
  	},
  	methods: {

  	},
  components: {
  },
  mounted () {
    this.$router.push({ path: 'login' }) // 页面跳转
  }
}

</script>

<style>

</style>
