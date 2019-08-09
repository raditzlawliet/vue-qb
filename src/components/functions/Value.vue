<template>
  <div>
    <div class="d-flex d-flex-row" v-if="normalizedTemplateOptions.template =='bs4'">
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
    <div class v-else-if="normalizedTemplateOptions.template =='bs3'">
      <input :class="[...normalizedTemplateOptions.options.inputClass]" v-model="querylocal.value" />
      <button
        :class="[...normalizedTemplateOptions.options.removeBtnClass]"
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
