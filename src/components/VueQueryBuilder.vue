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
    EventBus.$on("update:complete-query", (path, query) => {
      console.log(
        "EB$on:update:complete-query>",
        path,
        JSON.stringify(query, null, "\t")
      );
      if (!path) {
        this.completeQuery = deepClone(query);
      } else {
        VueSet(this.completeQuery, path, deepClone(query));
      }
      this.$emit("update:complete-query", this.completeQuery);
    });
  },
  watch: {
    query: {
      handler: function(v) {
        // console.log("watch query", JSON.stringify(v));
        var nQuery = this.normalizeQuery(v);
        if (JSON.stringify(this.normalizedQuery) != JSON.stringify(nQuery)) {
          this.normalizedQuery = nQuery;
        }
        this.completeQuery = deepClone(this.normalizedQuery);
        // if (JSON.stringify(this.normalizedQuery) != JSON.stringify(v)) {
        //   console.log(
        //     "EB:update:query",
        //     JSON.stringify(this.normalizedQuery, null, "\t")
        //   );
        //   EventBus.$emit("update:query", this.normalizedQuery);
        // }
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
      var validQuery = deepClone(
        Object.assign(
          {
            uuid: this.generateUUID(),
            type: "",
            value: undefined,
            values: []
          },
          d
        )
      );
      validQuery.values.forEach((v, i) => {
        // if (!v.uuid) v.uuid = this.generateUUID();
        var validQueryInside = this.normalizeQuery(v);
        if (
          JSON.stringify(
            validQuery.values[i] != JSON.stringify(validQueryInside)
          )
        )
          validQuery.values.splice(i, 1, validQueryInside);
        // validQuery.values[i] = this.normalizeQuery(v);
      });
      return validQuery;
    }
  }
};
</script>

<style lang="scss">
</style>
