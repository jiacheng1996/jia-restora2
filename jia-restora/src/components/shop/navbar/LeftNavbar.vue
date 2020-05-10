<template>
  <div>
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
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
            append-icon
            @click="pageLoad"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <router-link
                    :to="{ name: child.link, params: {} }"
                    style="color:rgba(0,0,0,.87)"
                  >{{ child.text }}</router-link>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text">
            <v-list-tile-action>
              <router-link :to="{ name: item.link, params: {category:item.category} }">
                <v-icon>{{ item.icon }}</v-icon>
              </router-link>
            </v-list-tile-action>
            <router-link :to="{ name: item.link, params: {category:item.category} }" style="color:rgba(0,0,0,.87)">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </router-link>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer1 = !drawer1"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Puku Store</span>
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
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Puku Store</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="userLoggedin" @click="logout()">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
  import db, {functions} from "@/firebase/init";
  import firebase from "firebase";
  export default {
    name: "Navbar",
    data() {
      return {
        userLoggedin: false,     
        items: []
      };
    },
    methods: {
      pageLoad() {
        location.reload()
      }
    },
    watch: {
      '$route' (to, from) {
        this.$router.push({ name:'CategoryProduct'})    
      }
    }, 
    created() {
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

      //Added by CodingHeros
      var result = []
      var getDetails = functions.httpsCallable('getDetails')
      var paramMap = []
      paramMap.push({key: 'appKey', value: 'b23302d4a08f53d1bd5bcf333664997d'})
      paramMap.push({key: 'shopIdenty', value: 810137674})
      paramMap.push({key: 'version', value: '1.0'})
      getDetails({
        paramMap: paramMap,
        token: "8a702142d013e6c93d64c604a3fb332e"
      }).then(response => {
        console.log('response: ', response)
        console.log('hi')
        result = JSON.parse(response.data).result
        result.forEach(item => {
          this.item.push({
            text: item.name
            //TODO: add other things here
          })
        })
      })

    }
  };
</script>

<style scoped>
  a {
    text-decoration: none;
    color: black;
  }
  .theme--light .list .list__tile--link:hover {
    background: none !important;
  }
</style>
