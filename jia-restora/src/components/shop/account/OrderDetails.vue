<template>    
  <v-app>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex lg4>
          <v-card flat>
            <v-card-title><h4>Customer Details</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense class="pukulist">              
              <v-list-tile>
                <v-list-tile-content><b>Customer Name:</b></v-list-tile-content>
                <v-list-tile-content class="align-end">{{order.name}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content><b>Email:</b></v-list-tile-content>
                <v-list-tile-content class="align-end">{{order.email}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content><b>Phone:</b></v-list-tile-content>
                <v-list-tile-content class="align-end">{{order.phone}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content><b>Country:</b></v-list-tile-content>
                <v-list-tile-content class="align-end">{{order.country}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content><b>City:</b></v-list-tile-content>
                <v-list-tile-content class="align-end">{{order.city}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content><b>Delivery Address:</b></v-list-tile-content>
                <v-list-tile-content class="align-end">{{order.address}}</v-list-tile-content>
              </v-list-tile>               
            </v-list>
            <br><br>
            <v-card-title><h4>Order Details</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense class="pukulist">               
              <v-list-tile>
              <v-list-tile-content><b>Number of unique Item:</b></v-list-tile-content>
              <v-list-tile-content class="align-end">{{order.quantity}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
              <v-list-tile-content><b>Order Status:</b></v-list-tile-content>
              <v-list-tile-content class="align-end">{{order.order_status}}</v-list-tile-content>
              </v-list-tile>   
              <v-list-tile>
              <v-list-tile-content><b>Total Price:</b></v-list-tile-content>
              <v-list-tile-content class="align-end"><b>{{currency}}{{order.checkout_total}}</b></v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex lg8>
          <v-card flat>
            <v-card-title><h4>Cart Items</h4></v-card-title>             
            <v-divider></v-divider>
            <v-data-table
            :headers="headers"
            :items="order.cart"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            row
            wrap
            class="elevation-1"
            >
              <template slot="items" slot-scope="props">                            
                <td class="text-xs-left"><v-img :src="props.item.product.image" aspect-ratio="1" style="width:55px;"> </v-img></td>
                <td class="text-xs-left">{{ props.item.product.item_name }}</td>
                <td class="text-xs-left">{{currency}}{{ props.item.product.price }}</td>
                <td class="text-xs-left">{{ props.item.quantity }}</td>
                <td class="text-xs-left">{{currency}}{{props.item.quantity * props.item.product.price}}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>  
  </v-app>
</template>

<script>
  import firebase from "firebase";
  import moment from 'moment'
  export default {
    name:'OrderDetails', 
    data(){
    return{
      currency:null,
      rowsPerPageItems: [8, 16, 24],
      pagination: {
      rowsPerPage: 8
      },
      customer:[],
      order:[],      
      current_month_name:moment().format('MMMM'),
      current_year:moment().format('YYYY'),    
      currency:null,
      headers: [                
        { text: 'Image' , value: 'image', sortable: !1 },  
        { text: 'Product' , value: 'item_name', sortable: !1 },  
        { text: 'Price' , value: 'price', sortable: !1 },
        { text: 'Quantity' , value: 'quantity', sortable: !1 },
        { text: 'Total' , value: 'timestamp', sortable: !1 },                                         
      ],
      search:'',
      order_status:null,
      snackbar:false,
      processingSnackbar: false,
      completeSnackbar: false,
      cancelledSnackbar: false,
      orderProcessingText: 'Oder is processing now',
      orderCompleteText: 'Oder completed',
      orderCancelledText: 'Oder cancelled',
      timeout: 3000,          
    }
  },
  methods:{   
    orderProcessing(){       
      var db = firebase.firestore(); 
      let ref = db.collection('orders').doc(this.$route.params.id);
        ref.update({            
          order_status:"Processing"          
      }) 
      this.processingSnackbar = true    
    },
    orderComplete(){       
      var db = firebase.firestore(); 
      let ref = db.collection('orders').doc(this.$route.params.id);
        ref.update({            
          order_status:"Complete"          
      }) 
      this.completeSnackbar = true    
    },
    orderCancelled(){       
      var db = firebase.firestore(); 
      let ref = db.collection('orders').doc(this.$route.params.id);
        ref.update({            
          order_status:"Cancelled"          
      }) 
      this.cancelledSnackbar = true    
    }
  },
  created(){
    // Show data of a specific Order
    var db = firebase.firestore(); 
    db.collection("orders").doc(this.$route.params.id).onSnapshot(doc =>{
       this.order = doc.data()
       this.order.id = doc.id
    })
    
    // Current Currency   
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
    })    
  }
  }
</script>

<style>
  tbody a{
    font-size: 13px;
    color:black;
    text-decoration: underline;
  }
  h1{
    width: 100%;
  }
  h4{
    width: 100%;
  }
  .updates-heading{
    margin-left: 25px;
  }
  light.divider, .theme--light .divider {
      background-color: rgba(0,0,0,.12);
  }
  .monthy_total{
    float: right;
    margin-left: 50px;
  }
</style>
