import Vue from 'vue'
import App from './App.vue'
import "./components";

// bootstrap 4
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
