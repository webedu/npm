<template class="self">
  <span class='c4uOut'>
  <slot></slot> 
  </span>
</template>

<style scoped>
  .c4uOut {  } 
</style>

<script>
  import C4uGlue from "c4u-glue"; 
 
  export default {
    props: {name: String, value: Number},
    data: function() {
           return {
            c4uParentTag: "c4u-circuitry",
            c4uOldValue: null,
            c4uAllConnectedIns: [],
            c4uLastConnectionUpdate: 0.0
            }
        },
    mixins: [C4uGlue], 
    watch: {
       value: function (newValue) {
           this.outValueChanged(parseFloat(newValue));
       }
    },
    methods: { 
        c4uSecondsSince1970() {
          var d = new Date();
          var seconds = d.getTime()/1000.0;
          return seconds;
        },
        c4uIsLastUpdateValid() {
          var seconds = this.c4uSecondsSince1970();
          if((seconds-this.c4uLastConnectionUpdate) > 1.0) {
             this.c4uAllConnectedIns = [];
             return false; 
          }   
          return true;
        },
        outValueChanged: function (newValue) {
         if(newValue != this.c4uOldValue) {
           this.c4uOldValue = newValue;
           // this.value = newValue; // not needed
           // if connection list exists use direct connection....
           if(this.c4uAllConnectedIns && this.c4uAllConnectedIns.length>0 && this.c4uIsLastUpdateValid()) {
             for(var i=0; i<this.c4uAllConnectedIns.length; i++) { 
                this.c4uAllConnectedIns[i].changeInValue(newValue);
             }             
           } else {
             if (this.c4uParent) {  
               this.c4uParent.outValueChanged(this.name, newValue, this); 
             }
           }
         }
        },
        addConnectedIn(inPlug) {
          this.c4uAllConnectedIns.push(inPlug);
          this.c4uLastConnectionUpdate = this.c4uSecondsSince1970();
        } 
    },
    mounted() {
         this.outValueChanged(this.value);
    }
  }
</script>
