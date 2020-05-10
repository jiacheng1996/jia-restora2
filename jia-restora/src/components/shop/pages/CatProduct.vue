<template>
  <v-app>     
    <v-layout>
      <Navbar />      
      <v-content>   
        <CatProduct />
        <Feature />
      </v-content>
      <RightNavbar />  
    </v-layout>
  </v-app>
</template>

<script>
  import Navbar from '@/components/shop/navbar/Navbar'
  import RightNavbar from '@/components/shop/navbar/RightNavbar'
  import CatProduct from  '@/components/shop/products/CatProduct'
  import Feature from  '@/components/shop/sections/Feature'  
  import db from '@/firebase/init'
  import moment from 'moment'
  export default {
    name:'Home',
    components:{
      Navbar,RightNavbar,CatProduct,Feature
    },
    data(){
      return{
      
      }
    },
    created(){

    }
  }
</script>