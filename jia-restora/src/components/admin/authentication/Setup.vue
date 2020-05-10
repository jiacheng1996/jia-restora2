<template>
  <v-app>
    <!-- Setup In area -->
    <div v-if="setup == false" class="setup">
      <v-container>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card flat>
                <v-card-text>
                  <v-container>
                    <h1>Restora Setup</h1>
                    <form @submit.prevent="setupPuku">
                      <v-layout row>
                        <v-flex xs12>
                          <v-text-field
                            v-model="formData.email"
                            name="email"
                            label="Email"
                            type="email"
                            required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <v-text-field
                            v-model="formData.password"
                            label="Password"
                            type="password"
                            required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <v-text-field
                            v-model="formData.confirm_password"
                            label="Confirm Password"
                            type="password"
                            required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <v-text-field
                            v-model="formData.currency"
                            name="currency"
                            label="Currency"
                            type="text"
                            required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <v-text-field
                            v-model="formData.tax"
                            name="tax"
                            label="Tax"
                            type="text"
                           ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <v-text-field
                            v-model="formData.vat"
                            name="vat"
                            label="Vat"
                            type="text"
                           ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <v-text-field
                            v-model="formData.shipping"
                            name="shipping"
                            label="Shipping"
                            type="text"
                           ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <v-btn block class="main_color" dark type="submit">Get Started</v-btn>
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
    </div>

    <!-- Sign In area -->
    <div v-if="setup == true" class="sign-in">
      <v-container >
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <v-card-text>
                  <v-container>
                    <h1>Restora Admin</h1>
                    <form @submit.prevent="signIn">
                      <v-layout row>
                        <v-flex xs12>
                          <v-text-field
                            v-model="formData.email"
                            name="email"
                            label="Email"
                            type="email"
                            required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <v-text-field
                            v-model="formData.password"
                            name="password"
                            label="Password"
                            type="password"
                            required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs12>
                          <v-btn block class="main_color" dark type="submit">Sign In</v-btn>
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
    </div>
  </v-app>
</template>

<script>
  import firebase from 'firebase'
  const functions = firebase.functions()

  export default {
    name:'Setup',
    data () {
      return {
        setup:null,
        errorMessage:null,
        feedback:'',
        formData:{
            email:'',
            password:'',
            currency:'',
            tax:0,
            vat:0,
            shipping:0,
        }
      }
    },
    methods: {
    setupPuku(){
      // If password matched
      if(this.formData.password == this.formData.confirm_password){
        firebase.auth().createUserWithEmailAndPassword(this.formData.email,this.formData.password)
          .then(()=>{
            var db = firebase.firestore();
            let ref = db.collection('settings');
              ref.doc("config").set({
                currency:this.formData.currency,
                tax:this.formData.tax,
                vat:this.formData.vat,
                shipping:this.formData.shipping,
                configuration:"done",
                timestamp:Date.now()
              })
          })
          .then((user)=>{
              // Make this user as an admin
              const addAdminRole = functions.httpsCallable('addAdminRole')
              addAdminRole({email:this.formData.email})
                  .then(result => {
                    console.log(result);                          
                  })
          })
          .then((user)=>{
              this.$router.replace('/setup-succss')
          })
          .catch((e)=>{
            this.feedback = e.message;
          })

        }else{
        this.feedback = "Confirm password not matched";
        }

      },
      signIn(){
        firebase.auth().signInWithEmailAndPassword(this.formData.email,this.formData.password)
        //.then((user)=>{
          //this.$router.replace('/dashboard');                               
        // })
        .then((user)=>{
          
          // Check user is admin
          firebase.auth().onAuthStateChanged(user =>{
            if(user){
               this.$router.replace('/dashboard');       

              user.getIdTokenResult().then(idTokenResult => {
                if(idTokenResult.claims.admin == true){
                    this.$router.replace('/dashboard');         
                }else{
                  firebase.auth().signOut()
                  .then((user)=>{
                    this.$router.replace('/admin')
                    this.feedback = "Wrong username or password";
                  }); 
                }
                console.log(idTokenResult.claims.admin);            
              })
             
            }
          })          
        })
        .catch((e)=>{
            this.feedback = "Wrong Email or Password"
            //alert(e.message)
        })
      }
    },
    created(){
      var self = this;
      var db = firebase.firestore();
      var settingsRef = db.collection("settings").doc("config");
      settingsRef.get().then(function(doc) {
        if (doc.exists) {
            self.setup = true
        }else{
            self.setup = false
        }
      })
    }
  }
</script>

<style>
.setup{ 
  color:#F16D07 !important;
}
.sign-in{
  margin-top:10%;
  color:#F16D07 !important;
}
.feedback-error{
  color: red;
  text-align: center;
}

</style>
