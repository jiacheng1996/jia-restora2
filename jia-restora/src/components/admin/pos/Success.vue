<template>
  <v-app>
    <Navbar/>
    <div>
        <v-content>
            <v-container grid-list-lg>
                <v-layout row wrap>
                    
                    <v-flex xs12 sm12 md12>
                        <!-- Search Products -->
                         <Search/>               
                        <!-- POS Featured Products -->
                        <PosSuccess/>
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
   import PosSuccess from  '@/components/admin/pos/sections/Success'
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
        Navbar,PosSuccess
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
   
</style>
