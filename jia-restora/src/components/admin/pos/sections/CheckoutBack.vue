<template> 
  <v-layout row wrap> 
        <v-flex xs12>

          <!----Pos Print Bill---->
          <v-flex id="printDiv">
            <v-card class="pos_print pa-4">
              <h3 class="headline text-xs-center grey--text text--darken-3">{{company_name}}</h3>              
              <h4 class="text-xs-center grey--text text--darken-3">{{company_address}}</h4>
              <h4 class="text-xs-center grey--text text--darken-3">Mobile: {{company_mobile}}</h4>
              
              <div class="mt-4 py-2 pos_header_info">
                <v-list>
                  <v-list-tile>
                    <v-flex xs12 text-xs-right>
                      Date: {{today}}
                    </v-flex>                    
                  </v-list-tile>
                </v-list>
              </div>              

              <v-data-table
                :headers="headers"
                :items="cart"              
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                row
                wrap
                class="elevation-1 pos_table mt-4"
                >
                  <template slot="items" slot-scope="props">                            
                    <td class="text-xs-left">{{ props.item.product.item_name }}</td>
                    <td class="text-xs-left">{{props.item.quantity}}</td>
                    <td class="text-xs-left">{{currency}}{{ props.item.product.price }}</td>
                    <td class="text-xs-right">{{currency}}{{(props.item.product.price*props.item.quantity).toFixed(2)}}</td>                    
                  </template>
              </v-data-table>
              
              <v-list class="pos_machine_sub_total mt-2">
                <v-list-tile>
                  <v-flex text-xs-right>Sub Total:</v-flex>
                  <v-flex xs6>
                    {{currency}}{{subTotal}}
                  </v-flex>                    
                </v-list-tile>
              </v-list>

              <v-list class="pos_machine_sub_total" v-if="this.vatStatus==0 || this.vatStatus == null">
                <v-list-tile>
                  <v-flex text-xs-right>Vat:</v-flex>
                  <v-flex xs6>
                    {{currency}}0.00
                  </v-flex>                    
                </v-list-tile>
              </v-list>

              <v-list class="pos_machine_sub_total" v-else>
                <v-list-tile>
                  <v-flex text-xs-right>Vat:</v-flex>
                  <v-flex xs6>
                    {{currency}}{{totalVat}}
                  </v-flex>                    
                </v-list-tile>
              </v-list> 

              <v-list class="pos_machine_sub_total pos_machine_sub_total_border">
                <v-list-tile>
                  <v-flex text-xs-right>Total:</v-flex>
                  <v-flex xs6>
                   {{currency}}{{cartTotal}}
                  </v-flex>                    
                </v-list-tile>
              </v-list> 
              <v-flex class="mt-4">
                <h4 class="text-xs-center grey--text text--darken-3 text-uppercase">Thank you</h4>
                <h4 class="text-xs-center grey--text text--darken-3 text-uppercase">Please Come Again</h4>
              </v-flex>
            </v-card>
          </v-flex>
          <v-flex class="check_out_pos pa-0 mt-1">
            <v-flex class="pos_button pos_gap"> 
              <v-btn @click="checkout()" block>Checkout</v-btn>
            </v-flex>
            <v-flex class="pos_button pos_gap"> 
              <v-btn @click="posCheckout()" block>Checkout with Print</v-btn>
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
        vat:null,
        cart:this.$store.getters.cart,
        vatStatus:this.$store.getters.vat,        
        company_name:'',        
        company_address:'',        
        company_mobile:'',
        checkout_total:null, 
        feedback:null,      
      }
    },
    methods:{     
      printData(){ 
        var backup = document.body.innerHTML;
        var divContent = document.getElementById("printDiv").innerHTML;
        document.body.innerHTML = divContent;
        window.print();
        document.body.innerHTML = backup;       
      },
      posCheckout(){
        var db = firebase.firestore();

        if(this.cart.length > 0){
            db.collection("orders").add({                
                cart:this.$store.getters.cart,              
                quantity:this.cart.length,
                checkout_total:this.checkout_total,
                order_status:"Complete",
                order_type:"POS Customer",
                user_id:"Admin",                
                time:moment().format('HH-mm'),
                date:moment().format('YYYY-MM-DD'),
                duration:60,
                created_date:moment().format('DD-MM-YYYY'),
                created_month:moment().format('MM-YYYY'),               
                created_year:moment().format('YYYY'),               
                timestamp:Date.now()
            }).then(()=>{
              this.$store.commit('emptyCart')                      
              this.$router.push({ name: 'PosSuccess'})
              this.printData()
            })
            .catch(function(err) {
                console.log(err);                
            });     
        
        }else{
            this.feedback = "The cart is empty"
        }
      },
      checkout(){
        var db = firebase.firestore();

        if(this.cart.length > 0){
            db.collection("orders").add({                
                cart:this.$store.getters.cart,              
                quantity:this.cart.length,
                checkout_total:this.checkout_total,
                order_status:"Complete",
                order_type:"POS Customer",
                user_id:"Admin",                
                time:moment().format('HH-mm'),
                date:moment().format('YYYY-MM-DD'),
                duration:60,
                created_date:moment().format('DD-MM-YYYY'),
                created_month:moment().format('MM-YYYY'),               
                created_year:moment().format('YYYY'),               
                timestamp:Date.now()
            }).then(()=>{
              this.$store.commit('emptyCart')                      
              this.$router.push({ name: 'PosSuccess'})              
            })
            .catch(function(err) {
                console.log(err);                
            });      
              
        }else{
            this.feedback = "The cart is empty"
        }
      }

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
              if(this.vatStatus==0 || this.vatStatus == null){
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
              total += Number((parseFloat(item.product.price * item.quantity))*this.vat)/100;
          });
          return total.toFixed(2);
      }          
    },
   }
 </script>
 
<style scoped>

  .pos_sub_total .flex{
    text-align: right;
  }
  .pos_gap{
    padding:0!important;
  }
   .pos_button{
    text-align: center;
  }
   .pos_button .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
    background-color: #F16D07;
    color:#FAFAFA;
    text-transform: capitalize;
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
  height:0px;
  width:50%;
  right:40px;
  margin-top: -8px;
  border-top: 1px solid rgba(0,0,0,.22);
}

.check_out_pos{
  display:flex;
}
.check_out_pos .pos_button:nth-of-type(1){
  margin-right:10px;
}
@media screen and (max-width: 767px) {
  .check_out_pos{
  display:grid;
}
.check_out_pos .pos_button:nth-of-type(1){
  margin-right:0px;
}
}
 
</style>
   