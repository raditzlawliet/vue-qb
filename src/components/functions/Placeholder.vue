<template>
  <div :class="[...normalizedTemplateOptions.functionsWrapperClass]">
    <component :is="{template:htmlTemplateWithWrapper}" ref="placeholder">
      <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </component>
    <button
      :class="[...normalizedTemplateOptions.removeBtnClass]"
      v-show="optionslocal.removeable && querylocal.type"
      @click="remove"
    >
      <slot name="btn-remove">X</slot>
    </button>
  </div>
</template>
<script>
import globalSettings from "@/components/globalSettings.js";

var defaultOptions = function() {
  return {
    removeable: true
  };
};

var defaultTemplateOptions = function() {
  return {
    template: "",
    options: {
      // all
      "": {
        selectorWrapperClass: [],
        functionsWrapperClass: [],
        buttonClass: []
      },
      // spesific
      value: {
        selectorWrapperClass: [],
        functionsWrapperClass: [],
        buttonClass: []
      }
    }
  };
};

var originalTemplateOptions = {
  // bootstrap 4
  "": {
    selectorWrapperClass: ["vue-qb-selector"],
    functionsWrapperClass: ["vue-qb-function"],
    removeBtnClass: ["vue-qb-btn"],
    addBtnClass: ["vue-qb-btn"],
    inputClass: ["vue-qb-input"],
    selectClass: ["vue-qb-select"],
    rowClass: ["vue-qb-row"],
    rowItemClass: ["vue-qb-row-item"],
    columnGrowClass: ["flex-grow-1"]
  },
  bs4: {
    selectorWrapperClass: ["form-group", "ml-2"],
    functionsWrapperClass: [],
    removeBtnClass: ["btn btn-danger btn-sm ml-2"],
    addBtnClass: ["btn btn-success btn-sm ml-2"],
    inputClass: ["form-control form-control-sm flex-grow-1"],
    selectClass: ["form-control form-control-sm flex-grow-1"],
    rowClass: ["row"],
    rowItemClass: ["col-md-12 d-flex flex-row"],
    columnGrowClass: ["flex-grow-1"]
  },
  bs3: {
    selectorWrapperClass: [""],
    functionsWrapperClass: [""],
    removeBtnClass: ["btn btn-danger btn-xs ml-2"],
    addBtnClass: ["btn btn-success btn-xs ml-2"],
    inputClass: ["form-control form-control-xs flex-grow-1"],
    selectClass: ["form-control form-control-xs flex-grow-1"],
    rowClass: ["row"],
    rowItemClass: ["col-md-12 d-flex flex-row"],
    columnGrowClass: ["flex-grow-1"]
  }
};

export default {
  props: {
    options: {
      type: Object,
      default: defaultOptions
    },
    templateOptions: {
      type: Object,
      default: defaultTemplateOptions
    },
    functionOptions: {
      type: Object,
      default: () => {
        return {
          htmlTemplate: '<dynamic-selector ref="val"></dynamic-selector>',
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
    }
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
      templateId: "placeholder",
      querylocal: this.normalizeQuery(this.query),
      optionslocal: this.normalizeOptions(this.options)
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
      if (this.functionOptions.generateSQL)
        return this.functionOptions.generateSQL.split(/#([\w]+)/);
      return [];
    },
    htmlTemplateWithWrapper() {
      // insert recursiveScope dari global ke dynamic-selector dan f- tag lainnya yg terdaftar
      const div = document.createElement("div");
      div.insertAdjacentHTML("afterbegin", this.functionOptions.htmlTemplate);
      Array.from(div.querySelectorAll("dynamic-selector")).forEach(el => {
        el.insertAdjacentHTML("afterbegin", globalSettings.recursiveScope);
      });
      // Object.keys(globalFunctions).forEach(id => {
      //   if (!id) return;
      //   Array.from(div.querySelectorAll(`f-${id}`)).forEach(el => {
      //     el.insertAdjacentHTML("afterbegin", globalSettings.recursiveScope);
      //   });
      // });
      return `<div>${div.innerHTML}</div>`;
    },
    normalizedTemplateOptions: function() {
      var coreOptions = {};
      if (
        Object.keys(originalTemplateOptions).includes(
          this.templateOptions.template
        )
      ) {
        coreOptions = originalTemplateOptions[this.templateOptions.template];
      }
      var globalOptions = this.templateOptions.options
        ? this.templateOptions.options[""]
        : {};
      var specOptions = this.templateOptions.options
        ? this.templateOptions.options[this.templateId]
        : {};

      specOptions = specOptions || {};
      globalOptions = globalOptions || {};

      var newOptions = Object.assign(specOptions, globalOptions, coreOptions);

      return newOptions;
    }
  },
  methods: {
    normalizeOptions: function(d) {
      return Object.assign(defaultOptions(), d);
    },
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
    },
    remove: function() {
      this.$emit("remove");
    }
    // onQueryUpdate: function(emitRef, value) {
    //   this.querylocal = this.normalizeQuery(value);
    // }
  }
};
</script>
<style lang="scss">
</style>
