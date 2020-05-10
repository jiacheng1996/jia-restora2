<template>
  <v-app>
    <Navbar/>
    <v-content>
      <form @submit.prevent="addNewExpense">
        <v-card>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="format_size"
                    placeholder="Expense title"
                    required
                    v-model="expense_title"
                  ></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    type="number"
                    prepend-icon="attach_money"
                    placeholder="Expense Amount"
                    required
                    v-model="expense_amount"
                  ></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <v-select
                  prepend-icon="collections"
                  :items="expense_types"
                  v-model="expense_type"
                  label="Expense Type"
                  item-text="expense_type"
                  item-value="expense_type"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-btn type="submit" block class="main_color" dark>Add Expense</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </form>
    </v-content>
  </v-app>
</template>

<script>
  import Navbar from '@/components/admin/navbar/Navbar'
  import db from '@/firebase/init'
  import moment from 'moment'
  export default {
    name:'AddExpenses',
    components:{
      Navbar
    },
    data(){
      return{
        expense_title:null,
        expense_amount:null,
        expense_type:'',
        timestamp:null,
        expense_types:[
          { expense_type: 'Administration Fees' },        
          { expense_type: 'Purchase Cost' },
          { expense_type: 'Employee Expense' },
          { expense_type: 'Food & Entertainment' },
          { expense_type: 'Travel Cost' },        
          { expense_type: 'Marketing & Advertising' },        
          { expense_type: 'Cost of Goods Sold' },
        ],
      }
    },
    methods:{
      addNewExpense(){
        if(this.expense_title){

        let ref = db.collection('expenses');
          ref.add({
            expense_title:this.expense_title,
            expense_amount:this.expense_amount,
            expense_type:this.expense_type,
            expense_date:moment().format('DD-MM-YYYY'),
            created_month:moment().format('MM-YYYY'),
            created_year:moment().format('YYYY'),
            timestamp:Date.now()
          })
          this.expense_title=null
          this.expense_amount=null
          this.expense_type=null
        }
        this.$router.push({ name: 'Expenses'})
      },
    },
    created(){

    }
  }
</script>

<style>
.primary--text {
    color: #F16D07 !important;
    caret-color: #F16D07 !important;
}
</style>
