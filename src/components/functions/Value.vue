<template>
  <div :class="[...normalizedTemplateOptions.functionsWrapperClass]">
    <div :class="[...normalizedTemplateOptions.rowItemClass]">
      <input :class="[...normalizedTemplateOptions.inputClass]" v-model="querylocal.value" />
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
