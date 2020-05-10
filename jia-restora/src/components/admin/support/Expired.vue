<template>
  <v-app>
    <div>
      <v-container>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <div class="expired">
                <div class="title mb-3">Your Session expired !!</div>
                <v-btn :to="{name: 'Welcome'}" large class="mx-0 main_color white--text">Start New Session</v-btn>
              </div>
            </v-flex>
          </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
  export default {
    name:'Expired',
    data(){
      return{
      }
    },
    methods:{
    }
  }
</script>

<style>
  .expired{
  margin-top: 200px;
  color: red;
  text-align: center;
  }
</style>
