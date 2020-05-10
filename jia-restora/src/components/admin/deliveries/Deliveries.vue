<template>
  <v-app>
    <Navbar/>
    <div>
      <v-content>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search Deliveries"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="deliveries"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          class="elevation-1 mx-3"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left"><router-link :to="{ name: 'ViewOrder', params: {id:props.item.id} }">#{{ props.item.order_id }}</router-link></td>
            <td class="text-xs-left">{{ props.item.delivery_person_name }}</td>
            <td class="text-xs-left">{{ props.item.date }}</td>
            <td class="text-xs-left">{{ props.item.time }}</td>
            <td class="text-xs-left">{{ props.item.delivery_status }}</td>
            <v-btn fab dark small color="green" @click="completeDelivery(props.item.id)">
               <v-icon dark>done</v-icon>
            </v-btn>
            <v-btn fab dark small color="pink" @click="removeDelivery(props.item.id)">
               <v-icon dark>remove</v-icon>
            </v-btn>
          </template>
        </v-data-table> 
        <div class="text-center"> 
          <v-snackbar
            v-model="completeSnackbar"
            :timeout="timeout"
          >              
            {{ deliveryCompleteText }}
            <v-btn
              color="blue"
              text
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        </div>
      </v-content>
    </div>
  </v-app>
</template>

<script>
  import Navbar from '@/components/admin/navbar/Navbar'
  import firebase from "firebase";
  import moment from 'moment'
  export default {
    name:'Deliveries',
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
        deliveries:[],
        headers: [
        { text: 'Order ID', value: 'order_id', sortable: !1 },
        { text: 'Delivery Person' , value: 'delivery_person_name', sortable: !1 },
        { text: 'Delivery Date' , value: 'date', sortable: !1 },
        { text: 'Time' , value: 'time', sortable: !1 },
        { text: 'Status' , value: 'delivery_status', sortable: !1 },
        { text: 'Action' , value: 'action', sortable: !1 },
        ],
        timeout: 3000,
        completeSnackbar: false,
        deliveryCompleteText: 'Delivery completed successfully',
      }
    },
    methods:{
      removeDelivery(id){
          var deleteResult = confirm("Want to delete?");
          if (deleteResult) {
          var db = firebase.firestore();   
          db.collection('deliveries').doc(id).delete().then(() => {
              this.deliveries = this.deliveries.filter(delivery => {
              return delivery.id != id
              })
          })
          }
      },
      completeDelivery(id){
        var db = firebase.firestore(); 
        let orderRef = db.collection('orders').doc(id);
          orderRef.update({            
            order_status:"Complete",
            created_date:moment().format('DD-MM-YYYY'),
            created_month:moment().format('MM-YYYY'),               
            created_year:moment().format('YYYY'),               
        })
        let deliveryRef = db.collection('deliveries').doc(id);
          deliveryRef.update({            
            delivery_status:"Complete"          
        }).then(() => {
            this.deliveries = this.deliveries.filter(delivery => {
            return delivery.id != id
            })
        })
        this.completeSnackbar = true 
      }        
    },
    created(){
      var db = firebase.firestore(); 
      // Current Currency
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
      })

      // Show All Deliveries
      let ref = db.collection('deliveries').where("delivery_status", "==", "Processing").orderBy('timestamp', 'desc')

      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.deliveries.push({
              id:doc.data().id,
              order_id:doc.data().order_id,
              delivery_person_name:doc.data().delivery_person_name,
              date:doc.data().date,
              time:doc.data().time,
              delivery_status:doc.data().delivery_status,
              timestamp:moment(doc.data().timestamp).format('ll')
            })
          }
        })
      })
    },
  }
</script>

<style>
  td{
    text-align: center;
  }
  .primary--text {
    color: #F16D07 !important;
    caret-color: #F16D07 !important;
}
</style>
