<template>
  <form v-on:submit.prevent>
    <div class="form-group selector ml-2">
      <component
        :is="component"
        :query="querylocal"
        :emitRef="emitRef"
        v-if="component && !functionData.isTemplate"
        ref="elComponent"
        @query-update="onQueryUpdate"
      >
        <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </component>
      <component
        :is="component"
        :query="querylocal"
        :emitRef="emitRef"
        v-else-if="component && functionData.isTemplate"
        ref="elComponent"
        :templateOptions="functionData.templateOptions"
        @query-update="onQueryUpdate"
      >
        <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </component>
      <select class="form-control form-control-sm" v-model="querylocal.type" v-else>
        <option v-for="f in lFunctions" :key="f.id" :value="f.id">{{f.id}}</option>
      </select>
      <button class="btn btn-danger btn-sm" v-show="removeable && querylocal.type" @click="remove">X</button>
    </div>
  </form>
</template>
<script>
import global from "@/global.js";
import Placeholder from "./functions/Placeholder.vue";

export default {
  extends: Placeholder,
  props: {},
  computed: {
    loader() {
      if (this.querylocal.type) {
        var f = this.lFunctions[this.querylocal.type];
        if (f) {
          if (f.isTemplate) {
            f.component = () => import(`@/components/functions/Placeholder`);
          }
          if (f.component) return f;
        }
        // return () => import(`@/components/functions/${this.querylocal.type}`);
      }
      return null;
    }
  },
  mounted() {
    this.loadComponent();
  },
  watch: {
    "querylocal.type": function() {
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
      // this.querylocal.type = "";
      this.querylocal = this.getQueryModel();
    },
    removeable: function() {
      return true;
    },
    onQueryUpdate: function(emitRef, value) {
      this.querylocal = this.normalizeQuery(value);
      this.$emit("query-update", this.emitRef, this.querylocal);
      // console.log(emitRef, JSON.stringify(this.querylocal))
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
