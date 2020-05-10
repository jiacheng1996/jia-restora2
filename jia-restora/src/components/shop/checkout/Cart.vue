<template>    
    <div>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 sm12 md8 class="cart_table">
                    <v-data-table
                    :headers="headers"
                    :items="cart"
                    :search="search"
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"
                    row
                    wrap
                    class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">                            
                            <td class="text-xs-left"><v-icon @click="removeCart(index)" small>close</v-icon></td>
                            <td class="text-xs-left">                       
                                <v-img :src="props.item.product.image" aspect-ratio="1" style="width:55px;"> </v-img>
                            </td>
                            <td class="text-xs-left">{{ props.item.product.item_name }}</td>
                            <td class="text-xs-left d-flex item_table pa-2">
                                <v-icon @click="increaseQuantity(props.index)" class="add">add</v-icon>
                                <v-card-text class="quantity_no">{{props.item.quantity}}</v-card-text>
                                <v-card-actions v-if="props.item.quantity > 1">
                                <v-icon @click="decreaseQuantity(props.index)" class="remove">remove</v-icon>
                                </v-card-actions>
                                <v-card-actions v-else>
                                <v-icon class="remove">remove</v-icon>
                                </v-card-actions>
                            </td>
                            <td class="text-xs-left">{{currency}}{{ props.item.product.price }}</td>
                            <td class="text-xs-left"> {{currency}}{{(props.item.product.price*props.item.quantity).toFixed(2)}}</td>                    
                        </template>
                    </v-data-table>  
                </v-flex>
                <v-flex xs12 sm12 md4>
                    <v-card>
                        <v-list style="border-bottom:1px solid #E0E0E0;">
                            <v-list-tile>
                            <v-list-tile-title  class="grey--text text--darken-3 title ">CART TOTAL</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                        <v-list style="border-bottom:1px solid #E0E0E0;">
                            <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title class="body-1">Subtotal<span class="right main_font_color">{{currency}}{{cartTotal}}</span>
                                </v-list-tile-title>
                            </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                        <v-flex xs12 d-flex class="right_part_shipment" style="border-bottom:1px solid #E0E0E0;">
                            <v-flex xs6 class="shipment">
                                <p class="body-1">Shipping</p>
                            </v-flex>
                            <v-flex xs6 class="shipping_cost main_font_color">
                                <p><span>{{currency}}{{shipping}}</span></p>
                            </v-flex>
                        </v-flex>
                        <v-list>
                            <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title class="title grey--text text--darken-3">Total<span class="right main_font_color">{{currency}}{{cartTotalWithShipping}}</span>
                                </v-list-tile-title>
                            </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                        <v-list>
                            <v-list-tile-action>
                                <v-btn @click="checkout()" block class="mx-3 mb-3 main_color white--text">Proceed to checkout</v-btn>                            
                            </v-list-tile-action>
                            <p style="color:red;text-align:center;margin-bottom:5px;" v-if="this.feedback">{{this.feedback}}</p>
                        </v-list>
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
            currency:null,
            search:'',
            userId:null,             
            userLoggedin:null,
            account:[],
            customers:[],
            shipping:null,
            rowsPerPageItems: [8, 16, 24],
            pagination: {
             rowsPerPage: 8
            },      
            feedback:null,
            headers: [                
              { text: 'Remove', sortable: !1 },  
              { text: 'Image' , sortable: !1 },  
              { text: 'Item' , sortable: !1 },
              { text: 'Quantity', sortable: !1 },
              { text: 'Price', sortable: !1 },                                         
              { text: 'Total', sortable: !1 },                                         
            ],
            cart:this.$store.getters.cart                       
        }
    },
 methods:{
        removeCart(index){
            this.$store.commit('removeCart', index)     
        },
        checkout(){
            if(this.cart.length > 0 ){
                if(this.userLoggedin == true){
                  this.$router.replace('/checkout')
                  location.reload();     
                }else{
                  this.$router.replace('/sign-in') 
                }
            }else{
                this.feedback = "Please add item to cart for checkout";  
            }  
        },
        increaseQuantity(index){
            this.$store.commit('increaseQuantity', index)
        },
        decreaseQuantity(index){
            this.$store.commit('decreaseQuantity', index)
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
            this.userLoggedin = true;                
        } else {
            this.userLoggedin = false;            
        }        
    }  
   }
 </script>
  
<style scoped>
    a {
    text-decoration: underline;  
    }
    .elevation-1 {
        margin:0!important;
    }
    .item_table .v-card__text{
    padding:0px !important;
    }
    .v-list__tile {
    height: 38px;
    }  
    .item_table{
        height:auto;
        padding: 0;
    }
    .item_table .v-card__actions{
        padding:0;
    }
    .item_table .material-icons  {
        font-size: 21px;
    }

    .item_table .add{
        cursor:pointer;
        border:1px solid #E0E0E0;
        border-right:none;
    }
    .item_table .remove{
        cursor:pointer;
        border:1px solid #E0E0E0;
        border-left:none;
        width:25px;
    }
    .item_table .quantity_no{
        border:1px solid #E0E0E0;
        width:100%;
        justify-items: center;
        align-items: center;
        text-align: center;
    }
    .item_table .total{
        height: auto;
        width:15%; 
        display: grid;
        justify-items: center;
        align-items: center;
        text-align: center;
    }
    .right_part_shipment .shipment{
        display: grid;
        align-items: center;
    }
    .shipping_cost{
        text-align: right;
    }
    .shipping_cost p:nth-of-type(1){
        margin-top: 10px;
    }
</style>

