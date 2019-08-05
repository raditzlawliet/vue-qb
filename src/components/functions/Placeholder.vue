<template>
  <div class="functions">
    <component :is="{template:templateWithWrapper}" ref="placeholder">
      <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </component>
  </div>
</template>
<script>
import global from "@/global.js";
export default {
  props: {
    templateOptions: {
      type: Object,
      default: () => {
        return {
          template: '<dynamic-selector ref="val"></dynamic-selector>',
          generateSQL: "#val"
        };
      }
    },
    query: {
      type: Object,
      default: function() {
        return {
          type: "", // for type
          // value: undefined, // for value
          values: [] // for array
        };
      }
    },
    emitRef: {
      type: String,
      default: "value"
    },
  },
  watch: {
    querylocal: {
      handler: function(newVal) {
        // console.log(JSON.stringify(newVal))
        this.$emit("query-update", this.emitRef, newVal);
      },
      deep: true
    }
  },
  data() {
    return {
      querylocal: this.normalizeQuery(this.query)
    };
  },
  mounted() {},
  computed: {
    // [read-only] use this to avoid nested object null
    // normalizedQuery() {
    //   return Object.assign(
    //     {
    //       type: "", // for type
    //       // value: undefined, // for value
    //       values: [] // for array
    //     },
    //     this.querylocal
    //   );
    // },
    generateSQLNodes() {
      if (this.templateOptions.generateSQL)
        return this.templateOptions.generateSQL.split(/#([\w]+)/);
      return [];
    },
    templateWithWrapper() {
      // insert recursiveScope dari global ke dynamic-selector dan f- tag lainnya yg terdaftar
      const div = document.createElement("div");
      div.insertAdjacentHTML("afterbegin", this.templateOptions.template);
      Array.from(div.querySelectorAll("dynamic-selector")).forEach(el => {
        el.insertAdjacentHTML("afterbegin", global.recursiveScope);
      });
      Object.keys(global.lFunctions).forEach(id => {
        if (!id) return;
        Array.from(div.querySelectorAll(`f-${id}`)).forEach(el => {
          el.insertAdjacentHTML("afterbegin", global.recursiveScope);
        });
      });
      return `<div>${div.innerHTML}</div>`;
    }
  },
  methods: {
    normalizeQuery: function(d) {
      return Object.assign(
        {
          type: "", // for type
          // value: undefined, // for value
          values: [] // for array
        },
        d
      );
    },
    getQueryModel: function() {
      return {
        type: "", // for type
        // value: undefined, // for value
        values: [] // for array
      };
    },
    generateSQL: function() {
      if (!this.generateSQLNodes) return "";
      var sql = "";
      this.generateSQLNodes.forEach((node, i) => {
        if (i % 2) {
          try {
            // console.log(node, this.$refs.placeholder);
            // console.log(this.$refs.placeholder.$refs[node]);
            sql += this.$refs.placeholder.$refs[node].generateSQL();
            return;
          } catch (e) {
            // console.error(e.stack);
          }
        }
        sql += node;
      });
      return sql;
    },
    onQueryUpdate: function(emitRef, value) {
      this.querylocal[emitRef] = this.normalizeQuery(value);
      this.$emit("query-update", this.emitRef, this.querylocal);
      // console.log(emitRef, JSON.stringify(this.querylocal));
    }
    // onQueryUpdate: function(emitRef, value) {
    //   this.querylocal = this.normalizeQuery(value);
    // }
  }
};
</script>
<style lang="scss" scoped>
</style>
