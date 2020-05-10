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
            label="Search Projects"
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
            <td class="text-xs-left">{{ props.item.checkout_total }}</td>
            <td class="text-xs-left">{{ props.item.order_status }}</td>           
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
    name:'ProjectType',
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
          { text: 'Order Date' , value: 'created', sortable: !1 },  
          { text: 'Number Of Items' , value: 'quantity', sortable: !1 },
          { text: 'Total Price' , value: 'checkout_total', sortable: !1 },
          { text: 'Order Status' , value: 'order_status', sortable: !1 }, 
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

      // Show All Orders
      let ref = db.collection('orders').where("order_status", "==", this.$route.params.type).orderBy('timestamp', 'desc')

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
    },
    computed: {
    
    }
  }
</script>

<style>
td{
  text-align: center;
}
a{
  color: black;
}
.primary--text {
  color: #F16D07 !important;
  caret-color: #F16D07 !important;
}
</style>
