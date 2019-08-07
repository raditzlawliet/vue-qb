<template>
  <div class="container-fluid" id="app">
    <div class="row">
      <div class="col-md-12">
        <h1>Vue Query Builder</h1>
        <div>
          <hr />
          <dynamic-selector
            ref="foo"
            :query="query"
            @query-update="onQueryUpdate"
            :templateOptions="templateOptions"
          ></dynamic-selector>
          <hr />
          <button class="btn btn-success" @click="generateSQL">Print SQL</button>
          <hr />
          <code>{{ generatedSQL }}</code>
          <hr />
          <code>{{ generatedJSON }}</code>
        </div>
        <div class="row">
          <div class="col-md-6">
            <hr />
            <dynamic-selector
              ref="foo"
              :query="query2"
              @query-update="onQueryUpdate2"
              :templateOptions="templateOptions2"
            ></dynamic-selector>
            <hr />
            <button class="btn btn-success" @click="generateSQL2">Print SQL</button>
            <hr />
            <code>{{ generatedSQL2 }}</code>
            <hr />
            <code>{{ generatedJSON2 }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  computed: {},
  data() {
    return {
      generatedSQL: "",
      generatedJSON: "",
      generatedSQL2: "",
      generatedJSON2: "",
      templateOptions: {
        template: "bs4"
      },
      templateOptions2: {
        template: ""
      },
      // query: {
      //   type: "Trim",
      //   value: {
      //     type: "Concat",
      //     value: {
      //       type: ""
      //     }
      //   }
      // }
      query: {
        type: "Trim",
        values: [],
        value: {
          type: "Concat",
          values: [{ type: "", values: [] }],
          value: { type: "Value", values: [], value: "123" }
        }
      },
      query2: {
        type: "Concat",
        values: [
          { type: "Value", values: [], value: "123123123" },
          {
            type: "Case",
            values: [
              {
                whenValue: { type: "Value", values: [], value: "321321" },
                thenValue: {
                  type: "Attribute",
                  values: [],
                  value: "Some Attribute"
                }
              }
            ]
          }
        ]
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
    },
    generateSQL2: function() {
      var x = this.$refs.foo.generateSQL();
      this.generatedSQL2 = x;
    },
    onQueryUpdate2: function(refName, q) {
      this.generatedJSON2 = JSON.stringify(q);
    }
  },
  mounted() {}
};
</script>

<style>
label {
  font-weight: bold;
}
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
