// use in combination with w4u-io:
// <w4u-io v-bind:name="name" v-bind:inputs="w4uStringIn" v-bind:outputs="w4uStringOut"></w4u-io>
// then use compute on w4uInputs

export default {
   data: function() {
      return {
        w4uInputs:  {},   // the named list of input plugs {'name': {'value': 0.5, 'time': 0.3}, ...} 
        w4uOutputs: {},   // the named list of input plugs {'name': {'value': 0.5, 'time': 0.3}, ...} 
        }
    },
   methods: { 
     initw4uIn() {
       for(var inpName in this.w4uInputs) {
         if(this.w4uInputs.hasOwnProperty(inpName)) {
            var inpData = this.w4uInputs[inpName];
            var name = this.name + '-' + inpName;
            this.$el.addEventListener('c4uIn-changed-'+name, (event) => this.w4uInChanged(event));
         }
       }
     },
     stopw4uIn() {   
       for(var inpName in this.w4uInputs) {
         if(this.w4uInputs.hasOwnProperty(inpName)) {
            var inpData = this.w4uInputs[inpName];
            var name = this.name + '-' + inpName;
            this.$el.removeEventListener('c4uIn-changed-'+name, (event) => this.w4uInChanged(event));
         }
       }
     },
     c4uParentDisconnected(parent) {
       this.stopw4uIn();
     }, 
     c4uParentReconnected(parent) {
       this.stopw4uIn();
       this.initw4uIn();
     },  
     w4uInChanged(event) {
       event.stopPropagation();
       var name = event.detail.name;
       var value = parseFloat(event.detail.value);
       var inpName = name.slice(this.name.length+1);  // +1 as this.name+'-'+inpName is used...  
       Vue.set(this.w4uInputs, inpName, {'value': value, 'time': 0.1});
     }
    },
   computed: {
      w4uStringIn: function() {return JSON.stringify(this.w4uInputs);}, 
      w4uStringOut: function() {return JSON.stringify(this.w4uOutputs);} 
    }, 
   mounted() {
      this.initw4uIn();
   },
};
