<template>
  <div>
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator" class="nav_drop_menu">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child,i) in item.children"
              :key="i"
             
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <router-link :to="{name:child.link,params: {} }" style="color:rgba(0,0,0,.87)">
                    {{ child.text }}
                  </router-link>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text">
            <v-list-tile-action>
              <router-link :to="{ name:item.link,params: {} }" >
              <v-icon>
                {{ item.icon }}
              </v-icon>
              </router-link>
            </v-list-tile-action>
            <router-link :to="{ name: item.link,params:{} }" style="color:rgba(0,0,0,.87)">
            <v-list-tile-content class="nav_menu">
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
            </router-link>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      class="main_color"
      dark
      app
      fixed
     >
      <v-toolbar-title  class="ml-0">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Restora</span>    
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar>

    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      dark
      app
      fixed
      class="admin_toolbar main_color"
     >
      <v-toolbar-title class="ml-0">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Restora</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="userLoggedin" @click="logout()">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
  name:'Navbar',
  data(){
      return{
        userLoggedin:false,
        drawer: null,        
        items: [
          { icon: 'dashboard', text: 'Dashboard', link:'Dashboard' },
          { icon: 'people', text: 'Customers', link:'Customers' },
          {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'add_shopping_cart',
          text: 'Sales',
          model: false,
          children: [
            { text: 'Sales', link:'Sales'},
            { text: 'Sales Report', link:'SalesReport' },
          ]
          },
          {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'attach_money',
          text: 'Expenses',
          model: false,
          children: [
            { text: 'Expenses', link:'Expenses'},
            { text: 'Expense Report', link:'ExpenseReport' },
          ]
          },
          {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'card_giftcard',
          text: 'Products',
          model: false,
          children: [
            { text: 'Items', link:'Items'},
            { text: 'Categories', link:'ItemCategories' },           
          ]
          },
          { icon: 'laptop_mac', text: 'POS', link:'Pos' },
          { icon: 'library_books', text: 'Orders', link:'Orders' },
          {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'assignment',
          text: 'Deliveries',
          model: false,
          children: [
            { text: 'Recent Deliveries', link:'RecentDeliveries'},
            { text: 'Delivery List', link:'Deliveries' },           
            { text: 'Delivery Person', link:'DeliveryPersons' },           
          ]
          },
          {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'check_circle',
          text: 'Options',
          model: false,
          children: [
            { text: 'Logo', link:'AddLogo'},
            { text: 'Slider', link:'Slider'},
            { text: 'Features', link:'Features' },
            { text: 'Reviews', link:'Reviews' },
          ]
          },
          { icon: 'trending_up', text: 'Report', link:'Report' },
          { icon: 'chat', text: 'Live Chat', link:'AdminSupportList' },
          { icon: 'settings', text: 'Settings' , link:'Settings'}, 
        ],
      }
  },
  methods:{
    logout(){
      firebase.auth().signOut()
      .then((user)=>{
        this.$router.replace('/admin')
      });
    },
    clickMethod(){
      console.log("Clicked");        
    }
  },
 
  created(){
    var db = firebase.firestore();      

    var user = firebase.auth().currentUser;
    if (user) {
      this.userLoggedin = true;
    } else {
      this.userLoggedin = false;
    }

    
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        user.getIdTokenResult().then(idTokenResult => {
         
          if(idTokenResult.claims.admin == true){
              //return true;
              console.log("This is admin");              
          }else{
              console.log("This is not admin");
              firebase.auth().signOut()
              .then((user)=>{
                this.$router.replace('/admin')
                this.feedback = "Wrong username or password";
              });
           
          }
          
          console.log(idTokenResult.claims);            
        })
      }
    })
  
  }
}
</script>

<style>
  a{
    text-decoration: none;
    color: black;
  }
  .theme--light .list .list__tile--link:hover {
    background: none !important;
  }
  
</style>
