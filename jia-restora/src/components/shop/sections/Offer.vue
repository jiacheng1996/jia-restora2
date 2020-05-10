<template>
  <v-layout>
    <v-carousel :show-arrows="false" class="offer_vue">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      >
        <v-container fluid class="offer_container" style="height:100%;">
          <v-layout row wrap justify-center align-center class="layer" style="height:100%;">
            <v-container>
              <v-flex xs12 sm8 class="offer">
                <h3>Lunch Time offer</h3>
                <h2>We offer a bit less <span>at Midday</span></h2>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.
                </p>
                <a href="#" class="white--text v-btn">
                  <div class="v-btn__content">Order Now</div>
                </a>
              </v-flex>
              <v-flex xs12 sm4 class="offer_price">
                <span class="discount">30%<sup>Off</sup></span>
              </v-flex>
            </v-container>
          </v-layout>
        </v-container>
      </v-carousel-item>
    </v-carousel>
  </v-layout>
</template>

<script>
  import firebase from "firebase";
  import moment from 'moment'
  export default {
    name:'Offer',  
    data(){
      return{
       items: [
          {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfnMyz0JqUzrbiRh-4RuoKb94gt6Yny9TaL4MB6ON8etAVSYMc',
          },
        ],
      }
    }, 
    created(){
     
     
    },  
  }
</script>

<style scoped>
.offer_container{
  padding:0;
}
.offer_container .container{
  display: flex;
}
.layer{
  background-color: rgb(0,0,0,.8);
}
.offer_price sup {
  vertical-align: super;
  font-size: 18px;
}
.offer{
  padding:10px 0;
}
.offer span{
  color:#F16D07;
}
.offer h3{
  font-weight: 600;
  font-size: 15px;
  color:#FAFAFA;
}
.offer h2{
  font-weight: 700;
  font-size: 35px;
  color:#FAFAFA;
  margin: 10px 0px;
  font-family: 'Lobster Two', cursive;
}
.offer p{
  font-size: 15px;
  color:#FAFAFA;
  margin-bottom: 20px;
  line-height: 1.5rem;
}

.offer .v-btn  {
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
.offer_price{
  text-align: center;
  position: relative;
  display: grid;
  justify-items: center;
  align-items: center;
  text-align: center;
}
.offer_price .discount{
  position: relative;
  font-size: 50px;
  color:#FAFAFA;
  font-weight: 600;
  z-index: 111;
}
.offer_price .discount:before{
  position:absolute;
  content: '';
  background: #F16D07;
  padding:100px;
  position: absolute;
  z-index: -1;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
}
.offer_price .discount:after{
  position:absolute;
  content: '';
  padding:104px;
  position: absolute;
  z-index: -1;
  left: -50%;
  top: -100%;
  margin: 6px 0px 0px 14px;
  border-radius: 50%;
  border:2px dashed #F16D07;
  -webkit-animation: rotation 100s infinite linear;
}
@-webkit-keyframes rotation {
  from {
      -webkit-transform: rotate(0deg);
  }
  to {
      -webkit-transform: rotate(359deg);
  }
}

@media screen and (max-width: 786px){
  .offer_container .container{
    display: grid;
  }
  .v-carousel__item{
    height:800px!important;
  }
}

</style>
   