<template>
  <div class="selector" :style="bannerStyles" :class="`banner__${position}`">
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
      scopePlaceholder: global.recursiveScope,
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
    },
    getData: function() {
      return {
        type: this.type,
        value: this.$refs.trimValue.getData()
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
