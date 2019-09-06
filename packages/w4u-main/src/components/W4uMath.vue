<template>  
  <div class='w4uMath'>
  <div id='w4uMath' ref='w4uMath'>
     <div id='w4uMath1' ref='w4uMathPretty'>{{ pretty }} </div>
     <div id='w4uMath2' ref='w4uMathResult'>{{ result }} </div>
  </div>
  <slot></slot>
 </div> 
</template>
  
<style scoped>
  .w4uSvg { 
    background: orange;
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  import { create, all } from 'mathjs'
  const config = { }
  const math = create(all, config)


  //import MathJax from "mathjax3";
  //import MathJax from "mathjax";

  export default {
    data: function() {
           return {
            c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            form0: '5 sqrt(75 / 3) + det([[-1, 2], [3, 1]]) - sin(pi / 4)^2',
	    pretty: '$$$$',
	    result: '???'
            }
        },
    mixins: [C4uGlue], 

    mounted() {
         console.log("*****  Math mounted #" + this.c4uUid);

          this.result = math.format(math.evaluate(this.form0));
	  var latex = math.parse(this.form0).toTex({parenthesis: 'auto', implicit: 'hide'});
	  console.log('LaTeX expression:', latex)
/*
require('mathjax').init({
  loader: {load: ['input/tex', 'output/svg']}
}).then((MathJax) => {
  const svg = MathJax.tex2svg('\\frac{1}{x^2-1}', {display: true});
  console.log(MathJax.startup.adaptor.outerHTML(svg));
}).catch((err) => console.log(err.message));
*/

/*
 MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    },
    "HTML-CSS": { fonts: ["TeX"] }
  });

MathJax.Hub.Config({
  jax: ["input/TeX","input/MathML","input/AsciiMath","output/CommonHTML"],
  extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js","AssistiveMML.js", "a11y/accessibility-menu.js"],
  TeX: {
    extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
  }
});
*/
          var el = this.$refs.w4uMathPretty;
	  const elem = MathJax.Hub.getAllJax(el)[0];
	  MathJax.Hub.Queue(['Text', elem, latex]);
       
         
    },

  }
</script>
