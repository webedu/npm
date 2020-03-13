<template class="self">
  <span class='w4uSpriteFrame'> 
     <span v-html="w4uStyle"></span>
     <w4u-io v-bind:name="name" v-bind:inputs="w4uStringIn"></w4u-io> 
     <div class="w4uSprite" ref="w4uSprite"> 
       <slot></slot>  
     </div>
  </span> 
</template>

<script>
  import C4uGlue from "c4u-glue";
  import W4uIo from "w4u-io";

  export default {
    props: {
            name: {type: String, default: 'sprite0'},          //automatic numbering would need glue for unique id...
            // width:  175px 
            // height: 175px
            // bumping: xxx  // behavior on border  
           },
    data: function() {
           return {
             c4uParentTag: "w4u-stage",
             w4uInputs:  {'x': {'value': 0.5, 'time':0.0 },  //X position horizontal
                          'y': {'value': 0.5, 'time':0.0 },  //Y position vertical
                          'a': {'value': 0.0, 'time':0.0 },  //rotation Angle
                          'o': {'value': 1.0, 'time':0.0 },  //Opacity
                          'z': {'value': 0.0, 'time':0.0 },  //Z-Index
             }
            }
        },
    mixins: [W4uIo, C4uGlue], 
    computed: {
      w4uStyle: function() {
         var x = 100.0*this.w4uInputs.x.value;
         var y = 100.0*this.w4uInputs.y.value;
         var a = 360.0*this.w4uInputs.a.value;
         var z = Math.round(100.0*this.w4uInputs.z.value);
         if(this.c4uParent && this.$refs.w4uSprite) {
           var stageBox = this.c4uParent.getStageBox();
           var spriteBox = this.$refs.w4uSprite.getBoundingClientRect();
           x = this.w4uInputs.x.value*(stageBox.right-stageBox.left);
           y = this.w4uInputs.y.value*(stageBox.bottom-stageBox.top);
         }
         return '<style>' 
              + '.w4uSprite { transform-origin: 50% 50%; } '
              + '.w4uSprite { opacity: '+this.w4uInputs.o.value.toString()+'; } '
              + '.w4uSprite { z-index: '+z.toString()+'; } '
              + '.w4uSprite { transform:  translateX(calc('+x.toString()+'px - 50%)) ' 
              + '             translateY(calc('+y.toString()+'px - 50%)) ' 
              + '             rotate('+a.toString()+'deg); }' 
              + '</style>';
      },
    } 
  }
</script>

<style scoped>
  .w4uSprite {
    position: absolute;
  }
</style>
