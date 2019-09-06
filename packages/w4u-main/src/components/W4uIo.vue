<template class="self">
  <span class='w4uIo'>
     <c4u-in v-for="(inData, inName) in compIn" v-bind:name="name+'-'+inName" v-bind:value="inData.value" v-bind:key="inName"></c4u-in>
     <c4u-out v-for="(outData, outName) in compOut" v-bind:name="name+'-'+outName" v-bind:value="outData.value" v-bind:key="outName"></c4u-out>
     <slot></slot>  
  </span>  
</template>


<script>
  export default {
    model: {
       prop: 'inputs',
       event: 'inputsChanged'
    }, 
    props: {
            name: {type: String, default: 'io0'},          
            //inputs:  {type: Object, default: function() {return {};}}, 
            inputs:  {type: String, default: "{}"}, 
            //outputs: {type: Object, default: function() {return {};}},
            outputs: {type: String, default: "{}"}
           },
    computed: {
       compOut: function() {return JSON.parse(this.outputs);}, 
       compIn:  function() {return JSON.parse(this.inputs);}
    }
  }
</script>
