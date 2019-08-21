<template>
  <div>
    <div
      class="d-flex d-flex-row"
      v-if="['bs4', 'bs3'].includes(normalizedTemplateOptions.template)"
    >
      <div class="flex-grow-1">
        <select :class="[...normalizedTemplateOptions.options.selectClass]" v-model="query.value">
          <option v-for="o in lObjects" :key="o.id" :value="o.id">{{o.name}}</option>
        </select>
      </div>
      <div class="ml-2">
        <button
          :class="[...normalizedTemplateOptions.options.removeBtnClass]"
          v-show="options.removeable && query.type"
          @click="remove"
        >
          <slot name="btn-remove">X</slot>
        </button>
      </div>
    </div>
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
  computed: {
    lObjects() {
      // console.log(this.rules);
      return this.rules[this.query.type]
        ? this.rules[this.query.type].list()
        : {};
      // return {};
    }
  },
  methods: {
    getDefaultObject: function() {
      return {
        id: "",
        name: ""
      };
    },
    generateSQL: function() {
      return this.query.value ? this.query.value : "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
