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
                  :items="features"
                  :search="search"
                  :rows-per-page-items="rowsPerPageItems"
                  :pagination.sync="pagination"
                  row
                  wrap
                  class="elevation-1 mx-3"
                >
                  <template slot="items" slot-scope="props">                  
                    <td class="text-xs-left">{{ props.item.timestamp }}</td> 
                    <td class="text-xs-left">{{ props.item.title }}</td> 
                    <td class="text-xs-left"><v-icon>{{ props.item.icon }}</v-icon></td> 
                    <td class="text-xs-left">{{ props.item.text }}</td> 
                    <v-btn fab dark small color="pink" @click="removeItem(props.item.id)">
                       <v-icon dark>remove</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>               
              </v-flex>
          </v-layout>
        </v-container>
        <!-- Add Feature Button  -->
        <v-btn :to="{name: 'AddFeature'}"
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
    name:'Features',
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
        { text: 'Created At', value: 'timestamp', sortable: !1  },       
        { text: 'Title' , value: 'title', sortable: !1  },
        { text: 'Icon' , value: 'icon', sortable: !1  },
        { text: 'Text' , value: 'text', sortable: !1  },
        { text: 'Action' , value: 'action', sortable: !1  },
        ],
        features:[]

      }
    },
    methods:{
      removeItem(id){
        var db = firebase.firestore();
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('features').doc(id).delete().then(() => {
            this.features = this.features.filter(feature => {               
              return feature.id != id                  
            })            
          })
        }       
      }
    },
    created(){
      var db = firebase.firestore();   

      // Show All Features
      let cref = db.collection('features').orderBy('timestamp', 'desc')

      cref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.features.push({
              id:doc.id,                      
              title:doc.data().title,            
              icon:doc.data().icon,            
              text:doc.data().text,
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
