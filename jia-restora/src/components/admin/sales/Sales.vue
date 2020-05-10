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
            label="Search By Order ID"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="sales"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          class="elevation-1 mx-3"
        >
          <template slot="items" slot-scope="props">            
            <td class="text-xs-left timestamp">{{ props.item.timestamp }}</td>
            <td class="text-xs-left">#{{ props.item.order_id }}</td>
            <td class="text-xs-left">{{ props.item.order_type }}</td>
            <td class="text-xs-left">{{ props.item.quantity }}</td>
            <td class="text-xs-left">{{currency}}{{ props.item.checkout_total }}</td>
          </template>
        </v-data-table>
      </v-content>
    </div>
  </v-app>
</template>

<script>
  import Navbar from '@/components/admin/navbar/Navbar'
  import db from '@/firebase/init'
  import moment from 'moment'
  export default {
    name:'Sales',
    components: {
      Navbar
    },
    data(){
      return{
        currency:'',
        search: '',
        sales:[],
        rowsPerPageItems: [8, 16, 24],
        pagination: {
        rowsPerPage: 8
        },
        headers: [ 
          { text: 'Sales Date' , value: 'created', sortable: !1 },                 
          { text: 'Order ID' , value: 'order_id', sortable: !1 },
          { text: 'Sales Type' , value: 'order_type', sortable: !1 }, 
          { text: 'Number Of Items' , value: 'quantity', sortable: !1 },
          { text: 'Total Price' , value: 'checkout_total', sortable: !1 },
        ],  
      }
    },
    methods:{
      
    },
    created(){
      // Current Currency
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
      })
      // Show All Sales
      let ref = db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete")
      ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
              let doc = change.doc
              this.sales.push({
                  id:doc.id,                    
                  order_id:doc.data().timestamp,                    
                  timestamp:moment(doc.data().timestamp).format('ll'),      
                  quantity:doc.data().quantity,               
                  order_status:doc.data().order_status,               
                  order_type:doc.data().order_type,               
                  checkout_total:doc.data().checkout_total,               
              })
            }
          })
      })
    },
  }
</script>

<style>
  tbody a{
    font-size: 13px;
    color:black;
    text-decoration: underline;
  }
  .text-xs-right{
    text-align: left !important;
  }
  td{
    text-align: center;
  }
  .primary--text {
    color: #F16D07 !important;
    caret-color: #F16D07 !important;
}
</style>
