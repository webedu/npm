<template>  
  <div class='c4uPageSelect'>
  <slot></slot>
  </div>
</template>

<style scoped>
  .elemSecond {
    background: green;
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  export default {
    props: ['msg'],
    data: function() {
           return {
            c4uParentTag: "c4u-pages",
            counter: 0,
            }
        },
    mixins: [C4uGlue], 
    methods: { 
       addOne: function(event) {
          this.counter += 1;
          if (this.c4uParent) {
            this.c4uParent.counter += 100;
          }
       },
    },
  }
</script>
