<template>
  <div class="left_navbar">
      <v-navigation-drawer
        :clipped="$vuetify.breakpoint.lgAndUp"
        v-model="drawer"
        fixed
        app
      >
      <div class="mob_search_bar hidden-md-and-up pt-2">
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="mx-3 mt-1"
          flat
          hide-no-data
          hide-details
          label="Search your item!"
          solo-inverted
          @change="selectChanged()"
        ></v-autocomplete>
        <v-divider class="mt-2"></v-divider>
      </div>
      <div class="hidden-md-and-up mobile_menu">
        <router-link to="/">
          <v-list-tile>
            <v-list-tile-action >
                <v-icon>house</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Home
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/featured-products">
          <v-list-tile>
            <v-list-tile-action >
                <v-icon>redeem</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Featured
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/menu">
          <v-list-tile>
            <v-list-tile-action >
                <v-icon>store</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Menu
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>  
        <router-link to="/sign-in" v-if="userLoggedin == false">
          <v-list-tile>
            <v-list-tile-action >
                <v-icon>how_to_reg</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Sign In
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/create-account" v-if="userLoggedin == false">
          <v-list-tile>
            <v-list-tile-action >
                <v-icon>person_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Create Account
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/account" v-if="userLoggedin">
          <v-list-tile>
            <v-list-tile-action >
                <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                My Account
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link> 
        <v-list-tile v-if="userLoggedin" @click="logout()">
            <v-list-tile-action >
                <v-icon>power_settings_new</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Log Out
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile> 
        <v-divider></v-divider>
      </div>
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
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <router-link :to="{ name: child.link, params: {} }" style="color:rgba(0,0,0,.87)">
                    {{ child.text }}
                  </router-link>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <!-- Left Navbar -->
          <v-list-tile v-else :key="item.text">
            <v-list-tile-action>
              <router-link :to="{ name: item.link, params: {} }" >
              <v-icon style="font-size:13px !important;">
                fiber_manual_record
              </v-icon>
              </router-link>
            </v-list-tile-action>
            <router-link :to="{ name: item.link, params: {category:item.category} }" style="color:rgba(0,0,0,.87)">
            <v-list-tile-content>
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
      dark
      app
      fixed
      class="shop_toolbar"
     >
      <v-toolbar-title  class="ml-0">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>                
      </v-toolbar-title>
      <img :src="logo" style="width:150px;">
      <div class="large_device_search_bar hidden-sm-and-down">
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="ml-3"
          flat
          hide-no-data
          hide-details
          label="What items you looking for?"
          solo-inverted
          @change="selectChanged()"
        ></v-autocomplete>
      </div>
      <v-spacer></v-spacer>
        <div class="menu_item hidden-sm-and-down pa-0">
          <router-link to="/"><v-btn flat>HOME</v-btn></router-link>          
          <router-link to="/about"><v-btn flat>ABOUT</v-btn></router-link>          
          <router-link to="/menu"><v-btn flat>Menu</v-btn></router-link> 
          <router-link to="/cart"><v-btn flat>CART</v-btn></router-link>        
          <router-link to="/sign-in"><v-btn v-if="userLoggedin == false" flat>SIGNIN</v-btn></router-link>
          <router-link to="/create-account"><v-btn v-if="userLoggedin == false" flat>CREATE ACCOUNT</v-btn></router-link>
          <router-link to="/account"><v-btn v-if="userLoggedin" flat>MY ACCOUNT</v-btn></router-link>
          <v-btn v-if="userLoggedin" @click="logout()" flat>LOGOUT</v-btn>
        </div>
    </v-toolbar>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name:'Navbar',
    data(){
     return{
        userLoggedin:false,
        drawer: null,
        loading: false,        
        search: null,
        select: null,
        logo:null,
        items:[] 
    }
  },
  methods:{
    selectChanged(){          
        this.$router.push({ name:'CatProduct', params: {category:this.select} })        
    },
    logout(){
        firebase.auth().signOut()
        .then((user)=>{
        this.$router.replace('/sign-in')
        });        
    },
    clickMethod(){
        console.log("Clicked");        
    },
    pageLoad() {
        location.reload()
    }
  },
  watch: {
    '$route' (to, from) {
      this.$router.push({ name:'CategoryProduct'})        
    }
  },    
  created(){
        var db = firebase.firestore();      
        // Check user auth status
        var user = firebase.auth().currentUser;
        if (user) {
            this.userLoggedin = true;
        } else {
            this.userLoggedin = false;
        }
        // Logo   
        db.collection("settings").doc('config').onSnapshot(doc =>{
          this.logo = doc.data().logo            
        })
        // Show All Categories
        let ref = db.collection("item_categories");

        ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
          let doc = change.doc;
          this.items.push({            
            icon: doc.data().category_icon,            
            text: doc.data().category_name,
            link:'CatProduct',
            category:doc.data().category_name
          });
        }
      });
    });
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  .theme--light .list .list__tile--link:hover {
    background: none !important;
  }
  .v-toolbar .v-input {
    border-radius: 2px;
    width: 300px;
  }
  .v-toolbar .v-input {
    border-radius: 2px;
    width: 300px;
  }
  .v-list__tile__action{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    min-width: 20px!important;
  }
  .v-toolbar__title{
      width:50px!important;
    }
    .v-toolbar__content, .v-toolbar__extension {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0px!important;
  }
  .v-toolbar__content, .v-toolbar__extension {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0!important;
  }
  .v-toolbar--fixed{
    padding-right: 0px!important;
  }
  .v-btn{
    margin:0!important;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    min-width: 50px;
  } 
  .v-icon {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-font-feature-settings: "liga";
    font-feature-settings: "liga";
    font-size: 22px!important;
  }
  .v-list__tile__title{
    color: rgba(0, 0, 0, 0.87)!important;
    font-size: 13px!important;
    font-weight: 500!important;
  }
  .left_navbar{
    z-index: 1111;
  }
  .left_navbar .v-list__tile {
    padding: 0 24px!important;
}
  .v-list__tile {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    height: 40px!important;
  }
  .flex_box .v-card {
    padding: 30px!important;
    line-height: 22px!important;
  }
  .flex_box{
    display:flex;
  }
  .flex_item{
    flex:1;
    display:flex;
    flex-wrap:wrap;
    flex-grow: 1;
  }
  .flex_box .v-card{
    padding:20px; 
    width:100%;
  }
  .flex_item .headline{
    width:100%;
    margin-bottom:15px;
  }
  .flex_box .v-card__text {
    padding: 0px;
  }
  .flex_box .v-card__title {
    padding:10px 0 0;
  }  
  .products_detail .v-card__actions {
    padding: 0 20px;
    margin:20px 0;
  }
  /*
  .products_detail .v-text-field>.v-input__control>.v-input__slot {
    width: 40%!important;
    margin: 7px 0 0!important;
  }
    */
  .products_detail p{
    background:#efeded;
    padding:20px;
  }
  .products_detail .v-text-field > .v-input__control > .v-input__slot {
    width: 70% !important;
    margin: 5px 0 0 8px!important;
  }
  .products_detail .v-text-field.v-text-field--solo .v-input__control {
    max-height: 20px!important;
    padding: 0;
  }
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: 38px!important;
    padding: 0;
    margin-bottom: 10px;    
  }
  .mobile_menu .v-icon{
    margin-right:5px;
  }
  .mobile_menu .v-btn[data-v-3b43b406] {
    margin: 0 !important;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    min-width: 100%!important;
  }
  .mobile_menu .v-btn__content {
    border-radius: inherit;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: left;
    margin: 0 auto;
    position: relative;
    -webkit-transition: .3s cubic-bezier(.25,.8,.5,1);
    transition: .3s cubic-bezier(.25,.8,.5,1);
    white-space: nowrap;
    width: inherit;
  }
  @media (max-width:356px){
    .mob_search_bar .v-text-field.v-text-field--solo .v-input__control {
      min-height: 40px;
      padding: 0;
      display:block!important;
    }
  }
  @media (max-width:356px){
    .v-toolbar__title .v-btn[data-v-3b43b406] {
      margin: 0 !important;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      min-width: 35px!important;
    }
  }
  @media (max-width:599px){
    .v-text-field.v-text-field--solo .v-input__control {
      min-height: 38px!important;
      padding: 0;
      margin-bottom: 5px;
    }
  }

  @media (max-width:420px){
    .products_detail h4,.products_detail .my-3{
      font-size: 20px!important;
      margin-top:0!important;
      padding:0 10px!important;
    } 
    .flex_box .v-card{
      padding:0!important;  
    }
    .products_detail .v-card__text  p{
      font-size:14px!important;
      padding:10px!important;
    }     
  }
  @media (max-width:959px){
    .v-toolbar__content{
      height:64px!important;
    }
  }
  @media screen and (max-width: 1084px) and (min-width: 960px){
    .v-btn {
      padding: 0 10px!important;
    }
  }

@media (max-width:450px){
    .v-toolbar__title[data-v-3b43b406] {
        width: 50px !important;
    }
}
.shop_toolbar{
  z-index: 1111;
}
.shop_toolbar .v-btn--icon {
    border-radius: 10%;
    background: #FAFAFA;
    color:#F16D07;
}
</style>
