<template>
  <div :class="[...normalizedTemplateOptions.functionsWrapperClass]">
    <div :class="[...normalizedTemplateOptions.rowItemClass]">
      <select :class="[...normalizedTemplateOptions.selectClass]" v-model="querylocal.value">
        <option v-for="o in lAttributes" :key="o.id" :value="o.id">{{o.name}}</option>
      </select>
      <button
        :class="[...normalizedTemplateOptions.removeBtnClass]"
        v-show="optionslocal.removeable && querylocal.type"
        @click="remove"
      >
        <slot name="btn-remove">X</slot>
      </button>
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
