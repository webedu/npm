<template class="self">
  <span class='c4uConnection' v-bind:class="pageDirection" v-show="pageVisible">
  <slot></slot> 
  </span> 
</template>

<style scoped>
  .c4uConnection {  }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  export default {
    props: {source: String, target: String},
    data: function() {
           return {
            c4uParentTag: "c4u-circuitry"
            }
        },
    mixins: [C4uGlue] 
  }
</script>
