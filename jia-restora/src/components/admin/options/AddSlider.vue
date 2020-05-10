<template>
  <v-app>
    <Navbar/>
    <v-content>
      <form @submit.prevent="addNewSlider" enctype="multipart/form-data">
        <v-container grid-list-sm>
          <v-layout row wrap>
            
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-text-field
                  prepend-icon="line_weight"
                  placeholder="Title"
                  required
                  v-model="title"
                ></v-text-field>
              </v-layout> 
            </v-flex>         
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-text-field
                  prepend-icon="line_weight"
                  placeholder="Sub Title"
                  required
                  v-model="subtitle"
                ></v-text-field>
              </v-layout> 
            </v-flex>         
            <v-flex xs12 align-center justify-space-between>
              <v-card class="pa-3">
              <h3>Upload Slider Image</h3>
              <v-layout align-center>                                   
                <input type="file" @change="uploadImage"/>                   
              </v-layout>
              <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"                   
                  color="primary"
              ></v-progress-linear>  
              </v-card>             
            </v-flex>
            <v-flex xs12>
              <v-btn type="submit" block class="main_color" dark>Add Slider</v-btn>
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
    name:'AddSlider',
    components:{
      Navbar
    },
    data(){
      return{
        loading: null,  
        image:this.image,
      }
    },
    watch: {
      loading (val) {
        if (!val) return
        setTimeout(() => (this.loading = false), 6000)
      },
    }, 
    methods:{
      addNewSlider(){
        if(this.image){
          var db = firebase.firestore();  
          let ref = db.collection('options-slider');
          ref.add({
            title:this.title,            
            subtitle:this.subtitle,            
            image:this.image,            
            timestamp:Date.now()
          })
          this.image=null
        }
        this.$router.push({ name: 'Slider'})
      },
      uploadImage(e){
        if(e.target.files[0]){
          
          let file = e.target.files[0];
    
          var storageRef = firebase.storage().ref('slider/'+ Math.random() + '_'  + file.name);
    
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
    created(){

    }
  }
</script>

<style>
.primary--text {
  color: #F16D07 !important;
  caret-color: #F16D07 !important;
}
</style>
