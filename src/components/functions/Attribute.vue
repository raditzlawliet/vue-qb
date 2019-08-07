<template>
  <div :class="['vue-qb-function', ...templateOptions.functionsWrapperClass]">
    <div :class="['vue-qb-row', ...normalizedTemplateOptions.rowItemClass]">
      <div :class="['vue-qb-row-item', ...normalizedTemplateOptions.rowItemClass]">
        <select
          :class="['vue-qb-select', ...normalizedTemplateOptions.selectClass]"
          v-model="querylocal.value"
        >
          <option v-for="o in lAttributes" :key="o.id" :value="o.id">{{o.name}}</option>
        </select>
        <button
          :class="['vue-qb-btn', ...normalizedTemplateOptions.removeBtnClass]"
          v-show="optionslocal.removeable && querylocal.type"
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
    return {
      lAttributes: globalSettings.lAttributes
    };
  },
  methods: {
    getDefaultObject: function() {
      return {
        id: "",
        name: ""
      };
    },
    generateSQL: function() {
      return this.query.value ? this.query.value.id : "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
