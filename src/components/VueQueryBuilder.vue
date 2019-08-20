<template>
  <div class="vue-qb">
    <dynamic-selector
      ref="vqb"
      :query="query"
      :templateOptions="templateOptions"
      :rules="rules"
    ></dynamic-selector>
  </div>
</template>

<script>
import globalSettings from "@/components/globalSettings.js";
import DynamicSelector from "@/components/DynamicSelector.vue";
import { vueSet as VueSet } from "vue-deepset";
import { EventBus } from "@/components/event-bus.js";

export default {
  props: {
    templateOptions: {
      type: Object
    },
    query: {
      type: Object
    },
    rules: {
      type: Object,
      default: function() {
        return globalSettings.lRules;
      }
    }
  },
  components: {
    DynamicSelector
  },
  computed: {},
  mounted() {},
  created() {
    EventBus.$on("query-update", (path, query) => {
      // query update inside component
      if (!path) {
        this.completeQuery = this.normalizeQuery(query);
        // this.completeQuery = query;
      } else {
        VueSet(this.completeQuery, path, this.normalizeQuery(query));
      }
      // console.log(path);
      this.$emit("query-update", this.completeQuery); // emit to root component
    });
  },
  watch: {},
  data() {
    return {
      completeQuery: this.normalizeQuery(this.query)
    };
  },
  methods: {
    generateSQL: function() {
      if (this.$refs.vqb) return this.$refs.vqb.generateSQL();
      return "";
    },
    normalizeQuery: function(d) {
      return Object.assign(
        {
          type: "", // for type
          value: undefined, // for value
          values: [] // for array
        },
        d
      );
    }
  }
};
</script>

<style lang="scss">
// @import "../assets/sass/mixins.scss";
</style>
