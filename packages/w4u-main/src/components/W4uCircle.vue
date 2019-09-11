<template>
  <span class="w4uCircle">
  <w4u-io v-bind:name="name" v-bind:inputs="w4uStringIn"></w4u-io>
  <slot></slot>
  </span>
</template>

<style scoped>
  .w4uCircle2 {
    background: green;
  } 
</style>

<script>
  import W4uIo from "w4u-io";
  import C4uGlue from "c4u-glue";
  import SnapSvg from "snapsvg-cjs";
  //import SnapFoo from "snapfoo";
 
  export default {
    props: {
            name: {type: String, default: 'circle0'},          //automatic numbering would need glue for unique id...
            cx:   {type: Number, default: 10},
            cy:   {type: Number, default: 10},
             r:   {type: Number, default:  5},
           },
    data: function() {
           return {
             c4uParentTag: "w4u-svg",
             w4uInputs:  {'cx': {'value': this.cx, 'time':0.0 },   //X position horizontal
                          'cy': {'value': this.cy, 'time':0.0 },   //Y position vertical
                           'r': {'value': this.r , 'time':0.0 },   //Radius

             },
             svgElem: null
            }
        },
    mixins: [W4uIo, C4uGlue],
    watch: {
       w4uStringIn: function (newValue) { this.modifyElem(); }
       },
    methods: {
        c4uParentDisconnected(parent) {
           this.deleteElem();
        }, 
        c4uParentReconnected(parent) {
           this.createElem();
        },
        createElem() {
         if(this.c4uParent) {
           this.deleteElem()
           var s = this.c4uParent.getSvgStage();
           this.svgElem = s.circle(this.w4uInputs.cx.value, this.w4uInputs.cy.value, this.w4uInputs.r.value);
         }
	},
        deleteElem() {
         if(this.svgElem) {
           this.svgElem.remove();
           this.svgElem = null;
         }
	}, 
        modifyElem() {
         if(!this.c4uParent) { this.deleteElem(); }
         if(this.svgElem) {
           this.svgElem.animate({
               cx: this.w4uInputs.cx.value,
               cy: this.w4uInputs.cy.value,
               r: this.w4uInputs.r.value
             } ,1000); //adapt time late

         }
	},          
      },
    mounted() {
       this.createElem();
    },

  }
</script>
