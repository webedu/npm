// Inserts marked global links in shadow dom
// use in combination with global links in main document, marked with w4u-type="global":
// <link rel="stylesheet" href="xxx/bootstrap.min.css" type="text/css" w4u-type="global"> 
// Add inside template: 
// <link v-for="href in globalCss" rel="stylesheet"  v-bind:href="href" type="text/css"> 

export default {
   data: function() {
      return {
               globalCss: [],
        }
   },
   mounted() {
      this.initw4uCss();
   },
   methods: { 
     initw4uCss() {
      this.globalCss = [];
      var all = document.getElementsByTagName("link");
      for (var i=0, max=all.length; i < max; i++) {
         if ("global" == all[i].getAttribute("w4u-type")) {
            if ("text/css" == all[i].getAttribute("type")) {
                this.globalCss.push(all[i].getAttribute("href"));
            }
         }
      }
     },
};
