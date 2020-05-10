<template>
  <v-app>
    <Navbar/>
    <div>
        <v-content>
            <v-container grid-list-lg>
                <v-layout row wrap>
                    
                    <v-flex xs12 sm12 md8>
                        <!-- POS Header -->
                        <PosHeader/>
                        <!-- Search Products -->
                         <Search/>               
                        <!-- POS Featured Products -->
                        <PosCategoryProduct/>
                    </v-flex>

                    <!-------- Cart --------->
                    <v-flex xs12 sm12 md4>
                        <Cart/>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-content>
    </div>
  </v-app>
</template>


<script>
   import Navbar from '@/components/admin/navbar/Navbar'
   import firebase from "firebase";
   import moment from 'moment'         
   import PosCategoryProduct from  '@/components/admin/pos/sections/PosCategoryProduct'        
   import Cart from  '@/components/admin/pos/sections/Cart'        
   import Search from  '@/components/admin/pos/sections/Search'
   import PosHeader from  '@/components/admin/pos/sections/PosHeader'           
   export default {
    data(){
      return{
        currency:null,           
        drawer:this.$store.getters.rightNavbar,
        cart:this.$store.getters.cart,
        products:[],    
      }
    },
    components:{
        Navbar,PosCategoryProduct,Cart,Search,PosHeader
    },
    methods:{
   
    },
    created(){
        var db = firebase.firestore();
        // Current Currency   
        db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
        })
        
   
    },
    computed:{
           
    },
   }
 </script>


<style scoped>
    a {
        text-decoration: underline;  
        }
        .elevation-1 {
            margin:0!important;
        }
    .flex_box{
    display:flex;
  }
  .flex_item{
    display:flex;
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
  .feature_products h2{
    font-weight: 700;
    font-size: 35px;
    color: #3E3939;
    margin: 15px 0px;
    font-family: 'Lobster Two', cursive;
    text-transform: capitalize;
  }
  .feature_products h2 span{
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
    .item_list{
        border-bottom: 1px solid #E0E0E0;
        border-left: 1px solid #E0E0E0;
        border-right: 1px solid #E0E0E0;
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
    .right_part_shipment .shipment{
        display: grid;
        align-items: center;
    }
    .shipping_cost{
        text-align: right;
    }
    .shipping_cost p:nth-of-type(1){
        margin-top: 10px;
    }
    }   
</style>
