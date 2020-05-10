<template> 
  <v-layout row wrap> 
      <v-flex xs12>
        <!--------Cart Navigation Header--------------->
        <v-list dense style="margin:0!important;padding:0!important;border-top:1px solid #E0E0E0;">
            <v-list-tile class="px-1 main_color  white--text">
              <v-list-tile-action>
                <v-icon class="white--text">shopping_cart</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>
                  {{cart.length}} {{cart.length > 1 ? 'Items':'Item'}}
              </v-list-tile-title>              
          </v-list-tile>
        </v-list>          
        
        <!------------- If cart is not empty --------------------->
        <v-list dense class="right_navigation1" style="margin:0!important;padding:0!important;"  v-if="cart.length > 0">  
          <v-flex class="all_item">
            <v-flex class="all_item_height_controll">   
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
            </v-flex>
             
               
             <v-list class="pos_sub_total mt-4">
              <v-list-tile>
                <v-list-tile-content><b>Customer Name:</b></v-list-tile-content>
                <v-flex xs6>
                   <v-text-field
                    v-model="pos_customer_name"
                    placeholder="Customer Name"
                  ></v-text-field>
                </v-flex>                    
              </v-list-tile>
            </v-list>  

             <v-list class="pos_sub_total">
              <v-list-tile>
                <v-list-tile-content><b>Mobile No:</b></v-list-tile-content>
                <v-flex xs6>
                  <v-text-field
                    v-model="pos_customer_mobile"
                    placeholder="Mobile"
                  ></v-text-field>
                </v-flex>                    
              </v-list-tile>
            </v-list>
            
            <br>
            <v-divider></v-divider>  


            <v-list class="pos_sub_total">
              <v-list-tile>
                <v-list-tile-content><b>Sub Total</b></v-list-tile-content>
                <v-flex xs6>
                 <b>{{currency}}{{subTotal}}</b>
                </v-flex>                    
              </v-list-tile>
            </v-list>

            <v-list class="pos_sub_total" v-if="vat_include=='Yes'">
              <v-list-tile>
                <v-list-tile-content><b>Vat ({{vat}}%)</b></v-list-tile-content>
                <v-flex xs6>
                 <b>{{currency}}{{totalVat}}</b>
                </v-flex>                    
              </v-list-tile>
            </v-list>           

            <v-list class="pos_sub_total">
              <v-list-tile>
                <v-list-tile-content><b>Include Vat {{vat_include}}</b></v-list-tile-content>
                <v-flex xs6>
                  <v-select                         
                    :items="vat_includes"
                    v-model="vat_include"
                    label="Vat Not Included"
                    single-line
                    :@click="vatStatus()"                 
                  ></v-select>
                </v-flex>                    
              </v-list-tile>
             </v-list>

             <v-divider></v-divider>  

             <v-list class="pos_sub_total">
              <v-list-tile>
                <v-list-tile-content><b>Total</b></v-list-tile-content>
                <v-flex xs6>
                 <b>{{currency}}{{cartTotal}}</b>
                </v-flex>                    
              </v-list-tile>
            </v-list>        

            <v-flex class="pos_button pos_gap"> 
              <v-btn @click="placeOrder()" block>Place Order</v-btn>
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

  </v-layout>
</template>
   
 <script>
   import moment from 'moment'
   import firebase from "firebase";     
   export default {
    data(){
      return{
        today:moment().format('DD-MM-YYYY'),
        currency:null, 
        vat_include:null,    
        vat_includes: ['Yes', 'No'],
        order_items: ['Home Delivery','Order'],
        rowsPerPageItems: [1000, 5000, 10000],
        pagination: {
          rowsPerPage: 1000
        },      
        drawer:this.$store.getters.rightNavbar,
        headers: [                
          { text: 'Item', sortable: !1 },  
          { text: 'Qty' , sortable: !1 },  
          { text: 'Price' , sortable: !1 },
          { text: 'Total', sortable: !1 },                                         
        ],
        cart:this.$store.getters.cart,
        pos_customer_name:'',
        pos_customer_mobile:'',
        vat:null,        
        company_name:'',        
        company_address:'',        
        company_mobile:'',
        checkout_total:null, 
        feedback:null,      
      }
    },
    methods:{
      removeCart(index){
          this.$store.commit('removeCart', index)     
      },      
      increaseQuantity(index){
          this.$store.commit('increaseQuantity', index)
      },
      decreaseQuantity(index){
          this.$store.commit('decreaseQuantity', index)
      },
      printData(){ 
        var backup = document.body.innerHTML;
        var divContent = document.getElementById("printDiv").innerHTML;
        document.body.innerHTML = divContent;
        window.print();
        document.body.innerHTML = backup;       
      },    
      placeOrder(){
        if(this.cart.length > 0 ){
            this.pos_customer_name = this.$store.commit('posCustomerName', this.pos_customer_name),
            this.pos_customer_mobile = this.$store.commit('posCustomerMobile', this.pos_customer_mobile),
            this.$router.replace('/pos/checkout')
            location.reload(); 
        }else{
            this.feedback = "Please add item to cart for checkout";  
        }  
      },
      addPosCustomerName(){
            this.$store.commit('vatStatus', 0)
      },
      vatStatus(){
        if(this.vat_include == 'No' || this.vat_include == null){
          this.$store.commit('vatStatus', 0)
          console.log(this.vat_include);
          
        }
        else{
          this.$store.commit('vatStatus', 1)
           console.log(this.vat_include);  
        }               
      },

    },
    created(){
        var db = firebase.firestore();
        // Current Currency   
        db.collection("settings").doc('config').onSnapshot(doc =>{
          this.currency = doc.data().currency
        })

        // Current Vat
        var db = firebase.firestore();
        db.collection("settings").doc('config').onSnapshot(doc =>{
          this.vat = doc.data().vat
        })
        
        // Company Name
        var db = firebase.firestore();
        db.collection("settings").doc('config').onSnapshot(doc =>{
          this.company_name = doc.data().company_name
        })
        
        // Company Address
        var db = firebase.firestore();
        db.collection("settings").doc('config').onSnapshot(doc =>{
          this.company_address = doc.data().company_address
        })

        // Company Mobile
        var db = firebase.firestore();
        db.collection("settings").doc('config').onSnapshot(doc =>{
          this.company_mobile = doc.data().company_mobile
        })
    },
    computed:{
      subTotal(){
          var total=0;
          this.cart.forEach(item => {             
                 total += parseFloat(item.product.price * item.quantity)
          });
          return total.toFixed(2);
      },
      cartTotal(){
          var total=0;
          this.cart.forEach(item => {
              if(this.vat_include=='No' || this.vat_include==null){
                 total += parseFloat(item.product.price * item.quantity) 
              }else{
                 total += Number((parseFloat(item.product.price * item.quantity))*this.vat)/100 + Number(parseFloat(item.product.price * item.quantity)); 
              } 
          });
          this.checkout_total = total.toFixed(2);
          return total.toFixed(2);
      },
      totalVat(){
           var total=0;
          this.cart.forEach(item => {
              if(this.vat_include=='Yes'){               
                 total += Number((parseFloat(item.product.price * item.quantity))*this.vat)/100; 
              } 
          });
          return total.toFixed(2);
      }          
    },
   }
 </script>
 
<style scoped>
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
    border-left: 1px solid #E0E0E0;
    border-right: 1px solid #E0E0E0;
    padding:0;
  }
  .v-card__text{
    padding:0;
  }
  .all_item{
    padding:0px 0px!important;
  }
  .all_item_height_controll{
    max-height: 280px;
    overflow-y: auto;
    padding: 0px!important;
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
  .item_list .v-card__actions {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0px;
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
  .pos_sub_total .flex{
    text-align: right;
  }
  .pos_gap{
    padding:0!important;
  }
   .pos_button{
    text-align: center;
  }
  .pos_button:nth-of-type(1){
    padding:8px 8px 8px 0px!important;
  }
  .pos_button:nth-of-type(2){
    padding:8px 0px 8px 8px!important;
  }
   .pos_button .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
    background-color: #F16D07;
    color:#FAFAFA;
    text-transform: capitalize;
  }
  .total{
    background: #F16D07;
    color:#FAFAFA!important;
    margin-top:15px;
  }
  .pos_print{
    position: relative; 
  }
  .pos_header_info{
    border-bottom:1px dashed rgb(0,0,0,0.87);
    border-top:1px dashed rgb(0,0,0,0.87);
  }
  #printDiv{
    padding:8px 0!important;
  }
  .pos_machine_sub_total .pos_sub_total {
    color:rgb(0,0,0,0.87);
  }
  .pos_sub_total .v-list__tile {
    padding: 0!important;
  }
  .pos_machine_sub_total .v-list__tile__content[data-v-bb4665ce] {
    padding: 2px 0;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    color: rgb(0,0,0,0.87);
    font-weight: bold;
}
  .pos_machine_sub_total .v-list__tile__content {
    padding: 2px 0;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items:flex-end;
  }
  .pos_machine_sub_total .flex.xs6 {
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    max-width: 50%;
    text-align: right;
    color: rgb(0,0,0,0.87);
    font-weight: bold;
    padding:8px 0 8px 8px!important;
}
 .pos_table .v-table tbody td:nth-of-type(1){
   width: 120px;
 }
.pos_machine_sub_total_border::before{
  content:'';
  position: absolute;
  height:2px;
  width:50%;
  right:40px;
  border-bottom: 1px solid rgba(0,0,0,.22);
}
 .primary--text {
    color: #F16D07 !important;
    caret-color: #F16D07 !important;
}
</style>
   