import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// Export Polymer and PolymerElement for 1.x and 2.x compat
import { Polymer } from '@polymer/polymer/polymer-legacy.js';
window.Polymer = Polymer;
