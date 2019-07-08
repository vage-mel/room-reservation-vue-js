import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import { router } from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faCheck, faClock, faChalkboard, faPhotoVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { acessMixin, momentMixin, responseErrorMixin } from './mixins'

import './router/axios-middlewares.js'

library.add(faTimes, faCheck, faClock, faChalkboard, faPhotoVideo)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.mixin(acessMixin, momentMixin);
Vue.mixin(momentMixin);
Vue.mixin(responseErrorMixin)


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
