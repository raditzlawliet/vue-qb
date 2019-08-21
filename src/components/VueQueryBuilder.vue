<template>
  <div class="vue-qb">
    <dynamic-selector
      ref="vqb"
      :query="postQuery"
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
    // post query update
    EventBus.$on("post-query-update", (path, query) => {
      if (!path) {
        this.postQuery = query;
      } else {
        VueSet(this.postQuery, path, query);
      }
    });

    // for uses
    EventBus.$on("query-update", (path, query) => {
      // console.log(path, JSON.stringify(query));
      if (!query) return;
      if (!path) {
        this.resultQuery = JSON.parse(JSON.stringify(query));
      } else {
        VueSet(this.resultQuery, path, JSON.parse(JSON.stringify(query)));
      }
      this.$emit("query-update", this.resultQuery); // emit to uses
    });
  },
  watch: {
    query: {
      handler: function(query) {
        this.postQuery = this.normalizeQuery(query);
        this.resultQuery = this.normalizeQuery(query);
        this.$emit("query-update", this.resultQuery); // emit to uses
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      postQuery: this.normalizeQuery(this.query),
      resultQuery: this.normalizeQuery(this.query)
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
    getResultQuery: function() {
      return this.resultQuery;
    },
    normalizeQuery: function(d) {
      var query = Object.assign(
        {},
        {
          uuid: this.generateUUID(),
          type: "", // for type
          value: undefined, // for value
          values: [] // for array
        },
        d
      );
      query.values.forEach((q, i) => {
        query.values[i] = this.normalizeQuery(q);
      });
      return query;
    }
  }
};
</script>

<style lang="scss">
// @import "../assets/sass/mixins.scss";
</style>
