<template>
  <div class="d-flex d-flex-row">
    <div class="flex-grow-1">
      <select :class="[...normalizedTemplateOptions.selectClass]" v-model="querylocal.value">
        <option v-for="o in lObjects" :key="o.id" :value="o.id">{{o.name}}</option>
      </select>
    </div>
    <div class="ml-2">
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
      lObjects: globalSettings.lObjects
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
