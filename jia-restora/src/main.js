// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Vuetify
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'

//Vuex
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store/store.js';

// Vue Chat Scroll
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

// Vue Meta
import Meta from 'vue-meta';
Vue.use(Meta);


Vue.config.productionTip = false

// Vue app init after auth state change
import firebase from 'firebase'
let app;

firebase.auth().onAuthStateChanged(function(user){
  if(!app){
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  }
});
