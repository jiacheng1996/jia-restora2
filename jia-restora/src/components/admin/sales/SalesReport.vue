<template>
  <v-app>
    <Navbar/>
    <div>
      <v-content>
        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex lg6>
              <v-card>
                <v-card-title><h4>Sales of {{current_month_name}}</h4></v-card-title>
                <v-divider></v-divider>
                <v-list dense class="pukulist">
                  <v-list-tile>
                    <v-list-tile-content>Sales:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{currency}}{{sales_this_month}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Tax:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{currency}}{{(this.sales_this_month * this.tax)/100}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content><b>Total:</b></v-list-tile-content>
                    <v-list-tile-content class="align-end"><b>{{currency}}{{this.sales_this_month - (this.sales_this_month * this.tax)/100}}</b></v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex lg6 >   
              <v-card lg12 class="main_color">
                <v-card-title primary-title>
                  <h1 class="white--text">Sales of {{current_month_name}}</h1>
                  <div class="white--text">
                    <h4>Total sales Of this month : {{currency}}{{sales_this_month}} </h4>
                  </div>
                </v-card-title>
                  <v-card-actions>
                    <v-btn flat :to="{name: 'Sales'}" style="background:#F16D07;color:#FFF;">Check All Sales</v-btn>
                  </v-card-actions>
              </v-card>
              <v-card lg12 class="mt-3 main_color">
                <v-card-title primary-title>
                  <h1 class="white--text">Sales of {{current_year}}</h1>
                  <div class="white--text">
                    <h4>January : <span class="monthy_total">{{currency}}{{sales_total_january}} </span></h4>
                    <h4>February : <span class="monthy_total">{{currency}}{{sales_total_february}}</span></h4>
                    <h4>March : <span class="monthy_total">{{currency}}{{sales_total_march}}</span></h4>
                    <h4>April : <span class="monthy_total">{{currency}}{{sales_total_april}}</span></h4>
                    <h4>May : <span class="monthy_total">{{currency}}{{sales_total_may}}</span></h4>
                    <h4>June : <span class="monthy_total">{{currency}}{{sales_total_june}}</span></h4>
                    <h4>July : <span class="monthy_total">{{currency}}{{sales_total_july}}</span></h4>
                    <h4>August : <span class="monthy_total">{{currency}}{{sales_total_august}}</span></h4>
                    <h4>September : <span class="monthy_total">{{currency}}{{sales_total_september}}</span></h4>
                    <h4>October : <span class="monthy_total">{{currency}}{{sales_total_october}}</span></h4>
                    <h4>November : <span class="monthy_total">{{currency}}{{sales_total_november}}</span></h4>
                    <h4>December : <span class="monthy_total">{{currency}}{{sales_total_december}}</span></h4>
                    <h3>Total: <span class="monthy_total">{{currency}}{{sales_total_year}}</span></h3>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
  import Navbar from '@/components/admin/navbar/Navbar'
  import db from '@/firebase/init'
  import moment from 'moment'
  export default {
    name:'SalesReport',
    components: {
      Navbar
    },
    data(){
      return{
      rowsPerPageItems: [8, 16, 24],
      pagination: {
      rowsPerPage: 8
      },
      currency:'',
      tax:'',
      customer:[],
      current_month_name:moment().format('MMMM'),
      current_year:moment().format('YYYY'),
      sales_total:'',
      sales_total_year:'',
      sales_total_january:'',
      sales_total_february:'',
      sales_total_march:'',
      sales_total_april:'',
      sales_total_may:'',
      sales_total_june:'',
      sales_total_july:'',
      sales_total_august:'',
      sales_total_september:'',
      sales_total_october:'',
      sales_total_november:'',
      sales_total_december:'',
      top_five_expenses:'',
      sales_this_month:'',
    }
    },
    methods:{

    },
    created(){
      // Current Currency
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
      })
      // Current Tax
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.tax = doc.data().tax
      })
      // Total Sales of This Month
      db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('MM-YYYY'))
      .get()
      .then(snapshot => {
        var totalSales = 0;
        snapshot.forEach(doc => {
          totalSales += Number(doc.data().checkout_total)
        })
        this.sales_this_month = totalSales;
      })
      // Total Sales of This Year
      db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_year", "==", moment().format('YYYY'))
      .get()
      .then(snapshot => {
        var totalSales = 0;
        snapshot.forEach(doc => {
          totalSales += Number(doc.data().checkout_total)
        })
        this.sales_total_year = totalSales;
      })
      // Total Sales of This January
      db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('01-YYYY'))
      .get()
      .then(snapshot => {
        var totalSales = 0;
        snapshot.forEach(doc => {
          totalSales += Number(doc.data().checkout_total)
        })
        this.sales_total_january = totalSales;
      })
      // Total Sales of This February
      db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('02-YYYY'))
      .get()
      .then(snapshot => {
        var totalSales = 0;
        snapshot.forEach(doc => {
          totalSales += Number(doc.data().checkout_total)
        })
        this.sales_total_february = totalSales;
      })

      // Total Sales of This March
      db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('03-YYYY'))
      .get()
      .then(snapshot => {
          var totalSales = 0;
          snapshot.forEach(doc => {
            totalSales += Number(doc.data().checkout_total)
          })
          this.sales_total_march = totalSales;
        })
        // Total Sales of This April
        db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('04-YYYY'))
        .get()
        .then(snapshot => {
          var totalSales = 0;
          snapshot.forEach(doc => {
            totalSales += Number(doc.data().checkout_total)
          })
          this.sales_total_april = totalSales;
        })
        // Total Sales of This May
        db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('05-YYYY'))
        .get()
        .then(snapshot => {
          var totalSales = 0;
          snapshot.forEach(doc => {
            totalSales += Number(doc.data().checkout_total)
          })
          this.sales_total_may = totalSales;
        })

        // Total Sales of This June
        db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('06-YYYY'))
        .get()
        .then(snapshot => {
          var totalSales = 0;
          snapshot.forEach(doc => {
            totalSales += Number(doc.data().checkout_total)
          })
          this.sales_total_june = totalSales;
        })
        // Total Sales of This July
        db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('07-YYYY'))
        .get()
        .then(snapshot => {
          var totalSales = 0;
          snapshot.forEach(doc => {
            totalSales += Number(doc.data().checkout_total)
          })
          this.sales_total_july = totalSales;
        })
        // Total Sales of This August
        db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('08-YYYY'))
        .get()
        .then(snapshot => {
          var totalSales = 0;
          snapshot.forEach(doc => {
            totalSales += Number(doc.data().checkout_total)
          })
          this.sales_total_august = totalSales;
        })
      // Total Sales of This September
      db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('09-YYYY'))
      .get()
      .then(snapshot => {
        var totalSales = 0;
        snapshot.forEach(doc => {
            totalSales += Number(doc.data().checkout_total)
        })
        this.sales_total_september = totalSales;
      })
      // Total Sales of This October
      db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('10-YYYY'))
      .get()
      .then(snapshot => {
        var totalSales = 0;
        snapshot.forEach(doc => {
            totalSales += Number(doc.data().checkout_total)
        })
        this.sales_total_october = totalSales;
      })

      // Total Sales of This November
      db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('11-YYYY'))
      .get()
      .then(snapshot => {
        var totalSales = 0;
        snapshot.forEach(doc => {
            totalSales += Number(doc.data().checkout_total)
        })
        this.sales_total_november = totalSales;
      })

      // Total Sales of This December
      db.collection('orders').orderBy('timestamp', 'desc').where("order_status", "==", "Complete").where("created_month", "==", moment().format('12-YYYY'))
      .get()
      .then(snapshot => {
        var totalSales = 0;
        snapshot.forEach(doc => {
            totalSales += Number(doc.data().checkout_total)
        })
        this.sales_total_december = totalSales;
      })
    }
  }
</script>

<style>
  tbody a{
    font-size: 13px;
    color:black;
    text-decoration: underline;
  }
  .pukulist .list__tile__content{
    border-bottom: 1px solid #dadada;
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
  light.divider, .theme--light .divider {
      background-color: rgba(0,0,0,.12);
  }
  .monthy_total{
    float: right;
    margin-left: 50px;
  }
</style>
