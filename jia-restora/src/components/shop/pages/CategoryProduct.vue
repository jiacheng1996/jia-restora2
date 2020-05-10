<template>
  <v-app>     
    <v-layout>
      <Navbar />      
      <v-content>   
        <CategoryProduct />
        <Feature />
      </v-content>
      <RightNavbar />  
    </v-layout>
  </v-app>
</template>

<script>
  import Navbar from '@/components/shop/navbar/Navbar'
  import RightNavbar from '@/components/shop/navbar/RightNavbar'
  import CategoryProduct from  '@/components/shop/products/CategoryProduct'
  import Feature from  '@/components/shop/sections/Feature'  
  import db from '@/firebase/init'
  import moment from 'moment'
  export default {
    name:'Home',
    components:{
      Navbar,RightNavbar,CategoryProduct,Feature
    },
    data(){
      return{
      
      }
    },
    created(){

    }
  }
</script>