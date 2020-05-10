<template>    
  <div>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm12>
          <h1>Order History</h1>
            <br>
            <router-link to="/account">Account </router-link> &nbsp;&nbsp;       
            <router-link to="/edit-account">Edit Account </router-link>&nbsp;&nbsp;             
            <router-link to="/order-history">Order History</router-link>&nbsp;&nbsp;          
            <router-link to="/account-settings">Settings</router-link>      
            <v-card-title>
              <v-spacer></v-spacer>  
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="customers"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            row
            wrap
            class="elevation-1"
            >
            <template slot="items" slot-scope="props">                            
              <td class="order_id"><router-link :to="{ name: 'OrderDetails', params: {id:props.item.id} }">#{{ props.item.order_id }}</router-link></td>
              <td class="text-xs-center">{{ props.item.timestamp }}</td>
              <td class="text-xs-center">{{ props.item.quantity }}</td>
              <td class="text-xs-center">{{currency}}{{ props.item.checkout_total }}</td>
              <td class="text-xs-center">{{ props.item.order_status }}</td>
            </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
              <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>   
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
        rowsPerPageItems: [8, 16, 24],
        pagination: {
          rowsPerPage: 8
        },
        headers: [                
          { text: 'Order ID' , value: 'id', sortable: !1 },  
          { text: 'Order Date' , value: 'created', sortable: !1 },  
          { text: 'Number Of Items' , value: 'quantity', sortable: !1 },
          { text: 'Total Price' , value: 'checkout_total', sortable: !1 },
          { text: 'Order Status' , value: 'order_status', sortable: !1 },                                         
        ]                       
      }
    },
    methods:{
       
    },
    created(){
      var db = firebase.firestore();
      // Current Currency   
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
      })     

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

      // Show All Orders
      let ref = db.collection('orders').where("user_id","==",this.userId).orderBy('timestamp', 'desc')

      ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
              let doc = change.doc
              this.customers.push({
                  id:doc.id,                    
                  order_id:doc.data().timestamp,         
                  timestamp:moment(doc.data().timestamp).format('ll'),      
                  quantity:doc.data().quantity,               
                  order_status:doc.data().order_status,               
                  checkout_total:doc.data().checkout_total,               
              })
          }
          })
        })
        // Current User
        var user = firebase.auth().currentUser;
        if (user) {
            this.userId = user.uid            
            this.userLoggedin = true;                
        } else {
            this.userLoggedin = false;            
        }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }   
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
