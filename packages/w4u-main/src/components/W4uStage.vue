<template class="self">
  <span class='w4uStageFrame'>
     <div class="w4uStage" ref="w4uStage"> 
        <slot></slot>  
     </div>
  </span>  
</template>

<script>
  import C4uGlue from "c4u-glue";

  export default {
    props: {
            name: {type: String, default: 'stage0'},          //automatic numbering would need glue for unique id...
            // width:  375px, 
            // height: 375px
           },
    mixins: [C4uGlue],
    methods: {
      getStageBox() {
          return this.$refs.w4uStage.getBoundingClientRect();
      } 
    } 
  }
</script>

<style scoped>
  .w4uStage {
    position: relative;
    width: 500px;
    height: 250px;
    border: solid 2px blue;
    background-color: yellow;
    overflow: hidden;
  }
  .w4uStageFrame {
    position: static;
    width: 510px;
    height: 510px;
    border: solid 3px red;
  }
</style>
