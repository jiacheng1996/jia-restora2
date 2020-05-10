<template>
  <v-app>
    <Navbar/>
    <div>
      <v-content>
        <v-card flat>
          <v-container
            fluid
            style="min-height:0;"
            grid-list-lg
          >
            <v-layout row wrap>
              <v-flex xs12 sm3>
                <router-link :to="{ name: 'AddLogo'}">
                  <v-card class="white--text main_item main_color" style="text-align:center;height:500px">
                    <div class="text-xs-center" style="margin-top:200px">
                      <v-icon round class="item_icon">language</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline white--text">Logo</p>                     
                    </div>
                  </v-card>
                </router-link>
              </v-flex> 

              <v-flex xs12 sm3>
                <router-link :to="{ name:'Slider'}">
                  <v-card class="white--text main_item main_color" style="text-align:center;height:500px">
                    <div class="text-xs-center" style="margin-top:200px">
                        <v-icon round class="item_icon">perm_media</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline white--text">Sliders</p>                   
                    </div>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm3>
                <router-link :to="{ name: 'Reviews'}">
                  <v-card class="white--text  main_item main_color" style="text-align:center;height:500px">
                    <div class="text-xs-center" style="margin-top:200px">
                      <v-icon round class="item_icon">line_weight</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline white--text">Reviews</p>                     
                    </div>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm3>
                <router-link :to="{name:'Features'}">
                  <v-card class="white--text main_item main_color" style="text-align:center;height:500px">
                    <div class="text-xs-center" style="margin-top:200px">
                      <v-icon round class="item_icon">add_circle</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline white--text">Features</p>                     
                    </div>
                  </v-card>
                </router-link>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-content>
    </div>
  </v-app>
</template>

<script>
  import Navbar from '@/components/admin/navbar/Navbar'
  import firebase from "firebase";
  import moment from 'moment'
  export default {
    name:'Options',
    components: {
      Navbar
    },
    data(){
      return{
        
      }
    },
    created(){

    } 
  }
</script>

<style>
  .main_item{
		padding:10px 20px;
    -webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
		-ms-transition: all 0.5s;
		-o-transition: all 0.5s;
		transition: all 0.5s;
	}
	.main_item:hover{
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
	}
  .item_icon{
		margin:5px 0;
		background:#FFF;
		padding:5px;
		font-size:30px;
		border-radius:50%;
	}
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
    width:100%;
  }
  h4{
    width:100%;
  }
  .updates-heading{
    margin-left:25px;
  }
  .my-event {
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    border-radius:2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    font-size: 12px;
    padding:3px;
    cursor:pointer;
    margin-bottom:1px;
    left:4px;
    margin-right:8px;
    position:relative;
  }
  .with-time {
    position:absolute;
    right:4px;
    margin-right:0px;
  }
</style>
