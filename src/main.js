import Vue from 'vue'
import App from './App.vue'
import "./components";

// bootstrap 4
// import 'bootstrap'; 
// import 'bootstrap/dist/css/bootstrap.min.css';

// bootstrap 3
// import 'expose-loader?jQuery!jquery'
// import 'bootstrap3';
// import 'bootstrap3/dist/css/bootstrap.min.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

