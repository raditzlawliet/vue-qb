<template>
  <div>
    <div>
      <slot name="f-trim-begin">
        <label class="col-form-label col-form-label-sm">TRIM (</label>
      </slot>
    </div>
    <div class="ml-2">
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
    <div>
      <slot name="f-trim-end">
        <label class="col-form-label col-form-label-sm">)</label>
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
