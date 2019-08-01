<template>
  <div class="functions">
    <component :is="{template:templateWithWrapper}" />
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
    }
  },
  data() {
    return {
      type: ""
    };
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
        if (node % 2) {
          if (this.$refs[node]) {
            sql += this.$refs[node].generateSQL();
            return;
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
