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
            label="Search Delivery Person"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="delivery_person"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          class="elevation-1 mx-3"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.phone }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>            
            <v-btn fab dark small color="pink" @click="removeDeliveryPerson(props.item.id)">
               <v-icon dark>remove</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <!-- Add Person Button  -->
        <v-btn :to="{name: 'AddDeliveryPerson'}"
          fab
          bottom
          right
          class="main_color"
          dark
          fixed
        >
          <v-icon>add</v-icon>
        </v-btn> 
      </v-content>
    </div>
  </v-app>
</template>

<script>
  import Navbar from '@/components/admin/navbar/Navbar'
  import firebase from "firebase";
  import moment from 'moment'
  export default {
    name:'DeliveryPerson',
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
        delivery_person:[],
        headers: [
        { text: 'Name', value: 'name', sortable: !1 },        
        { text: 'Phone' , value: 'phone', sortable: !1 },
        { text: 'Address' , value: 'address', sortable: !1 },
        { text: 'Action' , value: 'action', sortable: !1 },
      ]
      }
    },
    methods:{
      removeDeliveryPerson(id){
          var deleteResult = confirm("Want to delete?");
          if (deleteResult) {
          var db = firebase.firestore();   
          db.collection('delivery_person').doc(id).delete().then(() => {
              this.delivery_person = this.delivery_person.filter(delivery_perso => {
              return delivery_perso.id != id
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

      // Show All Delivery Persons
      let ref = db.collection('delivery_person').orderBy('timestamp', 'desc')

      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.delivery_person.push({
              id:doc.id,  
              name:doc.data().name,
              phone:doc.data().phone,
              address:doc.data().address,               
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
</style>
