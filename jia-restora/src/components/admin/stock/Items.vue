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
            label="Search Items"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-container>
          <v-layout row wrap>
            <v-flex lg12>
              <v-data-table
                :headers="headers"
                :items="stockItems"
                :search="search"
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                row
                wrap
                class="elevation-1 mx-3"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left"> <img v-bind:src="props.item.image" style="width: 50px; height: 50px"/></td>
                  <td class="text-xs-left">{{ props.item.item_name }}</td>
                  <td class="text-xs-left">{{ props.item.item_category }}</td>                
                  <td class="text-xs-left">{{currency}}{{ props.item.price }}</td>
                  <td class="text-xs-left" v-if="props.item.featured == true">
                    Yes
                  </td>
                  <td class="text-xs-left" v-else>
                  </td>
                  <v-btn fab dark small color="cyan" :to="{name: 'EditItem', params: {id:props.item.id}}">
                    <v-icon dark>edit</v-icon>
                  </v-btn>
                  <v-btn fab dark small color="pink" @click="removeItem(props.item.id)">
                    <v-icon dark>remove</v-icon>
                  </v-btn>
                </template>
              </v-data-table>               
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Add Expense Button  -->
        <v-btn :to="{name: 'AddItem'}"
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
    name:'Items',
    components: {
      Navbar
    },
    data(){
      return{
        currency:'',
        search: '',
        rowsPerPageItems: [10, 20, 30],
        pagination: {
        rowsPerPage: 10
        },
        headers: [
        { text: 'Image', value: 'image', sortable: !1  },
        { text: 'Item Name', value: 'item_name', sortable: !1  },
        { text: 'Category' , value: 'item_category', sortable: !1  },
        { text: 'Price(Per Unit)', value: 'price', sortable: !1  },
        { text: 'Featured' , value: 'featured', sortable: !1  },
        { text: 'Action' , value: 'action', sortable: !1  },
        ],
        stockItems:[]
      }
    },
    methods:{
      removeItem(id){
        var db = firebase.firestore();
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('items').doc(id).delete().then(() => {
            this.stockItems = this.stockItems.filter(stockItem => {               
              return stockItem.id != id                  
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
      // Show All Items
      let cref = db.collection('items').orderBy('timestamp', 'desc')

      cref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.stockItems.push({
              id:doc.id,
              item_name:doc.data().item_name,
              image:doc.data().image,
              item_category:doc.data().item_category,
              price:doc.data().price,
              quantity:doc.data().quantity,
              featured:doc.data().featured,
              timestamp:moment(doc.data().timestamp).fromNow('lll')
            })
          }
        })
      })
    },  
  }
</script>

<style scoped>
  .container{
    padding:0!important;
  }
  td{
    text-align: center;
  }
  .primary--text {
    color: #F16D07 !important;
    caret-color: #F16D07 !important;
}
  </style>
