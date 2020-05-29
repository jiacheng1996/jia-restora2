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
                    placeholder="[[item_name]]"
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
                    placeholder="[[price]]"
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
                <v-layout align-center>
                  <img v-bind:src="img_url">
                </v-layout>
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
import Vue from 'vue'
import Navbar from '@/components/admin/navbar/Navbar'
import firebase from "firebase";
import db, {functions} from '@/firebase/init'
import moment from 'moment'
import { VueEditor } from "vue2-editor";
var vm = new Vue({
    data:{
      result1: [],
      count: 0
    }
  })
export default {
  name:'AddItem',
  components:{
    Navbar,VueEditor
  },
  data(){
    //Added by CodingHeros
    var result = []
    var getDetailsItems = functions.httpsCallable('getDetailsItems')
    var paramMap = []
    paramMap.push({key: 'appKey', value: '02e6d1efd0421de9d49447106cbc90ec'})
    paramMap.push({key: 'shopIdenty', value: 810137705})
    paramMap.push({key: 'version', value: '1.0'})
    getDetailsItems({
      paramMap: paramMap,
      token: "80199e23e7cf5a346cf9d8ff67b61039"
    }).then(response => {
    console.log('response: ', response)
    if(vm.count == 0)
    {
      vm.result1 = response.data.result }
      this.item_name = vm.result1.dishTOList[vm.result1.dishTOList.length-1].name
      this.price = vm.result1.dishTOList[vm.result1.dishTOList.length-1].price
      this.img_url = vm.result1.dishTOList[vm.result1.dishTOList.length-1].imgUrl
      console.log(vm.result1.dishTOList[vm.result1.dishTOList.length-1].name)
      if (this.img_url!=null)
      {
        this.image=this.img_url
        console.log(image)
      }
    })
    return{
      dialog:null,
      item_name:null,
      price:null,     
      item_category:'',
      image:null,
      details:[],
      featured:true,
      total:null,
      timestamp:null,
      feedback:null,
      item_categories:[],
      currency:null,
      loading: null,
      img_url: null,
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
              remark:null,
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
          vm.count=1
          vm.result1.dishTOList.splice(vm.result1.dishTOList.length-1)
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
