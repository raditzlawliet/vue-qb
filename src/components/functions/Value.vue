<template>
  <div class="selector d-flex">
    <input class="form-control form-control-sm flex-grow-1" v-model="querylocal.value" />
    <button class="btn btn-danger btn-sm ml-2" v-show="optionslocal.removeable && querylocal.type" @click="remove">X</button>
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
      return this.query.value;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
