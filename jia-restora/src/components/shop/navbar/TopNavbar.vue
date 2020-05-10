<template>
  <v-layout>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <img :src="logo" style="height:70px;padding:10px;">        
      </v-toolbar-title>
      <v-autocomplete
        v-model="select"
        :loading="loading"   
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-3"
        flat
        hide-no-data
        hide-details
        label="What items you looking for?"
        solo-inverted
        @change="selectChanged()"
      ></v-autocomplete>
      <v-spacer></v-spacer>
        <div class="hidden-sm-and-down">
          <router-link to="/"><v-btn flat>HOME</v-btn></router-link>
          <router-link to="/products"><v-btn flat>COLLECTION</v-btn></router-link>
          <router-link to="/featured-products"><v-btn flat>FEATURED</v-btn></router-link>
          <router-link to="/cart"><v-btn flat>CART</v-btn></router-link>         
          <router-link to="/sign-in"><v-btn v-if="userLoggedin == false" flat>SIGNIN</v-btn></router-link>
          <router-link to="/create-account"><v-btn v-if="userLoggedin == false" flat>CREATE ACCOUNT</v-btn></router-link>
          <router-link to="/account"><v-btn v-if="userLoggedin" flat>MY ACCOUNT</v-btn></router-link>
          <v-btn v-if="userLoggedin" @click="logout()" flat>LOGOUT</v-btn>
        </div>
    </v-toolbar>
  </v-layout>
</template>
   
<script> 
  import firebase from "firebase";   
  export default {
    data(){
      return{
        drawer_left: null,
        loading: false,        
        search: null,
        select: null,
        logo:null,
        items:[]         
      }
    },   
    methods:{
      testClick(){
        if(this.$store.getters.leftNavbar == 1){
          this.$store.commit('testClick', 0)
        }
        else{
          this.$store.commit('testClick', 1)
        }
              
      },
      selectChanged(){          
        this.$router.push({ name:'CatProduct', params: {category:this.select} })          
      },
      logout(){
        firebase.auth().signOut()
        .then((user)=>{
          this.$router.replace('/sign-in')
        });        
      },
    },
    watch: {
      '$route' (to, from) {
        this.$router.push({ name:'CategoryProduct'})
        console.log("Route change");      
      }
    },    
    created() {
      var db = firebase.firestore();
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
              text: doc.data().category_name            

            });
          }
        });
      });

      // Check user auth status
      var user = firebase.auth().currentUser;
      if (user) {
          this.userLoggedin = true;           
      } else {
          this.userLoggedin = false;         
      }
    },  
    props: {
    source: String
    }
  }
</script>
   
<style scoped> 
  .v-toolbar__title{
    width:280px!important;
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
  .v-toolbar--fixed{
		padding-right: 0px!important;
	}
  .v-btn{
    margin:0!important;
  } 
  .flex_box .v-card {
    padding: 30px!important;
    line-height: 22px;
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
  .products_detail .v-text-field>.v-input__control>.v-input__slot {
    width: 40%!important;
    margin: 7px 0 0!important;
  }  
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
</style>
