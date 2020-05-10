<template>   
  <div>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card>
            <v-card-text>
              <v-container>
                <h1>Settings</h1>
                <br>
                <router-link to="/account">Account </router-link> &nbsp;&nbsp;       
                <router-link to="/edit-account">Edit Account </router-link>&nbsp;&nbsp;             
                <router-link to="/order-history">Order History</router-link>&nbsp;&nbsp;          
                <router-link to="/account-settings">Settings</router-link>
                <br><br>                   
                <form @submit.prevent="editEmail">                      
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        v-model="email"
                        name="email"
                        placeholder="Email"
                        type="email"
                        required></v-text-field>
                    </v-flex>
                  </v-layout>                
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn block class="main_color" dark type="submit">Update Email</v-btn>
                    </v-flex>
                  </v-layout>
                  <p style="color:red">{{feedback}}</p>                         
                </form>                  
                <form @submit.prevent="editPassword">
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        v-model="password"
                        name="password"
                        placeholder="New Password"
                        type="password"
                        required></v-text-field>
                    </v-flex>
                  </v-layout>                       
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn block class="main_color" dark type="submit">Update Password</v-btn>
                    </v-flex>
                  </v-layout>                     
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
      userLoggedin:null,
      email:null,
      password:null,
      newPassword:null,
      account:[],
      feedback:null,           
      timeout: 3000,            
    }
  },
  methods:{
    editEmail(){
      var user = firebase.auth().currentUser;          

      user.updateEmail(this.email)
      .then(() => {             
          firebase.auth().signOut()
          this.$router.replace('/sign-in')                  
      }).catch((error) => {
          this.feedback = error.message
      });
    },    
    editPassword(){
      var user = firebase.auth().currentUser;  

      user.updatePassword(this.password)
      .then(() => {             
          firebase.auth().signOut()
          this.$router.replace('/sign-in')               
      }).catch(function(error) {
          console.log(error);
      }); 
    }    
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
  .primary--text {
    color: #F16D07 !important;
    caret-color: #F16D07 !important;
  }
  .primary {
      background-color: #F16D07 !important;
      border-color: #F16D07 !important;
  }
</style>
