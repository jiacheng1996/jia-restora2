<template>
  <v-app>
    <Navbar/>
    <div>
      <v-content>
        <v-container grid-list-lg class="view_order">
          <v-layout row wrap>
            <v-flex xs12 md5>
              <v-card>
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
                      <v-list-tile-content><b>Order No:</b></v-list-tile-content>
                      <v-list-tile-content class="align-end"><b>#{{order.timestamp}}</b></v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content><b>Number of Unique Item:</b></v-list-tile-content>
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
                  <br><br>
                  <div v-if="delivery">               
                    <v-card-title><h4>Delivery Details </h4></v-card-title>
                    <v-divider></v-divider>
                    <v-list dense class="pukulist">               
                      <v-list-tile>
                        <v-list-tile-content><b>Delivery Person:</b></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{delivery.delivery_person_name}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content><b>Delivery Date:</b></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{delivery.date}}</v-list-tile-content>
                      </v-list-tile>   
                      <v-list-tile>
                        <v-list-tile-content><b>Delivery Time:</b></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{delivery.time}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content><b>Delivery Status:</b></v-list-tile-content>
                        <v-list-tile-content class="align-end">
                          <b>This order is {{order.order_status}} </b>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </div>       
                  <div v-else>
                    <v-divider></v-divider>
                    <v-list dense class="pukulist">
                      <v-list-tile>
                        <v-list-tile-content><b>Delivery Person</b></v-list-tile-content>
                          <v-flex xs6>
                            <v-select                         
                              v-bind:items="deliveryPerson"
                              v-model="delivery_person_name"
                              label="Select Person"
                              item-text="name"
                              item-value="name"
                              single-line                      
                            ></v-select>
                          </v-flex>                    
                        </v-list-tile>
                        <v-list-tile style="margin-top:10px">
                          <v-list-tile-content><b>Delivery Date</b></v-list-tile-content>
                          <v-flex xs12 lg6>
                            <v-menu
                              ref="menu1"
                              :close-on-content-click="false"
                              v-model="menu1"
                              :nudge-right="40"
                              lazy
                              transition="scale-transition"
                              offset-y
                              full-width
                              max-width="290px"
                              min-width="290px"
                            >
                            <v-text-field
                              slot="activator"
                              v-model="date"
                              placeholder="Date"
                              persistent-hint 
                            ></v-text-field>
                            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                          </v-menu>
                        </v-flex>
                      </v-list-tile>
                      <v-list-tile style="margin-top:10px">
                        <v-list-tile-content><b>Delivery Time</b></v-list-tile-content>
                        <v-flex xs12 lg6>
                          <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            v-model="menu3"
                            :nudge-right="40"
                            :return-value.sync="time"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                          >
                            <v-text-field
                              slot="activator"
                              v-model="time"
                              placeholder="Time"                             
                              readonly
                            ></v-text-field>
                            <v-time-picker
                              v-if="menu3"
                              v-model="time"
                              full-width
                              @change="$refs.menu.save(time)"
                            ></v-time-picker>
                          </v-menu>
                        </v-flex>
                      </v-list-tile>
                    </v-list>
                  </div>
                  <br>
                  <v-divider></v-divider>
                  <v-flex  class="order_action justify-center py-2" > 
                    <v-btn  @click="orderProcessing(order.id)" small color="primary" dark>Processing</v-btn>
                    <v-btn @click="orderComplete(order.id)" small color="success" dark>Complete</v-btn>
                    <v-btn @click="orderCancelled(order.id)" small color="error" dark>Cancelled</v-btn>
                  </v-flex>
                </v-card>
              </v-flex>
              <v-flex xs12 md7>
                <v-card>
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
                  class="elevation-1 mx-3"
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
            <div class="text-center"> 
              <v-snackbar
                v-model="processingSnackbar"
                :timeout="timeout"
              >
                {{ orderProcessingText }}             
                <v-btn
                  color="blue"
                  text
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </v-snackbar>
            </div>
            <div class="text-center"> 
              <v-snackbar
                v-model="completeSnackbar"
                :timeout="timeout"
              >              
                {{ orderCompleteText }}
                <v-btn
                  color="blue"
                  text
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </v-snackbar>
            </div>
            <div class="text-center"> 
              <v-snackbar
                v-model="cancelledSnackbar"
                :timeout="timeout"
              >              
                {{ orderCancelledText }}
                <v-btn
                  color="blue"
                  text
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </v-snackbar>
            </div>
          </v-layout>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
  import Navbar from '@/components/admin/navbar/Navbar'
  import firebase from "firebase";
  import moment from 'moment'
  export default {
    name:'ViewOrder',
    components: {
      Navbar
    },
    data(){
      return{
        rowsPerPageItems: [8, 16, 24],
        pagination: {
        rowsPerPage: 8
        },     
        order:[],      
        current_month_name:moment().format('MMMM'),
        current_year:moment().format('YYYY'),    
        currency:'',
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
        orderProcessingText: 'Oder is processing for delivery',
        orderCompleteText: 'Oder completed successfully',
        orderCancelledText: 'Oder cancelled',
        timeout: 3000,
        deliveryPerson:[],
        delivery_person_name:this.delivery_person_name,
        date:this.date,
        time:this.time,
        menu1: false,
        menu3: false,     
        delivery:[],     
      }
    },
    methods:{   
      orderProcessing(id){       
        var db = firebase.firestore(); 
        // Change order status
        let orderRef = db.collection('orders').doc(this.$route.params.id);
          orderRef.update({            
            order_status:"Processing"          
        })
        // Order processing for delivery 
        if(this.delivery_person_name && this.date && this.time){
        let deliveryRef = db.collection('deliveries').doc(this.$route.params.id);
        deliveryRef.set({
          id:this.$route.params.id,
          order_id:this.order.timestamp,
          delivery_person_name:this.delivery_person_name,
          date:this.date,
          time:this.time,
          delivery_status:"Processing",
          duration:60,      
          created_date:moment().format('DD-MM-YYYY'),
          created_month:moment().format('MM-YYYY'),
          timestamp:Date.now()
        })
        this.delivery_person_name=null
        this.date=null
        this.time=null
        }
        this.processingSnackbar = true    
      },
      orderComplete(id){       
        var db = firebase.firestore(); 
        let ref = db.collection('orders').doc(this.$route.params.id);
          ref.update({            
            order_status:"Complete",
            created_date:moment().format('DD-MM-YYYY'),
            created_month:moment().format('MM-YYYY'),               
            created_year:moment().format('YYYY'),                    
        })
        let deliveryRef = db.collection('deliveries').doc(id);
            deliveryRef.update({            
            delivery_status:"Complete"          
        })
        
        this.completeSnackbar = true    
      },
      orderCancelled(id){       
        var db = firebase.firestore(); 
        let ref = db.collection('orders').doc(this.$route.params.id);
          ref.update({            
            order_status:"Cancelled"          
        }) 
        this.cancelledSnackbar = true    
      }
    },
    created(){
      var db = firebase.firestore(); 

      // Current Currency
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
      })

      // Show data of a specific Order
      var db = firebase.firestore(); 
      db.collection("orders").doc(this.$route.params.id).onSnapshot(doc =>{
        this.order = doc.data()
        this.order.id = doc.id
      })
      
      // Show All Delivery Person
      let ref = db.collection('delivery_person').orderBy('timestamp', 'desc')      
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.deliveryPerson.push({
              id:doc.id,
              name:doc.data().name
            })
          }
        })
      }) 
      // Delivery details
      db.collection("deliveries").doc(this.$route.params.id).onSnapshot(doc =>{
        this.delivery = doc.data()      
      })
    }
  }
</script>

<style scoped>
  .view_order .elevation-1{
    margin:0!important;
  }
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
  .order_action{
    width:100%;
    display:flex;
    text-align: center;
  }
  .primary--text {
    color: #F16D07 !important;
    caret-color: #F16D07 !important;
}

 .v-picker__title.primary{
    background-color: #F16D07 !important;
    border-color: #F16D07 !important;
}

  @media (max-width:346px){
    .order_action{
      width:100%;
      display:grid;
      text-align: center;
    }
    .v-btn {
      height: 36px;
      font-size: 14px;
      font-weight: 500;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      margin: 6px 8px;
      min-width: 100%!important;
    }
  }
  .v-date-picker-table .v-btn.v-btn--active {
    background-color: #F16D07 !important;
    border-color: #F16D07 !important;
}
</style>
