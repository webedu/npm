<template>  
  <button v-bind:disabled="buttonDisabled" class='c4uPageBackward' v-on:click="c4uPageBackward">
  <slot></slot>
  </button>
</template>

<style scoped>
  .c4uPageBackward {
    background: cyan;
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  export default {
    data: function() {
           return {
            c4uParentTag: "c4u-pages",
            buttonDisabled: true,
            }
        },
    mixins: [C4uGlue], 
    methods: { 
       c4uPageBackward: function(event) {
         if (this.c4uParent) {  
           this.c4uParent.previousPage(); 
           //this.updateDisableStatus();
         }
       },
       updateDisableStatus: function() {
         if (this.c4uParent && this.c4uParent.previousPageExists()) {
            this.buttonDisabled = false; 
         } else {
            this.buttonDisabled = true; 
         }
       } 
    },
    updated() {
         this.updateDisableStatus();
    },

  }
</script>
