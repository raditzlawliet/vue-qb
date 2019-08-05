<template>
  <div id="app">
    <dynamic-selector ref="foo" :query="query" @query-update="onQueryUpdate">
      <div style="font-weight: bold;" slot="f-trim-begin">TRIM CUSTOM</div>
      <div style="font-weight: bold;" slot="f-trim-end">END OF TRIM</div>
    </dynamic-selector>
    <button @click="generateSQL">Print SQL</button>
    <p>{{ generatedSQL }}</p>
    <p>{{ generatedJSON }}</p>
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
  mounted() {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
