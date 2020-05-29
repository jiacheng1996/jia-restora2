<template>
  <!--My Account -->
  <div>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card>
            <v-card-text>
              <v-container>
                <h1>My Account</h1>
                  <br>
                  <router-link to="/account">Account </router-link> &nbsp;&nbsp;       
                  <router-link to="/edit-account">Edit Account </router-link>&nbsp;&nbsp;             
                  <router-link to="/order-history">Order History</router-link>&nbsp;&nbsp;          
                  <router-link to="/account-settings">Settings</router-link>
                  <br><br>
                  <v-layout row>
                    <v-flex xs12>
                        <b>Name:</b> {{this.account.name}}
                    </v-flex>
                  </v-layout>
                  <br>
                  <v-layout row>
                    <v-flex xs12>
                        <b>Email:</b> {{this.email}}
                    </v-flex>
                  </v-layout>
                  <br>
                  <v-layout row>
                    <v-flex xs12>
                        <b>Phone:</b> {{this.account.phone}}
                    </v-flex>
                  </v-layout>
                  <br>
                  <v-layout row>
                    <v-flex xs12>
                        <b>Delivery Address:</b> {{this.account.address}}
                    </v-flex>
                  </v-layout>
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
      userId:null, 
      name:null,           
      email:null,
      password:null,               
      cart:this.$store.getters.cart,    
      userLoggedin:null,
      account:[]            
    }
  },
  methods:{
      
  },
  created(){
    // Current User
    var user = firebase.auth().currentUser;
    if (user) {
        this.userId = user.uid            
        this.email = user.email            
        this.userLoggedin = true;                
    } else {
        this.userLoggedin = false;            
    }
    // User Profile Information
    var db = firebase.firestore();
    db.collection("profiles").doc(this.userId).onSnapshot(doc =>{
      this.account = doc.data()          
    })
  },   
  }
</script>
  
<style scoped>
  a{
    text-decoration: underline;  
    color:#F16D07; 
  }
</style>
