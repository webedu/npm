<template class="self">
  <span class='c4uGrid2'>
   <span v-html="c4uStyle"></span>
  <span class='c4uGrid'>
   <slot></slot> 
  </span>
  </span>
</template>

<style scoped>
  .c4uGrid { 
    display: grid; 
    width: 100%;
    height: 100%;
  }
</style>

<script>
  //import C4uGlue from "c4u-glue";
 
  export default {
    props: {
            name: {type: String, default: 'grid0'},          //automatic numbering would need glue for unique id...
            columns:  {type: Number, default: 12}, 
            rows: {type: Number, default: 6}
           },
    data: function() {
           return {
            // c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            }
        },
    //mixins: [C4uGlue], 
    computed: {
      c4uStyle: function() {
         var colPerc = 10;
         var colN = 10;
         if(this.columns >= 1) {
            colN = this.columns
            colPerc = 100.0/colN;
         }
         var colStr = '';
         for(var i=0; i<colN; i++) { 
           colStr += colPerc.toString()+'% ';
         }

         var rowPerc = 10;
         var rowN = 10;
         if(this.rows >= 1) {
            rowN = this.rows
            rowPerc = 100.0/rowN;
         }
         var rowStr = "";
         for(var i=0; i<rowN; i++) { 
           rowStr += rowPerc.toString()+'% ';
         }
         return '<style>' 
              + '.c4uGrid { grid-template-columns: '+colStr+'; } '
              + '.c4uGrid { grid-template-rows: '+rowStr+'; } '
              + '</style>';
      }
  }
}
</script>
