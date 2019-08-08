<template>
  <div :class="[...normalizedTemplateOptions.formRowClass]">
    <div :class="[...normalizedTemplateOptions.formGroupClass]">
      <div :class="[...normalizedTemplateOptions.inlineClass]">
        <slot name="f-trim-begin">
          <label>TRIM (</label>
        </slot>
      </div>
      <div :class="[...normalizedTemplateOptions.tabClass]">
        <slot name="f-trim-value">
          <dynamic-selector
            ref="value"
            emitRef="value"
            :query="querylocal.value"
            @query-update="onQueryUpdate"
            :templateOptions="templateOptions"
          >
            <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
            <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
              <slot :name="name" v-bind="slotData" />
            </template>
          </dynamic-selector>
        </slot>
      </div>
      <div :class="[...normalizedTemplateOptions.inlineClass]">
        <slot name="f-trim-end">
          <label>)</label>
        </slot>
        <button
          :class="[...normalizedTemplateOptions.removeBtnClass]"
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
    return {
      templateId: "trim"
    };
  },
  methods: {
    generateSQL: function() {
      return `TRIM (${this.$refs.value.generateSQL()})`;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
