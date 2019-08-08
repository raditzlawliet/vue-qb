<template>
  <div class="main-wrapper-bs3">
    <h2>Bootstrap 3</h2>
    <hr />
    <dynamic-selector
      ref="foo"
      :query="query"
      @query-update="onQueryUpdate"
      :templateOptions="templateOptions"
    ></dynamic-selector>
    <hr />
    <button class="btn btn-success" @click="generateSQL">Print SQL</button>
    <div class="alert alert-info" role="alert" style="margin-top: 1em">
      <code>{{ generatedSQL }}</code>
    </div>
    <div class="alert alert-success" role="alert" style="margin-top: 1em">
      <code>{{ generatedJSON }}</code>
    </div>
  </div>
</template>

<script>
import "expose-loader?jQuery!jquery";
import "bootstrap3";
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

<style scoped lang="less">
.main-wrapper-bs3 ::v-deep {
  @import "~bootstrap3/less/bootstrap";
}
</style>

