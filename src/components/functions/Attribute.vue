<template>
  <div class="selector d-flex">
    <select class="form-control form-control-sm flex-grow-1" v-model="querylocal.value">
      <option v-for="o in lAttributes" :key="o.id" :value="o.id">{{o.name}}</option>
    </select>
    <button
      class="btn btn-danger btn-sm ml-2"
      v-show="optionslocal.removeable && querylocal.type"
      @click="remove"
    >X</button>
  </div>
</template>
<script>
import Placeholder from "./Placeholder.vue";
import global from "@/global.js";

export default {
  extends: Placeholder,
  props: {},
  data() {
    return {
      lAttributes: global.lAttributes
    };
  },
  methods: {
    getDefaultObject: function() {
      return {
        id: "",
        name: ""
      };
    },
    generateSQL: function() {
      return this.query.value ? this.query.value.id : "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
