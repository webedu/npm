<template>  
  <div class='c4uPages' id='mktodo'>
 <div style='position: relative;float:right;'>
  <slot></slot>
 </div> 
  </div>
</template>
 
<style scoped>
  .c4uPages {
    position: absolute;
    d2isplay: flex;
    float: left;
    background: red;
    width: 100%;
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
  import ZingTouch from "zingtouch";
 
  export default {
    data: function() {
           return {
            c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            c4uCurrentPage: null,
            c4uAllPages: [], 
            }
        },
    mixins: [C4uGlue], 
    methods: { 
       previousPage: function () {
         if(this.previousPageExists()) {
            for(var i=1; i<this.c4uAllPages.length; i++) {
               if(this.c4uCurrentPage.c4uUid == this.c4uAllPages[i].c4uUid) {
                  this.c4uCurrentPage.pageDirection = "c4uBackward";
                  this.c4uCurrentPage.pageVisible = false;
                  this.c4uCurrentPage= this.c4uAllPages[i-1];
                  this.c4uCurrentPage.pageDirection = "c4uBackward";
                  this.c4uCurrentPage.pageVisible = true;
                  this.updateDisableStatus();
                  return true;
               }  
            }
         }
         return false; 
       },
       nextPage: function () {
         if(this.nextPageExists()) {
            for(var i=0; i<(this.c4uAllPages.length-1); i++) {
               if(this.c4uCurrentPage.c4uUid == this.c4uAllPages[i].c4uUid) {
                  this.c4uCurrentPage.pageDirection = "c4uForward";
                  this.c4uCurrentPage.pageVisible = false;
                  this.c4uCurrentPage= this.c4uAllPages[i+1];
                  this.c4uCurrentPage.pageDirection = "c4uForward";
                  this.c4uCurrentPage.pageVisible = true;
                  this.updateDisableStatus();
                  return true;
               }  
            }
         }
         return false;
       },
       previousPageExists: function () {
          if (!this.c4uCurrentPage) { return false; }
          if (this.c4uAllPages.length < 2) { return false; }
          if (this.c4uCurrentPage.c4uUid == this.c4uAllPages[0].c4uUid) { return false; }
          return true;  
       }, 
       nextPageExists: function () {
          if (!this.c4uCurrentPage) { return false; }
          if (this.c4uAllPages.length < 2) { return false; }
          if (this.c4uCurrentPage.c4uUid == this.c4uAllPages[this.c4uAllPages.length-1].c4uUid) { return false; }
          return true;  
       }, 
       updateDisableStatus: function () {
         for(var i=0; i<(this.c4uChildren['c4u-page-forward'].length); i++) {
           this.c4uChildren['c4u-page-forward'][i].updateDisableStatus();
         }
         for(var i=0; i<(this.c4uChildren['c4u-page-backward'].length); i++) {
           this.c4uChildren['c4u-page-backward'][i].updateDisableStatus();
         }
       },
       addOne: function(event) {
          this.counter += 1;
       },
    },
//    inject: {getIt2: {default() { "initial it"}}},
    created() {
         console.log("***** Elem-1st-created #" + this.c4uUid);
    },
    mounted() {
         console.log("***** Elem-1st-mounted #" + this.c4uUid);
         var swipeElement = document.getElementById('mktodo');
         activeRegion.bind(swipeElement, 'swipe', function() {
            alert("swiped");
         }); 
    },
    updated() {
         console.log("***** Elem-1st-updated #" + this.c4uUid);
         this.c4uAllPages = this.c4uChildren['c4u-page'];
    },
    beforeDestroy() {
         console.log("***** Elem-1st-destroyed #" + this.c4uUid);
    },

  }
</script>
