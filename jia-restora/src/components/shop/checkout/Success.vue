<template>
  <!--My Account -->
  <div>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card flat>
            <v-card-text>
              <v-container class="main_color">
                <h1 style="text-align:center;color:white"><v-icon x-large class="white--text darken-3">check_circle</v-icon> Thank you. Your order has been received.</h1>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
     
<script>
  import firebase from "firebase";   
  export default {
  data(){
    return{           
        email:null,
        password:null,               
        cart:this.$store.getters.cart,    
        userLoggedin:null,            
    }
  },
  methods:{
      
  },   
  }
</script>
  
<style scoped>
  a {
    text-decoration: underline;
    color:#1565c0!important;
    font-size: 16px;
  }
</style>
