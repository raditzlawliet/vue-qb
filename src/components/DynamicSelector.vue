<template>
  <div class="selector">
    <component :is="component" :type="type" v-if="component" ref="elComponent" />
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
    lFunctions: {
      type: Object,
      default: () => global.lFunctions
    }
  },
  computed: {
    loader() {
      if (this.type) {
        var f = this.lFunctions[this.type];
        if (f) return f.component;
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
      component: null,
      type: "",
      bannerStyles: {
        ...defaultStyles,
        ...this.styles
      }
    };
  },
  methods: {
    loadComponent: function() {
      if (this.loader)
        this.loader()
          .then(() => {
            this.component = () => this.loader();
          })
          .catch(() => {
            this.component = null;
          });
      else this.component = null;
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
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
