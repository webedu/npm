<template> 
  <span class='c4uHtml3'><slot></slot><span v-html='c4uHtml2'></span></span>
</template>

<style scoped>
  .c4uHtml3 {
    background: blue; 
  }
</style>

<script>
  import axios from "axios";

  export default {
    props: {url: String},
    data: function() {
           return {
            c4uHtml2: "<p>Loading...</p>"
            }
        },
    created() {
        // console.log("***** HTML-LOADER-created"); 
    },
    mounted() {
         if(this.url) {
	    axios.get(this.url)
                 .then(response => { this.c4uHtml2 = response.data; });	
         }
    },
  }
</script>
