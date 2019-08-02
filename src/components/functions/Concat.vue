<template>
  <div class="selector">
    <slot name="f-concat-begin">
      <span>CONCAT [</span>
    </slot>
    <slot name="f-concat-value">
      <dynamic-selector ref="value" :query="querylocal.value" @query-update="onQueryUpdate">
        <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </dynamic-selector>
    </slot>
    <slot name="f-trim-end">
      <span>]</span>
    </slot>
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
    },
    // onQueryUpdate: function(q) {
    //   this.querylocal.value = this.normalizeQuery(q);
    // }
  }
};
</script>

<style lang="scss" scoped>
</style>
