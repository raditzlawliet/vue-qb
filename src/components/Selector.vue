<template>
  <div class="selector">
    <f-trim v-if="type == 'trim'"></f-trim>
    <f-case v-else-if="type == 'case'"></f-case>
    <f-value v-else-if="type == 'value' || type == 'object' || type == 'attribute'"></f-value>
    <select v-else v-model="type">
      <option value>Select ...</option>
      <option value="trim">TRIM</option>
      <option value="case">CASE</option>
      <option value="object">Object</option>
      <option value="attribute">Attribute</option>
      <option value="value">Value</option>
    </select>
    <button v-show="removeable && type" @click="remove">X</button>
  </div>
</template>
<script>
import global from "@/global.js";

const lFunctions = [
  { id: "trim", component: import("@/components/functions/Trim.vue") }
];

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
    generate: function() {
      console.log(global);
    },
    remove: function() {
      this.type = "";
    },
    removeable: function() {
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
