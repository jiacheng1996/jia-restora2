<template>
  <v-app>
    <Navbar/>
    <v-content>
      <form @submit.prevent="editItem">
        <v-card>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="shopping_cart"
                    placeholder="Item Name"
                    required
                    v-model="item.item_name"
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
                    v-model="item.price"
                  ></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    type="number"
                    prepend-icon="note_add"
                    placeholder="Quantity"
                    required
                    v-model="item.quantity"
                  ></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs12>               
                <v-select
                    prepend-icon="shop_two"
                    v-bind:items="item_categories"
                    v-model="item.item_category"
                    label="Category"
                    item-text="category_name"
                    item-value="item_categories"
                    single-line
                ></v-select>
              </v-flex>
              <v-flex xs12 align-center justify-space-between>               
                <h3>Upload Item Image</h3>
                <v-layout align-center>                                   
                  <input type="file" @change="uploadImage" /> 
                </v-layout>
                <v-progress-linear
                    :active="loading"
                    :indeterminate="loading"                   
                    color="primary"
                ></v-progress-linear>  
              </v-flex>
              <v-flex xs12>
                  <h3>Item Details</h3>
                  <div id="app">
                    <vue-editor v-model="item.details"></vue-editor>
                  </div>
                </v-flex>
                <v-flex xs6>
                  <v-checkbox 
                    v-model="item.featured" 
                    label="Featured">
                  </v-checkbox>
                </v-flex>   
                <v-flex xs12>
                  <v-btn type="submit" block class="main_color" dark>Edit Item</v-btn>
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
    name:'EditItem',
    components:{
      Navbar,VueEditor
    },
    data(){
      return{
        dialog:null,
        item_name:null,
        price:null,
        quantity:null,
        item_category:'',
        image:null,
        details:null,
        featured:null,
        total:null,
        timestamp:null,
        feedback:null,
        item_categories:[],
        item:'',
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
      editItem(){
        var db = firebase.firestore();
        if(this.item.item_name){
          let ref = db.collection('items').doc(this.$route.params.id);
            ref.update({
            item_name:this.item.item_name,
            price:this.item.price,
            quantity:parseFloat(this.item.quantity),
            item_category:this.item.item_category,
            image:this.item.image,
            details:this.item.details,
            featured:this.item.featured,
            total:parseFloat(this.item.price * this.item.quantity),
            adding_date:moment().format('DD-MM-YYYY'),
            created_month:moment().format('MM-YYYY'),
            created_year:moment().format('YYYY'),             
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
                this.item.image=downloadURL;
                console.log(downloadURL);                
              });
            });
          this.loading = true  
        }   
      }
    },
    created(){
      // Show data of a specific Items
      var db = firebase.firestore();
      db.collection("items").doc(this.$route.params.id).onSnapshot(doc =>{
          this.item = doc.data()
          this.item.id = doc.id
    })

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
.primary--text {
    color: #F16D07 !important;
    caret-color: #F16D07 !important;
}
</style>
