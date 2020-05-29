<template> 
  <v-container>
    <v-layout row wrap class="flex_box">
      <v-flex xs12 sm6 md6 class="flex_item">
        <v-card flat>
          <v-img :src="this.product.image" aspect-ratio="1"></v-img>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6 class="flex_item">
        <v-card flat class="products_detail">
          <v-card-text>
            <h4 class="display-1 grey--text text--darken-2">{{this.product.item_name}}</h4>
            <h4 class="headline grey--text text--darken-2 my-3">$ {{this.totalPrice}}</h4>
            <v-card-title  style="background:#efeded;">
                <p class="headline grey--text text--darken-3 px-3 ">{{this.product.item_category}}</p>
            </v-card-title>
            <div v-for="(value, key, index) in attr" :key="index">
              <checkbox color="#f50057" :value="attr[key].name" v-model="checkedAttr" @click="check($event)">{{attr[key].name}}</checkbox>
            </div>
            <div v-for="(value, key, index) in supplyCondiment" :key="index">
              <checkbox color="#f50057" :value="supplyCondiment[key]" v-model="checkedSupply" @click="check($event)" @change="addToProductPrice()">{{supplyCondiment[key].name}} +${{supplyCondiment[key].marketPrice}}</checkbox>
            </div>
            <p class="grey--text text--darken-2 my-3 pa-3" v-if="this.product.details" v-html="this.product.details" style="background:rgb(239, 237, 237);">
            </p>
             <v-text-field
              label="Remarks" v-model="remark"
            ></v-text-field>
          </v-card-text>
          <div class="d-flex quantity_border pa-3 mb-3">
            <v-btn small class="main_color white--text" @click="addToCart(product)">ADD TO CART</v-btn>
          </div> 
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>      
</template>

<script>
  import Vue from 'vue'
  import firebase from "firebase";
  import checkbox from 'vue-material-checkbox'
  import db, {functions} from '@/firebase/init'
  import moment from 'moment'
  var vm = new Vue({
    data:{
      result1: [],
      count: 0
    }
  })
  export default {
      components: {checkbox},
      data(){
        //Added by CodingHeros
      var result = []
      var getDetailsItems = functions.httpsCallable('getDetailsItems')
      var paramMap = []
      paramMap.push({key: 'appKey', value: '02e6d1efd0421de9d49447106cbc90ec'})
      paramMap.push({key: 'shopIdenty', value: 810137674})
      paramMap.push({key: 'version', value: '1.0'})
      getDetailsItems({
        paramMap: paramMap,
        token: "7ec322a21d93047605537d1d363d206c"
      }).then(response => {
      vm.result1 = response.data.result
      console.log('response: ', response)
      for(let i=0; i<vm.result1.dishTOList.length; i++){
        if(vm.result1.dishTOList[i].name==this.product.item_name){
          this.attr=vm.result1.dishTOList[i].attrs
          this.supplyCondiment=vm.result1.dishTOList[i].supplyCondiments
        }
      }
      this.totalPrice=this.product.price
      console.log("attrs:", this.attr)
      console.log("supplyCondiments", this.supplyCondiment)
      })
        return{
          currency:null,      
          product:[],
          cart:this.$store.getters.cart,
          category_name:null,
          attr:[],
          supplyCondiment:[],
          checkedAttr:[],
          checkedSupply:[],
          totalPrice: null,
          remark: null,
        }
      },
      methods: {
        addToProductPrice() {
          this.totalPrice = this.product.price
          for (let i = 0; i < this.checkedSupply.length; i++){
              this.totalPrice += this.checkedSupply[i].marketPrice
          }
          console.log(this.totalPrice)

        },
        productInCart(product) {
          const cartItems = this.cart
          for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].product.id === product.id) {
              return i       
            }
          }
          return null
        },      
        addToCart(product, quantity){
          product.remarks = this.remark
          this.remark = null
          product.details = []
          for (let i = 0; i < this.checkedSupply.length; i++){
            product.details += " " + this.checkedSupply[i].name
          }
          for (let i = 0; i < this.checkedAttr.length; i++){
            product.details += " " + this.checkedAttr[i]
          }
          console.log(product.remarks)
          console.log(product.details)
          product.price = this.totalPrice
          const index = this.productInCart(product)
          const productQuantity = (!quantity || quantity < 1) ? 1 : parseInt(quantity)
          if (index === null) {
              var items = {
                  product: product,
                  quantity: productQuantity,
              }
              //this.$store.commit('catalog/updateCart', items)
              this.$store.commit('updateCart', items)
          }else {
            if(!quantity){
              // If item is already into the cart then add++ quantity                   
              this.$store.commit('increaseQuantity', index)
                
            }else{
              // When quantity updated manually
            }
          }        
        },
        removeCart(index){

          this.$store.commit('removeCart', index)     
        }, 
    },
    created(){
      var db = firebase.firestore();
      
      // Current Currency   
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
      })

      // Product Details        
      db.collection("items").doc(this.$route.params.id).onSnapshot(doc =>{
        this.product = doc.data()
        this.product.id = doc.id         
      }) 
    }
  }
</script>

<style scoped> 
  .products_detail .v-card__title[data-v-67c1f075] {
      padding: 0px 0 0;
  }
  .flex_box .v-card{
    padding:20px; 
    width:100%;
  }
  .flex_item .headline{
    width:100%;
    margin:10px 0!important;
  }
  .flex_box .v-card__text {
    padding: 0px;
  }
  .flex_box .v-card__title {
    padding:10px 0 0;
  }  
 .quantity_border{
   border:3px solid #efeded;
 }
 .quantity{
    height: auto;
    width:0%; 
    display: grid;
    justify-items: center;
    align-items: center;
    text-align: center;
    margin-right: 5%;
  }
 .quantity .material-icons  {
    font-size: 22px;  
  }
 .quantity .add{
    cursor:pointer;
    border:1px solid #E0E0E0;
    border-right:none;
  }
  .quantity .remove{
    cursor:pointer;
    border:1px solid #E0E0E0;
    border-left:none;
  }
  .quantity .quantity_no{
    border:1px solid #E0E0E0;
    padding:0 3px;
  }
  /*--
 .v-responsive{
   height:300px!important;
 }
 @media (max-width:240px){
   .v-responsive{
      height:200px!important;
    }
 }
 --*/
  @media (max-width:599px){
    .v-text-field.v-text-field--solo .v-input__control {
      min-height: 38px!important;
      padding: 0;
      margin-bottom: 5px;
    }
    .flex_item .headline {
    margin:0 0 10px 0px!important;
}
  }
  @media (max-width:420px){
    .products_detail h4,.products_detail .my-3{
        font-size: 20px!important;
    } 
    .flex_box .v-card{
      padding-top:0!important;
      padding-bottom:0!important;  
    }
    .products_detail .v-card__text  p{
    }     
  }
</style>
