<template>
  <div class="main-wrapper-bs4">
    <h2>Bootstrap 4</h2>
    <hr />
    <dynamic-selector
      ref="foo"
      :query="query"
      @query-update="onQueryUpdate"
      :templateOptions="templateOptions"
    ></dynamic-selector>
    <hr />
    <button class="btn btn-success" @click="generateSQL">Print SQL</button>
    <div class="mt-2 alert alert-primary">
      <code>{{ generatedSQL }}</code>
    </div>
    <div class="mt-2 alert alert-success">
      <code>{{ generatedJSON }}</code>
    </div>
  </div>
</template>

<script>
import "bootstrap";
export default {
  name: "app",
  components: {},
  computed: {},
  data() {
    return {
      generatedSQL: "",
      generatedJSON: "",
      templateOptions: {
        template: "bs4"
      },
      query: {
        type: "Trim",
        values: [],
        value: {
          type: "Concat",
          values: [{ type: "", values: [] }],
          value: { type: "Value", values: [], value: "123" }
        }
      }
    };
  },
  methods: {
    generateSQL: function() {
      var x = this.$refs.foo.generateSQL();
      this.generatedSQL = x;
    },
    onQueryUpdate: function(refName, q) {
      this.generatedJSON = JSON.stringify(q);
    }
  },
  mounted() {
    setTimeout(() => {
      this.generateSQL();
      this.generatedJSON = JSON.stringify(this.query);
    }, 250);
  }
};
</script>

<style scoped lang="scss">
.main-wrapper-bs4 ::v-deep {
  @import "~bootstrap/scss/bootstrap";
}
</style>

