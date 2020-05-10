<template>
  <v-app>     
    <v-layout>
      <Navbar />
      <v-content>   
        <Account />
        <Feature />
      </v-content>
      <RightNavbar />  
    </v-layout>
  </v-app>
</template>

<script>
  import Navbar from '@/components/shop/navbar/Navbar'
  import RightNavbar from '@/components/shop/navbar/RightNavbar'
  import Account from  '@/components/shop/account/Account'
  import Feature from  '@/components/shop/sections/Feature'  
  import db from '@/firebase/init'
  import moment from 'moment'
  export default {
    name:'Home',
    components:{
    RightNavbar,Account,Feature,Navbar
    },
    data(){
      return{
      
      }
    },
    created(){

    }
  }
</script>