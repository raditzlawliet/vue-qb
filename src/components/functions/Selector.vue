<template>
  <div class="selector" :style="bannerStyles" :class="`banner__${position}`">
    <span>CASE</span>
    <div>
      <span>WHEN</span>
      <selector ref="x"></selector>
      <span>THEN</span>
      <selector ref="x2"></selector>
    </div>
    <span>ELSE</span>
    <selector ref="x3"></selector>
    <span>END</span>
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
      return ""
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
