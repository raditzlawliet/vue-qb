<template>
  <div class="selector">
    <select class="form-control form-control-sm" v-model="querylocal.value">
      <option v-for="o in lObjects" :key="o.id" :value="o.id">{{o.name}}</option>
    </select>
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
      lObjects: global.lObjects
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
