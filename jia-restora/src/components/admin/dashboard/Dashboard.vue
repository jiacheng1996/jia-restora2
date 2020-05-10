<template>
  <v-app>
    <Navbar/>
    <div>
      <v-content>
        <v-card flat>
          <v-container
            fluid
            grid-list-lg
          >
            <v-layout row wrap>
              <v-flex xs12 sm6 md3>
                <router-link :to="{ name:'Customers'}">
                  <v-card class="white--text main_item main_color" style="text-align:center;color:#FFF!important;">
                    <div class="text-xs-center">
                      <v-icon round class="item_icon">people</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Customers</p>
                      <p class="body-2">Customers This Month: {{customer_of_this_month}}</p>
                      <p class="body-2">Total Customers: {{customer_total}} </p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'Sales'}">
                  <v-card class="white--text main_item main_color" style="text-align:center;color:#FFF!important;">
                    <div class="text-xs-center">
                      <v-icon round class="item_icon">add_shopping_cart</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Sales</p>
                      <p class="body-2">Sales Today : {{currency}}{{sales_today}} </p>
                      <p class="body-2">Sales This Month : {{currency}}{{sales_of_this_month}}  </p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <router-link :to="{ name:'Expenses'}">
                  <v-card class="white--text main_item main_color" style="text-align:center;color:#FFF!important;">
                    <div class="text-xs-center">
                      <v-icon round class="item_icon">attach_money</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Expenses</p>
                      <p class="body-2">Expenses Today : {{currency}}{{expense_today}} </p>
                      <p class="body-2">Expenses This Month : {{currency}}{{expenses_of_this_month}} </p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'Options'}">
                  <v-card class="white--text main_item main_color" style="text-align:center;color:#FFF!important;">
                    <div class="text-xs-center">
                      <v-icon round class="item_icon">done_outline</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Options</p>
                      <p class="body-2">Customer Reviews : {{total_reviews}} </p>
                      <p class="body-2">Published Features : {{total_features}} </p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'Items'}">
                  <v-card class="white--text main_item main_color" style="text-align:center;color:#FFF!important;">
                    <div class="text-xs-center">
                      <v-icon round class="item_icon">card_giftcard</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Products</p>
                      <p class="body-2">Total Category Types: {{total_category_types}} </p>
                      <p class="body-2">Total Items : {{total_items}} </p>                     
                    </div>
                  </v-card>
                </router-link>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'Orders'}">
                  <v-card class="white--text main_item main_color" style="text-align:center;color:#FFF!important;">
                    <div class="text-xs-center">
                      <v-icon round class="item_icon">library_books</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Orders</p>
                      <p class="body-2">Orders Pending : {{total_pending_orders}}</p>
                      <p class="body-2">Orders Processing : {{total_processing_orders}} </p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'RecentDeliveries'}">
                  <v-card class="white--text main_item main_color" style="text-align:center;color:#FFF!important;">
                    <div class="text-xs-center">
                      <v-icon round class="item_icon">assignment</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Deliveries</p>
                      <p class="body-2">Processing Deliveries : {{total_processing_deliveries}}</p>
                      <p class="body-2">Deliveries of {{current_month_name}} : {{total_complete_deliveries}} </p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'Pos'}">
                  <v-card class="white--text main_item main_color" style="text-align:center;color:#FFF!important;">
                    <div class="text-xs-center">
                      <v-icon round class="item_icon">settings</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">POS</p>
                      <p class="body-2">Total Orders Today : {{number_of_pos_sales}} </p>
                      <p class="body-2">Total Sales Today : {{currency}}{{pos_sales_today}} </p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>             
            </v-layout>
          </v-container>
        </v-card>

        <!-- Sales Chart -->
        <Chart/>

        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12 sm5 lg5>
              <v-card>
                <v-card-title><h4>Business Report of {{current_month_name}}  </h4></v-card-title>
                <v-divider></v-divider>
                <v-list dense class="pukulist">
                  <v-list-tile>
                    <v-list-tile-content>New Customers:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{customer_of_this_month}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>New Orders:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{total_orders}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Complete Orders:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{total_complete_orders}} </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Cancelled Orders:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{total_cancelled_orders}}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
              <v-card>
                <v-card-title><h4>Income Expense Comparison Of {{current_month_name}}  </h4></v-card-title>
                <v-divider></v-divider>
                <v-list dense class="pukulist">
                  <v-list-tile>
                    <v-list-tile-content>Total Sales:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{currency}}{{sales_of_this_month}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Total Expenses:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{currency}}{{expenses_of_this_month}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Total Tax:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{currency}}{{sales_of_this_month}} * {{tax}}% = {{currency}}{{((this.sales_of_this_month * this.tax)/100).toFixed(2)}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content><b>Net Earnings After Tax:</b></v-list-tile-content>
                    <v-list-tile-content class="align-end"><b>{{currency}}{{(this.sales_of_this_month - (this.sales_of_this_month * this.tax)/100 - this.expenses_of_this_month).toFixed(2)}}</b></v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex xs12 sm7 lg7>
              <v-card>
                <v-card-title><h4> Orders This Week </h4></v-card-title>
                <v-divider></v-divider>
                <v-sheet height="392">
                  <!-- :now="today"  now is normally calculated by itself, but to keep the calendar in this date range to view events -->
                  <v-calendar
                    ref="calendar"                           
                    :value="today"
                    color="primary"
                    type="week"
                  >
                    <!-- the events at the top (all-day) -->
                    <template
                    slot="dayHeader"
                    slot-scope="{ date }"
                    >
                      <template v-for="event in eventsMap[date]">
                        <!-- all day events don't have time -->
                        <div
                        v-if="!event.time"
                        :key="event.title"
                        class="my-event"
                        @click="open(event)"
                        v-html="event.title"
                        ></div>
                      </template>
                    </template>
                    <!-- the events at the bottom (timed) -->
                    <template
                    slot="dayBody"
                    slot-scope="{ date, timeToY, minutesToPixels }"
                    >
                      <template v-for="event in eventsMap[date]">
                        <!-- timed events -->
                        <div
                        v-if="event.time"
                        :key="event.title"
                        :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                        class="my-event with-time"                                
                        v-html=" event.name +'<br>' +currency+event.checkout_total"
                        ></div>
                      </template>
                    </template>
                  </v-calendar>
                </v-sheet>
              </v-card>          
            </v-flex>          
          </v-layout>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
  import Navbar from '@/components/admin/navbar/Navbar';
  import Chart from '@/components/admin/dashboard/Chart'
  import firebase from "firebase";
  import moment from 'moment'
  export default {
    name:'Dashboard',
    components: {
      Navbar,Chart
    },
    data(){
        return{
          date:[], 
          today: moment().format('DD-MM-YYYY'),
          events: [],
          current_month_name:moment().format('MMMM'),
          rowsPerPageItems: [8, 16, 24],
          pagination: {
          rowsPerPage: 8
          },
          customerrecords:[],
          leadrecords:[],
          customerHeaders: [
          { text: 'Customer Name'},
          { text: 'Updates'},
          { text: 'Created' },
          ],
          leadHeaders: [
            { text: 'Name'},
            { text: 'Updates'},
            { text: 'Created' },
          ],
          customer_of_this_month:'',
          customer_total:'',
          sales_of_this_month:'',
          sales_total:'',
          expenses_of_this_month:'',
          expenses_total:'',
          leads_of_this_month:'',
          leads_total:'',
          currency:'',
          sales_today:'',
          expense_today:'',        
          total_items:'',
          total_category_types:'',
          total_pending_orders:'',
          total_processing_orders:'',
          total_processing_deliveries:'',
          total_complete_deliveries:'',
          total_orders:'',
          total_complete_orders:'',
          total_cancelled_orders:'',
          pos_sales_today:'',
          number_of_pos_sales:'',
          total_reviews:'',
          total_features:'',
          currency:'',
          tax:'',

        }
    },
    computed: {
        // convert the list of events into a map of lists keyed by date
        eventsMap () {
          const map = {}
          this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
          return map
        }
    },
    mounted () {
        this.$refs.calendar.scrollToTime('00:00')
    },
    methods: {
        open (event) {
          alert(event.title + event.person)
        }
    },
    created(){

          var db = firebase.firestore(); 

          // Show All Orders in Calender
          let orderRef = db.collection('orders').where("order_type", "==", "Online Customer").orderBy('timestamp', 'desc')

          orderRef.onSnapshot(snapshot => {
              snapshot.docChanges().forEach(change => {
              if(change.type == 'added'){
                  let doc = change.doc
                  this.events.push({
                      id:doc.id,                    
                      order_id:doc.data().order_id,                   
                      timestamp:moment(doc.data().timestamp).format('ll'),      
                      quantity:doc.data().quantity,               
                      name:doc.data().name,               
                      checkout_total:doc.data().checkout_total,
                      date:doc.data().date,
                      time:doc.data().time,
                      duration:doc.data().duration,               
                  })
                }
              })
          })

          // Total Orders
          db.collection('orders')
          .get()
          .then(snapshot => {
                this.total_orders = snapshot.size;
          })

          // Total Complete Orders
          db.collection('orders').where("order_status", "==", "Complete")
          .get()
          .then(snapshot => {
                this.total_complete_orders = snapshot.size;
          })

          // Total Cancelled Orders
          db.collection('orders').where("order_status", "==", "Cancelled")
          .get()
          .then(snapshot => {
                this.total_cancelled_orders = snapshot.size;
          })

          // Current Currency
          db.collection("settings").doc('config').onSnapshot(doc =>{
            this.currency = doc.data().currency
          })

          // Show All Customer Updates
          let cref = db.collection('customerrecords').orderBy('timestamp', 'desc').limit(4)

          cref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
              if(change.type == 'added'){
                let doc = change.doc
                this.customerrecords.push({
                  name:doc.data().name,
                  text:doc.data().text,
                  timestamp:moment(doc.data().timestamp).format('ll')
                })
              }
            })
          })

          // Show All Lead Updates
          let lref = db.collection('leadrecords').orderBy('timestamp', 'desc').limit(4)

          lref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
              if(change.type == 'added'){
                let doc = change.doc
                this.leadrecords.push({
                  name:doc.data().name,
                  text:doc.data().text,
                  timestamp:moment(doc.data().timestamp).format('ll')
                })
              }
            })
          })

          // Total Customers of this Month
          db.collection('profiles').where("created_month", "==", moment().format('MM-YYYY'))
          .get()
          .then(snapshot => {
              this.customer_of_this_month = snapshot.size;
          })
          // Total Customers
          db.collection('profiles')
          .get()
          .then(snapshot => {
              this.customer_total = snapshot.size;
          })

          // Total Sales of Today
          db.collection('orders').where("order_status", "==", "Complete").where("created_date", "==", moment().format('DD-MM-YYYY'))
          .get()
          .then(snapshot => {
            var totalSalesToday = 0;
            snapshot.forEach(doc => {
                totalSalesToday += Number(doc.data().checkout_total)
            })
            this.sales_today = totalSalesToday;
          })

          // Total Sales of this Month
          db.collection('orders').where("order_status", "==", "Complete").where("created_month", "==", moment().format('MM-YYYY'))
          .get()
          .then(snapshot => {
            var totalSalesOfThisMonth = 0;
            snapshot.forEach(doc => {
              totalSalesOfThisMonth += Number(doc.data().checkout_total)
            })
            this.sales_of_this_month = totalSalesOfThisMonth;
          }) 

          // Total sales
          db.collection('sales')
          .get()
          .then(snapshot => {
                var totalSales = 0;
                snapshot.forEach(doc => {
                  totalSales += Number(doc.data().total)
                })
                this.sales_total = totalSales;
          })

          // Total Expense of this Month
          db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
          .get()
          .then(snapshot => {
                var totalExpensesOfThisMonth = 0;
                snapshot.forEach(doc => {
                    totalExpensesOfThisMonth += Number(doc.data().expense_amount)
                })
                this.expenses_of_this_month = totalExpensesOfThisMonth;
            })

            // Total Expense Today
            db.collection('expenses').where("expense_date", "==", moment().format('DD-MM-YYYY'))
            .get()
            .then(snapshot => {
                  var totalExpense = 0;
                  snapshot.forEach(doc => {
                      totalExpense += Number(doc.data().expense_amount)
                  })
                  this.expense_today = totalExpense;
            })

            // Total Expenses
            db.collection('expenses')
          .get()
          .then(snapshot => {
                var totalExpneses = 0;
                snapshot.forEach(doc => {
                    totalExpneses += Number(doc.data().expense_amount)
                })
                this.expenses_total = totalExpneses;
            })       

            // Total Items
            db.collection('items')
          .get()
          .then(snapshot => {
                this.total_items = snapshot.size;
            })

            // Total Category Types
            db.collection('item_categories')
          .get()
          .then(snapshot => {
                this.total_category_types = snapshot.size;
            })
            
            // Total Pending Orders
            db.collection('orders').where("order_status", "==", "Pending")
          .get()
          .then(snapshot => {
                this.total_pending_orders = snapshot.size;
            })

            // Total Processing Orders
            db.collection('orders').where("order_status", "==", "Processing")
          .get()
          .then(snapshot => {
                this.total_processing_orders = snapshot.size;
            })

            // Total Processing Deliveries
            db.collection('deliveries').where("delivery_status", "==", "Processing")
          .get()
          .then(snapshot => {
                this.total_processing_deliveries = snapshot.size;
            })

            // Total Complete Deliveries
            db.collection('deliveries').where("delivery_status", "==", "Complete")
          .get()
          .then(snapshot => {
                this.total_complete_deliveries = snapshot.size;
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

            // Total Reviews
            db.collection('reviews')
          .get()
          .then(snapshot => {
                this.total_reviews = snapshot.size;
            })

            // Total Features
            db.collection('features')
          .get()
          .then(snapshot => {
                this.total_features = snapshot.size;
            })

            // Current Currency
            db.collection("settings").doc('config').onSnapshot(doc =>{
              this.currency = doc.data().currency
            })

            // Current Tax
            db.collection("settings").doc('config').onSnapshot(doc =>{
              this.tax = doc.data().tax
            })
      }
  }
</script>

<style>
 
  .item p:nth-child(1){
		margin:0 0 5px;
	}
	.item p:last-child{
		margin-bottom:5px;
	}
	.item p{
		margin:0;
	}
  h1{
    width: 100%;
  }
  h4{
    width: 100%;
  }
  .updates-heading{
    margin-left: 25px;
  }
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #F16D07!important;
    color: #ffffff;
    border: 1px solid #F16D07!important;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;
  }
  .with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
  }
  
</style>
