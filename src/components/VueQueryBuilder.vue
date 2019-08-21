<template>
  <div class="vue-qb">
    <dynamic-selector
      ref="vqb"
      :query="normalizedQuery"
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
import deepClone from "@/utilities.js";
import { uuid } from "vue-uuid";

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
      if (!path) {
        this.completeQuery = deepClone(query);
      } else {
        VueSet(this.completeQuery, path, deepClone(query));
      }
      this.$emit("query-update", this.completeQuery);
    });
  },
  watch: {
    query: {
      handler: function(v) {
        this.normalizedQuery = deepClone(this.normalizeQuery(v));
        this.completeQuery = deepClone(this.normalizedQuery);
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      normalizedQuery: {},
      completeQuery: {}
    };
  },
  methods: {
    generateUUID: function() {
      return uuid.v1();
    },
    generateSQL: function() {
      if (this.$refs.vqb) return this.$refs.vqb.generateSQL();
      return "";
    },
    normalizeQuery: function(d) {
      var validQuery = Object.assign(
        {
          uuid: this.generateUUID(),
          type: "",
          value: undefined,
          values: []
        },
        d
      );
      validQuery.values.forEach((v, i) => {
        validQuery.values[i] = this.normalizeQuery(v);
      });
      return validQuery;
    }
  }
};
</script>

<style lang="scss">
// @import "../assets/sass/mixins.scss";
</style>
