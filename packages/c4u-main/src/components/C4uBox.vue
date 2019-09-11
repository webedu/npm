<template class="self">
  <span class='c4uBox'>
   <span v-html="c4uStyle"></span>
  <span class='c4uBox2'>
   <slot></slot> 
  </span> 
  </span> 
</template>

<style scoped>
  .c4uBox { 
  }
</style>

<script>
  //import C4uGlue from "c4u-glue";
 
  export default {
    props: {
            name: {type: String, default: 'box0'},          //automatic numbering would need glue for unique id...
            column:  {type: Number, default: 1}, 
            row:     {type: Number, default: 1},
            width:   {type: Number, default: 1}, 
            height:  {type: Number, default: 1}, 
           },
    data: function() {
           return {
            // c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            }
        },
    //mixins: [C4uGlue], 
    computed: {
      c4uStyle: function() {
         var colStart = this.column;
         var rowStart = this.row;
         var colEnd = this.column + this.width;
         var rowEnd = this.row + this.height;
         // may use parent size for limitation... 
         return '<style>' 
              + '.c4uBox { grid-column-start: '+colStart+'; } '
              + '.c4uBox { grid-row-start: '+rowStart+'; } '
              + '.c4uBox { grid-column-end: '+colEnd+'; } '
              + '.c4uBox { grid-row-end: '+rowEnd+'; } '
              + '</style>';
      }
  }
}
</script>
