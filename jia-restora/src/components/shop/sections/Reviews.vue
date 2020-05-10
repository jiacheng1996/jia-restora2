<template>
  <v-layout>
    <!---------testimonial----------------------->
    <v-container>
      <v-layout row wrap class="flex_box feature">
        <v-container fluid class="testimonial brown lighten-5">
          <v-container>
            <v-carousel :cycle="true">
              <v-carousel-item v-for="(review,index) in reviews" :key="index">
                <v-flex class="text-xs-center">
                  <v-img :src="review.image" class="testimonial_client_img"></v-img>
                  <h3 class="pb-3">{{review.name}}</h3>
                  <p><em>{{review.review}}</em></p>
                  <h4><strong>{{review.designation}}</strong></h4>
                </v-flex>
              </v-carousel-item>
            </v-carousel>
          </v-container>
        </v-container>
      </v-layout>
    </v-container>
  </v-layout>
</template>
   
<script>
import firebase from "firebase";
import moment from 'moment'
export default {
  name:'Reviews', 
  data(){
      return{       
        reviews:[]
      }
  },
 
  created(){
    var db = firebase.firestore();   

    // Show All Reviews
    let cref = db.collection('reviews').orderBy('timestamp', 'desc')

    cref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added'){
          let doc = change.doc
          this.reviews.push({
            id:doc.id,                      
            name:doc.data().name,            
            image:doc.data().image,            
            review:doc.data().review,            
            designation:doc.data().designation,
            timestamp:moment(doc.data().timestamp).format('ll'),  
          })
        }
      })
    })

  },  
}
</script>

<style scoped>
.testimonial .v-carousel__controls{
  background:transparent!important;
}
.testimonial .v-carousel {
  box-shadow:none;
  height:300px!important;
  padding:0px 80px;
}
.testimonial .v-window__container{
  display: grid;
  justify-items: center;
  align-items: center;
  text-align: center;
}
.testimonial h3{
  font-size:20px!important;
  font-weight: bold;
  font-family: 'Lobster Two', cursive;
}
.testimonial h3,p{
  color:#3E3939;
}
.testimonial .testimonial_client_img{
  width:100px;
  height:100px;
  border-radius: 50%;
  margin:10px auto;
}
.v-carousel__next .v-btn , .v-carousel__prev .v-btn,.v-item-group .v-btn{
  color:#3E3939!important;
}
.v-carousel__controls {
    background: rgba(0,0,0,.5);
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    bottom: -17px!important;
}
</style>
   