<template>
  <v-app>
    <Navbar/>
    <v-content>
      <form @submit.prevent="addNewReview" enctype="multipart/form-data">
        <v-container grid-list-sm>
          <v-layout row wrap>  
            <v-flex xs12 align-center justify-space-between> 
              <v-card class="pa-3">  
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="face"
                    placeholder="Name"
                    required
                    v-model="name"
                  ></v-text-field>
                </v-layout>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="note"
                    placeholder="Review"
                    required
                    v-model="review"
                  ></v-text-field>
                </v-layout>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="markunread_mailbox"
                    placeholder="Designation"
                    required
                    v-model="designation"
                  ></v-text-field>
                </v-layout>    
                <h3>Upload Item Image</h3>
                <v-layout align-center>                                   
                  <input type="file" @change="uploadImage"/>                   
                </v-layout>
                <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"                   
                  color="orange"
                ></v-progress-linear> 
                <v-flex xs12>
                  <v-btn type="submit" block class="main_color" dark>Add New Review</v-btn>
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
        dialog:null,
        name:null,
        review:null,
        designation:null,      
        image: null,
        loading: null,      
      }
    },
    watch: {
      loading (val) {
        if (!val) return
        setTimeout(() => (this.loading = false), 4000)
      },
    }, 
    methods:{
      addNewReview(){
        var db = firebase.firestore();
        if(this.name){
        let ref = db.collection('reviews');
          ref.add({
            name:this.name,
            review:this.review,
            designation:this.designation,              
            image:this.image,
            timestamp:Date.now()
          })
          this.name=null
          this.review=null
          this.designation=null           
        }
        this.$router.push({ name: 'Reviews'})
      },
      uploadImage(e){
        if(e.target.files[0]){
          
          let file = e.target.files[0];
    
          var storageRef = firebase.storage().ref('reviews/'+ Math.random() + '_'  + file.name);
    
          let uploadTask  = storageRef.put(file);
    
          uploadTask.on('state_changed', (snapshot) => {
            
          }, (error) => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.image=downloadURL;
              console.log(downloadURL);                
            });
          }); 
          this.loading = true
            
        }
      } 
    },  
  }
</script>

<style>
.primary--text {
  color: #F16D07 !important;
  caret-color: #F16D07 !important;
}
</style>
