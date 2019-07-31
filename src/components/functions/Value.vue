<template>
  <div class="selector" :style="bannerStyles" :class="`banner__${position}`">
    <span></span>
    <input v-model="value" />
    <span>)</span>
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
      value: "",
      bannerStyles: {
        ...defaultStyles,
        ...this.styles
      }
    };
  },
  methods: {
    generateSQL: function() {
      return this.value;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
