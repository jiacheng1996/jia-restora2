<template>
  <v-content>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search Customer"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="customers"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      row
      wrap
      class="elevation-1 mx-3"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left"><router-link :to="{ name: 'ViewCustomer', params: {id:props.item.id} }">{{props.item.name}}</router-link></td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.phone }}</td>       
        <td class="text-xs-left">{{ props.item.city }}</td>       
        <td class="text-xs-left">{{ props.item.timestamp }}</td>      
        <v-btn fab dark small color="pink" @click="removeCustomer(props.item.id)">
           <v-icon dark>remove</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-content>
</template>

<script>
  import firebase from "firebase";
  import moment from 'moment'
  export default {
    name:'ShowCustomers',
    components: {

    },
    data(){
      return{
        search: '',
        customers:[],
        rowsPerPageItems: [8, 16, 24],
        pagination: {
        rowsPerPage: 8
        },
        headers: [
        { text: 'Customer Name', value: 'customer_name', sortable: !1 },
        { text: 'Email' , value: 'email', sortable: !1 },
        { text: 'Phone' , value: 'phone', sortable: !1 },        
        { text: 'City' , value: 'city', sortable: !1 },        
        { text: 'Created' , value: 'created', sortable: !1 },
        { text: 'Action' , value: 'action',sortable: !1 },
      ]
      }
    },
    methods:{
      removeCustomer(id){
        var db = firebase.firestore();

        // Remove from database
        var result = confirm("Want to delete?");
        if (result) {
          db.collection('profiles').doc(id).delete().then(() => {
            this.customers = this.customers.filter(customer => {
              return customer.id != id
            })
          })
        }  
      }
    },
    created(){
      var db = firebase.firestore();
      // Show All Customers
      let ref = db.collection('profiles').orderBy('timestamp', 'desc')    
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.customers.push({
              id:doc.id,
              name:doc.data().name,
              email:doc.data().email,
              phone:doc.data().phone,             
              city:doc.data().city,              
              timestamp:moment(doc.data().timestamp).format('ll')
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
