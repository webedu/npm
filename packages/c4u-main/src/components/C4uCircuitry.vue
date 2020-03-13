<template class="self">
  <span class='c4uCircuitry'>
  <slot></slot> 
  </span>
</template>

<style scoped>
  .c4uCircuitry { }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  export default {
    data: function() {
           return {
            // c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            }
        }, 
    mixins: [C4uGlue], 
    methods: { 
      outValueChanged: function (name, value, source) {
         //console.log("out value changed in circuitry: #"+this.c4uUid); 
         if(this.c4uAllConnections) {
          for(var i=0; i<this.c4uAllConnections.length; i++) { 
            //console.log("check connection source ["+this.c4uAllConnections[i].source+"] to target ["+this.c4uAllConnections[i].target+"]");
            if(this.c4uAllConnections[i].source == name) {
                var target = this.c4uAllConnections[i].target;
                this.changeInValue(target, value, source);
            } 
          }
         }
       },
      changeInValue: function(name, value, source) {
          //console.log("connection found in circuitry "); 
          if(this.c4uAllPlugsIn) {
           for(var i=0; i<this.c4uAllPlugsIn.length; i++) { 
             var target = this.c4uAllPlugsIn[i]
             if(target.name == name) {
                target.changeInValue(value);
                source.addConnectedIn(target); // from now on direct connection is possible
             }
           }
          }
      }
    },
    computed: {
       c4uAllConnections: function () {
          return this.c4uChildren['c4u-connection'];
       },
       c4uAllPlugsIn: function () {
          return this.c4uChildren['c4u-in'];
       }
    }
  }
</script>
