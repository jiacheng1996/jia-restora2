<template>
  <v-app>
    <Navbar/>
    <div>
      <v-content>
        <v-container grid-list-lg>
          <v-layout row wrap class="flex_box table">  
            <v-flex xs12 sm3 md3 lg3 xl2 class="flex_item">
              <v-card class="overlay_container flex_wrap pa-2">
                <v-img
                :src="require('@/assets/table.png')"
                aspect-ratio="2" cover>
              </v-img>
              <v-flex style="width:100%;" class="text-xs-center flex_bottom pb-2">
                <h3 class="text-xs-center grey--text text--darken-3">Table 1</h3>
                <v-flex class="d-flex">
                  <div>10:30 a.m</div>
                  <div>4 person</div>
                </v-flex>                                          
              </v-flex>       
              </v-card>                                           
            </v-flex> 

            <v-flex xs12 sm3 md3 lg3 xl2 class="flex_item">
              <v-card class="overlay_container flex_wrap pa-2">
                <v-img
                :src="require('@/assets/table.png')"
                aspect-ratio="2" cover>
              </v-img>
              <v-flex style="width:100%;" class="text-xs-center flex_bottom pb-2">
                <h3 class="text-xs-center grey--text text--darken-3">Table 2</h3>
                <v-flex class="d-flex">
                  <div>10:30 a.m</div>
                  <div>4 person</div>
                </v-flex>                                          
              </v-flex>       
              </v-card>                                           
            </v-flex>

            <v-flex xs12 sm3 md3 lg3 xl2 class="flex_item">
              <v-card class="overlay_container flex_wrap pa-2">
                <v-img
                :src="require('@/assets/table.png')"
                aspect-ratio="2" cover>
              </v-img>
              <v-flex style="width:100%;" class="text-xs-center flex_bottom pb-2">
                <h3 class="text-xs-center grey--text text--darken-3">Table 3</h3>
                <v-flex class="d-flex">
                  <div>10:30 a.m</div>
                  <div>4 person</div>
                </v-flex>                                          
              </v-flex>       
              </v-card>                                           
            </v-flex>

            <v-flex xs12 sm3 md3 lg3 xl2 class="flex_item">
              <v-card class="overlay_container flex_wrap pa-2">
                <v-img
                :src="require('@/assets/table.png')"
                aspect-ratio="2" cover>
              </v-img>
              <v-flex style="width:100%;" class="text-xs-center flex_bottom pb-2">
                <h3 class="text-xs-center grey--text text--darken-3">Table 4</h3>
                <v-flex class="d-flex">
                  
                  <div>Empty</div>
                </v-flex>                                          
              </v-flex>       
              </v-card>                                           
            </v-flex>

            <v-flex xs12 sm3 md3 lg3 xl2 class="flex_item">
              <v-card class="overlay_container flex_wrap pa-2">
                <v-img
                :src="require('@/assets/table.png')"
                aspect-ratio="2" cover>
              </v-img>
              <v-flex style="width:100%;" class="text-xs-center flex_bottom pb-2">
                <h3 class="text-xs-center grey--text text--darken-3">Table 5</h3>
                <v-flex class="d-flex">
                  <div>10:30 a.m</div>
                  <div>4 person</div>
                </v-flex>                                          
              </v-flex>       
              </v-card>                                           
            </v-flex>

            

            <!-- Add Table  -->
            <v-btn :to="{name: 'AddExpenses'}"
              fab
              bottom
              right
              class="main_color"
              dark
              fixed
            >
              <v-icon>add</v-icon>
            </v-btn>       
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
    name:'Tables',
    components: {
      Navbar
    },
    data(){
      return{
      
      }
    },
    methods:{
    
    },
    created(){
  
    
    },
  }
</script>

<style scoped>
 .flex_box{
    display:flex;
  }
  .flex_item{
    display:flex;
  }
  .flex_wrap{
    text-align:center;
    flex:1;
    display:flex;
    flex-wrap:wrap;
  }
  .flex_wrap>*{
    flex:1 1 100%;
  }
  .table .d-flex{
    background: #F16D07;
    color:#FAFAFA;
  }
  .table h3{
    font-family: 'Lobster Two', cursive;
    font-size: 20px;
  }
</style>
