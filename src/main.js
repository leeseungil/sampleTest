import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,

  // beforeCreate() {
  //   const tokenChk = localStorage.getItem('X-Auth-Token')
  //   console.log(`${tokenChk} beforeCreate`)
  //   if (tokenChk) {
  //     console.log(`${tokenChk}if-beforeCreate`)
  //     this.$store.dispatch('getMemberInfo')
  //   }
  // },
  vuetify,
  render: h => h(App),
}).$mount('#app')
