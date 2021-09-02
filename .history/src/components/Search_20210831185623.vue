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
<style scoped>
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
	}

	.search input {
	    float: left;
	    border: none;
	    outline: none;
	    width: 100%;
	    height: 30px;
	    padding-left: 13px;
	    border: 2px solid #409EFF;
	    border-right: 0;
	    border-radius: 5px;
	    color: black;
        font-size: 16px;
	}

	.search button {
	    float: left;
	    border: none;
	    outline: none;
	    height: 30px;
	    width: 45px;
	    cursor: pointer;
	    position: absolute;
	    top: 0;
	    right: 0;
	    background:#409EFF;
	    border-radius: 0 5px 5px 0;
	}
    .search button:hover{
        background-color:#73B8FE ;
		box-shadow:0 0 3px#73B8FE ;

	}
 	.search button:active{
		 padding-left: 1px;
         padding-top: 1px;
         background:#409EFF;
    }
	.search button:before {
	    content: "\f002";
	    font-family: FontAwesome;
	    font-size: 16px;
	    color: #F9F0DA;
	}
	input::-webkit-input-placeholder {
        color: #c7c8c9;
    }
</style>
