<template>
  <v-app>
    <Navbar/>
    <div>
      <v-content>
        <v-card flat>
          <v-container
            fluid
            style="min-height: 0;"
            grid-list-lg
          >
            <v-layout row wrap>              
              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'OrderType', params: {type:'Pending'}}">
                  <v-card class="project_item main_color">
                    <h1 class="white--text">Pending</h1>
                    <h4 class="white--text">Total Orders : {{total_pending_orders}}</h4>
                  </v-card>
                </router-link>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'OrderType', params: {type:'Processing'}}">
                  <v-card class="project_item main_color">
                    <h1 class="white--text">Processing</h1>
                    <h4 class="white--text">Total Orders : {{total_processing_orders}}</h4>
                  </v-card>
                </router-link>
              </v-flex>
               <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'OrderType', params: {type:'Complete'}}">
                  <v-card class="project_item main_color">
                    <h1 class="white--text">Complete</h1>
                    <h4 class="white--text">Total Orders : {{total_complete_orders}}</h4>
                  </v-card>
                </router-link>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'OrderType', params: {type:'Cancelled'}}">
                  <v-card class="white--text project_item main_color">
                    <h1 class="white--text">Cancelled</h1>
                    <h4 class="white--text">Total Orders : {{total_cancelled_orders}}</h4>
                  </v-card>
                </router-link>
              </v-flex>             
            </v-layout>
          </v-container>
        </v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search Orders"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="orders"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          class="elevation-1 mx-3"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left order_id"><router-link :to="{ name: 'ViewOrder', params: {id:props.item.id} }">#{{ props.item.order_id }}</router-link></td>
            <td class="text-xs-left">{{ props.item.timestamp }}</td>
            <td class="text-xs-left">{{ props.item.quantity }}</td>
            <td class="text-xs-left">{{currency}}{{ props.item.checkout_total}}</td>
            <td class="text-xs-left">{{ props.item.order_status }}</td>
            <v-btn fab dark small color="pink" @click="removeOrder(props.item.id)">
               <v-icon dark>remove</v-icon>
            </v-btn>           
          </template>
        </v-data-table> 
      </v-content>
    </div>
  </v-app>
</template>

<script>
  import Navbar from '@/components/admin/navbar/Navbar'
  import firebase from "firebase";
  import moment from 'moment'   
  export default {
    name:'Orders',
    components: {
      Navbar
    },
    data(){
      return{
        currency:'',
        search: '',
        rowsPerPageItems: [8, 16, 24],
        pagination: {
        rowsPerPage: 8
        },
        orders:[],
        headers: [                
            { text: 'Order ID' , value: 'order_id', sortable: !1 },  
            { text: 'Order Date' , value: 'timestamp', sortable: !1 },  
            { text: 'Number Of Items' , value: 'quantity', sortable: !1 },
            { text: 'Total Price' , value: 'checkout_total', sortable: !1 },
            { text: 'Order Status' , value: 'order_status', sortable: !1 },
            { text: 'Action' , value: 'action', sortable: !1 },
        ],    
        total_pending_orders:null,
        total_processing_orders:null,
        total_complete_orders:null,
        total_cancelled_orders:null, 
      }
    },
    methods:{
        removeOrder(id){
          var deleteResult = confirm("Want to delete?");
          if (deleteResult){
            var db = firebase.firestore();  
            db.collection('orders').doc(id).delete().then(() => {
              this.orders = this.orders.filter(order => {
                return order.id != id
              })
            })
          }
        }
    },
    created(){
        var db = firebase.firestore();

        // Current Currency
        db.collection("settings").doc('config').onSnapshot(doc =>{
          this.currency = doc.data().currency
        })

        // Show All Orders
        let ref = db.collection('orders').where("order_type", "==", "Online Customer").orderBy('timestamp', 'desc')

        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
            if(change.type == 'added'){
                let doc = change.doc
                this.orders.push({
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

        // Total order in Pending
        db.collection('orders').where("order_status", "==", "Pending")
      .get()
      .then(snapshot => {
            this.total_pending_orders = snapshot.size;
        })

        // Total order in Pending
        db.collection('orders').where("order_status", "==", "Processing")
      .get()
      .then(snapshot => {
            this.total_processing_orders = snapshot.size;
        })

        // Total order in Complete
        db.collection('orders').where("order_status", "==", "Complete")
      .get()
      .then(snapshot => {
            this.total_complete_orders = snapshot.size;
        })

        // Total order in Cancelled
        db.collection('orders').where("order_status", "==", "Cancelled")
      .get()
      .then(snapshot => {
            this.total_cancelled_orders = snapshot.size;
        })      

      },
      computed: {
      
      }
  }
</script>

<style scoped>
  .project_item{
    padding:20px;
		-webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
		-ms-transition: all 0.5s;
		-o-transition: all 0.5s;
		transition: all 0.5s;
  }
  .project_item:hover{
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
	}
  td{
    text-align: center;
  }
  .order_id a{
    text-decoration: underline !important;
    color: black;
  }
  .primary--text {
    color: #F16D07 !important;
    caret-color: #F16D07 !important;
}
</style>
