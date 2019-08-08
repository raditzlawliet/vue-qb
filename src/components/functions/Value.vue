<template>
  <div :class="[...normalizedTemplateOptions.inlineClass]">
    <div :class="[...normalizedTemplateOptions.columnGrowClass]">
      <input :class="[...normalizedTemplateOptions.inputClass]" v-model="querylocal.value" />
    </div>
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
import Placeholder from "./Placeholder.vue";

export default {
  extends: Placeholder,
  props: {},
  data() {
    return {};
  },
  methods: {
    generateSQL: function() {
      return this.query.value;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
