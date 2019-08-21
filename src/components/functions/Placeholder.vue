<template>
  <div :class="[...normalizedTemplateOptions.options.formGroupClass]">
    <component :is="{template:htmlTemplateWithWrapper}" ref="placeholder" :rules="rules">
      <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </component>
    <button
      :class="[...normalizedTemplateOptions.options.removeBtnClass]"
      v-show="optionslocal.removeable && querylocal.type"
      @click="remove"
    >
      <slot name="btn-remove">X</slot>
    </button>
  </div>
</template>
<script>
import globalSettings from "@/components/globalSettings.js";
import { EventBus } from "@/components/event-bus.js";
import { uuid } from "vue-uuid";

var generateUUID = function() {
  return uuid.v1();
};
var getQueryModel = function() {
  return {
    uuid: generateUUID(),
    type: "",
    value: undefined,
    values: []
  };
};
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
        formRowClass: [],
        formGroupClass: [],
        buttonClass: []
      },
      // spesific
      value: {
        formRowClass: [],
        formGroupClass: [],
        buttonClass: []
      }
    }
  };
};

var originalTemplateOptions = {
  // bootstrap 4
  "": {
    formRowClass: ["vue-qb-selector"],
    formGroupClass: ["vue-qb-function"],

    rowClass: ["vue-qb-row"],
    rowItemClass: ["vue-qb-row-item"],
    columnGrowClass: ["flex-grow-1"],

    removeBtnClass: ["vue-qb-btn"],
    addBtnClass: ["vue-qb-btn"],
    inputClass: ["vue-qb-input"],
    selectClass: ["vue-qb-select"]
  },
  bs4: {
    formRowClass: ["form-row mb-0"],
    formGroupClass: ["form-group col-auto mb-0"],
    rowClass: ["form-row"],
    rowItemClass: ["form-group col-md-12 d-flex flex-row mb-1"],
    inlineClass: ["d-flex flex-row"],

    columnGrowClass: ["flex-grow-1"],
    columnClass: [""],
    tabClass: ["ml-2"],
    tabRightClass: ["mr-2"],

    removeBtnClass: ["btn btn-danger btn-sm"],
    addBtnClass: ["btn btn-success btn-sm ml-2"],
    inputClass: ["form-control form-control-sm"],
    selectClass: ["form-control form-control-sm"]
  },
  bs3: {
    formRowClass: [""],
    formGroupClass: [""],
    rowClass: ["row"],
    rowItemClass: ["col-md-12 d-flex flex-row"],
    columnGrowClass: ["flex-grow-1"],

    removeBtnClass: ["btn btn-danger btn-sm"],
    addBtnClass: ["btn btn-success btn-sm"],
    inputClass: ["form-control form-control-sm"],
    selectClass: ["form-control form-control-sm"]
  }
};

export default {
  props: {
    // query path of root
    path: {
      type: String,
      default: ""
    },
    // options for component
    options: {
      type: Object,
      default: defaultOptions
    },
    // template options from root
    templateOptions: {
      type: Object,
      default: defaultTemplateOptions
    },
    // list of function from root
    functionOptions: {
      type: Object,
      default: () => {
        return {
          htmlTemplate: '<dynamic-selector ref="val"></dynamic-selector>',
          generateSQL: "#val"
        };
      }
    },
    // query from parent/root
    query: {
      type: Object,
      default: function() {
        var query = getQueryModel();
        return query;
      }
    },
    rules: {
      type: Object,
      default: function() {
        return {};
      }
    },
    depth: {
      type: Number,
      default: () => 0
    }
  },
  watch: {
    query: {
      handler: function(v) {
        var nQuery = this.normalizeQuery(v);
        if (JSON.stringify(this.querylocal) != JSON.stringify(nQuery)) {
          this.querylocal = nQuery;
        }
      },
      deep: true,
      immediate: true
    },
    querylocal: {
      handler: function(newVal) {
        EventBus.$emit("update:complete-query", this.path, newVal);
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      templateId: "placeholder",
      querylocal: this.normalizeQuery(this.query),
      optionslocal: this.normalizeOptions(this.options),
      ruleslocal: this.normalizeRules(this.rules)
    };
  },
  mounted() {
    // forcing all component to update querylocal
    EventBus.$on("update:query", query => {
      this.querylocal = this.normalizeQuery(this.query);
    });
  },
  computed: {
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

      var newOptions = {
        template: this.templateOptions.template,
        options: Object.assign(specOptions, globalOptions, coreOptions)
      };

      return newOptions;
    }
  },
  methods: {
    generateUUID: generateUUID,
    normalizeRules: function(d) {
      for (var key in d) {
        d[key] = Object.assign(
          {
            label: "",
            maxDepth: -1
          },
          d[key]
        );
      }
      return d;
    },
    normalizeOptions: function(d) {
      return Object.assign({}, defaultOptions(), d);
    },
    normalizeQuery: function(d) {
      var validQuery = Object.assign({}, this.getQueryModel(), d);
      validQuery.values.forEach((v, i) => {
        validQuery.values[i] = this.normalizeQuery(v);
      });
      return validQuery;
    },
    getQueryModel: getQueryModel,
    generateSQL: function() {
      if (!this.generateSQLNodes) return "";
      var sql = "";
      this.generateSQLNodes.forEach((node, i) => {
        if (i % 2) {
          try {
            sql += this.$refs.placeholder.$refs[node].generateSQL();
            return;
          } catch (e) {}
        }
        sql += node;
      });
      return sql;
    },
    remove: function() {
      this.$emit("remove");
    }
  }
};
</script>
<style lang="scss">
</style>
