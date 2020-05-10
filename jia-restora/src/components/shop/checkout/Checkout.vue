<template>
    <div>
        <div class="progress_bar" v-show="ProgressBar" style="top:10;">
            <v-progress-circular
            indeterminate
            :size="50"
            :width="15"
            :rotate="180"
            :value="value"
            class="main_font_color"
            >            
            </v-progress-circular>
        </div>
       
        <form @submit.prevent="checkout" v-show="!ProgressBar">   
            <v-layout>       
                <!---------Feature----------------------->
                <v-container>
                    <v-layout row wrap>                 
                        <!--------------- Checkout ---------------------->                     
                        <v-flex xs12 sm12 md12 class="your_order pb-3 right_part">
                            <v-card>
                                <v-list xs12 style="border-bottom:1px solid #E0E0E0;">
                                    <v-list-tile>
                                    <v-list-tile-title  class="grey--text text--darken-3 title text-xs-center">YOUR ORDER</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                                <div class="white div_scroll">
                                    <div class="item_table">                           
                                        <v-list xs12 >
                                            <v-list-tile class="order_head">
                                                <v-list-tile-title class="body-2 grey--text text--darken-3"><b>No of Unique Item<span class="right body-2 main_font_color"> {{cart.length}}</span></b>
                                                </v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>                         
                                        <v-list xs12 >
                                            <v-list-tile class="order_head">
                                                <v-list-tile-title class="body-2 grey--text text--darken-3"><b>Subtotal<span class="right body-2 main_font_color">{{currency}}{{cartTotal}}</span></b>
                                                </v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                        <v-list xs12 >
                                            <v-list-tile class="order_head">
                                                <v-list-tile-title class="body-2 grey--text text--darken-3">
                                                <b>Shipping<span class="right body-2 grey--text text--darken-3"><span class="main_font_color">{{currency}}{{shipping}}</span></span></b>
                                                </v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                        <v-list xs12 >
                                            <v-list-tile>
                                                <v-list-tile-title class="title grey--text text--darken-3"><b>Total<span class="right title main_font_color">{{currency}}{{cartTotalWithShipping}}</span></b>
                                                </v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </div>
                                </div>                       
                                <v-list-tile-action>
                                    <v-btn type="submit" block dark class="mx-3 mb-3 main_color">Place order</v-btn>
                                </v-list-tile-action>
                                <p style="color:red;text-align:center;margin-top:5px;" v-if="this.feedback">{{this.feedback}}</p>      
                            </v-card>    
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-layout>
        </form>
    </div>
</template>
     
<script>
   import firebase from "firebase";
   import moment from 'moment'   
   export default {
    data(){
        return{
            currency:null,
            userId:null, 
            name:null,
            email:null,
            password:null,
            phone:null,
            email:null,
            country:null,
            city:null,
            address:null,
            shipping:null,           
            cart:[],
            timestamp:Date.now(),
            userLoggedin:null,
            checkoutTotal:null,
            account:[],   
            feedback:null,
            interval: {},
            value: 0,
            ProgressBar:true         
        }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    methods:{
        checkout(){
            var db = firebase.firestore();           
            var user = firebase.auth().currentUser;

            if(this.cart.length > 0){
                db.collection("orders").add({                
                    cart:this.cart,
                    quantity:this.cart.length,
                    checkout_total:this.checkoutTotal,
                    order_status:"Pending",
                    order_type:"Online Customer",
                    user_id:user.uid,
                    name:this.account.name,
                    email:this.account.email,               
                    phone:this.account.phone,               
                    country:this.account.country,               
                    city:this.account.city,               
                    address:this.account.address,
                    time:moment().format('HH-mm'),
                    date:moment().format('YYYY-MM-DD'),
                    duration:60,
                    created_date:moment().format('DD-MM-YYYY'),
                    created_month:moment().format('MM-YYYY'),               
                    created_year:moment().format('YYYY'),               
                    timestamp:Date.now()
                }).catch(function(err) {
                    console.log(err);                
                });

                this.$store.commit('emptyCart')                   
                this.$router.push({ name: 'Success'})
                this.$store.commit('rightNavbar', 0)         
            }else{
                this.feedback = "The cart is empty"
            }
                   
        }
    },
    computed:{
        cartTotal(){
            var total=0;
            this.cart.forEach(item => {
                total += parseFloat(item.product.price * item.quantity)
            });
            return total.toFixed(2);
        },
        cartTotalWithShipping(){
            var total=0;
            this.cart.forEach(item => {
                total += parseFloat(item.product.price * item.quantity)
            });
            this.checkoutTotal = ((parseFloat(total)+parseFloat(this.shipping))).toFixed(2);
            return (parseFloat(total)+parseFloat(this.shipping)).toFixed(2);
        }          
    },
    created(){
        var db = firebase.firestore();
        // Current Currency   
        db.collection("settings").doc('config').onSnapshot(doc =>{
          this.currency = doc.data().currency
        })
        
        // Current Shipping Fee
        db.collection("settings").doc('config').onSnapshot(doc =>{
            this.shipping = doc.data().shipping
        })

        var user = firebase.auth().currentUser;
        if (user) {
            this.userId = user.uid            
            this.email = user.email            
            this.userLoggedin = true;          
        } else {
            this.userLoggedin = false;            
        }

        // User Profile Information       
        db.collection("profiles").doc(this.userId).onSnapshot(doc =>{
          this.account = doc.data()          
        })
    },
    mounted(){
        this.cart = this.$store.getters.cart
        
        // Progress Bar - Set value after this.value to increase/ decrease progress time
        this.interval = setInterval(() => {
            if (this.value === 50) {
            return this.ProgressBar = false
            }
            this.value += 50
        }, 1000)
    }
   }
</script>
  
<style scoped>
  .progress_bar{
    height: 200px;  
    text-align: center;
    line-height: 200px;
  }
  .progress-circular{
    margin: 15rem
  }
</style>
