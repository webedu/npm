import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const glueBus = new Vue();

const glueStore = new Vuex.Store({
  state: {
    c4uCurrentIds: {"empty": [0,1]}, // list of ids per tag {"c4u-tabs: [2,5], "c4u-tab: [6,7,8]" }
  },
  getters: {
    c4UGetLastUid: (state) => (tag) => {
       if(tag in state.c4uCurrentIds) {
          var id_list = state.c4uCurrentIds[tag];
          return id_list[id_list.length - 1];
        } else {
          return -1;  
        } 
    },
  },
  mutations: {
    c4uAddCurrentUid(state, elem) {
       // console.log(" Add state "+elem.c4uTag+" / "+ elem.c4uUid);
       if(!(elem.c4uTag in state.c4uCurrentIds)) {
          state.c4uCurrentIds[elem.c4uTag] = [];
       }
       // remove current id if allready inside the list
       state.c4uCurrentIds[elem.c4uTag] = state.c4uCurrentIds[elem.c4uTag].filter(
          function (e, i, array) { return e != elem.c4uTag; }
       );
       // current id gets last element
       state.c4uCurrentIds[elem.c4uTag].push(elem.c4uUid);
    },
  }
})

let ucid = 1;

export default {
   data: function() {
      return {
        c4uParentTag: "c4u-to-be-defined", // the tag, that should be the parent, i.e. c4u-tabs for c4u-tab. 
                                           // To be set individually.
        c4uParentId: -1,
        c4uUid: -1,
        c4uTag: "",
        c4uParent: null,                    // the parent component  
        c4uChildren: {},                    // list of components per tag
        }
    },
    methods: {
          c4uAddChild(child) {
            //console.log("ENtry received "+child.c4uParentId+" / "+ this.c4uUid+" / "+ child.c4uUid);
            if (this.c4uUid == child.c4uParentId) {
                //console.log(" ENtry accepted "+child.c4uParentId+" / "+ this.c4uUid+" / "+ child.c4uUid);
                child.c4uParent = this;               
                var childTag = child.c4uTag;
                var uniqueElements = new Array();
                if(childTag in this.c4uChildren) {
                  this.c4uChildren[childTag].forEach(elem => {
                    uniqueElements[elem.c4uUid] = elem;
                  })
                }
                uniqueElements[child.c4uUid] = child;
                var newChildren = new Array();
                for (var items in uniqueElements){
                  newChildren.push( uniqueElements[items] );
                }
                this.c4uChildren[childTag] = newChildren;
            }
          }, 
    },

    created() {
         if (this.c4uUid < 0) {
           this.c4uUid = ucid;
           ucid++;
         }
         this.c4uTag = this.$root.$options.customElement.localName; 
         // receive/handle requests from child as parent 
         glueBus.$on('c4u-add+child-'+this.c4uTag, (v1) => this.c4uAddChild(v1));
         glueStore.commit('c4uAddCurrentUid', this);  
         // send request as child to parent
         if (this.c4uParentId < 0) {
           // might better get list and check (inside event) until parent really has this child
           // but this check is only possible on parent.root.el.childNodes -> mounted
           this.c4uParentId = glueStore.getters.c4UGetLastUid(this.c4uParentTag); // last, might not real parent, but ancestor 
           glueBus.$emit('c4u-add+child-'+this.c4uParentTag, this);
         }
    }, 
    mounted() {
         this.$root.$el.id = 'c4uid-' + this.c4uUid;
    },
};
