<template>
  <div class="functions">
    <component :is="{template:templateWithWrapper}" ref="placeholder" />
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
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    generateSQLNodes() {
      if (this.templateOptions.generateSQL)
        return this.templateOptions.generateSQL.split(/#([\w]+)/);
      return [];
    },
    templateWithWrapper() {
      return `<div>${this.templateOptions.template}</div>`;
    }
  },
  methods: {
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
            console.error(e.stack);
          }
        }
        sql += node;
      });
      return sql;
    },
    getData: function() {
      return {};
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
