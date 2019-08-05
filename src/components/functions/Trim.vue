<template>
  <div class="selector">
    <slot name="f-trim-begin">
      <label>TRIM (</label>
    </slot>
    <slot name="f-trim-value">
      <dynamic-selector
        ref="value"
        emitRef="value"
        :query="querylocal.value"
        @query-update="onQueryUpdate"
      >
        <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </dynamic-selector>
    </slot>
    <slot name="f-trim-end">
      <label>)</label>
    </slot>
    <button
      class="btn btn-danger btn-sm ml-2"
      v-show="optionslocal.removeable && querylocal.type"
      @click="remove"
    >X</button>
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
      return `TRIM (${this.$refs.value.generateSQL()})`;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
