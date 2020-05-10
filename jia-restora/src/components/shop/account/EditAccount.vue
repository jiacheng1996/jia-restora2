<template>   
  <div>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card>
            <v-card-text>
              <v-container>
                <h1>Edit Account</h1>
                <br>
                <router-link to="/account">Account </router-link> &nbsp;&nbsp;       
                <router-link to="/edit-account">Edit Account </router-link>&nbsp;&nbsp;             
                <router-link to="/order-history">Order History</router-link>&nbsp;&nbsp;          
                <router-link to="/account-settings">Settings</router-link>
                <br><br>                   
                <form @submit.prevent="editProfile">
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        v-model="account.name"
                        name="name"
                        placeholder="Name"
                        type="text"
                        required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        v-model="account.phone"
                        name="phone"
                        placeholder="Phone"
                        type="number"
                        required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        v-model="account.country"
                        name="country"
                        placeholder="Country"
                        type="text"
                        required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        v-model="account.city"
                        name="city"
                        placeholder="City"
                        type="text"
                        required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        v-model="account.address"
                        name="address"
                        placeholder="Address"
                        type="text"
                        required></v-text-field>
                    </v-flex>
                  </v-layout>                     
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn block class="main_color" dark type="submit">Update Account</v-btn>
                    </v-flex>
                  </v-layout>
                  <div class="text-center"> 
                    <v-snackbar
                      v-model="snackbar"
                      :timeout="timeout"
                    >
                      {{ text }}
                      <v-btn
                        class="main_color"
                        text
                        @click="snackbar = false"
                      >
                        Close
                      </v-btn>
                    </v-snackbar>
                  </div>
                </form>
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
      phone:null,
      address:null,
      city:null,
      country:null,
      userLoggedin:null,
      account:[],
      snackbar: false,
      text: 'Account Information updated successfully',
      timeout: 3000,           
    }
  },
  methods:{
    editProfile(){
        if(this.account.name){
        var db = firebase.firestore();    
        let ref = db.collection('profiles').doc(this.userId)
        ref.update({
            name:this.account.name,            
            phone:this.account.phone,
            country:this.account.country,
            city:this.account.city,
            address:this.account.address,
        
        })
      }
      this.snackbar = true
    }    
  },
  created(){
    // Current User
    var user = firebase.auth().currentUser;
    if (user) {
        this.userId = user.uid            
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
    .primary--text {
  color: #F16D07 !important;
  caret-color: #F16D07 !important;
}
  .primary {
      background-color: #F16D07 !important;
      border-color: #F16D07 !important;
  }
  .v-label{
    color: #F16D07 !important;
  }
</style>
