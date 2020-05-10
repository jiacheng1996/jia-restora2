<template>
  <v-layout>
    <v-container  grid-list-lg>
      <v-layout row wrap class="flex_box feature_products"> 
                 
        <v-flex xs12 sm3 md3 lg3 xl2  class="flex_item" v-for="(product,index) in products" :key="index">
          <v-card class="overlay_container flex_wrap  pa-2">
            <v-img :src="product.image" contain></v-img>
            <div style="width:100%;" class="flex_bottom text-xs-center pb-2">
              <h3 class="headline text-xs-center grey--text text--darken-3">{{product.item_name}}</h3>
              <h4 class="grey--text text--darken-3">{{currency}}{{product.price}}</h4>                                           
            </div>
            <v-card class="overlay">                       
                <h2 style="vertical-align:middle;">{{product.item_name}}</h2>                        
                <v-list class="details">                
                <v-list-tile-action>
                    <v-btn style="width:100%" class="main_color white--text" @click="addToCart(product)">Add To Cart</v-btn>
                </v-list-tile-action>
                </v-list>
            </v-card> 
          </v-card>                                           
        </v-flex>        
      </v-layout>
    </v-container>
  </v-layout>
</template>
   
<script>
  import firebase from "firebase";
  import moment from 'moment' 
  export default {
    data(){
      return{
        currency:null,
        products:[],
        cart:this.$store.getters.cart 
      }
    },
    methods: {
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
        const index = this.productInCart(product)
        const productQuantity = (!quantity || quantity < 1) ? 1 : parseInt(quantity)
        if (index === null) {
          var items = {
              product: product,
              quantity: productQuantity
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
    computed:{
      counter(){
        return this.$store.getters.counter 
      },
    },   
    created(){
      var db = firebase.firestore();
      // Current Currency   
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
      })

      // Show All Items
      let cref = db.collection('items').orderBy('timestamp', 'desc').where("featured", "==", true)

      cref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.products.push({
              id:doc.id,
              item_name:doc.data().item_name,
              image:doc.data().image,
              category_name:doc.data().item_category.category_name,
              price:doc.data().price,
              quantity:doc.data().quantity,
              timestamp:moment(doc.data().timestamp).fromNow('lll')
            })
          }
        })
      })
    } 
  }
</script>

<style>
  .v-list{
    padding:0!important;
   } 
  .flex_box{
    display:flex;
  }
  .flex_item{
    flex:1;
    display:flex;
    flex-wrap:wrap;
    flex-grow: 1;
  }
  .flex_wrap{
    text-align:center;
    flex:1;
    display:flex;
    flex-wrap:wrap;
  }
  .flex_wrap>*{
    flex:1 1 100%;
  }
  .flex_bottom{
    align-self:flex-end;
  }
  .flex_box .v-card{
    width:100%;
  }
  .flex_item .headline{
    width:100%;
    margin-bottom:15px;
  }
  .flex_box .v-card__text {
    padding: 0px;
  }
  .flex_box .v-card__title {
    padding:10px  0;
  }
  .feature_products_title{
    font-weight: 700;
    font-size: 35px;
    color: #3E3939;
    margin: 15px 0px;
    font-family: 'Lobster Two', cursive;
    text-transform: capitalize;
  }
  .feature_products_title  span{
    color: #F16D07;
  }
  .overlay{
    position:absolute !important;
    top:0;
    left:0;
    width:100%;
    height:100%;
    opacity:0;
    text-align:center;
    background: rgb(0,0,0,.4)!important;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  } 
  .overlay h2{
    margin-top: 40%;
    color:#FFF;
    padding-left:20%;
    padding-right:20%;
  }
  .overlay_container:hover .overlay{
    opacity:1;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
  }
  .overlay_container:hover .v-card__title{
    opacity:0;
  } 
  .details{
    position:absolute;
    bottom:0;
    left:0;
    text-align:center;
    width:100%;
    margin:0;
    padding: 0;
  }
  .details .v-btn{
    width:100%;
  }
</style>
   