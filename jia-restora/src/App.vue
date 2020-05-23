<template>
  <div id="app">
    <!-- Transition 
    <transition
      name="fade"
      mode="out-in"
    >
    -->
     <router-view/>
    <!-- Transition </transition> -->
  </div>
</template>

<script>
import {functions} from '@/firebase/init'
export default {
  name: 'App',
  data() {
     return {     
        items: [],
      };
  },
  
  metaInfo: {    
    title: 'Restora',
    meta: [
      {name: 'Content-Type', content: 'text/html; charset=utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'description', content: 'Complete E-commere soltuion with business management software.'}
    ]
  }
  
}
 
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  
</style>
