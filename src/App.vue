<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <selector ref="foo"></selector> -->
    <dynamic-selector ref="foo"></dynamic-selector>
    <button @click="generateSQL">Print SQL</button>
    <p> {{ generatedSQL }}</p>
  </div>
</template>

<script>
import { settings } from "@/global.js";

export default {
  name: "app",
  components: {},
  computed: {},
  data() {
    return {
      generatedSQL: "",
    };
  },
  methods: {
    generateSQL: function() {
      var x = this.$refs.foo.generateSQL();
      this.generatedSQL = x;
      console.log(x);
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
