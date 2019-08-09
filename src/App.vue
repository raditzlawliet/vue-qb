<template>
  <div class="container-fluid" id="app">
    <div class="row">
      <div class="col-md-12">
        <h1>Vue Query Builder</h1>

        <ul>
          <li>
            <router-link to="/example">Example</router-link>
            <ul>
              <li>
                <router-link to="/example">No Theme</router-link>
              </li>
              <li>
                <router-link to="/example/bs4">Bootstrap 4</router-link>
              </li>
              <li>
                <router-link to="/example/bs3">Bootstrap 3</router-link>
              </li>
            </ul>
          </li>
        </ul>

        <router-view></router-view>
        <!-- <ex-bs-4></ex-bs-4>
        <ex-bs-3></ex-bs-3>
        <ex></ex>-->
      </div>
    </div>
  </div>
</template>

<script>
// import ExBs4 from "./components/ExBs4.vue";
// import ExBs3 from "./components/ExBs3.vue";
// import Ex from "./components/Ex.vue";
export default {
  name: "app",
  // components: { Ex, ExBs4, ExBs3 },
  computed: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style>
</style>
