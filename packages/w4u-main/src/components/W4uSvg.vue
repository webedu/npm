<template>
  <div class='w4uSvg'>
    <svg id='w4uSvg' ref='w4uSvg'></svg>
    <slot></slot>
  </div>
</template>
 
<style scoped>
  .w4uSvg { 
    background: green;
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
  import SnapSvg from "snapsvg-cjs";
  //import SnapFoo from "snapfoo";



 
  export default {
    data: function() {
           return {
            c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            svgStage: null,
            }
        },
    mixins: [C4uGlue], 
    methods: {
      getSvgStage() {
          return this.svgStage;
      },
/*
      recheckSvgElem(child) {
         var childTag = child.c4uTag;
         var validChilds = this.c4uChildren[childTag]; 
         for(var i=0; i<validChilds.length; i++) {
            
            return 1;
         }         
         child.deleteElem();
      } 
*/
    },     
    mounted() {
         console.log("*****  SVG mounted #" + this.c4uUid);
         var svg = this.$refs.w4uSvg;
         this.svgStage = Snap(svg);
   }

  }
</script>
