<template>
    <v-layout>
        <v-container class="pt-2">
            <v-layout row wrap>              
                <v-flex xs12 sm6 md4>
                    <v-card class="project_item main_color">
                        <h1 class="white--text">Orders</h1>      
                        <h4 class="white--text">Orders Today : {{number_of_pos_sales}}</h4>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-card class="project_item main_color">
                        <h1 class="white--text">Sales</h1>
                        <h4 class="white--text">Sales Today : {{currency}}{{pos_sales_today}}</h4>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-card class="project_item main_color">
                        <h1 class="white--text">Items</h1>
                        <h4 class="white--text">Item Quantity : {{total_items}}</h4>
                    </v-card>
                </v-flex>              
            </v-layout> 
        </v-container>
    </v-layout>
</template>

<script>
  import Navbar from '@/components/admin/navbar/Navbar'
  import firebase from "firebase";
  import moment from 'moment'   
  export default {
    name:'PosHeader',
    components: {
      Navbar
    },
    data(){
      return{
        currency:'',
        search: '',
        pos_sales_today:'',
        number_of_pos_sales:'',
        total_items:''
      }
    },
    methods:{

        
      
    },
    created(){
        var db = firebase.firestore();

        // Current Currency
        db.collection("settings").doc('config').onSnapshot(doc =>{
          this.currency = doc.data().currency
        })

        // Total POS sales Today
        db.collection('orders')            
        .where("order_type", "==",'POS Customer')
        .where("created_date", "==", moment().format('DD-MM-YYYY'))
        .get()
        .then(snapshot => {
                var totalPosSales = 0;
                snapshot.forEach(doc => {
                    totalPosSales += Number(doc.data().checkout_total)
                })
                this.pos_sales_today = totalPosSales;
        })

        // Total number of POS sales today
            db.collection('orders')            
        .where("order_type", "==",'POS Customer')
        .where("created_date", "==", moment().format('DD-MM-YYYY'))
        .get()
        .then(snapshot => {
                this.number_of_pos_sales = snapshot.size;
        })

         // Total Items
        db.collection('items')
        .get()
        .then(snapshot => {
            this.total_items = snapshot.size;
        })
      
      },
      computed: {
      
      }
  }
</script>

<style scoped>
  .project_item{
    padding:20px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
  .project_item:hover{
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
	}
  td{
    text-align: center;
  }
  .order_id a{
    text-decoration: underline !important;
    color: black;
  }
  .primary--text {
    color: #F16D07 !important;
    caret-color: #F16D07 !important;
}
</style>
