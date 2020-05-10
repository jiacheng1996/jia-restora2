<template>
  <v-app>     
    <v-layout>
      <Navbar />      
      <v-content>
        <FeaturedProducts />
        <Feature />
      </v-content>
      <RightNavbar />  
    </v-layout>
  </v-app>
</template>

<script>
  import Navbar from '@/components/shop/navbar/Navbar'
  import RightNavbar from '@/components/shop/navbar/RightNavbar'
  import FeaturedProducts from  '@/components/shop/products/FeaturedProducts' 
  import Feature from  '@/components/shop/sections/Feature'  
  import db from '@/firebase/init'
  import moment from 'moment'
  export default {
    name:'Home',
    components:{
      Navbar,RightNavbar,FeaturedProducts,Feature
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
