<template>
  <div class="selector" :style="bannerStyles" :class="`banner__${position}`">
    <slot name="begin">
      <span>TRIM (</span>
    </slot>
    <slot name="value">
      <dynamic-selector ref="trimValue"></dynamic-selector>
    </slot>
    <slot name="end">
      <span>)</span>
    </slot>
  </div>
</template>
<script>
import global from "@/global.js";

const defaultStyles = {
  left: 0,
  right: 0
};

export default {
  props: {
    position: {
      type: String,
      default: "top",
      validator(position) {
        return ["top", "bottom"].indexOf(position) > -1;
      }
    },
    styles: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      type: "",
      bannerStyles: {
        ...defaultStyles,
        ...this.styles
      }
    };
  },
  methods: {
    generateSQL: function() {
      return `TRIM (${this.$refs.trimValue.generateSQL()})`;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
