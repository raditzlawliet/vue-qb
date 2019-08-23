<template>
  <div :data-depth="depth">
    <div
      class="d-flex d-flex-row"
      v-if="['bs3', 'bs4'].includes(normalizedTemplateOptions.template)"
    >
      <div class="flex-grow-1">
        <input
          :class="[...normalizedTemplateOptions.options.inputClass]"
          v-model="querylocal.value"
        />
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
import { replaceTemplate } from "@/utilities.js";

export default {
  extends: Placeholder,
  props: {},
  data() {
    return {
      templateId: "value",
      defaultSqlFormat: "{{value}}"
    };
  },
  computed: {
    sqlFormatScoped() {
      return replaceTemplate(this.sqlFormat, {
        value: `{{${this.querylocal.uuid}}}`
      });
    }
  },
  methods: {
    generateSQL: function() {
      return replaceTemplate(this.sqlFormat, {
        value: replaceTemplate(this.valueWrapper, {
          value: this.querylocal.value ? this.querylocal.value : ""
        })
      });
      // return this.querylocal.value ? this.querylocal.value : "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
