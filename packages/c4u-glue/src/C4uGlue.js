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
          function (e, i, array) { return e != elem.c4uUid; }
       );
       // current id gets last element
       state.c4uCurrentIds[elem.c4uTag].push(elem.c4uUid);
    },
  }
})

let ucid = 1; 

function checkifChildBelowParentDOM(child, parent)
{
   // if there is a shadow-root, the usual children part will not be rendered
   if(parent.shadowRoot) {
      if (checkifChildBelowParentDOM(child, parent.shadowRoot)) {
         return true;
      }      
   } else {
      for(var i = 0; i < parent.children.length; i++) {
        var elem = parent.children[i];
        if (elem._wrapper && elem._wrapper.$el && elem._wrapper.$el.id == child.id) {
           return true;
        }
        if (checkifChildBelowParentDOM(child, elem)) {
           return true;
        } 
     } 
   }
   return false;
}
 
function checkIfChildBelowParentVue(child, parent)
{
  if (!child.$root.$el || !parent.$root.$el) {return false;}
  return checkifChildBelowParentDOM(child.$root.$el, parent.$root.$el);
}

export default {
   data: function() {
      return {
        c4uParentTag: "c4u-to-be-defined", // the tag, that should be the parent, i.e. c4u-tabs for c4u-tab. 
                                           // To be set individually.
        c4uParentId: -1,
        c4uUid: -1,
        c4uTag: "",
        c4uParent: null,                    // the parent component 
        c4uAncestor: null,                  // the ancestor component (similiar to parent, but maybe not nested) 
        c4uChildren: {},                    // list of components per tag
        }
    },
    methods: {
          c4uSend(name, value) {
             glueBus.$emit('c4u-emit-'+name, value);
          },
          c4uReceive(name, fnc) {
            glueBus.$on('c4u-emit-'+name, (v1) => fnc(v1));
          },
          c4uAddChild(child) {
            //console.log("ENtry received "+child.c4uParentId+" / "+ this.c4uUid+" / "+ child.c4uUid);
            if (this.c4uUid == child.c4uParentId) {
                //console.log(" ENtry accepted "+child.c4uParentId+" / "+ this.c4uUid+" / "+ child.c4uUid);
                child.c4uParent = this;     // maybe get changed later (if mounted)
                child.c4uAncestor = this;   // this is final here           
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
          c4uRecheckChild(child) {
             var childTag = child.c4uTag;
             var isInside = checkIfChildBelowParentVue(child, this);
             // remove from array
             if(childTag in this.c4uChildren) {
               this.c4uChildren[childTag] = this.c4uChildren[childTag].filter(
                 function (e, i, array) { return e.c4uUid != child.c4uUid; }
               );
             }
             if (isInside) {
                //console.log("Child inside "+ this.c4uUid+" / "+ child.c4uUid);
                child.c4uParent = this;
                child.c4uParentId = this.c4uUid;
                // add child to list
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
             } else {
                // already removed from list - so only reset child if necassary.  
                //console.log("Child outside "+ this.c4uUid+" / "+ child.c4uUid);
                if(child.c4uParentId == this.c4uUid) {
                  child.c4uParent = null;
                  child.c4uParentId = -1;
                } 
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
         glueBus.$on('c4u-add-child-'+this.c4uTag, (v1) => this.c4uAddChild(v1));
         glueStore.commit('c4uAddCurrentUid', this);  
         // send request as child to parent
         if (this.c4uParentId < 0) {
           // might better get list and check (inside event) until parent really has this child
           // but this check is only possible on parent.root.el.childNodes -> mounted
           this.c4uParentId = glueStore.getters.c4UGetLastUid(this.c4uParentTag); // last, might not real parent, but ancestor 
           glueBus.$emit('c4u-add-child-'+this.c4uParentTag, this);
         }
    }, 
    mounted() {
         this.$root.$el.id = 'c4uid-' + this.c4uUid;
         this.c4uTag = this.$root.$options.customElement.localName; 
         // receive/handle requests from child as parent 
         glueBus.$on('c4u-check-child-'+this.c4uTag, (v1) => this.c4uRecheckChild(v1));
         this.$nextTick( function () { 
            glueBus.$emit('c4u-check-child-'+this.c4uParentTag, this);
         });
         
         
         
    },
};
