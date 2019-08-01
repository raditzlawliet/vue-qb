<template>
  <div class="selector">
    <input v-model="query.value" />
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
    },
    getData: function() {
      return {
        type: this.query.type,
        value: this.$refs.trimValue.getData()
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
