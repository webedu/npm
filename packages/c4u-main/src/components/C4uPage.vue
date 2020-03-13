<template class="self">
  <transition name="slide-fade">
  <span class='c4uPage' v-bind:class="pageDirection" v-show="pageVisible">
  <slot></slot> 
  </span> 
  </transition>
</template>

<style scoped>
  * { width:100%; 
      display: inline-block;
    }
  .c4uPage {
    position: absolute;
    width:100%;
    left: 0%;
    top: 200px;
  }

  .slide-fade-enter-active, 
  .slide-fade-leave-active {
    transition: all 3.5s ease;
   }
  .slide-fade-enter.c4uBackward, 
  .slide-fade-leave-to.c4uForward  {
    left:  -100%;
    w2idth: 10%;
   }
  .slide-fade-enter-to.c4uBackward, 
  .slide-fade-leave.c4uForward, 
  .slide-fade-enter-to.c4uForward, 
  .slide-fade-leave.c4uBackward  {
    left: 0%;
    w2idth: 80%;
  }
  .slide-fade-leave-to.c4uBackward, 
  .slide-fade-enter.c4uForward {
    left: 100%;
    w2idth: 10%;
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  export default {
    data: function() {
           return {
            c4uParentTag: "c4u-pages",
            pageVisible: false,
            pageDirection: "c4uFast"
            }
        },
    mixins: [C4uGlue], 
    methods: { 
       hide: function() {this.pageVisible = false; },
       show: function() {this.pageVisible = true; },
       addOne: function(event) {
          this.counter += 1;
          if (this.c4uParent) {
            this.c4uParent.counter += 100;
          }
       },
    },
    updated() {
         if (this.c4uParent && !this.c4uParent.c4uCurrentPage) {
            this.c4uParent.c4uCurrentPage = this;
            this.pageVisible = true; 
         } 
    },
  }
</script>
