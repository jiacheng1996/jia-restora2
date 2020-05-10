<template>
  <v-app>
    <Navbar/>
    <v-content>
      <form @submit.prevent="addDeliveryPerson">
        <v-card flat>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="face"
                    placeholder="Name"
                    required
                    v-model="name"
                  ></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    type="number"
                    prepend-icon="phone"
                    placeholder="Phone"                    
                    v-model="phone"
                  ></v-text-field>
                </v-layout>
              </v-flex>    
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field                    
                    prepend-icon="home"
                    placeholder="Addresss"                    
                    v-model="address"
                  ></v-text-field>
                </v-layout>
              </v-flex>             
              <v-flex xs12>
                <v-btn type="submit" block class="main_color" dark>Add Delivery Person</v-btn>
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
  import firebase from "firebase";
  import moment from 'moment'
  export default {
    name:'AddDeliveryPerson',
    components:{
      Navbar
    },
    data(){
      return{
        name:null,
        phone:null,
        address:null,
        timestamp:null,     
      }
    },
    methods:{
        addDeliveryPerson(){
            if(this.name){
            var db = firebase.firestore();       
            let ref = db.collection('delivery_person');
              ref.add({
                name:this.name,
                phone:this.phone,
                address:this.address,             
                timestamp:Date.now()
              })
              this.name=null
              this.phone=null
              this.address=null
            }
            this.$router.push({ name: 'DeliveryPersons'})
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
