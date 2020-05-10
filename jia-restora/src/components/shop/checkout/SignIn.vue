<template>
  <!-- Sign In area -->
  <div class="sign-in">
    <v-container v-if="this.cart.length > 0">
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card>
            <v-card-text>
              <v-container>
                <h1>Sign In</h1>
                <form @submit.prevent="signInCheckout">
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
                      <v-text-field
                        v-model="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn block class="main_color" dark type="submit">Sign In</v-btn>
                    </v-flex>
                  </v-layout>
                  Don't have any account yet ? <router-link to="/create-account">Create Account</router-link>
                  <p style="color:red">{{feedback}}</p>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-if="this.cart.length <= 0">
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card>
            <v-card-text>
              <v-container>
                <h1>Sign In</h1>
                <form @submit.prevent="signIn">
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
                      <v-text-field
                        v-model="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn block class="main_color" dark type="submit">Sign In</v-btn>
                    </v-flex>
                  </v-layout>
                  Don't have any account yet ? <router-link to="/create-account">Create Account</router-link>
                  <p style="color:red">{{feedback}}</p>
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
      email:null,
      password:null,               
      cart:this.$store.getters.cart,    
      userLoggedin:null,
      feedback:null,            
    }
  },
  methods:{
    signInCheckout(){
      firebase.auth().signInWithEmailAndPassword(this.email,this.password)
        .then((user)=>{
            this.$router.replace('/checkout')
            location.reload();                                    
        })
        .catch((e)=>{
            this.feedback = "Wrong Email or Password"                    
        })
    },
    signIn(){
      firebase.auth().signInWithEmailAndPassword(this.email,this.password)
      .then((user)=>{
          this.$router.replace('/account')                                              
      })
      .catch((e)=>{
          this.feedback = "Wrong Email or Password"                    
      })
    }
  },   
  }
</script>
  
<style scoped>
  .sign-in{
    margin-top:0!important;
  }
  a{
    text-decoration: underline;
    color:#F16D07!important;   
  }
  .primary--text {
  color: #F16D07 !important;
  caret-color: #F16D07 !important;
}

</style>
