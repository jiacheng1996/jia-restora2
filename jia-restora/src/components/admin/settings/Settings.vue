<template>
  <v-app>
    <Navbar/>
    <div class="admin_setting">
      <v-content>

        <form @submit.prevent="editEmail">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 center">
              <h4>Update Email</h4>
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-flex xs10 align-center justify-space-between>
                <v-text-field
                  v-model="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs10>
                <v-btn type="submit" block class="main_color" dark>Email Update</v-btn>
              </v-flex>
              <p class="feedback-successful" v-if="emailFeedback">{{emailFeedback}}</p>
            </v-container>
          </v-card>
        </form>

        <form @submit.prevent="editPassword">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 center">
              <h4>Update Password</h4>
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-flex xs10 align-center justify-space-between>
                 <v-text-field
                  v-model="password"
                  name="password"
                  placeholder="New Password"
                  type="password"
                  required>
                 </v-text-field>
              </v-flex>
              <v-flex xs10>
                <v-btn type="submit" block class="main_color" dark>Password Update</v-btn>
              </v-flex>
              <p class="feedback-successful" v-if="passowrdFeedback">{{passowrdFeedback}}</p>
            </v-container>
          </v-card>
        </form>

        <form @submit.prevent="changeCurrency">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 center">
            <h4>Update Currency</h4>
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs10 align-center justify-space-between>
                  <v-layout align-center>
                    <v-text-field
                      prepend-icon="local_atm"
                      placeholder="Currency"
                      v-model="currency"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs10>
                  <v-btn type="submit" block class="main_color" dark>Currency Update</v-btn>
                </v-flex>
                <p class="feedback-successful" v-if="currencyFeedback">{{currencyFeedback}}</p>
              </v-layout>
            </v-container>
          </v-card>
        </form>

        <form @submit.prevent="changeTax">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 center">
            <h4>Update Tax %</h4>
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs10 align-center justify-space-between>
                  <v-layout align-center>
                    <v-text-field
                      prepend-icon="local_atm"
                      placeholder="Tax"
                      v-model="tax"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs10>
                  <v-btn type="submit" block class="main_color" dark>Tax Rate Update</v-btn>
                </v-flex>
                <p class="feedback-successful" v-if="taxFeedback">{{taxFeedback}}</p>
              </v-layout>
            </v-container>
          </v-card>
        </form>

        <form @submit.prevent="changeVat">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 center">
            <h4>Update Vat %</h4>
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs10 align-center justify-space-between>
                  <v-layout align-center>
                    <v-text-field
                      prepend-icon="local_atm"
                      placeholder="Vat"
                      v-model="vat"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs10>
                  <v-btn type="submit" block class="main_color" dark>Vat Rate Update</v-btn>
                </v-flex>
                <p class="feedback-successful" v-if="vatFeedback">{{vatFeedback}}</p>
              </v-layout>
            </v-container>
          </v-card>
        </form>

        <form @submit.prevent="changeShipping">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 center">
              <h4>Update Shipping Fee</h4>
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs10 align-center justify-space-between>
                  <v-layout align-center>
                    <v-text-field
                      prepend-icon="local_atm"
                      placeholder="Shipping"
                      v-model="shipping"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs10>
                  <v-btn type="submit" block class="main_color" dark>Shipping Fee Update</v-btn>
                </v-flex>
                <p class="feedback-successful" v-if="shippingFeedback">{{shippingFeedback}}</p>
              </v-layout>
            </v-container>
          </v-card>
        </form>

        <form @submit.prevent="changeCompanyName">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 center">
              <h4>Company Name</h4>
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs10 align-center justify-space-between>
                  <v-layout align-center>
                    <v-text-field
                      prepend-icon="local_atm"
                      placeholder="Company Name"
                      v-model="company_name"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs10>
                  <v-btn type="submit" block class="main_color" dark>Company Name Update</v-btn>
                </v-flex>
                <p class="feedback-successful" v-if="companyNameFeedback">{{companyNameFeedback}}</p>
              </v-layout>
            </v-container>
          </v-card>
        </form>

        <form @submit.prevent="changeCompanyAddress">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 center">
              <h4>Company Address</h4>
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs10 align-center justify-space-between>
                  <v-layout align-center>
                    <v-text-field
                      prepend-icon="local_atm"
                      placeholder="Company Address"
                      v-model="company_address"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs10>
                  <v-btn type="submit" block class="main_color" dark>Company address Update</v-btn>
                </v-flex>
                <p class="feedback-successful" v-if="companyAddressFeedback">{{companyAddressFeedback}}</p>
              </v-layout>
            </v-container>
          </v-card>
        </form>

        <form @submit.prevent="changeCompanyMobile">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 center">
              <h4>Company Mobile</h4>
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs10 align-center justify-space-between>
                  <v-layout align-center>
                    <v-text-field
                      prepend-icon="local_atm"
                      placeholder="Company Mobile"
                      v-model="company_mobile"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs10>
                  <v-btn type="submit" block class="main_color" dark>Company Mobile Update</v-btn>
                </v-flex>
                <p class="feedback-successful" v-if="companyMobileFeedback">{{companyMobileFeedback}}</p>
              </v-layout>
            </v-container>
          </v-card>
        </form>

        <form @submit.prevent="changeAboutPageText">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 center">
              <h4>About Page Text</h4>
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs10 align-center justify-space-between>
                  <v-layout align-center>
                    <v-text-field
                      prepend-icon="local_atm"
                      placeholder="About Page Text"
                      v-model="about_page_text"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs10>
                  <v-btn type="submit" block class="main_color" dark>About Page Text Update</v-btn>
                </v-flex>
                <p class="feedback-successful" v-if="aboutPageTextFeedback">{{aboutPageTextFeedback}}</p>
              </v-layout>
            </v-container>
          </v-card>
        </form>

      </v-content>
    </div>
  </v-app>
</template>

<script>
  import Navbar from '@/components/admin/navbar/Navbar'
  import firebase from 'firebase'
  import moment from 'moment'
  export default {
    name:'Settings',
    components: {
      Navbar
    },
    data(){
      return{
        passowrdFeedback:'',
        currencyFeedback:'',
        taxFeedback:'',
        password:null,
        newPassword:null,
        userCurrentEmail:'',
        currency:'',
        tax:null,
        vat:null,
        vatFeedback:null,
        email:'',
        emailFeedback:'',
        shipping:'',
        shippingFeedback:'',
        company_name:'',
        companyNameFeedback:'',
        company_address:'',
        companyAddressFeedback:'',
        company_mobile:'',
        companyMobileFeedback:'',
        about_page_text:'',
        aboutPageTextFeedback:''
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
      // Current Currency
      var db = firebase.firestore();
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
      })

      // Current Tax
      var db = firebase.firestore();
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.tax = doc.data().tax
      })

      // Current Vat
      var db = firebase.firestore();
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.vat = doc.data().vat
      })

      // Current Shipping
      var db = firebase.firestore();
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.shipping = doc.data().shipping
      })
      
      // Company Name
      var db = firebase.firestore();
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.company_name = doc.data().company_name
      })
      
      // Company Address
      var db = firebase.firestore();
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.company_address = doc.data().company_address
      })

      // Company Mobile
      var db = firebase.firestore();
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.company_mobile = doc.data().company_mobile
      })

      // About page text
      var db = firebase.firestore();
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.about_page_text = doc.data().about_page_text
      })
    },
    methods:{
      editEmail(){
        var user = firebase.auth().currentUser;         

        user.updateEmail(this.email)
        .then(() => {             
          firebase.auth().signOut()
          this.$router.replace('/setup')                  
        }).catch((error) => {
          this.emailFeedback = error.message
        });
      },    
      editPassword(){
        var user = firebase.auth().currentUser;  

        user.updatePassword(this.password)
        .then(() => {             
          firebase.auth().signOut()
          this.$router.replace('/setup')               
        }).catch(function(error) {
          console.log(error);
        }); 
      },    
      changeCurrency(){
        if(this.currency){
        var db = firebase.firestore();  
        let ref = db.collection('settings').doc('config');
          ref.update({
            currency:this.currency
          })
          this.currencyFeedback="Currency updated successfully"
        }
      },
      changeTax(){
        if(this.tax){
        var db = firebase.firestore();  
        let ref2 = db.collection('settings').doc('config');
          ref2.update({
            tax:this.tax
          })
          this.taxFeedback="Tax rate updated successfully"
        }
      },
      changeVat(){
        if(this.vat){
        var db = firebase.firestore();  
        let ref2 = db.collection('settings').doc('config');
          ref2.update({
            vat:this.vat
          })
          this.vatFeedback="Vat rate updated successfully"
        }
      },
      changeShipping(){
        if(this.shipping){
        var db = firebase.firestore();  
        let ref3 = db.collection('settings').doc('config');
          ref3.update({
            shipping:this.shipping
          })
          this.shippingFeedback="Shipping fee updated successfully"
        }
      },
      changeCompanyName(){
        if(this.company_name){
        var db = firebase.firestore();  
        let ref3 = db.collection('settings').doc('config');
          ref3.update({
            company_name:this.company_name
          })
          this.companyNameFeedback="Comapny Name updated successfully"
        }
      },
      changeCompanyMobile(){
        if(this.company_mobile){
        var db = firebase.firestore();  
        let ref3 = db.collection('settings').doc('config');
          ref3.update({
            company_mobile:this.company_mobile
          })
          this.companyMobileFeedback="Comapny Mobile updated successfully"
        }
      },
      changeCompanyAddress(){
        if(this.company_address){
        var db = firebase.firestore();  
        let ref3 = db.collection('settings').doc('config');
          ref3.update({
            company_address:this.company_address
          })
          this.companyAddressFeedback="Comapny Address updated successfully"
        }
      },
      changeAboutPageText(){
        if(this.about_page_text){
        var db = firebase.firestore();  
        let ref3 = db.collection('settings').doc('config');
          ref3.update({
            about_page_text:this.about_page_text
          })
          this.aboutPageTextFeedback="About page text updated successfully"
        }
      },
    }
  }
</script>

<style>
  .feedback-successful{
    color: green;
    text-align: center;
  }
  h4{
    margin-left: 1%;
  }
  .v-text-field__slot .primary--text {
  color: #F16D07 !important;
  caret-color: #F16D07 !important;
}
.admin_setting .primary--text {
  color: #F16D07 !important;
  caret-color: #F16D07 !important;
}
</style>
