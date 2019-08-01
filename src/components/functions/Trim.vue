<template>
  <div class="selector">
    <slot name="f-trim-begin">
      <span>TRIM (</span>
    </slot>
    <slot name="f-trim-value">
      <dynamic-selector ref="trimValue">
        <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </dynamic-selector>
    </slot>
    <slot name="f-trim-end">
      <span>)</span>
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
      return `TRIM (${this.$refs.trimValue.generateSQL()})`;
    },
    getData: function() {
      return {
        type: this.query.type,
        value: this.$refs.trimValue.getData()
      };
    },
    setData: function(d) {}
  }
};
</script>

<style lang="scss" scoped>
</style>
