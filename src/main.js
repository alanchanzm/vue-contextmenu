import Vue from 'vue';
import VueBus from 'vue-bus';

import 'normalize.css';
import App from './App';

Vue.use(VueBus);
Vue.config.productionTip = true;

new Vue({
  render: h => h(App),
  el: '#app'
});
