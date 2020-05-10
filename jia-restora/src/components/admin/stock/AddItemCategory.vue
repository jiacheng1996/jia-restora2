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
                    placeholder="Category Name"
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
  import Navbar from '@/components/admin/navbar/Navbar'
  import db from '@/firebase/init'
  import moment from 'moment'
  export default {
    name:'AddItemCategory',
    components:{
      Navbar
    },
    data(){
      return{
        dialog:null,
        category_name:null,
        timestamp:null,
        feedback:null,
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
