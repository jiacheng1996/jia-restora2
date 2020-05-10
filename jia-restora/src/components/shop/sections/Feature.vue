<template>
  <v-layout>
    <v-container grid-list-lg>
      <v-layout row wrap class="feature">
        <v-flex sm12 md4 class="feature_box"  v-for="(feature,index) in features" :key="index">
          <v-card>
            <div class="text-xs-center feature_icn_border">
              <v-icon x-large class="discount">{{feature.icon}}</v-icon>
            </div>
            <v-card-title primary-title>
              <div class="feature_headline text-xs-center">{{feature.title}}</div>
            </v-card-title>
            <v-card-text>
              <p>{{feature.text}}</p> 
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
  import firebase from "firebase";
  import moment from 'moment'
  export default {
    name:'Feature',  
    data(){
      return{
        features:[]
      }
    }, 
    created(){
      var db = firebase.firestore();   

      // Show All Features
      let cref = db.collection('features').orderBy('timestamp', 'desc')

      cref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.features.push({
              id:doc.id,                      
              title:doc.data().title,            
              icon:doc.data().icon,            
              text:doc.data().text,
              timestamp:moment(doc.data().timestamp).format('ll'),  
            })
          }
        })
      })
    },  
  }
</script>

<style scoped>
.v-card {  
  line-height: 22px;
} 

 .v-card__text {
  padding: 0px;
}
 .v-card__title {
  padding:10px 0 0;
}
.feature  .v-card{
  padding:40px!important;
  width:100%!important;
  background: #F16D07;
  height:100%;
}

.feature .feature_box:nth-of-type(2) .v-card{
  background: #EB2C1E;
}
.feature .feature_box:nth-of-type(3) .v-card{
    background: #7C1109;
}
.feature .feature_box .discount{
  position: relative;
  font-size: 50px;
  color:#F16D07;
  font-weight: 600;
  z-index: 111;
}
.feature .feature_box:nth-of-type(2) .discount{
  color:#EB2C1E;
}
.feature .feature_box:nth-of-type(3) .discount{
  color:#7C1109;
}
.feature .feature_headline{
  font-size:20px!important;
  font-weight: bold;
  width:100%;
  font-size: 20px !important;
  margin: 0px 0 15px !important;
  color:#FAFAFA !important;
  font-family: 'Lobster Two', cursive;
}
.feature p{
  margin-bottom: 0;
  color:#FAFAFA !important;
  line-height: 1.5rem;
  text-align: center;
}


.feature_icn_border{
  text-align: center;
  position: relative;
  display: grid;
  justify-items: center;
  align-items: center;
  text-align: center;
  margin: 20px 0 35px;
}

.feature .feature_box .v-card:hover .feature_icn_border .discount:before{
  background: #FAFAFA;
}
.feature .feature_box .v-card:hover .feature_icn_border .discount:after{
  border:2px dashed #FAFAFA;
}
.feature_icn_border .discount:before{
  position:absolute;
  content: '';
  background: #f8c9a5;
  padding:45px;
  position: absolute;
  z-index: -1;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
  transition: all 0.5s;
}
.feature_icn_border .discount:after{
  position: absolute;
  content: '';
  padding: 50px;
  position: absolute;
  z-index: -1;
  left: -50%;
  top: -100%;
  margin: 8px 0px 0px -12px;
  border-radius: 50%;
  border: 2px dashed#FAFAFA;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}



</style>
   