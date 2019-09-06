<template class="self">
  <span class='c4uIn'>
  <slot></slot> 
  </span>  
</template>

<style scoped>
  .c4uIn {  }
</style>

<script>
  import C4uGlue from "c4u-glue";
  
  export default { 
    props: {name: String, value: Number},
    data: function() {
           return {
            c4uParentTag: "c4u-circuitry",
            c4uOldValue: null
            }
        },
    mixins: [C4uGlue], 
    methods: { 
       changeInValue: function(value) {
          // this.value = value;  // no direct change on own props recommended
          if(value != this.c4uOldValue) {
             this.c4uOldValue = value;
             //console.log("c4uIn [#"+this.c4uUid+"] receives new value A: " + value);
             // this.$emit('input', value); would only be needed for v-model bind ... 
             var details = {'name': this.name, 'value': value, 'time': 0.1}
             var event = new CustomEvent('c4uIn-changed-'+this.name, {"bubbles":true, "composed":true, "detail": details});
             this.$el.dispatchEvent(event);
         }
       }
    },
    mounted() {
         //console.log("***** Slot-2nd-mounted " + " #" + this.c4uUid);
         this.changeInValue(this.value); 
    },
  }
</script>
