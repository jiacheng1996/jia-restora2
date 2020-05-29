<template>
  <!-- Sign In area -->
  <div class="sign-in">
    <v-container v-if="this.cart.length > 0">
        <v-layout row>
          <v-flex xs12 sm12>
            <v-card>
              <v-card-text>
                <v-container>
                  <h1>Create Account</h1>
                  <form @submit.prevent="createNewUserCheckout">
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                          v-model="name"
                          name="name"
                          placeholder="Name"
                          type="text"
                          required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                          v-model="phone"
                          name="phone"
                          placeholder="Phone"
                          type="number"
                          required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                          v-model="address"
                          name="address"
                          placeholder="Address"
                          type="text"
                          required></v-text-field>
                      </v-flex>
                    </v-layout>
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
                        <v-btn block class="main_color" dark type="submit">Create Account</v-btn>
                      </v-flex>
                    </v-layout>
                    <p class="feedback-error">{{feedback}}</p>
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
                  <h1>Create Account</h1>
                  <form @submit.prevent="createNewUser">
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                          v-model="name"
                          name="name"
                          placeholder="Name"
                          type="text"
                          required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                          v-model="phone"
                          name="phone"
                          placeholder="Phone"
                          type="number"
                          required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                          v-model="country"
                          name="country"
                          placeholder="Country"
                          type="text"
                          required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                          v-model="city"
                          name="city"
                          placeholder="City"
                          type="text"
                          required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                          v-model="address"
                          name="address"
                          placeholder="Address"
                          type="text"
                          required></v-text-field>
                      </v-flex>
                    </v-layout>
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
                        <v-btn block class="main_color" dark type="submit">Create Account</v-btn>
                      </v-flex>
                    </v-layout>
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
  import moment from 'moment'     
  export default {
  data(){
    return{
      name:null, 
      phone:null,
      email:null,
      password:null,
      country:null,
      city:null,
      address:null,
      shipping:50,           
      cart:this.$store.getters.cart,   
      userLoggedin:null,
      feedback:null          
    }
  },
  methods:{
    createNewUserCheckout(){
        var db = firebase.firestore();
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
            db.collection("profiles").doc(user.user.uid).set({
              id:user.user.uid,
              name:this.name,
              phone:this.phone,                    
              country:this.country,
              city:this.city,
              email:this.email,
              address:this.address,
              created_date:moment().format('DD-MM-YYYY'),
              created_month:moment().format('MM-YYYY'),
              created_year:moment().format('YYYY'),
              timestamp:Date.now()
            })
            this.$router.replace('/account')
        })
        .catch((e)=>{
            this.feedback = e.message;
        })
      },         
      createNewUser(){
        var db = firebase.firestore();
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
            db.collection("profiles").doc(user.user.uid).set({
                id:user.user.uid,
                name:this.name,
                phone:this.phone,                    
                country:this.country,
                city:this.city,
                address:this.address,
                email:this.email,
                timestamp:Date.now()
            })
            this.$router.replace('/account')                
        })
        .catch((e)=>{
            this.feedback = e.message;
        })
      },         
  },   
  }
</script>
  
<style scoped>
 .primary--text {
  color: #F16D07 !important;
  caret-color: #F16D07 !important;
}
  .sign-in {
      margin-top:0!important;
  }
  @media (max-width:292px){
    h1{
      font-size: 16px!important;
    }
  }
</style>
