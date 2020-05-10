<template>
  <v-app>     
    <v-layout>
      <Navbar />      
      <v-content>
        <Slider />
        <FeaturedProducts />             
        <Reviews />        
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
  import Slider from  '@/components/shop/sections/Slider'  
  import Offer from  '@/components/shop/sections/Offer'  
  import Reviews from  '@/components/shop/sections/Reviews'  
  import Blog from  '@/components/shop/sections/Blog'  
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
        {name: 'description', content: 'Complete E-commere soltuion with business management software.'}
      ]
    },
    components:{
    Navbar,RightNavbar,FeaturedProducts,Feature,Slider,Offer,Reviews,Blog
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
