<template>
  <div class="vue-qb-selector">
    <form
      v-on:submit.prevent
      class="border-left border-primary mb-1 pl-1 rounded"
      v-if="normalizedTemplateOptions.template =='bs4'"
    >
      <div class="form-row">
        <div class="form-group col-12 mb-2">
          <component
            :is="component"
            :query="querylocal"
            v-if="component && !functionData.isTemplate"
            ref="elComponent"
            @remove="componentOnRemove"
            :templateOptions="templateOptions"
            :path="`${path}`"
          >
            <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
            <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
              <slot :name="name" v-bind="slotData" />
            </template>
          </component>
          <component
            :is="component"
            :query="querylocal"
            v-else-if="component && functionData.isTemplate"
            ref="elComponent"
            :functionOptions="functionData.functionOptions"
            @remove="componentOnRemove"
            :templateOptions="templateOptions"
            :path="`${path}`"
          >
            <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
            <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
              <slot :name="name" v-bind="slotData" />
            </template>
          </component>
          <select
            :class="[...normalizedTemplateOptions.options.selectClass]"
            v-model="querylocal.type"
            v-else
          >
            <option v-for="f in lFunctions" :key="f.id" :value="f.id">{{f.id}}</option>
          </select>
          <!-- <button class="btn btn-danger btn-sm" v-show="removeable && querylocal.type" @click="remove">X</button> -->
        </div>
      </div>
    </form>
    <form class v-on:submit.prevent v-else-if="normalizedTemplateOptions.template =='bs3'">
      <div class="row">
        <div class="col-xs-12">
          <div class="mb-2 pl-1 border-left border-primary rounded">
            <component
              :is="component"
              :query="querylocal"
              v-if="component && !functionData.isTemplate"
              ref="elComponent"
              @remove="componentOnRemove"
              :templateOptions="templateOptions"
              :path="`${path}`"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </component>
            <component
              :is="component"
              :query="querylocal"
              v-else-if="component && functionData.isTemplate"
              ref="elComponent"
              :functionOptions="functionData.functionOptions"
              @remove="componentOnRemove"
              :templateOptions="templateOptions"
              :path="`${path}`"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </component>
            <select
              :class="[...normalizedTemplateOptions.options.selectClass]"
              v-model="querylocal.type"
              v-else
            >
              <option v-for="f in lFunctions" :key="f.id" :value="f.id">{{f.id}}</option>
            </select>
            <!-- <button class="btn btn-danger btn-sm" v-show="removeable && querylocal.type" @click="remove">X</button> -->
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import globalFunctions from "@/components/globalFunctions.js";
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
      lFunctions: globalFunctions,
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
    componentOnRemove: function() {
      this.querylocal = this.getQueryModel();
    }
  }
};
</script>

<style lang="scss">
// @import "../assets/sass/mixins.scss";
</style>
