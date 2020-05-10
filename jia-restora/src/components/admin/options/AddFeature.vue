<template>
  <v-app>
    <Navbar/>
    <v-content>
      <form @submit.prevent="addNewFeature" enctype="multipart/form-data">
        <v-container grid-list-sm>
          <v-layout row wrap>              
            <v-flex xs12 align-center justify-space-between> 
              <v-card class="pa-3">
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="language"
                    placeholder="Icon"
                    required
                    v-model="icon"
                  ></v-text-field>
                </v-layout>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="line_weight"
                    placeholder="Title"
                    required
                    v-model="title"
                  ></v-text-field>
                </v-layout>            
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="date_range"
                    placeholder="Text"
                    required
                    v-model="text"
                  ></v-text-field>
                </v-layout> 
                <v-flex xs12>
                  <v-btn type="submit" block class="main_color" dark>Add New Feature</v-btn>
                </v-flex>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </form>
     </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/admin/navbar/Navbar'
import firebase from "firebase";
import moment from 'moment'
export default {
  name:'AddReview',
  components:{
    Navbar
  },
  data(){
    return{
      icon:null,
      title:null,
      text:null,      
    }
  }, 
  methods:{
    addNewFeature(){
      var db = firebase.firestore();
      if(this.title){
      let ref = db.collection('features');
        ref.add({
          icon:this.icon,
          title:this.title,
          text:this.text,
          timestamp:Date.now()
        })
        this.icon=null
        this.title=null
        this.text=null           
      }
      this.$router.push({ name: 'Features'})
    },      
   },  
}
</script>

<style>
.primary--text {
  color: #F16D07 !important;
  caret-color: #F16D07 !important;
}
</style>
