<template class="self">
  <span class='w4uSlider'>
     <span v-html="w4uStyle"></span>
     <input type="range" min="0" max="1000" v-bind:value="sliderString" v-bind:orient="orient" v-on:input="slide($event)" v-on:change="update($event)">
     <w4u-io v-bind:name="name" v-bind:inputs="w4uStringIn" v-bind:outputs="w4uStringOut" > </w4u-io>    
     <slot></slot>  
  </span>
</template>

<script>

  import W4uIo from "w4u-io";

  export default {
    props: {
            name: {type: String, default: 'slider0'},          //automatic numbering would need glue for unique id...
            orient: {type: String, default: 'vertical'}, 
            color: {type: String, default: '#4CAF50'}, 
            background: {type: String, default: '#d3d3d3'}, 
            label: {type: String, default: ''},
            min: {type: Number, default: 0.0},
            max: {type: Number, default: 1.0},
            continuous: {type: Boolean, default: false},
            // length: 175px 
            // min: -1.0 // 0.0
            // max: +1.0  
            // default (value)
            // continuous
           },
    data: function() {
           return {
             sliderString: "500", //
             w4uInputs:  { 'v': {'value': 0.5, 'time':0.0 } },
             w4uOutputs: { 'v': {'value': 0.5, 'time':0.0 } }
            }
        },
   mixins: [W4uIo], 
   methods: { 
    slide(e) { 
           if (this.continuous) {
	     this.sliderString = e.target.value; 
           }
	},
    update(e) {
	  this.sliderString = e.target.value;
	},
    },
    watch: {
       sliderInput: function (newValue) {
           if(Math.abs(this.sliderOutput-newValue) > 0.001) {
           this.sliderString = Math.round((newValue-this.min)*1000.0/(this.max-this.min)).toString();
             //console.log("slider has new value: " + newValue);
           }
       },
       sliderOutput: function (newValue) {
           Vue.set(this.w4uOutputs, 'v', {'value': newValue, 'time': 0.1});
           //console.log("slider has new value: " + newValue);
       },
    },   
   computed: {
      sliderInput: function() {
         return this.w4uInputs.v.value; 
      },      
      sliderOutput: function() {
         return this.min+(this.max-this.min)*parseFloat(this.sliderString)/1000.0;
      },
     
      w4uStyle: function() {
         return '<style>' 
              + '.w4uSlider input { background: '+this.background+'; } '
              + '.w4uSlider input[type=range]::-webkit-slider-thumb { background: '+this.color+'; } ' 
              + '.w4uSlider input[type=range]::-moz-range-thumb { background: '+this.color+'; } '
              + '</style>';
      }   
    } 
  }
</script>

<style scoped>
  .w4uSlider {  }
  .w4uSlider input[type=range] {
      -webkit-appearance: none;
      opacity: 1;
      border-radius: 5px;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
      width: 175px;
      height: 8px;
      padding: 5px 0; 
  } 

.w4uSlider input[orient=vertical] {
    writing-mode: bt-lr; /* IE */
    -webkit-appearance: slider-vertical; /* WebKit */
    width: 8px;
    height: 175px;
    padding: 0 5px; 
 }


.w4uSlider input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  cursor: pointer;
}

.w4uSlider input::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}

</style>
