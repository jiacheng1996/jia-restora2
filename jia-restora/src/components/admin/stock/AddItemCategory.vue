<template>
  <v-app>
    <Navbar/>
    <v-content>
      <form @submit.prevent="addNewItemCategory">
        <v-card>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="shopping_cart"
                    placeholder="[[category_name]]"
                    required
                    v-model="category_name"
                  ></v-text-field>
                </v-layout>
              </v-flex>
          
              <v-flex xs12>
                <v-btn type="submit" class="main_color" block dark>Add Category</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </form>
    </v-content>
  </v-app>
</template>

<script>
  import Vue from 'vue'
  import Navbar from '@/components/admin/navbar/Navbar'
  import db, {functions} from '@/firebase/init'
  import moment from 'moment'
  var vm = new Vue({
    data:{
      result1: [],
      count: 0
    }
  })
  export default {
    name:'AddItemCategory',
    components:{
      Navbar
    },
    data(){
       //Added by CodingHeros
        var result = []
        var getDetails = functions.httpsCallable('getDetails')
        var paramMap = []
        paramMap.push({key: 'appKey', value: '02e6d1efd0421de9d49447106cbc90ec'})
        paramMap.push({key: 'shopIdenty', value: 810137674})
        paramMap.push({key: 'version', value: '1.0'})
        getDetails({
          paramMap: paramMap,
          token: "7ec322a21d93047605537d1d363d206c"
        }).then(response => {
          console.log('response: ', response)

          if(vm.count == 0)
          {
          result = JSON.parse(response.data).result
          vm.result1 = JSON.parse(response.data).result }
          this.category_name = vm.result1[vm.result1.length-1].name

          console.log(vm.result1)
        })

      return{
        dialog:null,
        category_name:null,
        timestamp:null,
        feedback:null,
        result1:[],
        
      }
    },
    methods:{
      addNewItemCategory(){    
        if(this.category_name){
        let ref = db.collection('item_categories');
          ref.add({
            category_name:this.category_name,           
            adding_date:moment().format('DD-MM-YYYY'),
            created_month:moment().format('MM-YYYY'),
            timestamp:Date.now()
          })
          this.category_name=null
          this.category_icon=null
        }
        vm.count=1
        vm.result1.splice(vm.result1.length-1)
        console.log(vm.result1)
        this.$router.push({ name: 'ItemCategories'})
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
