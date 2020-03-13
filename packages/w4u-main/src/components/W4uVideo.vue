<template class="self">
  <span class='w4uVideo'>
     <video ref="w4uVideo" v-bind:controls="controls" v-bind:poster="poster"
                           v-bind:width="width" v-bind:height="height"
      >
        Your browser does not support the video tag.
        <slot></slot>         
     </video> 
     <w4u-io v-bind:name="name" v-bind:inputs="w4uStringIn" v-bind:outputs="w4uStringOut" > </w4u-io> 
  </span>  
</template>

<script>

  // Transparency
  // https://github.com/m90/seeThru
  // https://jakearchibald.com/scratch/alphavid/

  import W4uIo from "w4u-io";

  export default {
    props: {
            name: {type: String, default: 'video0'},          //automatic numbering would need glue for unique id...
            controls: {type: Boolean, default: false},
            poster: {type: String, default: ''},
            width:  {type: String, default: '375px'}, 
            height: {type: String, default: '375px'}
           },
    mixins: [W4uIo], 
    data: function() {
           return {
             w4uInputs:  {'play': {'value': 0.0, 'time':0.0 },
                          'fraction': {'value': 0.0, 'time':0.0 },
                          'volume': {'value': 0.5, 'time':0.0 }                      // player.volume
             },
             w4uOutputs: { 'fraction': {'value': 0.0, 'time':0.0 } }
            }
        },
      watch: {
       play: function (newValue) {
           console.log("play has new value: " + newValue);
           var player = this.$refs.w4uVideo;
           if(newValue > 0.5) {
              player.play();
           } else {
              player.pause();
           }
       },
       fraction: function (newValue) {
           console.log("fraction has new value: " + newValue);
           var player = this.$refs.w4uVideo;
           var currentTime = player.currentTime;
           var newTime = newValue * player.duration;
           if(Math.abs(newTime - currentTime) > 0.05) {
             player.currentTime = newTime;
           }
       },
      },
      methods: {
        timeUpdate() {
           var player = this.$refs.w4uVideo;
           var fractionTime = player.currentTime / player.duration;
           Vue.set(this.w4uOutputs, 'fraction', {'value': fractionTime, 'time': 0.1});
	},
         
      }, 
      computed: {  
        play:     function() { return this.w4uInputs.play.value; },
        fraction: function() { return this.w4uInputs.fraction.value; }, 
      },
      mounted() {
          var player = this.$refs.w4uVideo;
          player.ontimeupdate = this.timeUpdate; 
      }   
  }
</script>

<style scoped>
  .w4uStage2 {
    position: relative;
    width: 500px;
    height: 500px;
    border: solid 2px blue;
  }
  .w4uStage {
    width: 510px;
    height: 510px;
    border: solid 3px red;
  }
video::cue {
  background-image: linear-gradient(to bottom, dimgray, lightgray);
  color: papayawhip;
}

video::cue(b) {
  color: peachpuff;
}


</style>
