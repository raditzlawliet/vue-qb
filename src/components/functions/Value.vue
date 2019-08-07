<template>
  <div :class="['vue-qb-function', ...normalizedTemplateOptions.functionsWrapperClass]">
    <div :class="['vue-qb-row', ...normalizedTemplateOptions.rowItemClass]">
      <div :class="['vue-qb-row-item', ...normalizedTemplateOptions.rowItemClass]">
        <input
          :class="['vue-qb-input', ...normalizedTemplateOptions.inputClass]"
          v-model="querylocal.value"
        />
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
