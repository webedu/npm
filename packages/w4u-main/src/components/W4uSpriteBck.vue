<template class="self">
  <span class='w4uSprite'>
     <span v-html="w4uStyle"></span>
     <c4u-in v-for="(inData, inName) in c4uInputs" v-bind:name="name+'-'+inName" v-bind:value="inData.value" v-bind:key="inName"></c4u-in>
     <!-- c4u-in v-for="(inData, inName) in c4uInputs" v-bind:name="name+'-'+inName" v-model="inData.value" v-bind:key="inName"></c4u-in -->
     <span class="w4uSprite2"> 
       <slot></slot>  
     </span>
  </span>  
</template>

<script>
  //import C4uGlue from "c4u-glue";

  export default {
    props: {
            name: {type: String, default: 'sprite0'},          //automatic numbering would need glue for unique id...
            // width:  175px 
            // height: 175px
            // bumping: xxx  // behavior on border  
           },
    data: function() {
           return {
             c4uInputs: {
                          'x': {'value': 0.5, 'time':0.0 },
                          'y': {'value': 0.5, 'time':0.0 }
             }
            }
        },
    //mixins: [C4uGlue], 
 
    methods: { 
    initC4uIn() {
       for(var inpName in this.c4uInputs) {
         if(this.c4uInputs.hasOwnProperty(inpName)) {
            var inpData = this.c4uInputs[inpName];
            var name = this.name + '-' + inpName;
            this.$el.addEventListener('c4uIn-changed-'+name, (v1) => this.c4uInChanged(v1.detail.name, v1.detail.value));
         }
       }
     },
    c4uInChanged(name, value) {
       //this.inputValues[name] = {'value': value, 'time': 0.1};
       var inpName = name.slice(this.name.length+1);  // +1 as this.name+'-'+inpName is used...  
       Vue.set(this.c4uInputs, inpName, {'value': value, 'time': 0.1});
    },
    valueIn(e) {
	  //this.slidervalue = e.target.value;
	  //this.load(this.slidervalue);
          e.stopPropagation();
          this.xPosition = parseFloat(e.detail)/1000.0;
          console.log('value In from somewhere');
	},
    inValue: function() {
         return this.$el.children[1].attributes.value.nodeValue;
      }  
    },
    computed: {
      w4uStyle: function() {
         return '<style>' 
              + '.w4uSprite2 { left: '+Math.round(100*this.c4uInputs.x.value).toString()+'px ; } '
              + '.w4uSprite2 { bottom: '+Math.round(100*this.c4uInputs.y.value).toString()+'px ; } ' 
              + '</style>';
      },

   
    }, 
    created() {
         //console.log("***** Slot-2nd-created " + " #" + this.c4uUid); 
    },
    mounted() {
         //this.$el.addEventListener('c4uIn-changed-'+this.name+'-x', (v1) => this.valueIn(v1));
         this.initC4uIn();
    },
    updated() {
         //console.log("***** Slot-2nd-updated " + " #" + this.c4uUid);
    },
    beforeDestroy() {
         //console.log("***** Slot-2nd-destroyed " + " #" + this.c4uUid);
    },

  }
</script>

<style scoped>
  .w4uSprite2 {
    position: absolute;

  }
</style>
