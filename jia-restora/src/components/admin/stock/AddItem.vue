<template>
  <v-app>
    <Navbar/>
    <v-content>
      <form @submit.prevent="addNewItem" enctype="multipart/form-data">
        <v-card flat>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>              
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="shopping_cart"
                    placeholder="Item Name"
                    required
                    v-model="item_name"
                  ></v-text-field>
                </v-layout>
              </v-flex>              
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    type="number"
                    prepend-icon="local_atm"
                    placeholder="Price"
                    required
                    v-model="price"
                  ></v-text-field>
                </v-layout>
              </v-flex>            
              <v-flex xs12>
                <v-select
                  prepend-icon="shop_two"
                  v-bind:items="item_categories"
                  v-model="item_category"
                  label="Category"
                  item-text="category_name"
                  item-value="item_categories"
                  single-line                              
                ></v-select>
              </v-flex>
              <v-flex xs12 align-center justify-space-between>               
                <h3>Upload Item Image</h3>
                <v-layout align-center>                                   
                  <input type="file" @change="uploadImage"/>                   
                </v-layout>
                <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"                   
                  color="orange"
                ></v-progress-linear>               
              </v-flex>
              <v-flex xs12>
                <h3>Item Details</h3>
                <div id="app">
                  <vue-editor v-model="details"></vue-editor>
                </div>
              </v-flex>
              <v-flex xs6>
                <v-checkbox 
                  v-model="featured" 
                  label="Featured">
                </v-checkbox>
              </v-flex>               
              <v-flex xs12>
                <v-btn type="submit" block class="main_color" dark>Add New Item</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </form>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/admin/navbar/Navbar'
import firebase from "firebase";
import moment from 'moment'
import { VueEditor } from "vue2-editor";
export default {
  name:'AddItem',
  components:{
    Navbar,VueEditor
  },
  data(){
    return{
      dialog:null,
      item_name:null,
      price:null,     
      item_category:'',
      image:null,
      details:null,
      featured:true,
      total:null,
      timestamp:null,
      feedback:null,
      item_categories:[],
      currency:null,
      loading: null,
      content: "<h1>Some initial content</h1>"
    }
  },
  watch: {
      loading (val) {
        if (!val) return
        setTimeout(() => (this.loading = false), 4000)
      },
  }, 
  methods:{
      addNewItem(){
          var db = firebase.firestore();
          if(this.item_name){
          let ref = db.collection('items');
            ref.add({
              item_name:this.item_name,
              price:this.price,             
              item_category:this.item_category,
              image:this.image,
              details:this.details,
              featured:this.featured,
              total:parseFloat(this.price * this.quantity),
              adding_date:moment().format('DD-MM-YYYY'),
              created_month:moment().format('MM-YYYY'),
              created_year:moment().format('YYYY'),
              timestamp:Date.now()
            })
            this.item_name=null
            this.price=null
            this.quantity=null
            this.customer=null
          }
          this.$router.push({ name: 'Items'})
      },
      uploadImage(e){
        if(e.target.files[0]){
          
            let file = e.target.files[0];
      
            var storageRef = firebase.storage().ref('products/'+ Math.random() + '_'  + file.name);
      
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

       // Show All Categories
       var db = firebase.firestore();
       let ref = db.collection('item_categories').orderBy('timestamp', 'desc')

       ref.onSnapshot(snapshot => {
         snapshot.docChanges().forEach(change => {
           if(change.type == 'added'){
             let doc = change.doc
             this.item_categories.push({
               id:doc.id,
               category_name:doc.data().category_name
             })
           }
         })
       })
    }
}
</script>

<style>

</style>
