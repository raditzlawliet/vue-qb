<template>
  <div class="main-wrapper-bs3">
    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="col-xs-12">
          <h3>Bootstrap 3</h3>

          <hr />

          <vue-query-builder
            ref="foo"
            :query="query"
            @query-update="onQueryUpdate"
            :templateOptions="templateOptions"
          ></vue-query-builder>

          <hr />
          <button class="btn btn-success" @click="generateSQL">Print SQL</button>
          <div class="alert alert-info" role="alert" style="margin-top: 1em">
            <code>{{ generatedSQL }}</code>
          </div>
          <div class="alert alert-success" role="alert" style="margin-top: 1em">
            <code>{{ generatedJSON }}</code>
          </div>
        </div>
      </div>
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
        template: "bs3"
      },
      query: {
        type: "Trim",
        values: [],
        value: {
          type: "Concat",
          values: [
            { type: "Value", value: "123" },
            { type: "Object", values: [] },
            { type: "Attribute", values: [] },
            { type: "Case", values: [] },
            { type: "Trim", values: [] }
          ]
        }
      }
    };
  },
  methods: {
    generateSQL: function() {
      var x = this.$refs.foo.generateSQL();
      this.generatedSQL = x;
    },
    onQueryUpdate: function(q) {
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

<style scoped lang="scss">
// .main-wrapper-bs3 ::v-deep {
//   .ml-2 {
//     margin-left: 1em !important;
//   }
// }
.main-wrapper-bs3 ::v-deep {
  @import "@/assets/sass/bs3vqb/bs3vqb.scss";
}
</style>
