<template>
	<v-layout>
			<v-spacer>
				<div>
						<v-tabs>
							<template v-for="item in items">
								<v-layout v-if="item.heading" :key="item.heading">
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
									<router-link :to="{ name: item.link, params: {category:item.category} }">
										<v-icon>{{ item.icon }}</v-icon>
									</router-link>
									<v-tab to="/featuredproducts">
										{{ item.text }}
									</v-tab>
									<router-view></router-view>
								</v-list-tile>
								
							</template>
						</v-tabs>
				</div>
			</v-spacer>
	</v-layout>
</template>
	 
<script> 
 import db from "@/firebase/init";
 import firebase from "firebase";
 import FeaturedProducts from  '@/components/shop/products/FeaturedProducts'
  export default {
    name: "Navbar",
    data() {

      return {
		tab: null,
        userLoggedin: false,     
		items: [],
		routes:[{
			path: '/featuredproducts',
			component: FeaturedProducts
		}]
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
    }
	}
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
