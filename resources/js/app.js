import './bootstrap'

import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'


//await するためには async メソッドの内部にいる必要がある
const createApp = async () => {
    await store.dispatch('auth/currentUser')//stateに代入
  
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App />'
    })
}
  
  createApp()