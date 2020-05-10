<template>
  <v-app>
    <Navbar/>
    <div>
      <v-content>
        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex lg6>
              <v-card>
                <v-card-title><h4>Expenses of {{current_month_name}}</h4></v-card-title>
                <v-divider></v-divider>
                <v-list dense class="pukulist">
                  <v-list-tile>
                    <v-list-tile-content>Administration Fees:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{currency}}{{expenses_total_by_administration_fees}} </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Purchase Cost:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{currency}}{{expenses_total_by_purchase_cost}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Employee Expense:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{currency}}{{expenses_total_by_employee_expense}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Food & Entertainment:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{currency}}{{expenses_total_by_food_entertainment}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Travel Cost:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{currency}}{{expenses_total_by_travel_cost}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Marketing & Advertising:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{currency}}{{expenses_total_by_marketing_advertising}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Cost of Goods Sold:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{currency}}{{expenses_total_by_cost_of_goods_sold}}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content><b>Total:</b></v-list-tile-content>
                    <v-list-tile-content class="align-end"><b>{{currency}}{{expenses_total}}</b></v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex lg6>
              <v-card>
                <v-flex lg12>
                  <v-card class="main_color">
                    <v-card-title primary-title>
                      <h1 class="white--text">Expense of {{current_month_name}}</h1>
                      <div class="white--text">
                        <h4>Total Expense Of This Month :  {{currency}}{{expenses_total}}</h4>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn flat :to="{name: 'Expenses'}" style="background:#F16D07;color:#FFF;">Check All Expenses</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex lg12>
                  <v-card class="main_color">
                    <v-card-title primary-title>
                      <h1 class="white--text">Expense of {{current_year}}</h1>
                      <div class="white--text">
                        <h4>January : <span class="monthy_total">{{currency}}{{expense_total_january}}</span></h4>
                        <h4>February : <span class="monthy_total">{{currency}}{{expense_total_february}}</span></h4>
                        <h4>March : <span class="monthy_total">{{currency}}{{expense_total_march}}</span></h4>
                        <h4>April : <span class="monthy_total">{{currency}}{{expense_total_april}}</span></h4>
                        <h4>May : <span class="monthy_total">{{currency}}{{expense_total_may}}</span></h4>
                        <h4>June : <span class="monthy_total">{{currency}}{{expense_total_june}}</span></h4>
                        <h4>July : <span class="monthy_total">{{currency}}{{expense_total_july}}</span></h4>
                        <h4>August : <span class="monthy_total">{{currency}}{{expense_total_august}}</span></h4>
                        <h4>September : <span class="monthy_total">{{currency}}{{expense_total_september}}</span></h4>
                        <h4>October : <span class="monthy_total">{{currency}}{{expense_total_october}}</span></h4>
                        <h4>November : <span class="monthy_total">{{currency}}{{expense_total_november}}</span></h4>
                        <h4>December : <span class="monthy_total">{{currency}}{{expense_total_december}}</span></h4>
                        <h3>Total: <span class="monthy_total">{{currency}}{{expense_total_year}}</span></h3>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-flex>
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
    name:'ExpenseReport',
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
        customer:[],
        current_month_name:moment().format('MMMM'),
        current_year:moment().format('YYYY'),
        expense_total_year:'',
        expenses_total:'',
        expense_total_january:'',
        expense_total_february:'',
        expense_total_march:'',
        expense_total_april:'',
        expense_total_may:'',
        expense_total_june:'',
        expense_total_july:'',
        expense_total_august:'',
        expense_total_september:'',
        expense_total_october:'',
        expense_total_november:'',
        expense_total_december:'',
        expenses_total_by_administration_fees:'',
        expenses_total_by_purchase_cost:'',
        expenses_total_by_employee_expense:'',
        expenses_total_by_food_entertainment:'',
        expenses_total_by_travel_cost:'',
        expenses_total_by_marketing_advertising:'',
        expenses_total_by_cost_of_goods_sold:'',        
        top_five_expenses:''
      }
    },
    methods:{

    },
    created(){
      // Current Currency
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.currency = doc.data().currency
      })

      // Total Expenses of This month
      db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
      .get()
      .then(snapshot => {
        var totalExpneses = 0;
        snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
        })
        this.expenses_total = totalExpneses;
      })

      // Total Expenses of This January
      db.collection('expenses').where("created_month", "==", moment().format('01-YYYY'))
        .get()
        .then(snapshot => {
          var totalExpneses = 0;
          snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
          })
          this.expense_total_january = totalExpneses;
      })

      // Total Expenses of This February
      db.collection('expenses').where("created_month", "==", moment().format('02-YYYY'))
        .get()
        .then(snapshot => {
          var totalExpneses = 0;
          snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
          })
          this.expense_total_february = totalExpneses;
      })

      // Total Expenses of This March
      db.collection('expenses').where("created_month", "==", moment().format('03-YYYY'))
        .get()
        .then(snapshot => {
          var totalExpneses = 0;
          snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
          })
          this.expense_total_march = totalExpneses;
      })

      // Total Expenses of This April
      db.collection('expenses').where("created_month", "==", moment().format('04-YYYY'))
        .get()
        .then(snapshot => {
          var totalExpneses = 0;
          snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
          })
          this.expense_total_april = totalExpneses;
      })

      // Total Expenses of This May
      db.collection('expenses').where("created_month", "==", moment().format('05-YYYY'))
        .get()
        .then(snapshot => {
          var totalExpneses = 0;
          snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
          })
          this.expense_total_may = totalExpneses;
      })

      // Total Expenses of This June
      db.collection('expenses').where("created_month", "==", moment().format('06-YYYY'))
        .get()
        .then(snapshot => {
          var totalExpneses = 0;
          snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
          })
          this.expense_total_june = totalExpneses;
      })

      // Total Expenses of This July
      db.collection('expenses').where("created_month", "==", moment().format('07-YYYY'))
        .get()
        .then(snapshot => {
          var totalExpneses = 0;
          snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
          })
          this.expense_total_july = totalExpneses;
      })

      // Total Expenses of This February
      db.collection('expenses').where("created_month", "==", moment().format('08-YYYY'))
        .get()
        .then(snapshot => {
          var totalExpneses = 0;
          snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
          })
          this.expense_total_august = totalExpneses;
      })

      // Total Expenses of This February
      db.collection('expenses').where("created_month", "==", moment().format('09-YYYY'))
        .get()
        .then(snapshot => {
          var totalExpneses = 0;
          snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
          })
          this.expense_total_september = totalExpneses;
      })

      // Total Expenses of This October
      db.collection('expenses').where("created_month", "==", moment().format('10-YYYY'))
        .get()
        .then(snapshot => {
          var totalExpneses = 0;
          snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
          })
          this.expense_total_october = totalExpneses;
      })

      // Total Expenses of This November
      db.collection('expenses').where("created_month", "==", moment().format('11-YYYY'))
        .get()
        .then(snapshot => {
        var totalExpneses = 0;
        snapshot.forEach(doc => {
          totalExpneses += Number(doc.data().expense_amount)
        })
        this.expense_total_november = totalExpneses;
      })

      // Total Expenses of This December
      db.collection('expenses').where("created_month", "==", moment().format('12-YYYY'))
        .get()
        .then(snapshot => {
        var totalExpneses = 0;
        snapshot.forEach(doc => {
          totalExpneses += Number(doc.data().expense_amount)
        })
        this.expense_total_december = totalExpneses;
      })

      // Total Expenses of This month by Administration Fees
      db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
      .where("expense_type", "==", "Administration Fees")
      .get()
      .then(snapshot => {
        var totalExpneses = 0;
        snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
        })
        this.expenses_total_by_administration_fees = totalExpneses;
      })

      // Total Expenses of This month by Purchase Cost
      db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
      .where("expense_type", "==", "Purchase Cost")
      .get()
      .then(snapshot => {
        var totalExpneses = 0;
        snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
        })
        this.expenses_total_by_purchase_cost = totalExpneses;
      })

      // Total Expenses of This month by Employee Expense
      db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
      .where("expense_type", "==", "Employee Expense")
      .get()
      .then(snapshot => {
        var totalExpneses = 0;
        snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
        })
        this.expenses_total_by_employee_expense = totalExpneses;
      })

      // Total Expenses of This month by Food & Entertainment
      db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
      .where("expense_type", "==", "Food & Entertainment")
      .get()
      .then(snapshot => {
        var totalExpneses = 0;
        snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
        })
        this.expenses_total_by_food_entertainment = totalExpneses;
      })

      // Total Expenses of This month by Travel Cost
      db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
      .where("expense_type", "==", "Travel Cost")
      .get()
      .then(snapshot => {
        var totalExpneses = 0;
        snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
        })
        this.expenses_total_by_travel_cost = totalExpneses;
      })

      // Total Expenses of This month by Marketing & Advertising
      db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
      .where("expense_type", "==", "Marketing & Advertising")
      .get()
      .then(snapshot => {
        var totalExpneses = 0;
        snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
        })
        this.expenses_total_by_marketing_advertising = totalExpneses;
      })

      // Total Expenses of This month by Cost of Goods Sold
      db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
      .where("expense_type", "==", "Cost of Goods Sold")
      .get()
      .then(snapshot => {
        var totalExpneses = 0;
        snapshot.forEach(doc => {
            totalExpneses += Number(doc.data().expense_amount)
        })
        this.expenses_total_by_cost_of_goods_sold = totalExpneses;
      })

      // Total Expenses of This Year
      db.collection('expenses').where("created_year", "==", moment().format('YYYY'))
                              
      .get()
      .then(snapshot => {
            var totalExpneses = 0;
            snapshot.forEach(doc => {
                totalExpneses += Number(doc.data().expense_amount)
            })
            this.expense_total_year = totalExpneses;
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
.white--text{
  color:#fff!important;
}
.primary--text {
  color: #F16D07 !important;
  caret-color: #F16D07 !important;
}
</style>
