<template>
  <div :data-depth="depth">
    <div
      class="d-flex d-flex-row"
      v-if="['bs4', 'bs3'].includes(normalizedTemplateOptions.template)"
    >
      <div class="flex-grow-1">
        <select
          :class="[...normalizedTemplateOptions.options.selectClass]"
          v-model="querylocal.value"
        >
          <option v-for="o in lAttributes" :key="o.id" :value="o.id">{{o.name}}</option>
        </select>
      </div>
      <div class="ml-2">
        <button
          :class="[...normalizedTemplateOptions.options.removeBtnClass]"
          v-show="myrule.isRemoveable(myrule, depth, querylocal) && querylocal.type"
          @click="remove"
        >
          <slot name="btn-remove">X</slot>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Placeholder from "./Placeholder.vue";
import globalSettings from "@/components/globalSettings.js";

export default {
  extends: Placeholder,
  props: {},
  data() {
    return {};
  },
  watch: {
    "querylocal.value": function(v) {
      if (this.lAttributes[v])
        this.querylocal.sqlValue = this.lAttributes[v].sqlValue;
    }
  },
  computed: {
    lAttributes() {
      return this.ruleslocal[this.querylocal.type]
        ? this.ruleslocal[this.querylocal.type].list()
        : {};
      // return {};
    }
  },
  methods: {
    getQueryModel: function() {
      return {
        uuid: this.generateUUID(),
        type: "",
        values: [],
        value: "",
        sqlValue: ""
      };
    },
    getDefaultObject: function() {
      return {
        id: "",
        name: ""
      };
    },
    generateSQL: function() {
      return this.querylocal.sqlValue ? this.querylocal.sqlValue : "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
