<template>
  <v-layout>
    <!---------Slider----------------------->
    <v-container fluid class="slider_container">
      <v-layout row wrap class="flex_box feature">
        <v-carousel :cycle="true" class="slider">
          <div v-for="(slider,index) in sliders" :key="index">
            <v-carousel-item :src="slider.image">
              <v-container style="height:100%;">
                <v-layout column align-left justify-center style="height:100%;">                 
                  <h1 class="mb-3">{{slider.title}} </h1>
                  <p>{{slider.subtitle}}</p>                 
                  <v-btn to="/menu">Check Our Foods</v-btn>                                
                </v-layout>
              </v-container>
            </v-carousel-item>         
          </div>
        </v-carousel>
      </v-layout>
    </v-container>
  </v-layout>
</template>
   
<script>
  import firebase from "firebase";   
  import moment from 'moment'
  export default {
    name:'Slider',
    data(){
      return{       
        sliders:[]
      }
    },
    methods:{
      
    },
    created(){
      var db = firebase.firestore();   
      // Show All Slider
      let cref = db.collection('options-slider').orderBy('timestamp', 'desc')
      cref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.sliders.push({
              id:doc.id,
              title:doc.data().title,           
              subtitle:doc.data().subtitle,           
              image:doc.data().image,            
              timestamp:moment(doc.data().timestamp).format('ll'),  
            })
          }
        })
      })  
    }
  }
</script>

<style scoped>
/*new*/
.slider_container{
  width:100%;
  padding-left:0;
  padding-right: 0;
  padding-top: 0;
}
.slider h3 {
  font-size: 20px !important;
  color: #F16D07;
  margin-bottom: 10px;
}
.slider h1 {
  font-size: 60px;
  color: #FAFAFA;
  font-weight: 700;
  font-family: 'Lobster Two', cursive;
}
.slider p{
  width:50%;
  font-size: 17px;
  color: #FAFAFA;
  line-height: 2rem;
  margin-bottom: 20px;
}
.slider .v-btn {
  background: #F16D07!important;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 2px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  height: 36px;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  font-size: 14px;
  font-weight: 500;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin:0!important;
  padding:25px 0;
  width: 150px;
}
@media (max-width:350px){
  .slider h1[data-v-a2a72a0e] {
    font-size: 36px!important;
  }
  .slider p{
  width:80%;
  font-size: 16px!important;
  color: #FAFAFA;
  line-height: 1.8rem!important;
  margin-bottom: 0px;
}
.slider .v-btn[data-v-a2a72a0e]{
  padding:16px 0!important;
  margin-top:10px!important;
}
}
@media (max-width:452px){
  .slider p{
  width:80%;
  font-size: 17px;
  color: #FAFAFA;
  line-height: 2rem;
  margin-bottom: 0px;
}
}
.layer{
  height:500px;
}
/*end of new*/
  .v-carousel__item .v-image__image{
    background-size:cover;
  }
  .slider .v-carousel__next, .v-carousel__prev{
    position: absolute;
    top: 50%;
  }
  .slider .v-carousel__prev{
    opacity:0;
  }
  .slider .v-carousel__next{
    opacity:0;
  }
  /*
  @media screen and (max-width: 960px){
    .v-carousel{
      height:300px!important;
    }
  }
  */
</style>
   