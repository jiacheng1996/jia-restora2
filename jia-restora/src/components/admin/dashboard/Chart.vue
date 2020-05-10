<template>   
    <div>
        <v-container grid-list-lg class="mt-4">
          <v-layout row wrap justify-center align-center>
            <v-flex xs12 md6>
              <h4 class="py-3">Weekly Sales Report</h4>
              <div style="position:relative;height:400px;width:100%;">
                
                <template v-slot:default>                   
                    <tbody  class="table graf_background" style="width:100%;height:100%;">
                      <tr>
                        <td><span class="progress_value">{{highest_sales_between_last_7_days}}</span></td>
                        <td></td>
                      </tr>
                     <tr>
                        <td><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.9)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.8)}}</span></td>
                        <td></td>
                      </tr>
                     <tr>
                        <td><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.7)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.6)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.5)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.4)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.3)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.2)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.1)}}</span></td>
                        <td></td>
                      </tr>
                    </tbody>
                </template>
                               
                <v-flex xs12 class="graf_section">
                  <div class="box">

                    <div class="skill">
                      <div class="graph" :style="{'height':(sales_today_before_6/highest_sales_between_last_7_days)*100+'%'}">
                          <div class="percent">{{sales_today_before_6}}</div>
                      </div>
                      <div class="name">{{today_before_6}}</div>
                    </div>
                     
                    <div class="skill">
                        <div class="graph" :style="{'height':(sales_today_before_5/highest_sales_between_last_7_days)*100+'%'}">
                            <div class="percent">{{sales_today_before_5}}</div>
                        </div>
                        <div class="name">{{today_before_5}}</div>
                    </div>
                    
                    <div class="skill">
                        <div class="graph" :style="{'height':(sales_today_before_4/highest_sales_between_last_7_days)*100+'%'}">
                            <div class="percent">{{sales_today_before_4}}</div>
                        </div>
                        <div class="name">{{today_before_4}}</div>
                    </div>
                    
                    <div class="skill">
                        <div class="graph" :style="{'height':(sales_today_before_3/highest_sales_between_last_7_days)*100+'%'}">
                            <div class="percent">{{sales_today_before_3}}</div>
                        </div>
                        <div class="name">{{today_before_3}}</div>
                    </div>
                    
                    <div class="skill">
                        <div class="graph" :style="{'height':(sales_today_before_2/highest_sales_between_last_7_days)*100+'%'}">
                            <div class="percent">{{sales_today_before_2}}</div>
                        </div>
                        <div class="name">{{today_before_2}}</div>
                    </div>
                    
                    <div class="skill">
                        <div class="graph" :style="{'height':(sales_today_before_1/highest_sales_between_last_7_days)*100+'%'}">
                            <div class="percent">{{sales_today_before_1}}</div>
                        </div>
                        <div class="name">{{today_before_1}}</div>
                    </div>

                    <div class="skill">
                        <div class="graph" :style="{'height':(sales_today/highest_sales_between_last_7_days)*100+'%'}">
                            <div class="percent">{{sales_today}}</div>
                        </div>
                        <div class="name">{{today}}</div>
                    </div>
                  
                  </div>
                </v-flex>
              </div>
            </v-flex>

            <v-flex xs12 md6>
              <h4 class="py-3">Income Expense Comparison of {{current_month_name}}</h4>
              <v-flex style="margin:auto;">
                <div class="pie_chart mt-4" :style="{'margin':'auto','background':pieChart}">
                </div>
                <div class="mt-4 pie_chart_list d-flex" style="text-align:center;">
                    <span>Sales: {{currency}}{{sales_of_this_month}} </span>
                    <span>Expense: {{currency}}{{expenses_of_this_month}} </span>
                </div>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
    </div>
</template>

<script>
import db from '@/firebase/init'
import moment from 'moment'
export default {
  name:'Chart',
  components: {

  },
  data(){
      return{
        current_month_name:moment().format('MMMM'),
        currency:'',         
        today:moment().format("DD-MM"),
        today_before_1:moment().subtract(1, "days").format("DD-MM"),
        today_before_2:moment().subtract(2, "days").format("DD-MM"),
        today_before_3:moment().subtract(3, "days").format("DD-MM"),
        today_before_4:moment().subtract(4, "days").format("DD-MM"),
        today_before_5:moment().subtract(5, "days").format("DD-MM"),
        today_before_6:moment().subtract(6, "days").format("DD-MM"),       
        sales_today:null,
        sales_today_before_1:null,      
        sales_today_before_2:'',      
        sales_today_before_3:'',      
        sales_today_before_4:'',      
        sales_today_before_5:'',      
        sales_today_before_6:'',
        sales_of_this_month:'',
        expenses_of_this_month:'',
      }
  },
  computed:{
        highest_sales_between_last_7_days(){
          return Math.max(this.sales_today,this.sales_today_before_1,this.sales_today_before_2,this.sales_today_before_3,this.sales_today_before_4,this.sales_today_before_5,this.sales_today_before_6)
        },
        pieChart(){
          var totalSalesAndExpense = this.sales_of_this_month + this.expenses_of_this_month
          var salesPercentage = (this.sales_of_this_month/totalSalesAndExpense)*100
          var expensePercentage = (this.expenses_of_this_month/totalSalesAndExpense)*100
          return 'conic-gradient(#F16D07 '+salesPercentage+'%,#ffe0b2 '+salesPercentage+'%)';
        }       
  },
  created(){

        // Current Currency
        db.collection("settings").doc('config').onSnapshot(doc =>{
           this.currency = doc.data().currency
        })      

        // ---------Sales Bar Chart--------- //        

        // Total Sales Today
        db.collection('orders').where("order_status", "==", "Complete").where("created_date", "==", moment().format('DD-MM-YYYY'))
            .get()
            .then(snapshot => {
                var totalSales = 0;
                snapshot.forEach(doc => {
                  totalSales += Number(doc.data().checkout_total)
                })
                this.sales_today = totalSales;
        })

        // Total Sales Today before 1        
        var day_before_1 = moment().subtract(1, "days").format("DD-MM-YYYY");
        db.collection('orders').where("order_status", "==", "Complete").where("created_date", "==", day_before_1)
            .get()
            .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                totalSales += Number(doc.data().checkout_total)
              })
              this.sales_today_before_1 = totalSales;
        })

        // Total Sales Today before 2        
        var day_before_2 = moment().subtract(2, "days").format("DD-MM-YYYY");
        db.collection('orders').where("order_status", "==", "Complete").where("created_date", "==", day_before_2)
            .get()
            .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                totalSales += Number(doc.data().checkout_total)
              })
              this.sales_today_before_2 = totalSales;
        })

        // Total Sales Today before 3        
        var day_before_3 = moment().subtract(3, "days").format("DD-MM-YYYY");
        db.collection('orders').where("order_status", "==", "Complete").where("created_date", "==", day_before_3)
            .get()
            .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                totalSales += Number(doc.data().checkout_total)
              })
              this.sales_today_before_3 = totalSales;
        })

        // Total Sales Today before 4        
        var day_before_4 = moment().subtract(4, "days").format("DD-MM-YYYY");
        db.collection('orders').where("order_status", "==", "Complete").where("created_date", "==", day_before_4)
            .get()
            .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                totalSales += Number(doc.data().checkout_total)
              })
              this.sales_today_before_4 = totalSales;
        })

        // Total Sales Today before 5        
        var day_before_5 = moment().subtract(5, "days").format("DD-MM-YYYY");
        db.collection('orders').where("order_status", "==", "Complete").where("created_date", "==", day_before_5)
            .get()
            .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                totalSales += Number(doc.data().checkout_total)
              })
              this.sales_today_before_5 = totalSales;
        })

        // Total Sales Today before 6        
        var day_before_6 = moment().subtract(6, "days").format("DD-MM-YYYY");
        db.collection('orders').where("order_status", "==", "Complete").where("created_date", "==", day_before_6)
            .get()
            .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                totalSales += Number(doc.data().checkout_total)
              })
              this.sales_today_before_6 = totalSales;
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


  }  

}
</script>

<style scoped>
h1{
  width: 100%;
}
h4{
  width: 100%;
  color:rgb(0,0,0,0.87);
}
a{
  text-decoration: none;
}
p{
  margin-bottom: 0!important;
}
.updates-heading{
  margin-left: 25px;
}
.graf_background{
  width:100%!important; 
  display: table;
} 
.graf_background td:nth-of-type(1){
  text-align: right;
  padding-right:10px;
}
.graf_background td:nth-of-type(2){
  border-top:1px solid #ece8e8;
  border-left:1px solid #ece8e8;
  border-right:1px solid #ece8e8;
  width:100%!important;
}
.graf_background tr:last-child td:nth-of-type(2){
  border-bottom:1px solid #ece8e8;
}
.graf_background .progress_value{
  font-size: 11px;  
}
.graf_section{
  width:100%;
  height:100%;
  position:absolute;
  bottom:0;
}
.box{
  position:absolute;
  width:100%;
  height:100%;
  bottom:0;
  display:flex;
  padding:0 10px;
}
.box .skill{
  position:relative;
  flex:1;
  text-align: center;
  margin-left:20px;
}
.box .skill .graph{
  position:absolute;
  width:50%;
  bottom:0;
  left:50%;
  transform: translateX(-50%);
  background:#F16D07;
  box-shadow: 1px -1px #ffa726, 2px -2px #fb8c00, 3px -3px #fb8c00,   4px -4px #fb8c00, 5px -5px #fb8c00, 6px -6px #fb8c00, 7px -7px   #fb8c00, 8px -8px #fb8c00, 9px -9px #fb8c00, 10px -10px #fb8c00;
  animation: bargrowth 4000ms ease;
}
@-webkit-keyframes bargrowth{
  0%   {max-height: 0%;}
  100%  {max-height: 100%;}
}
@keyframes bargrowth{
  0%   {max-height: 0%;}
  100%  {max-height: 100%;}
}
.box .skill .name{
  position:absolute;
  bottom:-25px;
  left:50%;
  transform: translateX(-50%);
  font-size: 11px;
  width:50px;
}
.box .skill .graph:before{
  content:'';
  position:absolute;
  top:2px;
  left:2px;
  right:2px;
  bottom:0;
  background:#F16D07;
}
.box .skill .graph .percent{
  position:absolute;
  top: -25px;
  margin-left: 10px;
  left:50%;
  transform: translateX(-50%);
  text-align: center;
  color: rgb(0,0,0,0.87);
  font-weight: bold;
  font-size: 11px;
}
 .pie_chart{
    width:300px;
    height:300px;
    border-radius:50%; 
    border:1px solid #DADADA;   
    position:relative;
  }
  .pie_chart_list span{
    position:relative;
  }
  .pie_chart_list span:before{
    content:'';
    position:absolute;
    top:5px;
    margin-left:-15px;
    height:10px;
    width:10px;
    border-radius: 1px;
  }
  .pie_chart_list span:nth-child(1):before{
     background: #F16D07;
  }
  .pie_chart_list span:nth-child(2):before{
    background: #ffe0b2;
    border:1px solid #ffe0b2;
  }
  
</style>
