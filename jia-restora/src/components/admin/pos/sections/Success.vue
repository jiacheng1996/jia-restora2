<template>
  <!--My Account -->
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm12>
          <v-card flat>
            <v-card-text>
              <v-container class="main_color">
                <h1 style="text-align:center;color:white"><v-icon x-large class="white--text darken-3">check_circle</v-icon>Checkout Successful </h1>
              </v-container>
               <v-flex class="pos_button pos_gap text-xs-center"> 
                  <v-btn @click="returnToPos()">Return To POS</v-btn>
               </v-flex>
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
    returnToPos(){
      this.$router.push({ name: 'Pos'})
    }
      
  },   
  }
</script>
  
<style scoped>
  a {
    text-decoration: underline;
    color:#1565c0!important;
    font-size: 16px;
  }
  .pos_button .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
    background-color: #F16D07;
    color:#FAFAFA;
    text-transform: capitalize;
  }
</style>
