<template>
  <v-app>
    <Navbar/>
    <div>
      <v-content>
        <v-container>
          <v-layout row wrap>
            <v-flex lg12>
              <v-data-table
                :headers="headers"
                :items="reviews"
                :search="search"
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                row
                wrap
                class="elevation-1 mx-3"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left pt-1"><img v-bind:src="props.item.image" style="height: 50px;"/></td> 
                  <td class="text-xs-left">{{ props.item.timestamp }}</td> 
                  <td class="text-xs-left">{{ props.item.name }}</td> 
                  <td class="text-xs-left">{{ props.item.designation }}</td> 
                  <td class="text-xs-left">{{ props.item.review }}</td> 
                
                  <v-btn fab dark small color="pink" @click="removeItem(props.item.id)">
                      <v-icon dark>remove</v-icon>
                  </v-btn>
                </template>
              </v-data-table>               
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Add Expense Button  -->
        <v-btn :to="{name: 'AddReview'}"
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
    name:'Reviews',
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
        { text: 'Created At', value: 'timestamp', sortable: !1  },       
        { text: 'Name' , value: 'name', sortable: !1  },
        { text: 'Designation' , value: 'designation', sortable: !1  },
        { text: 'Review' , value: 'review', sortable: !1  },
        { text: 'Action' , value: 'action', sortable: !1  },
        ],
        reviews:[]
      }
    },
    methods:{
      removeItem(id){
        var db = firebase.firestore();
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('reviews').doc(id).delete().then(() => {
            this.reviews = this.reviews.filter(review => {               
              return review.id != id                  
            })            
          })
        }       
      }
    },
    created(){
      var db = firebase.firestore();   

      // Show All Reviews
      let cref = db.collection('reviews').orderBy('timestamp', 'desc')

      cref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.reviews.push({
              id:doc.id,                      
              name:doc.data().name,            
              image:doc.data().image,            
              review:doc.data().review,            
              designation:doc.data().designation,
              timestamp:moment(doc.data().timestamp).format('ll'),  
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
