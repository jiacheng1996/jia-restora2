<template>
  <v-app>     
    <v-layout>
      <Navbar />      
      <v-content>       
        <About />        
        <Feature />
      </v-content>
      <RightNavbar />  
    </v-layout>
  </v-app>
</template>

<script>
  import Navbar from '@/components/shop/navbar/Navbar'
  import RightNavbar from '@/components/shop/navbar/RightNavbar'
  import About from '@/components/shop/sections/About'  
  import Feature from  '@/components/shop/sections/Feature'  
  import db from '@/firebase/init'
  import moment from 'moment'
  export default {
    name:'Home',
    metaInfo: {    
      title: 'Restora', 
      meta: [
        {content: 'text/html; charset=utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'description', content: 'Complete Restaurant soltuion.'}
      ]
    },
    components:{
    Navbar,RightNavbar,About,Feature
    },
    data(){
      return{
      
      }
    },
    created(){

    }
  }
</script>

<style>

   
</style>
