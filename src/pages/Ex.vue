<template>
  <div>
    <h3>No Theme</h3>
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
</template>

<script>
export default {
  name: "app",
  components: {},
  computed: {},
  data() {
    return {
      generatedSQL2: "",
      generatedJSON2: "",
      templateOptions2: {
        template: ""
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
    generateSQL2: function() {
      var x = this.$refs.foo.generateSQL();
      this.generatedSQL2 = x;
    },
    onQueryUpdate2: function(refName, q) {
      this.generatedJSON2 = JSON.stringify(q);
    }
  },
  mounted() {
    setTimeout(() => {
      this.generateSQL2();
      this.generatedJSON2 = JSON.stringify(this.query2);
    }, 250);
  }
};
</script>

<style>
label {
  font-weight: bold;
}
</style>
