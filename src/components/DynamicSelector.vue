<template>
  <div class="selector">
    <component
      :is="component"
      :type="type"
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
      :type="type"
      v-else-if="component && functionData.isTemplate"
      ref="elComponent"
      :templateOptions="functionData.templateOptions"
    >
      <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </component>
    <select v-model="type" v-else>
      <option v-for="f in lFunctions" :key="f.id" :value="f.id">{{f.id}}</option>
    </select>
    <button v-show="removeable && type" @click="remove">X</button>
  </div>
</template>
<script>
import global from "@/global.js";

const defaultStyles = {
  left: 0,
  right: 0
};

export default {
  props: {
    // lFunctions: {
    //   type: Object,
    //   default: () => global.lFunctions
    // }
  },
  computed: {
    loader() {
      if (this.type) {
        var f = this.lFunctions[this.type];
        if (f) {
          if (f.isTemplate) {
            f.component = () => import(`@/components/functions/Placeholder`);
          }
          if (f.component) return f;
        }
        // return () => import(`@/components/functions/${this.type}`);
      }
      return null;
    }
  },
  mounted() {
    this.loadComponent();
  },
  watch: {
    type: function() {
      this.loadComponent();
    }
  },
  data() {
    return {
      lFunctions: global.lFunctions,
      component: null,
      functionData: {},
      type: "",
      bannerStyles: {
        ...defaultStyles,
        ...this.styles
      }
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
      this.type = "";
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
