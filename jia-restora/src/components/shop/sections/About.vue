<template>
  <v-layout>
    <v-container fill-height grid-list-lg>
          <v-layout row wrap
            justify-center
            align-center
          >
          <v-flex xs12 sm6 class="about">
            <h2>A history of <span>{{company_name}}</span></h2>
            
            <p>{{about_page_text}}</p>
           <v-btn to="/menu">Check Our Foods</v-btn>                     
          </v-flex>
          <v-flex xs12 sm6>
            <v-layout row wrap justify-center
            align-center>
            <v-flex sm6 class="">
              <v-img
                :src="require('@/assets/about1.jpg')"
                aspect-ratio="1" cover>
              </v-img> 
            </v-flex>
            <v-flex sm6 class="about_flex_item">
              <v-flex class="about_flex_wrap">
                <v-flex>
                    <v-img
                        :src="require('@/assets/about2.jpg')"
                        aspect-ratio="1.3" cover>
                    </v-img>
                </v-flex>
                  <v-flex class="about_flex_bottom">
                    <v-img
                        :src="require('@/assets/about3.jpg')"
                        aspect-ratio="1.3" cover>
                    </v-img>
                </v-flex>
              </v-flex>
            </v-flex>
          </v-layout>
          </v-flex>
           
          </v-layout>
        </v-container>
  </v-layout>
</template>

<script>
  import firebase from "firebase";
  import moment from 'moment'
  export default {
    name:'About',  
    data(){
      return{
        company_name:'',
        about_page_text:''
      }
    }, 
    created(){
      // Company Name
      var db = firebase.firestore();
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.company_name = doc.data().company_name
      })

      // About page text
      var db = firebase.firestore();
      db.collection("settings").doc('config').onSnapshot(doc =>{
        this.about_page_text = doc.data().about_page_text
      })
    }
  }
</script>

<style scoped>
.about_flex_box{
    display:flex;
  }
  .about_flex_item{
    flex:1;
    display:flex;
    flex-wrap:wrap;
    flex-grow: 1;
    padding: 0!important;
  }
  .about_flex_wrap{
    text-align:center;
    flex:1;
    display:flex;
    flex-wrap:wrap;
  }
  .about_flex_wrap>*{
    flex:1 1 100%;
  }
  .about_flex_bottom{
    align-self:flex-end;
    margin-top: 10px;
  }
    .about h2{
      font-family: 'Lobster Two', cursive;
      font-size: 35px;
      margin-bottom: 20px;
    }
    .about h2 span{
      color: #F16D07;
    }
    .about p{
      line-height: 1.5em;
    }
   .v-btn{
    background: 
    #F16D07 !important;
    color:#FAFAFA!important;
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
    margin: 20px 0 0 0;
    padding: 25px 0;
    width: 150px;
}
</style>
   