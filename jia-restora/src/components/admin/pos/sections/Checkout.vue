<template> 
  <v-layout row wrap> 
        <v-flex xs12>

        <!----POS Print Bill---->
          <v-flex>
            <v-card class="pos_print pa-4">
              <h3 class="headline text-xs-center black--text">{{company_name}}</h3>              
              <h4 class="text-xs-center black--text">{{company_address}}</h4>
              <h4 class="text-xs-center black--text">Mobile: {{company_mobile}}</h4>
              
              <div class="mt-4 py-2 pos_header_info">
                <v-list>
                  <v-list-tile>
                    <v-flex xs12 text-xs-left>
                      <h5><b>Customer Name: {{pos_customer_name}}</b></h5>
                      <h5><b>Mobile: {{pos_customer_mobile}}</b></h5>
                    </v-flex>  
                    <v-flex xs12 text-xs-right>
                      <b>Date: {{today}}</b>
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
                    <td class="text-xs-left"><b>{{ props.item.product.item_name }}</b></td>
                    <td class="text-xs-left"><b>{{props.item.quantity}}</b></td>
                    <td class="text-xs-left"><b>{{currency}}{{ props.item.product.price }}</b></td>
                    <td class="text-xs-right"><b>{{currency}}{{(props.item.product.price*props.item.quantity).toFixed(2)}}</b></td>                    
                  </template>
              </v-data-table>
              
              <v-list class="pos_machine_sub_total mt-2">
                <v-list-tile>
                  <v-flex text-xs-right><b>Sub Total:</b></v-flex>
                  <v-flex xs6>
                    <b>{{currency}}{{subTotal}}</b>
                  </v-flex>                    
                </v-list-tile>
              </v-list>

              <v-list class="pos_machine_sub_total" v-if="this.vatStatus==0 || this.vatStatus == null">
                <v-list-tile>
                  <v-flex text-xs-right><b>Vat:</b></v-flex>
                  <v-flex xs6>
                    <b>{{currency}}0.00</b>
                  </v-flex>                    
                </v-list-tile>
              </v-list>

              <v-list class="pos_machine_sub_total" v-else>
                <v-list-tile>
                  <v-flex text-xs-right><b>Vat:</b></v-flex>
                  <v-flex xs6>
                    <b>{{currency}}{{totalVat}}</b>
                  </v-flex>                    
                </v-list-tile>
              </v-list> 

              <v-list class="pos_machine_sub_total pos_machine_sub_total_border">
                <v-list-tile>
                  <v-flex text-xs-right><b>Total:</b></v-flex>
                  <v-flex xs6>
                   <b>{{currency}}{{cartTotal}}</b>
                  </v-flex>                    
                </v-list-tile>
              </v-list> 
              <v-flex class="mt-4">
                <h4 class="text-xs-center black--text text-uppercase">Thank you</h4>
                <h4 class="text-xs-center black--text text-uppercase">Please Come Again</h4>
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

      <div id="printDiv" style="display:none;">
        <div>
          <h3 class="headline text-xs-center black--text">{{company_name}}</h3>              
            <h4 class="text-xs-center black--text">{{company_address}}</h4>
            <h4 class="text-xs-center black--text">Mobile: {{company_mobile}}</h4>
            <div class="mt-4 py-2 pos_header_info1 d-flex">
              <v-flex xs12 text-xs-left class="px-4">
                <h5><b class="black--text">Customer Name: {{pos_customer_name}}</b></h5>
                <h5 ><b class="black--text">Mobile: {{pos_customer_mobile}}</b></h5>
              </v-flex> 
              <v-flex xs12 text-xs-right class="px-4">
                <h5> <b class="black--text">Date: {{today}}</b></h5>
              </v-flex> 
            </div>  
        </div>
        <table class="table_print mb-1">
        <tr>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th></th>
        </tr>
        <tr v-for="(item, index) in cart" :key="index">         
          <td><b>{{item.product.item_name}}</b></td>
          <td><b>{{item.quantity}}</b></td>
          <td><b>{{currency}}{{item.product.price}}</b></td>
          <td><b>{{currency}}{{(item.product.price*item.quantity).toFixed(2)}}</b></td>
          <td></td>
        </tr>           
        </table>
        
        <table>
          <tr> 
            <td></td> 
            <td class="text-xs-right py-1"><b class="black--text ">Sub Total:</b></td>
            <td class="text-xs-right py-1"><b class="black--text  pr-3">{{currency}}{{subTotal}}</b></td>
            <td></td> 
          </tr> 
          <tr> 
            <td></td> 
            <td class="text-xs-right py-1"><b class="black--text ">Vat:</b></td>
            <td class="text-xs-right py-1"><b class="black--text  pr-3">{{currency}}{{totalVat}}</b></td>
            <td></td> 
          </tr>
          <tr class="for_border"> 
            <td></td> 
            <td class="text-xs-right py-1"><b class="black--text ">Total:</b></td>
            <td class="text-xs-right py-1"><b class="black--text  pr-3">{{currency}}{{cartTotal}}</b></td>
            <td></td>
          </tr>
        </table>
        
        <div class="mt-4">
          <h4 class="text-xs-center black--text text-uppercase">Thank you</h4>
          <h4 class="text-xs-center black--text text-uppercase">Please Come Again</h4>
          <br><br><br><br>
        </div>

      </div>
      
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
        pos_customer_name:this.$store.getters.pos_customer_name,      
        pos_customer_mobile:this.$store.getters.pos_customer_mobile,    
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
              this.$store.commit('emptyposCustomerName')                      
              this.$store.commit('emptyposCustomerMobile')                      
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
              this.$store.commit('emptyposCustomerName')                      
              this.$store.commit('emptyposCustomerMobile')                         
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
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td:last-of-type{
  width:10px;
}
.table_print td:last-child{
  width:30px!important;
}
.table_print td,.table_print th {
  border: 1px dashed #212121;
  text-align: right;
  padding: 8px;
}

.table_print tr:nth-child(even) {
  background-color: #dddddd;
}
.for_border{
  border-top:1px dashed #212121;
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
  .pos_header_info1{
    border-bottom:0px dashed rgb(0,0,0,0.87);
    border-top:1px dashed rgb(0,0,0,0.87);
  }
  #printDiv{
    padding:8px 15px!important;
    width:300px;
  }
 .table_total  td[data-v-7fcf83bf] {
    border: 0px solid #212121!important;
    
    padding: 8px;
}
  #printDiv .pos_machine_sub_total_border_2{
    border-top: 1px solid rgba(0,0,0,.22);
  }
  #printDiv .pos_machine_sub_total .flex.xs6[data-v-7fcf83bf] {
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    max-width: 50%;
    text-align: right;
}
#printDiv .pos_machine_sub_total_border_2 .flex.xs6[data-v-7fcf83bf] {
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    max-width: 50%;
    text-align: right;
    margin-right: 11px;
    color: rgb(0,0,0,0.87);
    font-weight: bold;
    padding: 8px 0 8px 8px!important;
}

#printDiv .v-list{
  padding:0!important;
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
   