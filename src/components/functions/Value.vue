<template>
  <div>
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

export default {
  extends: Placeholder,
  props: {},
  data() {
    return {};
  },
  methods: {
    generateSQL: function() {
      var SqlFormat = `{{${this.uuid}}}`
      return this.querylocal.value ? this.querylocal.value : "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
