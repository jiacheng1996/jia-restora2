<template> 
  <v-layout row wrap>
    <v-btn small @click.stop="drawer = !drawer" class="shop_card_section">
      <div class="shop_card">
          <v-icon>add_shopping_cart</v-icon>
          <h5>{{cart.length}} {{cart.length > 1 ? 'Items':'Item'}}</h5>
          <p>{{currency}}{{cartTotal}}</p>
      </div>
    </v-btn>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      clipped
      app class="close_div">
      <v-flex xs12>

        <!--------Cart Navigation Header--------------->
        <v-list dense style="margin:0!important;padding:0!important;border-top:2px solid #E0E0E0;">
            <v-list-tile class="px-1 main_color  white--text">
              <v-list-tile-action>
                <v-icon class="white--text">shopping_cart</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>
                  {{cart.length}} {{cart.length > 1 ? 'Items':'Item'}}
              </v-list-tile-title>
              <v-btn class="white" small @click.stop="drawer = !drawer"><span>close</span></v-btn>
          </v-list-tile>
        </v-list>          
        
        <!------------- If cart is not empty --------------------->
        <v-list dense class="right_navigation1" style="margin:0!important;padding:0!important;"  v-if="cart.length > 0">  
          <v-flex class="all_item">   
            <!---------------------Your_order------------------------------------>
            <div class="d-flex item_list" v-for="(item, index) in cart" :key="index">                
              <v-card-text flat class="quantity grey--text text--darken-2">
                  <v-icon @click="increaseQuantity(index)" small style="cursor: pointer;">expand_less</v-icon>
                  <p>{{item.quantity}}</p>
                  <v-card-actions v-if="item.quantity > 1">
                  <v-icon @click="decreaseQuantity(index)" small style="cursor: pointer;">expand_more</v-icon>
                  </v-card-actions>
                  <v-card-actions v-else>
                      <v-icon small style="cursor: pointer;">expand_more</v-icon>
                  </v-card-actions>
              </v-card-text>
              <v-card-text flat class="image">
                  <v-img :src="item.product.image" contain> </v-img>
              </v-card-text>
              <v-card-text flat class="item_name grey--text text--darken-2">
                  <p>{{item.product.item_name}}</p>
                  <p>{{currency}}{{item.product.price}}</p>
              </v-card-text>
              <v-card-text flat  class="item_price grey--text text--darken-2">
                  <p>{{currency}}{{(item.product.price*item.quantity).toFixed(2)}}</p>                                
              </v-card-text>
              <v-card-text flat class="close">
                  <v-icon @click="removeCart(index)" small style="cursor: pointer;">close</v-icon>
              </v-card-text>                
            </div>
            <v-flex class="d-flex item_total">
              <v-flex xs7 class="text-xs-center sub_main_color  white--text" style="padding:10px 0px;color:white;"><router-link style="color:white;text-decoration:none;" :to="{ name: 'Cart' }">Place Order</router-link></v-flex>
              <v-flex xs5 class="text-xs-center main_color white--text" style="padding:10px 0px;">{{currency}}{{cartTotal}}</v-flex>
            </v-flex>
          </v-flex>
        </v-list>

        <!----------- If cart is empty  --------------->
        <v-flex dense class="right_navigation" v-else>                    
          <v-flex xs12>
            <v-img
              :src="require('@/assets/bag2.jpg')"
              aspect-ratio="1" contain   
                style="width:100%;margin:15% auto;border-radius:50%;background:#FFFFFF; border:1px solid #ece8e8">
            </v-img>
          </v-flex>
          <v-flex xs12 class="px-3">
              <h2>Your shopping bag is empty!</h2>
          </v-flex>
        </v-flex>       
      </v-flex> 
    </v-navigation-drawer>
  </v-layout>
</template>
   
 <script>
   import firebase from "firebase";
        
   export default {
    data(){
      return{
        currency:null,           
        drawer:0,
        cart:this.$store.getters.cart    
      }
    },
    methods:{
      removeCart(index){
          this.$store.commit('removeCart', index)     
      },
      rightNavbar(){
        if(this.$store.getters.rightNavbar == 1){
          this.$store.commit('rightNavbar', 0)
          this.drawer = this.$store.getters.rightNavbar
        }
        else{
          this.$store.commit('rightNavbar', 1)
          this.drawer = this.$store.getters.rightNavbar
        }               
      },
      increaseQuantity(index){
          this.$store.commit('increaseQuantity', index)
      },
      decreaseQuantity(index){
          this.$store.commit('decreaseQuantity', index)
      }    
    },
    created(){
      var db = firebase.firestore();
      // Current Currency   
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
      })   
    },
    computed:{
      cartTotal(){
          var total=0;
          this.cart.forEach(item => {
              total += parseFloat(item.product.price * item.quantity)
          });
          return total.toFixed(2);
      },          
    },
   }
 </script>
 
<style scoped>
.close_div{
  z-index: 11111;
}
  .right_navigation{
    display:block;
    margin:0!important;
    padding:20% 20px!important;
    width:100%;
    text-align: center;
    font-size: 14px;
    color: #AAA;
    }
    .right_navigation h2{
      font-weight: normal;
    }
  .right_navigation  .v-list__tile__action {
    min-width: 35px;
  }
  .navigation_card_quantity .v-list__tile__action {
    display: flex;
    justify-content: flex-start;
    min-width: 35px;
  }
  .right_navigation1  .v-list__tile__action {
    min-width: 35px;
  }
  .shop_card_section{
    color:white!important;
    height:80px!important;
    min-width:65px!important;
    position:fixed!important;
    right:0!important;
    top:50%!important;
    z-index:1!important;
    background: RGB(214,109,7,.8)!important;
    padding:0!important;  
  }
  .shop_card{
    position:relative;
    width:100%;
    float:left;padding:0!important;
    margin:0!important; 
  }
  .shop_card p{
    position:absolute;
    margin-bottom:0;
    width:100%;
    background: #FFF;
    color:black;
  }
  .flex_box .v-card {
    padding: 30px!important;
    line-height: 22px;
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
   .item_list{
    border-bottom: 1px solid #E0E0E0;
    padding:0;
  }
  .v-card__text{
    padding:0;
  }
  .item_list .quantity{
    height: 70px;
    width:10%; 
    display: grid;
    justify-items: center;
    align-items: center;
    text-align: center;
    border-right: 1px solid #E0E0E0;
  }
  .item_list .quantity p{
    margin:0;
  }
  .item_list  .image{
    height: 70px;
    width:15%; 
    display: grid;
    justify-items: center;
    align-items: center;
    text-align: center;
  }
  .item_list  .image .v-image{
    width:40px;
  }
  .item_list .item_name{
    height: 70px;
    width:35%; 
    padding:0px 0px !important;
    display: grid;
    justify-items: center;
    align-items: center;
    text-align: center;
  }
  .item_list .item_name p{
    font-size: 12px;
    margin-top:-15px;
  }
  .item_list .item_name p:nth-of-type(1){
    margin-top:0px;
  }
  .item_list .item_price{
    height: 70px;
    width:20%; 
    padding:0px 0px !important;
    display: grid;
    justify-items: center;
    align-items: center;
    text-align: center;
  }
   .item_list .item_price p{
    margin-top:-15px;
  }
  .item_list .item_price p:nth-of-type(1){
    margin-top:0px;
  }
  .item_list .close{
    height: 70px;
    width:7%; 
    display: grid;
    justify-items: center;
    align-items: center;
    text-align: center;
  }
  .item_list .close .v-icon{
    margin-left: -5px;
  }
  @media (max-width:290px){
    .item_list  .image .v-image{
     width:37px;
  }
  .item_list .close{
    width:13%; 
  }
  .v-list__tile__action, .v-list__tile__avatar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    min-width: 32px;
  }
  }
  .main_color span{
    color:#F16D07;
  }
</style>
   