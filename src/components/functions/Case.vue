<template>
  <div class="selector">
    <slot name="case">
      <span>CASE</span>
    </slot>
    <slot name="when-then">
      <div>
        <span>WHEN</span>
        <dynamic-selector ref="whenValue"></dynamic-selector>
        <span>THEN</span>
        <dynamic-selector ref="thenValue"></dynamic-selector>
      </div>
    </slot>
    <slot name="else">
      <span>ELSE</span>
      <dynamic-selector ref="elseValue"></dynamic-selector>
    </slot>
    <slot name="end">
      <span>END</span>
    </slot>
  </div>
</template>
<script>
import global from "@/global.js";

export default {
  props: {},
  data() {
    return {
      type: ""
    };
  },
  methods: {
    generateSQL: function() {
      return `
        CASE
          WHEN ${this.$refs.whenValue.generateSQL()} THEN ${this.$refs.thenValue.generateSQL()}
          ELSE ${this.$refs.elseValue.generateSQL()}
          END
      `;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
