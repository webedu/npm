<template>  
  <button v-bind:disabled="buttonDisabled" class='c4uPageForward' v-on:click="c4uPageForward">
  <slot></slot>
  </button>
</template>

<style scoped>
  .c4uPageForward {
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
       c4uPageForward: function(event) {
         if (this.c4uParent) { 
           this.c4uParent.nextPage(); 
           //this.updateDisableStatus();
         }
       },
       updateDisableStatus: function() {
         if (this.c4uParent && this.c4uParent.nextPageExists()) {
            this.buttonDisabled = false; 
         } else {
            this.buttonDisabled = true; 
         }
       } 
    },
    created() {
         console.log("***** Slot-2nd-created " + " #" + this.c4uUid);
    },
    mounted() {
         console.log("***** Slot-2nd-mounted " + " #" + this.c4uUid);
    },
    updated() {
         console.log("***** Slot-2nd-updated " + " #" + this.c4uUid);
         this.updateDisableStatus();
    },
    beforeDestroy() {
         console.log("***** Slot-2nd-destroyed " + this.msg + " #" + this.c4uUid);
    },

  }
</script>
