<template>
    <v-layout>
        <v-container class="pos_search_bar">
            <v-autocomplete
                v-model="select"
                :loading="loading"
                :items="items"
                :search-input.sync="search"
                cache-items
                flat
                hide-no-data
                hide-details
                label="What items you looking for?"
                solo-inverted
                @change="selectChanged()"
            ></v-autocomplete>
        </v-container>
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
            this.$router.push({ name:'PosCatProduct', params: {category:this.select} })          
        },     
    },
    watch: {
        '$route' (to, from) {
            this.$router.push({ name:'PosCategoryProduct'})
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
.pos_search_bar{
    padding: 9px 24px;
}
</style>