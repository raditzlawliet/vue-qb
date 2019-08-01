<template>
  <div class="selector">
    <component
      :is="component"
      :query="query"
      v-if="component && !functionData.isTemplate"
      ref="elComponent"
    >
      <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </component>
    <component
      :is="component"
      :query="query"
      v-else-if="component && functionData.isTemplate"
      ref="elComponent"
      :templateOptions="functionData.templateOptions"
    >
      <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </component>
    <select v-model="query.type" v-else>
      <option v-for="f in lFunctions" :key="f.id" :value="f.id">{{f.id}}</option>
    </select>
    <button v-show="removeable && query.type" @click="remove">X</button>
  </div>
</template>
<script>
import global from "@/global.js";
import Placeholder from "./functions/Placeholder.vue";

export default {
  extends: Placeholder,
  props: {},
  computed: {
    loader() {
      if (this.query.type) {
        var f = this.lFunctions[this.query.type];
        if (f) {
          if (f.isTemplate) {
            f.component = () => import(`@/components/functions/Placeholder`);
          }
          if (f.component) return f;
        }
        // return () => import(`@/components/functions/${this.query.type}`);
      }
      return null;
    }
  },
  mounted() {
    this.loadComponent();
  },
  watch: {
    "query.type": function() {
      this.loadComponent();
    }
  },
  data() {
    return {
      lFunctions: global.lFunctions,
      component: null,
      functionData: {}
    };
  },
  methods: {
    loadComponent: function() {
      if (this.loader && this.loader.component)
        this.loader
          .component()
          .then(() => {
            this.component = () => this.loader.component();
            this.functionData = this.loader;
          })
          .catch(() => {
            this.component = null;
            this.functionData = null;
          });
      else {
        this.component = null;
        this.functionData = null;
      }
    },
    generateSQL: function() {
      if (this.$refs.elComponent) return this.$refs.elComponent.generateSQL();
      return "";
    },
    remove: function() {
      this.query.type = "";
    },
    removeable: function() {
      return true;
    },
    setData: function(d) {}
  }
};
</script>

<style lang="scss" scoped>
</style>
