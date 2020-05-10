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
                :items="sliders"
                :search="search"
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                row
                wrap
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left"><img v-bind:src="props.item.image" style="width: 280px; height: 150px"/></td> 
                  <td class="text-xs-left">{{ props.item.title }}</td> 
                  <td class="text-xs-left">{{ props.item.timestamp }}</td> 
                  <td class="text-xs-left">
                    <v-btn fab dark small color="pink" @click="removeItem(props.item.id)">
                      <v-icon dark>remove</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>               
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Add Expense Button  -->
        <v-btn :to="{name: 'AddSlider'}"
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
    name:'Slider',
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
        { text: 'Title', value: 'title', sortable: !1  },
        { text: 'Created At', value: 'timestamp', sortable: !1  },       
        { text: 'Action' , value: 'action', sortable: !1  },
        ],
        sliders:[]
      }
    },
    methods:{
      removeItem(id){
        var db = firebase.firestore();
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('options-slider').doc(id).delete().then(() => {
            this.sliders = this.sliders.filter(slider => {               
              return slider.id != id                  
            })            
          })
        }       
      }
    },
    created(){
      var db = firebase.firestore();   

      // Show All Slider
      let cref = db.collection('options-slider').orderBy('timestamp', 'desc')

      cref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.sliders.push({
              id:doc.id,           
              image:doc.data().image,            
              title:doc.data().title,            
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
</style>
