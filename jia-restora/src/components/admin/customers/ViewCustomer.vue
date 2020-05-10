<template>
  <v-app>
    <Navbar/>
    <div>
      <v-content>
        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex lg5>
              <v-card>
                <v-card-title><h4>Customer Details</h4></v-card-title>
                <v-divider></v-divider>
                <v-list dense class="pukulist">
                  <v-list-tile>
                    <v-list-tile-content><b>Customer Name:</b></v-list-tile-content>
                    <v-list-tile-content class="align-end">{{this.customer.name}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content><b>Email:</b></v-list-tile-content>
                    <v-list-tile-content class="align-end">{{this.customer.email}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content><b>Phone:</b></v-list-tile-content>
                    <v-list-tile-content class="align-end">{{this.customer.phone}}</v-list-tile-content>
                  </v-list-tile>              
                  <v-list-tile>
                    <v-list-tile-content><b>Country:</b></v-list-tile-content>
                    <v-list-tile-content class="align-end">{{this.customer.country}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content><b>City:</b></v-list-tile-content>
                    <v-list-tile-content class="align-end">{{this.customer.city}}</v-list-tile-content>
                  </v-list-tile> 
                  <v-list-tile>
                    <v-list-tile-content><b>Address:</b></v-list-tile-content>
                    <v-list-tile-content class="align-end">{{this.customer.address}}</v-list-tile-content>
                  </v-list-tile>                  
                </v-list>
              </v-card>
            </v-flex>         
            <v-flex lg7>
              <v-card>
                <v-card-title><h4>Purchase History</h4></v-card-title>             
                <v-divider></v-divider>
                <v-data-table
                  :headers="headers"
                  :items="customers"
                  :search="search"
                  :rows-per-page-items="rowsPerPageItems"
                  :pagination.sync="pagination"
                  row
                  wrap
                  class="elevation-1 mx-3">
                  <template slot="items" slot-scope="props">                            
                    <td class="text-xs-left">#{{ props.item.id }}</td>
                    <td class="text-xs-left">{{ props.item.timestamp }}</td>
                    <td class="text-xs-left">{{ props.item.quantity }}</td>
                    <td class="text-xs-left">{{currency}}{{ props.item.checkout_total }}</td>
                    <td class="text-xs-left">{{ props.item.order_status }}</td>
                  </template>
                </v-data-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
  import Navbar from '@/components/admin/navbar/Navbar'
  import db from '@/firebase/init'
  import moment from 'moment'
  export default {
    name:'ViewCustomer',
    components: {
      Navbar
    },
    data(){
      return{
        rowsPerPageItems: [8, 16, 24],
        pagination: {
        rowsPerPage: 8
        },
        customer:[],        
        name:null,
        email:null,
        phone:null,
        country:null,
        city:null,         
        address:null,         
        feedback:null, 
        currency:'',
        customerSalesRecords:[],
        headers: [                
          { text: 'Order ID' , value: 'id', sortable: !1 },  
          { text: 'Order Date' , value: 'created', sortable: !1 },  
          { text: 'Number Of Items' , value: 'quantity', sortable: !1 },
          { text: 'Total Price' , value: 'checkout_total', sortable: !1 },
          { text: 'Order Status' , value: 'order_status', sortable: !1 },                                         
        ],
        customers:[],
        search:'',    
      }
    },  
    methods:{         
          
    },
    created(){
      // Current Currency
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
      })

      // Single Customer
      db.collection("profiles").doc(this.$route.params.id).onSnapshot(doc =>{
        this.customer = doc.data()
        this.customer.id = doc.id
      })
  
      // Customer Purchase Records
      let ref = db.collection('orders').where("user_id","==",this.$route.params.id).orderBy('timestamp', 'desc')

      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
        if(change.type == 'added'){
            let doc = change.doc
            this.customers.push({
                id:doc.data().timestamp,                    
                timestamp:moment(doc.data().timestamp).format('ll'),      
                quantity:doc.data().quantity,               
                order_status:doc.data().order_status,               
                checkout_total:doc.data().checkout_total,               
            })
        }
        })
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
.primary--text {
  color: #F16D07 !important;
  caret-color: #F16D07 !important;
}
</style>
