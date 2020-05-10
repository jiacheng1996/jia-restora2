import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate'


export default new Vuex.Store({
    
    state:{
      cart:[],
      leftNavbar:null,
      pos_customer_name:'',
      pos_customer_mobile:'',    
      vat:0,      
    },

    mutations:{
      updateCart(state, payload){
        state.cart.push(payload)
      },
      reloadCart(state, payload){
          state.cart = payload
      },
      updateQuantity(state, payload){
          state.cart[payload.index].quantity = payload.quantity
      },
      increaseQuantity(state, payload){
          state.cart[payload].quantity++
      },
      decreaseQuantity(state, payload){
          state.cart[payload].quantity--
      },
      removeCart(state, payload){
          state.cart.splice(payload, 1)
      },
      emptyCart(state){
          state.cart = []
      },
      testClick(state, payload){
          state.leftNavbar = payload
      },    
      vatStatus(state, payload){
          state.vat = payload
      },
      posCustomerName(state, payload){
          state.pos_customer_name = payload   
      },
      emptyposCustomerName(state){
          state.pos_customer_name = null
      },
      posCustomerMobile(state, payload){
        state.pos_customer_mobile = payload   
      },
      emptyposCustomerMobile(state){
        state.pos_customer_mobile = null
      },      
    },
    getters:{
        cart: state => {
            return state.cart
        },
        leftNavbar: state => {
            return state.leftNavbar
        },
        pos_customer_name: state =>{
            return state.pos_customer_name
        },      
        pos_customer_mobile: state =>{
            return state.pos_customer_mobile
        },      
        vat: state => {
            return state.vat
        },
    },

    plugins: [createPersistedState()],

})