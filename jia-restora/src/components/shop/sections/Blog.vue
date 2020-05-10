<template>
    <v-layout>
        <!---------Blog----------------------->
        <v-container fluid>              
            <v-layout row wrap class="latest_blog_post"> 
                <v-flex xs12 sm4 class="latest_post_content">
                    <div class="hover_img_overflow_controll">
                        <v-img src="https://firebasestorage.googleapis.com/v0/b/puku-store.appspot.com/o/blog%2Fb1.jpg?alt=media&token=f89bc968-da51-4028-852c-2214a77149ef"> </v-img>
                        <span><v-icon small class="mr-2">date_range</v-icon>17th September 2018</span>
                    </div> 
                    <v-flex class="latest_blog_post_content text-xs-center py-3">
                        <h3>9 HEALTHY FOODS FOR A HEALTHY FRIDGE</h3>
                        <p class="px-4">Must-have items for quick, healthy snacks and good meals.How many times do you really open your refrigerator door each day, peering in and hoping to be inspired?
                        </p>
                        <div class="latest_blog_bottom_text mt-2 px-2">
                            <span class="left"><v-icon small class="mr-1">favorite_border</v-icon>0 likes</span>
                            <span class="right"><v-icon small class="mr-1">comment</v-icon>No comment</span>
                        </div>
                    </v-flex> 
                </v-flex>
                <v-flex xs12 sm4>
                    <div class="hover_img_overflow_controll">
                        <v-img src="https://firebasestorage.googleapis.com/v0/b/puku-store.appspot.com/o/blog%2Fb4.jpg?alt=media&token=10373180-fd77-4da6-be13-de5c29fa00fe"> </v-img>
                        <span><v-icon small class="mr-2">date_range</v-icon>17th September 2018</span>
                    </div>
                    <v-flex class="latest_blog_post_content text-xs-center py-3">
                        <h3>10 TIPS FOR HEALTHY GROCERY SHOPPING</h3>
                        <p class="px-4">Good nutrition starts with smart choices in the grocery store. Cooking up good and healthy meals is a challenge for you if you don't have the right ingredients in your kitchen.
                        </p>
                        <div class="latest_blog_bottom_text mt-2 px-2">
                            <span class="left"><v-icon small class="mr-1">favorite_border</v-icon>0 likes</span>
                            <span class="right"><v-icon small class="mr-1">comment</v-icon>No comment</span>
                        </div>
                    </v-flex>  
                </v-flex>
                <v-flex xs12 sm4 class="latest_post_content">
                    <div  class="hover_img_overflow_controll">
                        <v-img src="https://firebasestorage.googleapis.com/v0/b/puku-store.appspot.com/o/blog%2Fb2.jpg?alt=media&token=b3c7cc34-8218-46f9-a0eb-75c34aa6b901"> </v-img>
                        <span><v-icon small class="mr-2">date_range</v-icon>17th September 2018</span>
                    </div>
                    <v-flex class="latest_blog_post_content text-xs-center py-3">
                        <h3>WHAT'S NEW ON YOUR SUPERMARKET?</h3>
                        <p class="px-4">Health, convenience prime concerns for consumers Last year's hottest supermarket 
                            craze -- low-carb products -- can be found in this year's clearance aisle.
                        </p>
                        <div class="latest_blog_bottom_text mt-2 px-2">
                            <span class="left"><v-icon small class="mr-1">favorite_border</v-icon>0 likes</span>
                            <span class="right"><v-icon small class="mr-1">comment</v-icon>No comment</span>
                        </div>
                    </v-flex>  
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>
   
<script>   
  export default {
    
  }
</script>

<style>
    .hover_img_overflow_controll{
        position:relative;
        overflow: hidden;
        background: transparent;
    } 
    .hover_img_overflow_controll .v-image {
        z-index: 0;
        transform: scale(1);
        transition: all 1s;
    }
    .hover_img_overflow_controll .v-image:hover {
        z-index: 0;
        transform: scale(1.1);
    }
    .hover_img_overflow_controll span{
        position:absolute;
        bottom:15px;
        left:15px;
        font-size: 12px;
        z-index:1;
        color:#3E3939;
        background: rgb(255,255,255,.8);
        padding:5px;
    }
    .latest_blog_post_content{
        border:1px solid #e0e0e0;
    }
    .latest_blog_post_content{
        border-top:none;
    }
    .latest_blog_post_content h3{
        margin:0 0 8px!important;
        color:#3E3939;
    }
    .latest_blog_post_content p{
        margin:0 0 8px!important;
        font-size: 13px;
        color:#616161;
    }
    .latest_blog_bottom_text{
        padding:7px 0 12px;
        border-top:1px solid #e0e0e0;
        font-size: 13px;
        color:#3E3939;
    }
</style>
   